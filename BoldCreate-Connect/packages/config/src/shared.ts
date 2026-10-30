/**
 * Building blocks every app schema reuses: list and flag parsing, the keys the shared HTTP
 * server reads, and the workload identity keys with their cross-field rules.
 */
import * as z from 'zod/v4';
import { isDeployed, redisAdapterChoice, type DeployEnvSchema } from './deploy-env.js';
import { nonEmpty, secret } from './env.js';

/** Comma-separated list; empty entries are dropped and an empty value is an empty list. */
export const csv = (fallback = '') =>
  z
    .string()
    .default(fallback)
    .transform((value) =>
      value
        .split(',')
        .map((part) => part.trim())
        .filter((part) => part.length > 0),
    );

export const csvList = csv();

/** GitHub owners plugin sources may come from unless the deployment narrows or widens the list. */
export const DEFAULT_SOURCE_OWNERS = 'boldcreate,syncfusion,cursor';

/** Comma-separated TCP ports. */
export const portList = csv()
  .transform((list) => list.map(Number))
  .refine(
    (list) => list.every((value) => Number.isInteger(value) && value >= 1 && value <= 65535),
    {
      message: 'must be a comma-separated list of ports',
    },
  );

/** `true` and `1` are on, `false`, `0` and empty are off; anything else fails. */
export const flag = z
  .enum(['true', 'false', '1', '0', ''])
  .transform((value) => value === 'true' || value === '1');

/** Keys read by `createServer` from `@boldcreate-integrations/http-server`. */
export const httpServerShape = {
  BODY_LIMIT_BYTES: z.coerce.number().int().min(1024).default(262_144),
  MAX_HEADER_BYTES: z.coerce.number().int().min(1024).default(16_384),
  TRUSTED_PROXY_CIDRS: csvList,
  ALLOWED_HOSTS: csvList,
  IP_THROTTLE_LIMIT: z.coerce.number().int().min(0).default(0),
  IP_THROTTLE_WINDOW_SECONDS: z.coerce.number().int().min(1).default(60),
  UV_THREADPOOL_SIZE: z.coerce.number().int().min(4).max(128).default(8),
  METRICS_ENABLED: flag.default(true),
  SHUTDOWN_DRAIN_SECONDS: z.coerce.number().int().min(0).default(20),
  SHUTDOWN_PREDRAIN_SECONDS: z.coerce.number().int().min(0).default(5),
};

export const WORKLOAD_AUTH_MODES = ['shared_secret', 'signed'] as const;

/** Workload identity keys. `refineWorkload` enforces which of them each mode needs. */
export const workloadShape = {
  WORKLOAD_AUTH_MODE: z.enum(WORKLOAD_AUTH_MODES).default('shared_secret'),
  WORKLOAD_SECRET: secret.optional(),
  /** PKCS8 PEM of this service's signing key (callers only). */
  WORKLOAD_SIGNING_KEY: secret.optional(),
  /** JSON object: caller id to SPKI PEM public key (verifiers only). */
  WORKLOAD_TRUSTED_KEYS: nonEmpty.optional(),
};

interface WorkloadKeys {
  DEPLOY_ENV: z.infer<typeof DeployEnvSchema>;
  WORKLOAD_AUTH_MODE: (typeof WORKLOAD_AUTH_MODES)[number];
  WORKLOAD_SECRET?: string | undefined;
  WORKLOAD_TRUSTED_KEYS?: string | undefined;
}

/** Cross-field rules for a service that verifies workload credentials. Messages never hold values. */
export function refineWorkloadVerifier(value: WorkloadKeys, ctx: z.RefinementCtx): void {
  if (value.WORKLOAD_AUTH_MODE === 'shared_secret') {
    if (isDeployed(value.DEPLOY_ENV)) {
      ctx.addIssue({
        code: 'custom',
        path: ['WORKLOAD_AUTH_MODE'],
        message: 'shared_secret is not allowed in a deployed environment',
      });
    }
    if (value.WORKLOAD_SECRET === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['WORKLOAD_SECRET'],
        message: 'required when WORKLOAD_AUTH_MODE is shared_secret',
      });
    }
    return;
  }
  if (value.WORKLOAD_TRUSTED_KEYS === undefined) {
    ctx.addIssue({
      code: 'custom',
      path: ['WORKLOAD_TRUSTED_KEYS'],
      message: 'required when WORKLOAD_AUTH_MODE is signed',
    });
    return;
  }
  try {
    const parsed: unknown = JSON.parse(value.WORKLOAD_TRUSTED_KEYS);
    const ok =
      typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed) &&
      Object.values(parsed).every((entry) => typeof entry === 'string');
    if (!ok) throw new Error('shape');
  } catch {
    ctx.addIssue({
      code: 'custom',
      path: ['WORKLOAD_TRUSTED_KEYS'],
      message: 'must be a JSON object of caller id to public key',
    });
  }
}

