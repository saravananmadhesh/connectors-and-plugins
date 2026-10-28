/**
 * The blob contract against a real S3 bucket.
 *
 * Run deliberately: pnpm test:staging
 * Needs STAGING_S3_BUCKET and STAGING_S3_REGION; STAGING_S3_ENDPOINT is optional (an
 * S3-compatible service). Credentials come from the SDK default chain, which covers web
 * identity federation (AWS_WEB_IDENTITY_TOKEN_FILE and AWS_ROLE_ARN).
 */
import { createS3Blob } from '../../packages/adapters/src/s3/blob.js';
import { runBlobContract } from '../../packages/adapters/src/contract/blob.contract.js';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required staging environment variable ${name}`);
  return value;
}

const bucket = required('STAGING_S3_BUCKET');
const region = required('STAGING_S3_REGION');
const endpoint = process.env['STAGING_S3_ENDPOINT'];

runBlobContract(
  's3 (staging)',
  async () => {
    const blob = createS3Blob({
      region,
      bucket,
      ...(endpoint ? { endpoint } : {}),
      prefix: 'staging-contract/',
    });
    return { port: blob, cleanup: async () => blob.close() };
  },
  {
    unavailable: () =>
      createS3Blob({
        region,
        bucket,
        endpoint: 'http://127.0.0.1:1',
        forcePathStyle: true,
        credentials: { accessKeyId: 'unused', secretAccessKey: 'unused' },
        connectTimeoutMs: 500,
        requestTimeoutMs: 1000,
      }),
  },
);
