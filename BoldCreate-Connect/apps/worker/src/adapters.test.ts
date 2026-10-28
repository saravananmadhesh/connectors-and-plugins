import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createAdapters, createEmailAdapter } from './adapters.js';
import { loadWorkerConfig, type WorkerConfig } from './config.js';

const base = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://app_worker:pw@localhost:5432/boldcreate',
  BLOB_BUCKET: 'plugins',
};

function config(extra: Record<string, string> = {}): WorkerConfig {
  return loadWorkerConfig({ ...base, ...extra });
}

describe('worker adapters', () => {
  it('builds the local adapters for local development', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'worker-adapters-'));
    try {
      writeFileSync(join(dir, 'manifest-signing-key'), 'key-material\n');
      const adapters = createAdapters(
        config({
          KMS_LOCAL_KEYRING_PATH: join(dir, 'keyring.json'),
          SECRETS_LOCAL_DIR: dir,
        }),
      );
      expect(adapters.redis).toBeUndefined();
      await expect(adapters.secrets.get('manifest-signing-key')).resolves.toMatchObject({
        value: 'key-material',
      });
      await expect(adapters.kms.activeKey()).resolves.toMatchObject({ keyId: 'local-master' });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('builds Redis from configuration when a URL is set', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'worker-adapters-'));
    try {
      const adapters = createAdapters(
        config({
          KMS_LOCAL_KEYRING_PATH: join(dir, 'keyring.json'),
          REDIS_URL: 'redis://127.0.0.1:1',
        }),
      );
      expect(adapters.redis).toBeDefined();
      await adapters.redis?.close();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('selects SES for the email adapter', () => {
    const email = createEmailAdapter(
      config({ EMAIL_ADAPTER: 'ses', SES_REGION: 'eu-west-1', EMAIL_FROM: 'noreply@example.com' }),
    );
    expect(typeof email.send).toBe('function');
  });

  it('refuses SES without a region and the local adapters when deployed', () => {
    expect(() => createEmailAdapter({ ...config(), EMAIL_ADAPTER: 'ses' })).toThrow('SES_REGION');
    const deployed = { ...config(), DEPLOY_ENV: 'production' } as WorkerConfig;
    expect(() => createEmailAdapter(deployed)).toThrow('not allowed when DEPLOY_ENV=production');
    expect(() => createAdapters(deployed)).toThrow('not allowed when DEPLOY_ENV=production');
  });
});
