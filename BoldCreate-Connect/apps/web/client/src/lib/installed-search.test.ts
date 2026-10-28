import { describe, expect, it } from 'vitest';
import { validateInstalledSearch } from './installed-search';

describe('validateInstalledSearch', () => {
  it('keeps a component tab', () => {
    expect(validateInstalledSearch({ tab: 'skill' })).toEqual({ tab: 'skill' });
  });

  it('leaves the plugins tab and unknown values out of the address', () => {
    expect(validateInstalledSearch({ tab: 'plugins' })).toEqual({ tab: undefined });
    expect(validateInstalledSearch({ tab: 'nope' })).toEqual({ tab: undefined });
    expect(validateInstalledSearch({})).toEqual({ tab: undefined });
  });
});
