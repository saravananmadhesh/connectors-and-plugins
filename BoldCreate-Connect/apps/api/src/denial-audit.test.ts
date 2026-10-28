import { describe, expect, it, vi } from 'vitest';
import type { FastifyRequest } from 'fastify';
import { AppError } from '@boldcreate-integrations/contracts';
import { PermissionDeniedError } from '@boldcreate-integrations/domain';
import { createDenialAudit } from './denial-audit.js';

type Row = Record<string, unknown>;

function fakeDb(failure?: Error) {
  const rows: Row[] = [];
  const insert = vi.fn<() => unknown>(() => ({
    values: async (row: Row) => {
      if (failure) throw failure;
      rows.push(row);
    },
  }));
  const db = {
    insert,
    transaction: async (fn: (tx: { insert: typeof insert }) => unknown) => fn({ insert }),
  };
  return { db: db as never, rows };
}

const request = (userId: string | null = 'user-1') =>
  ({ id: 'req-1', ip: '10.1.2.3', method: 'PATCH', userId: userId ?? undefined }) as FastifyRequest;

describe('denial audit', () => {
  it('writes a denied row with the action, reason, organization and request', async () => {
    const { db, rows } = fakeDb();
    const denied = new PermissionDeniedError('forbidden', 'org:update', 'forbidden', 'org-1');
    await createDenialAudit(db)(request(), denied);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      actorId: 'user-1',
      actorKind: 'user_session',
      action: 'permission.denied',
      targetKind: 'action',
      targetId: 'org:update',
      orgId: 'org-1',
      result: 'denied',
      requestId: 'req-1',
      ip: '10.1.2.3',
    });
    expect(JSON.parse(rows[0]?.['context'] as string)).toEqual({
      action: 'org:update',
      method: 'PATCH',
      reason: 'forbidden',
    });
  });

  it('records a not_found decision the same way', async () => {
    const { db, rows } = fakeDb();
    await createDenialAudit(db)(
      request(),
      new PermissionDeniedError('not_found', 'org:read', 'not_found', 'org-9'),
    );
    expect(rows[0]).toMatchObject({ orgId: 'org-9', result: 'denied' });
    expect(JSON.parse(rows[0]?.['context'] as string).reason).toBe('not_found');
  });

  it('names an unknown actor when no session was resolved', async () => {
    const { db, rows } = fakeDb();
    await createDenialAudit(db)(
      request(null),
      new PermissionDeniedError('not_found', 'org:read', 'not_found', undefined),
    );
    expect(rows[0]).toMatchObject({ actorId: 'unknown', orgId: null });
  });

  it('writes nothing for other errors', async () => {
    const { db, rows } = fakeDb();
    const hook = createDenialAudit(db);
    await hook(request(), new AppError('not_found'));
    await hook(request(), new AppError('forbidden'));
    await hook(request(), new Error('boom'));
    expect(rows).toEqual([]);
  });

  it('rejects when the row cannot be written, so the server fails closed', async () => {
    const { db } = fakeDb(new Error('audit store down'));
    await expect(
      createDenialAudit(db)(
        request(),
        new PermissionDeniedError('forbidden', 'org:update', 'forbidden', 'org-1'),
      ),
    ).rejects.toThrow('audit store down');
  });
});
