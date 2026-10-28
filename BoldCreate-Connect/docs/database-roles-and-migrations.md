# Database Roles, Grants, and Migration Architecture Guide

This document details the database access model, PostgreSQL role creation procedure, permission grant scripts, and migration workflows for the **BoldCreate Integrations** platform across environments.

---

## 1. Security Architecture & Role Isolation

The platform enforces a **Least-Privilege + Row-Level Security (RLS)** model. Rather than sharing a single superuser across services, each application service connects to PostgreSQL through a dedicated database role with strictly scoped privileges and connection pool limits:

| Database Role      | Target Service                    | Permissions & Scope                                                                                                                                                  | Connection Limit |
| ------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **`app_migrator`** | Database Migration Runner         | Owns all tables, indexes, and sequences. Runs DDL schema migrations.                                                                                                 | 5                |
| **`app_api`**      | `boldcreate-integrations-api`     | Has DML access to application tables (`user`, `organization`, `membership`, `project`, `plugin`, `installation`, etc.). Enforces Row-Level Security (`NOBYPASSRLS`). | 40               |
| **`app_gateway`**  | `boldcreate-integrations-gateway` | High-throughput MCP proxy. Bypasses RLS (`BYPASSRLS`) to perform low-latency cross-organization API key validation and session lookups.                              | 40               |
| **`app_admin`**    | `boldcreate-integrations-admin`   | Admin back-office service. Can read and write plugins, versions, categories, and audit logs. Restricted from personal user sessions.                                 | 10               |
| **`app_worker`**   | `boldcreate-integrations-worker`  | Background event runner. Processes the `outbox` queue, delivers outgoing webhooks, and manages email events.                                                         | 20               |

---

## 2. PostgreSQL Role Creation Procedure

Because managed database providers (such as Google Cloud SQL) do not grant raw `SUPERUSER` privileges to standard admin users, explicit `NOSUPERUSER` and `BYPASSRLS` flags are omitted during role creation to avoid permission errors (`42501`).

Execute the following SQL block connected as the database administrator (`postgres`) against the target database (`postgres`):

```sql
-- 1. Create application roles if they do not exist
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_migrator') THEN CREATE ROLE "app_migrator"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_api') THEN CREATE ROLE "app_api"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_gateway') THEN CREATE ROLE "app_gateway"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_admin') THEN CREATE ROLE "app_admin"; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_worker') THEN CREATE ROLE "app_worker"; END IF;
END $$;

-- 2. Configure login attributes, connection limits, and passwords
-- (Replace <PASSWORD_*> placeholders with strong, secret credentials from your secret manager)
ALTER ROLE "app_migrator" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 5 PASSWORD '<PASSWORD_MIGRATOR>';
ALTER ROLE "app_api" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 40 PASSWORD '<PASSWORD_API>';
ALTER ROLE "app_gateway" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 40 PASSWORD '<PASSWORD_GATEWAY>';
ALTER ROLE "app_admin" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 10 PASSWORD '<PASSWORD_ADMIN>';
ALTER ROLE "app_worker" WITH LOGIN NOINHERIT NOCREATEDB NOCREATEROLE CONNECTION LIMIT 20 PASSWORD '<PASSWORD_WORKER>';

-- 3. Grant schema permissions
GRANT USAGE, CREATE ON SCHEMA public TO "app_migrator";
GRANT USAGE ON SCHEMA public TO "app_api", "app_gateway", "app_admin", "app_worker";
```

---

## 3. Table and Sequence Permission Grants

After the schema tables are created by migrations, the following permissions must be applied so each application role can read and write to the tables in the `public` schema:

```sql
-- Grant full privileges to the migration runner
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "app_migrator";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "app_migrator";

-- Grant DML privileges to application services
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "app_api", "app_gateway", "app_admin", "app_worker";
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO "app_api", "app_gateway", "app_admin", "app_worker";

-- Automatically grant permissions on future tables and sequences created in public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "app_api", "app_gateway", "app_admin", "app_worker";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO "app_api", "app_gateway", "app_admin", "app_worker";
```

