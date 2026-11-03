# Load test plan

Status: proposed. Nothing in this plan is built yet. The only load run today is the custom runner in `tests/load` (`pnpm test -- --only=load`). Adding Artillery is a new dev dependency (exact version through `pnpm add --save-catalog`, `catalog:`), so it is recorded in `docs/architecture/decisions.md` before it is added.

## Scope and goal

Load tests only: traffic volume, shape and duration, and what the applications and the SDK do under it. Correctness of single calls (retry arithmetic, error types, idempotency format, paging edges) belongs to the unit and integration tests in `packages/sdk` and `tests/integration`.

The goal is to show, for the main customer shape (cloud AI agent apps), that:

1. The host path through the SDK holds its latency and limits at the planned peak.
2. The gateway carries agent tool calls at volume without adding more than its share of latency.
3. The worker drains its queues, and does not slow live traffic while it does.
4. The console (web, api) stays usable for operators while all of that runs.
5. One project, one slow upstream service or one failing dependency does not take the others down.
6. The system recovers by itself after a spike, a restart or a dependency loss.

## How the plan is built

The five qualities asked for, and the rule that delivers each.

| Quality      | Rule                                                                                                                                                                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Maintainable | **Scenarios are data, code is shared.** One catalog file lists every scenario (id, area, steps, expected statuses, thresholds). The guard, bootstrap, SDK steps, fixture servers, fault proxy and report code exist once in `tests/load/lib` and are used by every runner. |
| Configurable | **Everything that changes between runs is configuration, never an edit to a scenario.** Profile, target, sizes, mix, phases, thresholds and tool choice come from one config file and `LOAD_*` variables, validated at start.                                              |
| Optimized    | **The generator must not be the bottleneck.** Keep-alive and pooled connections, data created before the timed phase, no per-request logging, sampled traces, a bounded memory of results (histograms, not lists), and one process per core with a cap on in-flight calls. |
| Efficient    | **Run only what a change can affect, at the cheapest tier that answers the question.** Tiers (below) from a seconds-long smoke to a staging soak, and a map from changed paths to scenario groups.                                                                         |
| Stable       | **Same input, same result.** Seeded data and mix, a warm-up that is not measured, checks that mark a run invalid instead of failing it, a stored baseline with a tolerance, and cleanup that always runs.                                                                  |

### Maintainable

- **One home:** everything lives under `tests/load`. The existing runner moves to `tests/load/custom`, Artillery to `tests/load/artillery`, shared code to `tests/load/lib`. No separate package: nothing outside the tests imports it, and a package needs an architecture table row and rule (see CLAUDE.md).
- **One catalog:** `tests/load/scenarios.ts` is the list of scenario ids in this plan (A1 … L5). A runner picks scenarios by id or group. The report names the id that failed, and a unit test checks that every id in the plan, the catalog and the report schema match.
- **Thin scenario files:** an Artillery YAML only wires phases and weights to named steps. Behaviour is in typed steps in `tests/load/lib/steps`, which call the real SDK. Steps have unit tests, with the same style and gates as the rest of the repo (95% lines, 85% branches for `lib`).
- **Fixture servers** (five MCP patterns) and the **fault proxy** are small in-repo Node programs with their own tests, not a Docker image to keep up to date.
- **One README** in `tests/load` replaces the several that would otherwise grow: how to run, tiers, config, thresholds, how to read a report, how to add a scenario.
- **The custom runner is retired only when** Artillery scenario A, on the same stack, (1) runs the smoke and full sizes, (2) fails on any unexpected status, (3) waits out `429` by `Retry-After` and counts it, (4) gives p50, p95 and p99 within 10% of the runner's, and (5) keeps the guard and scrubbed reports. Until then both run.

### Configurable

One validated config (`tests/load/load.config.ts`, a typed object checked by a schema at start; a bad value stops the run with the field named). Overrides come from `LOAD_*` variables, so CI and a laptop use the same file.

