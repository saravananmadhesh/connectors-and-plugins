# Sentry

BoldCreate plugin that connects agents to Sentry through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Investigate Sentry errors, stack traces, and issues for a project.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Sentry**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Sentry**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install sentry@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp/${SENTRY_ORG}/${SENTRY_PROJECT}"
    }
  }
}
```

## Setup

Set these when you install the plugin. They only scope the server to one organization and project; they are not secrets.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Organization slug** (`SENTRY_ORG`) | Yes | No | Your Sentry organization slug. Scopes the server to this organization. |
| **Project slug** (`SENTRY_PROJECT`) | Yes | No | Your Sentry project slug. Scopes the server to this project. |

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- Sentry MCP server: https://mcp.sentry.dev/

## Logo

Sentry mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #362D59, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
