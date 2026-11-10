# Replit

BoldCreate plugin that connects agents to Replit through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Turn ideas into apps and websites instantly.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Replit**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Replit**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install replit@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "replit": {
      "type": "http",
      "url": "https://replit-mcp.com/anthropic/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Replit in the browser (OAuth). Tool calls run with that member's permissions.

The server runs on the `replit-mcp.com` domain and signs members in through Replit's own identity provider (`https://replit.com/oidc`).

## Docs

- Replit: https://replit.com/

## Logo

Replit mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #F26207, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
