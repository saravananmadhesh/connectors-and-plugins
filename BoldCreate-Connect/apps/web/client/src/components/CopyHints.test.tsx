import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ApiKeyTable } from './ApiKeyTable';
import { AREA_HINTS, AREA_LABELS } from '@/lib/area';

describe('explanatory copy', () => {
  it('explains the permissions column of the key table', () => {
    render(<ApiKeyTable items={[]} />);
    expect(screen.getByRole('button', { name: 'About permissions' })).toBeInTheDocument();
  });

  it('describes every area without renaming it', () => {
    for (const area of Object.keys(AREA_LABELS) as (keyof typeof AREA_LABELS)[]) {
      expect(AREA_HINTS[area].length).toBeGreaterThan(20);
    }
  });
});