| Setting      | Example                                                        | Notes                                                                                                                        |
| ------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `profile`    | `smoke`, `load`, `stress`, `spike`, `soak`                     | Picks phases, sizes and thresholds together                                                                                  |
| `target`     | `isolated`, `staging`                                          | Staging needs the allow below. Production is never accepted                                                                  |
| `groups`     | `host,gateway,worker,console,services,limits,ops`              | Which scenario groups run                                                                                                    |
| `size`       | `users`, `activeUsers`, `concurrentRuns`, `toolCallsPerMinute` | Defaults per profile; the first agent-app run is 200 concurrent runs and 2,000 calls a minute until a customer figure exists |
| `mix`        | the agent profile shares                                       | See agent profiles                                                                                                           |
| `phases`     | warm-up, ramp, hold, spike, drain, cool-down                   | Durations and rates, per profile                                                                                             |
| `thresholds` | per measure and profile                                        | In the config, so a change is reviewed as a change to one file                                                               |
| `seed`       | any integer                                                    | Fixes data, mix and order                                                                                                    |
| `services`   | `fixtures` (default) or `real` (opt-in smoke)                  | Real services are never part of a load profile                                                                               |
| `generator`  | `maxInFlight`, `workers`                                       | Defaults from the core count                                                                                                 |

Defaults are written in one place and listed in the README, never repeated in the scenarios.

### Optimized

- Data first: users, projects, keys, plugins and connections are created before the timed phase, in bulk and in parallel, so the phase measures the scenario and not the set-up.
- Pooled keep-alive connections per target, HTTP/1.1 with a fixed pool size or HTTP/2 where the target offers it, and a fixed number of generator processes. DNS and TLS are resolved once per worker.
- Results go into fixed-size histograms (HDR style). No list of every call is kept; a sampled 1% keeps the full trace of a call for diagnosis, plus every failure.
- The generator logs counters once a second, not per call. Output to a file, not the terminal.
- Fixture servers answer from memory with a fixed delay, and record only counters and a short ring of what they received.
- The generator watches itself (CPU, memory, event-loop delay, open sockets). Above 70% CPU or 50 ms event-loop delay, the run is **invalid**, not slow, and says so.

### Efficient

Tiers, from cheapest, with the question each answers and when it runs.

| Tier | Name             | Length       | Target   | Runs                                                       | Question                                      |
| ---- | ---------------- | ------------ | -------- | ---------------------------------------------------------- | --------------------------------------------- |
| 0    | Smoke            | under 1 min  | isolated | Every full `pnpm test` (the existing `--only=load` step)   | Does the whole path answer?                   |
| 1    | Group            | 5 to 10 min  | isolated | On demand, and on a change to a group's paths              | Did this change break a group under load?     |
| 2    | Load             | 20 to 30 min | isolated | Before a release, and nightly if CI allows (open question) | Does it hold the planned peak?                |
| 3    | Stress and spike | 30 min       | isolated | Before a release that touches limits, gateway or worker    | Where does it break, and how does it recover? |
| 4    | Soak             | 1 to 4 h     | staging  | Before a release, in an agreed window                      | Does it stay flat over hours?                 |
| 5    | Operations       | 30 to 60 min | staging  | Before a release, in an agreed window                      | Does it survive restart, loss and scale-out?  |

- **Change map:** `tests/load/changed-paths.ts` maps path globs to groups (for example `apps/gateway/**` and `packages/provider-mcp-http/**` to `gateway,services`; `apps/worker/**` to `worker`; `packages/limits/**` to `limits`; `packages/sdk/**` to `host`). A tier 1 run takes the groups of the changed files.
- One data set is reused across scenarios of a run, and one stack across tiers 0 and 1 when they run together.
- Cost control: generators are started for the run and stopped after; a run has a hard time limit and a budget note in its report.

### Stable

