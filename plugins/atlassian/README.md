# Atlassian (Jira + Confluence)

Search and update Jira issues and Confluence pages.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.atlassian.com/v1/mcp` |
| Auth | OAuth (each member signs in with their own account) |
| Test wave | B |
| Vendor docs | https://github.com/atlassian/atlassian-mcp-server |

## Install-time variables

None.

## Notes

Uses OAuth by default. Sites whose admin enables API token access can use Basic auth (email + API token) instead; a token variant is a Phase 2 option.
