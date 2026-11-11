# BoldDesk

BoldCreate plugin that connects agents to BoldDesk through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Create, update and route support tickets, reply to conversations, log work, and search the Knowledge Base in BoldDesk.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **BoldDesk**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **BoldDesk**.
- **Claude Code:** `/plugin marketplace add SF3922-Shreedhar/BoldCreate-Connectors`, then `/plugin install bolddesk@boldcreate-connectors`.

## MCP

```json
{
  "mcpServers": {
    "bolddesk": {
      "type": "http",
      "url": "https://${BOLDDESK_HOST}/mcp"
    }
  }
}
```

## What it can do

| Area | What the agent can do |
| --- | --- |
| Tickets | Create, update, list and read tickets, change status, read response and resolution insights, and read ticket forms, fields and valid statuses. |
| Conversations | Post public replies, public notes and internal notes, and read message and change history. |
| Ticket links | Create and list related, parent and child links, and external web links. |
| Activities | Create, update, list and comment on tasks, calls and meetings. |
| Approvals | Create approval requests, list and read them, and submit responses. |
| Worklogs | Add and list billable and non-billable time entries. |
| Directory | Search contacts, contact groups, agents and assignment groups. |
| Identity and reference | Read the current user, organization and brand access, and field options such as categories, types, sources and time zones. |
| Knowledge Base | Browse category and section trees, search and list articles, read article details, and create articles. |

Everything is limited to what the signed-in user can see and do in BoldDesk, including their brand access.

## Setup

Set this when you install the plugin.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **BoldDesk host** (`BOLDDESK_HOST`) | Yes | No | Your BoldDesk host name, such as yourcompany.bolddesk.com, or your mapped custom domain. It must match your account, or BoldDesk rejects the request. |

Auth is OAuth 2.0. The first time the agent calls a tool, each member signs in to BoldDesk in the browser. Tool calls run with that member's permissions.

## Before you connect

- A BoldDesk admin turns the MCP server on and manages connected OAuth clients in **AI Center, MCP Server**. BoldDesk registers clients dynamically, so there is no client ID or secret to enter here.
- BoldDesk recommends trying read-only requests first, before using tools that create or change data.
- To use an API key instead of OAuth, add an `x-api-key` header with your key to the server entry. The key acts with the permissions of its user. Keep it secret and rotate it regularly.

## Docs

- BoldDesk MCP Server: https://developer.bolddesk.com/mcp-server/

## Logo

BoldDesk icon from the vendor's developer site (developer.bolddesk.com), trimmed to the visible mark. It is the vendor's own icon and a trademark of its owner. It is not covered by the MIT licence.

## License

MIT
