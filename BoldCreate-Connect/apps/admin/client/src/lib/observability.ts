/** Wording, colours and arithmetic for the errors, events and storage screens. */
import type { AdminErrorGroup, AdminErrorOccurrence, AdminOpsEvent } from './api';
import { OBSERVABILITY_RANGES, type ObservabilitySearch, type OverviewWindow } from './search';

type Tone = 'success' | 'warning' | 'info' | 'destructive' | 'secondary';

/** The services that report; the server accepts any name, so this only feeds the filter. */
export const SERVICES = ['api', 'gateway', 'admin', 'worker'] as const;

export const OVERVIEW_WINDOW_TEXT: Record<OverviewWindow, string> = {
  '1h': 'Last hour',
  '24h': 'Last 24 hours',
  '7d': 'Last 7 days',
};

export const ERROR_STATUS_TEXT: Record<AdminErrorGroup['status'], string> = {
  unresolved: 'Unresolved',
  resolved: 'Resolved',
  ignored: 'Ignored',
};

export const ERROR_STATUS_TONE: Record<AdminErrorGroup['status'], Tone> = {
  unresolved: 'destructive',
  resolved: 'success',
  ignored: 'secondary',
};

export const SEVERITY_TEXT: Record<AdminOpsEvent['severity'], string> = {
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
};

export const SEVERITY_TONE: Record<AdminOpsEvent['severity'], Tone> = {
  info: 'info',
  warning: 'warning',
  error: 'destructive',
};

/** `startup_check_failed` reads as "Startup check failed"; a prefix keeps its dot. */
export function eventKindText(kind: string): string {
  const words = kind.replace(/[_.]+/g, ' ').trim();
  return words === '' ? kind : words.charAt(0).toUpperCase() + words.slice(1);
}

/** The status changes offered for a group in its current state. */
export function statusActions(
  status: AdminErrorGroup['status'],
): { to: AdminErrorGroup['status']; label: string }[] {
  return status === 'unresolved'
    ? [
        { to: 'resolved', label: 'Mark resolved' },
        { to: 'ignored', label: 'Ignore' },
      ]
    : [{ to: 'unresolved', label: 'Reopen' }];
}

/** The start of the chosen window, counted back from when the page was opened and cut to the minute. */
export function sinceOf(range: ObservabilitySearch['range'], openedAt: number): string | undefined {
  if (!range) return undefined;
  return new Date(
    Math.floor((openedAt - OBSERVABILITY_RANGES[range]) / 60_000) * 60_000,
  ).toISOString();
}

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

export function formatStorage(bytes: number): string {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${unit === 0 ? value : value.toFixed(1)} ${UNITS[unit]}`;
}

/** How full the size limit is, 0 to 100, or null when there is no limit. */
export function storageShare(totalBytes: number, maxTotalBytes: number): number | null {
  if (maxTotalBytes <= 0) return null;
  return Math.min(100, Math.round((totalBytes / maxTotalBytes) * 100));
}

export const formatCount = (count: number): string => count.toLocaleString('en');

/** Keys and values of a stored record, as the server kept it. */
export function recordRows(record: Record<string, unknown> | null): [string, string][] {
  return Object.entries(record ?? {}).map(([key, value]) => [
    key,
    typeof value === 'string' ? value : JSON.stringify(value),
  ]);
}

/** One occurrence as plain text, ready to paste into a ticket or a chat. */
export function occurrenceText(
  group: Pick<AdminErrorGroup, 'title' | 'service' | 'area'>,
  item: AdminErrorOccurrence,
): string {
  const facts: [string, string | null][] = [
    ['Error', group.title],
    ['Service', group.area ? `${group.service} · ${group.area}` : group.service],
    ['Time', item.occurredAt],
    ['Environment', item.environment],
    ['Release', item.appVersion],
    ['Instance', item.instanceId],
    ['Request', item.requestId],
    ['Trace', item.traceId],
    ['Organization', item.orgId],
  ];
  const lines = facts.flatMap(([term, value]) => (value ? [`${term}: ${value}`] : []));
  for (const [key, value] of recordRows(item.context)) lines.push(`${key}: ${value}`);
  if (item.stack) lines.push('', 'Stack:', item.stack);
  return lines.join('\n');
}

/** An error group with its occurrences, or the group alone, as formatted JSON for a ticket or a chat. */
export function errorJson(group: AdminErrorGroup, occurrences?: AdminErrorOccurrence[]): string {
  return JSON.stringify(occurrences ? { ...group, occurrences } : group, null, 2);
}

/** One key event as formatted JSON. */
export function eventJson(event: AdminOpsEvent): string {
  return JSON.stringify(event, null, 2);
}

/** Table names are stored as `error_event`; people read "Error event". */
export function tableText(table: string): string {
  return eventKindText(table);
}
