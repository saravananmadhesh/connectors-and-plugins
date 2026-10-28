/**
 * Calls the host's own server makes with a project key.
 *
 *   GET    /v1/project/me
 *   PUT    /v1/project/users
 *   GET    /v1/project/users?userId=
 *   GET    /v1/project/plugins
 *   PUT    /v1/project/plugins/{pluginId}
 *   DELETE /v1/project/plugins/{pluginId}
 *   GET    /v1/project/auth-configs
 *   POST   /v1/project/auth-configs
 *   GET    /v1/project/auth-configs/{authConfigId}
 *   PUT    /v1/project/auth-configs/{authConfigId}
 *   DELETE /v1/project/auth-configs/{authConfigId}
 *   PUT    /v1/project/auth-configs/{componentId}/variables
 *
 * The key is the whole identity: it names the project, and every read and write here is limited to
 * that project's users. The host's own `userId` is a query or body field, never a path. Deleting a
 * user is a console action, not a host call. A website session or an organization key is not a project key, so these routes
 * answer them with `401`.
 */
import type { FastifyInstance } from 'fastify';
import { withTenant, type Db, type Executor } from '@boldcreate-integrations/db';
import {
  AppError,
  AuthConfigListQuerySchema,
  CreateAuthConfigBodySchema,
  PageQuerySchema,
  UpdateAuthConfigBodySchema,
  ProjectLogQuerySchema,
  WebhookDeliveryQuerySchema,
  ProjectUsageQuerySchema,
  ProjectUserListQuerySchema,
  PutProjectPluginBodySchema,
  PutProjectUserBodySchema,
  PutVariablesBodySchema,
  parseId,
} from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import {
  createAuthConfig,
  deleteAuthConfig,
  ensureProjectUser,
  getAuthConfig,
  getProjectMe,
  listAuthConfigs,
  updateAuthConfig,
  listLogs,
  listWebhookDeliveries,
  listProjectPlugins,
  listProjectUsers,
  projectUsage,
  putProjectAuthConfigVariables,
  putProjectPlugin,
  removeProjectPlugin,
  type ProjectCaller,
} from '@boldcreate-integrations/domain';
import { authenticateProjectCall } from '../auth/project.js';
import {
  serializeList,
  serializePage,
  serializeAuthConfig,
  serializeProjectLog,
  serializeWebhookDelivery,
  serializeProjectMe,
  serializeProjectUsage,
  serializeProjectPlugin,
  serializeProjectUser,
  serializeVariable,
} from '../serializers/serializers.js';

