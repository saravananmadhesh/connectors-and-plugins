# Operations

## Configuration

Each service reads only its own environment and fails closed on missing or weak secrets. `.env.example` lists the variables for deployed environments; locally `pnpm dev` generates secrets into `.cache/dev/secrets.json`. Never commit secrets.

| Area     | Variables / rule                                                                                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Common   | `DEPLOY_ENV` (`local`, `test`, `staging`, `production`), `DATABASE_URL` (SSL when deployed), `LOG_LEVEL`                                                                                                                              |
| Secrets  | `WORKLOAD_SECRET`, `CSRF_SECRET`, `COOKIE_SECRET` (random, 32+ bytes); workload identity or mTLS in production                                                                                                                        |
| HTTP     | `ALLOWED_HOSTS`, `APP_BASE_URL`, `TRUSTED_PROXY_CIDRS`, `BODY_LIMIT_BYTES`, `IP_THROTTLE_LIMIT`, `SHUTDOWN_PREDRAIN_SECONDS`, `SHUTDOWN_DRAIN_SECONDS`                                                                                |
| Adapters | `KMS_ADAPTER` (`local` refused in staging and production, else `cloud-kms` with `KMS_CLOUD_KEY_NAME`), `SECRETS_ADAPTER`, `REDIS_URL` (TLS when deployed), `EMAIL_ADAPTER` (`mailpit`, `smtp` or `ses`), `BLOB_BUCKET`, `BLOB_REGION` |
| Storage  | Cloud default credential chain (web identity federation); static blob keys are refused when deployed                                                                                                                                  |

## Run locally

