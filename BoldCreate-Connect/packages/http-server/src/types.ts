import type { EventEmitter } from 'node:events';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Logger } from 'pino';
import type { DeployEnv } from '@boldcreate-integrations/config';
import type { ErrorCode, RouteDef } from '@boldcreate-integrations/contracts';
import type { Metrics, RequestContext, ServiceName } from '@boldcreate-integrations/observability';
import type { LimiterPort } from '@boldcreate-integrations/ports';
import type { Stage, StageObserver } from './stages.js';
import type { WorkloadAuthenticator } from './workload.js';

declare module 'fastify' {
  interface FastifyRequest {
    /** Socket peer, or the right-most untrusted `X-Forwarded-For` hop behind a trusted proxy. */
    clientIp: string;
    /** Set by the authenticate stage when a workload verifier is configured. */
    callerId: string | null;
    /** Result of the authenticate hook; `null` until that stage ran. */
    principal: unknown;
    requestContext: RequestContext;
  }
  interface FastifyInstance {
    markStage(request: FastifyRequest, stage: Stage): void;
  }
  interface FastifyContextConfig {
    route?: RouteDef;
    /** Health, readiness and metrics are probed by address: no host, origin or throttle checks. */
    edgeExempt?: boolean;
  }
}

/** The keys of an app's config that the shared server reads. All limits are config. */
export interface HttpServerConfig {
  DEPLOY_ENV: DeployEnv;
  BODY_LIMIT_BYTES: number;
  MAX_HEADER_BYTES: number;
  TRUSTED_PROXY_CIDRS: readonly string[];
  ALLOWED_HOSTS: readonly string[];
  /** Required when `browserFacing` is set: the app's own origin. */
  APP_BASE_URL?: string | undefined;
  IP_THROTTLE_LIMIT: number;
  IP_THROTTLE_WINDOW_SECONDS: number;
  METRICS_ENABLED: boolean;
  SHUTDOWN_DRAIN_SECONDS: number;
  SHUTDOWN_PREDRAIN_SECONDS: number;
  HEADERS_TIMEOUT_MS?: number | undefined;
  REQUEST_TIMEOUT_MS?: number | undefined;
  KEEP_ALIVE_TIMEOUT_MS?: number | undefined;
  MAX_PARAM_LENGTH?: number | undefined;
}

export interface AuditEvent {
  request: FastifyRequest;
  route: RouteDef | undefined;
  status: number;
  /** Present when the request failed or was denied. */
  error?: unknown;
}

export interface ServerHooks {
  /** Resolves the principal of a registered route. Throw `AppError('unauthenticated')` to refuse. */
  authenticate?: (request: FastifyRequest, route: RouteDef) => Promise<unknown>;
  /** Throw `AppError('forbidden')` (or another code) to deny. */
  authorize?: (request: FastifyRequest, route: RouteDef, principal: unknown) => Promise<void>;
  /** Runs only for routes whose registry entry has idempotency `required` or `optional`. */
  idempotency?: (
    request: FastifyRequest,
    reply: FastifyReply,
    route: RouteDef,
    principal: unknown,
  ) => Promise<void>;
  /** Called from the send hook for every response, to store or abandon a claimed idempotency key. */
  idempotencyFinish?: (
    request: FastifyRequest,
    reply: FastifyReply,
    payload: unknown,
  ) => Promise<void>;
  /**
   * Runs for every error before the response is built. A hook that throws turns the response
   * into `503 service_unavailable`, so a record that must exist (a denial) is never dropped.
   */
  beforeError?: (request: FastifyRequest, error: unknown) => Promise<void>;
  /** Called once per request: for failures and denials from the error path, otherwise on send. */
  audit?: (event: AuditEvent) => Promise<void>;
}

export interface ServerLifecycle {
  /** Where `SIGTERM` and `SIGINT` arrive (default `process`). */
  signals?: Pick<EventEmitter, 'on' | 'off'>;
  exit?: (code: number) => void;
  sleep?: (ms: number) => Promise<void>;
}

export interface CreateServerOptions {
  service: ServiceName;
  config: HttpServerConfig;
  logger: Logger;
  metrics: Metrics;
  /** Route entries this app serves; `register(id, handler)` looks them up here. */
  registry?: readonly RouteDef[];
  /** Internal apps: verifies the service-to-service credential before the principal. */
  workloadVerifier?: WorkloadAuthenticator;
  ipThrottle?: { limiter: LimiterPort };
  /** Name to check; a check passes when it resolves. Each is cut off after one second. */
  readinessChecks?: Record<string, () => Promise<unknown>>;
  onShutdown?: (() => Promise<void>)[];
  /** Apps that serve a browser check that a non-GET `Origin` equals `APP_BASE_URL`. */
  browserFacing?: boolean;
  /** Content-Security-Policy value; `false` disables it. Default is `default-src 'none'`. */
  contentSecurityPolicy?: string | false;
  hooks?: ServerHooks;
  /** Answers requests that match no route; the default throws `not_found`. */
  notFound?: (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>;
  /** Seconds for `Retry-After` per code when the error itself does not set it. */
  retryAfterSeconds?: Partial<Record<ErrorCode, number>>;
  onStage?: StageObserver;
  lifecycle?: ServerLifecycle;
  readinessTimeoutMs?: number;
}
