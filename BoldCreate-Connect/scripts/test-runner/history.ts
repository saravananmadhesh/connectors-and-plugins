/**
 * A record of every test run on this machine, whoever started it: a terminal, the dev dashboard,
 * an AI session or CI. Each run keeps one folder under `.cache/test-runs/<runId>/` with its live
 * state (rewritten while it goes), its summary and its step logs, so the dashboard learns about a
 * run by reading files and never has to be the process that started it.
 *
 * `reports/test-run/` stays what it was: the latest run, rewritten by the next one.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import type { LiveState } from './live.js';
import { isProcessAlive } from './run-lock.js';
import type { TestEntry } from './test-entries.js';

export const RUN_ID = /^run-\d{8}-\d{6}-\d{1,9}$/;
const STEP_ID = /^[a-z0-9-]+$/;
/** Runs kept; older ones are removed when a new one starts. */
export const KEEP_RUNS = 25;
const MAX_LOG_BYTES = 2_000_000;

export const historyDir = (root: string) => join(root, '.cache', 'test-runs');

/** `run-YYYYMMDD-HHMMSS-<pid>`: sorts by time, and is safe to put in a path or a URL. */
export function runIdFor(date: Date, pid: number): string {
  const p = (n: number, width = 2) => String(n).padStart(width, '0');
  return (
    `run-${p(date.getUTCFullYear(), 4)}${p(date.getUTCMonth() + 1)}${p(date.getUTCDate())}` +
    `-${p(date.getUTCHours())}${p(date.getUTCMinutes())}${p(date.getUTCSeconds())}-${pid}`
  );
}

/** Who started a run: `TEST_RUN_LABEL` when set, else a guess from the environment. */
export function runLabel(env: NodeJS.ProcessEnv): string {
  const set = env['TEST_RUN_LABEL']
    ?.trim()
    .replace(/[^A-Za-z0-9 ._-]/g, '')
    .slice(0, 40);
  if (set) return set;
  if (env['CLAUDECODE']) return 'claude-code';
  if (env['CI'] ?? env['TF_BUILD']) return 'ci';
  return 'terminal';
}

export interface RunMeta {
  pid: number;
  cwd: string;
  /** The runner's own arguments, for example `--only=unit,lint`. */
  args: string;
  label: string;
}

export type RunState = 'running' | 'passed' | 'failed' | 'cancelled' | 'interrupted' | 'rejected';

/** What the run list shows; the full state is read when a run is opened. */
export interface RunListItem {
  runId: string;
  state: RunState;
  startedAt: string;
  finishedAt?: string;
  updatedAt: string;
  durationMs: number;
  label: string;
  pid: number;
  args: string;
  selected: string[];
  steps: number;
  done: number;
  failed: number;
  tests: number;
  issues: number;
  note?: string;
  /** The run has its own HTML report (a finished run does). */
  hasReport?: boolean;
  /** When a stop was asked for, for a run that is still going. */
  cancelRequestedAt?: string;
}

export interface StoredRun extends LiveState {
  meta: RunMeta;
  /** Set for a run that never started because another one held the lock. */
  rejected?: { holderPid: number; holderStartedAt: string };
}

function writeAtomic(file: string, data: string): void {
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(`${file}.tmp`, data);
  renameSync(`${file}.tmp`, file);
}

export function writeRun(root: string, run: StoredRun): void {
  if (!RUN_ID.test(run.runId)) throw new Error('invalid run id');
  writeAtomic(join(historyDir(root), run.runId, 'live.json'), JSON.stringify(run));
}

/** Copies the step logs of a finished run next to its state; each is cut to its last part. */
export function archiveLogs(root: string, runId: string, logDir: string): void {
  if (!RUN_ID.test(runId) || !existsSync(logDir)) return;
  const target = join(historyDir(root), runId, 'logs');
  mkdirSync(target, { recursive: true });
  const copy = (from: string, to: string) => {
    const text = readFileSync(from, 'utf8');
    writeFileSync(
      to,
      text.length > MAX_LOG_BYTES
        ? `[earlier output left out]\n${text.slice(-MAX_LOG_BYTES)}`
        : text,
    );
  };
  for (const entry of readdirSync(logDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.log')) {
      copy(join(logDir, entry.name), join(target, entry.name));
    }
  }
  // The logs of the test stack (its Postgres above all) are kept too: they are what explains a
  // step that could not run, and the next run would otherwise wipe them.
  const services = join(logDir, 'services');
  if (existsSync(services)) {
    for (const entry of readdirSync(services, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.log')) {
        mkdirSync(join(target, 'services'), { recursive: true });
        copy(join(services, entry.name), join(target, 'services', entry.name));
      }
    }
  }
}

