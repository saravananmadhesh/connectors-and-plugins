import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ConnectAgentPanel } from './ConnectAgentPanel';

describe('ConnectAgentPanel', () => {
  it('shows a Cursor snippet with the key placeholder first', () => {
    render(<ConnectAgentPanel />);
    expect(screen.getByText(/YOUR_API_KEY/, { selector: 'pre' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Cursor' })).toHaveAttribute('aria-selected', 'true');
  });

  it('switches target and follows an edited gateway address', async () => {
    const user = userEvent.setup();
    render(<ConnectAgentPanel apiKey="bc_abc" />);
    await user.click(screen.getByRole('tab', { name: 'Claude Code' }));
    const input = screen.getByLabelText('Gateway address');
    await user.clear(input);
    await user.type(input, 'https://gw.test');
    const pre = screen.getByText(/claude mcp add/);
    expect(pre.textContent).toContain('https://gw.test/mcp');
    expect(pre.textContent).toContain('Bearer bc_abc');
  });
});
