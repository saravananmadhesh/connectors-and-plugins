# Product

Install a curated plugin once and every teammate and agent gets the same MCP tools, skills, rules, hooks and agents, each person using their own login. Customers connect their own cloud agent, IDE or CLI with an API key of the organization, or a project session for a host product's users. There is no shared database or identity federation with customer products.

## Scope (release 1)

- Sign up, email verification, organizations, invites, roles.
- Marketplace of reviewed plugins; review screen before install.
- Install at org or user scope (and for a project); encrypted variables; `pinned` or `follow_latest` updates.
- Per-member OAuth for any MCP server; MCP servers with API key or no auth.
- API keys created in the website only; sync and brokered archive download.
- MCP gateway (`/mcp`, `/{server}/mcp`) with per-key limits, breaker, timeouts, audit.
- Projects: an organization has projects; a project has keys, users, sessions, plugins, auth configs, connections, logs, usage and one signed webhook. The host's server uses the client package `@syncfusion/boldcreate-connect` with a project key.
- Admin app: plugin sources, discover, queued ingestion, review, approve, publish, yank, deprecate, suspend, delete with impact view, categories, audit viewer.

Not in scope: device-code login, SSO/SCIM/MFA, delegated identity, billing, private publishing, stdio servers, MCP resources/prompts, multi-region, analytics dashboards.

## Vocabulary (one word per concept, in DB, API, code and UI)

| Concept                        | Name                                                      | Never use           |
| ------------------------------ | --------------------------------------------------------- | ------------------- |
| Tenant                         | `organization` (`org` in URLs)                            | company, account    |
| A host's own app in an org     | `project` (belongs to one `organization`)                 | tenant, workspace   |
| A host's end user              | `project_user`, named by the host's own `userId`          | member, customer    |
| One user's short-lived access  | `session` (token `stk_`), made with a project key `prk_`  | login               |
| Sign-in setup of an MCP server | `auth_config`, per project and plugin                     | credential          |
| Installable package            | `plugin`                                                  | bundle, integration |
| Immutable release of a plugin  | `plugin_version`                                          | release             |
| Part of a plugin               | `component`, `kind` = `mcp` `skill` `rule` `hook` `agent` | capability          |
| Origin of a plugin             | `plugin_source`                                           | repo                |
| Where a plugin is enabled      | `installation`, `scope` = `org` `user`                    | subscription        |
| Upstream MCP endpoint          | `mcp_server`                                              | provider            |
| Per-member OAuth grant         | `mcp_oauth_token`                                         | account             |
| Programmatic access            | `api_key` (`token` only for OAuth/session)                |                     |

"Gateway" means our service; an upstream is always an `mcp_server`.

Conventions: kebab-case files; DB `snake_case` singular; JSON `camelCase`; enum values `snake_case`; URLs plural kebab-case under `/v1`; ids `<prefix>_<32 hex>`; errors `{ error: { code, message, requestId } }` with stable codes and no stack or upstream text; no response envelope; secrets write-only (`PUT` in, `isSet` out).

## Plugin model

One package type, five component kinds in one `component` table (`kind` plus a Zod-validated payload).

| Kind    | Source in repo      | Delivery                                                                   |
| ------- | ------------------- | -------------------------------------------------------------------------- |
| `mcp`   | `mcp.json`          | Registered as `mcp_server`, called via gateway                             |
| `skill` | `skills/*/SKILL.md` | Sync and download                                                          |
| `rule`  | `rules/*.{md,mdc}`  | Sync and download                                                          |
| `hook`  | `hooks/hooks.json`  | Sync and download with the scripts it runs; never executed by the platform |
| `agent` | `agents/*.md`       | Sync and download                                                          |

- Manifest precedence: `plugin.json`, then `.cursor-plugin/plugin.json`, then a multi-plugin `marketplace.json`. Paths must stay inside the repo. Invalid input yields a structured error list; nothing is dropped silently. stdio MCP entries are rejected with a reason.
- Names: 1–64 chars, `[a-z0-9.-]`, alphanumeric at both ends, no `--` or `..`. A missing version is an error.
- Versions are immutable, SHA-256 content-addressed, pinned to a commit. Same version with a new commit becomes `{version}+{sha7}`. "Latest" is the highest publish sequence among approved, non-yanked versions.
- States: `pending → approved → published | rejected | yanked`. Yanked blocks new installs and `follow_latest`; existing installs keep working. A kill switch is the only way to stop an existing version. Plugin status: `active`, `deprecated`, `suspended`.
- A version referenced by an installation is never deleted, only yanked.
- Plugins enter the catalog only through admin ingestion; there is no seed data.
- Upgrade diffs the variable schema: a new required variable without a value deactivates the `mcp` component until set; removed variables are deleted. `mcp_server` identity is stable across upgrades.

## Roles and scopes

- Org roles `ADMIN`, `MEMBER` (Developer in the Platform screens) and `VIEWER`. A viewer sees no For You data and only reads Platform. The role-to-action matrix lives in `packages/domain` permissions; routes never check roles directly.
- Install: org admins and members at org scope, admins and members at user scope unless org policy forbids it; a viewer installs nothing.
- Precedence user > org. Wrong-org and invisible resources answer `404`.
- The last admin is protected; sessions: customer idle 30 min / absolute 12 h, admin idle 15 min / absolute 1 h (config `SESSION_IDLE_SECONDS`, `SESSION_ABSOLUTE_SECONDS`; the session cookie lives as long as the absolute limit).
