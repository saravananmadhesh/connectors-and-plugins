/** Which errors raise an alert, against real Postgres: new, spiking, resolved and cooling down. */
import { randomUUID } from 'node:crypto';
import { afterAll, describe, expect, it } from 'vitest';
import {
  createDb,
  errorEventTable,
  errorGroupTable,
  findAlertableErrors,
  recordErrorAlertsSent,
  type ErrorAlertPolicy,
  type ErrorGroupStatus,
} from '../../packages/db/src/index.js';
import { databaseUrl } from './test-env.js';

const { db, pool } = createDb({ connectionString: databaseUrl, max: 4 });
const service = `alerts-${randomUUID()}`;
const now = new Date('2026-06-30T12:00:00Z');
const secondsAgo = (seconds: number) => new Date(now.getTime() - seconds * 1000);

const policy: ErrorAlertPolicy = {
  newGroupWindowSeconds: 600,
  spikeWindowSeconds: 600,
  spikeOccurrences: 3,
  cooldownSeconds: 3600,
  maxGroups: 1000,
};

async function group(options: {
  firstSeenSecondsAgo: number;
  occurrencesSecondsAgo?: number[];
  status?: ErrorGroupStatus;
}) {
  const id = randomUUID();
  await db.insert(errorGroupTable).values({
    id,
    fingerprint: `${service}-${id}`,
    service,
    area: 'kms',
    title: `Error: ${id}`,
    status: options.status ?? 'unresolved',
    count: 40,
    firstSeen: secondsAgo(options.firstSeenSecondsAgo),
    lastSeen: secondsAgo(
      Math.min(options.firstSeenSecondsAgo, ...(options.occurrencesSecondsAgo ?? [])),
    ),
  });
  for (const age of options.occurrencesSecondsAgo ?? []) {
    await db
      .insert(errorEventTable)
      .values({ id: randomUUID(), groupId: id, occurredAt: secondsAgo(age), environment: 'test' });
  }
  return id;
}

const mine = async (at: Date = now) =>
  (await findAlertableErrors(db, policy, at)).filter((candidate) => candidate.service === service);

afterAll(async () => {
  await pool.end();
});

describe('error alerts', () => {
  it('reports new groups and spiking groups, and skips quiet, resolved and old ones', async () => {
    const fresh = await group({ firstSeenSecondsAgo: 60 });
    const spiking = await group({
      firstSeenSecondsAgo: 86_400,
      occurrencesSecondsAgo: [10, 20, 30],
    });
    const rising = await group({ firstSeenSecondsAgo: 86_400, occurrencesSecondsAgo: [10, 20] });
    const stale = await group({
      firstSeenSecondsAgo: 86_400,
      occurrencesSecondsAgo: [5_000, 5_100, 5_200],
    });
    const resolved = await group({ firstSeenSecondsAgo: 60, status: 'resolved' });

    const found = await mine();
    const byId = new Map(found.map((candidate) => [candidate.groupId, candidate]));

    expect(byId.get(fresh)?.reason).toBe('new');
    expect(byId.get(spiking)).toMatchObject({
      reason: 'spike',
      recentOccurrences: 3,
      service,
      area: 'kms',
      count: 40,
    });
    expect(byId.has(rising)).toBe(false);
    expect(byId.has(stale)).toBe(false);
    expect(byId.has(resolved)).toBe(false);
    expect(byId.get(fresh)?.firstSeen.getTime()).toBe(secondsAgo(60).getTime());
  });

  it('stays quiet about a group during the cooldown and speaks again after it', async () => {
    const id = await group({ firstSeenSecondsAgo: 30 });
    const [candidate] = (await mine()).filter((item) => item.groupId === id);
    expect(candidate).toBeDefined();

    await recordErrorAlertsSent(db, [candidate!], 2, now);
    expect((await mine()).some((item) => item.groupId === id)).toBe(false);

    // Still new when the cooldown ends, so it is reported again.
    const later = new Date(now.getTime() + (policy.cooldownSeconds + 1) * 1000);
    const widened = await findAlertableErrors(
      db,
      { ...policy, newGroupWindowSeconds: 7200 },
      later,
    );
    expect(widened.some((item) => item.groupId === id)).toBe(true);
  });

  it('reports at most the configured number of groups, most recently seen first', async () => {
    await group({ firstSeenSecondsAgo: 100 });
    await group({ firstSeenSecondsAgo: 20 });
    const limited = await findAlertableErrors(db, { ...policy, maxGroups: 1 }, now);
    expect(limited).toHaveLength(1);
  });

  it('records nothing for an empty list', async () => {
    await expect(recordErrorAlertsSent(db, [], 1, now)).resolves.toBeUndefined();
  });
});
