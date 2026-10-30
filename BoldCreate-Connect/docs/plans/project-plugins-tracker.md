# Project plugins: implementation tracker

Plan: [project-plugins-add-flow.md](./project-plugins-add-flow.md). Update the status column as work lands. Status: `todo`, `doing`, `done`, `blocked`.

Nothing has started. First priority is **delivery 1: merge the plugin tabs and add a plugin with its auth config in one save.**

## Deliveries

| #   | Delivery                                              | Status  | Depends on             |
| --- | ----------------------------------------------------- | ------- | ---------------------- |
| 1   | One Plugins view, add with auth config (this tracker) | todo    | -                      |
| 2   | Hidden flag and delivery filter                       | todo    | 1                      |
| 3   | DCR display name and status, `Unverified`             | todo    | 1                      |
| 4   | Search, paging and delivery at scale                  | todo    | 1                      |
| 5   | Bulk add without credentials                          | todo    | 1, 4                   |
| 6   | Bulk with credentials, CLI import                     | todo    | 1, 5                   |
| 7   | Branding logo                                         | blocked | public-access decision |

## What exists today (checked in the code)

- **Three project tabs touch plugins:** `plugins` (`PluginsTab.tsx`), `auth-configs` (`AuthConfigsTab.tsx`) and `catalog` (`CatalogTab.tsx`), declared in `apps/web/client/src/lib/project-search.ts` and rendered in `apps/web/client/src/pages/app/ProjectPage.tsx`.
- **`AuthConfigsTab` only edits variables** (`projects.putAuthConfigVariables`). The web client cannot create or edit an auth config today, although the API can (`projectAuthConfigsConsole.create`, `projects.ts:422`).
- **Add is a dialog of 8 rows** (`CatalogPicker.tsx`) that calls `projects.putPlugin(orgId, projectId, pluginId)` with no body beyond the version.
- **Server side:** `putProjectPlugin` (`packages/domain/src/project/project-plugins.ts:250`) and `createAuthConfig` (`.../auth-configs.ts:295`) both take a transaction. The console routes are in `apps/api/src/routes/projects.ts` (put at line 381, create config at 422) and the host twins in `apps/api/src/routes/project.ts` (lines 178 and 216).
- **The plugin detail** (`PluginDetailResponseSchema`) lists components with kind, name, transport and url. It has **no variable definitions**, so the add drawer cannot show env fields before the plugin is installed unless the detail is extended.
- **No drawer component** exists in `apps/web/client/src/components/ui`. There is `dialog.tsx` only.

## Delivery 1: one Plugins view, add with auth config

Goal: an admin opens one Plugins view, finds a plugin, and adds it with its auth config and variables in one save. The Auth configs and Catalog tabs are gone.

### 1.0 Check first

| ID  | Check                                                                                                                                                 | Status |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| P1  | Read `projects.ts:370-440` and `project.ts:170-230` to see how the routes build the caller, sealer and callback URL                                   | done   |
| P2  | Find where variable definitions live (`packages/domain/src/installation/variables.ts`) and whether a version's definitions can be read before install | done   |
| P3  | Confirm whether the idempotency store keeps request bodies (secrets must not be stored)                                                               | done   |
| P4  | Read `ProjectTabs.test.tsx` and `ProjectCatalog.test.tsx` to see what they assert about tabs                                                          | done   |
| P5  | Read `AppLayout.tsx` and `project-scopes.ts` for tab or route references                                                                              | done   |
| P6  | Search for consumers of plugin sets (host, SDK, sessions)                                                                                             | done   |

#### Results of the checks (read from the source)

