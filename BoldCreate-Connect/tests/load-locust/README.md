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

## Staging capacity test

This test answers two questions about an environment such as staging:

1. **How much can it handle in total?** (Round 1)
2. **Does the per-project limit keep one busy customer from slowing down the others?** (Round 2)

You do not create anything by hand. `run_staging.py` signs in with a test account, creates the
test organizations, projects and keys, runs the test, and deletes everything it created at the
end, even if the test fails or you stop it.

### How the test works

- It starts with 20 virtual users and adds 20 more every 2 minutes.
- After each step it checks two things: did more than 1% of calls fail, and did the slowest 5% of
  calls take longer than 1 second (p95)?
- At the first step that fails either check, it stops. The step before is the **capacity**.
- It prints the capacity in calls per second, and **70% of it** per second and per minute. Plan
  limits from the 70% figure, so there is room for spikes.

Each virtual user calls with only 10 to 50 ms between calls, so one virtual user is a busy host
server, not one person.

### The easy way: the control panel

After the one-time preparation below, start the control panel and use it in your browser:

PowerShell (Windows):

```powershell
python control_panel.py
```

Terminal (macOS):

```sh
python3 control_panel.py
```

Open http://127.0.0.1:8090. Fill in the web and gateway addresses, the load-test account, the round
and the number of projects, tick the confirmation and click **Run**. The page shows each step as it
finishes and links to Locust's live charts while the test runs. **Stop** ends the test early; the
test data is still removed. Every run is saved in `results/<time>-<round>/` next to the script
(settings without the password, the log, `summary.json`, `steps.csv`, `projects.csv` and the Locust
report), and the page lists past runs with their capacity and the 70% figure. The panel only
listens on your own computer, and the password is never saved.

The commands below do the same from the terminal.

### One-time preparation

1. Install Python 3.10 or later (on Windows, tick "Add python.exe to PATH" in the installer).
2. On staging, sign up one normal account only for load tests and verify its email. The test
   creates and deletes organizations under this account.
3. Install Locust, from this folder (`tests/load-locust`):

PowerShell (Windows):

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Terminal (macOS):

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Before each run

Open a new terminal in this folder, activate `.venv` as above, and set the account and the allowed
hosts. The scripts refuse to run against any other host and never against production.

PowerShell (Windows):

```powershell
$env:LOCUST_ALLOW_LOAD = "1"
$env:LOCUST_ALLOWED_HOSTS = "connect-staging.boldcreate.ai,connect-gateway-staging.boldcreate.ai"
$env:LOAD_EMAIL = "your-load-test-account@example.com"
$env:LOAD_PASSWORD = "your-password"
```

Terminal (macOS):

```sh
export LOCUST_ALLOW_LOAD=1
export LOCUST_ALLOWED_HOSTS="connect-staging.boldcreate.ai,connect-gateway-staging.boldcreate.ai"
export LOAD_EMAIL="your-load-test-account@example.com"
export LOAD_PASSWORD="your-password"
```

