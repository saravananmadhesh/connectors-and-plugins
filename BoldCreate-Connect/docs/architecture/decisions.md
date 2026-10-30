# Decisions

One-way-door decisions only. Add a section for each new one (context, decision, rejected). Never reuse a heading.

## No connector service, no separate connections

An installed MCP component holds its own configuration in `mcp_server` (auth type, sealed secrets, health, last tools); each member's OAuth tokens live sealed in `mcp_oauth_token`. Probing, discovery and OAuth run in `api` through the SSRF guard; `gateway` calls tools. Up to 10 custom environment variables per installation. Rejected: merging the connector into the gateway (management work on the hot path); a separate connections page (two places to configure one server).

## Five services, split by trust boundary

`web`, `admin`, `api`, `gateway`, `worker`. A new deployable needs a different exposure, secret set or scaling profile. Rejected: one app with mode flags (mixed secrets); splitting ingestion, notifications or audit into services; a dedicated artifact service (only if serving targets fail).

## Public ingress through the gateway

Agents use one host and one key. `gateway` serves MCP and forwards sync and archive to the internal `api` with its own workload identity; the archive is streamed. Rejected: exposing `api` publicly; presigned storage URLs (no per-download authorization or audit).

## Per-org HPKE sealing with KMS-wrapped keys

Org key pairs, public key clear, private key wrapped by KMS; secrets sealed with an AAD binding row and tenant. Gives crypto-shredding, per-tenant rotation and secret writes without KMS. Cost: an async key-creation window (`org_key_pending`). Rejected: one master key sealing everything; keeping a legacy envelope beside HPKE.

## Fixed middleware order in a shared bootstrap

`packages/http-server` owns the eleven stages so apps cannot reorder or skip security stages. Rejected: each app wiring its own hooks; reading idempotency records before authentication.

## Brokered downloads only

No storage URL is ever issued; archives are immutable, addressed by SHA-256 and served after authorization with ETag, range and single-flight caching. Unknown and unauthorized versions return the same `404`.

## Keys are created in the website only

Organization keys with presets and required expiry; no device-code login, no delegated identity for host products in release 1.

## Stateless gateway

No sessions or affinity; each request independently authorized; Redis failure falls back to bounded pod caches and fails closed for writes.

## Tools never retried, results never truncated

`tools/call` is not retried; oversize results become error results; upstream errors are redacted.

## Plugins enter only through ingestion

No seed or demo data. First-party sources are trusted; public GitHub sources are for test environments only (disabled in production by config).

## Generated OpenAPI

The route registry in `packages/contracts` is the single source. `pnpm build` writes `docs/openapi/v1.json` (public) and `internal-v1.json` (internal); the files are git-ignored.

## Local data browsers

`pnpm dev` also starts pgweb (pinned release, sha256 checked, `PORT_POSTGRES_UI`, default 8081) for Postgres and Redis Commander (`redis-commander` dev dependency, `PORT_REDIS_UI`, default 8082) for Redis. Both are read-only, loopback only, started only by the dev launcher and linked from the dev dashboard; they never run in tests or deployments. Rejected: a hand-written viewer page in the dashboard (more code to own); RedisInsight and pgAdmin (heavy desktop or container installs).

## Temporary `env-key` key wrapping removed

- **Decision.** The `env-key` adapter (master key from `KMS_ENV_MASTER_KEY`) is removed. Cloud KMS on GCP is available, so staging and production use `KMS_ADAPTER=cloud-kms` with `KMS_CLOUD_KEY_NAME`. The `local` adapter stays as the only non-cloud adapter, for development and tests, and is refused in `staging` and `production`.
- **Local use of Cloud KMS.** `pnpm dev` wraps keys with Cloud KMS when `KMS_CLOUD_KEY_NAME` is set (application-default credentials); use `--reset-db` when switching adapters, because keys wrapped by one adapter cannot be unwrapped by another.
- **Staging data.** Any `org_key` row wrapped with `env-key` cannot be read by Cloud KMS. Re-wrap such rows (unwrap with the old adapter from an earlier build, wrap with Cloud KMS) or reset the data before switching.

## Deleting a plugin removes its archive

