import { defineConfig } from '@playwright/test'

export default defineConfig({
  port: 8000,
  host: 'localhost',
  webServer: {
    command: 'npm run dev:app',
    url: 'http://localhost:3002',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3002',
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
})
