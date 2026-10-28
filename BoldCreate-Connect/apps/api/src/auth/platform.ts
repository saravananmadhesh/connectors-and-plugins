/**
 * The Platform key branch of `authenticate`: a call made with an organization key (`Authorization:
 * Bearer plk_...`). The key acts with the role of the member who made it, read on every request, and
 * only on the routes that manage the organization. Whatever is wrong answers the same `401`.
 */
import type { FastifyRequest } from 'fastify';
import { AppError, type UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { withTenant, type Db } from '@boldcreate-integrations/db';
import {
  authenticatePlatformKey,
  loadOrgPrincipal,
  requireAction,
} from '@boldcreate-integrations/domain';
import { setKeyId, setTenant, setUserId } from '@boldcreate-integrations/observability';
import { keyRateWait, routeOf } from './rate-gate.js';

export async function authenticatePlatformCall(
  db: Db,
  request: FastifyRequest,
  orgId: string | undefined,
): Promise<UserSessionPrincipal> {
  const identity = await authenticatePlatformKey(db, request.headers.authorization, {
    ip: request.clientIp,
  });
  if (!identity) throw new AppError('unauthenticated');
  setKeyId(identity.keyId);

  const { limiter, requestsPerMinute } = request.server.apiGate;
  const wait = await keyRateWait(limiter, identity.keyRowId, requestsPerMinute);
  if (wait !== null) {
    request.retryAfter = wait;
    throw new AppError('rate_limited');
  }

  // A route nobody opened to Platform keys stays closed, whatever the key holds.
  const route = routeOf(request);
  if (!route?.principals.includes('platform')) throw new AppError('unauthenticated');
  // The key belongs to one organization; any other answers as if it did not exist.
  if (orgId !== identity.orgId) throw new AppError('not_found');

  const principal = await withTenant(db, { orgId: identity.orgId, userId: identity.userId }, (tx) =>
    loadOrgPrincipal(tx, {
      userId: identity.userId,
      sessionId: `platform:${identity.keyRowId}`,
      orgId: identity.orgId,
    }),
  );
  // A maker who left the organization or became a viewer no longer holds a working key: the same
  // check that lets a person make one (a write right in the organization) must still pass.
  try {
    requireAction(principal, 'api-key:create', { orgId: identity.orgId, scope: 'org' });
  } catch {
    throw new AppError('unauthenticated');
  }
  setTenant(identity.orgId);
  setUserId(identity.userId);
  return principal;
}
