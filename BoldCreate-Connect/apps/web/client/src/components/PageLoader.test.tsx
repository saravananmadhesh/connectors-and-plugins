import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageLoader } from './PageLoader';

describe('PageLoader', () => {
  it('announces the loading state with the brand mark', () => {
    const { container } = render(<PageLoader label="Loading profile" />);
    expect(screen.getByRole('status', { name: 'Loading profile' })).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('defaults the label', () => {
    render(<PageLoader />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });
});
