/**
 * Sessions of project users. A session is a key the host hands to one of its users: it reaches the
 * project's plugins and the user's own, optionally narrowed to a list, and it ends on its own.
 * Revoking a session, deleting its user or removing a plugin it names all end it.
 */
import { randomUUID } from 'node:crypto';
import { and, asc, eq, gt, inArray, isNull, ne, or, sql } from 'drizzle-orm';
import {
  apiKeyTable,
  decodeCursor,
  encodeCursor,
  installationTable,
  pluginTable,
  projectTable,
  userTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  CreateSessionBody,
  KeyPermission,
  Plain,
  SessionResponse,
  ToolPolicy,
} from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { generateApiKeyParts, hashToken } from '@boldcreate-integrations/security';
import { writeAudit } from '../audit/write-audit.js';
import { appError, limitExceeded, notFound, validationFailed } from '../errors.js';
import { namedAuthConfig, serverKey, serverOfComponent } from './auth-configs.js';
import type { ProjectCaller } from './project-plugins.js';
import { expandSet } from './plugin-sets.js';
import type { ProjectScope } from './project-users.js';
import { ensureUserByRef } from './user-plugins.js';

type SessionView = Plain<SessionResponse>;

/** What a session may do; installing is left out when the project does not let users install. */
export const SESSION_PERMISSIONS: readonly KeyPermission[] = [
  'mcp:list',
  'mcp:call',
  'artifact:sync',
  'artifact:download',
  'plugin:install',
];

const UUID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const liveSessions = (projectId: string) =>
  and(
    eq(apiKeyTable.projectId, projectId),
    isNull(apiKeyTable.revokedAt),
    or(isNull(apiKeyTable.expiresAt), gt(apiKeyTable.expiresAt, sql`now()`)),
  );

/** The plugins a user can see in a project: the project's installs and the user's own. */
async function visiblePlugins(
  tx: Executor,
  project: ProjectScope,
  userId: string,
): Promise<{ id: string; name: string }[]> {
  return tx
    .selectDistinct({ id: pluginTable.id, name: pluginTable.name })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .where(
      and(
        eq(installationTable.organizationId, project.organizationId),
        eq(installationTable.status, 'active'),
        eq(installationTable.projectId, project.projectId),
        or(
          eq(installationTable.scopeType, 'project'),
          and(eq(installationTable.scopeType, 'user'), eq(installationTable.ownerUserId, userId)),
        ),
      ),
    );
}

/** Plugin ids for the names or ids given, or `validation_failed` listing the ones nobody can see. */
async function resolvePlugins(
  tx: Executor,
  project: ProjectScope,
  userId: string,
  requested: readonly string[],
): Promise<string[]> {
  if (requested.length === 0) return [];
  const visible = await visiblePlugins(tx, project, userId);
  const byKey = new Map<string, string>();
  for (const plugin of visible) {
    byKey.set(plugin.name, plugin.id);
    byKey.set(plugin.id, plugin.id);
  }
  const ids = new Set<string>();
  const unknown: string[] = [];
  for (const entry of requested) {
    const id = byKey.get(entry);
    if (id === undefined) unknown.push(entry);
    else ids.add(id);
  }
  if (unknown.length > 0) {
    throw validationFailed([
      { field: 'plugins', message: `not installed for this user: ${unknown.join(', ')}` },
    ]);
  }
  return [...ids];
}

async function namesOf(tx: Executor, ids: readonly string[]): Promise<Map<string, string>> {
  if (ids.length === 0) return new Map();
  const rows = await tx
    .select({ id: pluginTable.id, name: pluginTable.name })
    .from(pluginTable)
    .where(inArray(pluginTable.id, [...new Set(ids)]));
  return new Map(rows.map((row) => [row.id, row.name]));
}

type KeyRow = typeof apiKeyTable.$inferSelect;

function statusOf(row: KeyRow, now: Date): SessionView['status'] {
  if (row.revokedAt) return 'revoked';
  if (row.expiresAt && row.expiresAt <= now) return 'expired';
  return 'active';
}

function view(
  row: KeyRow,
  externalRef: string,
  names: ReadonlyMap<string, string>,
  now: Date,
): SessionView {
  return {
    id: row.id,
    userId: externalRef,
    plugins: (row.plugins ?? []).map((id) => names.get(id) ?? id),
    tools: row.toolPolicy ?? {},
    authConfigs: Object.entries(row.authConfigs ?? {}).map(([key, authConfigId]) => {
      const split = key.indexOf('/');
      return { pluginId: key.slice(0, split), serverName: key.slice(split + 1), authConfigId };
    }),
    status: statusOf(row, now),
    createdAt: row.createdAt.toISOString(),
    expiresAt: (row.expiresAt ?? row.createdAt).toISOString(),
    lastUsedAt: row.lastUsedAt ? row.lastUsedAt.toISOString() : null,
  };
}

