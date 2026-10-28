/**
 * The webhook of a project: a user create and a sync report each reach a local receiver once, signed
 * with the project's secret; a receiver that fails is retried and then given up on; a new secret
 * changes the signature; another project never sees the event; and only people who may change
 * projects can set the webhook.
 *
 * Run: pnpm test "--only=integration"
 */
import { createServer, type IncomingMessage, type Server } from 'node:http';
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { verifyWebhook } from '../../packages/domain/src/project/webhook-signature.js';
import { PROJECT_LIMITS } from '../../packages/limits/src/index.js';
import { apiUrl } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { workloadHeaders } from './signed-in-user.js';
import { FIXTURE_ORIGIN, listenOnFixturePort } from './support/fixture-port.js';

interface Host {
  projectId: string;
  key: string;
}
interface Received {
  path: string;
  headers: IncomingMessage['headers'];
  body: string;
}
interface Delivery {
  id: string;
  eventId: string;
  type: string;
  status: string;
  attempts: number;
  lastStatusCode: number | null;
}
interface DeliveryPage {
  items: Delivery[];
  nextCursor: string | null;
}

const DAY = 86_400_000;
const SCOPES = ['sessions:read', 'sessions:write', 'observability:read'];

let fx: OrgFixture;
let receiver: Server;
let received: Received[] = [];
let answer = 200;
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
    name: `Hooks ${randomUUID().slice(0, 8)}`,
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

/** Sets a webhook that calls the local receiver at a path of its own; returns the secret. */
async function setWebhook(host: Host, path: string, events: string[]): Promise<string> {
  const res = await callApi('PUT', `${base()}/${host.projectId}/webhook`, owner(), {
    url: `${FIXTURE_ORIGIN}${path}`,
    events,
  });
  expect(res.status).toBe(201);
  const body = (await res.json()) as { secret: string };
  expect(body.secret).toMatch(/^whsec_/);
  return body.secret;
}

async function mint(host: Host): Promise<{ token: string; userId: string }> {
  const userId = `user-${randomUUID().slice(0, 8)}`;
  const res = await bearer(host.key, 'POST', '/v1/project/sessions', { userId });
  expect(res.status).toBe(201);
  return { token: ((await res.json()) as { token: string }).token, userId };
}

async function deliveries(host: Host, query = ''): Promise<DeliveryPage> {
  const res = await bearer(host.key, 'GET', `/v1/project/webhook/deliveries${query}`);
  expect(res.status).toBe(200);
  return (await res.json()) as DeliveryPage;
}

async function until<T>(read: () => Promise<T | undefined> | T | undefined): Promise<T> {
  const deadline = Date.now() + 45_000;
  for (;;) {
    const value = await read();
    if (value !== undefined) return value;
    if (Date.now() > deadline) throw new Error('Timed out waiting');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

const at = (path: string) => received.filter((entry) => entry.path === path);
const bodyOf = (entry: Received) => JSON.parse(entry.body) as Record<string, unknown>;

function signed(entry: Received, secret: string): boolean {
  return verifyWebhook({
    secret,
    id: String(entry.headers['webhook-id']),
    timestamp: String(entry.headers['webhook-timestamp']),
    signature: String(entry.headers['webhook-signature']),
    body: entry.body,
  });
}

beforeAll(async () => {
  fx = await createOrgFixture('project-webhook');
  receiver = await listenOnFixturePort(
    createServer((req, res) => {
      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        received.push({
          path: req.url ?? '',
          headers: req.headers,
          body: Buffer.concat(chunks).toString('utf8'),
        });
        res.statusCode = (req.url ?? '').startsWith('/fail') ? 500 : answer;
        res.end();
      });
    }),
  );
}, 180_000);

afterAll(async () => {
  await new Promise<void>((resolve) => (receiver ? receiver.close(() => resolve()) : resolve()));
});

beforeEach(() => {
  answer = 200;
});

describe('the events of a project', () => {
  it('give one signed delivery for a user create and one for a sync report', async () => {
    const host = await createHost();
    const path = `/ok-${randomUUID().slice(0, 8)}`;
    const secret = await setWebhook(host, path, ['user.created', 'sync.reported']);
    const session = await mint(host);

    const first = await until(() => (at(path).length > 0 ? at(path)[0] : undefined));
    expect(bodyOf(first)).toMatchObject({
      type: 'user.created',
      version: 1,
      projectId: host.projectId,
      userId: session.userId,
    });
    expect(String(first.headers['webhook-id'])).toBe(bodyOf(first)['id']);
    expect(String(first.headers['webhook-timestamp'])).toMatch(/^\d{10}$/);
    expect(first.headers['content-type']).toContain('application/json');
    expect(signed(first, secret)).toBe(true);
    expect(signed({ ...first, body: `${first.body} ` }, secret)).toBe(false);
    expect(signed(first, 'whsec_wrong')).toBe(false);

    const report = await bearer(session.token, 'POST', '/v1/sync/reports', {
      target: 'cursor',
      applied: [],
    });
    expect(report.status).toBe(204);
    const second = await until(() => (at(path).length > 1 ? at(path)[1] : undefined));
    expect(bodyOf(second)).toMatchObject({
      type: 'sync.reported',
      userId: session.userId,
      data: { target: 'cursor', appliedCount: 0 },
    });
    expect(signed(second, secret)).toBe(true);

    const page = await until(async () => {
      const current = await deliveries(host);
      return current.items.length === 2 && current.items.every((d) => d.status === 'delivered')
        ? current
        : undefined;
    });
    expect(page.items.map((delivery) => delivery.type).sort()).toEqual([
      'sync.reported',
      'user.created',
    ]);
    expect(page.items.every((delivery) => delivery.id.startsWith('whd_'))).toBe(true);
    expect(page.items.every((delivery) => delivery.attempts === 1)).toBe(true);
    expect(at(path)).toHaveLength(2);

    const forUser = await deliveries(host, '?status=pending');
    expect(forUser.items).toEqual([]);
    const viaConsole = await callApi(
      'GET',
      `${base()}/${host.projectId}/webhook/deliveries`,
      owner(),
    );
    expect(viaConsole.status).toBe(200);
    expect(((await viaConsole.json()) as DeliveryPage).items).toHaveLength(2);
  });

  it('never reach another project, and an event not asked for sends nothing', async () => {
    const mine = await createHost();
    const theirs = await createHost();
    const minePath = `/mine-${randomUUID().slice(0, 8)}`;
    const theirPath = `/theirs-${randomUUID().slice(0, 8)}`;
    await setWebhook(mine, minePath, ['sync.reported']);
    await setWebhook(theirs, theirPath, ['user.created']);
    const theirSession = await mint(theirs);
    await mint(mine);

    await until(() => (at(theirPath).length > 0 ? true : undefined));
    expect(bodyOf(at(theirPath)[0]!)['userId']).toBe(theirSession.userId);
    // The other project had a user create too, but only the sync report was asked for here.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(at(minePath)).toEqual([]);
    expect((await deliveries(mine)).items).toEqual([]);
  });
});