- **Deterministic:** a seed fixes user ids, plugin choice, the agent mix and the order of steps. The report stores the seed and the commit, so a run can be repeated.
- **Warm-up is not measured.** The first minute (JIT, pools, caches) is excluded from thresholds. A baseline is the median of at least three runs, never one.
- **Invalid is not failed.** A run is marked invalid, and not counted against the code, when the generator is saturated, the stack was not healthy at the start (a health check before the run), the fixtures were the bottleneck, or another test run shared the ports (the test runner already warns about this).
- **Baseline and tolerance:** `tests/load/baseline/<profile>.json` holds the accepted numbers. A run fails when p95 or throughput moves more than the tolerance (start at 15%) in the wrong direction, and prints the change per scenario id. A baseline is updated only by a reviewed change.
- **Cleanup always runs:** the project, its users, keys, connections and fixtures are removed in a `finally`, also after a failure, with a sweep of leftovers by run id at the start of the next run.
- **No flaky retries hiding a failure:** a failed scenario is rerun once to tell a flake from a defect; both results are reported, and a pass on the rerun is marked "flaky" and counted.
- **Timeouts everywhere:** a run, a phase, a call and the cleanup all have limits, so a hung run ends and reports.

## Safety rules (same as `tests/load/README.md`)

- Never against production. A run needs `LOAD_ALLOW=1` and a target host listed in `LOAD_ALLOWED_HOSTS` (default `localhost,127.0.0.1`). The guard in `tests/load/guard.ts` stays the single check; otherwise the runner prints a refusal and exits 2. The old `K6_*` variable names are renamed to `LOAD_*`, with the old names read for one release and reported as deprecated.
- Targets: the isolated stack of the test runner, or staging with an explicit allow, an agreed window and a note to the team. Staging runs are never part of `pnpm test`.
- Each run creates its own organization, project and project key (as `tests/load/bootstrap.ts` does) and removes them at the end. No shared data is reused.
- Keys and tokens pass through the environment, never into config files or reports. Reports are scrubbed of `Authorization` and any `prk_` or session token before they are kept.
- Load never targets real third-party services (GitLab, DeepWiki, others). Fixtures stand in for them.

## Target: cloud AI agent apps

The host products are cloud AI agent apps: a backend that runs many agents at once, each using the SDK to get a session for its end user and then calling tools on connected MCP services.

### Workload model

| Trait of an agent app                      | Effect on the test                                                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| One session per agent run, many short runs | `sessions.create` is on the hot path; sessions are made and dropped in large numbers                             |
| Tool calls come in bursts and chains       | Each run makes 5 to 30 calls in a few seconds, often in parallel, then goes quiet; traffic is spiky              |
| Many runs share one project key            | One project reaches the project limit before any user does; the limit and its isolation (B) matter most          |
| Runs for one user overlap                  | The same user's connection is used by parallel calls, so token refresh must not duplicate (F5)                   |
| Calls wait on the upstream service         | Tool latency is mostly the upstream's; the platform's share must stay small and flat as concurrency rises        |
| Agents retry on their own                  | A `429` or `5xx` makes agent frameworks retry on top of the SDK's retry; the test includes a retry storm         |
| Long-lived runs                            | A run can last minutes to hours; sessions expire and are renewed in the middle of a run (A3)                     |
| Runs start in waves                        | Spike and queue-drain phases, not only a ramp                                                                    |
| Tool calls go to the gateway directly      | After `session.mcp()` the agent talks MCP to the gateway with the session token; the SDK is not on that path (K) |

### Agent profiles

Each virtual user is one agent run. Mix by share of runs (configurable):

| Profile       | Share | Behaviour                                                                                  |
| ------------- | ----- | ------------------------------------------------------------------------------------------ |
| Quick lookup  | 50%   | New session, `session.mcp()`, 2 to 4 tool calls across 1 to 2 services, done in under 10 s |
| Research      | 25%   | New session, 10 to 30 tool calls, 3 to 4 in parallel, across 3 to 5 services               |
| Long-running  | 10%   | One session for 10 to 60 minutes, a tool call every 5 to 30 s, a renewal on the way        |
| First connect | 10%   | A user who has to sign in to a service first (F2), then the calls of a quick lookup        |
| Retry storm   | 5%    | Calls that the agent retries on any `429` or `5xx` with a short fixed delay                |

### Phases

