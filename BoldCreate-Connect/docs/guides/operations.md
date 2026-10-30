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
- Metrics: `packages/observability` exposes Prometheus HTTP totals/duration and in-flight requests per service, plus event-loop lag, heap, GC pause and thread-pool probe. Scrape these with the verified platform collector. Add pool wait, dependency latency/health, queue depth and oldest job age when needed for scaling, but only after confirming their authoritative sources and query semantics. Live active-user/MCP counts are approximate context only; don't use identities as metric labels or scale on active counts alone. Use short windows for live operations and the existing metrics backend for historical trends (24 hours to 90 days, custom periods, and yearly only if verified retention supports it); show histogram-derived latency quantiles and correctly aggregated counters/gauges. Do not store scrapes in Postgres. Admin refresh must re-read the configured source through the admin API, display response source and timestamp, preserve last-successful data as stale on failure, and never fabricate values. Backend and GCP compute product are unverified; no production availability or retention is implied. Page on sustained SLO burn and saturation: gateway availability 99.9% with overhead p95 < 50 ms, API availability 99.9%, oldest job < 5 min.
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

## Troubleshooting

- A port is taken: `pnpm dev` names it; stop the other instance or set `PORT_*`.
- Secret writes return `503 org_key_pending`: the worker has not yet created the org key; retry after `Retry-After`.
- `pnpm dev` database problems: `pnpm dev --reset-db`.
- Test reports: `reports/test-run/index.html`; service logs in `reports/test-run/logs/services/`.
