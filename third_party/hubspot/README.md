# HubSpot

BoldCreate plugin that connects agents to HubSpot through HubSpot's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Secure read and write access to your HubSpot CRM data — contacts, deals, engagements, and more.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **HubSpot**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **HubSpot**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install hubspot@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "hubspot": {
      "type": "http",
      "url": "https://mcp.hubspot.com",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Client ID** (`CLIENT_ID`) | Yes | No | The client ID of an MCP connector your team created in HubSpot. Every team member signs in under it. |
| **Client secret** (`CLIENT_SECRET`) | Yes | Yes | The client secret of that MCP connector. Stored encrypted. |

Auth is OAuth. HubSpot's documentation says the server requires OAuth with PKCE (S256). The first time the agent calls a tool, each member signs in in the browser, selects the HubSpot account to connect, and grants permissions.

## Set up your team's MCP connector

HubSpot's documentation says you connect an MCP client by creating an MCP connector in your HubSpot account. The server's OAuth metadata lists no registration endpoint, so a team member creates the connector and the team shares its client ID and secret.

1. In your HubSpot account, go to **Development**, then **MCP Connectors**, and click **Create MCP connector**.
2. Enter a name. Add the BoldCreate Connect OAuth callback URL (shown on the plugin's settings page) as the **Redirect URL**. HubSpot says the redirect URL must match the one configured in your MCP client.
3. Click **Create**. HubSpot generates the connector with its client credentials.
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

HubSpot's documentation says you don't define the connector's scopes. They are set by the tools the MCP server has at the time of installation and the permissions the user grants. If the server's tools change and add scopes, users who already installed the connector must re-install it to grant them.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out.

## What it can do

HubSpot's documentation lists this access. Tool availability varies by HubSpot subscription, user permissions and account configuration. HubSpot says to run `get_user_details` after connecting to see which tools and objects are available for your account. The endpoint requires sign-in before it lists tools, so this section comes from [HubSpot's documentation](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server).

**Read access**

- CRM records: contacts, companies, deals, tickets, leads, users, appointments, courses, listings, projects, services, custom objects and segments (lists). Revenue objects (carts, invoices, orders, line items, products, quotes, subscriptions) are in BETA.
- Activities: calls, emails, meetings, notes and tasks.
- Content and marketing: blog posts, landing pages, site pages, campaigns and marketing events.
- Content analytics, conversations, marketing emails and email analytics, social accounts and posts, user and account details.
- AEO (available with a Marketing Hub Professional or Enterprise subscription).

**Write access**

- CRM records: create and edit contacts, companies, deals, tickets, leads, line items, products, appointments, courses, listings, projects, services and custom object records.
- Activities: calls, emails, meetings, notes and tasks.
- Content: create, edit and publish landing pages, website pages and blog posts.
- Campaigns, marketing email drafts, pipelines, custom properties and static segments.
- Quotes (BETA), which require the manage revenue objects optional scope and a Revenue Hub Professional or Enterprise subscription.
- AEO and social: HubSpot says creating or changing social posts requires the `social.publish` scope. The `social.read` and `social.edit` scopes give read-only access.

## Write access

The server can create, edit and publish data in the signed-in member's HubSpot account, including publishing landing pages, website pages, blog posts and social posts. HubSpot says all actions respect the user's existing HubSpot permissions, and users can only view and modify records they have access to.

## Sensitive data

HubSpot's documentation says that if your account has Sensitive Data turned on, activity data (calls, emails, meetings, notes and tasks) and conversation data are blocked from access through the MCP server. The restriction applies to the MCP server only and does not apply to the standard CRM APIs.

## Rate limits

HubSpot's MCP server pages list no rate limits for the server.

## Skills

The `skills/` folder holds the 12 agent skills published in [HubSpot/hubspot-mcp-plugins](https://github.com/HubSpot/hubspot-mcp-plugins/tree/032d294bc91577cb1b9c4a61372567266ca8524e) at commit `032d294bc91577cb1b9c4a61372567266ca8524e`, copied unchanged. The source is licensed under Apache-2.0. The original licence text is in `skills/LICENSE`.

| Source plugin | Skills |
| --- | --- |
| HubSpot Sales | `call-prep`, `contact-lookup`, `daily-brief`, `follow-up`, `hubspot`, `import-contacts`, `log-call`, `onboarding`, `pipeline-pulse` |
| HubSpot Partner | `book-pulse`, `expansion-opportunities`, `renewal-radar` |

HubSpot's repository says the Partner skills read the `PARTNER_CLIENT` CRM object, which exists only in HubSpot Solutions Partner portals.

The skills were written for HubSpot's own plugins for Claude Code, which connect to `https://mcp.hubspot.com/anthropic`. This plugin connects to `https://mcp.hubspot.com`. The skills call tools named `search_crm_objects`, `manage_crm_objects`, `get_crm_objects`, `get_properties`, `get_user_details` and `get_organization_details`. HubSpot's documentation names only `get_user_details`. Some skills also use other connected apps, such as calendar, email or Slack, when they are available.

## Agents

The `agents/` folder holds the 2 agents published in the HubSpot Sales plugin of [HubSpot/hubspot-mcp-plugins](https://github.com/HubSpot/hubspot-mcp-plugins/tree/032d294bc91577cb1b9c4a61372567266ca8524e/HubSpot-Sales/agents) at the same commit, copied unchanged. The original Apache-2.0 licence text is in `skills/LICENSE`.

| Agent | What the agent file says it does |
| --- | --- |
| `account-research` | Performs parallel research on a HubSpot contact and their company, and returns a structured summary for use by other skills. |
| `brief-fetcher` | Runs parallel data fetches to power the Daily Brief skill, and returns a single structured JSON payload. Its file says to use it only from the Daily Brief skill. |

Both agent files say their tool names are "expected names for the HubSpot MCP connector" and that a named tool may be unavailable. The same endpoint difference described under Skills applies to the agents.

## Docs

- HubSpot MCP server: https://developers.hubspot.com/mcp
- Integrate AI tools with the HubSpot MCP server: https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server
- HubSpot skills source: https://github.com/HubSpot/hubspot-mcp-plugins

## Logo

HubSpot mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #FF7A59, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
