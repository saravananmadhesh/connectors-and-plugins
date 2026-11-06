# Google Maps Code Assist

BoldCreate plugin that connects agents to Google Maps Code Assist through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Get up-to-date Google Maps Platform docs and code samples while you write Maps code.

> **Preview.** Google marks this MCP server as Preview; tools may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Maps Code Assist**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Maps Code Assist**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-maps-code-assist@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-maps-code-assist": {
      "type": "http",
      "url": "https://mapscodeassist.googleapis.com/mcp"
    }
  }
}
```

## Setup

No settings.

This server needs no account or key.

## Docs

- Google Maps Code Assist MCP server: https://developers.google.com/maps/ai/code-assist
- Tools reference: https://developers.google.com/maps/ai/code-assist/reference/mcp
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Google Maps mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #4285F4, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
