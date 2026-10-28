import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, orgs } from '@/lib/api';
import { DeleteResourceDialog } from './delete-resource-dialog';

function renderDialog(
  onDelete = vi.fn().mockResolvedValue(undefined),
  onDeleted = vi.fn().mockResolvedValue(undefined),
) {
  const onClose = vi.fn();
  render(
    <QueryClientProvider client={new QueryClient()}>
      <DeleteResourceDialog
        name="Alpha"
        slug="alpha"
        onDelete={onDelete}
        onDeleted={onDeleted}
        onClose={onClose}
      />
    </QueryClientProvider>,
  );
  return { onDelete, onDeleted, onClose };
}

describe('DeleteResourceDialog', () => {
  beforeEach(() => {
    vi.stubGlobal('HTMLDialogElement', HTMLDialogElement);
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('requires an exact slug and acknowledgement before deleting', async () => {
    const { onDelete, onDeleted } = renderDialog();
    const button = screen.getByRole('button', { name: 'Delete organization' });
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'Alpha' },
    });
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'alpha' },
    });
    expect(button).toBeDisabled();
    fireEvent.submit(button.closest('form')!);
    expect(onDelete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(button).toBeEnabled();
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'Alpha' },
    });
    fireEvent.submit(button.closest('form')!);
    expect(onDelete).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'alpha' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(button).toBeDisabled();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(button);
    await waitFor(() => expect(onDeleted).toHaveBeenCalledOnce());
    expect(onDelete).toHaveBeenCalledWith('alpha', expect.anything());
  });

  it('shows a spinner and prevents cancellation during deletion', async () => {
    let resolveDelete: (() => void) | undefined;
    const { onDeleted, onClose } = renderDialog(
      vi.fn().mockReturnValue(
        new Promise<void>((resolve) => {
          resolveDelete = resolve;
        }),
      ),
    );
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'alpha' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete organization' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled());
    expect(screen.getByRole('button', { name: 'Delete organization' })).toHaveAttribute(
      'aria-busy',
      'true',
    );
    expect(screen.getByRole('checkbox')).toBeDisabled();
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await act(async () => resolveDelete?.());
    await waitFor(() => expect(onDeleted).toHaveBeenCalledOnce());
  });

  it('keeps the dialog open and reports deletion failure', async () => {
    const { onDeleted } = renderDialog(vi.fn().mockRejectedValue(new Error('Database details')));
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'alpha' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete organization' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not queue deletion of this organization.',
    );
    expect(screen.queryByText('Database details')).not.toBeInTheDocument();
    expect(onDeleted).not.toHaveBeenCalled();
  });

  it('allows cancellation without deleting', () => {
    const { onClose, onDelete } = renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('explains the organization cascade, immediate access loss and connection token limitation', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription(
      /all its projects and resources.*cannot be undone.*access is revoked immediately.*background/i,
    );
    expect(screen.getByText(/external connection tokens are not revoked/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAccessibleName(
      /organization and all its projects and resources will be permanently deleted/i,
    );
  });

  it('accepts a mocked 202 response and announces queued cleanup without allowing resubmission', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (url) =>
        String(url) === '/api/csrf'
          ? new Response(JSON.stringify({ csrfToken: 'fixture-csrf' }), { status: 200 })
          : new Response(JSON.stringify({ status: 'deletion_pending' }), { status: 202 }),
      );
    const onDeleted = vi.fn().mockReturnValue(new Promise<void>(() => {}));
    const onDelete = vi.fn((slug: string) => orgs.delete('fixture-org', slug));
    renderDialog(onDelete, onDeleted);
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'alpha' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete organization' }));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Deletion queued. Access has been revoked. Cleanup will continue in the background.',
    );
    expect(onDeleted).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/orgs/fixture-org?confirmSlug=alpha',
      expect.objectContaining({ method: 'DELETE' }),
    );
    const button = screen.getByRole('button', { name: 'Deletion queued' });
    expect(button).toBeDisabled();
    fireEvent.submit(button.closest('form')!);
    expect(onDelete).toHaveBeenCalledOnce();
    fetchMock.mockRestore();
  });

  it('shows a safe API error and permits retry', async () => {
    const { onDelete } = renderDialog(
      vi
        .fn()
        .mockRejectedValue(
          new ApiError(403, 'forbidden', 'Only owners can delete this organization'),
        ),
    );
    fireEvent.change(screen.getByLabelText(/type alpha to confirm/i), {
      target: { value: 'alpha' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete organization' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Only owners can delete');
    expect(screen.getByRole('button', { name: 'Delete organization' })).toBeEnabled();
    expect(onDelete).toHaveBeenCalledOnce();
  });
});
