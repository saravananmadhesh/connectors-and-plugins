# Load runs

`pnpm exec tsx tests/load/run.ts --target=<url> [--smoke | --full]`. A run needs `K6_ALLOW_LOAD=1`
and a target host listed in `K6_ALLOWED_HOSTS` (default `localhost,127.0.0.1`), and never targets a
production host; otherwise the runner prints a refusal and exits 2.

## The host-product scenario

A host product's server registers the project's users with one project key (`prk_`), then some of
those users are active for a day. Every call goes through the gateway, as a host's server would
make it.

| Mode      | Size                                                | Use                                                                    |
| --------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `--smoke` | 12 users, 6 active                                  | Quick check that the whole path answers as expected; fails on any miss |
| `--full`  | 5,000 users, 1,000 active users, 16 calls at a time | The sizing run                                                         |

Phases: register each user (`PUT /v1/project/users`), then each active user gets a one-hour session
(`POST /v1/project/sessions`) and the host reads the project's sessions and `GET /v1/project/me`. A
`429` is waited out as long as `Retry-After` says and repeated, and is counted. The report lists
calls, unexpected answers, `429`s and p50, p95 and p99 latency per call and is written to
`reports/load/<mode>.json`. The run fails on any unexpected answer.

The scenario signs up its own organization admin, creates a project and a project key, so it needs
the isolated stack of the test runner (its database and workload secret):

```sh
pnpm test -- --only=load                  # smoke
LOAD_FULL=1 pnpm test -- --only=load      # sizing run (PowerShell: $env:LOAD_FULL = '1')
```

`LOAD_USERS` and `LOAD_ACTIVE` shrink a run to reproduce a finding.