Warm-up 1 minute at 5 runs/s (not measured). Ramp to the planned peak over 5 minutes. Hold 10 minutes. **Spike:** three times the peak for 60 seconds, as a scheduled batch of agents starts together. **Queue drain:** back to peak while the spike's long runs are still going. Cool-down 1 minute. The soak uses the long-running profile.

## Machines

Three roles, kept apart so that one does not distort the numbers of another.

| Role              | Where                                                           | Notes                                                                                                                    |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Load generator    | One or more cloud VMs in the same region as the target          | CPU under 70% during the run; more VMs for the spike. Never a developer laptop for a sizing, soak or operations run      |
| System under test | The isolated stack (tiers 0 to 3) or the staging cluster (4, 5) | Staging shows real network, TLS, autoscaling and the IPv4-only cluster; the isolated stack shows the code on one machine |
| Fixture services  | Next to the target, on their own machine or pod                 | The five fixture MCP servers must not be the bottleneck; they answer in a fixed time and record what they receive        |

- Generator and fixtures sit in the same region and network as the target, so the latency measured is the platform's. Every report records region, instance type, commit and seed.
- The staging cluster is IPv4 only. The generator and fixtures must be reachable on IPv4, and the dual-stack case (C7) is in every tier 2 and later run.
- The target's own signals are collected next to the client numbers: api, gateway, worker and database CPU and memory, connection pool use, Redis latency, queue depth, and the error and key-event tables.

## Layout (to build)

```text
tests/load/
  README.md                one README: run, tiers, config, reports, adding a scenario
  load.config.ts           typed config and defaults, validated at start
  scenarios.ts             the catalog: every id in this plan
  changed-paths.ts         changed files to groups
  guard.ts  bootstrap.ts   shared, already present
  lib/
    steps/                 typed SDK and raw MCP steps (with unit tests)
    fixtures/              five fixture MCP servers, one per pattern
    fault-proxy.ts         latency, resets, 5xx
    stats.ts  report.ts    histograms, scrub, baseline compare, invalid-run checks
  custom/                  the existing runner (moves here), retired by the rule above
  artillery/               one YAML per group: host, gateway, worker, console, services, limits, ops
  baseline/                accepted numbers per profile
reports/load/<profile>-<run id>.json
```

Wired into the test runner as the opt-in `load` step (`--only=load`), with `LOAD_PROFILE` and `LOAD_GROUPS`; tier 0 is what it runs by default.

## Why Artillery next to the custom runner

| Need                                                    | Custom runner  | Artillery                   |
| ------------------------------------------------------- | -------------- | --------------------------- |
| One fixed host scenario, fails on any unexpected answer | Yes            | Possible, not needed        |
| Arrival-rate phases (ramp, spike, soak) with thresholds | No             | Yes (`phases`, `ensure`)    |
| Several weighted scenarios at once                      | No             | Yes                         |
| Calling the SDK itself (Node processor)                 | Yes (own code) | Yes (`processor` functions) |
| Reports, percentiles per step, exit code on a threshold | Own JSON       | Built in                    |

k6 (no Node, so no real SDK), Locust (Python) and autocannon (one endpoint, no flows) were considered. They are not used for scenarios. autocannon may be used for a one-endpoint spot check; k6 only if stricter raw HTTP thresholds are wanted later.

## SDK surface under test

Client (`ConnectClient`, a project key `prk_`): `users`, `sessions`, `plugins`, `catalog`, `authConfigs`, `connections`, `logs`, `usage`, `webhooks`, `create(userId)`, `withSignal`.
Session (`ConnectSession`, a session token): `mcp`, `authorize`, `authConfigs`, `catalog`, `plugins` (manifest, component, report), `refresh`, `waitForConnection`, `withSignal`.
Behaviours: retry on `429/502/503` for `GET/PUT/DELETE` only (a `POST` is never retried), `Retry-After` honoured and capped, exponential backoff (3 retries, 250 ms, 10 s cap), 30 s timeout, `Idempotency-Key` on creates, typed errors.

## Scenarios

