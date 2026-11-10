# Linear

BoldCreate plugin that connects agents to Linear through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Find, create, and update Linear objects such as issues, projects, and comments.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Linear**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Linear**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install linear@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "linear": {
      "type": "http",
      "url": "https://mcp.linear.app/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Authentication

Linear's documentation says the interactive setup flow uses OAuth 2.1 with dynamic client registration. This plugin ships that flow.

Linear also supports passing an OAuth token or a Linear API key directly in the `Authorization: Bearer <yourtoken>` header instead of the interactive flow. Linear says you can use this to:

- interact with the server as an `app` user
- provide read-only access through a restricted API key
- integrate with an existing Linear OAuth application without an extra authentication hop

## Read and write access

Linear says read-write access is provided through `https://mcp.linear.app/mcp` by default. Its tools find, create and update objects in Linear, such as issues, projects and comments, so the agent can change your workspace.

Linear describes two ways to get read-only access:

- Connect to `https://mcp.linear.app/mcp/readonly`, which only ever exposes read tools.
- Use the standard `/mcp` endpoint, but request only the `read` OAuth scope. Clients that request `read` are granted read-only access, and the token cannot reach write APIs.

This plugin connects to `/mcp`. Linear also describes an alternative read-only approach with your own key: create a Linear API key with only the `Read` permission enabled.

## What it can do

Linear's MCP page says the server has tools for finding, creating and updating objects in Linear like issues, projects and comments, and for working with documents. The page does not list the tools, and the endpoint requires sign-in before it lists them, so this README has no tool table. The page gives example prompts for roadmap planning, standup notes, bug investigation, cycle summaries, timelines and implementation plans.

## Admin options

Linear's documentation describes two admin setups. Neither is needed for the default sign-in.

- **Enterprise-managed authorization:** for Okta, configure SAML for Linear, then enable **MCP enterprise managed authentication** in the Okta identity provider settings in Linear. Supported external MCP clients such as Claude can then authenticate users with your Okta access policies.
- **Claude auto-connect (beta):** members with matching Linear accounts on Business or Enterprise plans connect without a separate sign-in or consent screen. It needs a Claude Team or Enterprise plan and admin access in both Claude and Linear.

## Rate limits

Linear's MCP page lists no rate limits for the server.

## Troubleshooting

- **Internal server error when connecting:** Linear says to clear saved auth info with `rm -rf ~/.mcp-auth` and try again. You may also need a newer version of Node.
- **More than one Linear workspace:** each workspace needs its own separate authentication context. Reconnecting alone does not switch the workspace.
- **SSE endpoint:** `https://mcp.linear.app/sse` is a deprecated fallback for clients that do not support Streamable HTTP. Linear says to use `https://mcp.linear.app/mcp` for new setups.

## Docs

- Linear MCP server: https://linear.app/docs/mcp
- Linear MCP server (markdown): https://linear.app/docs/mcp.md

## Logo

Linear mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #5E6AD2, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
