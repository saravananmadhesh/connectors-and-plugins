# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Pipedrive remote MCP server over streamable HTTP.
- Endpoint `https://mcp.pipedrive.ai/mcp`, confirmed by a live probe (HTTP 401 Bearer challenge with OAuth metadata pointing to https://oauth.pipedrive.com).
- OAuth sign-in: each member signs in to their own Pipedrive account in the browser. BoldCreate Connect supplies its own OAuth client.
