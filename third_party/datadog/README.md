# Datadog

BoldCreate plugin that connects agents to Datadog through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Query Datadog logs, metrics, traces, incidents, and monitors.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Datadog**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Datadog**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install datadog@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "https://mcp.datadoghq.com/v1/mcp",
      "headers": {
        "DD_API_KEY": "${DD_API_KEY}",
        "DD_APPLICATION_KEY": "${DD_APPLICATION_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Datadog API key** (`DD_API_KEY`) | Yes | Yes | API key from a scoped service account (Organization Settings, API Keys). |
| **Datadog application key** (`DD_APPLICATION_KEY`) | Yes | Yes | Application key from the same service account (Organization Settings, Application Keys). |

For security, use a scoped API key and application key from a service account that has only the permissions the agent needs. Rotate or revoke them if they are ever exposed.

This plugin targets the US1 site (`mcp.datadoghq.com`). On another [Datadog site](https://docs.datadoghq.com/getting_started/site/) (for example EU, `mcp.datadoghq.eu`), the endpoint differs; contact us for a site-specific build.

Datadog also supports an OAuth sign-in flow in some clients, where each member signs in to their own account. See the vendor docs for client support.

## Docs

- Datadog MCP server: https://docs.datadoghq.com/bits_ai/mcp_server/
- Setup and regional endpoints: https://docs.datadoghq.com/bits_ai/mcp_server/setup/
- Datadog sites: https://docs.datadoghq.com/getting_started/site/

## Logo

Datadog mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #632CA6, on a padded white tile. The mark is a trademark of its owner.

## License

MIT for this plugin's files.

This plugin contains only the server address and header format for Datadog's hosted MCP server, and no vendor code. Datadog's trademarks and documentation remain the property of Datadog, Inc.
