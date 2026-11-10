# Amplitude

BoldCreate plugin that connects agents to Amplitude through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Query Amplitude product analytics, charts, and experiments.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Amplitude**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Amplitude**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install amplitude@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "amplitude": {
      "type": "http",
      "url": "https://mcp.amplitude.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Amplitude in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Amplitude plugin (vendor repository): https://github.com/amplitude/mcp-marketplace

## Logo

Official Amplitude icon, downloaded from amplitude.com. The mark is a trademark of its owner.

## License

MIT
