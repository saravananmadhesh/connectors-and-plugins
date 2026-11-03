import { describe, expect, it } from 'vitest';
import { loadApiConfig } from './config.js';

const valid = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://app_api:pw@localhost:5432/boldcreate',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests',
  REDIS_URL: 'redis://:pw@localhost:6379',
  BLOB_BUCKET: 'artifacts',
};

const deployedOrigins = {
  APP_BASE_URL: 'https://app.example.com',
  PUBLIC_API_BASE_URL: 'https://api.example.com',
  PUBLIC_GATEWAY_URL: 'https://mcp.example.com',
  OAUTH_REDIRECT_URI: 'https://app.example.com/api/v1/oauth/callback',
};

const deployed = {
  ...valid,
  ...deployedOrigins,
  DEPLOY_ENV: 'production',
  WORKLOAD_AUTH_MODE: 'signed',
  WORKLOAD_TRUSTED_KEYS: JSON.stringify({ web: 'pem' }),
  WORKLOAD_SIGNING_KEY: 'k'.repeat(40),
  WORKLOAD_SECRET: 's'.repeat(40),
  REDIS_URL: 'rediss://cache:6380',
  ALLOWED_HOSTS: 'api.internal',
  KMS_ADAPTER: 'cloud-kms',
  KMS_CLOUD_KEY_NAME: 'projects/p/locations/l/keyRings/r/cryptoKeys/k',
};

function failure(env: Record<string, string | undefined>): string {
  try {
    loadApiConfig(env);
  } catch (error) {
    return (error as Error).message;
  }
  throw new Error('expected the configuration to be rejected');
}

