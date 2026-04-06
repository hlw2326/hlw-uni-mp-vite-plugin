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
  const envFiles = [`.env.${mode}.local`, `.env.${mode}`, '.env.local', '.env'];

  const define: Record<string, string> = {};
  for (const file of envFiles) {
    try {
      const env = loadEnv(file, loadDir, '');
      for (const [key, value] of Object.entries(env)) {
        if (key.startsWith('VITE_')) {
          define[`import.meta.env.${key}`] = JSON.stringify(value || undefined);
        }
      }
    } catch { /* file may not exist */ }
  }
  return define;
}
