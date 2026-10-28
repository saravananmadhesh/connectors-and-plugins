import type { IncomingHttpHeaders } from 'node:http';
import {
  createSharedSecretVerifier,
  createWorkloadSigner,
  createWorkloadVerifier,
  type SharedSecretVerifier,
  type WorkloadVerifier,
} from '@boldcreate-integrations/security';
import { SERVICES, type ServiceName } from '@boldcreate-integrations/observability';

/** Verifies the service-to-service credential carried by a request. Throws when it is not valid. */
export interface WorkloadAuthenticator {
  authenticate(headers: IncomingHttpHeaders): Promise<{ callerId: string }>;
}

function single(value: string | string[] | undefined): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

/** Signed mode: `x-workload-token` carries the credential; `x-caller-id` must equal its issuer. */
export function signedWorkloadAuthenticator(verifier: WorkloadVerifier): WorkloadAuthenticator {
  return {
    async authenticate(headers) {
      const token = single(headers['x-workload-token']);
      if (token === undefined) throw new Error('workload token missing');
      const { callerId } = await verifier.verify(token);
      const claimed = single(headers['x-caller-id']);
      if (claimed !== undefined && claimed !== callerId) throw new Error('caller id mismatch');
      return { callerId };
    },
  };
}

/** Shared-secret mode (local and test only): `x-caller-id` and `x-workload-secret`. */
export function sharedSecretWorkloadAuthenticator(
  verifier: SharedSecretVerifier,
): WorkloadAuthenticator {
  return {
    async authenticate(headers) {
      return verifier.verify({
        callerId: single(headers['x-caller-id']),
        secret: single(headers['x-workload-secret']),
      });
    },
  };
}

export interface WorkloadAuthenticatorOptions {
  /** The verifying service; its name is the audience of signed tokens. */
  service: ServiceName;
  mode: 'shared_secret' | 'signed';
  secret?: string | undefined;
  /** JSON object: caller id to SPKI PEM public key. */
  trustedKeys?: string | undefined;
}

/**
 * Builds the credential check for the configured mode. Any service may present a valid
 * credential; which of them may call is a separate rule, so a known service that is not
 * allowed gets `403` from the app and an unknown or unsigned caller gets `401` here.
 */
export function createWorkloadAuthenticator(
  options: WorkloadAuthenticatorOptions,
): WorkloadAuthenticator {
  if (options.mode === 'shared_secret') {
    return sharedSecretWorkloadAuthenticator(
      createSharedSecretVerifier({
        secret: options.secret ?? '',
        allowedCallers: [...SERVICES],
      }),
    );
  }
  const trusted = JSON.parse(options.trustedKeys ?? '{}') as Record<string, string>;
  return signedWorkloadAuthenticator(
    createWorkloadVerifier({ audience: options.service, trusted }),
  );
}

/** Headers that identify this service to the one it calls. */
export type WorkloadHeaders = () => Promise<Record<string, string>>;

export interface WorkloadHeadersOptions {
  callerId: string;
  /** The called service; its name is the audience of signed tokens. */
  audience: ServiceName;
  mode: 'shared_secret' | 'signed';
  secret?: string | undefined;
  /** PKCS8 PEM of this service's signing key. */
  signingKey?: string | undefined;
}

/** Shared secret (local and test only) or a fresh short-lived signed token per call. */
export function createWorkloadHeaders(options: WorkloadHeadersOptions): WorkloadHeaders {
  if (options.mode === 'shared_secret') {
    const headers = { 'x-caller-id': options.callerId, 'x-workload-secret': options.secret ?? '' };
    return async () => ({ ...headers });
  }
  const signer = createWorkloadSigner({
    callerId: options.callerId,
    privateKeyPem: options.signingKey ?? '',
  });
  return async () => ({
    'x-caller-id': options.callerId,
    'x-workload-token': await signer.sign({ audience: options.audience }),
  });
}
