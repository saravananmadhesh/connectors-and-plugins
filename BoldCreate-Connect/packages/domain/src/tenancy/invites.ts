import { randomUUID } from 'node:crypto';
import { eq, and, isNull, gt, desc } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  organizationMemberTable,
  emailTokenTable,
  userTable,
  setRlsContext,
} from '@boldcreate-integrations/db';
import {
  generateEmailToken,
  hashEmailToken,
  isEmailTokenValid,
  INVITE_TOKEN_TTL_SECONDS,
} from '../identity/email-token.js';
import {
  ROLE_LABELS,
  type PublicRole,
  type UserSessionPrincipal,
  type CreateInviteBody,
  type CreateInviteResponse,
  type AcceptInviteBody,
  type InviteResponse,
  type Plain,
} from '@boldcreate-integrations/contracts';
import { requireAction } from '../permissions/authorize.js';
import { writeAudit } from '../audit/write-audit.js';
import { appError, conflict, forbidden, notFound } from '../errors.js';
import { enqueueEmail } from './shared.js';

/**
 * Invites every address to the org with one role. Someone already in the org is answered with
 * `already_member`. Each address is answered on its own, so one that cannot be invited does not
 * hold up the others.
 */
export async function createInvite(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  body: CreateInviteBody,
): Promise<Plain<CreateInviteResponse>> {
  requireAction(principal, 'invite:create', { orgId });
  const inviterId = principal.userId;

  const results: Plain<CreateInviteResponse>['results'] = [];
  for (const email of new Set(body.emails.map((raw) => raw.toLowerCase().trim()))) {
    const [user] = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.emailNormalized, email))
      .limit(1);
    const [member] = user
      ? await db
          .select({ userId: organizationMemberTable.userId })
          .from(organizationMemberTable)
          .where(
            and(
              eq(organizationMemberTable.organizationId, orgId),
              eq(organizationMemberTable.userId, user.id),
            ),
          )
          .limit(1)
      : [];
    if (member) {
      results.push({ email, status: 'already_member', invite: null });
      continue;
    }

    const token = generateEmailToken(INVITE_TOKEN_TTL_SECONDS);
    const tokenId = randomUUID();
    const createdAt = new Date();
    await db.transaction(async (tx) => {
      await tx.insert(emailTokenTable).values({
        id: tokenId,
        purpose: 'invite',
        tokenHash: token.hash,
        targetEmailNormalized: email,
        orgId,
        invitedRole: body.role,
        inviterId,
        expiresAt: token.expiresAt,
      });
      await enqueueEmail(tx, 'invite.created', {
        to: email,
        token: token.raw,
        orgId,
        role: ROLE_LABELS[body.role],
      });
      await writeAudit(tx, {
        actor: { kind: 'user_session', id: inviterId },
        action: 'invite.created',
        target: { kind: 'invite', id: tokenId },
        orgId,
        context: { role: body.role },
      });
    });
    results.push({
      email,
      status: 'invited',
      invite: {
        id: tokenId,
        organizationId: orgId,
        email,
        role: body.role,
        expiresAt: token.expiresAt.toISOString(),
        createdAt: createdAt.toISOString(),
      },
    });
  }
  return { results };
}

/** The public role an invite row stands for. */
function inviteRole(row: typeof emailTokenTable.$inferSelect): PublicRole {
  return row.invitedRole!;
}

