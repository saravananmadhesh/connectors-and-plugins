# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Datadog remote MCP server over streamable HTTP.
- Endpoint and header format taken from the vendor's docs (Datadog MCP server).
- Header auth with `DD_API_KEY` and `DD_APPLICATION_KEY`. Targets the US1 endpoint (`https://mcp.datadoghq.com/v1/mcp`).
- Only the MCP server is included. No vendor code is bundled.
