/**
 * 递归深度合并对象（source 覆盖 target）
 */
export function deepMerge<T extends Record<string, any>>(target: T, source?: Record<string, any>): T {
    if (!source) return target;
    const output: Record<string, any> = { ...target };

    for (const key of Object.keys(source)) {
        const sourceVal = source[key];
        const targetVal = output[key];

        if (
            sourceVal &&
            typeof sourceVal === "object" &&
            !Array.isArray(sourceVal) &&
            targetVal &&
            typeof targetVal === "object" &&
            !Array.isArray(targetVal)
        ) {
            output[key] = deepMerge(targetVal, sourceVal);
        } else if (sourceVal !== undefined) {
            output[key] = sourceVal;
        }
    }

    return output as T;
}

/**
 * 合并 Shortcuts：同名直接覆盖，新增追加
 */
export function mergeShortcuts(defaultShortcuts: any[], userShortcuts?: any): any[] {
    if (!userShortcuts) return defaultShortcuts;

    // 如果用户传的是 Record<string, string> 对象，转换为标准元组数组
    const normalizedUser: any[] = Array.isArray(userShortcuts)
        ? userShortcuts
        : Object.entries(userShortcuts);

    if (!normalizedUser.length) return defaultShortcuts;

    // 收集用户定义中要覆盖的静态 Shortcut 名称
    const userKeys = new Set<string>();
    for (const item of normalizedUser) {
        if (Array.isArray(item) && typeof item[0] === "string") {
            userKeys.add(item[0]);
        }
    }

    // 剔除默认配置中被用户同名覆盖的项
    const filteredDefaults = defaultShortcuts.filter((item) => {
        if (Array.isArray(item) && typeof item[0] === "string") {
            return !userKeys.has(item[0]);
        }
        return true;
    });

    return [...filteredDefaults, ...normalizedUser];
}

/**
 * 深度合并 UnoCSS 全量配置
 * 业务工程传入的配置将智能覆盖或扩展系统默认配置
 */
export function mergeUnoConfig(defaultConfig: Record<string, any>, userConfig: Record<string, any> = {}): Record<string, any> {
    const {
        theme: userTheme,
        shortcuts: userShortcuts,
        rules: userRules,
        safelist: userSafelist,
        presets: userPresets,
        transformers: userTransformers,
        ...restUser
    } = userConfig;

    return {
        ...defaultConfig,
        ...restUser,
        // Theme 深度覆盖
        theme: deepMerge(defaultConfig.theme || {}, userTheme),
        // Shortcuts 同名覆盖 + 新增追加
        shortcuts: mergeShortcuts(defaultConfig.shortcuts || [], userShortcuts),
        // Rules 用户自定义优先排在前面，优先匹配生效
        rules: [
            ...(userRules || []),
            ...(defaultConfig.rules || []),
        ],
        // Safelist 自动去重合并
        safelist: Array.from(
            new Set([
                ...(defaultConfig.safelist || []),
                ...(userSafelist || []),
            ])
        ),
        // Presets 与 Transformers 基础之上追加
        presets: [
            ...(defaultConfig.presets || []),
            ...(userPresets || []),
        ],
        transformers: [
            ...(defaultConfig.transformers || []),
            ...(userTransformers || []),
        ],
    };
}