- **P1, routes.** The console PUT (`projects.ts:372`) and the host PUT (`project.ts:169`) both call `putProjectPlugin` with only the version. Both already have what the new call needs: the console has `sealerFor(tx)` and `opts.redirectUri`, the host has `sealerFor(tx)` and `redirectUri`. Console authorizes with `requireAction('project-plugin:write')`, which also covers auth configs. The **host** authorizes by route id only (`apps/api/src/auth/project.ts:88`, `plugins:write`), so a PUT that carries `authConfigs` or `variables` must also check `identity.scopes.includes('auth-configs:write')` and throw `insufficient_scope`. Without that, a key with only `plugins:write` could set secrets.
- **P2, variables.** `getVariableSchema(db, pluginVersionId)` reads the declared variables from the version's scan, so definitions **can** be read before install (B3 is feasible). `writeVariables(db, installation, where, writer, body, sealer)` takes an installation with `id` and `pluginVersionId`, seals first and writes in its own transaction, and treats an undeclared name as a custom variable (at most ten). `setUserPluginVariables` is a working precedent for calling it with a project caller.
- **P3, idempotency.** The store keeps a SHA-256 of the canonical request (method, route, params, query, body) and the response body. It does **not** keep the request body. The response of the new call carries no secret, so storing it is safe. The hash of a body that contains a secret is stored, so a leaked database would allow offline guessing of a low-entropy secret. Accepted for the single add; for the credential batch route (delivery 6) use no idempotency key or hash the body without secret values.
- **P4, tests.** `ProjectTabs.test.tsx` renders the `auth-configs` tab at lines 178 to 212 (variables form, read-only role) and the catalog add at line 136. These move to the new view (T8). `ProjectCatalog.test.tsx` covers the removed tab.
- **P5, tab references.** `AppLayout.tsx` maps each tab to an icon (lines 64 to 66, `'auth-configs'` and `catalog`) and filters `PROJECT_TABS` at line 263. `project-scopes.ts` has text "List the project's plugins and the catalog" for the key scope (line 59). The query key name `'auth-configs'` is used by `PluginsTab` to refresh and should stay.
- **P6, plugin sets.** The SDK exposes plugin sets publicly (`packages/sdk/src/plugins.ts`: create, update, delete, add, remove). They are a supported host feature, so the backend stays and the UI stays in Settings (C9 confirmed).
- **Delivery for hidden (delivery 2).** Every delivery path goes through `effectiveInstallations` (`packages/domain/src/delivery/visibility.ts:84`): `resolveDelivery`, `connections.ts`, `user-plugin-state.ts`, `visible-servers.ts`, `archive.ts` and `sync.ts`. One added condition there (`hidden = false` on project installs) covers session MCP, sync, archive and OAuth start. Confirm `archive.ts` and `sync.ts` call it directly rather than a copy of the query.

Corrections these results make to the items below:

- **B4:** the helper must look up the installed MCP components itself (component id and name for the installation, kind `mcp`), for both a new and an already installed plugin, then call `createAuthConfig` per entry. It must pre-check the unique key `(project, plugin, server, name)`, because `createAuthConfig` throws `conflict` on a duplicate.
- **B5:** `installPage` is shared with `listUserPlugins`. Compute `setup` and `servers` only in `listProjectPlugins` (or make the fields optional), so user plugin responses are unchanged.
- **B6:** add the `auth-configs:write` scope check on the host route, and a test for it (T5).
- **B8:** the .NET SDK (`packages/sdk-dotnet`, `Api/ProjectApis.cs`) wraps the same routes. Update its models and tests for the new request and response fields, or state that it is not updated.
- **C8:** also update the tab icon map in `AppLayout.tsx` and the scope text in `project-scopes.ts`.

#### Second pass (read from the source)

- **Hidden covers the gateway.** The gateway builds the server list with `loadVisibleServers` (`apps/gateway/src/mcp/dispatch.ts:143`), which calls `resolveDelivery`, and only then calls `resolveAccess`. `resolveAccess` itself does not check delivery, so the filter in `effectiveInstallations` is what protects tool calls. Other direct `installationTable` readers (`servers.ts`, `external-callback.ts`, `access.ts`) are member-console and callback paths, not host delivery. H1 done.
- **Connect state exists.** `allStates` returns `mcp[].setup` (`none`, `connect`, `variables`, `auth_config_missing`), `ready`, `authMode` and `connection`. The plan reuses it. `setup.kind = variables` for a project plugin means the project's own required values are missing. A server with no config gets `authMode` from `mcp_server.authType`, default `none`.
- **DCR storage.** `oauthPlanOf` reuses `config.oauthClientId` when present; `startAuthorization` writes the new client id, sealed secret and `oauth_metadata` onto the **auth config** when `prepared.registered`. Connections keep `authConfigId`. A branding change therefore needs a re-register that clears the stored client, and existing tokens stop refreshing. R1 done.
- **No paging in delivery.** `effectiveInstallations` returns all rows, and `sync.ts` and `archive.ts` build from that list. Nothing pages. The per-project limit rises only after measuring (S4 stays open).
- **Idempotency.** The store keeps `requestHash` (SHA-256 of method, route, params, query, body) and `responseBody` (skipped when `secretResponse`). X1 done: no body is stored, but the hash of a body with secrets is. Use no key on the credential batch route, or hash without secret values.
- **Object store.** `docs/architecture/overview.md`: api has S3 read-only, worker has S3 write. A logo needs a worker write path and a public serve route.
- **Modes.** `AuthConfigInputModeSchema` is `dcr | oauth_client | shared_secret`. `user_form` is held for a hosted form and not offered.
- **.NET SDK.** `ProjectApis.AddAsync(pluginId, InstallOptions?)` and `ContractTests.cs` JSON literals (`PluginRow`, `AuthConfigRow`, `UserPluginRow`) mirror the TypeScript contract tests. Additive response fields are safe; the request fields need a new option type.

