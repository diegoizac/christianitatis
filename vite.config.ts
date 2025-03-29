import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
        { src: "src/assets/images/*", dest: "assets/images" },
        { src: "src/assets/videos/*", dest: "assets/videos" },
        { src: "src/assets/animations/*", dest: "assets/animations" },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
