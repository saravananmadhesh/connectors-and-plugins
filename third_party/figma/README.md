# Figma

BoldCreate plugin that connects agents to Figma through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Turn Figma frames into code and read design tokens, components, and variables.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Figma**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Figma**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install figma@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Notes

Figma may only allow approved MCP clients through OAuth. Confirm the BoldCreate gateway is accepted before publishing.

## Docs

- Figma MCP server: https://developers.figma.com/docs/figma-mcp-server/remote-server-installation

## Logo

Figma mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #F24E1E, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
