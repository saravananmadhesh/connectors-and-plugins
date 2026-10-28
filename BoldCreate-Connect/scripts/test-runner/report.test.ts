import { describe, expect, it } from 'vitest';
import {
  browserRunStatus,
  buildSummary,
  countWarnings,
  escapeHtml,
  parsePlaywrightJson,
  parseVitestJson,
  plainOutputEnv,
  stripAnsi,
  renderHtml,
  type StepResult,
} from './report.js';
import { checkArguments, known, steps } from './steps.js';

const step = (overrides: Partial<StepResult>): StepResult => ({
  id: 'unit',
  name: 'Unit tests',
  command: 'pnpm run test:unit',
  status: 'passed',
  exitCode: 0,
  durationMs: 1200,
  warnings: 0,
  failures: [],
  ...overrides,
});

describe('parseVitestJson', () => {
  it('counts passed, failed and skipped tests and collects failure details', () => {
    const raw = JSON.stringify({
      testResults: [
        {
          name: 'a.test.ts',
          status: 'failed',
          assertionResults: [
            { fullName: 'a works', status: 'passed' },
            { fullName: 'a breaks', status: 'failed', failureMessages: ['boom', 'more'] },
            { fullName: 'a later', status: 'pending' },
          ],
        },
      ],
    });
    const { tests, failures } = parseVitestJson(raw);
    expect(tests).toEqual({ total: 3, passed: 1, failed: 1, skipped: 1 });
    expect(failures).toEqual([{ file: 'a.test.ts', name: 'a breaks', message: 'boom\nmore' }]);
  });

  it('reports a suite that failed to load as a failure', () => {
    const raw = JSON.stringify({
      testResults: [{ name: 'b.test.ts', status: 'failed', message: 'import error' }],
    });
    const { tests, failures } = parseVitestJson(raw);
    expect(tests.failed).toBe(1);
    expect(failures[0]?.message).toBe('import error');
  });

  it('handles an empty document', () => {
    expect(parseVitestJson('{}').tests.total).toBe(0);
  });
});

describe('countWarnings', () => {
  it('reads the summary line when present', () => {
    expect(countWarnings('Found 3 warnings and 0 errors.')).toBe(3);
  });

  it('counts individual warning lines otherwise', () => {
    const output = 'src/a.ts:1:2: warning x\nsrc/b.ts:3:4: warning y\nnote';
    expect(countWarnings(output)).toBe(2);
  });

  it('returns zero for clean output', () => {
    expect(countWarnings('all good')).toBe(0);
  });
});

describe('buildSummary', () => {
  const env = { node: 'v24', platform: 'linux', ci: true };
  const start = new Date('2026-01-01T00:00:00Z');
  const end = new Date('2026-01-01T00:00:05Z');

  it('is failed when any step failed', () => {
    const summary = buildSummary([step({}), step({ id: 'x', status: 'failed' })], start, end, env);
    expect(summary.overall).toBe('failed');
    expect(summary.durationMs).toBe(5000);
  });

  it('treats skipped steps as not failing', () => {
    const summary = buildSummary([step({}), step({ id: 'x', status: 'skipped' })], start, end, env);
    expect(summary.overall).toBe('passed');
  });
});

describe('renderHtml', () => {
  it('escapes content and shows failures and links', () => {
    const summary = buildSummary(
      [
        step({
          status: 'failed',
          warnings: 2,
          tests: { total: 2, passed: 1, failed: 1, skipped: 0 },
          failures: [{ file: 'a.test.ts', name: '<b>bad</b>', message: 'x < y' }],
          logFile: 'logs/unit.log',
          detailFile: 'unit.json',
          note: 'noted',
        }),
      ],
      new Date('2026-01-01T00:00:00Z'),
      new Date('2026-01-01T00:00:01Z'),
      { node: 'v24', platform: 'win32', ci: false },
    );
    const html = renderHtml(summary);
    expect(html).toContain('&lt;b&gt;bad&lt;/b&gt;');
    expect(html).toContain('x &lt; y');
    expect(html).toContain('href="logs/unit.log"');
    expect(html).toContain('2 warning(s)');
    expect(html).toContain('Overall: failed');
  });

  it('escapes quotes and ampersands', () => {
    expect(escapeHtml('"a" & b')).toBe('&quot;a&quot; &amp; b');
  });
});

describe('plain output', () => {
  it('strips color and cursor escape codes but keeps the text', () => {
    expect(stripAnsi('[32m✓[39m ok [1;31mfail[0m[2K')).toBe('✓ ok fail');
    expect(stripAnsi('no codes')).toBe('no codes');
  });

  it('turns colors off for child processes', () => {
    const env = plainOutputEnv({ FORCE_COLOR: '3', PATH: 'x' });
    expect(env['FORCE_COLOR']).toBeUndefined();
    expect(env['NO_COLOR']).toBe('1');
    expect(env['PATH']).toBe('x');
  });
});

