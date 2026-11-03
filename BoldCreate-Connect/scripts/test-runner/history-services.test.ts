import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { archiveLogs, historyDir, readRunLog, readServiceLog } from './history.js';

const ID = 'run-20261103-100000-1';
let root: string;
let logs: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'history-services-'));
  logs = join(root, 'reports', 'test-run', 'logs');
  await mkdir(join(logs, 'services'), { recursive: true });
  await writeFile(join(logs, 'unit.log'), 'unit output');
  await writeFile(join(logs, 'services', 'postgres.log'), 'LOG: checkpointer exited');
  await writeFile(join(logs, 'services', 'api.log'), 'api output');
  await writeFile(join(logs, 'services', 'notes.txt'), 'not a log');
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe('the logs of the test stack kept with a run', () => {
  it('keeps each service log, the Postgres one included, next to the step logs', async () => {
    archiveLogs(root, ID, logs);
    expect(readServiceLog(root, ID, 'postgres')).toBe('LOG: checkpointer exited');
    expect(readServiceLog(root, ID, 'api')).toBe('api output');
    expect(readRunLog(root, ID, 'unit')).toBe('unit output');
    expect((await readdir(join(historyDir(root), ID, 'logs', 'services'))).sort()).toEqual([
      'api.log',
      'postgres.log',
    ]);
  });

  it('keeps no service logs when the run had no stack', async () => {
    await rm(join(logs, 'services'), { recursive: true });
    archiveLogs(root, ID, logs);
    expect(existsSync(join(historyDir(root), ID, 'logs', 'services'))).toBe(false);
    expect(readServiceLog(root, ID, 'postgres')).toBeUndefined();
  });

  it('cuts a very large service log to its end', async () => {
    await writeFile(join(logs, 'services', 'postgres.log'), `${'a'.repeat(2_500_000)}END`);
    archiveLogs(root, ID, logs);
    const text = readServiceLog(root, ID, 'postgres') ?? '';
    expect(text.startsWith('[earlier output left out]')).toBe(true);
    expect(text.endsWith('END')).toBe(true);
  });

  it('reads nothing for a service or a run id that could leave the folder', () => {
    archiveLogs(root, ID, logs);
    for (const service of ['../unit', '..', 'POSTGRES', '', 'a/b']) {
      expect(readServiceLog(root, ID, service)).toBeUndefined();
    }
    expect(readServiceLog(root, '../x', 'postgres')).toBeUndefined();
  });
});
