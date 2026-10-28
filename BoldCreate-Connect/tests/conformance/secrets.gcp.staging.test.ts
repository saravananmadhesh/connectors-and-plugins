/**
 * The secrets contract against a real Secret Manager.
 *
 * Run deliberately: pnpm test:staging
 * Needs STAGING_GCP_PROJECT_ID, a project where the application default credentials may create,
 * access and delete secrets. The suite deletes the secrets it creates.
 */
import { makeGcpSecretsHarness } from '../../packages/adapters/src/contract/secrets.gcp-harness.js';
import { runSecretsContract } from '../../packages/adapters/src/contract/secrets.contract.js';

const project = process.env['STAGING_GCP_PROJECT_ID'];
if (!project) {
  throw new Error('Missing required staging environment variable STAGING_GCP_PROJECT_ID');
}

runSecretsContract('gcp secret manager (staging)', () => makeGcpSecretsHarness(project));
