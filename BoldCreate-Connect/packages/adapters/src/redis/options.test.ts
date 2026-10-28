import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRedisAdaptersFromConfig, redisSecurityOptions } from './index.js';

describe('redis security options', () => {
  it('adds nothing for a plain local url', () => {
    expect(redisSecurityOptions({ url: 'redis://127.0.0.1:6379' })).toEqual({});
  });

  it('enables TLS for rediss and passes the credentials', () => {
    expect(
      redisSecurityOptions({ url: 'rediss://cache:6380', username: 'svc', password: 'pw' }),
    ).toEqual({ username: 'svc', password: 'pw', sentinelPassword: 'pw', tls: {} });
  });

  it('reads the certificate authority of the server', () => {
    const dir = mkdtempSync(join(tmpdir(), 'redis-ca-'));
    try {
      const file = join(dir, 'ca.pem');
      writeFileSync(file, 'pem bytes');
      const options = redisSecurityOptions({ url: 'rediss://cache:6380', tlsCaFile: file });
      expect(options.tls?.ca?.toString()).toBe('pem bytes');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('does not read the authority file or send TLS settings over a plain connection', () => {
    expect(redisSecurityOptions({ url: 'redis://h:1', tlsCaFile: '/does/not/exist' })).toEqual({});
  });

  it('fails when the configured authority file is missing', () => {
    expect(() =>
      redisSecurityOptions({ url: 'rediss://cache:6380', tlsCaFile: '/does/not/exist.pem' }),
    ).toThrow(/ENOENT/);
  });

  it('builds adapters from configuration keys', async () => {
    const adapters = createRedisAdaptersFromConfig({
      REDIS_URL: 'redis://127.0.0.1:1',
      REDIS_USERNAME: 'svc',
      REDIS_PASSWORD: 'pw',
    });
    await adapters.close();
    expect(adapters.cache).toBeDefined();
  });

  it('builds adapters from sentinel configuration', async () => {
    const adapters = createRedisAdaptersFromConfig({
      REDIS_URL: 'mymaster,node-0.redis:26379,node-1.redis:26379',
    });
    await adapters.close();
    expect(adapters.cache).toBeDefined();
  });
});
