# Google Drive

BoldCreate plugin that connects agents to Google Drive through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search, read, create, download and copy files in Google Drive, and view file metadata and permissions.

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

The server lists eight tools. Descriptions are taken from the server's `tools/list` response, checked on 2026-11-10.

| Tool | Marked by the server | What the server says it does |
| --- | --- | --- |
| `search_files` | Read-only | Searches Drive files with a structured query. |
| `list_recent_files` | Read-only | Finds recent files. Sort orders are `recency`, `lastModified` and `lastModifiedByMe`. |
| `get_file_metadata` | Read-only | Returns general metadata about a file. |
| `read_file_content` | Read-only | Returns a natural language representation of a file, and its comments if requested. |
| `download_file_content` | Read-only | Returns file content as a base64 string. Google file types can be exported to a chosen MIME type. |
| `get_file_permissions` | Read-only | Lists the permissions of a file. |
| `create_file` | Not read-only | Creates or uploads a file. Folders are created with the folder MIME type. |
| `copy_file` | Not read-only | Copies a file, with an optional new title and parent folder. |

The server returns no resources.

## Write access

The server marks `create_file` and `copy_file` as not read-only. They can add files to the signed-in member's Drive. Neither is marked destructive.

## Scopes

The plugin requests these scopes:

- `https://www.googleapis.com/auth/drive.readonly`
- `https://www.googleapis.com/auth/drive.file`

The server's OAuth metadata also lists `https://www.googleapis.com/auth/drive` as supported. The plugin does not request it.

## Rate limits

Google's guide for the Workspace MCP servers lists no rate limits for the Drive server.

## Security notes

- Google's guide says the Workspace MCP servers inherit the same permissions and data governance controls as the user.
- The client secret is stored encrypted, as described in the Setup section.

## Docs

- Google Drive MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `google-drive` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/google-drive) (MIT).

## License

MIT
