"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/unocss/index.ts
var unocss_exports = {};
__export(unocss_exports, {
  deepMerge: () => deepMerge,
  defaultRules: () => defaultRules,
  defaultSafelist: () => defaultSafelist,
  defaultShortcuts: () => defaultShortcuts,
  defaultTheme: () => defaultTheme,
  getBaseUnoConfig: () => getBaseUnoConfig,
  hlwUnoConfig: () => hlwUnoConfig,
  mergeShortcuts: () => mergeShortcuts,
  mergeUnoConfig: () => mergeUnoConfig
});
module.exports = __toCommonJS(unocss_exports);

// src/unocss/presets.ts
var import_unocss_preset_weapp = __toESM(require("unocss-preset-weapp"));
var import_transformer = require("unocss-preset-weapp/transformer");
var import_transformer_directives = __toESM(require("@unocss/transformer-directives"));
var import_preset_icons = require("@unocss/preset-icons");
function createDefaultPresets(options = {}) {
  const { presetWeappAttributify, transformerAttributify } = (0, import_transformer.extractorAttributify)();
  const presets = [
    (0, import_unocss_preset_weapp.default)(),
    presetWeappAttributify(),
    (0, import_preset_icons.presetIcons)({
      scale: options.iconsScale ?? 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      },
      collections: options.iconsCollections
    })
  ];
  const transformers = [
    (0, import_transformer_directives.default)({ enforce: "pre" }),
    transformerAttributify(),
    (0, import_transformer.transformerClass)()
  ];
  return { presets, transformers };
}

// src/unocss/theme.ts
var defaultTheme = {
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
    "3xl": ["var(--font-3xl)", { "line-height": "1.2" }]
  },
  colors: {
    primary: {
      DEFAULT: "var(--primary-color)",
      light: "var(--primary-light)",
      dark: "var(--primary-dark)",
      "light-bg": "var(--primary-light-bg)",
      "light-border": "var(--primary-light-border)"
    },
    success: {
      DEFAULT: "var(--success-color)",
      50: "var(--success-light-bg)"
    },
    warning: {
      DEFAULT: "var(--warning-color)",
      50: "var(--warning-light-bg)"
    },
    danger: {
      DEFAULT: "var(--danger-color)",
      50: "var(--danger-light-bg)"
    },
    info: {
      DEFAULT: "var(--info-color)",
      50: "var(--info-light-bg)"
    },
    text: {
      DEFAULT: "var(--text-primary)",
      secondary: "var(--text-secondary)",
      muted: "var(--text-muted)",
      subtle: "var(--text-subtle)",
      disabled: "var(--text-disabled)"
    },
    bg: {
      DEFAULT: "var(--bg-page)",
      light: "var(--bg-page)",
      elevated: "var(--bg-elevated)",
      card: "var(--surface-card)",
      "card-muted": "var(--surface-card-muted)"
    },
    border: {
      DEFAULT: "var(--border-color)",
      light: "var(--border-color-light)"
    }
  },
  borderRadius: {
    sm: "2px",
    DEFAULT: "4px",
    lg: "8px",
    full: "9999px"
  },
  spacing: {
    sm: "5px",
    DEFAULT: "10px",
    lg: "15px",
    xl: "20px"
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
    inner: "none"
  },
  fontFamily: {
    sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Helvetica Neue", "sans-serif"],
    mono: ["Inter", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
  },
  animation: {},
  keyframes: {}
};

// src/unocss/shortcuts.ts
var defaultShortcuts = [
  ["container", "relative z-10 flex flex-col w-full mx-auto p-3.5 gap-3.5 text-slate-800"],
  ["flex-center", "flex justify-center items-center"],
  ["col-center", "flex flex-col justify-center items-center"],
  ["flex-between", "flex items-center justify-between"],
  ["flex-items-center", "flex items-center"],
  ["text-ellipsis", "whitespace-nowrap overflow-hidden text-ellipsis"],
  ["abs-center", "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"],
  ["btn", "relative inline-flex items-center justify-center px-4 text-sm text-center whitespace-nowrap border border-transparent rounded outline-none"],
  ["btn-primary", "text-white bg-primary border-primary"],
  ["btn-success", "text-white bg-success border-success"],
  ["btn-warning", "text-white bg-warning border-warning"],
  ["btn-danger", "text-white bg-danger border-danger"],
  ["btn-info", "text-white bg-info border-info"],
  ["btn-default", "text-gray-700 bg-white border-gray-300"],
  ["btn-plain", "bg-transparent"],
  ["btn-round", "rounded-full"],
  ["btn-block", "flex w-full"],
  ["btn-disabled", "opacity-50"],
  ["btn-loading", "inline-block w-3.5 h-3.5 mr-1.5 border-2 border-current border-l-transparent rounded-full"],
  ["tag-primary", "px-2 py-1 text-xs text-primary bg-primary-50 rounded"],
  ["action-card", "bg-white rounded-2xl p-4 border border-slate-100"],
  ["u-border-b-dashed", "border-0 border-b-1rpx border-b-dashed border-slate-200"],
  ["u-border-t-dashed", "border-0 border-t-1rpx border-t-dashed border-slate-200"],
  ["u-border-b", "border-0 border-b-1rpx border-b-solid border-slate-200"],
  ["u-border-t", "border-0 border-t-1rpx border-t-solid border-slate-200"],
  ["safe-bottom", "pb-[env(safe-area-inset-bottom)]"],
  [/^w-h-([^-]+)-([^-]+)$/, ([, w, h]) => `w-${w} h-${h}`]
];

