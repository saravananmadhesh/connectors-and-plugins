# SDK end-to-end tests

Scripts that call every public function of the TypeScript SDK (`packages/sdk`) and the .NET SDK
(`packages/sdk-dotnet`) against a running Connect stack, for the project ("platform") flow, the
session ("For you") flow, and the For You and Platform keys. Each case says its scenario and its
expected result in a comment above it.

| Path                                       | What it is                                                           |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `setup-local.mjs`                          | Publishes the test plugins, makes the org, project, keys and webhook |
| `run.mjs`                                  | Runs every TypeScript group, or the groups you name                  |
| `cases/<group>.mjs`                        | TypeScript SDK cases, one file per group (`cases/lib.mjs` is shared) |
| [`../sdk-test-dotnet`](../sdk-test-dotnet) | .NET SDK cases: `Program.cs` runs them, `Cases/` has one file each   |

## Run it

```sh
pnpm install && pnpm build
pnpm dev                                         # in its own terminal
node examples/sdk-test/setup-local.mjs           # once; run again any time, it skips what exists

node examples/sdk-test/run.mjs                   # every TypeScript group
node examples/sdk-test/run.mjs K M               # only groups K and M
node examples/sdk-test/cases/m-sync.mjs          # one group file on its own

dotnet run --project examples/sdk-test-dotnet          # every .NET group
dotnet run --project examples/sdk-test-dotnet -- K M   # only groups K and M
```

`setup-local.mjs` reads `syncfusion/BoldCreate-Plugins` at `main` by default; set
`SDK_TEST_REF` (and `SDK_TEST_OWNER`) to read another branch. It writes the keys to
`.local/state.json`, which git ignores. A full run writes `.local/ts-results.json` and
`.local/dotnet-results.json`; a run of some groups writes `ts-results-<groups>.json` or
`dotnet-results-<groups>.json`.

Optional settings: `SDK_TEST_BASE_URL` (default `http://localhost:3002`, the gateway),
`SDK_TEST_ONLY=A,K` (another way to pick groups), `SDK_TEST_WEBHOOK_LOG` (a JSON-lines file of
webhook deliveries your receiver saved, checked with `webhooks.verify`), and `SDK_TEST_MCP_LOG`
(what the MCP servers received, to check that a session token never reaches them).

## Groups

| Group | TypeScript file              | .NET file                | What it covers                                              |
| ----- | ---------------------------- | ------------------------ | ----------------------------------------------------------- |
| A     | `a-options.mjs`              | `AOptions.cs`            | Client options and input checks (offline)                   |
| B     | `b-keys.mjs`                 | `BKeys.cs`               | Project, wrong, For You and Platform keys                   |
| C     | `c-users.mjs`                | `CUsers.cs`              | Users: list, search, names, per-user installs               |
| D     | `d-sessions.mjs`             | `DSessions.cs`           | Sessions: create, idempotency, list, refresh, limits        |
| E     | `e-project-plugins.mjs`      | `EProjectPlugins.cs`     | Project plugins and the catalog                             |
| F     | `f-install-policy.mjs`       | `FInstallPolicy.cs`      | Install mode, allow-list, plugin sets                       |
| G     | `g-auth-configs.mjs`         | `GAuthConfigs.cs`        | Auth configs and variables                                  |
| H     | `h-connections.mjs`          | `HConnections.cs`        | Connections                                                 |
| I     | `i-logs-usage.mjs`           | `ILogsUsage.cs`          | Audit logs and usage                                        |
| J     | `j-webhooks.mjs`             | `JWebhooks.cs`           | Webhook signatures and deliveries                           |
| K     | `k-session.mjs`              | `KSession.cs`            | Session self-service, manifest, component download, report  |
| L     | `l-mcp.mjs`                  | `LMcp.cs`                | MCP calls through the session                               |
| M     | `m-sync.mjs`                 | `MSync.cs`               | File sync (`syncPlugins` / `SyncPluginsAsync`)              |
| N     | `n-foryou-platform-keys.mjs` | `NForYouPlatformKeys.cs` | For You and Platform keys on the gateway, including sync    |
| O     | `o-retry-cancel.mjs`         | `ORetryCancel.cs`        | Cancellation, timeout, retry                                |
| P     |                              | `PDotnetOnly.cs`         | .NET only: session cache, dependency injection, enumerators |
| Q     | `q-components.mjs`           | `QComponents.cs`         | One component on or off for one user                        |

Each group can run on its own: what it shares with other groups (the user group D makes, the
session groups K, L and O use, the sync folder) is made by `cases/lib.mjs` or `Lib.cs` when needed.

### Sync and download cases

- Manifest (`GET /v1/sync`): K16, K17. Component download (`GET /v1/sync/components/{sha256}`):
  K18, K19, K20. Sync report (`POST /v1/sync/report`): K21, M12.
- File sync end to end: M1 to M13 (and M14 in .NET, which checks the lock is shared with the
  TypeScript SDK). For You key sync: N2, N3. Sync after turning a component off and on: Q5, Q6.

## Plugins used

Non-MCP: `boldcreate-toolkit`, `cursor-team-kit`, `ralph-loop`, `continual-learning`, `teaching`,
`create-plugin`. HTTP MCP without sign-in: `deepwiki`, `microsoft-learn`. HTTP MCP with a key:
`context7` (the tests set a dummy `CONTEXT7_API_KEY`, so a real Context7 call answers 401).
