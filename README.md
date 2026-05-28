# @hlw-uni/mp-vite-plugin

<p align="center">
  <img src="https://img.shields.io/badge/vite-5.x-blue.svg" alt="Vite 5">
  <img src="https://img.shields.io/badge/typescript-supported-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/platform-uni--app-red.svg" alt="uni-app">
</p>

> **hlw-uni 小程序打包与开发编译专用的 Vite 辅助插件**  
> 提供多端小程序环境变量的安全注入、核心 API 自动按需导入（Auto-import）、easycom 自动按需注册以及 `v-copy` 模版静态事件转译等核心构建能力。

---

## ✨ 核心特性

- 🌍 **安全的环境变量注入** — 自动读取 `.env` 等文件，将以 `VITE_` 开头的变量安全地注入到 `import.meta.env.*` 中。
- ⚡ **无感式 API 自动导入** — 针对 `vue`、`@dcloudio/uni-app` 与 `@hlw-uni/mp-vue` 的真高频 API 提供自动按需导入，极大精简业务代码中的 `import` 噪音。
- 🧩 **easycom 规则注入** — 自动为 `hlw-*` UI 组件生成 easycom 组件映射配置，免去开发者手动编辑配置文件的烦恼。
- 📋 **v-copy 编译期零成本转译** — 静态解析模版中的 `v-copy` 指令并直译为原生的 `@tap` 微信小程序剪贴板事件，消除运行期 directive 的性能负担，同时在主入口自动注入指令注册进行安全兜底。

---

## 📦 安装

在包含 Vite 编译流的小程序项目根目录中进行安装：

```bash
pnpm add -D @hlw-uni/mp-vite-plugin
```

---

## 🔧 快速启用配置

在项目根目录下的 `vite.config.ts` 中注册并配置插件：

```ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import HlwUni from "@hlw-uni/mp-vite-plugin";

export default defineConfig(async () => {
    return {
        plugins: [
            uni(),
            // 启用 hlw-uni 辅助构建插件
            HlwUni({ 
                autoImport: true 
            }),
        ],
    };
});
```

---

## ⚙️ 插件可选参数

| 参数名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `envDir` | `string` | 项目根目录 | 手动指定 `.env`、`.env.development` 等环境文件的读取目录 |
| `autoImport` | `boolean` | `true` | 是否启用高频 API 自动导入 |
| `autoImportDts` | `string` | `"src/imports.d.ts"` | 自动导入生成的 TypeScript `.d.ts` 类型声明文件输出路径 |
| `easycomReplacement` | `string` | `"@hlw-uni/mp-vue/src/components/hlw-$1/index.vue"` | 自定义 UI 组件映射定位的相对/绝对路径 |

---

## 🛠️ 模块详解

### 1. v-copy 点击复制模版直译机制 (`copy-transform`)

插件在 `enforce: "pre"` 阶段拦截 `.vue` 组件的读取。当在模版中检测到 `v-copy` 点击复制语法糖时，会直接在编译阶段将其静态替换为无外部依赖的小程序原生点击监听。

* **转译对比**：
  * **输入**：
    ```vue
    <view v-copy="userId" class="copy-btn">复制ID</view>
    <view v-copy.silent="'10086'">静默复制</view>
    ```
  * **输出**：
    ```vue
    <view @tap="() => uni.setClipboardData({ data: String((userId) ?? ''), showToast: false, success: () => true ? uni.showToast({ title: '复制成功', icon: 'none', duration: 1500 }) : undefined })" class="copy-btn">复制ID</view>
    <view @tap="() => uni.setClipboardData({ data: String(('10086') ?? ''), showToast: false, success: () => false ? uni.showToast({ title: '复制成功', icon: 'none', duration: 1500 }) : undefined })">静默复制</view>
    ```
* **运行时指令自动挂载（`directive-inject`）**：
  为了彻底阻断开发时的警告并提供动态兜底能力，插件还会自动扫描 `main.ts` 入口文件，在初始化阶段为应用实例动态注入运行时指令定义，确保 Vue 运行时稳定不报错：
  ```ts
  import { vCopy } from "@hlw-uni/mp-vue";
  app.directive("copy", vCopy);
  ```

### 2. 真高频 API 自动导入 (`auto-import`)

当 `autoImport` 选项开启时，插件会为项目自动注入以下高频使用的核心 API：

| 来源库 | 自动按需导入的 API 列表 |
| :--- | :--- |
| **`vue`** | `ref`, `computed`, `reactive`, `watch`, `onMounted` |
| **`@dcloudio/uni-app`** | `onShow`, `onHide`, `onLaunch`, `onShareAppMessage`, `onShareTimeline` |
| **`@hlw-uni/mp-vue`** | `hlw`, `http`, `useMsg` |

> [!NOTE]
> 插件采用了高度精简的导入清单，只列入最高频的开发函数，以规避过多 API 被滥用导致 IDE 类型系统噪音与混乱。若需使用其他非高频函数，请在业务代码中正常显式 `import`。

### 3. easycom 组件定位自动发现 (`easycom`)

插件会在项目配置初始化时自动与 uni-app easycom 机制结合，拦截带有 `hlw-` 前缀的 UI 组件。将它们路由至如下路径进行解析和热重构，开发者在编写页面时可以直接使用组件，免除了一切手动 `import` 的步骤：

```ts
@hlw-uni/mp-vue/src/components/hlw-$1/index.vue
```

---

## 💻 插件本地开发

对本 Vite 插件进行功能增强、更新或修补时，可采用如下构建指令：

```bash
# 1. 启动监听式自动打包编译 (开发模式)
pnpm dev

# 2. 生成带完备 SourceMap 与 TS 类型定义的生产包
pnpm build
```

---

## 📄 许可协议

本插件为**内部私有开发工具**，仅可用于 `hlw-uni` 对应关联小程序项目的打包构建，严禁向外部公开分发或上传至公共 NPM 仓库。
