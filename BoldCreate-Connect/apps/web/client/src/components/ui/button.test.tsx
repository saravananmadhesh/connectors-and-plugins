import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Go</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is set', async () => {
    const handler = vi.fn();
    render(
      <Button disabled onClick={handler}>
        Go
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(handler).not.toHaveBeenCalled();
  });

  it('applies destructive variant class', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('applies outline variant class', () => {
    render(<Button variant="outline">Cancel</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
  });

  it('applies sm size class', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
  });

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Link button' })).toBeInTheDocument();
  });
});
