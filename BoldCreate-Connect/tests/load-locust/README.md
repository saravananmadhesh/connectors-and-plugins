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
