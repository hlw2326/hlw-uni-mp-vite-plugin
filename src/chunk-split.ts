/**
 * 代码分割策略
 */
export function getManualChunks(id: string): string | undefined {
  if (/node_modules\/(vue|@vue)/.test(id)) return 'vue-vendor';
  if (/node_modules\/@dcloudio/.test(id)) return 'uni-vendor';
  if (/node_modules\/@hlw-uni/.test(id)) return 'hlw-core';
}
