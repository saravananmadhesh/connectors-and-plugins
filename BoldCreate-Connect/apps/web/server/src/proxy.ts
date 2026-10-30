import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  ApiErrorSchema,
  AppError,
  EXTERNAL_RETURN_HEADER,
  ROUTES,
  type ErrorDetail,
  type RouteDef,
} from '@boldcreate-integrations/contracts';
import { type HttpServer, type WorkloadHeaders } from '@boldcreate-integrations/http-server';
import {
  COOKIE_CLEARING_ON_SUCCESS_ROUTES,
  COOKIE_CLEARING_ROUTES,
  REDIRECT_ROUTES,
  SESSION_ISSUING_ROUTES,
  browserResponses,
} from './proxy.special.js';

export const SESSION_COOKIE = '__Host-sid';
export const CSRF_COOKIE = '__Host-csrf';

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: true,
  path: '/',
  maxAge: 12 * 60 * 60,
};

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH']);

export interface ProxyOptions {
  apiBaseUrl: string;
  timeoutMs: number;
  workloadHeaders: WorkloadHeaders;
  fetch?: typeof fetch;
}

/** The registry entries served to the browser, under `/api`, as the web server's own registry. */
export function bffRegistry(): RouteDef[] {
  return ROUTES.filter((route) => route.exposure === 'bff').map((route) => ({
    ...route,
    pathTemplate: `/api${route.pathTemplate}`,
    // Validated in the handler against the registered schemas, because the originals decode ids
    // and the api needs the wire form.
    params: undefined as never,
    query: undefined as never,
    body: undefined as never,
    responses: browserResponses(route),
  }));
}

function fieldPath(prefix: string, path: PropertyKey[]): string {
  return [prefix, ...path.map(String)].filter((part) => part !== '').join('.');
}

function validate(route: RouteDef, request: FastifyRequest): void {
  const details: ErrorDetail[] = [];
  const parts = [
    // A write that carries nothing is sent as an empty object, as the api reads it.
    ['', route.body, request.body ?? (BODY_METHODS.has(route.method) ? {} : undefined)],
    ['query', route.query, request.query],
  ] as const;
  for (const [prefix, schema, value] of parts) {
    if (!schema) continue;
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      details.push(
        ...parsed.error.issues.map((issue) => ({
          field: fieldPath(prefix, issue.path),
          message: issue.message,
        })),
      );
    }
  }
  if (route.params && !route.params.safeParse(request.params).success) {
    throw new AppError('not_found');
  }
  if (details.length > 0) throw new AppError('validation_failed', details);
}

function upstreamPath(route: RouteDef, request: FastifyRequest): string {
  const params = request.params as Record<string, string>;
  const path = route.pathTemplate.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g, (_match, name: string) =>
    encodeURIComponent(params[name] ?? ''),
  );
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(request.query as Record<string, unknown>)) {
    if (typeof value === 'string') query.append(key, value);
  }
  const suffix = query.toString();
  return suffix.length > 0 ? `${path}?${suffix}` : path;
}

const BOUNCE_PARAM = '_r';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** A page that returns to the same address from this site, so the session cookie goes along. */
function bouncePage(request: FastifyRequest): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(request.query as Record<string, unknown>)) {
    if (typeof value === 'string') query.append(key, value);
  }
  query.set(BOUNCE_PARAM, '1');
  const target = `${request.url.split('?')[0]}?${query.toString()}`;
  return `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${escapeHtml(target)}"><title>Continuing</title>`;
}

/** Where a member lands when the sign-in to a server did not complete. */
function failedSignIn(reply: FastifyReply): FastifyReply {
  return reply.header('cache-control', 'no-store').redirect('/installed?tab=mcp&oauth=failed', 302);
}

/** The in-app address a redirect from the api points to; anything else is dropped. */
function landingPath(location: string | null): string | null {
  if (!location) return null;
  try {
    const url = new URL(location, 'http://local.invalid');
    return url.pathname.startsWith('/') && !url.pathname.startsWith('//')
      ? `${url.pathname}${url.search}`
      : null;
  } catch {
    return null;
  }
}

/**
 * The address a host's sign-in flow sends the browser to. Only the api sets the marker, and only after it
 * checked the address against the origins the app registered; an address with credentials or a
 * scheme other than http(s) is refused anyway.
 */
