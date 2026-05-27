import type { Plugin } from "vite";

/**
 * 自动注入 v-copy 运行时指令注册
 *
 * 如果在代码中没有手动注册 v-copy 运行时指令，该插件会在打包阶段自动在 main.ts 或者是 main.js 注入：
 * import { vCopy } from "@hlw-uni/mp-vue";
 * app.directive("copy", vCopy);
 */
export function createDirectiveInjectPlugin(): Plugin {
    return {
        name: "hlw-uni-directive-inject",
        enforce: "pre", // 确保在 Vue 核心编译前处理

        transform(code: string, id: string) {
            const normalizedId = id.replace(/\\/g, "/");
            // 仅针对入口文件进行处理
            if (!normalizedId.endsWith("/src/main.ts") && !normalizedId.endsWith("/src/main.js")) {
                return null;
            }

            // 如果已经被注册或没有实例化，则不处理
            if (code.includes('app.directive("copy"') || code.includes("app.directive('copy'")) {
                return null;
            }

            let newCode = code;

            // 1. 自动注入 vCopy 导入
            if (!newCode.includes("vCopy")) {
                newCode = `import { vCopy } from "@hlw-uni/mp-vue";\n` + newCode;
            }

            // 2. 自动在 bootstrap(app) 之前，或者 app 示例化之后注入注册逻辑
            if (newCode.includes("bootstrap(app)")) {
                newCode = newCode.replace(
                    "bootstrap(app)",
                    `app.directive("copy", vCopy);\n    bootstrap(app)`
                );
            } else if (newCode.includes("const app = createSSRApp(App)")) {
                newCode = newCode.replace(
                    "const app = createSSRApp(App)",
                    `const app = createSSRApp(App);\n    app.directive("copy", vCopy);`
                );
            } else if (newCode.includes("const app = createSSRApp")) {
                newCode = newCode.replace(
                    /const app = (?:createSSRApp|createApp)\(.*\);?/g,
                    `$& \n    app.directive("copy", vCopy);`
                );
            }

            return {
                code: newCode,
                map: null
            };
        }
    };
}
