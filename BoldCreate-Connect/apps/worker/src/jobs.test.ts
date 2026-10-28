import { describe, expect, it, vi } from 'vitest';
import type { PostgresQueue } from '@boldcreate-integrations/adapters/postgres-queue';
import type { BlobPort, CachePort, ClaimedJob, KmsPort } from '@boldcreate-integrations/ports';
import type { IngestionDeps, SendOptions } from '@boldcreate-integrations/domain';
import type { Db, IdempotencyStore } from '@boldcreate-integrations/db';
import type { Logger } from 'pino';
import { dispatchJob, HANDLED_TYPES, pollJobs } from './jobs.js';

const job: ClaimedJob = {
  id: 'job-1',
  type: 'invite.created',
  payload: { to: 'member@example.test', token: 'tok', role: 'Member' },
  attempts: 0,
};

function createMock(jobs: ClaimedJob[] = [job]) {
  const queue = {
    enqueue: vi.fn<PostgresQueue['enqueue']>(),
    claim: vi.fn<PostgresQueue['claim']>().mockResolvedValue(jobs),
    renew: vi.fn<PostgresQueue['renew']>().mockResolvedValue(true),
    complete: vi.fn<PostgresQueue['complete']>().mockResolvedValue(undefined),
    fail: vi.fn<PostgresQueue['fail']>().mockResolvedValue(undefined),
  };
  const options = {
    emailAdapter: { send: vi.fn<() => Promise<void>>().mockResolvedValue(undefined) },
    baseUrl: 'https://app.example.test',
    log: { info: vi.fn<() => void>(), warn: vi.fn<() => void>() } as unknown as Logger,
    orgKeys: { db: {} as Db, kms: { wrapKey: vi.fn<KmsPort['wrapKey']>() } },
    idempotency: {
      db: {} as Db,
      store: { purgeExpired: vi.fn<IdempotencyStore['purgeExpired']>().mockResolvedValue(0) },
      intervalSeconds: 900,
      batchSize: 1000,
    },
    revision: {
      cache: {
        delete: vi.fn<CachePort['delete']>().mockResolvedValue(undefined),
        publish: vi.fn<CachePort['publish']>().mockResolvedValue(undefined),
      } as unknown as CachePort,
    },
    webhooks: {
      db: {} as Db,
      unseal: vi.fn<SendOptions['unseal']>(),
      post: vi.fn<SendOptions['post']>(),
      intervalSeconds: 5,
      lagSeconds: 0,
      retryBaseSeconds: 30,
      onError: vi.fn<(step: string) => void>(),
    },
    ingestion: {
      db: {} as Db,
      blob: {} as BlobPort,
      allowedOwners: ['acme'],
      fetchArchive: vi.fn<IngestionDeps['fetchArchive']>(),
    },
  };
  return { queue, options };
}

describe('dispatch', () => {
  it('sends the deletion notice', async () => {
    const { options } = createMock();
    await dispatchJob(
      {
        ...job,
        type: 'deletion.requested',
        payload: {
          to: 'owner@example.test',
          displayName: 'Alice',
          resourceKind: 'org',
          resourceName: 'Acme Corp',
          resourceSlug: 'acme-corp',
        },
      },
      options,
    );
    expect(options.emailAdapter.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'owner@example.test',
        subject: expect.stringContaining('organization'),
        text: expect.stringContaining('Acme Corp'),
      }),
    );
  });

  it.each([
    null,
    'text',
    [],
    {},
    {
      to: 'x@x.test',
      displayName: 'X',
      resourceKind: 'unknown',
      resourceName: 'N',
      resourceSlug: 's',
    },
    { displayName: 'X', resourceKind: 'org', resourceName: 'N', resourceSlug: 's' },
  ])('rejects malformed deletion payload %j without sending', async (payload) => {
    const { options } = createMock();
    await expect(
      dispatchJob({ ...job, type: 'deletion.requested', payload }, options),
    ).rejects.toThrow(/^Invalid deletion payload/);
    expect(options.emailAdapter.send).not.toHaveBeenCalled();
  });

  it('throws on unknown types instead of acknowledging them', async () => {
    const { options } = createMock();
    await expect(
      dispatchJob({ ...job, type: 'unknown' as ClaimedJob['type'] }, options),
    ).rejects.toThrow('Unknown outbox event type');
  });

  it.each([
    null,
    'text',
    [],
    {},
    { to: 'victim@example.test\r\nBcc: other@example.test', token: 'token' },
    { to: 'valid@example.test', token: '' },
    { to: 'valid@example.test', token: 'token', role: 'MEMBER' },
    { to: 'valid@example.test', token: 'token', role: 'Superuser' },
  ])('rejects malformed email payload %j without sending', async (payload) => {
    const { options } = createMock();
    await expect(dispatchJob({ ...job, payload }, options)).rejects.toThrow(
      /^Invalid (email|invitation)/,
    );
    expect(options.emailAdapter.send).not.toHaveBeenCalled();
  });

  it.each(['email_verification.requested', 'password_reset.requested', 'invite.created'] as const)(
    'sends %s with an encoded link',
    async (type) => {
      const { options } = createMock();
      await dispatchJob(
        {
          ...job,
          type,
          payload: { to: 'valid@example.test', token: 'token&extra', role: 'Admin' },
        },
        options,
      );
      expect(options.emailAdapter.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'valid@example.test',
          text: expect.stringContaining('token=token%26extra'),
        }),
      );
    },
  );
});