- **What it does.** Deleting a plugin (or several at once) from the admin console removes its rows as before. In the same transaction it queues one `plugin_archive.purge_requested` job per 200 archives. The worker, which already holds the storage permission, removes each archive straight away.
- **Why it is immediate.** A plugin that is installed cannot be deleted, so once the rows are gone nothing depends on its archive. A waiting period would protect no one.
- **Archives are shared.** They are stored by content hash, so two versions with the same files use one object. The worker removes an archive only when no plugin version still points at it.
- **A removal that races an ingest cannot leave a dangling version.** Ingestion checks for the archive before writing its rows and again after, and puts it back if it was taken. A repeated ingest of the same files also puts it back.
- **No new permission.** The admin app only records what to remove; it gets no storage access. Removing an object that is already gone is not an error, so a retried job is harmless.
- **Rejected.** Deleting from the admin app after the commit (gives that service storage delete permission and has the same race). A delayed sweep (protects no one, as above). Archives that were orphaned before this change stay until someone removes them.

## Projects, project keys and project users

- **What it does.** A project belongs to an organization and is one host application. A project key (`prk_`) lets the host's server manage that project's users, plugins, sessions, connections and logs. A project user is a person of the host, created the first time the host names them by `userId`. The console shows projects under the organization.
- **Storage.** `project` and `project_key` are new tables with row level security by organization. A project user is a `user` row with `kind = 'external'` and a `project_id`. One domain module creates, finds, lists and deletes them, so no other code filters on `kind`. Installations get a `project` scope.
- **Rejected.** A separate project user table (five foreign key groups point at `user.id`, including connections and keys, so it would change the connect and gateway paths).

## Key prefixes name the use case

- **What it does.** Key ids start with `fyk_` (For You organization), `plk_` (Platform organization), `prk_` (project) or `stk_` (session). One constant in `packages/security/src/token.ts` defines them and every pattern is built from it. A test pins the list.
- **Why.** The product name can change; the use cases will not. No key carries a product name.
- **Rejected.** Keeping `bci*` (it names the product). Prefixes per brand (a rebrand would break issued keys).

## Per component archives and no MCP configuration in archives

- **What it does.** Packing removes `mcp.json` from the plugin archive. Each skill, rule and agent, and the shared hook file with the scripts its commands run (everything in `hooks/` and any plugin file a command names), is its own deterministic archive stored by content hash, with its hash and size on the `component` row. The sync manifest lists each component's hash, the MCP entries with their gateway address, and what setup is missing. Clients compare hashes and download only what changed.
- **Why.** An agent must reach MCP only through the gateway, which holds the secrets and audits calls. Per component hashes keep updates small and let an unchanged component skip a download across versions.
- **Archives are shared.** Two components with the same files use one object. The worker removes an object only when neither a version nor a component still points at it.
- **Rejected.** Rewriting `mcp.json` inside the archive (the upstream address would still ship and a client could use it). One archive per plugin with a client side diff (re-downloads everything for one change).

## Client package `@syncfusion/boldcreate-connect`

- **What it does.** `packages/sdk` is a public package with no runtime dependencies. It wraps the project routes and the sync contract: projects' users, sessions, plugins, auth configs, connections, logs, and the plugin file sync. A `Session` holds the short lived `stk_` token and is the only object a browser or agent holds.
- **Why.** Several applications will call this backend and each should not rewrite the sync, hash and safety rules.
- **Limits.** Types are hand-written and checked against the contracts in tests, so the private `contracts` package is not published. The sync never writes the session token or MCP configuration to disk.
- **Rejected.** Generating the client from OpenAPI (it would not carry the sync behaviour). Publishing `contracts` (exposes internal schemas).

## User installs, allowed catalog and plugin sets

- **What it does.** A project user may install plugins for themselves inside the project (a `user` scope installation with a `project_id`). The project's `user_install_mode` decides what they may install: `any` (default, any plugin visible to the organization; set from `DEFAULT_PROJECT_SETTINGS` in `packages/limits` when a project is created), `allowlist` (the host's allowed plugins and plugin sets) or `off` (no user installs). A session sees the project's installs plus the user's own, the narrowest scope winning, and never the organization's installs. A plugin set is a named list of plugins a session or the allowed catalog can refer to.
- **Why.** Hosts need both fixed plugins for everyone and a choice for each user, and a way to say which choices are allowed. The existing resolver already ranks narrower scopes first.
- **Enforced in the domain.** The install function checks the mode and the allowed catalog; the console and the SDK only reflect it. Installs are pinned, and caps bound the manifest (50 project plugins, 25 own installs, 50 plugins per session).
- **Rejected.** Letting every user install anything (no host control). Session tokens that carry installs (the install belongs to the user, not to one token).