export interface CreatedSession extends SessionView {
  token: string;
}

/** Makes a session for the host's user; the token is returned here and never again. */
export async function createSession(
  tx: Executor,
  caller: ProjectCaller,
  body: CreateSessionBody,
): Promise<CreatedSession> {
  const [project] = await tx
    .select({
      status: projectTable.status,
      createdBy: projectTable.createdBy,
      mode: projectTable.userInstallMode,
    })
    .from(projectTable)
    .where(eq(projectTable.id, caller.projectId))
    .limit(1);
  if (!project || project.status !== 'active') throw notFound();

  const policy: ToolPolicy = body.tools ?? {};
  if ((policy.disable?.length ?? 0) > PROJECT_LIMITS.sessionToolPolicyEntries) {
    throw validationFailed([{ field: 'tools.disable', message: 'too many entries' }]);
  }

  const userId = await ensureUserByRef(tx, caller, body.userId);

  // Each config named must belong to this project and to the server its component stands for.
  const authConfigs: Record<string, string> = {};
  const named = Object.entries(body.authConfigs ?? {});
  if (named.length > PROJECT_LIMITS.pluginsPerSession) throw limitExceeded();
  for (const [componentId, authConfigId] of named) {
    const server = await serverOfComponent(tx, caller, componentId).catch(() => {
      throw appError('unprocessable');
    });
    await namedAuthConfig(tx, caller, authConfigId, server);
    authConfigs[serverKey(server.pluginId, server.serverName)] = authConfigId;
  }

  const requested = [...(body.plugins ?? [])];
  if (body.set !== undefined) {
    const members = await expandSet(tx, caller, body.set);
    for (const member of members) requested.push(member.name);
  }
  const unique = [...new Set(requested)];
  if (unique.length > PROJECT_LIMITS.pluginsPerSession) throw limitExceeded();
  const plugins = await resolvePlugins(tx, caller, userId, unique);

  const seconds = Math.min(
    body.expiresInSeconds ?? PROJECT_LIMITS.sessionLifetimeSecondsDefault,
    PROJECT_LIMITS.sessionLifetimeSecondsMax,
  );
  const now = new Date();
  const expiresAt = new Date(now.getTime() + seconds * 1000);

  // The user row is locked so two creates cannot both count the sessions before either inserts.
  await tx
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1)
    .for('update');
  const [{ live } = { live: 0 }] = await tx
    .select({ live: sql<number>`count(*)::int` })
    .from(apiKeyTable)
    .where(and(liveSessions(caller.projectId), eq(apiKeyTable.principalUserId, userId)));
  if (live >= PROJECT_LIMITS.sessionsPerUser) throw limitExceeded();

  const storedPolicy: { disable?: string[]; disableDestructive?: boolean } = {};
  if (policy.disable && policy.disable.length > 0) storedPolicy.disable = policy.disable;
  if (policy.disableDestructive) storedPolicy.disableDestructive = true;
  const { keyId, secret, lastFour } = generateApiKeyParts('session');
  const id = randomUUID();
  const permissions = SESSION_PERMISSIONS.filter(
    (permission) => permission !== 'plugin:install' || project.mode !== 'off',
  );
  await tx.insert(apiKeyTable).values({
    id,
    keyId,
    secretHash: hashToken(secret),
    principalUserId: userId,
    organizationId: caller.organizationId,
    scopeType: 'user',
    ownerUserId: userId,
    projectId: caller.projectId,
    plugins: plugins.length > 0 ? plugins : null,
    toolPolicy: Object.keys(storedPolicy).length > 0 ? storedPolicy : null,
    authConfigs: Object.keys(authConfigs).length > 0 ? authConfigs : null,
    createdBy: project.createdBy,
    name: `session ${keyId.slice(-8)}`,
    lastFour,
    permissions: [...permissions],
    expiresAt,
    revokedAt: null,
    lastUsedAt: null,
    lastUsedIp: null,
    rateLimitPerMinute: PROJECT_LIMITS.requestsPerMinutePerKey,
    createdAt: now,
    updatedAt: now,
  });
  await writeAudit(tx, {
    actor: caller.actor,
    action: 'session.created',
    target: { kind: 'api_key', id },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    subjectUserId: userId,
    context: { prefix: keyId, plugins: plugins.length, expiresInSeconds: seconds },
  });

  const names = await namesOf(tx, plugins);
  const [row] = await tx.select().from(apiKeyTable).where(eq(apiKeyTable.id, id)).limit(1);
  if (!row) throw appError('internal_error');
  return { ...view(row, body.userId, names, now), token: `${keyId}.${secret}` };
}

