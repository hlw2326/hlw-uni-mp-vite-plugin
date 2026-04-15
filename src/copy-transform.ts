/**
 * v-copy 编译期转换
 *
 * 在 Vue 模板编译器处理之前，将 v-copy="expr" 替换为
 * @tap="() => copyToClipboard(String((expr) ?? ''))"
 *
 * 效果：无需在 main.ts 注册指令，无需写 @tap，直接用 v-copy 即可。
 * copyToClipboard 由 unplugin-auto-import 自动注入，无需手动 import。
 *
 * 用法：
 *   <view v-copy="someText">复制</view>
 *   <text v-copy="user.id">{{ user.id }}</text>
 */
import type { Plugin } from 'vite'

const COPY_RE = /\bv-copy="([^"]*)"/g

export function createCopyTransformPlugin(): Plugin {
    return {
        name: 'hlw-uni-copy-transform',
        enforce: 'pre',

        transform(code, id) {
            if (!id.endsWith('.vue') || !code.includes('v-copy')) return null

            const result = code.replace(COPY_RE, (_, expr) =>
                `@tap="() => copyToClipboard(String((${expr}) ?? ''))"`,
            )

            return { code: result, map: null }
        },
    }
}
