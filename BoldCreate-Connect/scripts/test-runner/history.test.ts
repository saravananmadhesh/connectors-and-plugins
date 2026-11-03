import { mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  archiveLogs,
  archiveReport,
  hasRunReport,
  historyDir,
  listRuns,
  pruneRuns,
  readRun,
  readRunLog,
  readRunReport,
  recordRejected,
  RUN_ID,
  runIdFor,
  runLabel,
  writeRun,
  type RunMeta,
  type StoredRun,
} from './history.js';
import { buildLiveState } from './live.js';

let root: string;
beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'history-'));
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

const meta: RunMeta = { pid: 100, cwd: '/repo', args: '--only=unit', label: 'terminal' };

function run(runId: string, overrides: Partial<StoredRun> = {}): StoredRun {
  const live = buildLiveState({
    runId,
    startedAt: new Date('2026-11-03T10:00:00Z'),
    now: new Date('2026-11-03T10:00:20Z'),
    all: [{ id: 'unit', name: 'Unit tests' }],
    selected: ['unit'],
    results: new Map(),
    running: new Map(),
    finished: false,
  });
  return { ...live, meta, ...overrides };
}

describe('runIdFor', () => {
  it('is sortable, safe in a path, and matches the id pattern', () => {
    const id = runIdFor(new Date('2026-11-03T09:05:07Z'), 4242);
    expect(id).toBe('run-20261103-090507-4242');
    expect(RUN_ID.test(id)).toBe(true);
    expect(runIdFor(new Date('2026-11-03T09:05:08Z'), 1) > id).toBe(true);
  });

  it.each(['run-1', '../x', 'run-20261103-090507-', 'run-20261103-090507-4242/../x', ''])(
    'rejects %j as a run id',
    (value) => {
      expect(RUN_ID.test(value)).toBe(false);
    },
  );
});

describe('runLabel', () => {
  it('uses the label a caller gave, cleaned and cut short', () => {
    expect(runLabel({ TEST_RUN_LABEL: ' my agent! ' })).toBe('my agent');
    expect(runLabel({ TEST_RUN_LABEL: 'x'.repeat(100) })).toHaveLength(40);
  });

  it('recognises an AI session, CI and a plain terminal', () => {
    expect(runLabel({ CLAUDECODE: '1' })).toBe('claude-code');
    expect(runLabel({ CI: 'true' })).toBe('ci');
    expect(runLabel({ TF_BUILD: 'True' })).toBe('ci');
    expect(runLabel({})).toBe('terminal');
  });

  it('prefers an explicit label over the environment', () => {
    expect(runLabel({ TEST_RUN_LABEL: 'dashboard', CLAUDECODE: '1', CI: '1' })).toBe('dashboard');
  });

  it('ignores a label that is empty after cleaning', () => {
    expect(runLabel({ TEST_RUN_LABEL: '!!!' })).toBe('terminal');
  });
});

describe('writeRun and readRun', () => {
  it('round-trips a run and leaves no temporary file', async () => {
    writeRun(root, run('run-20261103-100000-100'));
    expect(readRun(root, 'run-20261103-100000-100')?.meta.label).toBe('terminal');
    const files = await readdir(join(historyDir(root), 'run-20261103-100000-100'));
    expect(files).toEqual(['live.json']);
  });

  it('refuses to write under an unsafe id', () => {
    expect(() => writeRun(root, run('../escape'))).toThrow('invalid run id');
    expect(existsSync(join(root, '.cache', 'escape'))).toBe(false);
  });

  it('reads nothing for an unsafe or unknown id', () => {
    expect(readRun(root, '../../package')).toBeUndefined();
    expect(readRun(root, 'run-20261103-100000-1')).toBeUndefined();
  });

  it('treats a file with no meta or steps as not a run', async () => {
    await mkdir(join(historyDir(root), 'run-20261103-100000-100'), { recursive: true });
    await writeFile(
      join(historyDir(root), 'run-20261103-100000-100', 'live.json'),
      JSON.stringify({ runId: 'run-20261103-100000-100' }),
    );
    expect(readRun(root, 'run-20261103-100000-100')).toBeUndefined();
  });
});

describe('listRuns', () => {
  it('lists newest first and honours the limit', () => {
    for (const id of ['run-20261103-100000-1', 'run-20261103-110000-2', 'run-20261103-120000-3']) {
      writeRun(root, run(id));
    }
    expect(listRuns(root, () => true).map((item) => item.runId)).toEqual([
      'run-20261103-120000-3',
      'run-20261103-110000-2',
      'run-20261103-100000-1',
    ]);
    expect(listRuns(root, () => true, 2)).toHaveLength(2);
  });

  it('is empty when there is no history folder', () => {
    expect(listRuns(root)).toEqual([]);
  });

  it('reads the duration from the start to the finish, or to the last update while it goes', () => {
    writeRun(root, run('run-20261103-100000-1'));
    expect(listRuns(root, () => true)[0]?.durationMs).toBe(20_000);
  });

  it('skips a folder that is not a run and a file that is not json', async () => {
    writeRun(root, run('run-20261103-100000-1'));
    await mkdir(join(historyDir(root), 'notes'), { recursive: true });
    await mkdir(join(historyDir(root), 'run-20261103-110000-2'), { recursive: true });
    await writeFile(join(historyDir(root), 'run-20261103-110000-2', 'live.json'), 'not json');
    expect(listRuns(root, () => true).map((item) => item.runId)).toEqual(['run-20261103-100000-1']);
  });
});

