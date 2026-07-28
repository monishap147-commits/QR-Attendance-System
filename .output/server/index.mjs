globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-04T09:33:56.000Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/models/face_landmark_68_model-weights_manifest.json": {
		"type": "application/json",
		"etag": "\"1ed1-qYHHrfxjZue1G2yDs7uElhqaSxU\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 7889,
		"path": "../public/models/face_landmark_68_model-weights_manifest.json"
	},
	"/models/face_landmark_68_model-shard1": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"571e8-6LRTo84qZub6Bw1OMM1OkckRlks\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 356840,
		"path": "../public/models/face_landmark_68_model-shard1"
	},
	"/models/face_recognition_model-weights_manifest.json": {
		"type": "application/json",
		"etag": "\"477f-hRbrf1esn1mZNcrk4kbo98Of9jE\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 18303,
		"path": "../public/models/face_recognition_model-weights_manifest.json"
	},
	"/models/tiny_face_detector_model-shard1": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"2f329-8wIN668Hg0e1yq/0v23OLzedILw\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 193321,
		"path": "../public/models/tiny_face_detector_model-shard1"
	},
	"/assets/alert-dialog-CbF3pQr-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa3-zAhEp3AORa7aorF7UgNxkohdyRM\"",
		"mtime": "2026-07-28T13:46:39.298Z",
		"size": 4003,
		"path": "../public/assets/alert-dialog-CbF3pQr-.js"
	},
	"/assets/badge-DYsMcOds.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"334-apxoSPrzfHfdHlGsCeDHQOSvx9s\"",
		"mtime": "2026-07-28T13:46:39.300Z",
		"size": 820,
		"path": "../public/assets/badge-DYsMcOds.js"
	},
	"/assets/building-2-CM83FAnE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-5Vrkgz6j+CXZwtG0ZubhoFvotrM\"",
		"mtime": "2026-07-28T13:46:39.302Z",
		"size": 383,
		"path": "../public/assets/building-2-CM83FAnE.js"
	},
	"/models/tiny_face_detector_model-weights_manifest.json": {
		"type": "application/json",
		"etag": "\"b89-H52g3bhH/NUSywUR9tbJCYXQEeY\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 2953,
		"path": "../public/models/tiny_face_detector_model-weights_manifest.json"
	},
	"/assets/calendar-check-DceivCFF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-iA0NPa8uQnmb3zXgorNK0pla+Qw\"",
		"mtime": "2026-07-28T13:46:39.303Z",
		"size": 305,
		"path": "../public/assets/calendar-check-DceivCFF.js"
	},
	"/assets/Combination-BKsqUWYI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51bb-vx63lZjh+oeskp/sc4Rzem90FII\"",
		"mtime": "2026-07-28T13:46:39.268Z",
		"size": 20923,
		"path": "../public/assets/Combination-BKsqUWYI.js"
	},
	"/assets/dialog-C0ehKVlX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8df-/R0THx+ys2WLmMuIzdbrXIAxtPY\"",
		"mtime": "2026-07-28T13:46:39.306Z",
		"size": 2271,
		"path": "../public/assets/dialog-C0ehKVlX.js"
	},
	"/assets/dist-B1oNlCDF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-/M1mpMJH0cAnfwVk5afUSp29qx4\"",
		"mtime": "2026-07-28T13:46:39.307Z",
		"size": 306,
		"path": "../public/assets/dist-B1oNlCDF.js"
	},
	"/assets/createLucideIcon-Ds7hDoGH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3514e-eCgH5Eklg2hYAYxJQ6vkHfNvw9g\"",
		"mtime": "2026-07-28T13:46:39.303Z",
		"size": 217422,
		"path": "../public/assets/createLucideIcon-Ds7hDoGH.js"
	},
	"/assets/dist-B81Amjga.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e44-sBEnHIrCiPUeiYTuuggfb06R8zo\"",
		"mtime": "2026-07-28T13:46:39.307Z",
		"size": 3652,
		"path": "../public/assets/dist-B81Amjga.js"
	},
	"/assets/dist-Bl4zjc6G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1108-8wSRsuejrz+fueCwIHYDxcRJRhQ\"",
		"mtime": "2026-07-28T13:46:39.310Z",
		"size": 4360,
		"path": "../public/assets/dist-Bl4zjc6G.js"
	},
	"/assets/dist-D3Mt9Yw0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12bb-RdlqCWvac/dRIZjIdmZUbJcwXq8\"",
		"mtime": "2026-07-28T13:46:39.314Z",
		"size": 4795,
		"path": "../public/assets/dist-D3Mt9Yw0.js"
	},
	"/assets/dist-D1PQcNPf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"45c-Ql79oqsyYKj9AzxAmZq5/kVBDLo\"",
		"mtime": "2026-07-28T13:46:39.312Z",
		"size": 1116,
		"path": "../public/assets/dist-D1PQcNPf.js"
	},
	"/assets/dist-trkGFN2m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25f-tq6jcJEzvDudkyBAjp0n4NBLdQQ\"",
		"mtime": "2026-07-28T13:46:39.317Z",
		"size": 607,
		"path": "../public/assets/dist-trkGFN2m.js"
	},
	"/assets/dist-DhmmsxhH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa94-7OstmMo318fh+1hdIgsy7s7TLt4\"",
		"mtime": "2026-07-28T13:46:39.315Z",
		"size": 64148,
		"path": "../public/assets/dist-DhmmsxhH.js"
	},
	"/assets/forgot-password-Cctz0Doz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d64-MtmyCq+TSaELZgF632SGBkZzKhM\"",
		"mtime": "2026-07-28T13:46:39.321Z",
		"size": 3428,
		"path": "../public/assets/forgot-password-Cctz0Doz.js"
	},
	"/assets/dist-T0oBou1X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6dff-uxxTboLOqY5SWySe95iRUVz5QLg\"",
		"mtime": "2026-07-28T13:46:39.317Z",
		"size": 28159,
		"path": "../public/assets/dist-T0oBou1X.js"
	},
	"/assets/file-chart-column-increasing-DRbvjZH_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-HNy9s0Y0Wxo2NG3Ks4Yn2I09d98\"",
		"mtime": "2026-07-28T13:46:39.320Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-DRbvjZH_.js"
	},
	"/assets/html2canvas-BfZ04V3R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b99-oSXtJ7yui3fRH2awJKTqZXftx2Y\"",
		"mtime": "2026-07-28T13:46:39.323Z",
		"size": 199577,
		"path": "../public/assets/html2canvas-BfZ04V3R.js"
	},
	"/assets/index-D7wWbx_3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b00b-hqH9mx/rdqB0gDDBYGDvZhpHZgM\"",
		"mtime": "2026-07-28T13:46:39.268Z",
		"size": 372747,
		"path": "../public/assets/index-D7wWbx_3.js"
	},
	"/assets/label-BF9a0t_4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-cc9uZvz2d73KVy66Hte1yPGan6o\"",
		"mtime": "2026-07-28T13:46:39.323Z",
		"size": 673,
		"path": "../public/assets/label-BF9a0t_4.js"
	},
	"/assets/lock-CsqkulGk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"308-xipFI6b3iM0euL84nMKta37Pc0s\"",
		"mtime": "2026-07-28T13:46:39.323Z",
		"size": 776,
		"path": "../public/assets/lock-CsqkulGk.js"
	},
	"/assets/index.es-DYERYDqN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f5e-hKbuSo9LC2WdYivxkiIjrA3eWKM\"",
		"mtime": "2026-07-28T13:46:39.323Z",
		"size": 151390,
		"path": "../public/assets/index.es-DYERYDqN.js"
	},
	"/assets/login-CoV9DHsK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b71-gYdRSQCnlcyTm4REnzF07H9x/y0\"",
		"mtime": "2026-07-28T13:46:39.323Z",
		"size": 11121,
		"path": "../public/assets/login-CoV9DHsK.js"
	},
	"/assets/mail-Dtu2VFD0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-Fwvf+9I1kAAXqvVMeECRYTkn0K4\"",
		"mtime": "2026-07-28T13:46:39.330Z",
		"size": 213,
		"path": "../public/assets/mail-Dtu2VFD0.js"
	},
	"/assets/reset-password-ClcKDvER.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ab-uZFwtJj1gLOdrU/CXp97P2D3gNU\"",
		"mtime": "2026-07-28T13:46:39.334Z",
		"size": 5547,
		"path": "../public/assets/reset-password-ClcKDvER.js"
	},
	"/assets/purify.es-ZPrpXrUc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"660f-FtaUoGFPrS70KeYbOpaCFpP9xq8\"",
		"mtime": "2026-07-28T13:46:39.330Z",
		"size": 26127,
		"path": "../public/assets/purify.es-ZPrpXrUc.js"
	},
	"/assets/rolldown-runtime-QTnfLwEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b6-wnqLLSlp3SaE+lbe74bKNe5Rpds\"",
		"mtime": "2026-07-28T13:46:39.337Z",
		"size": 694,
		"path": "../public/assets/rolldown-runtime-QTnfLwEv.js"
	},
	"/assets/scan-face-BFKiygg-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-w9NXprSN9808QMh5vpSyls6ooAE\"",
		"mtime": "2026-07-28T13:46:39.339Z",
		"size": 421,
		"path": "../public/assets/scan-face-BFKiygg-.js"
	},
	"/assets/select-BpIGlISq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5532-irOvC/LVUxFsvoWXu2oSEoKf3Bo\"",
		"mtime": "2026-07-28T13:46:39.340Z",
		"size": 21810,
		"path": "../public/assets/select-BpIGlISq.js"
	},
	"/assets/table-y2gFJ32Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69c-gA2DLs+oT1ShGrv1w4SXnRaUQiw\"",
		"mtime": "2026-07-28T13:46:39.348Z",
		"size": 1692,
		"path": "../public/assets/table-y2gFJ32Q.js"
	},
	"/assets/sun-8U5QyqRz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f1-qrU5CaI9QMp1gpMzgbsZy+0YN/M\"",
		"mtime": "2026-07-28T13:46:39.346Z",
		"size": 1009,
		"path": "../public/assets/sun-8U5QyqRz.js"
	},
	"/assets/store-BvklKUxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21e2-jXm8aD88AGtJ0aXotegQN8pEqy8\"",
		"mtime": "2026-07-28T13:46:39.340Z",
		"size": 8674,
		"path": "../public/assets/store-BvklKUxY.js"
	},
	"/assets/typeof-B5XbjTb1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-yPXEOGyFHb1Ws7OoWyWNEEBz4mQ\"",
		"mtime": "2026-07-28T13:46:39.348Z",
		"size": 271,
		"path": "../public/assets/typeof-B5XbjTb1.js"
	},
	"/assets/_app.attendance-records-Bgennumu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a7-1lfS17p5nnej4QpDptFE7XJuUr8\"",
		"mtime": "2026-07-28T13:46:39.281Z",
		"size": 4263,
		"path": "../public/assets/_app.attendance-records-Bgennumu.js"
	},
	"/assets/_app-WF79G9vT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c928-mr/+dSw+f/w+aGrrDT4zk1einDA\"",
		"mtime": "2026-07-28T13:46:39.268Z",
		"size": 51496,
		"path": "../public/assets/_app-WF79G9vT.js"
	},
	"/assets/_app.departments-BK05cjgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"189c-9JgSpB3nnaWySZ1ptKrN0QrSbIc\"",
		"mtime": "2026-07-28T13:46:39.286Z",
		"size": 6300,
		"path": "../public/assets/_app.departments-BK05cjgx.js"
	},
	"/assets/_app.settings-BvxOYu7x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1709-T9tFAHszKIbP7QZST0ee/746AB0\"",
		"mtime": "2026-07-28T13:46:39.292Z",
		"size": 5897,
		"path": "../public/assets/_app.settings-BvxOYu7x.js"
	},
	"/assets/styles-DHAKASaZ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17c6c-DCZY+8Trhdyh+qKiz+iVfwJOFzY\"",
		"mtime": "2026-07-28T13:46:39.351Z",
		"size": 97388,
		"path": "../public/assets/styles-DHAKASaZ.css"
	},
	"/assets/_app.dashboard-mh1yv8lL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5efb6-H21KyNKhABFKw0MDkWcMH280hzY\"",
		"mtime": "2026-07-28T13:46:39.284Z",
		"size": 389046,
		"path": "../public/assets/_app.dashboard-mh1yv8lL.js"
	},
	"/assets/_app.reports-Cv6nawhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ba8d-aDXHqeq96CP9eExWkTynuM0C03k\"",
		"mtime": "2026-07-28T13:46:39.289Z",
		"size": 440973,
		"path": "../public/assets/_app.reports-Cv6nawhF.js"
	},
	"/models/face_recognition_model-shard2": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"225400-l5o5hugmGWJrmIFK2NJtwXW3/e4\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 2249728,
		"path": "../public/models/face_recognition_model-shard2"
	},
	"/assets/_app.subjects-C147tbWw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d0d-/FLfy1JDbxhoWfTb0dSuI+NlDXY\"",
		"mtime": "2026-07-28T13:46:39.295Z",
		"size": 7437,
		"path": "../public/assets/_app.subjects-C147tbWw.js"
	},
	"/assets/_app.students-DIKrYiRk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6df4-0rW8lM3ptdGkUWbbdvYdCKxTnwQ\"",
		"mtime": "2026-07-28T13:46:39.292Z",
		"size": 28148,
		"path": "../public/assets/_app.students-DIKrYiRk.js"
	},
	"/models/face_recognition_model-shard1": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"400000-xpy9NshP8byGFsZBmoRKVPqA/qU\"",
		"mtime": "2026-07-05T07:50:56.000Z",
		"size": 4194304,
		"path": "../public/models/face_recognition_model-shard1"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_MzqJ1D = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_MzqJ1D
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
