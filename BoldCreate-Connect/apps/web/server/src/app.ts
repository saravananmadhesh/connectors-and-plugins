import { access, stat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import cookie from '@fastify/cookie';
import csrf from '@fastify/csrf-protection';
import fastifyStatic from '@fastify/static';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Logger } from 'pino';
import { AppError, ROUTES } from '@boldcreate-integrations/contracts';
import {
  createServer,
  type HttpServer,
  type WorkloadAuthenticator,
  type WorkloadHeaders,
} from '@boldcreate-integrations/http-server';
import type { Metrics } from '@boldcreate-integrations/observability';
import type { WebConfig } from './config.js';
import { CSRF_COOKIE, SESSION_COOKIE, bffRegistry, registerProxy } from './proxy.js';

export interface WebDeps {
  logger: Logger;
  metrics: Metrics;
  workloadHeaders: WorkloadHeaders;
  fetch?: typeof fetch;
  onShutdown?: (() => Promise<void>)[];
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/** The path, relative to the client folder, of a built file the address names; null if none. */
async function builtFile(root: string, url: string): Promise<string | null> {
  let path: string;
  try {
    path = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  } catch {
    return null;
  }
  const relative = path.replace(/^\/+/, '');
  const full = resolve(root, relative);
  if (relative === '' || !full.startsWith(resolve(root) + sep)) return null;
  const info = await stat(full).catch(() => null);
  return info?.isFile() ? relative : null;
}

/**
 * The built single-page app needs its own scripts, styles and images. Plugin logos are the one
 * exception: they are pinned links to the raw host of the repository they were read from.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://raw.githubusercontent.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export type { WorkloadAuthenticator };

/**
 * Builds the web server with every route registered and no listener: the browser-facing proxy to
 * the api, the CSRF token route and the single-page app.
 */
export async function buildApp(config: WebConfig, deps: WebDeps): Promise<HttpServer> {
  const csrfRoute = ROUTES.find((route) => route.id === 'csrf.get');
  if (!csrfRoute) throw new Error('route "csrf.get" is not in the registry');
  const indexFile = join(config.CLIENT_DIST_DIR, 'index.html');
  const hasClient = () =>
    access(indexFile).then(
      () => true,
      () => false,
    );
  const server = createServer({
    service: 'web',
    config,
    logger: deps.logger,
    metrics: deps.metrics,
    browserFacing: true,
    contentSecurityPolicy: CONTENT_SECURITY_POLICY,
    registry: [...bffRegistry(), csrfRoute],
    ...(deps.onShutdown ? { onShutdown: deps.onShutdown } : {}),
    // Single-page app: unknown paths under /api and missing files are real errors, any other page
    // is the app shell. A missing script answered with the shell would fail as a wrong MIME type.
    notFound: async (request, reply) => {
      const path = request.url.split('?')[0] ?? '';
      const isApi = path === '/api' || path.startsWith('/api/');
      const isFile = path.startsWith('/assets/') || /\.[a-z0-9]{1,8}$/i.test(path);
      if (request.method !== 'GET' || isApi || !(await hasClient()))
        throw new AppError('not_found');
      // The static plugin lists files when the server starts; a client rebuilt since then (new
      // hashed names) is still served from here instead of failing as a missing file.
      const built = await builtFile(config.CLIENT_DIST_DIR, request.url);
      if (built) return reply.sendFile(built);
      if (isFile) throw new AppError('not_found');
      return reply.sendFile('index.html');
    },
    hooks: {
      // A route that needs a session needs the cookie; whether it is valid is the api's answer.
      authenticate: async (request, route) => {
        if (route.principals.includes('none')) return null;
        const sessionToken = request.cookies[SESSION_COOKIE];
        if (!sessionToken) throw new AppError('unauthenticated');
        return { sessionToken };
      },
    },
  });
  const { app } = server;

  await app.register(cookie, { secret: config.COOKIE_SECRET, hook: 'onRequest' });
  await app.register(csrf, {
    sessionPlugin: '@fastify/cookie',
    cookieKey: CSRF_COOKIE,
    cookieOpts: { httpOnly: true, sameSite: 'strict', secure: true, path: '/' },
    getToken: (request: FastifyRequest) => {
      const token = request.headers['x-csrf-token'];
      return typeof token === 'string' ? token : undefined;
    },
  });

  // Every write needs the double-submit token, whatever the route.
  app.addHook('preHandler', (request, reply, done) => {
    if (SAFE_METHODS.has(request.method) || !request.routeOptions.config.route) {
      done();
      return;
    }
    // A refused token is sent by the plugin itself as a 403 error, which the server maps.
    app.csrfProtection(request, reply, done);
  });

  server.register('csrf.get', async (_request: FastifyRequest, reply: FastifyReply) => {
    const csrfToken = reply.generateCsrf();
    return reply.header('cache-control', 'no-store').status(200).send({ csrfToken });
  });

  registerProxy(server, {
    apiBaseUrl: config.API_BASE_URL,
    timeoutMs: config.API_TIMEOUT_MS,
    workloadHeaders: deps.workloadHeaders,
    ...(deps.fetch ? { fetch: deps.fetch } : {}),
  });

  // Registered even when the build is missing so a build finished after boot is served without a restart.
  await app.register(fastifyStatic, {
    root: config.CLIENT_DIST_DIR,
    wildcard: false,
    index: false,
  });
  if (!(await hasClient())) {
    deps.logger.warn('client build not found, only the api routes are served until it is built');
  }

  return server;
}