async function viewRows(tx: Executor, rows: readonly KeyRow[]): Promise<SessionView[]> {
  const userIds = [...new Set(rows.map((row) => row.principalUserId))];
  const refs = new Map<string, string>();
  if (userIds.length > 0) {
    const users = await tx
      .select({ id: userTable.id, ref: userTable.externalRef })
      .from(userTable)
      .where(inArray(userTable.id, userIds));
    for (const user of users) refs.set(user.id, user.ref ?? '');
  }
  const names = await namesOf(
    tx,
    rows.flatMap((row) => row.plugins ?? []),
  );
  const now = new Date();
  return rows.map((row) => view(row, refs.get(row.principalUserId) ?? '', names, now));
}

/** The project's sessions, newest first; an unknown `userId` gives an empty page. */
export async function listSessions(
  tx: Executor,
  project: ProjectScope,
  query: { limit: number; cursor?: string | undefined; userId?: string | undefined },
): Promise<{ items: SessionView[]; nextCursor: string | null }> {
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
  let ownerId: string | undefined;
  if (query.userId !== undefined) {
    const [user] = await tx
      .select({ id: userTable.id })
      .from(userTable)
      .where(
        and(
          eq(userTable.projectId, project.projectId),
          eq(userTable.externalRef, query.userId),
          eq(userTable.kind, 'external'),
          ne(userTable.status, 'deleted'),
        ),
      )
      .limit(1);
    if (!user) return { items: [], nextCursor: null };
    ownerId = user.id;
  }
  const rows = await tx
    .select()
    .from(apiKeyTable)
    .where(
      and(
        eq(apiKeyTable.projectId, project.projectId),
        eq(apiKeyTable.organizationId, project.organizationId),
        ownerId !== undefined ? eq(apiKeyTable.principalUserId, ownerId) : undefined,
        after
          ? sql`(${apiKeyTable.createdAt}, ${apiKeyTable.id}) > (${after.createdAt.toISOString()}::timestamptz, ${after.id}::uuid)`
          : undefined,
      ),
    )
    .orderBy(asc(apiKeyTable.createdAt), asc(apiKeyTable.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  return {
    items: await viewRows(tx, page),
    nextCursor: rows.length > query.limit && last ? encodeCursor(last.createdAt, last.id) : null,
  };
}

/** One session of this project; another project's id is `not_found`. */
export async function getSession(
  tx: Executor,
  project: ProjectScope,
  sessionId: string,
): Promise<SessionView> {
  const [row] = await tx
    .select()
    .from(apiKeyTable)
    .where(
      and(
        eq(apiKeyTable.id, sessionId),
        eq(apiKeyTable.projectId, project.projectId),
        eq(apiKeyTable.organizationId, project.organizationId),
      ),
    )
    .limit(1);
  if (!row) throw notFound();
  const [view] = await viewRows(tx, [row]);
  if (!view) throw notFound();
  return view;
}

/** Ends a session now. Revoking one that already ended is not an error. */
export async function revokeSession(
  tx: Executor,
  caller: ProjectCaller,
  sessionId: string,
): Promise<void> {
  const [row] = await tx
    .select({
      id: apiKeyTable.id,
      revokedAt: apiKeyTable.revokedAt,
      userId: apiKeyTable.principalUserId,
    })
    .from(apiKeyTable)
    .where(
      and(
        eq(apiKeyTable.id, sessionId),
        eq(apiKeyTable.projectId, caller.projectId),
        eq(apiKeyTable.organizationId, caller.organizationId),
      ),
    )
    .limit(1)
    .for('update');
  if (!row) throw notFound();
  if (row.revokedAt) return;
  const now = new Date();
  await tx
    .update(apiKeyTable)
    .set({ revokedAt: now, updatedAt: now })
    .where(eq(apiKeyTable.id, row.id));
  await writeAudit(tx, {
    actor: caller.actor,
    action: 'session.revoked',
    target: { kind: 'api_key', id: row.id },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    subjectUserId: row.userId,
    context: {},
  });
}

/** Ends the live sessions whose allow list names a plugin the project no longer installs. */
export async function revokeSessionsForPlugin(
  tx: Executor,
  caller: ProjectCaller,
  pluginId: string,
): Promise<number> {
  const now = new Date();
  const ended = await tx
    .update(apiKeyTable)
    .set({ revokedAt: now, updatedAt: now })
    .where(
      and(liveSessions(caller.projectId), sql`${pluginId}::text = ANY(${apiKeyTable.plugins})`),
    )
    .returning({ id: apiKeyTable.id, userId: apiKeyTable.principalUserId });
  for (const row of ended) {
    await writeAudit(tx, {
      actor: caller.actor,
      action: 'session.revoked',
      target: { kind: 'api_key', id: row.id },
      orgId: caller.organizationId,
      projectId: caller.projectId,
      subjectUserId: row.userId,
      context: { reason: 'plugin_removed', pluginId },
    });
  }
  return ended.length;
}
