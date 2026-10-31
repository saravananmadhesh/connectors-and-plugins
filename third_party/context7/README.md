# Context7

BoldCreate plugin that connects agents to Context7 through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Pull up-to-date, version-specific library docs and code examples into the prompt.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Context7**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Context7**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install context7@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Context7 MCP server: https://context7.com/docs/resources/all-clients

## Logo

Neutral tile with the product's initials.

## License

MIT
