import { describe, expect, it } from 'vitest';
import { API_KEY_LIMITS, PROJECT_LIMITS } from './numbers.js';

describe('api key limits', () => {
  it('uses positive whole numbers', () => {
    for (const value of Object.values(API_KEY_LIMITS)) {
      expect(Number.isInteger(value) && value > 0).toBe(true);
    }
  });
});

describe('project plugin limits', () => {
  it('allow more than 50 plugins per project and session', () => {
    expect(PROJECT_LIMITS.pluginsPerProject).toBeGreaterThan(50);
    expect(PROJECT_LIMITS.pluginsPerSession).toBeGreaterThan(50);
  });
});
