import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { $ as BookOpen, Q as Building2, c as Trash2, k as LoaderCircle, m as Search, r as Users, v as Plus, x as Pencil } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as CardTitle, d as renameDepartment, i as CardHeader, l as deleteDepartment, n as CardContent, o as createDepartment, r as CardDescription, t as Card, v as useStudents, y as useTaxonomy } from "./_ssr/store-7dpw_A58.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-nAbo00DI.mjs";
import { t as Badge } from "./_ssr/badge-Bt-nVIZo.mjs";
import { t as Label } from "./_ssr/label-B1jF9p8Y.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./_ssr/dialog-BpK3raMC.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./_ssr/alert-dialog-C_eoFCF1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.departments-5sQpzOjI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DepartmentsPage() {
	const tax = useTaxonomy();
	const students = useStudents();
	const [search, setSearch] = (0, import_react.useState)("");
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editingName, setEditingName] = (0, import_react.useState)(null);
	const [nameInput, setNameInput] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const [deletingBusy, setDeletingBusy] = (0, import_react.useState)(false);
	const openAdd = () => {
		setEditingName(null);
		setNameInput("");
		setFormOpen(true);
	};
	const openEdit = (name) => {
		setEditingName(name);
		setNameInput(name);
		setFormOpen(true);
	};
	const handleSave = async () => {
		setSaving(true);
		const result = editingName ? await renameDepartment(editingName, nameInput) : await createDepartment(nameInput);
		setSaving(false);
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		toast.success(editingName ? "Department updated" : "Department added");
		setFormOpen(false);
	};
	const handleDelete = async () => {
		if (!deleting) return;
		setDeletingBusy(true);
		const result = await deleteDepartment(deleting.name);
		setDeletingBusy(false);
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		toast.success("Department deleted");
		setDeleting(null);
	};
	const rows = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return tax.departments.filter((d) => !q || d.toLowerCase().includes(q)).map((d) => ({
			name: d,
			subjectCount: tax.subjects.filter((s) => s.department === d).length,
			studentCount: students.filter((s) => s.department === d).length
		})).sort((a, b) => a.name.localeCompare(b.name));
	}, [
		tax.departments,
		tax.subjects,
		students,
		search
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Departments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "All academic departments in the system."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: openAdd,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Department"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-primary" }), " Department List"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
						rows.length,
						" of ",
						tax.departments.length,
						" departments"
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search departments…",
							className: "pl-9 w-64"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Subjects" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Students"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Actions"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 4,
							className: "text-center text-sm text-muted-foreground py-12",
							children: tax.departments.length === 0 ? "No departments yet. Add one while registering a student or subject." : "No departments match your search."
						}) }) : rows.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 rounded-lg bg-accent/20 text-accent-foreground grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
								}), d.name]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }),
									" ",
									d.subjectCount
								]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
										" ",
										d.studentCount
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
										onClick: () => openEdit(d.name),
										title: "Edit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8 text-destructive hover:text-destructive",
										onClick: () => setDeleting({
											name: d.name,
											subjectCount: d.subjectCount,
											studentCount: d.studentCount
										}),
										title: "Delete",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						] }, d.name)) })] })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: formOpen,
				onOpenChange: (o) => !saving && setFormOpen(o),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingName ? "Edit Department" : "Add Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: editingName ? "Rename this department. Existing subjects and students will follow the new name." : "Create a new academic department." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "dept-name",
							children: "Department name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "dept-name",
							value: nameInput,
							onChange: (e) => setNameInput(e.target.value),
							placeholder: "e.g. Computer Science",
							onKeyDown: (e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleSave();
								}
							},
							autoFocus: true
						})]
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
						children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), editingName ? "Save Changes" : "Add Department"]
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
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: ["This action cannot be undone.", deleting && (deleting.subjectCount > 0 || deleting.studentCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					" ",
					"This department currently has ",
					deleting.subjectCount,
					" subject",
					deleting.subjectCount === 1 ? "" : "s",
					" and ",
					deleting.studentCount,
					" student",
					deleting.studentCount === 1 ? "" : "s",
					" linked to it — they will remain in the system but will no longer be grouped under this department."
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
export { DepartmentsPage as component };
