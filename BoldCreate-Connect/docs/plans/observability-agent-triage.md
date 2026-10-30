# Observability: letting a local agent triage and fix reported issues

Status: proposal. Builds on [observability.md](observability.md). Needs a decision entry in `docs/architecture/decisions.md` (new read-only token type, new export endpoint, a local MCP script under `scripts/`; update the layout in `AGENTS.md` if a new folder is added).

## Problem

Today a person opens the error, copies the stack trace, request id and context into chat, and the agent works from that paste. It is slow, lossy and gets repeated for every issue. We want the local agent (Bold Create, Claude Code, Cursor) to pull the issue itself, with read-only access, and with everything needed to reproduce and fix it.

## How others do it

| Tool                         | How an agent gets the data                                                                                                               | What we take from it                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Sentry                       | Hosted MCP server (OAuth, scoped), `sentry-cli` and API tokens with `event:read`, `project:read`, `org:read`; Seer Autofix inside Sentry | Scoped read tokens, an MCP server, one call that returns an issue with its latest event |
| Sentry UI                    | "Open in Cursor / copy as prompt", resolve-in-next-release, commit trailer `Fixes CON-142` closes the issue                              | One-click prompt, auto-resolve on release                                               |
| Rollbar, Honeycomb, Datadog  | Vendor MCP servers exposing search, get-item and query tools, read-only by default                                                       | Small tool set, bounded output                                                          |
| GitHub Copilot agent, Linear | Assign the ticket to the agent; it works from the ticket text and opens a PR                                                             | Issue text must be self-contained                                                       |

The common pattern is the same everywhere: **a scoped read-only credential, a few tools that return a compact, pre-digested issue, and the fix linked back by commit or release.** Vendors run these MCP servers hosted for all their customers. We do not need that: only the people working on this repository use it, so the MCP server stays local.

## Recommendation

Add three small things to what already exists. No new service.

1. **Issue endpoints** in `apps/admin` (server side): `GET /admin/api/monitoring/issues` for a compact, paginated list; `GET /admin/api/monitoring/issues/:id` for the default summary; and `GET /admin/api/monitoring/issues/:id?detail=full` for expanded detail. A single issue response can be Markdown for prompt copy or compact JSON for tools. This is the single source for everything below. Enforce token and byte caps, and test token budgets against fixtures with the chosen model tokenizer. Target about 1,500 tokens for a summary and 6,000 for full detail.
2. **Read-only monitoring token**: a personal token created on the admin Storage screen, scope `monitoring:read`, shown once, stored hashed, default expiry 7 days, revocable, every use written to the audit log. It can call only the bundle, list and search endpoints. It cannot resolve, delete or change anything.
3. **A local MCP server (stdio), kept in this repository.** It is a small script, `scripts/monitor-mcp/`, that the developer's agent starts on their own machine. It is not deployed, has no image, no port, no ingress and no pod. It only calls the admin endpoints above with the developer's token. Tools: `list_issues`, `get_issue` (summary by default, optional full detail), `get_event`, `search_events`, and `get_request_trail`. Keep every tool read-only. Fix tracking happens in GitHub/PR text and release matching, not a monitoring write tool. The same read operations back a `pnpm monitor <cmd>` CLI for agents without MCP support.

   Why local and not hosted:
   - Nothing new to deploy, patch or pay for; it versions with the repo and the endpoints it calls.
   - The token never leaves the developer's machine, and there is no public MCP surface to attack.
   - Only contributors need it, so there is no multi-tenant auth, OAuth or per-customer scoping to build.
   - If the project ever needs a shared server, the tools can be moved behind the existing gateway without changing them.

   Setup per developer: set `CONNECT_MONITOR_URL` and `CONNECT_MONITOR_TOKEN` in their own environment (never committed), and add the server to the agent's MCP config with `command: node`, `args: [scripts/monitor-mcp/server.mjs]`. The server refuses to start without both variables and refuses non-https URLs except `localhost`.

Plus a repo skill, `.agents/skills/fix-issue/SKILL.md`, that tells the agent how to work an issue (below).

## What the bundle contains

The endpoint returns a summary by default, then lets the agent ask for detail only when needed. This keeps the common fix path small without hiding evidence from an engineer:

