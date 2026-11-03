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

## The ramp

`--ramp` finds where the services give out. Virtual users arrive at a fixed rate until a target is
reached, then all of them keep calling `GET /v1/project/me` with the project key for a while. Arrivals
do not wait for earlier calls, so a service that falls behind shows up as latency, `503`s and calls
with no answer. The project's per-minute request budget is lifted for the run, so the services are
what is measured. The report is a table per 10 seconds (users, calls per second, answers by kind,
p50, p95, p99), the first degraded window (over 1% failures or p95 over a second), and
`reports/load/ramp.json`. A degraded window is a finding, not a failed run.

```sh
LOAD_RAMP=1 pnpm test -- --only=load      # PowerShell: $env:LOAD_RAMP = '1'
```

| Variable                             | Default | Meaning                                            |
| ------------------------------------ | ------- | -------------------------------------------------- |
| `RAMP_USERS`                         | 3000    | Users once the ramp is done                        |
| `RAMP_SPAWN_PER_SECOND`              | 100     | New users each second                              |
| `RAMP_THINK_MS`                      | 3000    | Mean wait between one user's calls                 |
| `RAMP_HOLD_SECONDS`                  | 30      | How long all users keep calling after the last one |
| `RAMP_TIMEOUT_MS`                    | 10000   | A call with no answer by then counts as no answer  |
| `LOAD_PROJECT_KEY_CACHE_TTL_SECONDS` | 30      | Set `0` to measure the api without its key cache   |

The run uses the local stack: its database is not the 1 vCPU instance of a deployment and it shares
the machine with every service, so read the numbers as a comparison between settings, not as the
capacity of a deployed environment. Run the same profile against staging for that.
