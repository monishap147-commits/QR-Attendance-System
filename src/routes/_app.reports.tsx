import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download, FileText, Calendar, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTaxonomy, useAttendance, type AttendanceRecord } from "@/lib/store";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — QRAttend" }] }),
  component: ReportsPage,
});

type Range = "daily" | "weekly" | "monthly" | "custom";

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - x.getDay());
  return x;
}

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

function ReportsPage() {
  const tax = useTaxonomy();
  const records = useAttendance();

  const [range, setRange] = useState<Range>("daily");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [department, setDepartment] = useState("all");
  const [subject, setSubject] = useState("all");

  const today = useMemo(() => new Date(), []);
  const [rangeFrom, rangeTo] = useMemo(() => {
    if (range === "daily") {
      const d = ymd(today);
      return [d, d];
    }
    if (range === "weekly") {
      const s = startOfWeek(today);
      const e = new Date(s); e.setDate(s.getDate() + 6);
      return [ymd(s), ymd(e)];
    }
    if (range === "monthly") {
      const s = new Date(today.getFullYear(), today.getMonth(), 1);
      const e = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return [ymd(s), ymd(e)];
    }
    return [from, to];
  }, [range, from, to, today]);

  const subjectOptions = useMemo(
    () =>
      tax.subjects
        .filter((s) => department === "all" || s.department === department)
        .map((s) => s.name),
    [tax.subjects, department],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      if (q && !`${r.studentId} ${r.studentName}`.toLowerCase().includes(q)) return false;
      if (rangeFrom && r.date < rangeFrom) return false;
      if (rangeTo && r.date > rangeTo) return false;
      if (department !== "all" && r.department !== department) return false;
      if (subject !== "all" && r.subject !== subject) return false;
      return true;
    });
  }, [records, search, rangeFrom, rangeTo, department, subject]);

  const buildRows = (rs: AttendanceRecord[]) =>
    rs.map((r) => [r.date, r.time, r.studentId, r.studentName, r.department, `Year ${r.year}`, r.subject, r.status]);

  const headers = ["Date", "Time", "Student ID", "Name", "Department", "Year", "Subject", "Status"];

  const buildCSV = () => {
    const rows = buildRows(filtered).map((row) =>
      row.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","),
    );
    return headers.join(",") + "\n" + rows.join("\n");
  };

  const buildExcel = () => {
    const head = headers.map((h) => `<th>${h}</th>`).join("");
    const body = buildRows(filtered)
      .map((row) => `<tr>${row.map((c) => `<td>${String(c ?? "")}</td>`).join("")}</tr>`)
      .join("");
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></body></html>`;
  };

  const buildPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Attendance Report", 14, 14);
    doc.setFontSize(9);
    doc.text(
      `Range: ${range} · ${rangeFrom || "—"} → ${rangeTo || "—"} · Dept: ${department} · Subject: ${subject}`,
      14, 20,
    );
    autoTable(doc, {
      startY: 26,
      head: [headers],
      body: buildRows(filtered),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 64, 175] },
    });
    return doc;
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const guard = () => {
    if (!filtered.length) { toast.error("Nothing to export"); return false; }
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
    setSearch(""); setFrom(""); setTo("");
    setDepartment("all"); setSubject("all"); setRange("daily");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance Reports</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="gap-2" onClick={exportCSV}>
            <Download className="h-4 w-4" /> CSV
          </Button>
          <Button variant="secondary" className="gap-2" onClick={exportExcel}>
            <FileSpreadsheet className="h-4 w-4" /> Excel
          </Button>
          <Button className="gap-2" onClick={exportPDF}>
            <FileText className="h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="glass-card">
        <CardContent className="p-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="space-y-1.5 xl:col-span-2">
            <Label className="text-xs">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Student name or ID…" className="pl-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">From</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input type="date" value={range === "custom" ? from : rangeFrom}
                onChange={(e) => { setRange("custom"); setFrom(e.target.value); }} className="pl-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">To</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input type="date" value={range === "custom" ? to : rangeTo}
                onChange={(e) => { setRange("custom"); setTo(e.target.value); }} className="pl-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Department</Label>
            <Select value={department} onValueChange={(v) => { setDepartment(v); setSubject("all"); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {tax.departments.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {subjectOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end justify-end xl:col-span-6">
            <Button variant="ghost" onClick={clearFilters}>Clear filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>Records</span>
            <span className="text-xs font-normal text-muted-foreground">
              {filtered.length} of {records.length}
            </span>
          </CardTitle>
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
                  <TableHead>Year</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-12">
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
                      <TableCell>Year {r.year}</TableCell>
                      <TableCell>{r.subject}</TableCell>
                      <TableCell>{r.time}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-success text-success-foreground hover:bg-success/90">{r.status}</Badge>
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
