import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ApiErrorSchema,
  ERROR_CODES,
  ERROR_HTTP_STATUS,
  ERROR_MESSAGES,
  ErrorCodeSchema,
  INGESTION_ISSUE_CODES,
  McpToolErrorResultSchema,
  RETRY_AFTER_CODES,
} from './errors.js';

const snapshotPath = join(import.meta.dirname, 'errors.snapshot');

function current() {
  return Object.fromEntries(
    ERROR_CODES.map((code) => [
      code,
      { status: ERROR_HTTP_STATUS[code], message: ERROR_MESSAGES[code] },
    ]),
  );
}

describe('error registry', () => {
  it('gives every code a status and a message', () => {
    for (const code of ERROR_CODES) {
      expect(Number.isInteger(ERROR_HTTP_STATUS[code])).toBe(true);
      expect(ERROR_HTTP_STATUS[code]).toBeGreaterThanOrEqual(400);
      expect(ERROR_HTTP_STATUS[code]).toBeLessThanOrEqual(599);
      expect(ERROR_MESSAGES[code].length).toBeGreaterThan(0);
    }
  });

  it('has no duplicate codes and a schema that matches the list', () => {
    expect(new Set(ERROR_CODES).size).toBe(ERROR_CODES.length);
    expect(ErrorCodeSchema.options).toEqual([...ERROR_CODES]);
  });

  it('keeps retry-after codes inside the registry', () => {
    for (const code of RETRY_AFTER_CODES) expect(ERROR_CODES).toContain(code);
  });

  it('never removes, renames, rewords or re-statuses a published code', async () => {
    await expect(JSON.stringify(current(), null, 2) + '\n').toMatchFileSnapshot(snapshotPath);
    const published = JSON.parse(readFileSync(snapshotPath, 'utf8')) as Record<
      string,
      { status: number; message: string }
    >;
    const now = current();
    const changed = Object.entries(published).filter(
      ([code, entry]) => JSON.stringify(now[code]) !== JSON.stringify(entry),
    );
    expect(changed.map(([code]) => code)).toEqual([]);
  });

  it('allows error details only with validation_failed', () => {
    const base = { requestId: 'r', message: 'm', details: [{ field: 'a', message: 'b' }] };
    expect(
      ApiErrorSchema.safeParse({ error: { ...base, code: 'validation_failed' } }).success,
    ).toBe(true);
    expect(ApiErrorSchema.safeParse({ error: { ...base, code: 'forbidden' } }).success).toBe(false);
    expect(
      ApiErrorSchema.safeParse({ error: { code: 'forbidden', message: 'm', requestId: 'r' } })
        .success,
    ).toBe(true);
  });

  it('declares ingestion issue codes and the MCP tool error result', () => {
    expect(INGESTION_ISSUE_CODES).toContain('secret_detected');
    const result = {
      isError: true,
      content: [{ type: 'text', text: 'Connect your account.' }],
      structuredContent: { code: 'needs_connect', connectUrl: 'https://example.com/connect' },
    };
    expect(McpToolErrorResultSchema.safeParse(result).success).toBe(true);
    expect(
      McpToolErrorResultSchema.safeParse({ ...result, structuredContent: { code: 'forbidden' } })
        .success,
    ).toBe(false);
  });
});
