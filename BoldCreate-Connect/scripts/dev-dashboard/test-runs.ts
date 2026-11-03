/**
 * What the dev dashboard knows about test runs. It reads the run history the runner writes
 * (`scripts/test-runner/history.ts`), so a run started in any terminal, by an AI session or by CI
 * shows up the same way as one started here. It can also start `pnpm test` itself: only step ids
 * from the runner's own list are accepted, so a request can never put its own text on a command
 * line, and one run goes at a time (the same rule the runner enforces with its lock file).
 */
import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
  cancelFile,
  deleteFinishedRuns,
  deleteRun,
  hasRunReport,
  listRuns,
  readRun,
  readRunLog,
  readRunReport,
  readTests,
  requestCancel,
  RUN_ID,
  toListItem,
  type RunListItem,
  type StoredRun,
} from '../test-runner/history.js';
import { stripAnsi } from '../test-runner/report.js';
import { isProcessAlive, readLock } from '../test-runner/run-lock.js';
import { queryEntries, type EntryPage, type EntryQuery } from '../test-runner/test-entries.js';
import { steps } from '../test-runner/steps.js';

const repoRoot = resolve(import.meta.dirname, '..', '..');
const MAX_OUTPUT_LINES = 120;
const MAX_LOG_BYTES = 1_000_000;
/** How long a run may ignore a cancel request before it can be stopped by force. */
export const FORCE_AFTER_MS = 15_000;

export interface TestStepInfo {
  id: string;
  name: string;
  /** Not part of the default run; it runs only when chosen. */
  optional: boolean;
  /** Needs the isolated live stack, so it takes longer to start. */
  needsStack: boolean;
}

export interface ActiveRun {
  pid: number;
  startedAt: string;
  ids: string[];
}

export interface TestsPayload {
  /** Every recorded run, newest first, from any terminal, AI session, CI or this dashboard. */
  runs: RunListItem[];
  /** The run this dashboard started and that is still going. */
  active: ActiveRun | null;
  /** Another process holds the run lock, so a new run cannot start. */
  lockedBy: { pid: number; startedAt: string } | null;
  /** The newest run, which is the one `reports/test-run/index.html` describes. */
  latestRunId: string | null;
  /** Last lines the started run printed, and how it ended. */
  output: string[];
  lastExit: number | null;
  available: TestStepInfo[];
}

export interface RunDetail {
  item: RunListItem;
  run: StoredRun;
}

export type CancelResult =
  | { ok: true; requestedAt: string }
  | { ok: false; status: 404 | 409; error: string };

export type DeleteRunResult =
  | { ok: true; deleted: string[] }
  | { ok: false; status: 404 | 409; error: string };

export type StartResult =
  | { ok: true; ids: string[] }
  | { ok: false; status: 400 | 409; error: string };

export interface TestRunOptions {
  root?: string;
  lockFile?: string;
  /** Replaces `spawn` in tests. */
  spawnImpl?: typeof spawn;
  /** Replaces the process kill in tests. */
  killTree?: (child: ChildProcess) => void;
  /** Replaces the liveness check of a run's process in tests. */
  alive?: (pid: number) => boolean;
  /** Replaces ending a process tree by id in tests. */
  killPid?: (pid: number) => void;
  /** Replaces the clock in tests. */
  now?: () => number;
}

/** The environment without colour codes, so the lines shown in the dashboard are plain text. */
function plainEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env, NO_COLOR: '1', TEST_RUN_LABEL: 'dashboard' };
  delete env['FORCE_COLOR'];
  return env;
}

function defaultKillTree(child: ChildProcess): void {
  if (child.pid === undefined) return;
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F']);
  else child.kill('SIGTERM');
}

function defaultKillPid(pid: number): void {
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(pid), '/T', '/F']);
  else {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      // already gone
    }
  }
}

export function availableSteps(): TestStepInfo[] {
  return steps.map((step) => ({
    id: step.id,
    name: step.name,
    optional: Boolean(step.optional),
    needsStack: Boolean(step.needsStack),
  }));
}

/** The steps a plain `pnpm test` runs: everything that is not optional. */
export const defaultStepIds = (): string[] =>
  steps.filter((step) => !step.optional).map((step) => step.id);

