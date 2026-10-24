# Neon

Manage Neon serverless Postgres projects, branches, queries, and migrations.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.neon.tech/mcp?readonly=${NEON_READ_ONLY}` |
| Auth | API key or token, sent as a Bearer header |
| Test wave | A |
| Vendor docs | https://github.com/neondatabase-labs/mcp-server-neon |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `NEON_API_KEY` | Neon API key | Yes | Yes | Create one in the Neon Console. Use an organization key to limit access to that organization. |
| `NEON_READ_ONLY` | Read-only mode | No | No | "true" disables write tools. Set "false" to allow writes. |
