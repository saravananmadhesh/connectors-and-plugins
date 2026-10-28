import { and, eq, inArray, lte, sql } from 'drizzle-orm';
import type { Db, Executor } from './client.js';
import { withMaintenance } from './maintenance.js';
import { idempotencyRecordTable, projectIdempotencyTable } from './schema/index.js';

export interface IdempotencyScope {
  principalKey: string;
  method: string;
  routeTemplate: string;
  idemKey: string;
}

export interface IdempotencyRecord {
  requestHash: string;
  state: 'in_progress' | 'completed';
  responseStatus: number | null;
  responseBody: unknown;
  responseHeaders: Record<string, string> | null;
  secretResponse: boolean;
}

export type IdempotencyClaim = { claimed: true } | { claimed: false; record: IdempotencyRecord };

export interface IdempotencyStore {
  /** Atomically claims the scope; when it is taken, returns the record that holds it. */
  begin(
    scope: IdempotencyScope,
    requestHash: string,
    ttlSeconds: number,
  ): Promise<IdempotencyClaim>;
  get(scope: IdempotencyScope): Promise<IdempotencyRecord | null>;
  complete(
    scope: IdempotencyScope,
    status: number,
    body: unknown,
    headers: Record<string, string> | null,
    secretResponse: boolean,
  ): Promise<void>;
  /** Deletes the claim so the client can retry. */
  abandon(scope: IdempotencyScope): Promise<void>;
  /** Deletes up to `limit` expired rows and returns how many went. */
  purgeExpired(limit: number): Promise<number>;
}

const t = idempotencyRecordTable;

const scopeWhere = (scope: IdempotencyScope) =>
  and(
    eq(t.principalKey, scope.principalKey),
    eq(t.method, scope.method),
    eq(t.routeTemplate, scope.routeTemplate),
    eq(t.idemKey, scope.idemKey),
  );

function toRecord(row: typeof t.$inferSelect): IdempotencyRecord {
  return {
    requestHash: row.requestHash,
    state: row.state,
    responseStatus: row.responseStatus,
    responseBody: row.responseBody,
    responseHeaders: row.responseHeaders,
    secretResponse: row.secretResponse,
  };
}

/** The Postgres-backed store. An expired row no longer holds its key: a new claim replaces it. */
export function createIdempotencyStore(db: Executor): IdempotencyStore {
  const get = async (scope: IdempotencyScope): Promise<IdempotencyRecord | null> => {
    const [row] = await db.select().from(t).where(scopeWhere(scope)).limit(1);
    return row ? toRecord(row) : null;
  };

  const store: IdempotencyStore = {
    async begin(scope, requestHash, ttlSeconds) {
      const claimed = await db
        .insert(t)
        .values({
          ...scope,
          requestHash,
          expiresAt: sql`now() + make_interval(secs => ${ttlSeconds})`,
        })
        .onConflictDoUpdate({
          target: [t.principalKey, t.method, t.routeTemplate, t.idemKey],
          set: {
            requestHash,
            state: 'in_progress',
            responseStatus: null,
            responseBody: null,
            responseHeaders: null,
            secretResponse: false,
            createdAt: sql`now()`,
            expiresAt: sql`now() + make_interval(secs => ${ttlSeconds})`,
          },
          setWhere: lte(t.expiresAt, sql`now()`),
        })
        .returning({ id: t.id });
      if (claimed.length > 0) return { claimed: true };
      const record = await get(scope);
      // The holder abandoned between the failed claim and the read: claim again.
      if (!record) return store.begin(scope, requestHash, ttlSeconds);
      return { claimed: false, record };
    },
    get,
    async complete(scope, status, body, headers, secretResponse) {
      await db
        .update(t)
        .set({
          state: 'completed',
          responseStatus: status,
          responseBody: secretResponse ? null : body,
          responseHeaders: headers,
          secretResponse,
        })
        .where(scopeWhere(scope));
    },
    async abandon(scope) {
      await db.delete(t).where(scopeWhere(scope));
    },
    async purgeExpired(limit) {
      const due = db
        .select({ id: t.id })
        .from(t)
        .where(lte(t.expiresAt, sql`now()`))
        .limit(limit);
      const removed = await db.delete(t).where(inArray(t.id, due)).returning({ id: t.id });
      return removed.length;
    },
  };
  return store;
}

/** Deletes up to `limit` expired project idempotency rows, across projects, and returns how many went. */
export async function purgeExpiredProjectIdempotency(db: Db, limit: number): Promise<number> {
  return withMaintenance(db, 'purge', async (tx) => {
    const p = projectIdempotencyTable;
    const due = tx
      .select({ projectId: p.projectId, route: p.route, key: p.key })
      .from(p)
      .where(lte(p.expiresAt, sql`now()`))
      .limit(limit);
    const removed = await tx
      .delete(p)
      .where(sql`(${p.projectId}, ${p.route}, ${p.key}) IN (${due})`)
      .returning({ key: p.key });
    return removed.length;
  });
}
