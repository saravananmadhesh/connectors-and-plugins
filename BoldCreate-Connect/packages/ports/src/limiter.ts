import type { CacheKey } from './cache.js';

export interface LimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/** Fixed-window limiter; `check` is atomic. */
export interface LimiterPort {
  check(key: CacheKey, opts: { limit: number; windowSeconds: number }): Promise<LimitResult>;
  reset(key: CacheKey): Promise<void>;
}
