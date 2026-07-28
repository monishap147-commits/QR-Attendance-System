import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-COYcCi3Y.mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { t as Input } from "./input-DoD5W07l.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Mail, F as Eye, I as EyeOff, K as Check, O as Lock, d as Sparkles, f as ShieldCheck, h as ScanFace, nt as ArrowRight, t as Zap } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Label } from "./label-B1jF9p8Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CaKZc9KK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			const signIn = await supabase.auth.signInWithPassword({
				email,
				password
			});
			let session = signIn.data.session;
			let error = signIn.error;
			if (error && /invalid login credentials/i.test(error.message)) {
				const signUp = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: `${window.location.origin}/dashboard` }
				});
				if (signUp.error) error = signUp.error;
				else if (signUp.data.session) {
					session = signUp.data.session;
					error = null;
					toast.success("Admin account created");
				} else {
					const retry = await supabase.auth.signInWithPassword({
						email,
						password
					});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen grid lg:grid-cols-2 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hidden lg:flex relative overflow-hidden items-center justify-center p-12",
			style: { background: "var(--gradient-primary)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-20",
					style: {
						backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
						backgroundSize: "40px 40px"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-md text-primary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center ring-1 ring-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold tracking-tight",
								children: "QR Attendance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-80",
								children: "Smart College Attendance"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-bold leading-tight mb-4",
							children: "Smart QR Attendance Management"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base opacity-90 leading-relaxed mb-8",
							children: "Automate classroom attendance with  secure QR verification"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3 text-sm",
							children: [
								{
									icon: ShieldCheck,
									text: "Secure, role-based admin access"
								},
								{
									icon: Zap,
									text: " Real-time QR attendance tracking"
								},
								{
									icon: Sparkles,
									text: "Student and subject management"
								}
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-7 w-7 rounded-md bg-white/15 grid place-items-center ring-1 ring-white/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-95",
									children: f.text
								})]
							}, f.text))
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex items-center justify-center p-6 sm:p-12 relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-10 lg:hidden overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30",
					style: { background: "var(--gradient-primary)" }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "w-full max-w-sm space-y-6 animate-fade-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:hidden flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-lg grid place-items-center text-primary-foreground shadow-lg",
							style: { background: "var(--gradient-primary)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "QRAttend"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold tracking-tight",
						children: "Welcome back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Sign in to your admin account"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "admin@college.edu",
										className: "pl-9"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/forgot-password",
										className: "text-xs text-primary hover:underline",
										children: "Forgot password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password",
											type: show ? "text" : "password",
											required: true,
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "••••••••",
											className: "pl-9 pr-9"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShow((s) => !s),
											"aria-label": "Toggle password visibility",
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
											children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-muted-foreground select-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: remember,
									onCheckedChange: (v) => setRemember(Boolean(v))
								}), "Remember me for 30 days"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full gap-2",
						disabled: loading,
						children: loading ? "Signing in..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-center text-muted-foreground",
						children: "Secure QR Attendance System · Authorized admin access only"
					})
				]
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
