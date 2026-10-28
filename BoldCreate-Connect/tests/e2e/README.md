# Browser tests

Playwright specs named `*.e2e.test.ts`, run by `pnpm test -- --only=e2e` against the same
six-app stack as the integration tests. Nothing is mocked. `harness.ts` has the shared helpers
(`uniqueEmail`, `mailpit`, and the `fixtures` hook for fixture servers). Traces and screenshots
of failures land in `reports/test-run/e2e/`.

| Spec                     | What it covers                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `signup-org.e2e.test.ts` | Sign up, verify by mail, create an org, sign out and in again; the console stays clean |