describe('loadApiConfig', () => {
  it('has safe defaults for the load limits', () => {
    const config = loadApiConfig(valid);
    expect(config).toMatchObject({
      HTTP_MAX_INFLIGHT: 200,
      EVENT_LOOP_LAG_SHED_MS: 250,
      HEAP_SHED_PERCENT: 85,
      DB_MAX_CONCURRENCY: 0,
      DB_QUEUE_MAX_DEPTH: 100,
      DB_QUEUE_MAX_WAIT_SECONDS: 5,
      DB_QUEUE_PROJECT_SHARE_PCT: 25,
    });
  });

  it('reads the load limits from the environment and keeps 0 for "off"', () => {
    const config = loadApiConfig({
      ...valid,
      HTTP_MAX_INFLIGHT: '0',
      DB_MAX_CONCURRENCY: '12',
      DB_QUEUE_MAX_DEPTH: '40',
      DB_QUEUE_PROJECT_SHARE_PCT: '0',
    });
    expect(config).toMatchObject({
      HTTP_MAX_INFLIGHT: 0,
      DB_MAX_CONCURRENCY: 12,
      DB_QUEUE_MAX_DEPTH: 40,
      DB_QUEUE_PROJECT_SHARE_PCT: 0,
    });
  });

  it.each([
    ['DB_QUEUE_MAX_DEPTH', '0'],
    ['DB_QUEUE_MAX_WAIT_SECONDS', '0'],
    ['DB_QUEUE_PROJECT_SHARE_PCT', '101'],
    ['DB_QUEUE_PROJECT_SHARE_PCT', '-1'],
    ['DB_MAX_CONCURRENCY', '-1'],
    ['DB_MAX_CONCURRENCY', 'many'],
    ['HEAP_SHED_PERCENT', '100'],
  ])('rejects %s=%s', (name, value) => {
    expect(failure({ ...valid, [name]: value })).toContain(name);
  });

  it('accepts a minimal local environment and applies defaults', () => {
    const config = loadApiConfig(valid);
    expect(config).toMatchObject({
      PORT: 3001,
      DEPLOY_ENV: 'local',
      BFF_CALLER_ALLOWLIST: ['web', 'admin', 'gateway'],
      DOWNLOADS_PER_KEY: 4,
      SESSION_IDLE_SECONDS: 1800,
      SESSION_ABSOLUTE_SECONDS: 43_200,
      SESSION_SLIDE_MIN_INTERVAL_SECONDS: 60,
      LOGIN_MAX_FAILED: 10,
      LOGIN_LOCK_SECONDS: 900,
      LOGIN_THROTTLE_IP_EMAIL_LIMIT: 5,
      LOGIN_THROTTLE_IP_LIMIT: 30,
      LOGIN_THROTTLE_WINDOW_SECONDS: 60,
      PASSWORD_MIN_LENGTH: 12,
      APP_BASE_URL: 'http://localhost:3000',
      PUBLIC_API_BASE_URL: 'http://localhost:3001',
      PUBLIC_GATEWAY_URL: 'http://localhost:3002',
      OAUTH_REDIRECT_URI: 'http://localhost:3000/api/v1/oauth/callback',
    });
  });

  it('ignores unknown keys', () => {
    expect(() => loadApiConfig({ ...valid, SOMETHING_ELSE: 'x' })).not.toThrow();
  });

  it.each(['DATABASE_URL', 'WORKLOAD_SECRET'])('fails without %s', (name) => {
    const env: Record<string, string | undefined> = { ...valid };
    delete env[name];
    expect(failure(env)).toContain(name);
  });

  it('rejects placeholders', () => {
    expect(failure({ ...valid, DATABASE_URL: 'REPLACE_ME' })).toContain('DATABASE_URL');
    expect(failure({ ...valid, WORKLOAD_SECRET: 'changeme' })).toContain('WORKLOAD_SECRET');
  });

  it('accepts a complete deployed environment', () => {
    expect(() => loadApiConfig(deployed)).not.toThrow();
  });

  it('rejects weak secrets in production only', () => {
    const weak = { WORKLOAD_SECRET: 'short-secret' };
    expect(() => loadApiConfig({ ...valid, ...weak })).not.toThrow();
    expect(failure({ ...deployed, ...weak })).toContain('WORKLOAD_SECRET');
    expect(failure({ ...valid, ...weak, NODE_ENV: 'production' })).toContain('WORKLOAD_SECRET');
  });

  it('rejects the shared secret when deployed', () => {
    const message = failure({ ...deployed, WORKLOAD_AUTH_MODE: 'shared_secret' });
    expect(message).toContain('WORKLOAD_AUTH_MODE');
  });

  it('needs a signing key and trusted keys in signed mode', () => {
    const noSigning: Record<string, string | undefined> = { ...deployed };
    delete noSigning['WORKLOAD_SIGNING_KEY'];
    expect(failure(noSigning)).toContain('WORKLOAD_SIGNING_KEY');
    const noTrusted: Record<string, string | undefined> = { ...deployed };
    delete noTrusted['WORKLOAD_TRUSTED_KEYS'];
    expect(failure(noTrusted)).toContain('WORKLOAD_TRUSTED_KEYS');
  });

  it('needs a redis url for the sign-in throttle', () => {
    const env: Record<string, string | undefined> = { ...valid };
    delete env['REDIS_URL'];
    expect(failure(env)).toContain('REDIS_URL');
  });

  it('rejects a plain redis url when deployed', () => {
    expect(failure({ ...deployed, REDIS_URL: 'redis://cache:6379' })).toContain('REDIS_URL');
    expect(() => loadApiConfig({ ...deployed, REDIS_URL: 'rediss://cache:6380' })).not.toThrow();
  });

  describe('origin keys', () => {
    it.each(Object.keys(deployedOrigins))('%s rejects a trailing slash', (key) => {
      const value = `${deployedOrigins[key as keyof typeof deployedOrigins]}/`;
      expect(failure({ ...valid, [key]: value })).toContain(key);
    });

    it.each(Object.keys(deployedOrigins))(
      '%s must be https when deployed and has no default',
      (key) => {
        const value = deployedOrigins[key as keyof typeof deployedOrigins];
        expect(failure({ ...deployed, [key]: value.replace('https', 'http') })).toContain(key);
        const env: Record<string, string | undefined> = { ...deployed };
        delete env[key];
        expect(failure(env)).toContain(key);
      },
    );

    it('rejects a path on an origin and a value that is not a URL', () => {
      expect(failure({ ...valid, APP_BASE_URL: 'http://localhost:3000/app' })).toContain(
        'APP_BASE_URL',
      );
      expect(failure({ ...valid, APP_BASE_URL: 'localhost' })).toContain('APP_BASE_URL');
      expect(failure({ ...valid, APP_BASE_URL: 'ftp://host' })).toContain('APP_BASE_URL');
    });
  });

  it('never prints a value', () => {
    const message = failure({
      ...valid,
      DATABASE_URL: 'REPLACE_with-very-secret-url',
      APP_BASE_URL: 'http://host/with-path-secret',
    });
    for (const value of ['very-secret-url', 'with-path-secret']) {
      expect(message).not.toContain(value);
    }
  });
});
