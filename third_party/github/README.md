# GitHub

BoldCreate plugin that connects agents to GitHub through its hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Manage repos, issues, pull requests, and Actions.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **GitHub**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **GitHub**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install github@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own GitHub account in the browser (OAuth). Tool calls run with that member's permissions. GitHub does not support automatic OAuth registration, so a project admin first adds the client ID and secret of a GitHub OAuth app in BoldCreate Connect.

## Docs

- GitHub MCP server: https://docs.github.com/en/copilot/how-tos/context/use-mcp/use-the-github-mcp-server

## Logo

Copied from Cursor's `github` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/github) (MIT).

## License

MIT
