# Observability: errors and key events in our own database

Status: proposal. Needs a decision entry in `docs/architecture/decisions.md` before work starts (new tables, new admin screens, log level change). Reference: [overview](../architecture/overview.md), [operations](../guides/operations.md).

## Problem

- Sentry is shared with other applications, and their volume fills the quota that Connect needs.
- Every service writes routine logs to the console, and GCP Cloud Logging bills for each ingested GiB.
- A separate observability service (Sentry self-hosted, SigNoz, Loki + Grafana) would add its own database, queue and deployment. That costs more than it saves.

## Recommendation

Do not add a service. Store only **errors and a short list of key events** in the Postgres we already run, show them in the existing **admin app**, and let the **worker** delete old rows on a schedule. Cut console output to warnings and errors. Keep metrics as they are.

| Signal           | Where it goes                                             | Why                                            |
| ---------------- | --------------------------------------------------------- | ---------------------------------------------- |
| Errors           | `error_group` + `error_event` tables, admin UI            | Sentry-like grouping, no extra service         |
| Key events       | `ops_event` table, admin UI                               | Answers "did the sync/webhook/key rotate fail" |
| Routine logs     | Not stored. Console at `warn` in production               | Removes most GCP log cost                      |
| Metrics (counts) | Existing `packages/observability` metrics                 | Numbers are cheap; no per-request rows         |
| Request detail   | Debug logging switched on per service, for a limited time | Pay for detail only while investigating        |

Cost: a few MB per day of rows in the current database. No new pods, no new database, no new image.

## What counts as necessary

Record:

- Unhandled exceptions and 5xx responses in `api`, `gateway`, `worker`, `web`, `admin`.
- Failed background jobs after the last retry (outbox, webhook delivery, token refresh, migrations).
- Upstream failures worth acting on: provider auth revoked, circuit breaker opened, repeated timeouts.
- Security events: key creation and revocation, repeated auth failures, rate-limit or SSRF blocks. These belong in `ops_event`, not in the error table.
- Deploy markers (version, service, time) so a spike can be tied to a release.

Do not record:

- Successful requests, health checks, normal tool calls, 4xx caused by callers (validation, 401, 404, 429 as single occurrences).
- Request or response bodies, headers, tokens, connection strings. The existing `redactSecrets` runs on everything before storage.

Per-tenant activity that customers should see is a product feature (audit trail), not observability, and stays out of this plan.

## Design

### Capture (`packages/observability`)

Add one function, `reportError(error, context)`, used by the HTTP error handler in `packages/http-server` and by worker job failure paths. It:

1. Redacts the error message, stack and context with `redactSecrets`.
2. Computes a **fingerprint**: hash of service + error class + first application stack frames (no line numbers from `node_modules`, no ids or numbers in the message).
3. Writes through a small port (`ErrorSink`, in `packages/ports`) so tests use an in-memory sink and no mocking of the database is needed.
4. Never throws and never blocks the request. It queues in memory (bounded, drop-oldest) and flushes in batches every few seconds.

Request context (`requestId`, `tenantId`, `traceId`) comes from the existing request context, so an error links to its trace.

### Protection against noise

- **Group and deduplicate**: one canonical `error_group` row per stable fingerprint (service + normalized error class/message + application stack frames; exclude request/tenant IDs, volatile values and line numbers likely to change between releases). Enforce this with a database unique constraint and an atomic upsert, so concurrent events cannot create duplicate groups. Each occurrence increments the canonical count and updates first/last-seen and release data; sampled `error_event` rows point to that group. Keep distinct failures separate when their stable application frames or error class differ; do not merge by similar text alone. The UI shows one row per canonical group with an occurrence count, not duplicate rows for every report.
- **Sample stored events**: keep the first 5 events per group, then 1 in 100, and at most a fixed number per group per day. A crash loop then costs a few rows, not millions.
- **Size caps**: stack 8 KB, context 4 KB, truncated after redaction.
- **Rate cap per service per minute**; when hit, increment a `dropped` counter instead of writing.