Groups: **host** (A, G), **limits** (B), **failure** (C), **soak** (D), **isolation** (E), **services** (F), **webhooks/worker** (H), **console** (I, J), **gateway** (K), **ops** (L), and the **mixed** run (M). IDs are used in reports and the catalog.

### A. Host flow (group host)

| ID  | Scenario                     | Steps (SDK)                                                                      | Must hold                                                                  |
| --- | ---------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| A1  | Register users               | `users.put` for a new `userId`                                                   | 200/201, no 5xx; a repeat of the same put is idempotent                    |
| A2  | Create a session and read it | `sessions.create`, `session.mcp()`, `session.authConfigs()`, `session.catalog()` | 201 then 200s; the token works at the gateway                              |
| A3  | Renew                        | `session.refresh()` before expiry                                                | New token works                                                            |
| A4  | List with paging             | `users.list` and `sessions.list` over several pages                              | Cursors never repeat or skip an item                                       |
| A5  | Revoke                       | `sessions.revoke`, then a call with that token                                   | The next call fails with `ConnectAuthError`; no other session is affected  |
| A6  | Delete a user                | `users.delete`, then `users.get`                                                 | `ConnectNotFoundError`; the user's sessions stop working                   |
| A7  | Start a connection           | `connections.start` for an OAuth plugin                                          | A sign-in address and expiry; a state row per call; no 500                 |
| A8  | Read usage and logs          | `usage()`, `logs.list`                                                           | 200 within the read threshold; counts grow after traffic                   |
| A9  | Plugin sync                  | `session.plugins.manifest`, `component`, `report`                                | An unchanged manifest answers `notModified`; `component` checks its sha256 |

### B. Limits and throttling (group limits)

| ID  | Scenario                          | Must hold                                                                                                                                  |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| B1  | Stay under the project limit      | At 80% of `requestsPerMinutePerProject` (5,000 a minute now) there is no `429`                                                             |
| B2  | Go over the project limit         | `429` with `Retry-After`; `x-ratelimit-limit` is the project limit and `x-ratelimit-window-size` is 60 seconds (the window, not the limit) |
| B3  | SDK waits and recovers            | A `GET` is retried after `Retry-After` (cap 10 s) and succeeds when the window resets; calls made are bounded by the retry count           |
| B4  | A `POST` is not retried on `429`  | `ConnectRateLimitError` after one attempt, carrying the retry delay                                                                        |
| B5  | One project cannot starve another | While project 1 is throttled, project 2 sees no `429` and no latency rise above the threshold                                              |
| B6  | Keys and sessions count together  | Calls by the key and by sessions share one counter                                                                                         |
| B7  | A changed limit takes effect      | After the admin app changes the limit, behaviour changes within the api's cache time (`docs/plans/project-rate-limits.md`)                 |
| B8  | Per-key limit                     | `requestsPerMinutePerKey` applies to a key independently of the project limit                                                              |

### C. Failure and resilience (group failure)

A fault proxy sits between the SDK, or the gateway, and its peer.

| ID  | Fault                                                                  | Must hold                                                                                                                |
| --- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| C1  | Added latency above `timeoutMs`                                        | A typed timeout error at `timeoutMs`; no hang; `withSignal` aborts a pending call                                        |
| C2  | `502`/`503` bursts                                                     | `GET/PUT/DELETE` recover within the retry budget; a `POST` is not repeated; no duplicate users or sessions               |
| C3  | Connection reset mid-response                                          | A typed error, no unhandled rejection, no leaked socket (handle count flat over the run)                                 |
| C4  | Duplicate create with the same `Idempotency-Key`                       | Same response and one resource, for 24 h, also with 50 parallel duplicates                                               |
| C6  | Upstream MCP server down                                               | `session.mcp()` reports it unavailable with a reason; the other servers stay available                                   |
| C7  | Dual-stack DNS answer (IPv6 listed first, host reachable on IPv4 only) | The gateway reaches the upstream over IPv4; discovery does not fail as `unreachable` (regression of the DeepWiki report) |

