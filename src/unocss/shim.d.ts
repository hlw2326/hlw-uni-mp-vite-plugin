declare module "unocss-preset-weapp" {
    const preset: any;
    export default preset;
}

declare module "unocss-preset-weapp/transformer" {
    export const extractorAttributify: any;
    export const transformerClass: any;
}

declare module "@unocss/transformer-directives" {
    const transformer: any;
    export default transformer;
}

declare module "@unocss/preset-icons" {
    export const presetIcons: any;
}

declare module "@iconify-json/*" {
    const data: any;
    export default data;
}
