# Stitch

BoldCreate plugin that connects agents to Stitch through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Generate UI designs and front-end code with Google Stitch.

> **Beta.** Google marks this MCP server as Beta; tools may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Stitch**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Stitch**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-stitch@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-stitch": {
      "type": "http",
      "url": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "${STITCH_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Stitch API key** (`STITCH_API_KEY`) | Yes | Yes | API key created in Stitch settings. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it if it is ever exposed.

## Docs

- Stitch MCP server: https://stitch.withgoogle.com/docs/mcp/setup/
- Tools reference: https://stitch.withgoogle.com/docs/mcp/reference/
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Google mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #4285F4, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
