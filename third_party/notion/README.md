# Notion

BoldCreate plugin that connects agents to Notion through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search your Notion workspace, create and edit pages, and manage databases.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Notion**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Notion**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install notion@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## What it can do

Notion's supported-tools guide groups the tools like this. The tools you can use depend on your connection, your permissions and your workspace plan. An admin may also limit the tools in a workspace-owned connection. The tool `notion-get-tool-access` shows what your connection can use.

| Area | Example tools from Notion's tool list |
| --- | --- |
| Search and read | `notion-search`, `notion-fetch`, `notion-query-meeting-notes`, `notion-get-users`, `notion-get-teams`, `notion-connector-search` |
| Pages | `notion-create-pages`, `notion-update-page`, `notion-move-pages`, `notion-duplicate-page`, `notion-delete-pages` |
| Databases and views | `notion-create-database`, `notion-update-data-source`, `notion-create-view`, `notion-update-view`, `notion-delete-databases` |
| Comments and history | `notion-create-comment`, `notion-create-suggested-edit`, `notion-restore-pages`, `notion-restore-version` |
| Files | `notion-create-file-upload`, `notion-create-attachment`, `notion-get-file-download-urls` |
| Calendars | `notion-calendar-list-events`, `notion-calendar-create-events`, `notion-calendar-update-events`, `notion-calendar-cancel-events` |
| Skills and agents | `notion-get-enabled-skills`, `notion-upload-skill`, `notion-spawn-session`, `notion-memory-search` |

The full list is in [Notion MCP tool FAQs](https://developers.notion.com/guides/mcp/tools-faqs.md). The endpoint requires sign-in before it lists tools, so this table comes from Notion's documentation.

## Write access

Many of these tools change your workspace. Notion's tool list includes tools that delete pages (`notion-delete-pages`) and databases (`notion-delete-databases`), cancel calendar events and edit pages. Notion recommends enabling confirmation before actions that change content.

## Beta label

The server's OAuth metadata names the resource "Notion MCP (Beta)".

## Rate limits

Notion MCP uses the standard Notion API request limits, and every tool call counts toward them. Notion MCP retries a rate limit once when the wait is 2 seconds or less. Otherwise it returns a tool error with `code: "rate_limited"` and, when known, `retry_after_seconds`. If you hit a limit, ask the agent to run fewer operations in parallel, or try again later. Details: [Notion MCP rate limits](https://developers.notion.com/guides/mcp/rate-limits.md).

## Admin controls

Workspace owners manage MCP client access in **Settings → Notion MCP → Manage workspace clients**. Limiting which clients members can connect needs the Enterprise plan. Organization owners can use the Admin API to list and revoke members' connections. Details: [Security best practices](https://developers.notion.com/guides/mcp/mcp-security-best-practices.md).

## Security notes

- A connected client can use Notion MCP to access content that you can access.
- Notion tells users to treat content returned by tools as untrusted, because it can contain instructions that try to change the agent's behaviour.
- Notion tells users to review the permissions of every MCP client and tool, and to review proposed actions before approving them.
- Content returned by Notion MCP can include full items from connected sources, such as Slack threads, Google Drive files and emails, when `notion-fetch` opens a connector search result.

## Docs

- Notion MCP server: https://developers.notion.com/docs/mcp
- Supported tools: https://developers.notion.com/guides/mcp/tools-faqs.md
- Rate limits: https://developers.notion.com/guides/mcp/rate-limits.md
- Security best practices: https://developers.notion.com/guides/mcp/mcp-security-best-practices.md

## Logo

Notion mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #000000, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
