import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { acquireLock, isProcessAlive, readLock, releaseLock } from './run-lock.js';

describe('run lock', () => {
  let dir: string;
  let path: string;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'run-lock-test-'));
    path = join(dir, 'nested', 'test-run.lock');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('acquires a free lock and records the process', () => {
    const now = () => new Date('2026-10-11T10:00:00Z');
    expect(acquireLock(path, 111, () => false, now)).toEqual({
      acquired: true,
      replacedStale: false,
    });
    expect(readLock(path)).toEqual({ pid: 111, startedAt: '2026-10-11T10:00:00.000Z' });
  });

  it('refuses while the holder is alive and reports it', () => {
    acquireLock(path, 111, () => true);
    const second = acquireLock(path, 222, () => true);
    expect(second).toMatchObject({ acquired: false, holder: { pid: 111 } });
    expect(readLock(path)?.pid).toBe(111);
  });

  it('replaces a stale lock', () => {
    acquireLock(path, 111, () => true);
    expect(acquireLock(path, 222, () => false)).toEqual({ acquired: true, replacedStale: true });
    expect(readLock(path)?.pid).toBe(222);
  });

  it('treats an unreadable lock as stale', () => {
    acquireLock(path, 111, () => false);
    writeFileSync(path, 'not json');
    expect(readLock(path)).toBeUndefined();
    expect(acquireLock(path, 222, () => true).acquired).toBe(true);
    expect(JSON.parse(readFileSync(path, 'utf8')).pid).toBe(222);
  });

  it('releases only its own lock', () => {
    acquireLock(path, 111, () => false);
    releaseLock(path, 222);
    expect(existsSync(path)).toBe(true);
    releaseLock(path, 111);
    expect(existsSync(path)).toBe(false);
  });

  it('detects live and dead processes', () => {
    expect(isProcessAlive(process.pid)).toBe(true);
    expect(isProcessAlive(2 ** 22 + 12345)).toBe(false);
  });
});
