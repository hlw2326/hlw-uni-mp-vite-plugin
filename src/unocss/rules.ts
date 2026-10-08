export const defaultRules: any[] = [
    // 语义化排版 utility：一条规则覆盖 text-title-lg / text-title / text-subtitle / text-body / text-desc / text-caption
    // 字号 / 字重 / 行高 / 颜色 四件套全部读 CSS 变量（变量在 style.scss 里定义，主题切换时只改变量不改 class）
    [
        /^text-(title-lg|title|subtitle|body|desc|caption)$/,
        ([, name]: string[]) => ({
            "font-size": `var(--text-${name}-size)`,
            "font-weight": `var(--text-${name}-weight)`,
            "line-height": `var(--text-${name}-line-height)`,
            color: `var(--text-${name}-color)`,
            ...(name === "caption" ? { "letter-spacing": "1rpx" } : {}),
        }),
    ],
    [/^fs-(\d+)$/, ([, d]: string[]) => ({ "font-size": `${d}rpx` })],
    [/^lh-(\d+)$/, ([, d]: string[]) => ({ "line-height": `${d}rpx` })],
    [/^ls-\[(.+)\]$/, ([, d]: string[]) => ({ "letter-spacing": d })],
    ["grid", { display: "grid" }],
    [
        "bg-grid-pattern",
        { "background-image": "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" },
    ],
    [/^grid-cols-(\d+)$/, ([, d]: string[]) => ({ display: "grid", "grid-template-columns": `repeat(${d}, minmax(0, 1fr))` })],
    ["soft-shadow", { "box-shadow": "none" }],
    [
        /^border-dashed-(\d+)-(\d+)$/,
        ([, lineLength, gapLength]: string[]) => {
            const totalLength = Number(lineLength) + Number(gapLength);
            const linePercent = (Number(lineLength) / totalLength) * 100;
            return {
                "background-image":
                    `linear-gradient(90deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                    `linear-gradient(90deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                    `linear-gradient(0deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                    `linear-gradient(0deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                    `linear-gradient(#f8fafc, #f8fafc)`,
                "background-size": `${totalLength}px 1px, ${totalLength}px 1px, 1px ${totalLength}px, 1px ${totalLength}px, 100% 100%`,
                "background-position": "0 0, 0 100%, 0 0, 100% 0, 0 0",
                "background-repeat": "repeat-x, repeat-x, repeat-y, repeat-y, no-repeat",
            };
        },
    ],
    [/^border(?:-(\d+(?:\.\d+)?))?$/, ([, d]: string[]) => ({ "border-width": `${d || 1}px` })],
    [
        /^border-([trbl])$/,
        ([, d]: string[]) => {
            const map: Record<string, string> = { t: "top", r: "right", b: "bottom", l: "left" };
            return { [`border-${map[d]}-width`]: "1rpx" };
        },
    ],
    [
        /^border-([trbl])-(\d+(?:\.\d+)?)(rpx|px|rem|em|%)$/,
        ([, d, w, unit]: string[]) => {
            const map: Record<string, string> = { t: "top", r: "right", b: "bottom", l: "left" };
            return { [`border-${map[d]}-width`]: `${w}${unit}` };
        },
    ],
    [
        /^border-([trbl])-(\d+(?:\.\d+)?)$/,
        ([, d, w]: string[]) => {
            const map: Record<string, string> = { t: "top", r: "right", b: "bottom", l: "left" };
            return { [`border-${map[d]}-width`]: `${w}px` };
        },
    ],
    [
        /^border-([trbl])-(solid|dashed|dotted|double|none)$/,
        ([, d, style]: string[]) => {
            const map: Record<string, string> = { t: "top", r: "right", b: "bottom", l: "left" };
            return {
                [`border-${map[d]}-width`]: "1rpx",
                [`border-${map[d]}-style`]: style,
            };
        },
    ],
];
