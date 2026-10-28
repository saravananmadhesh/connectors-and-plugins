# Security hardening migration

Status: in progress. Source: two architecture review passes of 2026-10-22 (static reading by review agents plus spot checks; nothing run live). Complexity: **S** under 1 day, **M** 1 to 3 days, **L** over 3 days or needs a decision entry. Status values: `todo`, `doing`, `partial`, `done`, `blocked`, `dropped`.

Rules: [CLAUDE.md](../../CLAUDE.md) and [AGENTS.md](../../AGENTS.md). Never edit, rename or delete a committed migration; add a new one. Every item adds tests for success, failure and edge paths. A one-way-door change gets an entry in [decisions.md](../architecture/decisions.md) first.

## Target architecture

- **`gateway` has no database access.** It authenticates keys and resolves installs through `api` (internal, workload identity), behind a cache. It never holds sealed data and org keys together.
- **No role has `BYPASSRLS`** except the migrator (today only `gateway` and the migrator do).
- **Tenant isolation does not rest on a `WHERE` clause alone**: tables that carry tenant data have row-level security, and each table without it has a written reason.
- **`admin` has least privilege**: it reaches tenant data through `api`, or its role is read-only on tenant data.
- **KMS permissions are split** by service (encrypt, decrypt) and the gateway needs none if it never unseals.
- **Internal calls cannot be replayed**: workload tokens on credential-resolving routes are single use.
- **Every deployed pod proves its environment** with `DEPLOY_ENV`.
- **No credential in git**; CI blocks a commit that adds one.
- **Default-deny network**, per service.
- **A changed or new MCP tool does not reach an agent unreviewed**; sign-up is throttled.

## Scope

This plan holds the **core architecture** items (the gateway and database access, row-level security, `admin` privilege, KMS and internal-call hardening), what is **critical now** and what is **recommended before the first real customers**. The rest of the review was dropped on 2026-10-22 as not needed yet: the monthly purge job (S7), admin OIDC or MFA, audit retention, organization soft-delete, org key rotation, and the later items of S5, S6, S8, S9 and S10. They stay in git history and can come back when customers, third-party plugins or public sign-up come closer.

### Tiers

**Critical now:** S0.1, S0.3, S0.5, S6.1, S6.2, S9.6, S11.1.

**Core architecture** (the main work; S2 is the largest change): S2.1 to S2.7, S3.1 to S3.5, S6.7, S9.4, S9.8, S9.10, S6.5, S1.5.

**Gates** (required only when the event happens): S10.1 and S10.2 before any third-party plugin is published; S10.3 before public sign-up opens.

**Recommended before the first real customers:** S5.1, S5.2, S8.2, S8.3, S9.1, S9.2, S4.1 to S4.3, and the base-image pin in S1.4.

Done already: S0.2, S0.4, S0.6, S1.1 to S1.3, S2.0, S8.1.

Until S2 lands, `gateway` keeps its database role; that exception is recorded in [decisions.md](../architecture/decisions.md) ("The gateway reads the database for now") and S4.1 limits what a compromised gateway can reach.

## S0 Immediate (before any release)

