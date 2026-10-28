import os from 'node:os';
import { createRequire } from 'node:module';

// Resolve the vitest-runner plugin path explicitly.
// pnpm strict hoisting means child processes cannot resolve bare @stryker-mutator/* specifiers.
const require = createRequire(import.meta.url);
const vitestRunnerPath = require.resolve('@stryker-mutator/vitest-runner');

const config = {
  testRunner: 'vitest',
  // Explicitly load the vitest-runner so child worker processes can find it.
  // pnpm strict hoisting means child workers cannot resolve bare @stryker-mutator/* specifiers.
  plugins: [vitestRunnerPath],
  vitest: {
    // Flat single-project config — the multi-project vitest.config.ts confuses
    // the vitest-runner's per-test coverage mapping.
    configFile: 'vitest.config.mutation.ts',
    // Disable related mode — it relies on Vite's module graph which is not
    // available for plain TypeScript packages without a Vite build setup.
    related: false,
  },
  // REQUIRED for pnpm workspaces: workspace package imports (e.g.
  // @boldcreate-integrations/security) resolve through node_modules symlinks
  // that point back to the original source, bypassing the sandbox copies.
  // inPlace mutates the originals directly and restores them from backup.
  inPlace: true,
  // Mutate all package and app source files; skip generated, config and entry-point files
  mutate: [
    'packages/*/src/**/*.ts',
    'apps/*/src/**/*.ts',
    'apps/web/server/src/**/*.ts',
    // Exclude barrel re-exports, schema definitions, DB client, app entry points
    '!packages/*/src/index.ts',
    '!**/index.ts',
    '!packages/ports/src/**',
    '!packages/db/src/schema/**',
    '!packages/db/src/client.ts',
    '!apps/*/src/index.ts',
    // Exclude test files themselves
    '!**/*.test.ts',
    '!**/*.integration.test.ts',
    '!**/*.security.test.ts',
  ],
  reporters: ['html', 'json', 'clear-text', 'progress'],
  // HTML report — fileName must end in .html; directory is created by Stryker
  htmlReporter: {
    fileName: 'reports/mutation/mutation.html',
  },
  // JSON report — useful as a CI artifact
  jsonReporter: {
    fileName: 'reports/mutation/mutation.json',
  },
  // Mutation score thresholds.
  // Establish a valid baseline before enabling a failing score threshold.
  // A survivor with testsCompleted: 0 indicates a runner/filter problem,
  // not evidence that the test assertions are weak.
  thresholds: {
    high: 80,
    low: 60,
    break: null,
  },
  // Incremental mode: cache results between runs for faster re-runs
  incremental: true,
  incrementalFile: 'reports/mutation/.stryker-incremental.json',
  // Concurrency: leave one core free on dev; cap at 2 on CI to avoid OOM
  concurrency: Math.max(1, process.env.CI ? 2 : os.cpus().length - 1),
  // Ignore static analysis false-positives (e.g. string literals, object keys)
  ignoreStatic: true,
  // Timeout factor relative to the baseline test run
  timeoutFactor: 2,
  timeoutMS: 10_000,
};

export default config;
