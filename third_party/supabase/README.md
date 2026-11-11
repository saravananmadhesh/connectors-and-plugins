# Supabase

BoldCreate plugin that connects agents to Supabase through its hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Connect AI assistants to your Supabase project to manage tables, fetch config, and query data.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Supabase**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Supabase**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install supabase@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?read_only=${SUPABASE_READ_ONLY}"
    }
  }
}
```

## Setup

Set this when you install the plugin. It is not a secret.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Read-only mode** (`SUPABASE_READ_ONLY`) | No (default `true`) | No | "true" runs queries as a read-only Postgres user. Set "false" to allow writes. |

Auth is OAuth. Supabase's documentation says the hosted server uses dynamic client registration by default, so you do not create a personal access token or an OAuth app. The first time the agent calls a tool, each member signs in to their own account in the browser. Supabase's README says to choose the organization that contains the project you want to work with.

This plugin does not set `project_ref`, so the account tools are available. Supabase's documentation says `project_ref` scopes the server to one project and disables the account tools.

A personal access token sent as `Authorization: Bearer <token>` also works. Supabase's documentation describes it for CI environments and for clients that cannot use a browser sign-in. This plugin ships the OAuth flow.

## What it can do

The Supabase MCP page lists these tools, grouped by feature. The endpoint requires sign-in before it lists tools, so this section comes from [Supabase's documentation](https://supabase.com/docs/guides/ai-tools/mcp#available-tools). Groups that your connection supports are enabled by default, except Storage.

| Group | Tools |
| --- | --- |
| Database | `list_tables`, `list_extensions`, `list_migrations`, `apply_migration`, `execute_sql` |
| Debugging | `query_logs`, `get_advisors` |
| Development | `get_project_url`, `get_publishable_keys`, `generate_typescript_types` |
| Edge Functions | `list_edge_functions`, `get_edge_function`, `deploy_edge_function`, `create_edge_function_secret` |
| Account management | `list_projects`, `get_project`, `create_project`, `pause_project`, `restore_project`, `list_organizations`, `get_organization`, `get_cost`, `confirm_cost` |
| Docs | `search_docs` |
| Branching (experimental, paid plan) | `create_branch`, `list_branches`, `delete_branch`, `merge_branch`, `reset_branch`, `rebase_branch` |
| Feedback | `submit_feedback`, `delete_feedback` |
| Storage (disabled by default) | `list_storage_buckets`, `get_storage_config`, `update_storage_config` |
| Notebooks (hosted connections only) | `list_notebooks`, `get_notebook`, `create_notebook`, `run_notebook`, `delete_notebook` |

Supabase's page lists a tool for storage configuration and none for auth.

## Write access

Many of these tools change your Supabase projects, and some can delete data or create billable resources. Examples from Supabase's tool list include `apply_migration`, `execute_sql`, `deploy_edge_function`, `create_project`, `pause_project`, `delete_branch` and `delete_notebook`. Supabase's page says `delete_notebook` cannot be undone.

This plugin defaults to read-only mode, which Supabase describes as executing all queries as a read-only Postgres user. Supabase's documentation says `submit_feedback` and `delete_feedback` are disabled in read-only mode, and that in read-only mode `create_notebook` and `delete_notebook` are refused.

## Confirmations

Supabase's documentation says some tools pause to ask for confirmation through your MCP client:

- **Cost confirmation** for `create_project` and `create_branch`.
- **Destructive SQL confirmations** for `execute_sql` and `apply_migration`. The `execute_sql` confirmation applies only outside read-only mode.
- **Notebook confirmations** for `run_notebook` and `delete_notebook`.

These flows need an MCP client that supports forms. Supabase says to treat them as a guardrail, not a guarantee of human review or approval, because some clients answer them automatically. They do not replace your client's own approval of tool calls.

Supabase documents a `skip_elicitations` option that skips these confirmations. This plugin does not set it.

## Rate limits

Supabase's MCP page lists no rate limits for the server.

## Security notes

- Supabase's documentation describes prompt injection as the primary attack vector, where untrusted content in your data may trick the model into running commands. It recommends keeping manual approval of tool calls enabled for interactive work and reviewing each call.
- Supabase says the server operates under your developer permissions and recommends that you do not give it to your customers or end users.
- Supabase recommends read-only mode, project scoping, restricted feature groups and branching to lower the risk. This plugin sets read-only mode by default. It sets no project scope and no feature groups.
- Supabase labels this resource "Supabase MCP (Beta)" in its OAuth metadata.

## Skills

The `skills/` folder holds the 2 agent skills published in [supabase/agent-skills](https://github.com/supabase/agent-skills/tree/c9be0e931b7930f7d02126d04774d904c381e7d7/skills) at commit `c9be0e931b7930f7d02126d04774d904c381e7d7`, copied unchanged. The source is licensed under MIT, copyright Supabase. The original licence text is in `skills/LICENSE`.

| Skill | What its description says |
| --- | --- |
| `supabase` | Use when doing any task involving Supabase: its products, client libraries, auth issues, the Supabase CLI or MCP server, schema changes, migrations, security audits and Postgres extensions. |
| `supabase-postgres-best-practices` | Postgres best practices maintained by Supabase, for Postgres running anywhere. Load it before writing or changing anything that lives in a Postgres database. |

Some `supabase` skill text differs from how this plugin signs in. It recommends scoped personal access tokens for the Management API, the CLI and the MCP server, and it suggests checking a project `.mcp.json` and running `curl -so /dev/null -w "%{http_code}" https://mcp.supabase.com/mcp` to test whether the server is reachable. This plugin signs in with OAuth and has no `.mcp.json` in the project.

## Docs

- Supabase MCP server: https://supabase.com/docs/guides/getting-started/mcp
- Supabase MCP source repository: https://github.com/supabase/mcp

## Logo

Supabase mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #3FCF8E, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
