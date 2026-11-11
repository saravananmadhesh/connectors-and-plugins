# Slack

BoldCreate plugin that connects agents to Slack through Slack's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Slack AI tools for users and developers: interact with your workspace via the Slack MCP server and use skills to develop Slack apps.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Slack**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Slack**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install slack@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://mcp.slack.com/mcp",
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
| **Client ID** (`CLIENT_ID`) | Yes | No | The client ID of a Slack app your team created. The app must be internal or published in the Slack Marketplace. Every team member signs in under it. |
| **Client secret** (`CLIENT_SECRET`) | Yes | Yes | The client secret of that Slack app. Stored encrypted. |

Auth is OAuth. The first time the agent calls a tool, each member signs in to their own Slack account in the browser. Tool calls run with that member's access.

## Set up your team's Slack app

Slack's documentation says:

- "We do not support SSE-based connections or Dynamic Client Registration at this time."
- MCP clients must be backed by a registered Slack app with a fixed app ID.
- Only directory-published apps or internal apps may use MCP. Unlisted apps are prohibited.
- Slack supports confidential OAuth for MCP clients, using your app's `client_id` and `client_secret`.
- A workspace admin must approve the MCP integration before anyone can authenticate.

So this plugin cannot use the client IDs that Slack puts in its own plugin files. Those belong to Slack's apps for Claude Code and Cursor. Your team creates its own Slack app and gives its client ID and secret to this plugin. Slack's documentation says the authorization endpoint for user tokens is `https://slack.com/oauth/v2_user/authorize` and the token endpoint is `https://slack.com/api/oauth.v2.user.access`. If the app has allowed IP address ranges, requests to the Slack MCP server are subject to the same restrictions.

Slack's documentation does not give the redirect URL that BoldCreate Connect uses. Add the callback URL shown on the plugin's settings page to the Slack app.

## What it can do

Slack's overview page describes these features. The endpoint requires sign-in before it lists tools, so this README has no tool table. Slack's skills name the tools `slack_send_message`, `slack_send_message_draft`, `slack_schedule_message`, `slack_search_public`, `slack_search_public_and_private`, `slack_search_channels`, `slack_search_users`, `slack_read_channel`, `slack_read_user_profile` and `slack_create_canvas`.

- **Search:** messages and files (filter by date, user and content type), users, public and private channels, and emoji. List the channels you are a member of.
- **Messages:** send, schedule and draft messages; read channels and threads; create a conversation; add and get reactions.
- **Canvases:** create, update and read (export as markdown).
- **Users:** fetch a user's profile, including custom fields and statuses, and list the members of a channel.
- **Files:** upload through `slack_get_file_upload_url` and `slack_complete_file_upload`. The file is not visible until the second step completes.
- **Lists:** create and read lists, and update list metadata, columns and records.

## Write access

Slack's documentation says the server can "send messages to any type of conversation", schedule messages, create channels, add reactions, create and update canvases, upload files and update lists. These act as the signed-in member. A message posted through the server is a real message in the workspace.

## Scopes

The plugin requests the 30 scopes in the server's OAuth metadata, checked on 2026-11-10. Slack's documentation lists which scopes each tool needs.

Read-type scopes (21):

- `canvases:read`
- `channels:history`
- `channels:read`
- `emoji:read`
- `files:read`
- `groups:history`
- `groups:read`
- `im:history`
- `im:read`
- `lists:read`
- `mpim:history`
- `mpim:read`
- `reactions:read`
- `search:read.files`
- `search:read.im`
- `search:read.mpim`
- `search:read.private`
- `search:read.public`
- `search:read.users`
- `users:read`
- `users:read.email`

Write-type scopes (9):

- `canvases:write`
- `channels:write`
- `chat:write`
- `files:write`
- `groups:write`
- `im:write`
- `lists:write`
- `mpim:write`
- `reactions:write`

A team that wants fewer permissions can request only the read-type scopes on its Slack app. Search and read features then work, and sending, scheduling, canvas and list edits, file uploads and channel creation do not.

## Rate limits

Slack's documentation says the Slack MCP server is subject to rate limits like all Slack Web API methods, enforced per tool or action type, and that the same limits apply through MCP or directly through the Web API.

| Action | Limit |
| --- | --- |
| Search messages and files | Special limits; see the `assistant.search.context` method page |
| Read files | Tier 4: 100+ per minute |
| Search emoji, users, channels | Tier 2: 20+ per minute |
| Send message | Special limits; see the `chat.postMessage` method page |
| Schedule message | Tier 3: 50+ per minute |
| Read a channel or thread | Tier 3: 50+ per minute |
| Create conversation or channel | Tier 2: 20+ per minute |
| Add or get reactions | Tier 3: 50+ per minute |
| Create a canvas | Tier 2: 20+ per minute |
| Update a canvas | Tier 3: 50+ per minute |
| Read a canvas | Tier 3: 50+ per minute, or Tier 4: 100+ per minute |
| Read a user profile; list channel members | Tier 4: 100+ per minute |
| List user channels | Tier 2: 20+ per minute |
| Upload a file | Tier 4: 100+ per minute |
| Create, read or update a list | Tier 2: 20+ per minute, or Tier 3: 50+ per minute |

## Security notes

- Slack's documentation says to be mindful about connecting other MCP servers at the same time, because different servers have their own security, stability and usage characteristics.
- Slack's documentation says workspace admins can approve and manage MCP client integrations, and that MCP activity can be audited in the audit logs.
- The client secret is stored encrypted, as described in the Setup section.

## Skills

The `skills/` folder holds the 9 agent skills published in [slackapi/slack-skills-plugin](https://github.com/slackapi/slack-skills-plugin/tree/99e027a47c065223ac719a1b291997d4fc23cec0/skills) at commit `99e027a47c065223ac719a1b291997d4fc23cec0`, copied unchanged. The source is licensed under MIT, copyright Slack Technologies, LLC. The original licence text is in `skills/LICENSE`.

- **Skills for the MCP tools:** `slack-messaging`, `slack-search`.
- **Skills for building Slack apps:** `block-kit`, `create-slack-app`, `deploy-slack-app`, `slack-api`, `slack-cli`, `slack-docs`, `test-slack-app`.

Some of these skills ask the agent to run commands. `create-slack-app`, `slack-cli` and `test-slack-app` use the Slack CLI, and they suggest `brew` and Node or Python installs. `deploy-slack-app` includes two shell scripts, `references/deploy-heroku.sh` and `references/deploy-railway.sh`, that pass `SLACK_BOT_TOKEN` and `SLACK_APP_TOKEN` to a hosting provider. Review these before you enable the skills.

Slack's repository also publishes five slash commands, such as `/slack:summarize-channel`. They are not included here.

## Docs

- Slack MCP server overview: https://docs.slack.dev/ai/slack-mcp-server
- Slack MCP and Skills Plugin: https://docs.slack.dev/ai/slack-skills-plugin
- Slack skills source: https://github.com/slackapi/slack-skills-plugin

## Logo

The Slack mark is the file that Slack's website uses for its navigation logo (`https://a.slack-edge.com/1f40066/marketing/img/nav/logo.svg`, from https://slack.com/intl/en-in/), placed unchanged on a padded white tile. The mark is a trademark of its owner. This is not from Simple Icons, which removed its Slack icon in version 16.0.0.

## License

MIT
