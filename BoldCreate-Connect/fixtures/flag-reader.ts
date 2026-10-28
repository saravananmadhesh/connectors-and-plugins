/**
 * A separate process that runs a flag store and a kill switch store against the same Postgres
 * and Redis as the test that starts it. The test writes commands on stdin and reads one line of
 * stdout per command:
 *
 *   flag <key>            -> flag <key> true|false
 *   kill <kind> <id>      -> kill <kind> <id> true|false
 *
 * `DISABLE_PUBSUB=1` skips the invalidation subscription, so only the cache lifetime bounds how
 * stale an answer can be.
 */
import { createInterface } from 'node:readline';
import { createRedisAdapters } from '../packages/adapters/src/redis/index.js';
import { systemClock } from '../packages/adapters/src/system/index.js';
import { createDb } from '../packages/db/src/index.js';
import type { KillSwitchTargetKind } from '../packages/db/src/index.js';
import { createCatalogStores } from '../packages/domain/src/index.js';
import type { FlagKey } from '../packages/limits/src/index.js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

const { db, pool } = createDb({ connectionString: requireEnv('DATABASE_URL'), max: 2 });
const redis = createRedisAdapters({ url: requireEnv('TEST_REDIS_URL'), commandTimeoutMs: 1000 });
const stores = createCatalogStores({
  db,
  cache: redis.cache,
  clock: systemClock,
  ttlSeconds: Number(process.env['FLAG_CACHE_TTL_SECONDS'] ?? '5'),
});

const stopInvalidation =
  process.env['DISABLE_PUBSUB'] === '1' ? async () => undefined : await stores.startInvalidation();

async function answer(line: string): Promise<string> {
  const [command, first, second] = line.trim().split(/\s+/);
  if (command === 'flag' && first) {
    return `flag ${first} ${await stores.flags.isEnabled(first as FlagKey)}`;
  }
  if (command === 'kill' && first && second) {
    const killed = await stores.killSwitches.isKilled(first as KillSwitchTargetKind, second);
    return `kill ${first} ${second} ${killed}`;
  }
  return `error unknown command`;
}

const input = createInterface({ input: process.stdin });
input.on('line', (line) => {
  answer(line)
    .then((reply) => process.stdout.write(`${reply}\n`))
    .catch(() => process.stdout.write('error failed\n'));
});
input.on('close', () => {
  void (async () => {
    await stopInvalidation();
    await redis.close();
    await pool.end();
    process.exit(0);
  })();
});

process.stdout.write('ready\n');
