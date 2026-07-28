import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-COYcCi3Y.mjs";
import { t as Button } from "./button-CCQEfgNs.mjs";
import { t as Input } from "./input-DoD5W07l.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Eye, I as EyeOff, O as Lock, V as CircleCheck, h as ScanFace } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-B1jF9p8Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-r2Y_8Zuh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [pwd, setPwd] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sessionState, setSessionState] = (0, import_react.useState)("checking");
	const exchangeAttempted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "PASSWORD_RECOVERY" && session) setSessionState("ready");
		});
		const run = async () => {
			if (exchangeAttempted.current) return;
			exchangeAttempted.current = true;
			const code = new URLSearchParams(window.location.search).get("code");
			if (!code) {
				const { data } = await supabase.auth.getSession();
				setSessionState(data.session ? "ready" : "invalid");
				return;
			}
			const { data, error } = await supabase.auth.exchangeCodeForSession(code);
			window.history.replaceState({}, "", window.location.pathname);
			if (error || !data.session) {
				console.error("exchangeCodeForSession failed:", error);
				setSessionState("invalid");
				return;
			}
			setSessionState("ready");
		};
		run();
		return () => subscription.unsubscribe();
	}, []);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (pwd.length < 8) return toast.error("Password must be at least 8 characters");
		if (pwd !== confirm) return toast.error("Passwords do not match");
		if (sessionState !== "ready") return toast.error("Reset link expired or invalid. Please request a new one.");
		setLoading(true);
		try {
			const { error } = await supabase.auth.updateUser({ password: pwd });
			if (error) {
				toast.error(error.message);
				return;
			}
			toast.success("Password updated successfully");
			await supabase.auth.signOut();
			navigate({ to: "/login" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	const strength = Math.min(4, Math.floor(pwd.length / 3)) + (/[A-Z]/.test(pwd) ? 1 : 0) + (/[0-9]/.test(pwd) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0);
	const strengthLabel = [
		"",
		"Weak",
		"Fair",
		"Good",
		"Strong",
		"Strong"
	][Math.min(strength, 5)];
	if (sessionState === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen grid place-items-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Verifying reset link…"
		})
	});
	if (sessionState === "invalid") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen grid place-items-center p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Link expired or already used"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Password reset links can only be used once and expire quickly. Please request a new one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => navigate({ to: "/forgot-password" }),
					children: "Request new link"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen grid place-items-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 -z-10 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30",
				style: { background: "var(--gradient-primary)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20",
				style: { background: "var(--gradient-accent)" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md glass-card p-8 animate-fade-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-10 w-10 rounded-lg grid place-items-center text-primary-foreground shadow-lg",
					style: { background: "var(--gradient-primary)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "QR Attend"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold tracking-tight",
						children: "Set new password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Choose a strong password you'll remember."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "New password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: show ? "text" : "password",
										required: true,
										value: pwd,
										onChange: (e) => setPwd(e.target.value),
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
							}),
							pwd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 h-1 rounded-full bg-muted overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full transition-all",
										style: {
											width: `${strength / 7 * 100}%`,
											background: strength <= 2 ? "var(--destructive)" : strength <= 4 ? "var(--warning)" : "var(--success)"
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground w-12 text-right",
									children: strengthLabel
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm",
							children: "Confirm password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "confirm",
									type: show ? "text" : "password",
									required: true,
									value: confirm,
									onChange: (e) => setConfirm(e.target.value),
									placeholder: "••••••••",
									className: "pl-9"
								}),
								confirm && pwd === confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: loading,
						children: loading ? "Updating..." : "Update password"
					})
				]
			})]
		})]
	});
}
//#endregion
export { ResetPassword as component };
