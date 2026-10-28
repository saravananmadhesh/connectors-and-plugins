/**
 * Delivery to agents, CLIs and IDEs: the sync manifest, applied-version reports and the brokered
 * archive download. These calls carry an API key, not a session; the gateway host forwards them.
 * Authentication comes first, then visibility, and only then bytes.
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  AppError,
  SyncQuerySchema,
  SyncReportBodySchema,
  formatId,
  parseId,
  type ApiKeyPrincipal,
  type SyncResponse,
} from '@boldcreate-integrations/contracts';
import { withTenant, type Db, type Executor } from '@boldcreate-integrations/db';
import {
  auditDownload,
  authenticateKey,
  authorizeArchive,
  authorizeComponentArchive,
  bearerKey,
  buildSync,
  keyResource,
  parseKinds,
  parsePlugins,
  recordSyncReport,
  requireAction,
  type ArchiveGrant,
  type ComponentArchiveGrant,
  type SyncManifest,
} from '@boldcreate-integrations/domain';
import { countProjectCall } from '../auth/project.js';
import type { BlobPort } from '@boldcreate-integrations/ports';

export interface DeliveryOptions {
  db: Db;
  blob: BlobPort;
  /** Downloads one key may have open at once. */
  maxDownloadsPerKey: number;
  /** Public address of the gateway, where the manifest says each MCP server is reached. */
  gatewayUrl: string;
}

async function authenticateRequest(
  db: Db,
  request: FastifyRequest,
  action: Parameters<typeof requireAction>[1],
): Promise<ApiKeyPrincipal> {
  const identity = await authenticateKey(db, bearerKey(request.headers.authorization), {
    ip: request.clientIp,
  });
  if (!identity) throw new AppError('unauthenticated');
  requireAction(identity.principal, action, keyResource(identity.principal));
  if (identity.principal.projectId !== undefined) {
    await countProjectCall(request, identity.principal.projectId);
  }
  return identity.principal;
}

export function serializeSync(manifest: SyncManifest): SyncResponse {
  return {
    revision: manifest.revision,
    pollAfterSeconds: manifest.pollAfterSeconds,
    entries: manifest.entries.map((entry) => ({
      installationId: formatId('ins', entry.installationId),
      pluginId: formatId('plg', entry.pluginId),
      pluginName: entry.pluginName,
      versionId: formatId('pv', entry.versionId),
      version: entry.version,
      scope: entry.scope,
      yanked: entry.yanked,
      sha256: entry.sha256,
      sizeBytes: entry.sizeBytes,
      href: `/v1/plugin-versions/${formatId('pv', entry.versionId)}/archive`,
      components: entry.components.map((component) => ({
        ...component,
        id: formatId('cmp', component.id),
      })),
      mcp: entry.mcp.map((server) => ({
        ...server,
        componentId: formatId('cmp', server.componentId),
      })),
      setup: entry.setup,
    })),
    skipped: manifest.skipped.map((item) => ({
      pluginId: formatId('plg', item.pluginId),
      versionId: formatId('pv', item.versionId),
      componentId: item.componentId ? formatId('cmp', item.componentId) : null,
      kind: item.kind,
      reason: item.reason,
    })),
  };
}

const quoted = (value: string): string => `"${value}"`;

