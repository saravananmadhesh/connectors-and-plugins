# Netlify

BoldCreate plugin that connects agents to Netlify through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Create, deploy, manage, and secure websites on Netlify.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Netlify**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Netlify**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install netlify@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "netlify": {
      "type": "http",
      "url": "https://mcp.netlify.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to Netlify in the browser (OAuth). Tool calls run with that member's permissions.

`mcp.netlify.com` is Netlify's own domain and the endpoint is documented by Netlify (see Docs below).

## Docs

- Netlify MCP server: https://docs.netlify.com/build/build-with-ai/netlify-mcp-server/

## Logo

Netlify mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #00C7B7, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
