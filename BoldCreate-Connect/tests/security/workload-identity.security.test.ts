import { describe, expect, it, vi } from 'vitest';
import { generateKeyPairSync } from 'node:crypto';
import type * as NodeCrypto from 'node:crypto';

const timingSafeEqualSpy = vi.hoisted(() => vi.fn<(a: Uint8Array, b: Uint8Array) => boolean>());

vi.mock('node:crypto', async (importOriginal) => {
  const actual = await importOriginal<typeof NodeCrypto>();
  timingSafeEqualSpy.mockImplementation((a, b) => actual.timingSafeEqual(a, b));
  return { ...actual, timingSafeEqual: timingSafeEqualSpy };
});

const {
  createSharedSecretVerifier,
  createWorkloadSigner,
  createWorkloadVerifier,
  WorkloadAuthError,
} = await import('../../packages/security/src/workload-identity.js');

describe('workload identity security', () => {
  it('compares the shared secret with timingSafeEqual over equal-length digests', () => {
    timingSafeEqualSpy.mockClear();
    const verifier = createSharedSecretVerifier({ secret: 's3cret', allowedCallers: ['web'] });
    expect(() => verifier.verify({ callerId: 'web', secret: 'x' })).toThrow(WorkloadAuthError);
    expect(timingSafeEqualSpy).toHaveBeenCalledOnce();
    const [a, b] = timingSafeEqualSpy.mock.calls[0]!;
    expect(a.byteLength).toBe(32);
    expect(b.byteLength).toBe(32);
  });

  it('does not echo the secret or the token in errors', async () => {
    const verifier = createSharedSecretVerifier({ secret: 'top-secret', allowedCallers: ['web'] });
    let message = '';
    try {
      verifier.verify({ callerId: 'web', secret: 'guess-value' });
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).not.toContain('guess-value');
    expect(message).not.toContain('top-secret');

    const pair = generateKeyPairSync('ec', { namedCurve: 'P-256' });
    const signer = createWorkloadSigner({
      callerId: 'web',
      privateKeyPem: pair.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    });
    const token = await signer.sign({ audience: 'gateway' });
    const tokenVerifier = createWorkloadVerifier({
      audience: 'api',
      trusted: { web: pair.publicKey.export({ type: 'spki', format: 'pem' }).toString() },
    });
    const failure = await tokenVerifier.verify(token).catch((error: Error) => error);
    expect((failure as Error).message).not.toContain(token);
    expect((failure as Error).message).not.toContain(token.split('.')[1]!);
  });
});
