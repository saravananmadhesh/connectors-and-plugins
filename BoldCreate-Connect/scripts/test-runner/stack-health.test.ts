import { describe, expect, it } from 'vitest';
import { postgresProblems, recoveryNote, waitUntilHealthy } from './stack-health.js';

const crash = [
  '2026-11-03 01:10:00.100 IST [100] LOG:  database system is ready to accept connections',
  '2026-11-03 01:12:00.200 IST [100] LOG:  checkpointer process (PID 555) exited with exit code 1',
  '2026-11-03 01:12:00.201 IST [100] LOG:  terminating any other active server processes',
  '2026-11-03 01:12:00.900 IST [100] LOG:  all server processes terminated; reinitializing',
  '2026-11-03 01:12:01.300 IST [901] LOG:  database system was not properly shut down; automatic recovery in progress',
  '2026-11-03 01:12:02.000 IST [100] LOG:  database system is ready to accept connections',
].join('\n');

describe('postgresProblems', () => {
  it('keeps the lines that say a server process ended and the server restarted', () => {
    const lines = postgresProblems(crash);
    expect(lines).toHaveLength(4);
    expect(lines[0]).toContain('checkpointer process (PID 555) exited with exit code 1');
    expect(lines.join('\n')).toContain('terminating any other active server processes');
    expect(lines.join('\n')).toContain('automatic recovery in progress');
  });

  it('keeps file and memory errors of the server', () => {
    const lines = postgresProblems(
      [
        'ERROR:  could not rename file "pg_wal/0001": Permission denied',
        'FATAL:  could not open file "global/pg_filenode.map": Access is denied.',
        'LOG:  server process (PID 12) was terminated by exception 0xC0000142',
        'ERROR:  out of memory',
      ].join('\n'),
    );
    expect(lines).toHaveLength(4);
  });

  it('leaves out errors that come from an application query', () => {
    const lines = postgresProblems(
      [
        'ERROR:  permission denied for table limit_setting',
        'ERROR:  duplicate key value violates unique constraint "x"',
        'ERROR:  syntax error at or near "selec"',
        'ERROR:  relation "foo" does not exist',
        'LOG:  checkpoint starting: time',
      ].join('\n'),
    );
    expect(lines).toEqual([]);
  });

  it('returns only the last lines, oldest first, and cuts a long line', () => {
    const many = Array.from(
      { length: 20 },
      (_, n) => `LOG:  server process (PID ${n}) was terminated by exception`,
    ).join('\n');
    const lines = postgresProblems(many, 3);
    expect(lines).toHaveLength(3);
    expect(lines[2]).toContain('PID 19');
    expect(postgresProblems(`LOG: out of memory ${'x'.repeat(1000)}`)[0]).toHaveLength(300);
  });

  it('is empty for an empty or quiet log', () => {
    expect(postgresProblems('')).toEqual([]);
    expect(postgresProblems('LOG:  database system is ready to accept connections')).toEqual([]);
  });
});

describe('waitUntilHealthy', () => {
  const clock = () => {
    let at = 0;
    return { now: () => at, sleep: async (ms: number) => void (at += ms) };
  };

  it('returns at once, with no wait, when the stack is usable', async () => {
    const { now, sleep } = clock();
    const result = await waitUntilHealthy({
      check: async () => true,
      timeoutMs: 1000,
      intervalMs: 100,
      now,
      sleep,
    });
    expect(result).toEqual({ healthy: true, waitedMs: 0, checks: 1 });
  });

  it('waits for the stack to come back, and says how long it took', async () => {
    const { now, sleep } = clock();
    let calls = 0;
    const result = await waitUntilHealthy({
      check: async () => ++calls >= 4,
      timeoutMs: 10_000,
      intervalMs: 500,
      now,
      sleep,
    });
    expect(result).toEqual({ healthy: true, waitedMs: 1500, checks: 4 });
  });

  it('gives up when the time is up', async () => {
    const { now, sleep } = clock();
    const result = await waitUntilHealthy({
      check: async () => false,
      timeoutMs: 2000,
      intervalMs: 500,
      now,
      sleep,
    });
    expect(result.healthy).toBe(false);
    expect(result.waitedMs).toBeGreaterThanOrEqual(2000);
    expect(result.checks).toBe(5);
  });

  it('counts a check that throws as not usable, and carries on', async () => {
    const { now, sleep } = clock();
    let calls = 0;
    const result = await waitUntilHealthy({
      check: async () => {
        calls += 1;
        if (calls < 3) throw new Error('ECONNREFUSED');
        return true;
      },
      timeoutMs: 5000,
      intervalMs: 200,
      now,
      sleep,
    });
    expect(result.healthy).toBe(true);
    expect(result.checks).toBe(3);
  });

  it('still checks once when the time allowed is zero', async () => {
    const { now, sleep } = clock();
    const result = await waitUntilHealthy({
      check: async () => false,
      timeoutMs: 0,
      intervalMs: 100,
      now,
      sleep,
    });
    expect(result).toMatchObject({ healthy: false, checks: 1 });
  });
});

describe('recoveryNote', () => {
  it('says how long the stack took to recover, with the log lines that explain it', () => {
    const note = recoveryNote({
      waitedMs: 6400,
      rebuilt: false,
      problems: ['LOG: checkpointer process exited with exit code 1'],
    });
    expect(note).toContain('needed 6.4 s to recover');
    expect(note).toContain('checkpointer process exited with exit code 1');
  });

  it('says when the stack had to be rebuilt', () => {
    expect(recoveryNote({ waitedMs: 60_000, rebuilt: true, problems: [] })).toBe(
      'The test stack was not usable after 60.0 s and was rebuilt before this step.',
    );
  });
});
