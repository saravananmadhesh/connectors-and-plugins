# deps

LLM-friendly reference URLs. Fetch the `llms.txt` index for a dependency, then follow links for deeper context.

| Dependency | llms.txt / docs index |
|---|---|
| TypeScript | https://www.typescriptlang.org/docs/ |
| Node.js | https://nodejs.org/docs/latest/api/ |
| pnpm | https://pnpm.io/workspaces |
| Vite | https://vite.dev/llms.txt |
| Vitest | https://vitest.dev/llms.txt |
| Fastify | https://fastify.dev/llms.txt |
| Drizzle ORM | https://orm.drizzle.team/llms.txt |
| Zod | https://zod.dev/llms.txt |
| Pino | https://getpino.io/#/docs/api |
| Undici | https://undici.nodejs.org/ |
| MCP | https://modelcontextprotocol.io/llms.txt |
| React | https://react.dev/llms.txt |
| TanStack | https://tanstack.com/llms.txt |
| Tailwind CSS | https://tailwindcss.com/docs |
| Lucide | https://lucide.dev/llms.txt |
| CVA | https://cva.style/llms.txt |
| tailwind-merge | https://github.com/dcastil/tailwind-merge#readme |
| Radix UI | https://www.radix-ui.com/primitives/docs/overview/introduction |
| @testing-library | https://testing-library.com/docs/react-testing-library/intro/ |
| oxlint / oxfmt | https://oxc.rs/llms.txt |

## Version management

```sh
npm show <pkg> dist-tags   # use the "latest" tag
```

Pin all packages to exact versions — no `^` or `~` — across every `package.json` in the workspace.
