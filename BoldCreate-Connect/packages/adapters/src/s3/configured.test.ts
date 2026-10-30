import { afterEach, describe, expect, it } from 'vitest';
import { S3Client } from '@aws-sdk/client-s3';
import { createS3BlobFromConfig, s3OptionsFromConfig, type BlobConfig } from './configured.js';

const base: BlobConfig = {
  DEPLOY_ENV: 'local',
  BLOB_REGION: 'eu-west-1',
  BLOB_BUCKET: 'artifacts',
};
const withKeys = { BLOB_ACCESS_KEY_ID: 'id', BLOB_SECRET_ACCESS_KEY: 'key' };

describe('blob adapter configuration', () => {
  it('maps the keys to adapter options and leaves unset ones out', () => {
    expect(s3OptionsFromConfig(base)).toEqual({ region: 'eu-west-1', bucket: 'artifacts' });
    expect(
      s3OptionsFromConfig({
        ...base,
        BLOB_ENDPOINT: 'http://127.0.0.1:9000',
        BLOB_FORCE_PATH_STYLE: true,
        BLOB_PREFIX: 'x/',
        ...withKeys,
      }),
    ).toEqual({
      region: 'eu-west-1',
      bucket: 'artifacts',
      endpoint: 'http://127.0.0.1:9000',
      forcePathStyle: true,
      prefix: 'x/',
      credentials: { accessKeyId: 'id', secretAccessKey: 'key' },
    });
  });

  it.each(['staging', 'production'] as const)(
    'keeps a deployed environment to its own folder in the bucket (%s)',
    (DEPLOY_ENV) => {
      expect(s3OptionsFromConfig({ ...base, DEPLOY_ENV }).prefix).toBe(`${DEPLOY_ENV}/artifacts/`);
      expect(s3OptionsFromConfig({ ...base, DEPLOY_ENV, BLOB_PREFIX: '/x' }).prefix).toBe(
        `${DEPLOY_ENV}/x/`,
      );
    },
  );

  it.each(['local', 'test'] as const)('allows static credentials when %s', (DEPLOY_ENV) => {
    expect(s3OptionsFromConfig({ ...base, DEPLOY_ENV, ...withKeys }).credentials).toBeDefined();
  });

  it.each(['staging', 'production'] as const)(
    'refuses static credentials when %s',
    (DEPLOY_ENV) => {
      expect(() => s3OptionsFromConfig({ ...base, DEPLOY_ENV, ...withKeys })).toThrow(
        `blob adapter "static-credentials" is not allowed when DEPLOY_ENV=${DEPLOY_ENV}`,
      );
      expect(() => s3OptionsFromConfig({ ...base, DEPLOY_ENV, BLOB_ACCESS_KEY_ID: 'id' })).toThrow(
        'not allowed',
      );
    },
  );

  it('uses the default credential chain when deployed without static credentials', () => {
    expect(s3OptionsFromConfig({ ...base, DEPLOY_ENV: 'production' }).credentials).toBeUndefined();
  });

  it('requires both static credential keys', () => {
    expect(() => s3OptionsFromConfig({ ...base, BLOB_ACCESS_KEY_ID: 'id' })).toThrow(
      'set together',
    );
  });
});

describe('web identity federation', () => {
  const saved = {
    file: process.env['AWS_WEB_IDENTITY_TOKEN_FILE'],
    role: process.env['AWS_ROLE_ARN'],
  };
  afterEach(() => {
    for (const [name, value] of [
      ['AWS_WEB_IDENTITY_TOKEN_FILE', saved.file],
      ['AWS_ROLE_ARN', saved.role],
    ] as const) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  it('builds a client that resolves credentials lazily through the SDK default chain', () => {
    process.env['AWS_WEB_IDENTITY_TOKEN_FILE'] = '/var/run/secrets/token';
    process.env['AWS_ROLE_ARN'] = 'arn:aws:iam::123456789012:role/blob';
    const blob = createS3BlobFromConfig({ ...base, DEPLOY_ENV: 'production' });
    expect(typeof blob.close).toBe('function');
    expect(new S3Client({ region: 'eu-west-1' }).config.credentials).toBeTypeOf('function');
    blob.close();
  });
});
