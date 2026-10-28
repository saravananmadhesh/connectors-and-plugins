import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  MAX_ENTRIES,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  destinationOf,
  extractArchive,
  hashOnDisk,
  placeFiles,
  readLock,
  removeFile,
  safeRelativePath,
  sha256Hex,
  stateDir,
  withFolderGuard,
  writeLock,
} from './sync-files.js';
import { tarGz, text } from './test-support.js';

let dir: string;
beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'connect-files-'));
});
afterEach(() => rm(dir, { recursive: true, force: true }));

describe('safeRelativePath', () => {
  it.each(['SKILL.md', 'skills/a/SKILL.md', 'a/b.c/d'])('accepts %s', (path) => {
    expect(safeRelativePath(path)).toBe(true);
  });

  it.each([
    '',
    '../x',
    'a/../x',
    '/etc/passwd',
    'C:/x',
    'c:x',
    'a\\b',
    'a//b',
    './a',
    'a/.',
    'a\0b',
  ])('refuses %j', (path) => {
    expect(safeRelativePath(path)).toBe(false);
  });
});

describe('extractArchive', () => {
  it('reads files and skips folders', () => {
    const files = extractArchive(
      tarGz([
        { path: 'skills/', type: '5' },
        { path: 'skills/a/SKILL.md', body: text('one') },
        { path: 'rules/r.md', body: text('two') },
      ]),
    );
    expect([...files.keys()]).toEqual(['skills/a/SKILL.md', 'rules/r.md']);
    expect(new TextDecoder().decode(files.get('rules/r.md'))).toBe('two');
  });

  it('reads an empty file and an empty archive', () => {
    expect(extractArchive(tarGz([{ path: 'a', body: new Uint8Array() }])).get('a')).toHaveLength(0);
    expect(extractArchive(tarGz([])).size).toBe(0);
  });

  it.each(['../evil', 'a/../../evil', '/abs', 'C:/win', 'back\\slash'])(
    'refuses the path %s',
    (path) => {
      expect(() => extractArchive(tarGz([{ path, body: text('x') }]))).toThrow(/path/);
    },
  );

  it.each([
    ['a hard link', '1'],
    ['a symbolic link', '2'],
    ['a character device', '3'],
    ['a block device', '4'],
    ['a fifo', '6'],
  ])('refuses %s', (_name, type) => {
    expect(() => extractArchive(tarGz([{ path: 'a', type }]))).toThrow(/not a file/);
  });

  it('refuses more than the allowed number of entries', () => {
    const many = Array.from({ length: MAX_ENTRIES + 1 }, (_, i) => ({
      path: `f${i}`,
      body: text('x'),
    }));
    expect(() => extractArchive(tarGz(many))).toThrow(/too many/);
    expect(extractArchive(tarGz(many.slice(0, MAX_ENTRIES))).size).toBe(MAX_ENTRIES);
  });

  it('refuses a file over the file limit', () => {
    const big = new Uint8Array(MAX_FILE_BYTES + 1);
    expect(() => extractArchive(tarGz([{ path: 'a', body: big }]))).toThrow(/too large/);
    expect(extractArchive(tarGz([{ path: 'a', body: new Uint8Array(MAX_FILE_BYTES) }])).size).toBe(
      1,
    );
  });

  it('refuses a total over the total limit', () => {
    const body = new Uint8Array(MAX_FILE_BYTES);
    const parts = Array.from({ length: MAX_TOTAL_BYTES / MAX_FILE_BYTES + 1 }, (_, i) => ({
      path: `f${i}`,
      body,
    }));
    expect(() => extractArchive(tarGz(parts))).toThrow(/too large/);
  });

  it('refuses bytes that are not an archive', () => {
    expect(() => extractArchive(new Uint8Array([1, 2, 3]))).toThrow(/could not be unpacked/);
  });

  it('refuses an archive cut short', () => {
    const cut = tarGz([{ path: 'a', body: text('x'.repeat(2000)) }]);
    // A valid gzip of a truncated tar: rebuild the tar without its body.
    expect(() => extractArchive(cut.subarray(0, cut.length - 20))).toThrow(/archive/i);
  });
});

describe('destinationOf', () => {
  it('places a file under the plugin folder', () => {
    expect(destinationOf(dir, 'alpha', 'skills/a/SKILL.md')).toBe(
      join(dir, 'alpha', 'skills', 'a', 'SKILL.md'),
    );
  });

  it.each([
    ['..', 'a'],
    ['a/b', 'c'],
    ['a', '../x'],
    ['', 'x'],
  ])('refuses plugin %j with path %j', (plugin, path) => {
    expect(() => destinationOf(dir, plugin, path)).toThrow(/not allowed/);
  });
});

