#!/usr/bin/env bash
set -e

# ==============================================================================
# BoldCreate Integrations - Multi-Environment Database Migration Runner
# Executes in-cluster Kubernetes migration job across staging/preprod/production.
# ==============================================================================

TARGET_ENV="${ENVIRONMENT:-staging}"
BUILD_ID="${API_BUILD_ID}"

echo "============================================================"
echo "Target Environment : $TARGET_ENV"
echo "API Build ID       : $BUILD_ID"
echo "============================================================"

if [ -z "$BUILD_ID" ]; then
  echo "ERROR: API_BUILD_ID is required."
  exit 1
fi

# ------------------------------------------------------------------------------
# 1. Environment & Cluster Configuration Mapping
# ------------------------------------------------------------------------------
if [ "$TARGET_ENV" = "production" ]; then
  GCP_PROJECT="${GCP_PROJECT_PROD:-${GCP_PROJECT:-codestudio-prod}}"
  GKE_CLUSTER="${GKE_CLUSTER_PROD:-${GKE_CLUSTER:-prod-cody}}"
  GKE_LOCATION="${GKE_LOCATION_PROD:-${GKE_LOCATION:---region us-central1}}"
  NAMESPACE="${NAMESPACE_PROD:-${NAMESPACE:-boldcreate-prod}}"
  IMAGE_PROJECT="${IMAGE_PROJECT_PROD:-${IMAGE_PROJECT:-$GCP_PROJECT}}"
  IMAGE_NAME="${IMAGE_NAME_PROD:-boldcreate-prod-integrations-api}"
  SA_KEY="${GCP_SA_KEY_PROD:-${GCP_SERVICE_ACCOUNT_KEY}}"
  DB_URL="${DATABASE_URL_PROD:-${DATABASE_URL}}"

elif [ "$TARGET_ENV" = "preproduction" ]; then
  GCP_PROJECT="${GCP_PROJECT_PREPROD:-${GCP_PROJECT:-codestudio-dev}}"
  GKE_CLUSTER="${GKE_CLUSTER_PREPROD:-${GKE_CLUSTER:-preprod-cody}}"
  GKE_LOCATION="${GKE_LOCATION_PREPROD:-${GKE_LOCATION:---zone us-central1-a}}"
  NAMESPACE="${NAMESPACE_PREPROD:-${NAMESPACE:-boldcreate-preprod}}"
  IMAGE_PROJECT="${IMAGE_PROJECT_PREPROD:-${IMAGE_PROJECT:-codestudio-dev}}"
  IMAGE_NAME="${IMAGE_NAME_PREPROD:-boldcreate-preprod-integrations-api}"
  SA_KEY="${GCP_SA_KEY_PREPROD:-${GCP_SERVICE_ACCOUNT_KEY}}"
  DB_URL="${DATABASE_URL_PREPROD:-${DATABASE_URL}}"

else
  # Default: Staging
  GCP_PROJECT="${GCP_PROJECT_STAGING:-${GCP_PROJECT:-codestudio-dev}}"
  GKE_CLUSTER="${GKE_CLUSTER_STAGING:-${GKE_CLUSTER:-dev-cody}}"
  GKE_LOCATION="${GKE_LOCATION_STAGING:-${GKE_LOCATION:---zone us-central1-a}}"
  NAMESPACE="${NAMESPACE_STAGING:-${NAMESPACE:-boldcreate-stag}}"
  IMAGE_PROJECT="${IMAGE_PROJECT_STAGING:-${IMAGE_PROJECT:-codestudio-dev}}"
  IMAGE_NAME="${IMAGE_NAME_STAGING:-boldcreate-staging-integrations-api}"
  SA_KEY="${GCP_SA_KEY_STAGING:-${GCP_SERVICE_ACCOUNT_KEY}}"
  DB_URL="${DATABASE_URL_STAGING:-${DATABASE_URL}}"
fi

MIGRATOR_IMAGE="us-central1-docker.pkg.dev/${IMAGE_PROJECT}/synccodestudio/${IMAGE_NAME}:${BUILD_ID}"

