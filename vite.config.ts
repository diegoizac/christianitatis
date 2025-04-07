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
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
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
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
    },
  },
  define: {
    __DEV__: true,
    'process.env.NODE_ENV': '"development"',
  },
})
