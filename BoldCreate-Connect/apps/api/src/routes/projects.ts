/**
 * Website routes for the people who manage the projects of an organization: create a project, set
 * its return origins, and create, list and revoke its keys.
 *
 *   GET    /v1/orgs/:orgId/projects
 *   POST   /v1/orgs/:orgId/projects
 *   GET    /v1/orgs/:orgId/projects/:projectId
 *   PATCH  /v1/orgs/:orgId/projects/:projectId
 *   DELETE /v1/orgs/:orgId/projects/:projectId
 *   GET    /v1/orgs/:orgId/projects/:projectId/keys
 *   POST   /v1/orgs/:orgId/projects/:projectId/keys
 *   DELETE /v1/orgs/:orgId/projects/:projectId/keys/:projectKeyId
 *   GET    /v1/orgs/:orgId/projects/:projectId/logs
 *   GET    /v1/orgs/:orgId/projects/:projectId/usage
 *   GET    /v1/orgs/:orgId/projects/:projectId/webhook
 *   PUT    /v1/orgs/:orgId/projects/:projectId/webhook
 *   DELETE /v1/orgs/:orgId/projects/:projectId/webhook
 *   POST   /v1/orgs/:orgId/projects/:projectId/webhook/rotate-secret
 *   GET    /v1/orgs/:orgId/projects/:projectId/webhook/deliveries
 *   GET    /v1/orgs/:orgId/projects/:projectId/users
 *   GET    /v1/orgs/:orgId/projects/:projectId/users/:projectUserId
 *   DELETE /v1/orgs/:orgId/projects/:projectId/users/:projectUserId
 *   GET    /v1/orgs/:orgId/projects/:projectId/users/:projectUserId/plugins
 *   GET    /v1/orgs/:orgId/projects/:projectId/plugins
 *   PUT    /v1/orgs/:orgId/projects/:projectId/plugins/:pluginId
 *   DELETE /v1/orgs/:orgId/projects/:projectId/plugins/:pluginId
 *   GET    /v1/orgs/:orgId/projects/:projectId/auth-configs
 *   PUT    /v1/orgs/:orgId/projects/:projectId/auth-configs/:componentId/variables
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Db, Executor } from '@boldcreate-integrations/db';
import {
  AppError,
  CreateProjectBodySchema,
  CreateProjectKeyBodySchema,
  AuthConfigListQuerySchema,
  CreateAuthConfigBodySchema,
  UpdateAuthConfigBodySchema,
  PageQuerySchema,
  ProjectLogQuerySchema,
  ProjectUsageQuerySchema,
  PutProjectWebhookBodySchema,
  WebhookDeliveryQuerySchema,
  ProjectUserListQuerySchema,
  PutProjectPluginBodySchema,
  PutVariablesBodySchema,
  parseId,
  UpdateProjectBodySchema,
} from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import type { UpstreamFetch } from '@boldcreate-integrations/domain';
import type { SsrfGuard } from '@boldcreate-integrations/security';
import {
  createProject,
  createProjectKey,
  rotateProjectKey,
  deleteProject,
  deleteProjectUser,
  findProjectUser,
  createAuthConfig,
  deleteAuthConfig,
  getAuthConfig,
  getProject,
  listAuthConfigs,
  updateAuthConfig,
  listLogs,
  deleteProjectWebhook,
  getProjectWebhook,
  listWebhookDeliveries,
  putProjectWebhook,
  rotateProjectWebhookSecret,
  listProjectKeys,
  listProjectPlugins,
  listProjectUsers,
  listProjects,
  projectUsage,
  projectUserPrincipal,
  putProjectAuthConfigVariables,
  discoverOAuthScopes,
  planProjectOAuthDiscovery,
  putProjectPluginWithConfig,
  removeProjectPlugin,
  requireAction,
  requireProjectUser,
  userPluginState,
  type ProjectCaller,
  revokeProjectKey,
  updateProject,
} from '@boldcreate-integrations/domain';
import { authenticate, inTenant } from '../auth/principal.js';
import {
  serializeList,
  serializeProject,
  serializeProjectKey,
  serializeAuthConfig,
  serializeProjectKeyCreated,
  serializeProjectLog,
  serializeWebhookDelivery,
  serializeProjectUsage,
  serializeProjectPlugin,
  serializeProjectUser,
  serializeUserPluginState,
  serializeVariable,
  serializePage,
} from '../serializers/serializers.js';

interface Options {
  db: Db;
  sealerFor: (db: Executor) => Sealer;
  allowLocalOrigins: boolean;
  redirectUri: string;
  fetcher: UpstreamFetch;
  webhookGuard: SsrfGuard;
}

/** Lists are not paged yet, but the query they document must still be a valid one. */
function requirePageQuery(req: FastifyRequest): void {
  if (!PageQuerySchema.safeParse(req.query).success) throw new AppError('validation_failed', []);
}