export function createTestRunController(options: TestRunOptions = {}) {
  const root = options.root ?? repoRoot;
  const latestDir = join(root, 'reports', 'test-run');
  const lockFile = options.lockFile ?? join(root, '.cache', 'test-run.lock');
  const spawnImpl = options.spawnImpl ?? spawn;
  const killTree = options.killTree ?? defaultKillTree;
  const alive = options.alive ?? isProcessAlive;
  const killPid = options.killPid ?? defaultKillPid;
  const now = options.now ?? Date.now;

  let child: ChildProcess | undefined;
  let active: ActiveRun | null = null;
  let output: string[] = [];
  let lastExit: number | null = null;

  const known = new Set(steps.map((step) => step.id));

  function remember(text: string): void {
    for (const line of stripAnsi(text).split(/\r?\n/)) {
      if (line.trim()) output.push(line.slice(0, 400));
    }
    if (output.length > MAX_OUTPUT_LINES) output = output.slice(-MAX_OUTPUT_LINES);
  }

  function lockHolder(): { pid: number; startedAt: string } | null {
    const lock = readLock(lockFile);
    return lock && alive(lock.pid) ? lock : null;
  }

  /** The id of the run `reports/test-run/` describes, read from the live file the runner keeps. */
  /** When a stop was asked for, if it was and the run has not ended yet. */
  function cancelRequestedAt(runId: string): string | undefined {
    const file = cancelFile(root, runId);
    if (!existsSync(file)) return undefined;
    // The file holds the time of the request; its modified time is the fallback for a file that does not.
    const written = Date.parse(readFileSync(file, 'utf8'));
    return new Date(Number.isNaN(written) ? statSync(file).mtimeMs : written).toISOString();
  }

  function describe(item: RunListItem): RunListItem {
    const requested = item.state === 'running' ? cancelRequestedAt(item.runId) : undefined;
    return {
      ...item,
      hasReport: hasRunReport(root, item.runId),
      ...(requested ? { cancelRequestedAt: requested } : {}),
    };
  }

  async function latestRunId(): Promise<string | null> {
    try {
      const parsed = JSON.parse(await readFile(join(latestDir, 'live.json'), 'utf8')) as {
        runId?: unknown;
      };
      return typeof parsed.runId === 'string' && RUN_ID.test(parsed.runId) ? parsed.runId : null;
    } catch {
      return null;
    }
  }

  return {
    async state(): Promise<TestsPayload> {
      return {
        runs: listRuns(root, alive).map(describe),
        active,
        lockedBy: active ? null : lockHolder(),
        latestRunId: await latestRunId(),
        output,
        lastExit,
        available: availableSteps(),
      };
    },

    /** One run in full; undefined for an unknown or malformed id. */
    run(runId: string): RunDetail | undefined {
      const run = readRun(root, runId);
      return run ? { item: describe(toListItem(run, alive)), run } : undefined;
    },

    start(ids: readonly string[]): StartResult {
      const unique = [...new Set(ids)];
      if (unique.length === 0)
        return { ok: false, status: 400, error: 'Choose at least one step.' };
      const unknown = unique.filter((id) => !known.has(id));
      if (unknown.length > 0) return { ok: false, status: 400, error: 'Unknown test step.' };
      if (active) return { ok: false, status: 409, error: 'A test run is already going.' };
      const holder = lockHolder();
      if (holder) {
        return {
          ok: false,
          status: 409,
          error: `Another test run is active (pid ${holder.pid}). Wait for it to finish.`,
        };
      }
      output = [];
      lastExit = null;
      // One command string: the ids were checked against the runner's list, so none can carry text.
      const run = spawnImpl(`pnpm test -- --only=${unique.join(',')}`, {
        cwd: root,
        shell: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: plainEnv(),
      });
      child = run;
      active = { pid: run.pid ?? 0, startedAt: new Date().toISOString(), ids: unique };
      run.stdout?.on('data', (chunk: Buffer) => remember(chunk.toString()));
      run.stderr?.on('data', (chunk: Buffer) => remember(chunk.toString()));
      run.on('error', (error) => {
        remember(`Could not start the test run: ${error.message}`);
        child = undefined;
        active = null;
        lastExit = -1;
      });
      run.on('close', (code) => {
        if (child === run) {
          child = undefined;
          active = null;
          lastExit = code;
        }
      });
      return { ok: true, ids: unique };
    },

    /**
     * Asks any running run to stop: the runner sees a file next to its state, stops its own steps
     * and its stack, and records the run as cancelled.
     */
    cancel(runId: string): CancelResult {
      const run = readRun(root, runId);
      if (!run) return { ok: false, status: 404, error: 'Unknown run.' };
      if (!requestCancel(root, runId, alive, new Date(now()))) {
        return { ok: false, status: 409, error: 'That run is not going.' };
      }
      return { ok: true, requestedAt: cancelRequestedAt(runId) ?? new Date(now()).toISOString() };
    },

    /**
     * Ends a run that ignored a cancel request: its process tree, found by the id the run recorded
     * and only when that id is the one holding the run lock, so no other process can be named.
     */
    forceStop(runId: string): CancelResult {
      const run = readRun(root, runId);
      if (!run) return { ok: false, status: 404, error: 'Unknown run.' };
      const requested = cancelRequestedAt(runId);
      if (run.state !== 'running' || !alive(run.meta.pid) || !requested) {
        return { ok: false, status: 409, error: 'Ask the run to cancel first, and wait.' };
      }
      if (now() - Date.parse(requested) < FORCE_AFTER_MS) {
        return { ok: false, status: 409, error: 'Give the run a few seconds to stop by itself.' };
      }
      if (readLock(lockFile)?.pid !== run.meta.pid) {
        return {
          ok: false,
          status: 409,
          error: 'That process is not the one holding the run lock.',
        };
      }
      killPid(run.meta.pid);
      return { ok: true, requestedAt: requested };
    },

    /** Removes one run from the history, with its logs, test results and report. */
    remove(runId: string): DeleteRunResult {
      const result = deleteRun(root, runId, alive);
      if (result === 'missing') return { ok: false, status: 404, error: 'Unknown run.' };
      if (result === 'running') {
        return { ok: false, status: 409, error: 'That run is going. Cancel it first.' };
      }
      return { ok: true, deleted: [runId] };
    },

    /** Removes every run that is not going. */
    removeFinished(): DeleteRunResult {
      return { ok: true, deleted: deleteFinishedRuns(root, alive) };
    },

    /** One page of the single tests of a step of a run; undefined when none were kept. */
    tests(runId: string, stepId: string, query: EntryQuery): EntryPage | undefined {
      if (!known.has(stepId)) return undefined;
      const entries = readTests(root, runId, stepId);
      return entries ? queryEntries(entries, query) : undefined;
    },

    /** Ends the run this dashboard started, with the processes it started. */
    stop(): boolean {
      if (!child) return false;
      killTree(child);
      return true;
    },

    /**
     * The log of one step of one run, last megabyte at most. A finished run's logs are kept with
     * it; a run that is still going (or is the latest) reads them from `reports/test-run/logs`.
     */
    async log(runId: string, stepId: string): Promise<string | undefined> {
      if (!RUN_ID.test(runId) || !known.has(stepId)) return undefined;
      let text = readRunLog(root, runId, stepId);
      if (text === undefined && (await latestRunId()) === runId) {
        const file = join(latestDir, 'logs', `${stepId}.log`);
        if (existsSync(file)) {
          const size = (await stat(file)).size;
          const whole = await readFile(file, 'utf8');
          text =
            size > MAX_LOG_BYTES
              ? `[earlier output left out]\n${whole.slice(-MAX_LOG_BYTES)}`
              : whole;
        }
      }
      return text;
    },

    /** The HTML report of one run, or of the latest finished run when no id is given. */
    async report(runId?: string): Promise<string | undefined> {
      if (runId !== undefined) return readRunReport(root, runId);
      const file = join(latestDir, 'index.html');
      return existsSync(file) ? readFile(file, 'utf8') : undefined;
    },
  };
}

export type TestRunController = ReturnType<typeof createTestRunController>;
