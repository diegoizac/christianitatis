import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    host: true,
    open: true, // Abre o navegador automaticamente
  },
  logLevel: "info", // Mudando para info para ver mais detalhes
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/assets/images/*", dest: "assets/images" },
        { src: "src/assets/animations/*", dest: "assets/animations" },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "EVAL") return;
        if (warning.code === "CHUNK_SIZE_WARNING") return;
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
