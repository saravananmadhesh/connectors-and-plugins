# PostHog

Query product analytics, manage feature flags, and investigate errors in PostHog.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.posthog.com/mcp` |
| Auth | API key or token, sent as a Bearer header |
| Test wave | A |
| Vendor docs | https://posthog.com/docs/model-context-protocol |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `POSTHOG_API_KEY` | PostHog personal API key | Yes | Yes | Create one in PostHog under Settings > Personal API keys, using the MCP Server preset. |
