/**
 * Harness that runs the secrets contract against the real Secret Manager of a project. It
 * creates the secrets the suite uses and deletes them afterwards.
 */
import { randomUUID } from 'node:crypto';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { createGcpSecretManager } from '../secrets/gcp.js';
import type { SecretsHarness } from './secrets.contract.js';

const ALREADY_EXISTS = 6;

export async function makeGcpSecretsHarness(project: string): Promise<SecretsHarness> {
  const admin = new SecretManagerServiceClient();
  const created = new Set<string>();
  const parent = `projects/${project}`;
  return {
    port: createGcpSecretManager({ project }),
    name: () => `contract-${randomUUID()}`,
    async write(name, value) {
      if (!created.has(name)) {
        try {
          await admin.createSecret({
            parent,
            secretId: name,
            secret: { replication: { automatic: {} } },
          });
        } catch (error) {
          if ((error as { code?: number }).code !== ALREADY_EXISTS) throw error;
        }
        created.add(name);
      }
      await admin.addSecretVersion({
        parent: `${parent}/secrets/${name}`,
        payload: { data: Buffer.from(value) },
      });
    },
    async cleanup() {
      for (const name of created) {
        await admin.deleteSecret({ name: `${parent}/secrets/${name}` }).catch(() => undefined);
      }
      await admin.close();
    },
  };
}
