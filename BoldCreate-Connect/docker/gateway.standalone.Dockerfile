# syntax=docker/dockerfile:1
# Standalone Gateway build: uses only apps/gateway and its self-contained prebuilt dist artifact.
FROM node:24-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only third-party production dependencies for gateway using the bundled package.json
COPY apps/gateway/dist/package.json ./package.json
RUN npm install --omit=dev --no-audit --no-fund

# Copy prebuilt standalone server dist
COPY apps/gateway/dist ./dist

USER node
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT ?? 3002}/healthz`).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "--max-old-space-size=1536", "dist/index.js"]
