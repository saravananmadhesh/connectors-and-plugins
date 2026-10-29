# @syncfusion/boldcreate-connect

Client for hosts: manage the users, plugins, sessions, connections and logs of a project from your server, and give each of your users a session that an agent can use.

Node 24 or later. No runtime dependencies.

## Use

```ts
import { ConnectClient } from '@syncfusion/boldcreate-connect';

// A project key (prk_...). Keep it on your server.
const connect = new ConnectClient({ apiKey: process.env.CONNECT_PROJECT_KEY! });

// A session for one user of yours. The user is added to the project if new.
const session = await connect.create('user-42', { plugins: ['code-review'] });

// The MCP servers an agent can use, with the session token in their headers.
const servers = await session.mcp();

// A server that needs a sign-in: send the user to redirectUrl, then wait.
const request = await session.authorize('code-review-github', {
  callbackUrl: 'https://yourapp.example/connected',
});
const connection = await request.waitForConnection();
```

Reuse a session instead of making one per request: a user may have 20 live sessions. A session lasts 30 days by default and at most 365; deleting it ends it at once.

## Plugin files

`@syncfusion/boldcreate-connect/sync` puts the files of a user's plugins into a folder and keeps them current.

```ts
import { syncPlugins, toMcpConfig } from '@syncfusion/boldcreate-connect/sync';

const result = await syncPlugins(session, { dir: '/data/agents/user-42' });
// { added, updated, removed, unchanged, skipped, modified, stale }

// The text of an MCP configuration file. The token is a ${CONNECT_TOKEN} placeholder
// unless you pass { literalToken: true }.
const text = toMcpConfig(await session.mcp(), { format: 'standard' });
```

Files are checked against their hash before they are placed. A file changed by hand is kept and listed in `modified` (pass `onConflict: 'overwrite'` to replace it). Hooks are placed only with `allowHooks: true`; their scripts (files that start with `#!`) are then made runnable, and no other file is. The token is never written to disk.

## Webhooks

```ts
const event = connect.webhooks.verify({ rawBody, headers, secret });
```

Pass the body exactly as it arrived. A timestamp more than 300 seconds off is refused. Deliveries repeat, so skip an event id you have seen.

## Errors

`ConnectError` has `code`, `status` and `requestId`. Subclasses: `ConnectAuthError`, `ConnectNotFoundError`, `ConnectRateLimitError` (`retryAfterSeconds`), `ConnectIntegrityError`, `ConnectSetupRequiredError` (`setup`). Keys never appear in messages. Methods reject with these errors; they never throw before returning a promise.

## Settings

| Option                                         | Default                      |                                                                                                                                                                   |
| ---------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseUrl`                                      | `https://api.boldcreate.com` | must be https; http only for localhost unless `allowInsecureHttp: true`                                                                                           |
| `timeoutMs`                                    | 30000                        | per attempt                                                                                                                                                       |
| `retry.maxRetries` / `backoffMs` / `maxWaitMs` | 3 / 250 / 10000              | GET, PUT and DELETE on `429`, `502`, `503` and network errors, honouring `Retry-After`; `maxRetries: 0` turns it off; a POST retries only with an idempotency key |
| `signal`                                       | none                         | cancels every call; `client.withSignal(AbortSignal.timeout(5000))` gives one scope (a session has `withSignal` too)                                               |
| `fetch`                                        | global `fetch`               | for a proxy or a test                                                                                                                                             |

A session creation and a connection start carry an `Idempotency-Key` (made for each call, or your own with `create(userId, { idempotencyKey })`), so they are retried too and a repeat answers with the first result. A user id must have 1 to 255 characters. `create` refuses an empty `plugins` list (Connect reads it as "everything the user can see"); leave `plugins` out for no allow list.

Both SDKs share names, error codes, defaults and the sync lock file; see the table in the [.NET README](../sdk-dotnet/Syncfusion.BoldCreate.Connect/README.md) and [CHANGELOG.md](CHANGELOG.md).

## Names

If `ConnectClient` clashes with another import, alias it (`import { ConnectClient as BoldcreateConnect } from '@syncfusion/boldcreate-connect'`) or use a namespace import (`import * as bc from '@syncfusion/boldcreate-connect'`).
