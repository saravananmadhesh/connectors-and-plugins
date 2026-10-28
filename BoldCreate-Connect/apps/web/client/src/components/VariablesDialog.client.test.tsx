/**
 * VariablesDialog tests.
 * Covers: declared variables with set state and no stored value shown, a secret field masked,
 * only changed fields sent (blank keeps, typed sets, remove deletes), custom variables added and
 * checked (name shape, duplicates, the limit of ten), read-only view, and an API error shown.
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VariablesDialog } from './VariablesDialog';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

const LIST = {
  items: [
    {
      name: 'API_TOKEN',
      description: 'Access token',
      required: true,
      secret: true,
      isSet: true,
      custom: false,
    },
    {
      name: 'REGION',
      description: 'Region',
      required: false,
      secret: false,
      isSet: false,
      custom: false,
    },
  ],
  nextCursor: null,
};

function renderDialog(canWrite = true, onClose = () => {}) {
  return renderWithRouter(
    () => (
      <VariablesDialog
        orgId="org_1"
        scopeKey="org"
        installationId="ins_1"
        pluginName="review-tools"
        canWrite={canWrite}
        onClose={onClose}
      />
    ),
    '/',
    { url: '/' },
  );
}

describe('VariablesDialog', () => {
  beforeEach(() => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue(LIST);
  });
  afterEach(() => vi.restoreAllMocks());

  it('lists the variables with their state and masks a secret', async () => {
    await renderDialog();
    expect(await screen.findByText('API_TOKEN')).toBeInTheDocument();
    expect(screen.getByText('set')).toBeInTheDocument();
    expect(screen.getByText('not set')).toBeInTheDocument();
    expect(screen.getByLabelText('API_TOKEN')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('API_TOKEN')).toHaveValue('');
    expect(screen.getByLabelText('REGION')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('sends only what changed: typed sets, remove deletes, blank is left out', async () => {
    const put = vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue(LIST);
    const onClose = vi.fn();
    const user = userEvent.setup();
    await renderDialog(true, onClose);
    await user.type(await screen.findByLabelText('REGION'), 'eu-west');
    await user.click(screen.getByRole('checkbox', { name: /Remove the stored value/ }));
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', {
      values: { API_TOKEN: null, REGION: 'eu-west' },
    });
    await vi.waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('is read only without the write ability', async () => {
    await renderDialog(false);
    expect(await screen.findByLabelText('REGION')).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
  });

  it('shows the error when saving fails', async () => {
    vi.spyOn(apiModule.installations, 'putVariables').mockRejectedValue(
      new apiModule.ApiError(
        503,
        'org_key_pending',
        'The organization key is still being created.',
      ),
    );
    const user = userEvent.setup();
    await renderDialog();
    await user.type(await screen.findByLabelText('REGION'), 'x');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByText(/still being created/)).toBeInTheDocument();
  });

  it('adds a custom variable next to the declared ones', async () => {
    const put = vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue(LIST);
    const user = userEvent.setup();
    await renderDialog();
    await screen.findByText('API_TOKEN');
    await user.click(screen.getByRole('button', { name: 'Add a custom variable' }));
    await user.type(screen.getByLabelText('Custom variable name 1'), 'MY-FLAG');
    await user.type(screen.getByLabelText('Custom variable value 1'), 'on');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', { values: { 'MY-FLAG': 'on' } });
  });

  it('refuses a bad or repeated custom name and keeps Save off', async () => {
    const user = userEvent.setup();
    await renderDialog();
    await screen.findByText('API_TOKEN');
    await user.click(screen.getByRole('button', { name: 'Add a custom variable' }));
    await user.type(screen.getByLabelText('Custom variable name 1'), 'bad name');
    await user.type(screen.getByLabelText('Custom variable value 1'), 'x');
    expect(screen.getByText('Use letters, digits, _ and -')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    await user.clear(screen.getByLabelText('Custom variable name 1'));
    await user.type(screen.getByLabelText('Custom variable name 1'), 'REGION');
    expect(screen.getByText('This name already exists')).toBeInTheDocument();
  });

  it('stops at ten custom variables', async () => {
    const stored = Array.from({ length: 9 }, (_, i) => ({
      name: `C${i}`,
      description: '',
      required: false,
      secret: true,
      isSet: true,
      custom: true,
    }));
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [...LIST.items, ...stored],
      nextCursor: null,
    });
    const user = userEvent.setup();
    await renderDialog();
    await screen.findByText('C8');
    expect(screen.getByText('9 of 10 custom')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Add a custom variable' }));
    expect(screen.getByRole('button', { name: 'Add a custom variable' })).toBeDisabled();
  });
});
