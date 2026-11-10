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

## Skills

The `skills/` folder holds the 10 agent skills published in [stripe/ai](https://github.com/stripe/ai/tree/d8e14797c726086c4376f576f6fb7cbb908e5f15/skills) at commit `d8e14797c726086c4376f576f6fb7cbb908e5f15`, copied unchanged. The source is licensed under MIT, copyright Stripe. Stripe syncs these skills from `docs.stripe.com/.well-known/skills`.

| Skill |
| --- |
| `connect-recommend` |
| `connect-required-verification-information` |
| `metronome` |
| `stripe-apps` |
| `stripe-best-practices` |
| `stripe-directory` |
| `stripe-docs` |
| `stripe-pay` |
| `stripe-projects` |
| `upgrade-stripe` |

Some skills list shell commands in their `allowed-tools`, such as `Bash(stripe *)`, and `stripe-directory` and `stripe-projects` list a `curl … | sh` install command for the Stripe CLI. Review these before you enable the skills.

## Logo

Stripe mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #635BFF, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
