import { and, eq, isNull } from 'drizzle-orm';
import { sessionTable, userTable, type Executor } from '@boldcreate-integrations/db';
import { evaluateSession, hashSessionToken, type SessionPolicy } from './session.js';

export interface AuthenticatedSession {
  userId: string;
  sessionId: string;
  tokenHash: string;
}

/**
 * Resolves a raw session token. Returns null for an unknown, revoked or expired session, or one
 * of a user who is not a person; an expired one is revoked on the spot. An active session slides
 * its idle expiry when the policy says so.
 */
export async function authenticateSession(
  db: Executor,
  rawToken: string,
  policy: SessionPolicy,
  now: Date,
): Promise<AuthenticatedSession | null> {
  const tokenHash = hashSessionToken(rawToken);
  const [found] = await db
    .select({ session: sessionTable, kind: userTable.kind })
    .from(sessionTable)
    .innerJoin(userTable, eq(userTable.id, sessionTable.userId))
    .where(eq(sessionTable.tokenHash, tokenHash))
    .limit(1);
  if (!found) return null;
  // Only a person signs in. A host product's user or an app's service principal never holds a
  // session, so one that somehow does is refused rather than trusted.
  if (found.kind !== 'human') return null;
  const { session } = found;

  const decision = evaluateSession(session, now, policy);
  if (decision.state === 'revoked') return null;
  if (decision.state === 'expired') {
    await db
      .update(sessionTable)
      .set({ revokedAt: now })
      .where(and(eq(sessionTable.id, session.id), isNull(sessionTable.revokedAt)));
    return null;
  }
  if (decision.slideTo) {
    await db
      .update(sessionTable)
      .set({ idleExpiresAt: decision.slideTo })
      .where(and(eq(sessionTable.id, session.id), isNull(sessionTable.revokedAt)));
  }
  return { userId: session.userId, sessionId: session.id, tokenHash };
}
