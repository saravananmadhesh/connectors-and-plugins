# A host product with the client package

One server script for a host that gives each of its users plugins, MCP servers and files through
`@syncfusion/boldcreate-connect`. The .NET version is in [`../project-host-dotnet`](../project-host-dotnet). Guide: [integration.md](../../docs/guides/integration.md).

| File                    | What it is                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `host.mjs`              | Reuses a session per user, syncs plugin files, writes the MCP file, lists sign-in links |
| `run.mjs`               | Runs `host.mjs` against a real project with the installed package                       |
| `project-host.test.mjs` | Checks `host.mjs` with a fake `fetch`; no network, no project key                       |

## Run it

1. In the console, create a project and a project key with the scopes `sessions:write`,
   `sessions:read` and `plugins:read`, and add the plugins your users should have.
2. `npm install @syncfusion/boldcreate-connect`, then:

```sh
CONNECT_PROJECT_KEY=prk_... CONNECT_USER_ID=user-42 CONNECT_DIR=./agents node run.mjs
```

The output lists the files placed, the servers found and a sign-in link for every server the user
still has to connect. Send the user to the link; the session then works without another call.

## Test it

```sh
pnpm build
node --test examples/project-host/project-host.test.mjs
```

The test uses the built package in `packages/sdk/dist`, so run the build first.

## Rules the script follows

- The project key stays on the server. The browser gets a session token or nothing.
- One session per user is reused until a day before it ends (20 live sessions per user at most).
- The token is never written to disk; the MCP file holds `${CONNECT_TOKEN}`.