| Id   | Work                                                                                                                                                                                              | Complexity | Status                                                                     |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| S0.1 | Rotate the staging database superuser password that is committed in `k8s/staging-migration.yaml`; revoke the old one; purge it from git history (`git filter-repo`) and tell every clone holder   | S          | partial: password removed from manifest; rotate and purge history by hand  |
| S0.2 | Remove `NODE_TLS_REJECT_UNAUTHORIZED=0` and `sslmode=no-verify` from the migration job; trust the Cloud SQL CA                                                                                    | S          | done (migration job); config maps still set NODE_TLS_REJECT_UNAUTHORIZED   |
| S0.3 | Set `DEPLOY_ENV` in all 15 ConfigMaps (`staging`, `preproduction`, `production`); remove `KMS_LOCAL_KEYRING_PATH` from the worker; confirm how Deployments inject secrets (_unverified_)          | S          | blocked: staging Redis is plain redis://, which DEPLOY_ENV=staging rejects |
| S0.4 | Make the apps refuse to start when `DEPLOY_ENV` is missing and the process runs in a container (`KUBERNETES_SERVICE_HOST` set)                                                                    | S          | done: warns; REQUIRE_DEPLOY_ENV=true refuses to start                      |
| S0.5 | Add a real secret scanner to CI (gitleaks or similar); extend `scripts/checks/no-committed-secrets.ts` to flag URLs with userinfo; rename the "Secret scan" stage to match what it runs           | S          | partial: URL-with-password check done; gitleaks step added to CI           |
| S0.6 | Admin sessions live 8 h idle and 30 days absolute (`apps/admin/src/config.ts`); set the documented 15 min idle and 1 h absolute as defaults, shorten the cookie lifetime to match, and add a test | S          | done                                                                       |

## S1 Migration and release integrity

| Id   | Work                                                                                                                   | Complexity | Status                                                                                                                                                                |
| ---- | ---------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1.1 | Delete the embedded-SQL ConfigMap job `k8s/staging-migration.yaml`; migrations run only locally, never on the cluster  | S          | done                                                                                                                                                                  |
| S1.2 | Add a check that fails when a manifest embeds SQL or a migration name that is not in `packages/db/migrations`          | S          | done                                                                                                                                                                  |
| S1.3 | Run the migrations-append-only check on every push, not only on pull requests                                          | S          | done (untested in the pipeline)                                                                                                                                       |
| S1.4 | Pin base images by digest; deploy by image digest instead of the build id token; set `imagePullPolicy: IfNotPresent`   | M          | partial: base pinned; pull policy stays Always until deploys go by digest (then IfNotPresent is safe); deploy by digest needs the release pipeline (not in this repo) |
| S1.5 | Add image scan, SBOM and signing to the release pipeline; verify the signature in the cluster with an admission policy | L          | todo                                                                                                                                                                  |

## S2 Remove direct database access from the gateway (the main architecture change)

| Id   | Work                                                                                                                                                                                                               | Complexity | Status  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------- |
| S2.0 | Release 1 stop-gap: record in `decisions.md` that the gateway reads the database with its own role (including `BYPASSRLS`) until S2, why, and what limits the damage (S4.1)                                        | S          | done    |
| S2.1 | Add an internal `api` route that authenticates a key (`fyk_`, `stk_`) and returns the principal plus effective installs and tool policy (`resolveDelivery`); `last_used_at` is written by queue                    | M          | partial |
| S2.2 | Add internal `api` routes for the gateway's per-call needs: resolve the MCP server and credentials for one call, refresh a user's OAuth token (refresh moves into `api`), write usage and audit through the outbox | L          | partial |
| S2.3 | Gateway cache in front of S2.1 and S2.2 (pod-local plus Redis, tenant-scoped keys, event invalidation, TTL no longer than 60 s); on `api` failure serve cache, then fail closed with `503`                         | M          | todo    |
| S2.4 | Decide where the unseal happens. Preferred: `api` returns the upstream credential for one call over workload identity, so the gateway needs no KMS access. Record the choice                                       | L          | todo    |
| S2.5 | Remove `DATABASE_URL` and `DB_POOL_MAX` from the gateway config; in a new migration drop the `gateway` grants in `role-grants.ts` and the role itself; update the readiness check                                  | M          | todo    |
| S2.6 | Update `overview.md`, `security.md`, `invariants.md` and `deployment.md`; add a lint rule that forbids `@boldcreate-integrations/db` imports in `apps/gateway`                                                     | S          | todo    |
| S2.7 | Re-run the load targets (`pnpm test -- --only=load`): gateway overhead p95 under 50 ms with the extra hop                                                                                                          | M          | todo    |

Decision entry first: "The gateway does not read the database." Alternatives to record as rejected: keeping the read role with RLS (the role bypasses RLS today) and a read replica (same blast radius).

## S3 Database least privilege