### 1.1 Contracts and domain

| ID  | Work                                                                                                                                                                                                                                                                                                                                                                                                             | Files                                                                                    | Status |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| B1  | Extend `PutProjectPluginBodySchema` with optional `authConfigs` (keyed by MCP server name; same fields as create without `componentId`) and optional `variables`. Strict, with the per-mode rules of `CreateAuthConfigBodySchema`.                                                                                                                                                                               | `packages/contracts/src/v1/project-plugins.ts`                                           | done   |
| B2  | Add a derived admin `setup` to the project plugin list response (`ready`, `needs_values` with names, `no_auth`, `no_sign_in` for an MCP server without a default config) and `servers[]` with server name, component id, default config id, auth mode. Reuse `missingRequiredVariables` logic in a set-based form. The host connect state is **not** added: it exists as `mcp[].setup` in the user plugin state. | `packages/contracts/src/v1/project-plugins.ts`                                           | done   |
| B3  | Add the plugin's variable definitions to the plugin detail, so the drawer can show env fields before install (additive field).                                                                                                                                                                                                                                                                                   | `packages/contracts/src/v1/marketplace.ts`, `packages/domain/src/marketplace/plugins.ts` | done   |
| B4  | Domain: `putProjectPluginWithConfig`. In one outer transaction: `putProjectPlugin`, resolve each MCP component, `createAuthConfig` for every entry (a config of that name that already exists is left untouched and reported), then write variables.                                                                                                                                                             | new `packages/domain/src/project/plugin-setup.ts`                                        | done   |
| B5  | Domain: derive `setup` and `servers[]` for a page of plugins in set-based queries (no query per row).                                                                                                                                                                                                                                                                                                            | `packages/domain/src/project/project-plugins.ts`                                         | done   |
| B6  | Routes: pass the new body through the console and host twins, with the sealer and callback URL as the create-config routes do. Keep idempotency optional as today.                                                                                                                                                                                                                                               | `apps/api/src/routes/projects.ts`, `apps/api/src/routes/project.ts`                      | done   |
| B7  | Fix the default install mode to `off` in `DEFAULT_PROJECT_SETTINGS`.                                                                                                                                                                                                                                                                                                                                             | `packages/limits/src/project-defaults.ts`                                                | done   |
| B8  | SDK: `plugins.add` accepts the optional `authConfigs` and `variables`; add the new response fields to the types.                                                                                                                                                                                                                                                                                                 | `packages/sdk/src/*`                                                                     | done   |
| B9  | Regenerate OpenAPI (`pnpm build` writes `docs/openapi/*.json`).                                                                                                                                                                                                                                                                                                                                                  | `docs/openapi/*.json`                                                                    | done   |

Rules the domain work must keep (from the existing model):

- An auth config belongs to one MCP **server** `(project, plugin, serverName, name)`. A plugin with several MCP components needs one config per server.
- One default per server. The first config created becomes the default.
- Variables belong to the installation, not the config.
- Secrets are sealed with the config id. Write-only. Only the last four characters are shown.
- A repeat call returns the existing state and changes only the fields sent.

### 1.2 Web client

