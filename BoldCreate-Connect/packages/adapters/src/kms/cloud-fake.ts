/**
 * An in-memory stand-in for the Cloud KMS SDK client, for tests of the cloud adapter. It
 * behaves like the service where the adapter depends on it: ciphertext is bound to the AAD,
 * `decrypt` picks the version from the ciphertext, versions have states, and failures carry
 * gRPC status codes.
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import type { CloudKmsClientLike } from './cloud.js';

export const GRPC = {
  INVALID_ARGUMENT: 3,
  DEADLINE_EXCEEDED: 4,
  NOT_FOUND: 5,
  PERMISSION_DENIED: 7,
  FAILED_PRECONDITION: 9,
  UNAVAILABLE: 14,
} as const;

export class GrpcLikeError extends Error {
  constructor(readonly code: number) {
    super(`grpc status ${code}`);
  }
}

export interface FakeCloudKmsVersion {
  id: string;
  state: 'ENABLED' | 'DISABLED' | 'DESTROYED';
  key: Buffer;
}

export interface FakeCloudKms extends CloudKmsClientLike {
  readonly calls: { method: string; request: unknown }[];
  versions: FakeCloudKmsVersion[];
  primary: string;
  /** Makes every following call of the method fail with the status code. */
  failWith(method: keyof CloudKmsClientLike | '*', code: number | undefined): void;
  addVersion(): string;
}

export function createFakeCloudKms(keyName: string): FakeCloudKms {
  const calls: { method: string; request: unknown }[] = [];
  const failures = new Map<string, number>();
  const fake: FakeCloudKms = {
    calls,
    versions: [{ id: '1', state: 'ENABLED', key: randomBytes(32) }],
    primary: '1',
    failWith(method, code) {
      if (code === undefined) failures.delete(method);
      else failures.set(method, code);
    },
    addVersion() {
      const id = String(fake.versions.length + 1);
      fake.versions.push({ id, state: 'ENABLED', key: randomBytes(32) });
      fake.primary = id;
      return id;
    },
    async encrypt(request) {
      enter('encrypt', request);
      const primary = versionOf(fake.primary);
      const iv = randomBytes(12);
      const cipher = createCipheriv('aes-256-gcm', primary.key, iv);
      cipher.setAAD(Buffer.from(request.additionalAuthenticatedData));
      const body = Buffer.concat([cipher.update(request.plaintext), cipher.final()]);
      const ciphertext = Buffer.concat([
        Buffer.from(`${primary.id}:`),
        iv,
        cipher.getAuthTag(),
        body,
      ]);
      return [
        {
          name: `${keyName}/cryptoKeyVersions/${primary.id}`,
          ciphertext: new Uint8Array(ciphertext),
        },
      ];
    },
    async decrypt(request) {
      enter('decrypt', request);
      const buffer = Buffer.from(request.ciphertext);
      const separator = buffer.indexOf(':');
      const version = fake.versions.find(
        (item) => item.id === buffer.subarray(0, separator).toString(),
      );
      if (separator < 0 || !version || buffer.length < separator + 1 + 28) {
        throw new GrpcLikeError(GRPC.INVALID_ARGUMENT);
      }
      if (version.state !== 'ENABLED') throw new GrpcLikeError(GRPC.FAILED_PRECONDITION);
      const rest = buffer.subarray(separator + 1);
      try {
        const decipher = createDecipheriv('aes-256-gcm', version.key, rest.subarray(0, 12));
        decipher.setAAD(Buffer.from(request.additionalAuthenticatedData));
        decipher.setAuthTag(rest.subarray(12, 28));
        const plain = Buffer.concat([decipher.update(rest.subarray(28)), decipher.final()]);
        return [{ plaintext: new Uint8Array(plain) }];
      } catch {
        throw new GrpcLikeError(GRPC.INVALID_ARGUMENT);
      }
    },
    async getCryptoKey(request) {
      enter('getCryptoKey', request);
      requireKey(request.name);
      return [
        { primary: { name: `${keyName}/cryptoKeyVersions/${fake.primary}`, state: 'ENABLED' } },
      ];
    },
    async getCryptoKeyVersion(request) {
      enter('getCryptoKeyVersion', request);
      const version = versionOf(request.name.split('/').pop() ?? '');
      return [{ name: request.name, state: version.state }];
    },
    async listCryptoKeyVersions(request) {
      enter('listCryptoKeyVersions', request);
      requireKey(request.parent);
      return [
        fake.versions.map((item) => ({
          name: `${keyName}/cryptoKeyVersions/${item.id}`,
          state: item.state,
        })),
      ];
    },
  };

  function enter(method: string, request: unknown): void {
    calls.push({ method, request });
    const code = failures.get(method) ?? failures.get('*');
    if (code !== undefined) throw new GrpcLikeError(code);
  }

  function requireKey(name: string): void {
    if (name !== keyName) throw new GrpcLikeError(GRPC.NOT_FOUND);
  }

  function versionOf(id: string): FakeCloudKmsVersion {
    const version = fake.versions.find((item) => item.id === id);
    if (!version) throw new GrpcLikeError(GRPC.NOT_FOUND);
    return version;
  }

  return fake;
}
