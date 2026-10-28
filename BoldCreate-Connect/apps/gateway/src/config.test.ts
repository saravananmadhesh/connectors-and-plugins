import { describe, expect, it } from 'vitest';
import { loadGatewayConfig } from './config.js';

const valid = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://app_gateway:pw@localhost:5432/boldcreate',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests',
};

const deployed = {
  ...valid,
  DEPLOY_ENV: 'production',
  WORKLOAD_AUTH_MODE: 'signed',
  WORKLOAD_SIGNING_KEY: 'k'.repeat(40),
  PUBLIC_GATEWAY_URL: 'https://mcp.example.com',
  APP_BASE_URL: 'https://app.example.com',
  ALLOWED_HOSTS: 'mcp.example.com',
};

function failure(env: Record<string, string | undefined>): string {
  try {
    loadGatewayConfig(env);
  } catch (error) {
    return (error as Error).message;
  }
  throw new Error('expected the configuration to be rejected');
}

describe('loadGatewayConfig', () => {
  it('accepts a minimal local environment and applies defaults', () => {
    expect(loadGatewayConfig(valid)).toMatchObject({
      PORT: 3002,
      DEPLOY_ENV: 'local',
      KMS_ADAPTER: 'local',
      ORG_KEY_CACHE_MAX: 1000,
      ORG_KEY_CACHE_TTL_SECONDS: 300,
      PUBLIC_GATEWAY_URL: 'http://localhost:3002',
      API_BASE_URL: 'http://localhost:3001',
      BODY_LIMIT_BYTES: 1_048_576,
      REQUEST_TIMEOUT_MS: 130_000,
      TOOL_RESULT_MAX_BYTES: 4_194_304,
      SERVER_MAX_CONCURRENCY: 20,
      SHUTDOWN_DRAIN_SECONDS: 20,
      SHUTDOWN_PREDRAIN_SECONDS: 5,
    });
  });

  it('checks keys against the database unless told to use the api', () => {
    expect(loadGatewayConfig(valid).DATA_SOURCE).toBe('database');
    expect(loadGatewayConfig({ ...valid, DATA_SOURCE: 'api' }).DATA_SOURCE).toBe('api');
    expect(failure({ ...valid, DATA_SOURCE: 'cache' })).toContain('DATA_SOURCE');
  });

  it.each(['DATABASE_URL'])('fails without %s', (name) => {
    const env: Record<string, string | undefined> = { ...valid };
    delete env[name];
    expect(failure(env)).toContain(name);
  });

  it('rejects placeholders and an unknown adapter', () => {
    expect(failure({ ...valid, DATABASE_URL: 'changeme' })).toContain('DATABASE_URL');
    expect(failure({ ...valid, KMS_ADAPTER: 'nope' })).toContain('KMS_ADAPTER');
  });

  it('rejects the local KMS adapter, shared secret and plain redis when deployed', () => {
    expect(failure(deployed)).toContain('KMS_ADAPTER');
    expect(failure({ ...deployed, WORKLOAD_AUTH_MODE: 'shared_secret' })).toContain(
      'WORKLOAD_AUTH_MODE',
    );
    expect(failure({ ...deployed, REDIS_URL: 'redis://cache:6379' })).toContain('REDIS_URL');
  });

  it('checks the public origin', () => {
    expect(failure({ ...valid, PUBLIC_GATEWAY_URL: 'http://localhost:3002/' })).toContain(
      'PUBLIC_GATEWAY_URL',
    );
    expect(failure({ ...deployed, PUBLIC_GATEWAY_URL: 'http://mcp.example.com' })).toContain(
      'PUBLIC_GATEWAY_URL',
    );
    const env: Record<string, string | undefined> = { ...deployed };
    delete env['PUBLIC_GATEWAY_URL'];
    expect(failure(env)).toContain('PUBLIC_GATEWAY_URL');
  });

  it('ignores unknown keys', () => {
    expect(() => loadGatewayConfig({ ...valid, SOMETHING_ELSE: 'x' })).not.toThrow();
  });

  it('accepts the cloud KMS adapter when deployed and names the key it needs', () => {
    const cloud = { ...deployed, KMS_ADAPTER: 'cloud-kms' };
    expect(failure(cloud)).toContain('KMS_CLOUD_KEY_NAME');
    const named = {
      ...cloud,
      KMS_CLOUD_KEY_NAME: 'projects/p/locations/l/keyRings/r/cryptoKeys/k',
    };
    let message = '';
    try {
      loadGatewayConfig(named);
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).not.toContain('KMS_');
  });

  it('rejects the local KMS adapter when DEPLOY_ENV is production', () => {
    expect(failure({ ...deployed, KMS_ADAPTER: 'local' })).toContain('KMS_ADAPTER');
  });

  it('reads managed Redis credentials and refuses a placeholder password', () => {
    const managed = {
      ...deployed,
      REDIS_URL: 'rediss://cache:6380',
      REDIS_USERNAME: 'svc',
      REDIS_TLS_CA: '/etc/redis/ca.pem',
    };
    expect(
      loadGatewayConfig({ ...valid, REDIS_URL: 'rediss://cache:6380', REDIS_USERNAME: 'svc' }),
    ).toMatchObject({
      REDIS_USERNAME: 'svc',
    });
    expect(failure({ ...managed, REDIS_PASSWORD: 'changeme' })).toContain('REDIS_PASSWORD');
  });
});
