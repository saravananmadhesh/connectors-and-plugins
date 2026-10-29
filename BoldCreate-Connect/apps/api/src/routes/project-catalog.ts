/**
 * What a project offers its users to install, and what they have installed, as two sets of calls
 * with one meaning: the host's server with a project key under `/v1/project/...`, and the people
 * managing the organization under `/v1/orgs/:orgId/projects/:projectId/...`.
 *
 *   GET        .../catalog                                 the plugins the project can offer
 *   GET        .../catalog/:pluginId
 *   GET, PUT   .../user-install-mode                       off, allowlist or any
 *   GET        .../allowed-plugins
 *   PUT, DELETE .../allowed-plugins/:pluginId
 *   GET, POST  .../plugin-sets
 *   GET, PATCH, DELETE .../plugin-sets/:setId
 *   PUT, DELETE .../plugin-sets/:setId/plugins/:pluginId
 *   GET        .../user-plugins?userId=                    what one user installed
 *   PUT, DELETE .../user-plugins/:pluginId                 the host installs or removes for a user
 *   PUT        .../user-plugins/:pluginId/variables        the user's own values for their install
 *   PUT        .../user-plugins/:pluginId/components/:componentId   turn a component on or off
 *
 * The host's own `userId` is a query or body field, never a path. A call by the host skips the
 * allowed catalog: that rule is for the users themselves.
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { withTenant, type Db, type Executor } from '@boldcreate-integrations/db';
import type { Sealer } from '@boldcreate-integrations/credentials';
import {
  AppError,
  CreatePluginSetBodySchema,
  PageQuerySchema,
  PluginListQuerySchema,
  PutUserPluginBodySchema,
  PutUserPluginComponentBodySchema,
  PutUserPluginVariablesBodySchema,
  UpdatePluginSetBodySchema,
  UserInstallModeBodySchema,
  UserPluginListQuerySchema,
  UserPluginRemoveQuerySchema,
  parseId,
} from '@boldcreate-integrations/contracts';
import {
  addAllowedPlugin,
  addSetMember,
  clearUserPluginComponent,
  createPluginSet,
  deletePluginSet,
  ensureUserByRef,
  findUserByRef,
  getOrgCatalogPlugin,
  getPluginSet,
  getProject,
  getUserInstallMode,
  installForUser,
  listAllowed,
  listOrgCatalog,
  listPluginSets,
  removeAllowedPlugin,
  removeSetMember,
  projectUserPrincipal,
  setUserPluginComponent,
  setUserPluginVariables,
  userPluginState,
  userPluginStateOf,
  renamePluginSet,
  requireAction,
  setUserInstallMode,
  uninstallForUser,
  type ProjectCaller,
} from '@boldcreate-integrations/domain';
import { authenticate, inTenant } from '../auth/principal.js';
import { authenticateProjectCall } from '../auth/project.js';
import {
  serializeAllowedPlugin,
  serializePage,
  serializePluginDetail,
  serializePluginPage,
  serializePluginSet,
  serializeProjectPlugin,
  serializeUserPluginState,
} from '../serializers/serializers.js';

type Method = 'get' | 'put' | 'post' | 'patch' | 'delete';

interface Call {
  tx: Executor;
  caller: ProjectCaller;
  params: Record<string, string>;
  /** Whether the answer may show the sign-ins of users: the console, or a key that may read them. */
  connections: boolean;
  sealer: Sealer;
}

interface Reply {
  status: number;
  body?: unknown;
}

interface Op<P> {
  method: Method;
  /** The part of the path after the project, with `:name` for parameters. */
  suffix: string;
  access: 'read' | 'write';
  parse: (req: FastifyRequest) => P;
  run: (call: Call, parsed: P) => Promise<Reply>;
}

function invalid(): never {
  throw new AppError('validation_failed', []);
}

function parseWith<T>(
  schema: { safeParse: (value: unknown) => { success: true; data: T } | { success: false } },
  value: unknown,
): T {
  const result = schema.safeParse(value);
  if (!result.success) invalid();
  return result.data;
}

const none = (): undefined => undefined;

