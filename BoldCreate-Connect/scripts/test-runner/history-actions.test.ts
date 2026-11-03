import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  archiveLogs,
  archiveReport,
  archiveTests,
  cancelFile,
  deleteFinishedRuns,
  deleteRun,
  historyDir,
  listRuns,
  readRun,
  readTests,
  requestCancel,
  writeRun,
  type RunMeta,
  type StoredRun,
} from './history.js';
import { buildLiveState } from './live.js';
import type { TestEntry } from './test-entries.js';

let root: string;
beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'history-actions-'));
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

const meta: RunMeta = { pid: 100, cwd: '/repo', args: '--only=unit', label: 'terminal' };
const ID = 'run-20261103-100000-100';
const OTHER = 'run-20261103-110000-200';

function run(
  runId: string,
  options: { finished?: boolean; cancelled?: boolean; pid?: number } = {},
): StoredRun {
  const live = buildLiveState({
    runId,
    startedAt: new Date('2026-11-03T10:00:00Z'),
    now: new Date('2026-11-03T10:00:20Z'),
    all: [{ id: 'unit', name: 'Unit tests' }],
    selected: ['unit'],
    results: new Map(),
    running: new Map(),
    finished: options.finished ?? false,
    ...(options.cancelled ? { cancelled: true } : {}),
  });
  return { ...live, meta: { ...meta, pid: options.pid ?? meta.pid } };
}

const entries: TestEntry[] = [
  { file: 'a.test.ts', name: 'works', status: 'passed', durationMs: 1 },
  { file: 'a.test.ts', name: 'breaks', status: 'failed', durationMs: 2, message: 'boom' },
];

describe('the cancelled state', () => {
  it('shows a finished run that was cancelled as cancelled', () => {
    writeRun(root, run(ID, { finished: true, cancelled: true }));
    expect(listRuns(root, () => true)[0]?.state).toBe('cancelled');
  });

  it('does not call a run that is still going cancelled', () => {
    writeRun(root, run(ID, { cancelled: true }));
    expect(listRuns(root, () => true)[0]?.state).toBe('running');
  });

  it('keeps the flag out of a run that was not cancelled', () => {
    writeRun(root, run(ID, { finished: true }));
    expect(readRun(root, ID)).not.toHaveProperty('cancelled');
  });
});

describe('requestCancel', () => {
  it('writes the time of the request next to a running run', () => {
    writeRun(root, run(ID));
    const at = new Date('2026-11-03T10:05:00Z');
    expect(requestCancel(root, ID, () => true, at)).toBe(true);
    expect(readFileSync(cancelFile(root, ID), 'utf8')).toBe('2026-11-03T10:05:00.000Z');
  });

  it('writes nothing for a run that ended, one whose process is gone, or a refused start', () => {
    writeRun(root, run(ID, { finished: true }));
    writeRun(root, run(OTHER));
    expect(requestCancel(root, ID, () => true)).toBe(false);
    expect(requestCancel(root, OTHER, () => false)).toBe(false);
    expect(existsSync(cancelFile(root, ID))).toBe(false);
    expect(existsSync(cancelFile(root, OTHER))).toBe(false);
  });

  it('writes nothing for an unknown or unsafe id', () => {
    expect(requestCancel(root, ID, () => true)).toBe(false);
    expect(requestCancel(root, '../../x', () => true)).toBe(false);
  });
});

describe('archiveTests and readTests', () => {
  it('keeps the single tests of a step with its run and reads them back', () => {
    archiveTests(root, ID, 'unit', entries);
    expect(readTests(root, ID, 'unit')).toEqual(entries);
  });

  it('keeps each step apart', () => {
    archiveTests(root, ID, 'unit', entries);
    archiveTests(root, ID, 'client', entries.slice(0, 1));
    expect(readTests(root, ID, 'client')).toHaveLength(1);
    expect(readTests(root, ID, 'unit')).toHaveLength(2);
  });

  it('refuses an unsafe run or step id when writing, and reads nothing for one', () => {
    expect(() => archiveTests(root, '../x', 'unit', entries)).toThrow('invalid id');
    expect(() => archiveTests(root, ID, '../unit', entries)).toThrow('invalid id');
    expect(readTests(root, '../x', 'unit')).toBeUndefined();
    expect(readTests(root, ID, '../unit')).toBeUndefined();
  });

  it('reads nothing for a missing, damaged or wrong file', () => {
    expect(readTests(root, ID, 'unit')).toBeUndefined();
    archiveTests(root, ID, 'unit', []);
    expect(readTests(root, ID, 'unit')).toEqual([]);
  });
});

