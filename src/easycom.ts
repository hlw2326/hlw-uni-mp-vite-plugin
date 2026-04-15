/**
 * 向 uni-app 的 easycom 系统注入 hlw 组件规则
 *
 * 核心问题：@dcloudio/vite-plugin-uni 的 cli/action.js 在 runDev() 中
 * 会在 build(vite.config.ts) 之前直接调用 initEasycomsOnce()，导致
 * 我们在 vite.config.ts 里注册的插件无法通过 fs.readFileSync 拦截来注入规则。
 *
 * 解决方案：在 configResolved 钩子中，直接向 initEasycomsOnce() 返回值里
 * 的 easycoms 数组（模块级引用）追加规则，无需 once 缓存失效。
 */
import type { Plugin } from 'vite'

const EASYCOM_KEY = '^hlw-(.*)'
const EASYCOM_PATTERN = /^hlw-(.*)/
const EASYCOM_VALUE = '@hlw-uni/mp-vue/src/components/hlw-$1/index.vue'

/** 在 configResolved 钩子中直接向 easycoms 数组注入规则 */
export function createEasycomPlugin(): Plugin {
    return {
        name: 'hlw-uni-easycom',
        enforce: 'pre',

        configResolved() {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const cliShared = require('@dcloudio/uni-cli-shared') as any
                if (typeof cliShared?.initEasycomsOnce !== 'function') return

                // initEasycomsOnce 已在 cli/action.js 中被调用并缓存，
                // 此处调用返回缓存的 res 对象（含模块级 easycoms 数组引用）
                const result = cliShared.initEasycomsOnce(
                    process.env.UNI_INPUT_DIR,
                    {
                        dirs: [],
                        platform: process.env.UNI_PLATFORM || 'mp-weixin',
                        isX: false,
                    }
                )

                const easycoms: any[] = result?.easycoms
                if (!Array.isArray(easycoms)) return

                // 避免重复注入
                const alreadyExists = easycoms.some(
                    (e) => e?.pattern?.toString() === EASYCOM_PATTERN.toString()
                )
                if (alreadyExists) return

                easycoms.push({
                    name: EASYCOM_KEY,
                    pattern: EASYCOM_PATTERN,
                    replacement: EASYCOM_VALUE,
                })
            } catch {
                // 容错：非 uni-app 环境下忽略
            }
        },
    }
}
