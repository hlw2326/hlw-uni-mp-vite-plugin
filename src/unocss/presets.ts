/// <reference path="./shim.d.ts" />

import presetWeapp from "unocss-preset-weapp";
import { extractorAttributify, transformerClass } from "unocss-preset-weapp/transformer";
import transformerDirectives from "@unocss/transformer-directives";
import { presetIcons } from "@unocss/preset-icons";

export interface PresetsOption {
    /** 额外的 iconify 图标集合加载器 */
    iconsCollections?: Record<string, () => Promise<any>>;
    /** presetIcons scale 缩放比例，默认 1.2 */
    iconsScale?: number;
}

export function createDefaultPresets(options: PresetsOption = {}) {
    const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

    const presets = [
        presetWeapp(),
        presetWeappAttributify(),
        presetIcons({
            scale: options.iconsScale ?? 1.2,
            warn: true,
            extraProperties: {
                display: "inline-block",
                "vertical-align": "middle",
            },
            collections: options.iconsCollections,
        }),
    ];

    const transformers = [
        transformerDirectives({ enforce: "pre" }),
        transformerAttributify(),
        transformerClass(),
    ];

    return { presets, transformers };
}