See the root `README.md` (`pnpm dev` starts embedded Postgres, Mailpit, object store, all apps and the dashboard). The dev dashboard (<http://localhost:5080>) shows service reachability (Postgres and Redis link to read-only browsers on ports 8081 and 8082), logs of every saved run, monitoring charts and the `package.json` scripts. All services write one JSONL run file under `scripts/dev-dashboard/logs/`; `pnpm dev:dashboard` serves saved runs alone. Status is a TCP check, not a health proof.

## Build and release

- `pnpm build` builds every app and package and generates `docs/openapi/*.json`.
- Details: [deployment.md](deployment.md). One image per service from the root `Dockerfile` (`--target admin|api|gateway|worker|web`); all services deploy together under one tag. Run the migration job (`pnpm db:migrate`) before rollout; migrations are expand/contract so the previous release runs on the new schema.
- CI (`.azure/ci.yml`) runs the same `pnpm test` gate that developers run.

## Runtime

- Probes: `GET /healthz` (liveness, touches no dependency), readiness fails while draining. Rolling deploy with automatic rollback; set `terminationGracePeriodSeconds` ≥ predrain + drain + margin.
- Logs: structured Pino JSON with `requestId`, `tenantId`, `keyId`; secrets, URL query secrets and upstream bodies are redacted.
- Metrics: `packages/observability` exposes Prometheus HTTP totals/duration and in-flight requests per service, plus event-loop lag, heap, GC pause and thread-pool probe. Scrape these with the verified platform collector. Add pool wait, dependency latency/health, queue depth and oldest job age when needed for scaling, but only after confirming their authoritative sources and query semantics. Live active-user/MCP counts are approximate context only; don't use identities as metric labels or scale on active counts alone. Use short windows for live operations and the existing metrics backend for historical trends (24 hours to 90 days, custom periods, and yearly only if verified retention supports it); show histogram-derived latency quantiles and correctly aggregated counters/gauges. Do not store scrapes in Postgres. Admin refresh must re-read the configured source through the admin API, display response source and timestamp, preserve last-successful data as stale on failure, and never fabricate values. Backend and GCP compute product are unverified; no production availability or retention is implied. Page on sustained SLO burn and saturation: gateway availability 99.9% with overhead p95 < 50 ms, API availability 99.9%, oldest job < 5 min. Ticket (not page) when `rate(boldcreate_api_rate_limited_total[10m])` stays above the normal rate for 30 minutes: it counts `429` responses by route template (no project label), so it shows that callers are hitting a limit; find the project in the audit trail and the Limits page, not in the metric.
- Recovery: Postgres point-in-time recovery (RPO ≤ 5 min, RTO ≤ 30 min), restore drill quarterly. Org deletion crypto-shreds the org key; backups age out within the retention window.
- Kill switches (plugin, version, source, upstream, key, org) stop use immediately; a yank does not stop existing installs.

### Errors and events

- Failures and key events are stored in Postgres (`error_group`, `error_event`, `ops_event`) and read in the admin app under **Observability**. Production logs are `LOG_LEVEL=warn`; staging and preproduction stay at `info`. The release shown on errors and events comes from `APP_RELEASE`; the deployment files do not set it, so it stays empty (shown as a dash) until the image or pipeline provides it.
- The admin **Observability** area opens on an **Overview** (open and new errors, warnings, the most frequent errors, per service) and has **Errors**, **Events** and **Storage** tabs; every data page has a **Refresh** button. Reads are bounded by the page or the time window and use indexes, so their cost does not grow with the table; `tests/integration/observability-reads.integration.test.ts` checks the query plans (`OBSERVABILITY_READ_GROUPS`, `OBSERVABILITY_READ_EVENTS` raise the size; figures go to `reports/load/observability-reads.json`). Row counts on **Storage** are the planner's estimate above 50,000 rows, so the page stays fast on a large table.
- **Delete older than** on **Storage** removes one table's rows before a chosen day (an unresolved error group is always kept). It deletes in batches of 500 with a 25 ms pause and stops after 8 seconds per request, so other services keep their share of the database; the page repeats the request until done. Each request is recorded in the audit log as `admin.observability_purged`. Automatic retention still runs; this is for cleaning up sooner.
- Errors and events go through a pool of their own (`OBSERVABILITY_DB_POOL_MAX`, default small), with their own `OBSERVABILITY_DB_STATEMENT_TIMEOUT_MS`, `OBSERVABILITY_DB_LOCK_TIMEOUT_MS` and `OBSERVABILITY_DB_CONNECT_TIMEOUT_MS`, so they cannot use up the connections or hold the locks of request traffic. Writes are batched (one upsert per flush, about every 5 s per instance). After `OBSERVABILITY_SINK_FAILURE_THRESHOLD` failed writes in a row the sink pauses for `OBSERVABILITY_SINK_PAUSE_SECONDS` and drops reports meanwhile; readiness is not affected by this store (its start-up check is advisory).
- Retention paces itself: `OBSERVABILITY_RETENTION_BATCH_PAUSE_MS` (default 50) waits between delete batches and `OBSERVABILITY_RETENTION_MAX_RUN_SECONDS` (default 300) ends a run; when it stops with rows left the next run follows after `OBSERVABILITY_RETENTION_CATCH_UP_SECONDS` (default 300) instead of the daily interval.
- Every service exposes how error capture is doing on its metrics endpoint: `boldcreate_<service>_error_capture_queue_depth`, `_error_capture_written_total`, `_error_capture_dropped_total{reason}` (`queue_full`, `rate_capped`, `write_failed`, `sink_paused`) and `_error_capture_flush_seconds`. Alert on a rising `write_failed` or `sink_paused` count and on a queue depth that stays near the limit.
- Sizing: `OBSERVABILITY_STORM_REPORTS=200000 OBSERVABILITY_STORM_INSTANCES=24 pnpm test -- '--only=integration' '--files=tests/integration/observability-capacity.integration.test.ts'` writes write and query latency to `reports/load/observability.json`. Run it against the database size you plan for before relying on the defaults.
- When to partition: if retention keeps ending at its time limit (the next run follows after the catch-up interval for several days), or dead tuples on `error_event` stay high after autovacuum, move occurrences to day partitions with a hand-written migration so retention drops a partition. Before that, lower sampling or retention days, or move the store to its own database.
- To move them to a second database: create it, set `OBSERVABILITY_DATABASE_URL` on api, gateway, admin and worker, run `pnpm db:migrate` with `DATABASE_URL` pointing at it (it receives the full migration set; only the three observability tables are used), and restart. No code change. Existing rows stay in the main database until retention removes them. The admin audit row for a status change is written before the status itself because no transaction spans two databases.
- Retention is a worker job (`OBSERVABILITY_RETENTION_INTERVAL_SECONDS`, `OBSERVABILITY_ERROR_EVENT_DAYS`, `OBSERVABILITY_ERROR_GROUP_DAYS`, `OBSERVABILITY_OPS_EVENT_DAYS`, `OBSERVABILITY_LONG_LIVED_EVENT_KINDS`, `OBSERVABILITY_LONG_LIVED_EVENT_DAYS`). `OBSERVABILITY_MAX_TOTAL_BYTES` removes the oldest occurrences early when the three tables outgrow it; that writes a `retention_size_guard_triggered` warning.
- Alerts: set `OBSERVABILITY_ALERT_EMAILS` on the worker (comma separated; empty switches alerting off) and `OBSERVABILITY_ADMIN_URL` so mails link to the error page. Each check (`OBSERVABILITY_ALERT_INTERVAL_SECONDS`) mails one digest of unresolved errors that are new, or that stored at least `OBSERVABILITY_ALERT_SPIKE_OCCURRENCES` occurrences within `OBSERVABILITY_ALERT_SPIKE_WINDOW_SECONDS`. Occurrences are sampled, so a busy failure reaches the threshold sooner than its real count. A group stays quiet for `OBSERVABILITY_ALERT_COOLDOWN_SECONDS` after a mail reached someone; if no mail got through it is tried again on the next check.
- GCP: add a Cloud Logging exclusion for `severity < WARNING` on these services and a short retention on the log bucket. This is configured in GCP, not in this repository. Errors are kept in our own tables, so dropping the lower severities loses no failure record. Replace `PROJECT` and `NAMESPACE` with your values, and check the filter in Logs Explorer before creating the exclusion:

  ```sh
  # What would be dropped: info and debug lines of the four services.
  FILTER='resource.type="k8s_container" AND resource.labels.namespace_name="NAMESPACE" AND severity<WARNING'

  gcloud logging sinks update _Default --project=PROJECT --add-exclusion="name=connect-below-warning,filter=$FILTER,description=Failures are stored in Postgres"

  # Keep what remains for 7 days (the default bucket keeps 30).
  gcloud logging buckets update _Default --location=global --project=PROJECT --retention-days=7
  ```

  Apply it to production first. Staging and preproduction run at `info` on purpose, so leave their namespaces out of the filter.

### Limits from the admin app

Limits are changed only in the admin app (Limits page); there is no other write path. Each change is saved with its audit entry in one database transaction. The api and the gateway follow a change within about 10 seconds, with no restart:

| Limit                                                                           | Followed by  |
| ------------------------------------------------------------------------------- | ------------ |
| `pod_max_inflight`, `event_loop_lag_shed_ms`, `heap_shed_percent`               | api, gateway |
| `db_queue_max_depth`, `db_queue_max_wait_seconds`, `db_queue_project_share_pct` | api, gateway |
| `project_requests_per_minute`                                                   | api          |
| `key_requests_per_minute`, `mcp_max_inflight_calls`                             | gateway      |

A limit nobody set keeps the value from the pod's environment. Removing an override returns to it. A limit set to 0 in the environment (off) stays off. The gateway reads the values from the api through a read-only route that only its own service identity may call and that returns numbers only. Settings that are fixed when a service starts (request and header size, shutdown time, thread pool) are listed under "Environment only" on the page, with no edit button.

### Overload and capacity

Every serving service (`api`, `gateway`) exposes these on its metrics endpoint. Replace `<service>` with the service name. Wire the alerts into whatever scrapes the endpoints; the thresholds are the starting values.

| Metric                                                       | Meaning                                                                                            |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `boldcreate_<service>_load_shed_total{reason}`               | Requests refused by the pod: `inflight`, `event_loop`, `heap`, `db_queue_full`, `db_queue_timeout` |
| `boldcreate_<service>_http_inflight_count`                   | Requests in flight on the pod; compare with `HTTP_MAX_INFLIGHT` or the Limits page value           |
| `boldcreate_<service>_eventloop_lag_seconds`                 | p99 event loop delay                                                                               |
| `boldcreate_<service>_heap_used_bytes` / `_heap_limit_bytes` | Heap use and its limit                                                                             |
| `boldcreate_<service>_http_requests_total{status_class}`     | Requests by status class; `5xx` should stay at zero                                                |

| Alert                   | Condition                                                                             | Means                                                       |
| ----------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Shedding sustained      | `rate(load_shed_total[5m])` over 1% of `rate(http_requests_total[5m])` for 10 minutes | Capacity is short: add pods or raise a limit. Not a fault.  |
| Database queue refusing | any increase of `load_shed_total{reason=~"db_queue.*"}` for 5 minutes                 | The database is the limit; adding pods will not help.       |
| In-flight near the cap  | `http_inflight_count` over 70% of the cap for 10 minutes                              | The pod is close to refusing requests.                      |
| Event loop slow         | `eventloop_lag_seconds` over 0.1 for 5 minutes                                        | CPU-bound pod; shedding starts at `EVENT_LOOP_LAG_SHED_MS`. |
| Heap high               | `heap_used_bytes / heap_limit_bytes` over 0.8 for 10 minutes                          | Memory pressure; shedding starts at `HEAP_SHED_PERCENT`.    |
| Role connection limit   | any log line or error with code `53300`                                               | A role is at its connection limit. Page.                    |
| Pod restarts            | any restart that is not a deploy                                                      | Page.                                                       |

These are defined but not yet connected to a monitoring system, and have not been checked in a staged overload.

## Troubleshooting

- A port is taken: `pnpm dev` names it; stop the other instance or set `PORT_*`.
- Secret writes return `503 org_key_pending`: the worker has not yet created the org key; retry after `Retry-After`.
- `pnpm dev` database problems: `pnpm dev --reset-db`.
- Test reports: `reports/test-run/index.html`; service logs in `reports/test-run/logs/services/`.

## Database connections and PgBouncer

The database allows 100 connections. Role limits come from `DB_VCPU` (1 vCPU gives api 8, gateway 3, worker 4, admin 3 and migrator 5, with 10 kept free). The manifests are in `k8s/pgbouncer/<environment>/`, and `packages/db/src/pgbouncer-manifest.test.ts` fails if a pool, a replica count or a role limit would overflow the database.

Cut over one environment at a time, in this order. Do not run the migration job with `DB_VCPU` before step 4: the new limits are lower than what the pods use today.

1. Mirror PgBouncer 1.26.1 into the registry and set `PgBouncerDbHost` in the pipeline.
2. Create the secrets `boldcreate-pgbouncer-auth-<env>` (a `userlist.txt` of SCRAM verifiers for the four roles) and `boldcreate-pgbouncer-tls-<env>`.
3. Apply `k8s/pgbouncer/<env>`, then point `DATABASE_URL` of the api, then of the worker, admin and gateway, at `boldcreate-pgbouncer-<env>:6432`.
4. Run the migration job with `DB_VCPU` and `DB_POOLED=1` set. It lowers the role limits and stores `statement_timeout` and `idle_in_transaction_session_timeout` on the roles.
5. Check `SELECT rolname, rolconnlimit FROM pg_roles WHERE rolname LIKE 'app_%'`, and that no `53300` error appears while the pods scale.

### The pooler on your machine

`pnpm dev` starts PgBouncer after the database and the roles exist, and gives the api, gateway, worker and admin a `DATABASE_URL` that points at it (`127.0.0.1:6432`, or `PORT_POOLER`), as they have when deployed. Migrations, the data browsers and the test runner still use the database directly. On the first run it downloads the PgBouncer 1.26.1 Windows release from the PgBouncer project, checked against a pinned sha256. It uses the same settings as `k8s/pgbouncer` (transaction mode, one pool per role, the same ignored startup parameters; no TLS, because the local database has none). Logs and the generated files are in `.cache/dev/pgbouncer`, and `pnpm dev` stops it on exit.

- `pnpm dev --no-pooler` (or `POOLER=off`) connects the apps to the database directly.
- If PgBouncer cannot start (no pinned release for this platform and no `PGBOUNCER_BIN`, or the port is taken), `pnpm dev` says so and the apps use the database directly.
- On another platform the project publishes no binary: install PgBouncer 1.26.1 or later and set `PGBOUNCER_BIN` to it.
- `pnpm pooler start|stop|status` runs it by itself, in an environment that has `DATABASE_URL` and the `DB_ROLE_PASSWORD_*` values.

To check how the code behaves through the pooler, set `POOLER_PORT=6432` and run `pnpm exec vitest run --project integration tests/integration/pooler-compat.integration.test.ts`. The tests check that the startup parameters are accepted, that transaction-local settings (the row-level security context) never leak between clients, that advisory transaction locks work, and that the database never sees more connections than the pool size. Without `POOLER_PORT` they are skipped.

## Test runs in the dev dashboard

The **Tests** page of the dev dashboard (`pnpm dev`, then Tests in the sidebar) shows every test run on this machine as it happens, lets you open any run, cancel one that is going, delete old ones, and start a new one.

**Starting a run.** Choose the test types (format, lint, typecheck, unit, client, security and the others), or use _Quick checks_ or _All default_, then _Run selected_. It runs `pnpm test -- --only=<your choice>`. Only the runner's own step names are accepted, and one run goes at a time. The output of a run started from the page is shown under the controls.

**Seeing every run.** The runner records each run in `.cache/test-runs/<run id>/`, so the list shows runs from any source, not only this page's own: a terminal, an AI session (shown as `claude-code`), CI (`ci`) or the page (`dashboard`). Name a run yourself with `TEST_RUN_LABEL=my-agent pnpm test -- --only=unit`. Each row shows its state (running, passed, failed, cancelled, interrupted, not started), who started it, the test types, how many are done, the tests counted, the issues and the time. The last 25 runs are kept. Everything is read from files, so a script reading `.cache/test-runs/*/live.json` sees the same thing.

**Opening a run.** Selecting a run opens it in a popup over the page, so you keep your place in the list; Esc or _Close_ returns to it. The popup shows the run's own page, also reachable at `/runs/<run id>`: use _Open in a new tab_ in the popup, or Ctrl-click the run, to keep it open beside the dashboard or to share the address. The page shows:

- the overview: result, test types done, tests passed, warnings and issues, who started it, and for how long it ran;
- one line per test type with its tests, passed, failed, skipped, warnings, issues and time (it updates every second while the run goes);
- the failing tests, with their file and the first line of the message;
- **every test case** of a finished test type, with its result, file and time, and the full failure message. Filter by result, search by name or file, and page through them. A test type's cases appear once it has finished;
- the log of each test type, which follows the output while the type runs;
- _Open the full report_, the HTML report kept with that run once it has ended.

**Cancelling.** _Cancel_ (on the run's row or in its page) works for any running run, whichever terminal or AI session started it. It writes a request file next to the run; the runner sees it, stops its own steps and its test stack, and records the run as _Cancelled_ (the steps that did not finish are shown as skipped, not as issues). If the runner has not reacted after 15 seconds, _Force stop_ appears: it ends that run's process tree, and only when the process id the run recorded is the one holding the run lock, so no other process can be named. Finding the run by a network port would not work: most test types use no port, and the ports belong to the test stack, not to the runner.

**Deleting.** _Delete_ removes one run with its logs, test results and report; _Delete finished runs_ removes every run that is not going. A running run cannot be deleted: cancel it first. The latest run's files in `reports/test-run/` are not touched.

**What counts as an issue.** Failed tests, plus warnings (lint and the other checks treat warnings as failures), plus one for a test type that failed without naming a test (for example a failed build). The sidebar badge shows `run` while a run goes and the issue count of the latest run when it failed.

**One run at a time.** The runs share fixed ports and the folder `reports/test-run/`, which always holds the latest run (its `index.html` is unchanged). A second `pnpm test` while one is going stops with a message, and the list shows it as _Not started_ with the process that held the lock, so an AI session or a second terminal is never invisible. A run whose process ended early shows as _Interrupted_.

**Safety.** The page listens on the loopback address only. Starting, cancelling and deleting need a request from the page itself (same origin) with a header that names the action, and only run ids and step names of the exact form the runner writes are ever turned into a path or a command. Test names, messages and logs are shown as text, never as markup.

## When the test stack fails on a developer machine

`pnpm test` runs the live-stack steps (security, conformance, integration, browser) against its own Postgres, Mailpit and services on side ports, in a temporary folder. Two things have made it fail now and then on Windows: Postgres restarting its own processes, and the stack being started long before it is used.

**What happens when a Postgres process exits.** Postgres restarts all its processes, which drops every connection and refuses new ones for a few seconds (the log says `terminating any other active server processes`, then `automatic recovery in progress`). A step that runs in that window fails, and the next one can fail in 0.0 s because the stack looks down.

**What the runner does about it.**

- It starts the stack when the first step that needs it is reached, not at the start of the run, so Postgres is not idle through the memory-heavy client tests. `TEST_STACK_EARLY=1` starts it early again.
- Before each step that needs the stack it checks that the database answers and that every service answers its health check. While Postgres is recovering it waits (up to 60 seconds), and the step's note says how long it waited.
- If the stack is still not usable, or a service died, it rebuilds the stack once per run and goes on. The step's note says so.
- When it had to wait or rebuild, the step's note carries the Postgres log lines that explain it (a process that exited, a file it could not open, a memory error).
- The stack's service logs, Postgres included, are kept with each run in `.cache/test-runs/<run id>/logs/services/`. The next run no longer wipes the evidence.

**If it keeps happening.**

1. Open the run on the dev dashboard's Tests page and read the note of the step that failed, then `logs/services/postgres.log` of that run.
2. `exited with exit code` or `was terminated by exception` with `Access is denied` or `could not rename` points to antivirus scanning or an indexer locking the database files. Exclude `<repo>/.cache` and the temporary folders `%TEMP%\boldcreate-test-*` from real-time scanning (this needs an administrator and changes a machine-wide setting, so it is yours to decide).
3. `out of memory` or a very low `free commit` points to memory pressure: close other heavy programs, or stop `pnpm dev` while running `pnpm test` (both start a Postgres, the services and many Node processes).
4. Run the steps that need the stack on their own (`pnpm test -- --only=integration`) while the rest of the machine is quiet, to tell a real failure from a stack failure.
