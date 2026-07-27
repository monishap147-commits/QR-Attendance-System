import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, BookOpen, Users, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useTaxonomy,
  useStudents,
  createSubject,
  updateSubject,
  deleteSubject,
  type Subject,
} from "@/lib/store";

export const Route = createFileRoute("/_app/subjects")({
  head: () => ({ meta: [{ title: "Subjects — QRAttend" }] }),
  component: SubjectsPage,
});

const YEARS = ["1", "2", "3", "4"];

type SubjectForm = { name: string; department: string; year: string };
const emptyForm: SubjectForm = { name: "", department: "", year: "" };

function SubjectsPage() {
  const tax = useTaxonomy();
  const students = useStudents();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [form, setForm] = useState<SubjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState<(Subject & { studentCount: number }) | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const openAdd = () => {
    setEditingSubject(null);
    setForm({ ...emptyForm, department: department !== "all" ? department : "" });
    setFormOpen(true);
  };

  const openEdit = (s: Subject) => {
    setEditingSubject(s);
    setForm({ name: s.name, department: s.department, year: s.year });
    setFormOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = editingSubject
      ? await updateSubject(editingSubject, form)
      : await createSubject(form);
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

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tax.subjects
      .filter((s) => department === "all" || s.department === department)
      .filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.year.toLowerCase().includes(q),
      )
      .map((s) => ({
        ...s,
        studentCount: students.filter(
          (st) => st.subject === s.name && st.department === s.department,
        ).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tax.subjects, students, search, department]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subjects Management</h2>
          <p className="text-sm text-muted-foreground">All subjects registered in the system.</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Subject
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" /> Subject List
            </CardTitle>
            <CardDescription>
              {rows.length} of {tax.subjects.length} subjects
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by subject, department or year…"
                className="pl-9 w-64"
              />
            </div>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {tax.departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-sm text-muted-foreground py-12"
                    >
                      {tax.subjects.length === 0
                        ? "No subjects yet. Add one while registering a student."
                        : "No subjects match your search."}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((s) => (
                    <TableRow key={`${s.name}-${s.department}-${s.year}`}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.department}</TableCell>
                      <TableCell>{s.year ? `Year ${s.year}` : "—"}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="gap-1">
                          <Users className="h-3 w-3" /> {s.studentCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEdit(s)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleting({ ...s, studentCount: s.studentCount })}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={(o) => !saving && setFormOpen(o)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubject ? "Edit Subject" : "Add Subject"}</DialogTitle>
            <DialogDescription>
              {editingSubject
                ? "Update this subject's name, department or year."
                : "Create a new subject under a department and year."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject name</Label>
              <Input
                id="subject-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Data Structures"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={form.department}
                  onValueChange={(v) => setForm((f) => ({ ...f, department: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {tax.departments.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={form.year} onValueChange={(v) => setForm((f) => ({ ...f, year: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        Year {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {tax.departments.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No departments yet — add one on the Departments page first.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editingSubject ? "Save Changes" : "Add Subject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && !deletingBusy && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleting?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
              {deleting && deleting.studentCount > 0 && (
                <>
                  {" "}
                  {deleting.studentCount} student{deleting.studentCount === 1 ? "" : "s"} currently
                  reference this subject — they will remain in the system but will no longer be
                  grouped under it.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
              disabled={deletingBusy}
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
              }}
            >
              {deletingBusy && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
