/**
 * Sessions of a project's users, and what a session's own user does with its token.
 *
 *   POST, GET    /v1/project/sessions                    the host mints and lists (project key)
 *   GET, DELETE  /v1/project/sessions/:sessionId
 *   GET          .../sessions, .../sessions/:sessionId   the same reads in the console
 *   DELETE       .../sessions/:sessionId
 *   GET          /v1/session/catalog                     what the user may install
 *   GET          /v1/session/plugins                     what the user has installed
 *   PUT, DELETE  /v1/session/plugins/:pluginId           the user installs or removes
 *   PUT          /v1/session/plugins/:pluginId/variables  the user's own values for their install
 *   PUT          /v1/session/plugins/:pluginId/components/:componentId   turn a component on or off
 *
 * A repeated create with the same `Idempotency-Key` and body answers with the first response,
 * token included, and carries `Idempotent-Replayed: true`; another body under the key is a conflict.
 * A plugin installed after a session was created stays hidden from it while the session has a
 * non-empty plugin list.
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Sealer, Unsealer } from '@boldcreate-integrations/credentials';
import { withTenant, type Db, type Executor } from '@boldcreate-integrations/db';
import {
  AppError,
  CreateSessionBodySchema,
  PageQuerySchema,
  PluginListQuerySchema,
  PutSessionPluginBodySchema,
  PutSessionPluginComponentBodySchema,
  PutVariablesBodySchema,
  SessionListQuerySchema,
} from '@boldcreate-integrations/contracts';
import {
  createSession,
  getProject,
  getSession,
  installForUser,
  listSessionCatalog,
  listSessions,
  projectUserPrincipal,
  requireAction,
  revokeSession,
  setUserPluginComponent,
  setUserPluginVariables,
  uninstallForUser,
  userPluginState,
  userPluginStateOf,
  withIdempotency,
  type ProjectCaller,
} from '@boldcreate-integrations/domain';
import { authenticate, inTenant } from '../auth/principal.js';
import { authenticateProjectCall } from '../auth/project.js';
import { authenticateSessionCall } from '../auth/session-call.js';
import {
  serializePage,
  serializeProjectPlugin,
  serializeSession,
  serializeSessionCatalogPage,
  serializeSessionCreated,
  serializeUserPluginState,
} from '../serializers/serializers.js';

function parse<T>(
  schema: { safeParse: (value: unknown) => { success: true; data: T } | { success: false } },
  value: unknown,
): T {
  const result = schema.safeParse(value);
  if (!result.success) throw new AppError('validation_failed', []);
  return result.data;
}

const sessionIdOf = (request: FastifyRequest): string =>
  (request.params as { sessionId: string }).sessionId;

function idempotencyKeyOf(request: FastifyRequest): string | undefined {
  const header = request.headers['idempotency-key'];
  return Array.isArray(header) ? header[0] : header;
}

export async function projectSessionRoutes(
  app: FastifyInstance,
  opts: { db: Db; sealerFor: (db: Executor) => Sealer; unsealer: Unsealer },
): Promise<void> {
  const { db, sealerFor, unsealer } = opts;

  app.post('/project/sessions', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const body = parse(CreateSessionBodySchema, req.body);
    const key = idempotencyKeyOf(req);
    const caller: ProjectCaller = {
      projectId: identity.projectId,
      organizationId: identity.organizationId,
      actor: { kind: 'api_key', id: identity.keyRowId },
    };
    const result = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      async (tx) => {
        const make = async () => ({
          status: 201,
          body: serializeSessionCreated(await createSession(tx, caller, body)),
        });
        if (key === undefined) return { ...(await make()), replayed: false };
        return withIdempotency(
          tx,
          { sealer: sealerFor(tx), unsealer },
          caller,
          'POST /v1/project/sessions',
          key,
          body,
          make,
        );
      },
    );
    if (result.replayed) void reply.header('Idempotent-Replayed', 'true');
    return reply.status(result.status).send(result.body);
  });

  app.get('/project/sessions', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = parse(SessionListQuerySchema, req.query);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => listSessions(tx, identity, query),
    );
    return reply.send(serializePage(page, serializeSession));
  });

  app.get('/project/sessions/:sessionId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const id = sessionIdOf(req);
    const session = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => getSession(tx, identity, id),
    );
    return reply.send(serializeSession(session));
  });

  app.delete('/project/sessions/:sessionId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const id = sessionIdOf(req);
    await withTenant(db, { orgId: identity.organizationId, projectId: identity.projectId }, (tx) =>
      revokeSession(
        tx,
        {
          projectId: identity.projectId,
          organizationId: identity.organizationId,
          actor: { kind: 'api_key', id: identity.keyRowId },
        },
        id,
      ),
    );
    return reply.status(204).send();
  });

  const consoleRoute = async <T>(
    req: FastifyRequest,
    action: 'project-session:read' | 'project-session:write',
    run: (tx: Executor, caller: ProjectCaller) => Promise<T>,
  ): Promise<T> => {
    const { orgId, projectId } = req.params as { orgId: string; projectId: string };
    const principal = await authenticate(db, req, orgId);
    return inTenant(db, principal, async (tx) => {
      requireAction(principal, action, { orgId });
      await getProject(tx, principal, orgId, projectId);
      return run(tx, {
        projectId,
        organizationId: orgId,
        actor: { kind: 'user_session', id: principal.userId },
      });
    });
  };

  app.get('/orgs/:orgId/projects/:projectId/sessions', async (req, reply) => {
    const query = parse(SessionListQuerySchema, req.query);
    const page = await consoleRoute(req, 'project-session:read', (tx, caller) =>
      listSessions(tx, caller, query),
    );
    return reply.send(serializePage(page, serializeSession));
  });
  app.get('/orgs/:orgId/projects/:projectId/sessions/:sessionId', async (req, reply) => {
    const id = sessionIdOf(req);
    const session = await consoleRoute(req, 'project-session:read', (tx, caller) =>
      getSession(tx, caller, id),
    );
    return reply.send(serializeSession(session));
  });
  app.delete('/orgs/:orgId/projects/:projectId/sessions/:sessionId', async (req, reply) => {
    const id = sessionIdOf(req);
    await consoleRoute(req, 'project-session:write', (tx, caller) => revokeSession(tx, caller, id));
    return reply.status(204).send();
  });

  /** A session token: a key of the user scope that names the project it was minted in. */
  const sessionCall = async <T>(
    req: FastifyRequest,
    action: 'artifact:sync' | 'plugin:install',
    run: (tx: Executor, caller: ProjectCaller, userId: string) => Promise<T>,
  ): Promise<T> => {
    const { caller, userId } = await authenticateSessionCall(db, req, action);
    return withTenant(
      db,
      { orgId: caller.organizationId, projectId: caller.projectId, subjectUserId: userId },
      (tx) => run(tx, caller, userId),
    );
  };

  app.get('/session/catalog', async (req, reply) => {
    const query = parse(PluginListQuerySchema, req.query);
    const page = await sessionCall(req, 'artifact:sync', (tx, caller, userId) =>
      listSessionCatalog(tx, caller, userId, query),
    );
    return reply.send(serializeSessionCatalogPage(page));
  });

  app.get('/session/plugins', async (req, reply) => {
    const query = parse(PageQuerySchema, req.query);
    const page = await sessionCall(req, 'artifact:sync', (tx, caller, userId) =>
      userPluginState(tx, projectUserPrincipal(caller, userId), query, { connections: true }),
    );
    return reply.send(serializePage(page, serializeUserPluginState));
  });

  app.put('/session/plugins/:pluginId/variables', async (req, reply) => {
    const body = parse(PutVariablesBodySchema, req.body);
    const pluginId = (req.params as { pluginId: string }).pluginId;
    const state = await sessionCall(req, 'plugin:install', async (tx, caller, userId) => {
      await setUserPluginVariables(tx, caller, userId, pluginId, body, sealerFor(tx), true);
      return userPluginStateOf(tx, projectUserPrincipal(caller, userId), pluginId, {
        connections: true,
      });
    });
    return reply.send(serializeUserPluginState(state));
  });

  app.put('/session/plugins/:pluginId/components/:componentId', async (req, reply) => {
    const body = parse(PutSessionPluginComponentBodySchema, req.body);
    const { pluginId, componentId } = req.params as { pluginId: string; componentId: string };
    const state = await sessionCall(req, 'plugin:install', async (tx, caller, userId) => {
      await setUserPluginComponent(tx, caller, userId, pluginId, componentId, body.enabled);
      return userPluginStateOf(tx, projectUserPrincipal(caller, userId), pluginId, {
        connections: true,
      });
    });
    return reply.send(serializeUserPluginState(state));
  });

  app.put('/session/plugins/:pluginId', async (req, reply) => {
    const body = parse(PutSessionPluginBodySchema, req.body);
    const pluginId = (req.params as { pluginId: string }).pluginId;
    const result = await sessionCall(req, 'plugin:install', (tx, caller, userId) =>
      installForUser(tx, caller, userId, pluginId, body.versionId, { checkAllowed: true }),
    );
    return reply.status(result.created ? 201 : 200).send(serializeProjectPlugin(result.plugin));
  });

  app.delete('/session/plugins/:pluginId', async (req, reply) => {
    const pluginId = (req.params as { pluginId: string }).pluginId;
    await sessionCall(req, 'plugin:install', (tx, caller, userId) =>
      uninstallForUser(tx, caller, userId, pluginId),
    );
    return reply.status(204).send();
  });
}
