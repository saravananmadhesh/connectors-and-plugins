import { describe, expect, it } from 'vitest';
import { buildLiveState, stepIssues } from './live.js';
import type { StepResult } from './report.js';

const all = [
  { id: 'format', name: 'Format check' },
  { id: 'unit', name: 'Unit tests' },
  { id: 'build', name: 'Build' },
  { id: 'e2e', name: 'Browser tests' },
];
const started = new Date('2026-11-03T10:00:00Z');
const now = new Date('2026-11-03T10:00:30Z');

const result = (overrides: Partial<StepResult>): StepResult => ({
  id: 'unit',
  name: 'Unit tests',
  command: 'x',
  status: 'passed',
  exitCode: 0,
  durationMs: 5000,
  warnings: 0,
  failures: [],
  ...overrides,
});

const base = {
  runId: 'r1',
  startedAt: started,
  now,
  all,
  results: new Map<string, StepResult>(),
  running: new Map<string, Date>(),
  finished: false,
};

describe('stepIssues', () => {
  it('counts failed tests and warnings', () => {
    const failures = [{ file: 'a', name: 'n', message: 'm' }];
    expect(stepIssues({ status: 'failed', warnings: 2, failures })).toBe(3);
  });

  it('counts a failed step that names no test as one issue', () => {
    expect(stepIssues({ status: 'failed', warnings: 0, failures: [] })).toBe(1);
  });

  it('counts nothing for a clean pass or a skip', () => {
    expect(stepIssues({ status: 'passed', warnings: 0, failures: [] })).toBe(0);
    expect(stepIssues({ status: 'skipped', warnings: 0, failures: [] })).toBe(0);
  });
});

describe('buildLiveState', () => {
  it('lists only the chosen steps, in report order, all pending at the start', () => {
    const live = buildLiveState({ ...base, selected: ['unit', 'format'] });
    expect(live.steps.map((step) => [step.id, step.status])).toEqual([
      ['format', 'pending'],
      ['unit', 'pending'],
    ]);
    expect(live.state).toBe('running');
    expect(live.overall).toBe('running');
    expect(live.totals).toMatchObject({ steps: 2, done: 0, issues: 0 });
  });

  it('shows a started step as running with its elapsed time', () => {
    const live = buildLiveState({
      ...base,
      selected: ['unit'],
      running: new Map([['unit', new Date('2026-11-03T10:00:10Z')]]),
    });
    expect(live.steps[0]).toMatchObject({ status: 'running', durationMs: 20_000 });
    expect(live.steps[0]?.startedAt).toBe('2026-11-03T10:00:10.000Z');
  });

  it('adds up tests, warnings and issues across finished steps', () => {
    const failures = [{ file: 'a.test.ts', name: 'breaks', message: 'boom' }];
    const results = new Map<string, StepResult>([
      ['format', result({ id: 'format', warnings: 0 })],
      [
        'unit',
        result({
          status: 'failed',
          exitCode: 1,
          warnings: 1,
          failures,
          tests: { total: 10, passed: 9, failed: 1, skipped: 0 },
        }),
      ],
    ]);
    const live = buildLiveState({ ...base, selected: ['format', 'unit', 'build'], results });
    expect(live.totals).toMatchObject({
      steps: 3,
      done: 2,
      passed: 1,
      failed: 1,
      warnings: 1,
      issues: 2,
      tests: { total: 10, passed: 9, failed: 1, skipped: 0 },
    });
    expect(live.steps[2]?.status).toBe('pending');
  });

  it('ends with an overall result and a finish time', () => {
    const results = new Map([['unit', result({})]]);
    const passed = buildLiveState({ ...base, selected: ['unit'], results, finished: true });
    expect(passed).toMatchObject({ state: 'finished', overall: 'passed' });
    expect(passed.finishedAt).toBe(now.toISOString());

    const failed = buildLiveState({
      ...base,
      selected: ['unit'],
      results: new Map([['unit', result({ status: 'failed', exitCode: 1 })]]),
      finished: true,
    });
    expect(failed.overall).toBe('failed');
    expect(failed.totals.issues).toBe(1);
  });

  it('caps the failures it carries', () => {
    const failures = Array.from({ length: 60 }, (_, n) => ({
      file: 'f',
      name: `t${n}`,
      message: 'm',
    }));
    const live = buildLiveState({
      ...base,
      selected: ['unit'],
      results: new Map([['unit', result({ status: 'failed', failures })]]),
    });
    expect(live.steps[0]?.failures).toHaveLength(25);
    expect(live.steps[0]?.issues).toBe(60);
  });

  it('keeps a skipped step out of the issue count and the failures', () => {
    const live = buildLiveState({
      ...base,
      selected: ['e2e'],
      results: new Map([
        ['e2e', result({ status: 'skipped', exitCode: null, note: 'No spec files' })],
      ]),
    });
    expect(live.totals).toMatchObject({ skipped: 1, failed: 0, issues: 0 });
    expect(live.steps[0]?.note).toBe('No spec files');
  });
});
