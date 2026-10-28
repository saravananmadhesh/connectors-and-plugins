import {
  LOCAL_ONLY_ADAPTERS,
  assertAdapterAllowed,
  type DeployEnv,
} from '@boldcreate-integrations/config';
import type { KmsPort } from '@boldcreate-integrations/ports';
import { createCloudKms } from './cloud.js';
import { createLocalKms } from './local.js';

export interface KmsConfig {
  DEPLOY_ENV: DeployEnv;
  KMS_ADAPTER: 'local' | 'cloud-kms';
  KMS_LOCAL_KEYRING_PATH?: string | undefined;
  KMS_CLOUD_KEY_NAME?: string | undefined;
}

/**
 * The key management adapter named by configuration. The local adapter is refused when
 * deployed; a deployed adapter is one more case here.
 */
export function createKmsFromConfig(config: KmsConfig): KmsPort {
  switch (config.KMS_ADAPTER) {
    case 'local':
      assertAdapterAllowed(LOCAL_ONLY_ADAPTERS.kmsLocal, config.DEPLOY_ENV);
      if (!config.KMS_LOCAL_KEYRING_PATH) {
        throw new Error('KMS_LOCAL_KEYRING_PATH is required for the local KMS adapter');
      }
      return createLocalKms({ keyringPath: config.KMS_LOCAL_KEYRING_PATH });
    case 'cloud-kms':
      if (!config.KMS_CLOUD_KEY_NAME) {
        throw new Error('KMS_CLOUD_KEY_NAME is required for the cloud KMS adapter');
      }
      return createCloudKms({ keyName: config.KMS_CLOUD_KEY_NAME });
  }
}
