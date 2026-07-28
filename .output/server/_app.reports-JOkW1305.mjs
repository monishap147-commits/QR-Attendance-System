import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { L as Download, M as FileText, N as FileSpreadsheet, Y as Calendar, m as Search } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as CardTitle, g as useAttendance, i as CardHeader, n as CardContent, t as Card, y as useTaxonomy } from "./_ssr/store-7dpw_A58.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-nAbo00DI.mjs";
import { t as Badge } from "./_ssr/badge-Bt-nVIZo.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-DYjyjhZD.mjs";
import { t as Label } from "./_ssr/label-B1jF9p8Y.mjs";
import { t as E } from "./_libs/jspdf.mjs";
import { t as autoTable } from "./_libs/jspdf-autotable.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports-JOkW1305.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function startOfWeek(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	x.setDate(x.getDate() - x.getDay());
	return x;
}
function ymd(d) {
	return d.toISOString().slice(0, 10);
}
function ReportsPage() {
	const tax = useTaxonomy();
	const records = useAttendance();
	const [range, setRange] = (0, import_react.useState)("daily");
	const [search, setSearch] = (0, import_react.useState)("");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("all");
	const [subject, setSubject] = (0, import_react.useState)("all");
	const today = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const [rangeFrom, rangeTo] = (0, import_react.useMemo)(() => {
		if (range === "daily") {
			const d = ymd(today);
			return [d, d];
		}
		if (range === "weekly") {
			const s = startOfWeek(today);
			const e = new Date(s);
			e.setDate(s.getDate() + 6);
			return [ymd(s), ymd(e)];
		}
		if (range === "monthly") {
			const s = new Date(today.getFullYear(), today.getMonth(), 1);
			const e = new Date(today.getFullYear(), today.getMonth() + 1, 0);
			return [ymd(s), ymd(e)];
		}
		return [from, to];
	}, [
		range,
		from,
		to,
		today
	]);
	const subjectOptions = (0, import_react.useMemo)(() => tax.subjects.filter((s) => department === "all" || s.department === department).map((s) => s.name), [tax.subjects, department]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return records.filter((r) => {
			if (q && !`${r.studentId} ${r.studentName}`.toLowerCase().includes(q)) return false;
			if (rangeFrom && r.date < rangeFrom) return false;
			if (rangeTo && r.date > rangeTo) return false;
			if (department !== "all" && r.department !== department) return false;
			if (subject !== "all" && r.subject !== subject) return false;
			return true;
		});
	}, [
		records,
		search,
		rangeFrom,
		rangeTo,
		department,
		subject
	]);
	const buildRows = (rs) => rs.map((r) => [
		r.date,
		r.time,
		r.studentId,
		r.studentName,
		r.department,
		`Year ${r.year}`,
		r.subject,
		r.status
	]);
	const headers = [
		"Date",
		"Time",
		"Student ID",
		"Name",
		"Department",
		"Year",
		"Subject",
		"Status"
	];
	const buildCSV = () => {
		const rows = buildRows(filtered).map((row) => row.map((v) => `"${String(v ?? "").replace(/"/g, "\"\"")}"`).join(","));
		return headers.join(",") + "\n" + rows.join("\n");
	};
	const buildExcel = () => {
		return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${buildRows(filtered).map((row) => `<tr>${row.map((c) => `<td>${String(c ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table></body></html>`;
	};
	const buildPDF = () => {
		const doc = new E({ orientation: "landscape" });
		doc.setFontSize(14);
		doc.text("Attendance Report", 14, 14);
		doc.setFontSize(9);
		doc.text(`Range: ${range} · ${rangeFrom || "—"} → ${rangeTo || "—"} · Dept: ${department} · Subject: ${subject}`, 14, 20);
		autoTable(doc, {
			startY: 26,
			head: [headers],
			body: buildRows(filtered),
			styles: { fontSize: 8 },
			headStyles: { fillColor: [
				30,
				64,
				175
			] }
		});
		return doc;
	};
	const downloadBlob = (blob, name) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
	};
	const guard = () => {
		if (!filtered.length) {
			toast.error("Nothing to export");
			return false;
		}
		return true;
	};
	const exportCSV = () => {
		if (!guard()) return;
		downloadBlob(new Blob([buildCSV()], { type: "text/csv;charset=utf-8;" }), `attendance-${Date.now()}.csv`);
		toast.success(`Exported ${filtered.length} records as CSV`);
	};
	const exportExcel = () => {
		if (!guard()) return;
		downloadBlob(new Blob([buildExcel()], { type: "application/vnd.ms-excel" }), `attendance-${Date.now()}.xls`);
		toast.success(`Exported ${filtered.length} records as Excel`);
	};
	const exportPDF = () => {
		if (!guard()) return;
		buildPDF().save(`attendance-${Date.now()}.pdf`);
		toast.success(`Exported ${filtered.length} records as PDF`);
	};
	const clearFilters = () => {
		setSearch("");
		setFrom("");
		setTo("");
		setDepartment("all");
		setSubject("all");
		setRange("daily");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Attendance Reports"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "gap-2",
							onClick: exportCSV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "gap-2",
							onClick: exportExcel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4" }), " Excel"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "gap-2",
							onClick: exportPDF,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), " PDF"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: range,
				onValueChange: (v) => setRange(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "daily",
						children: "Daily"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "weekly",
						children: "Weekly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "monthly",
						children: "Monthly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "custom",
						children: "Custom"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "glass-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 xl:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Search"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: "Student name or ID…",
									className: "pl-9"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "From"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: range === "custom" ? from : rangeFrom,
									onChange: (e) => {
										setRange("custom");
										setFrom(e.target.value);
									},
									className: "pl-9"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "To"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: range === "custom" ? to : rangeTo,
									onChange: (e) => {
										setRange("custom");
										setTo(e.target.value);
									},
									className: "pl-9"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Department"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: department,
								onValueChange: (v) => {
									setDepartment(v);
									setSubject("all");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All"
								}), tax.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: d,
									children: d
								}, d))] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Subject"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: subject,
								onValueChange: setSubject,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All"
								}), subjectOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s,
									children: s
								}, s))] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-end xl:col-span-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: clearFilters,
								children: "Clear filters"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Records" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-normal text-muted-foreground",
						children: [
							filtered.length,
							" of ",
							records.length
						]
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Student ID" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Year" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Subject" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Status"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: ["Year ", r.year] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.subject }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.time }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-success text-success-foreground hover:bg-success/90",
									children: r.status
								})
							})
						] }, r.id)) })] })
					})
				})]
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
