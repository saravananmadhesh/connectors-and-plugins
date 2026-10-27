# Linear

BoldCreate plugin that connects agents to Linear through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Find, create, and update Linear issues, projects, and cycles.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Linear**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Linear**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install linear@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "linear": {
      "type": "http",
      "url": "https://mcp.linear.app/mcp",
      "headers": {
        "Authorization": "Bearer ${LINEAR_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Linear API key** (`LINEAR_API_KEY`) | Yes | Yes | Personal API key from Linear Settings > Security & access. Tool calls run as the key's owner. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Notes

A read-only endpoint is available at `https://mcp.linear.app/mcp/readonly`.

## Docs

- Linear MCP server: https://linear.app/docs/mcp

## Logo

Linear mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #5E6AD2, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
