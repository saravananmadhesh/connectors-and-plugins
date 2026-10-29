/**
 * End-to-end test of the TypeScript SDK (`packages/sdk`) against a running Connect stack.
 * The cases live in ./cases, one file per group; this file runs them in order.
 *
 * How to run
 *   1. pnpm install && pnpm build && pnpm dev            (from the repo root)
 *   2. node examples/sdk-test/setup-local.mjs            (once; publishes plugins, makes keys)
 *   3. node examples/sdk-test/run.mjs                    every group
 *      node examples/sdk-test/run.mjs K M                only groups K and M (in this order)
 *      node examples/sdk-test/cases/m-sync.mjs           one group file on its own
 *   Options: SDK_TEST_BASE_URL (default http://localhost:3002, the gateway), SDK_TEST_STATE
 *   (default examples/sdk-test/.local/state.json), SDK_TEST_ONLY=A,K (another way to pick groups),
 *   SDK_TEST_WEBHOOK_LOG (deliveries your webhook receiver saved, checked in J7) and
 *   SDK_TEST_MCP_LOG (what the MCP servers received, checked in L4), and SDK_TEST_SYNC_DIR (keep
 *   the files groups M and Q sync, under <dir>/ts-<run id>/; by default they go to a temporary
 *   folder that is deleted at the end).
 *   Results: one line per case on stdout, then "<passed>/<total> passed". A full run writes
 *   examples/sdk-test/.local/ts-results.json; a partial run writes ts-results-<groups>.json.
 *
 * Groups (file in ./cases)                         What they cover
 *   A  a-options.mjs              client options and input checks (offline, no server needed)
 *   B  b-keys.mjs                 project, wrong, For You and Platform keys: which the SDK accepts where
 *   D  d-sessions.mjs             create options, idempotency, list, get, delete, refresh, limits
 *   C  c-users.mjs                list, filters, paging, setName, per-user installs
 *   E  e-project-plugins.mjs      project plugins ("platform" for everyone): list, catalog, add, update, remove
 *   F  f-install-policy.mjs       install mode, allow-list, plugin sets
 *   G  g-auth-configs.mjs         list, setVariables (Context7 key)
 *   H  h-connections.mjs          list, start on a no-auth server, delete
 *   I  i-logs-usage.mjs           audit logs and usage
 *   J  j-webhooks.mjs             verify (good, tampered, old), deliveries, a real delivery
 *   K  k-session.mjs              session self-service ("For you"), manifest and component download
 *   L  l-mcp.mjs                  MCP through the session: initialize, tools/list, tools/call
 *   M  m-sync.mjs                 file sync with syncPlugins
 *   N  n-foryou-platform-keys.mjs For You (fyk_) and Platform (plk_) keys on the SDK and the gateway
 *   O  o-retry-cancel.mjs         cancellation, timeout, retry
 *   Q  q-components.mjs           one component on or off for one user
 *
 * Expected result: every case passes, except the findings the test report lists as open.
 * Plugins used: boldcreate-toolkit (skills, agents, rules, hook), cursor-team-kit, ralph-loop
 * and continual-learning (hooks), teaching, create-plugin, and the HTTP MCP plugins deepwiki and
 * microsoft-learn (no auth) and context7 (needs CONTEXT7_API_KEY).
 *
 * The keys and the session tokens are never printed.
 */
import { markFullRun } from './cases/lib.mjs';

// D runs before C because C, H and I act on the user that D makes.
const GROUPS = {
  A: 'a-options',
  B: 'b-keys',
  D: 'd-sessions',
  C: 'c-users',
  E: 'e-project-plugins',
  F: 'f-install-policy',
  G: 'g-auth-configs',
  H: 'h-connections',
  I: 'i-logs-usage',
  J: 'j-webhooks',
  K: 'k-session',
  L: 'l-mcp',
  M: 'm-sync',
  N: 'n-foryou-platform-keys',
  O: 'o-retry-cancel',
  Q: 'q-components',
};

const picked = process.argv.slice(2).map((g) => g.toUpperCase());
const unknown = picked.filter((g) => !GROUPS[g]);
if (unknown.length > 0) {
  process.stderr.write(
    `Unknown group ${unknown.join(', ')}; use ${Object.keys(GROUPS).join(' ')}\n`,
  );
  process.exit(2);
}
if (picked.length === 0) markFullRun();

for (const group of picked.length > 0 ? picked : Object.keys(GROUPS)) {
  await import(`./cases/${GROUPS[group]}.mjs`);
}
