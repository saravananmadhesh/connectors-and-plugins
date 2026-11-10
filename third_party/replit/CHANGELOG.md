# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Replit remote MCP server over streamable HTTP.
- Endpoint `https://replit-mcp.com/anthropic/mcp`, confirmed by a live probe (HTTP 401 Bearer with oauth-protected-resource metadata, resource_name "Replit MCP Server"). The oauth-protected-resource and authorization-server metadata delegate sign-in to Replit's own identity provider (https://replit.com/oidc).
- OAuth sign-in: each member signs in to their own Replit account in the browser. BoldCreate Connect supplies its own OAuth client.
