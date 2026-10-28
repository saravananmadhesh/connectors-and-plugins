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
COPY apps/gateway/package.json ./apps/gateway/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build
COPY tsconfig.base.json tsconfig.json ./
COPY scripts/ ./scripts/
COPY packages/ ./packages/
COPY apps/gateway/ ./apps/gateway/
RUN pnpm --filter @boldcreate-integrations/gateway... run build
RUN mkdir -p /out/gateway && \
    cp apps/gateway/dist/package.json /out/gateway/package.json && \
    cp -r apps/gateway/dist /out/gateway/dist && \
    cd /out/gateway && npm install --omit=dev --no-audit --no-fund

FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /out/gateway ./
USER node
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT ?? 3002}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]
