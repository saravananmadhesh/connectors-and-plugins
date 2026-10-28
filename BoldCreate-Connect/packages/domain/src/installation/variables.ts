/**
 * Variables of an installation: the schema the plugin version declares, and the values the
 * installer set for it. Values are sealed to the organization's key, bound to the installation
 * and the variable name, and never read back: callers see only whether a value is set.
 */
import { and, eq, inArray, sql } from 'drizzle-orm';
import type { Executor, ScopeContext } from '@boldcreate-integrations/db';
import {
  assertValidScope,
  installationTable,
  installationVariableTable,
  pluginVersionTable,
} from '@boldcreate-integrations/db';
import { MAX_CUSTOM_VARIABLES } from '@boldcreate-integrations/contracts';
import type {
  Plain,
  PutVariablesBody,
  UserSessionPrincipal,
  VariableStatus,
} from '@boldcreate-integrations/contracts';
import { fieldSubjectId, type Sealer } from '@boldcreate-integrations/credentials';
import { requireAction } from '../permissions/authorize.js';
import { resourceOfScope } from '../permissions/context.js';
import { writeAudit, type AuditEntry } from '../audit/write-audit.js';
import { appError, notFound } from '../errors.js';
import { scanOf } from '../marketplace/admin-plugins.js';

export interface VariableDeclaration {
  name: string;
  description: string;
  required: boolean;
  secret: boolean;
}

export interface LoadedInstallation {
  id: string;
  pluginVersionId: string;
}

async function loadInstallation(
  db: Executor,
  scope: ScopeContext,
  installationId: string,
): Promise<LoadedInstallation> {
  const rows = await db
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
  const row = rows[0];
  if (!row) throw notFound();
  return row;
}

/** The variables a plugin version declares; versions ingested without a scan declare none. */
export async function getVariableSchema(
  db: Executor,
  pluginVersionId: string,
): Promise<VariableDeclaration[]> {
  const rows = await db
    .select()
    .from(pluginVersionTable)
    .where(eq(pluginVersionTable.id, pluginVersionId))
    .limit(1);
  const row = rows[0];
  if (!row) return [];
  return scanOf(row)?.variables ?? [];
}

async function storedNames(db: Executor, installationId: string): Promise<Set<string>> {
  const rows = await db
    .select({ name: installationVariableTable.name })
    .from(installationVariableTable)
    .where(eq(installationVariableTable.installationId, installationId));
  return new Set(rows.map((row) => row.name));
}

/** Required variables of the installed version that have no stored value. */
export async function missingRequiredVariables(
  db: Executor,
  installationId: string,
  pluginVersionId: string,
): Promise<string[]> {
  const declared = await getVariableSchema(db, pluginVersionId);
  const required = declared.filter((variable) => variable.required);
  if (required.length === 0) return [];
  const stored = await storedNames(db, installationId);
  return required.filter((variable) => !stored.has(variable.name)).map((variable) => variable.name);
}

/** What each variable of an installation shows: declared or custom, and whether a value is set. */
export async function variableStatuses(
  db: Executor,
  installation: LoadedInstallation,
): Promise<Plain<VariableStatus>[]> {
  const declared = await getVariableSchema(db, installation.pluginVersionId);
  const stored = await storedNames(db, installation.id);
  const declaredNames = new Set(declared.map((variable) => variable.name));
  const custom = [...stored]
    .filter((name) => !declaredNames.has(name))
    .sort()
    .map((name) => ({ name, description: '', required: false, secret: true, isSet: true }));
  return [
    ...declared.map((variable) => ({
      ...variable,
      isSet: stored.has(variable.name),
      custom: false,
    })),
    ...custom.map((variable) => ({ ...variable, custom: true })),
  ];
}

export async function listVariables(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
): Promise<Plain<VariableStatus>[]> {
  assertValidScope(scope);
  requireAction(principal, 'variable:read', resourceOfScope(scope));
  const installation = await loadInstallation(db, scope, installationId);
  return variableStatuses(db, installation);
}

/**
 * Merge patch of the stored values in one transaction: `""` keeps a value, `null` deletes it, any
 * other string sets or replaces it. A name the version does not declare rejects the whole request
 * and nothing is written. A sealing failure leaves every stored value as it was.
 */