interface CallerWorkloadKeys extends WorkloadKeys {
  WORKLOAD_SIGNING_KEY?: string | undefined;
}

/** Cross-field rules for a service that only calls others with a workload credential. */
export function refineWorkloadCaller(value: CallerWorkloadKeys, ctx: z.RefinementCtx): void {
  if (value.WORKLOAD_AUTH_MODE === 'shared_secret') {
    if (isDeployed(value.DEPLOY_ENV)) {
      ctx.addIssue({
        code: 'custom',
        path: ['WORKLOAD_AUTH_MODE'],
        message: 'shared_secret is not allowed in a deployed environment',
      });
    }
    if (value.WORKLOAD_SECRET === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['WORKLOAD_SECRET'],
        message: 'required when WORKLOAD_AUTH_MODE is shared_secret',
      });
    }
  } else if (value.WORKLOAD_SIGNING_KEY === undefined) {
    ctx.addIssue({
      code: 'custom',
      path: ['WORKLOAD_SIGNING_KEY'],
      message: 'required when WORKLOAD_AUTH_MODE is signed',
    });
  }
}

export const MIN_DEPLOYED_SECRET_LENGTH = 32;

/** In production or a deployed environment every named secret must be 32 characters or longer. Messages never hold values. */
export function refineSecretLength(
  value: { NODE_ENV: string; DEPLOY_ENV: z.infer<typeof DeployEnvSchema> } & Record<
    string,
    unknown
  >,
  keys: readonly string[],
  ctx: z.RefinementCtx,
): void {
  if (value.NODE_ENV !== 'production' && !isDeployed(value.DEPLOY_ENV)) return;
  for (const key of keys) {
    const secretValue = value[key];
    if (typeof secretValue === 'string' && secretValue.length < MIN_DEPLOYED_SECRET_LENGTH) {
      ctx.addIssue({
        code: 'custom',
        path: [key],
        message: `must be at least ${MIN_DEPLOYED_SECRET_LENGTH} characters in production`,
      });
    }
  }
}

/** Local defaults of the public origin keys (one table; no other spelling exists). */
export const ORIGIN_DEFAULTS = {
  APP_BASE_URL: 'http://localhost:3000',
  PUBLIC_GATEWAY_URL: 'http://localhost:3002',
  PUBLIC_API_BASE_URL: 'http://localhost:3001',
  OAUTH_REDIRECT_URI: 'http://localhost:3000/api/v1/oauth/callback',
} as const;

export type OriginKey = keyof typeof ORIGIN_DEFAULTS;

/** Schema shape of the named origin keys; presence is decided by `refineOrigins`. */
export function originShape<K extends OriginKey>(
  ...keys: K[]
): Record<K, z.ZodOptional<z.ZodString>> {
  return Object.fromEntries(keys.map((key) => [key, z.string().optional()])) as Record<
    K,
    z.ZodOptional<z.ZodString>
  >;
}

/**
 * Each origin is absolute without a trailing slash; the redirect URI may carry a path. When
 * deployed each must be `https` and has no default, so a missing one fails.
 */
export function refineOrigins(
  value: { DEPLOY_ENV: z.infer<typeof DeployEnvSchema> } & Record<string, unknown>,
  keys: readonly OriginKey[],
  ctx: z.RefinementCtx,
): void {
  const deployed = isDeployed(value.DEPLOY_ENV);
  for (const key of keys) {
    const raw = value[key];
    const issue = (message: string) => ctx.addIssue({ code: 'custom', path: [key], message });
    if (raw === undefined) {
      if (deployed) issue('required in a deployed environment');
      continue;
    }
    if (typeof raw !== 'string') continue;
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      issue('must be an absolute URL');
      continue;
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      issue('must be an http or https URL');
    } else if (raw.endsWith('/')) {
      issue('must not end with a slash');
    } else if (key !== 'OAUTH_REDIRECT_URI' && raw !== url.origin) {
      issue('must be an origin without a path');
    } else if (deployed && url.protocol !== 'https:') {
      issue('must use https in a deployed environment');
    }
  }
}

