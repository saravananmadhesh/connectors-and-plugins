import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CUSTOM_VARIABLE_NAME_PATTERN, MAX_CUSTOM_VARIABLES } from './variables.js';

describe('custom variable limits', () => {
  it('match the copy the browser app keeps', () => {
    const copy = readFileSync(
      new URL('../../../../apps/web/client/src/lib/custom-variables.ts', import.meta.url),
      'utf8',
    );
    expect(copy).toContain(
      `CUSTOM_VARIABLE_NAME_PATTERN = ${CUSTOM_VARIABLE_NAME_PATTERN.toString()};`,
    );
    expect(copy).toContain(`MAX_CUSTOM_VARIABLES = ${MAX_CUSTOM_VARIABLES};`);
  });
});
