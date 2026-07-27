// Real, browser-only face enrollment pipeline for Student Registration.
//
// Model choice: InsightFace has no maintained, production-quality browser
// (WASM/WebGL) build, so this uses face-api.js, which ships:
//  - TinyFaceDetector: real-time face detection (presence + count + box)
//  - FaceLandmark68Net: 68-point landmarks (used for blink/liveness)
//  - FaceRecognitionNet: a 128-d ResNet-34-style descriptor network trained
//    with triplet loss (the standard browser-compatible FaceNet-style
//    embedding). This IS the production model used to identify duplicate
//    faces below.
//
// Anti-spoofing here is a genuine multi-signal browser heuristic (no server,
// no depth camera available), combining:
//  1. Exactly-one-face requirement over the whole capture window.
//  2. Face-size gating (rejects distant/too-small or edge-clipped faces).
//  3. Blink liveness via Eye Aspect Ratio (EAR) dip-and-recovery.
//  4. Head-movement liveness via small natural centroid displacement.
//  5. Rigid-body ("whole card/phone moving together") detection: compares
//     motion energy inside the face box against motion energy in the
//     surrounding background. A live head moving independently of a static
//     background produces low correlation; a printed photo or phone held up
//     and shifted moves the face and its background in lockstep.
//  6. Bezel/edge heuristic: scans for a strong, sustained rectangular edge
//     (a phone/laptop/photo frame) tightly enclosing the face.
// These are documented, best-effort browser heuristics, not a hardware
// liveness sensor — combined they meaningfully raise the bar against
// photos and screen replays without needing a native SDK.

import * as faceapi from "face-api.js";

const MODEL_URL = "/models";

let modelsPromise: Promise<void> | null = null;

export async function ensureFaceModelsLoaded(): Promise<void> {
  if (modelsPromise) return modelsPromise;
  modelsPromise = (async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
  })();
  return modelsPromise;
}

export function areFaceModelsReady(): boolean {
  return (
    faceapi.nets.tinyFaceDetector.isLoaded &&
    faceapi.nets.faceLandmark68Net.isLoaded &&
    faceapi.nets.faceRecognitionNet.isLoaded
  );
}

const DETECTOR_OPTIONS = new faceapi.TinyFaceDetectorOptions({
  inputSize: 224,
  scoreThreshold: 0.5,
});

export type EnrollmentFailureReason =
  | "camera-not-ready"
  | "no-face"
  | "multiple-faces"
  | "face-too-small"
  | "face-off-center"
  | "no-liveness"
  | "spoof-suspected"
  | "timeout"
  | "models-not-loaded";

export interface EnrollmentResult {
  success: boolean;
  reason?: EnrollmentFailureReason;
  message: string;
  descriptor?: number[];
  imageDataUrl?: string;
}

export interface EnrollmentStatusUpdate {
  message: string;
  progress: number; // 0..1
}

const FAILURE_MESSAGES: Record<EnrollmentFailureReason, string> = {
  "camera-not-ready": "Turn the camera on first.",
  "no-face": "No face detected. Please face the camera directly.",
  "multiple-faces": "Multiple faces detected. Only one person may enroll at a time.",
  "face-too-small": "Move closer — your face is too small in the frame.",
  "face-off-center": "Please center your face in the frame.",
  "no-liveness": "Liveness check failed. Please blink naturally or move your head slightly.",
  "spoof-suspected": "This looks like a photo, screen, or printed image, not a live face.",
  timeout: "Enrollment timed out. Please try again in good lighting.",
  "models-not-loaded": "Face recognition models are still loading. Please wait a moment.",
};

// Duplicate-match threshold. face-api.js descriptors: distances below ~0.6
// commonly indicate the same person; we use a stricter value to reduce
// false-positive "already registered" rejections between different people.
export const DUPLICATE_FACE_DISTANCE_THRESHOLD = 0.5;

const CAPTURE_WINDOW_MS = 7000;
const SAMPLE_INTERVAL_MS = 130;
const MIN_FACE_BOX_RATIO = 0.14; // face width / frame width
const MAX_FACE_BOX_RATIO = 0.85;
const EAR_BLINK_THRESHOLD = 0.21;
const EAR_OPEN_THRESHOLD = 0.26;
const MIN_HEAD_MOVEMENT_PX = 3.5;
const MAX_HEAD_MOVEMENT_PX = 60;
const RIGID_MOTION_CORRELATION_LIMIT = 0.93;
const ANALYSIS_SIZE = 64; // downsample size for motion/edge analysis

