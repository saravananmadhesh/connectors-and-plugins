# ClickHouse

BoldCreate plugin that connects agents to ClickHouse through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Query and explore your ClickHouse Cloud data.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **ClickHouse**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **ClickHouse**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install clickhouse@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "clickhouse": {
      "type": "http",
      "url": "https://mcp.clickhouse.cloud/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to ClickHouse in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- ClickHouse remote MCP: https://clickhouse.com/docs/use-cases/AI/MCP

## Logo

Icon from the vendor listing for ClickHouse, converted to PNG and centred on a white tile. It is the vendor's own icon and a trademark of its owner. It is not covered by the MIT licence.

## License

MIT
