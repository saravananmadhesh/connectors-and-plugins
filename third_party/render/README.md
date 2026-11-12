# Render

BoldCreate plugin that connects agents to Render through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Inspect Render services, deploys, and logs.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Render**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Render**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install render@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "render": {
      "type": "http",
      "url": "https://mcp.render.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Render in the browser (OAuth). Tool calls run with that member's permissions.

## Notes

- The vendor's `oauth.clientId` (`claude`) is not copied.

## Docs

- Render plugin (vendor repository): https://github.com/render-oss/render-plugin-claude-code

## Logo

Render mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #000000, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