Also check what the environment runs: the PgBouncer cut-over, migration `0006`, and how many api
and gateway pods may run (note the autoscaler's minimum and maximum). Keep the Cloud SQL CPU graph
open during the run.

### Round 1: total capacity

On the admin **Limits** page, set **Project requests per window** to `100000`, so the run measures
the service and not that limit. Then run:

PowerShell (Windows):

```powershell
python run_staging.py --projects=3
```

Terminal (macOS):

```sh
python3 run_staging.py --projects=3
```

The users are spread evenly over 3 projects, each in its own organization (projects of one
organization share one place in the database queue). The end of the output looks like this:

```text
[capacity] step  users   ok/s  failed%  429s   p50   p95   p99  healthy
[capacity]    1     20  309.2      0.0     0    26    84   108  yes
[capacity]    2     40  281.4      0.0     0   179   253   288  yes
[capacity]    3     60  229.3     8.14     0   460   548   581  NO
[capacity] capacity: about 309.2 calls/s with 20 users; 70% of that is 216.4 calls/s (12986 a minute)
```

Write down the **70% per minute** figure (12,986 in this example).

### Round 2: one busy project

Work out the per-project limit: the 70% per-minute figure divided by the number of customers you
expect to be busy at the same time. With 12,986 a minute and three busy customers, about 4,300.
Set **Project requests per window** to that value on the Limits page, then run:

PowerShell (Windows):

```powershell
python run_staging.py --projects=3 --busy-share=60
```

Terminal (macOS):

```sh
python3 run_staging.py --projects=3 --busy-share=60
```

60% of the users now call with project 1. The result is good when project 1 gets `429` answers
("slow down") and projects 2 and 3 have no failures and a p95 under 1,000 ms, for example:

```text
[capacity] project   ok/min  failed%  429s   p95
[capacity]       1     4300      0.0   385    90
[capacity]       2     4680      0.0     0   120
[capacity]       3     4344      0.0     0   118
```

If projects 2 and 3 slow down too, lower the limit and run round 2 again. The value fits this
environment only: production needs its own figure when its database size or pod count differs.

### Results

Each run writes to `reports/load-locust/capacity/` (two folders above this one):

| File           | What it holds                                |
| -------------- | -------------------------------------------- |
| `summary.json` | Every step, the capacity and the 70% figures |
| `steps.csv`    | One row per step                             |
| `projects.csv` | One row per project per step                 |
| `report.html`  | Locust's own report with charts              |

### Reading the result

- Database CPU near 80 to 90% when the run stopped means the database is the limit.
- Pods at their CPU limit with a quiet database means more pods (or bigger ones) would help.
- Many `503` answers while the database was quiet mean the api's waiting line is full: raise
  "Callers one api pod lets wait for the database" on the Limits page.
- Many `429` answers in round 1 mean the project limit was not raised.
- Run both rounds again after any change of database size, pod count or limits.

### The parts, if you want to run them one by one

`run_staging.py` calls these three in order:

PowerShell (Windows):

```powershell
python test_data.py setup --web=https://connect-staging.boldcreate.ai --projects=3
python run_capacity.py --target=https://connect-gateway-staging.boldcreate.ai --project-keys-file=keys.txt
python test_data.py cleanup --web=https://connect-staging.boldcreate.ai
```

Terminal (macOS):

```sh
python3 test_data.py setup --web=https://connect-staging.boldcreate.ai --projects=3
python3 run_capacity.py --target=https://connect-gateway-staging.boldcreate.ai --project-keys-file=keys.txt
python3 test_data.py cleanup --web=https://connect-staging.boldcreate.ai
```

- `setup` makes one organization per project (named `loadtest-<run>-<n>`), a project "Load test"
  in each, and a key with `sessions:read` and `sessions:write` that ends after 7 days
  (`--key-days`). Keys go to `keys.txt` and ids to `load-test-state.json`; git ignores both, and
  no key is printed.
- `cleanup` deletes the organizations in `load-test-state.json`, which removes their projects,
  keys, and the users and sessions the run made. `--all` also deletes any other organization of
  the account named `loadtest-...`, for when the state file was lost. Nothing else is deleted.
  Each deleted organization sends the account the usual deletion mail, and the audit log keeps
  its rows, as for every deletion.
- `run_staging.py --keep` keeps the test data for another run, and `--live` shows Locust's live
  charts at http://127.0.0.1:8089 during the run.

### Settings

| Variable                  | Default | Meaning                                                           |
| ------------------------- | ------- | ----------------------------------------------------------------- |
| `CAPACITY_START_USERS`    | 20      | Users in the first step                                           |
| `CAPACITY_STEP_USERS`     | 20      | Users added each step                                             |
| `CAPACITY_MAX_USERS`      | 600     | The run never goes above this                                     |
| `CAPACITY_STEP_SECONDS`   | 120     | How long each step lasts                                          |
| `CAPACITY_WARMUP_SECONDS` | 20      | Start of each step left out of its numbers                        |
| `CAPACITY_MAX_FAIL_PCT`   | 1       | Failures (any `4xx` but `429`, `5xx`, no answer) that end the run |
| `CAPACITY_MAX_P95_MS`     | 1000    | p95 that ends the run                                             |
| `CAPACITY_READ_ONLY`      | unset   | `1` sends only GET calls, so no users or sessions are made        |
| `CAPACITY_BUSY_SHARE_PCT` | 0       | Share of users on the first key (`--busy-share`); 0 = even        |

Set one in PowerShell with `$env:CAPACITY_STEP_SECONDS = "60"`, on macOS with
`export CAPACITY_STEP_SECONDS=60`.

One Locust process uses one CPU core. If Locust warns that its CPU is above 90%, the numbers show
the test machine's limit, not the service's; lower the users or run from a bigger machine.

## Local capacity test with a Docker database

A database in Docker can be capped like a deployed one, so you can compare database sizes on your
own machine. The rest of the app runs on the same machine, so the numbers are lower than on a
cluster; compare the rounds with each other, not with staging.

You need Docker and the repo set up for `pnpm dev`. On Windows that is either Docker Desktop (then
use the PowerShell commands below), or, where Docker Desktop is not allowed, Docker Engine inside
Ubuntu on WSL (see [Windows without Docker Desktop](#windows-without-docker-desktop); then every
command runs in Ubuntu, using the macOS / Linux lines).

Three settings size the run:

| Setting                           | What it does                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `POSTGRES_DOCKER_CPUS`            | CPUs the database container may use                                           |
| `POSTGRES_DOCKER_MAX_CONNECTIONS` | the database's `max_connections`                                              |
| `DB_VCPU`                         | role connection limits and the local PgBouncer pools for a database that size |

### Round A: 1 CPU, 100 connections

PowerShell, in the `BoldCreate-Connect` folder:

```powershell
$env:POSTGRES_MODE = "docker"
$env:POSTGRES_DOCKER_CPUS = "1"
$env:POSTGRES_DOCKER_MAX_CONNECTIONS = "100"
$env:DB_VCPU = "1"
pnpm dev
```

macOS / Linux:

```sh
POSTGRES_MODE=docker POSTGRES_DOCKER_CPUS=1 POSTGRES_DOCKER_MAX_CONNECTIONS=100 DB_VCPU=1 pnpm dev
```

Check the container got the cap (prints `1000000000` for 1 CPU, and the arguments end with
`max_connections=100`):

```powershell
docker inspect boldcreate-dev-postgres --format "{{.HostConfig.NanoCpus}} {{.Args}}"
```

Then, the first time only:

1. Open http://localhost:3000, sign up, and confirm the mail in Mailpit (linked from the dev
   dashboard, http://localhost:5080).
2. In the local admin (http://localhost:3004), Limits page, set "Project requests per window" to
   100000 for the total capacity round.

In a second PowerShell window, start the control panel and fill in:

```powershell
python tests/load-locust/control_panel.py
```

- Web: `http://localhost:3000`
- Gateway: `http://localhost:3002`
- Email and password: the account from step 1

Run "Total capacity". Each run is saved in `tests/load-locust/results/`.

### Round B: 2 CPUs, 150 connections

Stop `pnpm dev` (Ctrl+C) and start it again with the new size. The data stays; the container is
made again with the new cap.

```powershell
$env:POSTGRES_DOCKER_CPUS = "2"
$env:POSTGRES_DOCKER_MAX_CONNECTIONS = "150"
$env:DB_VCPU = "2"
pnpm dev
```

Check with `docker inspect` as above (`2000000000`, `max_connections=150`), then run the same round
in the control panel.

### Windows without Docker Desktop

Docker Engine, the command-line Docker, is free and runs inside Ubuntu on WSL. The app, PgBouncer
and Locust then run in Ubuntu too; the Windows browser still opens `http://localhost:3000`.

1. **Check virtualization.** In PowerShell: `systeminfo | Select-String "Hyper-V|hypervisor"`.
   "A hypervisor has been detected" or "Virtualization Enabled In Firmware: Yes" means it is on.
2. **Install WSL and Ubuntu.** PowerShell as administrator: `wsl --install`, then restart. Open
   "Ubuntu" from the Start menu (or type `wsl` in PowerShell) and create a user. Answer `n` to the
   platform metrics question.
3. **Docker Engine.** In Ubuntu, one line at a time:

   ```sh
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

   Close and reopen Ubuntu, then `docker run --rm hello-world` should print "Hello from Docker!".

4. **Tools the app needs on Linux** (on Windows `pnpm dev` downloads these itself):

   ```sh
   sudo apt install -y git unzip curl redis-server pgbouncer python3-venv
   sudo systemctl disable --now redis-server pgbouncer
   curl -fsSL https://fnm.vercel.app/install -o fnm-install.sh
   bash fnm-install.sh
   ```

   The second line stops the Redis and PgBouncer services apt started, because they take the ports
   `pnpm dev` uses. Close and reopen Ubuntu, then `fnm install 24`, `corepack enable` and
   `node --version` (v24).

5. **The repo, inside Ubuntu** (much faster than a Windows drive). A private repo asks for a token
   as the password: GitHub, Settings, Developer settings, Tokens (tick "repo"); Gitea, Settings,
   Applications, Generate New Token.

   ```sh
   git clone -b internal-development https://github.com/saravananmadhesh/BoldCreate-Plugins.git
   cd BoldCreate-Plugins/BoldCreate-Connect
   grep -c POSTGRES_DOCKER_CPUS scripts/postgres-docker.ts
   pnpm install
   ```

   The `grep` line must print a number above 0; 0 means the copy is older than these settings.

6. **Python for Locust:**

   ```sh
   python3 -m venv ~/locust-venv
   ~/locust-venv/bin/pip install -r tests/load-locust/requirements.txt
   ```

7. **Start Round A (1 CPU, 100 connections).** Ubuntu window 1, in the `BoldCreate-Connect`
   folder (`cd ~/BoldCreate-Plugins/BoldCreate-Connect`). The first line tells the app where Redis
   and PgBouncer are; type it every time you open a new Ubuntu window:

   ```sh
   export REDIS_SERVER_BIN=/usr/bin/redis-server PGBOUNCER_BIN=/usr/sbin/pgbouncer
   POSTGRES_MODE=docker POSTGRES_DOCKER_CPUS=1 POSTGRES_DOCKER_MAX_CONNECTIONS=100 DB_VCPU=1 pnpm dev
   ```

   Leave this window open; closing it stops the app. When http://localhost:3000 opens in the
   Windows browser, the app is ready. To check the size, open a second Ubuntu window and run
   `docker inspect boldcreate-dev-postgres --format "{{.HostConfig.NanoCpus}} {{.Args}}"`: it
   prints `1000000000` and the arguments end with `max_connections=100`.

8. **First time only: account and limit.** In the Windows browser:
   - http://localhost:3000: sign up, then open the confirmation mail in Mailpit
     (http://localhost:8025) and click the link.
   - http://localhost:3004 (admin), Limits page: set "Project requests per window" to 100000.

   Both stay saved for later rounds, because the database keeps its data.

9. **Run the test.** Ubuntu window 2, in the same folder:

   ```sh
   ~/locust-venv/bin/python tests/load-locust/control_panel.py
   ```

   Open http://localhost:8090 in the Windows browser and fill in: Web app address
   `http://localhost:3000`, Gateway address `http://localhost:3002`, the email and password from
   step 8. Pick "Total capacity", tick the test-environment box, and press Run. Wait until the
   log ends with `--- finished ---` (up to about an hour with the default steps). The results are
   in `tests/load-locust/results/`, one folder per run.

10. **Stop Round A.** Press Ctrl+C in window 2 (control panel), then Ctrl+C in window 1 (app).
    Wait until window 1 shows the normal `$` prompt again; that means the app and the database
    container have stopped.

11. **Round B (2 CPUs, 150 connections).** In window 1, start the app again with the new size:

    ```sh
    POSTGRES_MODE=docker POSTGRES_DOCKER_CPUS=2 POSTGRES_DOCKER_MAX_CONNECTIONS=150 DB_VCPU=2 pnpm dev
    ```

    (If you closed the window, open Ubuntu, `cd` to the folder and type the `export` line from
    step 7 first.) The `docker inspect` check now prints `2000000000` and `max_connections=150`.
    Skip step 8, then repeat steps 9 and 10.

12. **See the results in Windows.** In Ubuntu: `explorer.exe tests/load-locust/results` opens
    the folder in Windows Explorer. Compare the two runs as described in [Comparing](#comparing).

Nothing needs deleting between rounds: no cache, no state file. Close other heavy programs on
the PC during both rounds, so each round gets the same machine.

Commands copied from a chat or a web page sometimes lose a `|` or a line break; if a command
fails in a strange way ("could not resolve host: sudo"), type it again by hand.

### Comparing

Put the two `summary.json` files side by side: `capacity_ok_per_second` is the healthy rate, and
`safe_per_minute_70pct` is the number to start the limits from. Close other heavy programs during
both rounds, so they get the same machine.

To go back to the normal local database, close the PowerShell window (the settings go with it) or
run `Remove-Item Env:POSTGRES_MODE, Env:POSTGRES_DOCKER_CPUS, Env:POSTGRES_DOCKER_MAX_CONNECTIONS, Env:DB_VCPU`.