/** The log of one service of the test stack, kept with its run; `postgres` is the usual one. */
export function readServiceLog(root: string, runId: string, service: string): string | undefined {
  if (!RUN_ID.test(runId) || !STEP_ID.test(service)) return undefined;
  const file = join(historyDir(root), runId, 'logs', 'services', `${service}.log`);
  return existsSync(file) && statSync(file).isFile() ? readFileSync(file, 'utf8') : undefined;
}

/** Removes the oldest runs beyond `keep`; run ids sort by time. */
export function pruneRuns(root: string, keep = KEEP_RUNS): string[] {
  const dir = historyDir(root);
  if (!existsSync(dir)) return [];
  const ids = readdirSync(dir)
    .filter((name) => RUN_ID.test(name))
    .sort();
  const old = ids.slice(0, Math.max(0, ids.length - keep));
  for (const id of old) rmSync(join(dir, id), { recursive: true, force: true });
  return old;
}

export type DeleteResult = 'deleted' | 'running' | 'missing';

/**
 * Removes one run and everything kept with it (state, logs, test results, report). A run that is
 * still going is refused: cancel it first. Only a well-formed run id is ever turned into a path,
 * and that path is checked to be inside the history folder.
 */
export function deleteRun(
  root: string,
  runId: string,
  alive: (pid: number) => boolean = isProcessAlive,
): DeleteResult {
  if (!RUN_ID.test(runId)) return 'missing';
  const dir = join(historyDir(root), runId);
  if (!dir.startsWith(historyDir(root)) || !existsSync(dir)) return 'missing';
  const run = readRun(root, runId);
  if (run && stateOf(run, alive) === 'running') return 'running';
  rmSync(dir, { recursive: true, force: true });
  return 'deleted';
}

/** Removes every run that is not going, and returns their ids; a run in progress stays. */
export function deleteFinishedRuns(
  root: string,
  alive: (pid: number) => boolean = isProcessAlive,
): string[] {
  const dir = historyDir(root);
  if (!existsSync(dir)) return [];
  const removed: string[] = [];
  for (const id of readdirSync(dir).filter((name) => RUN_ID.test(name))) {
    if (deleteRun(root, id, alive) === 'deleted') removed.push(id);
  }
  return removed;
}

/** A refused start is recorded too, so a second terminal or an AI session is not invisible. */
export function recordRejected(
  root: string,
  input: { runId: string; now: Date; meta: RunMeta; holder: { pid: number; startedAt: string } },
): void {
  const at = input.now.toISOString();
  writeRun(root, {
    runId: input.runId,
    state: 'finished',
    overall: 'failed',
    startedAt: at,
    updatedAt: at,
    finishedAt: at,
    selected: [],
    steps: [],
    totals: {
      steps: 0,
      done: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: { total: 0, passed: 0, failed: 0, skipped: 0 },
      warnings: 0,
      issues: 0,
    },
    meta: input.meta,
    rejected: { holderPid: input.holder.pid, holderStartedAt: input.holder.startedAt },
  });
}

function stateOf(run: StoredRun, alive: (pid: number) => boolean): RunState {
  if (run.rejected) return 'rejected';
  if (run.cancelled && run.state === 'finished') return 'cancelled';
  if (run.state === 'running') return alive(run.meta.pid) ? 'running' : 'interrupted';
  return run.overall === 'passed' ? 'passed' : 'failed';
}

function parse(text: string): StoredRun | undefined {
  try {
    const run = JSON.parse(text) as Partial<StoredRun>;
    if (
      typeof run.runId === 'string' &&
      RUN_ID.test(run.runId) &&
      Array.isArray(run.steps) &&
      run.meta &&
      Number.isInteger(run.meta.pid) &&
      run.totals
    ) {
      return run as StoredRun;
    }
  } catch {
    // a file being replaced or damaged: skipped
  }
  return undefined;
}

