import { EventEmitter } from 'node:events';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { ChildProcess, spawn } from 'node:child_process';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { availableSteps, createTestRunController, defaultStepIds } from './test-runs.js';

class FakeChild extends EventEmitter {
  pid = 4242;
  stdout = new EventEmitter();
  stderr = new EventEmitter();
}

let root: string;
let children: FakeChild[];
let commands: string[];
let killed: ChildProcess[];

const spawnImpl = ((command: string) => {
  commands.push(command);
  const child = new FakeChild();
  children.push(child);
  return child as unknown as ChildProcess;
}) as unknown as typeof spawn;

const make = () =>
  createTestRunController({
    root,
    lockFile: join(root, '.cache', 'test-run.lock'),
    spawnImpl,
    killTree: (child) => killed.push(child),
  });

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'test-runs-'));
  await mkdir(join(root, '.cache'), { recursive: true });
  children = [];
  commands = [];
  killed = [];
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe('the step list', () => {
  it('offers every runner step and defaults to the non-optional ones', () => {
    const ids = availableSteps().map((step) => step.id);
    expect(ids).toEqual(
      expect.arrayContaining(['format', 'lint', 'typecheck', 'unit', 'integration']),
    );
    expect(defaultStepIds()).toContain('unit');
    expect(defaultStepIds()).not.toContain('load');
  });
});

describe('starting a run', () => {
  it('runs exactly the chosen steps, once each, as one fixed command', () => {
    const controller = make();
    const result = controller.start(['unit', 'lint', 'unit']);
    expect(result).toEqual({ ok: true, ids: ['unit', 'lint'] });
    expect(commands).toEqual(['pnpm test -- --only=unit,lint']);
  });

  it('refuses an empty choice', () => {
    expect(make().start([])).toMatchObject({ ok: false, status: 400 });
    expect(commands).toEqual([]);
  });

  it.each(['nope', 'unit; rm -rf /', 'unit && calc', '../unit', '', 'UNIT', '$(id)'])(
    'refuses the step %j and runs nothing',
    (id) => {
      expect(make().start(['lint', id])).toMatchObject({ ok: false, status: 400 });
      expect(commands).toEqual([]);
    },
  );

  it('allows one run at a time and the next after it ends', async () => {
    const controller = make();
    expect(controller.start(['unit']).ok).toBe(true);
    expect(controller.start(['lint'])).toMatchObject({ ok: false, status: 409 });
    expect((await controller.state()).active).toMatchObject({ pid: 4242, ids: ['unit'] });

    children[0]?.emit('close', 0);
    const after = await controller.state();
    expect(after.active).toBeNull();
    expect(after.lastExit).toBe(0);
    expect(controller.start(['lint']).ok).toBe(true);
  });

  it('refuses while another process holds the run lock', async () => {
    await writeFile(
      join(root, '.cache', 'test-run.lock'),
      JSON.stringify({ pid: process.pid, startedAt: '2026-11-03T10:00:00Z' }),
    );
    const controller = make();
    const result = controller.start(['unit']);
    expect(result).toMatchObject({ ok: false, status: 409 });
    expect(JSON.stringify(result)).toContain(String(process.pid));
    expect((await controller.state()).lockedBy).toMatchObject({ pid: process.pid });
  });

  it('ignores a lock whose process is gone', async () => {
    await writeFile(
      join(root, '.cache', 'test-run.lock'),
      JSON.stringify({ pid: 2_147_000_000, startedAt: '2026-11-03T10:00:00Z' }),
    );
    expect(make().start(['unit']).ok).toBe(true);
  });

  it('frees the slot and reports a start that fails', async () => {
    const controller = make();
    controller.start(['unit']);
    children[0]?.emit('error', new Error('spawn pnpm ENOENT'));
    const state = await controller.state();
    expect(state.active).toBeNull();
    expect(state.lastExit).toBe(-1);
    expect(state.output.join('\n')).toContain('Could not start the test run');
  });

  it('records a failing exit code', async () => {
    const controller = make();
    controller.start(['unit']);
    children[0]?.emit('close', 1);
    expect((await controller.state()).lastExit).toBe(1);
  });
});

