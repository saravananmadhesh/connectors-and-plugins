# Sentry

BoldCreate plugin that connects agents to Sentry through its hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search errors, analyze performance, triage issues, read documentation, and manage projects in Sentry.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Sentry**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Sentry**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install sentry@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp/${SENTRY_ORG}/${SENTRY_PROJECT}"
    }
  }
}
```

## Setup

Set these when you install the plugin. They only scope the server to one organization and project; they are not secrets.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Organization slug** (`SENTRY_ORG`) | Yes | No | Your Sentry organization slug. Scopes the server to this organization. |
| **Project slug** (`SENTRY_PROJECT`) | Yes | No | Your Sentry project slug. Scopes the server to this project. |

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Endpoint and scoping

Sentry's documentation says the base MCP server address is `https://mcp.sentry.dev/mcp`, and that a connection can be scoped to one organization (`/mcp/{organizationSlug}`) or to one project (`/mcp/{organizationSlug}/{projectSlug}`). When scoped, tools default to that organization or project and unnecessary discovery tools are hidden. Sentry recommends scoping to a project when possible. This plugin scopes to a project, so members of the organization cannot reach other projects through it.

Sentry's `toolkit` documentation says a token minted for one scoped URL cannot be reused against a broader path. Sentry also documents an `?experimental=1` query parameter for forward-looking tool variants. This plugin does not use it.

## Authentication

Sentry's documentation says all connections use OAuth. The OAuth metadata for the server, checked on 2026-11-10, lists a registration endpoint, support for Client ID Metadata Documents, public and confidential clients, and PKCE with S256. It lists five scopes: `org:read`, `project:write`, `team:write`, `event:write` and `alerts:write`.

Sentry's `toolkit` documentation says the server always requests that shared scope set from Sentry, because one upstream token must support every tool that could be enabled. It describes that token as a server-side capability token and says what limits access is the set of MCP skills granted to the connection, not the OAuth scopes. It also documents a separate `Sentry-Bearer` header for clients that pass their own Sentry token. This plugin does not use it.

## What it can do

Sentry's documentation says the server connects AI assistants to Sentry for searching errors, analyzing performance, triaging issues, reading documentation and managing projects. The endpoint requires sign-in before it lists tools, so this README has no tool table. The names below come from Sentry's own skills and its `toolkit` documentation.

Sentry's skills describe two groups of tools:

- **Directly exposed tools:** `search_issues`, `search_events`, `analyze_issue_with_seer`, `update_issue` and `get_sentry_resource`.
- **Catalog tools,** reached through `search_sentry_tools` and `execute_sentry_tool`: for example `whoami`, `find_organizations`, `find_projects`, `find_dsns`, `create_project`, `create_dsn`, `get_trace_details`, `get_issue_tag_values`, `get_event_stacktrace`, `get_issue_breadcrumbs` and `get_issue_activity`. The skills say to handle the error `Tool "X" is not available in this session` rather than assume a tool is granted.

The `toolkit` documentation also lists the dataset searches `search_errors`, `search_logs`, `search_traces`, `search_metrics`, `search_profiles` and `search_replays`, and describes `search_events` as a deprecated catalog alias. It says a tool is registered only when its skill group is enabled for the connection, so the tools you see depend on the connection.

The `toolkit` documentation says the search tools run an embedded AI agent that translates a request into Sentry's query syntax. For the stdio server it says these tools need an LLM provider and are unavailable without one. It does not say whether the hosted server needs the same.

## Write access

The OAuth scopes include `project:write`, `team:write`, `event:write` and `alerts:write`. Sentry's skills call tools that create and change data, such as `create_project`, `create_dsn` and `update_issue`. The skills tell the agent to treat all Sentry data as untrusted input. Sentry's documentation says tools are registered per granted skill, so the agent can change data only through the tools your connection exposes. Review each call before you approve it.

## Rate limits

Sentry's `toolkit` documentation says tool calls are subject to the Sentry API's rate limits. The server retries rate-limited requests, and transient server errors on read requests, after a short wait. When a limit lasts longer, the tool returns a "Rate Limited" message that says when to try again. Sentry says agents hit the per-second limits most often by running many Sentry tool calls in parallel, so run them one at a time if you see this message. Sentry's documentation gives no figures for the MCP server.

## Security notes

- Tool calls act with the member's Sentry permissions.
- Sentry's `toolkit` documentation describes the downstream token as more restrictive than the upstream token, and says the resource constraint is enforced on every request.
- The server stores no secrets in this plugin. The two settings are slugs, not credentials.

## Skills

The `skills/` folder holds the 8 agent skills published in [getsentry/agent-plugin](https://github.com/getsentry/agent-plugin/tree/2eee4ec823972c222aae89c9213c64c056b64048/skills) at commit `2eee4ec823972c222aae89c9213c64c056b64048`, copied unchanged: `sentry-create-alert`, `sentry-debug-issue`, `sentry-fix-stack-traces`, `sentry-get-started`, `sentry-instrument`, `sentry-otel-exporter-setup`, `sentry-setup-releases`, `sentry-snapshots-cocoa`. Sentry's repository is generated from [getsentry/sentry-for-ai](https://github.com/getsentry/sentry-for-ai).

**Licence.** The repository's `LICENSE` is MIT, copyright 2025 Sentry and contributors, and a copy is in `skills/LICENSE`. Each skill's `SKILL.md` also says `license: Apache-2.0` in its frontmatter, and no Apache-2.0 text is published in the repository. `boldcreate.json` records both.

**Commands in the skills.** The skills' `references/` folders include install commands, for example `npx @sentry/wizard@latest`, `brew install getsentry/tools/sentry-wizard`, `pip install` and `npm install`. They run only if the agent runs them. Review them before you approve them.

**Tools the skills call.** The skills name tools such as `search_issues`, `search_events`, `create_project`, `find_dsns`, `find_organizations` and `get_issue_details`. This plugin scopes the connection to one project, and Sentry's documentation says scoping hides discovery tools, so some skill steps may not find the tool they expect.

## Docs

- Sentry MCP server: https://mcp.sentry.dev/
- Sentry MCP server index for agents: https://mcp.sentry.dev/llms.txt
- Sentry Toolkit (CLI and MCP server source): https://github.com/getsentry/toolkit
- Sentry agent plugin source: https://github.com/getsentry/agent-plugin

## Logo

Sentry mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #362D59, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