### Storage (`packages/db`)

New tables, created with `pnpm db:generate` (never hand-edited):

| Table         | Key columns                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `error_group` | `id`, `fingerprint` (unique), `service`, `title`, `status` (`unresolved`, `resolved`, `ignored`), `count`, `first_seen`, `last_seen`, `release`, `resolved_at`, `resolved_by` |
| `error_event` | `id`, `group_id`, `occurred_at`, `request_id`, `trace_id`, `org_id` (nullable), `stack`, `context` (jsonb)                                                                    |
| `ops_event`   | `id`, `occurred_at`, `service`, `kind`, `severity`, `org_id` (nullable), `detail` (jsonb)                                                                                     |

- Status changes are authorized admin mutations, recorded with actor and timestamp in the existing audit trail; resolve, ignore and reopen are reversible status changes, not deletions. Resolving clears the active unresolved state but preserves the full occurrence history. If the same fingerprint recurs after resolution, update the same canonical group, increment its count, and mark it unresolved again (record the regression transition); never create a second group for the same fingerprint.
- `error_event` and `ops_event` are partitioned by day (`PARTITION BY RANGE (occurred_at)`). Deleting a day is `DROP TABLE`: instant, no bloat, no vacuum cost. Check this against the migration generator before committing to it; if it cannot express partitions, fall back to batched `DELETE ... WHERE occurred_at < cutoff` plus an index on `occurred_at`.
- These tables are platform data, not tenant data. Row policy: written by service roles, readable only by the admin role, using a named maintenance purpose through `withMaintenance`. Add the grants in `role-grants.ts`. Ordinary tenant roles get nothing. `org_id` is a plain column for filtering, not a tenant boundary.
- If load grows, move these tables to a **separate schema or a second database on the same instance** so a flood cannot slow product queries. Do this only if measured.

### Retention (`apps/worker`)

A scheduled worker job, `observability-retention`, daily:

| Data                              | Default retention                                                  |
| --------------------------------- | ------------------------------------------------------------------ |
| `error_event`                     | 14 days                                                            |
| `ops_event`                       | 30 days (security kinds: 90)                                       |
| `error_group` resolved or ignored | 30 days after `last_seen`                                          |
| `error_group` open                | kept while events keep arriving; removed 30 days after `last_seen` |

Retention values are config (`packages/config`), not constants. The job creates tomorrow's partitions and drops expired ones, and logs one summary line. There is also a hard size guard: if the tables exceed a configured size, the oldest partitions are dropped early and a warning event is written.

### Live service usage and capacity metrics

The existing `packages/observability` package already records low-cost Prometheus metrics for each service: HTTP request totals and duration by method, route template and status class, in-flight HTTP requests, event-loop lag, heap, GC pauses and thread-pool probe latency. Metric names are bounded by the fixed service list (`web`, `admin`, `api`, `gateway`, `worker`) and route templates, so they do not create one time series per user or concrete URL. The plan should reuse these metrics, not add activity rows to Postgres.

**Do we need active users and active MCP counts?** Useful for a live operations screen and capacity context, but not the primary autoscaling signals. We should not identify people or track every page view just to count activity. Derive approximate active web sessions and active MCP clients from short-lived, aggregate gauges/counters with a clear definition and a 1-5 minute window. The values must be labelled approximate because heartbeats disappear on network loss and browser tabs may be idle. Do not persist per-user presence.

Track:

