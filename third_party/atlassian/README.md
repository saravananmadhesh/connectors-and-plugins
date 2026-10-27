# Atlassian (Jira + Confluence)

BoldCreate plugin that connects agents to Atlassian (Jira + Confluence) through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search and update Jira issues and Confluence pages.

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
      "url": "https://mcp.atlassian.com/v1/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Notes

Uses OAuth by default. Sites whose admin enables API token access can use Basic auth (email + API token) instead. This plugin ships the OAuth flow.

## Docs

- Atlassian (Jira + Confluence) MCP server: https://github.com/atlassian/atlassian-mcp-server

## Logo

Atlassian mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #0052CC, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
