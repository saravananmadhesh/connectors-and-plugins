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
  observabilityDbShape,
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
  /** Seconds between runs of the job that removes expired errors and events. */
  OBSERVABILITY_RETENTION_INTERVAL_SECONDS: z.coerce.number().int().min(60).default(86_400),
  OBSERVABILITY_RETENTION_BATCH_SIZE: z.coerce.number().int().min(1).default(1000),
  /** Milliseconds to wait between delete batches, so retention leaves room for request traffic. */
  OBSERVABILITY_RETENTION_BATCH_PAUSE_MS: z.coerce.number().int().min(0).default(50),
  /** Longest a run may last; the next run continues. 0 means no limit. */
  OBSERVABILITY_RETENTION_MAX_RUN_SECONDS: z.coerce.number().int().min(0).default(300),
  /** Seconds before the next run when a run stopped at its limit with rows left. */
  OBSERVABILITY_RETENTION_CATCH_UP_SECONDS: z.coerce.number().int().min(60).default(300),
  /** Days an occurrence of an error is kept. */
  OBSERVABILITY_ERROR_EVENT_DAYS: z.coerce.number().int().min(1).default(14),
  /** Days after its last occurrence that an error group and its occurrences are removed. */
  OBSERVABILITY_ERROR_GROUP_DAYS: z.coerce.number().int().min(1).default(30),
  OBSERVABILITY_OPS_EVENT_DAYS: z.coerce.number().int().min(1).default(30),
  /** Event kinds kept for `OBSERVABILITY_LONG_LIVED_EVENT_DAYS`, such as key and auth events. */
  OBSERVABILITY_LONG_LIVED_EVENT_KINDS: csv(
    'key_created,key_revoked,auth_failures_repeated,rate_limit_blocked,ssrf_blocked',
  ),
  OBSERVABILITY_LONG_LIVED_EVENT_DAYS: z.coerce.number().int().min(1).default(90),
  /** Combined size of the three tables above which the oldest occurrences go early; 0 disables. */
  OBSERVABILITY_MAX_TOTAL_BYTES: z.coerce.number().int().min(0).default(2_147_483_648),
  /** Who is mailed when an error is new or spiking. Empty switches the alert off. */
  OBSERVABILITY_ALERT_EMAILS: csv(),
  /** Seconds between checks for errors that need an alert. */
  OBSERVABILITY_ALERT_INTERVAL_SECONDS: z.coerce.number().int().min(60).default(300),
  /** Seconds over which stored occurrences are counted for the spike rule. */
  OBSERVABILITY_ALERT_SPIKE_WINDOW_SECONDS: z.coerce.number().int().min(60).default(600),
  /** Stored occurrences in that window that make an error a spike; occurrences are sampled. */
  OBSERVABILITY_ALERT_SPIKE_OCCURRENCES: z.coerce.number().int().min(1).default(20),
  /** Seconds an error already alerted about stays quiet. */
  OBSERVABILITY_ALERT_COOLDOWN_SECONDS: z.coerce.number().int().min(60).default(21_600),
  /** The most errors one alert mail lists. */
  OBSERVABILITY_ALERT_MAX_GROUPS: z.coerce.number().int().min(1).max(50).default(10),
  /** Address of the admin app, so alert mails can link to the error pages. */
  OBSERVABILITY_ADMIN_URL: z.url().optional(),
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
  ...observabilityDbShape,
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
