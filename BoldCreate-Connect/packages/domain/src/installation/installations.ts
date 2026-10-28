import { randomUUID } from 'node:crypto';
import { eq, and, desc, inArray, lt, lte, ne, or, type SQL } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  installationTable,
  installationComponentTable,
  pluginTable,
  pluginVersionTable,
  componentTable,
  organizationMemberTable,
  encodeCursor,
  decodeCursor,
  assertValidScope,
} from '@boldcreate-integrations/db';
import type { ScopeContext } from '@boldcreate-integrations/db';
import type { ScopeKind } from '@boldcreate-integrations/contracts';
import type {
  CreateInstallationBody,
  UpdateInstallationBody,
  UpgradeInstallationBody,
  InstallationResponse,
  UpgradeResult,
  PageQuery,
  Plain,
} from '@boldcreate-integrations/contracts';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { managesInstalls, requireAction } from '../permissions/authorize.js';
import { resourceOfScope } from '../permissions/context.js';
import { getOrgPolicy } from '../tenancy/org-policy.js';
import { writeAudit, type AuditEntry } from '../audit/write-audit.js';
import { appError, isUniqueViolation, notFound } from '../errors.js';
import { logosOf, resolvePluginVersion } from '../marketplace/plugins.js';

function toInstallationResponse(
  row: typeof installationTable.$inferSelect,
  pluginName: string,
  pluginLogoUrl: string | null,
  pluginVersion: string,
  replacedBy: ScopeKind | null = null,
): Plain<InstallationResponse> {
  return {
    id: row.id,
    scope: row.scopeType,
    pluginName,
    pluginLogoUrl,
    pluginVersion,
    pluginVersionId: row.pluginVersionId,
    active: row.status === 'active',
    updatePolicy: row.updatePolicy,
    required: row.required,
    replacedBy,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** The scope of the install that replaced each given install, by installation id. */
async function replacerScopes(
  db: Executor,
  rows: readonly (typeof installationTable.$inferSelect)[],
): Promise<Map<string, ScopeKind>> {
  const ids = [
    ...new Set(rows.map((r) => r.replacedByInstallationId).filter((id): id is string => !!id)),
  ];
  if (ids.length === 0) return new Map();
  const found = await db
    .select({ id: installationTable.id, scopeType: installationTable.scopeType })
    .from(installationTable)
    .where(inArray(installationTable.id, ids));
  return new Map(found.map((r) => [r.id, r.scopeType]));
}

function installationAudit(
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  action: AuditEntry['action'],
  installationId: string,
  context: Record<string, string>,
): AuditEntry {
  return {
    actor: { kind: 'user_session', id: principal.userId },
    action,
    target: { kind: 'installation', id: installationId },
    orgId: scope.organizationId,
    context: { scope: scope.scopeType, ...context },
  };
}

/** A plain member cannot install a plugin that the organization enforces. */
async function assertNotEnforcedAbove(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  pluginId: string,
): Promise<void> {
  if (scope.scopeType !== 'user' || managesInstalls(principal)) return;
  const [blocking] = await db
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.pluginId, pluginId),
        eq(installationTable.status, 'active'),
        eq(installationTable.scopeType, 'org'),
      ),
    )
    .limit(1);
  if (blocking) throw appError('installation_required_by_org');
}

/**
 * An organization install replaces (disables) the plain members' personal installs of the plugin.
 * Admins and members keep their own installs, as they do for the required-install block.
 */
async function replaceLowerInstallations(
  tx: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  pluginId: string,
  installationId: string,
  now: Date,
): Promise<void> {
  if (scope.scopeType !== 'org') return;
  const orgId = scope.organizationId;

  const admins = await tx
    .select({ userId: organizationMemberTable.userId })
    .from(organizationMemberTable)
    .where(
      and(
        eq(organizationMemberTable.organizationId, orgId),
        inArray(organizationMemberTable.role, ['ADMIN', 'MEMBER']),
      ),
    );
  const exempt = new Set(admins.map((r) => r.userId));

  let candidates: { id: string; scopeType: string; ownerUserId: string | null }[];
  const base = [
    eq(installationTable.organizationId, orgId),
    eq(installationTable.pluginId, pluginId),
    eq(installationTable.status, 'active'),
  ];
  candidates = await tx
    .select({
      id: installationTable.id,
      scopeType: installationTable.scopeType,
      ownerUserId: installationTable.ownerUserId,
    })
    .from(installationTable)
    .where(and(...base, ne(installationTable.scopeType, 'org')));

  const replaced = candidates.filter((c) => !c.ownerUserId || !exempt.has(c.ownerUserId));
  if (replaced.length === 0) return;
  await tx
    .update(installationTable)
    .set({ status: 'disabled', replacedByInstallationId: installationId, updatedAt: now })
    .where(
      inArray(
        installationTable.id,
        replaced.map((c) => c.id),
      ),
    );
  for (const c of replaced) {
    await writeAudit(
      tx,
      installationAudit(
        principal,
        { ...scope, scopeType: c.scopeType as ScopeContext['scopeType'] },
        'installation.updated',
        c.id,
        { replacedBy: installationId },
      ),
    );
  }
}

