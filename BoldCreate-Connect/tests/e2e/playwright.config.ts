import { join } from 'node:path';
import { defineConfig } from '@playwright/test';

const reports = join(import.meta.dirname, '..', '..', 'reports', 'test-run');

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.e2e.test.ts',
  workers: 1,
  retries: 0,
  forbidOnly: true,
  globalTimeout: 240_000,
  timeout: 60_000,
  outputDir: join(reports, 'e2e'),
  reporter: [['list'], ['json', { outputFile: join(reports, 'e2e.json') }]],
  use: {
    baseURL: process.env['TEST_WEB_URL'] ?? 'http://localhost:3000',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
