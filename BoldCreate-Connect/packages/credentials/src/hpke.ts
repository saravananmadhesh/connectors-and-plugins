/**
 * HPKE base mode with DHKEM(X25519, HKDF-SHA256), HKDF-SHA256 and AES-256-GCM (RFC 9180).
 *
 * Keys are raw 32-byte X25519 keys. The info string is fixed so a ciphertext sealed for this
 * system cannot be opened by another HPKE user of the same key.
 */
import { Aes256Gcm, CipherSuite, HkdfSha256 } from '@hpke/core';
import type { AeadInterface } from '@hpke/core';
import { DhkemX25519HkdfSha256 } from '@hpke/dhkem-x25519';

export const HPKE_INFO = new TextEncoder().encode('boldcreate/seal/v1');
export const HPKE_KEY_BYTES = 32;
export const HPKE_ENC_BYTES = 32;
export const HPKE_TAG_BYTES = 16;

/** The suite with the given AEAD; the default is the one used for sealing. */
export function createHpkeSuite(aead: AeadInterface = new Aes256Gcm()): CipherSuite {
  return new CipherSuite({ kem: new DhkemX25519HkdfSha256(), kdf: new HkdfSha256(), aead });
}

const suite = createHpkeSuite();

export interface HpkeSealed {
  enc: Uint8Array;
  ciphertext: Uint8Array;
}

export async function hpkeSeal(input: {
  publicKey: Uint8Array;
  plaintext: Uint8Array;
  aad: Uint8Array;
}): Promise<HpkeSealed> {
  const recipientPublicKey = await suite.kem.deserializePublicKey(input.publicKey);
  const sealed = await suite.seal(
    { recipientPublicKey, info: HPKE_INFO },
    input.plaintext,
    input.aad,
  );
  return { enc: new Uint8Array(sealed.enc), ciphertext: new Uint8Array(sealed.ct) };
}

export async function hpkeOpen(input: {
  privateKey: Uint8Array;
  enc: Uint8Array;
  ciphertext: Uint8Array;
  aad: Uint8Array;
}): Promise<Uint8Array> {
  const recipientKey = await suite.kem.deserializePrivateKey(input.privateKey);
  const plain = await suite.open(
    { recipientKey, enc: input.enc, info: HPKE_INFO },
    input.ciphertext,
    input.aad,
  );
  return new Uint8Array(plain);
}
