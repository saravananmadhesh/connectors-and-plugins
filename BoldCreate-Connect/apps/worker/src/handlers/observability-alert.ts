/**
 * Mails operators when an error is new or spiking, then schedules the next check. One mail lists
 * every group found in the run. A group is only marked as alerted once a mail reached somebody,
 * so a mail system that is down does not silence an error; the next run tries again.
 */
import {
  findAlertableErrors,
  recordErrorAlertsSent,
  type Db,
  type ErrorAlertCandidate,
  type ErrorAlertPolicy,
} from '@boldcreate-integrations/db';
import type { ErrorReporter } from '@boldcreate-integrations/observability';
import type { ClaimedJob, EmailPort } from '@boldcreate-integrations/ports';
import { errorAlertEmail } from '../email-templates.js';
import { ensureRecurringJobScheduled, scheduleNextRecurringRun } from './recurring-job.js';

const JOB_TYPE = 'observability.alert_due';

export interface ObservabilityAlertDeps {
  /** The service's own database, where the next check is scheduled. */
  db: Db;
  /** Where errors and events are stored; `db` when they share one database. */
  store?: Db;
  email: EmailPort;
  /** Who receives alerts. Empty switches alerting off. */
  recipients: readonly string[];
  policy: ErrorAlertPolicy;
  /** Seconds between checks (`OBSERVABILITY_ALERT_INTERVAL_SECONDS`). */
  intervalSeconds: number;
  /** Address of the public app, used for the logo in the mail. */
  baseUrl: string;
  /** Address of the admin app; mails link to its error pages when set. */
  adminUrl?: string | undefined;
  errors?: ErrorReporter;
  find?: typeof findAlertableErrors;
  now?: () => Date;
}

export interface AlertRunResult {
  /** Groups the mail was about. */
  reported: number;
  /** Recipients the mail reached. */
  delivered: number;
}

export async function handleObservabilityAlertDue(
  _job: ClaimedJob,
  deps: ObservabilityAlertDeps,
): Promise<AlertRunResult> {
  const now = (deps.now ?? (() => new Date()))();
  const store = deps.store ?? deps.db;
  const candidates: ErrorAlertCandidate[] = await (deps.find ?? findAlertableErrors)(
    store,
    deps.policy,
    now,
  );
  let delivered = 0;
  if (candidates.length > 0 && deps.recipients.length > 0) {
    const mail = errorAlertEmail(candidates, deps.baseUrl, deps.adminUrl);
    const outcomes = await Promise.allSettled(
      deps.recipients.map((to) => deps.email.send({ to, ...mail })),
    );
    for (const outcome of outcomes) {
      if (outcome.status === 'fulfilled') delivered += 1;
      else {
        deps.errors?.reportError(outcome.reason, { area: 'worker', operation: JOB_TYPE });
      }
    }
    if (delivered > 0) await recordErrorAlertsSent(store, candidates, delivered, now);
  }
  await scheduleNextRecurringRun(deps.db, JOB_TYPE, now, deps.intervalSeconds);
  return { reported: delivered > 0 ? candidates.length : 0, delivered };
}

/** Enqueues the first alert check unless one is already waiting; called when the worker starts. */
export const ensureObservabilityAlertScheduled = (db: Db): Promise<boolean> =>
  ensureRecurringJobScheduled(db, JOB_TYPE);
