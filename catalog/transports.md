# Transport catalogue

The MCP spec defines two transports: **stdio** and **streamable HTTP**. **HTTP + SSE** is the older remote transport, deprecated in the 2025-03-26 spec. **WebSocket** was never part of the spec. BoldCreate Connect supports streamable HTTP only, so stdio is the next transport worth building.

| Transport | Spec status | Works in BoldCreate now | What BoldCreate would need | Priority |
| --- | --- | --- | --- | --- |
| Streamable HTTP | Current standard for remote servers | Yes | Nothing | Phase 1 |
| stdio | Current standard for local servers | No | Either deliver the config so it runs on the developer's machine (no gateway, weaker governance), or host the server in a sandboxed runner behind the gateway | Next |
| HTTP + SSE | Deprecated, still offered by some vendors | No | An SSE client adapter in the gateway (same HTTP stack, small) | Later, only for SSE-only servers |
| WebSocket | Not in the spec | No | A custom adapter | Only on demand |

## Streamable HTTP (works now)

- The 15 Phase 1 plugins in [`third_party/`](../third_party).
- The [Phase 2 list](../docs/phase-2.md).
- Almost all of Cursor's catalogue: 96 of its 98 MCP servers are HTTP, leaning to business apps (HubSpot, Gmail, Zoom, QuickBooks, Salesforce), a ready list if BoldCreate later serves non-developer teams.

## stdio (largest group, next target)

| Area | Popular servers |
| --- | --- |
| Browser and testing | Playwright, Chrome DevTools, Puppeteer (archived) |
| Local files and git | Filesystem, Git, Desktop Commander, Serena |
| Reference servers | Memory, Sequential Thinking, Fetch, Time |
| Databases | Postgres, SQLite, MySQL, MongoDB, Redis |
| Cloud and infra | Azure MCP Server, Azure DevOps (local), AWS Labs servers (API, CDK, cost), Kubernetes, Terraform, Docker MCP Toolkit |
| .NET and Microsoft | NuGet MCP server, GitHub MCP server (local build) |
| Search | Brave Search |
| Syncfusion | Syncfusion component coding assistants (Blazor, React, Angular, MAUI and others) |
| Business apps | Xero |

Shortcut: some of these (MongoDB, Terraform, Playwright) also have an HTTP mode. Hosted that way, they would work through today's gateway.

## HTTP + SSE (legacy)

Most big vendors now serve streamable HTTP and keep `/sse` only as a fallback: Atlassian (`/v1/sse`), Linear (`/sse`), Neon (`/sse`), Asana (v1), Cloudflare. Plugins here always point at the `/mcp` endpoint. SSE-only servers are mostly older self-hosted or community servers; bridges such as mcp-proxy or supergateway can expose them over HTTP.

## WebSocket (niche)

No major vendor ships a WebSocket MCP endpoint. The TypeScript SDK has a WebSocket client transport, and some editor add-ons (Unity, Blender) use sockets internally between the editor and a local MCP process, which still talks stdio to the agent. No work planned until a customer asks.
