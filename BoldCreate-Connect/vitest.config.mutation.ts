/**
 * Dedicated Vitest config for Stryker mutation testing.
 *
 * Uses a flat (non-project) config so Stryker's vitest-runner can correctly
 * map per-test coverage back to the mutated source files. The multi-project
 * vitest.config.ts breaks Stryker's coverage association because the runner
 * cannot determine which project owns which file.
 *
 * Scope: unit tests only — integration and security tests are too slow and
 * require live infrastructure that is not available during mutation runs.
 */
// @ts-nocheck

import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Disable Vite's transform cache so Stryker's instrumented TypeScript files
  // are always re-transpiled rather than served from a stale cache.
  cacheDir: false as unknown as string,
  test: {
    name: 'mutation',
    include: [
      'packages/*/src/**/*.test.ts',
      'apps/*/src/**/*.test.ts',
      'apps/web/server/src/**/*.test.ts',
    ],
    exclude: [
      '**/*.integration.test.ts',
      '**/*.security.test.ts',
      'apps/web/client/src/**/*.test.tsx',
      'apps/web/client/src/**/*.test.ts',
      'node_modules/**',
    ],
    passWithNoTests: false,
    // Disable the stderr/warning guards — Stryker instruments code in ways
    // that can produce benign console output during mutation runs.
    onConsoleLog: undefined,
  },
});
