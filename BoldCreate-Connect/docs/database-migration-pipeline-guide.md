# Database Migration Pipelines & Multi-Environment Configuration

This document provides complete instructions for setting up, running, and maintaining the automated database migration pipeline across **Staging**, **Preproduction**, and **Production** environments in Azure DevOps.

---

## 1. Overview & Architecture

### Private Network In-Cluster Execution

Cloud SQL instances run on Google Cloud VPC private IPs (e.g. `10.210.160.14:5432`). External CI/CD hosted runners cannot reach this IP directly from the public internet.

The automated pipeline connects to the target Google Kubernetes Engine (GKE) cluster and creates a temporary Kubernetes Job (`boldcreate-migration-job`) inside the application namespace. Because GKE lives inside the same VPC network, it communicates directly with Cloud SQL over TLS.

```
┌─────────────────────────────────┐
│     Azure DevOps Pipeline       │
│     (Hosted Linux Agent)        │
└──────────────┬──────────────────┘
               │ 1. gcloud auth & get-credentials
               │ 2. pnpm run k8s:migration (generate manifest)
               │ 3. kubectl apply -f /tmp/migration-job.yaml
               ▼
┌─────────────────────────────────────────────────────────┐
│  GKE Cluster (dev-cody / prod-cody inside Google VPC)   │
│                                                         │
│  Namespace: boldcreate-stag / boldcreate-prod           │
│                                                         │
│  ┌─────────────────────────┐   Mounts /sql              │
│  │ ConfigMap:              │◄───────────────┐           │
│  │ boldcreate-migration-sql│                │           │
│  └─────────────────────────┘                │           │
│                                  ┌──────────┴────────┐  │
│                                  │ Kubernetes Job:   │  │
│                                  │ migration-job     │  │
│                                  └──────────┬────────┘  │
└─────────────────────────────────────────────┼───────────┘
                                              │ TLS via VPC Private IP
                                              ▼
                        ┌───────────────────────────────────┐
                        │    Google Cloud SQL PostgreSQL    │
                        │    10.210.160.14:5432             │
                        │                                   │
                        │    Tables: __applied_migrations   │
                        │    Roles:  app_migrator           │
                        │            app_api, app_gateway   │
                        │            app_admin, app_worker  │
                        └───────────────────────────────────┘
```

### Idempotent Journal Tracking (`__applied_migrations`)

The migration runner automatically creates and maintains a tracking table:

```sql
CREATE TABLE IF NOT EXISTS __applied_migrations (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  applied_at TIMESTAMPTZ DEFAULT NOW()
);
```

1. **Auto-Baseline Detection**:
   - If existing tables (`user`) are present, `0000_baseline.sql` is automatically recorded without re-running destructive statements.
   - If `partner_app` is already absent, `0001_remove_partner_apps.sql` is recorded as applied.
   - If `team` is already absent, `0002_remove_teams.sql` is recorded as applied.
2. **Sequential Delta Execution**:
   - Any new migration file (e.g. `0003_xxx.sql`) in `packages/db/migrations/` is executed within an isolated transaction (`BEGIN` ... `COMMIT`).
   - If any statement fails, the transaction rolls back (`ROLLBACK`) and the pipeline fails.
3. **Role Permission Enforcement**:
   - Re-applies permissions for all application service roles (`app_migrator`, `app_api`, `app_gateway`, `app_admin`, `app_worker`) after migrations finish.

---

## 2. Dedicated Database Roles & Credentials

As defined in `docs/database-roles-and-migrations.md`:

| Role Name      | Scope / Target                   | Staging Password      | Permissions                                                                    |
| -------------- | -------------------------------- | --------------------- | ------------------------------------------------------------------------------ |
| `app_migrator` | Database Migrations Runner       | `<MIGRATOR_PASSWORD>` | `USAGE, CREATE` on `schema public`, `ALL PRIVILEGES` on all tables & sequences |
| `app_api`      | API Service (`apps/api`)         | `<API_PASSWORD>`      | `SELECT, INSERT, UPDATE, DELETE` on tables, `USAGE, SELECT` on sequences       |
| `app_gateway`  | Gateway Service (`apps/gateway`) | `<GATEWAY_PASSWORD>`  | `SELECT, INSERT, UPDATE, DELETE` on tables, `BYPASSRLS`                        |
| `app_admin`    | Admin Service (`apps/admin`)     | `<ADMIN_PASSWORD>`    | `SELECT, INSERT, UPDATE, DELETE` on tables                                     |
| `app_worker`   | Worker Service (`apps/worker`)   | `<WORKER_PASSWORD>`   | `SELECT, INSERT, UPDATE, DELETE` on tables                                     |

### Connection String Format

```text
postgresql://app_migrator:<MIGRATOR_PASSWORD>@10.210.160.14:5432/postgres?sslmode=no-verify
```

---

## 3. Azure DevOps Pipeline Setup (Classic UI)

Create a new pipeline in Azure DevOps:
**Name**: `boldcreate-integrations-db-migration`