export async function putVariables(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  body: PutVariablesBody,
  sealer: Sealer,
): Promise<Plain<VariableStatus>[]> {
  assertValidScope(scope);
  requireAction(principal, 'variable:write', resourceOfScope(scope));
  const installation = await loadInstallation(db, scope, installationId);
  return writeVariables(
    db,
    installation,
    { organizationId: scope.organizationId, scopeType: scope.scopeType },
    { actor: { kind: 'user_session', id: principal.userId }, updatedBy: principal.userId },
    body,
    sealer,
  );
}

/** Who changes the values: the audit actor, and the person the row names when there is one. */
export interface VariableWriter {
  actor: AuditEntry['actor'];
  updatedBy: string | null;
  projectId?: string;
  /** The project user whose install changes, when the change is for one user. */
  subjectUserId?: string;
  /** The audit action; `variable.updated` unless a caller has an event of its own. */
  action?: 'variable.updated' | 'user_plugin.variables_updated';
}

/** The merge patch of `putVariables`, for a caller that has already been authorized. */
export async function writeVariables(
  db: Executor,
  installation: LoadedInstallation,
  where: { organizationId: string; scopeType: string },
  writer: VariableWriter,
  body: PutVariablesBody,
  sealer: Sealer,
): Promise<Plain<VariableStatus>[]> {
  const declared = new Set(
    (await getVariableSchema(db, installation.pluginVersionId)).map((variable) => variable.name),
  );
  const entries = Object.entries(body.values);
  // A name the version does not declare is a custom variable, at most ten per installation.
  const stored = await storedNames(db, installation.id);
  const customAfter = new Set([...stored].filter((name) => !declared.has(name)));
  for (const [name, value] of entries) {
    if (declared.has(name)) continue;
    if (value === null) customAfter.delete(name);
    else if (value !== '' || stored.has(name)) customAfter.add(name);
  }
  if (customAfter.size > MAX_CUSTOM_VARIABLES) throw appError('too_many_custom_variables');

  const sets = entries.filter(
    (entry): entry is [string, string] => entry[1] !== null && entry[1] !== '',
  );
  const deletes = entries.filter(([, value]) => value === null).map(([name]) => name);

  // Seal everything first: one failure aborts before any row is touched.
  const sealed: { name: string; value: string }[] = [];
  for (const [name, plaintext] of sets) {
    sealed.push({
      name,
      value: await sealer.seal({
        purpose: 'installation_variable',
        orgId: where.organizationId,
        subject: { kind: 'installation', id: fieldSubjectId(installation.id, name) },
        plaintext,
      }),
    });
  }

  if (sealed.length > 0 || deletes.length > 0) {
    await db.transaction(async (tx) => {
      const now = new Date();
      for (const { name, value } of sealed) {
        await tx
          .insert(installationVariableTable)
          .values({
            installationId: installation.id,
            organizationId: where.organizationId,
            name,
            valueSealed: value,
            updatedBy: writer.updatedBy,
            createdAt: now,
            updatedAt: now,
          })
          .onConflictDoUpdate({
            target: [installationVariableTable.installationId, installationVariableTable.name],
            set: { valueSealed: value, updatedBy: writer.updatedBy, updatedAt: now },
          });
      }
      if (deletes.length > 0) {
        await tx
          .delete(installationVariableTable)
          .where(
            and(
              eq(installationVariableTable.installationId, installation.id),
              inArray(installationVariableTable.name, deletes),
            ),
          );
      }
      await tx
        .update(installationTable)
        .set({
          variablesRevision: sql`${installationTable.variablesRevision} + 1`,
          updatedAt: now,
        })
        .where(eq(installationTable.id, installation.id));
      // Names and the operation only: a value never reaches the audit log.
      await writeAudit(tx, {
        actor: writer.actor,
        action: writer.action ?? 'variable.updated',
        target: { kind: 'installation', id: installation.id },
        orgId: where.organizationId,
        ...(writer.projectId !== undefined ? { projectId: writer.projectId } : {}),
        ...(writer.subjectUserId !== undefined ? { subjectUserId: writer.subjectUserId } : {}),
        context: {
          scope: where.scopeType,
          ...(sealed.length > 0 ? { set: sealed.map((entry) => entry.name).join(',') } : {}),
          ...(deletes.length > 0 ? { deleted: deletes.join(',') } : {}),
        },
      });
    });
  }

  return variableStatuses(db, installation);
}
