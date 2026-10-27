# Neon

BoldCreate plugin that connects agents to Neon through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Manage Neon serverless Postgres projects, branches, queries, and migrations.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Neon**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Neon**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install neon@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "neon": {
      "type": "http",
      "url": "https://mcp.neon.tech/mcp?readonly=${NEON_READ_ONLY}",
      "headers": {
        "Authorization": "Bearer ${NEON_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Neon API key** (`NEON_API_KEY`) | Yes | Yes | Create one in the Neon Console. Use an organization key to limit access to that organization. |
| **Read-only mode** (`NEON_READ_ONLY`) | No (default `true`) | No | "true" disables write tools. Set "false" to allow writes. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Docs

- Neon MCP server: https://github.com/neondatabase-labs/mcp-server-neon

## Logo

Neon mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #34D59A, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