function operations(): Op<unknown>[] {
  const ops: Op<unknown>[] = [];
  const op = <P>(spec: Op<P>): void => {
    ops.push(spec as Op<unknown>);
  };
  const stateOf = async (call: Call, userId: string) =>
    serializeUserPluginState(
      await userPluginStateOf(
        call.tx,
        projectUserPrincipal(call.caller, userId),
        call.params['pluginId']!,
        { connections: call.connections },
      ),
    );
  const project = (call: Call) => ({
    projectId: call.caller.projectId,
    organizationId: call.caller.organizationId,
  });

  op({
    method: 'get',
    suffix: '/catalog',
    access: 'read',
    parse: (req) => parseWith(PluginListQuerySchema, req.query),
    run: async (call, query) => ({
      status: 200,
      body: serializePluginPage(await listOrgCatalog(call.tx, call.caller.organizationId, query)),
    }),
  });
  op({
    method: 'get',
    suffix: '/catalog/:pluginId',
    access: 'read',
    parse: none,
    run: async (call) => ({
      status: 200,
      body: serializePluginDetail(
        await getOrgCatalogPlugin(call.tx, call.caller.organizationId, call.params['pluginId']!),
      ),
    }),
  });

  op({
    method: 'get',
    suffix: '/user-install-mode',
    access: 'read',
    parse: none,
    run: async (call) => ({
      status: 200,
      body: { mode: await getUserInstallMode(call.tx, project(call)) },
    }),
  });
  op({
    method: 'put',
    suffix: '/user-install-mode',
    access: 'write',
    parse: (req) => parseWith(UserInstallModeBodySchema, req.body),
    run: async (call, body) => ({
      status: 200,
      body: { mode: await setUserInstallMode(call.tx, call.caller, body.mode) },
    }),
  });

  op({
    method: 'get',
    suffix: '/allowed-plugins',
    access: 'read',
    parse: (req) => parseWith(PageQuerySchema, req.query),
    run: async (call, query) => ({
      status: 200,
      body: serializePage(await listAllowed(call.tx, project(call), query), serializeAllowedPlugin),
    }),
  });
  op({
    method: 'put',
    suffix: '/allowed-plugins/:pluginId',
    access: 'write',
    parse: none,
    run: async (call) => {
      const { created, allowed } = await addAllowedPlugin(
        call.tx,
        call.caller,
        call.params['pluginId']!,
      );
      return { status: created ? 201 : 200, body: serializeAllowedPlugin(allowed) };
    },
  });
  op({
    method: 'delete',
    suffix: '/allowed-plugins/:pluginId',
    access: 'write',
    parse: none,
    run: async (call) => {
      await removeAllowedPlugin(call.tx, call.caller, call.params['pluginId']!);
      return { status: 204 };
    },
  });

  op({
    method: 'get',
    suffix: '/plugin-sets',
    access: 'read',
    parse: (req) => parseWith(PageQuerySchema, req.query),
    run: async (call, query) => ({
      status: 200,
      body: serializePage(await listPluginSets(call.tx, project(call), query), serializePluginSet),
    }),
  });
  op({
    method: 'post',
    suffix: '/plugin-sets',
    access: 'write',
    parse: (req) => {
      const body = parseWith(CreatePluginSetBodySchema, req.body);
      return { name: body.name, plugins: body.plugins?.map((id) => parseId('plg', id)) };
    },
    run: async (call, body) => ({
      status: 201,
      body: serializePluginSet(await createPluginSet(call.tx, call.caller, body)),
    }),
  });
  op({
    method: 'get',
    suffix: '/plugin-sets/:setId',
    access: 'read',
    parse: none,
    run: async (call) => ({
      status: 200,
      body: serializePluginSet(await getPluginSet(call.tx, project(call), call.params['setId']!)),
    }),
  });
  op({
    method: 'patch',
    suffix: '/plugin-sets/:setId',
    access: 'write',
    parse: (req) => parseWith(UpdatePluginSetBodySchema, req.body),
    run: async (call, body) => ({
      status: 200,
      body: serializePluginSet(
        await renamePluginSet(call.tx, call.caller, call.params['setId']!, body.name),
      ),
    }),
  });
  op({
    method: 'delete',
    suffix: '/plugin-sets/:setId',
    access: 'write',
    parse: none,
    run: async (call) => {
      await deletePluginSet(call.tx, call.caller, call.params['setId']!);
      return { status: 204 };
    },
  });
  op({
    method: 'put',
    suffix: '/plugin-sets/:setId/plugins/:pluginId',
    access: 'write',
    parse: none,
    run: async (call) => ({
      status: 200,
      body: serializePluginSet(
        await addSetMember(call.tx, call.caller, call.params['setId']!, call.params['pluginId']!),
      ),
    }),
  });
  op({
    method: 'delete',
    suffix: '/plugin-sets/:setId/plugins/:pluginId',
    access: 'write',
    parse: none,
    run: async (call) => {
      await removeSetMember(call.tx, call.caller, call.params['setId']!, call.params['pluginId']!);
      return { status: 204 };
    },
  });

  op({
    method: 'get',
    suffix: '/user-plugins',
    access: 'read',
    parse: (req) => parseWith(UserPluginListQuerySchema, req.query),
    run: async (call, query) => {
      const userId = await findUserByRef(call.tx, call.caller, query.userId);
      const page = userId
        ? await userPluginState(call.tx, projectUserPrincipal(call.caller, userId), query, {
            connections: call.connections,
          })
        : { items: [], nextCursor: null };
      return { status: 200, body: serializePage(page, serializeUserPluginState) };
    },
  });
  op({
    method: 'put',
    suffix: '/user-plugins/:pluginId/variables',
    access: 'write',
    parse: (req) => parseWith(PutUserPluginVariablesBodySchema, req.body),
    run: async (call, body) => {
      const userId = await findUserByRef(call.tx, call.caller, body.userId);
      if (!userId) throw new AppError('not_found');
      const { userId: _ref, ...values } = body;
      await setUserPluginVariables(
        call.tx,
        call.caller,
        userId,
        call.params['pluginId']!,
        values,
        call.sealer,
        false,
      );
      return { status: 200, body: await stateOf(call, userId) };
    },
  });
  op({
    method: 'put',
    suffix: '/user-plugins/:pluginId/components/:componentId',
    access: 'write',
    parse: (req) => parseWith(PutUserPluginComponentBodySchema, req.body),
    run: async (call, body) => {
      const userId = await findUserByRef(call.tx, call.caller, body.userId);
      if (!userId) throw new AppError('not_found');
      await setUserPluginComponent(
        call.tx,
        call.caller,
        userId,
        call.params['pluginId']!,
        call.params['componentId']!,
        body.enabled,
      );
      return { status: 200, body: await stateOf(call, userId) };
    },
  });
  op({
    method: 'delete',
    suffix: '/user-plugins/:pluginId/components/:componentId',
    access: 'write',
    parse: (req) => parseWith(UserPluginRemoveQuerySchema, req.query),
    run: async (call, query) => {
      const userId = await findUserByRef(call.tx, call.caller, query.userId);
      if (!userId) throw new AppError('not_found');
      await clearUserPluginComponent(
        call.tx,
        call.caller,
        userId,
        call.params['pluginId']!,
        call.params['componentId']!,
      );
      return { status: 200, body: await stateOf(call, userId) };
    },
  });
  op({
    method: 'put',
    suffix: '/user-plugins/:pluginId',
    access: 'write',
    parse: (req) => {
      const body = parseWith(PutUserPluginBodySchema, req.body);
      return {
        userId: body.userId,
        versionId: body.versionId ? parseId('pv', body.versionId) : undefined,
      };
    },
    run: async (call, body) => {
      const userId = await ensureUserByRef(call.tx, call.caller, body.userId);
      const { created, plugin } = await installForUser(
        call.tx,
        call.caller,
        userId,
        call.params['pluginId']!,
        body.versionId,
        { checkAllowed: false },
      );
      return { status: created ? 201 : 200, body: serializeProjectPlugin(plugin) };
    },
  });
  op({
    method: 'delete',
    suffix: '/user-plugins/:pluginId',
    access: 'write',
    parse: (req) => parseWith(UserPluginRemoveQuerySchema, req.query),
    run: async (call, query) => {
      const userId = await findUserByRef(call.tx, call.caller, query.userId);
      if (!userId) throw new AppError('not_found');
      await uninstallForUser(call.tx, call.caller, userId, call.params['pluginId']!);
      return { status: 204 };
    },
  });
  return ops;
}

