/**
 * The users of a project: the host's own people, made the first time the host names them. A project
 * user is a `kind = external` user row with no password and no deliverable address; the host names it
 * by its own id. Every call repeats safely: the pair (project, id) is unique, so a retry updates what
 * is there instead of making a second user.
 */
import { randomUUID } from 'node:crypto';
import { and, asc, count, eq, gt, inArray, isNull, max, ne, or, sql } from 'drizzle-orm';
import {
  apiKeyTable,
  auditLogTable,
  decodeCursor,
  encodeCursor,
  installationComponentTable,
  installationTable,
  mcpOAuthTokenTable,
  projectTable,
  userTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  Plain,
  ProjectUserListQuery,
  ProjectUserResponse,
  UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { writeAudit } from '../audit/write-audit.js';
import { requireAction } from '../permissions/authorize.js';
import { conflict, limitExceeded, notFound, validationFailed } from '../errors.js';
import { tombstoneEmail } from '../identity/user-deletion.js';
import { allStates, projectUserPrincipal } from './user-plugin-state.js';

/** The project whose users a call reads. */
export interface ProjectScope {
  projectId: string;
  organizationId: string;
}

/** The project key a call is made with; writes record it in the audit trail. */
export interface ProjectActor extends ProjectScope {
  keyRowId: string;
  /** Set when a person in the console makes the call instead of the host's key. */
  consoleUserId?: string;
}

type UserRow = typeof userTable.$inferSelect;

const DISPLAY_NAME_MAX = 80;
const UUID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** A reference whose user was deleted is renamed to this, which frees the reference for reuse. */
function releasedRef(): string {
  return `deleted:${randomUUID().replaceAll('-', '')}`;
}

/** The unreachable address of a project user: unique per user and never deliverable. */
function placeholderEmail(userId: string): string {
  return `${userId.replaceAll('-', '')}@project.invalid`;
}

function auditOf(actor: ProjectActor, action: 'project_user.created') {
  return (userId: string, extra: Record<string, unknown>) => ({
    actor:
      actor.consoleUserId !== undefined
        ? { kind: 'user_session' as const, id: actor.consoleUserId }
        : { kind: 'api_key' as const, id: actor.keyRowId },
    action,
    target: { kind: 'user', id: userId },
    orgId: actor.organizationId,
    projectId: actor.projectId,
    subjectUserId: userId,
    context: { origin: actor.consoleUserId !== undefined ? 'console' : 'project_api', ...extra },
  });
}

function activeSessions(projectId: string) {
  return and(
    eq(apiKeyTable.projectId, projectId),
    isNull(apiKeyTable.revokedAt),
    or(isNull(apiKeyTable.expiresAt), gt(apiKeyTable.expiresAt, sql`now()`)),
  );
}

interface UserCounts {
  sessions: Map<string, number>;
  connections: Map<string, number>;
  syncedAt: Map<string, Date>;
  missing: Map<string, number>;
}

async function countsFor(
  tx: Executor,
  actor: ProjectScope,
  userIds: string[],
): Promise<UserCounts> {
  const sessions = new Map<string, number>();
  const connections = new Map<string, number>();
  const syncedAt = new Map<string, Date>();
  const missing = new Map<string, number>();
  if (userIds.length === 0) return { sessions, connections, syncedAt, missing };
  const sessionRows = await tx
    .select({ userId: apiKeyTable.principalUserId, n: count() })
    .from(apiKeyTable)
    .where(and(activeSessions(actor.projectId), inArray(apiKeyTable.principalUserId, userIds)))
    .groupBy(apiKeyTable.principalUserId);
  for (const row of sessionRows) sessions.set(row.userId, row.n);
  const connectionRows = await tx
    .select({ userId: mcpOAuthTokenTable.userId, n: count() })
    .from(mcpOAuthTokenTable)
    .where(
      and(
        eq(mcpOAuthTokenTable.organizationId, actor.organizationId),
        inArray(mcpOAuthTokenTable.userId, userIds),
      ),
    )
    .groupBy(mcpOAuthTokenTable.userId);
  for (const row of connectionRows) connections.set(row.userId, row.n);
  const syncRows = await tx
    .select({ userId: auditLogTable.subjectUserId, at: max(auditLogTable.createdAt) })
    .from(auditLogTable)
    .where(
      and(
        eq(auditLogTable.projectId, actor.projectId),
        eq(auditLogTable.action, 'sync.reported'),
        inArray(auditLogTable.subjectUserId, userIds),
      ),
    )
    .groupBy(auditLogTable.subjectUserId);
  for (const row of syncRows) if (row.userId && row.at) syncedAt.set(row.userId, row.at);
  // What is left to do is read the way the user's own page reads it, so the two never disagree.
  const caller = { ...actor, actor: { kind: 'system' as const, id: 'project-users' } };
  for (const userId of userIds) {
    const states = await allStates(tx, projectUserPrincipal(caller, userId), {
      connections: false,
    });
    missing.set(
      userId,
      states.reduce((total, state) => total + state.mcp.filter((entry) => !entry.ready).length, 0),
    );
  }
  return { sessions, connections, syncedAt, missing };
}

function view(row: UserRow, counts: UserCounts): Plain<ProjectUserResponse> {
  return {
    id: row.id,
    userId: row.externalRef!,
    displayName: row.displayName,
    status: row.status === 'suspended' ? 'suspended' : 'active',
    createdAt: row.createdAt.toISOString(),
    lastSeenAt: row.lastLoginAt?.toISOString() ?? null,
    sessionCount: counts.sessions.get(row.id) ?? 0,
    connectionCount: counts.connections.get(row.id) ?? 0,
    lastSyncedAt: counts.syncedAt.get(row.id)?.toISOString() ?? null,
    connectionsMissing: counts.missing.get(row.id) ?? 0,
  };
}

async function viewOne(
  tx: Executor,
  actor: ProjectScope,
  row: UserRow,
): Promise<Plain<ProjectUserResponse>> {
  return view(row, await countsFor(tx, actor, [row.id]));
}

async function findByRef(tx: Executor, projectId: string, externalRef: string) {
  const [user] = await tx
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.projectId, projectId),
        eq(userTable.externalRef, externalRef),
        eq(userTable.kind, 'external'),
      ),
    )
    .limit(1)
    .for('update');
  return user;
}

