import { describe, expect, it } from 'vitest';
import { toolPermitted } from './resolve-delivery.js';

describe('toolPermitted', () => {
  it('lets everything through without a policy or with an empty one', () => {
    expect(toolPermitted(undefined, 'github', 'create_issue', true)).toBe(true);
    expect(toolPermitted({}, 'github', 'create_issue', true)).toBe(true);
  });

  it('refuses a tool named in the disable list, and only that tool', () => {
    const policy = { disable: ['github.delete_repo'] };
    expect(toolPermitted(policy, 'github', 'delete_repo', false)).toBe(false);
    expect(toolPermitted(policy, 'github', 'create_issue', false)).toBe(true);
    expect(toolPermitted(policy, 'gitlab', 'delete_repo', false)).toBe(true);
  });

  it('hides destructive tools, and tools whose hint is not known, when asked to', () => {
    const policy = { disableDestructive: true };
    expect(toolPermitted(policy, 'github', 'delete_repo', true)).toBe(false);
    expect(toolPermitted(policy, 'github', 'unknown_tool', undefined)).toBe(false);
    expect(toolPermitted(policy, 'github', 'read_file', false)).toBe(true);
  });

  it('does not hide destructive tools when the flag is off', () => {
    expect(toolPermitted({ disableDestructive: false }, 'github', 'delete_repo', true)).toBe(true);
  });
});
