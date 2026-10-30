import { access, stat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import cookie from '@fastify/cookie';
import csrf from '@fastify/csrf-protection';
import fastifyStatic from '@fastify/static';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Logger } from 'pino';
import {
  AppError,
  ROUTES,
  type AdminActionBody,
  type AdminAuditQuery,
  type AdminErrorGroupStatusBody,
  type AdminErrorGroupsQuery,
  type AdminObservabilityOverviewQuery,
  type AdminObservabilityPurgeBody,
  type AdminOpsEventsQuery,
  type AdminPluginBulkUpdateBody,
  type AdminPluginSourceBody,
  type AdminPluginListQuery,
  type AdminPluginStatusBody,
  type AdminPluginUpdateBody,
  type AdminStatsQuery,
  type VersionChange,
  type BulkIdsBody,
  type AddAdminAllowedEmailBody,
  type CreateCategoryBody,
  type PluginFlagsBody,
  type SetPluginCategoriesBody,
  type UpdateCategoryBody,
  type AdminSessionResponse,
  type CreatePluginSourceBody,
  type DiscoverPluginsBody,
  type InstallPluginsBody,
} from '@boldcreate-integrations/contracts';
import type { Db } from '@boldcreate-integrations/db';
import {
  authenticateAdminSession,
  changeVersion,
  completeAdminSetup,
  addAdminAllowedEmail,
  createCategory,
  inviteAdminAllowedEmail,
  listAdminAllowedEmails,
  removeAdminAllowedEmail,
  createSource,
  deleteCategory,
  deletePlugin,
  deleteSource,
  updateSource,
  discoverRepository,
  installPlugins,
  type IngestionDeps,
  getAdminPlugin,
  getAdminVersion,
  listAdminCategories,
  bulkDeletePlugins,
  bulkPublishLatest,
  bulkSyncPlugins,
  bulkUpdatePlugins,
  syncPlugin,
  deleteSources,
  getAdminStats,
  listAdminPlugins,
  requestBulkSync,
  updatePlugin,
  listIngestions,
  listSources,
  pluginImpact,
  setPluginCategories,
  setPluginFlags,
  setPluginStatus,
  updateCategory,
  versionImpact,
  requestSync,
  listAuditLog,
  createPostgresObservabilityReader,
  type ObservabilityReader,
  updatePluginSource,
  requestAdminSetup,
  signInAdmin,
  signOutAdmin,
  type AdminAuthPolicy,
  type AdminSession,
} from '@boldcreate-integrations/domain';
import { createServer, type HttpServer } from '@boldcreate-integrations/http-server';
import type { ErrorReporter, Metrics } from '@boldcreate-integrations/observability';
import { ADMIN_CSRF_COOKIE, ADMIN_SESSION_COOKIE, type AdminConfig } from './config.js';

export interface AdminDeps {
  logger: Logger;
  metrics: Metrics;
  errors?: ErrorReporter;
  db: Db;
  /** Where errors and events are stored; the main database when unset. */
  /** Where errors and events are stored; the main database when unset. */
  observabilityDb?: Db;
  /** A reader for another backend; overrides `observabilityDb`. */
  observabilityReader?: ObservabilityReader;
  /** Readiness probe of the database; `SELECT 1` in the real wiring. */
  pingDb: () => Promise<unknown>;
  /** Resolves a ref to a commit and downloads it, to inspect a repository before installing. */
  fetchArchive: IngestionDeps['fetchArchive'];
  onShutdown?: (() => Promise<void>)[];
}

