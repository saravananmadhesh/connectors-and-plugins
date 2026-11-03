# Project rate limits: adjustable from the admin app

Status: first delivery built (global level, one limit); the rest is planned in [Mockup and delivery](#mockup-and-delivery). The decision is recorded in `docs/architecture/decisions.md`. Reference: [overview](../architecture/overview.md), [operations](../guides/operations.md), [mockup](limits-ui-mockup.html).

## Problem

- A project's calls (keys and sessions together) are limited by `PROJECT_LIMITS.requestsPerMinutePerProject` in `packages/limits/src/numbers.ts`. It is a compile-time constant (3,000 a minute, 5,000 in the pending change), so every change needs a build and a deploy.
- Support cannot raise one customer's limit without raising everyone's.
- A team reported "60" for a project key. The code has no limit of 60 for project keys. The likely reading is the `x-ratelimit-window-size: 60` response header, which is the window in seconds, not the limit. The other candidates are an older deployed build, an organization key (its column defaults to 60) and a per-IP throttle set to 60. This is unconfirmed until the team sends the `x-ratelimit-limit` header from a real response.

## Recommendation

Keep the limits as data in the Postgres we already run, resolve them in the api through a short in-process cache, and manage them from the existing admin app. No new service and no per-request database read.

| Concern     | Choice                                                              | Why                                              |
| ----------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| Source      | Postgres: one table holding global, organization and project values | Audited, one place, survives restarts            |
| Enforcement | Existing Redis limiter, one counter per project                     | Already atomic and shared by all api instances   |
| Read path   | In-memory cache, about 30 seconds, background refresh               | Zero extra queries per request                   |
| Management  | Admin app page with bounds, confirmation and audit                  | Support can raise or lower without an engineer   |
| Fallback    | The constant in `packages/limits`                                   | A failed read never means unlimited or unbounded |

## Scope of this delivery

- **Now:** the admin app manages the **global** limit only. The page, routes and audit cover one value.
- **Architecture:** storage, resolver and contracts already model global, organization and project levels, so adding the other two later is an admin API and UI change, not a redesign. The resolver and `countProjectCall` are built and tested for all three levels now.
- **Not exposed yet:** organization and project rows cannot be written from the admin app or any api route. The write path rejects those scopes until they are enabled, so no row exists that the page cannot show.
- **Future:** organization and project overrides, expiry editing, the effective-limit lookup and the affected-project counts on confirmation.

## Mockup and delivery

[limits-ui-mockup.html](limits-ui-mockup.html) is the target screen. The first delivery is a subset; the page shell and contracts already allow the rest.

| Mockup element                                                                        | Delivered | Next step                                                                                  |
| ------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------ |
| Defaults tab: global value, built-in value, last change, edit and reset with a reason | yes       | None                                                                                       |
| Limit `project_requests_per_minute`                                                   | yes       | None                                                                                       |
| Five more limits: org key requests, projects per organization, keys, users, plugins   | no        | One entry each in `LIMIT_DEFINITIONS`, plus the code that enforces it reading the resolver |
| Overrides tab: organization and project rows, search, scope filter, pagination        | no        | Widen `WRITABLE_LIMIT_SCOPES`; admin list and write routes by scope; the table in the page |
| Add, edit and remove one override, with optional expiry                               | no        | Same routes; expiry input                                                                  |
| Usage and default columns per override                                                | no        | L3.1 usage reads; the effective-limit lookup                                               |
| Bulk set and bulk remove, CSV export                                                  | no        | One audited batch route per action; export reads the same list                             |
| Confirmation naming the affected projects                                             | partial   | Page confirms; the affected-project count needs the organization and project lists         |

Order: (1) more limit keys, since each is one definition and the resolver is generic; (2) the Overrides tab, organization level first, then project; (3) usage column and bulk actions. The mockup uses generated sample data and is not a contract; where it and this plan differ, this plan wins, and the mockup is updated when a step lands.

## Resolution order

The resolver applies this order in full, even though only the global level is writable today. Most specific wins:

1. The project's own override, if set.
2. The organization's value, if set. It is the default for each of the organization's projects, not a shared total.
3. The global setting, if set.
4. The built-in constant in `packages/limits`.

Any stored value may carry an expiry; after it, the value is ignored and the next level applies, so temporary raises do not stay.

The organization level takes the place of a plans table: an organization on a larger arrangement gets one value that covers all its projects, and one project can still differ. A separate plan or tier layer is added only if pricing tiers exist; the resolver is written so a layer can slot in without changing its callers.

Rules that keep this predictable:

- Most specific wins in both directions. A project override may be higher or lower than its organization's value; the page shows the effective value and where it comes from.
- The organization value is a per-project default. A cap on the sum of an organization's projects is out of scope until measured abuse shows a need.
- The scope is project calls only. Organization (platform) keys keep `API_KEY_LIMITS` and are unaffected.

## Design

### Storage (`packages/db`)

New objects, created with `pnpm db:generate` (never hand-edited):

| Object          | Columns                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit_setting` | `id`, `key` (format check), `scope` (`global`, `organization`, `project`), `scope_id` (null for global), `value` (integer), `expires_at` (nullable), `reason`, `updated_by`, `updated_at` |

- One row per `(key, scope, scope_id)`, unique, with a check that `scope_id` is null exactly when the scope is global. One table serves all three levels and any later limit key, with no changes to `project` or `organization`.
- It follows the shape of `feature_flag`: a stored row overrides a built-in default, no row means the default.
- Index on `(scope, scope_id)` for the page's lists and the resolver's refresh.
- Database checks keep the value inside the allowed bounds, so a bad write cannot be stored from any path.
- These are platform data, not tenant data. Written by the admin role through `withMaintenance`; read by the api role. Add the grants in `role-grants.ts`.

### Resolver (`packages/domain`)

- `resolveProjectLimit({ projectId, organizationId })` returns `{ limit, windowSeconds, source }` where `source` is `project`, `organization`, `global` or `default`. Key authentication already yields both ids, so no extra lookup is needed to find them.
- Backed by a cache with a TTL of about 30 seconds and a background refresh on expiry, so a burst of requests after expiry causes one read, not many. Cache the whole (small) set of stored rows rather than one entry per project, so a project with no override costs no read at all.
- If the read fails, use the last cached value, then the built-in constant. Never go unlimited.
- `countProjectCall` takes the resolved limit instead of `PROJECT_LIMITS.requestsPerMinutePerProject`. The Redis key stays `ratelimit:project:<projectId>`, so a changed limit applies to the current window straight away.
- Session rows stamp `PROJECT_LIMITS.requestsPerMinutePerKey` at creation. Either stop stamping it (the project budget is what is enforced) or refresh it; decide when the code is read again.

### Admin API (`apps/admin/src`, `packages/contracts`)

Now:

- `GET /api/v1/admin/limits/global`: the global value, the built-in default and the last change.
- `PUT /api/v1/admin/limits/global` and `DELETE` (reset to default): bounded value, required reason, audited with old and new value.
- Zod contracts in `packages/contracts` use the full `scope` enum and `scope_id`, but the admin routes accept `global` only.

Future, same contracts:

- `GET /api/v1/admin/limits` filtered by scope, organization or project, paginated.
- `GET /api/v1/admin/limits/effective?projectId=`.
- `PUT` and `DELETE` on `/limits/{scope}/{scopeId}` for organization and project, with optional expiry.

Every mutation writes the existing audit trail with the actor.

### Admin UI (`apps/admin/client`)

Follow `.agents/skills/admin-ui-design/`. One page, **Limits**, in the System group of the sidebar. Now it shows the global level only:

- **Global**: current value, built-in default, last change; edit and reset. The confirmation warns that the change affects every project.

Future tabs, no rework of the page shell:

- **Organizations**: table with a value; add by search; edit, set expiry, remove; the confirmation names how many projects follow it.
- **Projects**: table with an override; add by search; edit, set expiry, remove.
- A lookup by project showing the effective value and its level.
- Bounds shown next to the input and enforced by the server. Skeleton, empty and error states; no raw buttons; filters in the URL.
- Client tests for navigation, visible data, validation and the confirmation flow.

### Callers see what applies

- Keep `x-ratelimit-limit` and `x-ratelimit-remaining`. Add `x-ratelimit-reset` (seconds until the window ends) and keep `retry-after` on 429.
- Rename nothing that exists. `x-ratelimit-window-size` stays, but the guides say in one sentence that it is the window in seconds, not a limit.
- Consider the standard `RateLimit` and `RateLimit-Policy` headers (for example `5000;w=60`) after the existing ones are documented.
- Update the guides (`docs/guides/integration.md`, `docs/guides/webhooks.md`) and the contract examples.

### Observability

- Count 429s by service and route template, using the bounded metrics that already exist. No project id as a metric label.
- Expose per-project usage against its limit in the usage reads the admin app already has. An alert when a project stays above about 80% of its limit tells support to raise it before a complaint arrives.

## Failure behaviour

| Situation                         | Behaviour                                                       |
| --------------------------------- | --------------------------------------------------------------- |
| Redis limiter unreachable         | Unchanged: project calls are refused with 503                   |
| Settings read fails               | Last cached value, then the built-in constant                   |
| Global value set too low          | Bounded by a database check and an admin minimum; audited       |
| Limit lowered below current usage | Takes effect in the current window; the project waits for reset |
| Override past its expiry          | Ignored; the project follows the global value again             |

## Out of scope

- Per-key limits inside a project. Keys share the project budget so a host cannot widen it by minting keys.
- A separate configuration service or feature-flag product.
- Changing the limiter algorithm. The fixed window allows boundary bursts of up to twice the limit; move to a token bucket in one Lua script only if measured bursts justify it.

## Work items

| Id   | Item                                                                                         | Status  |
| ---- | -------------------------------------------------------------------------------------------- | ------- |
| L0.1 | Get the `x-ratelimit-limit` header, image version and `IP_THROTTLE_LIMIT` from the team      | todo    |
| L0.2 | Commit the 5,000 constant and the guide updates as the new fallback                          | done    |
| L1.1 | Decision entry in `docs/architecture/decisions.md`                                           | done    |
| L1.2 | Migration: `limit_setting` (global, organization, project scopes), grants (`packages/db`)    | done    |
| L1.3 | Resolver with cache and fallback; `countProjectCall` uses it (`packages/domain`, `apps/api`) | done    |
| L1.5 | Admin write path accepts `global` only; other scopes rejected until enabled                  | done    |
| L1.4 | Admin contracts, routes and audit (`packages/contracts`, `apps/admin/src`)                   | done    |
| F1   | Future: organization and project overrides in admin API and UI, effective lookup, expiry     | later   |
| L2.1 | Limits page (global only) in the admin app with tests (`apps/admin/client`)                  | done    |
| L2.2 | `x-ratelimit-reset` header, guide wording                                                    | done    |
| L3.1 | Usage against limit in the usage reads, near-limit alert (429 counter by route is done)      | partial |

## Tests

- Unit: resolution order across all three levels (seeded rows, since the admin app writes only global), expiry, cache refresh without a stampede, fallback when the read fails, bounds.
- Integration: a changed limit applies to the next request after the cache TTL; an override does not affect other projects; the audit entry holds the old and new value.
- Security: only a platform admin can read or write limits; tenant roles get no grant on `limit_setting`.
- Security: the admin write path rejects organization and project scopes.
- Client: the page shows the global value, validates bounds, names the affected projects in the confirmation and surfaces server errors.

## Risks

| Risk                                                 | Mitigation                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| A global value that is too low affects every project | Admin minimum, database check, confirmation showing affected count |
| A very high override exhausts the api or database    | Maximum bound; the key lookup still hits Postgres, so load test    |
| Stale cache applies an old limit for up to the TTL   | Accepted at about 30 seconds; add a pub/sub clear only if needed   |
| Callers misread the window as the limit              | Wording in the guides and the reset header                         |

## Alternatives considered

| Option                                      | Why not                                                              |
| ------------------------------------------- | -------------------------------------------------------------------- |
| Environment variable per deployment         | Needs a redeploy and cannot differ per project                       |
| Per-request database read                   | Adds a query to every project call                                   |
| External config or feature-flag service     | New service for one number; the existing database is enough          |
| **Postgres + cached resolver + admin page** | **Chosen: no new service, audited, applies within about 30 seconds** |