export async function projectSelfRoutes(
  app: FastifyInstance,
  opts: { db: Db; sealerFor: (db: Executor) => Sealer; redirectUri: string },
): Promise<void> {
  const { db, sealerFor, redirectUri } = opts;
  const callerOf = (identity: {
    projectId: string;
    organizationId: string;
    keyRowId: string;
  }): ProjectCaller => ({
    projectId: identity.projectId,
    organizationId: identity.organizationId,
    actor: { kind: 'api_key', id: identity.keyRowId },
  });

  app.get('/project/me', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const me = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => getProjectMe(tx, identity),
    );
    return reply.status(200).send(serializeProjectMe(me));
  });

  app.put('/project/users', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const body = PutProjectUserBodySchema.safeParse(req.body);
    if (!body.success) throw new AppError('validation_failed', []);
    const { created, user } = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => ensureProjectUser(tx, identity, body.data.userId, body.data.displayName),
    );
    return reply.status(created ? 201 : 200).send(serializeProjectUser(user));
  });

  app.get('/project/users', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = ProjectUserListQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => listProjectUsers(tx, identity, query.data),
    );
    return reply.status(200).send(serializePage(page, serializeProjectUser));
  });

  app.get('/project/logs', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = ProjectLogQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => listLogs(tx, identity, query.data),
    );
    return reply.status(200).send(serializePage(page, serializeProjectLog));
  });

  app.get('/project/webhook/deliveries', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = WebhookDeliveryQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => listWebhookDeliveries(tx, identity, query.data),
    );
    return reply.status(200).send(serializePage(page, serializeWebhookDelivery));
  });

  app.get('/project/usage', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = ProjectUsageQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const usage = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => projectUsage(tx, identity, query.data),
    );
    return reply.status(200).send(serializeProjectUsage(usage));
  });

  app.get('/project/plugins', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = PageQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => listProjectPlugins(tx, identity, query.data),
    );
    return reply.status(200).send(serializePage(page, serializeProjectPlugin));
  });

  app.put('/project/plugins/:pluginId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const { pluginId } = req.params as { pluginId: string };
    const body = PutProjectPluginBodySchema.safeParse(req.body ?? {});
    if (!body.success) throw new AppError('validation_failed', []);
    const versionId = body.data.versionId ? parseId('pv', body.data.versionId) : undefined;
    const { created, plugin } = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) => putProjectPlugin(tx, callerOf(identity), pluginId, versionId),
    );
    return reply.status(created ? 201 : 200).send(serializeProjectPlugin(plugin));
  });

  app.delete('/project/plugins/:pluginId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const { pluginId } = req.params as { pluginId: string };
    await withTenant(db, { orgId: identity.organizationId, projectId: identity.projectId }, (tx) =>
      removeProjectPlugin(tx, callerOf(identity), pluginId),
    );
    return reply.status(204).send();
  });

  app.get('/project/auth-configs', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const query = AuthConfigListQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) =>
        listAuthConfigs(tx, identity, query.data, {
          callbackUrl: redirectUri,
          includeTools: identity.scopes.includes('tools:read'),
        }),
    );
    return reply.status(200).send(serializePage(page, serializeAuthConfig));
  });

  app.post('/project/auth-configs', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const body = CreateAuthConfigBodySchema.safeParse(req.body);
    if (!body.success) throw new AppError('validation_failed', []);
    const created = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) =>
        createAuthConfig(tx, callerOf(identity), body.data, sealerFor(tx), {
          callbackUrl: redirectUri,
          includeTools: identity.scopes.includes('tools:read'),
        }),
    );
    return reply.status(201).send(serializeAuthConfig(created));
  });

  app.get('/project/auth-configs/:authConfigId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const { authConfigId } = req.params as { authConfigId: string };
    const found = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) =>
        getAuthConfig(tx, identity, authConfigId, {
          callbackUrl: redirectUri,
          includeTools: identity.scopes.includes('tools:read'),
        }),
    );
    return reply.status(200).send(serializeAuthConfig(found));
  });

  app.put('/project/auth-configs/:authConfigId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const { authConfigId } = req.params as { authConfigId: string };
    const body = UpdateAuthConfigBodySchema.safeParse(req.body);
    if (!body.success) throw new AppError('validation_failed', []);
    const updated = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) =>
        updateAuthConfig(tx, callerOf(identity), authConfigId, body.data, sealerFor(tx), {
          callbackUrl: redirectUri,
          includeTools: identity.scopes.includes('tools:read'),
        }),
    );
    return reply.status(200).send(serializeAuthConfig(updated));
  });

  app.delete('/project/auth-configs/:authConfigId', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const { authConfigId } = req.params as { authConfigId: string };
    await withTenant(db, { orgId: identity.organizationId, projectId: identity.projectId }, (tx) =>
      deleteAuthConfig(tx, callerOf(identity), authConfigId),
    );
    return reply.status(204).send();
  });

  app.put('/project/auth-configs/:componentId/variables', async (req, reply) => {
    const identity = await authenticateProjectCall(db, req);
    const { componentId } = req.params as { componentId: string };
    const body = PutVariablesBodySchema.safeParse(req.body);
    if (!body.success) throw new AppError('validation_failed', []);
    const result = await withTenant(
      db,
      { orgId: identity.organizationId, projectId: identity.projectId },
      (tx) =>
        putProjectAuthConfigVariables(
          tx,
          callerOf(identity),
          componentId,
          body.data,
          sealerFor(tx),
        ),
    );
    return reply.status(200).send(serializeList(result, serializeVariable));
  });
}
