# Vercel

BoldCreate plugin that connects agents to Vercel through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Inspect Vercel projects, deployments, and build logs, and search Vercel docs.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Vercel**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Vercel**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install vercel@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "vercel": {
      "type": "http",
      "url": "https://mcp.vercel.com"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Notes

Vercel may only allow approved MCP clients through OAuth. Confirm the BoldCreate gateway is accepted before publishing.

## Docs

- Vercel MCP server: https://vercel.com/docs/agent-resources/vercel-mcp

## Logo

Vercel mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #000000, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
