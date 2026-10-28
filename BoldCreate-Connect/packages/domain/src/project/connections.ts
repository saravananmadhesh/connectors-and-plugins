/**
 * The sign-ins of a project's users to MCP servers ("connections"). The host starts one for a
 * user, or a session's user starts their own; the browser comes back through the shared OAuth
 * callback. Every read and delete is limited to the project, so a connection of another project
 * does not exist for the caller. Slow upstream work (discovery, registration) runs between two
 * short transactions, never inside one.
 */
import { randomBytes } from 'node:crypto';
import { and, asc, eq, inArray, ne, sql } from 'drizzle-orm';
import {
  componentTable,
  decodeCursor,
  encodeCursor,
  installationComponentTable,
  installationTable,
  mcpOAuthTokenTable,
  mcpServerTable,
  userTable,
  withTenant,
  type Db,
  type Executor,
} from '@boldcreate-integrations/db';
import {
  type ApiKeyPrincipal,
  type ConnectionListQuery,
  type ConnectionResponse,
  type Plain,
  type PutProjectConnectionBody,
} from '@boldcreate-integrations/contracts';
import { fieldSubjectId, type Sealer } from '@boldcreate-integrations/credentials';
import type { RegistrationRejection } from '../mcp/oauth.js';
import { writeAudit } from '../audit/write-audit.js';
import { appError, notFound, validationFailed } from '../errors.js';
import { resolveDelivery } from '../delivery/resolve-delivery.js';
import { tokenSubject, type AccessDeps } from '../mcp/access.js';
import { checkProjectReturn } from '../mcp/project-oauth.js';
import {
  oauthPlanOf,
  prepareOAuth,
  startAuthorization,
  type OAuthStartPlan,
} from '../mcp/servers.js';
import { replayIdempotent, withIdempotency, type IdempotencyDeps } from './idempotency.js';
import { namedAuthConfig, resolveAuthConfig, serverKey } from './auth-configs.js';
import type { ProjectCaller } from './project-plugins.js';
import type { ProjectScope } from './project-users.js';
import { projectUserPrincipal } from './user-plugin-state.js';
import { ensureUserByRef } from './user-plugins.js';

type ConnectionView = Plain<ConnectionResponse>;

const UUID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** The client state a project flow carries back to the host's page. */
const newClientState = (): string => randomBytes(16).toString('base64url');

export interface StartConnectionInput {
  caller: ProjectCaller;
  /** The host names the user it acts for; a session's own user is known from the token. */
  userRef?: string;
  /** The session token's principal; its plugin list narrows what the user may connect. */
  session?: ApiKeyPrincipal;
  componentId: string;
  callbackUrl: string;
  /** A repeat under the same key answers with the first address. */
  idempotency?: { key: string; route: string };
}

export interface StartConnectionDeps {
  access: AccessDeps;
  idempotency: (tx: Executor) => IdempotencyDeps;
  /** Where the provider sends the browser back to. */
  redirectUri: string;
  onRegistrationRejected?: (rejection: RegistrationRejection) => void;
}

export interface StartedConnection {
  authorizeUrl: string;
  expiresAt: string;
  replayed: boolean;
}

interface Planned {
  plan: OAuthStartPlan;
  /** The auth config the sign-in is made under, when one is in force. */
  authConfigId: string | null;
  server: typeof mcpServerTable.$inferSelect | undefined;
  userId: string;
  installationId: string;
}

/**
 * Checks everything that can be checked without the network: the user, that the server is one the
 * user is delivered, that it asks for a sign-in, and that the return address is allowed.
 */
