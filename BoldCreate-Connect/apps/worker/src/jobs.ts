/**
 * Job handlers for the outbox queue. Claiming, leases and retry scheduling live in the
 * `postgres-queue` adapter; this module is the handler table and the poll loop around it.
 */
import { randomUUID } from 'node:crypto';
import type { PostgresQueue } from '@boldcreate-integrations/adapters/postgres-queue';
import { ROLE_LABELS, type EventType } from '@boldcreate-integrations/contracts';
import type { IngestionDeps } from '@boldcreate-integrations/domain';
import type { ClaimedJob, EmailPort } from '@boldcreate-integrations/ports';
import type { Logger } from 'pino';
import {
  handleIdempotencyPurgeDue,
  type IdempotencyPurgeDeps,
} from './handlers/idempotency-purge.js';
import {
  handleProjectWebhookDispatch,
  type ProjectWebhookDeps,
} from './handlers/project-webhook.js';
import { handlePluginIngestionRequested } from './handlers/plugin-ingestion.js';
import { handlePluginArchivePurgeRequested } from './handlers/plugin-archive-purge.js';
import { handleOrgKeyRequested, type OrgKeyHandlerDeps } from './handlers/org-key.js';
import { handleRevisionBumped, type RevisionHandlerDeps } from './handlers/revision.js';

const LEASE_MS = 60_000;
const BATCH_SIZE = 10;
const MAX_ATTEMPTS = 6;

type JobOptions = {
  emailAdapter: EmailPort;
  baseUrl: string;
  log: Logger;
  orgKeys: OrgKeyHandlerDeps;
  idempotency: IdempotencyPurgeDeps;
  revision: RevisionHandlerDeps;
  ingestion: IngestionDeps;
  webhooks: ProjectWebhookDeps;
};

function asObject(payload: unknown, message: string): Record<string, unknown> {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    throw new Error(message);
  }
  return payload as Record<string, unknown>;
}

/** The invite payload carries the role's display name. */
function parseRoleLabel(raw: unknown): string {
  const labels: string[] = Object.values(ROLE_LABELS);
  if (typeof raw === 'string' && labels.includes(raw)) return raw;
  throw new Error('Invalid invitation role');
}

function parseEmailPayload(raw: unknown) {
  const payload = asObject(raw, 'Invalid email payload');
  const { to, token } = payload;
  if (
    typeof to !== 'string' ||
    to.length > 254 ||
    !/^[^\s@<>\p{Cc}]+@[^\s@<>\p{Cc}]+\.[^\s@<>\p{Cc}]+$/u.test(to) ||
    typeof token !== 'string' ||
    token.length === 0 ||
    token.length > 512 ||
    /[\s\p{Cc}]/u.test(token)
  ) {
    throw new Error('Invalid email recipient or token');
  }
  const role = parseRoleLabel('role' in payload ? payload['role'] : ROLE_LABELS.MEMBER);
  return { to, token, role };
}

function parseDeletionPayload(raw: unknown): {
  to: string;
  displayName: string;
  resourceKind: 'org';
  resourceName: string;
  resourceSlug: string;
} {
  const payload = asObject(raw, 'Invalid deletion payload');
  const { to, displayName, resourceKind, resourceName, resourceSlug } = payload;
  if (
    typeof to !== 'string' ||
    to.length === 0 ||
    to.length > 254 ||
    typeof displayName !== 'string' ||
    resourceKind !== 'org' ||
    typeof resourceName !== 'string' ||
    typeof resourceSlug !== 'string'
  ) {
    throw new Error('Invalid deletion payload shape');
  }
  return { to, displayName, resourceKind, resourceName, resourceSlug };
}

const emailTemplates = {
  'email_verification.requested': {
    path: '/verify-email',
    subject: 'Verify your email address',
    ttl: '24 hours',
  },
  'password_reset.requested': {
    path: '/reset-password',
    subject: 'Reset your password',
    ttl: '1 hour',
  },
  'email_change.requested': {
    path: '/confirm-email-change',
    subject: 'Confirm your new email address',
    ttl: '24 hours',
  },
  'invite.created': {
    path: '/accept-invite',
    subject: "You've been invited to join an organization",
    ttl: '7 days',
  },
};

const emailActions = {
  'email_verification.requested': 'verify your email address',
  'password_reset.requested': 'reset your password',
  'email_change.requested': 'confirm your new email address',
} as const;

type Handler = (job: ClaimedJob, options: JobOptions) => Promise<void>;

