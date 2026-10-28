import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { outboxTable } from '@boldcreate-integrations/db';
import * as schema from '@boldcreate-integrations/db';
import { createPostgresQueue } from './index.js';
import { runQueueContract } from '../contract/queue.contract.js';
import { FakeClock } from '../system/fake-clock.js';

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) throw new Error('Missing required test environment variable DATABASE_URL');

// The stack's worker also reads the shared outbox table, so these tests use their own copy of
// the table in a private schema.
runQueueContract('postgres', async () => {
  const name = `queue_contract_${randomUUID().replaceAll('-', '')}`;
  const admin = new pg.Pool({ connectionString: databaseUrl, max: 1 });
  await admin.query(`CREATE SCHEMA ${name}`);
  await admin.query(`CREATE TABLE ${name}.outbox (LIKE public.outbox INCLUDING ALL)`);
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 8,
    options: `-c search_path=${name}`,
  });
  const db = drizzle(pool, { schema });
  const clock = new FakeClock(new Date());
  return {
    port: createPostgresQueue(db, { clock }),
    clock,
    cleanup: async () => {
      await pool.end();
      await admin.query(`DROP SCHEMA ${name} CASCADE`);
      await admin.end();
    },
    makeDue: async (id) => {
      await db
        .update(outboxTable)
        .set({ nextAttemptAt: new Date(Date.now() - 1000) })
        .where(eq(outboxTable.id, id));
    },
    inspect: async (id) => {
      const [row] = await db.select().from(outboxTable).where(eq(outboxTable.id, id));
      return row
        ? {
            status: row.status,
            attempts: row.attempts,
            nextAttemptAt: row.nextAttemptAt,
            leaseOwner: row.leaseOwner,
            lastError: row.lastError,
            payload: row.payload,
          }
        : null;
    },
  };
});
