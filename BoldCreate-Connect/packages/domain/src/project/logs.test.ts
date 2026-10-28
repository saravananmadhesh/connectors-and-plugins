import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { projectUsage, safeContext } from './logs.js';

const DAY = 86_400_000;
const never = {} as Executor;
const scope = { projectId: '00000000-0000-4000-8000-000000000001' };

describe('safeContext', () => {
  it('keeps the tool, the outcome, the duration and the applied count', () => {
    expect(
      safeContext(
        JSON.stringify({
          tool: 'read',
          outcome: 'ok',
          durationMs: 7,
          appliedCount: 3,
          ip: '1.2.3.4',
        }),
      ),
    ).toEqual({ tool: 'read', outcome: 'ok', durationMs: 7, appliedCount: 3 });
  });

  it('drops every other key, whatever it holds', () => {
    expect(
      safeContext(JSON.stringify({ prefix: 'fyk_x', reason: 'secret', keyId: 'k', ip: '1.2.3.4' })),
    ).toEqual({});
  });

  it('drops a value of the wrong type', () => {
    expect(
      safeContext(JSON.stringify({ tool: 3, outcome: {}, durationMs: -1, appliedCount: 1.5 })),
    ).toEqual({});
  });

  it('gives nothing for no context, text that is not JSON or JSON that is not an object', () => {
    expect(safeContext(null)).toEqual({});
    expect(safeContext('{broken')).toEqual({});
    expect(safeContext('[1]')).toEqual({});
  });
});

describe('projectUsage range', () => {
  const now = new Date('2026-10-17T12:00:00.000Z');

  it('refuses a start after the end', async () => {
    await expect(
      projectUsage(
        never,
        scope,
        { from: '2026-10-17T00:00:00.000Z', to: '2026-10-16T00:00:00.000Z' },
        now,
      ),
    ).rejects.toMatchObject({ code: 'validation_failed' });
  });

  it('refuses a range longer than the limit and accepts one at the limit', async () => {
    const to = now.toISOString();
    const over = new Date(now.getTime() - (PROJECT_LIMITS.usageRangeDays + 1) * DAY).toISOString();
    await expect(projectUsage(never, scope, { from: over, to }, now)).rejects.toMatchObject({
      code: 'validation_failed',
    });
    const exact = new Date(now.getTime() - PROJECT_LIMITS.usageRangeDays * DAY).toISOString();
    // Past the range check the first read needs a database, which this stand-in does not have.
    await expect(projectUsage(never, scope, { from: exact, to }, now)).rejects.toThrow(TypeError);
  });
});
