# Phase 2: after Phase 1 is tested and published

Phase 2 adds about 20 more HTTP plugins, then packs with no MCP server (skills, rules, agents) to exercise the rest of the plugin format. Everything here still works over streamable HTTP, so none of it waits on new transports.

## More HTTP plugins

Already built: 41 Google, GitLab and Gitea plugins (see the [README](../README.md#next-version-google-gitlab-and-gitea-41-plugins)). They replace the GitLab and BigQuery entries that used to be on this list.

| Group | Plugins | Why later |
| --- | --- | --- |
| Code and DevOps | Azure DevOps (`https://mcp.dev.azure.com/{org}`), Buildkite, Postman, Semgrep | Azure DevOps needs Microsoft Entra and a registered OAuth client |
| Team and project tools | Slack, Asana, Monday.com, Miro, Zoom | Slack limits which apps may use its MCP server; the rest are less developer-focused |
| Cloud and hosting | Cloudflare (docs, bindings, observability), Netlify, Render, Hugging Face | Cloudflare is several servers, so a good first multi-server plugin |
| Data and observability | Datadog, Prisma Postgres | Datadog endpoints are per region |
| Search and web | Exa, Firecrawl, Tavily | Paid API keys; overlap with agents' built-in search |
| Payments and support | PayPal, Square, Intercom | Less developer demand than Stripe |

Fallbacks: if Figma or Vercel refuse the BoldCreate gateway as an OAuth client, Slack or GitLab move up into Phase 1.

## Beyond MCP

- **Skill and rule packs** with no server: code review, commit-message and PR conventions, C# and .NET rules, secure-coding rules. These test skill, rule and hook delivery.
- **Syncfusion's own plugins**: the Syncfusion component coding assistants (Blazor, React, MAUI and others) run locally (stdio) today. Wrapping them as plugins with matching rules and skills is the strongest demo for Syncfusion customers, but needs stdio support or a hosted HTTP version.
- **Bundles**: for example "Starter for .NET teams" (GitHub, Microsoft Learn, Azure DevOps, Context7, C# rules), installed as Required or Default On for an org, like Cursor team marketplaces.
- **Token variants** of OAuth plugins where the vendor allows it, such as Atlassian with an API token.