// src/unocss/rules.ts
var defaultRules = [
  // 语义化排版 utility：一条规则覆盖 text-title-lg / text-title / text-subtitle / text-body / text-desc / text-caption
  // 字号 / 字重 / 行高 / 颜色 四件套全部读 CSS 变量（变量在 style.scss 里定义，主题切换时只改变量不改 class）
  [
    /^text-(title-lg|title|subtitle|body|desc|caption)$/,
    ([, name]) => ({
      "font-size": `var(--text-${name}-size)`,
      "font-weight": `var(--text-${name}-weight)`,
      "line-height": `var(--text-${name}-line-height)`,
      color: `var(--text-${name}-color)`,
      ...name === "caption" ? { "letter-spacing": "1rpx" } : {}
    })
  ],
  [/^fs-(\d+)$/, ([, d]) => ({ "font-size": `${d}rpx` })],
  [/^lh-(\d+)$/, ([, d]) => ({ "line-height": `${d}rpx` })],
  [/^ls-\[(.+)\]$/, ([, d]) => ({ "letter-spacing": d })],
  ["grid", { display: "grid" }],
  [
    "bg-grid-pattern",
    { "background-image": `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }
  ],
  [/^grid-cols-(\d+)$/, ([, d]) => ({ display: "grid", "grid-template-columns": `repeat(${d}, minmax(0, 1fr))` })],
  ["soft-shadow", { "box-shadow": "none" }],
  [
    /^border-dashed-(\d+)-(\d+)$/,
    ([, lineLength, gapLength]) => {
      const totalLength = Number(lineLength) + Number(gapLength);
      const linePercent = Number(lineLength) / totalLength * 100;
      return {
        "background-image": `linear-gradient(90deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), linear-gradient(90deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), linear-gradient(0deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), linear-gradient(0deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), linear-gradient(#f8fafc, #f8fafc)`,
        "background-size": `${totalLength}px 1px, ${totalLength}px 1px, 1px ${totalLength}px, 1px ${totalLength}px, 100% 100%`,
        "background-position": "0 0, 0 100%, 0 0, 100% 0, 0 0",
        "background-repeat": "repeat-x, repeat-x, repeat-y, repeat-y, no-repeat"
      };
    }
  ],
  [/^border(?:-(\d+(?:\.\d+)?))?$/, ([, d]) => ({ "border-width": `${d || 1}px` })],
  [
    /^border-([trbl])$/,
    ([, d]) => {
      const map = { t: "top", r: "right", b: "bottom", l: "left" };
      return { [`border-${map[d]}-width`]: "1rpx" };
    }
  ],
  [
    /^border-([trbl])-(\d+(?:\.\d+)?)(rpx|px|rem|em|%)$/,
    ([, d, w, unit]) => {
      const map = { t: "top", r: "right", b: "bottom", l: "left" };
      return { [`border-${map[d]}-width`]: `${w}${unit}` };
    }
  ],
  [
    /^border-([trbl])-(\d+(?:\.\d+)?)$/,
    ([, d, w]) => {
      const map = { t: "top", r: "right", b: "bottom", l: "left" };
      return { [`border-${map[d]}-width`]: `${w}px` };
    }
  ],
  [
    /^border-([trbl])-(solid|dashed|dotted|double|none)$/,
    ([, d, style]) => {
      const map = { t: "top", r: "right", b: "bottom", l: "left" };
      return {
        [`border-${map[d]}-width`]: "1rpx",
        [`border-${map[d]}-style`]: style
      };
    }
  ]
];

