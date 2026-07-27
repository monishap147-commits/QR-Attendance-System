import React, { useState, useEffect, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { createFileRoute } from '@tanstack/react-router';
import {
  QrCode,
  Camera,
  Play,
  Square,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Clock,
  BookOpen,
  Building,
  GraduationCap,
  FileText,
  BarChart3,
  Download,
  Search,
  Check,
  User,
  LayoutDashboard,
  Printer,
  X,
  UserPlus,
  Trash2
} from 'lucide-react';
// --- Interfaces ---
export interface Department {
  id: string;
  name: string;
}

export interface YearOption {
  id: string;
  label: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  department: string;
  year: string;
  email?: string;
  qrCodeUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  year: string;
  subject: string;
  timestamp: string;
  date: string;
  status: 'PRESENT' | 'LATE';
}

export interface SessionStats {
  totalEnrolled: number;
  totalPresent: number;
  totalAbsent: number;
  attendanceRate: number;
}

interface NotificationState {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const QRAttendanceContent: React.FC = () => {
  // --- Navigation Tab State ---
  const [activeTab, setActiveTab] = useState<'live' | 'records' | 'reports' | 'students' | 'dashboard'>('live');

  // --- Dynamic Configuration Dropdown States ---
  const [departments, setDepartments] = useState<Department[]>([]);
  const [years, setYears] = useState<YearOption[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  // --- Session Controls ---
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);
  const [sessionDepartmentName, setSessionDepartmentName] = useState<string>('');
  const [sessionYear, setSessionYear] = useState<string>('');

  // --- QR Scanner States ---
  // --- Session QR (Dynamic) States ---
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionQRImageUrl, setSessionQRImageUrl] = useState<string | null>(null);
  const [sessionExpiryTime, setSessionExpiryTime] = useState<Date | null>(null);
  const [nowTick, setNowTick] = useState<number>(Date.now());
  const [manualInput, setManualInput] = useState<string>('');
  const isProcessingScanRef = useRef<boolean>(false);
  const scannedIdsRef = useRef<Set<string>>(new Set());

  const QR_EXPIRY_MINUTES = 20;

  // --- Dynamic Registered Students & Attendance State ---
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(true);
  const [liveAttendanceList, setLiveAttendanceList] = useState<AttendanceRecord[]>([]);
  const [allAttendanceRecords, setAllAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [scannedStudentIds, setScannedStudentIds] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentForQRCard, setSelectedStudentForQRCard] = useState<Student | null>(null);

  // Auto dismiss toast notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Load dynamic configuration & registered students from Supabase on mount
useEffect(() => {
  fetchDepartments();
  fetchSubjects();
  fetchYears();
  fetchRegisteredStudents();
  fetchAttendanceHistory();
}, []);

  // Tick every second while a session QR is active so the expiry countdown stays live
  useEffect(() => {
    if (!isSessionActive || !sessionExpiryTime) return;
    const interval = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [isSessionActive, sessionExpiryTime]);

  // --- Fetch Departments from Supabase ---
  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase.from('departments').select('*');
      if (error) {
        console.error('[Supabase] departments fetch error:', error.code, error.message, error.hint);
        return;
      }
      if (data) {
        const mapped: Department[] = data.map((d: any) => ({
          id: String(d.id ?? d.code ?? d.department_id ?? ''),
          name: String(d.name ?? d.department_name ?? d.title ?? d.id ?? '')
        }));
        setDepartments(mapped);
        if (mapped.length > 0) {
          setSelectedDepartment(mapped[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  // --- Fetch Subjects from Supabase ---
  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase.from('subjects').select('*');
      if (error) {
        console.error('[Supabase] subjects fetch error:', error.code, error.message, error.hint);
        return;
      }
      if (data) {
        const mapped: Subject[] = data.map((s: any) => ({
          id: String(s.id ?? s.code ?? s.subject_code ?? ''),
          name: String(s.name ?? s.subject_name ?? s.title ?? ''),
          code: String(s.code ?? s.subject_code ?? s.id ?? '')
        }));
        setSubjects(mapped);
        if (mapped.length > 0) {
          setSelectedSubject(mapped[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };
  const fetchYears = async () => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('year');

    if (error) {
      console.error('Year fetch error:', error.message);
      setYears([]);
      return;
    }

    const uniqueYears = Array.from(
      new Set(data.map((s: any) => s.year))
    );

    const mapped = uniqueYears.map((yr) => ({
      id: yr,
      label: yr
    }));

    setYears(mapped);

    if (mapped.length > 0) {
      setSelectedYear(mapped[0].id);
    }
  } catch (err) {
    console.error(err);
    setYears([]);
  }
};
  // --- Fetch Registered Students Exclusively from Supabase 'students' Table ---
  const fetchRegisteredStudents = async () => {
    setIsLoadingStudents(true);

    try {
      const { data, error } = await supabase
        .from("students")
        .select("*");

      if (error) {
        console.error("[Supabase] students fetch error:", error.code, error.message, error.hint);
        setStudents([]);
        setIsLoadingStudents(false);
        return;
      }

      console.log(`[Supabase] students rows returned: ${data?.length ?? 0}`);

      if (data && data.length > 0) {
        const mappedStudents: Student[] = data.map((s: any) => {
          const studentIdVal = String(s.roll_no ?? s.student_id ?? s.studentId ?? s.id ?? '').trim();
          return {
            id: String(s.id ?? studentIdVal),
            studentId: studentIdVal,
            name: s.name ?? s.student_name ?? s.full_name ?? 'Unknown Student',
            department: s.department ?? s.dept ?? s.department_name ?? 'N/A',
            year: s.year ?? s.academic_year ?? 'N/A',
            email: s.email ?? '',
            qrCodeUrl: s.qr_code_url ?? s.qrCodeUrl ?? ''
          };
        });
        setStudents(mappedStudents);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error("Failed to query Supabase students table:", err);
      setStudents([]);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // --- Fetch Attendance Log ---
  const fetchAttendanceHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mappedRecords: AttendanceRecord[] = data.map((rec: any) => ({
  id: rec.id || `ATT-${Date.now()}`,
  studentId: rec.student_id || rec.studentId,
  studentName: rec.student_name || rec.studentName || 'Student',
  department: rec.department || '',
  year: rec.year || '',
  subject: rec.subject || '',
  timestamp: rec.time || rec.timestamp || '',
  date: rec.date || '',
  status: rec.status || 'PRESENT'
}));
        setAllAttendanceRecords(mappedRecords);
      }
    } catch (err) {
      console.warn('Attendance logs fetch warning:', err);
    }
  };
  // --- Delete Attendance Record ---
  const handleDeleteRecord = async (recordId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this attendance record?');
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('attendance_records')
        .delete()
        .eq('id', recordId);

      if (error) {
        console.error('[Supabase] attendance delete error:', error.code, error.message, error.hint);
        setNotification({
          type: 'error',
          message: `Failed to delete record: ${error.message}`
        });
        return;
      }

      setAllAttendanceRecords((prev) => prev.filter((r) => r.id !== recordId));
      

      setNotification({
        type: 'success',
        message: 'Attendance record deleted successfully.'
      });

      fetchAttendanceHistory();
    } catch (err) {
      console.error('Failed to delete attendance record:', err);
      setNotification({
        type: 'error',
        message: 'An unexpected error occurred while deleting the record.'
      });
    }
  };

      
// --- Generate a fresh Daily Dynamic Session QR ---
  const generateSessionQR = () => {
    const newSessionId =
      (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        ? crypto.randomUUID()
        : `SESSION-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const expiry = new Date(Date.now() + QR_EXPIRY_MINUTES * 60 * 1000);
    const today = new Date().toISOString().split('T')[0];
    const subjectName = subjects.find((s) => s.id === selectedSubject)?.name || selectedSubject;
    const departmentName = departments.find((d) => d.id === selectedDepartment)?.name || selectedDepartment;

    const checkInUrl = new URL(window.location.origin + window.location.pathname);
    checkInUrl.searchParams.set('session', newSessionId);
    checkInUrl.searchParams.set('date', today);
    checkInUrl.searchParams.set('subject', selectedSubject);
    checkInUrl.searchParams.set('subjectName', subjectName);
    checkInUrl.searchParams.set('department', selectedDepartment);
    checkInUrl.searchParams.set('departmentName', departmentName);
    checkInUrl.searchParams.set('year', selectedYear);
    checkInUrl.searchParams.set('expiry', expiry.toISOString());

    scannedIdsRef.current = new Set();
    setSessionId(newSessionId);
    setSessionExpiryTime(expiry);
    setSessionQRImageUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(checkInUrl.toString())}`
    );
    setNowTick(Date.now());
  };

  // --- Verify Scanned QR Against Supabase Students ---
  const handleQRScanSuccess = async (scannedData: string) => {
    if (!isSessionActive) {
      setNotification({
        type: 'warning',
        message: 'No active session. Please start session first.'
      });
      return;
    }

    if (isProcessingScanRef.current) {
      return;
    }

    let extractedId = scannedData.trim();
    try {
      if (extractedId.startsWith('{') && extractedId.endsWith('}')) {
        const parsed = JSON.parse(extractedId);
        if (parsed && typeof parsed === 'object') {
          extractedId = String(parsed.student_id || parsed.studentId || parsed.id || extractedId).trim();
        }
      }
    } catch (e) {
      // Raw string format
    }

    const cleanedScannedId = extractedId.trim().toLowerCase();

    if (scannedIdsRef.current.has(cleanedScannedId)) {
      return;
    }

    isProcessingScanRef.current = true;

    try {
      const normalize = (val: string) => val.trim().toLowerCase().replace(/\s+/g, '');
      const matchedStudent = students.find((s) => {
        const dbStudentId = normalize(String(s.studentId || s.id || ''));
        return dbStudentId === normalize(cleanedScannedId);
      });

      if (!matchedStudent) {
        setNotification({
          type: 'error',
          message: `Access Denied: Student ID "${extractedId}" is not in the registered students database!`
        });
        return;
      }

      // Enforce that the student belongs to the session's Department and Year
      const studentDeptMatches = normalize(matchedStudent.department || '') === normalize(sessionDepartmentName || '');
      const studentYearMatches = normalize(matchedStudent.year || '') === normalize(sessionYear || '');

      if (!studentDeptMatches || !studentYearMatches) {
        setNotification({
          type: 'error',
          message: 'Student not registered for this Department and Year.'
        });
        return;
      }

      scannedIdsRef.current.add(cleanedScannedId);

      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const formattedDate = now.toISOString().split('T')[0];
      const subjectName = subjects.find((s) => s.id === selectedSubject)?.name || selectedSubject;

      const newRecord: AttendanceRecord = {
        id: `ATT-${Date.now()}`,
        studentId: matchedStudent.studentId,
        studentName: matchedStudent.name,
        department: matchedStudent.department,
        year: matchedStudent.year,
        subject: subjectName,
        timestamp: formattedTime,
        date: formattedDate,
        status: 'PRESENT'
      };


        
          const { error: insertError } = await supabase.from('attendance_records').insert([
        {
          session_id: sessionId ?? '',
          student_id: matchedStudent.studentId,
          student_name: matchedStudent.name,
          department: matchedStudent.department,
          year: matchedStudent.year,
          subject: subjectName,
          time: formattedTime,
          date: formattedDate,
          status: 'Present'
        }
      ]);
          

      if (insertError) {
        console.error('[Supabase] attendance insert error:', insertError.code, insertError.message, insertError.hint);
        scannedIdsRef.current.delete(cleanedScannedId);
        setNotification({
          type: 'error',
          message: `Failed to save attendance for ${matchedStudent.name}: ${insertError.message}`
        });
        return;
      }

      setLiveAttendanceList((prev) => [newRecord, ...prev]);
      setAllAttendanceRecords((prev) => [newRecord, ...prev]);
      setScannedStudentIds((prev) => new Set(prev).add(cleanedScannedId));

      setNotification({
        type: 'success',
        message: `Verified: Attendance saved for ${matchedStudent.name} (${matchedStudent.studentId})!`
      });
    } finally {
      isProcessingScanRef.current = false;
    }
  };

  // --- Session Controls ---
  const handleStartSession = () => {
    if (students.length === 0) {
      setNotification({
        type: 'warning',
        message: 'No registered students found in database. Please register students first.'
      });
  }

    const activeDepartmentName = departments.find((d) => d.id === selectedDepartment)?.name || selectedDepartment;

    setIsSessionActive(true);
    setSessionStartTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setSessionDepartmentName(activeDepartmentName);
    setSessionYear(selectedYear);
    generateSessionQR();
    setNotification({
      type: 'info',
      message: 'Attendance Session Started. Share the Session QR Code with students to check in.'
    });
  };

  const handleStopSession = async () => {
    setIsSessionActive(false);
    setSessionId(null);
    setSessionQRImageUrl(null);
    setSessionExpiryTime(null);
    setNotification({
      type: 'info',
      message: 'Attendance Session Stopped.'
    });
  };

  const handleManualScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    handleQRScanSuccess(manualInput.trim());
    setManualInput('');
  };

  // --- Statistics ---
  const totalEnrolled = students.length;
  const totalPresent = liveAttendanceList.length;
  const totalAbsent = Math.max(0, totalEnrolled - totalPresent);
  const attendanceRate = totalEnrolled > 0 ? Math.round((totalPresent / totalEnrolled) * 100) : 0;

  const stats: SessionStats = {
    totalEnrolled,
    totalPresent,
    totalAbsent,
    attendanceRate
  };

  const filteredLiveRecords = liveAttendanceList.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAllRecords = allAttendanceRecords.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8">
      {/* Page Header */}
      <header className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <QrCode className="w-8 h-8 text-blue-600" />
            QR Attendance
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time QR scanner linked directly with Registered Students Store
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={() => {
              fetchDepartments();
              fetchSubjects();
              fetchYears();
              fetchRegisteredStudents();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors"
          >
            Refresh Data
          </button>
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
            isSessionActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isSessionActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
            {isSessionActive ? `Session Active (${sessionStartTime})` : 'Session Inactive'}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="mb-6 flex flex-wrap gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'live' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border'
          }`}
        >
          <QrCode className="w-4 h-4" />
          Live QR Attendance
        </button>

        <button
          onClick={() => setActiveTab('records')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'records' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border'
          }`}
        >
          <Clock className="w-4 h-4" />
          Attendance Records
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'reports' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border'
          }`}
        >
          <FileText className="w-4 h-4" />
          Reports
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'students' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border'
          }`}
        >
          <Users className="w-4 h-4" />
          Students & QR Cards ({students.length})
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
      </nav>

      {/* Notifications */}
      {notification && (
        <div className={`mb-6 p-4 rounded-xl flex items-center justify-between shadow-sm border ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' :
          notification.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
          notification.type === 'warning' ? 'bg-amber-50 text-amber-800 border-amber-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
            {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
            {notification.type === 'info' && <Clock className="w-5 h-5 text-blue-600" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* LIVE QR ATTENDANCE TAB */}
      {activeTab === 'live' && (
        <div className="space-y-8">
          
          {/* Session Configuration */}
          <section className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Session Setup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-gray-400" />
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  disabled={isSessionActive}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-60"
                >
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))
                  ) : (
                    <option value="">No departments available</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  Academic Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={isSessionActive}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-60"
                >
                  {years.length > 0 ? (
                    years.map((yr) => (
                      <option key={yr.id} value={yr.id}>{yr.label}</option>
                    ))
                  ) : (
                    <option value="">No years available</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isSessionActive}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-60"
                >
                  {subjects.length > 0 ? (
                    subjects.map((subj) => (
                      <option key={subj.id} value={subj.id}>
                        {subj.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No subjects available</option>
                  )}
                
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t">
              {!isSessionActive ? (
                <button
                  onClick={handleStartSession}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Session
                </button>
              ) : (
                <button
                  onClick={handleStopSession}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow transition-colors"
                >
                  <Square className="w-4 h-4 fill-current" />
                  Stop Session
                </button>
              )}
            </div>
          </section>

          {/* Grid Layout: QR Scanner & Live Feed Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: QR Scanner */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    Session QR Code
                  </h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    isSessionActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isSessionActive ? 'QR Active' : 'Session Inactive'}
                  </span>
                </div>

                <div className="relative bg-gray-900 rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center border border-gray-800">
                  {isSessionActive && sessionQRImageUrl ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="bg-white p-3 rounded-xl shadow-inner">
                        <img src={sessionQRImageUrl} alt="Session Attendance QR Code" className="w-48 h-48" />
                      </div>
                      <p className="text-xs text-gray-300 mt-4 font-mono">Session ID: {sessionId?.slice(0, 13)}...</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
                      <QrCode className="w-16 h-16 text-gray-500 mb-3" />
                      <p className="font-semibold text-base text-gray-300">No active Session QR</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-xs">
                        Start a session to generate today's unique attendance QR code.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={generateSessionQR}
                    disabled={!isSessionActive}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow disabled:opacity-50 transition-colors"
                  >
                    Regenerate QR Code
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Manual Student ID Entry
                  </label>
                  <form onSubmit={handleManualScanSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter registered Student ID..."
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      disabled={!isSessionActive}
                      className="flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!isSessionActive || !manualInput.trim()}
                      className="px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
                    >
                      Verify & Save
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Session Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs font-medium text-blue-600 uppercase">Registered</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{stats.totalEnrolled}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs font-medium text-green-600 uppercase">Present</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">{stats.totalPresent}</p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-xs font-medium text-red-600 uppercase">Absent</p>
                    <p className="text-2xl font-bold text-red-900 mt-1">{stats.totalAbsent}</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <p className="text-xs font-medium text-purple-600 uppercase">Rate</p>
                    <p className="text-2xl font-bold text-purple-900 mt-1">{stats.attendanceRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Feed Table */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4 gap-4">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Live Attendance Feed
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Scanned records for current active session
                    </p>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search live scans..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b text-gray-500 text-xs uppercase font-semibold">
                        <th className="py-3 px-4">Student ID</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Department</th>
                        <th className="py-3 px-4">Time Marked</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredLiveRecords.length > 0 ? (
                        filteredLiveRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 font-mono text-xs font-bold text-gray-900">{record.studentId}</td>
                            <td className="py-3 px-4 font-medium text-gray-800">{record.studentName}</td>
                            <td className="py-3 px-4 text-gray-500 text-xs">{record.department}</td>
                            <td className="py-3 px-4 text-gray-500 text-xs font-mono">{record.timestamp}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                <Check className="w-3 h-3" />
                                PRESENT
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-gray-400">
                            <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                            <p className="text-sm font-medium">No live QR scans recorded yet</p>
                            <p className="text-xs mt-1 text-gray-400">
                              Start session and scan registered student QR codes to view live updates.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ATTENDANCE RECORDS TAB */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">All Attendance Records</h2>
              <p className="text-xs text-gray-500">Historical QR attendance logs</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs bg-gray-50 border rounded-lg w-full sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-500 text-xs uppercase font-semibold">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAllRecords.length > 0 ? (
                  filteredAllRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-xs text-gray-500">{r.date}</td>
                      <td className="py-3 px-4 font-mono text-xs font-bold">{r.studentId}</td>
                      <td className="py-3 px-4 font-medium">{r.studentName}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">{r.subject}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{r.department}</td>
                      <td className="py-3 px-4 font-mono text-xs text-gray-500">{r.timestamp}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteRecord(r.id)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800">Attendance Reports & Export</h2>
            <p className="text-xs text-gray-500">Export attendance sheets and verify registered database metrics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-gray-50 border rounded-xl">
              <h4 className="text-sm font-semibold text-gray-700">Total Scans Recorded</h4>
              <p className="text-3xl font-bold text-blue-600 mt-2">{allAttendanceRecords.length}</p>
            </div>
            <div className="p-5 bg-gray-50 border rounded-xl">
              <h4 className="text-sm font-semibold text-gray-700">Registered Database Students</h4>
              <p className="text-3xl font-bold text-green-600 mt-2">{students.length}</p>
            </div>
            <div className="p-5 bg-gray-50 border rounded-xl">
              <h4 className="text-sm font-semibold text-gray-700">Configured Subjects</h4>
              <p className="text-3xl font-bold text-purple-600 mt-2">{subjects.length}</p>
            </div>
          </div>

          <div className="flex justify-start gap-4">
            <button 
              onClick={() => alert('Exporting CSV report...')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV Report
            </button>
          </div>
        </div>
      )}

      {/* REGISTERED STUDENTS & QR CARDS TAB */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Registered Students Directory</h2>
              <p className="text-xs text-gray-500">
                Loaded directly from Student Registration database/store
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search registered students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs bg-gray-50 border rounded-lg w-full sm:w-56"
              />
            </div>
          </div>

          {isLoadingStudents ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-10 h-10 mx-auto animate-pulse text-blue-500 mb-2" />
              <p className="text-sm font-medium">Loading registered students...</p>
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((st) => (
                <div key={st.id || st.studentId} className="border rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between bg-gray-50/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{st.name}</h3>
                      <p className="text-xs font-mono text-blue-600 font-medium">{st.studentId}</p>
                      <p className="text-xs text-gray-500 mt-1">{st.department}</p>
                      {st.year && <p className="text-xs text-gray-400">{st.year}</p>}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <button
                      onClick={() => setSelectedStudentForQRCard(st)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <QrCode className="w-4 h-4" />
                      View Student QR Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-40 text-gray-500" />
              <p className="text-base font-semibold text-gray-700">No registered students found</p>
              <p className="text-xs mt-1 text-gray-500 max-w-sm mx-auto">
                Please add students in Student Registration. Registered students will automatically appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs font-semibold uppercase text-gray-400">Database Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs font-semibold uppercase text-gray-400">Live Session Present</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{liveAttendanceList.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs font-semibold uppercase text-gray-400">Live Attendance Rate</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{attendanceRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs font-semibold uppercase text-gray-400">Historical Scans Logged</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{allAttendanceRecords.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REGISTERED STUDENT QR CARD */}
      {selectedStudentForQRCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border relative">
            <button
              onClick={() => setSelectedStudentForQRCard(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="inline-block p-2 bg-blue-50 rounded-xl mb-3">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Student Attendance Pass</h3>
              <p className="text-xs text-gray-500">Scan code during active sessions</p>

              <div className="my-6 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl inline-block shadow-inner">
                <img
                  src={selectedStudentForQRCard.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(selectedStudentForQRCard.studentId)}`}
                  alt={`QR Code for ${selectedStudentForQRCard.name}`}
                  className="w-44 h-44 mx-auto"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-left space-y-1 text-xs">
                <p><span className="font-semibold text-gray-700">Name:</span> {selectedStudentForQRCard.name}</p>
                <p><span className="font-semibold text-gray-700">Student ID:</span> {selectedStudentForQRCard.studentId}</p>
                <p><span className="font-semibold text-gray-700">Department:</span> {selectedStudentForQRCard.department}</p>
                {selectedStudentForQRCard.year && <p><span className="font-semibold text-gray-700">Year:</span> {selectedStudentForQRCard.year}</p>}
              </div>

              <button
                onClick={() => window.print()}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Student QR Card
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
   );
};

export const Route = createFileRoute("/_app/attendance")({
  component: QRAttendanceContent,
});