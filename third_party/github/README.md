# GitHub

BoldCreate plugin that connects agents to GitHub through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

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
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **GitHub personal access token** (`GITHUB_PERSONAL_ACCESS_TOKEN`) | Yes | Yes | Fine-grained or classic PAT from https://github.com/settings/tokens with the repo scopes you want the agent to use. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it at the vendor if it is ever exposed.

## Docs

- GitHub MCP server: https://docs.github.com/en/copilot/how-tos/context/use-mcp/use-the-github-mcp-server

## Logo

Copied from Cursor's `github` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/github) (MIT).

## License

MIT