describe('admin setup mail', () => {
  const setup: ClaimedJob = {
    ...job,
    type: 'admin_setup.requested',
    payload: { to: 'ops@example.test', url: 'https://admin.example.test/setup?token=abc' },
  };

  it('sends the link', async () => {
    const { options } = createMock();
    await dispatchJob(setup, options);
    expect(options.emailAdapter.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'ops@example.test',
        text: expect.stringContaining('https://admin.example.test/setup?token=abc'),
      }),
    );
  });

  it.each([
    { to: 'not-an-email', url: 'https://admin.example.test/setup' },
    { to: 'ops@example.test', url: 'javascript:alert(1)' },
    { to: 'ops@example.test' },
  ])('rejects payload %j without sending', async (payload) => {
    const { options } = createMock();
    await expect(dispatchJob({ ...setup, payload }, options)).rejects.toThrow(
      'Invalid admin setup recipient or link',
    );
    expect(options.emailAdapter.send).not.toHaveBeenCalled();
  });
});

describe('poll', () => {
  it('claims every handled type, delivers and completes', async () => {
    const { queue, options } = createMock();
    await pollJobs(queue, options);
    expect(queue.claim).toHaveBeenCalledWith(
      expect.objectContaining({ types: HANDLED_TYPES, limit: 10, leaseMs: 60_000 }),
    );
    expect(options.emailAdapter.send).toHaveBeenCalledOnce();
    expect(queue.complete).toHaveBeenCalledWith('job-1');
    expect(queue.fail).not.toHaveBeenCalled();
  });

  it('reports a delivery failure to the queue without leaking the error', async () => {
    const { queue, options } = createMock();
    options.emailAdapter.send.mockRejectedValue(new Error('smtp error tok'));
    await pollJobs(queue, options);
    expect(queue.fail).toHaveBeenCalledWith('job-1', { retryAt: null, error: 'delivery failed' });
    expect(queue.complete).not.toHaveBeenCalled();
    expect(JSON.stringify(vi.mocked(options.log.warn).mock.calls)).not.toContain('tok');
  });

  it('does not dispatch when the lease was lost', async () => {
    const { queue, options } = createMock();
    queue.renew.mockResolvedValue(false);
    await pollJobs(queue, options);
    expect(options.emailAdapter.send).not.toHaveBeenCalled();
    expect(queue.complete).not.toHaveBeenCalled();
    expect(queue.fail).not.toHaveBeenCalled();
  });

  it('leaves a revision job for retry when publishing fails', async () => {
    const revisionJob: ClaimedJob = {
      id: 'job-2',
      type: 'revision.bumped',
      payload: { type: 'catalog', id: 'flag:oauth_dcr' },
      attempts: 0,
    };
    const { queue, options } = createMock([revisionJob]);
    vi.mocked(options.revision.cache!.publish).mockRejectedValue(new Error('redis_unavailable'));
    await pollJobs(queue, options);
    expect(queue.fail).toHaveBeenCalledWith('job-2', { retryAt: null, error: 'delivery failed' });
    expect(queue.complete).not.toHaveBeenCalled();
  });

  it('publishes and completes a revision job', async () => {
    const revisionJob: ClaimedJob = {
      id: 'job-3',
      type: 'revision.bumped',
      payload: { type: 'catalog' },
      attempts: 0,
    };
    const { queue, options } = createMock([revisionJob]);
    await pollJobs(queue, options);
    expect(options.revision.cache!.publish).toHaveBeenCalledOnce();
    expect(queue.complete).toHaveBeenCalledWith('job-3');
  });

  it('does nothing when no job is claimable', async () => {
    const { queue, options } = createMock([]);
    await pollJobs(queue, options);
    expect(options.emailAdapter.send).not.toHaveBeenCalled();
  });
});