/**
 * The project's user with this id, made on first use. A repeat call returns the same user; a new
 * display name replaces the old one. Users of one project are made one at a time, so the count is
 * exact and two calls for the same id cannot both insert. A user the platform suspended or deleted
 * is `conflict`.
 */
export async function ensureProjectUser(
  tx: Executor,
  actor: ProjectActor,
  externalRef: string,
  displayName?: string,
): Promise<{ created: boolean; user: Plain<ProjectUserResponse> }> {
  return tx.transaction(async (inner) => {
    let user = await findByRef(inner, actor.projectId, externalRef);
    let created = false;
    if (!user) {
      await inner
        .select({ id: projectTable.id })
        .from(projectTable)
        .where(eq(projectTable.id, actor.projectId))
        .for('update');
      user = await findByRef(inner, actor.projectId, externalRef);
    }
    if (!user) {
      const [known] = await inner
        .select({ n: count() })
        .from(userTable)
        .where(
          and(
            eq(userTable.projectId, actor.projectId),
            eq(userTable.kind, 'external'),
            ne(userTable.status, 'deleted'),
          ),
        );
      if ((known?.n ?? 0) >= PROJECT_LIMITS.usersPerProject) throw limitExceeded();
      const id = randomUUID();
      const address = placeholderEmail(id);
      const now = new Date();
      await inner.insert(userTable).values({
        id,
        email: address,
        emailNormalized: address,
        displayName: displayName ?? externalRef.slice(0, DISPLAY_NAME_MAX),
        emailVerifiedAt: now,
        // No starter org: a project user only ever acts inside the project's organization.
        starterOrgProvisionedAt: now,
        kind: 'external',
        projectId: actor.projectId,
        externalRef,
        createdAt: now,
        updatedAt: now,
      });
      user = (await findByRef(inner, actor.projectId, externalRef))!;
      created = true;
      await writeAudit(inner, auditOf(actor, 'project_user.created')(id, {}));
    }
    if (user.status !== 'active') throw conflict();
    if (!created && displayName !== undefined && user.displayName !== displayName) {
      const [updated] = await inner
        .update(userTable)
        .set({ displayName, updatedAt: new Date() })
        .where(eq(userTable.id, user.id))
        .returning();
      user = updated!;
    }
    return { created, user: await viewOne(inner, actor, user) };
  });
}

/** The project's user with this platform id, or `not_found` for anyone else's. */
export async function findProjectUser(
  tx: Executor,
  actor: ProjectScope,
  userId: string,
): Promise<Plain<ProjectUserResponse>> {
  const [user] = await tx
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.id, userId),
        eq(userTable.projectId, actor.projectId),
        eq(userTable.kind, 'external'),
        ne(userTable.status, 'deleted'),
      ),
    )
    .limit(1);
  if (!user) throw notFound();
  return viewOne(tx, actor, user);
}

