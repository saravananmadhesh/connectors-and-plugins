# Microsoft Learn

BoldCreate plugin that connects agents to Microsoft Learn through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search official Microsoft docs and code samples for .NET, Azure, MAUI, and more.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Microsoft Learn**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Microsoft Learn**.
- **Claude Code:** `/plugin marketplace add saravananmadhesh/BoldCreate-Plugins`, then `/plugin install microsoft-learn@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "microsoft-learn": {
      "type": "http",
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

## Setup

No settings.

This server needs no account or key.

## Docs

- Microsoft Learn MCP server: https://learn.microsoft.com/training/support/mcp

## Logo

Placeholder tile. Replace it with the vendor's official logo once we have permission to use it.

## License

MIT
