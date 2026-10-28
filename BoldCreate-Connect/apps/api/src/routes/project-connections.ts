/**
 * Connections of a project's users: the sign-in a user made to an MCP server.
 *
 *   POST         /v1/project/connections                 the host starts one for a user
 *   PUT          /v1/project/connections                 the host gives a user their own key or values
 *   GET          /v1/project/connections?userId=         the host reads them
 *   DELETE       /v1/project/connections/:connectionId
 *   GET, DELETE  /v1/orgs/:orgId/projects/:projectId/connections[/:connectionId]   the console
 *   POST, GET    /v1/session/connections                 a session's user starts and reads their own
 *
 * A start returns the address of the server's sign-in page; the browser comes back through
 * `/v1/oauth/callback`, which sends it on to the project's registered origin. A repeated start under
 * the same `Idempotency-Key` and body answers with the first address and `Idempotent-Replayed: true`.
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { withTenant, type Db, type Executor } from '@boldcreate-integrations/db';
import {
  AppError,
  ConnectionListQuerySchema,
  PutProjectConnectionBodySchema,
  SessionConnectionListQuerySchema,
  StartProjectConnectionBodySchema,
  StartSessionConnectionBodySchema,
} from '@boldcreate-integrations/contracts';
import {
  deleteConnection,
  getProject,
  listConnections,
  putProjectConnection,
  requireAction,
  startProjectConnection,
  type ProjectCaller,
  type StartConnectionDeps,
} from '@boldcreate-integrations/domain';
import { authenticate, inTenant } from '../auth/principal.js';
import { authenticateProjectCall } from '../auth/project.js';
import { authenticateSessionCall } from '../auth/session-call.js';
import { serializeConnection, serializePage } from '../serializers/serializers.js';
import type { McpRuntime } from './mcp.js';

function parse<T>(
  schema: { safeParse: (value: unknown) => { success: true; data: T } | { success: false } },
  value: unknown,
): T {
  const result = schema.safeParse(value);
  if (!result.success) throw new AppError('validation_failed', []);
  return result.data;
}

const connectionIdOf = (request: FastifyRequest): string =>
  (request.params as { connectionId: string }).connectionId;

function idempotencyKeyOf(request: FastifyRequest): string | undefined {
  const header = request.headers['idempotency-key'];
  return Array.isArray(header) ? header[0] : header;
}

export async function projectConnectionRoutes(
  app: FastifyInstance,
  opts: { db: Db; runtime: McpRuntime; sealerFor: (db: Executor) => Sealer },
): Promise<void> {
  const { db, runtime, sealerFor } = opts;

  const depsFor = (req: FastifyRequest): StartConnectionDeps => ({
    access: runtime.deps,
    idempotency: (tx) => ({ sealer: sealerFor(tx), unsealer: runtime.deps.unsealer }),
    redirectUri: runtime.redirectUri,
    onRegistrationRejected: (rejection) =>
      req.log.warn({ registration: rejection }, 'client registration refused'),
  });

  app.post('/project/connections', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const body = parse(StartProjectConnectionBodySchema, req.body);
    const key = idempotencyKeyOf(req);
    const started = await startProjectConnection(db, depsFor(req), {
      caller: {
        projectId: identity.projectId,
        organizationId: identity.organizationId,
        actor: { kind: 'api_key', id: identity.keyRowId },
      },
      userRef: body.userId,
      componentId: body.componentId,
      callbackUrl: body.callbackUrl,
      ...(key === undefined ? {} : { idempotency: { key, route: 'POST /v1/project/connections' } }),
    });
    if (started.replayed) void reply.header('Idempotent-Replayed', 'true');
    return reply.send({ connectUrl: started.authorizeUrl, expiresAt: started.expiresAt });
  });

  app.put('/project/connections', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const body = parse(PutProjectConnectionBodySchema, req.body);
    const saved = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) =>
        putProjectConnection(
          tx,
          {
            projectId: identity.projectId,
            organizationId: identity.organizationId,
            actor: { kind: 'api_key', id: identity.keyRowId },
          },
          body,
          sealerFor(tx),
        ),
    );
    return reply.status(200).send(serializeConnection(saved));
  });

  app.get('/project/connections', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = parse(ConnectionListQuerySchema, req.query);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => listConnections(tx, identity, query),
    );
    return reply.send(serializePage(page, serializeConnection));
  });

  app.delete('/project/connections/:connectionId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const id = connectionIdOf(req);
    await withTenant(db, { orgId: identity.organizationId, projectId: identity.projectId }, (tx) =>
      deleteConnection(
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
    action: 'project-connection:read' | 'project-connection:write',
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

  app.get('/orgs/:orgId/projects/:projectId/connections', async (req, reply) => {
    const query = parse(ConnectionListQuerySchema, req.query);
    const page = await consoleRoute(req, 'project-connection:read', (tx, caller) =>
      listConnections(tx, caller, query),
    );
    return reply.send(serializePage(page, serializeConnection));
  });

  app.delete('/orgs/:orgId/projects/:projectId/connections/:connectionId', async (req, reply) => {
    const id = connectionIdOf(req);
    await consoleRoute(req, 'project-connection:write', (tx, caller) =>
      deleteConnection(tx, caller, id),
    );
    return reply.status(204).send();
  });

  app.post('/session/connections', async (req, reply) => {
    const { principal, caller } = await authenticateSessionCall(db, req, 'mcp:call');
    const body = parse(StartSessionConnectionBodySchema, req.body);
    const key = idempotencyKeyOf(req);
    const started = await startProjectConnection(db, depsFor(req), {
      caller,
      session: principal,
      componentId: body.componentId,
      callbackUrl: body.callbackUrl,
      ...(key === undefined ? {} : { idempotency: { key, route: 'POST /v1/session/connections' } }),
    });
    if (started.replayed) void reply.header('Idempotent-Replayed', 'true');
    return reply.send({ redirectUrl: started.authorizeUrl });
  });

  app.get('/session/connections', async (req, reply) => {
    const { caller, userId } = await authenticateSessionCall(db, req, 'mcp:call');
    const query = parse(SessionConnectionListQuerySchema, req.query);
    const page = await withTenant(
      db,
      { orgId: caller.organizationId, projectId: caller.projectId, subjectUserId: userId },
      (tx) => listConnections(tx, caller, query, userId),
    );
    return reply.send(serializePage(page, serializeConnection));
  });
}
