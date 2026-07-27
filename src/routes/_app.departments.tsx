import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Building2, Users, BookOpen, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useTaxonomy,
  useStudents,
  createDepartment,
  renameDepartment,
  deleteDepartment,
} from "@/lib/store";

export const Route = createFileRoute("/_app/departments")({
  head: () => ({ meta: [{ title: "Departments — QRAttend" }] }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  const tax = useTaxonomy();
  const students = useStudents();
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState<{ name: string; subjectCount: number; studentCount: number } | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const openAdd = () => {
    setEditingName(null);
    setNameInput("");
    setFormOpen(true);
  };

  const openEdit = (name: string) => {
    setEditingName(name);
    setNameInput(name);
    setFormOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = editingName
      ? await renameDepartment(editingName, nameInput)
      : await createDepartment(nameInput);
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

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tax.departments
      .filter((d) => !q || d.toLowerCase().includes(q))
      .map((d) => ({
        name: d,
        subjectCount: tax.subjects.filter((s) => s.department === d).length,
        studentCount: students.filter((s) => s.department === d).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tax.departments, tax.subjects, students, search]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Departments</h2>
          <p className="text-sm text-muted-foreground">All academic departments in the system.</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Department
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" /> Department List
            </CardTitle>
            <CardDescription>
              {rows.length} of {tax.departments.length} departments
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments…"
              className="pl-9 w-64"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-sm text-muted-foreground py-12"
                    >
                      {tax.departments.length === 0
                        ? "No departments yet. Add one while registering a student or subject."
                        : "No departments match your search."}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((d) => (
                    <TableRow key={d.name}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-accent/20 text-accent-foreground grid place-items-center shrink-0">
                          <Building2 className="h-4 w-4" />
                        </div>
                        {d.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1">
                          <BookOpen className="h-3 w-3" /> {d.subjectCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="gap-1">
                          <Users className="h-3 w-3" /> {d.studentCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEdit(d.name)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() =>
                              setDeleting({
                                name: d.name,
                                subjectCount: d.subjectCount,
                                studentCount: d.studentCount,
                              })
                            }
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
            <DialogTitle>{editingName ? "Edit Department" : "Add Department"}</DialogTitle>
            <DialogDescription>
              {editingName
                ? "Rename this department. Existing subjects and students will follow the new name."
                : "Create a new academic department."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="dept-name">Department name</Label>
            <Input
              id="dept-name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Computer Science"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void handleSave();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editingName ? "Save Changes" : "Add Department"}
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
              {deleting && (deleting.subjectCount > 0 || deleting.studentCount > 0) && (
                <>
                  {" "}
                  This department currently has {deleting.subjectCount} subject
                  {deleting.subjectCount === 1 ? "" : "s"} and {deleting.studentCount} student
                  {deleting.studentCount === 1 ? "" : "s"} linked to it — they will remain in the
                  system but will no longer be grouped under this department.
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
