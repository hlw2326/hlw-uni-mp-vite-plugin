import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/**/*.ts", "src/**/*.d.ts"],
      exclude: ["src/**/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
      },
      name: "HlwUniPlugin",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: [
        "vite",
        "@dcloudio/vite-plugin-uni",
        "@hlw-uni/mp-core",
        /^unplugin-/,
        /^@antfu/,
        /^@vue/,
        /^vue/,
        /^pinia/,
        /^node:/,
      ],
      output: {
        preserveModules: false,
        globals: {
          vite: "Vite",
        },
      },
    },
    copyPublicDir: false,
    minify: false,
    sourcemap: true,
  },
});
