/**
 * What a project webhook receives. Events come from the audit trail: each audit action maps to one
 * event type, and only a few safe keys of the audit context go into the payload. The retry delay
 * doubles with every failed send.
 */
import {
  WEBHOOK_PAYLOAD_VERSION,
  formatId,
  type WebhookEvent,
} from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { parseAuditContext } from '../audit/audit-paging.js';

/** The audit action that produces each event type. */
export const WEBHOOK_AUDIT_ACTIONS: Record<WebhookEvent, string> = {
  'user.created': 'project_user.created',
  'user_plugin.installed': 'user_plugin.installed',
  'user_plugin.updated': 'user_plugin.updated',
  'user_plugin.removed': 'user_plugin.removed',
  'connection.activated': 'connection.activated',
  'connection.expired': 'connection.expired',
  'sync.reported': 'sync.reported',
  'plugin.suspended': 'plugin.suspended',
};

const EVENT_OF_ACTION = new Map<string, WebhookEvent>(
  (Object.entries(WEBHOOK_AUDIT_ACTIONS) as [WebhookEvent, string][]).map(([event, action]) => [
    action,
    event,
  ]),
);

export const webhookEventOf = (action: string): WebhookEvent | undefined =>
  EVENT_OF_ACTION.get(action);

/** The audit actions behind a set of subscribed events. */
export const auditActionsOf = (events: readonly string[]): string[] =>
  (events as WebhookEvent[]).flatMap((event) => WEBHOOK_AUDIT_ACTIONS[event] ?? []);

export interface WebhookPayload {
  id: string;
  type: WebhookEvent;
  version: number;
  createdAt: string;
  projectId: string;
  userId?: string;
  data: Record<string, string | number | null>;
}

export interface AuditEventRow {
  eventId: string;
  action: string;
  createdAt: Date;
  targetKind: string | null;
  targetId: string | null;
  context: string | null;
}

/** Ids in the audit context are row uuids; a host sees the wire form. */
function idOnTheWire(key: string, value: string): string {
  const prefix = key === 'pluginId' ? 'plg' : key === 'pluginVersionId' ? 'pv' : null;
  return prefix !== null && /^[0-9a-f-]{36}$/.test(value) ? formatId(prefix, value) : value;
}

const TEXT_KEYS = ['pluginId', 'pluginVersionId', 'component', 'kind', 'target'] as const;
const COUNT_KEYS = ['appliedCount', 'skipped'] as const;

/** The body of a delivery, or null for an audit action that is not an event. */
export function buildWebhookPayload(input: {
  row: AuditEventRow;
  projectId: string;
  /** The host's own id of the user the event is about. */
  userId: string | null;
}): WebhookPayload | null {
  const type = webhookEventOf(input.row.action);
  if (type === undefined) return null;
  const context = parseAuditContext(input.row.context) ?? {};
  const data: WebhookPayload['data'] = {};
  if (input.row.targetKind === 'installation' && input.row.targetId) {
    data['installationId'] = formatId('ins', input.row.targetId);
  }
  if (input.row.targetKind === 'plugin' && input.row.targetId)
    data['pluginId'] = formatId('plg', input.row.targetId);
  for (const key of TEXT_KEYS) {
    const value = context[key];
    if (typeof value === 'string' && value.length <= 255) data[key] = idOnTheWire(key, value);
    else if (key === 'target' && value === null) data[key] = null;
  }
  for (const key of COUNT_KEYS) {
    const value = context[key];
    if (typeof value === 'number' && Number.isInteger(value) && value >= 0) data[key] = value;
  }
  return {
    id: formatId('evt', input.row.eventId),
    type,
    version: WEBHOOK_PAYLOAD_VERSION,
    createdAt: input.row.createdAt.toISOString(),
    projectId: formatId('prj', input.projectId),
    ...(input.userId !== null ? { userId: input.userId } : {}),
    data,
  };
}

/** How long a host has to answer. */
export const WEBHOOK_TIMEOUT_MS = PROJECT_LIMITS.webhookTimeoutSeconds * 1000;

const MAX_BACKOFF_SECONDS = 6 * 3600;

/** Seconds to wait after the `attempts`-th failed send (1 for the first). */
export function webhookBackoffSeconds(attempts: number, baseSeconds: number): number {
  return Math.min(baseSeconds * 2 ** Math.max(attempts - 1, 0), MAX_BACKOFF_SECONDS);
}