## Three organization roles and database isolation for projects

- **What it does.** Organization roles are `ADMIN`, `MEMBER` (Developer) and `VIEWER`. Admin and Member manage For You (For me, For team) and Platform apps; organization and project configuration is shared by both areas; Admin and Member edit settings, policy and the organization key, and only Admin invites members, changes roles and deletes the organization. A Viewer cannot open organization settings. A Viewer cannot see For You at all and has read only access to Platform. Restrictive row policies on `installation`, `mcp_oauth_token` and `api_key` use `app.project` and `app.subject`, so a project key never sees For You rows and a session sees only its own user's connections; a `user` scope row is visible only to its owner in the database.
- **Why.** The two surfaces (For You and Platform) never share data, and a rule held only in application code is one missed check from a leak.
- **Rejected.** Keeping the old role names for staging and enforcing isolation in code only (a later rename and later policies would break issued data and tests).

## Two organization keys, session keys for people

- **What it does.** An organization has two keys: `fyk_` (For You, the only key of that area; reaches sync, downloads, tool calls and session creation for the For You project) and `plk_` (Platform, manages the organization only; project keys stay `prk_`). A person uses a session key (`stk_`) tied to a project. The personal, team and organization-wide prefixes `pak_`, `tmk_` and `ork_`, the user and team key pages and routes, and the `keys:mint` route are retired. Creating, listing and revoking a `fyk_` key needs the organization `ADMIN`; a `plk_` key may be made, listed and revoked by an `ADMIN` or `MEMBER` (each sees only their own) and acts with its maker's current role, never more. A Viewer holds no key.
- **Why.** Staging has no issued keys, so this is the cheapest time to fix the kinds. One key per area keeps For You and Platform apart, and nothing personal is handed out outside a project.
- **One-way door.** The prefixes, the `api_key_kind_check` constraint (it reads the first four characters of the key id) and the retired kinds cannot change once keys are issued.
- **Rejected.** Keeping personal and team keys next to project sessions (two ways to reach the same data, and a key with no clear area).

## Stored state reads back whole

- **What it does.** One read returns everything a project user has: plugins (own and project provided), components, variables (`isSet` only), setup state and connection status. `GET /v1/project/user-plugins?userId=` for a host, `GET /v1/session/plugins` for the user, a console mirror for people. Every host write has a matching read.
- **Why.** A host builds its own marketplace UI. If it must keep a copy of what a user installed or whether a connection works, the copy goes stale and the platform is no longer the source of truth. Composio gives the same view through `session.toolkits()` and the connection status of each toolkit.
- **One definition.** One domain function computes setup for this read, the manifest and the gateway, so they cannot disagree.
- **Rejected.** A separate sync of state to the host (a second copy), returning values to the host (secrets stay write only), and saved per user defaults for the auth config or the tool policy (a connection already keeps the auth config it was made with, and the tool policy is chosen per session, as in Composio; this can be added later without a change to the routes).

## Project defaults are configuration in one place

- **What it does.** What a new project starts with (`DEFAULT_PROJECT_SETTINGS` in `packages/limits`: users may install any plugin the project can offer, `any`) and the limits of projects, keys and sessions (`PROJECT_LIMITS`: a session lasts 30 days by default and at most 365, with revoke) are named constants read when a project or session is created. The database column keeps a safe fallback and the code always sets the configured value.
- **Why.** Changing a default is then a one line edit with a pinned test and no migration. Users install by default, which is the core of the marketplace; a host narrows it to an allowed list or turns it off.
- **Rejected.** Defaults held in a column default (changing one needs a migration) and an idle timeout for sessions (revoke and the absolute lifetime are enough for this release).

## Auth configs are their own table

