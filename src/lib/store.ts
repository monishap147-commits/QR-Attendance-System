// Supabase-backed store. Keeps the same public API the pages were already
// using (useStudents, addStudent, useAttendance, addAttendance, useTaxonomy,
// addDepartment, addSubject, useCollege, updateCollege, useAdmin,
// updateAdmin) so no page component had to be touched.

import { useSyncExternalStore } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// ------- generic in-memory cache -------
function createStore<T>(initial: T) {
  let state: T = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    set: (next: T | ((prev: T) => T)) => {
      state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
      listeners.forEach((l) => l());
    },
    subscribe: (l: () => void) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

function useStore<T>(s: ReturnType<typeof createStore<T>>): T {
  return useSyncExternalStore(s.subscribe, s.get, s.get);
}

// ------- types (unchanged shapes the UI uses) -------
export type Subject = { id?: string; name: string; department: string; year: string };
type Taxonomy = { departments: string[]; subjects: Subject[] };

export type Student = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  department: string;
  year: string;
  section: string;
  subject: string;
  registeredAt: string;
  status?: "Active" | "Inactive";
  photo?: string;
  faceEmbedding?: number[];
};

export type AttendanceRecord = {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  department: string;
  subject: string;
  year: string;
  date: string;
  time: string;
  status: "Present" | "Late";
};

export type CollegeInfo = {
  name: string;
  address: string;
  email: string;
  phone: string;
  logo: string;
};

export type AdminProfile = { name: string; email: string; avatar: string };

// ------- in-memory stores -------
const taxonomyStore = createStore<Taxonomy>({
  departments: [],
  subjects: [],
});
const studentStore = createStore<Student[]>([]);
const attendanceStore = createStore<AttendanceRecord[]>([]);
const collegeStore = createStore<CollegeInfo>({
  name: "Your College Name",
  address: "",
  email: "",
  phone: "",
  logo: "",
});
const adminStore = createStore<AdminProfile>({
  name: "Administrator",
  email: "",
  avatar: "",
});

// internal: storage paths kept alongside resolved signed URLs
const studentPhotoPaths = new Map<string, string>();
let collegeLogoPath = "";

const BUCKET = "student-faces";
const URL_TTL = 60 * 60 * 24; // 24 hours

async function signUrl(path: string): Promise<string> {
  if (!path) return "";
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, URL_TTL);
  return data?.signedUrl ?? "";
}

async function signUrlsMany(paths: string[]): Promise<Record<string, string>> {
  const unique = Array.from(new Set(paths.filter(Boolean)));
  if (!unique.length) return {};
  const { data } = await supabase.storage.from(BUCKET).createSignedUrls(unique, URL_TTL);
  const map: Record<string, string> = {};
  data?.forEach((d) => {
    if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
  });
  return map;
}

function dataUrlToBlob(dataUrl: string): Blob | null {
  const m = /^data:(.+?);base64,(.*)$/.exec(dataUrl);
  if (!m) return null;
  const mime = m[1];
  const bin = atob(m[2]);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

async function uploadImage(folder: string, filename: string, dataUrl: string): Promise<string> {
  const blob = dataUrlToBlob(dataUrl);
  if (!blob) return "";
  const ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${folder}/${filename}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { upsert: true, contentType: blob.type });
  if (error) throw error;
  return path;
}

// ============= TAXONOMY =============
export const useTaxonomy = () => useStore(taxonomyStore);

async function loadTaxonomy() {
  const [{ data: depts }, { data: subs }] = await Promise.all([
    supabase.from("departments").select("name").order("name"),
    supabase.from("subjects").select("id, name, department, year").order("name"),
  ]);
  taxonomyStore.set({
    departments: (depts ?? []).map((d) => d.name),
    subjects: (subs ?? []) as Subject[],
  });
}

/** Re-fetches departments/subjects from Supabase so the tables reflect the
 * authoritative server state after any write. */
export const refreshTaxonomy = loadTaxonomy;

type OpResult = { ok: true } | { ok: false; error: string };

