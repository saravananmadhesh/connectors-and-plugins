# Google Docs

BoldCreate plugin that connects agents to Google Docs through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Read and update Google Docs.

> **Developer Preview.** Google's Workspace MCP servers are part of the Google Workspace Developer Preview Program and may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Docs**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Docs**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-docs@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-docs": {
      "type": "http",
      "url": "https://docsmcp.googleapis.com/mcp/v1",
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
   - `https://www.googleapis.com/auth/documents.readonly`
   - `https://www.googleapis.com/auth/documents`
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out. In Claude Code, pass the client when you add the server, for example `claude mcp add --transport http --client-id <id> --client-secret google-docs <url>`.

## Before you connect

Your Google Cloud project must be enrolled in the Google Workspace Developer Preview Program, with the product's API and its MCP service enabled. A Workspace admin may need to allow the OAuth client for your domain.

## What it can do

The server lists two tools. Descriptions and markings are taken from the server's `tools/list` response, checked on 2026-11-10.

| Tool | Marked by the server | What the server says it does |
| --- | --- | --- |
| `read_doc` | Read-only | Retrieves a JSON representation of the Google Doc for a document ID. The JSON includes the text and structural information, and comments if requested. Corresponds to `documents.get` in the REST API. |
| `update_doc` | Not read-only | Updates a document using batch update requests. It accepts a `documents.batchUpdate` request as JSON. |

The server returns no resources. Neither tool is marked destructive. The server lists no tool that creates a new document.

## Write access

The server marks `update_doc` as not read-only, so it changes the signed-in member's documents.

The description of `update_doc` lists 48 update types. 15 of them delete or replace content: `replaceAllText`, `deleteParagraphBullets`, `deleteNamedRange`, `deleteContentRange`, `deleteTableRow`, `deleteTableColumn`, `deletePositionedObject`, `replaceNamedRangeContent`, `deleteHeader`, `deleteFooter`, `deleteTab`, `deleteComment`, `deleteCommentReply`, `rejectSuggestion`, `deleteSuggestion`. The server marks the tool as not destructive, so the marking does not tell you whether a call deletes anything.

## Scopes

The plugin requests these scopes, which are the Docs scopes in Google's guide:

- `https://www.googleapis.com/auth/drive.readonly`
- `https://www.googleapis.com/auth/drive.file`
- `https://www.googleapis.com/auth/documents.readonly`
- `https://www.googleapis.com/auth/documents`

The server's OAuth metadata also lists `https://www.googleapis.com/auth/drive` as supported. The plugin does not request it.

## Rate limits

Google's guide for the Workspace MCP servers lists no rate limits for the Docs server.

## Security notes

- Google's guide says the Workspace MCP servers inherit the same permissions and data governance controls as the user.
- The client secret is stored encrypted, as described in the Setup section.

## Docs

- Google Docs MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `google-docs` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/google-docs) (MIT).

## License

MIT
