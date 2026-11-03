import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { InfoHint } from './InfoHint';

describe('InfoHint', () => {
  it('names what it explains and shows the text on hover', async () => {
    render(<InfoHint about="return addresses">Where users come back to.</InfoHint>);
    const mark = screen.getByRole('button', { name: 'About return addresses' });
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      'Where users come back to.',
    );
    await userEvent.hover(mark);
    expect(screen.getByRole('tooltip')).toBeVisible();
  });
});
