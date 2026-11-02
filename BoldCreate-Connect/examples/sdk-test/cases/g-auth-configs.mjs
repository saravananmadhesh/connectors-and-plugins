/**
 * Group G: Auth configs
 * TypeScript SDK end-to-end cases for auth configs: list, setVariables (the Context7 key), custom and invalid variable names.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/g-auth-configs.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-g.json (this file alone).
 */
import { state, RUN, uid, test, ok, rejects, connect, rawGateway, mcpComponents } from './lib.mjs';

let context7Component;
let deepwikiComponent;

// Scenario: authConfigs.list() before the console made any. Expected: an array (empty here;
// a server with no auth, or one that reads variables, has no auth config of its own).
await test('G1', 'authConfigs.list', async () => {
  ({ context7Component, deepwikiComponent } = await mcpComponents());
  const list = await connect.authConfigs.list();
  ok(Array.isArray(list), 'not an array');
  return {
    configs: list.map((a) => `${a.pluginName}:${a.authMode}`),
    context7Component,
    deepwikiComponent,
  };
});

// Scenario: POST /v1/project/auth-configs (shared_secret for Context7) with the project key -
// the SDK has no create call - then authConfigs.list(). Expected: the SDK lists the new config,
// secretSet true, the secret never returned. The config is deleted afterwards.
await test('G1b', 'an auth config made through the API shows in authConfigs.list', async () => {
  const made = await rawGateway('POST', '/v1/project/auth-configs', state.projectKey, {
    componentId: context7Component,
    name: `c7-${RUN}`,
    authMode: 'shared_secret',
    secret: 'ctx7-shared-secret-0001',
  });
  ok(
    made.status === 200 || made.status === 201,
    `create ${made.status} ${JSON.stringify(made.json).slice(0, 200)}`,
  );
  const listed = (await connect.authConfigs.list()).find((a) => a.id === made.json.id);
  const del = await rawGateway(
    'DELETE',
    `/v1/project/auth-configs/${made.json.id}`,
    state.projectKey,
  );
  ok(listed?.secretSet === true, `listed ${JSON.stringify(listed)}`);
  ok(!JSON.stringify(listed).includes('ctx7-shared-secret'), 'secret read back');
  return {
    id: made.json.id,
    authMode: listed.authMode,
    secretSet: listed.secretSet,
    deleted: del.status,
  };
});

// Scenario: authConfigs.setVariables(context7 component, { CONTEXT7_API_KEY }). Expected: the
// server becomes ready for users (session.authConfigs shows ready); the value is never returned.
await test('G2', 'authConfigs.setVariables sets a project value', async () => {
  ok(context7Component, 'no context7 component id');
  await connect.authConfigs.setVariables(context7Component, {
    CONTEXT7_API_KEY: 'ctx7-test-value-123456',
  });
  const s = await connect.create(uid('g2'));
  const c7 = (await s.authConfigs()).find((a) => a.componentId === context7Component);
  ok(c7?.ready === true, `context7 ${JSON.stringify(c7)}`);
  return { ready: c7.ready, setup: c7.setup };
});

// Scenario: setVariables with a name the plugin does not declare (EXTRA_HEADER_VALUE). Expected:
// accepted, as a custom variable (the API allows custom names in upper case).
await test('G3', 'authConfigs.setVariables accepts a custom variable name', async () => {
  await connect.authConfigs.setVariables(context7Component, { EXTRA_HEADER_VALUE: 'x' });
  await connect.authConfigs.setVariables(context7Component, { EXTRA_HEADER_VALUE: null });
  return 'accepted and cleared';
});

// Scenario: setVariables with a name that is not a variable name ('bad name!'). Expected: 400.
await test('G3b', 'authConfigs.setVariables refuses an invalid name', () =>
  rejects(() => connect.authConfigs.setVariables(context7Component, { 'bad name!': 'x' }), {
    status: 400,
  }),
);
