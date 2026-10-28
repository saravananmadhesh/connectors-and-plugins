/**
 * The Postgres idempotency store against the shared contract suite.
 *
 * Run: pnpm test -- --only=integration
 */
import { eq } from 'drizzle-orm';
import {
  createDb,
  createIdempotencyStore,
  idempotencyRecordTable,
} from '../../packages/db/src/index.js';
import { runIdempotencyStoreContract } from '../../packages/http-server/src/idempotency-store.contract.js';
import { databaseUrl } from './test-env.js';

runIdempotencyStoreContract('postgres', async () => {
  const { db, pool } = createDb({ connectionString: databaseUrl, max: 12 });
  return {
    store: createIdempotencyStore(db),
    expire: async (scope) => {
      await db
        .update(idempotencyRecordTable)
        .set({ expiresAt: new Date(Date.now() - 60_000) })
        .where(eq(idempotencyRecordTable.idemKey, scope.idemKey));
    },
    cleanup: async () => {
      await pool.end();
    },
  };
});
