# Stripe

BoldCreate plugin that connects agents to Stripe through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Work with Stripe customers, payments, subscriptions, and search Stripe docs.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Stripe**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Stripe**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install stripe@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Stripe MCP server: https://docs.stripe.com/mcp

## Logo

Stripe mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #635BFF, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
