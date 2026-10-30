import { describe, expect, it } from 'vitest';
import {
  KmsInvalidCiphertextError,
  KmsKeyDisabledError,
  KmsKeyNotFoundError,
  KmsUnavailableError,
} from '@boldcreate-integrations/ports';
import { createCloudKms, mapKmsError } from './cloud.js';
import { GRPC, GrpcLikeError, createFakeCloudKms } from './cloud-fake.js';

const KEY = 'projects/p/locations/l/keyRings/r/cryptoKeys/k';
const bytes = (text: string) => new TextEncoder().encode(text);
const plaintext = new Uint8Array(32).map((_, index) => index);

function setup() {
  const fake = createFakeCloudKms(KEY);
  return { fake, kms: createCloudKms({ keyName: KEY, client: fake }) };
}

describe('cloud kms request shapes', () => {
  it('passes the plaintext and AAD to encrypt and records the version that was used', async () => {
    const { fake, kms } = setup();
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('ctx') });
    expect(fake.calls[0]).toEqual({
      method: 'encrypt',
      request: { name: KEY, plaintext, additionalAuthenticatedData: bytes('ctx') },
    });
    expect(wrapped).toMatchObject({ keyId: KEY, keyVersion: '1' });
  });

  it('returns plain bytes the caller owns, never the SDK buffer', async () => {
    const { kms } = setup();
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('ctx') });
    const key = await kms.unwrapKey({ ...wrapped, aad: bytes('ctx') });
    expect(Buffer.isBuffer(key)).toBe(false);
    expect(key.byteOffset).toBe(0);
    expect(key.buffer.byteLength).toBe(key.length);
  });

  it('checks the recorded version, then decrypts on the key with the AAD', async () => {
    const { fake, kms } = setup();
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('ctx') });
    fake.calls.length = 0;
    await expect(kms.unwrapKey({ ...wrapped, aad: bytes('ctx') })).resolves.toEqual(plaintext);
    expect(fake.calls.map((call) => call.method)).toEqual(['getCryptoKeyVersion', 'decrypt']);
    expect(fake.calls[0]?.request).toEqual({ name: `${KEY}/cryptoKeyVersions/1` });
    expect(fake.calls[1]?.request).toMatchObject({
      name: KEY,
      additionalAuthenticatedData: bytes('ctx'),
    });
  });

  it('keeps opening an older version after the primary moves and wraps with the new one', async () => {
    const { fake, kms } = setup();
    const old = await kms.wrapKey({ plaintext, aad: bytes('a') });
    const next = fake.addVersion();
    const fresh = await kms.wrapKey({ plaintext, aad: bytes('a') });
    expect(fresh.keyVersion).toBe(next);
    await expect(kms.unwrapKey({ ...old, aad: bytes('a') })).resolves.toEqual(plaintext);
    await expect(kms.activeKey()).resolves.toEqual({ keyId: KEY, keyVersion: next });
  });

  it('describes the key with the state of every version', async () => {
    const { fake, kms } = setup();
    fake.addVersion();
    fake.versions[0]!.state = 'DISABLED';
    fake.addVersion();
    fake.versions[1]!.state = 'DESTROYED';
    await expect(kms.describeKey(KEY)).resolves.toEqual({
      keyId: KEY,
      primaryVersion: '3',
      versions: [
        { version: '1', state: 'disabled' },
        { version: '2', state: 'destroyed' },
        { version: '3', state: 'enabled' },
      ],
    });
  });

  it('reads numeric version states', async () => {
    const { fake, kms } = setup();
    fake.listCryptoKeyVersions = async () => [
      [
        { name: `${KEY}/cryptoKeyVersions/1`, state: 2 },
        { name: `${KEY}/cryptoKeyVersions/2`, state: 3 },
        { name: `${KEY}/cryptoKeyVersions/3`, state: 5 },
        { name: null, state: 2 },
      ],
    ];
    const described = await kms.describeKey(KEY);
    expect(described.versions).toEqual([
      { version: '1', state: 'enabled' },
      { version: '2', state: 'disabled' },
      { version: '3', state: 'destroyed' },
    ]);
  });

  it('accepts base64 text from the SDK', async () => {
    const { fake, kms } = setup();
    fake.encrypt = async () => [
      { name: `${KEY}/cryptoKeyVersions/4`, ciphertext: Buffer.from('abc').toString('base64') },
    ];
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('a') });
    expect(Buffer.from(wrapped.wrapped).toString()).toBe('abc');
    expect(wrapped.keyVersion).toBe('4');
  });

  it('falls back to the primary version when encrypt does not name one', async () => {
    const { fake, kms } = setup();
    fake.encrypt = async () => [{ ciphertext: new Uint8Array([1, 2, 3]) }];
    await expect(kms.wrapKey({ plaintext, aad: bytes('a') })).resolves.toMatchObject({
      keyVersion: '1',
    });
  });

  it('treats an empty ciphertext as unavailable', async () => {
    const { fake, kms } = setup();
    fake.encrypt = async () => [{ ciphertext: null }];
    await expect(kms.wrapKey({ plaintext, aad: bytes('a') })).rejects.toBeInstanceOf(
      KmsUnavailableError,
    );
  });
});

