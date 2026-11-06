# AWS Knowledge

BoldCreate plugin that connects agents to AWS Knowledge through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search AWS documentation, API references, and regional availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **AWS Knowledge**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **AWS Knowledge**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install aws-knowledge@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "aws-knowledge": {
      "type": "http",
      "url": "https://knowledge-mcp.global.api.aws"
    }
  }
}
```

## Setup

No settings.

This server needs no account or key.

## Docs

- AWS Knowledge MCP server: https://awslabs.github.io/mcp/servers/aws-knowledge-mcp-server

## Logo

Neutral tile with the product's initials.

## License

MIT
