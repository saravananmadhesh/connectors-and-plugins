/**
 * The load scenario of a host product: its server registers the project's users with one project
 * key, then a share of those users are active for a day, each getting a session and reading it
 * back. Every call goes through the public gateway, as a host's server would make it.
 */
import { randomBytes } from 'node:crypto';
import { Recorder, type CallSummary } from './stats.js';

export interface ScenarioSize {
  /** Users the host registers in the project. */
  users: number;
  /** Users who are active after the data exists. */
  activeUsers: number;
  /** Reads each active user makes after getting a session. */
  readsPerUser: number;
  concurrency: number;
}

export const SMOKE_SIZE: ScenarioSize = {
  users: 12,
  activeUsers: 6,
  readsPerUser: 3,
  concurrency: 4,
};

export const FULL_SIZE: ScenarioSize = {
  users: 5_000,
  activeUsers: 1_000,
  readsPerUser: 5,
  concurrency: 16,
};

export interface ScenarioInput {
  /** The gateway, without a trailing slash. */
  gatewayUrl: string;
  projectKey: string;
  size: ScenarioSize;
  log: (line: string) => void;
}

export interface ScenarioResult {
  size: ScenarioSize;
  seconds: { seed: number; active: number };
  calls: CallSummary[];
  unexpected: Record<string, number>;
  failed: number;
}

const MAX_THROTTLE_RETRIES = 40;
const SESSION_SECONDS = 3_600;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

interface Reply {
  status: number;
  body: unknown;
}

/** Runs `work` for every item with at most `limit` in flight; stops taking new items on a throw. */
async function pool<T>(items: readonly T[], limit: number, work: (item: T) => Promise<void>) {
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++]!;
      await work(item);
    }
  });
  await Promise.all(runners);
}

export async function runScenario(input: ScenarioInput): Promise<ScenarioResult> {
  const { gatewayUrl, projectKey, size, log } = input;
  const recorder = new Recorder();
  const runId = randomBytes(4).toString('hex');
  /** Answers that were not the expected one, by call and status. */
  const unexpected: Record<string, number> = {};

  /** One call. A `429` waits as long as the answer says and repeats, because a host does the same. */
  async function call(
    label: string,
    method: string,
    path: string,
    expected: number[],
    options: { body?: unknown } = {},
  ): Promise<Reply> {
    for (let attempt = 0; ; attempt++) {
      const started = performance.now();
      const res = await fetch(`${gatewayUrl}${path}`, {
        method,
        headers: {
          authorization: `Bearer ${projectKey}`,
          ...(options.body === undefined ? {} : { 'content-type': 'application/json' }),
          ...(method === 'GET' ? {} : { 'idempotency-key': crypto.randomUUID() }),
        },
        ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
      });
      const text = await res.text();
      if (res.status === 429 && attempt < MAX_THROTTLE_RETRIES) {
        recorder.throttle(label);
        const wait = Number(res.headers.get('retry-after') ?? '1');
        await sleep((Number.isFinite(wait) && wait > 0 ? wait : 1) * 1000);
        continue;
      }
      const ok = expected.includes(res.status);
      recorder.record(label, performance.now() - started, ok);
      if (!ok) {
        const key = `${label} -> ${res.status}`;
        unexpected[key] = (unexpected[key] ?? 0) + 1;
        if (unexpected[key] === 1) log(`unexpected ${key}: ${text.slice(0, 200)}`);
      }
      let body: unknown = null;
      try {
        body = text ? JSON.parse(text) : null;
      } catch {
        body = null;
      }
      return { status: res.status, body };
    }
  }

  const userIds: string[] = [];
  const indexes = Array.from({ length: size.users }, (_, i) => i);

  log(`registering ${size.users} users`);
  const seedStart = performance.now();
  await pool(indexes, size.concurrency, async (i) => {
    const userId = `user-${runId}-${i}`;
    const put = await call('put user', 'PUT', '/v1/project/users', [200, 201], {
      body: { userId, displayName: `Load User ${i}` },
    });
    if (put.status === 200 || put.status === 201) userIds.push(userId);
  });
  const seedSeconds = (performance.now() - seedStart) / 1000;
  log(`registered ${userIds.length} users in ${seedSeconds.toFixed(1)} s`);

  const active = userIds.slice(0, size.activeUsers);
  log(`${active.length} active users`);
  const activeStart = performance.now();
  await pool(active, size.concurrency, async (userId) => {
    await call('create session', 'POST', '/v1/project/sessions', [201], {
      body: { userId, expiresInSeconds: SESSION_SECONDS },
    });
    for (let r = 0; r < size.readsPerUser; r++) {
      if (r % 2 === 0) await call('list sessions', 'GET', '/v1/project/sessions', [200]);
      else await call('read project', 'GET', '/v1/project/me', [200]);
    }
  });
  const activeSeconds = (performance.now() - activeStart) / 1000;
  log(`active phase took ${activeSeconds.toFixed(1)} s`);

  const missingUsers = size.users - userIds.length;
  return {
    size,
    seconds: { seed: seedSeconds, active: activeSeconds },
    calls: recorder.summary(),
    unexpected,
    failed: recorder.totalFailed() + missingUsers,
  };
}
