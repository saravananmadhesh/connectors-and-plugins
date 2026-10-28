/**
 * Google Secret Manager adapter. The SDK client is injectable so the request shapes and the
 * error mapping are tested without the service; SDK errors never leave this file.
 */
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import {
  SecretNotFoundError,
  SecretsUnavailableError,
  type SecretsPort,
} from '@boldcreate-integrations/ports';
import { pollSecret } from './watch.js';

/** The part of `SecretManagerServiceClient` this adapter uses. */
export interface SecretManagerClientLike {
  accessSecretVersion(request: { name: string }): Promise<
    readonly [
      {
        name?: string | null;
        payload?: { data?: Uint8Array | string | null } | null;
      },
      ...unknown[],
    ]
  >;
}

export interface GcpSecretManagerOptions {
  project: string;
  client?: SecretManagerClientLike | undefined;
}

const NOT_FOUND = 5;

function codeOf(error: unknown): number | undefined {
  const code = (error as { code?: unknown } | null)?.code;
  return typeof code === 'number' ? code : undefined;
}

export function mapSecretManagerError(error: unknown): Error {
  if (error instanceof SecretNotFoundError || error instanceof SecretsUnavailableError) {
    return error;
  }
  return codeOf(error) === NOT_FOUND ? new SecretNotFoundError() : new SecretsUnavailableError();
}

const SECRET_NAME = /^[A-Za-z0-9_-]{1,255}$/;
const VERSION = /^(latest|[1-9][0-9]{0,17})$/;

export function createGcpSecretManager(options: GcpSecretManagerOptions): SecretsPort {
  const client: SecretManagerClientLike =
    options.client ?? (new SecretManagerServiceClient() as unknown as SecretManagerClientLike);

  async function read(name: string, version = 'latest') {
    if (!SECRET_NAME.test(name) || !VERSION.test(version)) throw new SecretNotFoundError();
    try {
      const [response] = await client.accessSecretVersion({
        name: `projects/${options.project}/secrets/${name}/versions/${version}`,
      });
      const data = response.payload?.data;
      if (data === undefined || data === null) throw new SecretNotFoundError();
      const resolved = response.name?.split('/').pop();
      return {
        value: typeof data === 'string' ? data : Buffer.from(data).toString('utf8'),
        version: resolved && resolved !== 'latest' ? resolved : version,
      };
    } catch (error) {
      throw mapSecretManagerError(error);
    }
  }

  return {
    get: (name, version) => read(name, version),
    watch: (name, handler, opts) => pollSecret(() => read(name), handler, opts?.intervalSeconds),
  };
}
