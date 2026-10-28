import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="h-8 w-8" />);
    expect(container.querySelector('svg')).toHaveClass('h-8', 'w-8');
  });

  it('includes animate-spin class by default', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveClass('animate-spin');
  });
});
