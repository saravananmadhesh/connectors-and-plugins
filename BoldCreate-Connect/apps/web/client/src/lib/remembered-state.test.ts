import { describe, expect, it } from 'vitest';
import { forgetAll, recall } from './remembered-state';

describe('remembered state', () => {
  it('forgets everything on request', () => {
    expect(recall('nothing')).toBeUndefined();
    forgetAll();
    expect(recall('nothing')).toBeUndefined();
  });
});