| ID  | Work                                                                                                                                                                                                                                                                                                                                                                                           | Files                                                               | Status                 |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------- |
| C1  | `projects.putPlugin` takes the new body; add types for `setup` and `servers`.                                                                                                                                                                                                                                                                                                                  | `apps/web/client/src/lib/api.ts`                                    | done                   |
| C2  | Add a side-drawer component. `DialogContent` is centered with a `dialog-motion` class, so build `sheet.tsx` on the same Radix primitive with its own placement and motion.                                                                                                                                                                                                                     | `apps/web/client/src/components/ui/sheet.tsx`                       | dropped (dialogs used) |
| C3  | `PluginsView` with a segmented control, **Installed** and **Browse**, search, status and kind filters, and cursor paging for Installed.                                                                                                                                                                                                                                                        | `apps/web/client/src/components/project/plugins/PluginsView.tsx`    | done                   |
| C4  | Shared row component used by Installed and Browse. Rows already in the project show their status instead of Add. No Connect button.                                                                                                                                                                                                                                                            | `.../plugins/PluginRow.tsx`, `.../plugins/StatusChip.tsx`           | done (table rows)      |
| C5  | `AddPluginDrawer`: review, then per MCP server one of: No sign-in needed (no config is created), OAuth with dynamic registration (`dcr`), OAuth with your own app (`oauth_client`), Shared secret (`shared_secret`). Then credential fields and env variables. Plugins without MCP add at once. Secret fields are password inputs and never prefilled. **Save** and **Save and finish later**. | `.../plugins/AddPluginDrawer.tsx`, `.../plugins/AuthConfigForm.tsx` | doing                  |
| C6  | `ConfigureDrawer` for an installed plugin: edit variables (move the form from `AuthConfigRow`) and auth config fields; create a config for a server that has none.                                                                                                                                                                                                                             | `.../plugins/ConfigureDrawer.tsx`                                   | done (dialog)          |
| C7  | A "Finish setup (N)" strip when plugins need setup; it opens the first one in the configure drawer.                                                                                                                                                                                                                                                                                            | `.../plugins/PluginsView.tsx`                                       | done                   |
| C8  | Remove the `auth-configs` and `catalog` tabs from `PROJECT_TABS`, `PANELS` and `WRITE` in `ProjectPage.tsx`; delete `AuthConfigsTab.tsx`, `CatalogTab.tsx`; remove `CatalogPicker` use from the plugins view.                                                                                                                                                                                  | `project-search.ts`, `ProjectPage.tsx`, `components/project/*`      | done                   |
| C9  | Move plugin sets to a collapsed "Plugin sets" section in Settings (until P6 shows they are unused). Keep `CatalogPicker` only for it.                                                                                                                                                                                                                                                          | `SettingsTab.tsx`, new `PluginSetsSection.tsx`                      | done                   |
| C10 | Design: follow `.agents/skills/admin-ui-design/` (monochrome, light and dark). Phone layout with the sticky section row. Keyboard-only add and a focus trap in the drawer.                                                                                                                                                                                                                     | all of the above                                                    | done (dialogs)         |

No `/catalog` or `/auth-configs` redirect: staging has no existing links, and `validateProjectSearch` already falls back to Overview for an unknown tab.

### 1.3 Tests

| ID  | Test                                                                                                                                                                                                                                                                                        | Project / file                               | Status             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------ |
| T1  | Contract schema: strict body, per-mode required fields, unknown server, over-long values.                                                                                                                                                                                                   | `unit`, `packages/contracts`                 | done               |
| T2  | Domain `putProjectPluginWithConfig`: no MCP; one DCR server; several servers; existing plugin; existing config name; wrong mode fields; sealer failure rolls back everything; project limit.                                                                                                | `unit`, `packages/domain`                    | done               |
| T3  | Derived `setup` and `servers`: ready, needs setup, no auth, several servers, config on a removed plugin.                                                                                                                                                                                    | `unit`, `packages/domain`                    | done (integration) |
| T4  | Integration: add through the API with a secret mode, read back, confirm the secret is in no response and no log, and a failed save leaves no install and no config.                                                                                                                         | `tests/integration`                          | done               |
| T5  | Security: write role required; project A cannot add or configure in project B; host twin parity (`routes.parity.test.ts`).                                                                                                                                                                  | `tests/security`, `apps/gateway`, `apps/api` | done               |
| T6  | SDK: `plugins.add` sends the new body, never puts secrets in a URL.                                                                                                                                                                                                                         | `unit`, `packages/sdk`                       | done               |
| T7  | Client: Installed and Browse, add without MCP, add with DCR, add with a secret mode, save and finish later, error keeps the drawer and values, read-only role, filters, paging, tabs no longer include Auth configs and Catalog. Console-clean, `prefetchQuery` with `staleTime: Infinity`. | `client`, `apps/web/client`                  | done               |
| T8  | Update `ProjectTabs.test.tsx`; convert or delete `ProjectCatalog.test.tsx`.                                                                                                                                                                                                                 | `client`                                     | done               |

