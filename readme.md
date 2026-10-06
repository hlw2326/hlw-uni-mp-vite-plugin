# @hlw-uni-mp/vite-plugin

基于 Vite 与 Uni-App 的工程增强开发插件，专为 HLW 前端生态设计。集成环境变量自动注入、Easycom 组件规则挂载、`v-copy` 编译期指令转换与声明文件自动生成。

---

## 核心特性

- **环境变量与宏定义自动注入**：按运行模式动态解析 `.env` 与 `.env.[mode]`，自动挂载 `__APP_VERSION_NAME__`、`__APP_BASE_URL__` 等全局常量。
- **类型声明自动生成**：启动/构建时自动生成 `src/types/host-env.d.ts`，赋予 `import.meta.env` 与全局宏完整的 TypeScript 类型提示。
- **Easycom 自动挂载**：内置 `^hlw-(.*)` 组件匹配规则，无需在 `pages.json` 手动配置即可在模板中直接使用 `@hlw-uni-mp/vue` UI 组件。
- **`v-copy` 编译期转换**：模板中的 `v-copy="text"` 指令在编译期自动转换为原生 `@tap` 与系统剪贴板调用，100% 零运行时侵入与体积开销。
- **极速轻量**：纯净无外部冗余依赖，构建打包秒级完成。

---

## 安装

```bash
# pnpm
pnpm add -D @hlw-uni-mp/vite-plugin

# npm
npm install -D @hlw-uni-mp/vite-plugin
```

---

## 快速使用

在 `vite.config.ts` 中引入并挂载 `hlwPlugin`：

```ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { hlwPlugin } from "@hlw-uni-mp/vite-plugin";

export default defineConfig({
    plugins: [
        hlwPlugin({
            autoImport: false, // 是否开启常用 API 自动导入
        }),
        uni(),
    ],
});
```

---

## 配置项 (PluginOptions)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `cwd` | `string` | `process.cwd()` | 运行根目录 |
| `base` | `string` | `env.VITE_BASE_URL` | 覆盖基础服务端地址 |
| `wss` | `string` | `env.VITE_WSS_URL` | 覆盖 WebSocket 服务端地址 |
| `dts` | `string` | `'src/types/host-env.d.ts'` | 环境变量类型声明文件生成路径 |
| `autoImport` | `boolean` | `false` | 是否开启自动导入 |
| `autoImportDts` | `string` | - | 自动导入类型声明文件路径 |
| `easycomReplacement` | `string` | - | 自定义 Easycom 组件解析路径映射 |
| `dropConsole` | `boolean` | `mode === 'production'` | 生产构建时自动清除 `console.log` 等调试日志 |

---

## 注入的全局宏定义

插件会自动解析注入以下全局编译期常量（可在代码中直接使用）：

```ts
__APP_VERSION_CODE__  // 数字版本号，例如: 10100
__APP_VERSION_NAME__  // 字符串版本，例如: "1.1.0"
__APP_BASE_URL__      // 接口基地址，例如: "https://api.example.com"
__APP_WSS_URL__       // 通讯地址，例如: "wss://api.example.com/ws"
__APP_NAME__          // 应用名称
__APPID__             // 小程序 AppID
__HLW_ENV__           // 完整环境变量键值对象
```

---

## License

MIT