const DUPLICATE_DEPARTMENT_ERROR = "A department with this name already exists.";
const DUPLICATE_SUBJECT_ERROR = "This subject already exists for the selected department and year.";

/** Creates a new department. Rejects blank/duplicate (case-insensitive) names. */
export async function createDepartment(name: string): Promise<OpResult> {
  const v = name.trim();
  if (!v) return { ok: false, error: "Department name is required." };
  const cur = taxonomyStore.get();
  if (cur.departments.some((d) => d.toLowerCase() === v.toLowerCase())) {
    return { ok: false, error: DUPLICATE_DEPARTMENT_ERROR };
  }
  const { error } = await supabase.from("departments").insert({ name: v });
  if (error) {
    return { ok: false, error: /duplicate/i.test(error.message) ? DUPLICATE_DEPARTMENT_ERROR : error.message };
  }
  await refreshTaxonomy();
  return { ok: true };
}

/** Renames a department and cascades the new name onto any subjects/students
 * that referenced the old name (those columns store the name as text, not a
 * foreign key, so they'd otherwise go stale). */
export async function renameDepartment(oldName: string, newName: string): Promise<OpResult> {
  const v = newName.trim();
  if (!v) return { ok: false, error: "Department name is required." };
  const cur = taxonomyStore.get();
  const changed = v.toLowerCase() !== oldName.toLowerCase();
  if (changed && cur.departments.some((d) => d.toLowerCase() === v.toLowerCase())) {
    return { ok: false, error: DUPLICATE_DEPARTMENT_ERROR };
  }
  const { error } = await supabase.from("departments").update({ name: v }).eq("name", oldName);
  if (error) {
    return { ok: false, error: /duplicate/i.test(error.message) ? DUPLICATE_DEPARTMENT_ERROR : error.message };
  }
  if (changed) {
    const [subjRes, studRes] = await Promise.all([
      supabase.from("subjects").update({ department: v }).eq("department", oldName),
      supabase.from("students").update({ department: v }).eq("department", oldName),
    ]);
    if (subjRes.error) toast.error(`Department renamed, but some subjects weren't updated: ${subjRes.error.message}`);
    if (studRes.error) toast.error(`Department renamed, but some students weren't updated: ${studRes.error.message}`);
  }
  await Promise.all([refreshTaxonomy(), loadStudents()]);
  return { ok: true };
}


/** Deletes a department. Subjects/students that referenced it by name are
 * left untouched in the database (no FK), so nothing else is destroyed. */
export async function deleteDepartment(name: string): Promise<OpResult> {
  const { error } = await supabase.from("departments").delete().eq("name", name);
  if (error) return { ok: false, error: error.message };
  await refreshTaxonomy();
  return { ok: true };
}

/** Creates a new subject under a department/year. Rejects blank names and
 * duplicates (same name+department+year, case-insensitive on name). */
export async function createSubject(subject: Subject): Promise<OpResult> {
  const v = subject.name.trim();
  if (!v) return { ok: false, error: "Subject name is required." };
  if (!subject.department) return { ok: false, error: "Department is required." };
  if (!subject.year) return { ok: false, error: "Year is required." };
  const cur = taxonomyStore.get();
  const dup = cur.subjects.some(
    (x) =>
      x.name.toLowerCase() === v.toLowerCase() &&
      x.department === subject.department &&
      x.year === subject.year,
  );
  if (dup) return { ok: false, error: DUPLICATE_SUBJECT_ERROR };
  const { error } = await supabase
    .from("subjects")
    .insert({ name: v, department: subject.department, year: subject.year });
  if (error) {
    return { ok: false, error: /duplicate/i.test(error.message) ? DUPLICATE_SUBJECT_ERROR : error.message };
  }
  await refreshTaxonomy();
  return { ok: true };
}

/** Updates an existing subject (matched by id when available, otherwise by
 * its original name/department/year triple). */
