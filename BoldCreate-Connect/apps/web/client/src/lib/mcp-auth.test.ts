import { describe, expect, it } from 'vitest';
import type { McpServerResponse } from './api';
import { authBody, authProblems, draftOf, errorText, needsSignIn } from './mcp-auth';

const server = (patch: Partial<McpServerResponse> = {}): McpServerResponse =>
  ({
    installationId: 'ins_1',
    componentId: 'cmp_1',
    name: 'docs',
    transport: 'http',
    url: 'https://docs.example.test/mcp',
    authType: 'none',
    apiKeyLastFour: null,
    oauthClientId: null,
    oauthClientSecretSet: false,
    oauthScopes: null,
    oauthDiscoveredScopes: [],
    oauthDiscovered: false,
    callTimeoutMs: null,
    health: 'unknown',
    healthCheckedAt: null,
    lastError: null,
    tools: [],
    toolsRefreshedAt: null,
    connection: 'not_required',
    ...patch,
  }) as McpServerResponse;

describe('draftOf', () => {
  it('starts from the stored settings and never from a secret', () => {
    const draft = draftOf(
      server({ authType: 'oauth_client', oauthClientId: 'client-1', callTimeoutMs: 15_000 }),
    );
    expect(draft).toEqual({
      authType: 'oauth_client',
      apiKey: '',
      clientId: 'client-1',
      clientSecret: '',
      scopes: '',
      timeoutSeconds: '15',
    });
  });
});

describe('authBody', () => {
  it('is empty while nothing differs', () => {
    const current = server({ authType: 'api_key', apiKeyLastFour: 'abcd' });
    expect(authBody(draftOf(current), current)).toBeNull();
  });

  it('sends the type and timeout for a switch to none', () => {
    const current = server({ authType: 'api_key', apiKeyLastFour: 'abcd' });
    expect(authBody({ ...draftOf(current), authType: 'none' }, current)).toEqual({
      authType: 'none',
      callTimeoutMs: null,
    });
  });

  it('keeps a stored key when the field is left blank', () => {
    const current = server({ authType: 'api_key', apiKeyLastFour: 'abcd' });
    expect(authBody({ ...draftOf(current), timeoutSeconds: '30' }, current)).toEqual({
      authType: 'api_key',
      callTimeoutMs: 30_000,
    });
  });

  it('sends a typed key and nothing for the other types', () => {
    const current = server();
    expect(authBody({ ...draftOf(current), authType: 'api_key', apiKey: 'k-1' }, current)).toEqual({
      authType: 'api_key',
      apiKey: 'k-1',
      callTimeoutMs: null,
    });
  });

  it('trims the client id and omits an empty secret', () => {
    const current = server();
    expect(
      authBody(
        { ...draftOf(current), authType: 'oauth_client', clientId: '  abc  ', clientSecret: '' },
        current,
      ),
    ).toEqual({
      authType: 'oauth_client',
      clientId: 'abc',
      scopes: '',
      callTimeoutMs: null,
    });
    expect(
      authBody(
        { ...draftOf(current), authType: 'oauth_client', clientId: 'abc', clientSecret: 's3' },
        current,
      ),
    ).toEqual({
      authType: 'oauth_client',
      clientId: 'abc',
      clientSecret: 's3',
      scopes: '',
      callTimeoutMs: null,
    });
  });

  it('does not carry a stale key into another type', () => {
    const current = server({ authType: 'api_key', apiKeyLastFour: 'abcd' });
    const body = authBody(
      { ...draftOf(current), authType: 'oauth_dcr', apiKey: 'left-over' },
      current,
    );
    expect(body).toEqual({ authType: 'oauth_dcr', scopes: '', callTimeoutMs: null });
  });

  it('refuses an invalid timeout', () => {
    expect(authBody({ ...draftOf(server()), timeoutSeconds: 'abc' }, server())).toBeNull();
  });
});

describe('authProblems', () => {
  it('needs a key for a new api key setup but not when one is stored', () => {
    const none = server();
    expect(authProblems({ ...draftOf(none), authType: 'api_key' }, none)).toEqual({
      apiKey: 'Enter the API key',
    });
    const stored = server({ authType: 'api_key', apiKeyLastFour: 'abcd' });
    expect(authProblems(draftOf(stored), stored)).toEqual({});
  });

  it('needs a client id for oauth_client, even if only blanks are typed', () => {
    const current = server();
    expect(
      authProblems({ ...draftOf(current), authType: 'oauth_client', clientId: '   ' }, current),
    ).toEqual({ clientId: 'Enter the client ID' });
  });

  it.each(['0', '121', '1.5', '-3', 'ten', '1e2', '9999'])(
    'rejects the timeout %s',
    (timeoutSeconds) => {
      expect(authProblems({ ...draftOf(server()), timeoutSeconds }, server()).timeout).toMatch(
        /whole number/,
      );
    },
  );

  it.each(['', '1', '120', ' 30 '])('accepts the timeout "%s"', (timeoutSeconds) => {
    expect(authProblems({ ...draftOf(server()), timeoutSeconds }, server())).toEqual({});
  });
});

describe('needsSignIn and errorText', () => {
  it('asks for a sign-in only when the server takes one', () => {
    expect(needsSignIn(server())).toBe(false);
    expect(needsSignIn(server({ connection: 'not_connected' }))).toBe(true);
  });

  it('turns codes into plain sentences and never echoes unknown text', () => {
    expect(errorText(null)).toBeNull();
    expect(errorText('upstream_timeout')).toBe('The server did not answer in time.');
    expect(errorText('<script>alert(1)</script>')).toBe('The last check failed.');
  });
});

describe('scopes', () => {
  it('sends typed scopes with single spaces for both sign-in types', () => {
    const current = server({ authType: 'oauth_dcr' });
    expect(authBody({ ...draftOf(current), scopes: '  repo   read:user ' }, current)).toEqual({
      authType: 'oauth_dcr',
      scopes: 'repo read:user',
      callTimeoutMs: null,
    });
  });

  it('shows stored scopes and treats the same text as no change', () => {
    const current = server({ authType: 'oauth_dcr', oauthScopes: 'repo read:user' });
    expect(draftOf(current).scopes).toBe('repo read:user');
    expect(authBody(draftOf(current), current)).toBeNull();
  });

  it('clears the scopes with an empty string', () => {
    const current = server({ authType: 'oauth_dcr', oauthScopes: 'repo' });
    expect(authBody({ ...draftOf(current), scopes: '' }, current)).toMatchObject({ scopes: '' });
  });

  it('sends no scopes for a type without sign-in', () => {
    const current = server({ authType: 'api_key', apiKeyLastFour: 'abcd' });
    expect(authBody({ ...draftOf(current), timeoutSeconds: '30' }, current)).not.toHaveProperty(
      'scopes',
    );
  });
});