### Step A: Configure Pipeline Variables (Variables tab)

| Variable Name             | Default Value   | Settable at queue time? | Secret (Lock)? | Description                                                |
| ------------------------- | --------------- | ----------------------- | -------------- | ---------------------------------------------------------- |
| `ENVIRONMENT`             | `staging`       | **[x] Yes**             | No             | `staging`, `preproduction`, or `production`                |
| `API_BUILD_ID`            | `17722`         | **[x] Yes**             | No             | Container image build ID tag from your API CI build        |
| `GCP_SERVICE_ACCOUNT_KEY` | `{"type": ...}` | No                      | **[x] Yes**    | Google Cloud Service Account JSON key with GKE access      |
| `DATABASE_URL`            | _(optional)_    | No                      | **[x] Yes**    | Override database URL (leave empty to use default per env) |

---

### Step B: Pipeline Tasks

#### Task 1: Checkout Gitea Repository

- **Task**: `Syncfusion Gitea Checkout@1`
- **Gitea URL**: `https://gitea.syncfusion.com/Syncfusion-Code-Studio/boldcreate-integrations`
- **Branch**: `feat/cs-e5f6b9f2` (or your active release branch)

#### Task 2: Run Database Migration Job (Command Line / Bash Task)

- **Task**: `CmdLine@2` (or `Bash@3`)
- **Display name**: `Run Database Migration Job`

##### Environment Variables Mapping (Under Task > Environment Variables)

Expand the **Environment Variables** section of the task and map:

- `ENVIRONMENT`: `$(ENVIRONMENT)`
- `API_BUILD_ID`: `$(API_BUILD_ID)`
- `GCP_SERVICE_ACCOUNT_KEY`: `$(GCP_SERVICE_ACCOUNT_KEY)`
- `DATABASE_URL`: `$(DATABASE_URL)`

##### Script Content

```bash
set -e

TARGET_ENV="${ENVIRONMENT:-staging}"
BUILD_ID="${API_BUILD_ID}"

echo "============================================="
echo "Target Environment : $TARGET_ENV"
echo "API Build ID       : $BUILD_ID"
echo "============================================="

# 1. Validate inputs
if [ -z "$BUILD_ID" ]; then
  echo "ERROR: API_BUILD_ID is required. Please provide the image build ID (e.g. 17722)."
  exit 1
fi

if [ -z "$GCP_SERVICE_ACCOUNT_KEY" ]; then
  echo "ERROR: GCP_SERVICE_ACCOUNT_KEY is empty. Please ensure it is mapped under Environment Variables."
  exit 1
fi

# 2. Authenticate with Google Cloud
printf '%s' "$GCP_SERVICE_ACCOUNT_KEY" > /tmp/gcp-sa-key.json
gcloud auth activate-service-account --key-file=/tmp/gcp-sa-key.json
rm -f /tmp/gcp-sa-key.json

# 3. Ensure gke-gcloud-auth-plugin is available
if ! command -v gke-gcloud-auth-plugin &> /dev/null; then
  echo "Installing gke-gcloud-auth-plugin..."
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg --yes
  sudo apt-get update -y
  sudo apt-get install -y google-cloud-cli-gke-gcloud-auth-plugin || sudo apt-get install -y google-cloud-sdk-gke-gcloud-auth-plugin
fi

export USE_GKE_GCLOUD_AUTH_PLUGIN=True

# 4. Connect to GKE Cluster
gcloud container clusters get-credentials dev-cody --zone us-central1-a --project codestudio-dev

# 5. Setup Node & pnpm
corepack enable
corepack prepare pnpm@10.34.6 --activate
pnpm install --frozen-lockfile

# 6. Dynamically resolve Namespace and Artifact Registry Image URL
if [ "$TARGET_ENV" = "production" ]; then
  NAMESPACE="boldcreate-prod"
  IMAGE_NAME="boldcreate-prod-integrations-api"
elif [ "$TARGET_ENV" = "preproduction" ]; then
  NAMESPACE="boldcreate-preprod"
  IMAGE_NAME="boldcreate-preprod-integrations-api"
else
  NAMESPACE="boldcreate-stag"
  IMAGE_NAME="boldcreate-staging-integrations-api"
fi

MIGRATOR_IMAGE="us-central1-docker.pkg.dev/codestudio-dev/synccodestudio/${IMAGE_NAME}:${BUILD_ID}"

echo "Target Namespace   : $NAMESPACE"
echo "Migrator Image     : $MIGRATOR_IMAGE"

# 7. Clean up any previous migration job
kubectl delete job boldcreate-migration-job -n "$NAMESPACE" --ignore-not-found=true

# 8. Generate dynamic Kubernetes migration manifest
CMD="pnpm run k8s:migration -- --env $TARGET_ENV --namespace $NAMESPACE --image $MIGRATOR_IMAGE --out /tmp/migration-job.yaml"
if [ -n "$DATABASE_URL" ]; then
  CMD="$CMD --database-url $DATABASE_URL"
fi

eval "$CMD"

# 9. Apply the ConfigMap and Job to GKE
kubectl apply -f /tmp/migration-job.yaml

# 10. Wait for pod creation and stream live logs
sleep 4
POD_NAME=$(kubectl get pods -n "$NAMESPACE" --selector=job-name=boldcreate-migration-job -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || true)
echo "Active Migration Pod: $POD_NAME"

echo "=== Streaming Migration Logs ==="
if [ -n "$POD_NAME" ]; then
  kubectl logs -f "$POD_NAME" -n "$NAMESPACE" -c migrator || true
fi

# 11. Wait for completion and verify exit code
echo "=== Migration Job Status ==="
kubectl get job boldcreate-migration-job -n "$NAMESPACE"

kubectl wait --for=condition=complete --timeout=120s job/boldcreate-migration-job -n "$NAMESPACE"
JOB_STATUS=$?

# Print last logs if needed
if [ -n "$POD_NAME" ]; then
  echo "=== Last Log Output ==="
  kubectl logs "$POD_NAME" -n "$NAMESPACE" -c migrator --tail=50 || true
fi

# 12. Clean up Job resource
kubectl delete job boldcreate-migration-job -n "$NAMESPACE"

if [ $JOB_STATUS -ne 0 ]; then
  echo "Migration failed!"
  exit 1
fi

echo "============================================="
echo "Migration finished successfully!"
echo "============================================="
```

