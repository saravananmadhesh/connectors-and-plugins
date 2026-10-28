/**
 * Step definitions and argument validation of the all-in-one test runner. Kept apart from
 * the runner so the step list and the option rules can be unit tested.
 */
export interface StepDefinition {
  id: string;
  name: string;
  command: string;
  /** Vitest JSON output is written to <id>.json and parsed for counts and failures. */
  vitest?: boolean;
  /** Playwright JSON output is written to <id>.json and parsed for counts and failures. */
  playwright?: boolean;
  /** Needs the isolated live stack to be running. */
  needsStack?: boolean;
  /** Read-only and independent: runs at the same time as neighbouring concurrent steps. */
  concurrent?: boolean;
  /** Extra environment for the command. */
  env?: Record<string, string>;
  /** Not run unless named in --only. */
  optional?: boolean;
}

export const jsonOut = (id: string) => `reports/test-run/${id}.json`;
const vitestProject = (project: string, id: string) =>
  `pnpm exec vitest run --project ${project} --reporter=default --reporter=json --outputFile.json=${jsonOut(id)}`;

export const steps: StepDefinition[] = [
  { id: 'format', name: 'Format check', command: 'pnpm exec oxfmt --check .', concurrent: true },
  {
    id: 'lint',
    concurrent: true,
    name: 'Lint (warnings are failures)',
    command:
      'pnpm exec oxlint . --deny-warnings && pnpm exec tsx --conditions=development scripts/lint-repo.ts',
  },
  {
    id: 'typecheck',
    concurrent: true,
    name: 'Typecheck',
    command: 'pnpm exec tsc -b tsconfig.json && pnpm exec tsc --noEmit -p tsconfig.root.json',
  },
  { id: 'unit', name: 'Unit tests', command: vitestProject('unit', 'unit'), vitest: true },
  {
    id: 'dotnet',
    name: '.NET SDK tests (with coverage gate)',
    command: 'pnpm exec tsx scripts/test-runner/dotnet-sdk.ts',
  },
  { id: 'client', name: 'Client tests', command: vitestProject('client', 'client'), vitest: true },
  {
    id: 'security',
    name: 'Security tests',
    command: vitestProject('security', 'security'),
    vitest: true,
    needsStack: true,
  },
  {
    id: 'conformance',
    name: 'Conformance tests',
    command: vitestProject('conformance', 'conformance'),
    vitest: true,
    needsStack: true,
  },
  {
    id: 'protocol',
    name: 'MCP protocol test',
    command: 'pnpm exec tsx --conditions=development fixtures/mcp/protocol-spike.ts',
  },
  { id: 'build', name: 'Build', command: 'pnpm run build' },
  {
    id: 'integration',
    name: 'Integration tests (isolated live stack)',
    command: vitestProject('integration', 'integration'),
    vitest: true,
    needsStack: true,
  },
  {
    id: 'e2e',
    name: 'Browser tests (isolated live stack)',
    command: 'pnpm exec playwright test --config tests/e2e/playwright.config.ts',
    playwright: true,
    needsStack: true,
  },
  {
    id: 'audit',
    name: 'Dependency audit',
    command: 'pnpm audit --audit-level=high',
    optional: true,
  },
  {
    id: 'load',
    name: 'Load smoke',
    command: 'pnpm exec tsx --conditions=development tests/load/run.ts',
    needsStack: true,
    env: { K6_ALLOW_LOAD: '1' },
    optional: true,
  },
];

export const knownFlags = ['--bail'];

/** Ids of every step the runner knows, in run order. */
export const known = new Set(steps.map((step) => step.id));

/** Returns an error message for an unusable command line, or undefined when it is valid. */
export function checkArguments(args: string[]): string | undefined {
  for (const arg of args) {
    if (arg === '--') continue;
    if (!knownFlags.includes(arg) && !/^--(only|skip|files|postgres)=/.test(arg)) {
      return `Unknown option "${arg}". Options: ${knownFlags.join(', ')}, --only=<ids>, --skip=<ids>, --files=<paths>, --postgres=<embedded|docker|external>`;
    }
  }
  for (const arg of args) {
    const match = /^--(only|skip)=(.*)$/.exec(arg);
    if (!match) continue;
    for (const id of (match[2] ?? '').split(',').filter(Boolean)) {
      if (!known.has(id)) {
        return `Unknown step "${id}". Known steps: ${[...known].join(', ')}`;
      }
    }
  }
  return undefined;
}
