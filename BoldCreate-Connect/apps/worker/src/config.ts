import * as z from 'zod/v4';
import {
  BaseSchema,
  blobShape,
  csv,
  csvList,
  portList,
  DEFAULT_SOURCE_OWNERS,
  DeployEnvSchema,
  httpServerShape,
  emailShape,
  kmsShape,
  redisAuthShape,
  refineAdapterKeys,
  secretsShape,
  loadEnv,
  nonEmpty,
  originShape,
  port,
  refineLocalAdapters,
  refineOrigins,
  secret,
  withOriginDefaults,
} from '@boldcreate-integrations/config';

const ORIGIN_KEYS = ['APP_BASE_URL'] as const;

const WorkerEnvSchema = BaseSchema.extend({
  DEPLOY_ENV: DeployEnvSchema,
  /** Database login for role `app_worker`. */
  DATABASE_URL: secret,
  DB_POOL_MAX: z.coerce.number().int().min(1).default(5),
  /** Port of the health, readiness and metrics server (the worker has no other ingress). */
  HEALTH_PORT: port.default(3005),
  ...emailShape,
  OUTBOX_POLL_INTERVAL_MS: z.coerce.number().int().min(1000).default(5000),
  ...kmsShape,
  ...secretsShape,
  ...blobShape,
  /** GitHub owners whose repositories may be ingested. Empty allows none. */
  PLUGIN_SOURCE_ALLOWED_OWNERS: csv(DEFAULT_SOURCE_OWNERS),
  /** Optional token for private source repositories; sent to the GitHub API only. */
  GITHUB_TOKEN: secret.optional(),
  REDIS_URL: nonEmpty.optional(),
  ...redisAuthShape,
  /** Seconds a flag or kill switch may stay in the process-local cache. */
  FLAG_CACHE_TTL_SECONDS: z.coerce.number().int().min(1).default(5),
  IDEMPOTENCY_PURGE_INTERVAL_SECONDS: z.coerce.number().int().min(1).default(900),
  IDEMPOTENCY_PURGE_BATCH_SIZE: z.coerce.number().int().min(1).default(1000),
  /** Seconds between runs of the job that sends project webhooks. */
  WEBHOOK_DISPATCH_INTERVAL_SECONDS: z.coerce.number().int().min(1).default(5),
  /** Seconds an audit event waits before a webhook picks it up. */
  WEBHOOK_EVENT_LAG_SECONDS: z.coerce.number().int().min(0).default(2),
  /** Seconds before the second attempt of a delivery; later waits double. */
  WEBHOOK_RETRY_BASE_SECONDS: z.coerce.number().int().min(0).default(30),
  /** Hosts that may receive `http` and are not refused as local; ignored when deployed. */
  WEBHOOK_ALLOW_HTTP_HOSTS: csvList,
  /** Non-default ports a webhook may use. */
  WEBHOOK_ALLOWED_PORTS: portList,
  ...httpServerShape,
  ...originShape(...ORIGIN_KEYS),
})
  .superRefine((value, ctx) => {
    refineOrigins(value, ORIGIN_KEYS, ctx);
    refineLocalAdapters(value, ctx);
    refineAdapterKeys(value, ctx);
  })
  .transform((value) => withOriginDefaults(value, ORIGIN_KEYS));

export type WorkerConfig = z.infer<typeof WorkerEnvSchema>;

export function loadWorkerConfig(source: NodeJS.ProcessEnv = process.env): WorkerConfig {
  return loadEnv(WorkerEnvSchema, source) as WorkerConfig;
}
