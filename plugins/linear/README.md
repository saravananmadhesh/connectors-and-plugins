# Linear

Find, create, and update Linear issues, projects, and cycles.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.linear.app/mcp` |
| Auth | API key or token, sent as a Bearer header |
| Test wave | A |
| Vendor docs | https://linear.app/docs/mcp |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `LINEAR_API_KEY` | Linear API key | Yes | Yes | Personal API key from Linear Settings > Security & access. Tool calls run as the key's owner. |

## Notes

A read-only endpoint is available at `https://mcp.linear.app/mcp/readonly`.
