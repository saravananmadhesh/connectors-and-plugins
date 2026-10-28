import { describe, expect, it } from 'vitest';
import { loadWorkerConfig } from './config.js';

const valid = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://app_worker:pw@localhost:5432/boldcreate',
  BLOB_BUCKET: 'plugins',
};

function failure(env: Record<string, string | undefined>): string {
  try {
    loadWorkerConfig(env);
  } catch (error) {
    return (error as Error).message;
  }
  throw new Error('expected the configuration to be rejected');
}

describe('loadWorkerConfig', () => {
  it('accepts a minimal local environment and applies defaults', () => {
    expect(loadWorkerConfig(valid)).toMatchObject({
      DEPLOY_ENV: 'local',
      HEALTH_PORT: 3005,
      EMAIL_ADAPTER: 'mailpit',
      EMAIL_FROM: 'noreply@localhost',
      OUTBOX_POLL_INTERVAL_MS: 5000,
      KMS_ADAPTER: 'local',
      APP_BASE_URL: 'http://localhost:3000',
    });
  });

  it('allows boldcreate, syncfusion and cursor as source owners unless told otherwise', () => {
    expect(loadWorkerConfig(valid).PLUGIN_SOURCE_ALLOWED_OWNERS).toEqual([
      'boldcreate',
      'syncfusion',
      'cursor',
    ]);
    expect(
      loadWorkerConfig({ ...valid, PLUGIN_SOURCE_ALLOWED_OWNERS: '' }).PLUGIN_SOURCE_ALLOWED_OWNERS,
    ).toEqual([]);
  });

  it('fails without DATABASE_URL and on a placeholder', () => {
    expect(failure({ NODE_ENV: 'test' })).toContain('DATABASE_URL');
    expect(failure({ ...valid, DATABASE_URL: 'changeme' })).toContain('DATABASE_URL');
  });

  it('rejects an unknown email adapter, a short interval and a bad port', () => {
    expect(failure({ ...valid, EMAIL_ADAPTER: 'smtp' })).toContain('EMAIL_ADAPTER');
    expect(failure({ ...valid, OUTBOX_POLL_INTERVAL_MS: '10' })).toContain(
      'OUTBOX_POLL_INTERVAL_MS',
    );
    expect(failure({ ...valid, HEALTH_PORT: '0' })).toContain('HEALTH_PORT');
  });

  it('rejects local-only adapters and a plain or missing origin when deployed', () => {
    const deployed = { ...valid, DEPLOY_ENV: 'production', ALLOWED_HOSTS: 'worker.internal' };
    const message = failure({ ...deployed, APP_BASE_URL: 'https://app.example.com' });
    expect(message).toContain('EMAIL_ADAPTER');
    expect(message).toContain('KMS_ADAPTER');
    expect(failure({ ...deployed, APP_BASE_URL: 'http://app.example.com' })).toContain(
      'APP_BASE_URL',
    );
    expect(failure(deployed)).toContain('APP_BASE_URL');
  });

  it('rejects a trailing slash on the app origin', () => {
    expect(failure({ ...valid, APP_BASE_URL: 'http://localhost:3000/' })).toContain('APP_BASE_URL');
  });

  it('ignores unknown keys', () => {
    expect(() => loadWorkerConfig({ ...valid, SOMETHING_ELSE: 'x' })).not.toThrow();
  });

  const deployedWorker = {
    ...valid,
    DEPLOY_ENV: 'production',
    ALLOWED_HOSTS: 'worker.internal',
    APP_BASE_URL: 'https://app.example.com',
  };

  it('accepts the deployed adapters and names the key each one needs', () => {
    const cloud = {
      ...deployedWorker,
      KMS_ADAPTER: 'cloud-kms',
      KMS_CLOUD_KEY_NAME: 'projects/p/locations/l/keyRings/r/cryptoKeys/k',
      SECRETS_ADAPTER: 'gcp-secret-manager',
      GCP_PROJECT_ID: 'p',
      EMAIL_ADAPTER: 'ses',
      SES_REGION: 'eu-west-1',
      REDIS_URL: 'rediss://cache:6380',
    };
    expect(loadWorkerConfig(cloud)).toMatchObject({
      EMAIL_ADAPTER: 'ses',
      SES_REGION: 'eu-west-1',
    });
    for (const key of ['KMS_CLOUD_KEY_NAME', 'GCP_PROJECT_ID', 'SES_REGION']) {
      const without: Record<string, string | undefined> = { ...cloud };
      delete without[key];
      expect(failure(without)).toContain(key);
    }
    expect(
      loadWorkerConfig({
        ...cloud,
        SES_ACCESS_KEY_ID: 'AKIAEXAMPLE',
        SES_SECRET_ACCESS_KEY: 'secret-value-1',
      }),
    ).toMatchObject({ SES_ACCESS_KEY_ID: 'AKIAEXAMPLE' });
    expect(failure({ ...cloud, SES_ACCESS_KEY_ID: 'AKIAEXAMPLE' })).toContain(
      'SES_SECRET_ACCESS_KEY',
    );
  });

  it('refuses local KMS, local secrets, mailpit and plain redis when production', () => {
    const message = failure({ ...deployedWorker, REDIS_URL: 'redis://cache:6379' });
    for (const key of ['KMS_ADAPTER', 'SECRETS_ADAPTER', 'EMAIL_ADAPTER', 'REDIS_URL']) {
      expect(message).toContain(key);
    }
  });

  it('defaults the secrets adapter to local', () => {
    expect(loadWorkerConfig(valid)).toMatchObject({ SECRETS_ADAPTER: 'local' });
  });
});