---

## 4. Migration Scripts & Schema Evolution

Database schema migrations are located under `packages/db/migrations/` and executed in sequential order:

1. **`0000_baseline.sql`**:
   - Creates the baseline table schema: `"user"`, `"organization"`, `"membership"`, `"project"`, `"project_key"`, `"plugin"`, `"plugin_version"`, `"outbox"`, `"session"`, `"audit_event"`, etc.
   - Enables Row-Level Security (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`) on sensitive data tables.
2. **`0001_remove_partner_apps.sql`**:
   - Drops legacy partner console tables (`partner_app`, `partner_app_member`, `partner_app_key`) and associated policies.
   - Cleans up legacy foreign key constraints and columns.
3. **`0002_remove_teams.sql`**:
   - Drops legacy team tables (`team`, `team_member`).
   - Migrates installation and API key scopes from `team` to `org`, `user`, and `project`.

---

## 5. In-Cluster Kubernetes Migration Procedure

When running in restricted cloud environments (such as private Google Cloud SQL with no public IP exposure), migrations are generated dynamically and applied inside the private GKE network via `scripts/generate-migration-manifest.ts` (or the automated Azure DevOps pipeline documented in `docs/database-migration-pipeline-guide.md`).

### Architecture of the Migration Job:

- Runs inside the target namespace (e.g., `boldcreate-stag`, `boldcreate-preprod`, `boldcreate-prod`).
- Dynamically gathers all migration SQL files from `packages/db/migrations/` into a ConfigMap.
- Connects directly over the VPC private IP to port `5432`.
- Enforces SSL/TLS with `sslmode=no-verify` and `NODE_TLS_REJECT_UNAUTHORIZED: "0"` to complete handshakes with Cloud SQL's internal certificate.
- Applies pending delta migrations (`0001_remove_partner_apps.sql`, `0002_remove_teams.sql`, etc.) and re-applies role grants.

### Execution Command (Manual Generator):

```bash
# Generate manifest dynamically for staging:
pnpm run k8s:migration -- --env staging --image <CURRENT_IMAGE_TAG> --out /tmp/migration-job.yaml

# Apply and follow migration progress:
kubectl apply -f /tmp/migration-job.yaml
kubectl logs -n boldcreate-stag job/boldcreate-migration-job -f

# Once complete, delete the temporary job:
kubectl delete job boldcreate-migration-job -n boldcreate-stag
```

---

## 6. Service Connection String Reference Template

Services consume their respective roles via `DATABASE_URL` environment variables stored in Kubernetes Secrets:

| Service      | Connection String Template                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------- |
| **API**      | `postgresql://app_api:<PASSWORD>@<PRIVATE_DB_HOST>:5432/<DATABASE_NAME>?sslmode=no-verify`      |
| **Gateway**  | `postgresql://app_gateway:<PASSWORD>@<PRIVATE_DB_HOST>:5432/<DATABASE_NAME>?sslmode=no-verify`  |
| **Admin**    | `postgresql://app_admin:<PASSWORD>@<PRIVATE_DB_HOST>:5432/<DATABASE_NAME>?sslmode=no-verify`    |
| **Worker**   | `postgresql://app_worker:<PASSWORD>@<PRIVATE_DB_HOST>:5432/<DATABASE_NAME>?sslmode=no-verify`   |
| **Migrator** | `postgresql://app_migrator:<PASSWORD>@<PRIVATE_DB_HOST>:5432/<DATABASE_NAME>?sslmode=no-verify` |

> **Note on Special Characters**: If passwords contain special symbols (such as `%`, `&`, `"`, `'`, or `:`), they must be properly URL-encoded (e.g., `%25` for `%`, `%27` for `'`, `%22` for `"`) to ensure accurate parsing by PostgreSQL client drivers.
