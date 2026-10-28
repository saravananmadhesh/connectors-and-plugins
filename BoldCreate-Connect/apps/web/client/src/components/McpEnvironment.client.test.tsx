/**
 * McpEnvironment tests.
 * Covers: each declared variable as two boxes (a fixed name and a value), nothing else drawn for
 * it, secrets masked, a stored value never shown, only changed values sent, your own variables
 * added on request (name shape, duplicates, the limit of ten), removal, the read-only view, the
 * notice for a variable that needs a value, empty and failed loads, and a failed save.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { McpEnvironment } from './McpEnvironment';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

type Variable = {
  name: string;
  description: string;
  required: boolean;
  secret: boolean;
  isSet: boolean;
  custom: boolean;
};

const variable = (patch: Partial<Variable> & { name: string }): Variable => ({
  description: '',
  required: false,
  secret: false,
  isSet: false,
  custom: false,
  ...patch,
});

const LIST = {
  items: [
    variable({
      name: 'GITHUB_TOKEN',
      description: 'Personal access token',
      required: true,
      secret: true,
      isSet: true,
    }),
    variable({ name: 'GITHUB_HOST', description: 'Enterprise host' }),
  ],
  nextCursor: null,
};

const valueOf = (name: string) => screen.getByLabelText(`Value of ${name}`);
const removeOf = (name: string) =>
  screen.getByRole('button', { name: `Remove the stored value of ${name}` });

function show(canWrite = true) {
  return renderWithRouter(
    () => (
      <McpEnvironment orgId="org_1" scopeKey="org" installationId="ins_1" canWrite={canWrite} />
    ),
    '/',
    { url: '/' },
  );
}

describe('McpEnvironment', () => {
  beforeEach(() => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue(LIST);
  });
  afterEach(() => vi.restoreAllMocks());

  it('shows each declared variable as a fixed name and a value box, and nothing else', async () => {
    await show();
    const name = await screen.findByDisplayValue('GITHUB_TOKEN');
    expect(name).toHaveAttribute('readonly');
    expect(screen.getByDisplayValue('GITHUB_HOST')).toHaveAttribute('readonly');
    expect(valueOf('GITHUB_TOKEN')).toHaveAttribute('type', 'password');
    expect(valueOf('GITHUB_TOKEN')).toHaveValue('');
    expect(valueOf('GITHUB_HOST')).toHaveAttribute('type', 'text');
    // No schema words, badges or custom fields until the user asks for one.
    for (const word of ['type', 'properties', 'required', 'set', 'not set', 'custom']) {
      expect(screen.queryByText(word)).not.toBeInTheDocument();
    }
    expect(screen.queryByLabelText(/Name of new variable/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save variables' })).toBeDisabled();
  });

  it('says in the value box whether a value is stored or still needed', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [
        variable({ name: 'STORED', isSet: true }),
        variable({ name: 'NEEDED', required: true }),
        variable({ name: 'OPTIONAL' }),
      ],
      nextCursor: null,
    });
    await show();
    await screen.findByDisplayValue('STORED');
    expect(valueOf('STORED')).toHaveAttribute('placeholder', 'Stored. Leave blank to keep it');
    expect(valueOf('NEEDED')).toHaveAttribute('placeholder', 'Value (required)');
    expect(valueOf('OPTIONAL')).toHaveAttribute('placeholder', 'Value');
  });

  it('explains a variable in a tooltip on its name', async () => {
    await show();
    expect(await screen.findByLabelText('Variable name GITHUB_TOKEN')).toHaveAccessibleDescription(
      'Personal access token',
    );
  });

  it('draws a variable without a description without a tooltip', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [variable({ name: 'PLAIN' })],
      nextCursor: null,
    });
    await show();
    const name = await screen.findByLabelText('Variable name PLAIN');
    expect(name).not.toHaveAttribute('aria-describedby');
  });

  it('sends only what changed: a typed value sets, remove deletes, a blank is left out', async () => {
    const put = vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue(LIST);
    const user = userEvent.setup();
    await show();
    await user.type(await screen.findByLabelText('Value of GITHUB_HOST'), 'git.example.test');
    await user.click(removeOf('GITHUB_TOKEN'));
    await user.click(screen.getByRole('button', { name: 'Save variables' }));
    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', {
      values: { GITHUB_TOKEN: null, GITHUB_HOST: 'git.example.test' },
    });
    expect(await screen.findByText('Variables saved.')).toBeInTheDocument();
    expect(valueOf('GITHUB_HOST')).toHaveValue('');
  });

  it('offers removal only for a variable that has a stored value', async () => {
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    expect(removeOf('GITHUB_TOKEN')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Remove the stored value of GITHUB_HOST' }),
    ).not.toBeInTheDocument();
  });

  it('disables a value marked for removal, and can undo it', async () => {
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    await user.click(removeOf('GITHUB_TOKEN'));
    expect(valueOf('GITHUB_TOKEN')).toBeDisabled();
    expect(valueOf('GITHUB_TOKEN')).toHaveAttribute('placeholder', 'Will be removed');
    expect(removeOf('GITHUB_TOKEN')).toHaveAttribute('aria-pressed', 'true');
    await user.click(removeOf('GITHUB_TOKEN'));
    expect(valueOf('GITHUB_TOKEN')).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Save variables' })).toBeDisabled();
  });

  it('warns about a variable that still needs a value', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [variable({ name: 'API_KEY', required: true, secret: true })],
      nextCursor: null,
    });
    await show();
    expect(await screen.findByText(/Needs a value: API_KEY/)).toBeInTheDocument();
  });

  it('does not warn when every required variable has a value', async () => {
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    expect(screen.queryByText(/Needs a value/)).not.toBeInTheDocument();
  });

  it('adds your own variable only when asked, with a name and a value', async () => {
    const put = vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue(LIST);
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    await user.click(screen.getByRole('button', { name: 'Add variable' }));
    expect(screen.getByText('1 of 10 of your own')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Name of new variable 1'), 'MY_FLAG');
    await user.type(screen.getByLabelText('Value of new variable 1'), 'on');
    expect(screen.getByLabelText('Value of new variable 1')).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: 'Save variables' }));
    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', { values: { MY_FLAG: 'on' } });
  });

  it('leaves out a new variable that lacks a name or a value', async () => {
    const put = vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue(LIST);
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    await user.click(screen.getByRole('button', { name: 'Add variable' }));
    await user.click(screen.getByRole('button', { name: 'Add variable' }));
    await user.type(screen.getByLabelText('Name of new variable 1'), 'ONLY_NAME');
    await user.type(screen.getByLabelText('Value of new variable 2'), 'only-value');
    await user.type(valueOf('GITHUB_HOST'), 'h');
    await user.click(screen.getByRole('button', { name: 'Save variables' }));
    expect(put).toHaveBeenCalledWith('org_1', 'org', 'ins_1', { values: { GITHUB_HOST: 'h' } });
  });

  it('checks the name of a new variable', async () => {
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    for (let i = 0; i < 3; i += 1) {
      await user.click(screen.getByRole('button', { name: 'Add variable' }));
    }
    await user.type(screen.getByLabelText('Name of new variable 1'), 'bad name');
    expect(screen.getByText('Use letters, digits, _ and -')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Name of new variable 2'), 'GITHUB_HOST');
    expect(screen.getByText('This name already exists')).toBeInTheDocument();
    await user.clear(screen.getByLabelText('Name of new variable 1'));
    await user.type(screen.getByLabelText('Name of new variable 1'), 'DUP');
    await user.type(screen.getByLabelText('Name of new variable 3'), 'DUP');
    expect(screen.getByText('Used twice')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Value of new variable 1'), 'x');
    expect(screen.getByRole('button', { name: 'Save variables' })).toBeDisabled();
  });

  it('discards a new variable', async () => {
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('GITHUB_TOKEN');
    await user.click(screen.getByRole('button', { name: 'Add variable' }));
    await user.click(screen.getByRole('button', { name: 'Discard new variable 1' }));
    expect(screen.queryByLabelText('Name of new variable 1')).not.toBeInTheDocument();
    expect(screen.getByText('0 of 10 of your own')).toBeInTheDocument();
  });

  it('shows stored variables of your own as a name and a masked value', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [variable({ name: 'MINE', custom: true, isSet: true })],
      nextCursor: null,
    });
    await show();
    expect(await screen.findByDisplayValue('MINE')).toHaveAttribute('readonly');
    expect(valueOf('MINE')).toHaveAttribute('type', 'password');
  });

  it('stops at ten of your own', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: Array.from({ length: 9 }, (_, i) =>
        variable({ name: `OWN_${i}`, custom: true, isSet: true }),
      ),
      nextCursor: null,
    });
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('OWN_0');
    await user.click(screen.getByRole('button', { name: 'Add variable' }));
    expect(screen.getByText('10 of 10 of your own')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add variable' })).toBeDisabled();
  });

  it('frees a place when a stored variable of your own is marked for removal', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: Array.from({ length: 10 }, (_, i) =>
        variable({ name: `OWN_${i}`, custom: true, isSet: true }),
      ),
      nextCursor: null,
    });
    const user = userEvent.setup();
    await show();
    await screen.findByDisplayValue('OWN_0');
    expect(screen.getByRole('button', { name: 'Add variable' })).toBeDisabled();
    await user.click(removeOf('OWN_0'));
    expect(screen.getByRole('button', { name: 'Add variable' })).toBeEnabled();
  });

  it('is read only without the write ability', async () => {
    await show(false);
    await screen.findByDisplayValue('GITHUB_HOST');
    expect(valueOf('GITHUB_HOST')).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Save variables' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add variable' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Remove the stored value/ }),
    ).not.toBeInTheDocument();
  });

  it('says when the plugin declares none, and offers to add your own', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [],
      nextCursor: null,
    });
    await show();
    expect(
      await screen.findByText(/declares no variables\. You can add your own\./),
    ).toBeInTheDocument();
  });

  it('says only that when the plugin declares none and nothing can be added', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
      items: [],
      nextCursor: null,
    });
    await show(false);
    expect(await screen.findByText(/declares no variables/)).not.toHaveTextContent('add your own');
  });

  it('says so when the variables cannot be loaded', async () => {
    vi.spyOn(apiModule.installations, 'listVariables').mockRejectedValue(new Error('down'));
    await show();
    expect(await screen.findByText('Could not load the variables.')).toBeInTheDocument();
  });

  it('shows the reason when saving fails and a generic message otherwise', async () => {
    const put = vi
      .spyOn(apiModule.installations, 'putVariables')
      .mockRejectedValueOnce(
        new apiModule.ApiError(
          503,
          'org_key_pending',
          'The organization key is still being created.',
        ),
      )
      .mockRejectedValueOnce(new Error('offline'));
    const user = userEvent.setup();
    await show();
    await user.type(await screen.findByLabelText('Value of GITHUB_HOST'), 'x');
    await user.click(screen.getByRole('button', { name: 'Save variables' }));
    expect(await screen.findByText(/still being created/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save variables' }));
    expect(await screen.findByText('Could not save the variables')).toBeInTheDocument();
    expect(put).toHaveBeenCalledTimes(2);
  });

  it('clears the saved note as soon as the user edits again', async () => {
    vi.spyOn(apiModule.installations, 'putVariables').mockResolvedValue(LIST);
    const user = userEvent.setup();
    await show();
    await user.type(await screen.findByLabelText('Value of GITHUB_HOST'), 'x');
    await user.click(screen.getByRole('button', { name: 'Save variables' }));
    const note = await screen.findByText('Variables saved.');
    await user.type(valueOf('GITHUB_HOST'), 'y');
    await waitFor(() => expect(note).not.toBeInTheDocument());
    expect(valueOf('GITHUB_HOST')).toHaveValue('y');
  });
});
