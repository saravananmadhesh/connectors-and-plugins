/**
 * The admin allow-list: who may sign in to the admin app. The addresses in the deployment's
 * settings are written here at every start, so the table is the one list; an admin adds others in
 * the app. A new address gets the same mailed link as any admin, which is how the person proves
 * the address is theirs and chooses a password.
 */
import { and, eq, inArray, notInArray } from 'drizzle-orm';
import {
  adminAllowedEmailTable,
  platformAdminIdentityTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  AddAdminAllowedEmailBody,
  AdminAllowedEmailResponse,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { conflict, isUniqueViolation, notFound } from '../errors.js';
import type { SourceActor } from '../ingestion/sources.js';
import { requestAdminSetup, type AdminAuthPolicy } from './admin-auth.js';

const CONFIG_ACTOR = 'config';
const normalize = (email: string): string => email.trim().toLowerCase();

/**
 * Makes the table hold exactly the settings' addresses as `config` rows: new ones are added, one
 * an admin had added is taken over, and one that left the settings is removed. Rows added in the
 * app are never touched. Safe to run on every start.
 */
export async function syncConfiguredAdminEmails(
  db: Executor,
  emails: readonly string[],
): Promise<void> {
  const wanted = [...new Set(emails.map(normalize).filter((email) => email !== ''))];
  await db.transaction(async (tx) => {
    for (const email of wanted) {
      await tx
        .insert(adminAllowedEmailTable)
        .values({ email, source: 'config', addedBy: CONFIG_ACTOR })
        .onConflictDoUpdate({
          target: adminAllowedEmailTable.email,
          set: { source: 'config', addedBy: CONFIG_ACTOR },
        });
    }
    await tx
      .delete(adminAllowedEmailTable)
      .where(
        and(
          eq(adminAllowedEmailTable.source, 'config'),
          wanted.length > 0 ? notInArray(adminAllowedEmailTable.email, wanted) : undefined,
        ),
      );
  });
}

export async function isAdminEmailListed(db: Executor, email: string): Promise<boolean> {
  const [row] = await db
    .select({ email: adminAllowedEmailTable.email })
    .from(adminAllowedEmailTable)
    .where(eq(adminAllowedEmailTable.email, normalize(email)))
    .limit(1);
  return row !== undefined;
}

type Row = typeof adminAllowedEmailTable.$inferSelect;

const toResponse = (row: Row, verified: Set<string>): AdminAllowedEmailResponse => ({
  email: row.email,
  source: row.source,
  status: verified.has(row.email) ? 'verified' : 'invited',
  addedBy: row.source === 'config' ? null : row.addedBy,
  createdAt: row.createdAt.toISOString(),
});

/** Emails whose owner has chosen a password. */
async function verifiedAmong(db: Executor, emails: string[]): Promise<Set<string>> {
  if (emails.length === 0) return new Set();
  const rows = await db
    .select({
      oid: platformAdminIdentityTable.oid,
      passwordHash: platformAdminIdentityTable.passwordHash,
    })
    .from(platformAdminIdentityTable)
    .where(inArray(platformAdminIdentityTable.oid, emails));
  return new Set(rows.filter((row) => row.passwordHash !== null).map((row) => row.oid));
}

export async function listAdminAllowedEmails(db: Executor): Promise<AdminAllowedEmailResponse[]> {
  const rows = await db.select().from(adminAllowedEmailTable).orderBy(adminAllowedEmailTable.email);
  const verified = await verifiedAmong(
    db,
    rows.map((row) => row.email),
  );
  return rows.map((row) => toResponse(row, verified));
}

export async function addAdminAllowedEmail(
  db: Executor,
  policy: AdminAuthPolicy,
  body: AddAdminAllowedEmailBody,
  actor: SourceActor,
): Promise<AdminAllowedEmailResponse> {
  const email = normalize(body.email);
  let row: Row;
  try {
    row = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(adminAllowedEmailTable)
        .values({ email, source: 'added', addedBy: actor.subject })
        .returning();
      await writeAudit(tx, {
        actor: { kind: 'platform_admin', id: actor.subject },
        action: 'admin.email_allowed',
        target: { kind: 'admin_email', id: email },
        requestId: actor.requestId,
        ip: actor.ip,
      });
      return created as Row;
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
  await requestAdminSetup(db, policy, email, new Date(), actor.subject);
  return toResponse(row, new Set());
}

/** Mails a new link to an address on the list, for a person whose first one expired. */
export async function inviteAdminAllowedEmail(
  db: Executor,
  policy: AdminAuthPolicy,
  rawEmail: string,
  actor?: SourceActor,
): Promise<void> {
  const email = normalize(rawEmail);
  if (!(await isAdminEmailListed(db, email))) throw notFound();
  await requestAdminSetup(db, policy, email, new Date(), actor?.subject);
}

/**
 * Removes an address an admin added. Its sessions stop at once, because every request checks the
 * list. Addresses from the settings are removed there, and an admin cannot remove their own.
 */
export async function removeAdminAllowedEmail(
  db: Executor,
  rawEmail: string,
  actor: SourceActor,
): Promise<void> {
  const email = normalize(rawEmail);
  const [row] = await db
    .select()
    .from(adminAllowedEmailTable)
    .where(eq(adminAllowedEmailTable.email, email))
    .limit(1);
  if (!row) throw notFound();
  if (row.source === 'config' || email === normalize(actor.subject)) throw conflict();
  await db.transaction(async (tx) => {
    await tx.delete(adminAllowedEmailTable).where(eq(adminAllowedEmailTable.email, email));
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: actor.subject },
      action: 'admin.email_removed',
      target: { kind: 'admin_email', id: email },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
}
