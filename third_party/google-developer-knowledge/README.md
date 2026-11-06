# Google Developer Knowledge

BoldCreate plugin that connects agents to Google Developer Knowledge through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search official Google developer documentation for Android, Firebase, Google Cloud, and Maps.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Developer Knowledge**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Developer Knowledge**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-developer-knowledge@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-developer-knowledge": {
      "type": "http",
      "url": "https://developerknowledge.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "${GOOGLE_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Google API key** (`GOOGLE_API_KEY`) | Yes | Yes | API key from a Google Cloud project with the Developer Knowledge API enabled. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it if it is ever exposed.

## Docs

- Google Developer Knowledge MCP server: https://developers.google.com/knowledge/api
- Tools reference: https://developers.google.com/knowledge/reference/mcp
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Google mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #4285F4, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
