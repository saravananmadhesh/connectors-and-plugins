# Connect an agent, IDE, CLI or product

Endpoint reference: the generated `docs/openapi/v1.json` (public) and `internal-v1.json` (internal). Run `pnpm build` to produce them.

## Setup (same for everyone)

A member signs in to the web app, installs plugins for the org or themselves, fills variables, clicks _Connect_ on OAuth servers, then creates an organization API key and copies it. The key is shown once. Key types and rules: [security.md](../architecture/security.md).

API conventions: base `/v1`, plural kebab-case, scope prefixes `/v1/orgs/{orgId}` (org), `/v1/orgs/{orgId}/me` (user); JSON `camelCase`; errors `{ error: { code, message, requestId } }`; opaque cursors; writes accept `Idempotency-Key`; secrets are write-only.

## Who uses the API

| Who                                       | Credential                               | Can                                                                                         |
| ----------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| Website member                            | Website session                          | Everything their role allows                                                                |
| Direct API user (IDE, CLI, agent, script) | Organization key made in the website     | Use tools and download plugin files only (`mcp:list`, `mcp:call`, `artifact:*`); not manage |
| Host server (company with its own app)    | Project key (`prk_`)                     | Manage its project's users, plugins, sessions and connections within the key's scopes       |
| Host's end user                           | Session token (`stk_`), made by the host | Sync plugin files, list its MCP servers, sign in to them, call tools through the gateway    |
| App manager                               | Website session                          | Manage the app and keys; read-only console of the app's orgs (metadata only)                |
| Platform admin                            | Admin app session                        | Catalog, review, platform audit, suspend apps                                               |

Managing an org by script without the website is not supported yet. Host products use projects and the client package (see the levels below).

## Level 1: MCP only (Cursor, Claude Code, VS Code, any MCP client)

Add the gateway as a Streamable HTTP MCP server with header `Authorization: Bearer <key>`:

- `https://<gateway>/mcp`: every server the key may see, tools named `{server}__{tool}`.
- `https://<gateway>/{server}/mcp`: one server, plain tool names.

A personal key calls upstream servers with that member's own logins; an unconnected member gets an error carrying the authorize URL.

## Level 2 and 3: sync plugin files, then use MCP

Set `BOLDCREATE_INTEGRATIONS_URL` (the gateway host, the only host needed) and `BOLDCREATE_INTEGRATIONS_API_KEY`. Working clients in Python and Node.js are in `examples/deepagents/`.

```
GET  /v1/sync?target=generic&kinds=skill,rule,agent,mcp   (If-None-Match: etag)
       304 -> reuse local copy | 200 -> manifest
for each archive with a new sha256:
GET  /v1/plugin-versions/{versionId}/archive              (Authorization: Bearer <key>)
       verify sha256, extract idempotently
POST /v1/sync/reports   {applied, skipped}
```

Manifest shape:

```json
{
  "etag": "9f2c…",
  "plugins": [
    {
      "pluginId": "plg_…",
      "name": "…",
      "version": "1.4.0",
      "scope": "org",
      "yanked": false,
      "archive": { "sha256": "…", "sizeBytes": 18234, "href": "/v1/plugin-versions/pv_…/archive" },
      "components": [{ "kind": "skill", "name": "…", "path": "skills/x/SKILL.md" }]
    }
  ],
  "mcp": { "url": "https://<gateway>/mcp", "transport": "streamable_http" },
  "pollAfterSeconds": 300,
  "skipped": [{ "kind": "hook", "reason": "target_unsupported" }]
}
```

- The effective set is what the key can see, filtered to the `kinds` the client supports; unsupported kinds come back as `skipped`.
- No storage URL is ever returned; every download goes through `href` with the key. Archives are immutable and addressed by `sha256`.
- `pinned` installs change only on explicit upgrade; `follow_latest` follows the newest approved version. Either way the `etag` changes and only changed archives download.

## Client rules

- Keep the key in memory or a secrets store; never in logs, checkpoints or the synced folder.
- Treat archives as untrusted: verify `sha256`, block path traversal and symlinks, cap size, extract into a namespaced directory.
- Never execute hooks unless the runtime has an explicit hook engine.
- Honour `pollAfterSeconds` and `Retry-After`; a wrong-org or unknown resource is `404`.
- One key per user is the norm; products with many users give each user a project session, or use the organization key for shared agents.

## Level 4: a host product with the client package

A company with its own app creates a **project** in the console, makes a **project key** (`prk_`) and installs `@syncfusion/boldcreate-connect` on its server. The key stays on the server. Each of the host's users gets a **session** (`stk_`) that an agent or the host's browser code uses for that user only. Users are implicit: the first session creates the user, and a read for an unknown `userId` is an empty page.

