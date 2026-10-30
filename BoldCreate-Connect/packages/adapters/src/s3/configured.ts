import {
  LOCAL_ONLY_ADAPTERS,
  assertAdapterAllowed,
  type DeployEnv,
} from '@boldcreate-integrations/config';
import { createS3Blob, type S3BlobOptions } from './blob.js';

export interface BlobConfig {
  DEPLOY_ENV: DeployEnv;
  BLOB_ENDPOINT?: string | undefined;
  BLOB_REGION: string;
  BLOB_BUCKET: string;
  BLOB_FORCE_PATH_STYLE?: boolean | undefined;
  BLOB_PREFIX?: string | undefined;
  BLOB_ACCESS_KEY_ID?: string | undefined;
  BLOB_SECRET_ACCESS_KEY?: string | undefined;
}

/**
 * Where objects go in the bucket. A deployed environment always keeps to its own folder, so
 * staging and production can share a bucket without sharing a key: `staging/artifacts/` and
 * `production/artifacts/`. A configured prefix goes under that folder. Local and test keep the
 * plain prefix.
 */
export function blobPrefix(
  config: Pick<BlobConfig, 'DEPLOY_ENV' | 'BLOB_PREFIX'>,
): string | undefined {
  const own = config.BLOB_PREFIX
    ? config.BLOB_PREFIX.replace(/^\/+/, '').replace(/\/*$/, '/')
    : undefined;
  if (config.DEPLOY_ENV === 'staging' || config.DEPLOY_ENV === 'production') {
    return `${config.DEPLOY_ENV}/${own ?? 'artifacts/'}`;
  }
  return own;
}

/**
 * Static credentials are for local object stores only and are refused when deployed. Without
 * them the SDK default chain decides, which includes web identity federation when
 * `AWS_WEB_IDENTITY_TOKEN_FILE` and `AWS_ROLE_ARN` are set.
 */
export function s3OptionsFromConfig(config: BlobConfig): S3BlobOptions {
  const hasStatic =
    config.BLOB_ACCESS_KEY_ID !== undefined || config.BLOB_SECRET_ACCESS_KEY !== undefined;
  if (hasStatic) {
    assertAdapterAllowed(LOCAL_ONLY_ADAPTERS.blobStaticCredentials, config.DEPLOY_ENV);
    if (!config.BLOB_ACCESS_KEY_ID || !config.BLOB_SECRET_ACCESS_KEY) {
      throw new Error(
        'BLOB_ACCESS_KEY_ID and BLOB_SECRET_ACCESS_KEY are set together or not at all',
      );
    }
  }
  return {
    region: config.BLOB_REGION,
    bucket: config.BLOB_BUCKET,
    ...(config.BLOB_ENDPOINT ? { endpoint: config.BLOB_ENDPOINT } : {}),
    ...(config.BLOB_FORCE_PATH_STYLE === undefined
      ? {}
      : { forcePathStyle: config.BLOB_FORCE_PATH_STYLE }),
    ...(blobPrefix(config) ? { prefix: blobPrefix(config)! } : {}),
    ...(hasStatic
      ? {
          credentials: {
            accessKeyId: config.BLOB_ACCESS_KEY_ID!,
            secretAccessKey: config.BLOB_SECRET_ACCESS_KEY!,
          },
        }
      : {}),
  };
}

export function createS3BlobFromConfig(config: BlobConfig) {
  return createS3Blob(s3OptionsFromConfig(config));
}
