# Railway

BoldCreate plugin that connects agents to Railway through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Deploy, manage, and debug your apps and infrastructure on Railway.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Railway**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Railway**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install railway@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "railway": {
      "type": "http",
      "url": "https://mcp.railway.com/"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Railway in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Railway: https://railway.com/

## Logo

Railway mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #0B0D0E, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
