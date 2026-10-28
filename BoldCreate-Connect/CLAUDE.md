# CLAUDE.md

Guidance for Claude Code in this repository. Binding rules: `AGENTS.md`. Product, architecture, security and decisions: `docs/README.md`. Stack skills: `.agents/skills/boldcreate-stack/`; admin UI work follows `.agents/skills/admin-ui-design/` (monochrome, light and dark).

Implementation is complete. Changes now are fixes and features on top of it. If something needs a one-way-door decision (new service, package, crypto or exposure change), propose it in chat and record it in `docs/architecture/decisions.md`. Do not commit without asking the user.

## Commands

Run from the repo root (pnpm 10, Node 24, ESM only).

```sh
pnpm dev                          # all apps + embedded Postgres + Mailpit (data in .cache/dev; --reset-db recreates it)
pnpm test                         # full gate, Docker-free by default (--postgres=docker|external optional) -> reports/test-run/index.html + summary.json
pnpm test -- --only=unit,client   # subset (--skip=<ids>, --bail); steps: format lint typecheck unit client security conformance protocol build integration e2e audit load
pnpm format                       # oxfmt auto-fix (also markdown)
pnpm build                        # builds every app and package; contracts also writes docs/openapi/*.json
pnpm db:generate | db:check | db:migrate | db:lint
pnpm coverage                     # 95% statements/lines/functions, 85% branches
pnpm test:mutation                # Stryker
pnpm test:staging                 # opt-in suites against real services; never part of pnpm test
```

Single test: `pnpm exec vitest run --project unit <path>` (`--project client` for React, `-t "name"` to filter).

## Before reporting a change as done

1. Add or update tests for success, failure and edge paths in the right project.
2. Run `pnpm format`, then `pnpm test -- --only=format,lint,typecheck,unit` per change and the full `pnpm test` before release; confirm `overall: PASSED` with zero errors and warnings.
3. If something cannot run, say so. Never claim results you did not see.

## Gotchas

- The full gate is intermittently unstable on the maintainer's Windows machine: the embedded Postgres can exit ("checkpointer process exited with exit code 1") during client tests, and later live-stack steps then fail in 0.0 s. Rerun and report any failed run honestly. Process-spawn unit tests can also time out under load; rerun the step.
- A new git worktree needs `pnpm install --frozen-lockfile` before any test run.
- Write multi-line scripts to a temp `.mjs` with the Write tool (long heredocs get truncated). Run one simple command per shell call in a worktree session.
- `.js` extensions on relative imports; `import type` for types; no `any`, `require()`, `console.*`, `@/` alias in server code.
- Exact dependency versions via `pnpm add --save-catalog` with `catalog:`; never hand-edit `pnpm-lock.yaml`. Never edit, rename or delete migrations.
- Client tests: React is aliased to `apps/web/client/node_modules`; `prefetchQuery` in test helpers needs `staleTime: Infinity`; tests must be console-clean.
- Use `import.meta.dirname`, not `__dirname`, in config files.
- Never name a plan, phase, step or task in code, comments, strings, test data or file names.
- A new package needs a row in the `docs/architecture/overview.md` package table (unit test) and an entry in `scripts/checks/architecture.rules.ts`.
