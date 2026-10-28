/**
 * Shared by every reader of the audit log: a keyset cursor over (time, id) that keeps microseconds,
 * the escape for a prefix match, and the parse of the stored context.
 */
import { and, eq, lt, or, sql, type SQL } from 'drizzle-orm';
import { auditLogTable } from '@boldcreate-integrations/db';
import { validationFailed } from '../errors.js';

/** Microseconds survive the round trip, so rows created in the same millisecond keep their order. */
export const exactAuditTime = sql<string>`to_char(${auditLogTable.createdAt} at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')`;

interface Cursor {
  at: string;
  id: string;
}

export const encodeAuditCursor = (cursor: Cursor): string =>
  Buffer.from(JSON.stringify(cursor)).toString('base64url');

export function decodeAuditCursor(text: string): Cursor {
  try {
    const raw = JSON.parse(Buffer.from(text, 'base64url').toString('utf8')) as Partial<Cursor>;
    if (
      typeof raw.at === 'string' &&
      typeof raw.id === 'string' &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(raw.at) &&
      /^[0-9a-f-]{36}$/.test(raw.id)
    ) {
      return { at: raw.at, id: raw.id };
    }
  } catch {
    // Falls through to the error below.
  }
  throw validationFailed([{ field: 'cursor', message: 'This page marker is not valid.' }]);
}

/** The condition for the rows after the cursor in newest-first order. */
export function afterAuditCursor(text: string): SQL | undefined {
  const cursor = decodeAuditCursor(text);
  const at = sql`${cursor.at}::timestamptz`;
  return or(
    lt(auditLogTable.createdAt, at),
    and(eq(auditLogTable.createdAt, at), lt(auditLogTable.id, cursor.id)),
  );
}

export const escapeLike = (text: string): string => text.replace(/[\\%_]/g, (char) => `\\${char}`);

export function parseAuditContext(text: string | null): Record<string, unknown> | null {
  if (text === null) return null;
  try {
    const value: unknown = JSON.parse(text);
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}
