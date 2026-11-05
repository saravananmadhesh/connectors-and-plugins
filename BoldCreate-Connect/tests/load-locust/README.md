# Locust Load Testing

Locust load test suite for the public Gateway and API services.

## Prerequisites

- Python 3.10+
- Locust:
  ```sh
  pip install -r tests/load-locust/requirements.txt
  ```

## Safety Controls

Like the TypeScript load runner (`tests/load/run.ts`), the Locust suite refuses to run without explicit opt-in:

- Requires `LOCUST_ALLOW_LOAD=1` (or `K6_ALLOW_LOAD=1`).
- Target host must be allowed via `LOCUST_ALLOWED_HOSTS` or `K6_ALLOWED_HOSTS` (defaults to `localhost,127.0.0.1`).
- Hostnames matching production markers (`*prod*`, `*production*`, `*live*`) are automatically refused.

## Usage

### 1. Headless execution (default)

```sh
LOCUST_ALLOW_LOAD=1 \
LOCUST_ALLOWED_HOSTS="connect-gateway.boldcreate.ai" \
python3 tests/load-locust/run.py \
  --target="https://connect-gateway.boldcreate.ai" \
  --project-key="prk_your_project_key" \
  --users=20 \
  --spawn-rate=5 \
  --run-time=1m
```

HTML and CSV reports are written to `reports/load-locust/`.

### 2. Interactive Web UI

```sh
LOCUST_ALLOW_LOAD=1 \
LOCUST_ALLOWED_HOSTS="connect-gateway.boldcreate.ai" \
python3 tests/load-locust/run.py \
  --target="https://connect-gateway.boldcreate.ai" \
  --project-key="prk_your_project_key" \
  --web
```

## Scenarios Covered

The `GatewayHostUser` simulates a host product interacting with the public Gateway:

- `PUT /v1/project/users` - Host user provisioning with idempotency key.
- `POST /v1/project/sessions` - User session creation.
- `GET /v1/project/sessions` - Session listing.
- `GET /v1/project/me` - Project configuration lookups.
- Automatic retry on HTTP `429` with exponential/`Retry-After` backoff.

## Capacity run (finding the limit)

`run_capacity.py` runs the same host-product calls, but adds users in steps and stops by itself
after the first step that is over the line (more than 1% failures, or p95 over 1 second). The last
step under the line is the capacity. Use it to size the limits on the admin Limits page.

```sh
LOCUST_ALLOW_LOAD=1 \
LOCUST_ALLOWED_HOSTS="connect-gateway-staging.boldcreate.ai" \
python3 tests/load-locust/run_capacity.py \
  --target="https://connect-gateway-staging.boldcreate.ai" \
  --project-key="prk_your_test_project_key"
```

| Variable                  | Default | Meaning                                                    |
| ------------------------- | ------- | ---------------------------------------------------------- |
| `CAPACITY_START_USERS`    | 20      | Users in the first step                                    |
| `CAPACITY_STEP_USERS`     | 20      | Users added each step                                      |
| `CAPACITY_MAX_USERS`      | 600     | The run never goes above this                              |
| `CAPACITY_STEP_SECONDS`   | 120     | How long each step lasts                                   |
| `CAPACITY_WARMUP_SECONDS` | 20      | Start of each step left out of its numbers                 |
| `CAPACITY_MAX_FAIL_PCT`   | 1       | Failures (`503`, other `5xx`, no answer) that end the run  |
| `CAPACITY_MAX_P95_MS`     | 1000    | p95 that ends the run                                      |
| `CAPACITY_READ_ONLY`      | unset   | `1` sends only GET calls, so no users or sessions are made |

Each user calls with only 10 to 50 ms between calls, so one Locust user is a busy host server, not
one person.

Results go to `reports/load-locust/capacity/`: `steps.csv` (one row per step), `summary.json`
(the capacity and 70% of it, per second and per minute) and the Locust HTML report.

### Before the run

1. Check what the environment runs: the PgBouncer cut-over, migration `0006`, the role connection
   limits for its vCPU count (`DB_VCPU`), and how many api and gateway pods may run (note the
   autoscaler's minimum and maximum, or pin them for the run so the result is repeatable).
2. Raise "Project requests per window" on the Limits page for the run (or for the test project
   only, with a `limit_setting` row of scope `project`). Otherwise the run measures that limit:
   steps with many `429`s mean the budget was hit, not the service.
3. Keep the Cloud SQL CPU graph, the pod CPU graph and the PgBouncer pool graph open during the
   run.

### From the result to the limits

- **Capacity** is the healthiest step's `ok_per_second`. Note which part was busy at that step:
  database CPU near 80 to 90% means the database is the limit; pods at their CPU limit with a
  quiet database means more pods (or bigger ones) would help.
- **Safe rate** is 70% of the capacity (`safe_per_minute_70pct`), leaving room for spikes and
  background work.
- **Project requests per window** (per minute): the safe rate per minute divided by the number of
  projects you expect to be busy at the same time. With a safe rate of 12,000 a minute and three
  busy customers, about 4,000 each.
- **Callers one api pod lets wait for the database** and **Seconds a call waits for the
  database**: raise them only if the run shows `503`s while database CPU was low.
- Run again after any change of database size, pod count or limits.
