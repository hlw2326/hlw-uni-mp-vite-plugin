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
            return { define };
        },

        configResolved(_config: ResolvedConfig) {
            // 预留给后续需要读取最终配置时扩展。
        },
    };

    return [
        createCopyTransformPlugin(),
        autoImport
            ? (AutoImport({
                  imports: getAutoImportConfig(),
                  vueTemplate: true,
                  dts: autoImportDts,
              }) as Plugin)
            : null,
        mainPlugin,
        createEasycomPlugin({ replacement: easycomReplacement }),
    ].filter(Boolean) as Plugin[];
}
