# Production Deployment & Migration Runbook

Comprehensive reference for the production infrastructure, database roles, schema migrations, and service deployment in Google Cloud Platform (GCP) and Google Kubernetes Engine (GKE).

---

## 1. Environment & Architecture Overview

| Parameter                | Production Value                                                                                    |
| :----------------------- | :-------------------------------------------------------------------------------------------------- |
| **Cluster Platform**     | Google Kubernetes Engine (GKE) Autopilot                                                            |
| **GCP Cluster Name**     | `syncfusion-cody-cluster`                                                                           |
| **GCP Region / Zone**    | `us-east4` (`us-east4-a`, `us-east4-b`, `us-east4-c`)                                               |
| **Kubernetes Namespace** | `boldcreate-prod`                                                                                   |
| **Ingress Controller**   | GCE Ingress (`kubernetes.io/ingress.class: gce`) with Container-Native Load Balancing (NEGs)        |
| **Database**             | Google Cloud SQL for PostgreSQL (Private IP VPC peered, TLS required)                               |
| **Cache & Pub/Sub**      | High-Availability Redis Sentinel (`mymaster`, 3 headless sentinel nodes on port 26379)              |
| **Artifact Storage**     | Google Cloud Storage (Bucket: `boldcreate-production-integrations-artifacts` via Workload Identity) |

---

## 2. Database Role Hierarchy & Privilege Model

In accordance with least-privilege security architecture, five distinct application roles operate within the production database:

| Role Name          | Purpose                                                            | Connection Limit | Permissions & Scope                                                                         |
| :----------------- | :----------------------------------------------------------------- | :--------------: | :------------------------------------------------------------------------------------------ |
| **`app_migrator`** | Schema migrations & DDL operations                                 |        5         | Owns tables/sequences; `CREATE, USAGE` on schema `public`. Runs only during migration jobs. |
| **`app_api`**      | Core API service (`boldcreate-integrations-api`)                   |        40        | DML access (`SELECT, INSERT, UPDATE, DELETE`) on application tables.                        |
| **`app_gateway`**  | Low-latency MCP Gateway (`boldcreate-integrations-gateway`)        |        40        | DML access (`SELECT, INSERT, UPDATE, DELETE`) on session, MCP, and credentials tables.      |
| **`app_admin`**    | Back-office Admin service (`boldcreate-integrations-admin`)        |        10        | DML access (`SELECT, INSERT, UPDATE, DELETE`) on administrative models.                     |
| **`app_worker`**   | Outbox processor & async worker (`boldcreate-integrations-worker`) |        20        | DML access (`SELECT, INSERT, UPDATE, DELETE`) for outbox dispatching and async operations.  |

### Role Initialization & Privilege Grant Template

The following SQL establishes the roles and sets up default privileges for future objects:

```sql
-- 1. Create application roles if they do not exist
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_migrator') THEN CREATE ROLE "app_migrator"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_api') THEN CREATE ROLE "app_api"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_gateway') THEN CREATE ROLE "app_gateway"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_admin') THEN CREATE ROLE "app_admin"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_worker') THEN CREATE ROLE "app_worker"; END IF;
END $$;

-- 2. Configure connection limits and login capabilities
ALTER ROLE "app_migrator" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 5 PASSWORD '<MIGRATOR_PASSWORD>';
ALTER ROLE "app_api" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 40 PASSWORD '<API_PASSWORD>';
ALTER ROLE "app_gateway" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 40 PASSWORD '<GATEWAY_PASSWORD>';
ALTER ROLE "app_admin" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 10 PASSWORD '<ADMIN_PASSWORD>';
ALTER ROLE "app_worker" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 20 PASSWORD '<WORKER_PASSWORD>';

-- 3. Schema usage and object privileges
GRANT USAGE, CREATE ON SCHEMA public TO "app_migrator";
GRANT USAGE ON SCHEMA public TO "app_api", "app_gateway", "app_admin", "app_worker";

-- 4. Default privileges for new tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "app_api", "app_gateway", "app_admin", "app_worker";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO "app_api", "app_gateway", "app_admin", "app_worker";
```

---

## 3. Database Schema Migrations

Production schema migrations are tracked in `public.__applied_migrations` and executed via an isolated Kubernetes Job.

### Applied Migration Sequence

1. **`0000_baseline.sql`**:
   - Creates core tables: `organizations`, `users`, `components`, `component_credentials`, `mcp_servers`, `mcp_tools`, `api_tokens`, `audit_logs`, `outbox`, `rate_limits`.
   - Configures indexes and constraints.
   - Enables Row-Level Security (RLS) on all multi-tenant tables.
2. **`0001_remove_partner_apps.sql`**:
   - Removes deprecated partner application tables and references.
3. **`0002_remove_teams.sql`**:
   - Consolidates tenant membership under organizations and removes obsolete team entities.

