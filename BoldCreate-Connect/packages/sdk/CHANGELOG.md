# Changelog

Both SDKs (`@syncfusion/boldcreate-connect` and `Syncfusion.BoldCreate.Connect`) use the same version number and share this log. Semantic versioning: a new method or option is a minor version; a removed or changed one is a major version announced one minor version before.

## Unreleased

- A sync that left something out no longer keeps an older revision either: it keeps none, so the next call always compares the whole manifest. Before, a server that came back to that older revision (a plugin added, then removed) answered "not modified" and the removed plugin's files stayed.
- With hooks allowed, a hook's scripts (files that start with `#!`) are made runnable; every other file keeps the fixed mode without the execute bit.

## 0.1.0

- First release of both SDKs. Same names and behavior: `ConnectClient`, `ConnectSession`, the six error classes, `toMcpConfig` / `ToMcpConfig`, `syncPlugins` / `SyncPluginsAsync`, webhook verification, and the shared lock file format.
- GET, PUT and DELETE retry on 429, 502, 503 and network errors (3 retries, 250 ms doubling, 10 s at most, `Retry-After` honored); the settings are configurable and 0 turns retrying off. A POST is retried only when it carries an idempotency key.
- Idempotency: session creation and connection start send an `Idempotency-Key` (one per call, kept across retries), so a POST that fails on the network or with 429/502/503 is retried and the API answers a repeat with the first answer. `idempotencyKey` / `IdempotencyKey` in the create options sets your own key; a renewed session always gets a new one.
- Cancellation: `withSignal(signal)` in TypeScript, a `CancellationToken` on every call in .NET.
- `invalid_base_url`: the base address must be https (http only for localhost unless `allowInsecureHttp` / `AllowInsecureHttp`).
- User ids must have 1 to 255 characters; an empty plugin list is refused (`invalid_plugins`).
- A sync that left something out (a kept file, a skipped hook) no longer advances the stored revision, so the next call looks at the whole manifest again.
- .NET only: dependency injection, `GetSessionAsync` with `ISessionCache`, `ActivitySource`, `Testing.FakeConnectHandler`.
