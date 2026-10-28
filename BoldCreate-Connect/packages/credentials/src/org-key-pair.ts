import { generateKeyPair } from 'node:crypto';
import { promisify } from 'node:util';
import { toBase64Url } from './envelope.js';
import { HPKE_KEY_BYTES } from './hpke.js';

const generate = promisify(generateKeyPair);

export interface OrgKeyPair {
  /** Raw 32-byte X25519 public key, base64url. */
  publicKey: string;
  /** Raw 32-byte X25519 private key; the caller wraps it and zeroes it. */
  privateKey: Uint8Array;
}

/** Generates an X25519 key pair without blocking the event loop. */
export async function generateOrgKeyPair(): Promise<OrgKeyPair> {
  const pair = await generate('x25519');
  const publicJwk = pair.publicKey.export({ format: 'jwk' });
  const privateJwk = pair.privateKey.export({ format: 'jwk' });
  if (typeof publicJwk.x !== 'string' || typeof privateJwk.d !== 'string') {
    throw new Error('unexpected key export');
  }
  const privateKey = new Uint8Array(Buffer.from(privateJwk.d, 'base64url'));
  const publicKey = new Uint8Array(Buffer.from(publicJwk.x, 'base64url'));
  if (privateKey.length !== HPKE_KEY_BYTES || publicKey.length !== HPKE_KEY_BYTES) {
    throw new Error('unexpected key length');
  }
  return { publicKey: toBase64Url(publicKey), privateKey };
}
