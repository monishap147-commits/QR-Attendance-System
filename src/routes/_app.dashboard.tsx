import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Users,
  CalendarCheck,
  BookOpen,
  UserPlus,
  ScanFace,
  FileBarChart,
  ArrowUpRight,
  TrendingUp,
  Percent,
  Building2,
  Activity,
  CheckCircle2,
  Camera,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAttendance, useStudents, useTaxonomy, useCollege } from "@/lib/store";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — QRAttend" }] }),
  component: Dashboard,
});

const actions = [
  {
    title: "Register Student",
    desc: "Enroll a new student with face capture",
    to: "/students",
    icon: UserPlus,
  },
  {
    title: "Start Attendance",
    desc: "Begin a live face recognition session",
    to: "/attendance",
    icon: ScanFace,
  },
  {
    title: "View Reports",
    desc: "Browse and export attendance records",
    to: "/reports",
    icon: FileBarChart,
  },
] as const;

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Dashboard() {
  const students = useStudents();
  const attendance = useAttendance();
  const tax = useTaxonomy();
  const college = useCollege();
  const now = useNow();

  const today = now.toISOString().slice(0, 10);
  const todays = attendance.filter((a) => a.date === today);

  const totalSessions = new Set(attendance.map((a) => `${a.date}-${a.subject}`)).size || 1;
  const attendancePct = students.length
    ? Math.min(100, Math.round((attendance.length / (students.length * totalSessions)) * 100))
    : 0;

  const stats = [
    {
      label: "Total Students",
      value: students.length,
      icon: Users,
      tone: "bg-primary/10 text-primary",
      to: "/students",
    },
    {
      label: "Today's Attendance",
      value: todays.length,
      icon: CalendarCheck,
      tone: "bg-success/15 text-success",
      to: "/attendance-records",
    },
    {
      label: "Total Departments",
      value: tax.departments.length,
      icon: Building2,
      tone: "bg-accent/20 text-accent-foreground",
      to: "/departments",
    },
    {
      label: "Total Subjects",
      value: tax.subjects.length,
      icon: BookOpen,
      tone: "bg-warning/15 text-warning-foreground",
      to: "/subjects",
    },
    {
      label: "Attendance %",
      value: `${attendancePct}%`,
      icon: Percent,
      tone: "bg-primary/10 text-primary",
      to: "/reports",
    },
  ] as const;

  const weekly = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      return {
        day: d.toLocaleDateString(undefined, { weekday: "short" }),
        present: attendance.filter((a) => a.date === key).length,
      };
    });
  }, [attendance]);

  const monthly = useMemo(() => {
    const months: { month: string; present: number }[] = [];
      for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.push({
        month: d.toLocaleDateString(undefined, { month: "short" }),
        present: attendance.filter((a) => a.date.startsWith(ym)).length,
      });
    }
    return months;
  }, [attendance]);

  const recent = attendance.slice(0, 6);
  const hasData = attendance.length > 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-5 sm:p-6 grid gap-4 sm:grid-cols-[auto_1fr_auto] items-center">
          <div
            className="h-14 w-14 shrink-0 rounded-2xl grid place-items-center shadow-md overflow-hidden"
            style={{ background: college.logo ? undefined : "var(--gradient-primary)" }}
          >
            {college.logo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={college.logo} alt="" className="h-full w-full object-cover" />
            ) : (
              <ScanFace className="h-7 w-7 text-primary-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
              <span className="gradient-text">{college.name || "QRAttend"}</span>
            </h2>
            
            <p>{college.address}</p>
<p>{college.email}</p>
<p>{college.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 justify-end">
              <Clock className="h-3.5 w-3.5" />
              {now.toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-lg font-bold font-mono tracking-tight mt-0.5">
              {now.toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="group block" aria-label={`View ${s.label}`}>
            <Card className="glass-card overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all group-hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                      {s.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2">{s.value}</p>
                  </div>
                  <div
                    className={`h-10 w-10 shrink-0 rounded-lg grid place-items-center ${s.tone}`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((a) => (
            <Link key={a.to} to={a.to} className="group">
              <Card className="glass-card hover:border-primary/40 transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg h-full">
                <CardContent className="p-5 flex items-start gap-3">
                  <div
                    className="h-11 w-11 shrink-0 rounded-lg grid place-items-center text-primary-foreground shadow-md"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{a.title}</p>
                  
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Open{" "}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Weekly Attendance
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pl-0">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="weekFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="url(#weekFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmpty />
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent-foreground" /> Monthly Attendance
            </CardTitle>
            <CardDescription>Last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pl-0">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="present" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmpty />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Attendance Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-14 w-14 rounded-full bg-muted grid place-items-center mb-3">
                <Camera className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium">No attendance yet</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Start a recognition session to see live check-ins here.
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link to="/attendance">Start session</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {recent.map((r) => (
                <li key={r.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="h-9 w-9 rounded-full bg-success/15 text-success grid place-items-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{r.studentName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {r.subject} · {r.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{r.time}</p>
                    <Badge variant="secondary" className="text-[10px] mt-0.5">
                      {r.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ChartEmpty() {
  return (
    <div className="h-full grid place-items-center text-center px-6">
      <div>
        <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-muted grid place-items-center">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">No data yet</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Chart will populate once attendance is recorded.
        </p>
      </div>
    </div>
  );
}
