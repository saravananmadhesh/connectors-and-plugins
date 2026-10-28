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

## Troubleshooting

- A port is taken: `pnpm dev` names it; stop the other instance or set `PORT_*`.
- Secret writes return `503 org_key_pending`: the worker has not yet created the org key; retry after `Retry-After`.
- `pnpm dev` database problems: `pnpm dev --reset-db`.
- Test reports: `reports/test-run/index.html`; service logs in `reports/test-run/logs/services/`.
