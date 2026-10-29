import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PasswordInput } from './input';

describe('PasswordInput', () => {
  it('hides the value until asked to show it, and hides it again', async () => {
    render(<PasswordInput aria-label="Secret" defaultValue="hunter2hunter2" />);
    const field = screen.getByLabelText('Secret');
    expect(field).toHaveAttribute('type', 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(field).toHaveAttribute('type', 'text');
    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(field).toHaveAttribute('type', 'password');
  });

  it('keeps the toggle out of a form submit and shows an error beneath', () => {
    render(
      <form>
        <PasswordInput aria-label="Secret" error="Too short" />
      </form>,
    );
    expect(screen.getByRole('button', { name: 'Show password' })).toHaveAttribute('type', 'button');
    expect(screen.getByText('Too short')).toBeInTheDocument();
  });
});
