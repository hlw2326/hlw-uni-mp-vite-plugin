/**
 * AutoImport 配置
 */
export function getAutoImportConfig(): Array<Record<string, string[]>> {
  return [
    {
      vue: [
        "ref",
        "computed",
        "reactive",
        "watch",
        "watchEffect",
        "nextTick",
        "onMounted",
        "onUnmounted",
        "toRef",
        "toRefs",
      ],
    },
    {
      "@dcloudio/uni-app": [
        "onShow",
        "onHide",
        "onLoad",
        "onReady",
        "onUnload",
        "onPullDownRefresh",
        "onReachBottom",
        "onShareAppMessage",
        "onPageScroll",
        "onTabItemTap",
        "onLaunch",
        "onError",
      ],
    },
    {
      "@hlw-uni/mp-vue": [
        "useLoading",
        "useMsg",
        "useRefs",
        "useDevice",
        "usePageMeta",
        "hlw",
        "http",
        "useApp",
        "setupInterceptors",
      ],
    },
  ];
}
