import type { FastifyRequest } from 'fastify';
import { withTenant } from '@boldcreate-integrations/db';
import type { Db, Tx } from '@boldcreate-integrations/db';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { isViewer, loadPrincipal, offersPlatformKey } from '@boldcreate-integrations/domain';
import { withSession } from '../session-guard.js';
import { authenticatePlatformCall } from './platform.js';

/**
 * Authenticates the request and builds its principal for `orgId` (or for no organization).
 * One place, so no route reads roles or memberships on its own. A request with a session token is
 * a website request, whatever else it carries; one with only an organization key is a Platform call.
 */
export async function authenticate(
  db: Db,
  request: FastifyRequest,
  orgId?: string,
): Promise<UserSessionPrincipal> {
  if (!request.headers['x-session-token'] && offersPlatformKey(request.headers.authorization)) {
    return authenticatePlatformCall(db, request, orgId);
  }
  await withSession(db, request);
  return loadPrincipal(db, {
    userId: request.userId!,
    sessionId: request.sessionId!,
    orgId,
  });
}

/** Runs the domain call in a transaction that carries the principal's tenant and user. */
export function inTenant<T>(
  db: Db,
  principal: UserSessionPrincipal,
  fn: (tx: Tx) => Promise<T>,
): Promise<T> {
  return withTenant(
    db,
    { orgId: principal.orgId, userId: principal.userId, viewer: isViewer(principal) },
    fn,
  );
}
