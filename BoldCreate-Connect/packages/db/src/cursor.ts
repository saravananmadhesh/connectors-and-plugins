/**
 * Opaque cursor encoding for (created_at, id) pagination.
 * The cursor is base64url-encoded JSON and is bound to the query/scope
 * at the application layer — it is not authority.
 */

interface CursorPayload {
  createdAt: string; // ISO-8601 UTC
  id: string;
}

export function encodeCursor(createdAt: Date, id: string): string {
  const payload: CursorPayload = { createdAt: createdAt.toISOString(), id };
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function decodeCursor(cursor: string): CursorPayload {
  let raw: unknown;
  try {
    raw = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
  } catch {
    throw new Error('invalid_cursor');
  }
  if (
    typeof raw !== 'object' ||
    raw === null ||
    typeof (raw as Record<string, unknown>)['createdAt'] !== 'string' ||
    typeof (raw as Record<string, unknown>)['id'] !== 'string'
  ) {
    throw new Error('invalid_cursor');
  }
  return raw as CursorPayload;
}
