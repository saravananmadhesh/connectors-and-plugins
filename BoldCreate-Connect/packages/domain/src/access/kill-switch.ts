import { and, eq, isNull } from 'drizzle-orm';
import {
  KILL_SWITCH_TARGET_KINDS,
  killSwitchTable,
  type Executor,
  type KillSwitchTargetKind,
} from '@boldcreate-integrations/db';
import type { CachePort, ClockPort } from '@boldcreate-integrations/ports';
import { writeAudit } from '../audit/write-audit.js';
import { AppError, notFound, validationFailed } from '../errors.js';
import { bumpCatalogRevision, killCacheKey, killChangeId } from './catalog-revision.js';
import { createLayeredLookup } from './layered-lookup.js';

export interface KillSwitchStoreOptions {
  db: Executor;
  cache?: CachePort | undefined;
  clock: ClockPort;
  ttlSeconds: number;
}

export interface KillSwitchStore {
  /** True while an active kill switch exists for the target; the only reader of kill switches. */
  isKilled(kind: KillSwitchTargetKind, id: string): Promise<boolean>;
  /** Drops the process-local entries. */
  invalidate(): void;
}

export function createKillSwitchStore(options: KillSwitchStoreOptions): KillSwitchStore {
  const lookup = createLayeredLookup(options);
  return {
    async isKilled(kind, id) {
      return lookup.read(`${kind}:${id}`, killCacheKey(kind, id), async () => {
        const [row] = await options.db
          .select({ id: killSwitchTable.id })
          .from(killSwitchTable)
          .where(
            and(
              eq(killSwitchTable.targetKind, kind),
              eq(killSwitchTable.targetId, id),
              isNull(killSwitchTable.liftedAt),
            ),
          )
          .limit(1);
        return row !== undefined;
      });
    },
    invalidate() {
      lookup.clear();
    },
  };
}

function checkReason(reason: string): void {
  if (reason.length < 1 || reason.length > 500) {
    throw validationFailed([{ field: 'reason', message: 'Must be between 1 and 500 characters.' }]);
  }
}

export interface CreateKillSwitchInput {
  kind: KillSwitchTargetKind;
  id: string;
  reason: string;
  /** Id of the platform administrator identity making the change. */
  actor: string;
}

/**
 * Switches a target off. An identical active switch fails with `kill_switch_conflict`. Audit row
 * and revision job commit with the switch or not at all.
 */
export async function createKillSwitch(
  tx: Executor,
  input: CreateKillSwitchInput,
  evict?: CachePort | undefined,
): Promise<{ id: string }> {
  if (!KILL_SWITCH_TARGET_KINDS.includes(input.kind)) {
    throw validationFailed([{ field: 'kind', message: 'Unknown target kind.' }]);
  }
  checkReason(input.reason);
  // Conflicts are resolved by the insert itself so the caller's transaction stays usable.
  const [row] = await tx
    .insert(killSwitchTable)
    .values({
      targetKind: input.kind,
      targetId: input.id,
      reason: input.reason,
      createdBy: input.actor,
    })
    .onConflictDoNothing()
    .returning({ id: killSwitchTable.id });
  if (!row) throw new AppError('kill_switch_conflict');
  await writeAudit(tx, {
    actor: { kind: 'platform_admin', id: input.actor },
    action: 'kill_switch.created',
    target: { kind: input.kind, id: input.id },
    context: { killSwitchId: row.id, reason: input.reason },
  });
  await bumpCatalogRevision(tx, killChangeId(input.kind, input.id));
  if (evict) {
    const key = killCacheKey(input.kind, input.id);
    await evict.delete(key).catch(() => undefined);
  }
  return { id: row.id };
}

export interface LiftKillSwitchInput {
  id: string;
  reason: string;
  actor: string;
}

/** Lifts an active kill switch; the record stays. A switch that is not active is `not_found`. */
export async function liftKillSwitch(
  tx: Executor,
  input: LiftKillSwitchInput,
  evict?: CachePort | undefined,
): Promise<void> {
  checkReason(input.reason);
  const [row] = await tx
    .update(killSwitchTable)
    .set({ liftedAt: new Date(), liftedBy: input.actor, liftReason: input.reason })
    .where(and(eq(killSwitchTable.id, input.id), isNull(killSwitchTable.liftedAt)))
    .returning({ kind: killSwitchTable.targetKind, targetId: killSwitchTable.targetId });
  if (!row) throw notFound();
  await writeAudit(tx, {
    actor: { kind: 'platform_admin', id: input.actor },
    action: 'kill_switch.lifted',
    target: { kind: row.kind, id: row.targetId },
    context: { killSwitchId: input.id, reason: input.reason },
  });
  await bumpCatalogRevision(tx, killChangeId(row.kind, row.targetId));
  if (evict) {
    const key = killCacheKey(row.kind, row.targetId);
    await evict.delete(key).catch(() => undefined);
  }
}
