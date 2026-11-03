import { and, eq, isNull } from 'drizzle-orm';
import { limitSettingTable, type Executor } from '@boldcreate-integrations/db';
import type { AdminLimitResponse } from '@boldcreate-integrations/contracts';
import {
  LIMIT_DEFINITIONS,
  LIMIT_KEYS,
  WRITABLE_LIMIT_SCOPES,
  isLimitKey,
  type LimitKey,
  type LimitScope,
} from '@boldcreate-integrations/limits';
import { writeAudit } from '../audit/write-audit.js';
import { notFound, validationFailed } from '../errors.js';

export interface LimitActor {
  /** Id of the platform administrator identity, stored as the author of the value. */
  identityId: string;
  /** Shown in the audit trail. */
  subject: string;
  requestId?: string | undefined;
  ip?: string | undefined;
}

type Row = typeof limitSettingTable.$inferSelect;

const globalOnly = (key: string) =>
  and(
    eq(limitSettingTable.key, key),
    eq(limitSettingTable.scope, 'global'),
    isNull(limitSettingTable.scopeId),
  );

function toResponse(key: LimitKey, row: Row | undefined): AdminLimitResponse {
  const definition = LIMIT_DEFINITIONS[key];
  return {
    key,
    label: definition.label,
    description: definition.description,
    windowSeconds: definition.windowSeconds,
    unit: definition.unit,
    group: definition.group,
    defaultValue: definition.default,
    min: definition.min,
    max: definition.max,
    globalValue: row?.value ?? null,
    effectiveValue: row?.value ?? definition.default,
    reason: row?.reason ?? null,
    updatedAt: row?.updatedAt.toISOString() ?? null,
  };
}

function knownKey(key: string): LimitKey {
  if (!isLimitKey(key)) throw notFound();
  return key;
}

/** A write targets a scope only while the list of writable scopes names it. */
function assertWritable(scope: LimitScope): void {
  if (!WRITABLE_LIMIT_SCOPES.includes(scope)) {
    throw validationFailed([{ field: 'scope', message: 'This level cannot be changed yet.' }]);
  }
}

/** A value fixed by the service's configuration. Shown for reference; it has no edit path. */
export interface EnvironmentLimit {
  key: string;
  label: string;
  description: string;
  value: number;
  unit?: AdminLimitResponse['unit'];
}

const environmentResponse = (item: EnvironmentLimit): AdminLimitResponse => ({
  key: item.key,
  label: item.label,
  description: item.description,
  windowSeconds: 1,
  group: 'Environment only',
  ...(item.unit ? { unit: item.unit } : {}),
  defaultValue: item.value,
  min: item.value,
  max: item.value,
  globalValue: null,
  effectiveValue: item.value,
  reason: null,
  updatedAt: null,
  editable: false,
});

export async function listAdminLimits(
  db: Executor,
  environment: readonly EnvironmentLimit[] = [],
): Promise<AdminLimitResponse[]> {
  const rows = await db
    .select()
    .from(limitSettingTable)
    .where(eq(limitSettingTable.scope, 'global'));
  const byKey = new Map(rows.map((row) => [row.key, row]));
  return [
    ...LIMIT_KEYS.map((key) => toResponse(key, byKey.get(key))),
    ...environment.map(environmentResponse),
  ];
}

export async function setGlobalLimit(
  db: Executor,
  rawKey: string,
  input: { value: number; reason: string },
  actor: LimitActor,
): Promise<AdminLimitResponse> {
  const key = knownKey(rawKey);
  assertWritable('global');
  const { min, max } = LIMIT_DEFINITIONS[key];
  if (input.value < min || input.value > max) {
    throw validationFailed([{ field: 'value', message: `Use a value from ${min} to ${max}.` }]);
  }
  return db.transaction(async (tx) => {
    const [before] = await tx.select().from(limitSettingTable).where(globalOnly(key)).limit(1);
    const now = new Date();
    const values = {
      value: input.value,
      reason: input.reason,
      updatedBy: actor.identityId,
      updatedAt: now,
    };
    const [row] = before
      ? await tx
          .update(limitSettingTable)
          .set(values)
          .where(eq(limitSettingTable.id, before.id))
          .returning()
      : await tx
          .insert(limitSettingTable)
          .values({ key, scope: 'global', scopeId: null, ...values })
          .returning();
    await writeAudit(tx, {
      actor: { kind: 'platform_admin', id: actor.subject },
      action: 'limit.changed',
      target: { kind: 'limit', id: key },
      context: {
        scope: 'global',
        from: before?.value ?? LIMIT_DEFINITIONS[key].default,
        to: input.value,
      },
      reason: input.reason,
      requestId: actor.requestId,
      ip: actor.ip,
    });
    return toResponse(key, row);
  });
}

export async function resetGlobalLimit(
  db: Executor,
  rawKey: string,
  input: { reason: string },
  actor: LimitActor,
): Promise<AdminLimitResponse> {
  const key = knownKey(rawKey);
  assertWritable('global');
  return db.transaction(async (tx) => {
    const [before] = await tx.select().from(limitSettingTable).where(globalOnly(key)).limit(1);
    if (before) {
      await tx.delete(limitSettingTable).where(eq(limitSettingTable.id, before.id));
      await writeAudit(tx, {
        actor: { kind: 'platform_admin', id: actor.subject },
        action: 'limit.reset',
        target: { kind: 'limit', id: key },
        context: { scope: 'global', from: before.value, to: LIMIT_DEFINITIONS[key].default },
        reason: input.reason,
        requestId: actor.requestId,
        ip: actor.ip,
      });
    }
    return toResponse(key, undefined);
  });
}
