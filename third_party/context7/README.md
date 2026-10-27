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
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "Authorization": "Bearer ${CONTEXT7_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Context7 API key** (`CONTEXT7_API_KEY`) | Yes | Yes | API key from https://context7.com/dashboard. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Docs

- Context7 MCP server: https://context7.com/docs/resources/all-clients

## Logo

Neutral tile with the product's initials.

## License

MIT
