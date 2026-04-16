/**
 * AutoImport 配置
 */
export interface AutoImportOptions {
  /** 是否启用 */
  enabled?: boolean;
}

export function getAutoImportConfig() {
  return [
    { vue: ['ref', 'computed', 'reactive', 'watch', 'watchEffect', 'nextTick', 'onMounted', 'onUnmounted', 'toRef', 'toRefs'] },
    {
      '@dcloudio/uni-app': [
        'onShow',
        'onHide',
        'onLoad',
        'onReady',
        'onUnload',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onTabItemTap',
        'onLaunch',
        'onError',
      ],
    },
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
      ],
    },
  ];
}
