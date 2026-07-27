-- =============== Face embeddings for real face enrollment ===============
-- Stores the 128-dimensional face descriptor produced client-side by the
-- face-api.js FaceRecognitionNet (a ResNet-34-style network trained with
-- triplet loss, i.e. a FaceNet-style embedding). Used to block duplicate
-- student enrollments by comparing descriptors with Euclidean distance.
ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS face_embedding double precision[];

COMMENT ON COLUMN public.students.face_embedding IS
  '128-d face descriptor (face-api.js FaceRecognitionNet) captured during live, liveness-checked enrollment. Used for duplicate-face detection.';
