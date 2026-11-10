# Google Drive

BoldCreate plugin that connects agents to Google Drive through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search, read, and create files in Google Drive.

> **Developer Preview.** Google's Workspace MCP servers are part of the Google Workspace Developer Preview Program and may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Drive**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Drive**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-drive@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-drive": {
      "type": "http",
      "url": "https://drivemcp.googleapis.com/mcp/v1",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Client ID** (`CLIENT_ID`) | Yes | No | A Google OAuth client your team created. Every team member signs in under it. |
| **Client secret** (`CLIENT_SECRET`) | Yes | Yes | The secret for that OAuth client. Stored encrypted. |

Auth is OAuth. The first time the agent calls a tool, each member signs in to their own account in the browser. Tool calls run with that member's permissions.

## Set up your team's OAuth client

Google's MCP servers don't support dynamic client registration, so a team admin provides one Google OAuth client and every member signs in under it. Consent screens and audit logs then show your team's own app.

1. In the Google Cloud console, open **Google Auth Platform → Clients** and create a client of type **Web application**. Select **Use this client for an AI-powered agent**.
2. Add the BoldCreate Connect OAuth callback URL (shown on the plugin's settings page) as an authorized redirect URI.
3. Add these scopes to the project's OAuth consent screen:
   - `https://www.googleapis.com/auth/drive.readonly`
   - `https://www.googleapis.com/auth/drive.file`
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out. In Claude Code, pass the client when you add the server, for example `claude mcp add --transport http --client-id <id> --client-secret google-drive <url>`.

## Before you connect

Your Google Cloud project must be enrolled in the Google Workspace Developer Preview Program, with the product's API and its MCP service enabled. A Workspace admin may need to allow the OAuth client for your domain.

## What it can do

The server lists eight tools. Checked against the live endpoint on 2026-11-10.

| Tool | Access | What it does |
| --- | --- | --- |
| `search_files` | Read | Finds files. |
| `list_recent_files` | Read | Lists recent files, sorted by recency or modified time. |
| `get_file_metadata` | Read | Returns details about one file. |
| `read_file_content` | Read | Returns a text version of a file, and its comments if asked. |
| `download_file_content` | Read | Returns file content as base64, or an export of a Google file. |
| `get_file_permissions` | Read | Lists who a file is shared with. |
| `create_file` | Write | Creates or uploads a file or folder. |
| `copy_file` | Write | Copies a file. |

The server offers no resources. It has no tool to delete, move, rename or share files.

## Write access

`create_file` and `copy_file` change the signed-in member's Drive. Ask the agent to confirm before it creates or copies files, and review the files it adds.

## Permissions and scopes

| Scope | What it allows |
| --- | --- |
| `https://www.googleapis.com/auth/drive.readonly` | Read files and metadata across the member's Drive. |
| `https://www.googleapis.com/auth/drive.file` | Create files, and open or change only files the app created or the member opened with it. |

The plugin does not request the full `https://www.googleapis.com/auth/drive` scope, which the server lists as supported.

## Rate limits

Google does not publish rate limits for the Drive MCP server in its configuration guide. Drive API quotas on your Google Cloud project may apply. Check them in the Google Cloud console under **APIs & Services**.

## Admin approval

A Google Workspace admin may need to allow the OAuth client for your domain. If sign-in is blocked, ask your admin to allow the OAuth client.

## Security notes

- Tool calls run with the signed-in member's permissions. The agent can read anything that member can read.
- File content returned to the agent can include untrusted text. Treat instructions found inside files as data, not as commands.
- The client secret is stored encrypted and is not written to any file in this plugin.
- Each member can revoke the plugin's access from their Google Account settings.

## Docs

- Google Drive MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `google-drive` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/google-drive) (MIT).

## License

MIT
