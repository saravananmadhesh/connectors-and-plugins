# Android Management

BoldCreate plugin that connects agents to Android Management through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Manage enterprise Android devices, policies, and apps with the Android Management API.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Android Management**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Android Management**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install android-management@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "android-management": {
      "type": "http",
      "url": "https://androidmanagement.googleapis.com/mcp",
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

1. In the Google Cloud console, open **Google Auth Platform → Clients** and create a client of type **Web application**.
2. Add the BoldCreate Connect OAuth callback URL (shown on the plugin's settings page) as an authorized redirect URI.
3. Add these scopes to the project's OAuth consent screen:
   - `https://www.googleapis.com/auth/androidmanagement`
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out. In Claude Code, pass the client when you add the server, for example `claude mcp add --transport http --client-id <id> --client-secret android-management <url>`.

## Before you connect

You need a Google Cloud project with the product's API enabled, and your Google account needs the MCP Tool User role (`roles/mcp.toolUser`), plus the product roles for what the agent should do on that project.

## Docs

- Android Management MCP server: https://developers.google.com/android/management/use-android-management-mcp
- Tools reference: https://developers.google.com/android/management/reference/mcp
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Android mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #3DDC84, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
