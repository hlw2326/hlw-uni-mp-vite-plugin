import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	splitting: false,
	sourcemap: false,
	external: [
		'fs',
		'path',
		'vite',
		'@dcloudio/uni-cli-shared',
		'unplugin-auto-import',
		/^unplugin-auto-import\/.*/,
		'unocss',
		/^unocss\/.*/,
		'unocss-preset-weapp',
		/^unocss-preset-weapp\/.*/,
		/^@unocss\/.*/,
		/^@iconify-json\/.*/
	]
})