describe('parsePlaywrightJson', () => {
  const doc = {
    suites: [
      {
        file: 'a.e2e.test.ts',
        specs: [
          { title: 'passes', file: 'a.e2e.test.ts', tests: [{ status: 'expected', results: [] }] },
          {
            title: 'fails',
            file: 'a.e2e.test.ts',
            tests: [
              {
                status: 'unexpected',
                results: [{ status: 'failed', errors: [{ message: '[31mboom[39m' }] }],
              },
            ],
          },
        ],
        suites: [
          {
            specs: [
              {
                title: 'nested',
                file: 'a.e2e.test.ts',
                tests: [{ status: 'skipped', results: [] }],
              },
              { title: 'flaky', file: 'a.e2e.test.ts', tests: [{ status: 'flaky', results: [] }] },
            ],
          },
        ],
      },
    ],
  };

  it('counts tests and reports a failure with its plain message', () => {
    const parsed = parsePlaywrightJson(JSON.stringify(doc));
    expect(parsed.tests).toEqual({ total: 4, passed: 2, failed: 1, skipped: 1 });
    expect(parsed.failures).toEqual([{ file: 'a.e2e.test.ts', name: 'fails', message: 'boom' }]);
  });

  it('produces a failed browser section from one failure', () => {
    const parsed = parsePlaywrightJson(JSON.stringify(doc));
    const summary = buildSummary(
      [
        step({
          id: 'e2e',
          name: 'Browser tests',
          status: browserRunStatus(parsed.tests, 1),
          ...parsed,
        }),
      ],
      new Date('2026-01-01T00:00:00Z'),
      new Date('2026-01-01T00:00:01Z'),
      { node: 'v24', platform: 'linux', ci: false },
    );
    expect(summary.overall).toBe('failed');
    expect(renderHtml(summary)).toContain('Browser tests');
  });

  it('reports run-level errors as a failed suite', () => {
    const parsed = parsePlaywrightJson(
      JSON.stringify({ suites: [], errors: [{ message: 'no config' }] }),
    );
    expect(parsed.tests.failed).toBe(1);
    expect(parsed.failures[0]?.message).toBe('no config');
  });

  it('uses the single error field of older results and tolerates an empty document', () => {
    const parsed = parsePlaywrightJson(
      JSON.stringify({
        suites: [
          {
            specs: [{ tests: [{ status: 'unexpected', results: [{ error: { message: 'x' } }] }] }],
          },
        ],
      }),
    );
    expect(parsed.failures[0]?.message).toBe('x');
    expect(parsePlaywrightJson('{}').tests.total).toBe(0);
  });
});

describe('browserRunStatus', () => {
  const none = { total: 0, passed: 0, failed: 0, skipped: 0 };

  it('passes a zero-test run only when no spec file exists', () => {
    expect(browserRunStatus(none, 0)).toBe('passed');
    expect(browserRunStatus(none, 2)).toBe('failed');
  });

  it('fails on any failed test and passes a green run', () => {
    expect(browserRunStatus({ ...none, total: 1, failed: 1 }, 1)).toBe('failed');
    expect(browserRunStatus({ ...none, total: 1, passed: 1 }, 1)).toBe('passed');
  });
});

describe('step selection', () => {
  it('knows the conformance, browser and load steps in run order', () => {
    expect(known.has('conformance')).toBe(true);
    expect(known.has('e2e')).toBe(true);
    expect(known.has('load')).toBe(true);
    const ids = steps.map((candidate) => candidate.id);
    expect(ids.join(' ')).toBe(
      'format lint typecheck unit dotnet client security conformance protocol build integration e2e audit load',
    );
  });

  it('runs the .NET SDK step without the stack, through its coverage gate', () => {
    const dotnet = steps.find((candidate) => candidate.id === 'dotnet');
    expect(dotnet?.command).toBe('pnpm exec tsx scripts/test-runner/dotnet-sdk.ts');
    expect(dotnet?.needsStack).toBeUndefined();
  });

  it('runs the browser step on the stack through Playwright and keeps audit and load optional', () => {
    const e2e = steps.find((candidate) => candidate.id === 'e2e');
    expect(e2e).toMatchObject({ needsStack: true, playwright: true });
    expect(e2e?.vitest).toBeUndefined();
    expect(e2e?.command).toBe('pnpm exec playwright test --config tests/e2e/playwright.config.ts');
    expect(
      steps.filter((candidate) => candidate.optional).map((candidate) => candidate.id),
    ).toEqual(['audit', 'load']);
  });

  it('rejects an unknown step id or option (exit code 2 in the runner)', () => {
    expect(checkArguments(['--only=unit,nope'])).toContain('Unknown step "nope"');
    expect(checkArguments(['--skip=bogus'])).toContain('Unknown step');
    expect(checkArguments(['--wat'])).toContain('Unknown option');
    expect(checkArguments(['--', '--only=e2e', '--bail', '--files=a.test.ts'])).toBeUndefined();
  });
});
