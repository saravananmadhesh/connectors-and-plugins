import { describe, expect, it, vi } from 'vitest';
import { auditLogTable } from '@boldcreate-integrations/db';
import { AUDIT_CONTEXT_MAX_BYTES, writeAudit, type AuditWriter } from './write-audit.js';

type Row = typeof auditLogTable.$inferInsert;

function recorder(options: { failWith?: unknown } = {}) {
  const rows: Row[] = [];
  const stored = new Set<string>();
  let savepoints = 0;
  const inner = {
    insert: vi.fn<(table: unknown) => unknown>((table) => {
      expect(table).toBe(auditLogTable);
      return {
        values: async (row: Row) => {
          if (options.failWith) throw options.failWith;
          // The unique constraint on the event id and time rejects a repeat.
          const key = `${row.eventId}|${row.createdAt?.toISOString() ?? 'now'}`;
          if (row.createdAt && stored.has(key))
            throw Object.assign(new Error('duplicate'), { code: '23505' });
          stored.add(key);
          rows.push(row);
        },
      };
    }),
  };
  const writer = {
    insert: inner.insert,
    transaction: async (fn: (tx: typeof inner) => Promise<unknown>) => {
      savepoints += 1;
      return fn(inner);
    },
  } as unknown as AuditWriter;
  return { writer, rows, savepoints: () => savepoints };
}

describe('writeAudit', () => {
  it('writes the actor, action, target, organization and result', async () => {
    const { writer, rows } = recorder();
    await writeAudit(writer, {
      actor: { kind: 'user_session', id: 'user-1' },
      action: 'org.created',
      target: { kind: 'organization', id: 'org-1' },
      orgId: 'org-1',
      requestId: 'req-1',
      ip: '10.0.0.1',
      context: { slug: 'alpha' },
    });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      actorId: 'user-1',
      actorKind: 'user_session',
      action: 'org.created',
      targetKind: 'organization',
      targetId: 'org-1',
      orgId: 'org-1',
      result: 'success',
      requestId: 'req-1',
      ip: '10.0.0.1',
      context: JSON.stringify({ slug: 'alpha' }),
    });
    expect(rows[0]?.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(rows[0]?.eventId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('records a denial with its reason inside the context', async () => {
    const { writer, rows } = recorder();
    await writeAudit(writer, {
      actor: { kind: 'user_session', id: 'user-1' },
      action: 'permission.denied',
      result: 'denied',
      reason: 'forbidden',
      context: { action: 'org:update' },
    });
    expect(rows[0]?.result).toBe('denied');
    expect(JSON.parse(rows[0]?.context ?? '{}')).toEqual({
      action: 'org:update',
      reason: 'forbidden',
    });
    expect(rows[0]?.targetKind).toBeNull();
    expect(rows[0]?.orgId).toBeNull();
  });

  it('stores no context at all when there is none', async () => {
    const { writer, rows } = recorder();
    await writeAudit(writer, { actor: { kind: 'system', id: 'job' }, action: 'org.created' });
    expect(rows[0]?.context).toBeNull();
  });

  it('redacts secrets in the context', async () => {
    const { writer, rows } = recorder();
    await writeAudit(writer, {
      actor: { kind: 'user_session', id: 'user-1' },
      action: 'api_key.created',
      context: { prefix: 'abc', password: 'hunter2', nested: { token: 'secret-value' } },
    });
    const stored = rows[0]?.context ?? '';
    expect(stored).not.toContain('hunter2');
    expect(stored).not.toContain('secret-value');
    expect(JSON.parse(stored).prefix).toBe('abc');
  });

  it('replaces a context over 2 KB with a marker instead of storing it', async () => {
    const { writer, rows } = recorder();
    await writeAudit(writer, {
      actor: { kind: 'user_session', id: 'user-1' },
      action: 'org.updated',
      reason: 'because',
      context: { blob: 'x'.repeat(AUDIT_CONTEXT_MAX_BYTES + 1) },
    });
    const stored = rows[0]?.context ?? '';
    expect(Buffer.byteLength(stored, 'utf8')).toBeLessThanOrEqual(AUDIT_CONTEXT_MAX_BYTES);
    expect(JSON.parse(stored)).toEqual({ truncated: true, reason: 'because' });
  });

  it('keeps a context of exactly 2 KB', async () => {
    const { writer, rows } = recorder();
    const overhead = JSON.stringify({ blob: '' }).length;
    await writeAudit(writer, {
      actor: { kind: 'user_session', id: 'user-1' },
      action: 'org.updated',
      context: { blob: 'x'.repeat(AUDIT_CONTEXT_MAX_BYTES - overhead) },
    });
    expect(Buffer.byteLength(rows[0]?.context ?? '', 'utf8')).toBe(AUDIT_CONTEXT_MAX_BYTES);
  });

  it('inserts once for a retried event: same id and time, the repeat is ignored', async () => {
    const { writer, rows, savepoints } = recorder();
    const occurredAt = new Date('2026-10-10T10:00:00Z');
    const entry = {
      actor: { kind: 'api_key' as const, id: 'key-1' },
      action: 'api_key.revoked' as const,
      eventId: '11111111-1111-4111-8111-111111111111',
      occurredAt,
    };
    await writeAudit(writer, entry);
    await writeAudit(writer, entry);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ eventId: entry.eventId, createdAt: occurredAt });
    expect(savepoints()).toBe(2);
  });

  it('lets any other failure through', async () => {
    const { writer } = recorder({ failWith: new Error('connection lost') });
    await expect(
      writeAudit(writer, { actor: { kind: 'system', id: 'job' }, action: 'org.created' }),
    ).rejects.toThrow('connection lost');
  });
});