echo "Target GCP Project : $GCP_PROJECT"
echo "Target GKE Cluster : $GKE_CLUSTER"
echo "Target Namespace   : $NAMESPACE"
echo "Migrator Image     : $MIGRATOR_IMAGE"
echo "============================================================"

# ------------------------------------------------------------------------------
# 2. Authenticate to Google Cloud
# ------------------------------------------------------------------------------
if [ -z "$SA_KEY" ]; then
  echo "ERROR: GCP Service Account key is empty for environment $TARGET_ENV."
  exit 1
fi

printf '%s' "$SA_KEY" > /tmp/gcp-sa-key.json
gcloud auth activate-service-account --key-file=/tmp/gcp-sa-key.json
rm -f /tmp/gcp-sa-key.json
gcloud config set project "$GCP_PROJECT"

# ------------------------------------------------------------------------------
# 3. Ensure GKE Auth Plugin is Installed
# ------------------------------------------------------------------------------
if ! command -v gke-gcloud-auth-plugin &> /dev/null; then
  echo "Installing gke-gcloud-auth-plugin..."
  if ! gcloud components install gke-gcloud-auth-plugin --quiet 2>/dev/null; then
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
    curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg --yes
    sudo apt-get update -y
    sudo apt-get install -y google-cloud-cli-gke-gcloud-auth-plugin || sudo apt-get install -y google-cloud-sdk-gke-gcloud-auth-plugin
  fi
fi

export USE_GKE_GCLOUD_AUTH_PLUGIN=True

# ------------------------------------------------------------------------------
# 4. Connect to Target GKE Cluster
# ------------------------------------------------------------------------------
echo "Connecting to cluster $GKE_CLUSTER in project $GCP_PROJECT..."
# shellcheck disable=SC2086
gcloud container clusters get-credentials "$GKE_CLUSTER" $GKE_LOCATION --project "$GCP_PROJECT"

# ------------------------------------------------------------------------------
# 5. Setup Node & pnpm
# ------------------------------------------------------------------------------
corepack enable
corepack prepare pnpm@10.34.6 --activate
pnpm install --frozen-lockfile

# ------------------------------------------------------------------------------
# 6. Clean up Previous Migration Job (if any)
# ------------------------------------------------------------------------------
kubectl delete job boldcreate-migration-job -n "$NAMESPACE" --ignore-not-found=true

# ------------------------------------------------------------------------------
# 7. Generate Dynamic Migration Manifest
# ------------------------------------------------------------------------------
CMD="pnpm run k8s:migration -- --env $TARGET_ENV --namespace $NAMESPACE --image $MIGRATOR_IMAGE --out /tmp/migration-job.yaml"
if [ -n "$DB_URL" ]; then
  CMD="$CMD --database-url $DB_URL"
fi

eval "$CMD"

# ------------------------------------------------------------------------------
# 8. Apply Manifest and Execute In-Cluster Migration
# ------------------------------------------------------------------------------
kubectl apply -f /tmp/migration-job.yaml

sleep 4
POD_NAME=$(kubectl get pods -n "$NAMESPACE" --selector=job-name=boldcreate-migration-job -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || true)
echo "Active Migration Pod: $POD_NAME"

echo "=== Streaming Migration Logs ==="
if [ -n "$POD_NAME" ]; then
  kubectl logs -f "$POD_NAME" -n "$NAMESPACE" -c migrator || true
fi

# ------------------------------------------------------------------------------
# 9. Verify Completion & Cleanup
# ------------------------------------------------------------------------------
echo "=== Waiting for Job Completion ==="
kubectl wait --for=condition=complete --timeout=180s job/boldcreate-migration-job -n "$NAMESPACE"
JOB_STATUS=$?

kubectl delete job boldcreate-migration-job -n "$NAMESPACE"

if [ $JOB_STATUS -ne 0 ]; then
  echo "Migration failed!"
  exit 1
fi

echo "============================================================"
echo "Migration finished successfully on $TARGET_ENV!"
echo "============================================================"
