import * as z from 'zod/v4';
import {
  BaseSchema,
  DeployEnvSchema,
  csvList,
  httpServerShape,
  isDeployed,
  observabilityDbShape,
  kmsShape,
  redisAuthShape,
  refineAdapterKeys,
  loadEnv,
  nonEmpty,
  originShape,
  port,
  portList,
  refineLocalAdapters,
  refineOrigins,
  refineWorkloadCaller,
  secret,
  withOriginDefaults,
  workloadShape,
} from '@boldcreate-integrations/config';

const ORIGIN_KEYS = ['PUBLIC_GATEWAY_URL', 'APP_BASE_URL'] as const;

const positive = (fallback: number) => z.coerce.number().int().min(1).default(fallback);

const GatewayEnvSchema = BaseSchema.extend({
  DEPLOY_ENV: DeployEnvSchema,
  PORT: port.default(3002),
  /** Temporary: the gateway reads the database with its own role until it moves to a cache. */
  DATABASE_URL: secret,
  DB_POOL_MAX: positive(10),
  /** Seconds a call waits for a free database connection (queued, not refused) before a 503. */
  DB_POOL_WAIT_SECONDS: positive(5),
  /** Database calls one pod runs at once; 0 uses the pool size. Callers beyond it wait in a queue. */
  DB_MAX_CONCURRENCY: z.coerce.number().int().min(0).default(0),
  /** Callers that may wait for the database at once; more are refused with a 503. */
  DB_QUEUE_MAX_DEPTH: positive(100),
  /** Seconds a caller waits in that queue before it is refused with a 503. */
  DB_QUEUE_MAX_WAIT_SECONDS: positive(5),
  /** Percent of the queue one organization may fill while another waits; 0 turns it off. */
  DB_QUEUE_PROJECT_SHARE_PCT: z.coerce.number().int().min(0).max(100).default(25),
  /** Where keys, servers, credentials and usage come from: this process against the database (default), or the api. */
  DATA_SOURCE: z.enum(['database', 'api']).default('database'),
  ...kmsShape,
  REDIS_URL: nonEmpty.optional(),
  ...redisAuthShape,
  ORG_KEY_CACHE_MAX: positive(1000),
  ORG_KEY_CACHE_TTL_SECONDS: positive(300),
  /** Seconds a flag or kill switch may stay in the process-local cache. */
  FLAG_CACHE_TTL_SECONDS: positive(5),
  /** Hosts that may use plain http and loopback for upstream MCP servers. Ignored when deployed. */
  UPSTREAM_ALLOW_HTTP_HOSTS: csvList,
  /** Non-default ports an upstream may use (443 is always allowed). */
  UPSTREAM_ALLOWED_PORTS: portList,
  /** Largest tool result relayed to an agent; a bigger one becomes an error result. */
  TOOL_RESULT_MAX_BYTES: positive(4_194_304),
  /** Calls one upstream server may have in flight at once, per pod. */
  SERVER_MAX_CONCURRENCY: positive(20),
  /** Tool calls one pod runs at once across all servers; 0 is no limit. */
  MCP_MAX_INFLIGHT_CALLS: z.coerce.number().int().min(0).default(100),
  /** Consecutive failures that open the breaker of an upstream server, and for how long. */
  BREAKER_FAILURES: positive(5),
  BREAKER_OPEN_SECONDS: positive(30),
  /** Requests per minute one key may make; 0 disables the limit. */
  KEY_RATE_LIMIT_PER_MINUTE: z.coerce.number().int().min(0).default(600),
  /** The api that serves sync and archive downloads; the gateway forwards those calls to it. */
  API_BASE_URL: nonEmpty.default('http://localhost:3001'),
  ...workloadShape,
  ...httpServerShape,
  ...observabilityDbShape,
  /** Agents may send up to 1 MB to the data plane. */
  BODY_LIMIT_BYTES: z.coerce.number().int().min(1024).default(1_048_576),
  /** A tool call may run up to the longest per-server timeout, so the request may as well. */
  REQUEST_TIMEOUT_MS: positive(130_000),
  ...originShape(...ORIGIN_KEYS),
})
  .superRefine((value, ctx) => {
    refineWorkloadCaller(value, ctx);
    // A deployed gateway must not read tenant data with its own database login.
    if (isDeployed(value.DEPLOY_ENV) && value.DATA_SOURCE !== 'api') {
      ctx.addIssue({
        code: 'custom',
        path: ['DATA_SOURCE'],
        message: 'DATA_SOURCE must be api in a deployed environment',
      });
    }
    refineOrigins(value, ORIGIN_KEYS, ctx);
    refineLocalAdapters(value, ctx);
    refineAdapterKeys(value, ctx);
  })
  .transform((value) => withOriginDefaults(value, ORIGIN_KEYS));

export type GatewayConfig = z.infer<typeof GatewayEnvSchema>;

export function loadGatewayConfig(source: NodeJS.ProcessEnv = process.env): GatewayConfig {
  return loadEnv(GatewayEnvSchema, source) as GatewayConfig;
}