### 1.4 Docs

| ID  | Work                                                                                                                    | Status |
| --- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| D1  | `docs/guides/integration.md`: `plugins.add` options and the Plugins view.                                               | done   |
| D2  | `docs/product.md`: one Plugins view, auth config per MCP server.                                                        | done   |
| D3  | `docs/architecture/decisions.md`: record the additive body change and the removal of the Auth configs and Catalog tabs. | done   |

### 1.5 Done when

- An admin adds a no-MCP plugin in one click and an MCP plugin with DCR in one save.
- A plugin with a secret mode adds with its credentials, shows `Ready`, and the secret is never returned or logged.
- A failed save leaves no install and no config.
- The Auth configs and Catalog tabs are gone and nothing links to them.
- `pnpm format`, then `pnpm test -- --only=format,lint,typecheck,unit,client`, then the full `pnpm test` with `overall: PASSED` and zero errors and warnings. Anything that cannot run is reported as not run.

## Later deliveries

### 2. Hidden flag and delivery filter

| ID  | Work                                                                                                                                                                         | Status |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| H1  | Check first: read `resolveDelivery` and confirm it can filter on a new `hidden` column.                                                                                      | done   |
| H2  | Migration (new file only): `installation.hidden boolean not null default false`.                                                                                             | todo   |
| H3  | Delivery skips hidden installs in `session.mcp()`, plugin sync and the host project plugin list.                                                                             | todo   |
| H4  | Hide and Unhide row actions and a `Hidden` chip with a filter in the Installed list.                                                                                         | todo   |
| H5  | Decide what hiding does to live sessions (recommended: new sessions only).                                                                                                   | todo   |
| H6  | Tests: hidden leaves delivery and OAuth start; unhide restores with configs and connections; OAuth guard for a hidden, removed, other-project, non-MCP and non-OAuth server. | todo   |

### 3. DCR display name and status

| ID  | Work                                                                                                                                                | Status |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R1  | Check first: where the registered DCR client is stored and whether a name change forces reconnect.                                                  | done   |
| R2  | Migration: optional `auth_config.brand_name`. Send `client_name` as "<name> via BoldCreate" through `registerClient`.                               | todo   |
| R3  | Surface registration status and the provider's refusal reason in the configure drawer. Offer `oauth_client` when there is no registration endpoint. | todo   |
| R4  | Add the `Unverified` setup status until a check confirms DCR support.                                                                               | todo   |
| R5  | Decision record for the metadata sent to providers.                                                                                                 | todo   |

### 4. Search and paging

| ID  | Work                                                                                                                                                                                                                                                                                                 | Status |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| S1  | Measure `listPluginsWhere` on a 15,000-row dataset (before).                                                                                                                                                                                                                                         | todo   |
| S2  | Trigram or full-text index; cursor paging for Browse; cached or approximate total; virtualised list.                                                                                                                                                                                                 | todo   |
| S3  | Measure again; goal first results in about 300 ms (a goal, not a result).                                                                                                                                                                                                                            | todo   |
| S4  | Read the host sync path and confirm it pages; then set the per-project limit from the measurement.                                                                                                                                                                                                   | todo   |
| S5  | Benchmark harness: seed script for 1,000, 5,000 and 15,000 installs (several components each, a share MCP); report time, query count and rows for `buildSync`, `loadVisibleServers`, `allStates`, `listProjectPlugins`, `listAuthConfigs`, `listPluginsWhere`. Query log through the drizzle logger. | todo   |
| S6  | Stage A, `loadVisibleServers`: select names without `tools`, assign names, fetch the tool list only for the matched server (the `only` filter moves into the query). Keep behaviour for the full listing.                                                                                            | todo   |
| S7  | Stage A, `listAllTools`: cap concurrent discovery (for example 8), move discovery of undiscovered servers to a background job, return `unavailable` with reason `discovering` meanwhile.                                                                                                             | todo   |
| S8  | Stage A, replace `inArray(installationId, ids)` in `sync.ts`, `archive.ts`, `visible-servers.ts`, `user-plugin-state.ts` with a join on the installation predicates or one `ANY` array parameter. Test: no statement exceeds 1,000 bind parameters at 15,000 installs.                               | todo   |
| S9  | Stage A, `listAuthConfigs`: keyset paging in SQL on `(created_at, id)`; `variableStatuses` for the page in two queries instead of three per row.                                                                                                                                                     | todo   |
| S10 | Stage A, query count tests: gateway tool call, auth config page and plugin page use a fixed number of queries whatever the plugin count.                                                                                                                                                             | todo   |
| S11 | Stage B, per-project delivery revision: table or column, bump inside `replaceComponents`, `writeVariables`, install, remove, version change, hidden, auth config functions and component preference writes; one test per write site; maximum cache age as a backstop.                                | todo   |
| S12 | Stage B, `If-None-Match` on sync and the session server list: 304 in one query when the revision matches; shared project part cached by revision, per-user overlay for preferences and connections.                                                                                                  | todo   |
| S13 | Stage C, record the measured results in this tracker and set the per-project limit from them.                                                                                                                                                                                                        | todo   |

