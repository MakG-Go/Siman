import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
  base: "./",
  root: "./",

  plugins: [vue()],

  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "&": path.resolve(
        __dirname,
        "./src/Course_branch/Module_1"
      ) /** Путь до корня конкретного курса*/,
    },
  },

  build: {
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: ({ name, extname }) => {
          if (/\.css$/.test(name ?? "")) {
            return "assets/style[extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
