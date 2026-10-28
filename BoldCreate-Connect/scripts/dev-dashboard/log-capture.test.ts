import { describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRunCapture, parseLine } from './log-capture.js';

describe('local log capture', () => {
  it('normalizes HTTP fields and preserves request correlation', () => {
    const record = parseLine(
      JSON.stringify({
        level: 50,
        reqId: 'request-1',
        res: { statusCode: 503 },
        msg: 'unavailable',
        service: 'spoof',
      }),
      'run-test',
      'api',
      'stdout',
    );
    expect(record).toMatchObject({
      severity: 'error',
      requestId: 'request-1',
      status: 503,
      statusClass: '5xx',
      service: 'api',
    });
  });

  it('redacts structured secrets without a message field', () => {
    const record = parseLine(
      '{"password":"hidden","nested":{"token":"hidden"}}',
      'run-test',
      'worker',
      'stdout',
    );
    expect(JSON.stringify(record)).not.toContain('hidden');
    expect(record.msg).toContain('[REDACTED]');
    expect(record.status).toBeUndefined();
  });

  it('scrubs malformed text, configured secrets and URL credentials', () => {
    const record = parseLine(
      'failed Bearer abc123 password=hidden https://user:pass@example.test configured-value',
      'run-test',
      'gateway',
      'stderr',
      ['configured-value'],
    );
    expect(record.msg).not.toMatch(/abc123|hidden|user:pass|configured-value/);
    expect(record.severity).toBe('error');
  });

  it('rejects invalid status values and handles invalid timestamps', () => {
    const record = parseLine(
      '{"time":1e300,"statusCode":999,"msg":"started"}',
      'run-test',
      'worker',
      'stdout',
    );
    expect(record.status).toBeUndefined();
    expect(Number.isFinite(Date.parse(record.ts))).toBe(true);
  });

  it('writes services to one exclusive file and bounds retained runs', () => {
    const directory = mkdtempSync(join(tmpdir(), 'local-log-'));
    try {
      for (let index = 0; index < 22; index++) {
        const capture = createRunCapture(`run-test-${index}`, directory);
        capture.write(parseLine('started', `run-test-${index}`, 'api', 'stdout'));
        capture.write(parseLine('started', `run-test-${index}`, 'worker', 'stdout'));
        capture.close();
        capture.close();
      }
      const records = readFileSync(join(directory, 'run-test-21.jsonl'), 'utf8')
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line) as { service: string });
      expect(records.map((record) => record.service)).toEqual(['api', 'worker']);
      expect(readdirSync(directory)).toHaveLength(20);
      expect(() => createRunCapture('../bad', directory)).toThrow('Invalid log run identifier');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
