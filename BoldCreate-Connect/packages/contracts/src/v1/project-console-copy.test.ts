/** The console keeps its own copy of the project key and webhook wording; it must not drift from here. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  PROJECT_KEY_SCOPES,
  PROJECT_KEY_SCOPE_INFO,
  PROJECT_KEY_SCOPE_PRESET,
} from './projects.js';
import { WEBHOOK_EVENTS } from './project-webhook.js';

const read = (name: string) =>
  readFileSync(new URL(`../../../../apps/web/client/src/lib/${name}`, import.meta.url), 'utf8');

describe('console copy of the project key permissions', () => {
  const source = read('project-scopes.ts');

  it('has every scope with its label, description and flags', () => {
    for (const scope of PROJECT_KEY_SCOPES) {
      const info = PROJECT_KEY_SCOPE_INFO[scope];
      const start = source.indexOf(`'${scope}': {`);
      expect(start).toBeGreaterThanOrEqual(0);
      const block = source.slice(start, source.indexOf('},', start));
      expect(block).toContain(`label: '${info.label}'`);
      expect(block).toContain(`description: '${info.description}'`);
      expect(block).toContain(`destructive: ${info.destructive}`);
      expect(block).toContain(`preset: ${info.preset}`);
    }
  });

  it('starts from the same preset', () => {
    expect(PROJECT_KEY_SCOPE_PRESET.length).toBeGreaterThan(0);
    expect(source).toContain('PROJECT_SCOPE_INFO[scope].preset');
  });
});

describe('console copy of the webhook events', () => {
  it('lists every event, in the contract order', () => {
    const source = read('webhook-events.ts');
    const positions = WEBHOOK_EVENTS.map((event) => source.indexOf(`'${event}':`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });
});