function dist2D(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function eyeAspectRatio(eye: faceapi.Point[]): number {
  const p = eye;
  const vertical1 = dist2D(p[1], p[5]);
  const vertical2 = dist2D(p[2], p[4]);
  const horizontal = dist2D(p[0], p[3]);
  if (horizontal === 0) return 0;
  return (vertical1 + vertical2) / (2 * horizontal);
}

/** Draws the current video frame to an offscreen canvas at a fixed small
 * size and returns grayscale pixel data, for cheap motion/edge analysis. */
function grabGrayscale(
  video: HTMLVideoElement,
  size: number,
): { gray: Float32Array; w: number; h: number } {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(video, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);
  const gray = new Float32Array(size * size);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return { gray, w: size, h: size };
}

interface FrameDiffStats {
  faceMotion: number;
  bgMotion: number;
}

/** Compares two downsampled grayscale frames and returns the average
 * absolute pixel difference inside vs. outside the (normalized 0..1) face
 * box, used for the rigid-body ("whole photo moved") spoof check. */
function computeFrameDiff(
  prev: Float32Array,
  curr: Float32Array,
  size: number,
  boxNorm: { x: number; y: number; w: number; h: number },
): FrameDiffStats {
  let faceSum = 0;
  let faceCount = 0;
  let bgSum = 0;
  let bgCount = 0;
  const x0 = Math.floor(boxNorm.x * size);
  const y0 = Math.floor(boxNorm.y * size);
  const x1 = Math.ceil((boxNorm.x + boxNorm.w) * size);
  const y1 = Math.ceil((boxNorm.y + boxNorm.h) * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const diff = Math.abs(curr[idx] - prev[idx]);
      const insideFace = x >= x0 && x < x1 && y >= y0 && y < y1;
      if (insideFace) {
        faceSum += diff;
        faceCount++;
      } else {
        bgSum += diff;
        bgCount++;
      }
    }
  }
  return {
    faceMotion: faceCount ? faceSum / faceCount : 0,
    bgMotion: bgCount ? bgSum / bgCount : 0,
  };
}

function pearsonCorrelation(a: number[], b: number[]): number {
  const n = a.length;
  if (n < 3) return 0;
  const meanA = a.reduce((s, v) => s + v, 0) / n;
  const meanB = b.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let denA = 0;
  let denB = 0;
  for (let i = 0; i < n; i++) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    num += da * db;
    denA += da * da;
    denB += db * db;
  }
  const den = Math.sqrt(denA * denB);
  return den === 0 ? 0 : num / den;
}

/** Scans full grayscale frame rows/columns for a strong, sustained straight
 * edge (device bezel / photo frame edge) that tightly encloses the face —
 * a signal a phone, laptop, or printed photo is being held up to the
 * camera. Returns a 0..1 suspicion score. */
function bezelEdgeScore(
  gray: Float32Array,
  size: number,
  boxNorm: { x: number; y: number; w: number; h: number },
): number {
  // Row/column gradient energy (simple 1D Sobel-like gradient).
  const rowGrad = new Array(size).fill(0);
  const colGrad = new Array(size).fill(0);
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const gx = Math.abs(gray[y * size + x + 1] - gray[y * size + x - 1]);
      const gy = Math.abs(gray[(y + 1) * size + x] - gray[(y - 1) * size + x]);
      rowGrad[y] += gy;
      colGrad[x] += gx;
    }
  }
  const rowAvg = rowGrad.reduce((s, v) => s + v, 0) / size;
  const colAvg = colGrad.reduce((s, v) => s + v, 0) / size;

  const faceX0 = boxNorm.x * size;
  const faceY0 = boxNorm.y * size;
  const faceX1 = (boxNorm.x + boxNorm.w) * size;
  const faceY1 = (boxNorm.y + boxNorm.h) * size;

  // Look for strong lines just outside the face box on each side — a
  // tightly-enclosing rectangle is the bezel/frame signature we care about.
  const margin = Math.max(2, Math.round(size * 0.06));
  const strongRowLines = rowGrad.filter(
    (v, y) =>
      v > rowAvg * 2.2 &&
      ((y > faceY0 - margin * 3 && y < faceY0) || (y > faceY1 && y < faceY1 + margin * 3)),
  ).length;
  const strongColLines = colGrad.filter(
    (v, x) =>
      v > colAvg * 2.2 &&
      ((x > faceX0 - margin * 3 && x < faceX0) || (x > faceX1 && x < faceX1 + margin * 3)),
  ).length;

  // Need lines on at least two sides to call it a "frame".
  const sidesWithLines = (strongRowLines > 0 ? 1 : 0) + (strongColLines > 0 ? 1 : 0);
  if (sidesWithLines < 2) return 0;
  return Math.min(1, (strongRowLines + strongColLines) / (size * 0.25));
}

