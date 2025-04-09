import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3002,
    host: 'localhost',
    strictPort: true,
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3002,
    strictPort: false,
  },
  logLevel: 'info',
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
      },
    }),
    // Plugin para desativar verificação de TypeScript
    {
      name: 'vite:ts-ignore',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.ts') && !id.endsWith('.tsx')) return null;
        return { code, map: null };
      },
    },
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/images/*',
          dest: 'assets/images',
        },
        {
          src: 'src/assets/animations/*.glb',
          dest: 'assets/animations',
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ['framer-motion', '@react-three/fiber', '@react-three/drei', 'three', 'gsap', '@react-three/postprocessing'],
    exclude: ['lucide-react'],
    force: true,
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Desativado para produção
    chunkSizeWarningLimit: 1500, // Aumentado para evitar avisos
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs em produção
        drop_debugger: true, // Remover debuggers em produção
      },
    },
    rollupOptions: {
      context: 'globalThis',
      experimentalLogSideEffects: true,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'gsap'],
        },
      },
    },
    assetsInlineLimit: 0, // Não inline arquivos GLB
  },
  css: {
    postcss: './postcss.config.js',
    devSourcemap: false, // Desativado para produção
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    },
    // Ignorar extensões .ts e .tsx para evitar erros de importação
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  define: {
    __DEV__: false,
    'process.env.NODE_ENV': '"production"',
    // Desativar verificações de tipo em tempo de execução
    'import.meta.env.DEV': false,
    'import.meta.env.PROD': true,
    'import.meta.env.SSR': false
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    treeShaking: true,
  },
})