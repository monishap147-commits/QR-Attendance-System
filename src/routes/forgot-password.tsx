import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScanFace, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — QRAttend" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
       redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Reset link sent to your email");
  };


  return (
    <main className="min-h-screen grid place-items-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-primary)" }} />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20" style={{ background: "var(--gradient-accent)" }} />
      </div>

      <div className="w-full max-w-md glass-card p-8 animate-fade-in">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>

        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-lg grid place-items-center text-primary-foreground shadow-lg" style={{ background: "var(--gradient-primary)" }}>
            <ScanFace className="h-5 w-5" />
          </div>
          <span className="font-semibold">QRAttend</span>
        </div>

        {sent ? (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-success/15 text-success grid place-items-center">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Check your inbox</h2>
              <p className="text-sm text-muted-foreground mt-1">
                We sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link to="/reset-password">Open reset page</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Forgot password?</h2>
              <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you a reset link.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@college.edu" className="pl-9" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