/**
 * Called when an enforcing install is disabled or removed: the installs it replaced come back, or
 * stay disabled under another enforcing install that is still active above them.
 */
async function releaseReplacedInstallations(
  tx: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  pluginId: string,
  now: Date,
): Promise<void> {
  const replaced = await tx
    .select()
    .from(installationTable)
    .where(eq(installationTable.replacedByInstallationId, installationId));

  for (const row of replaced) {
    const [next] = await tx
      .select({ id: installationTable.id })
      .from(installationTable)
      .where(
        and(
          eq(installationTable.organizationId, row.organizationId),
          eq(installationTable.pluginId, pluginId),
          eq(installationTable.status, 'active'),
          ne(installationTable.id, installationId),
          eq(installationTable.scopeType, 'org'),
        ),
      )
      .limit(1);
    await tx
      .update(installationTable)
      .set(
        next
          ? { replacedByInstallationId: next.id, updatedAt: now }
          : { status: 'active', replacedByInstallationId: null, updatedAt: now },
      )
      .where(eq(installationTable.id, row.id));
    await writeAudit(
      tx,
      installationAudit(
        principal,
        { ...scope, scopeType: row.scopeType },
        'installation.updated',
        row.id,
        next ? { replacedBy: next.id } : { restoredAfter: installationId },
      ),
    );
  }
}

export async function listInstallations(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  query: PageQuery,
): Promise<{ items: Plain<InstallationResponse>[]; nextCursor: string | null; hasMore: boolean }> {
  assertValidScope(scope);
  requireAction(principal, 'installation:list', resourceOfScope(scope));

  const limit = query.limit;
  const conditions: SQL[] = [
    eq(installationTable.organizationId, scope.organizationId),
    eq(installationTable.scopeType, scope.scopeType),
  ];
  if (scope.ownerUserId) conditions.push(eq(installationTable.ownerUserId, scope.ownerUserId));

  if (query.cursor) {
    const { createdAt, id } = decodeCursor(query.cursor);
    const clause = or(
      lt(installationTable.createdAt, new Date(createdAt)),
      and(lte(installationTable.createdAt, new Date(createdAt)), lt(installationTable.id, id)),
    );
    if (clause) conditions.push(clause);
  }

  const rows = await db
    .select({
      installation: installationTable,
      pluginName: pluginTable.name,
      pluginSourceId: pluginTable.sourceId,
      pluginVersion: pluginVersionTable.version,
    })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .innerJoin(pluginVersionTable, eq(pluginVersionTable.id, installationTable.pluginVersionId))
    .where(and(...conditions))
    .orderBy(desc(installationTable.createdAt))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const page = rows.slice(0, limit);
  const replacers = await replacerScopes(
    db,
    page.map((r) => r.installation),
  );
  const logos = await logosOf(
    db,
    page.map((r) => ({ id: r.installation.pluginId, sourceId: r.pluginSourceId })),
  );
  const items = page.map((r) =>
    toInstallationResponse(
      r.installation,
      r.pluginName,
      logos.get(r.installation.pluginId) ?? null,
      r.pluginVersion,
      replacers.get(r.installation.replacedByInstallationId ?? '') ?? null,
    ),
  );
  const last = items[items.length - 1];
  const nextCursor = hasMore && last ? encodeCursor(new Date(last.createdAt), last.id) : null;

  return { items, nextCursor, hasMore };
}

