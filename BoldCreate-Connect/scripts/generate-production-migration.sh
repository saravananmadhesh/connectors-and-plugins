#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="${NAMESPACE:-boldcreate-prod}"
OUT_FILE="${1:-k8s/migration-production-job.yaml}"

echo "Generating migration manifest for production into ${OUT_FILE}..."
npx --yes tsx scripts/generate-migration-manifest.ts \
  --env production \
  --namespace "${NAMESPACE}" \
  --database-url-secret "${DATABASE_URL_SECRET_NAME:-boldcreate-integrations-api-secrets-production}" \
  --database-url-key "${DATABASE_URL_SECRET_KEY:-DATABASE_URL}" \
  --out "${OUT_FILE}"

echo "Done. Apply to cluster with:"
echo "  kubectl apply -f ${OUT_FILE}"
echo "  kubectl logs -n ${NAMESPACE} job/boldcreate-migration-job -f"
