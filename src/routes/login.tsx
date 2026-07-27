import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ScanFace, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Smart QR Attendance" },
      { name: "description", content: "Secure admin login for the Smart QR Attendance Management System." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const signIn = await supabase.auth.signInWithPassword({ email, password });
      let session = signIn.data.session;
      let error = signIn.error;

      // First-time setup: if no account exists yet, create one (single-tenant admin tool)
      if (error && /invalid login credentials/i.test(error.message)) {
        const signUp = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (signUp.error) {
          error = signUp.error;
        } else if (signUp.data.session) {
          session = signUp.data.session;
          error = null;
          toast.success("Admin account created");
        } else {
          const retry = await supabase.auth.signInWithPassword({ email, password });
          session = retry.data.session;
          error = retry.error;
          if (!error) toast.success("Admin account created");
        }
      }

      if (error) {
        toast.error(error.message || "Sign-in failed");
        return;
      }
      if (!session) {
        toast.error("Email confirmation required. Check your inbox to finish sign-up.");
        return;
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error("[login] unexpected error", err);
      toast.error(err instanceof Error ? err.message : "Unexpected error during sign-in");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background">
      <section
        className="hidden lg:flex relative overflow-hidden items-center justify-center p-12"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center ring-1 ring-white/20">
              <ScanFace className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">QR Attendance</p>
              <p className="text-xs opacity-80">Smart College Attendance</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">Smart QR
             Attendance Management</h1>
          <p className="text-base opacity-90 leading-relaxed mb-8">
            Automate classroom attendance with  secure QR verification
          </p>

          <ul className="space-y-3 text-sm">
            {[
              { icon: ShieldCheck, text: "Secure, role-based admin access" },
              { icon: Zap, text: " Real-time QR attendance tracking" },
              { icon: Sparkles, text: "Student and subject management" },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-md bg-white/15 grid place-items-center ring-1 ring-white/20">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="opacity-95">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 -z-10 lg:hidden overflow-hidden">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-primary)" }} />
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div
              className="h-10 w-10 rounded-lg grid place-items-center text-primary-foreground shadow-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              <ScanFace className="h-5 w-5" />
            </div>
            <span className="font-semibold">QRAttend</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your admin account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@college.edu" className="pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={show ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" className="pl-9 pr-9" />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground select-none">
              <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
              Remember me for 30 days
            </label>
          </div>

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? "Signing in..." : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure QR Attendance System · Authorized admin access only
          </p>
        </form>
      </section>
    </main>
  );
}
