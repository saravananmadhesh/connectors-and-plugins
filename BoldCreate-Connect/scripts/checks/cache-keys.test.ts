import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, run } from './cache-keys.js';

const root = resolve(import.meta.dirname, '../..');
const FILE = 'apps/api/src/x.ts';

describe('cache keys', () => {
  it.each([
    "await cache.get('flag:x');",
    'await deps.cache.set(`t:${orgId}`, value);',
    "await cache.increment('k', { ttlSeconds: 1 });",
    "await cache.delete('k');",
    "await lock.acquire('k', { ttlMs: 1 });",
    "await limiter.check('k', { limit: 1, windowSeconds: 1 });",
    "await limiter.reset('k');",
    'const key = `t:${orgId}`; await cache.get(key);',
  ])('flags a raw key: %s', (code) => {
    const findings = checkSource(FILE, code);
    expect(findings[0]?.rule).toBe('cache-keys/untyped-key');
  });

  it.each([
    "await cache.get(tenantKey(orgId, 'org-key', id));",
    "await cache.get(globalKey('flag', key));",
    "await deps.limiter.check(globalKey('ratelimit', 'login'), rule);",
    "const key = tenantKey(orgId, 'a'); await cache.get(key);",
    'async function f(cache: CachePort, key: CacheKey) { return cache.get(key); }',
    "await lock.acquire(tenantKey(orgId, 'lock'), { ttlMs: 1 });",
  ])('accepts a built key: %s', (code) => {
    expect(checkSource(FILE, code)).toEqual([]);
  });

  it('ignores calls on other receivers and methods', () => {
    expect(checkSource(FILE, "map.get('x'); cache.ping(); cache.publish('c', 'm');")).toEqual([]);
  });

  it('flags an ioredis import outside the redis adapter', () => {
    const findings = checkSource(FILE, "import { Redis } from 'ioredis';");
    expect(findings[0]?.rule).toBe('cache-keys/ioredis-import');
  });

  it('allows the ioredis import inside the redis adapter', () => {
    expect(
      checkSource('packages/adapters/src/redis/client.ts', "import { Redis } from 'ioredis';"),
    ).toEqual([]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
