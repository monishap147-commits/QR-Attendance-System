import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-CCQEfgNs.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { $ as BookOpen, J as Camera, P as FileChartColumnIncreasing, Q as Building2, R as Clock, V as CircleCheck, X as CalendarCheck, a as UserPlus, b as Percent, h as ScanFace, it as Activity, r as Users, s as TrendingUp, tt as ArrowUpRight } from "./_libs/lucide-react.mjs";
import { _ as useCollege, a as CardTitle, g as useAttendance, i as CardHeader, n as CardContent, r as CardDescription, t as Card, v as useStudents, y as useTaxonomy } from "./_ssr/store-7dpw_A58.mjs";
import { t as Badge } from "./_ssr/badge-Bt-nVIZo.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-PlBXRASR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var actions = [
	{
		title: "Register Student",
		desc: "Enroll a new student with face capture",
		to: "/students",
		icon: UserPlus
	},
	{
		title: "Start Attendance",
		desc: "Begin a live face recognition session",
		to: "/attendance",
		icon: ScanFace
	},
	{
		title: "View Reports",
		desc: "Browse and export attendance records",
		to: "/reports",
		icon: FileChartColumnIncreasing
	}
];
function useNow() {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
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
	const attendancePct = students.length ? Math.min(100, Math.round(attendance.length / (students.length * totalSessions) * 100)) : 0;
	const stats = [
		{
			label: "Total Students",
			value: students.length,
			icon: Users,
			tone: "bg-primary/10 text-primary",
			to: "/students"
		},
		{
			label: "Today's Attendance",
			value: todays.length,
			icon: CalendarCheck,
			tone: "bg-success/15 text-success",
			to: "/attendance-records"
		},
		{
			label: "Total Departments",
			value: tax.departments.length,
			icon: Building2,
			tone: "bg-accent/20 text-accent-foreground",
			to: "/departments"
		},
		{
			label: "Total Subjects",
			value: tax.subjects.length,
			icon: BookOpen,
			tone: "bg-warning/15 text-warning-foreground",
			to: "/subjects"
		},
		{
			label: "Attendance %",
			value: `${attendancePct}%`,
			icon: Percent,
			tone: "bg-primary/10 text-primary",
			to: "/reports"
		}
	];
	const weekly = (0, import_react.useMemo)(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - (6 - i));
			const key = d.toISOString().slice(0, 10);
			return {
				day: d.toLocaleDateString(void 0, { weekday: "short" }),
				present: attendance.filter((a) => a.date === key).length
			};
		});
	}, [attendance]);
	const monthly = (0, import_react.useMemo)(() => {
		const months = [];
		for (let i = 11; i >= 0; i--) {
			const d = /* @__PURE__ */ new Date();
			d.setDate(1);
			d.setMonth(d.getMonth() - i);
			const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
			months.push({
				month: d.toLocaleDateString(void 0, { month: "short" }),
				present: attendance.filter((a) => a.date.startsWith(ym)).length
			});
		}
		return months;
	}, [attendance]);
	const recent = attendance.slice(0, 6);
	const hasData = attendance.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "glass-card overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5 sm:p-6 grid gap-4 sm:grid-cols-[auto_1fr_auto] items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-14 shrink-0 rounded-2xl grid place-items-center shadow-md overflow-hidden",
							style: { background: college.logo ? void 0 : "var(--gradient-primary)" },
							children: college.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: college.logo,
								alt: "",
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "h-7 w-7 text-primary-foreground" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl sm:text-2xl font-bold tracking-tight truncate",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gradient-text",
										children: college.name || "QRAttend"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: college.address }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: college.email }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: college.phone })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground flex items-center gap-1.5 justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), now.toLocaleDateString(void 0, {
									weekday: "long",
									month: "short",
									day: "numeric",
									year: "numeric"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-bold font-mono tracking-tight mt-0.5",
								children: now.toLocaleTimeString()
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: s.to,
					className: "group block",
					"aria-label": `View ${s.label}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "glass-card overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all group-hover:-translate-y-0.5 cursor-pointer h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wide",
										children: s.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl sm:text-3xl font-bold mt-2",
										children: s.value
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-10 w-10 shrink-0 rounded-lg grid place-items-center ${s.tone}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
								})]
							})
						})
					})
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold mb-3",
				children: "Quick Actions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: a.to,
					className: "group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "glass-card hover:border-primary/40 transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5 flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-11 w-11 shrink-0 rounded-lg grid place-items-center text-primary-foreground shadow-md",
								style: { background: "var(--gradient-primary)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: a.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary",
									children: [
										"Open",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
									]
								})]
							})]
						})
					})
				}, a.to))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "glass-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-base flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), " Weekly Attendance"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Last 7 days" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-64 pl-0",
						children: hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: weekly,
								margin: {
									top: 10,
									right: 20,
									left: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "weekFill",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--primary)",
											stopOpacity: .4
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--primary)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										},
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--popover)",
										border: "1px solid var(--border)",
										borderRadius: 8,
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "present",
										stroke: "var(--primary)",
										strokeWidth: 2,
										fill: "url(#weekFill)"
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartEmpty, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "glass-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-base flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-accent-foreground" }), " Monthly Attendance"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Last 12 months" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-64 pl-0",
						children: hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: monthly,
								margin: {
									top: 10,
									right: 20,
									left: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										},
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--popover)",
										border: "1px solid var(--border)",
										borderRadius: 8,
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "present",
										fill: "var(--primary)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartEmpty, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Recent Attendance Activity"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 rounded-full bg-muted grid place-items-center mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-6 w-6 text-muted-foreground" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "No attendance yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1 max-w-xs",
								children: "Start a recognition session to see live check-ins here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/attendance",
									children: "Start session"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-5 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-9 w-9 rounded-full bg-success/15 text-success grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium truncate",
										children: r.studentName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											r.subject,
											" · ",
											r.department
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium",
										children: r.time
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "text-[10px] mt-0.5",
										children: r.status
									})]
								})
							]
						}, r.id))
					})
				})]
			})
		]
	});
}
function ChartEmpty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full grid place-items-center text-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-12 w-12 mx-auto mb-2 rounded-full bg-muted grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "No data yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: "Chart will populate once attendance is recorded."
			})
		] })
	});
}
//#endregion
export { Dashboard as component };