---

## 4. How to Queue and Run a Migration

1. In Azure DevOps, go to **Pipelines** → **boldcreate-integrations-db-migration**.
2. Click **Run pipeline**.
3. In the runtime parameters dialog:
   - **`ENVIRONMENT`**: choose `staging` (or `preproduction` / `production`).
   - **`API_BUILD_ID`**: enter the build tag of your API Docker image (e.g. `17722`).
4. Click **Run**.
5. The pipeline will:
   - Authenticate to GCP.
   - Connect to GKE.
   - Assemble all `.sql` files from `packages/db/migrations/` into a Kubernetes ConfigMap.
   - Launch the in-cluster migration job.
   - Stream the execution logs to the Azure DevOps console in real time.
   - Verify completion and clean up the finished Job.

### Expected Console Output

```text
Connecting to database...
Connected successfully!
Ensuring __applied_migrations table exists...
[RECORD] partner_app table already absent; recording 0001_remove_partner_apps.sql as applied.
[RECORD] team table already absent; recording 0002_remove_teams.sql as applied.
Found migration files: [ '0000_baseline.sql', '0001_remove_partner_apps.sql', '0002_remove_teams.sql' ]
[SKIP] Already applied: 0000_baseline.sql
[SKIP] Already applied: 0001_remove_partner_apps.sql
[SKIP] Already applied: 0002_remove_teams.sql
Ensuring database role grants...
All migrations and permissions verified successfully!
NAME                       STATUS     COMPLETIONS   DURATION   AGE
boldcreate-migration-job   Complete   1/1           4s         10s
```

---

## 5. Adding New Database Migrations in the Future

When adding a schema change in the codebase:

1. Generate the migration file using Drizzle:
   ```bash
   pnpm db:generate
   ```
   This creates the next numbered migration file (e.g. `packages/db/migrations/0003_add_new_feature.sql`).
2. Commit and push your changes to your branch.
3. Build and deploy your API image via your CI/CD pipeline.
4. Run the **`boldcreate-integrations-db-migration`** pipeline with the new build ID.
5. The generator (`scripts/generate-migration-manifest.ts`) will automatically detect `0003_add_new_feature.sql`, execute it transactionally, record it in `__applied_migrations`, and re-apply service role permissions.
6. Existing historical migrations (`0000`, `0001`, `0002`) will be automatically skipped without touching existing data.

---

## 6. Future Multi-Project Production Setup (When Ready)

When you are ready to configure the production environment in a different GCP project:

1. **Create the Production Service Account**:
   - Create a service account in your production GCP project with `Kubernetes Engine Developer` (or `Kubernetes Engine Admin`) role.
   - Export its JSON key and add it to Azure DevOps as `GCP_SA_KEY_PROD`.
2. **Create Database Roles in Production Cloud SQL**:
   - Run the role creation and permission script from `docs/database-roles-and-migrations.md` on the production Cloud SQL instance.
   - Create the production connection string:
     ```text
     postgresql://app_migrator:<prod_password>@<prod_private_ip>:5432/postgres?sslmode=no-verify
     ```
   - Store it as secret variable `DATABASE_URL_PROD` in Azure DevOps.
3. **Switch to `scripts/run-k8s-migration.sh`**:
   Replace the inline script in your Azure DevOps pipeline with:
   ```bash
   chmod +x scripts/run-k8s-migration.sh
   ./scripts/run-k8s-migration.sh
   ```
   and provide:
   - `GCP_PROJECT_PROD`: your production GCP project ID
   - `GKE_CLUSTER_PROD`: your production GKE cluster name
   - `GKE_LOCATION_PROD`: `--region us-central1` (or your production zone/region)
