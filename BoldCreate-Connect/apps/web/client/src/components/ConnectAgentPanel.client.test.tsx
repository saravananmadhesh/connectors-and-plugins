import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { resetRuntimeConfig } from '@/lib/runtime-config';
import { ConnectAgentPanel } from './ConnectAgentPanel';

afterEach(() => {
  vi.unstubAllGlobals();
  resetRuntimeConfig();
});

describe('ConnectAgentPanel', () => {
  it('uses the gateway address the server publishes for its environment', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ gatewayUrl: 'https://mcp.example.com' })),
    );
    render(<ConnectAgentPanel />);
    await waitFor(() =>
      expect(screen.getByLabelText('Gateway address')).toHaveValue('https://mcp.example.com'),
    );
    expect(screen.getByText(/YOUR_API_KEY/, { selector: 'pre' }).textContent).toContain(
      'https://mcp.example.com/mcp',
    );
  });

  it('keeps the default when the server cannot be asked', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Promise.reject(new Error('offline'))),
    );
    render(<ConnectAgentPanel />);
    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled());
    expect(screen.getByLabelText('Gateway address')).toHaveValue('http://localhost:3002');
  });

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
