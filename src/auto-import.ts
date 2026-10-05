import AutoImport from 'unplugin-auto-import/vite'
import type { Plugin } from 'vite'

/**
 * 自动导入预设清单
 */
export function getAutoImportConfig() {
	return [
		{ vue: ['ref', 'computed', 'reactive', 'watch', 'onMounted'] },
		{ '@dcloudio/uni-app': ['onShow', 'onHide', 'onLaunch', 'onShareAppMessage', 'onShareTimeline'] },
		{ '@hlw-uni-mp/use': ['useTheme', 'useRefs'] },
		{ '@hlw-uni-mp/utils': ['hlw', 'useMsg', 'toast', 'modal', 'navigateTo', 'redirectTo', 'switchTab', 'reLaunch', 'navigateBack', 'copy', 'paste', 'formatConvertNumber', 'formatNumber', 'checkAppUpdate'] },
		{ '@hlw-uni-mp/request': ['http', 'get', 'post', 'put', 'del', 'request'] }
	]
}

/**
 * 自动按需导入插件
 */
export function createAutoImportPlugin(options: { dts?: string } = {}): Plugin {
	return (AutoImport as unknown as (opt: unknown) => Plugin)({
		imports: getAutoImportConfig(),
		vueTemplate: true,
		dts: options.dts || 'src/imports.d.ts'
	})
}
