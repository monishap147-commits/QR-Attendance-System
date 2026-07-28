import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-COYcCi3Y.mjs";
import { r as cn } from "./button-CCQEfgNs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-7dpw_A58.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function createStore(initial) {
	let state = initial;
	const listeners = /* @__PURE__ */ new Set();
	return {
		get: () => state,
		set: (next) => {
			state = typeof next === "function" ? next(state) : next;
			listeners.forEach((l) => l());
		},
		subscribe: (l) => {
			listeners.add(l);
			return () => listeners.delete(l);
		}
	};
}
function useStore(s) {
	return (0, import_react.useSyncExternalStore)(s.subscribe, s.get, s.get);
}
var taxonomyStore = createStore({
	departments: [],
	subjects: []
});
var studentStore = createStore([]);
var attendanceStore = createStore([]);
var collegeStore = createStore({
	name: "Your College Name",
	address: "",
	email: "",
	phone: "",
	logo: ""
});
var adminStore = createStore({
	name: "Administrator",
	email: "",
	avatar: ""
});
var studentPhotoPaths = /* @__PURE__ */ new Map();
var collegeLogoPath = "";
var BUCKET = "student-faces";
var URL_TTL = 3600 * 24;
async function signUrl(path) {
	if (!path) return "";
	const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, URL_TTL);
	return data?.signedUrl ?? "";
}
async function signUrlsMany(paths) {
	const unique = Array.from(new Set(paths.filter(Boolean)));
	if (!unique.length) return {};
	const { data } = await supabase.storage.from(BUCKET).createSignedUrls(unique, URL_TTL);
	const map = {};
	data?.forEach((d) => {
		if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
	});
	return map;
}
function dataUrlToBlob(dataUrl) {
	const m = /^data:(.+?);base64,(.*)$/.exec(dataUrl);
	if (!m) return null;
	const mime = m[1];
	const bin = atob(m[2]);
	const arr = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
	return new Blob([arr], { type: mime });
}
async function uploadImage(folder, filename, dataUrl) {
	const blob = dataUrlToBlob(dataUrl);
	if (!blob) return "";
	const path = `${folder}/${filename}.${(blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg")}`;
	const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
		upsert: true,
		contentType: blob.type
	});
	if (error) throw error;
	return path;
}
var useTaxonomy = () => useStore(taxonomyStore);
async function loadTaxonomy() {
	const [{ data: depts }, { data: subs }] = await Promise.all([supabase.from("departments").select("name").order("name"), supabase.from("subjects").select("id, name, department, year").order("name")]);
	taxonomyStore.set({
		departments: (depts ?? []).map((d) => d.name),
		subjects: subs ?? []
	});
}
/** Re-fetches departments/subjects from Supabase so the tables reflect the
* authoritative server state after any write. */
var refreshTaxonomy = loadTaxonomy;
var DUPLICATE_DEPARTMENT_ERROR = "A department with this name already exists.";
var DUPLICATE_SUBJECT_ERROR = "This subject already exists for the selected department and year.";
/** Creates a new department. Rejects blank/duplicate (case-insensitive) names. */
async function createDepartment(name) {
	const v = name.trim();
	if (!v) return {
		ok: false,
		error: "Department name is required."
	};
	if (taxonomyStore.get().departments.some((d) => d.toLowerCase() === v.toLowerCase())) return {
		ok: false,
		error: DUPLICATE_DEPARTMENT_ERROR
	};
	const { error } = await supabase.from("departments").insert({ name: v });
	if (error) return {
		ok: false,
		error: /duplicate/i.test(error.message) ? DUPLICATE_DEPARTMENT_ERROR : error.message
	};
	await refreshTaxonomy();
	return { ok: true };
}
/** Renames a department and cascades the new name onto any subjects/students
* that referenced the old name (those columns store the name as text, not a
* foreign key, so they'd otherwise go stale). */
async function renameDepartment(oldName, newName) {
	const v = newName.trim();
	if (!v) return {
		ok: false,
		error: "Department name is required."
	};
	const cur = taxonomyStore.get();
	const changed = v.toLowerCase() !== oldName.toLowerCase();
	if (changed && cur.departments.some((d) => d.toLowerCase() === v.toLowerCase())) return {
		ok: false,
		error: DUPLICATE_DEPARTMENT_ERROR
	};
	const { error } = await supabase.from("departments").update({ name: v }).eq("name", oldName);
	if (error) return {
		ok: false,
		error: /duplicate/i.test(error.message) ? DUPLICATE_DEPARTMENT_ERROR : error.message
	};
	if (changed) {
		const [subjRes, studRes] = await Promise.all([supabase.from("subjects").update({ department: v }).eq("department", oldName), supabase.from("students").update({ department: v }).eq("department", oldName)]);
		if (subjRes.error) toast.error(`Department renamed, but some subjects weren't updated: ${subjRes.error.message}`);
		if (studRes.error) toast.error(`Department renamed, but some students weren't updated: ${studRes.error.message}`);
	}
	await Promise.all([refreshTaxonomy(), loadStudents()]);
	return { ok: true };
}
/** Deletes a department. Subjects/students that referenced it by name are
* left untouched in the database (no FK), so nothing else is destroyed. */
async function deleteDepartment(name) {
	const { error } = await supabase.from("departments").delete().eq("name", name);
	if (error) return {
		ok: false,
		error: error.message
	};
	await refreshTaxonomy();
	return { ok: true };
}
/** Creates a new subject under a department/year. Rejects blank names and
* duplicates (same name+department+year, case-insensitive on name). */
async function createSubject(subject) {
	const v = subject.name.trim();
	if (!v) return {
		ok: false,
		error: "Subject name is required."
	};
	if (!subject.department) return {
		ok: false,
		error: "Department is required."
	};
	if (!subject.year) return {
		ok: false,
		error: "Year is required."
	};
	if (taxonomyStore.get().subjects.some((x) => x.name.toLowerCase() === v.toLowerCase() && x.department === subject.department && x.year === subject.year)) return {
		ok: false,
		error: DUPLICATE_SUBJECT_ERROR
	};
	const { error } = await supabase.from("subjects").insert({
		name: v,
		department: subject.department,
		year: subject.year
	});
	if (error) return {
		ok: false,
		error: /duplicate/i.test(error.message) ? DUPLICATE_SUBJECT_ERROR : error.message
	};
	await refreshTaxonomy();
	return { ok: true };
}
/** Updates an existing subject (matched by id when available, otherwise by
* its original name/department/year triple). */
async function updateSubject(original, updated) {
	const v = updated.name.trim();
	if (!v) return {
		ok: false,
		error: "Subject name is required."
	};
	if (!updated.department) return {
		ok: false,
		error: "Department is required."
	};
	if (!updated.year) return {
		ok: false,
		error: "Year is required."
	};
	if (taxonomyStore.get().subjects.some((x) => !(x.name === original.name && x.department === original.department && x.year === original.year) && x.name.toLowerCase() === v.toLowerCase() && x.department === updated.department && x.year === updated.year)) return {
		ok: false,
		error: DUPLICATE_SUBJECT_ERROR
	};
	let query = supabase.from("subjects").update({
		name: v,
		department: updated.department,
		year: updated.year
	});
	query = original.id ? query.eq("id", original.id) : query.eq("name", original.name).eq("department", original.department).eq("year", original.year);
	const { error } = await query;
	if (error) return {
		ok: false,
		error: /duplicate/i.test(error.message) ? DUPLICATE_SUBJECT_ERROR : error.message
	};
	if (v !== original.name && original.department === updated.department) {
		const { error: studErr } = await supabase.from("students").update({ subject: v }).eq("subject", original.name).eq("department", original.department);
		if (studErr) toast.error(`Subject renamed, but some students weren't updated: ${studErr.message}`);
		await loadStudents();
	}
	await refreshTaxonomy();
	return { ok: true };
}
/** Deletes a subject (matched by id when available, otherwise by its
* name/department/year triple). */
async function deleteSubject(subject) {
	let query = supabase.from("subjects").delete();
	query = subject.id ? query.eq("id", subject.id) : query.eq("name", subject.name).eq("department", subject.department).eq("year", subject.year);
	const { error } = await query;
	if (error) return {
		ok: false,
		error: error.message
	};
	await refreshTaxonomy();
	return { ok: true };
}
var useStudents = () => useStore(studentStore);
async function loadStudents() {
	const { data, error } = await supabase.from("students").select("*").order("registered_at", { ascending: false });
	if (error) return;
	const urls = await signUrlsMany((data ?? []).map((r) => r.photo_url).filter(Boolean));
	studentPhotoPaths.clear();
	const rows = (data ?? []).map((r) => {
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
			status: r.status ?? "Active",
			photo: r.photo_url ? urls[r.photo_url] ?? "" : "",
			faceEmbedding: r.face_embedding ?? void 0
		};
	});
	studentStore.set(rows);
}
var useAttendance = () => useStore(attendanceStore);
async function loadAttendance() {
	const { data, error } = await supabase.from("attendance_records").select("*").order("date", { ascending: false }).order("time", { ascending: false }).limit(2e3);
	if (error) return;
	attendanceStore.set((data ?? []).map((r) => ({
		id: r.id,
		sessionId: r.session_id,
		studentId: r.student_id,
		studentName: r.student_name,
		department: r.department,
		subject: r.subject ?? "",
		year: r.year ?? "",
		date: r.date,
		time: r.time,
		status: r.status
	})));
}
async function deleteAttendanceRecord(recordId) {
	const { error } = await supabase.from("attendance_records").delete().eq("id", recordId);
	if (error) {
		toast.error(`Failed to delete attendance: ${error.message}`);
		return false;
	}
	attendanceStore.set((prev) => prev.filter((r) => r.id !== recordId));
	return true;
}
var useCollege = () => useStore(collegeStore);
async function loadCollege() {
	const { data, error } = await supabase.from("college_info").select("*").eq("id", 1).maybeSingle();
	if (error || !data) return;
	collegeLogoPath = data.logo_url ?? "";
	const logoUrl = collegeLogoPath ? await signUrl(collegeLogoPath) : "";
	collegeStore.set({
		name: data.name,
		address: data.address,
		email: data.email,
		phone: data.phone,
		logo: logoUrl
	});
}
var collegeSaveTimer = null;
function updateCollege(patch) {
	collegeStore.set((prev) => ({
		...prev,
		...patch
	}));
	(async () => {
		let logoPath = collegeLogoPath;
		if (patch.logo && patch.logo.startsWith("data:")) try {
			logoPath = await uploadImage("college", "logo", patch.logo);
			collegeLogoPath = logoPath;
			const url = await signUrl(logoPath);
			collegeStore.set((prev) => ({
				...prev,
				logo: url
			}));
		} catch (e) {
			toast.error(`Logo upload failed: ${e.message ?? e}`);
		}
		else if (patch.logo === "") {
			if (collegeLogoPath) await supabase.storage.from(BUCKET).remove([collegeLogoPath]);
			collegeLogoPath = "";
			logoPath = "";
		}
		if (collegeSaveTimer) clearTimeout(collegeSaveTimer);
		collegeSaveTimer = setTimeout(() => {
			const s = collegeStore.get();
			supabase.from("college_info").update({
				name: s.name,
				address: s.address,
				email: s.email,
				phone: s.phone,
				logo_url: logoPath || ""
			}).eq("id", 1).then(({ error }) => {
				if (error) toast.error(`Failed to save college info: ${error.message}`);
			});
		}, 500);
	})();
}
var useAdmin = () => useStore(adminStore);
async function loadAdmin() {
	const { data: userRes } = await supabase.auth.getUser();
	const user = userRes.user;
	if (!user) return;
	const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
	adminStore.set({
		name: data?.name ?? "Administrator",
		email: data?.email ?? user.email ?? "",
		avatar: data?.avatar_url ?? ""
	});
}
var adminSaveTimer = null;
function updateAdmin(patch) {
	adminStore.set((prev) => ({
		...prev,
		...patch
	}));
	if (adminSaveTimer) clearTimeout(adminSaveTimer);
	adminSaveTimer = setTimeout(async () => {
		const { data: userRes } = await supabase.auth.getUser();
		const user = userRes.user;
		if (!user) return;
		const s = adminStore.get();
		const { error } = await supabase.from("profiles").update({
			name: s.name,
			email: s.email,
			avatar_url: s.avatar || null
		}).eq("id", user.id);
		if (error) toast.error(`Failed to save profile: ${error.message}`);
	}, 500);
}
var initialized = false;
async function loadAll() {
	await Promise.all([
		loadTaxonomy(),
		loadStudents(),
		loadAttendance(),
		loadCollege(),
		loadAdmin()
	]);
}
function resetAll() {
	taxonomyStore.set({
		departments: [],
		subjects: []
	});
	studentStore.set([]);
	attendanceStore.set([]);
	collegeStore.set({
		name: "Your College Name",
		address: "",
		email: "",
		phone: "",
		logo: ""
	});
	adminStore.set({
		name: "Administrator",
		email: "",
		avatar: ""
	});
	studentPhotoPaths.clear();
	collegeLogoPath = "";
}
if (typeof window !== "undefined" && !initialized) {
	initialized = true;
	supabase.auth.getSession().then(({ data }) => {
		if (data.session) loadAll();
	});
	supabase.auth.onAuthStateChange((event, session) => {
		if (event === "SIGNED_IN" || event === "USER_UPDATED") {
			if (session) loadAll();
		} else if (event === "SIGNED_OUT") resetAll();
	});
}
//#endregion
export { useCollege as _, CardTitle as a, deleteAttendanceRecord as c, renameDepartment as d, updateAdmin as f, useAttendance as g, useAdmin as h, CardHeader as i, deleteDepartment as l, updateSubject as m, CardContent as n, createDepartment as o, updateCollege as p, CardDescription as r, createSubject as s, Card as t, deleteSubject as u, useStudents as v, useTaxonomy as y };
