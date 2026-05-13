/**
 * 页面主题 page-meta 自动注入
 *
 * 只处理 pages.json 声明的页面，避免普通组件被注入 uni-app 专用标签。
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

interface UniPageItem {
    path?: string;
}

interface UniSubPackage {
    root?: string;
    pages?: UniPageItem[];
}

interface UniPagesJson {
    pages?: UniPageItem[];
    subPackages?: UniSubPackage[];
    subpackages?: UniSubPackage[];
}

const PAGE_META = `<page-meta :page-style="themePageStyle" />`;
const THEME_IMPORT = `import { useThemePageStyle } from "@hlw-uni/mp-vue";`;
const THEME_SETUP = `const { themePageStyle } = useThemePageStyle();`;

function normalizePath(path: string) {
    return path.replace(/\\/g, "/").toLowerCase();
}

function cleanId(id: string) {
    return id.split("?")[0];
}

function findPagesJson(root: string) {
    const candidates = [
        resolve(root, "src/pages.json"),
        resolve(root, "pages.json"),
    ];
    return candidates.find((file) => existsSync(file));
}

function addPage(pagePaths: Set<string>, baseDir: string, pagePath?: string) {
    if (!pagePath) return;
    pagePaths.add(normalizePath(resolve(baseDir, `${pagePath}.vue`)));
}

function collectPagePaths(root: string) {
    const pagesJsonPath = findPagesJson(root);
    const pagePaths = new Set<string>();
    if (!pagesJsonPath) return pagePaths;

    const baseDir = dirname(pagesJsonPath);
    const pagesJson = JSON.parse(readFileSync(pagesJsonPath, "utf-8")) as UniPagesJson;

    for (const page of pagesJson.pages ?? []) {
        addPage(pagePaths, baseDir, page.path);
    }

    for (const group of [...(pagesJson.subPackages ?? []), ...(pagesJson.subpackages ?? [])]) {
        for (const page of group.pages ?? []) {
            const fullPath = [group.root, page.path].filter(Boolean).join("/");
            addPage(pagePaths, baseDir, fullPath);
        }
    }

    return pagePaths;
}

function injectTemplate(code: string) {
    return code.replace(/<template(\s[^>]*)?>/, (match) => `${match}\n    ${PAGE_META}`);
}

function injectScriptSetup(code: string) {
    const hasImport = code.includes("useThemePageStyle");
    const setupCode = [
        hasImport ? null : THEME_IMPORT,
        code.includes(THEME_SETUP) ? null : THEME_SETUP,
    ].filter(Boolean).join("\n");

    if (!setupCode) return code;

    const setupOpenRe = /<script\b(?=[^>]*\bsetup\b)[^>]*>/;
    if (setupOpenRe.test(code)) {
        return code.replace(setupOpenRe, (match) => `${match}\n${setupCode}\n`);
    }

    return `${code}

<script setup lang="ts">
${setupCode}
</script>`;
}

export function createThemePageMetaPlugin(): Plugin {
    let pagePaths = new Set<string>();

    return {
        name: "hlw-uni-theme-page-meta",
        enforce: "pre",

        configResolved(config: ResolvedConfig) {
            pagePaths = collectPagePaths(config.root);
        },

        transform(code: string, id: string) {
            if (!id.endsWith(".vue") && !cleanId(id).endsWith(".vue")) return null;
            if (!pagePaths.has(normalizePath(cleanId(id)))) return null;
            if (!code.includes("<template")) return null;
            if (code.includes("<page-meta")) return null;

            const result = injectScriptSetup(injectTemplate(code));
            return { code: result, map: null };
        },
    };
}
