import { createS3Blob } from './index.js';
import { runBlobContract } from '../contract/blob.contract.js';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required test environment variable ${name}`);
  return value;
}

const endpoint = required('TEST_S3_ENDPOINT');
const bucket = required('TEST_S3_BUCKET');
const credentials = {
  accessKeyId: required('TEST_S3_ACCESS_KEY_ID'),
  secretAccessKey: required('TEST_S3_SECRET_ACCESS_KEY'),
};

runBlobContract(
  's3',
  async () => {
    const blob = createS3Blob({
      endpoint,
      region: 'us-east-1',
      bucket,
      forcePathStyle: true,
      credentials,
    });
    return { port: blob, cleanup: async () => blob.close() };
  },
  {
    unavailable: () =>
      createS3Blob({
        endpoint: 'http://127.0.0.1:1',
        region: 'us-east-1',
        bucket,
        forcePathStyle: true,
        credentials,
        connectTimeoutMs: 500,
        requestTimeoutMs: 1000,
      }),
  },
);
