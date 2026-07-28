import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./_ssr/client-COYcCi3Y.mjs";
import { t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { L as Download, S as Pen, _ as Printer, c as Trash2, g as QrCode, m as Search, v as Plus } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as CardContent, t as Card, y as useTaxonomy } from "./_ssr/store-7dpw_A58.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-nAbo00DI.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-DYjyjhZD.mjs";
import { t as Label } from "./_ssr/label-B1jF9p8Y.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./_ssr/dialog-BpK3raMC.mjs";
import { t as QRCodeSVG } from "./_libs/qrcode.react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.students-DwgTVune.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentsPage() {
	const tax = useTaxonomy();
	const [students, setStudents] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [deptFilter, setDeptFilter] = (0, import_react.useState)("all");
	const [yearFilter, setYearFilter] = (0, import_react.useState)("all");
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [editingStudent, setEditingStudent] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [rollNo, setRollNo] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [section, setSection] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [qrStudent, setQrStudent] = (0, import_react.useState)(null);
	const fetchStudents = async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase.from("students").select("*").order("name", { ascending: true });
			if (error) throw error;
			setStudents(data || []);
		} catch (err) {
			console.error("[Fetch Students] Error:", err);
			toast.error("Failed to load student directory");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchStudents();
	}, []);
	const filteredStudents = (0, import_react.useMemo)(() => {
		return students.filter((s) => {
			const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll_no.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase());
			const matchDept = deptFilter === "all" || s.department === deptFilter;
			const matchYear = yearFilter === "all" || String(s.year) === yearFilter;
			return matchSearch && matchDept && matchYear;
		});
	}, [
		students,
		searchQuery,
		deptFilter,
		yearFilter
	]);
	const openForm = (student = null) => {
		if (student) {
			setEditingStudent(student);
			setName(student.name);
			setRollNo(student.roll_no);
			setDepartment(student.department);
			setYear(String(student.year));
			setSection(student.section || "");
			setEmail(student.email);
			setPhone(student.phone || "");
		} else {
			setEditingStudent(null);
			setName("");
			setRollNo("");
			setDepartment("");
			setYear("");
			setSection("");
			setEmail("");
			setPhone("");
		}
		setIsFormOpen(true);
	};
	const handleSaveStudent = async (e) => {
		e.preventDefault();
		if (!name || !rollNo || !department || !year || !email) {
			toast.error("All required fields must be populated.");
			return;
		}
		setSubmitting(true);
		const payload = {
			name,
			roll_no: rollNo.trim(),
			department,
			year,
			section: section.trim(),
			email: email.trim(),
			phone: phone.trim()
		};
		try {
			if (editingStudent) {
				const { error } = await supabase.from("students").update(payload).eq("id", editingStudent.id);
				if (error) throw error;
				toast.success("Student updated successfully");
			} else {
				const { error } = await supabase.from("students").insert({
					id: crypto.randomUUID(),
					...payload
				});
				if (error) throw error;
				toast.success("Student registered successfully");
			}
			setIsFormOpen(false);
			fetchStudents();
		} catch (err) {
			console.error("[Save Student] Error:", err);
			toast.error(err.message || "Failed to commit record to database.");
		} finally {
			setSubmitting(false);
		}
	};
	const handleDeleteStudent = async (id, sName) => {
		if (!confirm(`Are you sure you want to delete ${sName}?`)) return;
		try {
			const { error } = await supabase.from("students").delete().eq("id", id);
			if (error) throw error;
			toast.success("Student removed successfully");
			fetchStudents();
		} catch (err) {
			console.error("[Delete Student] Error:", err);
			toast.error(err.message || "Failed to remove student from database.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Student Directory"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => openForm(null),
					className: "gap-2 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Register Student"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "glass-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 sm:p-5 grid gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search by Name, Roll Number, or Email...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: deptFilter,
								onValueChange: setDeptFilter,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Departments" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Departments"
								}), tax.departments.map((d) => {
									const val = typeof d === "object" ? d.id : d;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: val,
										children: typeof d === "object" ? d.name : d
									}, val);
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: yearFilter,
								onValueChange: setYearFilter,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Years" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Years"
								}), [
									"1",
									"2",
									"3",
									"4"
								].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: y,
									children: ["Year ", y]
								}, y))] })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "glass-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Roll Number" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Year / Sec" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 7,
						className: "text-center py-10 text-muted-foreground",
						children: "Loading student directory database records..."
					}) }) : filteredStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 7,
						className: "text-center py-10 text-muted-foreground",
						children: "No enrolled students found."
					}) }) : filteredStudents.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: s.roll_no
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.department }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [
							"Year ",
							s.year,
							" ",
							s.section ? `(${s.section})` : ""
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs",
							children: s.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs",
							children: s.phone || "N/A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-right flex items-center justify-end gap-1.5 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => setQrStudent(s),
									title: "Generate QR ID",
									className: "h-8 w-8 text-primary hover:text-primary hover:bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => openForm(s),
									title: "Edit Details",
									className: "h-8 w-8 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => handleDeleteStudent(s.id, s.name),
									title: "Delete Student",
									className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						})
					] }, s.id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[500px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingStudent ? "Modify Student Details" : "Register New Student" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Complete the profile fields to register the student onto the campus directory database." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveStudent,
						className: "space-y-4 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										className: "text-xs",
										children: "Full Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										placeholder: "e.g. John Doe",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "rollNo",
										className: "text-xs",
										children: "Register / Roll Number *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "rollNo",
										placeholder: "e.g. STU1001",
										value: rollNo,
										onChange: (e) => setRollNo(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "dept",
										className: "text-xs",
										children: "Department *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: department,
										onValueChange: setDepartment,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "dept",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Pick Department" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tax.departments.map((d) => {
											const val = typeof d === "object" ? d.id : d;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: val,
												children: typeof d === "object" ? d.name : d
											}, val);
										}) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "year",
										className: "text-xs",
										children: "Academic Year *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: year,
										onValueChange: setYear,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "year",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Pick Year" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											"1",
											"2",
											"3",
											"4"
										].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: y,
											children: ["Year ", y]
										}, y)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sec",
										className: "text-xs",
										children: "Section / Division"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sec",
										placeholder: "e.g. A, B",
										value: section,
										onChange: (e) => setSection(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										className: "text-xs",
										children: "University Email *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										placeholder: "student@university.edu",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "phone",
										className: "text-xs",
										children: "Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "phone",
										placeholder: "e.g. +1 (555) 019-2834",
										value: phone,
										onChange: (e) => setPhone(e.target.value)
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 justify-end pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setIsFormOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: submitting,
								children: submitting ? "Saving..." : editingStudent ? "Save Changes" : "Register Student"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!qrStudent,
				onOpenChange: (open) => !open && setQrStudent(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "sm:max-w-md",
					children: qrStudent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentQRDialogView, {
						student: qrStudent,
						onClose: () => setQrStudent(null)
					})
				})
			})
		]
	});
}
function StudentQRDialogView({ student, onClose }) {
	const qrRefVal = student.roll_no || student.id;
	const handleDownloadSVG = () => {
		const svgElement = document.getElementById("student-id-qr");
		if (!svgElement) return;
		try {
			const svgString = new XMLSerializer().serializeToString(svgElement);
			const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
			const URLStr = URL.createObjectURL(svgBlob);
			const downloadLink = document.createElement("a");
			downloadLink.href = URLStr;
			downloadLink.download = `QR_${student.name.replace(/\s+/g, "_")}.svg`;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			URL.revokeObjectURL(URLStr);
			toast.success("QR code card exported successfully");
		} catch (e) {
			toast.error("Download failed");
		}
	};
	const handlePrintCard = () => {
		const printWindow = window.open("", "_blank");
		if (!printWindow) return;
		printWindow.document.write(`
      <html>
        <head>
          <title>Student ID Code - ${student.name}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 40px; background-color: #fcfcfc; }
            .id-card { border: 2px solid #222; border-radius: 12px; padding: 25px; display: inline-block; background-color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
            h2 { margin: 0 0 4px 0; font-size: 22px; color: #111; }
            p { margin: 4px 0; color: #555; font-size: 14px; }
            .qr-container { margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="id-card">
            <h2>${student.name}</h2>
            <p>Roll / Reg No: ${qrRefVal}</p>
            <p>Dept: ${student.department || "N/A"}</p>
            <div class="qr-container">
              ${document.getElementById("student-id-qr")?.outerHTML}
            </div>
            <p style="font-size: 10px; color: #999; margin-top: 10px;">QRAttend Authorized Student ID</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          <\/script>
        </body>
      </html>
    `);
		printWindow.document.close();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-5 w-5 text-primary" }), " Student QR Card"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Generate, download, or print a secure campus registry ID check-in card." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border p-4 bg-white rounded-lg shadow-inner",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeSVG, {
					id: "student-id-qr",
					value: qrRefVal,
					size: 200,
					level: "H",
					includeMargin: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-bold text-lg",
					children: student.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground font-mono",
					children: ["Roll Number: ", qrRefVal]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 w-full pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleDownloadSVG,
					variant: "outline",
					className: "flex-1 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download SVG"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handlePrintCard,
					className: "flex-1 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Print Card"]
				})]
			})
		]
	})] });
}
//#endregion
export { StudentsPage as component };
