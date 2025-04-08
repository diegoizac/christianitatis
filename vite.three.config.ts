import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      'webgl-sdf-generator': path.resolve(
        __dirname,
        'node_modules/webgl-sdf-generator/dist/webgl-sdf-generator.mjs'
      ),
      'bidi-js': path.resolve(__dirname, 'node_modules/bidi-js/dist/bidi.mjs'),
      'troika-three-text': path.resolve(
        __dirname,
        'node_modules/troika-three-text/dist/troika-three-text.esm.js'
      ),
    },
  },
  optimizeDeps: {
    include: [
      'webgl-sdf-generator',
      'bidi-js',
      'troika-three-text',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    esbuildOptions: {
      target: 'esnext',
      format: 'esm',
      mainFields: ['module', 'main'],
      conditions: ['import', 'module', 'default'],
      resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
  },
  build: {
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE',
        },
      },
    },
  },
})
