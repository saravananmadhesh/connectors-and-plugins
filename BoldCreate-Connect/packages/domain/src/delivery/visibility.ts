/**
 * What an API key can see: the active installations of its scope and of the scopes below it, one
 * per plugin. A personal key sees its own installs and the organization's; an organization key sees
 * the organization's. A key of a project also sees that project's installs, ranked between the
 * organization and the person. When a plugin is installed in more than one visible scope the most
 * specific one wins.
 */
import { and, eq, inArray, ne, or, isNull, type SQL } from 'drizzle-orm';
import {
  installationTable,
  pluginTable,
  pluginVersionTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type { ApiKeyPrincipal, ScopeKind } from '@boldcreate-integrations/contracts';

export interface EffectiveInstallation {
  installationId: string;
  pluginId: string;
  pluginName: string;
  versionId: string;
  version: string;
  versionStatus: string;
  scope: ScopeKind;
  /** An organization install that no narrower install replaces. */
  required: boolean;
  updatedAt: Date;
  archiveSha256: string | null;
  archiveSizeBytes: number | null;
}

const SPECIFICITY: Record<ScopeKind, number> = { user: 3, project: 2, org: 1 };

/**
 * The narrowest scope wins. Plain members hold no narrower install of an enforced plugin (it is
 * replaced or blocked), while admins and members keep their own next to it.
 */
const rank = (row: { scope: ScopeKind }): number => SPECIFICITY[row.scope];

function scopeFilter(principal: ApiKeyPrincipal): SQL {
  const org = eq(installationTable.scopeType, 'org');
  const project =
    principal.projectId !== undefined
      ? and(
          eq(installationTable.scopeType, 'project'),
          eq(installationTable.projectId, principal.projectId),
        )
      : undefined;
  // A person's own install carries no project; a project user's carries the project of the key.
  const own =
    principal.userId !== undefined
      ? and(
          eq(installationTable.scopeType, 'user'),
          eq(installationTable.ownerUserId, principal.userId),
          principal.projectId !== undefined
            ? eq(installationTable.projectId, principal.projectId)
            : isNull(installationTable.projectId),
        )
      : undefined;
  // A session of a project user sees the project's installs and its user's own, never the
  // organization's.
  if (principal.projectId !== undefined) return or(project, own) ?? org;
  return or(org, project, own) ?? org;
}

/** One installation per plugin: the highest ranked, then the most recently updated. */
export function pickEffective(rows: readonly EffectiveInstallation[]): EffectiveInstallation[] {
  const best = new Map<string, EffectiveInstallation>();
  for (const row of rows) {
    const current = best.get(row.pluginId);
    const wins =
      !current ||
      rank(row) > rank(current) ||
      (rank(row) === rank(current) &&
        (row.updatedAt > current.updatedAt ||
          (row.updatedAt.getTime() === current.updatedAt.getTime() &&
            row.installationId > current.installationId)));
    if (wins) best.set(row.pluginId, row);
  }
  return [...best.values()].sort((x, y) => x.pluginName.localeCompare(y.pluginName));
}

/** Runs inside a transaction that carries the key's organization. */
export async function effectiveInstallations(
  tx: Executor,
  principal: ApiKeyPrincipal,
): Promise<EffectiveInstallation[]> {
  const rows = await tx
    .select({
      installationId: installationTable.id,
      pluginId: installationTable.pluginId,
      pluginName: pluginTable.name,
      versionId: installationTable.pluginVersionId,
      version: pluginVersionTable.version,
      versionStatus: pluginVersionTable.status,
      scope: installationTable.scopeType,
      required: installationTable.required,
      updatedAt: installationTable.updatedAt,
      archiveSha256: pluginVersionTable.archiveSha256,
      archiveSizeBytes: pluginVersionTable.archiveSizeBytes,
    })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .innerJoin(pluginVersionTable, eq(pluginVersionTable.id, installationTable.pluginVersionId))
    .where(
      and(
        eq(installationTable.organizationId, principal.orgId),
        eq(installationTable.status, 'active'),
        // A suspended plugin and a blocked version stop serving everywhere; deprecated and yanked
        // ones that are still installed keep working.
        ne(pluginTable.status, 'suspended'),
        isNull(pluginVersionTable.executionBlockedAt),
        scopeFilter(principal),
        principal.plugins && principal.plugins.length > 0
          ? inArray(installationTable.pluginId, principal.plugins)
          : undefined,
      ),
    );

  return pickEffective(rows);
}
