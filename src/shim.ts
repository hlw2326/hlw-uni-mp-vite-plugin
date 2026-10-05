import type { Plugin } from 'vite'

/**
 * 小程序虚拟 node:url 垫片插件
 */
export function createMpShimPlugin(): Plugin {
	return {
		name: 'hlw-uni-mp-shim',
		resolveId(id: string) {
			if (id === 'url' || id === 'node:url') return '\0virtual:empty-url'
		},
		load(id: string) {
			if (id === '\0virtual:empty-url') return 'export default {}; export const pathToFileURL = (path: string) => ({ href: path });'
		},
		generateBundle() {
			this.emitFile({
				type: 'asset',
				fileName: 'common/url.js',
				source: 'module.exports = { pathToFileURL: (path) => ({ href: path }) };\n'
			})
		},
		renderChunk(code: string, chunk: { fileName: string }) {
			if (chunk.fileName.includes('vendor') || chunk.fileName.includes('app')) {
				return { code: code.replace(/require\(["']url["']\)/g, '({})'), map: null }
			}
		}
	}
}
