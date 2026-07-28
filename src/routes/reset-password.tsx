import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState,useEffect } from "react";
import { ScanFace, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — QRAttend" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  useEffect(() => {
  const init = async () => {
    console.log("Current URL:", window.location.href);

    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Exchange error:", error);
        toast.error(error.message);
        return;
      }
    }

    const { data } = await supabase.auth.getSession();

    console.log("SESSION:", data.session);

    if (data.session) {
      setSessionReady(true);
    }
  };

  init();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("AUTH EVENT:", event, session);

    if (
      (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") &&
      session
    ) {
      setSessionReady(true);
    }
  });

  return () => subscription.unsubscribe();
}, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     console.log("onSubmit fired", { pwd, confirm, sessionReady });
    if (pwd.length < 8) return toast.error("Password must be at least 8 characters");
    if (pwd !== confirm) return toast.error("Passwords do not match");
    if (!sessionReady) {
      return toast.error("Reset link expired or invalid. Please request a new one.");
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwd });
      console.log("Supabase error:", error);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Password updated successfully");
      await supabase.auth.signOut();
      navigate({ to: "/login" });
    } catch (err) {
      console.error("updateUser threw:", err);
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const strength = Math.min(4, Math.floor(pwd.length / 3)) +
    (/[A-Z]/.test(pwd) ? 1 : 0) +
    (/[0-9]/.test(pwd) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Strong"][Math.min(strength, 5)];

  return (
    <main className="min-h-screen grid place-items-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-primary)" }} />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20" style={{ background: "var(--gradient-accent)" }} />
      </div>

      <div className="w-full max-w-md glass-card p-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-lg grid place-items-center text-primary-foreground shadow-lg" style={{ background: "var(--gradient-primary)" }}>
            <ScanFace className="h-5 w-5" />
          </div>
          <span className="font-semibold">QR Attend</span>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Set new password</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose a strong password you'll remember.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={show ? "text" : "password"} required value={pwd}
                onChange={(e) => setPwd(e.target.value)} placeholder="••••••••" className="pl-9 pr-9" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {pwd && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${(strength / 7) * 100}%`,
                      background: strength <= 2 ? "var(--destructive)" : strength <= 4 ? "var(--warning)" : "var(--success)",
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-12 text-right">{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirm" type={show ? "text" : "password"} required value={confirm}
                onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="pl-9" />
              {confirm && pwd === confirm && (
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update password"}
          </Button>
        </form>
      </div>
    </main>
  );
}
