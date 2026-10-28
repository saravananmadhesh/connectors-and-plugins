# syntax=docker/dockerfile:1
# One image per app: build with --target <app> (api, gateway, worker, web, admin).

# Pinned by digest so a rebuild never picks up a different base. Update on purpose (docs/guides/deployment.md).
ARG NODE_IMAGE=node:24-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205

FROM ${NODE_IMAGE} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.34.6 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/adapters/package.json ./packages/adapters/
COPY packages/config/package.json ./packages/config/
COPY packages/contracts/package.json ./packages/contracts/
COPY packages/credentials/package.json ./packages/credentials/
COPY packages/db/package.json ./packages/db/
COPY packages/domain/package.json ./packages/domain/
COPY packages/http-server/package.json ./packages/http-server/
COPY packages/limits/package.json ./packages/limits/
COPY packages/sdk/package.json ./packages/sdk/
COPY packages/observability/package.json ./packages/observability/
COPY packages/ports/package.json ./packages/ports/
COPY packages/security/package.json ./packages/security/
COPY apps/admin/package.json ./apps/admin/
COPY apps/api/package.json ./apps/api/
COPY apps/gateway/package.json ./apps/gateway/
COPY apps/worker/package.json ./apps/worker/
COPY apps/web/server/package.json ./apps/web/server/
COPY apps/web/client/package.json ./apps/web/client/
COPY apps/admin/client/package.json ./apps/admin/client/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build
COPY tsconfig.base.json tsconfig.json ./
COPY scripts/ ./scripts/
COPY packages/ ./packages/
COPY apps/ ./apps/
RUN pnpm run build
RUN pnpm --filter @boldcreate-integrations/admin deploy --legacy --prod /out/admin
RUN pnpm --filter @boldcreate-integrations/api deploy --legacy --prod /out/api
RUN pnpm --filter @boldcreate-integrations/gateway deploy --legacy --prod /out/gateway
RUN pnpm --filter @boldcreate-integrations/worker deploy --legacy --prod /out/worker
RUN pnpm --filter @boldcreate-integrations/web-server deploy --legacy --prod /out/web

FROM ${NODE_IMAGE} AS admin
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /out/admin ./
COPY --from=build --chown=node:node /app/apps/admin/client/dist ./client-dist
ENV CLIENT_DIST_DIR=/app/client-dist
USER node
EXPOSE 3004
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT ?? 3004}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]

FROM ${NODE_IMAGE} AS api
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /out/api ./
USER node
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT ?? 3001}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]

FROM ${NODE_IMAGE} AS gateway
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /out/gateway ./
USER node
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT ?? 3002}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]

FROM ${NODE_IMAGE} AS worker
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /out/worker ./
USER node
EXPOSE 3005
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.HEALTH_PORT ?? 3005}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]

FROM ${NODE_IMAGE} AS web
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /out/web ./
COPY --from=build --chown=node:node /app/apps/web/client/dist ./client-dist
ENV CLIENT_DIST_DIR=/app/client-dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT ?? 3000}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]
