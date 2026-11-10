# Atlassian (Jira + Confluence)

BoldCreate plugin that connects agents to Atlassian (Jira + Confluence) through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Connect to Atlassian products including Jira and Confluence. Search and create issues, access documentation, manage sprints, and integrate your development workflow with Atlassian's collaboration tools.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Atlassian (Jira + Confluence)**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Atlassian (Jira + Confluence)**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install atlassian@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "atlassian": {
      "type": "http",
      "url": "https://mcp.atlassian.com/v2/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Authentication

This plugin ships the OAuth flow. Atlassian's README says the server supports OAuth 2.1 and API token authentication.

API token authentication is for headless, service-style or non-interactive clients. Atlassian lists two mechanisms:

| Mechanism | Header |
| --- | --- |
| Personal API token (Basic auth) | `Authorization: Basic <base64(email:api_token)>` |
| Service account API key (Bearer token) | `Authorization: Bearer <api_key>` |

An organization admin must enable API token authentication for the Atlassian MCP Server. If the admin has disabled it, clients must use OAuth 2.1. Jira Service Management tools support API token authentication only.

## Endpoint

The plugin uses `https://mcp.atlassian.com/v2/mcp`, the endpoint Atlassian recommends for all clients. Atlassian's README says clients that cannot complete authentication after the move to v2 tools may need to clear cached client IDs or `.well-known` credentials.

## What it can do

Atlassian's README lists the products and permission groups below. Organization admins grant or revoke access at the permission-group level, and each tool inherits the access of its parent group. The endpoint requires sign-in before it lists tools, so this section comes from [Atlassian's README](https://github.com/atlassian/atlassian-mcp-server) and [Supported tools page](https://support.atlassian.com/atlassian-rovo-mcp-server/docs/supported-tools/).

| Product | Permission groups | OAuth 2.1 | API token |
| --- | --- | --- | --- |
| Jira | `read_jira`, `write_jira`, `search_jira` | Yes | Yes |
| Jira (admin-enabled) | `delete_jira`, `manage_jira` | Yes | Yes |
| Confluence | `read_confluence`, `write_confluence`, `search_confluence` | Yes | Yes |
| Bitbucket Cloud | `read_bitbucket`, `write_bitbucket` | Yes | Yes |
| Jira Service Management | `read_jsm`, `write_jsm` | No | Yes (only) |
| Atlassian platform | `read_teamwork_graph`, `write_teamwork_graph`, `search_atlassian` | Yes | Yes |
| Loom | `read_loom`, `write_loom` | Yes | Yes |
| Goals | `read_goals`, `write_goals` | Yes | Yes |
| Projects | `read_projects`, `write_projects` | Yes | Yes |
| Teams | `read_teams`, `write_teams` | Yes | Yes |
| Focus | `read_focus`, `write_focus` | Yes | Yes |
| Talent | `read_talent`, `write_talent` | Yes | Yes |
| Compass | `read_compass`, `write_compass` | Yes (only) | No |

Atlassian lists these conditions:

- `delete_jira` and `manage_jira` are disabled by default. An admin must enable them.
- Bitbucket Cloud tools are available only if your Bitbucket workspace is linked to an organization.
- Loom tools are available only for Loom workspaces linked to an Atlassian site.

Atlassian says the server exposes a small set of primary tools and lets the client find the rest on demand. Its README names a `tools=all` override for MCP gateways: `https://mcp.atlassian.com/v2/mcp?tools=all`. This plugin does not use it.

## Write access

Groups named `write_*`, `delete_jira` and `manage_jira` can change data in your Atlassian products. Atlassian's README says tool calls act with your account's permissions, and recommends human confirmation for any high-impact or destructive action.

## Admin controls

Atlassian's README describes these controls:

- Site and organization admins can manage, review or revoke the MCP app's access.
- The **Rovo MCP server** settings page in Atlassian Administration controls which external AI tools and domains can connect. By default, Atlassian-supported domains are allowed. Domain controls apply to OAuth 2.1 connections.
- If your organization uses IP allowlisting for Atlassian Cloud apps, requests through the server must come from an allowed IP address.
- Individual users can revoke their own app authorizations from their profile settings.
- Each tool use is recorded in your organization's audit log, in Atlassian Administration under **Insights → Audit log**.

For details, see the Atlassian pages linked under Docs.

## Rate limits

Atlassian's README and Supported tools page list no rate limits for the server.

## Security notes

- Atlassian's README says traffic is encrypted in transit over HTTPS (TLS 1.2 or later) and that data access respects user permissions.
- Atlassian warns that large language models are vulnerable to prompt injection, which can instruct an agent to exfiltrate data or make unintended changes. It recommends using only trusted MCP clients and servers, applying least privilege, and monitoring audit logs.

## Skills

The `skills/` folder holds the 7 agent skills published in [atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server/tree/3be55622453304b905f0c0fd5ef96fa4d638627c/skills) at commit `3be55622453304b905f0c0fd5ef96fa4d638627c`, copied unchanged. The source is licensed under Apache-2.0, copyright Atlassian US, Inc. The original licence text is in `skills/LICENSE`. Atlassian's `skills/v1/` archive is not included.

| Skill |
| --- |
| `atlassian-mcp-code-search` |
| `capture-tasks-from-meeting-notes` |
| `generate-status-report` |
| `jira-sprint-dashboard` |
| `search-company-knowledge` |
| `spec-to-backlog` |
| `triage-issue` |

Atlassian's skills README says these skills target the `/v2/mcp` endpoint.

## Docs

- Atlassian MCP server repository: https://github.com/atlassian/atlassian-mcp-server
- Getting started: https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/
- Supported tools: https://support.atlassian.com/atlassian-rovo-mcp-server/docs/supported-tools/
- Understand Atlassian MCP Server: https://support.atlassian.com/security-and-access-policies/docs/understand-atlassian-rovo-mcp-server/
- Control Atlassian MCP Server settings: https://support.atlassian.com/security-and-access-policies/docs/control-atlassian-rovo-mcp-server-settings/
- Monitor Atlassian MCP Server activity: https://support.atlassian.com/security-and-access-policies/docs/monitor-atlassian-rovo-mcp-server-activity/

## Logo

Atlassian mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #0052CC, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
