/**
 * In-process `LimiterPort` test double for unit tests of other packages. Not exported from the
 * package and never selectable by configuration: deployed code uses the redis adapter only.
 */
import type { CacheKey, LimiterPort, LimitResult } from '@boldcreate-integrations/ports';

interface Bucket {
  count: number;
  windowStart: number;
}

export class MemoryLimiter implements LimiterPort {
  private readonly buckets = new Map<string, Bucket>();

  async check(key: CacheKey, opts: { limit: number; windowSeconds: number }): Promise<LimitResult> {
    const now = Date.now();
    const windowMs = opts.windowSeconds * 1000;
    let bucket = this.buckets.get(key);
    if (!bucket || now - bucket.windowStart >= windowMs) {
      bucket = { count: 0, windowStart: now };
      this.buckets.set(key, bucket);
    }
    const resetAt = new Date(bucket.windowStart + windowMs);
    if (bucket.count >= opts.limit) return { allowed: false, remaining: 0, resetAt };
    bucket.count += 1;
    return { allowed: true, remaining: opts.limit - bucket.count, resetAt };
  }

  async reset(key: CacheKey): Promise<void> {
    this.buckets.delete(key);
  }
}