describe('output of a run', () => {
  it('keeps plain lines, without colour codes or blanks', async () => {
    const controller = make();
    controller.start(['unit']);
    children[0]?.stdout.emit(
      'data',
      Buffer.from('\u001b[32m[test-runner] Unit tests ...\u001b[0m\n\n'),
    );
    children[0]?.stderr.emit('data', Buffer.from('warning: something\n'));
    expect((await controller.state()).output).toEqual([
      '[test-runner] Unit tests ...',
      'warning: something',
    ]);
  });

  it('keeps only the last lines', async () => {
    const controller = make();
    controller.start(['unit']);
    children[0]?.stdout.emit(
      'data',
      Buffer.from(Array.from({ length: 500 }, (_, n) => `line ${n}`).join('\n')),
    );
    const { output } = await controller.state();
    expect(output).toHaveLength(120);
    expect(output.at(-1)).toBe('line 499');
  });

  it('starts each run with clean output', async () => {
    const controller = make();
    controller.start(['unit']);
    children[0]?.stdout.emit('data', Buffer.from('old\n'));
    children[0]?.emit('close', 0);
    controller.start(['lint']);
    expect((await controller.state()).output).toEqual([]);
  });
});

describe('stopping a run', () => {
  it('ends the run it started and says so', () => {
    const controller = make();
    controller.start(['unit']);
    expect(controller.stop()).toBe(true);
    expect(killed).toEqual([children[0]]);
  });

  it('does nothing when no run was started here', () => {
    expect(make().stop()).toBe(false);
    expect(killed).toEqual([]);
  });
});

const storedRun = (runId: string, overrides: Record<string, unknown> = {}) => ({
  runId,
  state: 'finished',
  overall: 'passed',
  startedAt: '2026-11-03T10:00:00.000Z',
  updatedAt: '2026-11-03T10:00:30.000Z',
  finishedAt: '2026-11-03T10:00:30.000Z',
  selected: ['unit'],
  steps: [],
  totals: {
    steps: 1,
    done: 1,
    passed: 1,
    failed: 0,
    skipped: 0,
    tests: { total: 5, passed: 5, failed: 0, skipped: 0 },
    warnings: 0,
    issues: 0,
  },
  meta: { pid: 111, cwd: 'x', args: '--only=unit', label: 'terminal' },
  ...overrides,
});

async function saveRun(runId: string, run: unknown): Promise<void> {
  await mkdir(join(root, '.cache', 'test-runs', runId), { recursive: true });
  await writeFile(join(root, '.cache', 'test-runs', runId, 'live.json'), JSON.stringify(run));
}

const FIRST = 'run-20261103-100000-111';
const SECOND = 'run-20261103-110000-222';

describe('the run history', () => {
  it('is empty before any run', async () => {
    const state = await make().state();
    expect(state.runs).toEqual([]);
    expect(state.latestRunId).toBeNull();
  });

  it('lists runs from every terminal, newest first, each with who started it', async () => {
    await saveRun(FIRST, storedRun(FIRST));
    await saveRun(
      SECOND,
      storedRun(SECOND, {
        meta: { pid: 222, cwd: 'y', args: '--only=lint', label: 'claude-code' },
      }),
    );
    const { runs } = await make().state();
    expect(runs.map((run) => [run.runId, run.label, run.state])).toEqual([
      [SECOND, 'claude-code', 'passed'],
      [FIRST, 'terminal', 'passed'],
    ]);
  });

  it('shows a run that is going as running, and one whose process ended as interrupted', async () => {
    await saveRun(
      FIRST,
      storedRun(FIRST, { state: 'running', overall: 'running', finishedAt: undefined }),
    );
    await saveRun(
      SECOND,
      storedRun(SECOND, {
        state: 'running',
        overall: 'running',
        finishedAt: undefined,
        meta: { pid: 222, cwd: 'y', args: '', label: 'terminal' },
      }),
    );
    const controller = createTestRunController({
      root,
      lockFile: join(root, '.cache', 'test-run.lock'),
      spawnImpl,
      alive: (pid) => pid === 111,
    });
    const byId = Object.fromEntries((await controller.state()).runs.map((run) => [run.runId, run]));
    expect(byId[FIRST]?.state).toBe('running');
    expect(byId[SECOND]?.state).toBe('interrupted');
    expect(byId[SECOND]?.note).toContain('ended before the run finished');
  });

  it('marks a failed run and counts its issues', async () => {
    await saveRun(
      FIRST,
      storedRun(FIRST, {
        overall: 'failed',
        totals: {
          steps: 2,
          done: 2,
          passed: 1,
          failed: 1,
          skipped: 0,
          tests: { total: 10, passed: 8, failed: 2, skipped: 0 },
          warnings: 1,
          issues: 3,
        },
      }),
    );
    const [run] = (await make().state()).runs;
    expect(run).toMatchObject({ state: 'failed', failed: 1, issues: 3, tests: 10 });
  });

  it('shows a refused start, so a second terminal is not invisible', async () => {
    await saveRun(
      FIRST,
      storedRun(FIRST, { overall: 'failed', rejected: { holderPid: 999, holderStartedAt: 'x' } }),
    );
    const [run] = (await make().state()).runs;
    expect(run?.state).toBe('rejected');
    expect(run?.note).toContain('pid 999');
  });

  it('leaves out an entry that is damaged', async () => {
    await saveRun(FIRST, storedRun(FIRST));
    await mkdir(join(root, '.cache', 'test-runs', SECOND), { recursive: true });
    await writeFile(join(root, '.cache', 'test-runs', SECOND, 'live.json'), '{broken');
    expect((await make().state()).runs.map((run) => run.runId)).toEqual([FIRST]);
  });

  it('opens one run in full, and nothing for an unknown or unsafe id', async () => {
    await saveRun(FIRST, storedRun(FIRST));
    const controller = make();
    expect(controller.run(FIRST)?.item.state).toBe('passed');
    expect(controller.run(SECOND)).toBeUndefined();
    expect(controller.run('../../etc/passwd')).toBeUndefined();
    expect(controller.run('run-1')).toBeUndefined();
  });

  it('says which run the latest report belongs to', async () => {
    await mkdir(join(root, 'reports', 'test-run'), { recursive: true });
    await writeFile(
      join(root, 'reports', 'test-run', 'live.json'),
      JSON.stringify({ runId: SECOND }),
    );
    expect((await make().state()).latestRunId).toBe(SECOND);
  });
});