export async function createInstallation(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  body: CreateInstallationBody,
): Promise<Plain<InstallationResponse>> {
  assertValidScope(scope);
  const policy =
    scope.scopeType === 'user' ? await getOrgPolicy(db, scope.organizationId) : undefined;
  requireAction(principal, 'installation:create', resourceOfScope(scope, policy));

  // Every organization install is enforced on the people below it; the column stays for storage.
  const required = scope.scopeType === 'org';

  const { plugin, version: bv } = await resolvePluginVersion(db, body.pluginVersionId);

  await assertNotEnforcedAbove(db, principal, scope, plugin.id);

  const id = randomUUID();
  const now = new Date();
  const updatePolicy = body.updatePolicy ?? 'pinned';

  // Seed component rows, all enabled; the member can switch any of them off afterwards
  const components = await db
    .select()
    .from(componentTable)
    .where(eq(componentTable.pluginVersionId, bv.id));

  try {
    await db.transaction(async (tx) => {
      await tx.insert(installationTable).values({
        id,
        organizationId: scope.organizationId,
        scopeType: scope.scopeType,
        ownerUserId: scope.ownerUserId ?? null,
        projectId: scope.projectId ?? null,
        createdBy: principal.userId,
        pluginId: plugin.id,
        pluginVersionId: bv.id,
        status: 'active',
        updatePolicy,
        required,
        installedBy: principal.userId,
        createdAt: now,
        updatedAt: now,
      });

      await writeAudit(
        tx,
        installationAudit(principal, scope, 'installation.created', id, {
          pluginId: plugin.id,
        }),
      );

      await replaceLowerInstallations(tx, principal, scope, plugin.id, id, now);

      if (components.length > 0) {
        await tx.insert(installationComponentTable).values(
          components.map((component) => ({
            installationId: id,
            organizationId: scope.organizationId,
            componentId: component.id,
            pluginVersionId: bv.id,
            enabled: true,
            alias: null,
            createdAt: now,
            updatedAt: now,
          })),
        );
      }
    });
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw appError('installation_already_exists');
    }
    throw err;
  }

  return toInstallationResponse(
    {
      id,
      organizationId: scope.organizationId,
      scopeType: scope.scopeType,
      ownerUserId: scope.ownerUserId ?? null,
      projectId: scope.projectId ?? null,
      createdBy: principal.userId,
      pluginId: plugin.id,
      pluginVersionId: bv.id,
      status: 'active',
      updatePolicy,
      required,
      replacedByInstallationId: null,
      variablesRevision: 0,
      installedBy: principal.userId,
      createdAt: now,
      updatedAt: now,
    },
    plugin.name,
    (await logosOf(db, [plugin])).get(plugin.id) ?? null,
    bv.version,
  );
}

export async function getInstallation(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
): Promise<Plain<InstallationResponse>> {
  assertValidScope(scope);
  requireAction(principal, 'installation:read', resourceOfScope(scope));

  const rows = await db
    .select({
      installation: installationTable,
      pluginName: pluginTable.name,
      pluginSourceId: pluginTable.sourceId,
      pluginVersion: pluginVersionTable.version,
    })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .innerJoin(pluginVersionTable, eq(pluginVersionTable.id, installationTable.pluginVersionId))
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.scopeType, scope.scopeType),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) throw notFound();
  const replacers = await replacerScopes(db, [row.installation]);
  const logos = await logosOf(db, [
    { id: row.installation.pluginId, sourceId: row.pluginSourceId },
  ]);
  return toInstallationResponse(
    row.installation,
    row.pluginName,
    logos.get(row.installation.pluginId) ?? null,
    row.pluginVersion,
    replacers.get(row.installation.replacedByInstallationId ?? '') ?? null,
  );
}

