import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { spawn } from 'node:child_process';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createTestRunController } from './test-runs.js';

const FIRST = 'run-20261103-100000-111';
const SECOND = 'run-20261103-110000-222';
const THIRD = 'run-20261103-120000-333';

let root: string;
let killedPids: number[];
let now: number;

// A run is never started in these tests, so a spawn that throws would show a mistake at once.
const noSpawn = (() => {
  throw new Error('no process should start');
}) as unknown as typeof spawn;

const stored = (runId: string, overrides: Record<string, unknown> = {}) => ({
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

const going = (runId: string, pid: number) =>
  stored(runId, {
    state: 'running',
    overall: 'running',
    finishedAt: undefined,
    meta: { pid, cwd: 'x', args: '--only=unit', label: 'claude-code' },
  });

async function save(runId: string, run: unknown): Promise<void> {
  await mkdir(join(root, '.cache', 'test-runs', runId), { recursive: true });
  await writeFile(join(root, '.cache', 'test-runs', runId, 'live.json'), JSON.stringify(run));
}

const make = (alive: (pid: number) => boolean = () => true) =>
  createTestRunController({
    root,
    lockFile: join(root, '.cache', 'test-run.lock'),
    spawnImpl: noSpawn,
    alive,
    killPid: (pid) => killedPids.push(pid),
    now: () => now,
  });

const lockFor = (pid: number) =>
  writeFile(
    join(root, '.cache', 'test-run.lock'),
    JSON.stringify({ pid, startedAt: '2026-11-03T10:00:00Z' }),
  );

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'test-runs-actions-'));
  await mkdir(join(root, '.cache'), { recursive: true });
  killedPids = [];
  now = Date.parse('2026-11-03T10:10:00.000Z');
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe('cancelling a run', () => {
  it('asks a run from any terminal to stop, and the list then says so', async () => {
    await save(FIRST, going(FIRST, 111));
    const controller = make();
    expect(controller.cancel(FIRST)).toMatchObject({ ok: true });
    const [item] = (await controller.state()).runs;
    expect(item?.state).toBe('running');
    expect(item?.cancelRequestedAt).toBeDefined();
  });

  it('refuses a run that is not going, one that is unknown and an unsafe id', async () => {
    await save(FIRST, stored(FIRST));
    await save(SECOND, going(SECOND, 222));
    const controller = make((pid) => pid !== 222);
    expect(controller.cancel(FIRST)).toMatchObject({ ok: false, status: 409 });
    expect(controller.cancel(SECOND)).toMatchObject({ ok: false, status: 409 });
    expect(controller.cancel(THIRD)).toMatchObject({ ok: false, status: 404 });
    expect(controller.cancel('../../x')).toMatchObject({ ok: false, status: 404 });
  });

  it('shows a run that was cancelled as cancelled, not as failed', async () => {
    await save(FIRST, stored(FIRST, { overall: 'failed', cancelled: true }));
    expect((await make().state()).runs[0]?.state).toBe('cancelled');
  });
});

describe('stopping a run by force', () => {
  it('needs a request, the wait, and the run itself holding the lock', async () => {
    await save(FIRST, going(FIRST, 111));
    const controller = make();
    // Nobody asked it to cancel yet.
    expect(controller.forceStop(FIRST)).toMatchObject({ ok: false, status: 409 });
    controller.cancel(FIRST);
    // Asked, but it has had no time to react.
    await lockFor(111);
    now += 5_000;
    expect(controller.forceStop(FIRST)).toMatchObject({ ok: false, status: 409 });
    expect(killedPids).toEqual([]);
    // Another process holds the lock, so the run's id is not the one to end.
    await lockFor(999);
    now += 30_000;
    expect(controller.forceStop(FIRST)).toMatchObject({ ok: false, status: 409 });
    expect(killedPids).toEqual([]);
    // The run's own process holds the lock and ignored the request.
    await lockFor(111);
    expect(controller.forceStop(FIRST)).toMatchObject({ ok: true });
    expect(killedPids).toEqual([111]);
  });

  it('never touches a run that has ended, one whose process is gone, or an unknown one', async () => {
    await save(FIRST, stored(FIRST));
    await save(SECOND, going(SECOND, 222));
    const controller = make((pid) => pid !== 222);
    expect(controller.forceStop(FIRST)).toMatchObject({ ok: false, status: 409 });
    expect(controller.forceStop(SECOND)).toMatchObject({ ok: false, status: 409 });
    expect(controller.forceStop(THIRD)).toMatchObject({ ok: false, status: 404 });
    expect(controller.forceStop('../x')).toMatchObject({ ok: false, status: 404 });
    expect(killedPids).toEqual([]);
  });
});

