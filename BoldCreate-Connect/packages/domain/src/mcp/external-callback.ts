/**
 * The callback of a sign-in that a host's call started, for a project. The
 * browser has no website session, so the state value is the proof: random, single use, ten
 * minutes, bound to the user and server that began it. Everything else is checked again here,
 * because it may have changed since.
 */
import { and, eq, isNull, or } from 'drizzle-orm';
import {
  installationTable,
  mcpOAuthStateTable,
  organizationTable,
  projectTable,
  setRlsContext,
  userTable,
  withTenant,
  type Db,
  type Executor,
} from '@boldcreate-integrations/db';
import type { Unsealer } from '@boldcreate-integrations/credentials';
import { AppError, appError } from '../errors.js';
import { hashState } from './oauth.js';
import { returnUrlAllowed } from './return-url.js';
import { consumedFromRow, type ConsumedState } from './servers.js';

/** Where the browser goes back to, and what to tell the host's page. */
export interface ExternalLanding {
  /** The project whose call or session began the flow. */
  projectId: string;
  userId: string;
  componentId: string;
  returnUrl: string;
  clientState: string | null;
}

export interface ExternalCallbackState {
  landing: ExternalLanding;
  /** Null when the user or the org may no longer connect; the browser still goes back. */
  consumed: ConsumedState | null;
}

/** Whether the state names a flow a host's call started. Reads only; the row stays. */
export async function isExternalState(db: Db, orgId: string, state: string): Promise<boolean> {
  return withTenant(db, { orgId }, async (tx) => {
    const [row] = await tx
      .select({
        projectId: mcpOAuthStateTable.projectId,
      })
      .from(mcpOAuthStateTable)
      .where(eq(mcpOAuthStateTable.stateHash, hashState(state)))
      .limit(1);
    return row !== undefined && row.projectId !== null;
  });
}

/**
 * A project user holds no membership, so the project and the user are what count: the project is
 * active and belongs to the organization, the user is an active user of that project, and the
 * server is still installed for them (by the project or by themselves in it).
 */
async function projectMayStillConnect(
  tx: Executor,
  orgId: string,
  projectId: string,
  userId: string,
  installationId: string,
): Promise<boolean> {
  const [org] = await tx
    .select({ id: organizationTable.id })
    .from(organizationTable)
    .where(and(eq(organizationTable.id, orgId), isNull(organizationTable.deletionRequestedAt)))
    .limit(1);
  if (!org) return false;
  const [project] = await tx
    .select({ status: projectTable.status })
    .from(projectTable)
    .where(and(eq(projectTable.id, projectId), eq(projectTable.organizationId, orgId)))
    .limit(1);
  if (project?.status !== 'active') return false;
  const [user] = await tx
    .select({ kind: userTable.kind, status: userTable.status, projectId: userTable.projectId })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);
  if (!user || user.kind !== 'external' || user.projectId !== projectId) return false;
  if (user.status !== 'active') return false;
  const [installation] = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, orgId),
        eq(installationTable.projectId, projectId),
        eq(installationTable.status, 'active'),
        or(
          eq(installationTable.scopeType, 'project'),
          and(eq(installationTable.scopeType, 'user'), eq(installationTable.ownerUserId, userId)),
        ),
      ),
    )
    .limit(1);
  return installation !== undefined;
}

/**
 * The origins the host registered, when its project is still active; null otherwise.
 * Reading is done through the host's own table, so a suspended host never gets a redirect.
 */
async function originsOf(
  tx: Executor,
  row: { projectId: string | null },
): Promise<readonly string[] | null> {
  if (row.projectId !== null) {
    const [project] = await tx
      .select({ status: projectTable.status, origins: projectTable.returnOrigins })
      .from(projectTable)
      .where(eq(projectTable.id, row.projectId))
      .limit(1);
    return project?.status === 'active' ? project.origins : null;
  }
  return null;
}

/**
 * Removes the state (single use) and says where the browser goes and whether the code may be
 * exchanged. An unknown, expired or website-started state, a host that is no longer active and a
 * return address that is no longer allowed all answer `oauth_state_invalid` with no redirect:
 * there is no address left that can be trusted.
 */
export async function consumeExternalOAuthState(
  db: Db,
  orgId: string,
  state: string,
  unsealer: Unsealer,
  now: Date = new Date(),
): Promise<ExternalCallbackState> {
  const result = await withTenant(db, { orgId }, async (tx) => {
    const [row] = await tx
      .delete(mcpOAuthStateTable)
      .where(eq(mcpOAuthStateTable.stateHash, hashState(state)))
      .returning();
    if (
      !row ||
      row.projectId === null ||
      row.returnUrl === null ||
      row.organizationId !== orgId ||
      row.expiresAt.getTime() < now.getTime()
    ) {
      return null;
    }
    await setRlsContext(tx, { orgId, userId: row.userId });
    const origins = await originsOf(tx, row);
    const url = origins ? returnUrlAllowed(row.returnUrl, origins) : null;
    // The row is gone either way: a flow that cannot be trusted must not be tried again.
    if (!url) return null;
    const landing: ExternalLanding = {
      projectId: row.projectId,
      userId: row.userId,
      componentId: row.componentId,
      returnUrl: url.href,
      clientState: row.clientState,
    };
    const allowed = await projectMayStillConnect(
      tx,
      orgId,
      row.projectId,
      row.userId,
      row.installationId,
    );
    if (!allowed) return { landing, consumed: null };
    try {
      return { landing, consumed: await consumedFromRow(tx, row, unsealer) };
    } catch (error) {
      if (error instanceof AppError && error.code === 'oauth_state_invalid') {
        return { landing, consumed: null };
      }
      throw error;
    }
  });
  if (!result) throw appError('oauth_state_invalid');
  return result;
}
