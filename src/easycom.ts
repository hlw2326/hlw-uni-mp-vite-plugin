import type { Plugin } from 'vite'

const EASYCOM_KEY = '^hlw-(.*)'
const EASYCOM_PATTERN = /^hlw-(.*)/
export const DEFAULT_EASYCOM_REPLACEMENT = '@hlw-uni-mp/vue/src/components/hlw-$1/index.vue'

/**
 * 注入 easycom 组件规则
 */
export function createEasycomPlugin(options: { replacement?: string } = {}): Plugin {
	const replacement = options.replacement || DEFAULT_EASYCOM_REPLACEMENT

	return {
		name: 'hlw-easycom',
		enforce: 'pre',
		configResolved() {
			try {
				const { initEasycomsOnce } = require('@dcloudio/uni-cli-shared')
				const { easycoms } = initEasycomsOnce(process.env.UNI_INPUT_DIR, {
					dirs: [],
					platform: process.env.UNI_PLATFORM,
					isX: false
				})
				if (!easycoms.some((item: any) => String(item.pattern) === String(EASYCOM_PATTERN))) {
					easycoms.push({ name: EASYCOM_KEY, pattern: EASYCOM_PATTERN, replacement })
				}
			} catch {}
		}
	}
}