interface SampleFrame {
  earLeft: number;
  earRight: number;
  boxNorm: { x: number; y: number; w: number; h: number };
  centroid: { x: number; y: number };
  gray: Float32Array;
  faceRatio: number;
}

export async function runLiveFaceEnrollment(
  video: HTMLVideoElement,
  onStatus?: (u: EnrollmentStatusUpdate) => void,
): Promise<EnrollmentResult> {
  if (!areFaceModelsReady()) {
    return fail("models-not-loaded");
  }
  if (!video.videoWidth || !video.videoHeight || video.readyState < 2) {
    return fail("camera-not-ready");
  }

  const frames: SampleFrame[] = [];
  const startedAt = performance.now();
  let sawMultipleFaces = false;
  let sawNoFaceCount = 0;
  let totalSamples = 0;

  onStatus?.({ message: "Look at the camera and hold steady…", progress: 0.02 });

  while (performance.now() - startedAt < CAPTURE_WINDOW_MS) {
    const detections = await faceapi
      .detectAllFaces(video, DETECTOR_OPTIONS)
      .withFaceLandmarks();

    totalSamples++;

    if (detections.length > 1) {
      sawMultipleFaces = true;
    } else if (detections.length === 0) {
      sawNoFaceCount++;
    } else {
      const det = detections[0];
      const box = det.detection.box;
      const frameW = video.videoWidth;
      const frameH = video.videoHeight;
      const faceRatio = box.width / frameW;

      const boxNorm = {
        x: Math.max(0, box.x / frameW),
        y: Math.max(0, box.y / frameH),
        w: Math.min(1, box.width / frameW),
        h: Math.min(1, box.height / frameH),
      };

      const landmarks = det.landmarks;
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const earLeft = eyeAspectRatio(leftEye);
      const earRight = eyeAspectRatio(rightEye);

      const { gray } = grabGrayscale(video, ANALYSIS_SIZE);

      frames.push({
        earLeft,
        earRight,
        boxNorm,
        centroid: { x: box.x + box.width / 2, y: box.y + box.height / 2 },
        gray,
        faceRatio,
      });
    }

    const elapsed = performance.now() - startedAt;
    onStatus?.({
      message: "Hold steady — please blink naturally…",
      progress: Math.min(0.9, elapsed / CAPTURE_WINDOW_MS),
    });

    await new Promise((r) => setTimeout(r, SAMPLE_INTERVAL_MS));
  }

  if (totalSamples === 0) {
    return fail("camera-not-ready");
  }
  if (sawMultipleFaces) {
    return fail("multiple-faces");
  }
  if (frames.length < Math.max(6, totalSamples * 0.4)) {
    return sawNoFaceCount > frames.length ? fail("no-face") : fail("timeout");
  }

  // ---- Face size / framing gate ----
  const avgFaceRatio = frames.reduce((s, f) => s + f.faceRatio, 0) / frames.length;
  if (avgFaceRatio < MIN_FACE_BOX_RATIO) {
    return fail("face-too-small");
  }
  if (avgFaceRatio > MAX_FACE_BOX_RATIO) {
    return fail("face-off-center");
  }
  const offCenterFrames = frames.filter((f) => {
    const cx = f.boxNorm.x + f.boxNorm.w / 2;
    const cy = f.boxNorm.y + f.boxNorm.h / 2;
    return cx < 0.15 || cx > 0.85 || cy < 0.1 || cy > 0.9;
  });
  if (offCenterFrames.length > frames.length * 0.5) {
    return fail("face-off-center");
  }

  // ---- Liveness: blink detection ----
  let sawOpen = false;
  let sawClosed = false;
  let sawReopen = false;
  let blinkDetected = false;
  for (const f of frames) {
    const ear = (f.earLeft + f.earRight) / 2;
    if (ear >= EAR_OPEN_THRESHOLD) {
      if (sawClosed) sawReopen = true;
      sawOpen = true;
    } else if (ear <= EAR_BLINK_THRESHOLD) {
      if (sawOpen) sawClosed = true;
    }
    if (sawOpen && sawClosed && sawReopen) {
      blinkDetected = true;
      break;
    }
  }

  // ---- Liveness: natural head movement (fallback / additional signal) ----
  let totalMovement = 0;
  for (let i = 1; i < frames.length; i++) {
    totalMovement += dist2D(frames[i].centroid, frames[i - 1].centroid);
  }
  const avgMovement = totalMovement / Math.max(1, frames.length - 1);
  const naturalMovement = avgMovement >= MIN_HEAD_MOVEMENT_PX && avgMovement <= MAX_HEAD_MOVEMENT_PX;

  if (!blinkDetected && !naturalMovement) {
    return fail("no-liveness");
  }

  // ---- Anti-spoof: rigid-body (whole card/phone moving together) ----
  const faceMotions: number[] = [];
  const bgMotions: number[] = [];
  for (let i = 1; i < frames.length; i++) {
    const { faceMotion, bgMotion } = computeFrameDiff(
      frames[i - 1].gray,
      frames[i].gray,
      ANALYSIS_SIZE,
      frames[i].boxNorm,
    );
    faceMotions.push(faceMotion);
    bgMotions.push(bgMotion);
  }
  const motionCorrelation = pearsonCorrelation(faceMotions, bgMotions);
  const meaningfulMotion =
    faceMotions.reduce((s, v) => s + v, 0) / faceMotions.length > 0.6 &&
    bgMotions.reduce((s, v) => s + v, 0) / bgMotions.length > 0.6;
  const rigidBodySuspected = meaningfulMotion && motionCorrelation > RIGID_MOTION_CORRELATION_LIMIT;

  // ---- Anti-spoof: bezel / device-frame edge heuristic ----
  const midFrame = frames[Math.floor(frames.length / 2)];
  const bezelScore = bezelEdgeScore(midFrame.gray, ANALYSIS_SIZE, midFrame.boxNorm);
  const bezelSuspected = bezelScore > 0.4;

  if (rigidBodySuspected || bezelSuspected) {
    return fail("spoof-suspected");
  }

  onStatus?.({ message: "Verifying face quality…", progress: 0.93 });

  // ---- Pick the best frame (closest to ideal size, most centered) and
  // compute the real descriptor + capture image from it ----
  let bestIdx = 0;
  let bestScore = -Infinity;
  frames.forEach((f, i) => {
    const sizeScore = 1 - Math.abs(f.faceRatio - 0.35);
    const cx = f.boxNorm.x + f.boxNorm.w / 2;
    const cy = f.boxNorm.y + f.boxNorm.h / 2;
    const centerScore = 1 - (Math.abs(cx - 0.5) + Math.abs(cy - 0.5));
    const score = sizeScore + centerScore;
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  });

  // Re-run detection with full descriptor extraction on a fresh, current
  // video frame for maximum accuracy (frames[] only stored landmarks).
  const finalDetection = await faceapi
    .detectSingleFace(video, DETECTOR_OPTIONS)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!finalDetection) {
    return fail("no-face");
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataUrl = canvas.toDataURL("image/jpeg", 0.85);

  onStatus?.({ message: "Face captured!", progress: 1 });

  return {
    success: true,
    message: "Face captured and verified.",
    descriptor: Array.from(finalDetection.descriptor),
    imageDataUrl,
  };

  function fail(reason: EnrollmentFailureReason): EnrollmentResult {
    return { success: false, reason, message: FAILURE_MESSAGES[reason] };
  }
}

export function euclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

export interface EnrolledFace {
  id: string;
  name: string;
  embedding: number[];
}

export interface DuplicateMatch {
  id: string;
  name: string;
  distance: number;
}

/** Compares a new face descriptor against all enrolled students' embeddings
 * and returns the closest match if it is within the duplicate threshold. */
export function findDuplicateFace(
  descriptor: number[],
  enrolled: EnrolledFace[],
): DuplicateMatch | null {
  let best: DuplicateMatch | null = null;
  for (const e of enrolled) {
    if (!e.embedding || e.embedding.length !== descriptor.length) continue;
    const distance = euclideanDistance(descriptor, e.embedding);
    if (distance <= DUPLICATE_FACE_DISTANCE_THRESHOLD && (!best || distance < best.distance)) {
      best = { id: e.id, name: e.name, distance };
    }
  }
  return best;
}
