# BoldCreate-Plugins

A plugin marketplace for **BoldCreate Connect**. Each plugin packages a remote MCP server so a team can install it once and every member's agent gets it, with secrets entered at install time.

The same folders install in **Cursor** (`.cursor-plugin/`), **Claude Code** (`.claude-plugin/`) and **BoldCreate Connect** (`.boldcreate-plugin/`). Each of the three has a marketplace index at the repo root and a manifest in every plugin folder.

| Client | Marketplace index | Per-plugin manifest |
| --- | --- | --- |
| BoldCreate Connect | `.boldcreate-plugin/marketplace.json` | `plugins/<name>/.boldcreate-plugin/plugin.json` |
| Cursor | `.cursor-plugin/marketplace.json` | `plugins/<name>/.cursor-plugin/plugin.json` |
| Claude Code | `.claude-plugin/marketplace.json` | `plugins/<name>/.claude-plugin/plugin.json` |

The BoldCreate manifest is self-contained: metadata, each MCP component with its transport and auth type, typed install-time variables with a `secret` flag, rollout phase and wave, and `supportedByGateway`. The BoldCreate marketplace index carries enough per plugin (transports, auth, whether secrets are needed, rollout) for ingestion and the marketplace UI to filter without opening each manifest.

## Phase 1: 15 streamable HTTP plugins

BoldCreate Connect supports only streamable HTTP today, so every Phase 1 plugin is a vendor-hosted HTTP server. Test in two waves: **A** needs a token or no auth; **B** needs each member to sign in with OAuth.

| Plugin | What it does | Auth | Install-time variables | Wave |
| --- | --- | --- | --- | --- |
| [AWS Knowledge](plugins/aws-knowledge/README.md) | Search AWS documentation, API references, and regional availability. | None | none | A |
| [Context7](plugins/context7/README.md) | Pull up-to-date, version-specific library docs and code examples into the prompt. | Token (Bearer) | `CONTEXT7_API_KEY` | A |
| [DeepWiki](plugins/deepwiki/README.md) | Ask questions about any public GitHub repository and read its generated wiki. | None | none | A |
| [GitHub](plugins/github/README.md) | Manage repos, issues, pull requests, and Actions. | Token (Bearer) | `GITHUB_PERSONAL_ACCESS_TOKEN` | A |
| [Linear](plugins/linear/README.md) | Find, create, and update Linear issues, projects, and cycles. | Token (Bearer) | `LINEAR_API_KEY` | A |
| [Microsoft Learn](plugins/microsoft-learn/README.md) | Search official Microsoft docs and code samples for .NET, Azure, MAUI, and more. | None | none | A |
| [Neon](plugins/neon/README.md) | Manage Neon serverless Postgres projects, branches, queries, and migrations. | Token (Bearer) | `NEON_API_KEY`, `NEON_READ_ONLY` | A |
| [PostHog](plugins/posthog/README.md) | Query product analytics, manage feature flags, and investigate errors in PostHog. | Token (Bearer) | `POSTHOG_API_KEY` | A |
| [Stripe](plugins/stripe/README.md) | Work with Stripe customers, payments, subscriptions, and search Stripe docs. | Token (Bearer) | `STRIPE_AGENT_KEY` | A |
| [Supabase](plugins/supabase/README.md) | Query Postgres, manage tables, auth, storage, and edge functions in a Supabase project. | Token (Bearer) | `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, `SUPABASE_READ_ONLY` | A |
| [Atlassian (Jira + Confluence)](plugins/atlassian/README.md) | Search and update Jira issues and Confluence pages. | OAuth | none | B |
| [Figma](plugins/figma/README.md) | Turn Figma frames into code and read design tokens, components, and variables. | OAuth | none | B |
| [Notion](plugins/notion/README.md) | Search, read, and update Notion pages and databases. | OAuth | none | B |
| [Sentry](plugins/sentry/README.md) | Investigate Sentry errors, stack traces, and issues for a project. | OAuth | `SENTRY_ORG`, `SENTRY_PROJECT` | B |
| [Vercel](plugins/vercel/README.md) | Inspect Vercel projects, deployments, and build logs, and search Vercel docs. | OAuth | none | B |

## First-party Syncfusion plugins

These bundle skills and rules as well as an MCP server. Syncfusion's MCP servers run locally over **stdio**, so BoldCreate Connect can list them but not route them through the gateway until stdio support lands.

| Plugin | What it does | Components | Transport | Install-time variables |
| --- | --- | --- | --- | --- |
| [Syncfusion Document SDK](plugins/syncfusion-document-sdk/README.md) | Generate and run code that creates, edits, converts, and extracts data from PDF, Word, Excel, and PowerPoint files. | MCP server, 16 skills, 1 rule | stdio | `SYNCFUSION_API_KEY` |

Next: [Phase 2 list](docs/phase-2.md) · [Transport catalogue](catalog/transports.md) · [Keeping plugins updated (proposal)](docs/maintenance-proposal.md)

## Layout

```
.boldcreate-plugin/marketplace.json  generated: plugin index for BoldCreate Connect
.cursor-plugin/marketplace.json      generated: plugin index for Cursor
.claude-plugin/marketplace.json      generated: plugin index for Claude Code
plugins/<name>/
  .cursor-plugin/plugin.json         source: metadata + install-time variables
  mcp.json                           source: endpoint, headers with ${VARIABLES}
  boldcreate.json                    source: transport, auth, phase, wave, docs link, upstream sources
  skills/<skill>/SKILL.md  rules/*.mdc  optional: other components, listed in the BoldCreate manifest
  .boldcreate-plugin/plugin.json     generated from the three source files
  .claude-plugin/plugin.json         generated from the three source files
  README.md  CHANGELOG.md
schemas/                             JSON schemas used by the validator
scripts/build.mjs                    regenerates the generated files
scripts/validate.mjs                 checks every plugin (runs in CI on each PR)
```

## How secrets work

Secrets are never committed. `mcp.json` references them as `${VARIABLE}`, and `plugin.json` declares each one under `variables` (JSON Schema). Values marked `"x-sensitive": true` are secrets.

- **Cursor** asks for `variables` at install and fills `${VARIABLE}`.
- **Claude Code** gets the same list as `userConfig` (secrets with `"sensitive": true`, stored in the OS keychain) and fills `${user_config.VARIABLE}`. `scripts/build.mjs` does this conversion.
- **BoldCreate Connect** reads them from `.boldcreate-plugin/plugin.json` (`variables`, each with `required` and `secret`), asks at install, seals the secrets, and injects them into `${VARIABLE}` at the gateway.

## Adding or changing a plugin

1. Create or edit the source files: `plugins/<name>/.cursor-plugin/plugin.json`, `mcp.json`, `boldcreate.json`, `README.md`. Never edit generated files by hand.
2. Bump `version` and add a `CHANGELOG.md` entry.
3. Run `npm install` once, then `npm run build` and `npm run validate`.
4. Optional: `claude plugin validate plugins/<name>` for Anthropic's own check.
5. Open a pull request.

## Try it locally

- **Claude Code:** `/plugin marketplace add saravananmadhesh/BoldCreate-Plugins`, then `/plugin install github@boldcreate-plugins`.
- **Cursor:** add this repo as a team marketplace in Cursor's dashboard.

## Status

Endpoints were taken from vendor docs on 2026-10-24. Only AWS Knowledge has had a live check so far. Each endpoint needs a live test with real credentials before publishing (see Wave A / B above).
