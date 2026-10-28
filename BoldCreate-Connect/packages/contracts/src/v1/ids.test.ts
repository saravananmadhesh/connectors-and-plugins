import { describe, it, expect, expectTypeOf } from 'vitest';
import { randomUUID } from 'node:crypto';
import {
  ApiKeyPublicIdSchema,
  ApiKeyTokenSchema,
  IdInputSchema,
  IdSchema,
  InvalidIdError,
  TestApiKeyTokenSchema,
  formatId,
  parseId,
  type OrgId,
  type Plain,
  type ProjectId,
} from './ids.js';

describe('formatId and parseId', () => {
  it('round trips 100 random uuids', () => {
    for (let i = 0; i < 100; i += 1) {
      const uuid = randomUUID();
      const wire = formatId('org', uuid);
      expect(wire).toMatch(/^org_[0-9a-f]{32}$/);
      expect(parseId('org', wire)).toBe(uuid);
    }
  });

  it('rejects a wrong prefix', () => {
    const wire = formatId('org', randomUUID());
    expect(() => parseId('prj', wire)).toThrow(InvalidIdError);
  });

  it('rejects uppercase, wrong length and extra characters', () => {
    const hex = randomUUID().replaceAll('-', '');
    expect(() => parseId('org', `org_${hex.toUpperCase()}`)).toThrow(InvalidIdError);
    expect(() => parseId('org', `org_${hex.slice(1)}`)).toThrow(InvalidIdError);
    expect(() => parseId('org', `org_${hex}0`)).toThrow(InvalidIdError);
    expect(() => parseId('org', ` org_${hex}`)).toThrow(InvalidIdError);
    expect(() => parseId('org', randomUUID())).toThrow(InvalidIdError);
  });

  it('refuses to format something that is not a uuid', () => {
    expect(() => formatId('org', 'not-a-uuid')).toThrow(InvalidIdError);
    expect(() => formatId('ORG', randomUUID())).toThrow(InvalidIdError);
  });
});

describe('id schemas', () => {
  it('validates the wire form and decodes request ids to uuids', () => {
    const uuid = randomUUID();
    const wire = formatId('pv', uuid);
    expect(IdSchema('pv').safeParse(wire).success).toBe(true);
    expect(IdSchema('pv').safeParse(uuid).success).toBe(false);
    expect(IdInputSchema('pv').parse(wire)).toBe(uuid);
    expect(IdInputSchema('pv').safeParse(formatId('plg', uuid)).success).toBe(false);
  });
});

describe('id types', () => {
  it('keeps ids of different resources apart', () => {
    expectTypeOf<OrgId>().not.toEqualTypeOf<ProjectId>();
    expectTypeOf<OrgId>().toExtend<string>();
  });

  it('removes the brand with Plain', () => {
    expectTypeOf<Plain<{ id: OrgId; items: ProjectId[]; n: number }>>().toEqualTypeOf<{
      id: string;
      items: string[];
      n: number;
    }>();
  });
});

describe('API key tokens', () => {
  const publicId = 'abcdefghijklmnop'.replace(/[ioql]/g, 'a').replace(/[^a-z2-7]/g, 'b');
  const secret = 'a'.repeat(52);
  const token = `bc_live_${publicId}_${secret}`;

  it('accepts a valid live token', () => {
    expect(ApiKeyTokenSchema.safeParse(token).success).toBe(true);
    expect(ApiKeyPublicIdSchema.safeParse(publicId).success).toBe(true);
  });

  it('rejects three-part and five-part tokens', () => {
    expect(ApiKeyTokenSchema.safeParse(`bc_live_${publicId}`).success).toBe(false);
    expect(ApiKeyTokenSchema.safeParse(`${token}_${secret}`).success).toBe(false);
  });

  it('rejects uppercase and underscores inside parts', () => {
    expect(ApiKeyTokenSchema.safeParse(token.toUpperCase()).success).toBe(false);
    expect(ApiKeyTokenSchema.safeParse(`bc_live_${publicId.slice(1)}_x_${secret}`).success).toBe(
      false,
    );
  });

  it('rejects a test token as a live token and accepts it as a test token', () => {
    const testToken = `bc_test_${publicId}_${secret}`;
    expect(ApiKeyTokenSchema.safeParse(testToken).success).toBe(false);
    expect(TestApiKeyTokenSchema.safeParse(testToken).success).toBe(true);
  });
});
