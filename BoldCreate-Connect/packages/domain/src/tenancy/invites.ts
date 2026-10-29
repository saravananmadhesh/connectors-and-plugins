import { randomUUID } from 'node:crypto';
import { eq, and, isNull, isNotNull, desc } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  organizationMemberTable,
  organizationTable,
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
  type PreviewInviteBody,
  type InvitePreviewResponse,
  type InviteResponse,
  type Plain,
} from '@boldcreate-integrations/contracts';
import { requireAction } from '../permissions/authorize.js';
import { writeAudit } from '../audit/write-audit.js';
import { appError, conflict, forbidden, notFound } from '../errors.js';
import { enqueueEmail } from './shared.js';

/** Who is inviting and to what, as the invitation mail names them. */
async function mailContext(db: Executor, inviterId: string, orgId: string) {
  const [[inviter], [org]] = await Promise.all([
    db
      .select({ name: userTable.displayName, email: userTable.email })
      .from(userTable)
      .where(eq(userTable.id, inviterId))
      .limit(1),
    db
      .select({ name: organizationTable.name })
      .from(organizationTable)
      .where(eq(organizationTable.id, orgId))
      .limit(1),
  ]);
  return {
    ...(org ? { orgName: org.name } : {}),
    ...(inviter ? { inviterName: inviter.name, inviterEmail: inviter.email } : {}),
  };
}

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
  const mail = await mailContext(db, inviterId, orgId);

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
      // One open invite per address and org: a new one replaces any earlier link.
      await tx
        .update(emailTokenTable)
        .set({ consumedAt: createdAt })
        .where(
          and(
            eq(emailTokenTable.purpose, 'invite'),
            eq(emailTokenTable.orgId, orgId),
            eq(emailTokenTable.targetEmailNormalized, email),
            isNull(emailTokenTable.consumedAt),
          ),
        );
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
        ...mail,
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

/**
 * Open invites: not accepted and not revoked. Those past `expiresAt` are included so the sender
 * can see them and send a fresh link.
 */
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

  // An accepted or already revoked invite has nothing left to revoke.
  if (!rows[0] || rows[0].consumedAt !== null) throw notFound();

  await db.transaction(async (tx) => {
    await tx
      .update(emailTokenTable)
      .set({ consumedAt: new Date() })
      .where(and(eq(emailTokenTable.id, tokenId), isNull(emailTokenTable.consumedAt)));
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
  // The sender may resend an invite that has run out; only an accepted or revoked one is closed.
  if (!tokenRow || tokenRow.consumedAt !== null) throw notFound();

  // Only the hash is stored, so the earlier link cannot be sent again: a new token replaces it
  // and the old link stops working.
  const token = generateEmailToken(INVITE_TOKEN_TTL_SECONDS);
  const mail = await mailContext(db, principal.userId, orgId);
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
      ...mail,
    });
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'invite.resent',
      target: { kind: 'invite', id: tokenId },
      orgId,
    });
  });
}

/**
 * Says what an invite link stands for, for someone who is not signed in yet. Anyone holding the
 * link may ask; the token is the only credential, so a link that is gone and one that never
 * existed get the same answer.
 */
export async function previewInvite(
  db: Executor,
  body: PreviewInviteBody,
): Promise<Plain<InvitePreviewResponse>> {
  const unavailable = {
    state: 'unavailable',
    email: null,
    organizationName: null,
    role: null,
    registered: null,
  } as const;

  const [row] = await db
    .select()
    .from(emailTokenTable)
    .where(
      and(
        eq(emailTokenTable.tokenHash, hashEmailToken(body.token)),
        eq(emailTokenTable.purpose, 'invite'),
      ),
    )
    .limit(1);
  if (!row || row.consumedAt !== null || !row.orgId) return unavailable;
  if (!isEmailTokenValid(row)) return { ...unavailable, state: 'expired' };

  const orgId = row.orgId;
  const organizationName = await db.transaction(async (tx) => {
    // The organization row is visible only inside its own tenant.
    await setRlsContext(tx, { orgId });
    const [org] = await tx
      .select({ name: organizationTable.name })
      .from(organizationTable)
      .where(eq(organizationTable.id, orgId))
      .limit(1);
    return org?.name ?? null;
  });
  if (organizationName === null) return unavailable;

  // An address someone registered but never verified counts as free: the invite can claim it.
  const [registered] = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(
      and(
        eq(userTable.emailNormalized, row.targetEmailNormalized!),
        eq(userTable.kind, 'human'),
        isNotNull(userTable.emailVerifiedAt),
      ),
    )
    .limit(1);

  return {
    state: 'valid',
    email: row.targetEmailNormalized!,
    organizationName,
    role: inviteRole(row),
    registered: registered !== undefined,
  };
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
    // Only one of two simultaneous accepts gets to consume the invite.
    const consumed = await tx
      .update(emailTokenTable)
      .set({ consumedAt: now })
      .where(and(eq(emailTokenTable.id, tokenRow.id), isNull(emailTokenTable.consumedAt)))
      .returning({ id: emailTokenTable.id });
    if (consumed.length === 0) throw appError('token_invalid_or_expired');

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