export async function projectCatalogRoutes(
  app: FastifyInstance,
  opts: { db: Db; sealerFor: (db: Executor) => Sealer },
): Promise<void> {
  const { db, sealerFor } = opts;

  for (const spec of operations()) {
    app[spec.method](`/project${spec.suffix}`, async (req, reply) => {
      const identity = await authenticateProjectCall(db, req);
      const parsed = spec.parse(req);
      const caller: ProjectCaller = {
        projectId: identity.projectId,
        organizationId: identity.organizationId,
        actor: { kind: 'api_key', id: identity.keyRowId },
      };
      const result = await withTenant(
        db,
        { orgId: identity.organizationId, projectId: identity.projectId },
        (tx) =>
          spec.run(
            {
              tx,
              caller,
              params: req.params as Record<string, string>,
              connections: identity.scopes.includes('connections:read'),
              sealer: sealerFor(tx),
            },
            parsed,
          ),
      );
      return reply.status(result.status).send(result.body);
    });

    app[spec.method](`/orgs/:orgId/projects/:projectId${spec.suffix}`, async (req, reply) => {
      const { orgId, projectId } = req.params as { orgId: string; projectId: string };
      const principal = await authenticate(db, req, orgId);
      const parsed = spec.parse(req);
      const result = await inTenant(db, principal, async (tx) => {
        requireAction(
          principal,
          spec.access === 'read' ? 'project-plugin:read' : 'project-plugin:write',
          { orgId },
        );
        await getProject(tx, principal, orgId, projectId);
        const caller: ProjectCaller = {
          projectId,
          organizationId: orgId,
          actor: { kind: 'user_session', id: principal.userId },
        };
        return spec.run(
          {
            tx,
            caller,
            params: req.params as Record<string, string>,
            connections: true,
            sealer: sealerFor(tx),
          },
          parsed,
        );
      });
      return reply.status(result.status).send(result.body);
    });
  }
}