export async function updateSubject(original: Subject, updated: Subject): Promise<OpResult> {
  const v = updated.name.trim();
  if (!v) return { ok: false, error: "Subject name is required." };
  if (!updated.department) return { ok: false, error: "Department is required." };
  if (!updated.year) return { ok: false, error: "Year is required." };
  const cur = taxonomyStore.get();
  const dup = cur.subjects.some(
    (x) =>
      !(x.name === original.name && x.department === original.department && x.year === original.year) &&
      x.name.toLowerCase() === v.toLowerCase() &&
      x.department === updated.department &&
      x.year === updated.year,
  );
  if (dup) return { ok: false, error: DUPLICATE_SUBJECT_ERROR };

  let query = supabase.from("subjects").update({ name: v, department: updated.department, year: updated.year });
  query = original.id
    ? query.eq("id", original.id)
    : query.eq("name", original.name).eq("department", original.department).eq("year", original.year);
  const { error } = await query;
  if (error) {
    return { ok: false, error: /duplicate/i.test(error.message) ? DUPLICATE_SUBJECT_ERROR : error.message };
  }

  // Keep student records' subject text in sync if the name changed.
  if (v !== original.name && original.department === updated.department) {
    const { error: studErr } = await supabase
      .from("students")
      .update({ subject: v })
      .eq("subject", original.name)
      .eq("department", original.department);
    if (studErr) toast.error(`Subject renamed, but some students weren't updated: ${studErr.message}`);
    await loadStudents();
  }

  await refreshTaxonomy();
  return { ok: true };
}

/** Deletes a subject (matched by id when available, otherwise by its
 * name/department/year triple). */
export async function deleteSubject(subject: Subject): Promise<OpResult> {
  let query = supabase.from("subjects").delete();
  query = subject.id
    ? query.eq("id", subject.id)
    : query.eq("name", subject.name).eq("department", subject.department).eq("year", subject.year);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };
  await refreshTaxonomy();
  return { ok: true };
}

export function addDepartment(name: string) {
  const v = name.trim();
  if (!v) return;
  const cur = taxonomyStore.get();
  if (cur.departments.some((d) => d.toLowerCase() === v.toLowerCase())) return;
  taxonomyStore.set((s) => ({ ...s, departments: [...s.departments, v] }));
  void supabase
    .from("departments")
    .insert({ name: v })
    .then(({ error }) => {
      if (error && !/duplicate/i.test(error.message)) {
        toast.error(`Failed to save department: ${error.message}`);
        void loadTaxonomy();
      }
    });
}

export function addSubject(subject: Subject) {
  const v = subject.name.trim();
  if (!v) return;
  if (subject.department) addDepartment(subject.department);
  const cur = taxonomyStore.get();
  const dup = cur.subjects.some(
    (x) =>
      x.name.toLowerCase() === v.toLowerCase() &&
      x.department === subject.department &&
      x.year === subject.year,
  );
  if (dup) return;
  const row: Subject = { ...subject, name: v };
  taxonomyStore.set((s) => ({ ...s, subjects: [...s.subjects, row] }));
  void supabase
    .from("subjects")
    .insert(row)
    .then(({ error }) => {
      if (error && !/duplicate/i.test(error.message)) {
        toast.error(`Failed to save subject: ${error.message}`);
        void loadTaxonomy();
      }
    });
}

// ============= STUDENTS =============
export const useStudents = () => useStore(studentStore);

async function loadStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("registered_at", { ascending: false });
  if (error) return;
  const paths = (data ?? []).map((r) => r.photo_url).filter(Boolean) as string[];
  const urls = await signUrlsMany(paths);
  studentPhotoPaths.clear();
  const rows: Student[] = (data ?? []).map((r) => {
    if (r.photo_url) studentPhotoPaths.set(r.id, r.photo_url);
    return {
      id: r.id,
      name: r.name,
      email: r.email ?? "",
      phone: r.phone ?? "",
      department: r.department,
      year: r.year,
      section: r.section,
      subject: r.subject ?? "",
      registeredAt: r.registered_at,
      status: (r.status as "Active" | "Inactive") ?? "Active",
      photo: r.photo_url ? urls[r.photo_url] ?? "" : "",
      faceEmbedding: r.face_embedding ?? undefined,
    };
  });
  studentStore.set(rows);
}

/** All enrolled students' face embeddings, for client-side duplicate-face
 * checks during registration. Optionally excludes one student (used when
 * editing an existing record so it doesn't match against itself). */