export async function projectRoutes(app: FastifyInstance, opts: Options): Promise<void> {
  const { db, sealerFor } = opts;
  const origins = { allowLocalOrigins: opts.allowLocalOrigins };

  const orgParams = (req: FastifyRequest) => req.params as { orgId: string };
  const projectParams = (req: FastifyRequest) => req.params as { orgId: string; projectId: string };
  const userParams = (req: FastifyRequest) =>
    req.params as { orgId: string; projectId: string; projectUserId: string };
  const keyParams = (req: FastifyRequest) =>
    req.params as { orgId: string; projectId: string; projectKeyId: string };

  app.get('/orgs/:orgId/projects', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requirePageQuery(req);
    const projects = await inTenant(db, principal, (tx) => listProjects(tx, principal, orgId));
    return reply.status(200).send(serializeList(projects, serializeProject));
  });

  app.post('/orgs/:orgId/projects', async (req, reply) => {
    const { orgId } = orgParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'project:create', { orgId });
    const parsed = CreateProjectBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);
    const project = await inTenant(db, principal, (tx) =>
      createProject(tx, principal, orgId, parsed.data, origins),
    );
    return reply.status(201).send(serializeProject(project));
  });

  app.get('/orgs/:orgId/projects/:projectId', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const project = await inTenant(db, principal, (tx) =>
      getProject(tx, principal, orgId, projectId),
    );
    return reply.status(200).send(serializeProject(project));
  });

  app.patch('/orgs/:orgId/projects/:projectId', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'project:update', { orgId });
    const parsed = UpdateProjectBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);
    const project = await inTenant(db, principal, (tx) =>
      updateProject(tx, principal, orgId, projectId, parsed.data, origins),
    );
    return reply.status(200).send(serializeProject(project));
  });

  app.delete('/orgs/:orgId/projects/:projectId', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    await inTenant(db, principal, (tx) => deleteProject(tx, principal, orgId, projectId));
    return reply.status(204).send();
  });

  app.get('/orgs/:orgId/projects/:projectId/keys', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    requirePageQuery(req);
    const keys = await inTenant(db, principal, (tx) =>
      listProjectKeys(tx, principal, orgId, projectId),
    );
    return reply.status(200).send(serializeList(keys, serializeProjectKey));
  });

  app.post('/orgs/:orgId/projects/:projectId/keys', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    requireAction(principal, 'project-key:create', { orgId });
    const parsed = CreateProjectKeyBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);
    const key = await inTenant(db, principal, (tx) =>
      createProjectKey(tx, principal, orgId, projectId, parsed.data),
    );
    return reply.status(201).send(serializeProjectKeyCreated(key));
  });

  app.post('/orgs/:orgId/projects/:projectId/keys/:projectKeyId/rotate', async (req, reply) => {
    const { orgId, projectId, projectKeyId } = keyParams(req);
    const principal = await authenticate(db, req, orgId);
    const key = await inTenant(db, principal, (tx) =>
      rotateProjectKey(tx, principal, orgId, projectId, projectKeyId),
    );
    return reply.status(201).send(serializeProjectKeyCreated(key));
  });

  app.delete('/orgs/:orgId/projects/:projectId/keys/:projectKeyId', async (req, reply) => {
    const { orgId, projectId, projectKeyId } = keyParams(req);
    const principal = await authenticate(db, req, orgId);
    await inTenant(db, principal, (tx) =>
      revokeProjectKey(tx, principal, orgId, projectId, projectKeyId),
    );
    return reply.status(204).send();
  });

  app.get('/orgs/:orgId/projects/:projectId/logs', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = ProjectLogQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await inTenant(db, principal, async (tx) => {
      await getProject(tx, principal, orgId, projectId);
      return listLogs(tx, { projectId }, query.data);
    });
    return reply.status(200).send(serializePage(page, serializeProjectLog));
  });

  const webhookDeps = (tx: Executor) => ({ sealer: sealerFor(tx), guard: opts.webhookGuard });

  app.get('/orgs/:orgId/projects/:projectId/webhook', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const webhook = await inTenant(db, principal, (tx) =>
      getProjectWebhook(tx, principal, orgId, projectId),
    );
    return reply.status(200).send(webhook);
  });

  app.put('/orgs/:orgId/projects/:projectId/webhook', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const parsed = PutProjectWebhookBodySchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('validation_failed', []);
    const { webhook, secret } = await inTenant(db, principal, (tx) =>
      putProjectWebhook(tx, principal, orgId, projectId, parsed.data, webhookDeps(tx)),
    );
    return secret === null
      ? reply.status(200).send(webhook)
      : reply.status(201).send({ ...webhook, secret });
  });

  app.delete('/orgs/:orgId/projects/:projectId/webhook', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    await inTenant(db, principal, (tx) => deleteProjectWebhook(tx, principal, orgId, projectId));
    return reply.status(204).send();
  });

  app.post('/orgs/:orgId/projects/:projectId/webhook/rotate-secret', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const { webhook, secret } = await inTenant(db, principal, (tx) =>
      rotateProjectWebhookSecret(tx, principal, orgId, projectId, webhookDeps(tx)),
    );
    return reply.status(200).send({ ...webhook, secret });
  });

  app.get('/orgs/:orgId/projects/:projectId/webhook/deliveries', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = WebhookDeliveryQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-webhook:read', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return listWebhookDeliveries(tx, { projectId }, query.data);
    });
    return reply.status(200).send(serializePage(page, serializeWebhookDelivery));
  });

  app.get('/orgs/:orgId/projects/:projectId/usage', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = ProjectUsageQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const usage = await inTenant(db, principal, async (tx) => {
      await getProject(tx, principal, orgId, projectId);
      return projectUsage(tx, { projectId }, query.data);
    });
    return reply.status(200).send(serializeProjectUsage(usage));
  });

  app.get('/orgs/:orgId/projects/:projectId/users', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = ProjectUserListQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await inTenant(db, principal, async (tx) => {
      await getProject(tx, principal, orgId, projectId);
      return listProjectUsers(tx, { projectId, organizationId: orgId }, query.data);
    });
    return reply.status(200).send(serializePage(page, serializeProjectUser));
  });

  app.get('/orgs/:orgId/projects/:projectId/users/:projectUserId', async (req, reply) => {
    const { orgId, projectId, projectUserId } = userParams(req);
    const principal = await authenticate(db, req, orgId);
    const user = await inTenant(db, principal, async (tx) => {
      await getProject(tx, principal, orgId, projectId);
      return findProjectUser(tx, { projectId, organizationId: orgId }, projectUserId);
    });
    return reply.status(200).send(serializeProjectUser(user));
  });

  app.get('/orgs/:orgId/projects/:projectId/users/:projectUserId/plugins', async (req, reply) => {
    const { orgId, projectId, projectUserId } = userParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = PageQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:read', { orgId });
      await getProject(tx, principal, orgId, projectId);
      const caller = {
        projectId,
        organizationId: orgId,
        actor: { kind: 'user_session' as const, id: principal.userId },
      };
      await requireProjectUser(tx, caller, projectUserId);
      return userPluginState(tx, projectUserPrincipal(caller, projectUserId), query.data, {
        connections: true,
      });
    });
    return reply.status(200).send(serializePage(page, serializeUserPluginState));
  });

  app.delete('/orgs/:orgId/projects/:projectId/users/:projectUserId', async (req, reply) => {
    const { orgId, projectId, projectUserId } = userParams(req);
    const principal = await authenticate(db, req, orgId);
    await inTenant(db, principal, (tx) =>
      deleteProjectUser(tx, principal, orgId, projectId, projectUserId),
    );
    return reply.status(204).send();
  });

  const pluginParams = (req: FastifyRequest) =>
    req.params as { orgId: string; projectId: string; pluginId: string };
  const configParams = (req: FastifyRequest) =>
    req.params as { orgId: string; projectId: string; componentId: string };
  const callerOf = (
    principal: { userId: string },
    orgId: string,
    projectId: string,
  ): ProjectCaller => ({
    projectId,
    organizationId: orgId,
    actor: { kind: 'user_session', id: principal.userId },
  });

  app.get('/orgs/:orgId/projects/:projectId/plugins', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = PageQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:read', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return listProjectPlugins(tx, { projectId, organizationId: orgId }, query.data);
    });
    return reply.status(200).send(serializePage(page, serializeProjectPlugin));
  });

  app.post(
    '/orgs/:orgId/projects/:projectId/plugins/:pluginId/mcp-servers/:serverName/oauth/discover',
    async (req, reply) => {
      const { orgId, projectId, pluginId, serverName } = req.params as {
        orgId: string;
        projectId: string;
        pluginId: string;
        serverName: string;
      };
      const principal = await authenticate(db, req, orgId);
      const url = await inTenant(db, principal, async (tx) => {
        requireAction(principal, 'project-plugin:write', { orgId });
        await getProject(tx, principal, orgId, projectId);
        return planProjectOAuthDiscovery(tx, orgId, pluginId, serverName);
      });
      const found = await discoverOAuthScopes(opts.fetcher, url);
      return reply.status(200).send({ ...found, callbackUrl: opts.redirectUri });
    },
  );

  app.put('/orgs/:orgId/projects/:projectId/plugins/:pluginId', async (req, reply) => {
    const { orgId, projectId, pluginId } = pluginParams(req);
    const principal = await authenticate(db, req, orgId);
    const body = PutProjectPluginBodySchema.safeParse(req.body ?? {});
    if (!body.success) throw new AppError('validation_failed', []);
    const versionId = body.data.versionId ? parseId('pv', body.data.versionId) : undefined;
    const { created, plugin } = await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:write', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return putProjectPluginWithConfig(
        tx,
        callerOf(principal, orgId, projectId),
        pluginId,
        { versionId, authConfigs: body.data.authConfigs, variables: body.data.variables },
        sealerFor(tx),
        { callbackUrl: opts.redirectUri },
      );
    });
    return reply.status(created ? 201 : 200).send(serializeProjectPlugin(plugin));
  });

  app.delete('/orgs/:orgId/projects/:projectId/plugins/:pluginId', async (req, reply) => {
    const { orgId, projectId, pluginId } = pluginParams(req);
    const principal = await authenticate(db, req, orgId);
    await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:write', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return removeProjectPlugin(tx, callerOf(principal, orgId, projectId), pluginId);
    });
    return reply.status(204).send();
  });

  const configOptions = { callbackUrl: opts.redirectUri, includeTools: true };
  const configParamsOf = (req: FastifyRequest) =>
    req.params as { orgId: string; projectId: string; authConfigId: string };

  app.get('/orgs/:orgId/projects/:projectId/auth-configs', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const query = AuthConfigListQuerySchema.safeParse(req.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const page = await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:read', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return listAuthConfigs(tx, { projectId, organizationId: orgId }, query.data, configOptions);
    });
    return reply.status(200).send(serializePage(page, serializeAuthConfig));
  });

  app.post('/orgs/:orgId/projects/:projectId/auth-configs', async (req, reply) => {
    const { orgId, projectId } = projectParams(req);
    const principal = await authenticate(db, req, orgId);
    const body = CreateAuthConfigBodySchema.safeParse(req.body);
    const created = await inTenant(db, principal, async (tx) => {
      if (!body.success) throw new AppError('validation_failed', []);
      requireAction(principal, 'project-plugin:write', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return createAuthConfig(
        tx,
        callerOf(principal, orgId, projectId),
        body.data,
        sealerFor(tx),
        configOptions,
      );
    });
    return reply.status(201).send(serializeAuthConfig(created));
  });

  app.get('/orgs/:orgId/projects/:projectId/auth-configs/:authConfigId', async (req, reply) => {
    const { orgId, projectId, authConfigId } = configParamsOf(req);
    const principal = await authenticate(db, req, orgId);
    const found = await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:read', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return getAuthConfig(tx, { projectId, organizationId: orgId }, authConfigId, configOptions);
    });
    return reply.status(200).send(serializeAuthConfig(found));
  });

  app.put('/orgs/:orgId/projects/:projectId/auth-configs/:authConfigId', async (req, reply) => {
    const { orgId, projectId, authConfigId } = configParamsOf(req);
    const principal = await authenticate(db, req, orgId);
    const body = UpdateAuthConfigBodySchema.safeParse(req.body);
    const updated = await inTenant(db, principal, async (tx) => {
      if (!body.success) throw new AppError('validation_failed', []);
      requireAction(principal, 'project-plugin:write', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return updateAuthConfig(
        tx,
        callerOf(principal, orgId, projectId),
        authConfigId,
        body.data,
        sealerFor(tx),
        configOptions,
      );
    });
    return reply.status(200).send(serializeAuthConfig(updated));
  });

  app.delete('/orgs/:orgId/projects/:projectId/auth-configs/:authConfigId', async (req, reply) => {
    const { orgId, projectId, authConfigId } = configParamsOf(req);
    const principal = await authenticate(db, req, orgId);
    await inTenant(db, principal, async (tx) => {
      requireAction(principal, 'project-plugin:write', { orgId });
      await getProject(tx, principal, orgId, projectId);
      return deleteAuthConfig(tx, callerOf(principal, orgId, projectId), authConfigId);
    });
    return reply.status(204).send();
  });

  app.put(
    '/orgs/:orgId/projects/:projectId/auth-configs/:componentId/variables',
    async (req, reply) => {
      const { orgId, projectId, componentId } = configParams(req);
      const principal = await authenticate(db, req, orgId);
      const body = PutVariablesBodySchema.safeParse(req.body);
      const result = await inTenant(db, principal, async (tx) => {
        // The caller must belong to the organization before the body is looked at.
        if (!body.success) throw new AppError('validation_failed', []);
        requireAction(principal, 'project-plugin:write', { orgId });
        await getProject(tx, principal, orgId, projectId);
        return putProjectAuthConfigVariables(
          tx,
          callerOf(principal, orgId, projectId),
          componentId,
          body.data,
          sealerFor(tx),
        );
      });
      return reply.status(200).send(serializeList(result, serializeVariable));
    },
  );
}
