/**
 * Group E: Project plugins (what every user gets)
 * TypeScript SDK end-to-end cases for project plugins (what every user of the project gets): list, catalog queries, add, update, remove.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/e-project-plugins.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-e.json (this file alone).
 */
import { ConnectNotFoundError } from '../../../packages/sdk/dist/index.js';
import { P, test, ok, rejects, connect } from './lib.mjs';

// Scenario: plugins.list(). Expected: the project plugins from setup with version and ids.
await test('E1', 'plugins.list', async () => {
  const list = await connect.plugins.list();
  ok(list.length >= 5, `only ${list.length}`);
  return list.map((p) => `${p.name}@${p.version}`);
});

// Scenario: plugins.catalog() with no query. Expected: every published plugin, total matches items.
await test('E2', 'plugins.catalog lists published plugins', async () => {
  const page = await connect.plugins.catalog({ limit: 100 });
  ok(page.items.length === page.total, `items ${page.items.length} total ${page.total}`);
  return page.items.map((p) => p.name);
});

// Scenario: catalog({ q: 'ralph' }), ({ kind: 'mcp' }), ({ sort: 'name', direction: 'asc' }),
// ({ limit: 2, page: 2 }), ({ featured: false }). Expected: each filter applies.
await test('E3', 'plugins.catalog filters, sort and paging', async () => {
  const q = await connect.plugins.catalog({ q: 'ralph' });
  const mcp = await connect.plugins.catalog({ kind: 'mcp' });
  const sorted = await connect.plugins.catalog({ sort: 'name', direction: 'asc', limit: 100 });
  const page2 = await connect.plugins.catalog({ limit: 2, page: 2 });
  const featured = await connect.plugins.catalog({ featured: false });
  const names = sorted.items.map((p) => p.name);
  ok(
    q.items.some((p) => p.name === 'ralph-loop'),
    'q did not find ralph-loop',
  );
  ok(
    mcp.items.every((p) => p.componentCounts.mcp > 0),
    'kind=mcp returned a non-MCP plugin',
  );
  ok(names.join() === [...names].sort().join(), 'not sorted by name');
  ok(page2.page === 2 && page2.items.length <= 2, 'paging');
  return {
    q: q.items.map((p) => p.name),
    mcp: mcp.items.map((p) => p.name),
    page2: page2.items.map((p) => p.name),
    featuredFalse: featured.total,
  };
});

// Scenario: plugins.add(context7) (MCP plugin that needs a key). Expected: added, listed.
await test('E4', 'plugins.add an MCP plugin', async () => {
  const p = await connect.plugins.add(P('context7').id);
  const list = await connect.plugins.list();
  ok(
    list.some((x) => x.name === 'context7'),
    'not listed',
  );
  return `${p.name}@${p.version}`;
});

// Scenario: plugins.update(context7, { versionId }) to the same latest version. Expected: OK.
await test('E5', 'plugins.update to a version', async () => {
  const p = await connect.plugins.update(P('context7').id, { versionId: P('context7').versionId });
  ok(p.versionId === P('context7').versionId, 'version not set');
  return `${p.name}@${p.version}`;
});

// Scenario: plugins.add with a versionId of another plugin. Expected: refused (400 or 404).
await test('E6', 'plugins.add with a foreign versionId is refused', () =>
  rejects(() =>
    connect.plugins.add(P('microsoft-learn').id, { versionId: P('ralph-loop').versionId }),
  ),
);

// Scenario: plugins.add(microsoft-learn) then plugins.remove. Expected: gone from the list.
await test('E7', 'plugins.remove', async () => {
  await connect.plugins.add(P('microsoft-learn').id);
  await connect.plugins.remove(P('microsoft-learn').id);
  const list = await connect.plugins.list();
  ok(!list.some((x) => x.name === 'microsoft-learn'), 'still listed');
  return list.map((p) => p.name);
});

// Scenario: plugins.remove of a plugin not in the project. Expected: 404.
await test('E8', 'plugins.remove of a plugin not in the project is 404', () =>
  rejects(() => connect.plugins.remove(P('teaching').id), { type: ConnectNotFoundError }),
);