| Id   | Work                                                                                                                                                                                               | Complexity | Status |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ |
| S3.1 | Remove `BYPASSRLS` from the `gateway` role, so only the migrator has it (follows S2.5); add a test that reads `pg_roles`                                                                           | S          | todo   |
| S3.2 | Scope the `audit_log` insert policy: org rows only when `app.tenant` matches; a null org only for `admin` and `worker`                                                                             | M          | todo   |
| S3.3 | Add row-level security on `user` (by project and org) and `idempotency_key` (by scope) so a missing `WHERE` cannot leak across projects; keep a documented maintenance purpose for sign-in lookups | L          | todo   |
| S3.4 | Decide for `admin`: route data access through `api`, or cut its role to read-only on tenant data and write only on catalog tables (plugins, sources, kill switches, categories)                    | M          | todo   |
| S3.5 | Revisit the tables marked `rls: 'none'` (`session`, `auth_identity`, `email_token`, `connection_secret`, `outbox`); give each a written reason or a policy                                         | M          | todo   |

## S4 Network and cluster

| Id   | Work                                                                                                                                                                                           | Complexity | Status                                                                                            |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| S4.1 | Default-deny `NetworkPolicy` per namespace, then explicit ingress and egress per service (DNS, `api`, Postgres, Redis, KMS, object store; the gateway also needs egress to upstream MCP hosts) | M          | todo                                                                                              |
| S4.2 | Block the metadata server (169.254.169.254) from every pod that does not need it; use Workload Identity only for pods that call Google APIs                                                    | S          | partial: web only (api, gateway, worker, admin call KMS or GCS through the metadata server)       |
| S4.3 | Add a `PodDisruptionBudget` for each service with 2 or more replicas; add an HPA for `gateway` and `api` (in-flight requests and event-loop lag)                                               | S          | partial: PDBs done for the 6 Deployments with 2 replicas; HPA not done (needs a metrics decision) |

## S5 Queue and idempotency correctness

| Id   | Work                                                                                                                                             | Complexity | Status |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------ |
| S5.1 | Renew the outbox lease while a handler runs (heartbeat), or size it from the longest job; treat a lost lease as an error and stop the handler    | M          | todo   |
| S5.2 | Audit every outbox handler for idempotency (email, webhook, ingestion); add a dedupe key per side effect and a test that runs each handler twice | M          | todo   |

## S6 Application fixes

| Id   | Work                                                                                                                                                                                            | Complexity | Status |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ |
| S6.1 | Validate OAuth endpoints at discovery: `authorization_endpoint`, `token_endpoint` and registration must be `https:` (same local exemptions as the SSRF guard); reject `javascript:` and `data:` | S          | todo   |
| S6.2 | Bind the project OAuth `state` to the starting browser: a short-lived nonce the host holds and sends back, or a confirmation page naming the provider account; add a fixation test              | M          | todo   |
| S6.5 | Admin: do not reactivate a revoked identity on setup completion; make revoke final until an admin re-invites; add a per-IP lockout next to the per-identity one                                 | M          | todo   |
| S6.7 | Add a replay cache for workload tokens on the internal audiences that unwrap or resolve credentials (Redis, TTL equal to the token lifetime)                                                    | M          | todo   |

## S8 Enterprise user flows

| Id   | Work                                                                                                                                                                                                                                    | Complexity | Status |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ |
| S8.1 | **Bug:** invite resend never delivers. `resendInvite` enqueues `invite.created` with no token and the worker rejects it. Mint a new token (replace the hash, reset the expiry), enqueue it, audit it; test that the email is sent       | S          | done   |
| S8.2 | Offboarding: when a member is removed or suspended, revoke the keys they made and delete their personal installs and OAuth tokens. Decide for `fyk_` keys (today documented as surviving their creator) and record it in `decisions.md` | M          | todo   |
| S8.3 | Let an org admin list and revoke any key in the organization (today revoke filters on the caller)                                                                                                                                       | S          | todo   |

