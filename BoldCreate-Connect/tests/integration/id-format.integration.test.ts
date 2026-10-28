/**
 * Id format: prefixed ids in responses and strict decoding of path ids.
 *
 * Run: pnpm test -- --only=integration
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { apiUrl, mailpitUrl, requireEnv } from './test-env.js';

const WORKLOAD_SECRET = requireEnv('WORKLOAD_SECRET');
const apiHeaders = { 'x-caller-id': 'web', 'x-workload-secret': WORKLOAD_SECRET };

function call(method: string, path: string, session: string, body?: unknown) {
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...apiHeaders,
      'idempotency-key': randomUUID(),
      'x-session-token': session,
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

async function signupAndVerify(email: string): Promise<{ session: string; userId: string }> {
  const signup = await fetch(`${apiUrl}/v1/auth/signup`, {
    method: 'POST',
    headers: { ...apiHeaders, 'idempotency-key': randomUUID(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'TestPassword123!', displayName: 'Id Format' }),
  });
  if (signup.status !== 201) throw new Error(`Signup failed: ${signup.status}`);

  for (let i = 0; i < 60; i++) {
    const list = await fetch(`${mailpitUrl}/api/v1/messages`);
    const data = (await list.json()) as {
      messages?: Array<{ ID: string; To: Array<{ Address: string }> }>;
    };
    const msg = data.messages?.find((m) => m.To.some((t) => t.Address === email));
    if (msg) {
      const full = await fetch(`${mailpitUrl}/api/v1/message/${msg.ID}`);
      const text = ((await full.json()) as { Text?: string }).Text ?? '';
      const token = text.match(/token=([a-zA-Z0-9_-]+)/)?.[1];
      if (token) {
        const verify = await fetch(`${apiUrl}/v1/auth/verify-email`, {
          method: 'POST',
          headers: {
            ...apiHeaders,
            'idempotency-key': randomUUID(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const body = (await verify.json()) as { sessionToken: string; user: { id: string } };
        return { session: body.sessionToken, userId: body.user.id };
      }
    }
    await new Promise<void>((r) => setTimeout(r, 300));
  }
  throw new Error('Verification token not found');
}

const ts = Date.now();
let session = '';
let orgId = '';
let userId = '';

describe('id format', () => {
  beforeAll(async () => {
    const signedIn = await signupAndVerify(`id-format-${ts}@example.com`);
    session = signedIn.session;
    userId = signedIn.userId;
    const created = await call('POST', '/v1/orgs', session, {
      name: 'Id Format',
      slug: `id-format-${ts}`,
    });
    if (created.status !== 201) throw new Error(`Org create failed: ${created.status}`);
    orgId = ((await created.json()) as { id: string }).id;
  }, 60_000);

  it('returns prefixed ids from create', () => {
    expect(userId).toMatch(/^usr_[0-9a-f]{32}$/);
    expect(orgId).toMatch(/^org_[0-9a-f]{32}$/);
  });

  it('reads an org by its prefixed id', async () => {
    const res = await call('GET', `/v1/orgs/${orgId}`, session);
    expect(res.status).toBe(200);
    expect(((await res.json()) as { id: string }).id).toBe(orgId);
  });

  it('answers 404 for a bare uuid with dashes', async () => {
    const res = await call('GET', `/v1/orgs/${randomUUID()}`, session);
    expect(res.status).toBe(404);
  });

  it('answers 404 for the right shape with the wrong prefix', async () => {
    const wrong = orgId.replace('org_', 'prj_');
    const res = await call('GET', `/v1/orgs/${wrong}`, session);
    expect(res.status).toBe(404);
  });

  it('answers 404 for an unknown but well formed id', async () => {
    const unknown = `org_${randomUUID().replaceAll('-', '')}`;
    const res = await call('GET', `/v1/orgs/${unknown}`, session);
    expect(res.status).toBe(404);
  });

  it('lists projects with prefixed ids and a null cursor on the last page', async () => {
    const res = await call('GET', `/v1/orgs/${orgId}/projects`, session);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ id: string; organizationId: string }>;
      nextCursor: string | null;
    };
    expect(body.nextCursor).toBeNull();
    for (const project of body.items) {
      expect(project.id).toMatch(/^prj_[0-9a-f]{32}$/);
      expect(project.organizationId).toBe(orgId);
    }
  });
});