- **What it does.** How a project's users sign in to an MCP component is a row of `auth_config`: several per component, one the default, each for a server named by plugin and name (stable across versions), with a mode (`dcr`, `oauth_client`, `shared_secret`; `user_form` is reserved for a hosted form and refused until it exists). Values are sealed and never read back. A session may name a config per component (`api_key.auth_configs`); without an entry the project default applies. A connection (`mcp_oauth_token`) records the config it was made with, its kind (`oauth`, `api_key`, `env`) and, for the last two, the sealed values the host gave for that user.
- **Why.** One server per install could not give two users different credentials, and a host that serves several customers needs more than one sign-in setup per server. A separate table keeps the connection record the same for the OAuth callback, the host route and the later hosted form.
- **Rejected.** Keeping the settings on `mcp_server` (one per install, no default, no per session choice) and a saved per user choice of config (the session map covers it and a connection keeps the config it was made with).

## Project webhooks are signed, read from the audit trail and sent by the worker

- **What it does.** A project has one webhook: an address, the events it wants and a signing secret. Events are not emitted by request handlers. A worker job reads the audit trail, turns each matching event into one delivery row per project (unique on project and event), and sends it as JSON with `webhook-id`, `webhook-timestamp` and `webhook-signature` (`v1,` plus base64 HMAC-SHA256 over `<id>.<timestamp>.<body>`). A failed send is retried with a doubling wait up to `PROJECT_LIMITS.webhookMaxAttempts`; any 2xx ends it; rows older than `webhookRetentionDays` are purged. The address passes the SSRF guard when it is set and again on every send, and redirects are refused.
- **Worker opens the secret.** The signing secret is sealed under the organization key like other secrets, but the worker must hold it in the clear to sign, so the worker gets the same key unwrap permission as the gateway and the api (read of `org_key` wrapped keys and a KMS unwrap). The worker had only wrapping before. The secret is shown once, when it is set or rotated, and is never read back.
- **Who manages.** People manage the webhook in the console (`project-webhook:read|write`); a host reads its deliveries with `observability:read` and cannot change where events go, so a leaked host key cannot redirect a customer's events.
- **One-way door.** The header names, the signature format, the payload shape (`version: 1`) and the event names are public once a host verifies them; a later shape gets a new version.
- **Rejected.** Sending from the request that causes the event (a slow host would slow users and a crash would lose the event), letting the host set its own address (see above), and a per event secret.

## The host client is a published package with two entries

