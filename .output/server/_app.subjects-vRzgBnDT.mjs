import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { $ as BookOpen, c as Trash2, k as LoaderCircle, m as Search, r as Users, v as Plus, x as Pencil } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as CardTitle, i as CardHeader, m as updateSubject, n as CardContent, r as CardDescription, s as createSubject, t as Card, u as deleteSubject, v as useStudents, y as useTaxonomy } from "./_ssr/store-7dpw_A58.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-nAbo00DI.mjs";
import { t as Badge } from "./_ssr/badge-Bt-nVIZo.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-DYjyjhZD.mjs";
import { t as Label } from "./_ssr/label-B1jF9p8Y.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./_ssr/dialog-BpK3raMC.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./_ssr/alert-dialog-C_eoFCF1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.subjects-vRzgBnDT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var YEARS = [
	"1",
	"2",
	"3",
	"4"
];
var emptyForm = {
	name: "",
	department: "",
	year: ""
};
function SubjectsPage() {
	const tax = useTaxonomy();
	const students = useStudents();
	const [search, setSearch] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("all");
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editingSubject, setEditingSubject] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const [deletingBusy, setDeletingBusy] = (0, import_react.useState)(false);
	const openAdd = () => {
		setEditingSubject(null);
		setForm({
			...emptyForm,
			department: department !== "all" ? department : ""
		});
		setFormOpen(true);
	};
	const openEdit = (s) => {
		setEditingSubject(s);
		setForm({
			name: s.name,
			department: s.department,
			year: s.year
		});
		setFormOpen(true);
	};
	const handleSave = async () => {
		setSaving(true);
		const result = editingSubject ? await updateSubject(editingSubject, form) : await createSubject(form);
		setSaving(false);
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		toast.success(editingSubject ? "Subject updated" : "Subject added");
		setFormOpen(false);
	};
	const handleDelete = async () => {
		if (!deleting) return;
		setDeletingBusy(true);
		const result = await deleteSubject(deleting);
		setDeletingBusy(false);
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		toast.success("Subject deleted");
		setDeleting(null);
	};
	const rows = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return tax.subjects.filter((s) => department === "all" || s.department === department).filter((s) => !q || s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || s.year.toLowerCase().includes(q)).map((s) => ({
			...s,
			studentCount: students.filter((st) => st.subject === s.name && st.department === s.department).length
		})).sort((a, b) => a.name.localeCompare(b.name));
	}, [
		tax.subjects,
		students,
		search,
		department
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Subjects Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "All subjects registered in the system."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: openAdd,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Subject"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-primary" }), " Subject List"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
						rows.length,
						" of ",
						tax.subjects.length,
						" subjects"
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search by subject, department or year…",
								className: "pl-9 w-64"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
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
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Subject" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Year" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Students"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Actions"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 5,
							className: "text-center text-sm text-muted-foreground py-12",
							children: tax.subjects.length === 0 ? "No subjects yet. Add one while registering a student." : "No subjects match your search."
						}) }) : rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.department }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.year ? `Year ${s.year}` : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
										" ",
										s.studentCount
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8",
										onClick: () => openEdit(s),
										title: "Edit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8 text-destructive hover:text-destructive",
										onClick: () => setDeleting({
											...s,
											studentCount: s.studentCount
										}),
										title: "Delete",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						] }, `${s.name}-${s.department}-${s.year}`)) })] })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: formOpen,
				onOpenChange: (o) => !saving && setFormOpen(o),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingSubject ? "Edit Subject" : "Add Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: editingSubject ? "Update this subject's name, department or year." : "Create a new subject under a department and year." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "subject-name",
									children: "Subject name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "subject-name",
									value: form.name,
									onChange: (e) => setForm((f) => ({
										...f,
										name: e.target.value
									})),
									placeholder: "e.g. Data Structures",
									autoFocus: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.department,
										onValueChange: (v) => setForm((f) => ({
											...f,
											department: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select department" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tax.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: d,
											children: d
										}, d)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.year,
										onValueChange: (v) => setForm((f) => ({
											...f,
											year: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select year" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: y,
											children: ["Year ", y]
										}, y)) })]
									})]
								})]
							}),
							tax.departments.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "No departments yet — add one on the Departments page first."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setFormOpen(false),
						disabled: saving,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleSave,
						disabled: saving,
						className: "gap-2",
						children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), editingSubject ? "Save Changes" : "Add Subject"]
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleting,
				onOpenChange: (o) => !o && !deletingBusy && setDeleting(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					"Delete ",
					deleting?.name,
					"?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: ["This action cannot be undone.", deleting && deleting.studentCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					" ",
					deleting.studentCount,
					" student",
					deleting.studentCount === 1 ? "" : "s",
					" currently reference this subject — they will remain in the system but will no longer be grouped under it."
				] })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: deletingBusy,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2",
					disabled: deletingBusy,
					onClick: (e) => {
						e.preventDefault();
						handleDelete();
					},
					children: [deletingBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Delete"]
				})] })] })
			})
		]
	});
}
//#endregion
export { SubjectsPage as component };
