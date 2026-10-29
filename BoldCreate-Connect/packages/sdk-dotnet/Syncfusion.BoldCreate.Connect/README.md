# Syncfusion.BoldCreate.Connect

.NET client for hosts of BoldCreate Connect: manage the users, plugins, sessions, connections and logs of a project from your server, and give each of your users a session that an agent can use. It has the same names and behavior as the TypeScript package `@syncfusion/boldcreate-connect`.

.NET 8 or later. One package; the namespaces below are inside it.

| Namespace                                  | For                                                   |
| ------------------------------------------ | ----------------------------------------------------- |
| `Syncfusion.BoldCreate.Connect`            | client, session, errors, models, webhooks, MCP config |
| `Syncfusion.BoldCreate.Connect.Sync`       | placing plugin files in a folder (`SyncPluginsAsync`) |
| `Syncfusion.BoldCreate.Connect.Extensions` | `AddBoldCreateConnect` for dependency injection       |
| `Syncfusion.BoldCreate.Connect.Testing`    | `FakeConnectHandler` for your own tests               |

## Use

```csharp
using Syncfusion.BoldCreate.Connect;

// A project key (prk_...). Keep it on your server.
using var client = new ConnectClient(new ConnectClientOptions
{
    ApiKey = Environment.GetEnvironmentVariable("CONNECT_PROJECT_KEY")!,
});

// A session for one user of yours. The user is added to the project if new.
var session = await client.CreateAsync("user-42", new CreateSessionOptions { Plugins = ["code-review"] });

// The MCP servers an agent can use, with the session token in their headers.
var servers = await session.McpAsync();
var text = servers.ToMcpConfig(new McpConfigOptions { Format = McpConfigFormat.Standard }); // ${CONNECT_TOKEN} placeholder

// A server that needs a sign-in: send the user to RedirectUrl, then wait.
var request = await session.AuthorizeAsync("code-review-github", "https://yourapp.example/connected");
var connection = await request.WaitForConnectionAsync();
```

`Plugins = null` means no allow list; an empty list is refused because Connect reads it as "everything the user can see".

## Dependency injection

```csharp
using Syncfusion.BoldCreate.Connect.Extensions;

builder.Services.AddBoldCreateConnect(builder.Configuration.GetSection("Connect")); // or o => o.ApiKey = ...
builder.Services.AddBoldCreateConnectMemorySessionCache();                          // optional

// Inject ConnectClient and call GetSessionAsync(userId, options): it reuses a live session.
```

`appsettings.json`: `{ "Connect": { "ApiKey": "...", "BaseUrl": "https://api.boldcreate.com", "Timeout": "00:00:30", "Retry": { "MaxRetries": 3 } } }`. Implement `ISessionCache` to keep sessions in Redis; a cached session holds its token, so encrypt it there.

## Plugin files

```csharp
using Syncfusion.BoldCreate.Connect.Sync;

var result = await session.SyncPluginsAsync(new SyncOptions { Dir = "/data/agents/user-42" });
// result.Added, Updated, Removed, Unchanged, Skipped, Modified, Stale
```

Files are checked against their hash before they are placed. A file changed by hand is kept and listed in `Modified` (`OnConflict = ConflictMode.Overwrite` replaces it). Hooks are placed only with `AllowHooks = true`; their scripts (files that start with `#!`) are then made runnable, and no other file is. The token is never written to disk. The lock file is the same as the TypeScript package's, so one folder can be synced by either.

## Webhooks

```csharp
var evt = Webhooks.Verify(new VerifyWebhookOptions { RawBody = bodyBytes, Headers = headers, Secret = secret });
```

Pass the body exactly as it arrived. A timestamp more than 300 seconds off is refused. Deliveries repeat, so skip an event id you have seen.

## Errors

`ConnectError` has `Code`, `Status` and `RequestId`. Subclasses: `ConnectAuthError`, `ConnectNotFoundError`, `ConnectRateLimitError` (`RetryAfterSeconds`), `ConnectIntegrityError`, `ConnectSetupRequiredError` (`Setup`). The codes are the same as in TypeScript (`invalid_key`, `invalid_base_url`, `invalid_option`, `invalid_user_id`, `invalid_plugins`, `invalid_response`, `network_error`, `timeout`, `webhook_invalid`, `archive_unsafe`, `lock_owner_mismatch`, and the codes of the API). A cancelled call throws `OperationCanceledException`. Keys never appear in messages or logs.

## Settings

| Setting                                       | Default                                  |                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BaseUrl`                                     | `https://api.boldcreate.com`             | must be https; http only for localhost unless `AllowInsecureHttp`                                                                                        |
| `Timeout`                                     | 30 s                                     | per attempt                                                                                                                                              |
| `Retry.MaxRetries` / `BaseDelay` / `MaxDelay` | 3 / 250 ms / 10 s                        | GET, PUT and DELETE only; a POST is retried only with an idempotency key; `Retry-After` is honored up to `MaxDelay`; `MaxRetries = 0` turns retrying off |
| Idempotency                                   | a key per `CreateAsync` and `StartAsync` | sent as `Idempotency-Key` and kept across retries, so those POSTs are retried too; `CreateSessionOptions.IdempotencyKey` sets your own                   |
| `HttpClient`                                  | one the client owns                      | pass `IHttpClientFactory` clients to share handlers and proxies                                                                                          |
| `Logger`                                      | none                                     | retries only: method and status, never a path, header or body                                                                                            |
| `SessionCache`, `SessionRenewMargin`          | none, 5 min                              | used by `GetSessionAsync`                                                                                                                                |

Tracing: an `ActivitySource` named `Syncfusion.BoldCreate.Connect` records method and status code.

## TypeScript names

| TypeScript                               | .NET                                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `new ConnectClient({ apiKey })`          | `new ConnectClient(new ConnectClientOptions { ApiKey = ... })`                     |
| `client.create(userId, { plugins })`     | `await client.CreateAsync(userId, new CreateSessionOptions { Plugins = ... }, ct)` |
| `client.users.install(userId, pluginId)` | `await client.Users.InstallAsync(userId, pluginId, null, ct)`                      |
| `session.mcp()`                          | `await session.McpAsync(null, ct)`                                                 |
| `toMcpConfig(servers, { format })`       | `servers.ToMcpConfig(new McpConfigOptions { Format = ... })`                       |
| `syncPlugins(session, { dir })`          | `await session.SyncPluginsAsync(new SyncOptions { Dir = ... }, ct)`                |
| `client.webhooks.verify(...)`            | `client.Webhooks.Verify(...)`                                                      |
