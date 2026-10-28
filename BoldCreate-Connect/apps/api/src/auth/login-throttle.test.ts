import { describe, expect, it } from 'vitest';
import { AppError } from '@boldcreate-integrations/contracts';
import type { CacheKey, LimiterPort } from '@boldcreate-integrations/ports';
import { createLoginThrottle } from './login-throttle.js';

const CONFIG = { ipEmailLimit: 5, ipLimit: 30, windowSeconds: 60 };

/** Counts per key like a fixed-window limiter; the window never rolls over. */
function memoryLimiter() {
  const counts = new Map<string, number>();
  const calls: Array<{ key: string; limit: number; windowSeconds: number }> = [];
  const limiter: LimiterPort = {
    async check(key: CacheKey, opts) {
      calls.push({ key, ...opts });
      const count = (counts.get(key) ?? 0) + 1;
      counts.set(key, count);
      return {
        allowed: count <= opts.limit,
        remaining: Math.max(0, opts.limit - count),
        resetAt: new Date(Date.now() + 17_500),
      };
    },
    async reset(key: CacheKey) {
      counts.delete(key);
    },
  };
  return { limiter, calls };
}

describe('createLoginThrottle', () => {
  it('allows five attempts per address and email and refuses the sixth with a retry delay', async () => {
    const { limiter } = memoryLimiter();
    const check = createLoginThrottle(limiter, CONFIG);
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(await check('203.0.113.1', 'ada@example.com')).toEqual({ allowed: true });
    }
    const sixth = await check('203.0.113.1', 'ada@example.com');
    expect(sixth).toEqual({ allowed: false, retryAfterSeconds: 18 });
  });

  it('keeps other emails and other addresses apart', async () => {
    const { limiter } = memoryLimiter();
    const check = createLoginThrottle(limiter, CONFIG);
    for (let attempt = 0; attempt < 6; attempt += 1) await check('203.0.113.1', 'ada@example.com');
    expect(await check('203.0.113.1', 'bob@example.com')).toEqual({ allowed: true });
    expect(await check('203.0.113.2', 'ada@example.com')).toEqual({ allowed: true });
  });

  it('refuses an address after 30 attempts whatever the email', async () => {
    const { limiter } = memoryLimiter();
    const check = createLoginThrottle(limiter, CONFIG);
    for (let attempt = 0; attempt < 30; attempt += 1) {
      expect(await check('203.0.113.1', `user${attempt}@example.com`)).toEqual({ allowed: true });
    }
    expect((await check('203.0.113.1', 'one-more@example.com')).allowed).toBe(false);
  });

  it('never puts the address or the email in a key', async () => {
    const { limiter, calls } = memoryLimiter();
    await createLoginThrottle(limiter, CONFIG)('203.0.113.1', 'ada@example.com');
    expect(calls).toHaveLength(2);
    for (const call of calls) {
      expect(call.key).not.toContain('203.0.113.1');
      expect(call.key).not.toContain('ada');
      expect(call.windowSeconds).toBe(60);
    }
    expect(calls[0]!.key.startsWith('g:ratelimit:login:')).toBe(true);
    expect(calls[1]!.key.startsWith('g:ratelimit:login-ip:')).toBe(true);
  });

  it('reports at least one second to wait', async () => {
    const limiter: LimiterPort = {
      check: async () => ({ allowed: false, remaining: 0, resetAt: new Date(Date.now() - 5000) }),
      reset: async () => undefined,
    };
    expect(await createLoginThrottle(limiter, CONFIG)('ip', 'a@b.co')).toEqual({
      allowed: false,
      retryAfterSeconds: 1,
    });
  });

  it('fails closed with service_unavailable when the limiter store is down', async () => {
    const limiter: LimiterPort = {
      check: async () => {
        throw new Error('redis_unavailable');
      },
      reset: async () => undefined,
    };
    const error = await createLoginThrottle(limiter, CONFIG)('ip', 'a@b.co').catch(
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).code).toBe('service_unavailable');
  });
});
