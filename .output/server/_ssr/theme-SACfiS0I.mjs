import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-SACfiS0I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "faceattend.theme";
function getSystem() {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	const resolved = theme === "system" ? getSystem() : theme;
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.style.colorScheme = resolved;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("system");
	const [resolved, setResolved] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(STORAGE_KEY) ?? "system";
		setThemeState(stored);
		applyTheme(stored);
		setResolved(stored === "system" ? getSystem() : stored);
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			if ((localStorage.getItem(STORAGE_KEY) ?? "system") === "system") {
				applyTheme("system");
				setResolved(getSystem());
			}
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);
	const setTheme = (t) => {
		localStorage.setItem(STORAGE_KEY, t);
		setThemeState(t);
		applyTheme(t);
		setResolved(t === "system" ? getSystem() : t);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			setTheme,
			resolved
		},
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
	return ctx;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