### D. Soak (group soak)

1 to 4 hours (tier 4) at the long-running profile. Flat p95, no growth of memory, open sockets or database connections in the generator and the target, no growth of error rate, and session expiry and renewal keep working across the run.

### E. Isolation under load (group isolation)

| ID  | Check                                                                                   |
| --- | --------------------------------------------------------------------------------------- |
| E1  | A session token of project A cannot read project B at any load level                    |
| E2  | A key without `connections:*` scope is refused at the same rate under load as when idle |

### F. Connecting five services through the SDK (group services)

Five MCP services cover every way the platform connects to an upstream server. Load runs call **local fixture servers** that behave like each pattern, never the real GitLab or DeepWiki. The real services are used only in a separate opt-in smoke (one user, a few calls, `services: real`), which also keeps the DeepWiki IPv6 and GitLab missing-server-row reports covered.

| #   | Service pattern (example)                | Platform mode               | What the fixture does                                                            |
| --- | ---------------------------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| 1   | Public, no sign-in (DeepWiki)            | `none`                      | Answers `tools/list` and `tools/call` with no credentials; dual-stack DNS answer |
| 2   | OAuth with dynamic registration (GitLab) | `dcr` (project auth config) | Discovery, client registration, authorize, code exchange, refresh, token expiry  |
| 3   | OAuth with a pre-registered client       | `oauth_client`              | Same flow with a fixed client id and secret                                      |
| 4   | One key for the whole project            | `shared_secret`             | Checks the secret header the platform adds; rejects a missing or wrong one       |
| 5   | A key or form value per user             | `user_form`                 | Checks the per-user value; rejects another user's value                          |

| ID  | Use case                           | Steps                                                                  | Must hold                                                                                                    |
| --- | ---------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| F1  | Add the plugin and its auth config | `plugins.put`, `authConfigs.create` (modes 2 to 4)                     | 201; no secret is returned by any read                                                                       |
| F2  | Sign in a user                     | `connections.start`, fixture consent, callback, `waitForConnection`    | Becomes `connected`; works for a server that has no `mcp_server` row yet                                     |
| F3  | Discover tools                     | `session.mcp()`                                                        | Tools listed; the other four services stay available when one is down                                        |
| F4  | Call a tool                        | tool call through the gateway with the session token                   | The fixture sees the right credential for that user and none from another                                    |
| F5  | Token refresh                      | wait past a short fixture token lifetime, call again, also in parallel | One refresh per user and service, no refresh storm under concurrent calls                                    |
| F6  | Reconnect after revoke or expiry   | `connections.delete`, `connections.start` again                        | Old tokens stop working; the new connection works                                                            |
| F7  | A service that fails               | fixture returns 5xx, slow answers or resets                            | Reported unavailable with a reason; others unaffected                                                        |
| F8  | All five at once for one user      | connect and call every service in one session                          | No credential cross-talk; per-call latency flat as services are added                                        |
| F9  | Many users, five services          | host flow with F2 to F4 per user, weighted 40/30/10/10/10              | Throughput and p95 hold at the load phase; the connection state table grows only by the users that connected |

Each fixture records what it received, so a run can prove no call carried another user's credential. The three services besides GitLab and DeepWiki are examples of the patterns; name the real ones when chosen and the fixtures keep their shape.

### G. Limits and data growth (group host)

| ID  | Scenario                               | Must hold                                                                                                                          |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| G1  | Sessions per user at the cap           | 50 parallel `sessions.create` for one user (cap 20): the answer at the cap is the documented one, with no more than 20 live        |
| G2  | Users per project near 50,000          | Lists, paging and `users.put` stay within the read and write thresholds; the cap refuses with the documented error                 |
| G3  | 100 plugins in a project and a session | `session.mcp()` and discovery with 100 plugins stay within the read threshold; the 101st is refused                                |
| G4  | Key rotation under load                | Both keys work during the 3,600 s grace and no call fails at the switch; the old key stops after it                                |
| G5  | Large tables                           | Logs, usage (92 days) and the error tables with millions of rows: reads stay bounded and use their indexes                         |
| G6  | Parallel connection starts             | 50 parallel `connections.start` for one user and service write one valid state each; no deadlock; the cleanup removes expired ones |

