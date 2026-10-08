interface PresetsOptions {
    /** 额外的 iconify 图标集合加载器 */
    iconsCollections?: Record<string, () => Promise<any>>;
    /** presetIcons scale 缩放比例，默认 1.2 */
    iconsScale?: number;
}

declare const defaultTheme: {
    fontSize: {
        xs: (string | {
            "line-height": string;
        })[];
        sm: (string | {
            "line-height": string;
        })[];
        base: (string | {
            "line-height": string;
        })[];
        md: (string | {
            "line-height": string;
        })[];
        lg: (string | {
            "line-height": string;
        })[];
        xl: (string | {
            "line-height": string;
        })[];
        "2xl": (string | {
            "line-height": string;
        })[];
        "3xl": (string | {
            "line-height": string;
        })[];
    };
    colors: {
        primary: {
            DEFAULT: string;
            light: string;
            dark: string;
            "light-bg": string;
            "light-border": string;
        };
        success: {
            DEFAULT: string;
            50: string;
        };
        warning: {
            DEFAULT: string;
            50: string;
        };
        danger: {
            DEFAULT: string;
            50: string;
        };
        info: {
            DEFAULT: string;
            50: string;
        };
        text: {
            DEFAULT: string;
            secondary: string;
            muted: string;
            subtle: string;
            disabled: string;
        };
        bg: {
            DEFAULT: string;
            light: string;
            elevated: string;
            card: string;
            "card-muted": string;
        };
        border: {
            DEFAULT: string;
            light: string;
        };
    };
    borderRadius: {
        sm: string;
        DEFAULT: string;
        lg: string;
        full: string;
    };
    spacing: {
        sm: string;
        DEFAULT: string;
        lg: string;
        xl: string;
    };
    boxShadow: {
        none: string;
        xs: string;
        sm: string;
        DEFAULT: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        inner: string;
    };
    fontFamily: {
        sans: string[];
        mono: string[];
    };
    animation: {};
    keyframes: {};
};

declare const defaultShortcuts: Array<[string | RegExp, any]>;

declare const defaultRules: any[];

declare const defaultSafelist: string[];

/**
 * 递归深度合并对象（source 覆盖 target）
 */
declare function deepMerge<T extends Record<string, any>>(target: T, source?: Record<string, any>): T;
/**
 * 合并 Shortcuts：同名直接覆盖，新增追加
 */
declare function mergeShortcuts(defaultShortcuts: any[], userShortcuts?: any): any[];
/**
 * 深度合并 UnoCSS 全量配置
 * 业务工程传入的配置将智能覆盖或扩展系统默认配置
 */
declare function mergeUnoConfig(defaultConfig: Record<string, any>, userConfig?: Record<string, any>): Record<string, any>;

interface HlwUnoOptions extends Record<string, any> {
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
declare function getBaseUnoConfig(opts?: PresetsOptions): Record<string, any>;
/**
 * 定义 HLW 标准生态 UnoCSS 配置
 * 内置所有微信小程序端基础适配预设、字号变量、色彩体系、全局 .container 容器与高频图标白名单
 * 业务工程传入的配置将智能深度覆盖默认配置（同名直接覆盖，无重名则合并追加）
 *
 * @param conf 用户扩展或覆盖配置
 * @returns 完整的 UnoCSS 配置对象
 */
declare function hlwUnoConfig(conf?: HlwUnoOptions): Record<string, any>;

export { type HlwUnoOptions, deepMerge, defaultRules, defaultSafelist, defaultShortcuts, defaultTheme, getBaseUnoConfig, hlwUnoConfig, mergeShortcuts, mergeUnoConfig };
