/**
 * hlw-uni Vite Plugin
 * 提供环境变量注入、auto-import、easycom 规则注入和 v-copy 编译转换。
 */
import AutoImport from "unplugin-auto-import/vite";
import type { Plugin, PluginOption, ResolvedConfig, UserConfig, ConfigEnv } from "vite";
import { applyEnvPlugin } from "./env";
import { getAutoImportConfig } from "./auto-import";
import { createEasycomPlugin, DEFAULT_EASYCOM_REPLACEMENT } from "./easycom";
import { createCopyTransformPlugin } from "./copy-transform";

export interface HlwUniPluginOptions {
    /** 手动指定 .env 文件读取目录 */
    envDir?: string;
    /** 是否启用 auto-import，默认启用 */
    autoImport?: boolean;
    /** auto-import 生成的 dts 文件路径 */
    autoImportDts?: string;
    /** easycom 组件解析路径，默认指向 @hlw-uni/mp-vue 组件源码 */
    easycomReplacement?: string;
}

function flattenPluginOptions(plugins: PluginOption[] = []): Plugin[] {
    const result: Plugin[] = [];

    for (const plugin of plugins) {
        if (!plugin) continue;
        if (Array.isArray(plugin)) {
            result.push(...flattenPluginOptions(plugin));
            continue;
        }
        if (typeof plugin === "object" && "name" in plugin) {
            result.push(plugin as Plugin);
        }
    }

    return result;
}

function hasPluginByName(plugins: PluginOption[] = [], name: string): boolean {
    return flattenPluginOptions(plugins).some((plugin) => plugin.name === name);
}

export default function HlwUniPlugin(options: HlwUniPluginOptions = {}): Plugin[] {
    const {
        envDir,
        autoImport = true,
        autoImportDts = "src/imports.d.ts",
        easycomReplacement = DEFAULT_EASYCOM_REPLACEMENT,
    } = options;

    const mainPlugin: Plugin = {
        name: "hlw-uni-mp-vite-plugin",

        config(userConfig: UserConfig, { mode }: ConfigEnv) {
            const define = applyEnvPlugin(userConfig, { envDir }, mode);
            const plugins: Plugin[] = [];

            if (autoImport && !hasPluginByName(userConfig.plugins ?? [], "unplugin-auto-import")) {
                plugins.push(
                    AutoImport({
                        imports: getAutoImportConfig(),
                        vueTemplate: true,
                        dts: autoImportDts,
                    }),
                );
            }

            return { define, plugins };
        },

        configResolved(_config: ResolvedConfig) {
            // 预留给后续需要读取最终配置时扩展。
        },
    };

    return [
        createCopyTransformPlugin(),
        mainPlugin,
        createEasycomPlugin({ replacement: easycomReplacement }),
    ];
}