describe('cloud kms version states and ids', () => {
  it('fails closed on a disabled version and reports a destroyed one as not found', async () => {
    const { fake, kms } = setup();
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('a') });
    fake.versions[0]!.state = 'DISABLED';
    await expect(kms.unwrapKey({ ...wrapped, aad: bytes('a') })).rejects.toBeInstanceOf(
      KmsKeyDisabledError,
    );
    fake.versions[0]!.state = 'DESTROYED';
    await expect(kms.unwrapKey({ ...wrapped, aad: bytes('a') })).rejects.toBeInstanceOf(
      KmsKeyNotFoundError,
    );
  });

  it('rejects another key id without calling the service', async () => {
    const { fake, kms } = setup();
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('a') });
    fake.calls.length = 0;
    await expect(
      kms.unwrapKey({ ...wrapped, keyId: 'other', aad: bytes('a') }),
    ).rejects.toBeInstanceOf(KmsKeyNotFoundError);
    await expect(kms.describeKey('other')).rejects.toBeInstanceOf(KmsKeyNotFoundError);
    expect(fake.calls).toEqual([]);
  });

  it('reports a key without a primary version as not found', async () => {
    const { fake, kms } = setup();
    fake.getCryptoKey = async () => [{ primary: null }];
    await expect(kms.activeKey()).rejects.toBeInstanceOf(KmsKeyNotFoundError);
  });
});

describe('cloud kms error mapping', () => {
  it.each([
    ['NOT_FOUND', GRPC.NOT_FOUND, KmsKeyNotFoundError],
    ['PERMISSION_DENIED', GRPC.PERMISSION_DENIED, KmsKeyDisabledError],
    ['FAILED_PRECONDITION', GRPC.FAILED_PRECONDITION, KmsKeyDisabledError],
    ['UNAVAILABLE', GRPC.UNAVAILABLE, KmsUnavailableError],
    ['DEADLINE_EXCEEDED', GRPC.DEADLINE_EXCEEDED, KmsUnavailableError],
  ])('maps %s on every operation', async (_name, code, expected) => {
    const { fake, kms } = setup();
    const wrapped = await kms.wrapKey({ plaintext, aad: bytes('a') });
    fake.failWith('*', code);
    await expect(kms.wrapKey({ plaintext, aad: bytes('a') })).rejects.toBeInstanceOf(expected);
    await expect(kms.unwrapKey({ ...wrapped, aad: bytes('a') })).rejects.toBeInstanceOf(expected);
    await expect(kms.activeKey()).rejects.toBeInstanceOf(expected);
    await expect(kms.describeKey(KEY)).rejects.toBeInstanceOf(expected);
  });

  it('maps an invalid argument to an invalid ciphertext only when decrypting', () => {
    const error = new GrpcLikeError(GRPC.INVALID_ARGUMENT);
    expect(mapKmsError(error, 'decrypt')).toBeInstanceOf(KmsInvalidCiphertextError);
    expect(mapKmsError(error, 'encrypt')).toBeInstanceOf(KmsUnavailableError);
  });

  it('reads status names and treats unknown failures as unavailable without leaking them', () => {
    expect(mapKmsError({ code: 'NOT_FOUND' }, 'read')).toBeInstanceOf(KmsKeyNotFoundError);
    expect(mapKmsError({ code: 'SOMETHING' }, 'read')).toBeInstanceOf(KmsUnavailableError);
    expect(mapKmsError(new Error('sdk detail'), 'read').message).toBe('kms unavailable');
    expect(mapKmsError(null, 'read')).toBeInstanceOf(KmsUnavailableError);
  });

  it('passes port errors through', () => {
    const error = new KmsKeyDisabledError();
    expect(mapKmsError(error, 'read')).toBe(error);
  });
});