function externalTarget(location: string | null): string | null {
  if (!location) return null;
  try {
    const url = new URL(location);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.username === '' && url.password === '' ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * Registers one browser-facing route per registry entry with `exposure: 'bff'`. Each call is
 * validated before it leaves, forwarded to the api with workload identity and the session
 * token from the cookie, and its answer is checked against the registered response schema, which
 * also removes fields the registry does not know.
 */
export function registerProxy(server: HttpServer, options: ProxyOptions): void {
  const doFetch = options.fetch ?? fetch;
  const originals = new Map(ROUTES.map((route) => [route.id, route]));

  for (const bff of bffRegistry()) {
    const route = originals.get(bff.id) as RouteDef;
    server.register(bff.id, async (request: FastifyRequest, reply: FastifyReply) => {
      const redirects = REDIRECT_ROUTES.has(route.id);
      if (redirects) {
        const query = request.query as Record<string, unknown>;
        if (query[BOUNCE_PARAM] !== '1') {
          validate(route, request);
          return reply
            .header('cache-control', 'no-store')
            .type('text/html; charset=utf-8')
            .send(bouncePage(request));
        }
        delete query[BOUNCE_PARAM];
      }
      validate(route, request);

      const sessionToken = request.cookies[SESSION_COOKIE];
      const headers: Record<string, string> = await options.workloadHeaders();
      if (sessionToken) headers['x-session-token'] = sessionToken;
      // The api counts sign-in attempts per browser address, so it needs the one this server saw.
      if (request.clientIp) headers['x-forwarded-for'] = request.clientIp;
      const idemKey = request.headers['idempotency-key'];
      if (typeof idemKey === 'string') headers['idempotency-key'] = idemKey;
      const sendsBody = BODY_METHODS.has(route.method);
      if (sendsBody) headers['content-type'] = 'application/json';

      let upstream: Response;
      try {
        upstream = await doFetch(`${options.apiBaseUrl}${upstreamPath(route, request)}`, {
          method: route.method,
          headers,
          ...(sendsBody ? { body: JSON.stringify(request.body ?? {}) } : {}),
          ...(redirects ? { redirect: 'manual' as const } : {}),
          signal: AbortSignal.timeout(options.timeoutMs),
        });
      } catch {
        if (redirects) {
          request.log.warn({ route: route.id }, 'sign-in return: the api did not answer');
          return failedSignIn(reply);
        }
        throw new AppError('upstream_unavailable');
      }

      const clear =
        COOKIE_CLEARING_ROUTES.has(route.id) ||
        upstream.status === 401 ||
        (COOKIE_CLEARING_ON_SUCCESS_ROUTES.has(route.id) && upstream.status < 400);
      if (clear && sessionToken) reply.clearCookie(SESSION_COOKIE, { path: '/' });

      if (redirects && upstream.status >= 400) {
        // The member sees one failure; the log keeps the api's classified code.
        const failure = ApiErrorSchema.safeParse(await upstream.json().catch(() => undefined));
        request.log.warn(
          { route: route.id, status: upstream.status, code: failure.data?.error.code },
          'sign-in return refused by the api',
        );
        return failedSignIn(reply);
      }

      const text = await upstream.text();
      let json: unknown;
      try {
        json = text.length > 0 ? JSON.parse(text) : undefined;
      } catch {
        throw new AppError('upstream_unavailable');
      }

      if (upstream.status >= 400) {
        const retryAfter = upstream.headers.get('retry-after');
        if (retryAfter && /^[0-9]{1,6}$/.test(retryAfter))
          void reply.header('retry-after', retryAfter);
        const error = ApiErrorSchema.safeParse(json);
        if (!error.success) throw new AppError('upstream_unavailable');
        throw new AppError(
          error.data.error.code,
          error.data.error.code === 'validation_failed' ? error.data.error.details : undefined,
        );
      }

      if (redirects && upstream.status === 302) {
        if (upstream.headers.get(EXTERNAL_RETURN_HEADER) === '1') {
          const external = externalTarget(upstream.headers.get('location'));
          if (!external) throw new AppError('upstream_unavailable');
          return reply
            .header('cache-control', 'no-store')
            .header('referrer-policy', 'no-referrer')
            .redirect(external, 302);
        }
        const target = landingPath(upstream.headers.get('location'));
        if (!target) throw new AppError('upstream_unavailable');
        return reply.header('cache-control', 'no-store').redirect(target, 302);
      }

      const schema = route.responses[upstream.status];
      if (!schema) throw new AppError('upstream_unavailable');
      const parsed = schema.safeParse(json);
      if (!parsed.success) throw new AppError('upstream_unavailable');

      if (SESSION_ISSUING_ROUTES.has(route.id)) {
        const { sessionToken: issued, ...rest } = parsed.data as {
          sessionToken: string;
        } & Record<string, unknown>;
        reply.setCookie(SESSION_COOKIE, issued, SESSION_COOKIE_OPTIONS);
        return reply.status(upstream.status).send(rest);
      }
      if (parsed.data === undefined) return reply.status(upstream.status).send();
      return reply.status(upstream.status).send(parsed.data);
    });
  }
}
