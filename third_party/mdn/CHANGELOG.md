# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-05

- First version: MDN remote MCP server over streamable HTTP.
- Endpoint `https://mcp.mdn.mozilla.net/`, confirmed by a live initialize call (HTTP 200, serverInfo name mdn; tools search, get-doc, get-compat).
- Auth is none: the server returned its tool set to an anonymous request. No account needed.
