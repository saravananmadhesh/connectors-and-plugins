/**
 * One test run at a time: the isolated stack uses fixed ports and the report folder is
 * rewritten at the start of a run, so a second run would break the first. The lock file
 * records the runner's process id; a lock whose process is gone is stale and is replaced.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export interface RunLock {
  pid: number;
  startedAt: string;
}

export function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // EPERM means the process exists but belongs to someone else
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
}

export function readLock(path: string): RunLock | undefined {
  if (!existsSync(path)) return undefined;
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as Partial<RunLock>;
    if (Number.isInteger(parsed.pid) && typeof parsed.startedAt === 'string') {
      return { pid: parsed.pid as number, startedAt: parsed.startedAt };
    }
  } catch {
    // unreadable lock: treated as stale
  }
  return undefined;
}

export type LockResult =
  | { acquired: true; replacedStale: boolean }
  | { acquired: false; holder: RunLock };

export function acquireLock(
  path: string,
  pid: number = process.pid,
  alive: (pid: number) => boolean = isProcessAlive,
  now: () => Date = () => new Date(),
): LockResult {
  const held = readLock(path);
  if (held && held.pid !== pid && alive(held.pid)) return { acquired: false, holder: held };
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify({ pid, startedAt: now().toISOString() }));
  return { acquired: true, replacedStale: held !== undefined };
}

export function releaseLock(path: string, pid: number = process.pid): void {
  if (readLock(path)?.pid === pid) rmSync(path, { force: true });
}
