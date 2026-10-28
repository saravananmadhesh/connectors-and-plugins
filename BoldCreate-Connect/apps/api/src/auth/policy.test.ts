import { describe, expect, it } from 'vitest';
import { loadApiConfig } from '../config.js';
import { authPolicyFromConfig } from './policy.js';

const env = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://app_api:pw@localhost:5432/boldcreate',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests',
  REDIS_URL: 'redis://:pw@localhost:6379',
  BLOB_BUCKET: 'artifacts',
};

describe('authPolicyFromConfig', () => {
  it('carries the defaults of the configuration', () => {
    expect(authPolicyFromConfig(loadApiConfig(env))).toEqual({
      session: { idleSeconds: 1800, absoluteSeconds: 43_200, slideMinIntervalSeconds: 60 },
      maxFailedLogins: 10,
      lockSeconds: 900,
      passwordMinLength: 12,
    });
  });

  it('follows configured values', () => {
    const policy = authPolicyFromConfig(
      loadApiConfig({
        ...env,
        SESSION_IDLE_SECONDS: '600',
        SESSION_ABSOLUTE_SECONDS: '7200',
        SESSION_SLIDE_MIN_INTERVAL_SECONDS: '5',
        LOGIN_MAX_FAILED: '3',
        LOGIN_LOCK_SECONDS: '30',
        PASSWORD_MIN_LENGTH: '16',
      }),
    );
    expect(policy).toEqual({
      session: { idleSeconds: 600, absoluteSeconds: 7200, slideMinIntervalSeconds: 5 },
      maxFailedLogins: 3,
      lockSeconds: 30,
      passwordMinLength: 16,
    });
  });
});