## S9 Redis and KMS usage

| Id    | Work                                                                                                                                                                                                                            | Complexity | Status |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ |
| S9.1  | Cloud KMS unwrap makes two calls (`getCryptoKeyVersion`, then `decrypt`). Cache the version state per key and version for 60 to 300 s, or drop the check (decrypt already fails for a disabled version); cuts KMS reads by half | S          | todo   |
| S9.2  | KMS client: set explicit timeout and bounded retry with backoff; cache `KmsUnavailable` for 2 to 5 s so an outage is not retried by every request                                                                               | M          | todo   |
| S9.4  | Split KMS permissions: worker gets encrypt only, api and gateway get decrypt only (separate service accounts); follows S2.4 if the gateway loses KMS access                                                                     | M          | todo   |
| S9.6  | Redis subscriber and main client never reconnect after a drop (`retryStrategy` returns null). Add backoff reconnect, resubscribe handlers, and a circuit breaker so an outage does not cost a connect timeout per request       | M          | todo   |
| S9.8  | Key authentication reads Postgres on every gateway request. Add a 5 to 10 s cache keyed by key hash, evicted on revoke and on member removal through the existing invalidation channel (becomes part of S2.3)                   | M          | todo   |
| S9.10 | Make the fail mode per use consistent and documented: the IP throttle and the gateway key limit fail open, login, project and platform-key limits fail closed. Decide whether the gateway limiter should fail closed            | S          | todo   |

## S10 Content trust and abuse protection

| Id    | Work                                                                                                                                                                                                                                                                                         | Complexity | Status |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ |
| S10.1 | **Implement tool acceptance.** `recordProbe` overwrites tools and the hash on every probe. Compare the new hash with the accepted one; a change goes to a pending state, the accepted tools stay in force, and an admin accepts it. Add a rug-pull test (description changes after approval) | L          | todo   |
| S10.2 | Undiscovered servers list tools live on every `tools/list` (not stored or reviewed). Refuse `tools/list` and `tools/call` until the first discovery has been stored and accepted                                                                                                             | M          | todo   |
| S10.3 | Throttle `/signup`, `/resend-verification` and `/forgot-password` per IP and per address; add a per-user cooldown and a cap on open tokens; do the same for invite sends                                                                                                                     | M          | todo   |

## S11 Checks

| Id    | Work                                                                                       | Complexity | Status |
| ----- | ------------------------------------------------------------------------------------------ | ---------- | ------ |
| S11.1 | Confirm the Cloud SQL major version matches what the migrations and tests run against (17) | S          | todo   |

## Order

S0 first, in any order. Then the critical code items: S6.1, S6.2, S9.6. S2 is the largest change: S2.1 and S2.2 first, then S2.3 and S2.4, then S2.5, then S3.1. S4.1 can start after S0 and should land before S2.5, so the new internal path is the only route; it needs the Postgres and Redis addresses and the ingress path first. S9.8 merges into S2.3; S9.4 follows S2.4. S3.2 to S3.5 are independent of S2. S5.1 comes before S5.2. S10.1 and S10.2 before any third-party plugin; S10.3 before public sign-up. S6.7 before the gateway resolves credentials through `api` (S2.2).

## Exit criteria

- No credential in git or its history; CI blocks a new one.
- `apps/gateway` imports nothing from `packages/db`; no role except the migrator has `BYPASSRLS`.
- Every manifest sets `DEPLOY_ENV`; the apps refuse to start without it in a container.
- Each namespace limits traffic per service; every multi-replica service has a PodDisruptionBudget.
- Every table that carries tenant data has row-level security or a written reason it does not.
- `admin` cannot write tenant data it has no need to write.
- Running each outbox handler twice produces one side effect.
- A changed MCP tool never reaches an agent before an admin accepts it.
- Offboarding a member leaves no usable key, install or token of theirs behind (or the exception is recorded in `decisions.md`).
- Full `pnpm test` passes (`overall: PASSED`, no errors or warnings), plus `pnpm test:staging`.