export function getEnrolledFaceEmbeddings(excludeId?: string) {
  return studentStore
    .get()
    .filter((s) => s.id !== excludeId && s.faceEmbedding && s.faceEmbedding.length > 0)
    .map((s) => ({ id: s.id, name: s.name, embedding: s.faceEmbedding as number[] }));
}

export function addStudent(s: Student) {
  // optimistic update
  studentStore.set((prev) => [s, ...prev.filter((x) => x.id !== s.id)]);
  void (async () => {
    try {
      let photoPath = studentPhotoPaths.get(s.id) ?? "";
      if (s.photo && s.photo.startsWith("data:")) {
        photoPath = await uploadImage("students", s.id, s.photo);
        studentPhotoPaths.set(s.id, photoPath);
      }
      const { error } = await supabase.from("students").upsert({
        id: s.id,
        name: s.name,
        email: s.email || null,
        phone: s.phone || null,
        department: s.department,
        year: s.year,
        section: s.section,
        subject: s.subject || null,
        status: s.status ?? "Active",
        photo_url: photoPath || null,
        face_embedding: s.faceEmbedding && s.faceEmbedding.length ? s.faceEmbedding : null,
        registered_at: s.registeredAt,
      });
      if (error) throw error;
      // refresh signed URL so the just-uploaded photo displays
      if (photoPath) {
        const url = await signUrl(photoPath);
        studentStore.set((prev) =>
          prev.map((x) => (x.id === s.id ? { ...x, photo: url } : x)),
        );
      }
    } catch (e: any) {
      toast.error(`Failed to save student: ${e.message ?? e}`);
      void loadStudents();
    }
  })();
}

export function removeStudent(id: string) {
  studentStore.set((prev) => prev.filter((x) => x.id !== id));
  const path = studentPhotoPaths.get(id);
  studentPhotoPaths.delete(id);
  void (async () => {
    if (path) await supabase.storage.from(BUCKET).remove([path]);
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      toast.error(`Failed to delete student: ${error.message}`);
      void loadStudents();
    }
  })();
}

export function toggleStudentStatus(id: string) {
  const cur = studentStore.get().find((s) => s.id === id);
  const next = cur?.status === "Inactive" ? "Active" : "Inactive";
  studentStore.set((prev) =>
    prev.map((x) => (x.id === id ? { ...x, status: next } : x)),
  );
  void supabase
    .from("students")
    .update({ status: next })
    .eq("id", id)
    .then(({ error }) => {
      if (error) {
        toast.error(`Failed to update status: ${error.message}`);
        void loadStudents();
      }
    });
}

// ============= ATTENDANCE =============
export const useAttendance = () => useStore(attendanceStore);

async function loadAttendance() {
  const { data, error } = await supabase
    .from("attendance_records")
    .select("*")
    .order("date", { ascending: false })
    .order("time", { ascending: false })
    .limit(2000);
  if (error) return;
  attendanceStore.set(
    (data ?? []).map((r) => ({
      id: r.id,
      sessionId: r.session_id,
      studentId: r.student_id,
      studentName: r.student_name,
      department: r.department,
      subject: r.subject ?? "",
      year: r.year ?? "",
      date: r.date,
      time: r.time,
      status: r.status as "Present" | "Late",
    })),
  );
}

export function addAttendance(r: AttendanceRecord) {
  attendanceStore.set((prev) => [r, ...prev]);
  void supabase
    .from("attendance_records")
    .insert({
      id: r.id,
      session_id: r.sessionId,
      student_id: r.studentId,
      student_name: r.studentName,
      department: r.department,
      subject: r.subject || null,
      year: r.year || null,
      date: r.date,
      time: r.time,
      status: r.status,
    })
    .then(({ error }) => {
      if (error) {
        toast.error(`Failed to save attendance: ${error.message}`);
        void loadAttendance();
      }
    });
}
export async function deleteAttendanceRecord(recordId: string) {
  const { error } = await supabase
    .from("attendance_records")
    .delete()
    .eq("id", recordId);

  if (error) {
    toast.error(`Failed to delete attendance: ${error.message}`);
    return false;
  }

  attendanceStore.set((prev) =>
    prev.filter((r) => r.id !== recordId)
  );

  return true;
}

