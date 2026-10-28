import { createHash, randomUUID } from 'node:crypto';
import Fastify, {
  LogController,
  type FastifyBaseLogger,
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import { isDeployed } from '@boldcreate-integrations/config';
import { AppError, type ErrorDetail, type RouteDef } from '@boldcreate-integrations/contracts';
import { runWithContext } from '@boldcreate-integrations/observability';
import { globalKey } from '@boldcreate-integrations/ports';
import { createTrustedProxyMatcher, resolveClientIp } from './client-ip.js';
import { isParseError, mapError } from './errors.js';
import { registerRoute, type RouteHandler } from './routes.js';
import { createShutdown, defaultSleep, listenForSignals } from './shutdown.js';
import type { Stage } from './stages.js';
import type { CreateServerOptions } from './types.js';

export interface HttpServer {
  app: FastifyInstance;
  /** Registers the registry entry with this id. */
  register(routeId: string, handler: RouteHandler): void;
  /** Every route registered so far, one entry per method, with `:param` placeholders. */
  routes(): { method: string; url: string }[];
  listen(options: { port: number; host?: string }): Promise<string>;
  /** Stops accepting connections, waits for in-flight requests, runs the shutdown hooks once. */
  close(): Promise<void>;
}

type ReadyChecks = Record<string, 'ok' | 'error'>;

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const DEFAULT_CSP = "default-src 'none'; frame-ancestors 'none'";

interface RequestState {
  reached: Set<Stage>;
  audited: boolean;
  startedAt: number;
}

function issueDetails(prefix: string, issues: readonly { path: PropertyKey[]; message: string }[]) {
  return issues.map((issue): ErrorDetail => ({
    field: [prefix, ...issue.path.map(String)].filter((part) => part !== '').join('.'),
    message: issue.message,
  }));
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('timeout')), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/** The shared Fastify bootstrap. The fixed middleware order is documented in ADR 0004. */
export function createServer(options: CreateServerOptions): HttpServer {
  const { config, logger, metrics, hooks = {} } = options;
  const deployed = isDeployed(config.DEPLOY_ENV);
  if (deployed && config.ALLOWED_HOSTS.length === 0) {
    throw new Error('ALLOWED_HOSTS must not be empty in a deployed environment');
  }
  if (options.browserFacing && !config.APP_BASE_URL) {
    throw new Error('APP_BASE_URL is required for a browser-facing app');
  }
  const appOrigin = options.browserFacing ? new URL(config.APP_BASE_URL as string).origin : null;
  const allowedHosts = new Set(config.ALLOWED_HOSTS.map((host) => host.toLowerCase()));
  const isTrustedProxy = createTrustedProxyMatcher(config.TRUSTED_PROXY_CIDRS);
  const csp =
    options.contentSecurityPolicy === undefined ? DEFAULT_CSP : options.contentSecurityPolicy;
  const readinessTimeoutMs = options.readinessTimeoutMs ?? 1000;
  const checks = options.readinessChecks ?? {};
  const states = new WeakMap<FastifyRequest, RequestState>();

  const baseLogger: FastifyBaseLogger = logger;
  const app = Fastify({
    loggerInstance: baseLogger,
    logController: new LogController({ disableRequestLogging: true }),
    requestIdHeader: false,
    genReqId: () => randomUUID(),
    trustProxy: false,
    bodyLimit: config.BODY_LIMIT_BYTES,
    http: { maxHeaderSize: config.MAX_HEADER_BYTES },
    connectionTimeout: 0,
    keepAliveTimeout: config.KEEP_ALIVE_TIMEOUT_MS ?? 5000,
    requestTimeout: config.REQUEST_TIMEOUT_MS ?? 30_000,
    routerOptions: { maxParamLength: config.MAX_PARAM_LENGTH ?? 200 },
  });
  app.server.headersTimeout = config.HEADERS_TIMEOUT_MS ?? 10_000;

  const registeredRoutes: { method: string; url: string }[] = [];
  app.addHook('onRoute', (route) => {
    for (const method of [route.method].flat()) registeredRoutes.push({ method, url: route.url });
  });

  // Only JSON bodies are accepted; Fastify answers 415 for everything else.
  app.removeContentTypeParser('text/plain');

  const stateOf = (request: FastifyRequest): RequestState => {
    let state = states.get(request);
    if (!state) {
      state = { reached: new Set(), audited: false, startedAt: Date.now() };
      states.set(request, state);
    }
    return state;
  };
  const mark = (request: FastifyRequest, stage: Stage): void => {
    stateOf(request).reached.add(stage);
    options.onStage?.(stage, request.id);
  };
  app.decorate('markStage', mark);
  app.decorateRequest('clientIp', '');
  app.decorateRequest('callerId', null);
  app.decorateRequest('principal', null);
  app.decorateRequest('requestContext', null as never);

  const inContext = <T>(request: FastifyRequest, fn: () => T): T =>
    runWithContext(request.requestContext, fn);
  const routeOf = (request: FastifyRequest): RouteDef | undefined =>
    request.routeOptions.config.route;

  // Stage 1: request id, client address, request context, metrics and the access log.
  app.addHook('onRequest', (request, reply, done) => {
    stateOf(request);
    request.requestContext = { requestId: request.id };
    request.clientIp = resolveClientIp(
      request.socket.remoteAddress ?? '',
      typeof request.headers['x-forwarded-for'] === 'string'
        ? request.headers['x-forwarded-for']
        : undefined,
      isTrustedProxy,
    );
    void reply.header('x-request-id', request.id);
    metrics.requestStarted();
    const startedAt = process.hrtime.bigint();
    reply.raw.once('close', () => {
      metrics.requestFinished();
      const seconds = Number(process.hrtime.bigint() - startedAt) / 1e9;
      const status = reply.raw.writableFinished ? reply.statusCode : 499;
      const route = request.routeOptions.url ?? 'unmatched';
      metrics.recordRequest({ method: request.method, route, status, seconds });
      const level = request.routeOptions.config.edgeExempt ? 'debug' : 'info';
      inContext(request, () =>
        logger[level](
          { method: request.method, route, status, durationMs: seconds * 1000 },
          'request',
        ),
      );
    });
    mark(request, 'requestId');
    runWithContext(request.requestContext, done);
  });

  // Stage 2: body and header limits. Fastify enforces them; the length header is checked early.
  app.addHook('onRequest', async (request) =>
    inContext(request, async () => {
      mark(request, 'limits');
      const length = Number(request.headers['content-length']);
      if (Number.isFinite(length) && length > config.BODY_LIMIT_BYTES) {
        throw new AppError('payload_too_large');
      }
    }),
  );

  // Stage 3: Host allow-list and, for browser-facing apps, the Origin of writes.
  app.addHook('onRequest', async (request) =>
    inContext(request, async () => {
      mark(request, 'origin');
      if (request.routeOptions.config.edgeExempt) return;
      if (allowedHosts.size > 0) {
        const host = request.headers.host?.toLowerCase();
        if (host === undefined || !allowedHosts.has(host)) throw new AppError('forbidden');
      }
      const origin = request.headers.origin;
      if (appOrigin !== null && !SAFE_METHODS.has(request.method) && origin !== undefined) {
        if (origin !== appOrigin) throw new AppError('forbidden');
      }
    }),
  );

  // Stage 4: per-IP throttle. Off while the limit is 0; a failing limiter lets the request pass.
  app.addHook('onRequest', async (request, reply) =>
    inContext(request, async () => {
      mark(request, 'ipThrottle');
      const limiter = options.ipThrottle?.limiter;
      if (!limiter || config.IP_THROTTLE_LIMIT <= 0 || request.routeOptions.config.edgeExempt) {
        return;
      }
      const key = globalKey(
        'ratelimit',
        'ip',
        createHash('sha256').update(request.clientIp).digest('hex'),
      );
      let result;
      try {
        result = await limiter.check(key, {
          limit: config.IP_THROTTLE_LIMIT,
          windowSeconds: config.IP_THROTTLE_WINDOW_SECONDS,
        });
      } catch (err) {
        logger.warn({ err }, 'ip throttle unavailable, request allowed');
        return;
      }
      if (!result.allowed) {
        const seconds = Math.max(1, Math.ceil((result.resetAt.getTime() - Date.now()) / 1000));
        void reply.header('retry-after', String(seconds));
        throw new AppError('rate_limited');
      }
    }),
  );

  // Stage 5: the body is parsed by Fastify before this hook; params, query, body and headers are
  // validated against the registry entry.
  app.addHook('preValidation', async (request) =>
    inContext(request, async () => {
      mark(request, 'parse');
      const route = routeOf(request);
      if (!route) return;
      if (route.params) {
        const parsed = route.params.safeParse(request.params);
        // A malformed id can never exist, so it answers like an unknown one.
        if (!parsed.success) throw new AppError('not_found');
        request.params = parsed.data;
      }
      const details: ErrorDetail[] = [];
      const parts = [
        ['query', route.query, request.query],
        ['body', route.body, request.body],
        ['headers', route.headers, request.headers],
      ] as const;
      for (const [prefix, schema, value] of parts) {
        if (!schema) continue;
        const parsed = schema.safeParse(value);
        if (!parsed.success) {
          details.push(...issueDetails(prefix === 'body' ? '' : prefix, parsed.error.issues));
        } else if (prefix === 'query') request.query = parsed.data;
        else if (prefix === 'body') request.body = parsed.data;
      }
      if (details.length > 0) throw new AppError('validation_failed', details);
    }),
  );

  // Stage 6: workload identity, then the route's principal.
  app.addHook('preHandler', async (request) =>
    inContext(request, async () => {
      const route = routeOf(request);
      if (!route) return;
      mark(request, 'authenticate');
      if (options.workloadVerifier) {
        try {
          request.callerId = (
            await options.workloadVerifier.authenticate(request.headers)
          ).callerId;
        } catch {
          throw new AppError('unauthenticated');
        }
      }
      if (hooks.authenticate) request.principal = await hooks.authenticate(request, route);
    }),
  );

  // Stage 7: authorization.
  app.addHook('preHandler', async (request) =>
    inContext(request, async () => {
      const route = routeOf(request);
      if (!route) return;
      mark(request, 'authorize');
      await hooks.authorize?.(request, route, request.principal);
    }),
  );

  // Stage 8: idempotency, after the principal is known because its record is keyed on it.
  app.addHook('preHandler', async (request, reply) =>
    inContext(request, async () => {
      const route = routeOf(request);
      if (!route) return;
      mark(request, 'idempotency');
      if (route.idempotency !== 'none') {
        await hooks.idempotency?.(request, reply, route, request.principal);
        // A replay or an in-progress answer was already sent; stop here.
        if (reply.sent) return reply;
      }
    }),
  );

  // In test runs a response that does not match its registered schema is a server error.
  if (config.DEPLOY_ENV === 'test') {
    app.addHook('preSerialization', async (request, reply, payload) => {
      const route = routeOf(request);
      if (!route || reply.statusCode >= 400) return payload;
      const schema = route.responses[reply.statusCode];
      if (!schema) throw new Error(`status ${reply.statusCode} is not registered for ${route.id}`);
      if (!schema.safeParse(payload).success) {
        throw new Error(`response of ${route.id} does not match its registered schema`);
      }
      return payload;
    });
  }

  const runAudit = async (
    request: FastifyRequest,
    status: number,
    error?: unknown,
  ): Promise<void> => {
    const state = stateOf(request);
    if (state.audited) return;
    state.audited = true;
    mark(request, 'audit');
    try {
      await inContext(request, () =>
        hooks.audit?.({
          request,
          route: routeOf(request),
          status,
          ...(error === undefined ? {} : { error }),
        }),
      );
    } catch (err) {
      logger.error({ err }, 'audit hook failed');
    }
  };

  // Stage 10 for requests that did not fail; also adds the security headers to every response.
  app.addHook('onSend', async (request, reply, payload) => {
    void reply.header('x-content-type-options', 'nosniff');
    void reply.header('referrer-policy', 'no-referrer');
    void reply.header('x-frame-options', 'DENY');
    if (csp !== false) void reply.header('content-security-policy', csp);
    if (deployed) {
      void reply.header('strict-transport-security', 'max-age=31536000; includeSubDomains');
    }
    await hooks.idempotencyFinish?.(request, reply, payload);
    await runAudit(request, reply.statusCode);
    return payload;
  });

  // Stages 10 and 11 for requests that failed or were denied.
  app.setErrorHandler(async (thrown, request, reply) => {
    let err: unknown = thrown;
    if (hooks.beforeError) {
      try {
        await inContext(request, () => hooks.beforeError?.(request, thrown));
      } catch (hookError) {
        inContext(request, () => logger.error({ err: hookError }, 'error hook failed'));
        err = new AppError('service_unavailable');
      }
    }
    const mapped = mapError(err, request.id, options.retryAfterSeconds);
    if (isParseError(err)) mark(request, 'parse');
    await runAudit(request, mapped.status, err);
    mark(request, 'errorMapper');
    if (mapped.unexpected) {
      inContext(request, () => logger.error({ err }, 'unhandled error'));
    }
    if (mapped.retryAfterSeconds !== undefined && !reply.hasHeader('retry-after')) {
      void reply.header('retry-after', String(mapped.retryAfterSeconds));
    }
    return reply.status(mapped.status).send(mapped.body);
  });
  app.setNotFoundHandler(async (request, reply) => {
    if (options.notFound) return options.notFound(request, reply);
    throw new AppError('not_found');
  });

  // Health, readiness and metrics.
  const probe = { config: { edgeExempt: true } };
  app.get('/healthz', probe, async () => ({ status: 'ok' }));

  const shutdown = createShutdown({
    predrainSeconds: config.SHUTDOWN_PREDRAIN_SECONDS,
    drainSeconds: config.SHUTDOWN_DRAIN_SECONDS,
    close: () => close(),
    logger,
    exit: options.lifecycle?.exit ?? ((code) => process.exit(code)),
    sleep: options.lifecycle?.sleep ?? defaultSleep,
  });

  app.get('/readyz', probe, async (_request, reply: FastifyReply) => {
    if (shutdown.draining) return reply.status(503).send({ status: 'unavailable', checks: {} });
    const results: ReadyChecks = {};
    await Promise.all(
      Object.entries(checks).map(async ([name, check]) => {
        try {
          await withTimeout(Promise.resolve().then(check), readinessTimeoutMs);
          results[name] = 'ok';
        } catch {
          results[name] = 'error';
        }
      }),
    );
    const ready = Object.values(results).every((value) => value === 'ok');
    return reply
      .status(ready ? 200 : 503)
      .send({ status: ready ? 'ok' : 'unavailable', checks: results });
  });

  if (config.METRICS_ENABLED) {
    app.get('/metrics', probe, async (_request, reply) => {
      void reply.header('content-type', metrics.contentType);
      return metrics.scrape();
    });
  }

  app.addHook('onClose', async () => {
    metrics.stop();
  });

  let closing: Promise<void> | undefined;
  const close = (): Promise<void> => {
    closing ??= (async () => {
      removeSignals();
      // Connections that go idle after the first sweep would otherwise wait for the keep-alive timeout.
      const sweep = setInterval(() => app.server.closeIdleConnections(), 100);
      try {
        await app.close();
      } finally {
        clearInterval(sweep);
      }
      for (const hook of options.onShutdown ?? []) {
        try {
          await hook();
        } catch (err) {
          logger.error({ err }, 'shutdown hook failed');
        }
      }
    })();
    return closing;
  };

  let removeSignals: () => void = () => {};

  return {
    app,
    register(routeId, handler) {
      const route = options.registry?.find((entry) => entry.id === routeId);
      if (!route) throw new Error(`route "${routeId}" is not in the registry`);
      registerRoute(app, route, handler);
    },
    routes: () => registeredRoutes.map((route) => ({ ...route })),
    async listen({ port, host = '0.0.0.0' }) {
      const address = await app.listen({ port, host });
      removeSignals = listenForSignals(options.lifecycle?.signals ?? process, (signal) => {
        void shutdown.handleSignal(signal);
      });
      return address;
    },
    close,
  };
}
