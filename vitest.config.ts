/**
 * Configuração do Vitest
 * Define as configurações globais para testes
 */

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003, // Porta diferente para evitar conflitos
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Configuração de cobertura de testes
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
    // Configuração do ambiente de teste
    deps: {
      interopDefault: true
    }
  },
  // Aliases para importações
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