/** Fills the local default of every origin key that is not set. */
export function withOriginDefaults<T extends object, K extends OriginKey>(
  value: T,
  keys: readonly K[],
): T & Record<K, string> {
  const filled: Record<string, string> = {};
  for (const key of keys) {
    filled[key] =
      ((value as Record<string, unknown>)[key] as string | undefined) ?? ORIGIN_DEFAULTS[key];
  }
  return { ...value, ...filled } as T & Record<K, string>;
}

/** Key management keys; `refineAdapterKeys` decides which of them each adapter needs. */
export const kmsShape = {
  KMS_ADAPTER: z.enum(['local', 'cloud-kms']).default('local'),
  KMS_LOCAL_KEYRING_PATH: nonEmpty.optional(),
  KMS_CLOUD_KEY_NAME: nonEmpty.optional(),
};

/** Secrets keys; the local directory defaults to the generated development secrets. */
export const secretsShape = {
  SECRETS_ADAPTER: z.enum(['local', 'gcp-secret-manager']).default('local'),
  SECRETS_LOCAL_DIR: nonEmpty.optional(),
  GCP_PROJECT_ID: nonEmpty.optional(),
};

export const emailShape = {
  /** `mailpit` is local only; the deployed-environment guard rejects it. */
  EMAIL_ADAPTER: z.enum(['mailpit', 'ses', 'smtp']).default('mailpit'),
  MAILPIT_SMTP_URL: nonEmpty.optional(),
  SES_REGION: nonEmpty.optional(),
  SES_CONFIGURATION_SET: nonEmpty.optional(),
  /** Static key pair for an SES account other than the one the default credential chain reaches. */
  SES_ACCESS_KEY_ID: nonEmpty.optional(),
  SES_SECRET_ACCESS_KEY: secret.optional(),
  SMTP_HOST: nonEmpty.optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(587),
  SMTP_USER: nonEmpty.optional(),
  SMTP_PASS: secret.optional(),
  EMAIL_FROM: nonEmpty.default('noreply@localhost'),
};

/** Credentials and trust for a managed Redis; `REDIS_URL` itself stays with each app. */
export const redisAuthShape = {
  REDIS_USERNAME: nonEmpty.optional(),
  REDIS_PASSWORD: secret.optional(),
  /** Path of a PEM file with the certificate authority of the server. */
  REDIS_TLS_CA: nonEmpty.optional(),
};

/** Object storage keys. Static credentials are for local object stores only. */
export const blobShape = {
  BLOB_ENDPOINT: nonEmpty.optional(),
  BLOB_REGION: nonEmpty.default('us-east-1'),
  BLOB_BUCKET: nonEmpty,
  BLOB_FORCE_PATH_STYLE: flag.default(false),
  BLOB_PREFIX: nonEmpty.optional(),
  BLOB_ACCESS_KEY_ID: nonEmpty.optional(),
  BLOB_SECRET_ACCESS_KEY: secret.optional(),
};

