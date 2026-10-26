# BoldCreate Plugins

Plugins for BoldCreate Connect, Cursor and Claude Code. Each plugin connects agents to a remote [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP and lives in its own directory under `third_party/` with its own manifests.

## Install

- **BoldCreate Connect:** open **Marketplace**, find the plugin, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install the plugin.
- **Claude Code:** `/plugin marketplace add saravananmadhesh/BoldCreate-Plugins`, then `/plugin install <name>@boldcreate-plugins`.

Secrets such as API keys are never stored in this repository. Each plugin declares them as install-time variables, and you enter them when you install it. See each plugin's README for setup.

## Plugins

| `name` | Plugin | Category | `description` (from marketplace) |
|:-------|:-------|:---------|:-------------------------------------|
| `android-management` | [Android Management](third_party/android-management/) | Devices | Manage enterprise Android devices, policies, and apps with the Android Management API. |
| `atlassian` | [Atlassian (Jira + Confluence)](third_party/atlassian/) | Project Management | Search and update Jira issues and Confluence pages. |
| `aws-knowledge` | [AWS Knowledge](third_party/aws-knowledge/) | Documentation | Search AWS documentation, API references, and regional availability. |
| `context7` | [Context7](third_party/context7/) | Documentation | Pull up-to-date, version-specific library docs and code examples into the prompt. |
| `deepwiki` | [DeepWiki](third_party/deepwiki/) | Documentation | Ask questions about any public GitHub repository and read its generated wiki. |
| `figma` | [Figma](third_party/figma/) | Design | Turn Figma frames into code and read design tokens, components, and variables. |
| `firebase-sql-connect` | [Firebase SQL Connect](third_party/firebase-sql-connect/) | Database | Work with Firebase SQL Connect (Data Connect) services, schemas, and queries. |
| `gitea` | [Gitea](third_party/gitea/) | Source Control | Work with Gitea repositories, issues, pull requests, and releases through your own gitea-mcp server. |
| `github` | [GitHub](third_party/github/) | Source Control | Manage repos, issues, pull requests, and Actions. |
| `gitlab` | [GitLab](third_party/gitlab/) | Source Control | Work with GitLab projects, issues, merge requests, pipelines, and code search. |
| `gmail` | [Gmail](third_party/gmail/) | Productivity | Search, read, and draft Gmail messages and threads. |
| `google-calendar` | [Google Calendar](third_party/google-calendar/) | Productivity | List calendars, read events, and check free/busy time. |
| `google-chat` | [Google Chat](third_party/google-chat/) | Productivity | Read Google Chat spaces and messages, and post messages. |
| `google-classroom` | [Google Classroom](third_party/google-classroom/) | Productivity | Read courses, rosters, and coursework, and post announcements in Google Classroom. |
| `google-cloud-agent-platform` | [Gemini Enterprise Agent Platform (Vertex AI)](third_party/google-cloud-agent-platform/) | AI | Generate content, run predictions, and manage models, endpoints, tuning, and evaluation on Vertex AI. |
| `google-cloud-alloydb` | [Google Cloud AlloyDB](third_party/google-cloud-alloydb/) | Database | Manage AlloyDB for PostgreSQL clusters and run queries. |
| `google-cloud-bigquery` | [Google Cloud BigQuery](third_party/google-cloud-bigquery/) | Database | Explore datasets and tables and run SQL queries. |
| `google-cloud-bigtable` | [Google Cloud Bigtable](third_party/google-cloud-bigtable/) | Database | Manage Bigtable instances, clusters, and tables. |
| `google-cloud-cli` | [Google Cloud CLI](third_party/google-cloud-cli/) | Cloud | Run gcloud commands through Google's hosted Cloud CLI server. |
| `google-cloud-error-reporting` | [Google Cloud Error Reporting](third_party/google-cloud-error-reporting/) | Observability | Review grouped application errors from Error Reporting. |
| `google-cloud-firestore` | [Google Cloud Firestore](third_party/google-cloud-firestore/) | Database | Read and write Firestore documents and collections. |
| `google-cloud-iam` | [Google Cloud IAM](third_party/google-cloud-iam/) | Security | Review IAM roles, policies, and service accounts. |
| `google-cloud-logging` | [Google Cloud Logging](third_party/google-cloud-logging/) | Observability | Query and analyze Cloud Logging log entries. |
| `google-cloud-memorystore` | [Google Cloud Memorystore](third_party/google-cloud-memorystore/) | Database | Manage Memorystore for Redis, Redis Cluster, and Valkey instances. |
| `google-cloud-monitoring` | [Google Cloud Monitoring](third_party/google-cloud-monitoring/) | Observability | Read Cloud Monitoring metrics, alerts, and dashboards. |
| `google-cloud-pubsub` | [Google Cloud Pub/Sub](third_party/google-cloud-pubsub/) | Messaging | Manage Pub/Sub topics and subscriptions and publish messages. |
| `google-cloud-resource-manager` | [Google Cloud Resource Manager](third_party/google-cloud-resource-manager/) | Cloud | Browse Google Cloud organizations, folders, and projects. |
| `google-cloud-run` | [Google Cloud Run](third_party/google-cloud-run/) | Hosting | Deploy and manage Cloud Run services and jobs. |
| `google-cloud-spanner` | [Google Cloud Spanner](third_party/google-cloud-spanner/) | Database | Manage Spanner instances and databases and run SQL. |
| `google-cloud-sql` | [Google Cloud SQL](third_party/google-cloud-sql/) | Database | Manage Cloud SQL for MySQL, PostgreSQL, and SQL Server instances and run queries. |
| `google-cloud-storage` | [Google Cloud Storage](third_party/google-cloud-storage/) | Storage | List, read, and manage Cloud Storage buckets and objects. |
| `google-cloud-trace` | [Google Cloud Trace](third_party/google-cloud-trace/) | Observability | Find and read Cloud Trace spans to debug latency. |
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
| `google-pay-wallet` | [Google Pay and Wallet](third_party/google-pay-wallet/) | Payments | Manage Google Pay merchant setup and read Google Wallet issuer data. |
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

## Repository structure

This is a multi-plugin marketplace repository. The root marketplace files list every plugin, and each plugin has a manifest per client:

```
.boldcreate-plugin/marketplace.json   # BoldCreate Connect marketplace (generated)
.cursor-plugin/marketplace.json       # Cursor marketplace (generated)
.claude-plugin/marketplace.json       # Claude Code marketplace (generated)
third_party/
└── plugin-name/
    ├── .cursor-plugin/plugin.json      # Per-plugin manifest and install-time variables
    ├── .claude-plugin/plugin.json      # Claude Code manifest (generated)
    ├── .boldcreate-plugin/plugin.json  # BoldCreate Connect manifest (generated)
    ├── boldcreate.json                 # Transport, auth and docs metadata
    ├── mcp.json                        # MCP server definitions
    ├── assets/logo.svg                 # Logo
    ├── README.md
    ├── CHANGELOG.md
    └── LICENSE
schemas/                              # JSON schemas for the manifests
scripts/                              # build.mjs and validate.mjs
```

## Contributing

1. Edit the source files in `third_party/<name>/`: `.cursor-plugin/plugin.json`, `mcp.json`, `boldcreate.json`, `README.md` and `CHANGELOG.md`. Don't edit generated files by hand.
2. Run `npm ci`, then `npm run build` and `npm run validate`.
3. Open a pull request. CI runs the same validation.

## License

MIT. Logos are trademarks of their owners.
