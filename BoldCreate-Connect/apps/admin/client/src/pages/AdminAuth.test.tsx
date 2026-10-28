import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ERROR, renderApp, stubApi } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION = { status: 200, body: { email: 'ops@example.test' } };

describe('admin sign in', () => {
  it('sends a visitor without a session to the sign-in page', async () => {
    stubApi(() => ERROR('unauthenticated', 401));
    await renderApp('/');
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });

  it('signs in and shows the admin home', async () => {
    let signedIn = false;
    const calls = stubApi((_method, path) => {
      if (path === '/api/v1/admin/auth/signin') {
        signedIn = true;
        return SESSION;
      }
      if (path === '/api/v1/admin/auth/session')
        return signedIn ? SESSION : ERROR('unauthenticated', 401);
      return { status: 404 };
    });
    await renderApp('/signin');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Email'), 'ops@example.test');
    await user.type(screen.getByLabelText('Password'), 'AdminPassword123!');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('An overview of the catalog.')).toBeInTheDocument();
    expect(screen.getByText('ops@example.test')).toBeInTheDocument();
    expect(calls.find((call) => call.path.endsWith('/signin'))?.body).toEqual({
      email: 'ops@example.test',
      password: 'AdminPassword123!',
    });
  });

  it('explains a wrong password and stays on the page', async () => {
    stubApi(() => ERROR('invalid_credentials', 401));
    await renderApp('/signin');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Email'), 'ops@example.test');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('email or password is not correct');
    expect(screen.getByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });

  it('signs out and returns to the sign-in page', async () => {
    let active = true;
    stubApi((_method, path) => {
      if (path.endsWith('/signout')) {
        active = false;
        return { status: 204 };
      }
      return active ? SESSION : ERROR('unauthenticated', 401);
    });
    await renderApp('/');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Sign out' }));
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });
});

describe('admin setup', () => {
  it('asks for the email and answers the same whatever it is', async () => {
    const calls = stubApi(() => ({ status: 202, body: {} }));
    await renderApp('/setup');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Email'), 'someone@example.test');
    await user.click(screen.getByRole('button', { name: 'Send setup link' }));
    expect(await screen.findByRole('status')).toHaveTextContent('If this email is allowed');
    expect(calls[0]).toMatchObject({ path: '/api/v1/admin/auth/setup-request' });
  });

  it('refuses to submit two different passwords', async () => {
    const calls = stubApi(() => ({ status: 200, body: { email: 'ops@example.test' } }));
    await renderApp('/setup?token=abc');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('New password'), 'AdminPassword123!');
    await user.type(screen.getByLabelText('Repeat password'), 'Different');
    expect(screen.getByRole('alert')).toHaveTextContent('do not match');
    expect(screen.getByRole('button', { name: 'Save password and sign in' })).toBeDisabled();
    expect(calls).toHaveLength(0);
  });

  it('saves the password with the token from the link and signs in', async () => {
    let done = false;
    const calls = stubApi((_method, path) => {
      if (path === '/api/v1/admin/auth/setup') {
        done = true;
        return SESSION;
      }
      return done ? SESSION : ERROR('unauthenticated', 401);
    });
    await renderApp('/setup?token=abc');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('New password'), 'AdminPassword123!');
    await user.type(screen.getByLabelText('Repeat password'), 'AdminPassword123!');
    await user.click(screen.getByRole('button', { name: 'Save password and sign in' }));
    expect(await screen.findByText('An overview of the catalog.')).toBeInTheDocument();
    expect(calls.find((call) => call.path.endsWith('/setup'))?.body).toEqual({
      token: 'abc',
      password: 'AdminPassword123!',
    });
  });

  it('tells the admin to ask for a new link when the token is spent', async () => {
    stubApi(() => ERROR('token_invalid_or_expired', 400));
    await renderApp('/setup?token=old');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('New password'), 'AdminPassword123!');
    await user.type(screen.getByLabelText('Repeat password'), 'AdminPassword123!');
    await user.click(screen.getByRole('button', { name: 'Save password and sign in' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Ask for a new one'));
  });
});