async function plan(
  tx: Executor,
  deps: StartConnectionDeps,
  input: StartConnectionInput,
  clientState: string,
): Promise<Planned> {
  const { caller } = input;
  const userId = input.session?.userId ?? (await ensureUserByRef(tx, caller, input.userRef ?? ''));
  const principal = input.session ?? projectUserPrincipal(caller, userId);
  const { installations } = await resolveDelivery(tx, principal);
  if (installations.length === 0) throw notFound();

  const [row] = await tx
    .select({
      installationId: installationComponentTable.installationId,
      pluginId: installationTable.pluginId,
      serverName: componentTable.name,
      metadata: componentTable.metadata,
      server: mcpServerTable,
    })
    .from(installationComponentTable)
    .innerJoin(
      installationTable,
      eq(installationTable.id, installationComponentTable.installationId),
    )
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .leftJoin(
      mcpServerTable,
      and(
        eq(mcpServerTable.installationId, installationComponentTable.installationId),
        eq(mcpServerTable.componentId, installationComponentTable.componentId),
      ),
    )
    .where(
      and(
        eq(installationComponentTable.componentId, input.componentId),
        eq(installationComponentTable.enabled, true),
        inArray(
          installationComponentTable.installationId,
          installations.map((item) => item.installationId),
        ),
        eq(componentTable.kind, 'mcp'),
      ),
    )
    .limit(1);
  if (!row) throw notFound();
  const server = row.server;
  const sessionConfigs = input.session?.authConfigs;
  const config = await resolveAuthConfig(tx, {
    projectId: caller.projectId,
    pluginId: row.pluginId,
    serverName: row.serverName,
    sessionConfigs,
  });
  if (sessionConfigs?.[serverKey(row.pluginId, row.serverName)] !== undefined && !config) {
    throw appError('unprocessable');
  }
  const oauthType = config
    ? config.authMode === 'dcr' || config.authMode === 'oauth_client'
    : server?.authType === 'oauth_dcr' || server?.authType === 'oauth_client';
  if (!oauthType) throw appError('not_oauth');
  const project = await checkProjectReturn(tx, {
    projectId: caller.projectId,
    returnUrl: input.callbackUrl,
    clientState,
  });
  const planned = await oauthPlanOf(
    { metadata: row.metadata as { transport?: string; url?: string }, server: server ?? undefined },
    {
      organizationId: caller.organizationId,
      installationId: row.installationId,
      componentId: input.componentId,
    },
    deps.access.unsealer,
    { project },
    config,
  );
  return {
    plan: planned,
    authConfigId: config?.id ?? null,
    server: server ?? undefined,
    userId,
    installationId: row.installationId,
  };
}

/**
 * Starts a sign-in for a project user and returns where to send their browser. The same key and
 * body answer with the first address; a key with another body is a conflict.
 */
export async function startProjectConnection(
  db: Db,
  deps: StartConnectionDeps,
  input: StartConnectionInput,
): Promise<StartedConnection> {
  const { caller, idempotency } = input;
  // The user is part of the request, so two users never share one stored answer.
  const body = {
    userId: input.userRef ?? input.session?.userId ?? null,
    componentId: input.componentId,
    callbackUrl: input.callbackUrl,
  };
  const clientState = newClientState();
  const scope = {
    orgId: caller.organizationId,
    projectId: caller.projectId,
    ...(input.session ? { subjectUserId: input.session.userId } : {}),
  };

  type First = { replay: { authorizeUrl: string; expiresAt: string } } | { planned: Planned };
  const first = await withTenant<First>(db, scope, async (tx) => {
    if (idempotency) {
      const earlier = await replayIdempotent<{ authorizeUrl: string; expiresAt: string }>(
        tx,
        deps.idempotency(tx),
        caller,
        idempotency.route,
        idempotency.key,
        body,
      );
      if (earlier) return { replay: earlier.body };
    }
    return { planned: await plan(tx, deps, input, clientState) };
  });
  if ('replay' in first) return { ...first.replay, replayed: true };
  const { planned } = first;

  // Discovery and registration: no transaction is open while the upstream answers.
  const prepared = await prepareOAuth(
    deps.access.fetcher,
    planned.plan,
    deps.redirectUri,
    deps.onRegistrationRejected,
  );

  const done = await withTenant(db, scope, async (tx) => {
    const begin = async () => {
      const started = await startAuthorization(
        tx,
        {
          organizationId: caller.organizationId,
          userId: planned.userId,
          installationId: planned.installationId,
          componentId: input.componentId,
        },
        planned.server,
        prepared,
        deps.redirectUri,
        deps.access.sealerFor(tx),
      );
      return {
        status: 200,
        body: { authorizeUrl: started.authorizeUrl, expiresAt: started.expiresAt.toISOString() },
      };
    };
    if (!idempotency) return { ...(await begin()), replayed: false };
    return withIdempotency(
      tx,
      deps.idempotency(tx),
      caller,
      idempotency.route,
      idempotency.key,
      body,
      begin,
    );
  });
  return { ...done.body, replayed: done.replayed };
}

// ─── Reading and removing ─────────────────────────────────────────────────────