| Tier / section                | Content                                                                                                                                                                                                                                   |       Typical budget |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------: |
| `list_issues`                 | Id, title, service, count, last seen and status. Default 10 unresolved groups, paginated.                                                                                                                                                 | 500-700 tokens total |
| `get_issue` summary (default) | Id, title, service, status, count, users affected, regression flag, first/last seen, release and commit sha; rule-based cause hint; top app frames and 8 total frames; route, status and duration; short hourly trend with deploy marker. |   1,200-1,800 tokens |
| `get_issue` full              | Summary plus code excerpt from the checked-out release commit, last 10 timeline events, correlated job/upstream/security records, runtime/region, feature flags, input shape (field names/types only), up to 3 similar fixed groups.      |   4,000-6,000 tokens |
| `get_event`                   | One selected event, including exact frame and redacted context, with a 1,500-token cap.                                                                                                                                                   |   Up to 1,500 tokens |
| `get_request_trail`           | Key events for one request/trace across services, default 10 records and 2,000-token cap.                                                                                                                                                 |     500-2,000 tokens |

The summary also carries the typed fields captured by [observability.md](observability.md) (`area`, `operation`, `step`, `provider`, `errorCode`, `attempt`) and the environment fields (`environment`, `release`, `instance_id`, `region`). For handled failures such as a KMS unwrap denied, an OAuth `redirect_uri_mismatch` or a failed startup check, these fields are the cause hint: "production only, worker service account lacks the KMS decrypt role" is something the agent can act on without reading a stack. The bundle states whether the issue was seen in staging, production or both, and whether it first appeared after a release or after a configuration change. For environment-only failures (permissions, callback URLs, missing grants, config) the skill tells the agent that the fix is usually outside the code, and that it should report the missing setting by name (never a value) instead of editing code.

Tool output should use compact JSON, omit null and repeated fields, collapse library frames, and include `truncated` plus a cursor or follow-up hint whenever it hits a cap. Stack excerpts belong in full tier only. The agent can inspect source itself once it has the commit SHA and file/line. Budgets are estimates, not token counts guaranteed by character length. A2 must measure actual serialized fixtures with the selected model tokenizer, enforce limits and test the largest issue. The usual path is `list_issues` (about 600 tokens) then `get_issue` summary (about 1,500), roughly 2,100 tokens before the agent reads local code. Ask for full detail only if the summary and source are not enough. On the capture side, the reporter batches and deduplicates so normal traffic does not create event rows. If the database is unavailable, it never delays a user request: retry a bounded in-memory buffer, then emit one redacted Pino error line and increment a dropped-capture metric. Graceful shutdown flushes the batch; a hard process crash may lose only the unflushed batch, which is why platform alerts must cover process and database health.

Example of the Markdown head:

```
# CON-142 TypeError: Cannot read properties of undefined (reading "scopes")
service gateway | release 2.14.0 (a1b2c3d) | 238 events | 26 users | regression: yes
route POST /mcp/:server/tools/call | status 500 | request req_71ab9c | trace 4bf92f35...
likely cause: server config github v3 has no `scopes` field
frames:
  packages/domain/src/scopes.ts:88  resolveToolScopes   <-- failing line
  apps/gateway/src/authorize.ts:42  authorizeToolCall
```

## Agent workflow (the skill)

1. Call `get_issue CON-142`. Stop if the bundle says `status: resolved` or `ignored`.
2. `git fetch` and create a worktree at the bundle's commit sha, then a branch `fix/con-142`.
3. Check `environment` and `area` first. If the issue appears only in staging or production and the cause hint points at configuration, permissions, a callback URL or a missing grant, stop and report the exact missing setting by name; do not change code to hide it. Otherwise read the failing frames. Write a failing test first (unit, or integration if a database is involved) using the input shape from the bundle.
4. Fix the cause, not the symptom. Keep the change small (repo rules apply).
5. Run `pnpm test -- --only=format,lint,typecheck,unit`. Report exactly what passed.
6. Commit with the trailer `Fixes CON-142` only when the user agrees, and open a pull request.
7. When the release containing the commit ships, the worker marks the group `resolved in 2.14.1` by matching the trailer. If the issue returns, it reopens as a regression and the bundle says so.

If the bundle lacks what the agent needs, the agent says what is missing instead of guessing, and we add that field to the capture.

## Safety

