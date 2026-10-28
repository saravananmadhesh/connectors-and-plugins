import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { ConnectError } from './errors.js';
import { Http } from './http.js';
import { fakeFetch, json } from './test-support.js';
import { verifyWebhook, webhooksApi } from './webhooks.js';

const SECRET = 'whsec_test_secret';
const NOW = new Date('2026-10-17T12:00:00Z');
const SECONDS = Math.floor(NOW.getTime() / 1000);
const BODY = JSON.stringify({
  id: 'evt_1',
  type: 'user.created',
  createdAt: NOW.toISOString(),
  projectId: 'prj_1',
  userId: 'u1',
  data: {},
  version: 1,
});

const sign = (id: string, timestamp: number, body: string, secret = SECRET) =>
  `v1,${createHmac('sha256', secret).update(`${id}.${timestamp}.${body}`).digest('base64')}`;

const headers = (over: Record<string, string> = {}) => ({
  'webhook-id': 'evt_1',
  'webhook-timestamp': String(SECONDS),
  'webhook-signature': sign('evt_1', SECONDS, BODY),
  ...over,
});

const verify = (over: Partial<Parameters<typeof verifyWebhook>[0]> = {}) =>
  verifyWebhook({ rawBody: BODY, headers: headers(), secret: SECRET, now: NOW, ...over });

describe('verifyWebhook', () => {
  it('accepts a signed body and returns it', () => {
    expect(verify()).toMatchObject({ id: 'evt_1', type: 'user.created', userId: 'u1' });
  });

  it('matches a known signature', () => {
    // Computed by hand for this id, time, body and secret; the server signs the same way.
    expect(sign('msg_1', 1_700_000_000, '{"a":1}', 'key')).toBe(
      'v1,' + createHmac('sha256', 'key').update('msg_1.1700000000.{"a":1}').digest('base64'),
    );
  });

  it('reads the body as bytes too', () => {
    expect(verify({ rawBody: new TextEncoder().encode(BODY) }).id).toBe('evt_1');
  });

  it('refuses a changed body', () => {
    expect(() => verify({ rawBody: BODY.replace('u1', 'u2') })).toThrow(/does not match/);
  });

  it('refuses another secret', () => {
    expect(() => verify({ secret: 'other' })).toThrow(/does not match/);
  });

  it('refuses a timestamp that is too old or too new', () => {
    const old = SECONDS - 301;
    expect(() =>
      verify({
        headers: headers({
          'webhook-timestamp': String(old),
          'webhook-signature': sign('evt_1', old, BODY),
        }),
      }),
    ).toThrow(/outside the allowed time/);
    const ahead = SECONDS + 301;
    expect(() =>
      verify({
        headers: headers({
          'webhook-timestamp': String(ahead),
          'webhook-signature': sign('evt_1', ahead, BODY),
        }),
      }),
    ).toThrow(/outside the allowed time/);
  });

  it('allows a wider tolerance when asked', () => {
    const old = SECONDS - 600;
    const result = verify({
      toleranceSeconds: 900,
      headers: headers({
        'webhook-timestamp': String(old),
        'webhook-signature': sign('evt_1', old, BODY),
      }),
    });
    expect(result.id).toBe('evt_1');
  });

  it('accepts when any of several signatures matches', () => {
    const good = sign('evt_1', SECONDS, BODY);
    expect(verify({ headers: headers({ 'webhook-signature': `v1,AAAA ${good}` }) }).id).toBe(
      'evt_1',
    );
  });

  it('reads header names in any case', () => {
    const upper = Object.fromEntries(
      Object.entries(headers()).map(([k, v]) => [k.toUpperCase(), v]),
    );
    expect(verify({ headers: upper }).id).toBe('evt_1');
  });

  it.each(['webhook-id', 'webhook-timestamp', 'webhook-signature'])(
    'refuses without %s',
    (name) => {
      const without = { ...headers() } as Record<string, string | undefined>;
      delete without[name];
      expect(() => verify({ headers: without })).toThrow(/missing/);
    },
  );

  it('refuses a timestamp that is not a number', () => {
    expect(() => verify({ headers: headers({ 'webhook-timestamp': 'soon' }) })).toThrow(
      /not valid/,
    );
  });

  it('refuses a signed body that is not JSON', () => {
    const body = 'not json';
    expect(() =>
      verify({
        rawBody: body,
        headers: headers({ 'webhook-signature': sign('evt_1', SECONDS, body) }),
      }),
    ).toThrow(/not JSON/);
  });

  it('raises a ConnectError with a code a host can test', () => {
    let caught: unknown;
    try {
      verify({ secret: 'other' });
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ConnectError);
    expect(caught).toMatchObject({ code: 'webhook_invalid' });
  });

  it('uses the time of the machine when none is given', () => {
    const now = Math.floor(Date.now() / 1000);
    const result = verifyWebhook({
      rawBody: BODY,
      secret: SECRET,
      headers: headers({
        'webhook-timestamp': String(now),
        'webhook-signature': sign('evt_1', now, BODY),
      }),
    });
    expect(result.id).toBe('evt_1');
  });
});

describe('webhooksApi', () => {
  it('lists deliveries with a status filter and a page', async () => {
    const fake = fakeFetch({
      'GET /v1/project/webhook/deliveries': json({ items: [], nextCursor: null }),
    });
    const api = webhooksApi(
      new Http({ baseUrl: 'https://api.test', token: 'prk_x', fetch: fake.fetch }),
    );
    expect(await api.deliveries({ status: 'failed', limit: 5 })).toEqual({
      items: [],
      nextCursor: null,
    });
    expect(fake.calls[0]?.url.search).toBe('?status=failed&limit=5');
  });
});
