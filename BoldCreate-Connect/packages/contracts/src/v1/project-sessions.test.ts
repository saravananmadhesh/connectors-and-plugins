import { describe, expect, it } from 'vitest';
import { CreateSessionBodySchema } from './project-sessions.js';

describe('session plugin limit', () => {
  const plugins = (count: number) => Array.from({ length: count }, (_, index) => `plugin-${index}`);

  it('accepts up to 100 plugins and rejects more', () => {
    const base = { userId: 'user-1' };

    expect(CreateSessionBodySchema.safeParse({ ...base, plugins: plugins(100) }).success).toBe(
      true,
    );
    expect(CreateSessionBodySchema.safeParse({ ...base, plugins: plugins(101) }).success).toBe(
      false,
    );
  });
});
