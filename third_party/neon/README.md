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
      "url": "https://mcp.neon.tech/mcp?readonly=${NEON_READ_ONLY}"
    }
  }
}
```

## Setup

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Read-only mode** (`NEON_READ_ONLY`) | No (default `true`) | No | "true" disables write tools. Set "false" to allow writes. |

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Neon MCP server: https://github.com/neondatabase-labs/mcp-server-neon

## Logo

Neon mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #34D59A, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
