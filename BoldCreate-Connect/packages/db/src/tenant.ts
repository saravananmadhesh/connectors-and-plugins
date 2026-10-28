import { sql } from 'drizzle-orm';
import { setTenant } from '@boldcreate-integrations/observability';
import type { Db, Executor, Tx } from './client.js';

export interface TenantContext {
  /** Absent for requests that belong to no organization yet; the setting is then empty. */
  orgId?: string | undefined;
  /** Absent for work that belongs to no user, such as a background job; the setting is then empty. */
  userId?: string | undefined;
  /** Set by a project key or a project session: only rows of this project are visible. */
  projectId?: string | undefined;
  /** Set by a project session: only this user's own rows are visible. */
  subjectUserId?: string | undefined;
  /** Set for an organization Viewer: the For You rows are not visible. */
  viewer?: boolean | undefined;
}

/**
 * Sets `app.tenant`, `app.user`, `app.project`, `app.subject` and `app.viewer` for the rest of the open transaction. Row policies read these
 * settings. Use it to move to another organization inside one transaction; the settings are
 * transaction-local, so a pooled connection never carries them over.
 */
export async function setRlsContext(tx: Executor, context: TenantContext): Promise<void> {
  await tx.execute(
    sql`SELECT set_config('app.tenant', ${context.orgId ?? ''}, true), set_config('app.user', ${context.userId ?? ''}, true), set_config('app.project', ${context.projectId ?? ''}, true), set_config('app.subject', ${context.subjectUserId ?? ''}, true), set_config('app.viewer', ${context.viewer ? '1' : ''}, true)`,
  );
}

/**
 * Runs `fn` in a transaction whose settings `app.tenant` and `app.user` carry the caller's
 * organization and user for the length of that transaction. Row policies read these settings;
 * the settings reset when the transaction ends, so a pooled connection never carries them over.
 */
export async function withTenant<T>(
  db: Db,
  context: TenantContext,
  fn: (tx: Tx) => Promise<T>,
): Promise<T> {
  if (context.orgId) setTenant(context.orgId);
  return db.transaction(async (tx) => {
    await setRlsContext(tx, context);
    return fn(tx);
  });
}
