/**
 * v-copy 编译期转换
 *
 * 在 Vue 模板编译前，将 v-copy 转为 @tap 调用。
 */
import type { Plugin } from "vite";

const V_COPY_RE = /\bv-copy((?:\.\w+)*)="([^"]*)"/g;

function toTap(expr: string, silent: boolean) {
    const showToast = silent ? "false" : "true";
    return `@tap="() => hlw.$utils.copy(String((${expr}) ?? ''), ${showToast})"`;
}

export function createCopyTransformPlugin(): Plugin {
    return {
        name: "hlw-uni-copy-transform",
        enforce: "pre",

        transform(code: string, id: string) {
            if (!id.endsWith(".vue")) return null;
            if (!code.includes("v-copy")) return null;

            const result = code.replace(V_COPY_RE, (_match: string, modifiers: string, expr: string) => {
                const silent = modifiers.includes(".silent");
                return toTap(expr, silent);
            });

            return { code: result, map: null };
        },
    };
}
