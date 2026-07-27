import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Users, Plus, Trash2, Edit2, Search, QrCode, Mail, Phone, BookOpen, GraduationCap, X, Calendar, User, Download, Printer
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useTaxonomy, useStudents } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";

export const Route = createFileRoute("/_app/students")({
  head: () => ({ meta: [{ title: "Student Directory — QRAttend" }] }),
  component: StudentsPage,
});

interface Student {
  id: string;
  name: string;
  roll_no: string;
  department: string;
  year: string;
  section: string;
  email: string;
  phone: string;
  created_at?: string;
}

function StudentsPage() {
  const tax = useTaxonomy();
  
  // Local list to store direct Supabase values for instantaneous sync
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // QR Modal State
  const [qrStudent, setQrStudent] = useState<Student | null>(null);

  // Fetch student listings from database
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setStudents(data || []);
    } catch (err: any) {
      console.error("[Fetch Students] Error:", err);
      toast.error("Failed to load student directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students dynamically based on search & selectors
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDept = deptFilter === "all" || s.department === deptFilter;
      const matchYear = yearFilter === "all" || String(s.year) === yearFilter;

      return matchSearch && matchDept && matchYear;
    });
  }, [students, searchQuery, deptFilter, yearFilter]);

  const openForm = (student: Student | null = null) => {
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

  const handleSaveStudent = async (e: React.FormEvent) => {
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
      phone: phone.trim(),
    };

    try {
      if (editingStudent) {
        // Edit flow
        const { error } = await supabase
          .from("students")
          .update(payload)
          .eq("id", editingStudent.id);

        if (error) throw error;
        toast.success("Student updated successfully");
      } else {
        // Registration flow
        const { error } = await supabase
          .from("students")
          .insert({
            id: crypto.randomUUID(),
            ...payload
          });

        if (error) throw error;
        toast.success("Student registered successfully");
      }

      setIsFormOpen(false);
      fetchStudents();
    } catch (err: any) {
      console.error("[Save Student] Error:", err);
      toast.error(err.message || "Failed to commit record to database.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (id: string, sName: string) => {
    if (!confirm(`Are you sure you want to delete ${sName}?`)) return;

    try {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Student removed successfully");
      fetchStudents();
    } catch (err: any) {
      console.error("[Delete Student] Error:", err);
      toast.error(err.message || "Failed to remove student from database.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Directory</h2>
        </div>
        <Button onClick={() => openForm(null)} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Register Student
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-4 sm:p-5 grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Name, Roll Number, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-1.5">
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {tax.departments.map((d: any) => {
                  const val = typeof d === "object" ? d.id : d;
                  const name = typeof d === "object" ? d.name : d;
                  return <SelectItem key={val} value={val}>{name}</SelectItem>;
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {["1", "2", "3", "4"].map((y) => (
                  <SelectItem key={y} value={y}>Year {y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year / Sec</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    Loading student directory database records...
                  </TableCell>
                </TableRow>
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No enrolled students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.roll_no}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.department}</TableCell>
                    <TableCell>Year {s.year} {s.section ? `(${s.section})` : ""}</TableCell>
                    <TableCell className="text-xs">{s.email}</TableCell>
                    <TableCell className="text-xs">{s.phone || "N/A"}</TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-1.5 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQrStudent(s)}
                        title="Generate QR ID"
                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openForm(s)}
                        title="Edit Details"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStudent(s.id, s.name)}
                        title="Delete Student"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* REGISTRATION FORM DIALOG */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Modify Student Details" : "Register New Student"}</DialogTitle>
            <DialogDescription>
              Complete the profile fields to register the student onto the campus directory database.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveStudent} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="name" className="text-xs">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rollNo" className="text-xs">Register / Roll Number *</Label>
                <Input
                  id="rollNo"
                  placeholder="e.g. STU1001"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dept" className="text-xs">Department *</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="dept">
                    <SelectValue placeholder="Pick Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {tax.departments.map((d: any) => {
                      const val = typeof d === "object" ? d.id : d;
                      const name = typeof d === "object" ? d.name : d;
                      return <SelectItem key={val} value={val}>{name}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="year" className="text-xs">Academic Year *</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Pick Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4"].map((y) => (
                      <SelectItem key={y} value={y}>Year {y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sec" className="text-xs">Section / Division</Label>
                <Input
                  id="sec"
                  placeholder="e.g. A, B"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="email" className="text-xs">University Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : editingStudent ? "Save Changes" : "Register Student"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* PRINTABLE QR CARD DIALOG */}
      <Dialog open={!!qrStudent} onOpenChange={(open) => !open && setQrStudent(null)}>
        <DialogContent className="sm:max-w-md">
          {qrStudent && (
            <StudentQRDialogView student={qrStudent} onClose={() => setQrStudent(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// =========================================================================
// PRINTABLE ID QR DIALOG VIEW
// =========================================================================
function StudentQRDialogView({ student, onClose }: { student: Student; onClose: () => void }) {
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
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" /> Student QR Card
        </DialogTitle>
        <DialogDescription>
          Generate, download, or print a secure campus registry ID check-in card.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="border p-4 bg-white rounded-lg shadow-inner">
          <QRCodeSVG
            id="student-id-qr"
            value={qrRefVal}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="text-center space-y-1">
          <h4 className="font-bold text-lg">{student.name}</h4>
          <p className="text-xs text-muted-foreground font-mono">Roll Number: {qrRefVal}</p>
        </div>

        <div className="flex gap-2 w-full pt-2">
          <Button onClick={handleDownloadSVG} variant="outline" className="flex-1 gap-2">
            <Download className="h-4 w-4" /> Download SVG
          </Button>
          <Button onClick={handlePrintCard} className="flex-1 gap-2">
            <Printer className="h-4 w-4" /> Print Card
          </Button>
        </div>
      </div>
    </>
  );
}