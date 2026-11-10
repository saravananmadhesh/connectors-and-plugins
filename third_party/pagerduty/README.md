# PagerDuty

BoldCreate plugin that connects agents to PagerDuty through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Browse PagerDuty services, incidents, and change events.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **PagerDuty**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **PagerDuty**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install pagerduty@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "pagerduty": {
      "type": "http",
      "url": "https://mcp.pagerduty.com/mcp",
      "headers": {
        "Authorization": "Token token=${PAGERDUTY_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **PagerDuty API key** (`PAGERDUTY_API_KEY`) | Yes | Yes | API user token from PagerDuty: User Profile, User Settings, API Access, Create API User Token. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it if it is ever exposed.

## Docs

- PagerDuty plugin (vendor repository): https://github.com/PagerDuty/claude-code-plugins

## Logo

PagerDuty mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #06AC38, on a padded white tile. The mark is a trademark of its owner.

## License

MIT for this plugin's files.

The vendor repository (PagerDuty/claude-code-plugins) is licensed Apache-2.0. This plugin contains only the server address and header format from it, and no vendor code. The vendor's licence and copyright apply to their repository.
