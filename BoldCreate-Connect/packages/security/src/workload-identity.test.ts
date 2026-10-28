import { beforeAll, describe, expect, it } from 'vitest';
import { SignJWT, exportPKCS8, exportSPKI, generateKeyPair } from 'jose';
import {
  WorkloadAuthError,
  createSharedSecretVerifier,
  createWorkloadSigner,
  createWorkloadVerifier,
} from './workload-identity.js';

const NOW = 1_800_000_000;
let privatePem: string;
let publicPem: string;
let otherPrivatePem: string;

beforeAll(async () => {
  const pair = await generateKeyPair('ES256', { extractable: true });
  privatePem = await exportPKCS8(pair.privateKey);
  publicPem = await exportSPKI(pair.publicKey);
  const other = await generateKeyPair('ES256', { extractable: true });
  otherPrivatePem = await exportPKCS8(other.privateKey);
});

const signer = (overrides: { now?: number; ttl?: number; pem?: string; caller?: string } = {}) =>
  createWorkloadSigner({
    callerId: overrides.caller ?? 'web',
    privateKeyPem: overrides.pem ?? privatePem,
    ttlSeconds: overrides.ttl ?? 60,
    now: () => overrides.now ?? NOW,
  });

const verifier = (extra: { now?: number; allowedCallers?: string[]; audience?: string } = {}) =>
  createWorkloadVerifier({
    audience: extra.audience ?? 'api',
    trusted: { web: publicPem },
    ...(extra.allowedCallers ? { allowedCallers: extra.allowedCallers } : {}),
    now: () => extra.now ?? NOW,
  });

const b64 = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');

describe('workload tokens', () => {
  it('round-trips and returns only the caller id', async () => {
    const token = await signer().sign({ audience: 'api' });
    expect(await verifier().verify(token)).toEqual({ callerId: 'web' });
  });

  it('issues a fresh jti per token', async () => {
    const [a, b] = await Promise.all([
      signer().sign({ audience: 'api' }),
      signer().sign({ audience: 'api' }),
    ]);
    expect(a).not.toBe(b);
  });

  it('rejects a tampered payload', async () => {
    const [header, , signature] = (await signer().sign({ audience: 'api' })).split('.');
    const forged = b64({ iss: 'web', aud: 'api', iat: NOW, exp: NOW + 9999, jti: 'x' });
    await expect(verifier().verify(`${header}.${forged}.${signature}`)).rejects.toBeInstanceOf(
      WorkloadAuthError,
    );
  });

  it('rejects an expired token and accepts it just before expiry', async () => {
    const token = await signer({ ttl: 60 }).sign({ audience: 'api' });
    await expect(verifier({ now: NOW + 66 }).verify(token)).rejects.toBeInstanceOf(
      WorkloadAuthError,
    );
    await expect(verifier({ now: NOW + 59 }).verify(token)).resolves.toEqual({ callerId: 'web' });
  });

  it('rejects the wrong audience', async () => {
    const token = await signer().sign({ audience: 'gateway' });
    await expect(verifier().verify(token)).rejects.toBeInstanceOf(WorkloadAuthError);
  });

  it('rejects an unknown issuer and a caller that is not allowed', async () => {
    const unknown = await signer({ caller: 'worker' }).sign({ audience: 'api' });
    await expect(verifier().verify(unknown)).rejects.toBeInstanceOf(WorkloadAuthError);
    const token = await signer().sign({ audience: 'api' });
    await expect(verifier({ allowedCallers: ['admin'] }).verify(token)).rejects.toBeInstanceOf(
      WorkloadAuthError,
    );
    await expect(verifier({ allowedCallers: ['web'] }).verify(token)).resolves.toBeDefined();
  });

  it('rejects a token signed with a different key', async () => {
    const token = await signer({ pem: otherPrivatePem }).sign({ audience: 'api' });
    await expect(verifier().verify(token)).rejects.toBeInstanceOf(WorkloadAuthError);
  });

  it('rejects HS256 signed with the public key as the secret (algorithm confusion)', async () => {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer('web')
      .setAudience('api')
      .setIssuedAt(NOW)
      .setExpirationTime(NOW + 60)
      .setJti('abc')
      .sign(new TextEncoder().encode(publicPem));
    await expect(verifier().verify(token)).rejects.toBeInstanceOf(WorkloadAuthError);
  });

  it('rejects alg none', async () => {
    const token = `${b64({ alg: 'none', typ: 'JWT' })}.${b64({ iss: 'web', aud: 'api', iat: NOW, exp: NOW + 60, jti: 'a' })}.`;
    await expect(verifier().verify(token)).rejects.toBeInstanceOf(WorkloadAuthError);
  });

  it('rejects a token without jti', async () => {
    const pair = await generateKeyPair('ES256', { extractable: true });
    const noJti = await new SignJWT({})
      .setProtectedHeader({ alg: 'ES256' })
      .setIssuer('web')
      .setAudience('api')
      .setIssuedAt(NOW)
      .setExpirationTime(NOW + 60)
      .sign(pair.privateKey);
    const verifierForKey = createWorkloadVerifier({
      audience: 'api',
      trusted: { web: await exportSPKI(pair.publicKey) },
      now: () => NOW,
    });
    await expect(verifierForKey.verify(noJti)).rejects.toBeInstanceOf(WorkloadAuthError);
  });

  it('rejects garbage', async () => {
    for (const token of ['', 'a.b.c', 'not a token', `${b64({ alg: 'ES256' })}.${b64({})}.x`]) {
      await expect(verifier().verify(token)).rejects.toBeInstanceOf(WorkloadAuthError);
    }
  });

  it('accepts an issue time up to 5 s ahead and rejects 6 s ahead', async () => {
    const ahead5 = await signer({ now: NOW + 5 }).sign({ audience: 'api' });
    const ahead6 = await signer({ now: NOW + 6 }).sign({ audience: 'api' });
    await expect(verifier().verify(ahead5)).resolves.toBeDefined();
    await expect(verifier().verify(ahead6)).rejects.toBeInstanceOf(WorkloadAuthError);
  });
});

describe('shared secret verifier', () => {
  const verify = createSharedSecretVerifier({ secret: 'correct horse', allowedCallers: ['web'] });

  it('accepts the right secret from an allowed caller', () => {
    expect(verify.verify({ callerId: 'web', secret: 'correct horse' })).toEqual({
      callerId: 'web',
    });
  });

  it.each([
    [{ callerId: 'web', secret: 'wrong' }],
    [{ callerId: 'web', secret: undefined }],
    [{ callerId: undefined, secret: 'correct horse' }],
    [{ callerId: 'gateway', secret: 'correct horse' }],
    [{ callerId: 'web', secret: 'correct horse and a much longer value' }],
    [{ callerId: 'web', secret: '' }],
  ])('rejects %j without throwing on length', (headers) => {
    expect(() => verify.verify(headers)).toThrow(WorkloadAuthError);
  });
});
