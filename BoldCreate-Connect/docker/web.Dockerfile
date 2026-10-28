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
COPY apps/web/server/package.json ./apps/web/server/
COPY apps/web/client/package.json ./apps/web/client/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build
COPY tsconfig.base.json tsconfig.json ./
COPY scripts/ ./scripts/
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/
RUN pnpm --filter @boldcreate-integrations/web-client... run build
RUN pnpm --filter @boldcreate-integrations/web-server... run build
RUN mkdir -p /out/web && \
    cp apps/web/server/dist/package.json /out/web/package.json && \
    cp -r apps/web/server/dist /out/web/dist && \
    cd /out/web && npm install --omit=dev --no-audit --no-fund

FROM node:24-slim AS runner
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