// src/unocss/safelist.ts
var defaultSafelist = [
  "text-primary",
  "text-success",
  "text-warning",
  "text-error",
  "text-orange-500",
  "text-gray-800",
  "bg-primary",
  "bg-success",
  "bg-warning",
  "bg-error",
  // 后台分类 / 标签图标 / 常用高频业务图标
  "i-fa6-solid-film",
  "i-fa6-solid-utensils",
  "i-fa6-solid-music",
  "i-fa6-solid-dragon",
  "i-fa6-solid-shirt",
  "i-fa6-solid-paw",
  "i-fa6-solid-gamepad",
  "i-fa6-solid-dumbbell",
  "i-fa6-solid-house",
  "i-fa6-solid-car-side",
  "i-fa6-solid-plane-departure",
  "i-fa6-solid-cart-shopping",
  "i-fa6-solid-briefcase",
  "i-fa6-solid-heart",
  "i-fa6-solid-people-group",
  "i-fa6-solid-seedling",
  "i-fa6-solid-microchip",
  "i-fa6-solid-mobile-screen",
  "i-fa6-solid-baby",
  "i-fa6-solid-camera",
  "i-fa6-solid-clapperboard",
  "i-fa6-solid-pen-nib",
  "i-fa6-solid-masks-theater",
  "i-fa6-solid-heart-pulse",
  "i-fa6-solid-face-smile-beam",
  "i-fa6-solid-users",
  "i-fa6-solid-person-running",
  "i-fa6-solid-newspaper",
  "i-fa6-solid-code",
  "i-fa6-solid-face-laugh-squint",
  "i-fa6-solid-pen-to-square",
  "i-fa6-solid-star-and-crescent",
  "i-fa6-solid-camera-retro",
  "i-fa6-solid-bag-shopping",
  "i-fa6-solid-hammer",
  "i-fa6-solid-image",
  "i-fa6-solid-scroll",
  "i-fa6-solid-mountain-sun",
  "i-fa6-solid-hand-fist",
  "i-fa6-solid-book-open-reader",
  "i-ri-live-fill",
  "i-fa6-solid-user-graduate",
  "i-fa6-solid-school",
  "i-fa6-solid-graduation-cap",
  "i-fa6-solid-comments",
  "i-fa6-solid-comment-dots",
  "i-fa6-solid-book",
  "i-fa6-solid-microphone-lines",
  "i-fa6-solid-medal",
  "i-fa6-solid-language",
  "i-fa6-solid-id-card",
  "i-fa6-solid-tags",
  "i-fa6-solid-crosshairs",
  "i-fa6-solid-chalkboard-user",
  "i-fa6-solid-building",
  "i-fa6-solid-couch",
  "i-fa6-solid-brain",
  "i-fa6-solid-scissors",
  "i-fa6-solid-palette",
  "i-fa6-solid-location-dot",
  "i-fa6-solid-map-location-dot",
  "i-fa6-solid-robot",
  "i-fa6-solid-user-doctor",
  "i-fa6-solid-spa",
  "i-fa6-solid-landmark",
  "i-fa6-solid-hand-holding-heart",
  "i-fa6-solid-clock-rotate-left",
  "i-fa6-solid-broom",
  "i-fa6-solid-ring",
  "i-fa6-solid-leaf",
  "i-fa6-solid-wine-glass",
  "i-fa6-solid-mug-hot",
  "i-fa6-solid-passport",
  "i-fa6-solid-building-columns",
  "i-fa6-solid-user-tie",
  "i-fa6-solid-users-gear",
  "i-fa6-solid-industry",
  "i-fa6-solid-recycle",
  "i-fa6-solid-headset",
  "i-fa6-brands-weixin",
  "i-fa6-solid-user-plus",
  "i-fa6-solid-book-open",
  "i-fa6-solid-circle-question",
  "i-fa6-solid-gear",
  "i-fa6-solid-droplet-slash",
  "i-fa6-solid-chart-line",
  "i-fa6-solid-trophy",
  "i-fa6-solid-toolbox",
  "i-fa6-solid-gift",
  "i-fa6-solid-ticket",
  "i-fa6-solid-bolt",
  "i-fa6-brands-tiktok",
  "i-fa6-brands-bilibili",
  "i-fa6-solid-video",
  "i-fa6-solid-rocket",
  "i-fa6-solid-gem",
  "i-fa6-solid-shield-halved",
  "i-fa6-solid-trash",
  "i-fa6-solid-circle-exclamation",
  "i-fa6-solid-bullhorn",
  "i-fa6-solid-font",
  "i-fa6-solid-circle-check",
  "i-fa6-solid-spinner",
  "i-fa6-solid-hand",
  "i-fa6-solid-magnifying-glass",
  "i-fa6-solid-star",
  "i-fa6-solid-lightbulb",
  "i-fa6-solid-fire",
  "i-fa6-solid-download",
  "i-fa6-solid-coins",
  "i-fa6-solid-crown",
  "i-fa6-solid-credit-card",
  "i-fa6-solid-user-slash",
  "i-fa6-solid-file-shield",
  "i-fa6-solid-lock",
  "i-fa6-solid-infinity",
  "i-fa6-solid-ban",
  "i-fa6-solid-scale-balanced",
  "i-fa6-solid-sack-dollar",
  "i-fa6-solid-clock",
  "i-fa6-solid-ranking-star",
  "i-fa6-solid-shield-heart",
  "i-fa6-solid-chart-pie",
  "i-fa6-solid-layer-group",
  "i-fa6-solid-gauge-high",
  "i-fa6-solid-wand-magic-sparkles",
  "i-ri-apps-2-fill",
  "i-ri-apps-fill",
  "i-ri-app-store-fill",
  "i-fa6-solid-circle-play",
  "i-fa6-solid-chevron-left",
  "i-fa6-solid-chevron-right",
  "i-fa6-solid-box-open",
  "i-fa6-solid-arrow-trend-up",
  "i-fa6-solid-calendar-check",
  "i-fa6-solid-calendar-days",
  "i-fa6-solid-chart-simple",
  "i-fa6-solid-check",
  "i-fa6-solid-chevron-down",
  "i-fa6-solid-circle-dot",
  "i-fa6-solid-circle-info",
  "i-fa6-solid-cloud-sun",
  "i-fa6-solid-copy",
  "i-fa6-solid-eye",
  "i-fa6-solid-hourglass-half",
  "i-fa6-solid-minus",
  "i-fa6-solid-rotate",
  "i-fa6-solid-rss",
  "i-fa6-solid-share-nodes",
  "i-fa6-solid-shuffle",
  "i-fa6-solid-snowflake",
  "i-fa6-solid-thumbtack",
  "i-fa6-solid-triangle-exclamation",
  "i-fa6-solid-wrench",
  "i-ri-shield-check-fill",
  "i-fa6-solid-play",
  "i-ri-bilibili-fill",
  "i-ri-wechat-channels-fill"
];

