# AGENTS.md — repository rules

Binding for every agent and contributor. Product, architecture and decisions: `docs/README.md`.

## Layout

```
apps/{api,gateway,worker,web,admin}   server entrypoint in src/; web and admin add client/ (web keeps its server in server/)
packages/{adapters,config,contracts,credentials,db,domain,http-server,limits,observability,ports,security}
tests/{integration,e2e,load,security,conformance}   fixtures/   examples/   scripts/   docs/   .agents/skills/
```

Root configs: `tsconfig.base.json` (NodeNext, strict), `tsconfig.json` (project references), `vitest.config.ts` (projects `unit`, `client`, `integration`, `security`, `conformance`, `staging`). New top-level folders or packages need a decision in `docs/architecture/decisions.md` and a row in the `docs/architecture/overview.md` package table (a unit test enforces it).

## Naming

- Files and folders `kebab-case`. Tests: `<name>.test.ts`, `.integration.test.ts`, `.security.test.ts`, `.client.test.tsx`. No `index.ts` barrels inside `src/` sub-folders.
- `PascalCase` types, classes and Zod schemas; `camelCase` values; `SCREAMING_SNAKE_CASE` true constants. `import type` for types.
- Packages `@boldcreate-integrations/<name>`. Follow the product vocabulary (`org`, `plugin`, `component`, `mcp_server`); see `docs/product.md`.

## Code

- ESM only: `.js` extension on relative imports, no `require()`, no `@/` alias in server code.
- No `any`, `console.*` (use the Pino logger), `it.only`, tests without `expect`.
- App and package tsconfigs set only `outDir`, `rootDir`, `composite`, `references`; compiler options live in `tsconfig.base.json`. `apps/*/client` uses bundler resolution and `react-jsx`.
- Comments explain why, not what. Never name a plan, phase, step, task number or planning document in code, comments, strings, identifiers, test data or file names.

## Tests

- Unit tests sit beside the source; integration tests in `tests/integration/` run against real embedded Postgres; security tests beside the module; client tests in `apps/*/client/src/` and must be console-clean.
- Cover success, failure and edge paths. Never invent results or mock live infrastructure in integration tests. Test data uses descriptive prefixes (`journey-`, `gateway-`, `fixture-`).

## Dependencies

- Add with `pnpm add --save-catalog` so versions are exact (`catalog:` in `pnpm-workspace.yaml`); never edit `pnpm-lock.yaml`. No `^` or `~`.
- Shared dev dependencies go in the root `package.json`; never add a second `react` at the root.

## Database

Migrations are generated (`pnpm db:generate`), never hand-edited, renamed or deleted. Contract changes need a `contractAllow` entry in `packages/db/migration-lint.json` naming a heading in `docs/architecture/decisions.md`.

## Quality gate (before any commit)

`pnpm test` must report `overall: PASSED` with zero warnings (lint warnings, TypeScript output, React `act(...)` warnings and console output fail the run). Per change, `pnpm test -- --only=format,lint,typecheck,unit` is enough. Run `pnpm format` first.

## Forbidden

- Committing secrets, credentials, tokens or connection strings.
- Creating files outside this structure without updating this file.
- Claiming test results you did not see; ticking anything done on a failed run.
- Committing without the user's go-ahead.
