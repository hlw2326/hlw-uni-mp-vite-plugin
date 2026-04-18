/**
 * 向 uni-app 的 easycom 系统注入 hlw 组件规则。
 */
import type { Plugin } from "vite";

const EASYCOM_KEY = "^hlw-(.*)";
const EASYCOM_PATTERN = /^hlw-(.*)/;
export const DEFAULT_EASYCOM_REPLACEMENT = "@hlw-uni/mp-vue/src/components/hlw-$1/index.vue";

interface EasycomPluginOptions {
    replacement?: string;
}

interface EasycomRule {
    name?: string;
    pattern?: RegExp;
    replacement?: string;
}

interface EasycomResult {
    easycoms?: EasycomRule[];
}

interface UniCliSharedLike {
    initEasycomsOnce?: (inputDir: string | undefined, options: { dirs: string[]; platform: string; isX: boolean }) => EasycomResult;
}

/**
 * 在 configResolved 钩子中直接向 easycoms 数组注入规则。
 */
export function createEasycomPlugin(options: EasycomPluginOptions = {}): Plugin {
    const replacement = options.replacement ?? DEFAULT_EASYCOM_REPLACEMENT;

    return {
        name: "hlw-uni-easycom",
        enforce: "pre",

        configResolved() {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const cliShared = require("@dcloudio/uni-cli-shared") as UniCliSharedLike;
                if (typeof cliShared?.initEasycomsOnce !== "function") return;

                const result = cliShared.initEasycomsOnce(process.env.UNI_INPUT_DIR, {
                    dirs: [],
                    platform: process.env.UNI_PLATFORM || "mp-weixin",
                    isX: false,
                });

                const easycoms = result?.easycoms;
                if (!Array.isArray(easycoms)) return;

                const alreadyExists = easycoms.some((item) => item?.pattern?.toString() === EASYCOM_PATTERN.toString());
                if (alreadyExists) return;

                easycoms.push({
                    name: EASYCOM_KEY,
                    pattern: EASYCOM_PATTERN,
                    replacement,
                });
            } catch {
                // 非 uni-app 环境下静默跳过。
            }
        },
    };
}
