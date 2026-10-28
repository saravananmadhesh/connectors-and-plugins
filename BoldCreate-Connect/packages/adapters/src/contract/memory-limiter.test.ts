import { describe, it, expect, vi, afterEach } from 'vitest';
import { tenantKey } from '@boldcreate-integrations/ports';
import { MemoryLimiter } from './memory-limiter.js';

const key = (name: string) => tenantKey('org_t', name);
const rule = (limit: number, windowSeconds = 60) => ({ limit, windowSeconds });

describe('MemoryLimiter', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests within the limit and counts down', async () => {
    const limiter = new MemoryLimiter();
    expect((await limiter.check(key('a'), rule(3))).remaining).toBe(2);
    await limiter.check(key('a'), rule(3));
    const last = await limiter.check(key('a'), rule(3));
    expect(last).toMatchObject({ allowed: true, remaining: 0 });
  });

  it('blocks when the limit is exceeded', async () => {
    const limiter = new MemoryLimiter();
    await limiter.check(key('b'), rule(1));
    expect(await limiter.check(key('b'), rule(1))).toMatchObject({ allowed: false, remaining: 0 });
  });

  it('resets a bucket, and reset of an unknown key is a no-op', async () => {
    const limiter = new MemoryLimiter();
    await limiter.check(key('c'), rule(1));
    await limiter.reset(key('c'));
    expect((await limiter.check(key('c'), rule(1))).allowed).toBe(true);
    await expect(limiter.reset(key('none'))).resolves.toBeUndefined();
  });

  it('starts a new window after it elapses', async () => {
    vi.useFakeTimers();
    const limiter = new MemoryLimiter();
    await limiter.check(key('d'), rule(1, 10));
    expect((await limiter.check(key('d'), rule(1, 10))).allowed).toBe(false);
    vi.advanceTimersByTime(11_000);
    expect((await limiter.check(key('d'), rule(1, 10))).allowed).toBe(true);
  });

  it('reports a reset time in the future and isolates keys', async () => {
    const limiter = new MemoryLimiter();
    const before = Date.now();
    const result = await limiter.check(key('e'), rule(1));
    expect(result.resetAt.getTime()).toBeGreaterThan(before);
    await limiter.check(key('e'), rule(1));
    expect((await limiter.check(key('f'), rule(1))).allowed).toBe(true);
  });
});
