import { describe, expect, it } from 'vitest';
import { Aes128Gcm } from '@hpke/core';
import { HPKE_INFO, createHpkeSuite, hpkeOpen, hpkeSeal } from './hpke.js';
import { generateOrgKeyPair } from './org-key-pair.js';
import { fromBase64Url } from './envelope.js';

const hex = (text: string): Uint8Array =>
  new Uint8Array(Buffer.from(text.replaceAll(/\s/g, ''), 'hex'));
const toHex = (buffer: ArrayBuffer | Uint8Array): string =>
  Buffer.from(buffer as Uint8Array).toString('hex');
const bytes = (text: string) => new TextEncoder().encode(text);

// RFC 9180 appendix A.1.1: DHKEM(X25519, HKDF-SHA256), HKDF-SHA256, AES-128-GCM, base mode.
const vector = {
  info: hex('4f6465206f6e2061204772656369616e2055726e'),
  ikmE: hex('7268600d403fce431561aef583ee1613527cff655c1343f29812e66706df3234'),
  pkRm: hex('3948cfe0ad1ddb695d780e59077195da6c56506b027329794ab02bca80815c4d'),
  skRm: hex('4612c550263fc8ad58375df3f557aac531d26850903e55a9f23f21d8534e8ac8'),
  enc: '37fda3567bdbd628e88668c3c8d7e97d1d1253b6d4ea6d44c150f741f1bf4431',
  sharedSecret: 'fe0e18c9f024ce43799ae393c7e8fe8fce9d218875e8227b0187c04e7d2ea1fc', // FIXTURE_ published test vector
  exported: '3853fe2b4035195a573ffc53856e77058e15d9ea064de3e59f4961d0095250ee',
  plaintext: hex('4265617574792069732074727574682c20747275746820626561757479'),
  aad: hex('436f756e742d30'),
  ciphertext:
    'f938558b5d72f1a23810b4be2ab4f84331acc02fc97babc53a52ae8218a355a96d8770ac83d07bea87e13c512a',
};

describe('hpke known answers (RFC 9180 A.1.1)', () => {
  const suite = createHpkeSuite(new Aes128Gcm());

  it('derives the vector enc and shared secret from the ephemeral key material', async () => {
    const recipientPublicKey = await suite.kem.deserializePublicKey(vector.pkRm);
    const encapsulated = await suite.kem.encap({
      recipientPublicKey,
      ekm: vector.ikmE,
      info: vector.info,
    });
    expect(toHex(encapsulated.enc)).toBe(vector.enc);
    expect(toHex(encapsulated.sharedSecret)).toBe(vector.sharedSecret);
  });

  it('reproduces the key schedule outputs and the first ciphertext', async () => {
    const recipientPublicKey = await suite.kem.deserializePublicKey(vector.pkRm);
    const sender = await suite.createSenderContext({
      recipientPublicKey,
      ekm: vector.ikmE,
      info: vector.info,
    });
    expect(toHex(sender.enc)).toBe(vector.enc);
    expect(toHex(await sender.export(new Uint8Array(0), 32))).toBe(vector.exported);
    expect(toHex(await sender.seal(vector.plaintext, vector.aad))).toBe(vector.ciphertext);
  });

  it('opens the vector ciphertext with the recipient private key', async () => {
    const recipientKey = await suite.kem.deserializePrivateKey(vector.skRm);
    const recipient = await suite.createRecipientContext({
      recipientKey,
      enc: hex(vector.enc),
      info: vector.info,
    });
    const plain = await recipient.open(hex(vector.ciphertext), vector.aad);
    expect(toHex(plain)).toBe(toHex(vector.plaintext));
  });
});

describe('hpke with the sealing suite', () => {
  it('round-trips and uses the fixed info string', async () => {
    const pair = await generateOrgKeyPair();
    const publicKey = fromBase64Url(pair.publicKey);
    const sealed = await hpkeSeal({ publicKey, plaintext: bytes('secret'), aad: bytes('ctx') });
    expect(sealed.enc).toHaveLength(32);
    const plain = await hpkeOpen({ privateKey: pair.privateKey, ...sealed, aad: bytes('ctx') });
    expect(new TextDecoder().decode(plain)).toBe('secret');
    expect(new TextDecoder().decode(HPKE_INFO)).toBe('boldcreate/seal/v1');
  });

  it('produces different output for two seals of the same plaintext', async () => {
    const pair = await generateOrgKeyPair();
    const publicKey = fromBase64Url(pair.publicKey);
    const first = await hpkeSeal({ publicKey, plaintext: bytes('same'), aad: bytes('a') });
    const second = await hpkeSeal({ publicKey, plaintext: bytes('same'), aad: bytes('a') });
    expect(toHex(first.enc)).not.toBe(toHex(second.enc));
    expect(toHex(first.ciphertext)).not.toBe(toHex(second.ciphertext));
  });

  it('fails to open after a flipped bit in enc or in the ciphertext', async () => {
    const pair = await generateOrgKeyPair();
    const sealed = await hpkeSeal({
      publicKey: fromBase64Url(pair.publicKey),
      plaintext: bytes('secret'),
      aad: bytes('a'),
    });
    const flipped = (value: Uint8Array) => {
      const copy = value.slice();
      copy[0] = copy[0]! ^ 1;
      return copy;
    };
    await expect(
      hpkeOpen({
        privateKey: pair.privateKey,
        ...sealed,
        enc: flipped(sealed.enc),
        aad: bytes('a'),
      }),
    ).rejects.toBeInstanceOf(Error);
    await expect(
      hpkeOpen({
        privateKey: pair.privateKey,
        ...sealed,
        ciphertext: flipped(sealed.ciphertext),
        aad: bytes('a'),
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('fails to open under different associated data or another private key', async () => {
    const pair = await generateOrgKeyPair();
    const other = await generateOrgKeyPair();
    const sealed = await hpkeSeal({
      publicKey: fromBase64Url(pair.publicKey),
      plaintext: bytes('secret'),
      aad: bytes('a'),
    });
    await expect(
      hpkeOpen({ privateKey: pair.privateKey, ...sealed, aad: bytes('b') }),
    ).rejects.toBeInstanceOf(Error);
    await expect(
      hpkeOpen({ privateKey: other.privateKey, ...sealed, aad: bytes('a') }),
    ).rejects.toBeInstanceOf(Error);
  });
});
