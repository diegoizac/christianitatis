import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
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
});
