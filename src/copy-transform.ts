/**
 * v-copy 编译期转换
 *
 * 在 Vue 模板编译器处理之前，将复制指令转换为 :data-copy + @tap 方法引用。
 * hlw 由 unplugin-auto-import 自动注入，无需手动 import。
 *
 * 支持写法：
 *   <view v-copy="userId">          — 复制变量，显示"复制成功"提示
 *   <view v-copy="'88329104'">      — 复制静态字符串
 *   <view v-copy.silent="userId">   — 复制但不显示提示
 */
import type { Plugin } from 'vite'

// 匹配 v-copy 或 v-copy.silent（及其他修饰符）
const V_COPY_RE = /\bv-copy((?:\.\w+)*)="([^"]*)"/g

function toTap(expr: string, silent: boolean) {
    const showToast = silent ? 'false' : 'true'
    return `:data-copy="String((${expr}) ?? '')" :data-copy-toast="${showToast}" @tap="($e) => hlw.$utils.copyFromEvent($e)"`
}

export function createCopyTransformPlugin(): Plugin {
    return {
        name: 'hlw-uni-copy-transform',
        enforce: 'pre',

        transform(code, id) {
            if (!id.endsWith('.vue')) return null
            if (!code.includes('v-copy')) return null

            const result = code.replace(V_COPY_RE, (_, modifiers: string, expr: string) => {
                const silent = modifiers.includes('.silent')
                return toTap(expr, silent)
            })

            return { code: result, map: null }
        },
    }
}
