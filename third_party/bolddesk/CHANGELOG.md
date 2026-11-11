# Changelog

All notable changes to this plugin will be documented here.

## 0.7.1 - 2026-11-05

- First version: BoldDesk remote MCP server over streamable HTTP.
- Endpoint and tools taken from the BoldDesk MCP Server documentation. The endpoint is per account, so you enter your BoldDesk host when you install.
- The auth mode is OAuth 2.0 (dynamic client registration). An API key in the `x-api-key` header is also supported by BoldDesk.