function linkEmailHandler(type: keyof typeof emailTemplates): Handler {
  return async (job, options) => {
    const template = emailTemplates[type];
    const payload = parseEmailPayload(job.payload);
    const link = new URL(template.path, options.baseUrl);
    link.searchParams.set('token', payload.token);
    const text =
      type === 'invite.created'
        ? `You've been invited as ${payload.role}.\n\nAccept the invitation:\n\n${link}\n\nThis link expires in ${template.ttl}.`
        : `Click the link to ${emailActions[type]}:

${link}

This link expires in ${template.ttl}.`;
    await options.emailAdapter.send({ to: payload.to, subject: template.subject, text });
  };
}

const handlers: Record<EventType, Handler> = {
  'idempotency_key.purge_due': async (job, options) => {
    await handleIdempotencyPurgeDue(job, options.idempotency);
  },
  'project_webhook.dispatch_due': (job, options) =>
    handleProjectWebhookDispatch(job, options.webhooks),
  'org_key.requested': (job, options) => handleOrgKeyRequested(job, options.orgKeys),
  'revision.bumped': (job, options) => handleRevisionBumped(job, options.revision),
  'email_verification.requested': linkEmailHandler('email_verification.requested'),
  'password_reset.requested': linkEmailHandler('password_reset.requested'),
  'email_change.requested': linkEmailHandler('email_change.requested'),
  'invite.created': linkEmailHandler('invite.created'),
  'plugin_ingestion.requested': (job, options) =>
    handlePluginIngestionRequested(job, options.ingestion),
  'plugin_archive.purge_requested': (job, options) =>
    handlePluginArchivePurgeRequested(job, options.ingestion),
  'admin_setup.requested': async (job, options) => {
    const payload = asObject(job.payload, 'Invalid admin setup payload');
    const { to, url } = payload;
    if (
      typeof to !== 'string' ||
      to.length > 254 ||
      !/^[^\s@<>\p{Cc}]+@[^\s@<>\p{Cc}]+\.[^\s@<>\p{Cc}]+$/u.test(to) ||
      typeof url !== 'string' ||
      url.length > 1024 ||
      !/^https?:\/\/[^\s\p{Cc}]+$/u.test(url)
    ) {
      throw new Error('Invalid admin setup recipient or link');
    }
    await options.emailAdapter.send({
      to,
      subject: 'Set up your admin password',
      text: `Click the link to choose your admin password:\n\n${url}\n\nThis link expires in 30 minutes and works once. If you did not ask for it, ignore this message.`,
    });
  },
  'deletion.requested': async (job, options) => {
    const payload = parseDeletionPayload(job.payload);
    const kindLabel = 'organization';
    const subject = `Your ${kindLabel} "${payload.resourceName}" has been deleted`;
    const text = [
      `Hi ${payload.displayName},`,
      '',
      `The ${kindLabel} "${payload.resourceName}" (${payload.resourceSlug}) has been permanently deleted.`,
      '',
      'All associated API keys, connections, and installations have been removed.',
      '',
      'If you did not expect this, contact your administrator.',
    ].join('\n');
    await options.emailAdapter.send({ to: payload.to, subject, text });
  },
};

export const HANDLED_TYPES = Object.keys(handlers) as EventType[];

/** Runs the handler for a job; throws for unknown types and malformed payloads. */
export async function dispatchJob(job: ClaimedJob, options: JobOptions): Promise<void> {
  if (!Object.hasOwn(handlers, job.type)) throw new Error('Unknown outbox event type');
  await handlers[job.type as EventType](job, options);
}

export async function pollJobs(queue: PostgresQueue, options: JobOptions): Promise<void> {
  // A new owner token per batch prevents stale completions from matching a later lease.
  const owner = randomUUID();
  const jobs = await queue.claim({
    types: HANDLED_TYPES,
    limit: BATCH_SIZE,
    leaseMs: LEASE_MS,
    owner,
  });
  for (const job of jobs) {
    try {
      // Renew and recheck immediately before dispatch; earlier jobs may have used the lease.
      if (!(await queue.renew(job.id, LEASE_MS))) continue;
      await dispatchJob(job, options);
      await queue.complete(job.id);
      options.log.info({ id: job.id, eventType: job.type }, 'Job processed');
    } catch {
      // Do not log adapter errors or SQL parameters: they can contain email tokens.
      options.log.warn(
        { id: job.id, attempt: Math.min(job.attempts + 1, MAX_ATTEMPTS) },
        'Job failed',
      );
      await queue.fail(job.id, { retryAt: null, error: 'delivery failed' });
    }
  }
}
