# Google Maps Grounding Lite

BoldCreate plugin that connects agents to Google Maps Grounding Lite through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Ground agents in Google Maps data: places, routes, and weather.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Maps Grounding Lite**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Maps Grounding Lite**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-maps-grounding-lite@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-maps-grounding-lite": {
      "type": "http",
      "url": "https://mapstools.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "${GOOGLE_MAPS_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Google Maps API key** (`GOOGLE_MAPS_API_KEY`) | Yes | Yes | Google Maps Platform API key with the Maps Grounding Lite API enabled. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it if it is ever exposed.

The server also accepts Google OAuth with the `https://www.googleapis.com/auth/maps-platform.mapstools` scope; this plugin ships the API key flow.

## Docs

- Google Maps Grounding Lite MCP server: https://developers.google.com/maps/ai/grounding-lite
- Tools reference: https://developers.google.com/maps/ai/grounding-lite/reference/mcp
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Google Maps mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #4285F4, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
