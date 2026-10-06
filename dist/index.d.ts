import { Plugin } from 'vite';

/**
 * 插件配置项
 */
interface PluginOptions {
    /** 运行根目录 */
    cwd?: string;
    /** 基础服务址 */
    base?: string;
    /** 通讯服务址 */
    wss?: string;
    /** 声明文件径 */
    dts?: string;
    /** 开启自动入 */
    autoImport?: boolean;
    /** 自动入声明 */
    autoImportDts?: string;
    /** 组件替换规则 */
    easycomReplacement?: string;
    /** 生产环境构建时是否自动清除 console.log，默认 true */
    dropConsole?: boolean;
}
/**
 * 集成统一 Vite 插件
 */
declare function hlwPlugin(options?: PluginOptions): Plugin[];

export { type PluginOptions, hlwPlugin };
