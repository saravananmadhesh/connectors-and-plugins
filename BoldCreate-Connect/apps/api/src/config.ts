import * as z from 'zod/v4';
import {
  BaseSchema,
  blobShape,
  DeployEnvSchema,
  csv,
  csvList,
  httpServerShape,
  kmsShape,
  redisAuthShape,
  refineAdapterKeys,
  loadEnv,
  originShape,
  port,
  portList,
  refineLocalAdapters,
  refineOrigins,
  refineSecretLength,
  refineWorkloadVerifier,
  secret,
  withOriginDefaults,
  workloadShape,
} from '@boldcreate-integrations/config';

const ORIGIN_KEYS = [
  'APP_BASE_URL',
  'PUBLIC_API_BASE_URL',
  'PUBLIC_GATEWAY_URL',
  'OAUTH_REDIRECT_URI',
] as const;

const positive = (fallback: number) => z.coerce.number().int().min(1).default(fallback);

const ApiEnvSchema = BaseSchema.extend({
  DEPLOY_ENV: DeployEnvSchema,
  PORT: port.default(3001),
  /** Database login for role `app_api`. */
  DATABASE_URL: secret,
  DB_POOL_MAX: positive(10),
  ...workloadShape,
  ...httpServerShape,
  /** Caller ids (web, admin, gateway) that may use the api; any other verified caller is refused. */
  BFF_CALLER_ALLOWLIST: csv('web,admin,gateway'),
  ...kmsShape,
  ...blobShape,
  /** Archive downloads one key may have open at once. */
  DOWNLOADS_PER_KEY: positive(4),
  ORG_KEY_CACHE_MAX: positive(1000),
  ORG_KEY_CACHE_TTL_SECONDS: positive(300),
  /** Hosts that may use plain http and loopback when an MCP server is tested. Ignored when deployed. */
  UPSTREAM_ALLOW_HTTP_HOSTS: csvList,
  /** Non-default ports an upstream may use (443 is always allowed). */
  UPSTREAM_ALLOWED_PORTS: portList,
  /** Redis for the sign-in throttle; sign-in fails closed without it. */
  REDIS_URL: secret,
  ...redisAuthShape,
  SESSION_IDLE_SECONDS: positive(1800),
  SESSION_ABSOLUTE_SECONDS: positive(43_200),
  SESSION_SLIDE_MIN_INTERVAL_SECONDS: positive(60),
  LOGIN_MAX_FAILED: positive(10),
  LOGIN_LOCK_SECONDS: positive(900),
  LOGIN_THROTTLE_IP_EMAIL_LIMIT: positive(5),
  LOGIN_THROTTLE_IP_LIMIT: positive(30),
  LOGIN_THROTTLE_WINDOW_SECONDS: positive(60),
  PASSWORD_MIN_LENGTH: positive(12),
  ARGON2_MAX_CONCURRENCY: positive(4),
  ORG_KEY_PENDING_RETRY_AFTER_SECONDS: positive(1),
  IDEMPOTENCY_TTL_SECONDS: positive(86_400),
  /** Seconds a flag or kill switch may stay in the process-local cache. */
  FLAG_CACHE_TTL_SECONDS: positive(5),
  ...originShape(...ORIGIN_KEYS),
})
  .superRefine((value, ctx) => {
    refineWorkloadVerifier(value, ctx);
    if (value.WORKLOAD_AUTH_MODE === 'signed' && value.WORKLOAD_SIGNING_KEY === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['WORKLOAD_SIGNING_KEY'],
        message: 'required when WORKLOAD_AUTH_MODE is signed',
      });
    }
    refineOrigins(value, ORIGIN_KEYS, ctx);
    refineSecretLength(value, ['WORKLOAD_SECRET'], ctx);
    refineLocalAdapters(value, ctx);
    refineAdapterKeys(value, ctx);
  })
  .transform((value) => withOriginDefaults(value, ORIGIN_KEYS));

export type ApiConfig = z.infer<typeof ApiEnvSchema>;

export function loadApiConfig(source: NodeJS.ProcessEnv = process.env): ApiConfig {
  return loadEnv(ApiEnvSchema, source) as ApiConfig;
}
