/**
 * Group I: Logs and usage
 * TypeScript SDK end-to-end cases for audit logs and usage.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/i-logs-usage.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-i.json (this file alone).
 */
import { test, ok, connect, userA, ensureUser } from './lib.mjs';

await ensureUser(userA);

// Scenario: logs.list(). Expected: entries such as session.created, project_user.created.
await test('I1', 'logs.list', async () => {
  const page = await connect.logs.list({ limit: 50 });
  const actions = [...new Set(page.items.map((e) => e.action))];
  ok(actions.includes('session.created'), `actions ${actions}`);
  return actions;
});

// Scenario: logs.list({ userId: userA, action: 'session.created' }). Expected: only those rows.
await test('I2', 'logs.list filters by user and action', async () => {
  const page = await connect.logs.list({ userId: userA, action: 'session.created' });
  ok(page.items.length >= 1, 'nothing found');
  ok(
    page.items.every((e) => e.action === 'session.created' && e.user?.userId === userA),
    'filter not applied',
  );
  return page.items.length;
});

// Scenario: logs.list({ from: tomorrow }). Expected: empty.
await test('I3', 'logs.list from/to window', async () => {
  const page = await connect.logs.list({ from: new Date(Date.now() + 86400_000) });
  ok(page.items.length === 0, `${page.items.length} rows in the future`);
  return 0;
});

// Scenario: usage() and usage({ from, to }). Expected: from/to echoed, days[] and topUsers[].
await test('I4', 'usage with and without a window', async () => {
  const u = await connect.usage();
  const from = new Date(Date.now() - 7 * 86400_000);
  const w = await connect.usage({ from, to: new Date() });
  ok(Array.isArray(u.days) && Array.isArray(w.topUsers), 'shape');
  return { default: `${u.from}..${u.to}`, window: `${w.from}..${w.to}`, days: w.days.length };
});
