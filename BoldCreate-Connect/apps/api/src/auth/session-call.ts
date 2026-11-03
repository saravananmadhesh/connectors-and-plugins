/**
 * Authenticates a call made with a session token: a key of the user scope that names the project
 * it was minted in. The action is checked against the key's permissions, the call is counted
 * against the project's rate limit, and the caller is the project and the session's user.
 */
import type { FastifyRequest } from 'fastify';
import type { Db } from '@boldcreate-integrations/db';
import { AppError, type Action, type ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import {
  authenticateKey,
  bearerKey,
  keyResource,
  requireAction,
  type ProjectCaller,
} from '@boldcreate-integrations/domain';
import { countProjectCall } from './project.js';

export interface SessionIdentity {
  principal: ApiKeyPrincipal;
  caller: ProjectCaller;
  /** The platform id of the session's user. */
  userId: string;
}

export async function authenticateSessionCall(
  db: Db,
  req: FastifyRequest,
  action: Action,
): Promise<SessionIdentity> {
  const identity = await authenticateKey(db, bearerKey(req.headers.authorization), {
    ip: req.clientIp,
  });
  if (!identity) throw new AppError('unauthenticated');
  const principal = identity.principal;
  requireAction(principal, action, keyResource(principal));
  if (principal.projectId === undefined || principal.userId === undefined) {
    throw new AppError('session_required');
  }
  await countProjectCall(req, principal.projectId, principal.orgId);
  return {
    principal,
    userId: principal.userId,
    caller: {
      projectId: principal.projectId,
      organizationId: principal.orgId,
      actor: { kind: 'api_key', id: identity.keyRowId },
    },
  };
}
