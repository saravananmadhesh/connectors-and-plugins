/**
 * Download authorization. A version can be downloaded when the key's visible installation of that
 * plugin is pinned to it. Every other case is one answer, `not_found`, so a caller cannot tell a
 * version that does not exist from one it may not have.
 */
import { createHash } from 'node:crypto';
import { and, eq, inArray } from 'drizzle-orm';
import { effectiveEnabled } from './effective-enabled.js';
import {
  componentTable,
  installationComponentTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type { ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { notFound } from '../errors.js';
import { resolveDelivery } from './resolve-delivery.js';

export interface ArchiveGrant {
  sha256: string;
  sizeBytes: number;
  pluginId: string;
  installationId: string;
}

export async function authorizeArchive(
  tx: Executor,
  principal: ApiKeyPrincipal,
  versionId: string,
): Promise<ArchiveGrant> {
  const { installations: installs } = await resolveDelivery(tx, principal);
  const match = installs.find((install) => install.versionId === versionId);
  if (!match?.archiveSha256 || match.archiveSizeBytes === null) throw notFound();
  return {
    sha256: match.archiveSha256,
    sizeBytes: match.archiveSizeBytes,
    pluginId: match.pluginId,
    installationId: match.installationId,
  };
}

export interface ComponentArchiveGrant extends ArchiveGrant {
  componentId: string;
}

/**
 * A component archive can be downloaded when the hash belongs to an enabled component of an
 * installation the key sees. Any other hash, an archive of a disabled component or one of another
 * project is `not_found`, the same answer as a hash that does not exist.
 */
export async function authorizeComponentArchive(
  tx: Executor,
  principal: ApiKeyPrincipal,
  sha256: string,
): Promise<ComponentArchiveGrant> {
  const { installations: installs } = await resolveDelivery(tx, principal);
  if (installs.length === 0) throw notFound();
  const [row] = await tx
    .select({
      installationId: installationComponentTable.installationId,
      componentId: componentTable.id,
      sizeBytes: componentTable.archiveSizeBytes,
    })
    .from(installationComponentTable)
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(
      and(
        eq(installationComponentTable.organizationId, principal.orgId),
        inArray(
          installationComponentTable.installationId,
          installs.map((install) => install.installationId),
        ),
        effectiveEnabled(principal.userId),
        eq(componentTable.archiveSha256, sha256),
      ),
    )
    .limit(1);
  const match = installs.find((install) => install.installationId === row?.installationId);
  if (!row || row.sizeBytes === null || !match) throw notFound();
  return {
    sha256,
    sizeBytes: row.sizeBytes,
    pluginId: match.pluginId,
    installationId: match.installationId,
    componentId: row.componentId,
  };
}

export interface DeliveryAuditContext {
  requestId?: string | undefined;
  ip?: string | undefined;
}

export async function auditDownload(
  tx: Executor,
  principal: ApiKeyPrincipal,
  versionId: string | null,
  grant: ArchiveGrant | ComponentArchiveGrant,
  context: DeliveryAuditContext,
): Promise<void> {
  await writeAudit(tx, {
    actor: { kind: 'api_key', id: principal.keyId },
    action: 'artifact.downloaded',
    target:
      'componentId' in grant
        ? { kind: 'component', id: grant.componentId }
        : { kind: 'plugin_version', id: versionId as string },
    orgId: principal.orgId,
    projectId: principal.projectId,
    subjectUserId: principal.userId || undefined,
    requestId: context.requestId,
    ip: context.ip,
    context: {
      sha256: grant.sha256,
      sizeBytes: grant.sizeBytes,
      installationId: grant.installationId,
    },
  });
}

export interface SyncReportInput {
  target?: string | undefined;
  applied: { versionId?: string; componentId?: string; sha256: string }[];
  skipped: { versionId: string; kind?: string | undefined }[];
}

/**
 * One hash over what a client applied, so the audit context stays small and a changed state is
 * still visible. Components count by id and hash; the earlier version shape by version and hash.
 */
function appliedDigest(applied: SyncReportInput['applied']): string {
  const lines = applied.map((item) => `${item.componentId ?? item.versionId ?? ''}:${item.sha256}`);
  return createHash('sha256').update(lines.sort().join('\n')).digest('hex');
}

/** Clients say what they applied; the report is kept as an audit event, bounded in size. */
export async function recordSyncReport(
  tx: Executor,
  principal: ApiKeyPrincipal,
  report: SyncReportInput,
  context: DeliveryAuditContext,
): Promise<void> {
  await writeAudit(tx, {
    actor: { kind: 'api_key', id: principal.keyId },
    action: 'sync.reported',
    orgId: principal.orgId,
    projectId: principal.projectId,
    subjectUserId: principal.userId || undefined,
    requestId: context.requestId,
    ip: context.ip,
    context: {
      target: report.target ?? null,
      applied: report.applied.length,
      appliedCount: report.applied.length,
      appliedSha256: appliedDigest(report.applied),
      skipped: report.skipped.length,
    },
  });
}
