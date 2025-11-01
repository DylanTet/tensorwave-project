module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/projects/tensorwave/lib/clientApiService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiService",
    ()=>ApiService
]);
class ApiService {
    static BASE_URL = '/api/stock';
    /**
   * Generic fetch wrapper with error handling
   */ static async fetchApi(url) {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.error || `API request failed with status ${response.status}`);
        }
        const data = await response.json();
        // Check if the response contains an error field
        if (data && typeof data === 'object' && 'error' in data) {
            throw new Error(data.error);
        }
        return data;
    }
    /**
   * Fetch company overview for a given stock symbol
   */ static async getCompanyOverview(symbol) {
        return this.fetchApi(`${this.BASE_URL}/${symbol}/overview`);
    }
    /**
   * Fetch historical price data for a given stock symbol
   */ static async getHistoricalPrices(symbol) {
        return this.fetchApi(`${this.BASE_URL}/${symbol}/timeseries`);
    }
    /**
   * Fetch both overview and historical prices in parallel
   */ static async getStockData(symbol) {
        const [overview, historicalPrices] = await Promise.all([
            this.getCompanyOverview(symbol),
            this.getHistoricalPrices(symbol)
        ]);
        return {
            overview,
            historicalPrices
        };
    }
}
}),
"[project]/Desktop/projects/tensorwave/app/api/stock/[symbol]/timeseries/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projects$2f$tensorwave$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projects/tensorwave/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projects$2f$tensorwave$2f$lib$2f$clientApiService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projects/tensorwave/lib/clientApiService.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        const { symbol } = params;
        if (!symbol) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projects$2f$tensorwave$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Stock symbol is required'
            }, {
                status: 400
            });
        }
        const overview = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projects$2f$tensorwave$2f$lib$2f$clientApiService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiService"].getCompanyOverview(symbol.toUpperCase());
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projects$2f$tensorwave$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(overview);
    } catch (error) {
        console.error('Error fetching company overview:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projects$2f$tensorwave$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Failed to fetch company overview'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__08fda8ba._.js.map