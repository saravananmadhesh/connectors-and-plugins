import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handler = vi.fn();
    render(<Input onChange={handler} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(handler).toHaveBeenCalled();
  });

  it('shows error message when error prop is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('marks the field invalid when error is set', () => {
    render(<Input error="bad" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show error paragraph when error is undefined', () => {
    render(<Input />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('forwards type prop', () => {
    render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });
});