- **What it does.** `@syncfusion/boldcreate-connect` (`packages/sdk`) is the client a host installs. The root entry holds `ConnectClient` (project key: users, sessions, plugins, catalog, auth configs, connections, logs, usage, webhooks) and `ConnectSession` (one user's session token: servers, sign-in, plugin files). `@syncfusion/boldcreate-connect/sync` adds `syncPlugins` and `toMcpConfig` for a folder on disk. It has no runtime dependencies and needs Node 24.
- **Keys.** A project key (`prk_`) stays on the host's server; the class refuses it in a browser. A session token (`stk_`) is held privately and never shown by `toJSON`, inspection or messages. The token is never written to disk; MCP files carry a `${CONNECT_TOKEN}` placeholder unless the host asks otherwise.
- **Safe by default.** Files are checked against their hash before they are placed, archives with unsafe paths, links or large contents are refused, a file changed by hand is kept, and hooks are placed only when asked. Reads retry on `429`, `502`, `503` and network errors; writes never retry.
- **One-way door.** The package name, the two entry points, the exported names (no bare `Session`, `ConnectionRequest` or `connect`) and the error classes are public once published. Types are written by hand and checked against the route schemas by a test, so the package does not depend on the server code at run time.
- **Rejected.** Generating the client from the OpenAPI files (the hand-written surface is smaller and nicer to use, and the test keeps it honest), and one entry for all runtimes (the folder code needs Node and must not reach a browser bundle).

## The credential names the scope and the path never repeats it

- **What it does.** The console (a signed-in person) uses `/v1/orgs/{orgId}/projects/{projectId}/...`. A host server (`prk_` key) uses `/v1/project/...` and the project comes from the key. An agent (`stk_` token) uses `/v1/sync...`, the gateway URL and `/v1/session/...`, and the project and user come from the token. The host's own `userId` is never in a path: it is a query option or a body field. The platform user id (a UUID) appears in a path only in the console.
- **Users are implicit.** The first session creates the user, and a read for an unknown `userId` is an empty page. The host can list users and set a display name but cannot delete one; deleting is a console action.
- **Scopes are areas.** Project key scopes are `tools`, `sessions`, `execute`, `connections`, `auth-configs`, `plugins` and `observability`, each with `:read` and `:write`. Users are covered by `sessions`. A session token carries the permissions of `execute`. A key of one kind is refused on the routes of the other two, and a test walks the route list to prove it.
- **One-way door.** Once hosts call these paths and scope names, they are public. Domain functions are shared by console and host routes, which stay thin and separate.
- **Rejected.** A user id in the host path (it leaks the platform id and makes a delete route easy to add by accident), and one route set for all three credentials (the console and the host answer different questions and need different checks).

## Three planes, one resolver and one event path

- **What it does.** The catalog (plugins, versions, components), the control plane (organization, project, user, keys, auth configs, installs, sessions, policies, webhooks) and the data plane (gateway, sync, download) are kept apart. `resolveDelivery(tx, principal)` in `packages/domain/src/delivery/` returns the effective installs and the tool policy. Sync, component download and the gateway call it, and nothing else decides what a user receives or may call.
- **One event path.** Every state change writes one audit event. Logs, usage and webhooks are read from it, so they cannot disagree.
- **Kept honest by checks.** A repo check fails when code outside the resolver computes the effective installs, or when sync, download or the gateway stops calling the resolver. Tests walk the credential boundaries and the isolation between projects and users.
- **Rejected.** Letting the gateway compute its own view for speed (two answers to "what may this user call" drift apart), and a separate event table for webhooks (a second write that can miss a change).

## The partner API is removed; hosts use projects

- **What it does.** Migration `0001_remove_partner_apps` drops `partner_app`, `partner_app_member` and `partner_app_key`, the columns `user.partner_app_id`, `organization.partner_app_id`, `organization.external_ref`, `organization.partner_access_enabled` and `mcp_oauth_state.partner_app_id`, and the console read policies. The `ptk_` key family, the `X-Act-As-User` header, the `service` user kind, the partner org, team and member routes and the website pages for partner apps are gone. A host integrates through a project: a project key (`prk_`) for its server, a session token (`stk_`) for one user, and an organization key (`fyk_`, `plk_`) for the For You and Platform areas.
- **Data.** The product was only in development, so no rows are converted. The migration deletes the service users and the external users that belonged to a partner app; project users stay.
- **One-way door.** Dropped tables, columns and the key prefix cannot return without a new design.
- **Rejected.** Keeping the partner API behind its flag (two host models double the checks and the tests) and converting partner apps into projects (nothing in use needs it).
- **Key patterns stay in the secret scans.** `ptk_` remains in the redaction and secret-scan patterns (`observability/redact.ts`, `sdk/errors.ts`, `scripts/checks/no-committed-secrets.ts`): no key of that kind is accepted, but a leaked old one is still masked and still fails a commit check.

## Standalone service distribution with inlined workspace dependencies

- **What it does.** During `pnpm build`, after compiling with TypeScript (`tsc -p tsconfig.json`), each deployable service (`apps/api`, `apps/gateway`, `apps/worker`, `apps/admin`, `apps/web/server`) runs `scripts/package-service.ts`. This packages the service entrypoint into its own `dist/index.js` with all internal `@boldcreate-integrations/*` workspace dependencies bundled directly into the distribution file. External npm packages remain externalized.
- **Why.** In production environments and container deployments, services only need their own `dist/` directory and production `node_modules`. The root `packages/` directory is not needed at runtime by the deployed service container.
- **Development remains unaffected.** `pnpm dev` and local test runners continue resolving development sources directly using Node conditions (`development`).
- **Rejected.** Relying on runtime workspace symlinks to `packages/*/dist` inside production containers (requires copying or deploying the entire monorepo packages structure to production images).

## Teams are removed; "For team" is the organization

- **What it does.** Migration `0002_remove_teams` drops `team` and `team_member`, the `team_id` columns on `installation` and `api_key`, the invite fields `invited_team_id` and `invited_team_role`, and the `team` scope. An install made for the team is an organization install, shared by every member of the organization. The roles are Admin, Member and Viewer; the Team Admin, Team Member and Team Viewer seats and the `Default` team are gone. Scope kinds are `org`, `user` and `project`.
- **Data.** The product was only in development, so installs at team scope are deleted and no rows are converted. An invite that named a team stays as an invite for its organization role.
- **One-way door.** The dropped tables, the scope value and the team routes cannot return without a new design.
- **Rejected.** Keeping teams hidden (the code and the checks stay and drift) and turning team installs into organization installs (the audience would widen from a team to everyone).

## The gateway reads the database for now

- **What it does.** `gateway` authenticates keys and resolves installs and tool policy by reading Postgres with its own role, `app_gateway`. That role has `BYPASSRLS`, so row-level security does not limit it; the column grants in `packages/db/src/role-grants.ts` are the only limit.
- **Why.** Key authentication and `resolveDelivery` run on every request, and `api` has no internal route for them yet. Reading directly kept the hot path to one hop.
- **What it can reach.** Read on organizations, members, plugins, installs, MCP servers, auth configs, `org_key` (wrapped keys), flags and kill switches; update on `api_key.last_used_*`, a few `user` and `mcp_oauth_token` columns (token refresh); insert on `audit_log`. Everything else is denied.
- **What limits the damage.** The column grants above and the egress rules planned in [plans/security-hardening-migration.md](../plans/security-hardening-migration.md) (S4.1, and the key cache in S2.3). Neither the egress rules nor a key cache exists yet.
- **Moving.** The api now has an internal route that authenticates a key for the gateway, and the gateway can use it with `DATA_SOURCE=api`. The default is still the database until the per-call routes and the cache exist.
- **Temporary.** The plan removes the grant and the role (S2.1 to S2.6); this entry is replaced by "The gateway does not read the database" when that lands.
- **Rejected.** Keeping the role for good with row-level security applied (the role would still see every tenant when a pod is compromised) and a read replica (the same blast radius on a second server).

## The For You key serves its maker's own installs

- **What it does.** A `fyk_` key names the admin who made it. Sync, archive downloads and the MCP gateway serve the organization's installs and that admin's own For me installs (user scope, no project), and nothing of any other user. Component switches of that user and their MCP connections apply. The key stops working when its maker leaves, is suspended or becomes a Viewer.
- **Why.** The key reached only organization installs, so plugins installed under For me were never synced, downloaded or callable.
- **One-way door.** Keys already issued start serving their maker's personal files; there is no schema change.
- **Rejected.** One `fyk_` key per user (changes the key shape and constraints) and keeping the key organization only (For me stays unreachable by key).

## The admin allow-list is a table

- **Decision.** Who may sign in to the admin app is the `admin_allowed_email` table. The addresses in `ADMIN_ALLOWED_EMAILS` are written to it as `config` rows at every admin start, and a `config` row whose address left the settings is removed. An admin adds others in the app (`added` rows); each gets the mailed one-time setup link, and removal ends that address's sessions because every request re-checks the table.
- **Why.** The list was an environment variable, so adding an admin meant a redeploy.
- **One-way door.** New table with `app_admin` only grants. The admin app needs migration `0004` applied before it starts, and fails at start otherwise.
- **Rejected.** Keeping the variable as the only list, and making the variable a one-time seed (it would stop being the source of truth for deployment admins).

## An invite link can be looked up before sign-in

- **Decision.** `POST /v1/invites/preview` takes an invite token and needs no session. It answers `valid` (with the invited address, the organization name and the role), `expired`, or `unavailable`. A link that was replaced by a resend, revoked, accepted or never issued is `unavailable`; the three are not told apart.
- **Why.** The accept page had to sign a person in or up before it could say that the link had run out. An expired link now shows its message and a sign-up button at once, and a valid one shows who invited them and for which address, which the sign-up form then fills in.
- **What it exposes.** Anyone holding a link learns the address, organization name and role it was sent for, and whether that address already has a verified user (so the page offers sign-in to one and a password form to the other). The token is 256 random bits, so a link cannot be guessed, but one that leaks now says who was invited where. Nothing else is readable with it, and accepting still needs a session for that address.
- **Limit.** The route has no throttle of its own yet, like the other routes that take no session (S10.3 in [plans/security-hardening-migration.md](../plans/security-hardening-migration.md)).
- **One-way door.** A public route and its response shape in the contract.
- **Rejected.** Telling only after sign-in (a person signs up and verifies an address to learn the link is dead) and putting the address in the email link (it would sit in mail logs and browser history).

## Signing up from an invite verifies the address

- **Decision.** `POST /v1/auth/signup` takes an optional `inviteToken`. When it is an open invite sent to the same address, the account is created with the address already verified and no verification mail goes out; the web app then signs the person in and accepts the invite. If someone had registered that address earlier without verifying it, the invite replaces that password, display name and verification state, and the earlier unused verification links are closed. A token for a different address, a spent or expired token, or an address that already has a verified account changes nothing and gets the normal answer.
- **No starter organization.** A person who signs up from an invite gets no personal organization (the user row is marked as provisioned without creating one). They join the invited organization and can make their own from "New organization". Everyone else still gets the starter organization when they verify or sign in.
- **Why.** The invite mail already shows who reads the mailbox, so a second mail only added a step. Without the takeover, anyone could register an invitee's address first and leave the real owner locked out.
- **What it exposes.** An invite link now also lets its holder set the first password for that address. That is the same trust the verification link carries, and the link is single use through accept.
- **One-way door.** A new optional field on a public route, and an invite token counting as proof of the mailbox.
- **Rejected.** A separate invite sign-up route (two paths to keep equal) and issuing the session from sign-up (it would make sign-up a session-issuing route in the web proxy and break idempotent replay).

## Sign-up says when an address is already registered

- **Decision.** `POST /v1/auth/signup` answers `409` when the address already has a verified profile, and the page says so with links to sign in and to reset the password. An address that signed up but never verified gets the verification link again (one mail a minute) and the same answer as a new address. Project users and reserved addresses still get the answer of a new address.
- **Why.** The old answer was the same "check your email" for a registered address, and no mail followed, so the person waited for nothing. This is what sign-up pages of Slack, GitHub and similar products do.
- **What it exposes.** Anyone can ask whether an address has a verified profile. Sign-in, password reset and email change already answer generically, so this is the one place that tells. The route has no throttle of its own yet (S10.3 in [plans/security-hardening-migration.md](../plans/security-hardening-migration.md)), which is what limits how fast addresses can be tested.
- **Rejected.** Keeping the generic answer and mailing a notice to the registered address (a new mail type, and anyone could trigger a mail to a registered person).
- **No organization.** A signed-in person who belongs to none (removed from the one they were invited to, or it was deleted) sees a page that offers to create one. No starter organization is made for them: that is made once, for people who sign up by themselves.

## Every organization page has the organization in its address

- **Decision.** Get started, Marketplace (and a plugin), Installed and API keys moved to `/orgs/:orgId/get-started`, `/orgs/:orgId/marketplace[/:pluginId]`, `/orgs/:orgId/installed` and `/orgs/:orgId/api-keys`. The area (For You or Platform) follows from the address: those four sections are For You, projects are Platform, and the overview, members and settings belong to neither. Switching organization keeps the section. `/`, `/orgs` and the old short addresses redirect to the same page of the last organization used (else the first), keeping the filters in the address; someone in no organization stays on `/orgs`, which offers to create one.
- **Why.** These pages took their organization from a value remembered in the browser, so an address did not say what it showed, could not be shared, and the For You / Platform buttons and the organization switcher had to guess where to land. Pages show names, not ids; the project page no longer prints its id.
- **One-way door.** The old addresses keep working only through the redirect; links built from the new ones do not exist in older builds.
- **Rejected.** Keeping the short addresses and adding the organization as a query parameter (the address would still be ambiguous without it), and putting a slug in the address (a rename would break every link).

## A plugin is added to a project with its sign-in and values in one save

- **Decision.** `PUT /v1/project/plugins/:pluginId` (and the console twin) takes optional `authConfigs` (by MCP server name, the same fields as creating an auth config) and `variables`. The plugin, its configs and its values are stored in one transaction, or none are. A config whose name the server already has is left as it is and named in `existingAuthConfigs`. A host key needs `auth-configs:write` as well as `plugins:write` when the body carries either field. The plugin detail also lists the variables the newest version asks for.
- **UI.** The project's Auth configs and Catalog tabs are gone. Plugins is one view: add a plugin (with its sign-in and values) and set the values of installed ones. Plugin sets moved to Settings. The who-may-install mode and the allowed list have no screen; the backend stays and a new project starts with user installs `off`.
- **Why.** Adding a plugin and then finding its configuration in two other tabs left plugins half set up, and the web client could not create an auth config at all.
- **One-way door.** Additive fields on a public route and on the plugin detail; the removed tabs' addresses fall back to the overview.
- **Rejected.** A new route for the combined save (two ways to add a plugin) and a separate step per server (a failure would leave a plugin without its sign-in).

## A deployed environment keeps to its own folder in the bucket

- **Decision.** When `DEPLOY_ENV` is `staging` or `production`, every object key starts with that name: `staging/artifacts/<sha256>` and `production/artifacts/<sha256>`. A configured `BLOB_PREFIX` goes under it (`production/<prefix>/`). Local and test keep the plain prefix.
- **Why.** The key was `artifacts/<sha256>` in every environment, so two environments on one bucket shared keys and a clean-up in one could remove objects the other still used.
- **One-way door.** Objects already stored in a deployed environment under the old key are not found under the new one. Copy them to the new folder before the release (`aws s3 cp --recursive s3://BUCKET/artifacts/ s3://BUCKET/<env>/artifacts/`), or republish.
- **Rejected.** A separate bucket per environment as the only rule (still advised, but nothing stopped a shared one) and a required `BLOB_PREFIX` (easy to forget or to copy between environments).

## Removing a project plugin removes its sign-ins and values

- **Decision.** `DELETE` of a project plugin also deletes the auth configs of that plugin in the project, in the same transaction. Its values go with the installation. Adding it again starts clean.
- **Why.** Leftover configs showed up in the project and were reused silently by a plugin added later.
- **Rejected.** Keeping the configs for a re-add (hidden state the screen no longer shows).

## Errors and key events are stored in our own database

- **Decision.** Three platform tables, `error_group`, `error_event` and `ops_event`, hold errors (grouped by a stable fingerprint, sampled, size-capped, redacted before storage) and a short list of key events (deploys, failed jobs, startup and dependency state changes, security). Services write through a bounded in-memory queue that never delays a request. Only the admin role reads them, through a named maintenance purpose. The worker purges old rows daily with batched deletes by `occurred_at`. Admin gets an Observability area. Production console logging drops to `warn`, with a GCP exclusion for severity below WARNING. Connect stops sending to the shared Sentry once the screens exist.
- **Why.** Errors were only in logs and shared Sentry; routine logs cost more than they help. Handled failures (KMS, seal, OAuth, job attempts, fail-open) and failures that only show in staging or production were not visible at all.
- **One-way door.** New tables and role grants. Stored data is limited to error text, stack frames and ids; never bodies, headers, tokens or key material.
- **Rejected.** A new observability service or vendor (cost, a new data processor), and day partitions (the migration generator cannot declare them, so retention uses indexed batched deletes).

## Errors and events use a pool of their own and can move to another database

- **Decision.** Every service writes errors and events through a dedicated, capped pool (`createObservabilityStore`) with its own statement, lock and connect timeouts. `OBSERVABILITY_DATABASE_URL` points it at a separate database; unset, it uses `DATABASE_URL`. A circuit breaker pauses writes after repeated failures and the store's start-up check is advisory, so a slow or missing store never fails a request or readiness. A status change in admin writes its audit row first, in the same transaction only when both use one database.
- **Why.** Observability must not take connections, locks or time from request traffic, and moving it later must be configuration only.
- **One-way door.** Observability tables are no longer reached through the service's own pool. A separate database receives the full migration set.
- **Rejected.** Sharing the service pool (contention) and a separate migration set for the second database (a second migration pipeline for three tables).
- **Read side.** The admin app reads errors and events through `ObservabilityReader` (Postgres implementation `createPostgresObservabilityReader`), so another backend replaces one module. Capture state is exposed as Prometheus metrics, and retention takes a pause between batches and a time limit.
