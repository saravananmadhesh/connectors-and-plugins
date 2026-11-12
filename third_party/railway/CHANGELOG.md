# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Railway remote MCP server over streamable HTTP.
- Endpoint `https://mcp.railway.com/`, confirmed by a live probe (HTTP 401 Bearer with oauth-protected-resource metadata, scope workspace:member).
- OAuth sign-in: each member signs in to their own Railway account in the browser. BoldCreate Connect supplies its own OAuth client.
