# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Netlify remote MCP server over streamable HTTP.
- Endpoint `https://mcp.netlify.com/mcp` on Netlify's own domain, documented by Netlify (docs.netlify.com build-with-ai/netlify-mcp-server). An earlier anonymous probe returned HTTP 401 with OAuth metadata; a later re-check from the build environment was blocked at the TLS layer by Netlify's edge, so the endpoint was not re-probed live this session.
- OAuth sign-in: each member signs in to their own Netlify account in the browser. BoldCreate Connect supplies its own OAuth client.
