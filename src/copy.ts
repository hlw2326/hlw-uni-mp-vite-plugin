import type { Plugin } from 'vite'

const V_COPY_RE = /\bv-copy((?:\.\w+)*)="([^"]*)"/g

function toTap(expr: string, isSilent: boolean): string {
	const success = isSilent ? '' : ", success: () => uni.showToast({ title: '复制成功', icon: 'none' })"
	return `@tap="() => uni.setClipboardData({ data: String(${expr})${success} })"`
}

/**
 * 模板 v-copy 指令编译期转 @tap 事件插件（零运行时依赖）
 */
export function createCopyTransformPlugin(): Plugin {
	return {
		name: 'hlw-copy-transform',
		enforce: 'pre',
		transform(code: string, id: string) {
			if (!id.endsWith('.vue') || !code.includes('v-copy')) return null
			return {
				code: code.replace(V_COPY_RE, (_, modifiers: string, expr: string) => toTap(expr, modifiers.includes('.silent'))),
				map: null
			}
		}
	}
}
