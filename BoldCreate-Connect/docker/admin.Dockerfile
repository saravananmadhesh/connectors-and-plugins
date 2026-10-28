# syntax=docker/dockerfile:1
FROM node:24-slim AS base
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
COPY packages/observability/package.json ./packages/observability/
COPY packages/ports/package.json ./packages/ports/
COPY packages/security/package.json ./packages/security/
COPY apps/admin/package.json ./apps/admin/
COPY apps/admin/client/package.json ./apps/admin/client/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build
COPY tsconfig.base.json tsconfig.json ./
COPY scripts/ ./scripts/
COPY packages/ ./packages/
COPY apps/admin/ ./apps/admin/
RUN pnpm --filter @boldcreate-integrations/admin-client... run build
RUN pnpm --filter @boldcreate-integrations/admin... run build
RUN mkdir -p /out/admin && \
    cp apps/admin/dist/package.json /out/admin/package.json && \
    cp -r apps/admin/dist /out/admin/dist && \
    cd /out/admin && npm install --omit=dev --no-audit --no-fund

FROM node:24-slim AS runner
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
