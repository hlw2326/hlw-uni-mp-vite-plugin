/**
 * AutoImport 配置
 */
export interface AutoImportOptions {
  /** 是否启用 */
  enabled?: boolean;
}

export function getAutoImportConfig() {
  return [
    { 'vue': ['ref', 'computed', 'reactive', 'onMounted', 'onShow', 'onLoad'] },
    {
      '@hlw-uni/mp-core': [
        'useLoading',
        'useMsg',
        'useRefs',
        'useDevice',
        'usePageMeta',
        'useRequest',
        'useUpload',
        'useUserStore',
        'useAppStore',
        'hlw',
        'http',
        'getPinia',
        'useApp',
        'copyToClipboard',
      ],
    },
  ];
}
