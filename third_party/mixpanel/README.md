# Mixpanel

BoldCreate plugin that connects agents to Mixpanel through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Analyze, query, and manage your Mixpanel data.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Mixpanel**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Mixpanel**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install mixpanel@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "mixpanel": {
      "type": "http",
      "url": "https://mcp.mixpanel.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Mixpanel in the browser (OAuth). Tool calls run with that member's permissions.

This plugin targets the US endpoint (`https://mcp.mixpanel.com/mcp`). Mixpanel also runs EU (`mcp-eu.mixpanel.com`) and IN (`mcp-in.mixpanel.com`) endpoints; on another region, contact us for a site-specific build.

## Docs

- Mixpanel MCP server: https://docs.mixpanel.com/docs/mcp

## Logo

Mixpanel mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #7856FF, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
