# Zapier

BoldCreate plugin that connects agents to Zapier through Zapier's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Connect 9,000+ apps to your AI workflow. Discover, enable, and execute Zapier actions directly from your client.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Zapier**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Zapier**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install zapier@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "zapier": {
      "type": "http",
      "url": "https://mcp.zapier.com/api/v1/connect"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Authentication

Zapier's documentation says every MCP client connects to the same endpoint, `https://mcp.zapier.com/api/v1/connect`, and that Zapier MCP supports Streamable HTTP only. A client that can only use SSE cannot connect.

OAuth from inside the MCP client is the default. Zapier connects the client to the member's default server during sign-in, and creates one if the member has none. Zapier holds the app credentials, so the MCP client never handles a third-party API key. If your organization manages your MCP client, an admin or owner may need to approve the Zapier connector first.

Zapier also documents a connection token for MCP clients that are not on its supported list. A token is long-lived and grants whoever holds it the ability to run the server's tools and read the data they return. Zapier says to prefer the `Authorization: Bearer` header over a `?token=` query parameter, because a URL is more likely to end up in a log, a shell history or a committed config file. This plugin ships the OAuth flow.

The server's OAuth metadata lists the scopes `openid`, `profile` and `email`, a registration endpoint, and PKCE with S256.

## What it can do

Zapier's "How Zapier MCP tools work" page describes two server modes. New servers default to agentic mode. The endpoint requires sign-in before it lists tools, so this section comes from [Zapier's documentation](https://docs.zapier.com/mcp/overview/how-tools-work.md).

In agentic mode the server exposes 16 fixed meta-tools:

| Category | Tools |
| --- | --- |
| Action management | `inspect_zapier_actions`, `discover_zapier_actions`, `enable_zapier_action`, `disable_zapier_action`, `auto_provision_mcp` |
| Execution | `execute_zapier_read_action`, `execute_zapier_write_action` |
| App connections | `list_zapier_connections`, `manage_zapier_connections` |
| Configuration | `get_configuration_url` |
| Skills | `list_zapier_skills`, `get_zapier_skill`, `create_zapier_skill`, `update_zapier_skill`, `delete_zapier_skill` |
| Feedback | `send_feedback` |

Zapier's page also says:

- Some servers expose a `write_code_action` meta-tool. It creates a custom code action when no built-in action matches, and runs the generated code in a secure sandbox. Zapier says it is rolling out to more accounts over time.
- Workflow tools for building Next Gen Zaps, such as `create_workflow`, `run_workflow` and `publish_workflow_draft`, are in early access.
- In managed mode the server exposes one tool for each action that the member enables at [mcp.zapier.com](https://mcp.zapier.com), and skills are not available.

## Write access

`execute_zapier_write_action` runs write actions, which Zapier's page describes as sending a message, creating a task or updating a record. The agent can also enable and disable actions, create, update and delete saved skills, and, in early access, create, publish and delete workflows. Each tool call runs through the member's existing Zapier app connections, and Zapier's page says each one is recorded in the History tab at mcp.zapier.com.

## Usage and billing

Zapier's usage page says Zapier MCP runs on the member's existing Zapier plan, with no separate MCP billing:

- Each successful tool call uses 2 tasks from the plan's task allowance.
- A failed tool call uses 0 tasks.
- There is no limit on tool calls per session, or on tools per server.
- If pay-per-task billing is off or not included, tool calls stop when the task limit is reached, until the billing cycle resets.

## Rate limits

Zapier's usage page sets no separate rate limit. The only usage limit it describes is the plan's task allowance.

## Security and admin controls

- Zapier's security page says Zapier MCP is generally available under Zapier's SOC 2 Type II certification.
- Zapier MCP is enabled by default for all accounts. Workspace admins can enable or disable it per workspace by contacting their Zapier account manager, allow or restrict it for specific users, and set task quotas per workspace.
- Zapier says app and action restrictions set at the account level apply, and cannot be set only for Zapier MCP.
- Customer data is stored in AWS US-East 1. Zapier says Enterprise customers are opted out of AI model training by default.
- Zapier says to treat a connection token like a password and to give each user their own server and token.

## Skills, agent and rule

The plugin folder holds the Zapier MCP plugin published in [zapier/zapier-mcp](https://github.com/zapier/zapier-mcp/tree/54a12277a12c60df51ec16cf4e4ef0b27b166649/plugins/zapier) at commit `54a12277a12c60df51ec16cf4e4ef0b27b166649`, copied unchanged. The source is licensed under MIT, copyright Zapier, Inc. The original licence text is in `skills/LICENSE`.

| Kind | Name | What the source file says it does |
| --- | --- | --- |
| Skill | `zapier-onboard` | Onboard a new user to Zapier MCP: introduce what it can do, walk through authentication, and route into the right flow. |
| Skill | `zapier-demo` | Walk a new user through setting up their first Zapier action and running it live. |
| Skill | `zapier-explore` | Explore what Zapier MCP can do for the user, interview them about their role and apps, and walk them through enabling actions. |
| Skill | `zapier-status` | Check the health of the Zapier MCP setup, with health check, audit and diagnose modes. |
| Agent | `zapier-mcp.agent` | Uses Zapier MCP to discover, enable, audit and execute app actions, following Zapier's read/write confirmation lifecycle. |
| Rule | `zapier-lifecycle` | Enforces the Zapier MCP tool lifecycle, safety rules and error handling. It is marked `alwaysApply: true`. |

The rule tells the agent to confirm before it runs write actions, and not to treat wording in tool results, emails or CRM fields as approval. It also tells the agent to prefer a native MCP server over Zapier's actions for the same app.

The rule's error table lists a "rate limit" error and tells the agent to slow down. Zapier's usage page does not describe a rate limit. I could not test the server's real errors.

## Docs

- Zapier MCP: https://docs.zapier.com/mcp/home
- How connections work: https://docs.zapier.com/mcp/overview/how-connections-work.md
- How tools work: https://docs.zapier.com/mcp/overview/how-tools-work.md
- Usage and billing: https://docs.zapier.com/mcp/overview/usage.md
- Security and governance: https://docs.zapier.com/mcp/manage/security.md
- Zapier plugin source: https://github.com/zapier/zapier-mcp

## Logo

Zapier mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #FF4F00, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