describe('the single tests of a step', () => {
  it('pages and filters them, and has nothing for a step or a run without them', async () => {
    await save(FIRST, stored(FIRST));
    await mkdir(join(root, '.cache', 'test-runs', FIRST, 'tests'), { recursive: true });
    await writeFile(
      join(root, '.cache', 'test-runs', FIRST, 'tests', 'unit.json'),
      JSON.stringify([
        { file: 'a.test.ts', name: 'works', status: 'passed', durationMs: 1 },
        { file: 'a.test.ts', name: 'breaks', status: 'failed', durationMs: 2, message: 'boom' },
      ]),
    );
    const controller = make();
    expect(controller.tests(FIRST, 'unit', {})).toMatchObject({ total: 2, matched: 2 });
    expect(controller.tests(FIRST, 'unit', { status: 'failed' })?.items[0]?.name).toBe('breaks');
    expect(controller.tests(FIRST, 'lint', {})).toBeUndefined();
    expect(controller.tests(FIRST, 'nope', {})).toBeUndefined();
    expect(controller.tests(SECOND, 'unit', {})).toBeUndefined();
    expect(controller.tests('../../x', 'unit', {})).toBeUndefined();
  });

  it('has nothing when the file is damaged', async () => {
    await save(FIRST, stored(FIRST));
    await mkdir(join(root, '.cache', 'test-runs', FIRST, 'tests'), { recursive: true });
    await writeFile(join(root, '.cache', 'test-runs', FIRST, 'tests', 'unit.json'), '{broken');
    expect(make().tests(FIRST, 'unit', {})).toBeUndefined();
  });
});

describe('deleting runs', () => {
  it('deletes a finished run with everything kept with it, and leaves the others', async () => {
    await save(FIRST, stored(FIRST));
    await save(SECOND, stored(SECOND));
    await mkdir(join(root, '.cache', 'test-runs', FIRST, 'logs'), { recursive: true });
    await writeFile(join(root, '.cache', 'test-runs', FIRST, 'logs', 'unit.log'), 'x');
    const controller = make();
    expect(controller.remove(FIRST)).toEqual({ ok: true, deleted: [FIRST] });
    expect(controller.run(FIRST)).toBeUndefined();
    expect(await controller.log(FIRST, 'unit')).toBeUndefined();
    expect(controller.run(SECOND)).toBeDefined();
    expect((await controller.state()).runs.map((run) => run.runId)).toEqual([SECOND]);
  });

  it('refuses a run that is going, and says to cancel it first', async () => {
    await save(FIRST, going(FIRST, 111));
    const controller = make();
    const result = controller.remove(FIRST);
    expect(result).toMatchObject({ ok: false, status: 409 });
    expect(JSON.stringify(result)).toContain('Cancel');
    expect(controller.run(FIRST)).toBeDefined();
  });

  it('can delete a run whose process ended, and a refused start', async () => {
    await save(FIRST, going(FIRST, 111));
    await save(SECOND, stored(SECOND, { rejected: { holderPid: 1, holderStartedAt: 'x' } }));
    const controller = make((pid) => pid !== 111);
    expect(controller.remove(FIRST)).toMatchObject({ ok: true });
    expect(controller.remove(SECOND)).toMatchObject({ ok: true });
  });

  it('answers 404 for a run that is not there and for an id that is not safe', () => {
    const controller = make();
    expect(controller.remove(FIRST)).toMatchObject({ ok: false, status: 404 });
    expect(controller.remove('../../..')).toMatchObject({ ok: false, status: 404 });
    expect(controller.remove('')).toMatchObject({ ok: false, status: 404 });
  });

  it('deletes every run that is not going and keeps the one that is', async () => {
    await save(FIRST, stored(FIRST));
    await save(SECOND, going(SECOND, 222));
    await save(THIRD, stored(THIRD, { overall: 'failed' }));
    const controller = make();
    const result = controller.removeFinished();
    expect(result.ok && [...result.deleted].sort()).toEqual([FIRST, THIRD]);
    expect((await controller.state()).runs.map((run) => run.runId)).toEqual([SECOND]);
  });

  it('deletes nothing when there is nothing to delete', () => {
    expect(make().removeFinished()).toEqual({ ok: true, deleted: [] });
  });
});
