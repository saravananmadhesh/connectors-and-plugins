# Google Design

BoldCreate plugin that connects agents to Google Design through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Get Google design guidance and assets, such as Material Design, while you build UI.

> **Preview.** Google marks this MCP server as Preview; tools may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Design**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Design**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-design@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-design": {
      "type": "http",
      "url": "https://design.googleapis.com/mcp"
    }
  }
}
```

## Setup

No settings.

This server needs no account or key.

## Docs

- Google Design MCP server: https://developers.google.com/design-mcp/overview
- Tools reference: https://developers.google.com/design-mcp/reference/mcp
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Google mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #4285F4, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
