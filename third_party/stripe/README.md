# Stripe

BoldCreate plugin that connects agents to Stripe through its hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Interact with the Stripe API and search the Stripe knowledge base, including documentation and support articles.

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
- Stripe agent skills: https://docs.stripe.com/skills.md

## What it can do

Stripe's MCP page lists these tools. The endpoint requires sign-in before it lists tools, so this table comes from [Stripe's documentation](https://docs.stripe.com/mcp#tools).

| Area | Tool | What Stripe says it does |
| --- | --- | --- |
| API | `stripe_api_search` | Search for Stripe API methods by keyword. |
| API | `stripe_api_details` | Get detailed parameter information for a specific Stripe API method. |
| API | `stripe_api_read` | Read data with any Stripe API `GET` method. |
| API | `stripe_api_write` | Write data with any Stripe API `POST`, `PATCH`, `PUT` and `DELETE` method. |
| Account | `get_stripe_account_info` | Retrieve the account. |
| Atlas | `atlas_company_formation` | Prepare or resume an Atlas application for a Delaware C corporation or LLC. |
| Analytics (Preview) | `stripe_analytics` | Query metrics, analyze subscriptions and billing, run financial reports, and build SQL queries from natural language. |
| Treasury (Public preview) | `get_balance_summary` | Show a balance summary across the Stripe balance and Treasury accounts. |
| Treasury (Public preview) | `convert_currency` | Convert funds between currencies within a Treasury account. Human confirmation. |
| Treasury (Public preview) | `send_money` | Send money from a Treasury account to a recipient. Human confirmation. |
| Treasury (Public preview) | `setup_recipient` | Set up a recipient account for sending money from a Treasury account. |
| Treasury (Public preview) | `transfer_money` | Transfer money between supported Stripe balances. Human confirmation. |
| Other | `search_stripe_documentation` | Search the Stripe documentation for a question and language. |
| Other | `stripe_implementation_planner` | Guide the user through Stripe products to accept payments, sell online, set up billing, or build an integration. |
| Other | `send_stripe_feedback` | Share feedback about Stripe's products. |

`stripe_api_read` and `stripe_api_write` reach the API methods that Stripe lists under [Supported API methods](https://docs.stripe.com/mcp#apis). That list includes customers, charges, refunds, PaymentIntents, invoices, subscriptions, coupons, products, prices, payment links, disputes, webhook endpoints and events.

## Write access

Stripe documents `stripe_api_write` as covering `POST`, `PATCH`, `PUT` and `DELETE` methods. Its supported methods include creating and updating customers, invoices, subscriptions, products, prices and payment links, cancelling a subscription, voiding an invoice, and deleting a coupon. The Treasury tools can send and transfer money.

Stripe advises you to turn on your MCP client's tool-approval setting so you can review tool calls before they run. It also advises caution when you use the Stripe MCP with other servers, to avoid prompt injection attacks.

## Human confirmation

Stripe can require you to review and approve some actions in the Dashboard before an agent completes them. Stripe marks these with a **Human confirmation** badge. Its docs name creating a refund, `convert_currency`, `send_money` and `transfer_money`.

Stripe says the requirement depends on the action, not only the tool name. Creating a refund uses `stripe_api_write`, which also supports actions that skip this flow. Account-specific rules can require review of more actions. Stripe also says its confirmation is separate from your MCP client's tool-approval setting.

To confirm an action, open the URL the agent gives you and review the request. After you approve, tell the agent to retry the operation. An approval request expires after 24 hours.

## Sign-in options

- **OAuth.** Stripe recommends it for interactive clients. The consent page lets you grant access to one or more live mode accounts or sandboxes, with different permissions for each.
- **Agent API keys.** Stripe describes these for autonomous clients that can't use OAuth. Pass the key as the bearer token in the `Authorization` header. Create the key with only the permissions the client needs.
- **Connected accounts.** By default, tools act on the account tied to your OAuth session or API key. Stripe says MCP doesn't support OAuth when acting on behalf of connected accounts. For that, use an agent API key for your platform and pass the `Stripe-Account` header.

**Deadline for API keys.** Stripe says to migrate by November 30, 2026. Starting in December, Stripe MCP stops accepting full-access secret keys and restricted API keys without the Agent tag. Requests with an unsupported key get a `401` response.

## Admin controls

- Administrators can enable or disable MCP access for the whole team in the Dashboard. Access is set separately for live mode and sandbox.
- Members can see and revoke their authorized MCP clients under **OAuth sessions** in their user settings.
- An administrator can view or revoke another member's sessions. The role needs permission to manage team members, and the Administrator role has it.
- If your organization manages your device or network, your IT administrator might block external MCP servers. Stripe says to ask them to allow `mcp.stripe.com`.

## Rate limits

Stripe's MCP page lists no rate limits.

## Preview features

Stripe labels `stripe_analytics` as Preview and the Treasury tools as Public preview.

## Skills

The `skills/` folder holds the 10 agent skills published in [stripe/ai](https://github.com/stripe/ai/tree/d8e14797c726086c4376f576f6fb7cbb908e5f15/skills) at commit `d8e14797c726086c4376f576f6fb7cbb908e5f15`, copied unchanged. The source is licensed under MIT, copyright Stripe. The original licence text is in `skills/LICENSE`. Stripe syncs these skills from `docs.stripe.com/.well-known/skills`.

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
