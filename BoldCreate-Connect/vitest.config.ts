import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const root = import.meta.dirname;

// Workspace packages publish compiled output by default and their source under the
// `development` condition; tests and tooling run against the source.
const resolveSource = {
  resolve: { conditions: ['development'] },
  ssr: { resolve: { conditions: ['node', 'development'] } },
};

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      // Exclude files that are structural (re-exports, schema definitions, DB client)
      // and files that require integration tests (DB client, app entry points)
      exclude: [
        // Re-export barrel files — no logic to test
        'packages/*/src/index.ts',
        'packages/contracts/src/openapi/write-cli.ts',
        'packages/db/src/schema/index.ts',
        // Drizzle schema definitions — pure table declarations, no logic
        'packages/db/src/schema/*.ts',
        // DB client — requires a live database connection
        'packages/db/src/client.ts',
        // App entry points — not unit-testable
        'apps/*/src/index.ts',
        // Test fixtures shared by the web server tests
        'apps/web/server/src/test-support.ts',
        'apps/web/client/src/main.tsx',
        'apps/web/client/src/App.tsx',
        'apps/web/client/src/router.tsx',
        'apps/web/client/src/query-client.ts',
        // Layouts — thin wrappers, covered by page tests
        'apps/web/client/src/layouts/*.tsx',
        // API client — thin HTTP wrappers, no business logic
        'apps/web/client/src/lib/api.ts',
        // Query key factory — pure key definitions, no logic
        'apps/web/client/src/lib/query-keys.ts',
        // Port interfaces — no implementation to test
        // Port interfaces and shared contract suites — no implementation to cover
        'packages/ports/src/**',
        'packages/adapters/src/**/*.contract.ts',
        'packages/http-server/src/*.contract.ts',
        // Test and tooling code
        'tests/**',
        'scripts/**',
        // Test helpers
        'apps/web/client/src/test/**',
        // Standard vitest/coverage excludes
        'coverage/**',
        'node_modules/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.integration.test.ts',
        '**/*.security.test.ts',
      ],
      thresholds: {
        statements: 95,
        branches: 85,
        functions: 95,
        lines: 95,
      },
    },
    onConsoleLog(log, type) {
      if (type === 'stderr') {
        throw new Error(`Unexpected console output on stderr: ${log}`);
      }
      if (log.startsWith('[warn]') || log.startsWith('Warning') || log.startsWith('warning')) {
        throw new Error(`Unexpected console warning: ${log}`);
      }
    },
    projects: [
      {
        ...resolveSource,
        test: {
          name: 'unit',
          // Process-spawn and whole-repo scans exceed 5 s when the machine is loaded.
          testTimeout: 30_000,
          include: [
            'packages/*/src/**/*.test.ts',
            'apps/*/src/**/*.test.ts',
            'scripts/*.test.ts',
            'apps/web/server/src/**/*.test.ts',
            'scripts/dev-dashboard/**/*.test.ts',
            'scripts/test-runner/**/*.test.ts',
            'scripts/checks/**/*.test.ts',
            'tests/load/**/*.test.ts',
          ],
          exclude: [
            '**/*.integration.test.ts',
            '**/*.security.test.ts',
            '**/*.contract.test.ts',
            'apps/web/client/src/**/*.test.tsx',
            'apps/web/client/src/**/*.test.ts',
            'apps/admin/client/src/**/*.test.tsx',
            'apps/admin/client/src/**/*.test.ts',
          ],
        },
      },
      {
        plugins: [react()],
        ssr: resolveSource.ssr,
        resolve: {
          conditions: ['module', 'browser', 'development'],
          alias: {
            '@': resolve(root, 'apps/web/client/src'),
            // Deduplicate React — always use the client's copy
            react: resolve(root, 'apps/web/client/node_modules/react'),
            'react-dom': resolve(root, 'apps/web/client/node_modules/react-dom'),
            'react/jsx-runtime': resolve(root, 'apps/web/client/node_modules/react/jsx-runtime'),
          },
        },
        test: {
          name: 'client',
          include: [
            'apps/web/client/src/**/*.test.tsx',
            'apps/web/client/src/**/*.test.ts',
            'apps/admin/client/src/**/*.test.tsx',
            'apps/admin/client/src/**/*.test.ts',
          ],
          environment: 'jsdom',
          setupFiles: [
            'apps/web/client/src/test/react-act-env.ts',
            'apps/web/client/src/test/setup.ts',
          ],
          globals: true,
        },
      },
      {
        ...resolveSource,
        test: {
          name: 'integration',
          include: ['tests/integration/**/*.test.ts', '**/*.integration.test.ts'],
          // The files share one database and five services; more workers than this only make
          // each test wait longer, which shows up as timeouts. Raise it on a larger machine.
          maxWorkers: Number(process.env['TEST_INTEGRATION_WORKERS'] ?? 4),
          testTimeout: 60_000,
        },
      },
      {
        ...resolveSource,
        test: {
          name: 'security',
          include: ['tests/security/**/*.test.ts', '**/*.security.test.ts'],
          testTimeout: 30_000,
        },
      },
      {
        ...resolveSource,
        test: {
          name: 'conformance',
          include: [
            'tests/conformance/**/*.test.ts',
            'packages/adapters/src/**/*.contract.test.ts',
          ],
          exclude: ['**/*.staging.test.ts'],
          testTimeout: 60_000,
          environment: 'node',
        },
      },
      {
        // Opt-in suites against real services; never run by `pnpm test`.
        ...resolveSource,
        test: {
          name: 'staging',
          include: ['tests/conformance/**/*.staging.test.ts'],
          testTimeout: 60_000,
        },
      },
    ],
  },
});
