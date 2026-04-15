/**
 * 拦截 fs.readFileSync，在内存中向 pages.json 注入 easycom 规则
 * 文件本身不会被修改
 *
 * 注意：必须用 require('fs') 拿到 CJS module cache 里的可变对象，
 * import * as fs 会生成 ESM namespace（属性 non-configurable），无法被覆盖。
 */
import type { Plugin } from 'vite'

const EASYCOM_KEY = '^hlw-(.*)'
const EASYCOM_VALUE = '@hlw-uni/mp-vue/src/components/hlw-$1/index.vue'

let installed = false

function normalizePath(p: string): string {
    return String(p).replace(/\\/g, '/')
}

function injectRule(str: string): string | null {
    let json: Record<string, any>
    try {
        json = JSON.parse(str)
    } catch {
        return null
    }

    if (json?.easycom?.custom?.[EASYCOM_KEY] === EASYCOM_VALUE) return null

    json.easycom ??= { autoscan: true, custom: {} }
    json.easycom.custom ??= {}
    json.easycom.custom[EASYCOM_KEY] = EASYCOM_VALUE

    return JSON.stringify(json)
}

/**
 * 尽早调用（插件工厂函数执行时），确保在 uni 读取 pages.json 之前生效
 */
export function installEasycomInterceptor(): void {
    if (installed) return
    installed = true

    // 用 require 获取 CJS module cache 中的可变 fs 对象
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs') as typeof import('fs')
    const original = fs.readFileSync.bind(fs)

    fs.readFileSync = function patchedReadFileSync(path: any, options?: any): any {
        const result = original(path, options)

        if (!normalizePath(path).endsWith('/src/pages.json')) return result

        try {
            const str = Buffer.isBuffer(result) ? result.toString('utf-8') : String(result)
            const modified = injectRule(str)
            if (!modified) return result
            return Buffer.isBuffer(result) ? Buffer.from(modified) : modified
        } catch {
            return result
        }
    } as typeof fs.readFileSync
}

/** load 钩子作为补充（覆盖 Vite 模块系统路径） */
export function createEasycomPlugin(): Plugin {
    return {
        name: 'hlw-uni-easycom',
        enforce: 'pre',

        load(id) {
            const normalizedId = normalizePath(id).split('?')[0]
            if (!normalizedId.endsWith('/src/pages.json')) return null

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const fs = require('fs') as typeof import('fs')
            let raw: string
            try {
                raw = fs.readFileSync(normalizedId, 'utf-8') as string
            } catch {
                return null
            }

            const modified = injectRule(raw)
            return modified ?? raw
        },
    }
}
