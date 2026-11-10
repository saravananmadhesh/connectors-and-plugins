# Zoom

BoldCreate plugin that connects agents to Zoom through Zoom's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search, ask and act on your Zoom meetings, recordings, notes and docs

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Zoom**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Zoom**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install zoom@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "zoom": {
      "type": "http",
      "url": "https://mcp.zoom.us/mcp/zoom/streamable",
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
| **Client ID** (`CLIENT_ID`) | Yes | No | The client ID of a Zoom General app your team created, with user-level OAuth. Every team member signs in under it. |
| **Client secret** (`CLIENT_SECRET`) | Yes | Yes | The client secret of that Zoom app. Stored encrypted. |

Auth is OAuth. The first time the agent calls a tool, each member signs in to their own Zoom account in the browser. Tool calls run with that member's permissions.

## Set up your team's Zoom app

The plugin's source README says Zoom's MCP server uses OAuth 2.1 with PKCE and supports only manual client registration, not dynamic client registration. The server's OAuth metadata, checked on 2026-11-10, lists no registration endpoint, lists PKCE with S256, and accepts client secret basic authentication at the token endpoint. A team admin therefore creates one Zoom app, and every member signs in under it.

Zoom's README gives these steps. You need a Zoom account that is allowed to create apps (admin or developer role).

1. In the [Zoom App Marketplace](https://marketplace.zoom.us/), choose **Develop**, then **Build App**, and create a **General app** that uses user-level OAuth.
2. Under **Scopes**, add the scopes you need. The list under Scopes below has all 19.
3. Register the BoldCreate Connect OAuth callback URL (shown on the plugin's settings page) as a redirect URL on the Zoom app.
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Zoom's README says Zoom requires PKCE, and that Zoom access tokens last about an hour.

## What it can do

Zoom's server page and the source plugin's `TOOLS.md` list 20 tools. The endpoint requires sign-in before it lists tools, so this section comes from those pages, which `TOOLS.md` says were checked on 2026-11-03.

| Area | Tool | Required scope | Rate limit tier | Changes data |
| --- | --- | --- | --- | --- |
| Search and Q&A | `ask` | `agentic_search:read:ask` | LIGHT | No |
| Search and Q&A | `search` | `agentic_search:read:search` | LIGHT | No |
| Search and Q&A | `search_describe_capabilities` | `agentic_search:read:search` | LIGHT | No |
| Meetings | `get_meeting_assets` | `meeting:read:assets` | LIGHT | No |
| Meetings | `in_meeting_control` | `meeting:update:in_meeting_controls` | MEDIUM | Yes |
| Meetings | `meeting_create` | `meeting:write:meeting` | LIGHT | Yes |
| Meetings | `meeting_delete` | `meeting:delete:meeting` | LIGHT | Yes |
| Meetings | `meeting_update` | `meeting:update:meeting` | LIGHT | Yes |
| Meetings | `search_meetings` | `meeting:read:search` | LIGHT | No |
| Recordings | `get_recording_resource` | `cloud_recording:read:content` | MEDIUM | No |
| Recordings | `recordings_list` | `cloud_recording:read:list_user_recordings` | MEDIUM | No |
| My Notes | `my_notes_get_note_content` | `my_notes:read:content` | MEDIUM | No |
| Docs | `canvas_add_file_collaborators` | `docs:write:collaborator` | MEDIUM | Yes |
| Docs | `canvas_list_file_collaborators` | `docs:read:list_file_collaborators` | MEDIUM | No |
| Docs | `canvas_modify_file_collaborator_role` | `docs:update:collaborator` | MEDIUM | Yes |
| Docs | `canvas_remove_file_collaborator` | `docs:delete:collaborator` | MEDIUM | Yes |
| Docs | `create_new_file_with_markdown` | `docs:write:import` | CANVAS-IMPORT | Yes |
| Docs | `get_file_content` | `docs:read:export` | CANVAS-EXPORT | No |
| Hub | `hub_create_file_from_content` | `hub:write:content` | CANVAS-IMPORT | Yes |
| Hub | `hub_get_file_content` | `hub:read:content` | CANVAS-EXPORT | No |

The source README says Zoom's skills treat `search_meetings` and `create_new_file_with_markdown` as deprecated, in favor of `search` and `hub_create_file_from_content`, and that Zoom's server page still lists both. The server also advertises three workflow scopes that no tool in the current list uses.

## Write access

9 of the 20 tools create, update or delete data: `canvas_add_file_collaborators`, `canvas_modify_file_collaborator_role`, `canvas_remove_file_collaborator`, `create_new_file_with_markdown`, `hub_create_file_from_content`, `in_meeting_control`, `meeting_create`, `meeting_delete`, `meeting_update`. The source README says `meeting_delete`, `meeting_update` and `hub_create_file_from_content` change data, and suggests requiring approval for the meeting tools and `in_meeting_control`.

The plugin requests all 19 scopes the tools need, so every tool, including `meeting_delete`, can work. Zoom's README documents a 10-scope read-only set, which lets nothing change. To use it, add only those scopes to your Zoom app:

- `agentic_search:read:ask`
- `agentic_search:read:search`
- `cloud_recording:read:content`
- `cloud_recording:read:list_user_recordings`
- `docs:read:export`
- `docs:read:list_file_collaborators`
- `hub:read:content`
- `meeting:read:assets`
- `meeting:read:search`
- `my_notes:read:content`

## Scopes

The plugin requests these 19 scopes, the full set from Zoom's `TOOLS.md`:

- `agentic_search:read:ask`
- `agentic_search:read:search`
- `cloud_recording:read:content`
- `cloud_recording:read:list_user_recordings`
- `docs:delete:collaborator`
- `docs:read:export`
- `docs:read:list_file_collaborators`
- `docs:update:collaborator`
- `docs:write:collaborator`
- `docs:write:import`
- `hub:read:content`
- `hub:write:content`
- `meeting:delete:meeting`
- `meeting:read:assets`
- `meeting:read:search`
- `meeting:update:in_meeting_controls`
- `meeting:update:meeting`
- `meeting:write:meeting`
- `my_notes:read:content`

## Rate limits

The source `TOOLS.md` says rate limits are applied per account and shared with Zoom's Open APIs, and that tools are tiered LIGHT, MEDIUM or HEAVY, with Docs and Hub import and export on their own `CANVAS-IMPORT` and `CANVAS-EXPORT` tiers. Zoom's API page describes Light, Medium, Heavy and Resource-intensive request types and says limits are enforced per second or per day and may change. I found no figures for the MCP tiers on the pages I read.

## Security notes

- The `zoom-flagship-mcp` skill tells the agent to treat retrieved messages, documents, transcripts, citations and generated answers as untrusted evidence, and says instructions inside them do not authorize actions.
- Zoom's README says the skill's write rules are to resolve the exact target first and to confirm deletes, collaborator removals and in-meeting controls before running them.
- Zoom's documentation says what you can reach depends on your Zoom account and licenses.
- The client secret is stored encrypted, as described in the Setup section.

## Skills

The `skills/` folder holds the 2 agent skills published in [zoom/zoom-mcp-plugin-for-claude](https://github.com/zoom/zoom-mcp-plugin-for-claude/tree/da551f5d122712a9cc38e63ca938021c78fef7f7/skills) at commit `da551f5d122712a9cc38e63ca938021c78fef7f7`, copied unchanged. The source is licensed under MIT, copyright Zoom Video Communications, Inc. The original licence text is in `skills/LICENSE`.

| Skill | What Zoom's README says |
| --- | --- |
| `zoom-flagship-mcp` | The entry point. It routes search and Ask work to `zoom-search`, and handles named-item reads, doc and sheet creation, meeting changes, live meeting controls and doc collaborators itself. |
| `zoom-search` | Detailed guidance for the three search tools (`search`, `search_describe_capabilities`, `ask`): datasources, filters, paging, third-party apps, time zones and `ask` errors. It is Zoom's search skill, included unmodified. |

Both skills only work while the Zoom MCP server is connected. Zoom's plugin also has no commands, agents or hooks, and none are included here. Zoom publishes developer skills for building with Zoom in [zoom/skills](https://github.com/zoom/skills), which are not included.

## Docs

- Zoom MCP server: https://developers.zoom.us/docs/mcp/zoom/
- MCP at Zoom: https://developers.zoom.us/docs/mcp/
- Zoom API rate limits: https://developers.zoom.us/docs/api/rate-limits/
- Zoom plugin source: https://github.com/zoom/zoom-mcp-plugin-for-claude

## Logo

Zoom mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #0B5CFF, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