/** `If-None-Match` may hold several tags, weak or not; a match is any of them equal to ours. */
function matches(header: string | string[] | undefined, tag: string): boolean {
  if (!header) return false;
  return [header]
    .flat()
    .join(',')
    .split(',')
    .map((part) => part.trim().replace(/^W\//, ''))
    .some((part) => part === '*' || part === tag);
}

function parseRange(
  header: string | undefined,
  size: number,
): { start: number; end: number } | null {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match) throw new AppError('range_not_satisfiable');
  const [, from = '', to = ''] = match;
  let start: number;
  let end: number;
  if (from === '' && to === '') throw new AppError('range_not_satisfiable');
  if (from === '') {
    const suffix = Number(to);
    if (suffix === 0) throw new AppError('range_not_satisfiable');
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(from);
    end = to === '' ? size - 1 : Math.min(Number(to), size - 1);
  }
  if (start >= size || start > end) throw new AppError('range_not_satisfiable');
  return { start, end };
}

export async function deliveryRoutes(
  app: FastifyInstance,
  options: DeliveryOptions,
): Promise<void> {
  const { db, blob } = options;
  const open = new Map<string, number>();

  /** Streams one stored archive with ETag, ranges and the per key concurrency cap. */
  async function streamArchive(
    request: FastifyRequest,
    reply: FastifyReply,
    principal: ApiKeyPrincipal,
    grant: ArchiveGrant | ComponentArchiveGrant,
    audit: (tx: Executor) => Promise<void>,
  ) {
    const tag = quoted(`sha256-${grant.sha256}`);
    void reply
      .header('etag', tag)
      .header('accept-ranges', 'bytes')
      .header('cache-control', 'private, immutable')
      .header('vary', 'Authorization')
      .header('content-type', 'application/gzip');
    if (matches(request.headers['if-none-match'], tag)) return reply.status(304).send();

    const ifRange = request.headers['if-range'];
    const range =
      ifRange && !matches(ifRange, tag) ? null : parseRange(request.headers.range, grant.sizeBytes);

    const active = open.get(principal.keyId) ?? 0;
    if (active >= options.maxDownloadsPerKey) {
      void reply.header('retry-after', '5');
      throw new AppError('rate_limited');
    }
    let result;
    try {
      result = await blob.getStream(grant.sha256, range ?? undefined);
    } catch {
      void reply.header('retry-after', '5');
      throw new AppError('service_unavailable');
    }

    await withTenant(db, { orgId: principal.orgId, userId: principal.userId }, audit);

    open.set(principal.keyId, active + 1);
    const release = () => {
      const now = (open.get(principal.keyId) ?? 1) - 1;
      if (now <= 0) open.delete(principal.keyId);
      else open.set(principal.keyId, now);
      result.stream.destroy();
    };
    reply.raw.once('close', release);

    // The stored size is the whole object; a partial answer carries only the bytes of its range.
    void reply.header(
      'content-length',
      String(range ? range.end - range.start + 1 : grant.sizeBytes),
    );
    if (range) {
      void reply.header('content-range', `bytes ${range.start}-${range.end}/${grant.sizeBytes}`);
      return reply.status(206).send(result.stream);
    }
    return reply.status(200).send(result.stream);
  }

  app.get('/sync', async (request, reply) => {
    const principal = await authenticateRequest(db, request, 'artifact:sync');
    const query = SyncQuerySchema.safeParse(request.query);
    if (!query.success) throw new AppError('validation_failed', []);
    const manifest = await withTenant(
      db,
      { orgId: principal.orgId, userId: principal.userId },
      (tx) =>
        buildSync(tx, principal, {
          kinds: parseKinds(query.data.kinds),
          plugins: parsePlugins(query.data.plugins),
          gatewayUrl: options.gatewayUrl,
        }),
    );
    const tag = quoted(manifest.revision);
    void reply
      .header('etag', tag)
      .header('cache-control', 'private, no-cache')
      .header('vary', 'Authorization');
    if (matches(request.headers['if-none-match'], tag)) return reply.status(304).send();
    return reply.status(200).send(serializeSync(manifest));
  });

  app.post('/sync/reports', async (request, reply) => {
    const principal = await authenticateRequest(db, request, 'artifact:sync');
    const body = SyncReportBodySchema.safeParse(request.body);
    if (!body.success) throw new AppError('validation_failed', []);
    const report = {
      target: body.data.target,
      applied: body.data.applied.map((item) =>
        'componentId' in item
          ? { componentId: parseId('cmp', item.componentId), sha256: item.sha256 }
          : { versionId: parseId('pv', item.versionId), sha256: item.sha256 },
      ),
      skipped: body.data.skipped.map((item) => ({
        versionId: parseId('pv', item.versionId),
        kind: item.kind,
      })),
    };
    await withTenant(db, { orgId: principal.orgId, userId: principal.userId }, (tx) =>
      recordSyncReport(tx, principal, report, { requestId: request.id, ip: request.clientIp }),
    );
    return reply.status(204).send();
  });

  app.get('/sync/components/:sha256', async (request, reply) => {
    const principal = await authenticateRequest(db, request, 'artifact:download');
    const { sha256 } = request.params as { sha256: string };
    const grant = await withTenant(db, { orgId: principal.orgId, userId: principal.userId }, (tx) =>
      authorizeComponentArchive(tx, principal, sha256),
    );
    return streamArchive(request, reply, principal, grant, (tx) =>
      auditDownload(tx, principal, null, grant, {
        requestId: request.id,
        ip: request.clientIp,
      }),
    );
  });

  app.get(
    '/plugin-versions/:pluginVersionId/archive',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const principal = await authenticateRequest(db, request, 'artifact:download');
      // The id was decoded to a row uuid before validation; a malformed one never reaches here.
      const versionId = (request.params as { pluginVersionId: string }).pluginVersionId;
      const grant = await withTenant(
        db,
        { orgId: principal.orgId, userId: principal.userId },
        (tx) => authorizeArchive(tx, principal, versionId),
      );

      return streamArchive(request, reply, principal, grant, (tx) =>
        auditDownload(tx, principal, versionId, grant, {
          requestId: request.id,
          ip: request.clientIp,
        }),
      );
    },
  );
}
