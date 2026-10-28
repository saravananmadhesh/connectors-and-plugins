import { describe, expect, it } from 'vitest';
import { tombstoneEmail } from './user-deletion.js';

describe('tombstoneEmail', () => {
  const id = '0f8fad5b-d9cb-469f-a165-70867728950e';

  it('is deleted-<32 hex of the user id> at an undeliverable domain', () => {
    expect(tombstoneEmail(id)).toBe('deleted-0f8fad5bd9cb469fa16570867728950e@deleted.invalid');
    expect(tombstoneEmail(id)).toMatch(/^deleted-[0-9a-f]{32}@deleted\.invalid$/);
  });

  it('differs per user and fits the email length limit', () => {
    expect(tombstoneEmail(id)).not.toBe(tombstoneEmail('1f8fad5b-d9cb-469f-a165-70867728950e'));
    expect(tombstoneEmail(id).length).toBeLessThanOrEqual(254);
  });
});
