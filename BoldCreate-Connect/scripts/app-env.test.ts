import { describe, expect, it } from 'vitest';
import { appEnv, roleDatabaseUrl, type AppEnvContext, type AppName } from './app-env.js';

const secrets: Record<string, string> = {
  WORKLOAD_SECRET: 'w',
  COOKIE_SECRET: 'c',
  CSRF_SECRET: 's',
  REDIS_PASSWORD: 'r',
  OBJECT_STORE_ROOT_USER: 'store-user',
  OBJECT_STORE_ROOT_PASSWORD: 'store-password',
  DB_ROLE_PASSWORD_API: 'pw-api',
  DB_ROLE_PASSWORD_WORKER: 'pw-worker',
  DB_ROLE_PASSWORD_ADMIN: 'pw-admin',
  DB_ROLE_PASSWORD_GATEWAY: 'pw-gateway',
};

const context: AppEnvContext = {
  secrets,
  databaseUrl: 'postgresql://app:superuser-password@localhost:54329/boldcreate',
  ports: {
    web: 1,
    admin: 2,
    api: 3,
    gateway: 4,
    workerHealth: 6,
    mailpitSmtp: 7,
    redis: 8,
  },
  objectStore: { port: 9, bucket: 'bucket' },
  deployEnv: 'test',
  keyringPath: 'keyring.json',
  secretsDir: 'secrets',
};

describe('roleDatabaseUrl', () => {
  it('keeps host, port and database and swaps in the role login', () => {
    expect(roleDatabaseUrl(context.databaseUrl, 'api', secrets)).toBe(
      'postgresql://app_api:pw-api@localhost:54329/boldcreate',
    );
  });

  it('fails for a role without a generated password', () => {
    expect(() => roleDatabaseUrl(context.databaseUrl, 'migrator', secrets)).toThrow(
      'DB_ROLE_PASSWORD_MIGRATOR',
    );
  });
});

describe('appEnv key management', () => {
  const kmsApps = ['api', 'gateway', 'worker'] as const satisfies AppName[];

  it.each(kmsApps)('uses the local keyring for %s by default', (app) => {
    const env = appEnv(app, context);
    expect(env['KMS_ADAPTER']).toBe('local');
    expect(env['KMS_LOCAL_KEYRING_PATH']).toBe('keyring.json');
    expect(env).not.toHaveProperty('KMS_CLOUD_KEY_NAME');
  });

  it.each(kmsApps)('uses Cloud KMS for %s when a key name is given', (app) => {
    const keyName = 'projects/p/locations/l/keyRings/r/cryptoKeys/k';
    const env = appEnv(app, { ...context, cloudKmsKeyName: keyName });
    expect(env['KMS_ADAPTER']).toBe('cloud-kms');
    expect(env['KMS_CLOUD_KEY_NAME']).toBe(keyName);
    expect(env).not.toHaveProperty('KMS_LOCAL_KEYRING_PATH');
  });
});

describe('appEnv database logins', () => {
  it.each(['admin', 'api', 'gateway', 'worker'] as const satisfies AppName[])(
    'gives %s its own role and never the superuser login',
    (app) => {
      const url = new URL(appEnv(app, context)['DATABASE_URL']!);
      expect(url.username).toBe(`app_${app}`);
      expect(url.password).toBe(`pw-${app}`);
      expect(url.toString()).not.toContain('superuser-password');
    },
  );

  it('gives the web app no database', () => {
    expect(appEnv('web', context)).not.toHaveProperty('DATABASE_URL');
  });
});

describe('appEnv through the pooler', () => {
  const pooled: AppEnvContext = { ...context, pooler: { port: 6432 } };

  it.each(['admin', 'api', 'gateway', 'worker'] as const satisfies AppName[])(
    'sends %s to the pooler with its own role login',
    (app) => {
      const url = new URL(appEnv(app, pooled)['DATABASE_URL']!);
      expect(url.hostname).toBe('127.0.0.1');
      expect(url.port).toBe('6432');
      expect(url.pathname).toBe('/boldcreate');
      expect(url.username).toBe(`app_${app}`);
      expect(url.password).toBe(`pw-${app}`);
      expect(url.toString()).not.toContain('superuser-password');
    },
  );

  it('keeps the direct address when no pooler is given', () => {
    expect(new URL(appEnv('api', context)['DATABASE_URL']!).port).toBe('54329');
    expect(new URL(appEnv('api', { ...context, pooler: undefined })['DATABASE_URL']!).port).toBe(
      '54329',
    );
  });

  it('still gives the web app no database', () => {
    expect(appEnv('web', pooled)).not.toHaveProperty('DATABASE_URL');
  });
});