declare module 'fastify' {
  interface FastifyRequest {
    adminSession?: AdminSession;
  }
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/** The built single-page app needs its own scripts, styles and images, nothing from elsewhere. */
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

const ADMIN_ROUTE_IDS = [
  'adminCsrf.get',
  'adminAuth.requestSetup',
  'adminAuth.completeSetup',
  'adminAuth.signin',
  'adminAuth.signout',
  'adminAuth.session',
  'adminPluginSources.list',
  'adminPluginSources.create',
  'adminPluginSources.discover',
  'adminPluginSources.install',
  'adminPluginSources.bulkSync',
  'adminPluginSources.bulkDelete',
  'adminPlugins.update',
  'adminPlugins.updateSource',
  'adminAudit.list',
  'adminObservability.listErrors',
  'adminObservability.getError',
  'adminObservability.setErrorStatus',
  'adminObservability.deleteError',
  'adminObservability.listEvents',
  'adminObservability.storage',
  'adminObservability.overview',
  'adminObservability.purge',
  'adminPlugins.bulkDelete',
  'adminPlugins.bulkUpdate',
  'adminPlugins.bulkSync',
  'adminPlugins.bulkPublishLatest',
  'adminPlugins.sync',
  'adminStats.get',
  'adminPluginSources.sync',
  'adminPluginSources.ingestions',
  'adminPluginSources.update',
  'adminPluginSources.delete',
  'adminPlugins.list',
  'adminPlugins.get',
  'adminPlugins.impact',
  'adminPlugins.setStatus',
  'adminPlugins.delete',
  'adminPlugins.setCategories',
  'adminPlugins.setFlags',
  'adminAllowedEmails.list',
  'adminAllowedEmails.add',
  'adminAllowedEmails.invite',
  'adminAllowedEmails.remove',
  'adminCategories.list',
  'adminCategories.create',
  'adminCategories.update',
  'adminCategories.delete',
  'adminPluginVersions.get',
  'adminPluginVersions.impact',
  'adminPluginVersions.approve',
  'adminPluginVersions.reject',
  'adminPluginVersions.reopen',
  'adminPluginVersions.publish',
  'adminPluginVersions.yank',
] as const;

export function adminAuthPolicy(config: AdminConfig): AdminAuthPolicy {
  return {
    session: {
      idleSeconds: config.SESSION_IDLE_SECONDS,
      absoluteSeconds: config.SESSION_ABSOLUTE_SECONDS,
      slideMinIntervalSeconds: config.SESSION_SLIDE_MIN_INTERVAL_SECONDS,
    },
    maxFailedLogins: config.LOGIN_MAX_FAILED,
    lockSeconds: config.LOGIN_LOCK_SECONDS,
    passwordMinLength: config.PASSWORD_MIN_LENGTH,
    allowedEmails: config.ADMIN_ALLOWED_EMAILS,
    setupTtlSeconds: config.SETUP_LINK_TTL_SECONDS,
    setupUrl: new URL('/setup', config.APP_BASE_URL).toString(),
  };
}

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
 * Builds the admin HTTP server with no listener: health, the sign-in routes and the single-page
 * app. Every other path under `/api` answers `404 not_found`.
 */
export async function buildApp(config: AdminConfig, deps: AdminDeps): Promise<HttpServer> {
  const registry = ADMIN_ROUTE_IDS.map((id) => {
    const route = ROUTES.find((entry) => entry.id === id);
    if (!route) throw new Error(`route "${id}" is not in the registry`);
    return route;
  });
  const policy = adminAuthPolicy(config);
  const indexFile = join(config.CLIENT_DIST_DIR, 'index.html');
  const hasClient = await access(indexFile).then(
    () => true,
    () => false,
  );

  const observability =
    deps.observabilityReader ??
    createPostgresObservabilityReader({
      store: deps.observabilityDb ?? deps.db,
      audit: deps.db,
      maxTotalBytes: config.OBSERVABILITY_MAX_TOTAL_BYTES,
    });
  const server = createServer({
    service: 'admin',
    config,
    logger: deps.logger,
    metrics: deps.metrics,
    ...(deps.errors ? { errors: deps.errors } : {}),
    readinessChecks: { db: deps.pingDb },
    browserFacing: true,
    contentSecurityPolicy: CONTENT_SECURITY_POLICY,
    registry,
    ...(deps.onShutdown ? { onShutdown: deps.onShutdown } : {}),
    // Single-page app: unknown paths under /api are JSON errors, any other page is the app shell.
    notFound: async (request, reply) => {
      const isApi = request.url === '/api' || request.url.startsWith('/api/');
      if (request.method !== 'GET' || isApi || !hasClient) throw new AppError('not_found');
      // The static plugin lists files when the server starts; a client rebuilt since then (new
      // hashed names) is still served from here instead of getting the page.
      const built = await builtFile(config.CLIENT_DIST_DIR, request.url);
      return reply.sendFile(built ?? 'index.html');
    },
    hooks: {
      authenticate: async (request, route) => {
        if (route.principals.includes('none')) return null;
        const token = request.cookies[ADMIN_SESSION_COOKIE];
        if (!token) throw new AppError('unauthenticated');
        const session = await authenticateAdminSession(deps.db, policy, token);
        if (!session) throw new AppError('unauthenticated');
        request.adminSession = session;
        return { kind: 'platform_admin', subject: session.email };
      },
    },
  });
  const { app } = server;

  await app.register(cookie, { secret: config.COOKIE_SECRET, hook: 'onRequest' });
  await app.register(csrf, {
    sessionPlugin: '@fastify/cookie',
    cookieKey: ADMIN_CSRF_COOKIE,
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
    app.csrfProtection(request, reply, done);
  });

  const ctxOf = (request: FastifyRequest) => ({ ip: request.clientIp, requestId: request.id });
  const sessionCookie = {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: true,
    path: '/',
    maxAge: config.SESSION_ABSOLUTE_SECONDS,
  };
  const noStore = (reply: FastifyReply): FastifyReply => reply.header('cache-control', 'no-store');

  server.register('adminCsrf.get', async (_request, reply) => {
    const csrfToken = reply.generateCsrf();
    return noStore(reply).status(200).send({ csrfToken });
  });

  server.register('adminAuth.requestSetup', async (request, reply) => {
    const { email } = request.body as { email: string };
    await requestAdminSetup(deps.db, policy, email);
    return noStore(reply).status(202).send({});
  });

  server.register('adminAuth.completeSetup', async (request, reply) => {
    const body = request.body as { token: string; password: string };
    const { sessionToken, email } = await completeAdminSetup(deps.db, policy, body, ctxOf(request));
    reply.setCookie(ADMIN_SESSION_COOKIE, sessionToken, sessionCookie);
    return noStore(reply)
      .status(200)
      .send({ email } satisfies AdminSessionResponse);
  });

  server.register('adminAuth.signin', async (request, reply) => {
    const body = request.body as { email: string; password: string };
    const { sessionToken, email } = await signInAdmin(deps.db, policy, body, ctxOf(request));
    reply.setCookie(ADMIN_SESSION_COOKIE, sessionToken, sessionCookie);
    return noStore(reply)
      .status(200)
      .send({ email } satisfies AdminSessionResponse);
  });

  server.register('adminAuth.signout', async (request, reply) => {
    await signOutAdmin(deps.db, request.adminSession as AdminSession, ctxOf(request));
    reply.clearCookie(ADMIN_SESSION_COOKIE, { path: '/' });
    return noStore(reply).status(204).send();
  });

  server.register('adminAuth.session', async (request, reply) => {
    const { email } = request.adminSession as AdminSession;
    return noStore(reply)
      .status(200)
      .send({ email } satisfies AdminSessionResponse);
  });

  const actorOf = (request: FastifyRequest) => ({
    subject: (request.adminSession as AdminSession).email,
    requestId: request.id,
    ip: request.clientIp,
  });
  const sourceIdOf = (request: FastifyRequest) => (request.params as { sourceId: string }).sourceId;

  server.register('adminPluginSources.list', async (_request, reply) => {
    return noStore(reply)
      .status(200)
      .send({ items: await listSources(deps.db) });
  });

  server.register('adminPluginSources.create', async (request, reply) => {
    const source = await createSource(
      deps.db,
      config.PLUGIN_SOURCE_ALLOWED_OWNERS,
      request.body as CreatePluginSourceBody,
      actorOf(request),
    );
    return noStore(reply).status(201).send(source);
  });

  server.register('adminPluginSources.discover', async (request, reply) => {
    const found = await discoverRepository(
      {
        db: deps.db,
        fetchArchive: deps.fetchArchive,
        allowedOwners: config.PLUGIN_SOURCE_ALLOWED_OWNERS,
      },
      request.body as DiscoverPluginsBody,
    );
    return noStore(reply).status(200).send(found);
  });

  server.register('adminPluginSources.install', async (request, reply) => {
    const result = await installPlugins(
      deps.db,
      config.PLUGIN_SOURCE_ALLOWED_OWNERS,
      request.body as InstallPluginsBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(result);
  });

  server.register('adminPluginSources.bulkSync', async (request, reply) => {
    const { ids } = request.body as BulkIdsBody;
    return noStore(reply)
      .status(200)
      .send(await requestBulkSync(deps.db, ids, actorOf(request)));
  });

  server.register('adminPluginSources.bulkDelete', async (request, reply) => {
    const { ids } = request.body as BulkIdsBody;
    return noStore(reply)
      .status(200)
      .send(await deleteSources(deps.db, ids, actorOf(request)));
  });

  server.register('adminPluginSources.sync', async (request, reply) => {
    const ingestion = await requestSync(deps.db, sourceIdOf(request), actorOf(request));
    return noStore(reply).status(202).send(ingestion);
  });

  server.register('adminPluginSources.ingestions', async (request, reply) => {
    const items = await listIngestions(deps.db, sourceIdOf(request));
    return noStore(reply).status(200).send({ items });
  });

  server.register('adminPluginSources.update', async (request, reply) => {
    const source = await updateSource(
      deps.db,
      config.PLUGIN_SOURCE_ALLOWED_OWNERS,
      sourceIdOf(request),
      request.body as AdminPluginSourceBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(source);
  });

  server.register('adminPluginSources.delete', async (request, reply) => {
    await deleteSource(deps.db, sourceIdOf(request), actorOf(request));
    return noStore(reply).status(204).send();
  });

  const pluginIdOf = (request: FastifyRequest) => (request.params as { pluginId: string }).pluginId;
  const versionIdOf = (request: FastifyRequest) =>
    (request.params as { versionId: string }).versionId;

  server.register('adminPlugins.list', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await listAdminPlugins(deps.db, request.query as AdminPluginListQuery));
  });

  server.register('adminPlugins.bulkUpdate', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(
        await bulkUpdatePlugins(
          deps.db,
          request.body as AdminPluginBulkUpdateBody,
          actorOf(request),
        ),
      );
  });

