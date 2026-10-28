import type { CacheKey } from './cache.js';

export interface LockHandle {
  readonly token: string;
  extend(ttlMs: number): Promise<boolean>;
  release(): Promise<boolean>;
}

export interface LockPort {
  /** Returns null when the lock is held by someone else. */
  acquire(key: CacheKey, opts: { ttlMs: number }): Promise<LockHandle | null>;
}
