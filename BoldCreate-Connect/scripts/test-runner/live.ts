/**
 * The live state of a test run, written to `reports/test-run/live.json` while the run goes on
 * and read by the dev dashboard. Pure functions only, so it can be unit tested.
 */
import type { StepResult, TestCounts, TestFailure } from './report.js';

export type LiveStepStatus = 'pending' | 'running' | 'passed' | 'failed' | 'skipped';

export interface LiveStep {
  id: string;
  name: string;
  status: LiveStepStatus;
  /** When the step began; only for a step that has started. */
  startedAt?: string;
  durationMs: number;
  warnings: number;
  tests?: TestCounts;
  /** Failed tests plus warnings, and one for a step that failed without naming a test. */
  issues: number;
  /** The first failures, capped so the file stays small. */
  failures: TestFailure[];
  note?: string;
  logFile?: string;
}

export interface LiveTotals {
  steps: number;
  done: number;
  passed: number;
  failed: number;
  skipped: number;
  tests: TestCounts;
  warnings: number;
  issues: number;
}

export interface LiveState {
  runId: string;
  /** The run was cancelled by a request, not finished by itself. */
  cancelled?: boolean;
  state: 'running' | 'finished';
  overall: 'running' | 'passed' | 'failed';
  startedAt: string;
  updatedAt: string;
  finishedAt?: string;
  /** Step ids chosen for this run, in the order they run. */
  selected: string[];
  steps: LiveStep[];
  totals: LiveTotals;
}

const MAX_FAILURES = 25;

/** The issues of a finished step: failed tests, warnings, and a failure no test explains. */
export function stepIssues(result: Pick<StepResult, 'status' | 'warnings' | 'failures'>): number {
  const unexplained = result.status === 'failed' && result.failures.length === 0 ? 1 : 0;
  return result.failures.length + result.warnings + unexplained;
}

export interface LiveInput {
  runId: string;
  startedAt: Date;
  now: Date;
  /** Every step the runner knows, in report order. */
  all: ReadonlyArray<{ id: string; name: string }>;
  /** The ids chosen for this run. */
  selected: readonly string[];
  results: ReadonlyMap<string, StepResult>;
  /** Steps that have started and not finished, with their start time. */
  running: ReadonlyMap<string, Date>;
  finished: boolean;
  /** Set when the run ended because it was asked to stop. */
  cancelled?: boolean;
}

export function buildLiveState(input: LiveInput): LiveState {
  const steps: LiveStep[] = [];
  for (const { id, name } of input.all) {
    if (!input.selected.includes(id)) continue;
    const result = input.results.get(id);
    const started = input.running.get(id);
    if (result) {
      steps.push({
        id,
        name,
        status: result.status,
        durationMs: result.durationMs,
        warnings: result.warnings,
        issues: stepIssues(result),
        failures: result.failures.slice(0, MAX_FAILURES),
        ...(result.tests ? { tests: result.tests } : {}),
        ...(result.note ? { note: result.note } : {}),
        ...(result.logFile ? { logFile: result.logFile } : {}),
      });
    } else if (started) {
      steps.push({
        id,
        name,
        status: 'running',
        startedAt: started.toISOString(),
        durationMs: input.now.getTime() - started.getTime(),
        warnings: 0,
        issues: 0,
        failures: [],
        logFile: `logs/${id}.log`,
      });
    } else {
      steps.push({
        id,
        name,
        status: 'pending',
        durationMs: 0,
        warnings: 0,
        issues: 0,
        failures: [],
      });
    }
  }

  const tests: TestCounts = { total: 0, passed: 0, failed: 0, skipped: 0 };
  for (const step of steps) {
    if (!step.tests) continue;
    tests.total += step.tests.total;
    tests.passed += step.tests.passed;
    tests.failed += step.tests.failed;
    tests.skipped += step.tests.skipped;
  }
  const count = (status: LiveStepStatus) => steps.filter((step) => step.status === status).length;
  const totals: LiveTotals = {
    steps: steps.length,
    done: count('passed') + count('failed') + count('skipped'),
    passed: count('passed'),
    failed: count('failed'),
    skipped: count('skipped'),
    tests,
    warnings: steps.reduce((sum, step) => sum + step.warnings, 0),
    issues: steps.reduce((sum, step) => sum + step.issues, 0),
  };

  return {
    runId: input.runId,
    ...(input.cancelled ? { cancelled: true } : {}),
    state: input.finished ? 'finished' : 'running',
    overall: input.finished ? (totals.failed > 0 ? 'failed' : 'passed') : 'running',
    startedAt: input.startedAt.toISOString(),
    updatedAt: input.now.toISOString(),
    ...(input.finished ? { finishedAt: input.now.toISOString() } : {}),
    selected: steps.map((step) => step.id),
    steps,
    totals,
  };
}
