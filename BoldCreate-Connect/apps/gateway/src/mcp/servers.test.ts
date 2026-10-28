import { describe, expect, it } from 'vitest';
import {
  MAX_TOOL_NAME_LENGTH,
  canonicalServerName,
  exposedToolName,
  splitToolName,
} from './servers.js';

describe('canonicalServerName', () => {
  it.each([
    ['GitHub', 'github'],
    ['my server', 'my-server'],
    ['a__b', 'a-b'],
    ['--x--', 'x'],
  ])('turns %s into %s', (raw, expected) => {
    expect(canonicalServerName(raw)).toBe(expected);
  });

  it('never keeps the tool separator', () => {
    expect(canonicalServerName('one__two___three')).not.toContain('__');
  });
});

describe('exposedToolName', () => {
  it('joins server and tool with the separator', () => {
    expect(exposedToolName('github', 'create_issue')).toEqual({ name: 'github__create_issue' });
  });

  it('skips a tool that carries the separator, unsafe characters or is too long', () => {
    expect(exposedToolName('github', 'a__b')).toEqual({ skip: 'separator_in_name' });
    expect(exposedToolName('github', 'a.b')).toEqual({ skip: 'unsafe_characters' });
    expect(exposedToolName('github', 'x'.repeat(MAX_TOOL_NAME_LENGTH))).toEqual({
      skip: 'name_too_long',
    });
  });
});

describe('splitToolName', () => {
  it('splits at the first separator only', () => {
    expect(splitToolName('github__create_issue')).toEqual({
      server: 'github',
      tool: 'create_issue',
    });
    expect(splitToolName('github__a-b_c')).toEqual({ server: 'github', tool: 'a-b_c' });
  });

  it('rejects names with no server or no tool', () => {
    expect(splitToolName('create_issue')).toBeNull();
    expect(splitToolName('__tool')).toBeNull();
    expect(splitToolName('server__')).toBeNull();
  });
});