/** Pending invites: not consumed and not expired. */
export async function listInvites(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
): Promise<Plain<InviteResponse>[]> {
  requireAction(principal, 'invite:list', { orgId });
  const rows = await db
    .select()
    .from(emailTokenTable)
    .where(
      and(
        eq(emailTokenTable.purpose, 'invite'),
        eq(emailTokenTable.orgId, orgId),
        isNull(emailTokenTable.consumedAt),
        gt(emailTokenTable.expiresAt, new Date()),
      ),
    )
    .orderBy(desc(emailTokenTable.createdAt));
  return rows.map((r) => ({
    id: r.id,
    organizationId: orgId,
    email: r.targetEmailNormalized!,
    role: inviteRole(r),
    expiresAt: r.expiresAt.toISOString(),
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function revokeInvite(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  tokenId: string,
): Promise<void> {
  requireAction(principal, 'invite:revoke', { orgId });
  const rows = await db
    .select()
    .from(emailTokenTable)
    .where(
      and(
        eq(emailTokenTable.id, tokenId),
        eq(emailTokenTable.purpose, 'invite'),
        eq(emailTokenTable.orgId!, orgId),
      ),
    )
    .limit(1);

  if (!rows[0]) throw notFound();

  await db.transaction(async (tx) => {
    await tx
      .update(emailTokenTable)
      .set({ consumedAt: new Date() })
      .where(eq(emailTokenTable.id, tokenId));
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'invite.revoked',
      target: { kind: 'invite', id: tokenId },
      orgId,
    });
  });
}

export async function resendInvite(
  db: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  tokenId: string,
): Promise<void> {
  requireAction(principal, 'invite:resend', { orgId });
  const rows = await db
    .select()
    .from(emailTokenTable)
    .where(
      and(
        eq(emailTokenTable.id, tokenId),
        eq(emailTokenTable.purpose, 'invite'),
        eq(emailTokenTable.orgId!, orgId),
      ),
    )
    .limit(1);

  const tokenRow = rows[0];
  if (!tokenRow || !isEmailTokenValid(tokenRow)) throw notFound();

  // Only the hash is stored, so the earlier link cannot be sent again: a new token replaces it
  // and the old link stops working.
  const token = generateEmailToken(INVITE_TOKEN_TTL_SECONDS);
  await db.transaction(async (tx) => {
    await tx
      .update(emailTokenTable)
      .set({ tokenHash: token.hash, expiresAt: token.expiresAt })
      .where(eq(emailTokenTable.id, tokenId));
    await enqueueEmail(tx, 'invite.created', {
      to: tokenRow.targetEmailNormalized!,
      token: token.raw,
      orgId,
      role: ROLE_LABELS[inviteRole(tokenRow)],
      resend: true,
    });
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'invite.resent',
      target: { kind: 'invite', id: tokenId },
      orgId,
    });
  });
}

export async function acceptInvite(
  db: Executor,
  principal: UserSessionPrincipal,
  body: AcceptInviteBody,
): Promise<{ orgId: string; role: PublicRole }> {
  requireAction(principal, 'invite:accept', {});
  const userId = principal.userId;
  const tokenHash = hashEmailToken(body.token);

  const rows = await db
    .select()
    .from(emailTokenTable)
    .where(and(eq(emailTokenTable.tokenHash, tokenHash), eq(emailTokenTable.purpose, 'invite')))
    .limit(1);

  const tokenRow = rows[0];
  if (!tokenRow || !isEmailTokenValid(tokenRow)) throw appError('token_invalid_or_expired');

  // Verify the accepting user's email matches the invite
  const userRows = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);

  const user = userRows[0];
  if (!user) throw notFound();

  if (user.emailNormalized !== tokenRow.targetEmailNormalized) {
    throw forbidden();
  }

  const orgId = tokenRow.orgId!;

  // Check not already a member
  const existing = await db
    .select()
    .from(organizationMemberTable)
    .where(
      and(
        eq(organizationMemberTable.organizationId, orgId),
        eq(organizationMemberTable.userId, userId),
      ),
    )
    .limit(1);

  if (existing.length > 0) throw conflict();

  // Consume token and add membership atomically
  const now = new Date();
  await db.transaction(async (tx) => {
    await tx
      .update(emailTokenTable)
      .set({ consumedAt: now })
      .where(eq(emailTokenTable.id, tokenRow.id));

    // The invite names the org, so the rows it creates are written as that org's.
    await setRlsContext(tx, { orgId, userId });
    await tx.insert(organizationMemberTable).values({
      organizationId: orgId,
      userId,
      role: tokenRow.invitedRole!,
    });
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: userId },
      action: 'member.added',
      target: { kind: 'user', id: userId },
      orgId,
      context: { role: tokenRow.invitedRole!, via: 'invite' },
    });
  });

  return { orgId, role: tokenRow.invitedRole! };
}
