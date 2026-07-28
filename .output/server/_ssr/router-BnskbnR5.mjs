import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ThemeProvider } from "./theme-SACfiS0I.mjs";
import { t as supabase } from "./client-COYcCi3Y.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as BookOpen, A as LayoutDashboard, B as CircleX, H as CircleAlert, K as Check, L as Download, M as FileText, R as Clock, V as CircleCheck, Z as Building, _ as Printer, a as UserPlus, c as Trash2, g as QrCode, i as User, j as GraduationCap, m as Search, n as X, q as ChartColumn, r as Users, u as Square, y as Play } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BnskbnR5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DHAKASaZ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "QRAttend — Smart QR Attendance" },
			{
				name: "description",
				content: "AI-powered face recognition attendance system for colleges and universities."
			},
			{
				property: "og:title",
				content: "QRAttend — Smart QR Attendance"
			},
			{
				property: "og:description",
				content: "AI-powered face recognition attendance system for colleges and universities."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$10 = () => import("./reset-password-r2Y_8Zuh.mjs");
var Route$12 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset Password — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./login-CaKZc9KK.mjs");
var Route$11 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Admin Login — Smart QR Attendance" }, {
		name: "description",
		content: "Secure admin login for the Smart QR Attendance Management System."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./forgot-password-B0JLQnUz.mjs");
var Route$10 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot Password — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_app-D8V0KS1V.mjs");
var Route$9 = createFileRoute("/_app")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (!data.session) throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var Route$8 = createFileRoute("/")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session) throw redirect({ to: "/dashboard" });
		throw redirect({ to: "/login" });
	}
});
var $$splitComponentImporter$6 = () => import("../_app.subjects-vRzgBnDT.mjs");
var Route$7 = createFileRoute("/_app/subjects")({
	head: () => ({ meta: [{ title: "Subjects — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.students-DwgTVune.mjs");
var Route$6 = createFileRoute("/_app/students")({
	head: () => ({ meta: [{ title: "Student Directory — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.settings-C6_DQ9JG.mjs");
var Route$5 = createFileRoute("/_app/settings")({
	head: () => ({ meta: [{ title: "Settings — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.reports-JOkW1305.mjs");
var Route$4 = createFileRoute("/_app/reports")({
	head: () => ({ meta: [{ title: "Reports — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.departments-5sQpzOjI.mjs");
var Route$3 = createFileRoute("/_app/departments")({
	head: () => ({ meta: [{ title: "Departments — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.dashboard-PlBXRASR.mjs");
var Route$2 = createFileRoute("/_app/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.attendance-records-BE_5dbOH.mjs");
var Route$1 = createFileRoute("/_app/attendance-records")({
	head: () => ({ meta: [{ title: "Attendance Records — QRAttend" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var QRAttendanceContent = () => {
	const [activeTab, setActiveTab] = (0, import_react.useState)("live");
	const [departments, setDepartments] = (0, import_react.useState)([]);
	const [years, setYears] = (0, import_react.useState)([]);
	const [subjects, setSubjects] = (0, import_react.useState)([]);
	const [selectedDepartment, setSelectedDepartment] = (0, import_react.useState)("");
	const [selectedYear, setSelectedYear] = (0, import_react.useState)("");
	const [selectedSubject, setSelectedSubject] = (0, import_react.useState)("");
	const [isSessionActive, setIsSessionActive] = (0, import_react.useState)(false);
	const [sessionStartTime, setSessionStartTime] = (0, import_react.useState)(null);
	const [sessionDepartmentName, setSessionDepartmentName] = (0, import_react.useState)("");
	const [sessionYear, setSessionYear] = (0, import_react.useState)("");
	const [sessionId, setSessionId] = (0, import_react.useState)(null);
	const [sessionQRImageUrl, setSessionQRImageUrl] = (0, import_react.useState)(null);
	const [sessionExpiryTime, setSessionExpiryTime] = (0, import_react.useState)(null);
	const [nowTick, setNowTick] = (0, import_react.useState)(Date.now());
	const [manualInput, setManualInput] = (0, import_react.useState)("");
	const isProcessingScanRef = (0, import_react.useRef)(false);
	const scannedIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const QR_EXPIRY_MINUTES = 20;
	const [students, setStudents] = (0, import_react.useState)([]);
	const [isLoadingStudents, setIsLoadingStudents] = (0, import_react.useState)(true);
	const [liveAttendanceList, setLiveAttendanceList] = (0, import_react.useState)([]);
	const [allAttendanceRecords, setAllAttendanceRecords] = (0, import_react.useState)([]);
	const [scannedStudentIds, setScannedStudentIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [notification, setNotification] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedStudentForQRCard, setSelectedStudentForQRCard] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (notification) {
			const timer = setTimeout(() => setNotification(null), 4e3);
			return () => clearTimeout(timer);
		}
	}, [notification]);
	(0, import_react.useEffect)(() => {
		fetchDepartments();
		fetchSubjects();
		fetchYears();
		fetchRegisteredStudents();
		fetchAttendanceHistory();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isSessionActive || !sessionExpiryTime) return;
		const interval = setInterval(() => setNowTick(Date.now()), 1e3);
		return () => clearInterval(interval);
	}, [isSessionActive, sessionExpiryTime]);
	const fetchDepartments = async () => {
		try {
			const { data, error } = await supabase.from("departments").select("*");
			if (error) {
				console.error("[Supabase] departments fetch error:", error.code, error.message, error.hint);
				return;
			}
			if (data) {
				const mapped = data.map((d) => ({
					id: String(d.id ?? d.code ?? d.department_id ?? ""),
					name: String(d.name ?? d.department_name ?? d.title ?? d.id ?? "")
				}));
				setDepartments(mapped);
				if (mapped.length > 0) setSelectedDepartment(mapped[0].id);
			}
		} catch (err) {
			console.error("Error fetching departments:", err);
		}
	};
	const fetchSubjects = async () => {
		try {
			const { data, error } = await supabase.from("subjects").select("*");
			if (error) {
				console.error("[Supabase] subjects fetch error:", error.code, error.message, error.hint);
				return;
			}
			if (data) {
				const mapped = data.map((s) => ({
					id: String(s.id ?? s.code ?? s.subject_code ?? ""),
					name: String(s.name ?? s.subject_name ?? s.title ?? ""),
					code: String(s.code ?? s.subject_code ?? s.id ?? "")
				}));
				setSubjects(mapped);
				if (mapped.length > 0) setSelectedSubject(mapped[0].id);
			}
		} catch (err) {
			console.error("Error fetching subjects:", err);
		}
	};
	const fetchYears = async () => {
		try {
			const { data, error } = await supabase.from("students").select("year");
			if (error) {
				console.error("Year fetch error:", error.message);
				setYears([]);
				return;
			}
			const mapped = Array.from(new Set(data.map((s) => s.year))).map((yr) => ({
				id: yr,
				label: yr
			}));
			setYears(mapped);
			if (mapped.length > 0) setSelectedYear(mapped[0].id);
		} catch (err) {
			console.error(err);
			setYears([]);
		}
	};
	const fetchRegisteredStudents = async () => {
		setIsLoadingStudents(true);
		try {
			const { data, error } = await supabase.from("students").select("*");
			if (error) {
				console.error("[Supabase] students fetch error:", error.code, error.message, error.hint);
				setStudents([]);
				setIsLoadingStudents(false);
				return;
			}
			console.log(`[Supabase] students rows returned: ${data?.length ?? 0}`);
			if (data && data.length > 0) {
				const mappedStudents = data.map((s) => {
					const studentIdVal = String(s.roll_no ?? s.student_id ?? s.studentId ?? s.id ?? "").trim();
					return {
						id: String(s.id ?? studentIdVal),
						studentId: studentIdVal,
						name: s.name ?? s.student_name ?? s.full_name ?? "Unknown Student",
						department: s.department ?? s.dept ?? s.department_name ?? "N/A",
						year: s.year ?? s.academic_year ?? "N/A",
						email: s.email ?? "",
						qrCodeUrl: s.qr_code_url ?? s.qrCodeUrl ?? ""
					};
				});
				setStudents(mappedStudents);
			} else setStudents([]);
		} catch (err) {
			console.error("Failed to query Supabase students table:", err);
			setStudents([]);
		} finally {
			setIsLoadingStudents(false);
		}
	};
	const fetchAttendanceHistory = async () => {
		try {
			const { data, error } = await supabase.from("attendance_records").select("*").order("created_at", { ascending: false });
			if (!error && data) {
				const mappedRecords = data.map((rec) => ({
					id: rec.id || `ATT-${Date.now()}`,
					studentId: rec.student_id || rec.studentId,
					studentName: rec.student_name || rec.studentName || "Student",
					department: rec.department || "",
					year: rec.year || "",
					subject: rec.subject || "",
					timestamp: rec.time || rec.timestamp || "",
					date: rec.date || "",
					status: rec.status || "PRESENT"
				}));
				setAllAttendanceRecords(mappedRecords);
			}
		} catch (err) {
			console.warn("Attendance logs fetch warning:", err);
		}
	};
	const handleDeleteRecord = async (recordId) => {
		if (!window.confirm("Are you sure you want to delete this attendance record?")) return;
		try {
			const { error } = await supabase.from("attendance_records").delete().eq("id", recordId);
			if (error) {
				console.error("[Supabase] attendance delete error:", error.code, error.message, error.hint);
				setNotification({
					type: "error",
					message: `Failed to delete record: ${error.message}`
				});
				return;
			}
			setAllAttendanceRecords((prev) => prev.filter((r) => r.id !== recordId));
			setNotification({
				type: "success",
				message: "Attendance record deleted successfully."
			});
			fetchAttendanceHistory();
		} catch (err) {
			console.error("Failed to delete attendance record:", err);
			setNotification({
				type: "error",
				message: "An unexpected error occurred while deleting the record."
			});
		}
	};
	const generateSessionQR = () => {
		const newSessionId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `SESSION-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
		const expiry = new Date(Date.now() + QR_EXPIRY_MINUTES * 60 * 1e3);
		const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
		const subjectName = subjects.find((s) => s.id === selectedSubject)?.name || selectedSubject;
		const departmentName = departments.find((d) => d.id === selectedDepartment)?.name || selectedDepartment;
		const checkInUrl = new URL(window.location.origin + window.location.pathname);
		checkInUrl.searchParams.set("session", newSessionId);
		checkInUrl.searchParams.set("date", today);
		checkInUrl.searchParams.set("subject", selectedSubject);
		checkInUrl.searchParams.set("subjectName", subjectName);
		checkInUrl.searchParams.set("department", selectedDepartment);
		checkInUrl.searchParams.set("departmentName", departmentName);
		checkInUrl.searchParams.set("year", selectedYear);
		checkInUrl.searchParams.set("expiry", expiry.toISOString());
		scannedIdsRef.current = /* @__PURE__ */ new Set();
		setSessionId(newSessionId);
		setSessionExpiryTime(expiry);
		setSessionQRImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(checkInUrl.toString())}`);
		setNowTick(Date.now());
	};
	const handleQRScanSuccess = async (scannedData) => {
		if (!isSessionActive) {
			setNotification({
				type: "warning",
				message: "No active session. Please start session first."
			});
			return;
		}
		if (isProcessingScanRef.current) return;
		let extractedId = scannedData.trim();
		try {
			if (extractedId.startsWith("{") && extractedId.endsWith("}")) {
				const parsed = JSON.parse(extractedId);
				if (parsed && typeof parsed === "object") extractedId = String(parsed.student_id || parsed.studentId || parsed.id || extractedId).trim();
			}
		} catch (e) {}
		const cleanedScannedId = extractedId.trim().toLowerCase();
		if (scannedIdsRef.current.has(cleanedScannedId)) return;
		isProcessingScanRef.current = true;
		try {
			const normalize = (val) => val.trim().toLowerCase().replace(/\s+/g, "");
			const matchedStudent = students.find((s) => {
				return normalize(String(s.studentId || s.id || "")) === normalize(cleanedScannedId);
			});
			if (!matchedStudent) {
				setNotification({
					type: "error",
					message: `Access Denied: Student ID "${extractedId}" is not in the registered students database!`
				});
				return;
			}
			const studentDeptMatches = normalize(matchedStudent.department || "") === normalize(sessionDepartmentName || "");
			const studentYearMatches = normalize(matchedStudent.year || "") === normalize(sessionYear || "");
			if (!studentDeptMatches || !studentYearMatches) {
				setNotification({
					type: "error",
					message: "Student not registered for this Department and Year."
				});
				return;
			}
			scannedIdsRef.current.add(cleanedScannedId);
			const now = /* @__PURE__ */ new Date();
			const formattedTime = now.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
			const formattedDate = now.toISOString().split("T")[0];
			const subjectName = subjects.find((s) => s.id === selectedSubject)?.name || selectedSubject;
			const newRecord = {
				id: `ATT-${Date.now()}`,
				studentId: matchedStudent.studentId,
				studentName: matchedStudent.name,
				department: matchedStudent.department,
				year: matchedStudent.year,
				subject: subjectName,
				timestamp: formattedTime,
				date: formattedDate,
				status: "PRESENT"
			};
			const { error: insertError } = await supabase.from("attendance_records").insert([{
				session_id: sessionId ?? "",
				student_id: matchedStudent.studentId,
				student_name: matchedStudent.name,
				department: matchedStudent.department,
				year: matchedStudent.year,
				subject: subjectName,
				time: formattedTime,
				date: formattedDate,
				status: "Present"
			}]);
			if (insertError) {
				console.error("[Supabase] attendance insert error:", insertError.code, insertError.message, insertError.hint);
				scannedIdsRef.current.delete(cleanedScannedId);
				setNotification({
					type: "error",
					message: `Failed to save attendance for ${matchedStudent.name}: ${insertError.message}`
				});
				return;
			}
			setLiveAttendanceList((prev) => [newRecord, ...prev]);
			setAllAttendanceRecords((prev) => [newRecord, ...prev]);
			setScannedStudentIds((prev) => new Set(prev).add(cleanedScannedId));
			setNotification({
				type: "success",
				message: `Verified: Attendance saved for ${matchedStudent.name} (${matchedStudent.studentId})!`
			});
		} finally {
			isProcessingScanRef.current = false;
		}
	};
	const handleStartSession = () => {
		if (students.length === 0) setNotification({
			type: "warning",
			message: "No registered students found in database. Please register students first."
		});
		const activeDepartmentName = departments.find((d) => d.id === selectedDepartment)?.name || selectedDepartment;
		setIsSessionActive(true);
		setSessionStartTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		}));
		setSessionDepartmentName(activeDepartmentName);
		setSessionYear(selectedYear);
		generateSessionQR();
		setNotification({
			type: "info",
			message: "Attendance Session Started. Share the Session QR Code with students to check in."
		});
	};
	const handleStopSession = async () => {
		setIsSessionActive(false);
		setSessionId(null);
		setSessionQRImageUrl(null);
		setSessionExpiryTime(null);
		setNotification({
			type: "info",
			message: "Attendance Session Stopped."
		});
	};
	const handleManualScanSubmit = (e) => {
		e.preventDefault();
		if (!manualInput.trim()) return;
		handleQRScanSuccess(manualInput.trim());
		setManualInput("");
	};
	const totalEnrolled = students.length;
	const totalPresent = liveAttendanceList.length;
	const totalAbsent = Math.max(0, totalEnrolled - totalPresent);
	const attendanceRate = totalEnrolled > 0 ? Math.round(totalPresent / totalEnrolled * 100) : 0;
	const stats = {
		totalEnrolled,
		totalPresent,
		totalAbsent,
		attendanceRate
	};
	const filteredLiveRecords = liveAttendanceList.filter((r) => r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || r.studentId.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredAllRecords = allAttendanceRecords.filter((r) => r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || r.studentId.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredStudents = students.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) || s.department.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-8 h-8 text-blue-600" }), "QR Attendance"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 mt-1",
					children: "Real-time QR scanner linked directly with Registered Students Store"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 md:mt-0 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							fetchDepartments();
							fetchSubjects();
							fetchYears();
							fetchRegisteredStudents();
						},
						className: "flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors",
						children: "Refresh Data"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${isSessionActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2.5 h-2.5 rounded-full ${isSessionActive ? "bg-green-500 animate-pulse" : "bg-gray-400"}` }), isSessionActive ? `Session Active (${sessionStartTime})` : "Session Inactive"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-6 flex flex-wrap gap-2 border-b pb-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("live"),
						className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "live" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-gray-100 border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-4 h-4" }), "Live QR Attendance"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("records"),
						className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "records" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-gray-100 border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4" }), "Attendance Records"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("reports"),
						className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "reports" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-gray-100 border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4" }), "Reports"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("students"),
						className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "students" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-gray-100 border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4" }),
							"Students & QR Cards (",
							students.length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("dashboard"),
						className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "dashboard" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 hover:bg-gray-100 border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4" }), "Dashboard"]
					})
				]
			}),
			notification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mb-6 p-4 rounded-xl flex items-center justify-between shadow-sm border ${notification.type === "success" ? "bg-green-50 text-green-800 border-green-200" : notification.type === "error" ? "bg-red-50 text-red-800 border-red-200" : notification.type === "warning" ? "bg-amber-50 text-amber-800 border-amber-200" : "bg-blue-50 text-blue-800 border-blue-200"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						notification.type === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-green-600" }),
						notification.type === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-5 h-5 text-red-600" }),
						notification.type === "warning" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5 text-amber-600" }),
						notification.type === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-5 h-5 text-blue-600" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: notification.message
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setNotification(null),
					className: "text-gray-400 hover:text-gray-600 text-sm font-bold",
					children: "Dismiss"
				})]
			}),
			activeTab === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-white rounded-xl shadow-sm border p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-base font-semibold text-gray-800 mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5 text-blue-600" }), "Session Setup"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "w-4 h-4 text-gray-400" }), "Department"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: selectedDepartment,
									onChange: (e) => setSelectedDepartment(e.target.value),
									disabled: isSessionActive,
									className: "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-60",
									children: departments.length > 0 ? departments.map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: dept.id,
										children: dept.name
									}, dept.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "No departments available"
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "w-4 h-4 text-gray-400" }), "Academic Year"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: selectedYear,
									onChange: (e) => setSelectedYear(e.target.value),
									disabled: isSessionActive,
									className: "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-60",
									children: years.length > 0 ? years.map((yr) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: yr.id,
										children: yr.label
									}, yr.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "No years available"
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4 text-gray-400" }), "Subject"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: selectedSubject,
									onChange: (e) => setSelectedSubject(e.target.value),
									disabled: isSessionActive,
									className: "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-60",
									children: subjects.length > 0 ? subjects.map((subj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: subj.id,
										children: subj.name
									}, subj.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "No subjects available"
									})
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-4 pt-2 border-t",
							children: !isSessionActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleStartSession,
								className: "flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 fill-current" }), "Start Session"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleStopSession,
								className: "flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-4 h-4 fill-current" }), "Stop Session"]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-sm border p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-md font-semibold text-gray-800 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-5 h-5 text-blue-600" }), "Session QR Code"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs px-2.5 py-1 rounded-full font-medium ${isSessionActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
										children: isSessionActive ? "QR Active" : "Session Inactive"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative bg-gray-900 rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center border border-gray-800",
									children: isSessionActive && sessionQRImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center justify-center p-6 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white p-3 rounded-xl shadow-inner",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: sessionQRImageUrl,
												alt: "Session Attendance QR Code",
												className: "w-48 h-48"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-gray-300 mt-4 font-mono",
											children: [
												"Session ID: ",
												sessionId?.slice(0, 13),
												"..."
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-16 h-16 text-gray-500 mb-3" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-base text-gray-300",
												children: "No active Session QR"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-gray-400 mt-1 max-w-xs",
												children: "Start a session to generate today's unique attendance QR code."
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: generateSessionQR,
										disabled: !isSessionActive,
										className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow disabled:opacity-50 transition-colors",
										children: "Regenerate QR Code"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-4 border-t",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-gray-600 mb-2",
										children: "Manual Student ID Entry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleManualScanSubmit,
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Enter registered Student ID...",
											value: manualInput,
											onChange: (e) => setManualInput(e.target.value),
											disabled: !isSessionActive,
											className: "flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-50"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: !isSessionActive || !manualInput.trim(),
											className: "px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors",
											children: "Verify & Save"
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-sm border p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-md font-semibold text-gray-800 mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-5 h-5 text-blue-600" }), "Session Statistics"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-blue-50 rounded-lg border border-blue-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-blue-600 uppercase",
											children: "Registered"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold text-blue-900 mt-1",
											children: stats.totalEnrolled
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-green-50 rounded-lg border border-green-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-green-600 uppercase",
											children: "Present"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold text-green-900 mt-1",
											children: stats.totalPresent
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-red-50 rounded-lg border border-red-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-red-600 uppercase",
											children: "Absent"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-2xl font-bold text-red-900 mt-1",
											children: stats.totalAbsent
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-purple-50 rounded-lg border border-purple-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-purple-600 uppercase",
											children: "Rate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-2xl font-bold text-purple-900 mt-1",
											children: [stats.attendanceRate, "%"]
										})]
									})
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-sm border p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-md font-semibold text-gray-800 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-5 h-5 text-blue-600" }), "Live Attendance Feed"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 mt-0.5",
									children: "Scanned records for current active session"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-gray-400 absolute left-3 top-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search live scans...",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										className: "pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left border-collapse text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "bg-gray-50 border-b text-gray-500 text-xs uppercase font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Student ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Department"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Time Marked"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-3 px-4",
												children: "Status"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y",
										children: filteredLiveRecords.length > 0 ? filteredLiveRecords.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-gray-50 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 px-4 font-mono text-xs font-bold text-gray-900",
													children: record.studentId
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 px-4 font-medium text-gray-800",
													children: record.studentName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 px-4 text-gray-500 text-xs",
													children: record.department
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 px-4 text-gray-500 text-xs font-mono",
													children: record.timestamp
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 px-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3" }), "PRESENT"]
													})
												})
											]
										}, record.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											colSpan: 5,
											className: "text-center py-12 text-gray-400",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-10 h-10 mx-auto mb-2 opacity-40" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium",
													children: "No live QR scans recorded yet"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs mt-1 text-gray-400",
													children: "Start session and scan registered student QR codes to view live updates."
												})
											]
										}) })
									})]
								})
							})]
						})
					})]
				})]
			}),
			activeTab === "records" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl shadow-sm border p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-gray-800",
						children: "All Attendance Records"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-gray-500",
						children: "Historical QR attendance logs"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-gray-400 absolute left-3 top-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search logs...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "pl-9 pr-4 py-1.5 text-xs bg-gray-50 border rounded-lg w-full sm:w-56"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-gray-50 border-b text-gray-500 text-xs uppercase font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Student ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Subject"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Department"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: filteredAllRecords.length > 0 ? filteredAllRecords.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-gray-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 text-xs text-gray-500",
										children: r.date
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 font-mono text-xs font-bold",
										children: r.studentId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 font-medium",
										children: r.studentName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 text-xs text-gray-600",
										children: r.subject
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 text-xs text-gray-500",
										children: r.department
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4 font-mono text-xs text-gray-500",
										children: r.timestamp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800",
											children: r.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 px-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleDeleteRecord(r.id),
											className: "flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" }), "Delete"]
										})
									})
								]
							}, r.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "text-center py-10 text-gray-400",
								children: "No attendance records found."
							}) })
						})]
					})
				})]
			}),
			activeTab === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl shadow-sm border p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b pb-4 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold text-gray-800",
							children: "Attendance Reports & Export"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500",
							children: "Export attendance sheets and verify registered database metrics"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 bg-gray-50 border rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold text-gray-700",
									children: "Total Scans Recorded"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-3xl font-bold text-blue-600 mt-2",
									children: allAttendanceRecords.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 bg-gray-50 border rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold text-gray-700",
									children: "Registered Database Students"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-3xl font-bold text-green-600 mt-2",
									children: students.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 bg-gray-50 border rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold text-gray-700",
									children: "Configured Subjects"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-3xl font-bold text-purple-600 mt-2",
									children: subjects.length
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => alert("Exporting CSV report..."),
							className: "flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), "Download CSV Report"]
						})
					})
				]
			}),
			activeTab === "students" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl shadow-sm border p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-gray-800",
						children: "Registered Students Directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-gray-500",
						children: "Loaded directly from Student Registration database/store"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-gray-400 absolute left-3 top-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search registered students...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "pl-9 pr-4 py-1.5 text-xs bg-gray-50 border rounded-lg w-full sm:w-56"
						})]
					})]
				}), isLoadingStudents ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12 text-gray-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-10 h-10 mx-auto animate-pulse text-blue-500 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Loading registered students..."
					})]
				}) : filteredStudents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: filteredStudents.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between bg-gray-50/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-6 h-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-gray-900",
									children: st.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-mono text-blue-600 font-medium",
									children: st.studentId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 mt-1",
									children: st.department
								}),
								st.year && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-400",
									children: st.year
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-3 border-t flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelectedStudentForQRCard(st),
								className: "flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-4 h-4" }), "View Student QR Card"]
							})
						})]
					}, st.id || st.studentId))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12 text-gray-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-12 h-12 mx-auto mb-3 opacity-40 text-gray-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-semibold text-gray-700",
							children: "No registered students found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-1 text-gray-500 max-w-sm mx-auto",
							children: "Please add students in Student Registration. Registered students will automatically appear here."
						})
					]
				})]
			}),
			activeTab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white p-6 rounded-xl border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-gray-400",
								children: "Database Students"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold text-gray-900 mt-2",
								children: students.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white p-6 rounded-xl border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-gray-400",
								children: "Live Session Present"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold text-green-600 mt-2",
								children: liveAttendanceList.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white p-6 rounded-xl border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-gray-400",
								children: "Live Attendance Rate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-3xl font-bold text-blue-600 mt-2",
								children: [attendanceRate, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white p-6 rounded-xl border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-gray-400",
								children: "Historical Scans Logged"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold text-purple-600 mt-2",
								children: allAttendanceRecords.length
							})]
						})
					]
				})
			}),
			selectedStudentForQRCard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedStudentForQRCard(null),
						className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-block p-2 bg-blue-50 rounded-xl mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-8 h-8 text-blue-600" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-gray-900",
								children: "Student Attendance Pass"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500",
								children: "Scan code during active sessions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "my-6 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl inline-block shadow-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedStudentForQRCard.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(selectedStudentForQRCard.studentId)}`,
									alt: `QR Code for ${selectedStudentForQRCard.name}`,
									className: "w-44 h-44 mx-auto"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-gray-50 p-4 rounded-xl text-left space-y-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-gray-700",
											children: "Name:"
										}),
										" ",
										selectedStudentForQRCard.name
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-gray-700",
											children: "Student ID:"
										}),
										" ",
										selectedStudentForQRCard.studentId
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-gray-700",
											children: "Department:"
										}),
										" ",
										selectedStudentForQRCard.department
									] }),
									selectedStudentForQRCard.year && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-gray-700",
											children: "Year:"
										}),
										" ",
										selectedStudentForQRCard.year
									] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => window.print(),
								className: "mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-4 h-4" }), "Print Student QR Card"]
							})
						]
					})]
				})
			})
		]
	});
};
var Route = createFileRoute("/_app/attendance")({ component: QRAttendanceContent });
var ResetPasswordRoute = Route$12.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$13
});
var LoginRoute = Route$11.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$13
});
var ForgotPasswordRoute = Route$10.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$13
});
var AppRoute = Route$9.update({
	id: "/_app",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AppSubjectsRoute = Route$7.update({
	id: "/subjects",
	path: "/subjects",
	getParentRoute: () => AppRoute
});
var AppStudentsRoute = Route$6.update({
	id: "/students",
	path: "/students",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$4.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppDepartmentsRoute = Route$3.update({
	id: "/departments",
	path: "/departments",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppAttendanceRecordsRoute = Route$1.update({
	id: "/attendance-records",
	path: "/attendance-records",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppAttendanceRoute: Route.update({
		id: "/attendance",
		path: "/attendance",
		getParentRoute: () => AppRoute
	}),
	AppAttendanceRecordsRoute,
	AppDashboardRoute,
	AppDepartmentsRoute,
	AppReportsRoute,
	AppSettingsRoute,
	AppStudentsRoute,
	AppSubjectsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	ForgotPasswordRoute,
	LoginRoute,
	ResetPasswordRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
