# boldcreate-stack

Generic project skill for the `boldcreate-integrations` monorepo.
Read this first. Load reference files only when needed.

| Reference | When to load |
|---|---|
| `deps.md` | Adding/updating packages, version drift, install errors |
| `patterns.md` | Writing Fastify routes, MCP tools, React components, TanStack usage |
| `testing.md` | Writing or fixing tests (unit, client, integration, security) |

---

## Stack

**Runtime:** Node 24, pnpm 10, TypeScript 7, ESM throughout  
**Backend:** Fastify 5, Drizzle ORM, PostgreSQL, MCP (`@modelcontextprotocol/*`)  
**Frontend:** React 19, Vite 8, TanStack Router/Query/Form/Table, Tailwind 4  
**Tooling:** oxlint, oxfmt, vitest 5, `@vitest/coverage-v8`

## Layout

```
boldcreate-integrations/       ← monorepo root (pnpm workspace)
  package.json                 ← all shared devDeps + scripts
  vitest.config.ts             ← projects: unit | client | integration | security | conformance | staging
  tsconfig.base.json           ← NodeNext strict baseline + "types":["node"]
  apps/
    web/ (client + server)     ← browser BFF and React SPA
    admin/ api/ gateway/       ← one entrypoint, config and image each
    worker/
  packages/
    contracts/ domain/ db/     ← Zod contracts + registries, use-cases by context, Drizzle schema/migrations/roles
    ports/ adapters/           ← cache, lock, limiter, queue, blob, email, kms, secrets (local + cloud)
    credentials/ security/     ← HPKE sealing; SSRF guard, workload identity, password policy
    http-server/ limits/       ← shared server stages; org policy, flag defaults
    config/ observability/
  tests/  unit | client | integration | security | conformance | e2e | load
```

---

## Quality gates — run from `boldcreate-integrations/`

```sh
pnpm test                                # everything: format, lint, typecheck, unit, client, security, protocol, build, integration
pnpm test -- --only=unit,client          # subset by step id
pnpm exec vitest run --project unit <file>   # single file
```

---

## TypeScript config rules

- `tsconfig.base.json` — NodeNext, strict, `"types":["node"]` (inherited by all packages)
- `tsconfig.json` — project references for all apps + packages
- `tsconfig.root.json` — scripts/, drizzle.config.ts
- Client (`apps/web/client/`) uses `"moduleResolution":"bundler"`, `"jsx":"react-jsx"`, `"lib":["ES2023","DOM"]` — **never apply to server packages**
- `tsc -b` compiles each referenced project with its own tsconfig — root `compilerOptions` do not propagate

---

## Lint rules (oxlint)

- `typescript/no-explicit-any` — error
- `typescript/consistent-type-imports` — error → always `import type { … }`
- `react/rules-of-hooks` — error
- `vitest/expect-expect` — error (every `it` needs an `expect`)
- `vitest/no-focused-tests` — error (blocks CI)
- `no-console` — warn (off in test files)
- Client env: `{ browser: true, node: false }` for `apps/web/client/src/**`

---

## Known gotchas

**TS2591 (Buffer / node:crypto not found)** — package tsconfig must have `"types":["node"]`. Already in `tsconfig.base.json`; new packages inherit it automatically.

**React `act(...)` warnings in jsdom** — `IS_REACT_ACT_ENVIRONMENT` must be set before React loads. Done via `apps/web/client/src/test/react-act-env.ts` as the first `setupFiles` entry in `vitest.config.ts`.

**`waitFor` timeout on queries** — `prefetchQuery` must include `staleTime: Infinity` so pre-populated cache is treated as fresh. See `render-with-router.tsx`.

**React deduplication** — `vitest.config.ts` aliases `react`/`react-dom`/`react/jsx-runtime` to `apps/web/client/node_modules/`. Never add a second React at the monorepo root.

**`__dirname` in vitest config** — use `import.meta.dirname` instead (Vite 8 native config loader).

**Version drift** — all shared packages must use the same exact version across every `package.json`. No `^` or `~`. See `deps.md` for the pinned table.
