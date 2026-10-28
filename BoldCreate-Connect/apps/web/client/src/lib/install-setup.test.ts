import { describe, expect, it } from 'vitest';
import type { McpServerResponse, VariableStatus } from './api';
import { hasSetupNeeds, installState, setupNeeds, signInServers } from './install-setup';

const variable = (over: Partial<VariableStatus> = {}): VariableStatus => ({
  name: 'API_REGION',
  description: '',
  required: true,
  secret: false,
  isSet: false,
  custom: false,
  ...over,
});

const server = (over: Partial<McpServerResponse> = {}): McpServerResponse =>
  ({
    name: 'search',
    authType: 'oauth_dcr',
    connection: 'not_connected',
    ...over,
  }) as McpServerResponse;

describe('setupNeeds', () => {
  it('lists the required variables with no value, and no optional or set one', () => {
    const needs = setupNeeds(
      [
        variable({ name: 'A' }),
        variable({ name: 'B', isSet: true }),
        variable({ name: 'C', required: false }),
      ],
      [],
    );
    expect(needs.variables.map((entry) => entry.name)).toEqual(['A']);
  });

  it('lists the servers that still need a sign-in, and the ones to sign in again', () => {
    const needs = setupNeeds(
      [],
      [
        server({ name: 'one', connection: 'not_connected' }),
        server({ name: 'two', connection: 'needs_reauth' }),
        server({ name: 'three', connection: 'connected' }),
      ],
    );
    expect(needs.signIns.map((entry) => entry.name)).toEqual(['one', 'two']);
  });

  it('ignores servers that take no sign-in', () => {
    const servers = [
      server({ authType: 'none', connection: 'not_required' }),
      server({ authType: 'api_key', connection: 'not_required' }),
    ];
    expect(signInServers(servers)).toEqual([]);
    expect(hasSetupNeeds(setupNeeds([], servers))).toBe(false);
  });
});

describe('installState', () => {
  it('needs setup while a required variable has no value', () => {
    expect(installState([variable()], [])).toBe('needs-setup');
  });

  it('needs setup while a sign-in is open, even with every variable set', () => {
    expect(installState([variable({ isSet: true })], [server()])).toBe('needs-setup');
    expect(installState([], [server({ connection: 'needs_reauth' })])).toBe('needs-setup');
  });

  it('is connected once every sign-in is done', () => {
    expect(installState([variable({ isSet: true })], [server({ connection: 'connected' })])).toBe(
      'connected',
    );
  });

  it('is plainly installed when nothing asks for setup or a sign-in', () => {
    expect(installState([], [])).toBe('installed');
    expect(installState([variable({ required: false })], [server({ authType: 'none' })])).toBe(
      'installed',
    );
  });
});