### H. Webhooks and the worker (group worker)

| ID  | Scenario                        | Must hold                                                                                                                            |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| H1  | Event flood to fast receivers   | Job age (enqueue to sent) stays under its threshold; the queue drains within the limit after the spike                               |
| H2  | Slow receivers (over 5 s)       | Each send times out at 5 s; slow receivers do not delay fast ones; worker concurrency stays bounded                                  |
| H3  | Failing and recovering receiver | Up to 8 attempts with backoff, then given up and recorded; after recovery no duplicate beyond the documented at-least-once behaviour |
| H4  | Retention and purge under load  | The 14-day delivery purge, idempotency purge and archive purge run during peak without raising api p95 above the threshold           |
| H5  | Plugin ingestion batch          | Several large archives ingested together finish, the object store keeps up, and live traffic is not slowed                           |
| H6  | Observability storm             | A burst of error reports is accepted, grouped and alerted without data loss or growth beyond the retention rules                     |
| H7  | Email sending                   | Invite and reset mail bursts are queued and sent without blocking the api                                                            |

Measured by queue depth, job age, attempts and the effect on api p95, not by request latency.

### I. Accounts and abuse (group console)

| ID  | Scenario                              | Must hold                                                                                                       |
| --- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| I1  | Login and sign-up burst               | Password hashing does not starve other requests (CPU and event loop) and p95 of other routes stays in threshold |
| I2  | Password reset and verification flood | Throttled per account and address; the mail queue stays bounded                                                 |
| I3  | Brute-force attempts                  | Login and key guesses are throttled and a throttled client does not slow normal users                           |
| I4  | Invites and member changes            | Many parallel changes in one organization stay consistent                                                       |

### J. Console and marketplace (group console)

| ID  | Scenario                       | Must hold                                                                                                                                                                         |
| --- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| J1  | Operators on the console       | A few dozen concurrent operators on projects, members, keys, logs, usage and observability pages stay in threshold; the web server serves static files and proxies without errors |
| J2  | Marketplace browsing           | Many viewers of plugins, categories and versions use cached or indexed reads                                                                                                      |
| J3  | Plugin and component downloads | Archive and component downloads at volume keep their integrity checks and throughput                                                                                              |

### K. Gateway stress (group gateway)

Raw MCP at volume, without the SDK on the call path.

