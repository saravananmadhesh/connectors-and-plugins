# Google Calendar

BoldCreate plugin that connects agents to Google Calendar through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

List calendars, search and read events, suggest meeting times, and create, update, delete or respond to events.

> **Developer Preview.** Google's Workspace MCP servers are part of the Google Workspace Developer Preview Program and may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Google Calendar**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Google Calendar**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-calendar@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "google-calendar": {
      "type": "http",
      "url": "https://calendarmcp.googleapis.com/mcp/v1",
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
   - `https://www.googleapis.com/auth/calendar.calendarlist.readonly`
   - `https://www.googleapis.com/auth/calendar.events`
   - `https://www.googleapis.com/auth/calendar.events.freebusy`
   - `https://www.googleapis.com/auth/calendar.events.readonly`
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out. In Claude Code, pass the client when you add the server, for example `claude mcp add --transport http --client-id <id> --client-secret google-calendar <url>`.

## Before you connect

Your Google Cloud project must be enrolled in the Google Workspace Developer Preview Program, with the product's API and its MCP service enabled. A Workspace admin may need to allow the OAuth client for your domain.

## What it can do

The server lists nine tools. Descriptions and markings are taken from the server's `tools/list` response, checked on 2026-11-10.

| Tool | Marked by the server | What the server says it does |
| --- | --- | --- |
| `list_calendars` | Read-only | Returns the calendars this user owns or has subscribed to. |
| `list_events` | Read-only | Returns events on the given calendar matching the specified constraints. |
| `get_event` | Read-only | Returns a single event on the given calendar. |
| `search_events` | Read-only | Searches events on the user's primary calendar using semantic search. |
| `suggest_time` | Read-only | Suggests time periods across one or more calendars. |
| `create_event` | Not read-only | Creates an event on the given calendar. |
| `update_event` | Not read-only | Updates an event on the given calendar. |
| `respond_to_event` | Not read-only | Responds to an event on a calendar. |
| `delete_event` | Not read-only, destructive | Deletes an event on the given calendar. |

The server returns no resources.

## Write access

The server marks `create_event`, `update_event`, `respond_to_event` and `delete_event` as not read-only, and `delete_event` as destructive. They change the signed-in member's calendars.

## Scopes

The plugin requests these scopes:

- `https://www.googleapis.com/auth/calendar.calendarlist.readonly`
- `https://www.googleapis.com/auth/calendar.events`
- `https://www.googleapis.com/auth/calendar.events.freebusy`
- `https://www.googleapis.com/auth/calendar.events.readonly`

Google's guide lists only the three read scopes. The server's own per-tool OAuth metadata shows that `create_event`, `update_event`, `delete_event` and `respond_to_event` accept only `calendar` or `calendar.events`. The plugin adds `calendar.events`, the narrower of the two, so those four tools can run. It lets the plugin read and change events on calendars the member can access. It does not cover calendar settings or sharing.

The server's OAuth metadata also lists these scopes as supported, which the plugin does not request: `calendar`, `calendar.acls`, `calendar.calendarlist`, `calendar.calendars`, `calendar.calendars.readonly`, `calendar.freebusy`, `calendar.readonly` and `calendar.settings.readonly`.

I could not sign in, so I have not tested the four event tools with a live account. The scope match comes from the server's metadata.

## Rate limits

Google's guide for the Workspace MCP servers lists no rate limits for the Calendar server.

## Security notes

- Google's guide says the Workspace MCP servers inherit the same permissions and data governance controls as the user.
- The client secret is stored encrypted, as described in the Setup section.

## Docs

- Google Calendar MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `google-calendar` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/google-calendar) (MIT).

## License

MIT
