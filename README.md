# @hlw-uni/mp-vite-plugin

UniApp Vite 编译插件 — 负责编译时的环境变量注入、SCSS 主题注入和 Auto-Import。

运行时功能（HTTP 请求、消息提示、设备信息等）由 `@hlw-uni/mp-core` 提供。

## 功能

| 功能 | 说明 |
|------|------|
| **环境变量注入** | 自动读取项目 `.env.*` 文件，通过 `define` 将 `VITE_` 变量注入编译产物 |
| **SCSS 主题** | 通过 `additionalData` 注入 `$primary-color` SCSS 变量 |
| **Auto-Import** | 自动导入 Vue 常用 API 和 `@hlw-uni/mp-core` Composables，无需手动 import |

> 全局 API（`hlw.$msg` 等）通过 `main.ts` 中的 `app.config.globalProperties['hlw'] = hlw` 显式注入，不由插件处理。

## 安装

```bash
npm install @hlw-uni/mp-vite-plugin
```

## 配置 vite.config.ts

```ts
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import hlwUni from '@hlw-uni/mp-vite-plugin';

export default defineConfig({
  plugins: [
    uni(),
    hlwUni({ primaryColor: '#3b82f6' }),
  ],
});
```

## 选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `primaryColor` | `string` | `#3b82f6` | 主题色，注入为 SCSS `$primary-color` 变量 |
| `envDir` | `string` | 项目根目录 | 手动指定 `.env` 文件读取目录 |

## 环境变量

在项目根目录创建 `.env.*` 文件（变量名以 `VITE_` 开头）：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_API_BASE_URL=https://api.example.com/api
```

> `VITE_API_BASE_URL` 会通过 `define` 编译时注入到 `@hlw-uni/mp-core` 的 HTTP 请求中。

## Auto-Import

以下 API 无需手动 import，插件会在编译时自动注入：

| 来源 | 自动导入 |
|------|---------|
| `vue` | `ref`, `computed`, `reactive` |
| `@hlw-uni/mp-core` | `useHttp`, `useLoading`, `useMsg`, `useRefs`, `useDevice`, `useUserStore`, `useAppStore`, `hlw` |

## SCSS 主题变量

在 `.vue` 或 `.scss` 文件中可直接使用 `$primary-color`：

```scss
.primary-btn {
  background-color: $primary-color;
}
```

## 依赖

```json
{
  "peerDependencies": {
    "@dcloudio/vite-plugin-uni": ">=3.0.0",
    "@hlw-uni/mp-core": ">=1.0.0",
    "vite": ">=5.0.0"
  },
  "dependencies": {
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0"
  }
}
```

## 构建

```bash
npm run build   # 构建产物到 dist/
npm run dev     # 监听模式
```
