/**
 * The key management contract against a real Cloud KMS key.
 *
 * Run deliberately: pnpm test:staging
 * Needs STAGING_KMS_KEY_NAME, the full name of a symmetric encrypt/decrypt key
 * (projects/<p>/locations/<l>/keyRings/<r>/cryptoKeys/<k>), and application default credentials
 * that may encrypt and decrypt with it and read its versions.
 */
import { createCloudKms } from '../../packages/adapters/src/kms/cloud.js';
import { runKmsContract } from '../../packages/adapters/src/contract/kms.contract.js';

const keyName = process.env['STAGING_KMS_KEY_NAME'];
if (!keyName) throw new Error('Missing required staging environment variable STAGING_KMS_KEY_NAME');

runKmsContract('cloud kms (staging)', async () => ({
  port: createCloudKms({ keyName }),
  cleanup: async () => undefined,
}));