/** Escapes the characters `LIKE` gives a meaning, so a search is always a plain prefix. */
function likePrefix(text: string): string {
  return `${text.replaceAll('\\', '\\\\').replaceAll('%', '\\%').replaceAll('_', '\\_')}%`;
}

/** The project's users, oldest first, optionally those whose own id starts with `search`. */
export async function listProjectUsers(
  tx: Executor,
  actor: ProjectScope,
  query: ProjectUserListQuery,
): Promise<{ items: Plain<ProjectUserResponse>[]; nextCursor: string | null }> {
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

  const rows = await tx
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.projectId, actor.projectId),
        eq(userTable.kind, 'external'),
        ne(userTable.status, 'deleted'),
        query.userId !== undefined ? eq(userTable.externalRef, query.userId) : undefined,
        query.search !== undefined
          ? sql`${userTable.externalRef} LIKE ${likePrefix(query.search)}`
          : undefined,
        after
          ? sql`(${userTable.createdAt}, ${userTable.id}) > (${after.createdAt.toISOString()}::timestamptz, ${after.id}::uuid)`
          : undefined,
      ),
    )
    .orderBy(asc(userTable.createdAt), asc(userTable.id))
    .limit(query.limit + 1);

  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  const counts = await countsFor(
    tx,
    actor,
    page.map((row) => row.id),
  );
  return {
    items: page.map((row) => view(row, counts)),
    nextCursor: rows.length > query.limit && last ? encodeCursor(last.createdAt, last.id) : null,
  };
}

/**
 * Deletes a project user: their sessions end, their connections and their own installs go, and the
 * row stays as a tombstone with the id free for reuse. Only a person managing the organization may
 * do this, from the console; the host's own key cannot. Answers `not_found` for anyone who is not a
 * live user of this project.
 */
export async function deleteProjectUser(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  userId: string,
): Promise<void> {
  requireAction(principal, 'project-user:delete', { orgId });
  const actor = { projectId, organizationId: orgId };
  await tx.transaction(async (inner) => {
    const [project] = await inner
      .select({ id: projectTable.id })
      .from(projectTable)
      .where(and(eq(projectTable.id, projectId), eq(projectTable.organizationId, orgId)))
      .limit(1);
    if (!project) throw notFound();
    const [user] = await inner
      .select()
      .from(userTable)
      .where(
        and(
          eq(userTable.id, userId),
          eq(userTable.projectId, actor.projectId),
          eq(userTable.kind, 'external'),
          ne(userTable.status, 'deleted'),
        ),
      )
      .limit(1)
      .for('update');
    if (!user) throw notFound();

    const now = new Date();
    const ended = await inner
      .update(apiKeyTable)
      .set({ revokedAt: now, updatedAt: now })
      .where(and(eq(apiKeyTable.principalUserId, userId), isNull(apiKeyTable.revokedAt)))
      .returning({ id: apiKeyTable.id });
    const connections = await inner
      .delete(mcpOAuthTokenTable)
      .where(
        and(
          eq(mcpOAuthTokenTable.organizationId, actor.organizationId),
          eq(mcpOAuthTokenTable.userId, userId),
        ),
      )
      .returning({ id: mcpOAuthTokenTable.id });
    const personal = and(
      eq(installationTable.organizationId, actor.organizationId),
      eq(installationTable.scopeType, 'user'),
      eq(installationTable.ownerUserId, userId),
    );
    const installs = await inner
      .select({ id: installationTable.id })
      .from(installationTable)
      .where(personal);
    if (installs.length > 0) {
      await inner.delete(installationComponentTable).where(
        inArray(
          installationComponentTable.installationId,
          installs.map((install) => install.id),
        ),
      );
      await inner.delete(installationTable).where(personal);
    }

    const tombstone = tombstoneEmail(userId);
    await inner
      .update(userTable)
      .set({
        status: 'deleted',
        deletedAt: now,
        email: tombstone,
        emailNormalized: tombstone,
        displayName: 'Deleted user',
        externalRef: releasedRef(),
        updatedAt: now,
      })
      .where(eq(userTable.id, userId));
    await writeAudit(inner, {
      actor: { kind: 'user_session' as const, id: principal.userId },
      action: 'project_user.deleted',
      target: { kind: 'user', id: userId },
      orgId,
      projectId,
      subjectUserId: userId,
      context: {
        origin: 'website_session',
        externalRef: user.externalRef,
        sessionsEnded: ended.length,
        connectionsRemoved: connections.length,
        installsRemoved: installs.length,
      },
    });
  });
}
