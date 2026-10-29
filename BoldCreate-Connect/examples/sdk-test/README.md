# SDK end-to-end tests

Scripts that call every public function of the TypeScript SDK (`packages/sdk`) and the .NET SDK
(`packages/sdk-dotnet`) against a running Connect stack, for the project ("platform") flow, the
session ("For you") flow, and the For You and Platform keys. Each case says its scenario and its
expected result in a comment above it.

| File                                       | What it is                                                           |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `setup-local.mjs`                          | Publishes the test plugins, makes the org, project, keys and webhook |
| `run.mjs`                                  | TypeScript SDK cases (groups A to O)                                 |
| [`../sdk-test-dotnet`](../sdk-test-dotnet) | .NET SDK cases (same groups, plus P for what only .NET has)          |

## Run it

```sh
pnpm install && pnpm build
pnpm dev                                   # in its own terminal
node examples/sdk-test/setup-local.mjs     # once; run again any time, it skips what exists
node examples/sdk-test/run.mjs
dotnet run --project examples/sdk-test-dotnet
```

`setup-local.mjs` reads `syncfusion/BoldCreate-Plugins` at `master` by default; set
`SDK_TEST_REF` (and `SDK_TEST_OWNER`) to read another branch. It writes the keys to
`.local/state.json`, which git ignores. Results go to `.local/ts-results.json` and
`.local/dotnet-results.json`.

Optional settings: `SDK_TEST_BASE_URL` (default `http://localhost:3002`, the gateway),
`SDK_TEST_ONLY=A,K` to run some groups, `SDK_TEST_WEBHOOK_LOG` (a JSON-lines file of webhook
deliveries your receiver saved, checked with `webhooks.verify`), and `SDK_TEST_MCP_LOG` (what the
MCP servers received, to check that a session token never reaches them).

## Plugins used

Non-MCP: `boldcreate-toolkit`, `cursor-team-kit`, `ralph-loop`, `continual-learning`, `teaching`,
`create-plugin`. HTTP MCP without sign-in: `deepwiki`, `microsoft-learn`. HTTP MCP with a key:
`context7` (the tests set a dummy `CONTEXT7_API_KEY`, so a real Context7 call answers 401).
