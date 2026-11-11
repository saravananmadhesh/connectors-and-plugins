# Google Sheets

BoldCreate plugin that connects agents to Google Sheets through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Read and update Google Sheets spreadsheets, including values, formulas, and rows and columns.

> **Developer Preview.** Google's Workspace MCP servers are part of the Google Workspace Developer Preview Program and may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Sheets**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Sheets**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-sheets@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-sheets": {
      "type": "http",
      "url": "https://sheetsmcp.googleapis.com/mcp/v1",
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
   - `https://www.googleapis.com/auth/spreadsheets.readonly`
   - `https://www.googleapis.com/auth/spreadsheets`
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out. In Claude Code, pass the client when you add the server, for example `claude mcp add --transport http --client-id <id> --client-secret google-sheets <url>`.

## Before you connect

Your Google Cloud project must be enrolled in the Google Workspace Developer Preview Program, with the product's API and its MCP service enabled. A Workspace admin may need to allow the OAuth client for your domain.

## What it can do

The server lists six tools. Descriptions and markings are taken from the server's `tools/list` response, checked on 2026-11-10.

| Tool | Marked by the server | What the server says it does |
| --- | --- | --- |
| `get_values` | Read-only | Returns a range of values from a spreadsheet. |
| `get_spreadsheet` | Read-only | Returns titles, sheet names, grid properties and other metadata for a spreadsheet. Returns full grid data if requested. |
| `update_values` | Not read-only | Sets values in a range of a spreadsheet. |
| `update_formulas` | Not read-only | Sets formulas in a range of a spreadsheet. |
| `insert_dimension` | Not read-only | Inserts rows or columns in a sheet at a particular index. |
| `update_spreadsheet` | Not read-only | Applies one or more updates to the spreadsheet. Corresponds to `spreadsheets.batchUpdate` in the REST API. |

The server returns no resources. None of the six tools is marked destructive.

## Write access

The server marks the four write tools as not read-only. They change the signed-in member's spreadsheets.

The description of `update_spreadsheet` lists 74 update types. Several of them delete data: `deleteNamedRange`, `deleteSheet`, `deleteDimension`, `deleteEmbeddedObject`, `deleteFilterView`, `deleteRange`, `deleteConditionalFormatRule`, `deleteProtectedRange`, `deleteBanding`, `deleteDeveloperMetadata`, `deleteDimensionGroup`, `deleteDuplicates`, `deleteDataSource`, `deleteTable`, `deleteComment`, `deleteCommentReply`. Others include `findReplace`, `addSheet` and `duplicateSheet`. The server marks the tool as not destructive, so the marking does not tell you whether a call deletes anything.

## Scopes

The plugin requests these scopes:

- `https://www.googleapis.com/auth/drive.readonly`
- `https://www.googleapis.com/auth/drive.file`
- `https://www.googleapis.com/auth/spreadsheets.readonly`
- `https://www.googleapis.com/auth/spreadsheets`

The server's OAuth metadata also lists `https://www.googleapis.com/auth/drive` as supported. The plugin does not request it.

## Rate limits

Google's guide for the Workspace MCP servers lists no rate limits for the Sheets server.

## Security notes

- Google's guide says the Workspace MCP servers inherit the same permissions and data governance controls as the user.
- The client secret is stored encrypted, as described in the Setup section.

## Docs

- Google Sheets MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `google-sheets` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/google-sheets) (MIT).

## License

MIT
