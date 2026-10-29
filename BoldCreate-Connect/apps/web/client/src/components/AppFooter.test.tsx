import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppFooter } from './AppFooter';

describe('AppFooter', () => {
  it('carries the copyright and does not repeat the product name', () => {
    render(<AppFooter year={2030} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).not.toHaveTextContent('BoldConnect');
    expect(footer).toHaveTextContent('© 2030 Syncfusion®, Inc. All rights reserved.');
  });
});
