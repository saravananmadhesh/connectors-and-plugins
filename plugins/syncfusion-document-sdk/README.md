# Syncfusion Document SDK

Generate and run code that creates, edits, converts, and extracts data from PDF, Word, Excel, and PowerPoint files with the Syncfusion Document SDK.

First-party Syncfusion plugin. It bundles three kinds of components:

| Component | What it is | Source |
| --- | --- | --- |
| MCP server | `sf-documentsdk-mcp`: Syncfusion's Document SDK knowledge server. One tool, `search_docs`, answers API and code questions from the Syncfusion docs. It does not edit files itself. | NuGet [`Syncfusion.DocumentSdk.MCP`](https://help.syncfusion.com/document-processing/mcp-server/overview) |
| Skills (16) | Syncfusion's Agent Skills: each one teaches the agent a library and can either write code into the project (Mode 1) or create a file directly by running a temporary C# script (Mode 2). | [`syncfusion/document-sdk-skills`](https://github.com/syncfusion/document-sdk-skills) at `c46c067` |
| Rule | `rules/syncfusion-document-sdk.mdc`: package choice, license registration, cross-platform drawing types, and when to use AI Agent Tools. Applies to `.cs`, `.csx`, `.csproj` and `.razor` files. | Written for this plugin |

| | |
| --- | --- |
| Transport | **stdio** (runs on the developer's machine) |
| Command | `dnx Syncfusion.DocumentSdk.MCP --yes` |
| Auth | Syncfusion API key, passed as the `Syncfusion_API_Key` environment variable |
| BoldCreate gateway | **Not supported yet**: the gateway serves streamable HTTP only. See [Gaps](#gaps). |
| Rollout | Phase 2 |
| Vendor docs | https://help.syncfusion.com/document-processing/mcp-server/overview |

## Install

- **Claude Code:** `/plugin marketplace add saravananmadhesh/BoldCreate-Plugins`, then `/plugin install syncfusion-document-sdk@boldcreate-plugins`.
- **Cursor:** add this repo as a team marketplace in Cursor's dashboard.

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `SYNCFUSION_API_KEY` | Syncfusion API key | Yes | Yes | API key from https://www.syncfusion.com/account/api-key. Needs an active Syncfusion license (commercial, community, or trial). |

## Developer machine prerequisites

- **.NET 10 SDK** for `dnx`. On .NET 8 or 9, run `dotnet tool install Syncfusion.DocumentSdk.MCP` in the project and change the command to `dotnet tool run syncfusion-documentsdk-mcp`.
- For skills in Mode 2 (create files directly): .NET SDK 8+, `dotnet tool install -g dotnet-script`, and a Syncfusion **license key** in `SYNCFUSION_LICENSE_KEY` or a `SyncfusionLicense.txt` file at the workspace root. This license key is different from the API key above.

## Skills

| Platform | Skills |
| --- | --- |
| .NET | `syncfusion-dotnet-pdf`, `syncfusion-dotnet-pdf-to-image`, `syncfusion-dotnet-word`, `syncfusion-dotnet-excel`, `syncfusion-dotnet-powerpoint`, `syncfusion-dotnet-markdown`, `syncfusion-dotnet-calculate`, `syncfusion-dotnet-smart-data-extraction`, `syncfusion-dotnet-document-chunking` |
| JavaScript | `syncfusion-javascript-pdf`, `syncfusion-javascript-docx`, `syncfusion-javascript-excel`, `syncfusion-javascript-powerpoint` |
| Java | `syncfusion-java-word` |
| Flutter | `syncfusion-flutter-pdf`, `syncfusion-flutter-excel` |

Copied unchanged from upstream except:

- `skills/syncfusion-javascript-word` is renamed to `skills/syncfusion-javascript-docx`, to match the `name` in its `SKILL.md` (upstream folder and name differ).
- A UTF-8 byte-order mark was removed from the top of `syncfusion-dotnet-document-chunking/SKILL.md` so its frontmatter parses.

To update: copy `skills/` from a newer upstream commit, reapply the two fixes, update `ref` in `boldcreate.json`, bump the version, and run `npm run build && npm run validate`.

## Not included

- **Document SDK AI Agent Tools** (`Syncfusion.DocumentSDK.AI.AgentTools`, the product on the [AI agent tools page](https://www.syncfusion.com/explore/ai-agent-tools-for-document-sdk/)) is a .NET library that developers add to their own agent app with Microsoft Agent Framework. It is not an MCP server, skill or rule, so there is nothing to install into a coding agent. The rule points developers to it.
- **Agents, hooks, commands**: Syncfusion publishes none for the Document SDK.

## Gaps

1. **stdio only.** Syncfusion publishes no hosted HTTP endpoint, so BoldCreate Connect can list this plugin but cannot proxy the MCP server through the gateway. Cursor and Claude Code run it locally. Options: wait for gateway stdio support, host the NuGet tool behind an HTTP bridge, or ask the Syncfusion team for a hosted endpoint.
2. **API key handling.** Syncfusion recommends `Syncfusion_API_Key_Path` (a key file) over the inline key. Plugin variables can only fill values, so this plugin uses the inline `Syncfusion_API_Key`.
3. **Two MCP packages.** Syncfusion also documents an npm server, `@syncfusion/documentsdk-assistant` (stdio, `npx`), on its older AI coding assistant page. This plugin uses the NuGet server from the current MCP page. Confirm with the product team which one is current.
4. **Tools not documented.** The docs name only `search_docs`. The full tool list needs a live `tools/list` call.
5. **Not tested live.** The server was not run here (needs .NET 10 and a real API key).
6. **Skills license.** The upstream skills repo has no LICENSE file. Confirm redistribution terms before publishing outside Syncfusion.
7. **Mode 2 writes into the skill folder.** Skills create temporary `.csx` files under `<skill>/scripts/`. In an installed plugin that folder is in the client's plugin cache and is replaced on update, so Mode 2 may fail if the cache is read-only.
