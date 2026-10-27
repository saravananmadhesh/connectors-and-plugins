# DeepWiki

BoldCreate plugin that connects agents to DeepWiki through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Ask questions about any public GitHub repository and read its generated wiki.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **DeepWiki**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **DeepWiki**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install deepwiki@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "deepwiki": {
      "type": "http",
      "url": "https://mcp.deepwiki.com/mcp"
    }
  }
}
```

## Setup

No settings.

This server needs no account or key.

## Docs

- DeepWiki MCP server: https://docs.devin.ai/work-with-devin/deepwiki-mcp

## Logo

Neutral tile with the product's initials.

## License

MIT
