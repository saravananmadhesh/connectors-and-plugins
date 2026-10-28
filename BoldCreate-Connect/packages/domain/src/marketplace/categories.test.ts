import { describe, expect, it } from 'vitest';
import { CategorySlugSchema } from '@boldcreate-integrations/contracts';
import { slugFromName } from './categories.js';

describe('slugFromName', () => {
  it.each([
    ['Developer Tools', 'developer-tools'],
    ['  AI & Agents!  ', 'ai-agents'],
    ['C# / .NET', 'c-net'],
    ['Data_2024', 'data-2024'],
  ])('turns %j into %j', (name, slug) => {
    expect(slugFromName(name)).toBe(slug);
    expect(CategorySlugSchema.safeParse(slug).success).toBe(true);
  });

  it('cuts a long name without leaving a trailing dash', () => {
    const slug = slugFromName(`${'a'.repeat(39)} tail`);
    expect(slug).toBe('a'.repeat(39));
    expect(CategorySlugSchema.safeParse(slug).success).toBe(true);
  });

  it('gives an empty or too short result when the name has nothing usable', () => {
    expect(slugFromName('!!!')).toBe('');
    expect(CategorySlugSchema.safeParse(slugFromName('x')).success).toBe(false);
  });
});
