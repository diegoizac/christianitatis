import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import { configDefaults } from "vitest/config";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    host: true,
    strictPort: false,
    open: true, // Abre o navegador automaticamente
  },
  preview: {
    port: 3000,
    strictPort: false,
  },
  logLevel: "info", // Mudando para info para ver mais detalhes
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/images/*",
          dest: "assets/images",
        },
        {
          src: "src/assets/videos/*",
          dest: "assets/videos",
        },
        {
          src: "src/assets/animations/*",
          dest: "assets/animations",
        },
      ],
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Christianitatis",
        short_name: "Christianitatis",
        description: "Plataforma de eventos cristãos",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    visualizer({
      filename: "./dist/stats.html",
    }),
    viteCompression({
      algorithm: "brotliCompress",
      threshold: 1024,
    }),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024,
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ["framer-motion"],
    exclude: ["lucide-react"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": [
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/react-fontawesome",
          ],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        ...configDefaults.coverage.exclude,
        "src/tests/setup.ts",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
