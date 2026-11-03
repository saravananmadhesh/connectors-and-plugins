import {
  LIMIT_DEFINITIONS,
  type LimitKey,
  type LimitScope,
  type LimitSource,
} from '@boldcreate-integrations/limits';

export interface StoredLimit {
  key: string;
  scope: LimitScope;
  scopeId: string | null;
  value: number;
  expiresAt: Date | null;
}

export interface LimitSubject {
  projectId?: string | undefined;
  organizationId?: string | undefined;
}

export interface ResolvedLimit {
  limit: number;
  windowSeconds: number;
  source: LimitSource;
}

/** Stored values indexed for lookup: `key` then `scope`, then `scopeId` (empty for global). */
export type LimitSnapshot = ReadonlyMap<string, StoredLimit>;

const slot = (key: string, scope: LimitScope, scopeId: string | null): string =>
  `${key}|${scope}|${scopeId ?? ''}`;

export function buildSnapshot(rows: readonly StoredLimit[]): LimitSnapshot {
  return new Map(rows.map((row) => [slot(row.key, row.scope, row.scopeId), row]));
}

/**
 * The value in force for a subject: the project's own value, then its organization's, then the
 * global one, then the built-in value. A row past its expiry is skipped, so a temporary raise
 * falls back without anyone removing it. Pure, so every level is testable without a database.
 */
export function resolveLimit(
  snapshot: LimitSnapshot,
  key: LimitKey,
  subject: LimitSubject,
  now: Date,
): ResolvedLimit {
  const definition = LIMIT_DEFINITIONS[key];
  const candidates: Array<[LimitScope, string | null | undefined]> = [
    ['project', subject.projectId],
    ['organization', subject.organizationId],
    ['global', null],
  ];
  for (const [scope, scopeId] of candidates) {
    if (scopeId === undefined) continue;
    const row = snapshot.get(slot(key, scope, scopeId));
    if (!row) continue;
    if (row.expiresAt !== null && row.expiresAt.getTime() <= now.getTime()) continue;
    return { limit: row.value, windowSeconds: definition.windowSeconds, source: scope };
  }
  return { limit: definition.default, windowSeconds: definition.windowSeconds, source: 'default' };
}