| Signal              | How to measure                                                                                                                                                                                                              | Use                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Active web sessions | Add a heartbeat only if operators need it; aggregate short-lived session ids in Redis with 2-5 minute TTL, count unique live sessions, never expose session ids in metrics                                                  | Rough user activity, not billing or identity               |
| Active MCP clients  | Count live authenticated connections if the transport is stateful; for stateless HTTP MCP, show requests in the last 1 and 5 minutes by `gateway` route/tool class. Do not claim exact concurrent users from request counts | Live demand / usage trend                                  |
| Request rate        | Existing `http_requests_total`, rate by service and route template                                                                                                                                                          | Load and scale trend                                       |
| Saturation          | Existing in-flight requests, event-loop lag, heap/GC; add DB pool wait, Redis pool/latency, queue depth and oldest job age where missing                                                                                    | Detect when more replicas or dependency capacity is needed |
| Latency and errors  | Existing duration histogram and status class; derive p50/p95/p99 and 5xx ratio                                                                                                                                              | SLO health and capacity pressure                           |
| Worker demand       | Queue depth, oldest queued item, job duration, retry/dead-letter counts                                                                                                                                                     | Scale worker replicas on backlog and age, not just CPU     |
| Dependency health   | DB connection/pool availability, Redis, object store and upstream circuit state/latency                                                                                                                                     | Distinguish app saturation from dependency failures        |
| Deployment/restarts | Release marker, replica count, restart count and readiness                                                                                                                                                                  | Correlate regressions and assess rollout health            |

**Authoritative sources, collection and UI.** Production values must come from their system of record, never hard-coded examples or browser-generated values. Application request/runtime metrics come from the existing `packages/observability` Prometheus exposition, collected by the metrics backend actually configured for deployment. Queue depth/age and worker throughput come from the configured queue's authoritative state/counters. Dependency latency and pool utilization come from instrumented application metrics; dependency availability must be defined by observed request outcomes or provider/platform telemetry. Instance count, CPU, memory, restarts and deployment state come from the verified GCP compute product's platform telemetry. Error groups and operational events come from their admin API/Postgres tables. Before enabling any metric in production, document its source, query, units, labels, aggregation and freshness contract; omit it or show "unknown" if its source is absent or stale. The metrics backend and deployed GCP compute product remain unverified and must be confirmed before any live claim or historical-retention promise.

Do not poll every service from the browser and do not write each scrape to Postgres. A server-side admin API should query the verified backend (or a short-lived cache of its result), enforce authorization and bounded service/route filters, and return values with source, query/window, resolution, `generatedAt` and stale status. The Operations UI exposes an explicit **Refresh** action that triggers a new API read; disable it during a request, show progress, then update the values and "last updated" from the successful response. On failure retain the last successful response clearly marked stale, show the failed refresh time/error, and never replace it with zero or simulated values. A timeout must remain bounded and must not fan out uncontrolled queries. Automatic refresh may supplement manual refresh at a documented interval, but is not a substitute for it. Keep detailed time-series exploration in the verified platform metrics UI; the admin view should answer "which service is under pressure and why?".

**Historical summaries and selectable periods.** Historical metrics are useful for capacity planning, recurring degradation, release comparison and SLO review, but monthly/yearly summaries should not be presented as live status. Keep two distinct views: a live snapshot (last few minutes, current state) and a Trends/Capacity view for a selected period. Offer common ranges (1 hour, 24 hours, 7 days, 30 days, 90 days) and a custom start/end range; add 12 months only when the metrics backend confirms that retention and resolution support it. For long periods, display aggregated time series (for example, hourly over 30 days and daily over 90 days/12 months), not raw scrape points.

Show request volume, p50/p95/p99 latency, 5xx ratio, saturation (in-flight requests, event-loop lag and heap), worker queue depth/oldest age, dependency latency/availability, and SLO availability/burn only where these signals are actually collected from the identified source with a defined query. Use the same service/route dimensions and release markers for comparisons; deployment annotations must come from the deployment control plane or a verified deploy event, not hand-authored example data. Clearly distinguish missing, stale, zero and unavailable values. Avoid averages as the sole latency summary and avoid summing gauges across time: counters should be converted to rates, histograms to quantiles, and gauges shown as time-weighted averages/maxima or end-of-period values with explicit labels. Do not retain or persist each scrape in Postgres. Historical retention and downsampling belong to the existing Cloud Monitoring/metrics backend; confirm its retention, resolution and cost before promising a yearly view. If its retention is insufficient, first evaluate managed retention/downsampling options rather than introducing a new database. The UI should show source, period, aggregation/resolution and last updated time, and distinguish no data from zero. Monthly/yearly views are for trends and capacity, not incident response or autoscaling decisions.

