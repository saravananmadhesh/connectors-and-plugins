# Gmail

BoldCreate plugin that connects agents to Gmail through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search, read, and draft Gmail messages and threads.

> **Developer Preview.** Google's Workspace MCP servers are part of the Google Workspace Developer Preview Program and may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Gmail**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Gmail**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install gmail@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "gmail": {
      "type": "http",
      "url": "https://gmailmcp.googleapis.com/mcp/v1"
    }
  }
}
```

## Setup

There is nothing to set when you install the plugin. Auth is OAuth: the first time the agent calls a tool, each member signs in to their own account in the browser, and tool calls run with that member's permissions. The plugin requests these scopes:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.compose`

## Before you connect

Your Google Cloud project must be enrolled in the Google Workspace Developer Preview Program, with the product's API and its MCP service enabled. A Workspace admin may need to allow the app for your domain.

## Docs

- Gmail MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `gmail` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/gmail) (MIT).

## License

MIT