```ts
import { ConnectClient } from '@syncfusion/boldcreate-connect';
import { syncPlugins } from '@syncfusion/boldcreate-connect/sync';

const connect = new ConnectClient({ apiKey: process.env.CONNECT_PROJECT_KEY! });

await connect.plugins.add('plg_…'); // once: the plugins your users get
// A plugin with an MCP server can be set up in the same call; it is all stored or none:
// await connect.plugins.add('plg_…', {
//   authConfigs: { 'server-name': { name: 'Default', authMode: 'dcr' } },
//   variables: { API_TOKEN: process.env.API_TOKEN! },
// });
const session = await connect.create('user-42'); // a session for one of your users
const servers = await session.mcp(); // MCP servers; the token is in their headers
await syncPlugins(session, { dir: '/data/agents/user-42' }); // skills, rules, agents on disk
const request = await session.authorize('some-server', {
  callbackUrl: 'https://yourapp.example/back',
});
// send the user to request.redirectUrl, then: await request.waitForConnection();
```

### Host SDKs

| Language              | Package                          | Reference                                                     |
| --------------------- | -------------------------------- | ------------------------------------------------------------- |
| TypeScript (Node 24+) | `@syncfusion/boldcreate-connect` | `packages/sdk/README.md`                                      |
| .NET 8+               | `Syncfusion.BoldCreate.Connect`  | `packages/sdk-dotnet/Syncfusion.BoldCreate.Connect/README.md` |

Both have the same type names, error codes, defaults and sync lock file, and release at the same version with one changelog (`packages/sdk/CHANGELOG.md`). Releasing: [sdk-release.md](sdk-release.md).

A runnable script with a test is in `examples/project-host/`; the .NET version is in `examples/project-host-dotnet/`. The package reference is `packages/sdk/README.md`; events are in [webhooks.md](webhooks.md).

### Rules a host follows

- **Sessions.** A session lasts 30 days by default and at most 365, and deleting it ends it at once. A marketplace session names no plugin allow list, so a plugin the user installs later appears without a new session. Reuse a session instead of minting one per request: a user may have 20 live sessions.
- **Keys.** Never put the project key in a browser, a log or a file the user can read. Rotate it by creating the second key, switching, then revoking the first; a key can be limited to addresses.
- **Limits.** Read the rate limit headers and back off on `429`; the client does this for reads and for `PUT` and `DELETE`, and repeats a `POST` only when it carries an idempotency key. A marketplace page reads `GET /v1/project/user-plugins?userId=` instead of keeping a copy. Polling it counts against the project budget (3,000 a minute), so refresh on a webhook event rather than on a timer.
- **Webhooks.** Deliveries repeat after a failure, so dedupe by event id.
- **Files.** The client checks every archive against its hash, refuses unsafe paths, keeps a file the user changed by hand, and places hooks only when you ask. The token is never written to disk; MCP files carry `${CONNECT_TOKEN}`.

### Who can do what: console, host and session token

The console administers; the host delivers; a session token acts as one user. Only rows with a host route are open to a project key.

| Action                                                   | Console                 | Host (project key)                           | Session token                  |
| -------------------------------------------------------- | ----------------------- | -------------------------------------------- | ------------------------------ |
| Create, update, delete a project                         | yes                     | no (console only)                            | no                             |
| Issue, list, revoke, rotate, address-limit project keys  | yes                     | no (a key never issues keys)                 | no                             |
| Read the project the key belongs to                      | yes                     | `GET /v1/project/me`                         | no                             |
| Create a user, set its display name                      | no (users are implicit) | `PUT /v1/project/users`                      | created by a session           |
| List users, find one by `userId`                         | yes                     | `GET /v1/project/users?userId=`              | no                             |
| Delete a user                                            | yes                     | no (console only)                            | no                             |
| Add, list, remove project plugins                        | yes                     | `/v1/project/plugins`                        | no                             |
| Auth configs and their variables                         | yes                     | `/v1/project/auth-configs`                   | no                             |
| User installs, allowed catalog, plugin sets              | yes                     | `/v1/project/user-plugins`, catalog routes   | the user's own installs        |
| Create, list, read, revoke sessions (with a tool policy) | yes                     | `/v1/project/sessions`                       | no                             |
| Start a connection (sign-in to an MCP server)            | no                      | `POST /v1/project/connections` with `userId` | `POST /v1/session/connections` |
| List, remove a user's connections                        | yes                     | `/v1/project/connections`                    | own list                       |
| Sync, download component archives                        | no                      | no                                           | `/v1/sync...`                  |
| Call tools through the gateway                           | no                      | no                                           | yes, only here                 |
| Logs and delivery tracking                               | yes                     | `GET /v1/project/logs`                       | no                             |
| Usage per project (active users, calls, errors)          | yes                     | `GET /v1/project/usage`                      | no                             |
| Project webhook: set, rotate the secret                  | yes                     | no                                           | no                             |
| Webhook deliveries                                       | yes                     | read only                                    | no                             |

If an action changes the project's shape or who may act, it is console only. If it delivers to or reads about the host's own users, it has a host route with a scope. If it acts as one user, it belongs to the session token.
