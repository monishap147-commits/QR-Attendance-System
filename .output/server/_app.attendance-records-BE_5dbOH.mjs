import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { X as CalendarCheck, c as Trash2, h as ScanFace, m as Search } from "./_libs/lucide-react.mjs";
import { a as CardTitle, c as deleteAttendanceRecord, g as useAttendance, i as CardHeader, n as CardContent, r as CardDescription, t as Card, y as useTaxonomy } from "./_ssr/store-7dpw_A58.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-nAbo00DI.mjs";
import { t as Badge } from "./_ssr/badge-Bt-nVIZo.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-DYjyjhZD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.attendance-records-BE_5dbOH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AttendanceRecordsPage() {
	const records = useAttendance();
	const tax = useTaxonomy();
	const [search, setSearch] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("all");
	const [date, setDate] = (0, import_react.useState)("");
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return records.filter((r) => {
			if (q && !`${r.studentId} ${r.studentName}`.toLowerCase().includes(q)) return false;
			if (department !== "all" && r.department !== department) return false;
			if (date && r.date !== date) return false;
			return true;
		});
	}, [
		records,
		search,
		department,
		date
	]);
	const todaysCount = records.filter((r) => r.date === today).length;
	const handleDeleteRecord = async (id) => {
		if (!window.confirm("Are you sure you want to delete this attendance record?")) return;
		try {
			await deleteAttendanceRecord(id);
		} catch (err) {
			console.error("Failed to delete attendance record:", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold tracking-tight",
				children: "Attendance Records"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"All face-recognition check-ins. ",
					todaysCount,
					" recorded today."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				className: "gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/attendance",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "h-4 w-4" }), " Start a session"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "glass-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "h-4 w-4 text-primary" }), " Records"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
					filtered.length,
					" of ",
					records.length,
					" records"
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Student name or ID…",
								className: "pl-9 w-56"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							className: "w-40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: department,
							onValueChange: setDepartment,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-44",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Department" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All Departments"
							}), tax.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: d,
								children: d
							}, d))] })]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Student ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Subject" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Action"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 8,
						className: "text-center text-sm text-muted-foreground py-12",
						children: "No records found. Records will appear here after attendance sessions."
					}) }) : filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.date }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: r.studentId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: r.studentName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.department }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.subject }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.time }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-success text-success-foreground hover:bg-success/90",
								children: r.status
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => handleDeleteRecord(r.id),
								className: "gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Delete"]
							})
						})
					] }, r.id)) })] })
				})
			})]
		})]
	});
}
//#endregion
export { AttendanceRecordsPage as component };
