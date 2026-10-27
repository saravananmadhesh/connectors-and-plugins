# Supabase

BoldCreate plugin that connects agents to Supabase through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Query Postgres, manage tables, auth, storage, and edge functions in a Supabase project.

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
      "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}&read_only=${SUPABASE_READ_ONLY}",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Supabase personal access token** (`SUPABASE_ACCESS_TOKEN`) | Yes | Yes | Create one at https://supabase.com/dashboard/account/tokens. |
| **Project ref** (`SUPABASE_PROJECT_REF`) | Yes | No | The project ID from your project URL. Limits the agent to this one project. |
| **Read-only mode** (`SUPABASE_READ_ONLY`) | No (default `true`) | No | "true" runs queries as a read-only Postgres user and hides write tools. Set "false" to allow writes. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Docs

- Supabase MCP server: https://supabase.com/docs/guides/getting-started/mcp

## Logo

Supabase mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #3FCF8E, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
