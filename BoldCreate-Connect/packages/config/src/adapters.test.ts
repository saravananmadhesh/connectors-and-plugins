import { describe, expect, it } from 'vitest';
import * as z from 'zod/v4';
import { DeployEnvSchema } from './deploy-env.js';
import {
  blobShape,
  emailShape,
  kmsShape,
  redisAuthShape,
  refineAdapterKeys,
  refineLocalAdapters,
  secretsShape,
} from './shared.js';

const Schema = z
  .object({
    DEPLOY_ENV: DeployEnvSchema,
    REDIS_URL: z.string().optional(),
    ...kmsShape,
    ...secretsShape,
    ...emailShape,
    ...redisAuthShape,
    ...blobShape,
  })
  .superRefine((value, ctx) => {
    refineLocalAdapters(value, ctx);
    refineAdapterKeys(value, ctx);
  });

const deployedCloud = {
  DEPLOY_ENV: 'production',
  BLOB_BUCKET: 'artifacts',
  KMS_ADAPTER: 'cloud-kms',
  KMS_CLOUD_KEY_NAME: 'projects/p/locations/l/keyRings/r/cryptoKeys/k',
  SECRETS_ADAPTER: 'gcp-secret-manager',
  GCP_PROJECT_ID: 'p',
  EMAIL_ADAPTER: 'ses',
  SES_REGION: 'eu-west-1',
  REDIS_URL: 'rediss://cache:6380',
};

const issues = (env: Record<string, string>) => {
  const result = Schema.safeParse(env);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join('.'));
};

describe('adapter configuration', () => {
  it('defaults to the local adapters and accepts them when not deployed', () => {
    const parsed = Schema.parse({ BLOB_BUCKET: 'artifacts' });
    expect(parsed).toMatchObject({
      KMS_ADAPTER: 'local',
      SECRETS_ADAPTER: 'local',
      EMAIL_ADAPTER: 'mailpit',
      BLOB_REGION: 'us-east-1',
      BLOB_FORCE_PATH_STYLE: false,
    });
  });

  it('accepts the cloud adapters when deployed', () => {
    expect(issues(deployedCloud)).toEqual([]);
  });

  it.each(['staging', 'production'])('refuses every local-only adapter when %s', (DEPLOY_ENV) => {
    const found = issues({
      DEPLOY_ENV,
      BLOB_BUCKET: 'artifacts',
      BLOB_ACCESS_KEY_ID: 'id',
      BLOB_SECRET_ACCESS_KEY: 'a-real-looking-key',
      REDIS_URL: 'redis://cache:6379',
      KMS_ADAPTER: 'local',
      SECRETS_ADAPTER: 'local',
      EMAIL_ADAPTER: 'mailpit',
    });
    expect(found.sort()).toEqual([
      'BLOB_ACCESS_KEY_ID',
      'BLOB_SECRET_ACCESS_KEY',
      'EMAIL_ADAPTER',
      'KMS_ADAPTER',
      'REDIS_URL',
      'SECRETS_ADAPTER',
    ]);
  });

  it.each(['local', 'test'])('allows the local adapters when %s', (DEPLOY_ENV) => {
    expect(
      issues({
        DEPLOY_ENV,
        BLOB_BUCKET: 'artifacts',
        BLOB_ACCESS_KEY_ID: 'id',
        BLOB_SECRET_ACCESS_KEY: 'a-real-looking-key',
        REDIS_URL: 'redis://cache:6379',
      }),
    ).toEqual([]);
  });

  it('requires the key of each cloud adapter', () => {
    expect(
      issues({
        DEPLOY_ENV: 'production',
        BLOB_BUCKET: 'artifacts',
        KMS_ADAPTER: 'cloud-kms',
        SECRETS_ADAPTER: 'gcp-secret-manager',
        EMAIL_ADAPTER: 'ses',
      }).sort(),
    ).toEqual(['GCP_PROJECT_ID', 'KMS_CLOUD_KEY_NAME', 'SES_REGION']);
  });

  it('rejects unknown adapter names and placeholder passwords', () => {
    expect(issues({ ...deployedCloud, KMS_ADAPTER: 'aws-kms' })).toContain('KMS_ADAPTER');
    expect(issues({ ...deployedCloud, SECRETS_ADAPTER: 'vault' })).toContain('SECRETS_ADAPTER');
    expect(issues({ ...deployedCloud, EMAIL_ADAPTER: 'sendgrid' })).toContain('EMAIL_ADAPTER');
    expect(issues({ ...deployedCloud, EMAIL_ADAPTER: 'smtp' }).sort()).toEqual([
      'SMTP_HOST',
      'SMTP_PASS',
      'SMTP_USER',
    ]);
    expect(issues({ ...deployedCloud, REDIS_PASSWORD: 'changeme' })).toContain('REDIS_PASSWORD');
  });

  it('reads the managed Redis keys and the object storage flag', () => {
    const parsed = Schema.parse({
      ...deployedCloud,
      REDIS_USERNAME: 'svc',
      REDIS_PASSWORD: 'a-real-looking-password',
      REDIS_TLS_CA: '/etc/redis/ca.pem',
      BLOB_FORCE_PATH_STYLE: 'true',
    });
    expect(parsed).toMatchObject({
      REDIS_USERNAME: 'svc',
      REDIS_TLS_CA: '/etc/redis/ca.pem',
      BLOB_FORCE_PATH_STYLE: true,
    });
  });
});
