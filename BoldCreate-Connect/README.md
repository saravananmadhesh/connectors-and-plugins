# BoldCreate Integrations

Multi-tenant platform for connecting, managing and securely exposing MCP servers, tools, skills, rules, hooks and agents. Users sign up, create an organization, install reviewed plugins into the org, a team or themselves, supply upstream credentials, and use the tools through the MCP gateway with scoped API keys.

Docs: [docs/README.md](docs/README.md) (product, architecture, security, integration, operations). Repository rules: [AGENTS.md](AGENTS.md). History: [CHANGELOG.md](CHANGELOG.md).

## Architecture

| App            | Role                                                                  |
| -------------- | --------------------------------------------------------------------- |
| `apps/web`     | Browser BFF (Fastify) plus React client                               |
| `apps/admin`   | Platform-admin app plus React client: plugin ingestion, review, audit |
| `apps/api`     | Internal control plane: auth, orgs, catalog, installs, keys, MCP      |
| `apps/gateway` | Public MCP endpoint; Bearer key auth; forwards sync and archive       |
| `apps/worker`  | Outbox delivery, ingestion, key generation, cleanup; no ingress       |

Shared code is in `packages/`: `domain`, `db`, `contracts`, `ports`, `adapters`, `credentials`, `security`, `http-server`, `limits`, `config`, `observability`, `sdk` (TypeScript host client) and `sdk-dotnet` (.NET host client). Details: [docs/architecture/overview.md](docs/architecture/overview.md).

## Stack

Node 24, pnpm 10, strict TypeScript; Fastify 5; React 19, Vite, TanStack, Tailwind 4, shadcn/ui; PostgreSQL with Drizzle; official MCP TypeScript SDK (Streamable HTTP); Argon2id and HPKE sealing with Cloud KMS; Pino; Oxlint and Oxfmt; Vitest and Playwright.

## Develop

Prerequisites: Node 24 and pnpm 10. Docker is optional: `pnpm dev:docker` or `pnpm dev --postgres=docker` runs Postgres in a container (`POSTGRES_MODE=embedded|docker|external` in `.env.development`; `external` uses `DATABASE_URL` from your shell). `pnpm test -- --postgres=docker` works the same.

```sh
pnpm install
pnpm dev                # embedded Postgres 17, Mailpit, object store, web, admin, api, gateway, worker, dashboard
pnpm dev --reset-db     # same, from a new database
```

Everything runs from `.cache/` (git-ignored):

- **Database:** embedded Postgres in `.cache/dev/postgres` (`localhost:5432/boldcreate`, user `app`); migrations apply on every start. Secrets are generated into `.cache/dev/secrets.json`.
- **Mail:** pinned Mailpit (downloaded once, checksum-verified); inbox at <http://localhost:8025>.
- **Object store:** pinned SeaweedFS, S3 on `:9000`, UI on `:9001`, bucket `boldcreate-dev` (plugin archives stored as `artifacts/<sha256>`).
- **Ports:** web 3000, api 3001, gateway 3002, admin 3004, worker health 3005, dashboard 5080. Override with `PORT_<NAME>` in `.env.development` or the shell. A taken port stops `pnpm dev` with a message naming it.
- **Logs:** one run file plus the dashboard at <http://localhost:5080>; `pnpm dev:dashboard` serves saved runs alone.
- **Stop:** Ctrl+C once; apps stop first, then Postgres.
- Plugins appear only after ingestion through the admin app; there is no seed data.

## Test

```sh
pnpm test                        # full gate, no Docker; report in reports/test-run/index.html
pnpm test -- --only=unit,client  # subset; also --skip=<ids>, --bail
```

Steps: `format`, `lint` (warnings fail), `typecheck`, `unit`, `client`, `security`, `conformance`, `protocol`, `build`, `integration` (own embedded Postgres, Mailpit and services on ports 13000+), `e2e`, plus optional `audit` and `load`. The report folder holds `summary.json`, a log per step and service logs; CI publishes it as `test-run-report`. Windows x64 is verified; Linux and macOS use the same pinned binaries. Do not run as root on Linux.

| Command                                                    | Purpose                                                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `pnpm exec vitest run --project unit <file>`               | One file (projects: `unit`, `client`, `integration`, `security`, `conformance`, `staging`) |
| `pnpm format`                                              | Auto-format                                                                                |
| `pnpm build`                                               | Build all apps and packages and generate `docs/openapi/*.json`                             |
| `pnpm openapi`                                             | Regenerate the OpenAPI files without a full build                                          |
| `pnpm coverage`                                            | 95% statements, lines, functions; 85% branches                                             |
| `pnpm test:mutation`                                       | Stryker, reports in `reports/mutation/`                                                    |
| `pnpm db:generate` / `db:check` / `db:migrate` / `db:lint` | Generate, verify, apply and lint migrations                                                |
| `pnpm test:staging`                                        | Opt-in suites against real cloud services; never part of `pnpm test`                       |

## Agent skills

Project skills `boldcreate-stack`, `admin-ui-design` and `gitea-operations` are in `.agents/skills/`. Other skills restore from `skills-lock.json`: `npx --yes skills@1.7.1 experimental_install`; review changed hashes before use.

## Infrastructure

One image per service from the root `Dockerfile` (`--target <app>`), with Google Cloud KMS and Secret Manager adapters and S3 blob storage; the repository contains no infrastructure-as-code. See [docs/guides/operations.md](docs/guides/operations.md).