describe('logs and report', () => {
  it('serves the kept log of a step of a finished run', async () => {
    await saveRun(FIRST, storedRun(FIRST));
    await mkdir(join(root, '.cache', 'test-runs', FIRST, 'logs'), { recursive: true });
    await writeFile(join(root, '.cache', 'test-runs', FIRST, 'logs', 'unit.log'), 'unit output');
    const controller = make();
    expect(await controller.log(FIRST, 'unit')).toBe('unit output');
    expect(await controller.log(FIRST, 'lint')).toBeUndefined();
  });

  it('serves the live log of the run that is going now', async () => {
    await mkdir(join(root, 'reports', 'test-run', 'logs'), { recursive: true });
    await writeFile(
      join(root, 'reports', 'test-run', 'live.json'),
      JSON.stringify({ runId: SECOND }),
    );
    await writeFile(join(root, 'reports', 'test-run', 'logs', 'unit.log'), 'so far');
    const controller = make();
    expect(await controller.log(SECOND, 'unit')).toBe('so far');
    // Another run's id never reads the latest folder.
    expect(await controller.log(FIRST, 'unit')).toBeUndefined();
  });

  it('refuses ids that are not run ids or steps', async () => {
    await writeFile(join(root, 'secret.log'), 'private');
    const controller = make();
    for (const [run, step] of [
      ['../..', 'unit'],
      [FIRST, '../../../secret'],
      [FIRST, '..\\secret'],
      ['nope', 'unit'],
      [FIRST, 'nope'],
    ] as const) {
      expect(await controller.log(run, step)).toBeUndefined();
    }
  });

  it('keeps only the end of a very large live log', async () => {
    await mkdir(join(root, 'reports', 'test-run', 'logs'), { recursive: true });
    await writeFile(
      join(root, 'reports', 'test-run', 'live.json'),
      JSON.stringify({ runId: FIRST }),
    );
    await writeFile(
      join(root, 'reports', 'test-run', 'logs', 'unit.log'),
      `${'a'.repeat(1_200_000)}END`,
    );
    const text = await make().log(FIRST, 'unit');
    expect(text?.startsWith('[earlier output left out]')).toBe(true);
    expect(text?.endsWith('END')).toBe(true);
    expect(text?.length).toBeLessThan(1_100_000);
  });

  it('serves the report of each run and says which runs have one', async () => {
    await saveRun(FIRST, storedRun(FIRST));
    await saveRun(SECOND, storedRun(SECOND));
    await writeFile(join(root, '.cache', 'test-runs', FIRST, 'report.html'), '<html>first</html>');
    const controller = make();
    expect(await controller.report(FIRST)).toBe('<html>first</html>');
    expect(await controller.report(SECOND)).toBeUndefined();
    expect(await controller.report('../../package')).toBeUndefined();
    const flags = Object.fromEntries(
      (await controller.state()).runs.map((run) => [run.runId, run.hasReport]),
    );
    expect(flags).toEqual({ [FIRST]: true, [SECOND]: false });
    expect(controller.run(FIRST)?.item.hasReport).toBe(true);
    expect(controller.run(SECOND)?.item.hasReport).toBe(false);
  });

  it('serves the report only once there is one', async () => {
    const controller = make();
    expect(await controller.report()).toBeUndefined();
    await mkdir(join(root, 'reports', 'test-run'), { recursive: true });
    await writeFile(join(root, 'reports', 'test-run', 'index.html'), '<html>report</html>');
    expect(await controller.report()).toBe('<html>report</html>');
  });
});