### Migration Job Generation & Execution

Generate and apply the job manifest targeting production:

```bash
# Generate manifest using repository generator
npx --yes tsx scripts/generate-migration-manifest.ts \
  --env production \
  --namespace boldcreate-prod \
  --image "<DEPLOYED_API_IMAGE_TAG>" \
  --service-account "boldcreate-integrations-api-production" \
  --database-url "postgresql://app_migrator:<PASSWORD>@<PRIVATE_DB_IP>:5432/postgres?sslmode=require" \
  --out migration-production-job.yaml

# Apply to cluster
kubectl apply -f migration-production-job.yaml

# Stream execution logs
kubectl logs -n boldcreate-prod job/boldcreate-migration-job -f

# Clean up job upon completion
kubectl delete job boldcreate-migration-job -n boldcreate-prod
kubectl delete configmap boldcreate-migration-sql -n boldcreate-prod
```

---

## 4. Production Service Layout & Ports

| Service Name  | Pod Port | Service Port | Probes Configured                             | Role & Dependencies                                                            |
| :------------ | :------: | :----------: | :-------------------------------------------- | :----------------------------------------------------------------------------- |
| **`web`**     |   3000   |      80      | Startup, Liveness, Readiness on `/healthz`    | Frontend UI & BFF proxy. Connects to `api` and `gateway`.                      |
| **`api`**     |   3001   |     3001     | Startup on `/healthz`; Readiness on `/readyz` | Core REST API. Connects to PostgreSQL (`app_api`), Redis Sentinel, and GCS.    |
| **`gateway`** |   3002   |     3002     | Startup on `/healthz`; Readiness on `/readyz` | MCP Gateway. Connects to PostgreSQL (`app_gateway`) and Redis Sentinel.        |
| **`admin`**   |   3004   |     3004     | Startup on `/healthz`; Readiness on `/readyz` | Admin Portal. Connects to PostgreSQL (`app_admin`) and `api`.                  |
| **`worker`**  |   N/A    |     N/A      | Liveness on `/healthz`                        | Asynchronous worker. Connects to PostgreSQL (`app_worker`) and Redis Sentinel. |

---

## 5. Ingress & Google Cloud Load Balancer (GCE)

All external traffic routes through GCE HTTP(S) Load Balancer using Google Cloud Serverless/Zonal NEGs (`cloud.google.com/neg: '{"ingress": true}'`).

### Domain Mappings

| Domain Name                     | Target Service                               |   Backend Port   | BackendConfig Health Check Path |
| :------------------------------ | :------------------------------------------- | :--------------: | :------------------------------ |
| `boldcreate.ai`                 | `boldcreate-integrations-web-production`     | 80 (target 3000) | `/healthz` (Port 3000)          |
| `api.boldcreate.ai`             | `boldcreate-integrations-api-production`     |       3001       | `/healthz` (Port 3001)          |
| `connect-gateway.boldcreate.ai` | `boldcreate-integrations-gateway-production` |       3002       | `/healthz` (Port 3002)          |
| `admin.boldcreate.ai`           | `boldcreate-integrations-admin-production`   |       3004       | `/healthz` (Port 3004)          |

### BackendConfig Synchronization Note

The `BackendConfig` must specify the container's listening port for health checks (e.g., port `3004` for `admin`). The service annotation must match the exact resource name:

```yaml
annotations:
  beta.cloud.google.com/backend-config: '{"default": "boldcreate-integrations-admin-backend-production"}'
```

---

## 6. Verification & Health Monitoring

### Ingress Status

```bash
kubectl get ingress -n boldcreate-prod
```

Ensure all targets report `HEALTHY` and display assigned external VIPs.

### Pod Status

```bash
kubectl get pods -n boldcreate-prod -o wide
```

All application pods should report status `Running` with readiness `1/1`.

### Local Port-Forwarding Verification

Before propagating DNS records, services can be validated locally:

```bash
# Forward Web UI
kubectl port-forward svc/boldcreate-integrations-web-production 3000:80 -n boldcreate-prod

# Forward Admin UI
kubectl port-forward svc/boldcreate-integrations-admin-production 3004:3004 -n boldcreate-prod

# Forward Core API
kubectl port-forward svc/boldcreate-integrations-api-production 3001:3001 -n boldcreate-prod

# Forward Gateway
kubectl port-forward svc/boldcreate-integrations-gateway-production 3002:3002 -n boldcreate-prod
```

### Rolling Restarts

To perform a graceful rolling restart across all production components:

```bash
kubectl rollout restart deployment -n boldcreate-prod \
  boldcreate-integrations-api-production \
  boldcreate-integrations-gateway-production \
  boldcreate-integrations-admin-production \
  boldcreate-integrations-worker-production \
  boldcreate-integrations-web-production
```