describe('a receiver that fails', () => {
  it('is retried and then given up on after the limit', async () => {
    const host = await createHost();
    const path = `/fail-${randomUUID().slice(0, 8)}`;
    await setWebhook(host, path, ['user.created']);
    await mint(host);

    const page = await until(async () => {
      const current = await deliveries(host);
      return current.items[0]?.status === 'failed' ? current : undefined;
    });
    expect(page.items).toHaveLength(1);
    expect(page.items[0]).toMatchObject({
      attempts: PROJECT_LIMITS.webhookMaxAttempts,
      lastStatusCode: 500,
    });
    expect(at(path)).toHaveLength(PROJECT_LIMITS.webhookMaxAttempts);
    // Every attempt carries the same id, so the host can tell a repeat.
    expect(new Set(at(path).map((entry) => entry.headers['webhook-id'])).size).toBe(1);
  });
});

describe('the secret of a webhook', () => {
  it('changes the signature when it is rotated, and an update keeps it', async () => {
    const host = await createHost();
    const path = `/rotate-${randomUUID().slice(0, 8)}`;
    const oldSecret = await setWebhook(host, path, ['user.created']);
    const update = await callApi('PUT', `${base()}/${host.projectId}/webhook`, owner(), {
      url: `${FIXTURE_ORIGIN}${path}`,
      events: ['user.created'],
    });
    expect(update.status).toBe(200);
    expect(await update.json()).not.toHaveProperty('secret');

    await mint(host);
    const before = await until(() => (at(path).length > 0 ? at(path)[0] : undefined));
    expect(signed(before, oldSecret)).toBe(true);

    const rotated = await callApi(
      'POST',
      `${base()}/${host.projectId}/webhook/rotate-secret`,
      owner(),
    );
    expect(rotated.status).toBe(200);
    const newSecret = ((await rotated.json()) as { secret: string }).secret;
    expect(newSecret).not.toBe(oldSecret);

    await mint(host);
    const after = await until(() => (at(path).length > 1 ? at(path)[1] : undefined));
    expect(signed(after, newSecret)).toBe(true);
    expect(signed(after, oldSecret)).toBe(false);

    const read = await callApi('GET', `${base()}/${host.projectId}/webhook`, owner());
    expect(read.status).toBe(200);
    expect(JSON.stringify(await read.json())).not.toContain('whsec_');
  });
});

describe('who may set a webhook', () => {
  it('refuses a viewer, a stranger and an address that cannot be called', async () => {
    const host = await createHost();
    const body = { url: `${FIXTURE_ORIGIN}/never`, events: ['user.created'] };
    const url = `${base()}/${host.projectId}/webhook`;
    expect((await callApi('PUT', url, fx.users.viewer, body)).status).toBe(403);
    // A viewer may read; nothing is set yet.
    expect((await callApi('GET', url, fx.users.viewer)).status).toBe(404);
    expect((await callApi('PUT', url, fx.stranger, body)).status).toBeGreaterThanOrEqual(403);
    expect((await callApi('GET', url, owner())).status).toBe(404);

    const privateHost = await callApi('PUT', url, owner(), {
      url: 'https://10.0.0.5/hook',
      events: ['user.created'],
    });
    expect(privateHost.status).toBe(400);
    const plain = await callApi('PUT', url, owner(), {
      url: 'http://hooks.example.test/in',
      events: ['user.created'],
    });
    expect(plain.status).toBe(400);
    const noEvents = await callApi('PUT', url, owner(), { url: body.url, events: [] });
    expect(noEvents.status).toBe(400);
  });

  it('lets a host read deliveries only with the observability scope, and never change them', async () => {
    const narrow = await createHost(['sessions:read']);
    expect((await bearer(narrow.key, 'GET', '/v1/project/webhook/deliveries')).status).toBe(403);
    const host = await createHost();
    expect((await bearer(host.key, 'PUT', '/v1/project/webhook', {})).status).toBe(404);
    expect((await deliveries(host)).items).toEqual([]);
  });

  it('stops sending once the webhook is deleted', async () => {
    const host = await createHost();
    const path = `/gone-${randomUUID().slice(0, 8)}`;
    await setWebhook(host, path, ['user.created']);
    const url = `${base()}/${host.projectId}/webhook`;
    expect((await callApi('DELETE', url, owner())).status).toBe(204);
    expect((await callApi('DELETE', url, owner())).status).toBe(404);
    await mint(host);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(at(path)).toEqual([]);
  });
});
