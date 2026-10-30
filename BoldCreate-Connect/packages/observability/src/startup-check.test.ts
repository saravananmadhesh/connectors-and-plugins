import { describe, expect, it, vi } from 'vitest';
import { createStartupChecks, type StartupCheckFailure } from './startup-check.js';

function setup(checks: Record<string, () => Promise<unknown>>, timeoutMs?: number) {
  const recordOpsEvent = vi.fn<(kind: string, severity: string, detail?: object) => void>();
  const onFailure = vi.fn<(failure: StartupCheckFailure) => void>();
  const startup = createStartupChecks({
    service: 'api',
    errors: { recordOpsEvent },
    checks,
    onFailure,
    ...(timeoutMs ? { timeoutMs } : {}),
  });
  return { startup, recordOpsEvent, onFailure };
}

describe('startup checks', () => {
  it('records the deploy marker and nothing else when every check passes', async () => {
    const { startup, recordOpsEvent, onFailure } = setup({ db: async () => 1 });
    expect(await startup.run()).toEqual([]);
    expect(recordOpsEvent).toHaveBeenCalledOnce();
    expect(recordOpsEvent).toHaveBeenCalledWith('deploy_started', 'info', expect.any(Object));
    expect(onFailure).not.toHaveBeenCalled();
    await expect(startup.readiness()).resolves.toBeUndefined();
  });

  it('records each failing check without its message and fails readiness', async () => {
    const { startup, recordOpsEvent, onFailure } = setup({
      db: async () => 1,
      kms: async () => {
        throw new TypeError('connection refused, leak-marker-7f3a');
      },
    });
    const failures = await startup.run();
    expect(failures).toEqual([{ check: 'kms', errorClass: 'TypeError' }]);
    expect(onFailure).toHaveBeenCalledWith({ check: 'kms', errorClass: 'TypeError' });
    expect(recordOpsEvent).toHaveBeenCalledWith(
      'startup_check_failed',
      'error',
      expect.objectContaining({ operation: 'kms', errorClass: 'TypeError' }),
    );
    expect(JSON.stringify(recordOpsEvent.mock.calls)).not.toContain('leak-marker-7f3a');
    await expect(startup.readiness()).rejects.toThrow('startup checks failing: kms');
  });

  it('heals readiness once the failing check passes again', async () => {
    let up = false;
    const { startup } = setup({
      redis: async () => {
        if (!up) throw new Error('down');
      },
    });
    await startup.run();
    await expect(startup.readiness()).rejects.toThrow('startup checks failing: redis');
    up = true;
    await expect(startup.readiness()).resolves.toBeUndefined();
  });

  it('reports an advisory check that fails but keeps readiness passing', async () => {
    const onFailure = vi.fn<(failure: StartupCheckFailure) => void>();
    const recordOpsEvent = vi.fn<(kind: string, severity: string, detail?: object) => void>();
    const startup = createStartupChecks({
      service: 'api',
      errors: { recordOpsEvent },
      checks: { db: async () => 1, store: async () => Promise.reject(new TypeError('x')) },
      advisory: ['store'],
      onFailure,
    });
    expect(await startup.run()).toEqual([{ check: 'store', errorClass: 'TypeError' }]);
    expect(onFailure).toHaveBeenCalledOnce();
    await expect(startup.readiness()).resolves.toBeUndefined();
  });

  it('counts a check that never answers as failed', async () => {
    const { startup } = setup({ blob: () => new Promise(() => {}) }, 20);
    expect(await startup.run()).toEqual([{ check: 'blob', errorClass: 'Error' }]);
  });
});
