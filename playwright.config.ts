import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { AUTH_STORAGE_PATH } from './helpers/auth.helper';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  retries: 1,

  workers: 1,

  timeout: 60_000,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {
    baseURL: process.env.BASE_URL,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/
    },
    {
      name: 'chromium',
      testIgnore: [/e2e\//, /auth\.setup\.ts/, /example\.spec\.ts/],
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'e2e',
      testMatch: /e2e\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_STORAGE_PATH
      }
    }
  ]
});
