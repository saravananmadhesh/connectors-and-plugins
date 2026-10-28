/**
 * The api checks a key for the gateway, so the gateway does not need the database for it.
 *
 * Requires the live stack. Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi } from './org-fixture.js';
import { createSignedInUser, sql, workloadHeaders, type SignedInUser } from './signed-in-user.js';
import { apiUrl } from './test-env.js';

let user: SignedInUser;
let rawKey = '';

const authenticate = (body: unknown, caller = 'gateway') =>
  fetch(`${apiUrl}/v1/gateway/authenticate`, {
    method: 'POST',
    headers: { ...workloadHeaders, 'x-caller-id': caller },
    body: JSON.stringify(body),
  });

beforeAll(async () => {
  user = await createSignedInUser('gateway-key-auth');
  const res = await callApi('POST', `/v1/orgs/${user.orgId}/api-keys`, user, {
    name: `Gateway ${randomUUID().slice(0, 8)}`,
    permissions: ['mcp:list', 'mcp:call'],
  });
  if (res.status !== 201) throw new Error(`api key was not created: ${res.status}`);
  rawKey = ((await res.json()) as { rawKey: string }).rawKey;
}, 120_000);

describe('POST /v1/gateway/authenticate', () => {
  it('returns the identity of a valid key', async () => {
    const res = await authenticate({ key: rawKey, ip: '203.0.113.9' });
    expect(res.status).toBe(200);
    const { identity } = (await res.json()) as {
      identity: {
        keyRowId: string;
        principal: { kind: string; keyId: string; permissions: string[] };
      };
    };
    expect(identity.principal).toMatchObject({ kind: 'api_key' });
    expect(identity.principal.keyId).toBe(rawKey.split('.')[0]);
    expect(identity.principal.permissions).toEqual(['mcp:list', 'mcp:call']);
    expect(identity.keyRowId).toBeTruthy();
  });

  it('gives the same answer for an unknown key, a wrong secret and a malformed key', async () => {
    const wrongSecret = `${rawKey.split('.')[0]}.${'x'.repeat(40)}`;
    for (const key of [
      'fyk_0000000000000000.not-a-real-secret-value-000000',
      wrongSecret,
      'nope',
    ]) {
      const res = await authenticate({ key });
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ identity: null });
    }
  });

  it('refuses a body without a key', async () => {
    expect((await authenticate({})).status).toBe(400);
  });

  it('refuses every caller except the gateway', async () => {
    expect((await authenticate({ key: rawKey }, 'web')).status).toBe(403);
    expect((await authenticate({ key: rawKey }, 'admin')).status).toBe(403);
  });

  it('refuses a request without a workload identity', async () => {
    const res = await fetch(`${apiUrl}/v1/gateway/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: rawKey }),
    });
    expect(res.status).toBe(401);
  });
});

const post = (path: string, body: unknown, caller = 'gateway') =>
  fetch(`${apiUrl}/v1/gateway/${path}`, {
    method: 'POST',
    headers: { ...workloadHeaders, 'x-caller-id': caller },
    body: JSON.stringify(body),
  });

describe('POST /v1/gateway/servers', () => {
  it('lists the servers of a valid key', async () => {
    const res = await post('servers', { key: rawKey });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ servers: [] });
  });

  it('answers 401 for a key that is not valid, 403 for another caller and 400 without a key', async () => {
    expect((await post('servers', { key: 'nope' })).status).toBe(401);
    expect((await post('servers', { key: rawKey }, 'web')).status).toBe(403);
    expect((await post('servers', {})).status).toBe(400);
  });
});

describe('POST /v1/gateway/access', () => {
  it('does not open a server the key does not reach', async () => {
    const res = await post('access', {
      key: rawKey,
      installationId: randomUUID(),
      componentId: randomUUID(),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: false, reason: 'not_found' });
  });

  it('answers 401 for a key that is not valid, 400 without ids and 403 for another caller', async () => {
    const ids = { installationId: randomUUID(), componentId: randomUUID() };
    expect((await post('access', { key: 'nope', ...ids })).status).toBe(401);
    expect((await post('access', { key: rawKey })).status).toBe(400);
    expect((await post('access', { key: rawKey, ...ids }, 'admin')).status).toBe(403);
  });
});

describe('POST /v1/gateway/usage', () => {
  const call = { server: 'docs', tool: 'search', outcome: 'ok', durationMs: 12 };

  it('writes an audit event for the call', async () => {
    const requestId = randomUUID();
    const res = await post('usage', { key: rawKey, ...call, requestId });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ recorded: true });
    const rows = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action = 'mcp_tool.called' AND request_id = $1`,
      [requestId],
    );
    expect(rows[0]?.n).toBe(1);
  });

  it('refuses a key that is not valid, a bad body and another caller', async () => {
    const full = { ...call, requestId: 'r' };
    expect((await post('usage', { key: 'nope', ...full })).status).toBe(401);
    expect((await post('usage', { key: rawKey, ...full, durationMs: -1 })).status).toBe(400);
    expect((await post('usage', { key: rawKey, ...full }, 'web')).status).toBe(403);
  });
});
