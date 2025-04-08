/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.coverage.exclude,
        'coverage/**',
        'dist/**',
        '**/[.]**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'test/**',
        'test{,s}/**',
        '**/*{.,-}test.**',
        '**/*{.,-}spec.**',
        '**/__{tests,mocks}__/**',
        '**/jest.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    },
  },
})
