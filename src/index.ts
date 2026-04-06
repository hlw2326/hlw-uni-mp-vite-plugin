/**
 * hlw-uni Vite Plugin
 * 环境变量注入 · SCSS 主题 · 全局 API 注入
 */
import type { Plugin, UserConfig } from 'vite';
import { applyEnvPlugin } from './env';
import { applyThemePlugin } from './theme';
import { getAutoImportConfig } from './auto-import';

export interface HlwUniPluginOptions {
  /** 主题色，注入为 SCSS $primary-color 变量 */
  primaryColor?: string;
  /** 手动指定 .env 文件读取目录 */
  envDir?: string;
}

export default function hlwUniPlugin(options: HlwUniPluginOptions = {}): Plugin {
  const { primaryColor = '#3b82f6', envDir } = options;

  return {
    name: 'hlw-uni-mp-vite-plugin',

    config(userConfig, { mode }) {
      const define = applyEnvPlugin(userConfig, { envDir }, mode);

      return {
        ...applyThemePlugin({ primaryColor }),
        define,
      };
    },

    configResolved(config: UserConfig) {
      const hasAutoImport = config.plugins?.some(
        (p) => (p as any).name === 'unplugin-auto-import',
      );
      if (hasAutoImport) return;

      // CJS/ESM 兼容：动态获取 unplugin-auto-import
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('unplugin-auto-import/vite');
      const AutoImport = (mod as any).default ?? mod;

      config.plugins!.push(
        AutoImport({
          imports: getAutoImportConfig(),
          vueTemplate: true,
          dts: false,
          dirs: [],
          resolvers: [],
        }),
      );
    },
  };
}
