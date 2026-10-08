import { createDefaultPresets, type PresetsOptions } from "./presets";
import { defaultTheme } from "./theme";
import { defaultShortcuts } from "./shortcuts";
import { defaultRules } from "./rules";
import { defaultSafelist } from "./safelist";
import { mergeUnoConfig, deepMerge, mergeShortcuts } from "./merge";

export interface HlwUnoOptions extends Record<string, any> {
    /** 额外的 iconify 图标集合加载器 */
    iconsCollections?: Record<string, () => Promise<any>>;
    /** presetIcons 缩放比例，默认 1.2 */
    iconsScale?: number;
    /** 用户自定义主题覆盖 */
    theme?: Record<string, any>;
    /** 用户自定义快捷类（同名直接覆盖） */
    shortcuts?: any;
    /** 用户自定义规则（优先匹配） */
    rules?: any[];
    /** 用户自定义白名单（合并去重） */
    safelist?: string[];
    /** 额外的预设 */
    presets?: any[];
    /** 额外的转换器 */
    transformers?: any[];
}

/**
 * 生成基础默认 UnoCSS 配置
 */
export function getBaseUnoConfig(options: PresetsOptions = {}): Record<string, any> {
    const { presets, transformers } = createDefaultPresets(options);

    return {
        presets,
        theme: defaultTheme,
        shortcuts: defaultShortcuts,
        rules: defaultRules,
        safelist: defaultSafelist,
        transformers,
    };
}

/**
 * 定义 HLW 标准生态 UnoCSS 配置
 * 内置所有微信小程序端基础适配预设、字号变量、色彩体系、全局 .container 容器与高频图标白名单
 * 业务工程传入的配置将智能深度覆盖默认配置（同名直接覆盖，无重名则合并追加）
 *
 * @param userConfig 用户扩展或覆盖配置
 * @returns 完整的 UnoCSS 配置对象
 */
export function defineUnoConfig(userConfig: HlwUnoOptions = {}): Record<string, any> {
    const baseConfig = getBaseUnoConfig({
        iconsCollections: userConfig.iconsCollections,
        iconsScale: userConfig.iconsScale,
    });

    return mergeUnoConfig(baseConfig, userConfig);
}

// 极简与兼容别名
export const defineConfig = defineUnoConfig;
export const defineHlwUnoConfig = defineUnoConfig;
export const createHlwUnoConfig = defineUnoConfig;

export {
    defaultTheme,
    defaultShortcuts,
    defaultRules,
    defaultSafelist,
    deepMerge,
    mergeShortcuts,
    mergeUnoConfig,
};
