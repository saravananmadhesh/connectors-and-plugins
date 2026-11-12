# Changelog

All notable changes to this plugin will be documented here.

## 0.1.0 - 2026-11-04

- First version: Twilio documentation MCP server over streamable HTTP and 57 official Twilio/SendGrid skills from `twilio/ai`.
- Endpoint `https://mcp.twilio.com/docs`, confirmed by a live initialize call (HTTP 200, serverInfo name twilio-docs-mcp v0.1.0).
- Auth is none: the server answered an anonymous initialize without asking for sign-in. Search and retrieve Twilio documentation; no account needed.
- Twilio lists the MCP and skills as Public Beta. Source snapshot: commit `803790a281f0ef11d2928ffb41bc8422237fb434`.
- Added minimal marketplace compatibility metadata where required so the upstream skills load correctly; kept the vendor license in place.
