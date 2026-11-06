# Gitea

BoldCreate plugin that connects agents to Gitea through your team's own [`gitea-mcp`](https://gitea.com/gitea/gitea-mcp) [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Work with Gitea repositories, issues, pull requests, and releases through your own gitea-mcp server.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Gitea**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Gitea**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install gitea@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "gitea": {
      "type": "http",
      "url": "https://${GITEA_MCP_HOST}/mcp",
      "headers": {
        "Authorization": "Bearer ${GITEA_ACCESS_TOKEN}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **gitea-mcp host** (`GITEA_MCP_HOST`) | Yes | No | Host name (and port, if any) where your team runs gitea-mcp in HTTP mode, such as gitea-mcp.example.com. |
| **Gitea access token** (`GITEA_ACCESS_TOKEN`) | Yes | Yes | Personal access token from your Gitea user settings (Settings, Applications) with the scopes the agent needs. |

Tool calls run with the permissions of the key or token you provide. Rotate or revoke it if it is ever exposed.

## Before you connect

Gitea has no hosted MCP endpoint. Run [`gitea-mcp`](https://gitea.com/gitea/gitea-mcp) in HTTP mode next to your Gitea server, for example `gitea-mcp -t http --host https://gitea.example.com`, and put it behind HTTPS. Each member's access token is sent to that server as a Bearer token.

## Docs

- Gitea MCP server: https://gitea.com/gitea/gitea-mcp

## Logo

Gitea mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #609926, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
