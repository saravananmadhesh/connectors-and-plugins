import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Table, TableBody, TableCell } from '@/components/ui/table';
import { ClickableRow } from './ClickableRow';

function show(onActivate: () => void) {
  render(
    <Table>
      <TableBody>
        <ClickableRow onActivate={onActivate}>
          <TableCell>
            <a href="#name">Storefront</a>
          </TableCell>
          <TableCell>Active</TableCell>
          <TableCell>
            <button type="button">Details</button>
          </TableCell>
        </ClickableRow>
      </TableBody>
    </Table>,
  );
}

describe('ClickableRow', () => {
  afterEach(() => vi.restoreAllMocks());

  it('opens from any column, not only the name', async () => {
    const open = vi.fn();
    show(open);
    await userEvent.click(screen.getByText('Active'));
    expect(open).toHaveBeenCalledOnce();
  });

  it('leaves a link or button inside the row to do its own thing', async () => {
    const open = vi.fn();
    show(open);
    await userEvent.click(screen.getByRole('link', { name: 'Storefront' }));
    await userEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(open).not.toHaveBeenCalled();
  });

  it('does not open on a click with a modifier key, so the link can open in a new tab', async () => {
    const open = vi.fn();
    show(open);
    fireEvent.click(screen.getByText('Active'), { ctrlKey: true });
    fireEvent.click(screen.getByText('Active'), { metaKey: true });
    expect(open).not.toHaveBeenCalled();
  });

  it('does not open while text of the row is selected for copying', async () => {
    const open = vi.fn();
    show(open);
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'Active' } as Selection);
    await userEvent.click(screen.getByText('Active'));
    expect(open).not.toHaveBeenCalled();
  });

  it('looks clickable', () => {
    show(vi.fn());
    expect(screen.getByText('Active').closest('tr')).toHaveClass('cursor-pointer');
  });
});
