# Docs

| File                                                                           | Read it for                                                    |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| [product.md](product.md)                                                       | What the product is, scope, vocabulary, plugin model           |
| [architecture/overview.md](architecture/overview.md)                           | Services, data flow, packages, middleware order, ids           |
| [architecture/security.md](architecture/security.md)                           | Keys, sealing, OAuth, SSRF, access rules                       |
| [architecture/invariants.md](architecture/invariants.md)                       | Rules every change must keep, failure behaviour, migrations    |
| [architecture/decisions.md](architecture/decisions.md)                         | One-way-door decisions and why (record new ones here)          |
| [guides/integration.md](guides/integration.md)                                 | Connect an agent, IDE, CLI or product with an API key          |
| [guides/operations.md](guides/operations.md)                                   | Run, configure, deploy, observe                                |
| [guides/deployment.md](guides/deployment.md)                                   | Images, CI pipeline, Kubernetes layout, release order          |
| [guides/run-with-staging-secrets.md](guides/run-with-staging-secrets.md)       | Run the apps locally against shared staging services           |
| [guides/webhooks.md](guides/webhooks.md)                                       | Verify and handle signed project webhooks                      |
| [guides/sdk-release.md](guides/sdk-release.md)                                 | Release the TypeScript and .NET host SDKs                      |
| [plans/next-phase.md](plans/next-phase.md)                                     | Pending work: release readiness and future phases              |
| [plans/security-hardening-migration.md](plans/security-hardening-migration.md) | Security hardening plan, with complexity                       |
| [plans/observability.md](plans/observability.md)                               | Errors and key events in our own database, retention, admin UI |
| [plans/observability-agent-triage.md](plans/observability-agent-triage.md)     | Read-only access so a local agent can pull and fix an issue    |

The OpenAPI documents are generated into `docs/openapi/` by `pnpm build` (git-ignored). Run, test and command reference: root `README.md`. Repository rules: `AGENTS.md`.
