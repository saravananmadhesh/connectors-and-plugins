import { describe, it, expect } from 'vitest';
import { randomUUID } from 'node:crypto';
import { createRedisAdapters } from './index.js';
import { runCacheContract } from '../contract/cache.contract.js';
import { runLimiterContract } from '../contract/limiter.contract.js';
import { runLockContract } from '../contract/lock.contract.js';

const configuredUrl = process.env['TEST_REDIS_URL'];
if (!configuredUrl) throw new Error('Missing required test environment variable TEST_REDIS_URL');
const url: string = configuredUrl;

const prefix = `contract-${randomUUID()}:`;

function make<K extends 'cache' | 'lock' | 'limiter'>(name: K) {
  return async () => {
    const adapters = createRedisAdapters({ url, keyPrefix: prefix });
    return { port: adapters[name], cleanup: () => adapters.close() };
  };
}

runCacheContract('redis', make('cache'));
runLockContract('redis', make('lock'));
runLimiterContract('redis', make('limiter'));

describe('redis adapter when the server is unreachable', () => {
  it('rejects every call with redis_unavailable', async () => {
    const adapters = createRedisAdapters({ url: 'redis://127.0.0.1:1', commandTimeoutMs: 500 });
    try {
      await expect(adapters.cache.ping()).rejects.toThrow('redis_unavailable');
      await expect(adapters.cache.get('g:flag:x' as never)).rejects.toThrow('redis_unavailable');
      await expect(adapters.lock.acquire('g:flag:x' as never, { ttlMs: 1000 })).rejects.toThrow(
        'redis_unavailable',
      );
      await expect(
        adapters.limiter.check('g:flag:x' as never, { limit: 1, windowSeconds: 1 }),
      ).rejects.toThrow('redis_unavailable');
    } finally {
      await adapters.close();
    }
  });
});

describe('redis adapter on first use', () => {
  it('serves concurrent first calls over one connection', async () => {
    const adapters = createRedisAdapters({ url, keyPrefix: `first-use-${randomUUID()}:` });
    try {
      const key = 'g:ratelimit:first-use' as never;
      const results = await Promise.all(
        Array.from({ length: 25 }, () =>
          adapters.limiter.check(key, { limit: 20, windowSeconds: 30 }),
        ),
      );
      expect(results.filter((result) => result.allowed).length).toBe(20);
    } finally {
      await adapters.close();
    }
  });

  it('rejects concurrent first calls to an unreachable server the same way', async () => {
    const adapters = createRedisAdapters({ url: 'redis://127.0.0.1:1', commandTimeoutMs: 500 });
    try {
      const results = await Promise.allSettled(
        Array.from({ length: 5 }, () => adapters.cache.ping()),
      );
      for (const result of results) {
        expect(result.status).toBe('rejected');
        expect((result as PromiseRejectedResult).reason).toMatchObject({
          message: 'redis_unavailable',
        });
      }
    } finally {
      await adapters.close();
    }
  });
});