// src/unocss/merge.ts
function deepMerge(target, source) {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = output[key];
    if (sourceVal && typeof sourceVal === "object" && !Array.isArray(sourceVal) && targetVal && typeof targetVal === "object" && !Array.isArray(targetVal)) {
      output[key] = deepMerge(targetVal, sourceVal);
    } else if (sourceVal !== void 0) {
      output[key] = sourceVal;
    }
  }
  return output;
}
function mergeShortcuts(defaultShortcuts2, userShortcuts) {
  if (!userShortcuts) return defaultShortcuts2;
  const normalizedUser = Array.isArray(userShortcuts) ? userShortcuts : Object.entries(userShortcuts);
  if (!normalizedUser.length) return defaultShortcuts2;
  const userKeys = /* @__PURE__ */ new Set();
  for (const item of normalizedUser) {
    if (Array.isArray(item) && typeof item[0] === "string") {
      userKeys.add(item[0]);
    }
  }
  const filteredDefaults = defaultShortcuts2.filter((item) => {
    if (Array.isArray(item) && typeof item[0] === "string") {
      return !userKeys.has(item[0]);
    }
    return true;
  });
  return [...filteredDefaults, ...normalizedUser];
}
function mergeUnoConfig(defaultConfig, userConfig = {}) {
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
      ...userRules || [],
      ...defaultConfig.rules || []
    ],
    // Safelist 自动去重合并
    safelist: Array.from(
      /* @__PURE__ */ new Set([
        ...defaultConfig.safelist || [],
        ...userSafelist || []
      ])
    ),
    // Presets 与 Transformers 基础之上追加
    presets: [
      ...defaultConfig.presets || [],
      ...userPresets || []
    ],
    transformers: [
      ...defaultConfig.transformers || [],
      ...userTransformers || []
    ]
  };
}

// src/unocss/index.ts
function getBaseUnoConfig(options = {}) {
  const { presets, transformers } = createDefaultPresets(options);
  return {
    presets,
    theme: defaultTheme,
    shortcuts: defaultShortcuts,
    rules: defaultRules,
    safelist: defaultSafelist,
    transformers
  };
}
function hlwUnoConfig(conf = {}) {
  const base = getBaseUnoConfig({
    iconsCollections: conf.iconsCollections,
    iconsScale: conf.iconsScale
  });
  return mergeUnoConfig(base, conf);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deepMerge,
  defaultRules,
  defaultSafelist,
  defaultShortcuts,
  defaultTheme,
  getBaseUnoConfig,
  hlwUnoConfig,
  mergeShortcuts,
  mergeUnoConfig
});
