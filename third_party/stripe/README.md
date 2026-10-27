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
      "url": "https://mcp.stripe.com",
      "headers": {
        "Authorization": "Bearer ${STRIPE_AGENT_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Stripe agent API key** (`STRIPE_AGENT_KEY`) | Yes | Yes | An API key with the Agent badge from the Stripe Dashboard. From December 2026 the server rejects other secret and restricted keys. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Docs

- Stripe MCP server: https://docs.stripe.com/mcp

## Logo

Stripe mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #635BFF, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
