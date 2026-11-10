# GitLab

BoldCreate plugin that connects agents to GitLab through GitLab's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Access GitLab project information, retrieve issue and merge request data, and interact with GitLab APIs.

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

GitLab registers the OAuth client itself (dynamic client registration), so there is no client to create. We ship the OAuth flow.

## Authentication

GitLab's documentation says the server accepts these tokens:

- An OAuth access token with the `mcp` scope. MCP clients get it through the OAuth flow, with dynamic client registration or with a pre-registered OAuth application.
- A fine-grained personal access token with the MCP tool resource and the Execute permission.

These tokens cannot have the `mcp` scope, so the server rejects them with `403 Forbidden` and the `insufficient_scope` error, even with scopes such as `api`:

- Legacy personal access tokens
- Project access tokens
- Group access tokens

## Before you connect

The server is generally available from GitLab 19.5. It moved from GitLab Premium to GitLab Free in GitLab 19.2.

Access must be allowed before members can connect. On GitLab.com, allow it for the top-level group. On GitLab Self-Managed and GitLab Dedicated, allow it for the instance. If a member gets `403 Forbidden`, read the troubleshooting page linked under Docs.

This plugin connects to GitLab.com only.

## What it can do

GitLab's documentation lists 56 tools. The endpoint requires sign-in before it lists tools, so this section comes from [GitLab's tools page](https://docs.gitlab.com/user/model_context_protocol/mcp_server_tools/). Which tools you see depends on your GitLab plan and settings.

| Area | Example tools |
| --- | --- |
| Projects and groups | `get_project`, `list_projects`, `list_groups`, `list_project_members`, `get_user` |
| Merge requests | `list_merge_requests`, `get_merge_request`, `save_merge_request`, `save_merge_request_review`, `accept_merge_request` |
| Work items | `get_work_item`, `list_work_items`, `save_work_item`, `link_work_items`, `get_work_item_types` |
| Repository | `get_repository_file`, `list_repository_tree`, `list_branches`, `add_branch`, `add_commit`, `fork_repository`, `list_commits`, `get_commit`, `list_tags`, `list_releases` |
| Pipelines and jobs | `list_pipelines`, `get_pipeline`, `get_job`, `get_artifact_file`, `save_pipeline` |
| Search | `search`, `search_labels`, `list_wiki_pages`, `semantic_search` |
| Comments | `save_note` |
| GitLab Duo Agent Platform | `list_duo_agents_and_flows`, `start_duo_session`, `list_duo_sessions`, `get_duo_session`, `send_duo_session_input` |
| Security | `list_vulnerabilities`, `get_vulnerability`, `save_vulnerability`, `attach_scan_profile` |
| Server | `get_mcp_server_version` |

GitLab groups its tools into toolsets. By default the server returns `meta`, `core`, `merge_requests`, `work_items`, `repository` and `ci`, plus `duo_agent_platform` when GitLab Duo Agent Platform is available to you. The `wikis`, `code_security` and `orbit` toolsets are opt-in. GitLab selects toolsets with the `X-Gitlab-Enabled-Mcp-Server-Toolsets` header. This plugin does not set that header.

Some older tools are marked superseded in GitLab's documentation. They no longer appear in `tools/list` but remain callable.

## Write access

Many tools change GitLab data. According to GitLab's tool descriptions, they can:

- create or update merge requests and work items (`save_merge_request`, `save_work_item`)
- add commits and branches (`add_commit`, `add_branch`)
- merge a merge request or schedule it to merge (`accept_merge_request`)
- run, retry, cancel or rename a pipeline (`save_pipeline`)
- fork a project (`fork_repository`)
- add comments and review artifacts, and resolve discussion threads (`save_note`, `save_merge_request_review`)
- write to a vulnerability (`save_vulnerability`)
- start a GitLab Duo Agent Platform session (`start_duo_session`)

GitLab says listing a tool does not grant access: each tool still checks your project and namespace permissions when it is called.

## Rate limits

GitLab's documentation says requests to the MCP endpoint are limited for each user, by the plan of their namespace. These limits apply to GitLab.com:

| Plan | Limit |
| --- | --- |
| Free | 60 each minute |
| Premium | 600 each minute |
| Ultimate | 600 each minute |

The limit applies for each user, not for each client or token. When it is exceeded, GitLab returns `429 Too Many Requests` with `Retry-After`. The same page notes the MCP rate limits were introduced behind feature flags that are disabled by default.

GitLab also limits dynamic client registration by IP address to 10 registrations an hour. Users who share an egress IP address, such as a corporate network or VPN, can exceed this limit and fail to authenticate. GitLab suggests reusing a single pre-registered OAuth application in that case. This plugin has no setting for a pre-registered client ID.

## Security notes

- GitLab warns: "You're responsible for guarding against prompt injection when you use these tools. Exercise extreme caution or use MCP tools only on GitLab objects you trust."
- Every user authorizes with their own GitLab credentials and can access only the data they are permitted to.

## Docs

- GitLab MCP server: https://docs.gitlab.com/user/model_context_protocol/mcp_server/
- GitLab MCP server tools: https://docs.gitlab.com/user/model_context_protocol/mcp_server_tools/
- Troubleshooting the GitLab MCP server: https://docs.gitlab.com/user/model_context_protocol/mcp_server_troubleshooting/
- Server URL (GitLab.com): https://gitlab.com/api/v4/mcp

## Logo

GitLab mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #FC6D26, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