### 5. Bulk add without credentials

| ID  | Work                                                                                                                                       | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| K1  | `POST .../plugin-imports` and `GET .../plugin-imports/{importId}` with dry run; sources: filter, file, checkboxes. Console and host twins. | todo   |
| K2  | Worker handler: chunks of 500, set-based inserts, DCR default configs, summary audit, idempotent and resumable, cancel.                    | todo   |
| K3  | UI: bulk dialog with counts, progress and a failure list; "Select all N results".                                                          | todo   |
| K4  | Tests: 15,000-plugin import, re-run adds nothing, mid-run failure resumes, limit refused.                                                  | todo   |

### 6. Bulk with credentials

| ID  | Work                                                                                                                                             | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| X1  | Check first: the idempotency store must not keep request bodies (P3).                                                                            | done   |
| X2  | `POST .../plugin-config-batches`: up to 100 items, per-item savepoint, items sorted by plugin and server, per-item results with no input echoed. | todo   |
| X3  | CLI or SDK `import` command: manifest without secrets, secrets from the environment (`BOLD_<PLUGIN>_<FIELD>`), dry run, batches of 100.          | todo   |
| X4  | UI grid for small batches (about 50); secrets stay in memory.                                                                                    | todo   |
| X5  | Tests: 500 configs from one manifest; no secret in logs, errors or results; one bad item does not roll back the rest.                            | todo   |

### 7. Branding logo

Blocked until object storage is confirmed. A new storage service is a decision record, not a task to start.

## Scale findings (read from the source, not measured)

- `loadVisibleServers` loads every visible server **with its tool list** and applies the `only` filter afterwards, so each gateway tool call costs as much as listing everything (`packages/domain/src/mcp/visible-servers.ts`, `apps/gateway/src/mcp/dispatch.ts:143`).
- `listAllTools` discovers every undiscovered server concurrently with `Promise.all` (`dispatch.ts:172`).
- `buildSync` rebuilds the whole manifest on every poll, including the 8-query `allStates` (`packages/domain/src/delivery/sync.ts:155`).
- About ten queries pass every installation id as bind parameters; PostgreSQL allows 65,535 per statement.
- `listAuthConfigs` reads all configs and pages in code, then runs per-row variable queries (`auth-configs.ts:221`).
- Indexes on `installation`, `installation_component`, `component` and `auth_config` match these access paths; `EXPLAIN` on seeded data decides whether more are needed.

## Open questions

| #   | Question                                                                                     | Needed for |
| --- | -------------------------------------------------------------------------------------------- | ---------- |
| 1   | Is "15k" the catalog size or what one project holds? What per-project limit after measuring? | 4, 5       |
| 2   | Where do the secrets for bulk live today, and will admins use a CLI or only the UI?          | 6          |
| 3   | Does hiding a plugin keep live sessions or end them?                                         | 2          |
| 4   | Are plugin sets used by any host or SDK feature?                                             | 1 (C9)     |
| 5   | Is object storage available for a logo?                                                      | 7          |

## Log

| Date | Change |
| ---- | ------ |
