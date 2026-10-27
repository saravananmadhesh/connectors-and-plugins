# Notion

BoldCreate plugin that connects agents to Notion through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search, read, and update Notion pages and databases.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Notion**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Notion**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install notion@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Notion MCP server: https://developers.notion.com/docs/mcp

## Logo

Notion mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #000000, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