  server.register('adminPlugins.bulkPublishLatest', async (request, reply) => {
    const { ids } = request.body as BulkIdsBody;
    return noStore(reply)
      .status(200)
      .send(await bulkPublishLatest(deps.db, ids, actorOf(request)));
  });

  server.register('adminPlugins.bulkSync', async (request, reply) => {
    const { ids } = request.body as BulkIdsBody;
    return noStore(reply)
      .status(200)
      .send(await bulkSyncPlugins(deps.db, ids, actorOf(request)));
  });

  server.register('adminPlugins.sync', async (request, reply) => {
    const ingestion = await syncPlugin(deps.db, pluginIdOf(request), actorOf(request));
    return noStore(reply).status(202).send(ingestion);
  });

  server.register('adminPlugins.get', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await getAdminPlugin(deps.db, pluginIdOf(request)));
  });

  server.register('adminPlugins.update', async (request, reply) => {
    const plugin = await updatePlugin(
      deps.db,
      pluginIdOf(request),
      request.body as AdminPluginUpdateBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(plugin);
  });

  server.register('adminPlugins.updateSource', async (request, reply) => {
    const plugin = await updatePluginSource(
      deps.db,
      config.PLUGIN_SOURCE_ALLOWED_OWNERS,
      pluginIdOf(request),
      request.body as AdminPluginSourceBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(plugin);
  });

  server.register('adminAudit.list', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await listAuditLog(deps.db, request.query as AdminAuditQuery));
  });

  const groupIdOf = (request: FastifyRequest) => (request.params as { groupId: string }).groupId;

  server.register('adminObservability.listErrors', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await observability.listErrorGroups(request.query as AdminErrorGroupsQuery));
  });

  server.register('adminObservability.getError', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await observability.getErrorGroup(groupIdOf(request)));
  });

  server.register('adminObservability.setErrorStatus', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(
        await observability.setErrorGroupStatus(
          groupIdOf(request),
          request.body as AdminErrorGroupStatusBody,
          actorOf(request),
        ),
      );
  });

  server.register('adminObservability.deleteError', async (request, reply) => {
    await observability.deleteErrorGroup(groupIdOf(request), actorOf(request));
    return noStore(reply).status(204).send();
  });

  server.register('adminObservability.listEvents', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await observability.listOpsEvents(request.query as AdminOpsEventsQuery));
  });

  server.register('adminObservability.storage', async (_request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await observability.getStorage());
  });

  server.register('adminObservability.overview', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await observability.getOverview(request.query as AdminObservabilityOverviewQuery));
  });

  server.register('adminObservability.purge', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(
        await observability.purge(request.body as AdminObservabilityPurgeBody, actorOf(request)),
      );
  });

  server.register('adminPlugins.bulkDelete', async (request, reply) => {
    const { ids } = request.body as BulkIdsBody;
    return noStore(reply)
      .status(200)
      .send(await bulkDeletePlugins(deps.db, ids, actorOf(request)));
  });

  server.register('adminStats.get', async (request, reply) => {
    const { days } = request.query as AdminStatsQuery;
    return noStore(reply)
      .status(200)
      .send(await getAdminStats(deps.db, Number(days)));
  });

  server.register('adminPlugins.impact', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await pluginImpact(deps.db, pluginIdOf(request)));
  });

  server.register('adminPlugins.setStatus', async (request, reply) => {
    const plugin = await setPluginStatus(
      deps.db,
      pluginIdOf(request),
      request.body as AdminPluginStatusBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(plugin);
  });

  server.register('adminPlugins.delete', async (request, reply) => {
    await deletePlugin(deps.db, pluginIdOf(request), actorOf(request));
    return noStore(reply).status(204).send();
  });

  server.register('adminPlugins.setCategories', async (request, reply) => {
    const { categoryIds } = request.body as SetPluginCategoriesBody;
    const plugin = await setPluginCategories(
      deps.db,
      pluginIdOf(request),
      categoryIds,
      actorOf(request),
    );
    return noStore(reply).status(200).send(plugin);
  });

  server.register('adminPlugins.setFlags', async (request, reply) => {
    const plugin = await setPluginFlags(
      deps.db,
      pluginIdOf(request),
      request.body as PluginFlagsBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(plugin);
  });

  const emailOf = (request: FastifyRequest) => (request.params as { email: string }).email;

  server.register('adminAllowedEmails.list', async (_request, reply) => {
    return noStore(reply)
      .status(200)
      .send({ items: await listAdminAllowedEmails(deps.db) });
  });

  server.register('adminAllowedEmails.add', async (request, reply) => {
    const added = await addAdminAllowedEmail(
      deps.db,
      policy,
      request.body as AddAdminAllowedEmailBody,
      actorOf(request),
    );
    return noStore(reply).status(201).send(added);
  });

  server.register('adminAllowedEmails.invite', async (request, reply) => {
    await inviteAdminAllowedEmail(deps.db, policy, emailOf(request), actorOf(request));
    return noStore(reply).status(204).send();
  });

  server.register('adminAllowedEmails.remove', async (request, reply) => {
    await removeAdminAllowedEmail(deps.db, emailOf(request), actorOf(request));
    return noStore(reply).status(204).send();
  });

  const categoryIdOf = (request: FastifyRequest) =>
    (request.params as { categoryId: string }).categoryId;

  server.register('adminCategories.list', async (_request, reply) => {
    return noStore(reply)
      .status(200)
      .send({ items: await listAdminCategories(deps.db) });
  });

  server.register('adminCategories.create', async (request, reply) => {
    const category = await createCategory(
      deps.db,
      request.body as CreateCategoryBody,
      actorOf(request),
    );
    return noStore(reply).status(201).send(category);
  });

  server.register('adminCategories.update', async (request, reply) => {
    const category = await updateCategory(
      deps.db,
      categoryIdOf(request),
      request.body as UpdateCategoryBody,
      actorOf(request),
    );
    return noStore(reply).status(200).send(category);
  });

  server.register('adminCategories.delete', async (request, reply) => {
    await deleteCategory(deps.db, categoryIdOf(request), actorOf(request));
    return noStore(reply).status(204).send();
  });

  server.register('adminPluginVersions.get', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await getAdminVersion(deps.db, versionIdOf(request)));
  });

  server.register('adminPluginVersions.impact', async (request, reply) => {
    return noStore(reply)
      .status(200)
      .send(await versionImpact(deps.db, versionIdOf(request)));
  });

  const registerVersionChange = (id: string, change: VersionChange) => {
    server.register(id, async (request, reply) => {
      const body = (request.body ?? {}) as Partial<AdminActionBody>;
      const version = await changeVersion(
        deps.db,
        versionIdOf(request),
        change,
        { force: body.force === true },
        actorOf(request),
      );
      return noStore(reply).status(200).send(version);
    });
  };
  registerVersionChange('adminPluginVersions.approve', 'approve');
  registerVersionChange('adminPluginVersions.reject', 'reject');
  registerVersionChange('adminPluginVersions.reopen', 'reopen');
  registerVersionChange('adminPluginVersions.publish', 'publish');
  registerVersionChange('adminPluginVersions.yank', 'yank');

  if (hasClient) {
    await app.register(fastifyStatic, {
      root: config.CLIENT_DIST_DIR,
      wildcard: false,
      index: false,
    });
  } else {
    deps.logger.warn('client build not found, only the api routes are served');
  }

  return server;
}