**Scaling decisions.** Avoid autoscaling on active-user count alone. Use per-service signals: gateway on request rate plus in-flight work/CPU and latency; API on request rate plus DB pool wait/latency; worker on oldest queue age and queue depth; web/admin on request rate and CPU. Set scale-up/down thresholds only after observing normal peak and load-test behaviour. Alert on sustained SLO burn and saturation, not a single spike. Active users and MCP use are context, while latency, error rate, queue age and resource saturation are action signals.

**Cardinality/privacy rules.** Never use user id, org id, project id, API key, request id, raw URL, tool name from user input or exception text as metric labels. Use bounded service, route template, method, status class and a fixed MCP operation category only. Per-tenant and per-user breakdowns belong in authorized product usage reports, not infrastructure metrics. If active-user gauge is implemented, use a short-lived aggregate store with TTL and access controls, not Prometheus labels.

Implementation order: first expose and scrape the existing service metrics; then add only missing saturation/queue/dependency metrics; then add the admin summary snapshot. Add active-user presence only if operators confirm it answers a real support or capacity question. Confirm what GCP metrics collection and billing are already enabled before choosing any additional exporter or storage.

### UI (`apps/admin/client`)

Follow `.agents/skills/admin-ui-design/`. Add a dedicated **Observability** area to the existing admin app, not a replacement admin app and not tabs bolted onto the catalog dashboard. The current app already uses a fixed sidebar grouped into Dashboard, Catalog and System, with the audit log last. Add one parent link under a new **Operations** group. Its routes are `/observability` (overview), `/observability/errors`, `/observability/errors/$issueId`, `/observability/events`, and `/observability/storage`. Keep Observability below the catalog and before System/Audit, and use the current `AppLayout`, auth guard, shared UI primitives and router. Existing Dashboard, Catalog and Audit paths stay unchanged.

Keep the sidebar short. The parent link opens the overview. Within Observability, use a horizontal section nav or tabs for Errors, Events and Storage, rather than adding five top-level sidebar links. The overview should answer "which service needs attention?" with service health, error-rate and latency trends, recent deploy markers, and new issues. Live status and metrics trends include a manual Refresh action, a source and last-successful timestamp, loading/disabled state, and explicit stale/unavailable handling; the read must go through the admin API to the configured, verified metrics backend. Error detail should be a route so its URL can be shared and reopened. Each section owns its filters in URL search params so refresh and back/forward work.

Build the UI in this order:

1. **Overview** at `/observability`: health and issue summary for api, gateway, worker, web and admin, with links to filtered issue lists.
2. **Errors** at `/observability/errors`: server-filtered, paginated issue groups sorted by recent activity. Columns: service, title, count, first/last seen, release, status. Filters: service, status, time range and org.
3. **Issue detail** at `/observability/errors/$issueId`: stack, sampled events, context, trace/request links, count-over-time chart, compact summary/full bundle actions, resolve/ignore/reopen status actions. Resolved and ignored issues can be reopened as unresolved; recurring matching fingerprints also reopen the canonical group and are recorded as regressions. Deletion is not an issue action.
4. **Events** at `/observability/events`: filterable `ops_event` list for deploys, security and failed jobs.
5. **Storage** at `/observability/storage`: size per table, oldest row, retention status and explicit destructive controls for resolved groups, expired events and service-specific cleanup. Confirmation dialogs name the affected data and amount; every delete is audited.

Follow `.agents/skills/admin-ui-design/`: monochrome light/dark tokens, status colors only for state, shared components, skeleton/loading/error/empty states, accessible keyboard navigation and no raw buttons. Server-side filters and pagination are required. An overview failure must not take down the rest of the admin app; keep it isolated behind its own route/query keys. Add client tests for navigation and visible data, and verify current navigation tests continue to pass.

