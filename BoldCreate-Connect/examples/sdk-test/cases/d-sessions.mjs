/**
 * Group D: Sessions (made first; later groups use them)
 * TypeScript SDK end-to-end cases for sessions: create options, idempotency, allow-list, tool policy, list, get, delete, refresh, the 20-session limit.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/d-sessions.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-d.json (this file alone).
 */
import {
  ConnectAuthError,
  ConnectNotFoundError,
  ConnectSession,
} from '../../../packages/sdk/dist/index.js';
import {
  BASE,
  RUN,
  uid,
  test,
  Expected,
  describe,
  ok,
  rejects,
  leaks,
  connect,
  userA,
  markUser,
} from './lib.mjs';

const userB = uid('bob');
let sessionA;

// Scenario: connect.create(userA). Expected: session with stk_ token, userId, expiresAt ~30 days.
await test('D1', 'create a session for a new user', async () => {
  sessionA = await connect.create(userA);
  markUser(userA);
  const days = (sessionA.expiresAt - Date.now()) / 86400_000;
  ok(sessionA.token.startsWith('stk_'), 'token is not stk_');
  ok(days > 29 && days < 31, `expires in ${days} days, expected 30`);
  ok(!leaks(JSON.stringify(sessionA), sessionA.token), 'toJSON shows the token');
  return { ...sessionA.toJSON(), days: Math.round(days) };
});

// Scenario: create with the same idempotencyKey twice. Expected: the same session id both times.
await test('D2', 'same idempotency key gives back the first session', async () => {
  const key = `idem-${RUN}`;
  const one = await connect.create(userB, { idempotencyKey: key });
  const two = await connect.create(userB, { idempotencyKey: key });
  ok(one.id === two.id, `ids differ: ${one.id} ${two.id}`);
  return { id: one.id };
});

// Scenario: create with plugins: ['ralph-loop'] (a project plugin). Expected: session.plugins has it,
// and the session's manifest holds only ralph-loop.
await test('D3', 'plugin allow-list narrows the session', async () => {
  const s = await connect.create(uid('d3'), { plugins: ['ralph-loop'] });
  const info = await connect.sessions.get(s.id);
  const m = await s.manifest();
  const names = m.entries.map((e) => e.pluginName);
  ok(names.length === 1 && names[0] === 'ralph-loop', `manifest has ${names}`);
  return { plugins: info.plugins, manifest: names };
});

// Scenario: create with plugins: ['teaching'] (published but not in the project).
// Expected: refused with a clear code (not a session that silently has nothing).
await test('D4', 'allow-list naming a plugin outside the project is refused', () =>
  rejects(() => connect.create(uid('d4'), { plugins: ['teaching'] })),
);

// Scenario: expiresInSeconds 3600. Expected: expiresAt about one hour away.
await test('D5', 'expiresInSeconds sets the lifetime', async () => {
  const s = await connect.create(uid('d5'), { expiresInSeconds: 3600 });
  const minutes = (s.expiresAt - Date.now()) / 60000;
  ok(minutes > 55 && minutes < 65, `expires in ${minutes} minutes`);
  return { minutes: Math.round(minutes) };
});

// Scenario: expiresInSeconds of 366 days. Expected: refused (365 days is the most).
await test('D6', 'lifetime over 365 days is refused', () =>
  rejects(() => connect.create(uid('d6'), { expiresInSeconds: 366 * 86400 })),
);

// Scenario: tools: { disable: ['deepwiki.ask_question'], disableDestructive: true } (a tool is
// named <server>.<tool>). Expected: stored on the session (sessions.get shows it).
// Scenario: tools: { disable: ['ask_question'] } (no server part). Expected: refused 400; the
// SDK type only says string[], so a host learns the format from this error.
await test('D7b', 'a tool name without its server is refused', () =>
  rejects(() => connect.create(uid('d7b'), { tools: { disable: ['ask_question'] } }), {
    code: 'validation_failed',
  }),
);

await test('D7', 'tool policy is stored on the session', async () => {
  const s = await connect.create(uid('d7'), {
    tools: { disable: ['deepwiki.ask_question'], disableDestructive: true },
  });
  const info = await connect.sessions.get(s.id);
  ok(
    info.tools?.disable?.includes('deepwiki.ask_question'),
    `tools: ${JSON.stringify(info.tools)}`,
  );
  return info.tools;
});

// Scenario: sessions.list({ userId }). Expected: only that user's sessions.
await test('D8', 'sessions.list filters by user', async () => {
  const page = await connect.sessions.list({ userId: userB });
  ok(
    page.items.length >= 1 && page.items.every((s) => s.userId === userB),
    'other users in the list',
  );
  return page.items.map((s) => `${s.userId}:${s.status}`);
});

// Scenario: sessions.list({ limit: 1 }) then the next page by cursor. Expected: two different ids.
await test('D9', 'sessions.list pages by cursor', async () => {
  const one = await connect.sessions.list({ limit: 1 });
  ok(one.nextCursor, 'no nextCursor with limit 1');
  const two = await connect.sessions.list({ limit: 1, cursor: one.nextCursor });
  ok(one.items[0].id !== two.items[0].id, 'same item on both pages');
  return [one.items[0].id, two.items[0].id];
});

// Scenario: sessions.get('pjs_doesnotexist'). Expected: ConnectNotFoundError 404.
await test('D10', 'sessions.get of an unknown id is 404', () =>
  rejects(() => connect.sessions.get('pjs_00000000000000000000000000000000'), {
    type: ConnectNotFoundError,
  }),
);

// Scenario: sessions.delete(id), then use its token. Expected: status revoked, token refused 401.
await test('D11', 'deleting a session ends it at once', async () => {
  const s = await connect.create(uid('d11'));
  await connect.sessions.delete(s.id);
  const info = await connect.sessions.get(s.id);
  const refused = await rejects(() => s.manifest(), { type: ConnectAuthError });
  ok(info.status === 'revoked', `status ${info.status}`);
  return { status: info.status, refused };
});

// Scenario: session.refresh() on a session made by create. Expected: a new id, same user.
await test('D12', 'refresh gives a new session for the same user', async () => {
  const fresh = await sessionA.refresh();
  ok(fresh.id !== sessionA.id && fresh.userId === sessionA.userId, 'not a fresh session');
  return { old: sessionA.id, new: fresh.id };
});

// Scenario: refresh() on a session rebuilt with fromToken. Expected: refresh_unavailable.
await test('D13', 'refresh on a fromToken session is refused', () =>
  rejects(
    async () =>
      ConnectSession.fromToken(sessionA.token, sessionA.toJSON(), { baseUrl: BASE }).refresh(),
    {
      code: 'refresh_unavailable',
    },
  ),
);

// Scenario: 21 live sessions for one user (README: at most 20). Expected: the 21st is refused.
await test('D14', 'a user can hold at most 20 live sessions', async () => {
  const who = uid('d14');
  let made = 0;
  try {
    for (; made < 21; made += 1) await connect.create(who);
  } catch (error) {
    ok(made === 20, `refused after ${made} sessions: ${describe(error)}`);
    return `refused at #${made + 1}: ${describe(error)}`;
  }
  throw new Expected('21 sessions were made');
});