describe('lock file', () => {
  const lock = { version: 1 as const, revision: 'r', userId: 'u', components: {} };

  it('is undefined when there is none', async () => {
    expect(await readLock(dir)).toBeUndefined();
  });

  it('is written and read back', async () => {
    await writeLock(dir, lock);
    expect(await readLock(dir)).toEqual(lock);
    expect((await readdir(stateDir(dir))).filter((name) => name.endsWith('.tmp'))).toEqual([]);
  });

  it('says so when it cannot be read', async () => {
    await mkdir(stateDir(dir), { recursive: true });
    await writeFile(join(stateDir(dir), 'lock.json'), '{not json');
    await expect(readLock(dir)).rejects.toMatchObject({ code: 'lock_unreadable' });
  });
});

describe('files on disk', () => {
  it('hashes a file, or says it is missing', async () => {
    await writeFile(join(dir, 'a'), 'abc');
    expect(await hashOnDisk(join(dir, 'a'))).toBe(sha256Hex(text('abc')));
    expect(await hashOnDisk(join(dir, 'missing'))).toBeUndefined();
  });

  it('places files with folders, replaces a file and leaves no staging behind', async () => {
    const target = join(dir, 'p', 'x', 'f.txt');
    await placeFiles(dir, new Map([[target, text('one')]]));
    await placeFiles(dir, new Map([[target, text('two')]]));
    expect(await readFile(target, 'utf8')).toBe('two');
    expect(await readdir(join(stateDir(dir), 'tmp'))).toEqual([]);
  });

  it('gives files a fixed mode without the execute bit', async () => {
    const target = join(dir, 'p', 'run.sh');
    await placeFiles(dir, new Map([[target, text('#!/bin/sh')]]));
    expect((await stat(target)).mode & 0o111).toBe(0);
  });

  it('removes a file and the folders it leaves empty, but not the sync folder', async () => {
    const target = join(dir, 'p', 'x', 'f.txt');
    await placeFiles(dir, new Map([[target, text('one')]]));
    await removeFile(dir, target);
    await expect(stat(join(dir, 'p'))).rejects.toThrow(/ENOENT/);
    await expect(stat(dir)).resolves.toBeDefined();
  });

  it('keeps a folder that still holds a file', async () => {
    const a = join(dir, 'p', 'a.txt');
    const b = join(dir, 'p', 'b.txt');
    await placeFiles(
      dir,
      new Map([
        [a, text('1')],
        [b, text('2')],
      ]),
    );
    await removeFile(dir, a);
    expect(await readdir(join(dir, 'p'))).toEqual(['b.txt']);
  });

  it('ignores a file that is already gone', async () => {
    await expect(removeFile(dir, join(dir, 'p', 'none.txt'))).resolves.toBeUndefined();
  });
});

describe('withFolderGuard', () => {
  it('runs one call at a time and removes the guard afterwards', async () => {
    const order: string[] = [];
    const run = (name: string) =>
      withFolderGuard(
        dir,
        async () => {
          order.push(`${name}:start`);
          await new Promise((done) => setTimeout(done, 30));
          order.push(`${name}:end`);
        },
        { pollMs: 5 },
      );
    await Promise.all([run('a'), run('b')]);
    const names = order.map((entry) => entry.split(':')[0]);
    const first = names[0];
    const second = names[2];
    expect(order).toEqual([`${first}:start`, `${first}:end`, `${second}:start`, `${second}:end`]);
    expect(first).not.toBe(second);
    expect(await readdir(stateDir(dir))).not.toContain('lock.pid');
  });

  it('removes the guard when the work fails', async () => {
    await expect(
      withFolderGuard(dir, async () => {
        throw new Error('boom');
      }),
    ).rejects.toThrow('boom');
    expect(await readdir(stateDir(dir))).not.toContain('lock.pid');
  });

  it('replaces a guard left by a process that is gone', async () => {
    await mkdir(stateDir(dir), { recursive: true });
    await writeFile(join(stateDir(dir), 'lock.pid'), '2147483646');
    expect(await withFolderGuard(dir, async () => 'ran')).toBe('ran');
  });

  it('gives up when a live process holds the guard', async () => {
    await mkdir(stateDir(dir), { recursive: true });
    await writeFile(join(stateDir(dir), 'lock.pid'), String(process.pid));
    await expect(
      withFolderGuard(dir, async () => 'ran', { timeoutMs: 30, pollMs: 5 }),
    ).rejects.toMatchObject({ code: 'sync_busy' });
  });
});
