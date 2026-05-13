import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import HlwUni from "../dist/index.mjs";

const root = mkdtempSync(join(tmpdir(), "hlw-theme-meta-"));
mkdirSync(join(root, "src"), { recursive: true });
writeFileSync(
    join(root, "src", "pages.json"),
    JSON.stringify({
        pages: [{ path: "pages/index/index" }],
        subPackages: [
            {
                root: "pkg",
                pages: [{ path: "detail/index" }],
            },
        ],
    }),
);

const plugins = HlwUni({ autoImport: false, themePageMeta: true });
const plugin = plugins.find((item) => item.name === "hlw-uni-theme-page-meta");

assert.ok(plugin, "theme page-meta plugin should be registered");
plugin.configResolved?.({ root });

const pageId = resolve(root, "src/pages/index/index.vue");
const pageCode = `<template>
    <hlw-page />
</template>

<script setup lang="ts">
import { useShare } from "@hlw-uni/mp-vue";

useShare({ title: "首页" });
</script>`;

const pageResult = await plugin.transform(pageCode, pageId);
assert.ok(pageResult && typeof pageResult === "object", "page vue should be transformed");
assert.match(pageResult.code, /<template>\s*<page-meta :page-style="themePageStyle" \/>/);
assert.match(pageResult.code, /import \{ useThemePageStyle \} from "@hlw-uni\/mp-vue";/);
assert.match(pageResult.code, /const \{ themePageStyle \} = useThemePageStyle\(\);/);

const componentId = resolve(root, "src/components/demo.vue");
const componentResult = await plugin.transform(pageCode, componentId);
assert.equal(componentResult, null, "non-page vue should not be transformed");

const existingCode = `<template>
    <page-meta :page-style="customStyle" />
    <hlw-page />
</template>`;
const existingResult = await plugin.transform(existingCode, pageId);
assert.equal(existingResult, null, "existing page-meta should not be transformed");
