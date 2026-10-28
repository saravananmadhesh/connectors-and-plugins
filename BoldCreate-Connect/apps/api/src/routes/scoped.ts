/**
 * Scoped routes: installations, API keys.
 * Supports three scope prefixes:
 *   ORG:  /v1/orgs/:orgId
 *   USER: /v1/orgs/:orgId/me
 *
 * Every handler builds the caller's principal and the scope of the path, then hands both to a
 * domain use case that asks `authorize` before it acts.
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Db, Executor, Tx } from '@boldcreate-integrations/db';
import type { ScopeContext } from '@boldcreate-integrations/db';
import type { Action, ScopeKind, UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import {
  PageQuerySchema,
  CreateInstallationBodySchema,
  UpdateInstallationBodySchema,
  UpdateComponentBodySchema,
  UpgradeInstallationBodySchema,
  PutVariablesBodySchema,
  CreateApiKeyBodySchema,
  AppError,
} from '@boldcreate-integrations/contracts';
import {
  listInstallations,
  createInstallation,
  getInstallation,
  updateInstallation,
  deleteInstallation,
  listInstallationComponents,
  updateInstallationComponent,
  upgradeInstallation,
  listVariables,
  putVariables,
  listApiKeys,
  createApiKey,
  revokeApiKey,
  requireAction,
  resourceOfScope,
  getOrgPolicy,
} from '@boldcreate-integrations/domain';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { authenticate, inTenant } from '../auth/principal.js';
import {
  serializeApiKey,
  serializeApiKeyCreated,
  serializeInstallation,
  serializeInstallationComponent,
  serializeList,
  serializePage,
  serializeUpgradeResult,
  serializeVariable,
} from '../serializers/serializers.js';

// ─── Route registration ───────────────────────────────────────────────────────

export type ScopedRun = <T>(
  req: FastifyRequest,
  action: Action,
  fn: (tx: Tx, principal: UserSessionPrincipal, scope: ScopeContext) => Promise<T>,
) => Promise<T>;

/**
 * Builds the runner of one scope kind: authenticate, load the principal for the path's org,
 * open the tenant transaction, resolve the scope and ask `authorize` for the route's action
 * before the request body is read. The domain use case asks again before it acts.
 */
export function scopeRunner(db: Db, kind: ScopeKind): ScopedRun {
  return async (req, action, fn) => {
    const { orgId } = req.params as { orgId: string };
    const principal = await authenticate(db, req, orgId);
    return inTenant(db, principal, async (tx) => {
      let scope: ScopeContext;
      if (kind === 'user') {
        scope = { organizationId: orgId, scopeType: 'user', ownerUserId: principal.userId };
      } else {
        scope = { organizationId: orgId, scopeType: 'org' };
      }
      // Only a user-scope request can be refused by what the organization lets members create.
      const policy = kind === 'user' ? await getOrgPolicy(tx, orgId) : undefined;
      requireAction(principal, action, resourceOfScope(scope, policy));
      return fn(tx, principal, scope);
    });
  };
}

