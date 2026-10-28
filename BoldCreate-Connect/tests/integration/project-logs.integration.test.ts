/**
 * Logs and usage of one project: a tool call by a session shows with its user and project, only a
 * few keys of the event are returned, another project's rows never appear, a user's last sync and
 * the connections still to set up show on the user list, and usage counts per day.
 *
 * Run: pnpm test "--only=integration"
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createDb } from '../../packages/db/src/index.js';
import { authenticateKey } from '../../packages/domain/src/delivery/key-auth.js';
import { auditToolCall, type DispatchDeps } from '../../apps/gateway/src/mcp/dispatch.js';
import { apiUrl, roleConnectionString } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { workloadHeaders } from './signed-in-user.js';

interface Host {
  projectId: string;
  key: string;
}
interface Session {
  token: string;
  userId: string;
}
interface Log {
  id: string;
  action: string;
  result: string;
  user: { id: string; userId: string | null } | null;
  target: { kind: string; id: string } | null;
  tool?: string;
  outcome?: string;
  durationMs?: number;
  appliedCount?: number;
}
interface LogPage {
  items: Log[];
  nextCursor: string | null;
}
interface Usage {
  days: { date: string; activeUsers: number; toolCalls: number; errors: number }[];
  topUsers: { id: string; userId: string | null; toolCalls: number }[];
}

const DAY = 86_400_000;
const SCOPES = ['sessions:read', 'sessions:write', 'observability:read'];

let fx: OrgFixture;
const gateway = createDb({ connectionString: roleConnectionString('gateway'), max: 2 });
const deps = {
  db: gateway.db,
  logger: { warn: () => undefined },
} as unknown as DispatchDeps;
const owner = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;

function bearer(token: string, method: string, path: string, body?: unknown) {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      authorization: `Bearer ${token}`,
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

async function createHost(scopes = SCOPES): Promise<Host> {
  const created = await callApi('POST', base(), owner(), {
    name: `Logs ${randomUUID().slice(0, 8)}`,
  });
  expect(created.status).toBe(201);
  const projectId = ((await created.json()) as { id: string }).id;
  const keyRes = await callApi('POST', `${base()}/${projectId}/keys`, owner(), {
    scopes,
    expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
  });
  expect(keyRes.status).toBe(201);
  return { projectId, key: ((await keyRes.json()) as { rawKey: string }).rawKey };
}

async function mint(host: Host): Promise<Session> {
  const userId = `user-${randomUUID().slice(0, 8)}`;
  const res = await bearer(host.key, 'POST', '/v1/project/sessions', { userId });
  expect(res.status).toBe(201);
  return { token: ((await res.json()) as { token: string }).token, userId };
}

async function toolCall(
  session: Session,
  outcome: string,
  tool = 'read_file',
  durationMs = 12,
): Promise<void> {
  const identity = await authenticateKey(gateway.db, session.token);
  await auditToolCall(
    deps,
    identity!.principal,
    { server: 'docs', tool, outcome, durationMs },
    `req-${randomUUID()}`,
    '203.0.113.9',
  );
}

async function logs(host: Host, query = ''): Promise<LogPage> {
  const res = await bearer(host.key, 'GET', `/v1/project/logs${query}`);
  expect(res.status).toBe(200);
  return (await res.json()) as LogPage;
}

beforeAll(async () => {
  fx = await createOrgFixture('project-logs');
});

afterAll(async () => {
  await gateway.pool.end();
});

describe('the logs of a project', () => {
  it('show a tool call with its user, its project and only the safe keys', async () => {
    const host = await createHost();
    const session = await mint(host);
    await toolCall(session, 'ok');

    const page = await logs(host, '?action=mcp_tool.called');
    expect(page.items).toHaveLength(1);
    const [item] = page.items;
    expect(item).toMatchObject({
      action: 'mcp_tool.called',
      result: 'success',
      user: { userId: session.userId },
      target: { kind: 'mcp_server', id: 'docs' },
      tool: 'read_file',
      outcome: 'ok',
      durationMs: 12,
    });
    expect(Object.keys(item!).sort()).toEqual(
      [
        'action',
        'createdAt',
        'durationMs',
        'id',
        'outcome',
        'result',
        'target',
        'tool',
        'user',
      ].sort(),
    );
    expect(JSON.stringify(page)).not.toContain('203.0.113.9');
  });

  it('also show the session that was created, for the user it was made for', async () => {
    const host = await createHost();
    const session = await mint(host);
    const page = await logs(host, `?userId=${encodeURIComponent(session.userId)}`);
    expect(page.items.map((entry) => entry.action)).toContain('session.created');
    expect(page.items.every((entry) => entry.user?.userId === session.userId)).toBe(true);
  });

  it('filter by user and by action, and an unknown user gives an empty page', async () => {
    const host = await createHost();
    const first = await mint(host);
    const second = await mint(host);
    await toolCall(first, 'ok');
    await toolCall(second, 'ok');
    await toolCall(second, 'ok', 'write_file');

    const forSecond = await logs(host, `?action=mcp_tool.called&userId=${second.userId}`);
    expect(forSecond.items.map((entry) => entry.tool).sort()).toEqual(['read_file', 'write_file']);
    expect((await logs(host, '?userId=nobody')).items).toEqual([]);
    expect((await logs(host, '?action=mcp_tool.called')).items).toHaveLength(3);
  });

  it('page newest first with a cursor and repeat nothing', async () => {
    const host = await createHost();
    const session = await mint(host);
    for (let n = 0; n < 5; n++) await toolCall(session, 'ok', `tool_${n}`);

    const seen: string[] = [];
    let cursor: string | null = null;
    do {
      const page: LogPage = await logs(
        host,
        `?action=mcp_tool.called&limit=2${cursor ? `&cursor=${cursor}` : ''}`,
      );
      seen.push(...page.items.map((entry) => entry.tool!));
      cursor = page.nextCursor;
    } while (cursor);
    expect(seen).toEqual(['tool_4', 'tool_3', 'tool_2', 'tool_1', 'tool_0']);

    const bad = await bearer(host.key, 'GET', '/v1/project/logs?cursor=not-a-cursor');
    expect(bad.status).toBe(400);
  });

  it('never return another project’s rows', async () => {
    const mine = await createHost();
    const theirs = await createHost();
    const mineSession = await mint(mine);
    const theirSession = await mint(theirs);
    await toolCall(theirSession, 'ok', 'their_tool');
    await toolCall(mineSession, 'ok', 'my_tool');

    const own = await logs(mine);
    expect(own.items.some((entry) => entry.tool === 'their_tool')).toBe(false);
    expect(own.items.some((entry) => entry.user?.userId === theirSession.userId)).toBe(false);
    expect((await logs(mine, `?userId=${theirSession.userId}`)).items).toEqual([]);

    const console = await callApi(
      'GET',
      `${base()}/${mine.projectId}/logs?action=mcp_tool.called`,
      owner(),
    );
    expect(console.status).toBe(200);
    const page = (await console.json()) as LogPage;
    expect(page.items.map((entry) => entry.tool)).toEqual(['my_tool']);
  });

  it('are closed to a key without the observability scope', async () => {
    const host = await createHost(['sessions:read']);
    expect((await bearer(host.key, 'GET', '/v1/project/logs')).status).toBe(403);
    expect((await bearer(host.key, 'GET', '/v1/project/usage')).status).toBe(403);
  });
});

describe('the delivery of a user', () => {
  it('shows the last sync and the count the agent reported', async () => {
    const host = await createHost();
    const session = await mint(host);

    const before = await bearer(host.key, 'GET', '/v1/project/users');
    const [row] = ((await before.json()) as { items: Record<string, unknown>[] }).items;
    expect(row).toMatchObject({
      userId: session.userId,
      lastSyncedAt: null,
      connectionsMissing: 0,
    });

    const report = await bearer(session.token, 'POST', '/v1/sync/reports', {
      target: 'cursor',
      applied: [],
    });
    expect(report.status).toBe(204);

    const after = await bearer(host.key, 'GET', '/v1/project/users');
    const [synced] = ((await after.json()) as { items: { lastSyncedAt: string | null }[] }).items;
    expect(synced!.lastSyncedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    const reported = await logs(host, '?action=sync.reported');
    expect(reported.items).toHaveLength(1);
    expect(reported.items[0]).toMatchObject({
      user: { userId: session.userId },
      appliedCount: 0,
    });

    const viaConsole = await callApi('GET', `${base()}/${host.projectId}/users`, owner());
    const [consoleRow] = ((await viaConsole.json()) as { items: { lastSyncedAt: string | null }[] })
      .items;
    expect(consoleRow!.lastSyncedAt).toBe(synced!.lastSyncedAt);
  });
});

describe('the usage of a project', () => {
  it('counts calls, failures and users per day and lists the busiest users', async () => {
    const host = await createHost();
    const busy = await mint(host);
    const quiet = await mint(host);
    await toolCall(busy, 'ok');
    await toolCall(busy, 'ok');
    await toolCall(busy, 'upstream_unavailable');
    await toolCall(quiet, 'tool_error');
    const to = new Date(Date.now() + 60_000);
    const from = new Date(to.getTime() - DAY);

    const range = `from=${from.toISOString()}&to=${to.toISOString()}`;
    const res = await bearer(host.key, 'GET', `/v1/project/usage?${range}`);
    expect(res.status).toBe(200);
    const usage = (await res.json()) as Usage;
    expect(usage.days).toEqual([
      { date: new Date().toISOString().slice(0, 10), activeUsers: 2, toolCalls: 4, errors: 1 },
    ]);
    expect(usage.topUsers.map((user) => [user.userId, user.toolCalls])).toEqual([
      [busy.userId, 3],
      [quiet.userId, 1],
    ]);

    const viaConsole = await callApi('GET', `${base()}/${host.projectId}/usage?${range}`, owner());
    expect(await viaConsole.json()).toEqual(usage);
  });

  it('is empty for a project nobody called, and refuses a range that is too long', async () => {
    const host = await createHost();
    const empty = (await (await bearer(host.key, 'GET', '/v1/project/usage')).json()) as Usage;
    expect(empty.days).toEqual([]);
    expect(empty.topUsers).toEqual([]);

    const to = new Date();
    const from = new Date(to.getTime() - 93 * DAY);
    const tooLong = await bearer(
      host.key,
      'GET',
      `/v1/project/usage?from=${from.toISOString()}&to=${to.toISOString()}`,
    );
    expect(tooLong.status).toBe(400);
    const inverted = await bearer(
      host.key,
      'GET',
      `/v1/project/usage?from=${to.toISOString()}&to=${from.toISOString()}`,
    );
    expect(inverted.status).toBe(400);
  });
});
