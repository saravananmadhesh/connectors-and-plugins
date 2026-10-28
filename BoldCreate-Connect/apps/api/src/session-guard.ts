/**
 * The one place a request becomes an authenticated session. The BFF sends the raw session token
 * in `X-Session-Token`; the domain hashes it, checks it against the configured lifetimes, slides
 * the idle expiry when due and revokes an expired session.
 */
import type { FastifyRequest } from 'fastify';
import { AppError } from '@boldcreate-integrations/contracts';
import type { Db } from '@boldcreate-integrations/db';
import { authenticateSession, type AuthPolicy } from '@boldcreate-integrations/domain';

declare module 'fastify' {
  interface FastifyInstance {
    authPolicy: AuthPolicy;
  }
  interface FastifyRequest {
    userId?: string;
    sessionId?: string;
    sessionTokenHash?: string;
  }
}

/** Resolves the session of the request or throws `unauthenticated`. */
export async function withSession(db: Db, request: FastifyRequest): Promise<void> {
  const raw = request.headers['x-session-token'];
  if (!raw || typeof raw !== 'string') {
    throw new AppError('unauthenticated');
  }

  const session = await authenticateSession(db, raw, request.server.authPolicy.session, new Date());
  if (!session) throw new AppError('unauthenticated');

  request.userId = session.userId;
  request.sessionId = session.sessionId;
  request.sessionTokenHash = session.tokenHash;
}
