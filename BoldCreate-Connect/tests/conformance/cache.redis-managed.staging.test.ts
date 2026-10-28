/**
 * The cache, lock and limiter contracts against a managed Redis over TLS.
 *
 * Run deliberately: pnpm test:staging
 * Needs STAGING_REDIS_URL (rediss://...). STAGING_REDIS_USERNAME, STAGING_REDIS_PASSWORD and
 * STAGING_REDIS_TLS_CA (path of a PEM file) are optional.
 */
import { randomUUID } from 'node:crypto';
import { createRedisAdaptersFromConfig } from '../../packages/adapters/src/redis/index.js';
import { runCacheContract } from '../../packages/adapters/src/contract/cache.contract.js';
import { runLimiterContract } from '../../packages/adapters/src/contract/limiter.contract.js';
import { runLockContract } from '../../packages/adapters/src/contract/lock.contract.js';

const url = process.env['STAGING_REDIS_URL'];
if (!url) throw new Error('Missing required staging environment variable STAGING_REDIS_URL');
if (!url.startsWith('rediss://')) throw new Error('STAGING_REDIS_URL must use rediss://');

const prefix = `staging-contract-${randomUUID()}:`;

function make<K extends 'cache' | 'lock' | 'limiter'>(name: K) {
  return async () => {
    const adapters = createRedisAdaptersFromConfig({
      REDIS_URL: url!,
      REDIS_USERNAME: process.env['STAGING_REDIS_USERNAME'],
      REDIS_PASSWORD: process.env['STAGING_REDIS_PASSWORD'],
      REDIS_TLS_CA: process.env['STAGING_REDIS_TLS_CA'],
      keyPrefix: prefix,
    });
    return { port: adapters[name], cleanup: () => adapters.close() };
  };
}

runCacheContract('redis managed (staging)', make('cache'));
runLockContract('redis managed (staging)', make('lock'));
runLimiterContract('redis managed (staging)', make('limiter'));
