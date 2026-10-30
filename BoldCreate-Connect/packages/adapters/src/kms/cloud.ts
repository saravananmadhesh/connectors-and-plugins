/**
 * Cloud KMS adapter over `@google-cloud/kms`. It wraps and unwraps data keys and describes the
 * key; it manages nothing else. The SDK client is injectable so request shapes and error
 * mapping are tested without the service, and SDK errors never leave this file.
 */
import { KeyManagementServiceClient } from '@google-cloud/kms';
import {
  KmsInvalidCiphertextError,
  KmsKeyDisabledError,
  KmsKeyNotFoundError,
  KmsUnavailableError,
  type KmsPort,
  type KmsVersionState,
} from '@boldcreate-integrations/ports';

type Bytes = Uint8Array | string | null | undefined;

interface VersionLike {
  name?: string | null;
  state?: string | number | null;
}

/** The part of `KeyManagementServiceClient` this adapter uses. */
export interface CloudKmsClientLike {
  encrypt(request: {
    name: string;
    plaintext: Uint8Array;
    additionalAuthenticatedData: Uint8Array;
  }): Promise<readonly [{ name?: string | null; ciphertext?: Bytes }, ...unknown[]]>;
  decrypt(request: {
    name: string;
    ciphertext: Uint8Array;
    additionalAuthenticatedData: Uint8Array;
  }): Promise<readonly [{ plaintext?: Bytes }, ...unknown[]]>;
  getCryptoKey(request: {
    name: string;
  }): Promise<readonly [{ primary?: VersionLike | null }, ...unknown[]]>;
  getCryptoKeyVersion(request: { name: string }): Promise<readonly [VersionLike, ...unknown[]]>;
  listCryptoKeyVersions(request: {
    parent: string;
  }): Promise<readonly [readonly VersionLike[], ...unknown[]]>;
}

export interface CloudKmsOptions {
  /** `projects/<p>/locations/<l>/keyRings/<r>/cryptoKeys/<k>` */
  keyName: string;
  client?: CloudKmsClientLike | undefined;
}

const CODES: Record<string, number> = {
  INVALID_ARGUMENT: 3,
  NOT_FOUND: 5,
  PERMISSION_DENIED: 7,
  FAILED_PRECONDITION: 9,
};

function codeOf(error: unknown): number | undefined {
  const code = (error as { code?: unknown } | null)?.code;
  if (typeof code === 'number') return code;
  return typeof code === 'string' ? CODES[code] : undefined;
}

type Operation = 'encrypt' | 'decrypt' | 'read';

/** Maps an SDK failure to a port error; anything that is not a definite answer is unavailable. */
export function mapKmsError(error: unknown, operation: Operation): Error {
  if (
    error instanceof KmsInvalidCiphertextError ||
    error instanceof KmsKeyDisabledError ||
    error instanceof KmsKeyNotFoundError ||
    error instanceof KmsUnavailableError
  ) {
    return error;
  }
  switch (codeOf(error)) {
    case CODES['NOT_FOUND']:
      return new KmsKeyNotFoundError();
    case CODES['PERMISSION_DENIED']:
    case CODES['FAILED_PRECONDITION']:
      return new KmsKeyDisabledError();
    case CODES['INVALID_ARGUMENT']:
      return operation === 'decrypt' ? new KmsInvalidCiphertextError() : new KmsUnavailableError();
    default:
      return new KmsUnavailableError();
  }
}

const STATE_BY_NUMBER: Record<number, KmsVersionState> = {
  2: 'enabled',
  4: 'destroyed',
  5: 'destroyed',
};

function stateOf(state: VersionLike['state']): KmsVersionState {
  if (typeof state === 'number') return STATE_BY_NUMBER[state] ?? 'disabled';
  if (state === 'ENABLED') return 'enabled';
  if (state === 'DESTROYED' || state === 'DESTROY_SCHEDULED') return 'destroyed';
  return 'disabled';
}

const versionIdOf = (name: string | null | undefined): string | undefined =>
  name?.split('/').pop() || undefined;

/** Plain bytes the caller owns: the SDK's Buffers can be views into a shared pool. */
const toBytes = (value: Bytes): Uint8Array =>
  new Uint8Array(
    typeof value === 'string' ? Buffer.from(value, 'base64') : (value ?? new Uint8Array()),
  );

export function createCloudKms(options: CloudKmsOptions): KmsPort {
  const keyName = options.keyName;
  const client: CloudKmsClientLike =
    options.client ?? (new KeyManagementServiceClient() as unknown as CloudKmsClientLike);

  const guard = async <T>(operation: Operation, call: () => Promise<T>): Promise<T> => {
    try {
      return await call();
    } catch (error) {
      throw mapKmsError(error, operation);
    }
  };

  const requireKey = (keyId: string) => {
    if (keyId !== keyName) throw new KmsKeyNotFoundError();
  };

  async function primaryVersion(): Promise<string> {
    const [key] = await client.getCryptoKey({ name: keyName });
    const version = versionIdOf(key.primary?.name);
    if (!version) throw new KmsKeyNotFoundError();
    return version;
  }

  return {
    activeKey: () =>
      guard('read', async () => ({ keyId: keyName, keyVersion: await primaryVersion() })),

    wrapKey: ({ plaintext, aad }) =>
      guard('encrypt', async () => {
        const [response] = await client.encrypt({
          name: keyName,
          plaintext,
          additionalAuthenticatedData: aad,
        });
        const wrapped = toBytes(response.ciphertext);
        if (wrapped.length === 0) throw new KmsUnavailableError();
        const keyVersion = versionIdOf(response.name) ?? (await primaryVersion());
        return { keyId: keyName, keyVersion, wrapped };
      }),

    unwrapKey: ({ keyId, keyVersion, wrapped, aad }) =>
      guard('decrypt', async () => {
        requireKey(keyId);
        // The key version recorded with the wrapped key decides whether it may still be used.
        const [version] = await client.getCryptoKeyVersion({
          name: `${keyName}/cryptoKeyVersions/${keyVersion}`,
        });
        const state = stateOf(version.state);
        if (state === 'disabled') throw new KmsKeyDisabledError();
        if (state === 'destroyed') throw new KmsKeyNotFoundError();
        const [response] = await client.decrypt({
          name: keyName,
          ciphertext: wrapped,
          additionalAuthenticatedData: aad,
        });
        return toBytes(response.plaintext);
      }),

    describeKey: (keyId) =>
      guard('read', async () => {
        requireKey(keyId);
        const primary = await primaryVersion();
        const [versions] = await client.listCryptoKeyVersions({ parent: keyName });
        return {
          keyId: keyName,
          primaryVersion: primary,
          versions: versions.flatMap((version) => {
            const id = versionIdOf(version.name);
            return id ? [{ version: id, state: stateOf(version.state) }] : [];
          }),
        };
      }),
  };
}
