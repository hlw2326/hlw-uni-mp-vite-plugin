import { Plugin } from 'vite';

/**
 * 插件配置项
 */
interface PluginOption {
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
    /** 是否输出构建产物体积概览统计，默认 true */
    bundleStats?: boolean;
}
/**
 * 集成统一 Vite 插件
 */
declare function hlwPlugin(options?: PluginOption): Plugin[];

export { type PluginOption, hlwPlugin };
