import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('renders as a label element', () => {
    render(<Label htmlFor="email">Email</Label>);
    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Name</Label>);
    expect(screen.getByText('Name')).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(<Label data-testid="my-label">Test</Label>);
    expect(screen.getByTestId('my-label')).toBeInTheDocument();
  });
});