export async function updateInstallation(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  body: UpdateInstallationBody,
): Promise<Plain<InstallationResponse>> {
  assertValidScope(scope);
  requireAction(principal, 'installation:update', resourceOfScope(scope));

  const rows = await db
    .select({
      installation: installationTable,
      pluginName: pluginTable.name,
      pluginSourceId: pluginTable.sourceId,
      pluginVersion: pluginVersionTable.version,
    })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .innerJoin(pluginVersionTable, eq(pluginVersionTable.id, installationTable.pluginVersionId))
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.scopeType, scope.scopeType),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) throw notFound();

  const now = new Date();
  const dbUpdates: Record<string, unknown> = { updatedAt: now };
  if (body.active !== undefined) dbUpdates['status'] = body.active ? 'active' : 'disabled';
  if (body.updatePolicy !== undefined) dbUpdates['updatePolicy'] = body.updatePolicy;

  if (body.active === true) {
    if (row.installation.replacedByInstallationId) throw appError('installation_required_by_org');
    await assertNotEnforcedAbove(db, principal, scope, row.installation.pluginId);
  }

  await db.transaction(async (tx) => {
    await tx
      .update(installationTable)
      .set(dbUpdates)
      .where(eq(installationTable.id, installationId));
    await writeAudit(
      tx,
      installationAudit(principal, scope, 'installation.updated', installationId, {}),
    );
    if (body.active === false && scope.scopeType !== 'user') {
      await releaseReplacedInstallations(
        tx,
        principal,
        scope,
        installationId,
        row.installation.pluginId,
        now,
      );
    }
    if (body.active === true) {
      await replaceLowerInstallations(
        tx,
        principal,
        scope,
        row.installation.pluginId,
        installationId,
        now,
      );
    }
  });

  const merged = {
    ...row.installation,
    updatedAt: now,
    ...(body.active !== undefined
      ? { status: body.active ? ('active' as const) : ('disabled' as const) }
      : {}),
    ...(body.updatePolicy !== undefined ? { updatePolicy: body.updatePolicy } : {}),
  } as typeof installationTable.$inferSelect;

  const replacers = await replacerScopes(db, [merged]);
  const logos = await logosOf(db, [{ id: merged.pluginId, sourceId: row.pluginSourceId }]);
  return toInstallationResponse(
    merged,
    row.pluginName,
    logos.get(merged.pluginId) ?? null,
    row.pluginVersion,
    replacers.get(merged.replacedByInstallationId ?? '') ?? null,
  );
}

export async function deleteInstallation(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
): Promise<void> {
  assertValidScope(scope);
  requireAction(principal, 'installation:delete', resourceOfScope(scope));

  const rows = await db
    .select({ id: installationTable.id, pluginId: installationTable.pluginId })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.scopeType, scope.scopeType),
      ),
    )
    .limit(1);

  const target = rows[0];
  if (!target) throw notFound();

  await db.transaction(async (tx) => {
    if (scope.scopeType !== 'user') {
      await releaseReplacedInstallations(
        tx,
        principal,
        scope,
        installationId,
        target.pluginId,
        new Date(),
      );
    }
    await tx.delete(installationTable).where(eq(installationTable.id, installationId));
    await writeAudit(
      tx,
      installationAudit(principal, scope, 'installation.deleted', installationId, {}),
    );
  });
}

export async function upgradeInstallation(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  body: UpgradeInstallationBody,
): Promise<Plain<UpgradeResult>> {
  assertValidScope(scope);
  requireAction(principal, 'installation:upgrade', resourceOfScope(scope));

  const instRows = await db
    .select({ installation: installationTable })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.scopeType, scope.scopeType),
      ),
    )
    .limit(1);

  const inst = instRows[0];
  if (!inst) throw notFound();

  // The target version must belong to the installed plugin
  const { version: newBv } = await resolvePluginVersion(db, body.pluginVersionId);
  if (newBv.pluginId !== inst.installation.pluginId) throw notFound();

  const oldComponents = await db
    .select({ row: installationComponentTable, component: componentTable })
    .from(installationComponentTable)
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(eq(installationComponentTable.installationId, installationId));

  const newComponents = await db
    .select()
    .from(componentTable)
    .where(eq(componentTable.pluginVersionId, newBv.id));

  const oldByName = new Map(oldComponents.map((r) => [r.component.name, r.row]));
  const newNames = new Set(newComponents.map((c) => c.name));

  const droppedComponents = oldComponents
    .filter((r) => !newNames.has(r.component.name))
    .map((r) => r.component.name);

  const newDisabledComponents = newComponents
    .filter((c) => !oldByName.has(c.name))
    .map((c) => c.name);

  await db.transaction(async (tx) => {
    await tx
      .update(installationTable)
      .set({
        pluginVersionId: newBv.id,
        updatedAt: new Date(),
      })
      .where(eq(installationTable.id, installationId));

    await tx
      .delete(installationComponentTable)
      .where(eq(installationComponentTable.installationId, installationId));

    await writeAudit(
      tx,
      installationAudit(principal, scope, 'installation.upgraded', installationId, {
        pluginVersionId: newBv.id,
      }),
    );

    // Insert new component rows, preserving enabled where the name matches
    const now = new Date();
    for (const component of newComponents) {
      await tx.insert(installationComponentTable).values({
        installationId,
        organizationId: scope.organizationId,
        componentId: component.id,
        pluginVersionId: newBv.id,
        enabled: oldByName.get(component.name)?.enabled ?? true,
        alias: null,
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  return {
    installationId,
    newVersion: newBv.version,
    droppedComponents,
    newDisabledComponents,
  };
}
