# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: ClickHouse Cloud remote MCP server over streamable HTTP.
- Endpoint `https://mcp.clickhouse.cloud/mcp`, confirmed by a live probe (HTTP 401 Bearer; oauth-protected-resource metadata lists authorization_servers https://mcp.clickhouse.cloud, scopes mcp:access).
- OAuth sign-in: each member signs in to their own ClickHouse Cloud account in the browser. BoldCreate Connect supplies its own OAuth client.
