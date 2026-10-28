import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import * as z from 'zod/v4';
import { BaseSchema, loadDevEnv, loadEnv, nonEmpty, port, secret } from './env.js';

const schema = BaseSchema.extend({ PORT: port.default(3000), TOKEN: secret, NAME: nonEmpty });

describe('loadEnv', () => {
  it('returns the parsed values with defaults', () => {
    expect(loadEnv(schema, { TOKEN: 'real-token', NAME: 'x' })).toMatchObject({
      NODE_ENV: 'development',
      LOG_LEVEL: 'info',
      PORT: 3000,
    });
  });

  it('lists every problem by variable name', () => {
    expect(() => loadEnv(schema, { PORT: '70000' })).toThrow(/PORT[\s\S]*TOKEN[\s\S]*NAME/);
  });

  it.each(['REPLACE_WITH_SECRET', '{{ secret }}', 'changeme'])(
    'rejects the placeholder %s',
    (v) => {
      expect(() => loadEnv(schema, { TOKEN: v, NAME: 'x' })).toThrow('placeholder');
    },
  );

  it('never prints the offending value', () => {
    const strict = z.object({ KEY: z.string().regex(/^[0-9a-f]+$/, 'must be hex') });
    const message = (() => {
      try {
        loadEnv(strict, { KEY: 'super-secret-not-hex' });
      } catch (error) {
        return (error as Error).message;
      }
      return '';
    })();
    expect(message).toContain('KEY');
    expect(message).not.toContain('super-secret-not-hex');
  });
});

describe('loadDevEnv', () => {
  const dir = mkdtempSync(join(tmpdir(), 'config-test-'));
  const names = ['CFG_TEST_A', 'CFG_TEST_B', 'CFG_TEST_C'];
  afterEach(() => {
    for (const name of names) delete process.env[name];
    process.env['NODE_ENV'] = 'test';
  });

  it('loads values, skips comments and never overwrites the environment', () => {
    const file = join(dir, 'env');
    writeFileSync(
      file,
      '# comment\n\nCFG_TEST_A=1\nCFG_TEST_B = two \nno-equals\nCFG_TEST_C=file\n',
    );
    process.env['CFG_TEST_C'] = 'shell';
    loadDevEnv(file);
    expect(process.env['CFG_TEST_A']).toBe('1');
    expect(process.env['CFG_TEST_B']).toBe('two');
    expect(process.env['CFG_TEST_C']).toBe('shell');
  });

  it('does nothing in production or when the file is missing', () => {
    const file = join(dir, 'env2');
    writeFileSync(file, 'CFG_TEST_A=1\n');
    process.env['NODE_ENV'] = 'production';
    loadDevEnv(file);
    expect(process.env['CFG_TEST_A']).toBeUndefined();
    process.env['NODE_ENV'] = 'test';
    expect(() => loadDevEnv(join(dir, 'missing'))).not.toThrow();
    rmSync(dir, { recursive: true, force: true });
  });
});