/** Keys each chosen cloud adapter needs; messages name keys, never values. */
export function refineAdapterKeys(
  value: {
    KMS_ADAPTER?: string | undefined;
    KMS_CLOUD_KEY_NAME?: string | undefined;
    SECRETS_ADAPTER?: string | undefined;
    GCP_PROJECT_ID?: string | undefined;
    EMAIL_ADAPTER?: string | undefined;
    SES_REGION?: string | undefined;
    SES_ACCESS_KEY_ID?: string | undefined;
    SES_SECRET_ACCESS_KEY?: string | undefined;
    SMTP_HOST?: string | undefined;
    SMTP_USER?: string | undefined;
    SMTP_PASS?: string | undefined;
  },
  ctx: z.RefinementCtx,
): void {
  const need = (path: string, because: string) =>
    ctx.addIssue({ code: 'custom', path: [path], message: `required when ${because}` });
  if (value.KMS_ADAPTER === 'cloud-kms' && value.KMS_CLOUD_KEY_NAME === undefined) {
    need('KMS_CLOUD_KEY_NAME', 'KMS_ADAPTER is cloud-kms');
  }
  if (value.SECRETS_ADAPTER === 'gcp-secret-manager' && value.GCP_PROJECT_ID === undefined) {
    need('GCP_PROJECT_ID', 'SECRETS_ADAPTER is gcp-secret-manager');
  }
  if (value.EMAIL_ADAPTER === 'ses' && value.SES_REGION === undefined) {
    need('SES_REGION', 'EMAIL_ADAPTER is ses');
  }
  if ((value.SES_ACCESS_KEY_ID === undefined) !== (value.SES_SECRET_ACCESS_KEY === undefined)) {
    need(
      value.SES_ACCESS_KEY_ID === undefined ? 'SES_ACCESS_KEY_ID' : 'SES_SECRET_ACCESS_KEY',
      'the other SES key is set',
    );
  }
  if (value.EMAIL_ADAPTER === 'smtp') {
    if (value.SMTP_HOST === undefined) need('SMTP_HOST', 'EMAIL_ADAPTER is smtp');
    if (value.SMTP_USER === undefined) need('SMTP_USER', 'EMAIL_ADAPTER is smtp');
    if (value.SMTP_PASS === undefined) need('SMTP_PASS', 'EMAIL_ADAPTER is smtp');
  }
}

/**
 * Local-only adapters (local KMS, local secrets, plain redis, mailpit, static blob credentials)
 * are refused when deployed.
 */
export function refineLocalAdapters(
  value: {
    DEPLOY_ENV: z.infer<typeof DeployEnvSchema>;
    KMS_ADAPTER?: string | undefined;
    SECRETS_ADAPTER?: string | undefined;
    REDIS_URL?: string | undefined;
    EMAIL_ADAPTER?: string | undefined;
    BLOB_ACCESS_KEY_ID?: string | undefined;
    BLOB_SECRET_ACCESS_KEY?: string | undefined;
  },
  ctx: z.RefinementCtx,
): void {
  if (!isDeployed(value.DEPLOY_ENV)) return;
  const refuse = (path: string) =>
    ctx.addIssue({
      code: 'custom',
      path: [path],
      message: 'a local-only adapter is not allowed in a deployed environment',
    });
  if (value.KMS_ADAPTER === 'local') refuse('KMS_ADAPTER');
  if (value.SECRETS_ADAPTER === 'local') refuse('SECRETS_ADAPTER');
  if (value.EMAIL_ADAPTER === 'mailpit') refuse('EMAIL_ADAPTER');
  if (value.REDIS_URL !== undefined && redisAdapterChoice(value.REDIS_URL).localOnly) {
    refuse('REDIS_URL');
  }
  if (value.BLOB_ACCESS_KEY_ID !== undefined) refuse('BLOB_ACCESS_KEY_ID');
  if (value.BLOB_SECRET_ACCESS_KEY !== undefined) refuse('BLOB_SECRET_ACCESS_KEY');
}

/**
 * Where errors and key events are stored and how hard that store may be used. Unset
 * `OBSERVABILITY_DATABASE_URL` keeps them in the service's own database, on a pool of their own.
 */
export const observabilityDbShape = {
  OBSERVABILITY_DATABASE_URL: secret.optional(),
  /** Connections the store may hold per instance. */
  OBSERVABILITY_DB_POOL_MAX: z.coerce.number().int().min(1).max(20).default(2),
  OBSERVABILITY_DB_STATEMENT_TIMEOUT_MS: z.coerce.number().int().min(100).default(10_000),
  OBSERVABILITY_DB_LOCK_TIMEOUT_MS: z.coerce.number().int().min(100).default(2_000),
  OBSERVABILITY_DB_CONNECT_TIMEOUT_MS: z.coerce.number().int().min(100).default(3_000),
  /** Consecutive failed writes that make a service stop writing for a while. */
  OBSERVABILITY_SINK_FAILURE_THRESHOLD: z.coerce.number().int().min(1).default(3),
  /** Seconds a service skips writes after that, before it tries once more. */
  OBSERVABILITY_SINK_PAUSE_SECONDS: z.coerce.number().int().min(1).default(30),
};
