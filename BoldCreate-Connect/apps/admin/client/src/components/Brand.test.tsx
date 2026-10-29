import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppFooter } from './AppFooter';
import { PRODUCT } from '../lib/product';
import { Brand } from './Brand';

describe('brand', () => {
  it('names the product, its maker and this console', () => {
    expect(PRODUCT).toEqual({
      name: 'BoldConnect',
      maker: 'Syncfusion',
      console: 'Admin Console',
    });
  });

  it('shows the lockup in the sidebar: name, "by Syncfusion" and the console name', () => {
    render(<Brand />);
    expect(screen.getByText('BoldConnect')).toBeInTheDocument();
    expect(screen.getByText('by Syncfusion®')).toBeInTheDocument();
    expect(screen.getByText('Admin Console')).toBeInTheDocument();
  });

  it('shows the stacked lockup for the sign-in page', () => {
    const { container } = render(<Brand layout="stacked" />);
    expect(container).toHaveTextContent('BoldConnect by Syncfusion');
    expect(screen.getByText('Admin Console')).toBeInTheDocument();
  });

  it('keeps the decorative mark out of the accessibility tree', () => {
    const { container } = render(<Brand />);
    expect(container.querySelector('[aria-hidden="true"] svg')).toBeInTheDocument();
  });
});

describe('footer', () => {
  it('shows only the copyright for the given year', () => {
    render(<AppFooter year={2031} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).not.toHaveTextContent('BoldConnect');
    expect(footer).toHaveTextContent('© 2031 Syncfusion®, Inc. All rights reserved.');
  });

  it('uses the current year when none is given', () => {
    render(<AppFooter />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${new Date().getFullYear()} `);
  });
});
