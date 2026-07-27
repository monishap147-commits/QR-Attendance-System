import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, CalendarCheck, ScanFace,Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { useAttendance, useTaxonomy,deleteAttendanceRecord } from "@/lib/store";

export const Route = createFileRoute("/_app/attendance-records")({
  head: () => ({ meta: [{ title: "Attendance Records — QRAttend" }] }),
  component: AttendanceRecordsPage,
});

function AttendanceRecordsPage() {
  const records = useAttendance();
  const tax = useTaxonomy();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      if (q && !`${r.studentId} ${r.studentName}`.toLowerCase().includes(q)) return false;
      if (department !== "all" && r.department !== department) return false;
      if (date && r.date !== date) return false;
      return true;
    });
  }, [records, search, department, date]);

  const todaysCount = records.filter((r) => r.date === today).length;

  const handleDeleteRecord = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this attendance record?");
    if (!confirmed) return;

    try {
      await deleteAttendanceRecord(id);
    } catch (err) {
      console.error("Failed to delete attendance record:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance Records</h2>
          <p className="text-sm text-muted-foreground">
            All face-recognition check-ins. {todaysCount} recorded today.
          </p>
        </div>
        <Button asChild size="sm" className="gap-2">
          <Link to="/attendance">
            <ScanFace className="h-4 w-4" /> Start a session
          </Link>
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-primary" /> Records
            </CardTitle>
            <CardDescription>
              {filtered.length} of {records.length} records
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Student name or ID…"
                className="pl-9 w-56"
              />
            </div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-40"
            />
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
                  <TableHead>Date</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-sm text-muted-foreground py-12"
                    >
                      No records found. Records will appear here after attendance sessions.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.date}</TableCell>
                      <TableCell className="font-mono text-xs">{r.studentId}</TableCell>
                      <TableCell className="font-medium">{r.studentName}</TableCell>
                      <TableCell>{r.department}</TableCell>
                      <TableCell>{r.subject}</TableCell>
                      <TableCell>{r.time}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-success text-success-foreground hover:bg-success/90">
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRecord(r.id)}
                          className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
