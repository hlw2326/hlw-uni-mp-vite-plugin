# @hlw-uni/mp-vite-plugin

`@hlw-uni/mp-vite-plugin` 是一组面向 UniApp 的 Vite 辅助能力，当前提供：

- `VITE_*` 环境变量注入
- Vue / UniApp / `@hlw-uni/mp-core` 常用 API 自动导入
- `hlw-*` 组件 easycom 规则注入
- `v-copy` 指令模板编译转换

运行时能力如 HTTP、消息提示、设备信息等由 `@hlw-uni/mp-core` 提供。

## 安装

```bash
npm install @hlw-uni/mp-vite-plugin
```

## 配置

```ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import hlwUni from "@hlw-uni/mp-vite-plugin";

export default defineConfig({
  plugins: [
    uni(),
    hlwUni(),
  ],
});
```

## 选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `envDir` | `string` | 项目根目录 | 手动指定 `.env` 文件读取目录 |
| `autoImport` | `boolean` | `true` | 是否启用自动导入 |
| `autoImportDts` | `string` | `src/imports.d.ts` | 自动导入声明文件输出路径 |
| `easycomReplacement` | `string` | `@hlw-uni/mp-vue/src/components/hlw-$1/index.vue` | easycom 组件解析目标路径 |

## 环境变量注入

插件会读取项目中的 `.env`、`.env.local`、`.env.{mode}`、`.env.{mode}.local` 文件，并把所有以 `VITE_` 开头的变量注入为 `import.meta.env.*`。

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_API_BASE_URL=https://api.example.com/api
```

## Auto-Import

默认会自动导入以下 API：

| 来源 | 自动导入 |
|------|---------|
| `vue` | `ref`、`computed`、`reactive`、`watch`、`watchEffect`、`nextTick`、`onMounted`、`onUnmounted`、`toRef`、`toRefs` |
| `@dcloudio/uni-app` | `onShow`、`onHide`、`onLoad`、`onReady`、`onUnload`、`onPullDownRefresh`、`onReachBottom`、`onShareAppMessage`、`onPageScroll`、`onTabItemTap`、`onLaunch`、`onError` |
| `@hlw-uni/mp-core` | `useLoading`、`useMsg`、`useRefs`、`useDevice`、`usePageMeta`、`useRequest`、`useUpload`、`hlw`、`http`、`useApp`、`setupDefaultInterceptors` |

如果项目里已经手动注册了 `unplugin-auto-import`，本插件不会重复注入。

## Easycom

插件会向 uni-app 的 easycom 系统注入 `hlw-*` 组件规则，例如：

```vue
<hlw-button />
<hlw-popup />
```

默认解析到：

```ts
@hlw-uni/mp-vue/src/components/hlw-$1/index.vue
```

如果你的组件实际发布路径不同，可以通过 `easycomReplacement` 覆盖。

## v-copy 编译转换

插件会在编译阶段把模板中的 `v-copy` 转换成 `data-copy + @tap` 形式：

```vue
<view v-copy="userId" />
<view v-copy.silent="'88329104'" />
```

这依赖 `hlw.$utils.copyFromEvent`，因此需要在运行时正确注入 `hlw`：

```ts
app.config.globalProperties["hlw"] = hlw;
```

## 构建

```bash
npm run build
npm run dev
```
