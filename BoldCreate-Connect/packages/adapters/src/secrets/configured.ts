import {
  LOCAL_ONLY_ADAPTERS,
  assertAdapterAllowed,
  type DeployEnv,
} from '@boldcreate-integrations/config';
import type { SecretsPort } from '@boldcreate-integrations/ports';
import { createGcpSecretManager } from './gcp.js';
import { createLocalSecrets } from './local.js';

export interface SecretsConfig {
  DEPLOY_ENV: DeployEnv;
  SECRETS_ADAPTER: 'local' | 'gcp-secret-manager';
  SECRETS_LOCAL_DIR?: string | undefined;
  GCP_PROJECT_ID?: string | undefined;
}

/** The secrets adapter named by configuration; the local one is refused when deployed. */
export function createSecretsFromConfig(config: SecretsConfig): SecretsPort {
  switch (config.SECRETS_ADAPTER) {
    case 'local':
      assertAdapterAllowed(LOCAL_ONLY_ADAPTERS.secretsLocal, config.DEPLOY_ENV);
      return createLocalSecrets({ dir: config.SECRETS_LOCAL_DIR });
    case 'gcp-secret-manager':
      if (!config.GCP_PROJECT_ID) {
        throw new Error('GCP_PROJECT_ID is required for the Secret Manager adapter');
      }
      return createGcpSecretManager({ project: config.GCP_PROJECT_ID });
  }
}
