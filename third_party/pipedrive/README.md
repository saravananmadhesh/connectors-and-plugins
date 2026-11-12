# Pipedrive

BoldCreate plugin that connects agents to Pipedrive through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Find deals, update records, manage activities and work with your live CRM data using natural language.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Pipedrive**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Pipedrive**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install pipedrive@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "pipedrive": {
      "type": "http",
      "url": "https://mcp.pipedrive.ai/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Pipedrive in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Pipedrive MCP server: https://developers.pipedrive.com/mcp

## Logo

Icon taken from the vendor's website (Pipedrive). It is the vendor's own icon and a trademark of its owner. It is not covered by the MIT licence.

## License

MIT