/** Connections of this project only: the installation names the project, and so does the user. */
const inProject = (project: ProjectScope) =>
  and(
    eq(installationTable.organizationId, project.organizationId),
    eq(installationTable.projectId, project.projectId),
    eq(userTable.projectId, project.projectId),
    eq(userTable.kind, 'external'),
    ne(userTable.status, 'deleted'),
  );

function connectionRows(tx: Executor) {
  return tx
    .select({
      id: mcpOAuthTokenTable.id,
      installationId: mcpOAuthTokenTable.installationId,
      componentId: mcpOAuthTokenTable.componentId,
      rowUserId: mcpOAuthTokenTable.userId,
      userRef: userTable.externalRef,
      serverName: componentTable.name,
      authConfigId: mcpOAuthTokenTable.authConfigId,
      kind: mcpOAuthTokenTable.kind,
      valueNames: mcpOAuthTokenTable.valueNames,
      status: mcpOAuthTokenTable.status,
      expiresAt: mcpOAuthTokenTable.expiresAt,
      createdAt: mcpOAuthTokenTable.createdAt,
    })
    .from(mcpOAuthTokenTable)
    .innerJoin(installationTable, eq(installationTable.id, mcpOAuthTokenTable.installationId))
    .innerJoin(userTable, eq(userTable.id, mcpOAuthTokenTable.userId))
    .innerJoin(componentTable, eq(componentTable.id, mcpOAuthTokenTable.componentId));
}

/**
 * The project's connections, oldest first. `forUserId` limits the list to one user's own row (a
 * session's user); `query.userId` is the host's id for a user and matches exactly.
 */
