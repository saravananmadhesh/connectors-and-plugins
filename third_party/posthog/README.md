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
      "url": "https://mcp.posthog.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Docs

- PostHog MCP server: https://posthog.com/docs/model-context-protocol

## Logo

Copied from Cursor's `posthog-mcp` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/posthog-mcp) (MIT).

## License

MIT
