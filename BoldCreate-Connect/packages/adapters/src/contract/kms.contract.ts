import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import {
  KmsInvalidCiphertextError,
  KmsKeyNotFoundError,
  type KmsPort,
} from '@boldcreate-integrations/ports';
import type { ContractFactory, ContractHarness } from './harness.js';

const bytes = (text: string) => new TextEncoder().encode(text);

/** Behaviour every `KmsPort` adapter must have (key rotation and fault injection are adapter specific). */
export function runKmsContract(label: string, make: ContractFactory<KmsPort>): void {
  describe(`kms contract: ${label}`, () => {
    let harness: ContractHarness<KmsPort>;
    let kms: KmsPort;
    beforeAll(async () => {
      harness = await make();
      kms = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('round-trips a 32-byte key', async () => {
      const plaintext = new Uint8Array(32).map((_, index) => index);
      const wrapped = await kms.wrapKey({ plaintext, aad: bytes('ctx') });
      expect(wrapped.wrapped).not.toEqual(plaintext);
      const unwrapped = await kms.unwrapKey({ ...wrapped, aad: bytes('ctx') });
      expect(unwrapped).toEqual(plaintext);
    });

    it('rejects a different AAD', async () => {
      const wrapped = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
      await expect(kms.unwrapKey({ ...wrapped, aad: bytes('b') })).rejects.toBeInstanceOf(
        KmsInvalidCiphertextError,
      );
    });

    it('rejects tampered ciphertext', async () => {
      const wrapped = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
      const tampered = wrapped.wrapped.slice();
      tampered[tampered.length - 1] = tampered[tampered.length - 1]! ^ 1;
      await expect(
        kms.unwrapKey({ ...wrapped, wrapped: tampered, aad: bytes('a') }),
      ).rejects.toBeInstanceOf(KmsInvalidCiphertextError);
    });

    it('rejects an unknown key id and an unknown version', async () => {
      const wrapped = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
      await expect(
        kms.unwrapKey({ ...wrapped, keyId: 'nope', aad: bytes('a') }),
      ).rejects.toBeInstanceOf(KmsKeyNotFoundError);
      await expect(
        kms.unwrapKey({ ...wrapped, keyVersion: 'v999', aad: bytes('a') }),
      ).rejects.toBeInstanceOf(KmsKeyNotFoundError);
    });

    it('reports the active key and its versions', async () => {
      const active = await kms.activeKey();
      const description = await kms.describeKey(active.keyId);
      expect(description.primaryVersion).toBe(active.keyVersion);
      expect(description.versions.some((version) => version.version === active.keyVersion)).toBe(
        true,
      );
    });
  });
}
