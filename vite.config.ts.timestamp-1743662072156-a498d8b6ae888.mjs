// vite.config.ts
import { defineConfig } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite/dist/node/index.js";
import react from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { viteStaticCopy } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite-plugin-static-copy/dist/index.js";
import { VitePWA } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///Users/diego/Documents/2DL%20COMPANY/Clientes/christianitatis/app/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
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
    })
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1e3,
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
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGllZ28vRG9jdW1lbnRzLzJETCBDT01QQU5ZL0NsaWVudGVzL2NocmlzdGlhbml0YXRpcy9hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kaWVnby9Eb2N1bWVudHMvMkRMIENPTVBBTlkvQ2xpZW50ZXMvY2hyaXN0aWFuaXRhdGlzL2FwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGllZ28vRG9jdW1lbnRzLzJETCUyMENPTVBBTlkvQ2xpZW50ZXMvY2hyaXN0aWFuaXRhdGlzL2FwcC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiBcIi9cIixcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBob3N0OiB0cnVlLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICAgIG9wZW46IHRydWUsIC8vIEFicmUgbyBuYXZlZ2Fkb3IgYXV0b21hdGljYW1lbnRlXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICB9LFxuICBsb2dMZXZlbDogXCJpbmZvXCIsIC8vIE11ZGFuZG8gcGFyYSBpbmZvIHBhcmEgdmVyIG1haXMgZGV0YWxoZXNcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInNyYy9hc3NldHMvaW1hZ2VzLypcIixcbiAgICAgICAgICBkZXN0OiBcImFzc2V0cy9pbWFnZXNcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJzcmMvYXNzZXRzL3ZpZGVvcy8qXCIsXG4gICAgICAgICAgZGVzdDogXCJhc3NldHMvdmlkZW9zXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwic3JjL2Fzc2V0cy9hbmltYXRpb25zLypcIixcbiAgICAgICAgICBkZXN0OiBcImFzc2V0cy9hbmltYXRpb25zXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcImZhdmljb24uaWNvXCIsIFwicm9ib3RzLnR4dFwiLCBcImFwcGxlLXRvdWNoLWljb24ucG5nXCJdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJDaHJpc3RpYW5pdGF0aXNcIixcbiAgICAgICAgc2hvcnRfbmFtZTogXCJDaHJpc3RpYW5pdGF0aXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUGxhdGFmb3JtYSBkZSBldmVudG9zIGNyaXN0XHUwMEUzb3NcIixcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJwd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwicHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgZmlsZW5hbWU6IFwiLi9kaXN0L3N0YXRzLmh0bWxcIixcbiAgICB9KSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogW1wibHVjaWRlLXJlYWN0XCJdLFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvbndhcm4od2FybmluZywgd2Fybikge1xuICAgICAgICBpZiAod2FybmluZy5jb2RlID09PSBcIk1PRFVMRV9MRVZFTF9ESVJFQ1RJVkVcIikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3YXJuKHdhcm5pbmcpO1xuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICBcInJlYWN0LXZlbmRvclwiOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICAgICAgICBcInVpLXZlbmRvclwiOiBbXG4gICAgICAgICAgICBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiLFxuICAgICAgICAgICAgXCJAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWVcIixcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwidGhyZWUtdmVuZG9yXCI6IFtcInRocmVlXCIsIFwiQHJlYWN0LXRocmVlL2ZpYmVyXCIsIFwiQHJlYWN0LXRocmVlL2RyZWlcIl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IFwiLi9wb3N0Y3NzLmNvbmZpZy5qc1wiLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlYLFNBQVMsb0JBQW9CO0FBQzlZLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxrQkFBa0I7QUFHM0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFVBQVU7QUFBQTtBQUFBLEVBQ1YsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGVBQWUsQ0FBQyxlQUFlLGNBQWMsc0JBQXNCO0FBQUEsTUFDbkUsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLHVCQUF1QjtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxNQUNiLE9BQU8sU0FBUyxNQUFNO0FBQ3BCLFlBQUksUUFBUSxTQUFTLDBCQUEwQjtBQUM3QztBQUFBLFFBQ0Y7QUFDQSxhQUFLLE9BQU87QUFBQSxNQUNkO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUNyQyxhQUFhO0FBQUEsWUFDWDtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSxnQkFBZ0IsQ0FBQyxTQUFTLHNCQUFzQixtQkFBbUI7QUFBQSxRQUNyRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLEVBQ1g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
