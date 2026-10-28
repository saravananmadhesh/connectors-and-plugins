import { beforeEach, describe, expect, it } from 'vitest';
import {
  ACTIVE_ORG_STORAGE_KEY,
  readActiveOrg,
  resolveActiveOrg,
  saveActiveOrg,
} from './active-org';

describe('active organization', () => {
  beforeEach(() => window.localStorage.clear());

  it('reads nothing when nothing is saved or the value is damaged', () => {
    expect(readActiveOrg()).toEqual({});
    window.localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, '{not json');
    expect(readActiveOrg()).toEqual({});
  });

  it('round-trips the saved choice', () => {
    saveActiveOrg({ orgId: 'org_1' });
    expect(readActiveOrg()).toEqual({ orgId: 'org_1' });
  });

  it('prefers the address over the saved choice', () => {
    expect(resolveActiveOrg({ orgId: 'org_2' }, { orgId: 'org_1' }, ['org_1', 'org_2'])).toEqual({
      orgId: 'org_2',
    });
  });

  it('uses the saved organization while it is still valid', () => {
    expect(resolveActiveOrg({}, { orgId: 'org_2' }, ['org_1', 'org_2'])).toEqual({
      orgId: 'org_2',
    });
  });

  it('falls back to the first organization when the saved one is gone', () => {
    expect(resolveActiveOrg({}, { orgId: 'org_gone' }, ['org_1', 'org_2'])).toEqual({
      orgId: 'org_1',
    });
  });

  it('has no active organization without organizations', () => {
    expect(resolveActiveOrg({}, {}, [])).toEqual({});
  });
});
