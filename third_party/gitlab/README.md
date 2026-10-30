# GitLab

BoldCreate plugin that connects agents to GitLab through GitLab's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Work with GitLab projects, issues, merge requests, pipelines, and code search.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **GitLab**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **GitLab**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install gitlab@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "gitlab": {
      "type": "http",
      "url": "https://gitlab.com/api/v4/mcp"
    }
  }
}
```

## Setup

There is nothing to set when you install the plugin. It connects to GitLab.com.

Auth is OAuth. The first time the agent calls a tool, each member signs in to their own account in the browser. Tool calls run with that member's permissions.

GitLab registers the OAuth client itself (dynamic client registration), so there is no client to create. A personal access token sent as `Authorization: Bearer <token>` also works; we ship the OAuth flow.

## Before you connect

The GitLab MCP server is generally available from GitLab 19.5 (Free tier from 19.2). An administrator or group owner must allow MCP access before members can connect.

## Docs

- GitLab MCP server: https://docs.gitlab.com/user/model_context_protocol/mcp_server/
- Server URL (GitLab.com): https://gitlab.com/api/v4/mcp

## Logo

GitLab mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #FC6D26, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