Admin API endpoints live in `apps/admin/src`, with Zod contracts in `packages/contracts`.

### Logging changes (cost)

1. Production default `LOG_LEVEL=warn`; `info` only in staging. Set per deployment in `k8s/`.
2. Remove request-success, health-check and per-call `info` logs, or move them to `debug`.
3. One line per failed request or job, not several per stage.
4. GCP side: add a Cloud Logging **exclusion filter** for `severity < WARNING` on these services and a short retention (for example 7 days) on the log bucket. This is safe because errors are in our own tables.
5. Enable debug for one service temporarily through config when investigating; revert after.

### Sentry

Keep the other applications on Sentry. For Connect, either stop sending (recommended once the admin screens exist) or keep Sentry with `tracesSampleRate: 0` and a `beforeSend` that only passes 5xx, so Connect stops consuming shared quota. No Sentry dependency is added.

### Alerts

Use the SLO alerts already planned in `operations.md` (P2.3). Add one alert: new `error_group` created, or a group above N events in 10 minutes, delivered by the existing email path. Keep it to a few alerts so they stay actionable.

## Work packages

| Id   | Work                                                                                           | Status |
| ---- | ---------------------------------------------------------------------------------------------- | ------ |
| O1.1 | Decision entry; confirm partition support in the migration generator and lint rules            | todo   |
| O1.2 | Tables, migration, grants, maintenance purpose (`packages/db`)                                 | todo   |
| O2.1 | `ErrorSink` port, fingerprinting, sampling, batching, `reportError` (`packages/observability`) | todo   |
| O2.2 | Wire into the HTTP error handler and worker job failure paths; deploy marker on startup        | todo   |
| O3.1 | Retention and partition job in the worker; size guard                                          | todo   |
| O4.1 | Admin API endpoints and contracts                                                              | todo   |
| O4.2 | Admin screens: Errors, Error detail, Events, storage panel                                     | todo   |
| O5.1 | Log level and log call cleanup; `k8s/` config; GCP exclusion filter and bucket retention       | todo   |
| O5.2 | Stop Connect traffic to shared Sentry; one new-error alert                                     | todo   |

Order: O1 → O2 → O3 → O4 → O5. O5.1 can start early since it only lowers volume.

## Tests

- Unit: fingerprint stability (same error, different ids, same hash), redaction before storage, sampling and rate cap, reportError never throws, retention cutoffs.
- Security: no secret or token reaches `error_event.context`; tenant roles cannot read the tables; delete endpoints reject non-admins.
- Integration (real embedded Postgres): partition create and drop, retention job, grants.
- Client: screens render, filters, delete confirmations, console-clean.

## Risks

| Risk                                                                           | Mitigation                                                                                 |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Error flood slows the product database                                         | Sampling, caps, drop-oldest queue; move to a separate schema/database if measured          |
| Database down means no error record                                            | Still printed to console at `error`, which GCP keeps                                       |
| Lost features compared with Sentry (source maps, session replay, alerts rules) | Accepted; server errors only. Browser errors can post to a capped endpoint later if needed |
| Sensitive data in stacks or context                                            | Redaction, size caps, security tests                                                       |

## Alternatives considered

| Option                                     | Verdict                                                                                                   |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Self-hosted Sentry                         | Many containers plus Postgres, ClickHouse, Kafka. Heavier than the app itself                             |
| SigNoz / Grafana + Loki                    | Needs ClickHouse or object storage plus another UI to run                                                 |
| Dedicated Sentry project for Connect       | Cheapest start: separate quota and sampling. Good stopgap this week, but still a paid external dependency |
| GCP Error Reporting only                   | Free grouping of error logs, but still needs logs ingested; fine as a fallback                            |
| **Errors in existing Postgres + admin UI** | **Chosen: no new service, full control of retention and deletion**                                        |

## Immediate stopgap (no code)

1. Create a Connect-only Sentry project with its own rate limit and spike protection.
2. Set `LOG_LEVEL=warn` in production and add the GCP exclusion filter for logs below WARNING.
