import fs from 'fs'
import path from 'path'
import type { Plugin, ConfigEnv } from 'vite'
import { loadEnv, toCode, genDts, writeDts } from './env'
import { createCopyTransformPlugin } from './copy'
import { createEasycomPlugin } from './easycom'
import { createAutoImportPlugin } from './auto-import'
import { createMpShimPlugin } from './shim'

/**
 * 插件配置项
 */
export interface PluginOption {
	/** 运行根目录 */
	cwd?: string
	/** 基础服务址 */
	base?: string
	/** 通讯服务址 */
	wss?: string
	/** 声明文件径 */
	dts?: string
	/** 开启自动入 */
	autoImport?: boolean
	/** 自动入声明 */
	autoImportDts?: string
	/** 组件替换规则 */
	easycomReplacement?: string
	/** 生产环境构建时是否自动清除 console.log，默认 true */
	dropConsole?: boolean
	/** 是否输出构建产物体积概览统计，默认 true */
	bundleStats?: boolean
}

/**
 * 注入应用宏定义与环境变量插件
 */
function createDefinePlugin(options: PluginOption = {}): Plugin {
	return {
		name: 'hlw-define',
		config(_, { mode }: ConfigEnv) {
			const root = options.cwd || process.cwd()
			const envDict = loadEnv(mode, root)
			const pkg = JSON.parse(fs.readFileSync(path.resolve(root, 'package.json'), 'utf-8'))

			const versionName = (envDict.VITE_APP_VERSION || pkg.version) as string
			const versionCode = toCode(versionName)
			const baseUrl = options.base || envDict.VITE_BASE_URL
			const wssUrl = options.wss || envDict.VITE_WSS_URL
			const appName = (envDict.VITE_APP_NAME || pkg.name) as string
			const appId = envDict.VITE_APPID

			// 自动生成环境变量类型声明文件
			writeDts(path.resolve(root, options.dts || 'src/types/host-env.d.ts'), genDts(envDict))

			// 同步到当前 Node 进程
			Object.assign(process.env, envDict)

			const define: Record<string, string> = {
				__APP_VERSION_CODE__: JSON.stringify(versionCode),
				__APP_VERSION_NAME__: JSON.stringify(versionName),
				__APP_BASE_URL__: JSON.stringify(baseUrl),
				__APP_WSS_URL__: JSON.stringify(wssUrl),
				__APP_NAME__: JSON.stringify(appName),
				__APPID__: JSON.stringify(appId),
				__HLW_ENV__: JSON.stringify(envDict),
			}
			for (const [key, value] of Object.entries(envDict)) {
				if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
					define[`import.meta.env.${key}`] = JSON.stringify(value)
				}
			}

			const isProd = mode === 'production'
			const shouldDrop = options.dropConsole ?? isProd

			return {
				define,
				esbuild: shouldDrop
					? { pure: ['console.log', 'console.info', 'console.debug'] }
					: undefined
			}
		}
	}
}

function createBundleStatsPlugin(): Plugin {
	return {
		name: 'hlw-bundle-stats',
		apply: 'build',
		generateBundle(_, bundle) {
			const chunks = Object.values(bundle).filter((b) => b.type === 'chunk')
			let totalBytes = 0
			for (const chunk of chunks) {
				const size = 'code' in chunk ? Buffer.byteLength(chunk.code, 'utf8') : 0
				totalBytes += size
			}
			const totalKb = (totalBytes / 1024).toFixed(2)
			console.log(`[hlw-vite] 编译产物包体统计: 共有 ${chunks.length} 个代码分块，总大小约 ${totalKb} KB`)
		}
	}
}

/**
 * 集成统一 Vite 插件
 */
export function hlwPlugin(options: PluginOption = {}): Plugin[] {
	const plugins: Plugin[] = [
		createCopyTransformPlugin(),
		createDefinePlugin(options),
		createMpShimPlugin(),
		createEasycomPlugin({ replacement: options.easycomReplacement })
	]

	if (options.autoImport) {
		plugins.push(createAutoImportPlugin({ dts: options.autoImportDts }))
	}

	if (options.bundleStats !== false) {
		plugins.push(createBundleStatsPlugin())
	}

	return plugins
}
