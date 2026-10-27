# PostHog

BoldCreate plugin that connects agents to PostHog through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Query product analytics, manage feature flags, and investigate errors in PostHog.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **PostHog**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **PostHog**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install posthog@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "posthog": {
      "type": "http",
      "url": "https://mcp.posthog.com/mcp",
      "headers": {
        "Authorization": "Bearer ${POSTHOG_API_KEY}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **PostHog personal API key** (`POSTHOG_API_KEY`) | Yes | Yes | Create one in PostHog under Settings > Personal API keys, using the MCP Server preset. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Docs

- PostHog MCP server: https://posthog.com/docs/model-context-protocol

## Logo

Copied from Cursor's `posthog-mcp` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/posthog-mcp) (MIT).

## License

MIT