function registerScopedRoutes(
  app: FastifyInstance,
  sealerFor: (db: Executor) => Sealer,
  run: ScopedRun,
  kind: ScopeKind,
): void {
  // ── Installations ──────────────────────────────────────────────────────────

  app.get('/installations', async (req, reply) => {
    const parsed = PageQuerySchema.safeParse(req.query);
    const result = await run(req, 'installation:list', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return listInstallations(tx, principal, scope, parsed.data);
    });
    return reply.status(200).send(serializePage(result, serializeInstallation));
  });

  app.post('/installations', async (req, reply) => {
    const parsed = CreateInstallationBodySchema.safeParse(req.body);
    const result = await run(req, 'installation:create', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return createInstallation(tx, principal, scope, parsed.data);
    });
    return reply.status(201).send(serializeInstallation(result));
  });

  app.get('/installations/:installationId', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    const result = await run(req, 'installation:read', (tx, principal, scope) =>
      getInstallation(tx, principal, scope, id),
    );
    return reply.status(200).send(serializeInstallation(result));
  });

  app.patch('/installations/:installationId', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    const parsed = UpdateInstallationBodySchema.safeParse(req.body);
    const result = await run(req, 'installation:update', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return updateInstallation(tx, principal, scope, id, parsed.data);
    });
    return reply.status(200).send(serializeInstallation(result));
  });

  app.delete('/installations/:installationId', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    await run(req, 'installation:delete', (tx, principal, scope) =>
      deleteInstallation(tx, principal, scope, id),
    );
    return reply.status(204).send();
  });

  app.get('/installations/:installationId/components', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    const result = await run(req, 'installation:read', (tx, principal, scope) =>
      listInstallationComponents(tx, principal, scope, id),
    );
    return reply.status(200).send(serializeList(result, serializeInstallationComponent));
  });

  app.patch('/installations/:installationId/components/:componentId', async (req, reply) => {
    const { installationId: id, componentId } = req.params as {
      installationId: string;
      componentId: string;
    };
    const parsed = UpdateComponentBodySchema.safeParse(req.body);
    const result = await run(req, 'component:update', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return updateInstallationComponent(tx, principal, scope, id, componentId, parsed.data);
    });
    return reply.status(200).send(serializeInstallationComponent(result));
  });

  app.post('/installations/:installationId/upgrade', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    const parsed = UpgradeInstallationBodySchema.safeParse(req.body);
    const result = await run(req, 'installation:upgrade', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return upgradeInstallation(tx, principal, scope, id, parsed.data);
    });
    return reply.status(200).send(serializeUpgradeResult(result));
  });

  // ── Variables ──────────────────────────────────────────────────────────────

  app.get('/installations/:installationId/variables', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    const result = await run(req, 'variable:read', (tx, principal, scope) =>
      listVariables(tx, principal, scope, id),
    );
    return reply.status(200).send(serializeList(result, serializeVariable));
  });

  app.put('/installations/:installationId/variables', async (req, reply) => {
    const { installationId: id } = req.params as { installationId: string };
    const parsed = PutVariablesBodySchema.safeParse(req.body);
    const result = await run(req, 'variable:write', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return putVariables(tx, principal, scope, id, parsed.data, sealerFor(tx));
    });
    return reply.status(200).send(serializeList(result, serializeVariable));
  });

  // ── API Keys ───────────────────────────────────────────────────────────────
  // Keys belong to the organization: they are listed under /orgs/:orgId/api-keys and, for the
  // member's own view, under /orgs/:orgId/me/api-keys. Creating and revoking are org-only.
  app.get('/api-keys', async (req, reply) => {
    const parsed = PageQuerySchema.safeParse(req.query);
    const result = await run(req, 'api-key:list', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return listApiKeys(tx, principal, scope, parsed.data);
    });
    return reply.status(200).send(serializePage(result, serializeApiKey));
  });

  if (kind !== 'org') return;

  app.post('/api-keys', async (req, reply) => {
    const parsed = CreateApiKeyBodySchema.safeParse(req.body);
    const result = await run(req, 'api-key:create', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return createApiKey(tx, principal, scope, parsed.data);
    });
    return reply.status(201).send(serializeApiKeyCreated(result));
  });

  app.delete('/api-keys/:keyId', async (req, reply) => {
    const { keyId } = req.params as { keyId: string };
    await run(req, 'api-key:revoke', (tx, principal, scope) =>
      revokeApiKey(tx, principal, scope, keyId),
    );
    return reply.status(204).send();
  });
}

// ─── Public export ────────────────────────────────────────────────────────────

export async function scopedRoutes(
  app: FastifyInstance,
  opts: { db: Db; sealerFor: (db: Executor) => Sealer },
): Promise<void> {
  const { db, sealerFor } = opts;
  const mount = async (prefix: string, kind: ScopeKind): Promise<void> => {
    await app.register(
      async (sub) => {
        registerScopedRoutes(sub, sealerFor, scopeRunner(db, kind), kind);
      },
      { prefix },
    );
  };

  await mount('/orgs/:orgId', 'org');
  await mount('/orgs/:orgId/me', 'user');
}
