import type { FastifyRequest } from 'fastify';
import type { Db } from '@boldcreate-integrations/db';
import { PermissionDeniedError, writeAudit } from '@boldcreate-integrations/domain';

/**
 * Error hook of the api server: a decision of `authorize` leaves a durable audit row before the
 * client hears about it. The row is written outside the request's transaction, which has rolled
 * back by now. When it cannot be written the hook throws and the server answers 503 instead of
 * dropping the record.
 */
export function createDenialAudit(db: Pick<Db, 'insert' | 'transaction'>) {
  return async (request: FastifyRequest, error: unknown): Promise<void> => {
    if (!(error instanceof PermissionDeniedError)) return;
    await writeAudit(db, {
      actor: { kind: 'user_session', id: request.userId ?? 'unknown' },
      action: 'permission.denied',
      target: { kind: 'action', id: error.action },
      orgId: error.orgId,
      result: 'denied',
      reason: error.reason,
      requestId: request.id,
      ip: request.ip,
      context: { action: error.action, method: request.method },
    });
  };
}
