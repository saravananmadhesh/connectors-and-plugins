# Supabase

Query Postgres, manage tables, auth, storage, and edge functions in a Supabase project.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}&read_only=${SUPABASE_READ_ONLY}` |
| Auth | API key or token, sent as a Bearer header |
| Test wave | A |
| Vendor docs | https://supabase.com/docs/guides/getting-started/mcp |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `SUPABASE_ACCESS_TOKEN` | Supabase personal access token | Yes | Yes | Create one at https://supabase.com/dashboard/account/tokens. |
| `SUPABASE_PROJECT_REF` | Project ref | Yes | No | The project ID from your project URL. Limits the agent to this one project. |
| `SUPABASE_READ_ONLY` | Read-only mode | No | No | "true" runs queries as a read-only Postgres user and hides write tools. Set "false" to allow writes. |
