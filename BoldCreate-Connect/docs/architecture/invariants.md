# Invariants and failure behaviour

Binding for every change; each has a test.

## Invariants

1. Services are stateless; every capability sits behind a port (`cache`, `queue`, `lock`, `blob`, `email`, `limiter`, `clock`, `kms`, `secrets`) with a local and a cloud adapter. A shared contract suite runs against the local adapter in `pnpm test`.
2. Limits, plans, quotas, breaker thresholds, timeouts and pool sizes are data or config, never code.
3. Migrations are expand/contract; constraints live in migrations and are tested on real Postgres.
4. Public APIs are versioned `/v1`, generated into OpenAPI from the route registry, and contract-tested.
5. Retryable writes carry enforced idempotency keys (response stored 24 h; same key with another body is `409`); jobs are durable and idempotent.
6. Kill switches exist for plugin, plugin version, plugin source, upstream, key and org; risky features sit behind flags.
7. Every mutation writes its audit row in the same transaction. Gateway events go through a durable outbox. Per-call usage may lose data on a crash (buffering is not confirmed in the code).
8. The `queue` port runs over the `outbox` table (`postgres-queue`); domain code enqueues with `insertOutbox(tx, ...)`; event types are `noun.verb`.
9. Dependency direction is enforced (see overview); no `any`, `console.*`, `require()`, sync I/O or unsafe regex in server code.

## Failure behaviour

| Dependency down            | Behaviour                                                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Redis                      | Conservative per-pod rate limit; the IP throttle and the gateway key limit fail open, while login, project and platform-key limits fail closed; key auth has no cache and reads Postgres; OAuth locks and credential writes fail closed |
| Upstream MCP               | Breaker returns a fast error; other tenants unaffected                                                                                                                                                                                  |
| KMS                        | Cached unwrapped keys until TTL, then fail closed; a disabled key fails at once                                                                                                                                                         |
| Postgres failover          | Reconnect with backoff; idempotent writes; gateway keeps serving from cache                                                                                                                                                             |
| `api` (from gateway)       | Cached resolutions keep serving; misses fail closed with `503`                                                                                                                                                                          |
| GitHub                     | Ingestion retries with backoff; nothing user-facing affected                                                                                                                                                                            |
| S3                         | Cached archives keep serving; misses `503` + `Retry-After`; breaker protects S3                                                                                                                                                         |
| Member removed mid-session | Tokens evicted; streams closed; next call denied                                                                                                                                                                                        |

## Migrations

- Generated with `pnpm db:generate`; never hand-edited, renamed or deleted. Custom SQL (RLS, maintenance policies, triggers) only where Drizzle cannot express it, as its own migration (`pnpm db:generate --custom --name=<name>`).
- `pnpm db:lint` checks migrations from `firstLinted` in `packages/db/migration-lint.json`. A contract change (drop, rename, type change, `SET NOT NULL`) is allowed only if listed in `contractAllow` with the decision that explains it (a heading in [decisions.md](decisions.md)).

## Limits that matter

Sized for 5,000 concurrent users (gateway about 2–3k rps peak, ~6k in-flight, many small pods; scale on in-flight and event-loop lag; worker on queue depth). No CPU work over ~5 ms on a request thread; tar, hash and scan only in `worker`. Targets (k6, `pnpm test -- --only=load`): catalog p95 < 100 ms, sync 304 p95 < 50 ms, cached `tools/list` p95 < 50 ms, gateway overhead p95 < 50 ms, errors < 1%.
