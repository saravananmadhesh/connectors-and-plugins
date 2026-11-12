# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Render remote MCP server over streamable HTTP.
- Endpoint `https://mcp.render.com/mcp`, confirmed by a live probe (HTTP 401 Bearer with oauth-protected-resource metadata; x-render-origin-server: Render). Also listed in the vendor's plugin repository (render-oss/render-plugin-claude-code).
- The vendor's `oauth.clientId` (`claude`) is not copied.
- OAuth sign-in: each member signs in to their own Render account in the browser. BoldCreate Connect supplies its own OAuth client.
