import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { redact } from './errors.js';
import { toMcpConfig, type McpConfigOptions } from './mcp-config.js';
import type { McpServer } from './types.js';
import { verifyWebhook } from './webhooks.js';

// The same files are read by the .NET tests (packages/sdk-dotnet), so the two SDKs cannot drift on these.
const fixture = <T>(name: string): T =>
  JSON.parse(readFileSync(join(import.meta.dirname, '..', 'fixtures', name), 'utf8')) as T;

describe('shared fixtures: MCP config', () => {
  const cases =
    fixture<{ name: string; servers: McpServer[]; options: McpConfigOptions; expected: string }[]>(
      'mcp-config.json',
    );

  it.each(cases)('$name', ({ servers, options, expected }) => {
    expect(toMcpConfig(servers, options)).toBe(expected);
  });
});

describe('shared fixtures: redaction', () => {
  it.each(fixture<{ input: string; expected: string }[]>('redact.json'))(
    '$input',
    ({ input, expected }) => {
      expect(redact(input)).toBe(expected);
    },
  );
});

describe('shared fixtures: webhooks', () => {
  const file = fixture<{
    secret: string;
    now: string;
    toleranceSeconds: number;
    cases: {
      name: string;
      headers: Record<string, string>;
      rawBody: string;
      expected:
        | { ok: true; type: string; id: string; userId: string }
        | { ok: false; code: string; status: number; message: string };
    }[];
  }>('webhook.json');

  const run = (item: (typeof file.cases)[number]) => () =>
    verifyWebhook({
      rawBody: item.rawBody,
      headers: item.headers,
      secret: file.secret,
      toleranceSeconds: file.toleranceSeconds,
      now: new Date(file.now),
    });
  const accepted = file.cases.filter((item) => item.expected.ok);
  const refused = file.cases.filter((item) => !item.expected.ok);

  it.each(accepted)('accepts: $name', (item) => {
    const expected = item.expected as { type: string; id: string; userId: string };
    expect(run(item)()).toMatchObject({
      type: expected.type,
      id: expected.id,
      userId: expected.userId,
    });
  });

  it.each(refused)('refuses: $name', (item) => {
    const expected = item.expected as { code: string; status: number; message: string };
    expect(run(item)).toThrow(
      expect.objectContaining({
        code: expected.code,
        status: expected.status,
        message: expected.message,
      }),
    );
  });
});
