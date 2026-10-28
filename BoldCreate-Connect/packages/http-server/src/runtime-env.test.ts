import { afterEach, describe, expect, it } from 'vitest';
import { applyRuntimeEnv } from './runtime-env.js';

describe('applyRuntimeEnv', () => {
  const original = process.env['UV_THREADPOOL_SIZE'];
  afterEach(() => {
    if (original === undefined) delete process.env['UV_THREADPOOL_SIZE'];
    else process.env['UV_THREADPOOL_SIZE'] = original;
  });

  it('sets UV_THREADPOOL_SIZE from the config', () => {
    applyRuntimeEnv({ UV_THREADPOOL_SIZE: 8 });
    expect(process.env['UV_THREADPOOL_SIZE']).toBe('8');
    applyRuntimeEnv({ UV_THREADPOOL_SIZE: 16 });
    expect(process.env['UV_THREADPOOL_SIZE']).toBe('16');
  });
});
