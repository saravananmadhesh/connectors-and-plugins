import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert } from './alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Something went wrong</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
  });

  it('applies destructive variant classes', () => {
    render(<Alert variant="destructive">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-destructive/30');
  });

  it('applies success variant classes', () => {
    render(<Alert variant="success">Done</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-success-border');
  });

  it('applies default variant classes when no variant given', () => {
    render(<Alert>Info</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-card');
  });
});
