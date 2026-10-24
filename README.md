# BoldCreate-Plugins

A plugin marketplace for **BoldCreate Connect**. Each plugin packages a remote MCP server so a team can install it once and every member's agent gets it, with secrets entered at install time.

The same folders install in **Cursor** (`.cursor-plugin/`) and **Claude Code** (`.claude-plugin/`), and BoldCreate Connect reads both, plus a small `boldcreate.json` for the things neither format has a field for (transport, auth, rollout phase).

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

Next: [Phase 2 list](docs/phase-2.md) · [Transport catalogue](catalog/transports.md) · [Keeping plugins updated (proposal)](docs/maintenance-proposal.md)

## Layout

```
.cursor-plugin/marketplace.json      generated: plugin index for Cursor
.claude-plugin/marketplace.json      generated: plugin index for Claude Code
plugins/<name>/
  .cursor-plugin/plugin.json         source of truth: metadata + install-time variables
  mcp.json                           source of truth: endpoint, headers with ${VARIABLES}
  .claude-plugin/plugin.json         generated from the two files above
  boldcreate.json                    transport, auth, phase, wave, docs link
  README.md  CHANGELOG.md
schemas/                             JSON schemas used by the validator
scripts/build.mjs                    regenerates the generated files
scripts/validate.mjs                 checks every plugin (runs in CI on each PR)
```

## How secrets work

Secrets are never committed. `mcp.json` references them as `${VARIABLE}`, and `plugin.json` declares each one under `variables` (JSON Schema). Values marked `"x-sensitive": true` are secrets.

- **Cursor** asks for `variables` at install and fills `${VARIABLE}`.
- **Claude Code** gets the same list as `userConfig` (secrets with `"sensitive": true`, stored in the OS keychain) and fills `${user_config.VARIABLE}`. `scripts/build.mjs` does this conversion.
- **BoldCreate Connect** should ask for them at install, seal them, and inject them at the gateway.

## Adding or changing a plugin

1. Create or edit `plugins/<name>/.cursor-plugin/plugin.json`, `mcp.json`, `boldcreate.json`, `README.md`.
2. Bump `version` and add a `CHANGELOG.md` entry.
3. Run `npm install` once, then `npm run build` and `npm run validate`.
4. Optional: `claude plugin validate plugins/<name>` for Anthropic's own check.
5. Open a pull request.

## Try it locally

- **Claude Code:** `/plugin marketplace add saravananmadhesh/BoldCreate-Plugins`, then `/plugin install github@boldcreate-plugins`.
- **Cursor:** add this repo as a team marketplace in Cursor's dashboard.

## Status

Endpoints were taken from vendor docs on 2026-10-24. Only AWS Knowledge has had a live check so far. Each endpoint needs a live test with real credentials before publishing (see Wave A / B above).