// ============= COLLEGE INFO =============
export const useCollege = () => useStore(collegeStore);

async function loadCollege() {
  const { data, error } = await supabase
    .from("college_info")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return;
  collegeLogoPath = data.logo_url ?? "";
  const logoUrl = collegeLogoPath ? await signUrl(collegeLogoPath) : "";
  collegeStore.set({
    name: data.name,
    address: data.address,
    email: data.email,
    phone: data.phone,
    logo: logoUrl,
  });
}

let collegeSaveTimer: ReturnType<typeof setTimeout> | null = null;
export function updateCollege(patch: Partial<CollegeInfo>) {
  collegeStore.set((prev) => ({ ...prev, ...patch }));
  void (async () => {
    // logo upload
    let logoPath = collegeLogoPath;
    if (patch.logo && patch.logo.startsWith("data:")) {
      try {
        logoPath = await uploadImage("college", "logo", patch.logo);
        collegeLogoPath = logoPath;
        const url = await signUrl(logoPath);
        collegeStore.set((prev) => ({ ...prev, logo: url }));
      } catch (e: any) {
        toast.error(`Logo upload failed: ${e.message ?? e}`);
      }
    } else if (patch.logo === "") {
      if (collegeLogoPath) {
        await supabase.storage.from(BUCKET).remove([collegeLogoPath]);
      }
      collegeLogoPath = "";
      logoPath = "";
    }

    // debounce text updates so per-keystroke edits batch
    if (collegeSaveTimer) clearTimeout(collegeSaveTimer);
    collegeSaveTimer = setTimeout(() => {
      const s = collegeStore.get();
      void supabase
        .from("college_info")
        .update({
          name: s.name,
          address: s.address,
          email: s.email,
          phone: s.phone,
          logo_url: logoPath || "",
        })
        .eq("id", 1)
        .then(({ error }) => {
          if (error) toast.error(`Failed to save college info: ${error.message}`);
        });
    }, 500);
  })();
}

// ============= ADMIN PROFILE =============
export const useAdmin = () => useStore(adminStore);

async function loadAdmin() {
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;
  if (!user) return;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  adminStore.set({
    name: data?.name ?? "Administrator",
    email: data?.email ?? user.email ?? "",
    avatar: data?.avatar_url ?? "",
  });
}

let adminSaveTimer: ReturnType<typeof setTimeout> | null = null;
export function updateAdmin(patch: Partial<AdminProfile>) {
  adminStore.set((prev) => ({ ...prev, ...patch }));
  if (adminSaveTimer) clearTimeout(adminSaveTimer);
  adminSaveTimer = setTimeout(async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;
    if (!user) return;
    const s = adminStore.get();
    const { error } = await supabase
      .from("profiles")
      .update({ name: s.name, email: s.email, avatar_url: s.avatar || null })
      .eq("id", user.id);
    if (error) toast.error(`Failed to save profile: ${error.message}`);
  }, 500);
}

// ============= BOOTSTRAP =============
let initialized = false;
async function loadAll() {
  await Promise.all([
    loadTaxonomy(),
    loadStudents(),
    loadAttendance(),
    loadCollege(),
    loadAdmin(),
  ]);
}

function resetAll() {
  taxonomyStore.set({ departments: [], subjects: [] });
  studentStore.set([]);
  attendanceStore.set([]);
  collegeStore.set({ name: "Your College Name", address: "", email: "", phone: "", logo: "" });
  adminStore.set({ name: "Administrator", email: "", avatar: "" });
  studentPhotoPaths.clear();
  collegeLogoPath = "";
}

if (typeof window !== "undefined" && !initialized) {
  initialized = true;
  void supabase.auth.getSession().then(({ data }) => {
    if (data.session) void loadAll();
  });
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" || event === "USER_UPDATED") {
      if (session) void loadAll();
    } else if (event === "SIGNED_OUT") {
      resetAll();
    }
  });
}
