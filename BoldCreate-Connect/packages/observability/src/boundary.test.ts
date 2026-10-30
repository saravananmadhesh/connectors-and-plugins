import { describe, expect, it, vi } from 'vitest';
import { instrumentBoundary, instrumentCall } from './boundary.js';

class FakeKms {
  readonly name = 'kms';
  async wrapKey(): Promise<string> {
    throw Object.assign(new Error('unavailable'), { code: 'UNAVAILABLE' });
  }
  async unwrapKey(): Promise<string> {
    return 'plain';
  }
  failSync(): string {
    throw new TypeError('bad input');
  }
  label(): string {
    return this.name;
  }
}

function setup(options: Partial<Parameters<typeof instrumentBoundary>[1]> = {}) {
  const reportError = vi.fn<(error: unknown, context?: object) => void>();
  const kms = instrumentBoundary(new FakeKms(), {
    area: 'kms',
    errors: { reportError },
    ...options,
  });
  return { kms, reportError };
}

describe('boundary reporting', () => {
  it('reports a failed call with the area and method, and rethrows the same error', async () => {
    const { kms, reportError } = setup();
    await expect(kms.wrapKey()).rejects.toThrow('unavailable');
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'unavailable' }),
      expect.objectContaining({ area: 'kms', operation: 'kms.wrapKey', errorCode: 'UNAVAILABLE' }),
    );
  });

  it('reports a synchronous throw and names the error class when there is no code', () => {
    const { kms, reportError } = setup();
    expect(() => kms.failSync()).toThrow('bad input');
    expect(reportError).toHaveBeenCalledWith(
      expect.any(TypeError),
      expect.objectContaining({ operation: 'kms.failSync', errorCode: 'TypeError' }),
    );
  });

  it('stays silent on success and keeps the method bound to the port', async () => {
    const { kms, reportError } = setup();
    await expect(kms.unwrapKey()).resolves.toBe('plain');
    expect(kms.label()).toBe('kms');
    expect(reportError).not.toHaveBeenCalled();
  });

  it('only watches the listed methods', async () => {
    const { kms, reportError } = setup({ methods: ['unwrapKey'] });
    await expect(kms.wrapKey()).rejects.toThrow('unavailable');
    expect(reportError).not.toHaveBeenCalled();
  });

  it('skips failures the caller marks as expected answers', async () => {
    const { kms, reportError } = setup({ shouldReport: () => false });
    await expect(kms.wrapKey()).rejects.toThrow('unavailable');
    expect(reportError).not.toHaveBeenCalled();
  });

  it('adds caller context and never lets a failing reporter change the outcome', async () => {
    const described = setup({ describe: (_error, method) => ({ extra: { step: method } }) });
    await expect(described.kms.wrapKey()).rejects.toThrow('unavailable');
    expect(described.reportError).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ extra: { step: 'wrapKey' } }),
    );

    const broken = setup();
    broken.reportError.mockImplementation(() => {
      throw new Error('sink down');
    });
    await expect(broken.kms.wrapKey()).rejects.toThrow('unavailable');
  });
});

describe('instrumentCall', () => {
  it('reports a failing call under its name and throws it again', async () => {
    const reportError = vi.fn<(error: unknown, context: object) => void>();
    const wrapped = instrumentCall(
      async (_url: string) => {
        throw new Error('reset');
      },
      'fetch',
      { area: 'upstream', errors: { reportError } },
    );
    await expect(wrapped('https://x.test')).rejects.toThrow('reset');
    expect(reportError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ area: 'upstream', operation: 'upstream.fetch' }),
    );
  });

  it('passes a result through and leaves out what shouldReport refuses', async () => {
    const reportError = vi.fn<(error: unknown, context: object) => void>();
    const ok = instrumentCall((n: number) => n + 1, 'add', {
      area: 'math',
      errors: { reportError },
    });
    expect(ok(1)).toBe(2);
    const refused = instrumentCall(
      () => {
        throw new Error('expected');
      },
      'run',
      { area: 'x', errors: { reportError }, shouldReport: () => false },
    );
    expect(() => refused()).toThrow('expected');
    expect(reportError).not.toHaveBeenCalled();
  });
});
