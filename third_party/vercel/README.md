# Vercel

BoldCreate plugin that connects agents to Vercel through its hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search Vercel documentation, manage projects, inspect deployments, and query Web Analytics.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Vercel**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Vercel**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install vercel@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "vercel": {
      "type": "http",
      "url": "https://mcp.vercel.com"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Client access

Vercel's documentation says Vercel MCP supports clients that use a Client ID Metadata Document (CIMD), or that Vercel has reviewed and approved. The OAuth metadata for the server lists a registration endpoint and says CIMD is supported. Vercel's documentation does not say whether BoldCreate Connect is on its approved list.

Vercel's documentation says Vercel MCP is available on all plans, and that use is subject to Vercel's AI Product Terms.

## Authentication

Auth is OAuth. Vercel's documentation says the server implements the latest MCP Authorization and Streamable HTTP specifications. Adding the server to a client does not complete authorization: each member signs in with the Vercel account to use, authorizes the client, and grants access to the teams it should work with. The OAuth metadata lists the scope `openid`, and PKCE with S256.

## What it can do

Vercel's tools reference lists 251 tools in 27 categories. The endpoint requires sign-in before it lists tools, so this section comes from [Vercel's tools reference](https://vercel.com/docs/agent-resources/vercel-mcp/tools). Vercel says the tool list on your connection shows what you can call, and that server configuration, client support, your OAuth grant and team permissions affect access.

| Category | Tools listed |
| --- | --- |
| Access Groups | 5 |
| Agent Runs | 4 |
| Billing and Purchases | 5 |
| Caching | 6 |
| Checks | 1 |
| Deployments | 17 |
| Documentation, CLI, and Feedback | 3 |
| Domains and DNS | 28 |
| Drains | 5 |
| Environment Variables | 7 |
| Feature Flags | 19 |
| Firewall and Security | 6 |
| Global Config | 13 |
| Integrations | 6 |
| Key Management | 9 |
| Microfrontends | 2 |
| Networking | 7 |
| Observability | 7 |
| Projects | 17 |
| Rolling Releases | 10 |
| Routing | 17 |
| Sandboxes | 23 |
| Storage | 2 |
| Teams and Users | 6 |
| Toolbar | 6 |
| Vercel CI | 15 |
| Web Analytics | 5 |

Vercel's documentation names these frequently used tools: `list_deployments`, `get_deployment`, `web_fetch_vercel_url`, `get_runtime_logs`, `list_projects`, `list_teams`, `get_project` and `get_runtime_errors`.

## Write access

Vercel's README says the MCP server supports reads and writes, including inspecting projects and logs, creating deployments and updating resources. The tools reference includes tools that change your account, for example `create_deployment`, `deploy_to_vercel`, `cancel_deployment`, `create_project`, `put_firewall_config`, `create_project_env` and `buy_domain`.

Vercel's documentation says a listed tool still requires the relevant OAuth grant and Vercel permissions. It also says that after an uncertain write you should inspect the resource before retrying.

## Purchases

Vercel's documentation says domain registration requires a quote and explicit approval. `get_purchase_quote` is read-only, returns a signed quote token valid for five minutes, and does not register, reserve or charge. The confirm step of `buy_domain` must echo the quoted price as `expectedPrice`, and the order is rejected if the live price no longer matches. MCP does not purchase credits, subscriptions or add-ons.

## Not available through MCP

Vercel's tools reference says the MCP catalog does not create AI Gateway API keys, exchange SSO tokens, import KMS private keys, or sign KMS messages or tokens. It says to use the dashboard or CLI for those actions, and that MCP and the CLI use separate authentication.

## Rate limits

Vercel's MCP pages that I read list no rate limits for the server.

## Security notes

Vercel's documentation gives these best practices:

- Confirm you are connecting to the official endpoint, `https://mcp.vercel.com`.
- Connecting to Vercel MCP grants the AI system you use the same access as your Vercel user account.
- Use clients from trusted sources, and double-check the domain name when you use a one-click installation.
- Bad actors could insert malicious instructions into untrusted tools or agents in your workflow. Review the permissions and data access of each agent and MCP tool.
- Always enable human confirmation in your workflows, so you can review and approve each step.
- Vercel MCP protects against confused deputy attacks by requiring explicit user consent for each client connection.

## Skills and agents

The `skills/` and `agents/` folders hold files from [vercel/vercel-plugin](https://github.com/vercel/vercel-plugin/tree/39e5102c79293b91a02d84543c197940fa383852) at commit `39e5102c79293b91a02d84543c197940fa383852`, copied unchanged. The source is licensed under Apache-2.0, copyright Vercel, Inc. The original licence text is in `skills/LICENSE`.

**35 skills written for the plugin:** `access-protected-vercel-deployment`, `ai-gateway`, `auth`, `bootstrap`, `build-agents`, `cdn-caching`, `create-a-backend`, `custom-metrics`, `daemons`, `deployments-cicd`, `domains`, `env-vars`, `knowledge-update`, `marketplace`, `microfrontends`, `offload-to-sandbox`, `queues`, `routing-middleware`, `runtime-cache`, `vercel-agent`, `vercel-connect`, `vercel-firewall`, `vercel-functions`, `vercel-schedules`, `vercel-services`, `vercel-storage`, `vercel-tracing`, `verification`.

**7 skills that Vercel syncs from other repositories:** `chat-sdk`, `eve`, `flags-sdk`, `vercel-cli`, `vercel-flags`, `vercel-sandbox`, `workflow`. Each keeps its `overlay.yaml` and `upstream/` folder as Vercel publishes them. Their upstream repositories are `vercel/chat` (MIT), `vercel/flags` (MIT), `vercel/eve` (Apache-2.0), `vercel/vercel` (Apache-2.0), `vercel/workflow` (Apache-2.0) and `vercel-labs/agent-browser` (Apache-2.0), according to the repository licence on GitHub.

**3 agents:** `ai-architect`, `deployment-expert` and `performance-optimizer`.

**Not included:**

- Three skills that Vercel also publishes: `ai-sdk`, `react-best-practices` and `is-agentic`. Their upstream repositories show no clear licence on GitHub, or are private, so they are not copied here.
- The four commands (`bootstrap`, `deploy`, `env`, `status`), which this repository has no place for.
- The hooks. Vercel's README says the hooks send telemetry that is on by default and is disabled with `VERCEL_PLUGIN_TELEMETRY=off`.
- The `.tmpl` build templates for agents and commands.

Vercel's README says the skills are available for direct use, and that its hooks can inject them automatically. This plugin ships no hooks, so the skills load on demand. Each skill's frontmatter carries path and import patterns that only Vercel's hooks use. The skills were written for Vercel's own plugin, so some of them refer to Vercel CLI commands and to files in the user's project.

## Docs

- Vercel MCP server: https://vercel.com/docs/agent-resources/vercel-mcp
- Vercel MCP tools reference: https://vercel.com/docs/agent-resources/vercel-mcp/tools
- Vercel plugin source: https://github.com/vercel/vercel-plugin

## Logo

Vercel mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #000000, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