| Risk                                                         | Control                                                                                                                                                                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Secrets or customer data reach the agent or a model provider | Redaction happens at capture (existing `redactSecrets`) and again when building the bundle. Bodies, headers, query values and SQL values are never stored. Allow-list of fields, not a deny-list                                  |
| Token leaks                                                  | Scope `monitoring:read` only, hashed at rest, 7-day default expiry, per-user, rate limited, listed and revocable in the UI. Use is audited                                                                                        |
| Prompt injection through error text                          | Error messages and request text come from outside. The bundle wraps them in a marked untrusted block, and the skill says to treat them as data and never as instructions                                                          |
| Agent changes production state                               | MCP tools are read-only. Nothing resolves or deletes data over MCP; issue state and deletion stay in the admin UI with confirmation                                                                                               |
| Cross-organization exposure                                  | Bundle contains ids of organizations, not their names or contents. Tokens belong to admin users and inherit admin access rules                                                                                                    |
| Huge output                                                  | Tiered summary/full responses, hard token and byte cap per tool, with `truncated` and follow-up hints                                                                                                                             |
| Monitoring database unavailable                              | Capture is best-effort and never delays a user request. Keep a bounded in-memory retry buffer; if it still fails, emit one redacted Pino error line so platform logs retain a signal. Track dropped capture counts with a metric. |
| Process crashes before flush                                 | Flush on graceful shutdown. A hard crash can lose the unflushed batch, so keep the batch window short and document the loss bound; use platform health alerts for database/process outages.                                       |

## Work packages

| Id  | Work                                                                                                                                                  | Effort |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| A1  | Capture adds commit sha, release, route pattern, input shape and last-10 timeline to each event; bundle includes typed failure fields and environment | S      |
| A2  | Bundle builder in `packages/domain` (pure function, unit-tested with fixtures) and admin endpoint                                                     | M      |
| A3  | `monitoring:read` token: table, hashing, expiry, audit, admin UI to create and revoke                                                                 | M      |
| A4  | Local stdio MCP server in `scripts/monitor-mcp/` and `pnpm monitor <cmd>` CLI over the endpoints; not deployed                                        | S      |
| A5  | Skill `fix-issue`, "Copy as prompt" button on the error detail screen (copies the bundle)                                                             | S      |
| A6  | Resolve-by-release from verified commit metadata and regression reopen in the worker                                                                  | M      |
| A7  | Tests: redaction of every bundle section, token scope and expiry, size caps, injection fixtures                                                       | M      |

Order: A1, A2, A5 first. That alone replaces copy and paste. The token and local read-only MCP follow. Resolve-by-release is a worker action based on verified commit/release metadata, not an MCP write operation.

## Cheap option before any of this

Sentry already holds the data for the other projects. Create a Sentry auth token with only `event:read`, `project:read`, `org:read`, give it to the local agent through the official Sentry MCP server, and use the same skill. This works today but keeps us dependent on Sentry storage, so treat it as a bridge.

## Open questions

- Local machines are the default. CI use is described in the next section; it needs the controls listed there before it is switched on.

## Automating in CI (same stdio server)

The CI agent step starts `scripts/monitor-mcp/server.mjs` as a child process, exactly like a developer's agent does. No new service, image or port.

Controls that differ from a laptop:

| Risk                         | Control                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Token in a shared runner     | Separate CI token, `monitoring:read` only, 24 hour expiry, issued per run from the pipeline secret store, never printed. Never reuse a developer's token                                          |
| Agent acts without a human   | The agent only opens a draft pull request on a branch `fix/<issue-id>`. It never pushes to the default branch, never merges, and `monitoring:write` stays off. A person reviews and merges        |
| Untrusted text in error data | Bundle text is marked as data in the prompt. The CI job has no production credentials, no deploy rights and no network except the admin URL, the git remote and the model provider                |
| Runaway cost or loops        | Trigger only for new groups with at least N events, or when someone adds the `auto-fix` label. One issue per run, a turn limit, a time limit, and a daily cap on runs                             |
| Bad fixes                    | The draft PR must pass the same gate (`pnpm test -- --only=format,lint,typecheck,unit`) and include a failing-then-passing test for the issue, or the job stops and comments on the issue instead |
| Data to a hosted model       | Review the bundle redaction with security first. The bundle already carries no bodies, headers, tokens or values                                                                                  |

Flow: new or labelled issue, then the pipeline creates the CI token, starts the agent with the MCP server, the agent fetches the bundle, checks out the release commit, adds a test, fixes it, runs the gate, and opens a draft PR with `Fixes CON-142` in the description. The worker links the PR to the issue and resolves it when that release ships.

Start with the label trigger only. Move to automatic triggers after a few reviewed fixes show the draft PRs are good.

- Which model providers may see bundles? The redaction rules should be reviewed once with security before any hosted model is used.
