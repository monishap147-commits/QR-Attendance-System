import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useTheme } from "./_ssr/theme-SACfiS0I.mjs";
import { t as supabase } from "./_ssr/client-COYcCi3Y.mjs";
import { t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { t as Input } from "./_ssr/input-DoD5W07l.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as LogOut, Q as Building2, T as Monitor, c as Trash2, i as User, l as Sun, o as Upload, w as Moon } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { _ as useCollege, a as CardTitle, f as updateAdmin, h as useAdmin, i as CardHeader, n as CardContent, p as updateCollege, r as CardDescription, t as Card } from "./_ssr/store-7dpw_A58.mjs";
import { t as Label } from "./_ssr/label-B1jF9p8Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-C6_DQ9JG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const admin = useAdmin();
	const college = useCollege();
	const onLogout = async () => {
		await supabase.auth.signOut();
		navigate({ to: "/login" });
	};
	const fileRef = (0, import_react.useRef)(null);
	const onLogo = (e) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold tracking-tight",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Manage your profile, college info and appearance."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Admin Profile"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Update your account information." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-full grid place-items-center text-primary-foreground text-xl font-semibold",
								style: { background: "var(--gradient-primary)" },
								children: admin.name.charAt(0).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium truncate",
									children: admin.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground truncate",
									children: admin.email
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "aname",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "aname",
									value: admin.name,
									onChange: (e) => updateAdmin({ name: e.target.value })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "aemail",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "aemail",
									type: "email",
									value: admin.email,
									onChange: (e) => updateAdmin({ email: e.target.value })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => toast.success("Profile saved"),
							children: "Save changes"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }), " College Information"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Displayed on the dashboard header and reports." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-xl overflow-hidden grid place-items-center bg-muted",
								children: college.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: college.logo,
									alt: "",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: onLogo
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "secondary",
										className: "gap-2",
										onClick: () => fileRef.current?.click(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Upload Logo"]
									}),
									college.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										className: "gap-2 text-destructive hover:text-destructive",
										onClick: () => {
											updateCollege({ logo: "" });
											toast.success("Logo removed");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Remove"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cname",
										children: "College Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cname",
										value: college.name,
										onChange: (e) => updateCollege({ name: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cemail",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cemail",
										type: "email",
										value: college.email,
										onChange: (e) => updateCollege({ email: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cphone",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cphone",
										type: "tel",
										value: college.phone,
										onChange: (e) => updateCollege({ phone: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "caddress",
										children: "Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "caddress",
										value: college.address,
										onChange: (e) => updateCollege({ address: e.target.value })
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => toast.success("College info saved"),
							children: "Save changes"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Theme"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Choose how the app looks to you." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						"light",
						"dark",
						"system"
					].map((t) => {
						const Icon = t === "light" ? Sun : t === "dark" ? Moon : Monitor;
						const active = theme === t;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTheme(t),
							className: `rounded-lg border p-4 text-center transition-colors ${active ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 mx-auto mb-2 ${active ? "text-primary" : "text-muted-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium capitalize",
								children: t
							})]
						}, t);
					})
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card border-destructive/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Sign out"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "End your current session and return to the login screen." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "destructive",
					className: "gap-2",
					onClick: onLogout,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Log out"]
				}) })]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
