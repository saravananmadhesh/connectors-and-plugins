/**
 * Service-to-service identity.
 *
 * Deployed environments use short-lived ES256 tokens (`x-workload-token`). The shared-secret
 * verifier exists for local development and tests only; configuration refuses it when deployed.
 * Tokens are not replay-protected inside their lifetime: the TTL is short and each token names
 * its audience.
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { SignJWT, importPKCS8, importSPKI, jwtVerify, type CryptoKey } from 'jose';

const ALGORITHM = 'ES256';

export interface WorkloadSignerOptions {
  callerId: string;
  privateKeyPem: string;
  ttlSeconds?: number;
  /** Seconds since the epoch; tests inject a fixed time. */
  now?: () => number;
}

export interface WorkloadSigner {
  sign(input: { audience: string }): Promise<string>;
}

export function createWorkloadSigner(options: WorkloadSignerOptions): WorkloadSigner {
  const ttl = options.ttlSeconds ?? 60;
  const now = options.now ?? (() => Math.floor(Date.now() / 1000));
  let key: Promise<CryptoKey> | undefined;
  return {
    async sign({ audience }) {
      key ??= importPKCS8(options.privateKeyPem, ALGORITHM);
      const issuedAt = now();
      return new SignJWT({})
        .setProtectedHeader({ alg: ALGORITHM })
        .setIssuer(options.callerId)
        .setAudience(audience)
        .setIssuedAt(issuedAt)
        .setExpirationTime(issuedAt + ttl)
        .setJti(randomBytes(16).toString('hex'))
        .sign(await key);
    },
  };
}

export interface WorkloadVerifierOptions {
  audience: string;
  /** Public key (SPKI PEM) per caller id. */
  trusted: Record<string, string>;
  clockSkewSeconds?: number;
  allowedCallers?: string[];
  now?: () => number;
}

export interface WorkloadVerifier {
  verify(token: string): Promise<{ callerId: string }>;
}

/** Thrown for every rejected credential; the message never contains the credential. */
export class WorkloadAuthError extends Error {
  constructor() {
    super('workload credential rejected');
    this.name = 'WorkloadAuthError';
  }
}

function peekIssuer(token: string): string | undefined {
  const part = token.split('.')[1];
  if (!part) return undefined;
  try {
    const claims = JSON.parse(Buffer.from(part, 'base64url').toString('utf8')) as { iss?: unknown };
    return typeof claims.iss === 'string' ? claims.iss : undefined;
  } catch {
    return undefined;
  }
}

export function createWorkloadVerifier(options: WorkloadVerifierOptions): WorkloadVerifier {
  const skew = options.clockSkewSeconds ?? 5;
  const keys = new Map<string, Promise<CryptoKey>>();
  const keyFor = (callerId: string): Promise<CryptoKey> | undefined => {
    const pem = Object.hasOwn(options.trusted, callerId) ? options.trusted[callerId] : undefined;
    if (pem === undefined) return undefined;
    let key = keys.get(callerId);
    if (!key) {
      key = importSPKI(pem, ALGORITHM);
      keys.set(callerId, key);
    }
    return key;
  };

  return {
    async verify(token) {
      try {
        const issuer = peekIssuer(token);
        const key = issuer === undefined ? undefined : keyFor(issuer);
        if (issuer === undefined || key === undefined) throw new WorkloadAuthError();
        if (options.allowedCallers && !options.allowedCallers.includes(issuer)) {
          throw new WorkloadAuthError();
        }
        const { payload } = await jwtVerify(token, await key, {
          algorithms: [ALGORITHM],
          audience: options.audience,
          issuer,
          clockTolerance: skew,
          requiredClaims: ['iat', 'exp', 'jti'],
          ...(options.now ? { currentDate: new Date(options.now() * 1000) } : {}),
        });
        // jose tolerates a future `iat` only through clockTolerance on exp/nbf; enforce it here.
        const nowSeconds = options.now ? options.now() : Math.floor(Date.now() / 1000);
        if (typeof payload.iat !== 'number' || payload.iat > nowSeconds + skew) {
          throw new WorkloadAuthError();
        }
        return { callerId: issuer };
      } catch {
        throw new WorkloadAuthError();
      }
    },
  };
}

export interface SharedSecretVerifierOptions {
  secret: string;
  allowedCallers: string[];
}

export interface SharedSecretVerifier {
  verify(headers: { callerId: string | undefined; secret: string | undefined }): {
    callerId: string;
  };
}

const digest = (value: string) => createHash('sha256').update(value).digest();

/** Local use only. Compares SHA-256 digests with `timingSafeEqual`, so lengths never differ. */
export function createSharedSecretVerifier(
  options: SharedSecretVerifierOptions,
): SharedSecretVerifier {
  const expected = digest(options.secret);
  return {
    verify({ callerId, secret }) {
      const secretMatches = timingSafeEqual(expected, digest(secret ?? ''));
      if (
        !secretMatches ||
        callerId === undefined ||
        secret === undefined ||
        !options.allowedCallers.includes(callerId)
      ) {
        throw new WorkloadAuthError();
      }
      return { callerId };
    },
  };
}
