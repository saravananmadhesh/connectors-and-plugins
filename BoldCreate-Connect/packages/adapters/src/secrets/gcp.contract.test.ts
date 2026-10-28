import { describe, expect, it, vi } from 'vitest';
import { randomUUID } from 'node:crypto';
import { SecretNotFoundError, SecretsUnavailableError } from '@boldcreate-integrations/ports';
import {
  createGcpSecretManager,
  mapSecretManagerError,
  type SecretManagerClientLike,
} from './gcp.js';
import { runSecretsContract } from '../contract/secrets.contract.js';

class GrpcLikeError extends Error {
  constructor(readonly code: number) {
    super(`grpc status ${code}`);
  }
}

/** Secret Manager in memory: numbered versions, `latest`, and NOT_FOUND for anything unknown. */
function fakeSecretManager(project: string) {
  const store = new Map<string, string[]>();
  const requests: string[] = [];
  const client: SecretManagerClientLike = {
    async accessSecretVersion({ name }) {
      requests.push(name);
      const match = new RegExp(`^projects/${project}/secrets/([^/]+)/versions/([^/]+)$`).exec(name);
      const versions = match ? store.get(match[1]!) : undefined;
      if (!match || !versions) throw new GrpcLikeError(5);
      const number = match[2] === 'latest' ? versions.length : Number(match[2]);
      const value = versions[number - 1];
      if (value === undefined) throw new GrpcLikeError(5);
      return [
        {
          name: `projects/${project}/secrets/${match[1]}/versions/${number}`,
          payload: { data: Buffer.from(value) },
        },
      ];
    },
  };
  return {
    client,
    requests,
    add(name: string, value: string) {
      store.set(name, [...(store.get(name) ?? []), value]);
    },
  };
}

runSecretsContract('gcp secret manager (fake sdk client)', async () => {
  const fake = fakeSecretManager('p');
  return {
    port: createGcpSecretManager({ project: 'p', client: fake.client }),
    cleanup: async () => undefined,
    name: () => `contract-${randomUUID()}`,
    write: async (name, value) => fake.add(name, value),
  };
});

describe('gcp secret manager requests', () => {
  it('reads the latest version by default and resolves it to a number', async () => {
    const fake = fakeSecretManager('p');
    fake.add('signing-key', 'one');
    fake.add('signing-key', 'two');
    const secrets = createGcpSecretManager({ project: 'p', client: fake.client });
    expect(await secrets.get('signing-key')).toEqual({ value: 'two', version: '2' });
    expect(fake.requests).toEqual(['projects/p/secrets/signing-key/versions/latest']);
  });

  it('reads an explicit version', async () => {
    const fake = fakeSecretManager('p');
    fake.add('signing-key', 'one');
    fake.add('signing-key', 'two');
    const secrets = createGcpSecretManager({ project: 'p', client: fake.client });
    expect(await secrets.get('signing-key', '1')).toEqual({ value: 'one', version: '1' });
    expect(fake.requests).toEqual(['projects/p/secrets/signing-key/versions/1']);
  });

  it('does not build a request from a name or version that could change the path', async () => {
    const fake = fakeSecretManager('p');
    const secrets = createGcpSecretManager({ project: 'p', client: fake.client });
    await expect(secrets.get('a/b')).rejects.toBeInstanceOf(SecretNotFoundError);
    await expect(secrets.get('a', '1/../2')).rejects.toBeInstanceOf(SecretNotFoundError);
    expect(fake.requests).toEqual([]);
  });

  it('accepts text payloads and keeps the requested version when the response has no name', async () => {
    const secrets = createGcpSecretManager({
      project: 'p',
      client: { accessSecretVersion: async () => [{ payload: { data: 'text-value' } }] },
    });
    expect(await secrets.get('s', '3')).toEqual({ value: 'text-value', version: '3' });
  });

  it('treats a response without a payload as not found', async () => {
    const secrets = createGcpSecretManager({
      project: 'p',
      client: { accessSecretVersion: async () => [{ name: 'x/versions/1', payload: null }] },
    });
    await expect(secrets.get('s')).rejects.toBeInstanceOf(SecretNotFoundError);
  });
});

describe('gcp secret manager errors', () => {
  it.each([
    ['NOT_FOUND', 5, SecretNotFoundError],
    ['PERMISSION_DENIED', 7, SecretsUnavailableError],
    ['UNAVAILABLE', 14, SecretsUnavailableError],
    ['DEADLINE_EXCEEDED', 4, SecretsUnavailableError],
    ['UNAUTHENTICATED', 16, SecretsUnavailableError],
  ])('maps %s', async (_name, code, expected) => {
    const secrets = createGcpSecretManager({
      project: 'p',
      client: {
        accessSecretVersion: async () => {
          throw new GrpcLikeError(code);
        },
      },
    });
    await expect(secrets.get('s')).rejects.toBeInstanceOf(expected);
  });

  it('never leaks an SDK error', () => {
    expect(mapSecretManagerError(new Error('project number 123 denied')).message).toBe(
      'secrets unavailable',
    );
    expect(mapSecretManagerError(undefined)).toBeInstanceOf(SecretsUnavailableError);
  });

  it('builds a default client without calling the service', () => {
    expect(() => createGcpSecretManager({ project: 'p' })).not.toThrow();
  });
});

describe('gcp secret manager watch', () => {
  it('emits when the latest version changes and survives a failed read', async () => {
    const fake = fakeSecretManager('p');
    fake.add('s', 'one');
    let failNext = false;
    const secrets = createGcpSecretManager({
      project: 'p',
      client: {
        accessSecretVersion: (request) => {
          if (failNext) {
            failNext = false;
            return Promise.reject(new GrpcLikeError(14));
          }
          return fake.client.accessSecretVersion(request);
        },
      },
    });
    const seen: string[] = [];
    const stop = secrets.watch('s', (secret) => seen.push(`${secret.version}:${secret.value}`), {
      intervalSeconds: 0.05,
    });
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      failNext = true;
      fake.add('s', 'two');
      await vi.waitFor(() => expect(seen).toEqual(['2:two']), { timeout: 5000 });
    } finally {
      stop();
    }
  });
});
