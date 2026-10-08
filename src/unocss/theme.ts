export const defaultTheme = {
    // 字号全部走 CSS 变量，由 mp-vue/theme 的字体档位（small/normal/large/xlarge）
    // 运行时注入 --font-* 驱动；style.scss 里的兜底值保证首屏不闪烁。
    // 档位由 mp-vue/font.ts 定义，六档对应 --font-xs..xl。
    fontSize: {
        xs: ["var(--font-xs)", { "line-height": "1.5" }],
        sm: ["var(--font-sm)", { "line-height": "1.5" }],
        base: ["var(--font-base)", { "line-height": "1.5" }],
        md: ["var(--font-md)", { "line-height": "1.5" }],
        lg: ["var(--font-lg)", { "line-height": "1.5" }],
        xl: ["var(--font-xl)", { "line-height": "1.5" }],
        "2xl": ["var(--font-2xl)", { "line-height": "1.4" }],
        "3xl": ["var(--font-3xl)", { "line-height": "1.2" }],
    },
    colors: {
        primary: {
            DEFAULT: "var(--primary-color)",
            light: "var(--primary-light)",
            dark: "var(--primary-dark)",
            "light-bg": "var(--primary-light-bg)",
            "light-border": "var(--primary-light-border)",
        },
        success: {
            DEFAULT: "var(--success-color)",
            50: "var(--success-light-bg)",
        },
        warning: {
            DEFAULT: "var(--warning-color)",
            50: "var(--warning-light-bg)",
        },
        danger: {
            DEFAULT: "var(--danger-color)",
            50: "var(--danger-light-bg)",
        },
        info: {
            DEFAULT: "var(--info-color)",
            50: "var(--info-light-bg)",
        },
        text: {
            DEFAULT: "var(--text-primary)",
            secondary: "var(--text-secondary)",
            muted: "var(--text-muted)",
            subtle: "var(--text-subtle)",
            disabled: "var(--text-disabled)",
        },
        bg: {
            DEFAULT: "var(--bg-page)",
            light: "var(--bg-page)",
            elevated: "var(--bg-elevated)",
            card: "var(--surface-card)",
            "card-muted": "var(--surface-card-muted)",
        },
        border: {
            DEFAULT: "var(--border-color)",
            light: "var(--border-color-light)",
        },
    },
    borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        lg: "8px",
        full: "9999px",
    },
    spacing: {
        sm: "5px",
        DEFAULT: "10px",
        lg: "15px",
        xl: "20px",
    },
    boxShadow: {
        none: "none",
        xs: "none",
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
    },
    fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Helvetica Neue", "sans-serif"],
        mono: ["Inter", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
    },
    animation: {},
    keyframes: {},
};