describe('deleteRun', () => {
  it('removes the state, the logs, the test results and the report of one run', async () => {
    writeRun(root, run(ID, { finished: true }));
    archiveTests(root, ID, 'unit', entries);
    archiveReport(root, ID, '<html></html>');
    const logs = join(root, 'reports', 'test-run', 'logs');
    const { mkdirSync, writeFileSync } = await import('node:fs');
    mkdirSync(logs, { recursive: true });
    writeFileSync(join(logs, 'unit.log'), 'x');
    archiveLogs(root, ID, logs);
    expect(deleteRun(root, ID, () => true)).toBe('deleted');
    expect(existsSync(join(historyDir(root), ID))).toBe(false);
  });

  it('leaves the other runs and the latest-run folder alone', async () => {
    writeRun(root, run(ID, { finished: true }));
    writeRun(root, run(OTHER, { finished: true }));
    const { mkdirSync, writeFileSync } = await import('node:fs');
    mkdirSync(join(root, 'reports', 'test-run'), { recursive: true });
    writeFileSync(join(root, 'reports', 'test-run', 'index.html'), 'latest');
    deleteRun(root, ID, () => true);
    expect(readRun(root, OTHER)).toBeDefined();
    expect(readFileSync(join(root, 'reports', 'test-run', 'index.html'), 'utf8')).toBe('latest');
  });

  it('refuses a run that is going and keeps everything', () => {
    writeRun(root, run(ID));
    expect(deleteRun(root, ID, () => true)).toBe('running');
    expect(readRun(root, ID)).toBeDefined();
  });

  it('deletes a run whose process ended', () => {
    writeRun(root, run(ID));
    expect(deleteRun(root, ID, () => false)).toBe('deleted');
  });

  it('says missing for an unknown run and never builds a path from an unsafe id', () => {
    expect(deleteRun(root, ID)).toBe('missing');
    for (const id of ['../..', '..', '', 'run-1', `${ID}/../${OTHER}`, 'C:\\Windows']) {
      expect(deleteRun(root, id)).toBe('missing');
    }
  });

  it('does not delete a folder that has no valid state, if it is not a run folder at all', async () => {
    const { mkdirSync } = await import('node:fs');
    mkdirSync(join(historyDir(root), 'notes'), { recursive: true });
    expect(deleteRun(root, 'notes')).toBe('missing');
    expect(existsSync(join(historyDir(root), 'notes'))).toBe(true);
  });
});

describe('deleteFinishedRuns', () => {
  it('removes every run that is not going and keeps the one that is', () => {
    writeRun(root, run(ID, { finished: true }));
    writeRun(root, run(OTHER, { pid: 200 }));
    writeRun(root, run('run-20261103-120000-300', { finished: true, cancelled: true }));
    const removed = deleteFinishedRuns(root, (pid) => pid === 200);
    expect(removed.sort()).toEqual([ID, 'run-20261103-120000-300']);
    expect(listRuns(root, () => true).map((item) => item.runId)).toEqual([OTHER]);
  });

  it('does nothing without a history folder, and ignores folders that are not runs', async () => {
    expect(deleteFinishedRuns(root)).toEqual([]);
    const { mkdirSync } = await import('node:fs');
    mkdirSync(join(historyDir(root), 'keep'), { recursive: true });
    expect(deleteFinishedRuns(root)).toEqual([]);
    expect(existsSync(join(historyDir(root), 'keep'))).toBe(true);
  });
});
