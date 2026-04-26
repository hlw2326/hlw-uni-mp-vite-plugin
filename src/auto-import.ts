/**
 * AutoImport 配置
 *
 * 只列「真高频」符号，业务里 import 一两次的让业务文件自己显式 import，
 * 减少 imports.d.ts 噪音和 IDE 智能提示干扰。
 */
export function getAutoImportConfig(): Array<Record<string, string[]>> {
  return [
    {
      vue: ["ref", "computed", "reactive", "watch", "onMounted"],
    },
    {
      "@dcloudio/uni-app": [
        "onShow",
        "onHide",
        "onLaunch",
        "onShareAppMessage",
        "onShareTimeline",
      ],
    },
    {
      "@hlw-uni/mp-vue": ["hlw", "http", "useMsg"],
    },
  ];
}
