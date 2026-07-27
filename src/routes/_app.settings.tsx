import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { LogOut, Sun, Moon, Monitor, User, Building2, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTheme } from "@/lib/theme";
import { useAdmin, updateAdmin, useCollege, updateCollege } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — QRAttend" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const admin = useAdmin();
  const college = useCollege();
  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };
  const fileRef = useRef<HTMLInputElement>(null);

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateCollege({ logo: String(reader.result || "") });
      toast.success("Logo updated");
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your profile, college info and appearance.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" /> Admin Profile</CardTitle>
          <CardDescription>Update your account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full grid place-items-center text-primary-foreground text-xl font-semibold"
              style={{ background: "var(--gradient-primary)" }}>
              {admin.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{admin.name}</p>
              <p className="text-sm text-muted-foreground truncate">{admin.email}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="aname">Full Name</Label>
              <Input id="aname" value={admin.name} onChange={(e) => updateAdmin({ name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aemail">Email</Label>
              <Input id="aemail" type="email" value={admin.email}
                onChange={(e) => updateAdmin({ email: e.target.value })} />
            </div>
          </div>
          <Button type="button" onClick={() => toast.success("Profile saved")}>Save changes</Button>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> College Information</CardTitle>
          <CardDescription>Displayed on the dashboard header and reports.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden grid place-items-center bg-muted">
              {college.logo ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={college.logo} alt="" className="h-full w-full object-cover" />
              ) : (
                <Building2 className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onLogo} />
              <Button type="button" variant="secondary" className="gap-2" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" /> Upload Logo
              </Button>
              {college.logo && (
                <Button type="button" variant="ghost" className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => { updateCollege({ logo: "" }); toast.success("Logo removed"); }}>
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cname">College Name</Label>
              <Input id="cname" value={college.name} onChange={(e) => updateCollege({ name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cemail">Email</Label>
              <Input id="cemail" type="email" value={college.email} onChange={(e) => updateCollege({ email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cphone">Phone</Label>
              <Input id="cphone" type="tel" value={college.phone} onChange={(e) => updateCollege({ phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caddress">Address</Label>
              <Input id="caddress" value={college.address} onChange={(e) => updateCollege({ address: e.target.value })} />
            </div>
          </div>
          <Button type="button" onClick={() => toast.success("College info saved")}>Save changes</Button>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Theme</CardTitle>
          <CardDescription>Choose how the app looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {(["light", "dark", "system"] as const).map((t) => {
              const Icon = t === "light" ? Sun : t === "dark" ? Moon : Monitor;
              const active = theme === t;
              return (
                <button key={t} type="button" onClick={() => setTheme(t)}
                  className={`rounded-lg border p-4 text-center transition-colors ${active ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                  <Icon className={`h-5 w-5 mx-auto mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="text-sm font-medium capitalize">{t}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base">Sign out</CardTitle>
          <CardDescription>End your current session and return to the login screen.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="gap-2" onClick={onLogout}>
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
