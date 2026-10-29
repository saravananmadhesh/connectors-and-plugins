/**
 * Group J: Webhooks
 * TypeScript SDK end-to-end cases for webhooks: verify (good, tampered, old, several signatures), deliveries, a real delivery.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/j-webhooks.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-j.json (this file alone).
 */
import { readFile } from 'node:fs/promises';
import { createHmac } from 'node:crypto';
import { STANDIN_WEBHOOKS, state, test, ok, rejects, connect } from './lib.mjs';

const sign = (secret, id, ts, body) =>
  `v1,${createHmac('sha256', secret).update(`${id}.${ts}.${body}`).digest('base64')}`;
const nowTs = () => Math.floor(Date.now() / 1000).toString();
const sample = JSON.stringify({
  id: 'evt_1',
  type: 'user.created',
  createdAt: new Date().toISOString(),
  projectId: state.projectId,
  data: {},
});

// Scenario: verify a body signed with the project secret. Expected: the parsed event.
await test('J1', 'webhooks.verify accepts a good signature', () => {
  ok(state.webhookSecret, 'setup did not store a webhook secret');
  const ts = nowTs();
  const event = connect.webhooks.verify({
    rawBody: sample,
    headers: {
      'webhook-id': 'msg_1',
      'webhook-timestamp': ts,
      'webhook-signature': sign(state.webhookSecret, 'msg_1', ts, sample),
    },
    secret: state.webhookSecret,
  });
  return event.type;
});

// Scenario: same headers, body changed by one character. Expected: webhook_invalid.
await test('J2', 'webhooks.verify refuses a tampered body', async () => {
  const ts = nowTs();
  return rejects(
    async () =>
      connect.webhooks.verify({
        rawBody: sample.replace('user.created', 'user.createe'),
        headers: {
          'webhook-id': 'msg_1',
          'webhook-timestamp': ts,
          'webhook-signature': sign(state.webhookSecret, 'msg_1', ts, sample),
        },
        secret: state.webhookSecret,
      }),
    { code: 'webhook_invalid' },
  );
});

// Scenario: a timestamp 301 seconds old. Expected: webhook_invalid (tolerance is 300 s).
await test('J3', 'webhooks.verify refuses an old timestamp', async () => {
  const ts = (Math.floor(Date.now() / 1000) - 301).toString();
  return rejects(
    async () =>
      connect.webhooks.verify({
        rawBody: sample,
        headers: {
          'webhook-id': 'm',
          'webhook-timestamp': ts,
          'webhook-signature': sign(state.webhookSecret, 'm', ts, sample),
        },
        secret: state.webhookSecret,
      }),
    { code: 'webhook_invalid' },
  );
});

// Scenario: two signatures in the header (old secret first), Uint8Array body, upper-case header
// names. Expected: accepted (any one may match).
await test('J4', 'webhooks.verify with several signatures and a byte body', () => {
  const ts = nowTs();
  const event = connect.webhooks.verify({
    rawBody: new TextEncoder().encode(sample),
    headers: {
      'Webhook-Id': 'm2',
      'Webhook-Timestamp': ts,
      'Webhook-Signature': `${sign('old-secret', 'm2', ts, sample)} ${sign(state.webhookSecret, 'm2', ts, sample)}`,
    },
    secret: state.webhookSecret,
  });
  return event.id;
});

// Scenario: missing headers. Expected: webhook_invalid.
await test('J5', 'webhooks.verify refuses missing headers', () =>
  rejects(async () => connect.webhooks.verify({ rawBody: sample, headers: {}, secret: 'x' }), {
    code: 'webhook_invalid',
  }),
);

// Scenario: webhooks.deliveries() after this run made users and installs.
// Expected: deliveries for user.created / user_plugin.installed; status filter works.
await test('J6', 'webhooks.deliveries lists deliveries and filters by status', async () => {
  await new Promise((r) => setTimeout(r, 3000));
  const page = await connect.webhooks.deliveries({ limit: 50 });
  const delivered = await connect.webhooks.deliveries({ status: 'delivered' });
  ok(page.items.length > 0, 'no deliveries');
  ok(
    delivered.items.every((d) => d.status === 'delivered'),
    'status filter not applied',
  );
  return {
    types: [...new Set(page.items.map((d) => d.type))],
    statuses: [...new Set(page.items.map((d) => d.status))],
  };
});

// Scenario: a real delivery received by the stand-in receiver (SDK_TEST_WEBHOOK_LOG), checked
// with webhooks.verify exactly as it arrived. Expected: every received delivery verifies.
await test('J7', 'a real delivery passes webhooks.verify', async () => {
  ok(STANDIN_WEBHOOKS, 'SDK_TEST_WEBHOOK_LOG not set (no receiver); skipped');
  const lines = (await readFile(STANDIN_WEBHOOKS, 'utf8'))
    .trim()
    .split('\n')
    .map((l) => JSON.parse(l));
  ok(lines.length > 0, 'nothing received');
  const types = lines.map(
    (d) =>
      connect.webhooks.verify({
        rawBody: d.rawBody,
        headers: d.headers,
        secret: state.webhookSecret,
        toleranceSeconds: 86400,
      }).type,
  );
  return { received: lines.length, types: [...new Set(types)] };
});