export async function listConnections(
  tx: Executor,
  project: ProjectScope,
  query: Pick<ConnectionListQuery, 'cursor' | 'limit'> & Partial<ConnectionListQuery>,
  forUserId?: string,
): Promise<{ items: ConnectionView[]; nextCursor: string | null }> {
  let after: { createdAt: Date; id: string } | undefined;
  if (query.cursor !== undefined) {
    try {
      const decoded = decodeCursor(query.cursor);
      const createdAt = new Date(decoded.createdAt);
      if (Number.isNaN(createdAt.getTime()) || !UUID_SHAPE.test(decoded.id)) throw new Error();
      after = { createdAt, id: decoded.id };
    } catch {
      throw validationFailed([{ field: 'cursor', message: 'The cursor is not valid' }]);
    }
  }
  const rows = await connectionRows(tx)
    .where(
      and(
        inProject(project),
        forUserId !== undefined ? eq(mcpOAuthTokenTable.userId, forUserId) : undefined,
        query.userId !== undefined ? eq(userTable.externalRef, query.userId) : undefined,
        query.componentId !== undefined
          ? eq(mcpOAuthTokenTable.componentId, query.componentId)
          : undefined,
        after
          ? sql`(${mcpOAuthTokenTable.createdAt}, ${mcpOAuthTokenTable.id}) > (${after.createdAt.toISOString()}::timestamptz, ${after.id}::uuid)`
          : undefined,
      ),
    )
    .orderBy(asc(mcpOAuthTokenTable.createdAt), asc(mcpOAuthTokenTable.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  return {
    items: page.map((row) => ({
      id: row.id,
      userId: row.userRef ?? '',
      componentId: row.componentId,
      serverName: row.serverName,
      authConfigId: row.authConfigId,
      kind: row.kind,
      valueNames: row.valueNames ?? [],
      status: row.status,
      expiresAt: row.expiresAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
    })),
    nextCursor: rows.length > query.limit && last ? encodeCursor(last.createdAt, last.id) : null,
  };
}

/**
 * Removes one connection of this project. Another project's connection, or one that does not
 * exist, is `not_found`. The server and everyone else's sign-ins are untouched.
 */
export async function deleteConnection(
  tx: Executor,
  caller: ProjectCaller,
  connectionId: string,
): Promise<void> {
  await tx.transaction(async (inner) => {
    const [row] = await connectionRows(inner)
      .where(and(inProject(caller), eq(mcpOAuthTokenTable.id, connectionId)))
      .limit(1)
      .for('update', { of: mcpOAuthTokenTable });
    if (!row) throw notFound();
    await inner
      .delete(mcpOAuthTokenTable)
      .where(
        and(
          eq(mcpOAuthTokenTable.installationId, row.installationId),
          eq(mcpOAuthTokenTable.componentId, row.componentId),
          eq(mcpOAuthTokenTable.userId, row.rowUserId),
        ),
      );
    await writeAudit(inner, {
      actor: caller.actor,
      action: 'mcp_server.disconnected',
      target: { kind: 'installation', id: row.installationId },
      orgId: caller.organizationId,
      projectId: caller.projectId,
      subjectUserId: row.rowUserId,
      context: { component: row.serverName },
    });
  });
}

// ─── Writing ──────────────────────────────────────────────────────────────────

/**
 * Gives one user their own credentials for an MCP server: one API key, or values that fill the
 * server's address and headers. The credentials are sealed and never read back; the connection
 * shows its kind and the names of the values. A repeat replaces the user's earlier connection.
 */
export async function putProjectConnection(
  tx: Executor,
  caller: ProjectCaller,
  body: Pick<PutProjectConnectionBody, 'userId' | 'apiKey' | 'values'> & {
    componentId: string;
    authConfigId?: string | undefined;
  },
  sealer: Sealer,
): Promise<ConnectionView> {
  const userId = await ensureUserByRef(tx, caller, body.userId);
  const { installations } = await resolveDelivery(tx, projectUserPrincipal(caller, userId));
  if (installations.length === 0) throw notFound();
  const [row] = await tx
    .select({
      installationId: installationComponentTable.installationId,
      pluginId: installationTable.pluginId,
      serverName: componentTable.name,
    })
    .from(installationComponentTable)
    .innerJoin(
      installationTable,
      eq(installationTable.id, installationComponentTable.installationId),
    )
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(
      and(
        eq(installationComponentTable.componentId, body.componentId),
        eq(installationComponentTable.enabled, true),
        inArray(
          installationComponentTable.installationId,
          installations.map((item) => item.installationId),
        ),
        eq(componentTable.kind, 'mcp'),
      ),
    )
    .limit(1);
  if (!row) throw notFound();

  const server = { pluginId: row.pluginId, serverName: row.serverName };
  const config =
    body.authConfigId !== undefined
      ? await namedAuthConfig(tx, caller, body.authConfigId, server)
      : await resolveAuthConfig(tx, { projectId: caller.projectId, ...server });

  const kind = body.apiKey !== undefined ? ('api_key' as const) : ('env' as const);
  const plaintext = body.apiKey ?? JSON.stringify(body.values ?? {});
  const subjectId = tokenSubject(row.installationId, body.componentId, userId);
  const now = new Date();
  const values = {
    kind,
    authConfigId: config?.id ?? null,
    credentialsSealed: await sealer.seal({
      purpose: 'connection_credentials',
      orgId: caller.organizationId,
      subject: { kind: 'user_connection', id: fieldSubjectId(subjectId, 'credentials') },
      plaintext,
    }),
    valueNames: body.values ? Object.keys(body.values).sort() : null,
    accessSealed: null,
    refreshSealed: null,
    expiresAt: null,
    scope: null,
    status: 'active' as const,
    updatedAt: now,
  };
  const saved = await tx.transaction(async (inner) => {
    // A connection hangs off the server row, which exists once anything has been set up for it.
    await inner
      .insert(mcpServerTable)
      .values({
        installationId: row.installationId,
        componentId: body.componentId,
        organizationId: caller.organizationId,
      })
      .onConflictDoNothing();
    const [stored] = await inner
      .insert(mcpOAuthTokenTable)
      .values({
        installationId: row.installationId,
        componentId: body.componentId,
        userId,
        organizationId: caller.organizationId,
        ...values,
      })
      .onConflictDoUpdate({
        target: [
          mcpOAuthTokenTable.installationId,
          mcpOAuthTokenTable.componentId,
          mcpOAuthTokenTable.userId,
        ],
        set: values,
      })
      .returning();
    await writeAudit(inner, {
      actor: caller.actor,
      action: 'connection.activated',
      target: { kind: 'installation', id: row.installationId },
      orgId: caller.organizationId,
      projectId: caller.projectId,
      subjectUserId: userId,
      context: { component: row.serverName, origin: 'project_api', kind },
    });
    return stored;
  });
  if (!saved) throw notFound();
  return {
    id: saved.id,
    userId: body.userId,
    componentId: body.componentId,
    serverName: row.serverName,
    authConfigId: saved.authConfigId,
    kind: saved.kind,
    valueNames: saved.valueNames ?? [],
    status: saved.status,
    expiresAt: null,
    createdAt: saved.createdAt.toISOString(),
  };
}