| ID  | Scenario                                          | Must hold                                                                                                                  |
| --- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| K1  | `tools/list` and `tools/call` at the planned rate | Platform share of a call (gateway time, not the fixture's) under its threshold; no errors                                  |
| K2  | Parallel calls per session                        | 3 to 4 in parallel per run keep order and correctness; no head-of-line blocking                                            |
| K3  | Very slow upstream                                | Many connections held by one slow service do not exhaust the gateway; other services stay fast; per-call timeouts fire     |
| K4  | Large arguments and responses                     | Large payloads stay within memory and time limits and are refused at the documented size                                   |
| K5  | SSRF guard and DNS under load                     | DNS lookups on every outbound call, with slow or failing DNS, stay within the 3 s timeout and do not stall unrelated calls |
| K6  | Many distinct upstream hosts                      | Hundreds of hosts, not only five, with no growth of per-host state without bound                                           |
| K7  | Token refresh at the gateway                      | Same as F5, measured at the gateway at volume                                                                              |

### L. Operations (group ops, staging)

| ID  | Scenario                                           | Must hold                                                                                                                        |
| --- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| L1  | Rolling restart of the api and the gateway         | No committed work lost; clients recover through their retries; the error rate stays under its threshold                          |
| L2  | Redis down                                         | The rate limiter behaves as designed (documented as fail open or closed) and recovers when Redis returns                         |
| L3  | Database failover or restart                       | Calls fail with typed errors, then recover without a restart of the apps                                                         |
| L4  | Object store outage                                | Downloads and ingestion fail cleanly and resume                                                                                  |
| L5  | Scale-out to two or more api and gateway instances | The shared Redis counter keeps the project limit across instances; per-instance caches do not diverge beyond the documented time |
| L6  | Migration job during traffic                       | A migration runs while load continues without errors from locks beyond the documented window                                     |

### M. Mixed run (tiers 3 and 5)

All areas at once: an agent spike on the gateway (K, F9), host calls on the api (A), a webhook flood on the worker (H1, H2), operators on the console (J1), retention jobs (H4) and one project over its limit (B2). Pass when:

1. No app's load pushes another app above its own thresholds (for example a webhook flood must not raise session creation p95).
2. The database stays healthy: pool use, lock waits and the slowest queries are within the limits set from the baseline.
3. The over-limit project leaves every other project untouched (B5).

## Thresholds

Starting values, in `load.config.ts`; tuned from a first baseline (median of three runs) on the isolated stack, then written into `baseline/` and reviewed.

| Measure                                                     | Smoke    | Load     |
| ----------------------------------------------------------- | -------- | -------- |
| Unexpected status (not in the scenario's expected set)      | 0        | 0        |
| p95 write (`users.put`, `sessions.create`)                  | < 400 ms | < 800 ms |
| p95 read                                                    | < 200 ms | < 400 ms |
| p99 any call                                                | < 1 s    | < 2 s    |
| Platform share of a tool call (gateway time, not fixture's) | < 50 ms  | < 100 ms |
| 5xx rate                                                    | 0        | < 0.1%   |
| `429` below the limit (B1)                                  | 0        | 0        |
| Webhook job age p95 (H1)                                    | < 5 s    | < 30 s   |
| Generator CPU (above it the run is invalid)                 | < 70%    | < 70%    |
| Change against baseline (p95, throughput)                   | n/a      | 15%      |

A `429` above the limit is expected (B2) and is judged by its own scenario. All numbers are guesses until the first baseline exists.

## Run

```sh
# isolated stack of the test runner (builds, starts, seeds, runs, scrubs the report)
LOAD_ALLOW=1 pnpm test -- --only=load                                  # tier 0, smoke
LOAD_ALLOW=1 LOAD_PROFILE=load LOAD_GROUPS=host,gateway pnpm test -- --only=load   # a group run
LOAD_ALLOW=1 LOAD_PROFILE=spike pnpm test -- --only=load               # spike with the mixed run
```

PowerShell: `$env:LOAD_ALLOW = '1'`. Staging runs add `LOAD_TARGET=staging`, a host in `LOAD_ALLOWED_HOSTS` and the agreed window.

## Rollout

1. Record the dependency decision in `docs/architecture/decisions.md`.
2. Extract the shared guard, bootstrap, scrubber and stats into `tests/load/lib`, add the config and the catalog, and move the custom runner to `tests/load/custom` with its tests unchanged.
3. Add Artillery with `pnpm add --save-catalog -D`, then scenario A at smoke size, and compare with the custom runner on the same stack (the retire rule).
4. Add the fixtures and the fault proxy, then B, C and F.
5. Add K (gateway), H (worker) and the mixed run M.
6. Add G, I and J, then D, then L on staging.
7. Run three baselines on the isolated stack, store them, and set the thresholds. Repeat on staging before a release that touches limits, the SDK, the gateway or the worker.

## Open questions

- Do load runs belong in CI (a schedule or a manual trigger against the isolated stack), or stay manual?
- Is staging an allowed target, in which windows, and who is told?
- What concurrency does the first agent-app customer expect (concurrent runs, tool calls per run, runs per minute)?
- Which cloud and region do the generator and the fixtures run in, and who pays for them during a run?
- Fault proxy: an in-repo proxy (Docker-free, the default) or Toxiproxy for the staging operations runs?
- Does the staging gateway allow the project key volume of scenario B, or is a temporary limit set through the admin app?
- Redis down (L2): should the limiter fail open or closed? This plan tests whichever is documented; if nothing is documented, that is a finding.
