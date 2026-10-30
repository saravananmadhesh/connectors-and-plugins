import { randomUUID } from 'node:crypto';
import { sql } from 'drizzle-orm';
import type { Executor } from './client.js';
import { opsEventTable } from './schema/index.js';

/** The ops event written for every group an alert mail was sent about. */
export const ERROR_ALERT_SENT_KIND = 'error_alert_sent';

/** What makes an error worth an alert; every value comes from configuration. */
export interface ErrorAlertPolicy {
  /** A group first seen within this many seconds is new. */
  newGroupWindowSeconds: number;
  /** Seconds over which stored occurrences are counted for the spike rule. */
  spikeWindowSeconds: number;
  /**
   * Stored occurrences within the spike window that make a group a spike. Occurrences are
   * sampled (the first few, then one in a hundred), so a busy failure reaches this far sooner
   * than its real count suggests.
   */
  spikeOccurrences: number;
  /** A group already alerted about stays quiet this many seconds. */
  cooldownSeconds: number;
  /** The most groups one run reports. */
  maxGroups: number;
}

export type ErrorAlertReason = 'new' | 'spike';

export interface ErrorAlertCandidate {
  groupId: string;
  service: string;
  area: string | null;
  title: string;
  /** Times the failure happened in total. */
  count: number;
  firstSeen: Date;
  lastSeen: Date;
  appVersion: string | null;
  reason: ErrorAlertReason;
  /** Stored occurrences inside the spike window. */
  recentOccurrences: number;
}

interface CandidateRow extends Record<string, unknown> {
  id: string;
  service: string;
  area: string | null;
  title: string;
  count: number;
  first_ms: string;
  last_ms: string;
  app_version: string | null;
  is_new: boolean;
  recent: number;
}

const secondsBefore = (now: Date, seconds: number) => new Date(now.getTime() - seconds * 1000);

/**
 * Unresolved groups that are new or spiking and have not been alerted about lately, most recently
 * seen first. Only groups seen inside the wider of the two windows are examined, so the cost
 * follows recent activity and not the size of the table.
 */
export async function findAlertableErrors(
  db: Executor,
  policy: ErrorAlertPolicy,
  now: Date = new Date(),
): Promise<ErrorAlertCandidate[]> {
  const newSince = secondsBefore(now, policy.newGroupWindowSeconds);
  const spikeSince = secondsBefore(now, policy.spikeWindowSeconds);
  const quietSince = secondsBefore(now, policy.cooldownSeconds);
  const examineSince = newSince < spikeSince ? newSince : spikeSince;
  const result = await db.execute<CandidateRow>(sql`
    SELECT g.id, g.service, g.area, g.title, g.count, g.app_version,
           (extract(epoch FROM g.first_seen) * 1000)::bigint::text AS first_ms,
           (extract(epoch FROM g.last_seen) * 1000)::bigint::text AS last_ms,
           (g.first_seen >= ${newSince}) AS is_new,
           r.recent
    FROM error_group g
    CROSS JOIN LATERAL (
      SELECT count(*)::int AS recent
      FROM error_event e
      WHERE e.group_id = g.id AND e.occurred_at >= ${spikeSince}
    ) r
    WHERE g.status = 'unresolved'
      AND g.last_seen >= ${examineSince}
      AND (g.first_seen >= ${newSince} OR r.recent >= ${policy.spikeOccurrences})
      AND NOT EXISTS (
        SELECT 1 FROM ops_event o
        WHERE o.kind = ${ERROR_ALERT_SENT_KIND}
          AND o.occurred_at >= ${quietSince}
          AND o.detail ->> 'groupId' = g.id::text
      )
    ORDER BY g.last_seen DESC
    LIMIT ${policy.maxGroups}
  `);
  return result.rows.map((row) => ({
    groupId: row.id,
    service: row.service,
    area: row.area,
    title: row.title,
    count: Number(row.count),
    firstSeen: new Date(Number(row.first_ms)),
    lastSeen: new Date(Number(row.last_ms)),
    appVersion: row.app_version,
    reason: row.is_new ? 'new' : 'spike',
    recentOccurrences: Number(row.recent),
  }));
}

/** Notes that an alert went out for each group, which starts their cooldown. */
export async function recordErrorAlertsSent(
  db: Executor,
  candidates: readonly ErrorAlertCandidate[],
  recipients: number,
  now: Date = new Date(),
): Promise<void> {
  if (candidates.length === 0) return;
  await db.insert(opsEventTable).values(
    candidates.map((candidate) => ({
      id: randomUUID(),
      occurredAt: now,
      service: 'worker',
      kind: ERROR_ALERT_SENT_KIND,
      severity: 'info' as const,
      detail: {
        groupId: candidate.groupId,
        reason: candidate.reason,
        recipients,
      },
    })),
  );
}
