import { describe, expect, it, vi } from 'vitest';
import type { Db, ErrorAlertCandidate, ErrorAlertPolicy } from '@boldcreate-integrations/db';
import type { ClaimedJob } from '@boldcreate-integrations/ports';

const insertOutbox = vi.hoisted(() => vi.fn<(db: unknown, row: unknown) => Promise<void>>());
const recordErrorAlertsSent = vi.hoisted(() =>
  vi.fn<(db: unknown, candidates: unknown, recipients: number, now: Date) => Promise<void>>(),
);
vi.mock('@boldcreate-integrations/db', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  insertOutbox,
  recordErrorAlertsSent,
}));

const { handleObservabilityAlertDue } = await import('./observability-alert.js');

const job: ClaimedJob = { id: 'j', type: 'observability.alert_due', payload: {}, attempts: 0 };
const policy: ErrorAlertPolicy = {
  newGroupWindowSeconds: 600,
  spikeWindowSeconds: 600,
  spikeOccurrences: 20,
  cooldownSeconds: 21_600,
  maxGroups: 10,
};
const NOW = new Date('2026-01-01T00:00:00Z');
const candidate: ErrorAlertCandidate = {
  groupId: '00000000-0000-4000-8000-0000000000a1',
  service: 'api',
  area: 'kms',
  title: 'KMS unwrap failed',
  count: 3,
  firstSeen: NOW,
  lastSeen: NOW,
  appVersion: '1',
  reason: 'new',
  recentOccurrences: 3,
};

function setup(options: { found?: ErrorAlertCandidate[]; recipients?: string[] } = {}) {
  insertOutbox.mockReset().mockResolvedValue(undefined);
  recordErrorAlertsSent.mockReset().mockResolvedValue(undefined);
  const send = vi.fn<(message: { to: string; subject: string }) => Promise<void>>();
  send.mockResolvedValue(undefined);
  const reportError = vi.fn<(error: unknown, context?: object) => void>();
  const deps = {
    db: {} as Db,
    email: { send },
    recipients: options.recipients ?? ['ops@example.test', 'lead@example.test'],
    policy,
    intervalSeconds: 300,
    baseUrl: 'https://app.example.test',
    adminUrl: 'https://admin.example.test',
    errors: {
      reportError,
      recordOpsEvent: vi.fn<() => void>(),
      flush: vi.fn<() => void>(),
      stop: vi.fn<() => void>(),
    },
    find: vi
      .fn<() => Promise<ErrorAlertCandidate[]>>()
      .mockResolvedValue(options.found ?? [candidate]),
    now: () => NOW,
  };
  return { deps, send, reportError };
}

const scheduledNext = () =>
  expect(insertOutbox).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      type: 'observability.alert_due',
      runAt: new Date('2026-01-01T00:05:00Z'),
    }),
  );

describe('observability alert job', () => {
  it('mails every recipient once, records the groups as alerted and schedules the next check', async () => {
    const { deps, send } = setup();
    const result = await handleObservabilityAlertDue(job, deps as never);
    expect(result).toEqual({ reported: 1, delivered: 2 });
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls.map(([message]) => message.to)).toEqual([
      'ops@example.test',
      'lead@example.test',
    ]);
    expect(recordErrorAlertsSent).toHaveBeenCalledWith(deps.db, [candidate], 2, NOW);
    scheduledNext();
  });

  it('sends nothing when no error needs attention', async () => {
    const { deps, send } = setup({ found: [] });
    expect(await handleObservabilityAlertDue(job, deps as never)).toEqual({
      reported: 0,
      delivered: 0,
    });
    expect(send).not.toHaveBeenCalled();
    expect(recordErrorAlertsSent).not.toHaveBeenCalled();
    scheduledNext();
  });

  it('keeps going and records the alert when only some recipients could be reached', async () => {
    const { deps, send, reportError } = setup();
    send.mockRejectedValueOnce(new Error('smtp refused'));
    const result = await handleObservabilityAlertDue(job, deps as never);
    expect(result).toEqual({ reported: 1, delivered: 1 });
    expect(reportError).toHaveBeenCalledTimes(1);
    expect(recordErrorAlertsSent).toHaveBeenCalledWith(deps.db, [candidate], 1, NOW);
  });

  it('does not mark the errors as alerted when no mail got through, so the next run tries again', async () => {
    const { deps, send, reportError } = setup();
    send.mockRejectedValue(new Error('smtp down'));
    const result = await handleObservabilityAlertDue(job, deps as never);
    expect(result).toEqual({ reported: 0, delivered: 0 });
    expect(reportError).toHaveBeenCalledTimes(2);
    expect(recordErrorAlertsSent).not.toHaveBeenCalled();
    scheduledNext();
  });

  it('does not schedule another check when the lookup fails, so the job is retried', async () => {
    const { deps } = setup();
    deps.find.mockRejectedValue(new Error('db down'));
    await expect(handleObservabilityAlertDue(job, deps as never)).rejects.toThrow('db down');
    expect(insertOutbox).not.toHaveBeenCalled();
  });
});
