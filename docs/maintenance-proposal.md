# Proposal: keeping plugins updated

> **Status: for discussion. Nothing below is switched on yet**, apart from the PR validation in `.github/workflows/validate.yml`.

Hosted MCP servers change without us changing a line: tools are added or removed, endpoints move, auth rules change. Example: Stripe stops accepting non-agent API keys after 2026-11-30. So we watch what each server actually exposes, and turn every change into a reviewed, versioned pull request.

## What we track per plugin

| Item | How | Where |
| --- | --- | --- |
| Plugin version | Semver in `plugin.json`, bumped on every change | `plugin.json`, `CHANGELOG.md` |
| Endpoint and transport | Fixed URL, never a "latest" alias | `mcp.json`, `boldcreate.json` |
| Tool surface | Tool names, descriptions and input schemas, hashed | `tools.lock.json` (to add) |
| Auth method | Header names, OAuth metadata URL | `mcp.json`, `boldcreate.json` |
| stdio packages (later) | Exact npm/PyPI version or Docker digest, never `@latest` | `mcp.json` |

## The update loop

1. **Every PR** (on today): schemas, `${VARIABLE}` declared and used, no literal credentials, HTTPS only, CHANGELOG entry for the version, generated files up to date.
2. **Nightly** (proposed): a GitHub Action calls `initialize` and `tools/list` on each endpoint with test credentials from repo secrets, or checks the OAuth challenge for OAuth-only servers.
3. **Tool surface changed**: the Action opens a PR with the tool diff and a version bump. Patch for description edits, minor for new tools, major for removed or changed tools.
4. **Endpoint failing** (404, auth or transport change): it opens an issue, and after several failed nights proposes a yank.
5. **Weekly**: check the official MCP Registry and vendor changelogs for new endpoints or deprecations; later, Renovate for stdio package versions.
6. **On merge**: a tag such as `github@1.3.0` triggers BoldCreate ingestion; the platform's immutable versions and admin Review take it from there.

New or changed tools always need a person to approve: a new tool is a new permission, and tool descriptions are a known prompt-injection path.

## Decisions to make

- [ ] Check cadence: nightly or weekly?
- [ ] Auto-merge description-only changes, or review everything?
- [ ] Who owns the test accounts and API keys for the checks?
- [ ] One owner per plugin (CODEOWNERS) and a monthly catalogue review?
- [ ] Should orgs pin to a plugin version, or always get the latest approved one?
