# Syncfusion BoldCreate Plugins

Syncfusion's BoldCreate plugins for BoldCreate Connect, Cursor and Claude Code. The repository holds three kinds of plugin, each in its own directory with its own manifests:

- **Syncfusion plugins** at the repository root, made of skills, agents and rules. `boldcreate-toolkit/` gives agents one software delivery lifecycle on any stack.
- **Syncfusion skill packs** under `syncfusion/`, one plugin per platform. Each is copied from Syncfusion's skill repository for that platform and teaches agents to build with Syncfusion components.
- **MCP plugins** under `third_party/`. Each connects agents to a vendor's remote [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.
- **Community plugins** under `third_party/`, made of skills, agents, rules and hooks. Each is copied from [cursor/plugins](https://github.com/cursor/plugins) under its MIT license and keeps its original author and LICENSE file.

## Install

- **BoldCreate Connect:** open **Marketplace**, find the plugin, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install the plugin.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install <name>@boldcreate-plugins`.

Secrets such as API keys are never stored in this repository. Each MCP plugin declares them as install-time variables, and you enter them when you install it. See each plugin's README for setup.

## Syncfusion plugins

| `name` | Plugin | Category | `description` (from marketplace) |
|:-------|:-------|:---------|:-------------------------------------|
| `boldcreate-toolkit` | [BoldCreate Toolkit](boldcreate-toolkit/) | Developer Tools | Skills, reviewer agents and rules that take any project from idea to release: specs, test-first builds, two-axis code review and pull requests. |

## Syncfusion skill packs

The platform and SDK skill packs listed on [ai.syncfusion.com](https://ai.syncfusion.com/): UI component packs in `syncfusion/component-skills/`, document SDK packs in `syncfusion/sdk-skills/`, and the Xamarin migration pack in `syncfusion/migration-skills/`. Each pack keeps its skills as published in its source repository, except that links pointing outside a skill's own folder are removed; the `upstream` entry in `boldcreate.json` records the commit.

| `name` | Plugin | Skills | Source |
|:-------|:-------|-------:|:-------|
| `syncfusion-angular` | [Syncfusion Angular UI Components](syncfusion/component-skills/angular/) | 65 | [syncfusion/angular-ui-components-skills](https://github.com/syncfusion/angular-ui-components-skills) |
| `syncfusion-aspnet-core` | [Syncfusion ASP.NET Core UI Controls](syncfusion/component-skills/aspnet-core/) | 66 | [syncfusion/aspnetcore-ui-components-skills](https://github.com/syncfusion/aspnetcore-ui-components-skills) |
| `syncfusion-aspnet-mvc` | [Syncfusion ASP.NET MVC UI Controls](syncfusion/component-skills/aspnet-mvc/) | 38 | [syncfusion/aspnetmvc-ui-components-skills](https://github.com/syncfusion/aspnetmvc-ui-components-skills) |
| `syncfusion-blazor` | [Syncfusion Blazor Components](syncfusion/component-skills/blazor/) | 69 | [syncfusion/blazor-ui-components-skills](https://github.com/syncfusion/blazor-ui-components-skills) |
| `syncfusion-flutter` | [Syncfusion Flutter Widgets](syncfusion/component-skills/flutter/) | 14 | [syncfusion/flutter-ui-components-skills](https://github.com/syncfusion/flutter-ui-components-skills) |
| `syncfusion-javascript` | [Syncfusion JavaScript UI Controls](syncfusion/component-skills/javascript/) | 67 | [syncfusion/javascript-ui-controls-skills](https://github.com/syncfusion/javascript-ui-controls-skills) |
| `syncfusion-maui` | [Syncfusion .NET MAUI Controls](syncfusion/component-skills/maui/) | 81 | [syncfusion/maui-ui-components-skills](https://github.com/syncfusion/maui-ui-components-skills) |
| `syncfusion-maui-toolkit` | [Syncfusion Toolkit for .NET MAUI](syncfusion/component-skills/maui-toolkit/) | 36 | [syncfusion/maui-toolkit-ui-components-skills](https://github.com/syncfusion/maui-toolkit-ui-components-skills) |
| `syncfusion-react` | [Syncfusion React UI Components](syncfusion/component-skills/react/) | 65 | [syncfusion/react-ui-components-skills](https://github.com/syncfusion/react-ui-components-skills) |
| `syncfusion-vue` | [Syncfusion Vue UI Components](syncfusion/component-skills/vue/) | 49 | [syncfusion/vue-ui-components-skills](https://github.com/syncfusion/vue-ui-components-skills) |
| `syncfusion-winforms` | [Syncfusion WinForms Controls](syncfusion/component-skills/winforms/) | 113 | [syncfusion/winforms-ui-components-skills](https://github.com/syncfusion/winforms-ui-components-skills) |
| `syncfusion-winui` | [Syncfusion WinUI Controls](syncfusion/component-skills/winui/) | 39 | [syncfusion/winui-ui-components-skills](https://github.com/syncfusion/winui-ui-components-skills) |
| `syncfusion-wpf` | [Syncfusion WPF Controls](syncfusion/component-skills/wpf/) | 96 | [syncfusion/wpf-ui-components-skills](https://github.com/syncfusion/wpf-ui-components-skills) |
| `syncfusion-document-sdk` | [Syncfusion Document SDK](syncfusion/sdk-skills/document-sdk/) | 16 | [syncfusion/document-sdk-skills](https://github.com/syncfusion/document-sdk-skills) |
| `syncfusion-docx-editor-sdk` | [Syncfusion DOCX Editor SDK](syncfusion/sdk-skills/docx-editor-sdk/) | 9 | [syncfusion/docx-editor-sdk-skills](https://github.com/syncfusion/docx-editor-sdk-skills) |
| `syncfusion-pdf-viewer-sdk` | [Syncfusion PDF Viewer SDK](syncfusion/sdk-skills/pdf-viewer-sdk/) | 13 | [syncfusion/pdf-viewer-sdk-skills](https://github.com/syncfusion/pdf-viewer-sdk-skills) |
| `syncfusion-spreadsheet-editor-sdk` | [Syncfusion Spreadsheet Editor SDK](syncfusion/sdk-skills/spreadsheet-editor-sdk/) | 10 | [syncfusion/spreadsheet-editor-sdk-skills](https://github.com/syncfusion/spreadsheet-editor-sdk-skills) |
| `syncfusion-xamarin-to-maui` | [Syncfusion Xamarin to .NET MAUI Migration](syncfusion/migration-skills/xamarin-to-maui/) | 4 | [syncfusion/xamarin-maui-migration-skills](https://github.com/syncfusion/xamarin-maui-migration-skills) |

## MCP plugins

| `name` | Plugin | Category | `description` (from marketplace) |
|:-------|:-------|:---------|:-------------------------------------|
| `android-management` | [Android Management](third_party/android-management/) | Devices | Manage enterprise Android devices, policies, and apps with the Android Management API. |
| `atlassian` | [Atlassian (Jira + Confluence)](third_party/atlassian/) | Project Management | Search and update Jira issues and Confluence pages. |
| `aws-knowledge` | [AWS Knowledge](third_party/aws-knowledge/) | Documentation | Search AWS documentation, API references, and regional availability. |
| `context7` | [Context7](third_party/context7/) | Documentation | Pull up-to-date, version-specific library docs and code examples into the prompt. |
| `deepwiki` | [DeepWiki](third_party/deepwiki/) | Documentation | Ask questions about any public GitHub repository and read its generated wiki. |
| `figma` | [Figma](third_party/figma/) | Design | Turn Figma frames into code and read design tokens, components, and variables. |
| `gitea` | [Gitea](third_party/gitea/) | Source Control | Work with Gitea repositories, issues, pull requests, and releases through your own gitea-mcp server. |
| `github` | [GitHub](third_party/github/) | Source Control | Manage repos, issues, pull requests, and Actions. |
| `gitlab` | [GitLab](third_party/gitlab/) | Source Control | Work with GitLab projects, issues, merge requests, pipelines, and code search. |
| `gmail` | [Gmail](third_party/gmail/) | Productivity | Search, read, and draft Gmail messages and threads. |
| `google-calendar` | [Google Calendar](third_party/google-calendar/) | Productivity | List calendars, read events, and check free/busy time. |
| `google-chat` | [Google Chat](third_party/google-chat/) | Productivity | Read Google Chat spaces and messages, and post messages. |
| `google-cloud-agent-platform` | [Gemini Enterprise Agent Platform (Vertex AI)](third_party/google-cloud-agent-platform/) | AI | Generate content, run predictions, and manage models, endpoints, tuning, and evaluation on Vertex AI. |
| `google-cloud-bigquery` | [Google Cloud BigQuery](third_party/google-cloud-bigquery/) | Database | Explore datasets and tables and run SQL queries. |
| `google-cloud-cli` | [Google Cloud CLI](third_party/google-cloud-cli/) | Cloud | Run gcloud commands through Google's hosted Cloud CLI server. |
| `google-cloud-firestore` | [Google Cloud Firestore](third_party/google-cloud-firestore/) | Database | Read and write Firestore documents and collections. |
| `google-cloud-iam` | [Google Cloud IAM](third_party/google-cloud-iam/) | Security | Review IAM roles, policies, and service accounts. |
| `google-cloud-resource-manager` | [Google Cloud Resource Manager](third_party/google-cloud-resource-manager/) | Cloud | Browse Google Cloud organizations, folders, and projects. |
| `google-cloud-run` | [Google Cloud Run](third_party/google-cloud-run/) | Hosting | Deploy and manage Cloud Run services and jobs. |
| `google-cloud-sql` | [Google Cloud SQL](third_party/google-cloud-sql/) | Database | Manage Cloud SQL for MySQL, PostgreSQL, and SQL Server instances and run queries. |
| `google-cloud-storage` | [Google Cloud Storage](third_party/google-cloud-storage/) | Storage | List, read, and manage Cloud Storage buckets and objects. |
| `google-compute-engine` | [Google Compute Engine](third_party/google-compute-engine/) | Hosting | Manage Compute Engine VMs, disks, and networks. |
| `google-contacts` | [Google Contacts](third_party/google-contacts/) | Productivity | Look up contacts and people in your Google Workspace directory. |
| `google-design` | [Google Design](third_party/google-design/) | Design | Get Google design guidance and assets, such as Material Design, while you build UI. |
| `google-developer-knowledge` | [Google Developer Knowledge](third_party/google-developer-knowledge/) | Documentation | Search official Google developer documentation for Android, Firebase, Google Cloud, and Maps. |
| `google-docs` | [Google Docs](third_party/google-docs/) | Productivity | Read, create, and edit Google Docs. |
| `google-drive` | [Google Drive](third_party/google-drive/) | Productivity | Search, read, and create files in Google Drive. |
| `google-gemini-cloud-assist` | [Gemini Cloud Assist](third_party/google-gemini-cloud-assist/) | AI | Ask Gemini Cloud Assist to design, troubleshoot, and optimize Google Cloud resources. |
| `google-kubernetes-engine` | [Google Kubernetes Engine](third_party/google-kubernetes-engine/) | Hosting | Inspect and manage GKE clusters and workloads. |
| `google-maps-code-assist` | [Google Maps Code Assist](third_party/google-maps-code-assist/) | Documentation | Get up-to-date Google Maps Platform docs and code samples while you write Maps code. |
| `google-maps-grounding-lite` | [Google Maps Grounding Lite](third_party/google-maps-grounding-lite/) | Data | Ground agents in Google Maps data: places, routes, and weather. |
| `google-sheets` | [Google Sheets](third_party/google-sheets/) | Productivity | Read, create, and update Google Sheets spreadsheets. |
| `google-slides` | [Google Slides](third_party/google-slides/) | Productivity | Read, create, and edit Google Slides presentations. |
| `google-stitch` | [Stitch](third_party/google-stitch/) | Design | Generate UI designs and front-end code with Google Stitch. |
| `google-workspace-search` | [Google Workspace Search](third_party/google-workspace-search/) | Productivity | Search across Gmail, Drive, Calendar, and other Google Workspace content in one place. |
| `linear` | [Linear](third_party/linear/) | Project Management | Find, create, and update Linear issues, projects, and cycles. |
| `microsoft-learn` | [Microsoft Learn](third_party/microsoft-learn/) | Documentation | Search official Microsoft docs and code samples for .NET, Azure, MAUI, and more. |
| `neon` | [Neon](third_party/neon/) | Database | Manage Neon serverless Postgres projects, branches, queries, and migrations. |
| `notion` | [Notion](third_party/notion/) | Documentation | Search, read, and update Notion pages and databases. |
| `posthog` | [PostHog](third_party/posthog/) | Analytics | Query product analytics, manage feature flags, and investigate errors in PostHog. |
| `sentry` | [Sentry](third_party/sentry/) | Observability | Investigate Sentry errors, stack traces, and issues for a project. |
| `stripe` | [Stripe](third_party/stripe/) | Payments | Work with Stripe customers, payments, subscriptions, and search Stripe docs. |
| `supabase` | [Supabase](third_party/supabase/) | Database | Query Postgres, manage tables, auth, storage, and edge functions in a Supabase project. |
| `vercel` | [Vercel](third_party/vercel/) | Hosting | Inspect Vercel projects, deployments, and build logs, and search Vercel docs. |

## Community plugins

Copied from [cursor/plugins](https://github.com/cursor/plugins) at commit `4dd1d05`. The skills, agents, rules and hooks are kept as their authors published them.

| `name` | Plugin | Author | Category | `description` (from marketplace) |
|:-------|:-------|:-------|:---------|:-------------------------------------|
| `advisor` | [Advisor](third_party/advisor/) | Cursor | Developer Tools | Consult a stronger model at key checkpoints: before major decisions, when stuck on an error, and before declaring a task done. The advisor gets a full briefing plus the conversation transcript, returns guidance, and the main model keeps doing the work. |
| `agent-compatibility` | [Agent Compatibility](third_party/agent-compatibility/) | Cursor | Developer Tools | CLI-backed repo compatibility scans plus agents that audit startup, validation, and docs against reality. |
| `cli-for-agent` | [CLI for Agents](third_party/cli-for-agent/) | Eric Zakariasson | Developer Tools | Patterns for designing CLIs that coding agents can run reliably: non-interactive flags, layered help with examples, pipelines, actionable errors, idempotency, and dry-run. |
| `continual-learning` | [Continual Learning](third_party/continual-learning/) | Eric Zakariasson | Developer Tools | Incrementally learns durable user preferences and workspace facts from transcript changes and keeps AGENTS.md up to date with plain bullet points. |
| `create-plugin` | [Create Plugin](third_party/create-plugin/) | Cursor | Developer Tools | Scaffold and validate new agent plugins. Handles directory setup, manifest generation, and pre-submission quality checks for the marketplace. |
| `dyl-stack` | [dyl-stack](third_party/dyl-stack/) | Dylan Gattey | Developer Tools | Dylan's agent style on top of pstack: root causes over symptom patches, The Algorithm before design, terse verified delivery, a PR review that fits in a paste, and Figma-to-UI with a visual judge. |
| `grok-voice` | [Grok Voice](third_party/grok-voice/) | Eric Zakariasson | Developer Tools | Add Grok voice to an app: realtime speech-to-speech, speech-to-text dictation, text-to-speech read-aloud, and a log-driven fix loop for voice sessions. |
| `pstack` | [pstack](third_party/pstack/) | Lauren Tan | Developer Tools | if you want to go fast, go deep first. pstack helps you write less, but higher quality code. rigorous agent workflows you can parallelize with confidence. |
| `ralph-loop` | [Ralph Loop](third_party/ralph-loop/) | Cursor | Developer Tools | Continuous self-referential AI loops for iterative development, implementing the Ralph Wiggum technique. Run the agent in a while-true loop with the same prompt until task completion. |
| `teaching` | [Teaching](third_party/teaching/) | Cursor | Utilities | Skill mapping, practice plans, and learning retrospectives. Builds personalized roadmaps with milestones and practice checkpoints, and runs periodic reviews to adjust based on progress. |
| `thermos` | [Thermos](third_party/thermos/) | Cursor | Developer Tools | Thermo-nuclear branch review: deep correctness and security audits plus harsh code-quality rubrics, parallel subagents, thermos orchestration, and optional take-the-wheel and FSD merge-ready flows. |

`advisor`, `continual-learning` and `ralph-loop` use Cursor hooks, which run in Cursor only. BoldCreate Connect does not deliver hook scripts yet, so from Connect these three install their skills and agents only.

## Repository structure

This is a multi-plugin marketplace repository. The root marketplace files list every plugin, and each plugin has a manifest per client:

```
.boldcreate-plugin/marketplace.json   # BoldCreate Connect marketplace (generated)
.cursor-plugin/marketplace.json       # Cursor marketplace (generated)
.claude-plugin/marketplace.json       # Claude Code marketplace (generated)
boldcreate-toolkit/                   # Syncfusion plugin
├── .cursor-plugin/plugin.json        # Manifest
├── .claude-plugin/plugin.json        # Claude Code manifest (generated)
├── .boldcreate-plugin/plugin.json    # BoldCreate Connect manifest (generated)
├── boldcreate.json                   # BoldCreate Connect metadata
├── skills/<name>/                    # Skills: SKILL.md plus the templates and checklists it reads
├── agents/                           # Agents
├── rules/                            # Cursor rules
├── hooks/claude-hooks.json           # Claude Code hooks
├── tests/scenarios/<skill>.md        # One scenario per skill
├── assets/logo.png
├── README.md
├── CHANGELOG.md
└── LICENSE
syncfusion/
└── <group>/<pack>/                   # component-skills, sdk-skills or migration-skills; named syncfusion-<pack>
    ├── .cursor-plugin/plugin.json
    ├── .claude-plugin/plugin.json      # (generated)
    ├── .boldcreate-plugin/plugin.json  # (generated)
    ├── boldcreate.json                 # upstream source repository and commit
    ├── skills/<name>/                  # SKILL.md plus references/
    ├── assets/logo.png
    ├── README.md
    ├── CHANGELOG.md
    └── LICENSE
third_party/
└── plugin-name/
    ├── .cursor-plugin/plugin.json      # Per-plugin manifest and install-time variables
    ├── .claude-plugin/plugin.json      # Claude Code manifest (generated)
    ├── .boldcreate-plugin/plugin.json  # BoldCreate Connect manifest (generated)
    ├── boldcreate.json                 # Transport, auth and docs metadata, or the upstream source of a community plugin
    ├── mcp.json                        # MCP server definitions (community plugins have skills/, agents/, rules/ and hooks/ instead)
    ├── assets/logo.svg                 # Logo
    ├── README.md
    ├── CHANGELOG.md
    └── LICENSE
schemas/                              # JSON schemas for the manifests
scripts/                              # build.mjs, validate.mjs and check-kit.mjs
```

## Contributing

1. Edit the source files: `.cursor-plugin/plugin.json`, `boldcreate.json`, `README.md` and `CHANGELOG.md`, plus `mcp.json` for an MCP plugin or the skills, agents, rules and hooks for a Syncfusion plugin. Don't edit generated files by hand.
2. Run `npm ci`, then `npm run build` and `npm run validate`. Community plugins and Syncfusion skill packs are checked only for loadable components and an `upstream` entry in `boldcreate.json`. Validation also checks Syncfusion plugins against their context budgets: auto-skill descriptions, agent descriptions and always-on rules under 600 tokens, each `SKILL.md` at most 150 lines, each agent file at most 80 lines, and a scenario file for every skill.
3. Open a pull request. CI runs the same checks and the Claude Code plugin validator.

## License

MIT. Each community plugin keeps its own MIT LICENSE file and copyright holder. Logos are trademarks of their owners.
