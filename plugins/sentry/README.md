# Sentry

Investigate Sentry errors, stack traces, and issues for a project.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.sentry.dev/mcp/${SENTRY_ORG}/${SENTRY_PROJECT}` |
| Auth | OAuth (each member signs in with their own account) |
| Test wave | B |
| Vendor docs | https://mcp.sentry.dev/ |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `SENTRY_ORG` | Organization slug | Yes | No | Your Sentry organization slug. Scopes the server to this organization. |
| `SENTRY_PROJECT` | Project slug | Yes | No | Your Sentry project slug. Scopes the server to this project. |