export function readRun(root: string, runId: string): StoredRun | undefined {
  if (!RUN_ID.test(runId)) return undefined;
  const file = join(historyDir(root), runId, 'live.json');
  return existsSync(file) ? parse(readFileSync(file, 'utf8')) : undefined;
}

export function toListItem(run: StoredRun, alive: (pid: number) => boolean): RunListItem {
  const state = stateOf(run, alive);
  const end = run.finishedAt ?? run.updatedAt;
  return {
    runId: run.runId,
    state,
    startedAt: run.startedAt,
    ...(run.finishedAt ? { finishedAt: run.finishedAt } : {}),
    updatedAt: run.updatedAt,
    durationMs: Math.max(0, Date.parse(end) - Date.parse(run.startedAt)),
    label: run.meta.label,
    pid: run.meta.pid,
    args: run.meta.args,
    selected: run.selected,
    steps: run.totals.steps,
    done: run.totals.done,
    failed: run.totals.failed,
    tests: run.totals.tests.total,
    issues: run.totals.issues,
    ...(run.rejected
      ? { note: `Not started: another run (pid ${run.rejected.holderPid}) held the lock` }
      : state === 'interrupted'
        ? { note: 'The process ended before the run finished' }
        : {}),
  };
}

/** Newest first. A damaged or half-written entry is left out rather than failing the list. */
export function listRuns(
  root: string,
  alive: (pid: number) => boolean = isProcessAlive,
  limit = KEEP_RUNS,
): RunListItem[] {
  const dir = historyDir(root);
  if (!existsSync(dir)) return [];
  const items: RunListItem[] = [];
  for (const id of readdirSync(dir)
    .filter((name) => RUN_ID.test(name))
    .sort()
    .reverse()) {
    const run = readRun(root, id);
    if (run) items.push(toListItem(run, alive));
    if (items.length >= limit) break;
  }
  return items;
}

/** The HTML report of a finished run, kept with it so an older run keeps its own report. */
export function archiveReport(root: string, runId: string, html: string): void {
  if (!RUN_ID.test(runId)) throw new Error('invalid run id');
  writeAtomic(join(historyDir(root), runId, 'report.html'), html);
}

const reportFile = (root: string, runId: string) => join(historyDir(root), runId, 'report.html');

export function hasRunReport(root: string, runId: string): boolean {
  return RUN_ID.test(runId) && existsSync(reportFile(root, runId));
}

export function readRunReport(root: string, runId: string): string | undefined {
  return hasRunReport(root, runId) ? readFileSync(reportFile(root, runId), 'utf8') : undefined;
}

/**
 * A request to stop a run, as a file the runner looks for: any process can ask, and the runner
 * stops its own steps and its stack cleanly. Returns false for a run that is not going.
 */
export function requestCancel(
  root: string,
  runId: string,
  alive: (pid: number) => boolean = isProcessAlive,
  at: Date = new Date(),
): boolean {
  const run = readRun(root, runId);
  if (!run || run.rejected || run.state !== 'running' || !alive(run.meta.pid)) return false;
  writeAtomic(join(historyDir(root), runId, 'cancel'), at.toISOString());
  return true;
}

export const cancelFile = (root: string, runId: string) => join(historyDir(root), runId, 'cancel');

/** The result of every test of one step, kept with its run. */
export function archiveTests(
  root: string,
  runId: string,
  stepId: string,
  entries: readonly TestEntry[],
): void {
  if (!RUN_ID.test(runId) || !STEP_ID.test(stepId)) throw new Error('invalid id');
  writeAtomic(join(historyDir(root), runId, 'tests', `${stepId}.json`), JSON.stringify(entries));
}

export function readTests(root: string, runId: string, stepId: string): TestEntry[] | undefined {
  if (!RUN_ID.test(runId) || !STEP_ID.test(stepId)) return undefined;
  const file = join(historyDir(root), runId, 'tests', `${stepId}.json`);
  if (!existsSync(file)) return undefined;
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as unknown;
    return Array.isArray(parsed) ? (parsed as TestEntry[]) : undefined;
  } catch {
    return undefined;
  }
}

export function readRunLog(root: string, runId: string, stepId: string): string | undefined {
  if (!RUN_ID.test(runId) || !STEP_ID.test(stepId)) return undefined;
  const file = join(historyDir(root), runId, 'logs', `${stepId}.log`);
  return existsSync(file) && statSync(file).isFile() ? readFileSync(file, 'utf8') : undefined;
}
