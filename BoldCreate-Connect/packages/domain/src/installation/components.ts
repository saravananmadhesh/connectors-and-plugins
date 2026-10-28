import { eq, and } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  installationTable,
  installationComponentTable,
  componentTable,
  assertValidScope,
} from '@boldcreate-integrations/db';
import type { ScopeContext } from '@boldcreate-integrations/db';
import type {
  UpdateComponentBody,
  ComponentResponse,
  Plain,
} from '@boldcreate-integrations/contracts';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { requireAction } from '../permissions/authorize.js';
import { resourceOfScope } from '../permissions/context.js';
import { notFound } from '../errors.js';
import { missingRequiredVariables } from './variables.js';

export async function listInstallationComponents(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
): Promise<Plain<ComponentResponse>[]> {
  assertValidScope(scope);
  requireAction(principal, 'installation:read', resourceOfScope(scope));

  // Verify installation belongs to scope
  const instRows = await db
    .select({ id: installationTable.id, pluginVersionId: installationTable.pluginVersionId })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.scopeType, scope.scopeType),
      ),
    )
    .limit(1);
  const installation = instRows[0];
  if (!installation) throw notFound();

  const rows = await db
    .select({
      row: installationComponentTable,
      component: componentTable,
    })
    .from(installationComponentTable)
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(eq(installationComponentTable.installationId, installationId))
    .orderBy(componentTable.name);

  // A server that needs a variable nobody has set yet cannot be reached, so it stays inactive.
  const missing = await missingRequiredVariables(db, installationId, installation.pluginVersionId);
  return rows.map((r) => {
    const held = r.component.kind === 'mcp' && missing.length > 0;
    return {
      componentId: r.row.componentId,
      kind: r.component.kind,
      name: r.component.name,
      enabled: r.row.enabled,
      active: r.row.enabled && !held,
      inactiveReason: held ? ('variables_missing' as const) : null,
    };
  });
}

export async function updateInstallationComponent(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
  body: UpdateComponentBody,
): Promise<Plain<ComponentResponse>> {
  assertValidScope(scope);
  requireAction(principal, 'component:update', resourceOfScope(scope));

  const instRows = await db
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, scope.organizationId),
        eq(installationTable.scopeType, scope.scopeType),
      ),
    )
    .limit(1);
  if (!instRows[0]) throw notFound();

  const updated = await db
    .update(installationComponentTable)
    .set({ enabled: body.enabled, updatedAt: new Date() })
    .where(
      and(
        eq(installationComponentTable.installationId, installationId),
        eq(installationComponentTable.componentId, componentId),
      ),
    )
    .returning({ componentId: installationComponentTable.componentId });
  if (!updated[0]) throw notFound();

  const components = await listInstallationComponents(db, principal, scope, installationId);
  const component = components.find((c) => c.componentId === componentId);
  if (!component) throw notFound();
  return component;
}
