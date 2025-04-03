// vite.config.ts
import { defineConfig } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite/dist/node/index.js";
import react from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { viteStaticCopy } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite-plugin-static-copy/dist/index.js";
import { VitePWA } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { configDefaults } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vitest/dist/config.js";
import viteCompression from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite-plugin-compression/dist/index.mjs";
import viteImagemin from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite-plugin-imagemin/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "/",
  server: {
    port: 3e3,
    host: true,
    strictPort: false,
    open: true
    // Abre o navegador automaticamente
  },
  preview: {
    port: 3e3,
    strictPort: false
  },
  logLevel: "info",
  // Mudando para info para ver mais detalhes
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/images/*",
          dest: "assets/images"
        },
        {
          src: "src/assets/videos/*",
          dest: "assets/videos"
        },
        {
          src: "src/assets/animations/*",
          dest: "assets/animations"
        }
      ]
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Christianitatis",
        short_name: "Christianitatis",
        description: "Plataforma de eventos crist\xE3os",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    visualizer({
      filename: "./dist/stats.html"
    }),
    viteCompression({
      algorithm: "brotliCompress",
      threshold: 1024
    }),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    include: ["framer-motion"],
    exclude: ["lucide-react"]
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1e3,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
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
            "@fortawesome/react-fontawesome"
          ],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"]
        }
      }
    }
  },
  css: {
    postcss: "./postcss.config.js"
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
        "src/vite-env.d.ts"
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGllZ28vRG9jdW1lbnRzLzJETCBDT01QQU5ZL0NsaWVudGVzL2NocmlzdGlhbml0YXRpcy9hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kaWVnby9Eb2N1bWVudHMvMkRMIENPTVBBTlkvQ2xpZW50ZXMvY2hyaXN0aWFuaXRhdGlzL2FwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGllZ28vRG9jdW1lbnRzLzJETCUyMENPTVBBTlkvQ2xpZW50ZXMvY2hyaXN0aWFuaXRhdGlzL2FwcC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5pbXBvcnQgeyBjb25maWdEZWZhdWx0cyB9IGZyb20gXCJ2aXRlc3QvY29uZmlnXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2VtaW5cIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIGhvc3Q6IHRydWUsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgb3BlbjogdHJ1ZSwgLy8gQWJyZSBvIG5hdmVnYWRvciBhdXRvbWF0aWNhbWVudGVcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gIH0sXG4gIGxvZ0xldmVsOiBcImluZm9cIiwgLy8gTXVkYW5kbyBwYXJhIGluZm8gcGFyYSB2ZXIgbWFpcyBkZXRhbGhlc1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwic3JjL2Fzc2V0cy9pbWFnZXMvKlwiLFxuICAgICAgICAgIGRlc3Q6IFwiYXNzZXRzL2ltYWdlc1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInNyYy9hc3NldHMvdmlkZW9zLypcIixcbiAgICAgICAgICBkZXN0OiBcImFzc2V0cy92aWRlb3NcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJzcmMvYXNzZXRzL2FuaW1hdGlvbnMvKlwiLFxuICAgICAgICAgIGRlc3Q6IFwiYXNzZXRzL2FuaW1hdGlvbnNcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgaW5jbHVkZUFzc2V0czogW1wiZmF2aWNvbi5pY29cIiwgXCJyb2JvdHMudHh0XCIsIFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIl0sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiBcIkNocmlzdGlhbml0YXRpc1wiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIkNocmlzdGlhbml0YXRpc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQbGF0YWZvcm1hIGRlIGV2ZW50b3MgY3Jpc3RcdTAwRTNvc1wiLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcInB3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBmaWxlbmFtZTogXCIuL2Rpc3Qvc3RhdHMuaHRtbFwiLFxuICAgIH0pLFxuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06IFwiYnJvdGxpQ29tcHJlc3NcIixcbiAgICAgIHRocmVzaG9sZDogMTAyNCxcbiAgICB9KSxcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiBcImd6aXBcIixcbiAgICAgIHRocmVzaG9sZDogMTAyNCxcbiAgICB9KSxcbiAgICB2aXRlSW1hZ2VtaW4oe1xuICAgICAgZ2lmc2ljbGU6IHtcbiAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXG4gICAgICAgIGludGVybGFjZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG9wdGlwbmc6IHtcbiAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXG4gICAgICB9LFxuICAgICAgbW96anBlZzoge1xuICAgICAgICBxdWFsaXR5OiA4MCxcbiAgICAgIH0sXG4gICAgICBwbmdxdWFudDoge1xuICAgICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxuICAgICAgICBzcGVlZDogNCxcbiAgICAgIH0sXG4gICAgICBzdmdvOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInJlbW92ZVZpZXdCb3hcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwicmVtb3ZlRW1wdHlBdHRyc1wiLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1wiZnJhbWVyLW1vdGlvblwiXSxcbiAgICBleGNsdWRlOiBbXCJsdWNpZGUtcmVhY3RcIl0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIG1pbmlmeTogXCJ0ZXJzZXJcIixcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb253YXJuKHdhcm5pbmcsIHdhcm4pIHtcbiAgICAgICAgaWYgKHdhcm5pbmcuY29kZSA9PT0gXCJNT0RVTEVfTEVWRUxfRElSRUNUSVZFXCIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2Fybih3YXJuaW5nKTtcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgXCJyZWFjdC12ZW5kb3JcIjogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gICAgICAgICAgXCJ1aS12ZW5kb3JcIjogW1xuICAgICAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIixcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lXCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInRocmVlLXZlbmRvclwiOiBbXCJ0aHJlZVwiLCBcIkByZWFjdC10aHJlZS9maWJlclwiLCBcIkByZWFjdC10aHJlZS9kcmVpXCJdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiBcIi4vcG9zdGNzcy5jb25maWcuanNcIixcbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICBzZXR1cEZpbGVzOiBbXCIuL3NyYy90ZXN0cy9zZXR1cC50c1wiXSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6IFwidjhcIixcbiAgICAgIHJlcG9ydGVyOiBbXCJ0ZXh0XCIsIFwianNvblwiLCBcImh0bWxcIl0sXG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgIC4uLmNvbmZpZ0RlZmF1bHRzLmNvdmVyYWdlLmV4Y2x1ZGUsXG4gICAgICAgIFwic3JjL3Rlc3RzL3NldHVwLnRzXCIsXG4gICAgICAgIFwic3JjL21haW4udHN4XCIsXG4gICAgICAgIFwic3JjL3ZpdGUtZW52LmQudHNcIixcbiAgICAgIF0sXG4gICAgICB0aHJlc2hvbGRzOiB7XG4gICAgICAgIHN0YXRlbWVudHM6IDgwLFxuICAgICAgICBicmFuY2hlczogODAsXG4gICAgICAgIGZ1bmN0aW9uczogODAsXG4gICAgICAgIGxpbmVzOiA4MCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpWCxTQUFTLG9CQUFvQjtBQUM5WSxPQUFPLFdBQVc7QUFDbEIs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