describe('recordRejected', () => {
  it('records a start that the lock refused, with who held it', () => {
    recordRejected(root, {
      runId: 'run-20261103-100500-200',
      now: new Date('2026-11-03T10:05:00Z'),
      meta: { ...meta, pid: 200, label: 'claude-code' },
      holder: { pid: 100, startedAt: '2026-11-03T10:00:00Z' },
    });
    const [item] = listRuns(root, () => true);
    expect(item).toMatchObject({ state: 'rejected', label: 'claude-code', steps: 0 });
    expect(item?.note).toContain('pid 100');
  });
});

describe('pruneRuns', () => {
  it('removes the oldest runs and keeps the newest', () => {
    const ids = Array.from({ length: 6 }, (_, n) => `run-20261103-10000${n}-${n + 1}`);
    for (const id of ids) writeRun(root, run(id));
    expect(pruneRuns(root, 4)).toEqual(ids.slice(0, 2));
    expect(listRuns(root, () => true, 99).map((item) => item.runId)).toEqual(
      ids.slice(2).reverse(),
    );
  });

  it('removes nothing when there are few, and ignores other folders', async () => {
    writeRun(root, run('run-20261103-100000-1'));
    await mkdir(join(historyDir(root), 'keep-me'), { recursive: true });
    expect(pruneRuns(root, 25)).toEqual([]);
    expect(existsSync(join(historyDir(root), 'keep-me'))).toBe(true);
  });

  it('does nothing without a history folder', () => {
    expect(pruneRuns(root)).toEqual([]);
  });
});

describe('archiveLogs and readRunLog', () => {
  async function logs(files: Record<string, string>): Promise<string> {
    const dir = join(root, 'reports', 'test-run', 'logs');
    await mkdir(dir, { recursive: true });
    for (const [name, text] of Object.entries(files)) await writeFile(join(dir, name), text);
    await mkdir(join(dir, 'services'), { recursive: true });
    return dir;
  }

  it('keeps each step log with its run, and no service folder when the stack left no log', async () => {
    const id = 'run-20261103-100000-1';
    archiveLogs(root, id, await logs({ 'unit.log': 'unit out', 'lint.log': 'lint out' }));
    expect(readRunLog(root, id, 'unit')).toBe('unit out');
    expect(readRunLog(root, id, 'lint')).toBe('lint out');
    expect(await readdir(join(historyDir(root), id, 'logs'))).toEqual(['lint.log', 'unit.log']);
  });

  it('cuts a very large log to its end', async () => {
    const id = 'run-20261103-100000-1';
    archiveLogs(root, id, await logs({ 'unit.log': `${'a'.repeat(2_500_000)}END` }));
    const text = readRunLog(root, id, 'unit') ?? '';
    expect(text.startsWith('[earlier output left out]')).toBe(true);
    expect(text.endsWith('END')).toBe(true);
  });

  it('does nothing without a log folder or with an unsafe id', async () => {
    archiveLogs(root, 'run-20261103-100000-1', join(root, 'missing'));
    archiveLogs(root, '../x', await logs({ 'unit.log': 'x' }));
    expect(existsSync(join(historyDir(root)))).toBe(false);
  });

  it('refuses a step id that could leave the folder', async () => {
    const id = 'run-20261103-100000-1';
    archiveLogs(root, id, await logs({ 'unit.log': 'x' }));
    for (const step of ['../live', '..', 'unit/../../live', 'UNIT', '']) {
      expect(readRunLog(root, id, step)).toBeUndefined();
    }
    expect(readRunLog(root, '../x', 'unit')).toBeUndefined();
    expect(readFileSync(join(root, 'reports', 'test-run', 'logs', 'unit.log'), 'utf8')).toBe('x');
  });
});

describe('the report kept with each run', () => {
  const id = 'run-20261103-100000-1';

  it('keeps the report of a finished run and reads it back', () => {
    expect(hasRunReport(root, id)).toBe(false);
    archiveReport(root, id, '<html>run one</html>');
    expect(hasRunReport(root, id)).toBe(true);
    expect(readRunReport(root, id)).toBe('<html>run one</html>');
  });

  it('keeps one report per run, so an older run keeps its own', () => {
    archiveReport(root, id, '<html>one</html>');
    archiveReport(root, 'run-20261103-110000-2', '<html>two</html>');
    expect(readRunReport(root, id)).toBe('<html>one</html>');
    expect(readRunReport(root, 'run-20261103-110000-2')).toBe('<html>two</html>');
  });

  it('refuses an unsafe id when writing and answers nothing when reading', () => {
    expect(() => archiveReport(root, '../x', 'x')).toThrow('invalid run id');
    expect(readRunReport(root, '../../package')).toBeUndefined();
    expect(hasRunReport(root, '../../package')).toBe(false);
    expect(readRunReport(root, 'run-20261103-120000-3')).toBeUndefined();
  });

  it('is removed with its run when old runs are pruned', () => {
    writeRun(root, run(id));
    archiveReport(root, id, '<html>old</html>');
    writeRun(root, run('run-20261103-110000-2'));
    pruneRuns(root, 1);
    expect(hasRunReport(root, id)).toBe(false);
  });
});
