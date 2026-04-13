/**
 * 环境变量注入插件
 */
import type { UserConfig } from 'vite';
import { loadEnv } from 'vite';

export interface EnvOptions {
  envDir?: string;
}

export function applyEnvPlugin(config: UserConfig, { envDir }: EnvOptions = {}, mode: string): Record<string, string> {
  const root = (config.root as string | undefined) ?? process.cwd();
  const loadDir = envDir ?? root;

  // loadEnv(mode, envDir, prefixes)
  // Vite 自动加载: .env / .env.local / .env.{mode} / .env.{mode}.local
  const env = loadEnv(mode, loadDir, '');

  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith('VITE_')) {
      define[`import.meta.env.${key}`] = JSON.stringify(value || undefined);
    }
  }
  return define;
}

