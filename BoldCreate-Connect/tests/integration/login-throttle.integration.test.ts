/**
 * Sign-in throttle against real Redis and Postgres. Each case builds its own api instance in
 * this process (with its own key prefix and window), so the live stack's limits stay out of the
 * way of the other suites.
 */
import { randomUUID } from 'node:crypto';
import { afterAll, describe, expect, it } from 'vitest';
import { createRedisAdapters } from '../../packages/adapters/src/redis/index.js';
import { buildApp } from '../../apps/api/src/app.js';
import { loadApiConfig } from '../../apps/api/src/config.js';
import { createDb, createIdempotencyStore } from '../../packages/db/src/index.js';
import { createWorkloadAuthenticator } from '../../packages/http-server/src/index.js';
import { createLogger, createMetrics } from '../../packages/observability/src/index.js';
import { TEST_PASSWORD, createSignedInUser } from './signed-in-user.js';
import { requireEnv, roleConnectionString } from './test-env.js';

const SECRET = requireEnv('WORKLOAD_SECRET');
const REDIS_URL = requireEnv('TEST_REDIS_URL');
const apiDatabaseUrl = roleConnectionString('api');
const { db, pool } = createDb({ connectionString: apiDatabaseUrl, max: 4 });

const cleanups: Array<() => Promise<unknown>> = [];

async function buildThrottled(options: { windowSeconds: number; redisUrl?: string }) {
  const config = loadApiConfig({
    NODE_ENV: 'test',
    DEPLOY_ENV: 'test',
    DATABASE_URL: apiDatabaseUrl,
    WORKLOAD_SECRET: SECRET,
    BLOB_BUCKET: 'unused',
    REDIS_URL: options.redisUrl ?? REDIS_URL,
    TRUSTED_PROXY_CIDRS: '127.0.0.1/32',
    LOGIN_THROTTLE_WINDOW_SECONDS: String(options.windowSeconds),
  });
  const redis = createRedisAdapters({
    url: options.redisUrl ?? REDIS_URL,
    commandTimeoutMs: 500,
    keyPrefix: `throttle-test-${randomUUID()}:`,
  });
  const server = await buildApp(config, {
    db,
    idempotencyStore: createIdempotencyStore(db),
    sealerFor: () => ({
      seal: async () => {
        throw new Error('not used');
      },
      sealFields: async () => {
        throw new Error('not used');
      },
    }),
    mcp: {
      deps: {
        sealerFor: () => {
          throw new Error('not used');
        },
        unsealer: {
          unseal: async () => {
            throw new Error('not used');
          },
          unsealFields: async () => {
            throw new Error('not used');
          },
        },
        fetcher: async () => {
          throw new Error('not used');
        },
      },
      redirectUri: 'http://localhost:3000/api/v1/oauth/callback',
      appBaseUrl: 'http://localhost:3000',
    },
    blob: {
      getStream: async () => {
        throw new Error('not used');
      },
      head: async () => null,
      put: async () => undefined,
      exists: async () => false,
      delete: async () => undefined,
    },
    limiter: redis.limiter,
    logger: createLogger({ service: 'api', level: 'silent' }),
    metrics: createMetrics({ service: 'api' }),
    workload: createWorkloadAuthenticator({
      service: 'api',
      mode: 'shared_secret',
      secret: SECRET,
    }),
    pingDb: async () => 1,
  });
  cleanups.push(
    () => server.close(),
    () => redis.close(),
  );

  return {
    signin(email: string, password: string, ip = '203.0.113.7') {
      return server.app.inject({
        method: 'POST',
        url: '/v1/auth/signin',
        headers: {
          'x-caller-id': 'web',
          'x-workload-secret': SECRET,
          'x-forwarded-for': ip,
        },
        payload: { email, password },
      });
    },
  };
}

afterAll(async () => {
  for (const cleanup of cleanups) await cleanup();
  await pool.end();
});

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const errorCode = (body: string): string =>
  (JSON.parse(body) as { error: { code: string } }).error.code;

describe('sign-in throttle', () => {
  it('answers 429 with Retry-After for the sixth attempt of one address and email, even with the right password', async () => {
    const user = await createSignedInUser('throttle-ip-email');
    const app = await buildThrottled({ windowSeconds: 30 });
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const res = await app.signin(user.email, 'wrong-password-123');
      expect(res.statusCode).toBe(401);
    }
    const sixth = await app.signin(user.email, TEST_PASSWORD);
    expect(sixth.statusCode).toBe(429);
    expect(errorCode(sixth.body)).toBe('rate_limited');
    const retryAfter = Number(sixth.headers['retry-after']);
    expect(retryAfter).toBeGreaterThanOrEqual(1);
    expect(retryAfter).toBeLessThanOrEqual(30);

    // Another email from the same address is not throttled, another address is not either.
    const otherEmail = await app.signin(`other-${randomUUID()}@example.com`, 'wrong-password-123');
    expect(otherEmail.statusCode).toBe(401);
    const otherIp = await app.signin(user.email, TEST_PASSWORD, '203.0.113.99');
    expect(otherIp.statusCode).toBe(200);
  }, 60_000);

  it('throttles one address after 30 attempts whatever the email', async () => {
    const app = await buildThrottled({ windowSeconds: 60 });
    const results = await Promise.all(
      Array.from({ length: 31 }, () =>
        app.signin(`nobody-${randomUUID()}@example.com`, 'wrong-password-123', '198.51.100.20'),
      ),
    );
    const throttled = results.filter((res) => res.statusCode === 429);
    expect(throttled.length).toBe(1);
    expect(results.filter((res) => res.statusCode === 401).length).toBe(30);
  }, 60_000);

  it('lets a sign-in through again after the window rolls over', async () => {
    const user = await createSignedInUser('throttle-window');
    const app = await buildThrottled({ windowSeconds: 2 });
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      await app.signin(user.email, 'wrong-password-123');
    }
    // Attempts 1 to 5 may straddle a window boundary; keep going until one is refused.
    let refused = (await app.signin(user.email, TEST_PASSWORD)).statusCode === 429;
    for (let extra = 0; extra < 5 && !refused; extra += 1) {
      refused = (await app.signin(user.email, TEST_PASSWORD)).statusCode === 429;
    }
    await sleep(2200);
    const after = await app.signin(user.email, TEST_PASSWORD, '203.0.113.50');
    expect(after.statusCode).toBe(200);
    const sameIp = await app.signin(user.email, TEST_PASSWORD);
    expect(sameIp.statusCode).toBe(200);
  }, 60_000);

  it('refuses sign-in with 503 when the limiter store is unreachable', async () => {
    const user = await createSignedInUser('throttle-down');
    const app = await buildThrottled({ windowSeconds: 30, redisUrl: 'redis://127.0.0.1:1' });
    const res = await app.signin(user.email, TEST_PASSWORD);
    expect(res.statusCode).toBe(503);
    expect(errorCode(res.body)).toBe('service_unavailable');
  }, 30_000);
});
