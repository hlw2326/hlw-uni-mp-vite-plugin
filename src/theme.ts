/**
 * SCSS 主题变量注入
 */
export interface ThemeOptions {
  primaryColor?: string;
}

export function applyThemePlugin({ primaryColor = '#3b82f6' }: ThemeOptions = {}) {
  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `$primary-color: ${primaryColor} !default;\n`,
        },
      },
    },
  };
}
