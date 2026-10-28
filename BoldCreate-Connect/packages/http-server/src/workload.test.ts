import { generateKeyPairSync } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  createSharedSecretVerifier,
  createWorkloadSigner,
  createWorkloadVerifier,
} from '@boldcreate-integrations/security';
import {
  createWorkloadAuthenticator,
  createWorkloadHeaders,
  sharedSecretWorkloadAuthenticator,
  signedWorkloadAuthenticator,
} from './workload.js';

describe('signedWorkloadAuthenticator', () => {
  const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });
  const signer = createWorkloadSigner({
    callerId: 'web',
    privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
  });
  const authenticator = signedWorkloadAuthenticator(
    createWorkloadVerifier({
      audience: 'api',
      trusted: { web: publicKey.export({ type: 'spki', format: 'pem' }).toString() },
    }),
  );

  it('accepts a valid token and a matching or absent caller id', async () => {
    const token = await signer.sign({ audience: 'api' });
    expect(await authenticator.authenticate({ 'x-workload-token': token })).toEqual({
      callerId: 'web',
    });
    expect(
      await authenticator.authenticate({ 'x-workload-token': token, 'x-caller-id': 'web' }),
    ).toEqual({ callerId: 'web' });
  });

  it('rejects a missing token, a bad token and a caller id that differs from the issuer', async () => {
    const token = await signer.sign({ audience: 'api' });
    await expect(authenticator.authenticate({})).rejects.toThrow('workload token missing');
    await expect(authenticator.authenticate({ 'x-workload-token': 'junk' })).rejects.toThrow(
      'workload credential rejected',
    );
    await expect(
      authenticator.authenticate({ 'x-workload-token': token, 'x-caller-id': 'admin' }),
    ).rejects.toThrow('caller id mismatch');
  });
});

describe('sharedSecretWorkloadAuthenticator', () => {
  const authenticator = sharedSecretWorkloadAuthenticator(
    createSharedSecretVerifier({ secret: 's3cret', allowedCallers: ['web'] }),
  );

  it('accepts the secret and an allowed caller, rejects anything else', async () => {
    expect(
      await authenticator.authenticate({ 'x-caller-id': 'web', 'x-workload-secret': 's3cret' }),
    ).toEqual({ callerId: 'web' });
    await expect(authenticator.authenticate({ 'x-caller-id': 'web' })).rejects.toThrow(
      'workload credential rejected',
    );
    await expect(
      authenticator.authenticate({ 'x-caller-id': 'admin', 'x-workload-secret': 's3cret' }),
    ).rejects.toThrow('workload credential rejected');
  });
});

describe('createWorkloadAuthenticator', () => {
  const keys = generateKeyPairSync('ec', { namedCurve: 'P-256' });
  const privateKeyPem = keys.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  const publicKeyPem = keys.publicKey.export({ type: 'spki', format: 'pem' }).toString();
  const shared = createWorkloadAuthenticator({
    service: 'gateway',
    mode: 'shared_secret',
    secret: 'a-shared-secret-for-tests',
  });

  it('accepts any known service with the shared secret', async () => {
    expect(
      await shared.authenticate({
        'x-caller-id': 'web',
        'x-workload-secret': 'a-shared-secret-for-tests',
      }),
    ).toEqual({ callerId: 'web' });
  });

  it('rejects a wrong secret, a missing secret and an unknown service', async () => {
    await expect(
      shared.authenticate({ 'x-caller-id': 'api', 'x-workload-secret': 'wrong' }),
    ).rejects.toThrow(/./);
    await expect(shared.authenticate({ 'x-caller-id': 'api' })).rejects.toThrow(/./);
    await expect(
      shared.authenticate({
        'x-caller-id': 'stranger',
        'x-workload-secret': 'a-shared-secret-for-tests',
      }),
    ).rejects.toThrow(/./);
  });

  describe('signed mode', () => {
    const signed = createWorkloadAuthenticator({
      service: 'gateway',
      mode: 'signed',
      trustedKeys: JSON.stringify({ api: publicKeyPem }),
    });
    const sign = (callerId: string, audience: string) =>
      createWorkloadSigner({ callerId, privateKeyPem }).sign({ audience });

    it('accepts a token for the service audience from a trusted caller', async () => {
      const token = await sign('api', 'gateway');
      expect(await signed.authenticate({ 'x-workload-token': token })).toEqual({ callerId: 'api' });
    });

    it('rejects another audience, an untrusted issuer and a missing token', async () => {
      await expect(
        signed.authenticate({ 'x-workload-token': await sign('api', 'worker') }),
      ).rejects.toThrow(/./);
      await expect(
        signed.authenticate({ 'x-workload-token': await sign('web', 'gateway') }),
      ).rejects.toThrow(/./);
      await expect(signed.authenticate({})).rejects.toThrow(/./);
    });
  });
});

describe('createWorkloadHeaders', () => {
  it('sends the caller id and the shared secret', async () => {
    const headers = createWorkloadHeaders({
      callerId: 'web',
      audience: 'api',
      mode: 'shared_secret',
      secret: 'secret-value',
    });
    expect(await headers()).toEqual({ 'x-caller-id': 'web', 'x-workload-secret': 'secret-value' });
  });

  it('sends a fresh signed token the audience verifies', async () => {
    const keys = generateKeyPairSync('ec', { namedCurve: 'P-256' });
    const headers = createWorkloadHeaders({
      callerId: 'api',
      audience: 'gateway',
      mode: 'signed',
      signingKey: keys.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    });
    const first = await headers();
    const second = await headers();
    expect(first['x-caller-id']).toBe('api');
    expect(first['x-workload-token']).not.toBe(second['x-workload-token']);
    const verifier = createWorkloadVerifier({
      audience: 'gateway',
      trusted: { api: keys.publicKey.export({ type: 'spki', format: 'pem' }).toString() },
    });
    expect(await verifier.verify(first['x-workload-token']!)).toEqual({ callerId: 'api' });
  });
});
