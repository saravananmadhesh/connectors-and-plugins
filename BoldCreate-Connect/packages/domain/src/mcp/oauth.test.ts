import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  OAuthError,
  authorizationUrl,
  checkIssuer,
  discoverOAuth,
  exchangeCode,
  hashState,
  newPkce,
  newState,
  refreshToken,
  registerClient,
} from './oauth.js';
import type { UpstreamFetch, UpstreamResponse } from './upstream.js';

const ok = (body: unknown, status = 200): UpstreamResponse => ({
  status,
  headers: new Headers(),
  body: Buffer.from(typeof body === 'string' ? body : JSON.stringify(body)),
});

/** Answers by exact URL; anything else is a 404. Records every request. */
function routes(
  table: Record<string, UpstreamResponse | Error>,
  seen: { url: string; body?: string }[] = [],
) {
  const fetcher: UpstreamFetch = (url, init) => {
    seen.push({ url, ...(init.body === undefined ? {} : { body: init.body }) });
    const answer = table[url];
    if (answer instanceof Error) return Promise.reject(answer);
    return Promise.resolve(answer ?? ok('', 404));
  };
  return fetcher;
}

const server = {
  issuer: 'https://auth.example.com',
  authorization_endpoint: 'https://auth.example.com/authorize',
  token_endpoint: 'https://auth.example.com/token',
  registration_endpoint: 'https://auth.example.com/register',
  scopes_supported: ['read', 'write'],
  code_challenge_methods_supported: ['S256'],
};

const metadata = {
  issuer: 'https://auth.example.com',
  authorizationEndpoint: 'https://auth.example.com/authorize',
  tokenEndpoint: 'https://auth.example.com/token',
  registrationEndpoint: 'https://auth.example.com/register',
  resource: 'https://mcp.example.com/mcp',
  scopes: ['read', 'write'],
};

describe('discoverOAuth', () => {
  it('follows the protected resource document to its authorization server', async () => {
    const found = await discoverOAuth(
      routes({
        'https://mcp.example.com/.well-known/oauth-protected-resource/mcp': ok({
          resource: 'https://mcp.example.com/mcp',
          authorization_servers: ['https://auth.example.com'],
        }),
        'https://auth.example.com/.well-known/oauth-authorization-server': ok(server),
      }),
      'https://mcp.example.com/mcp',
    );
    expect(found).toEqual(metadata);
  });

  it('asks for the scopes the protected resource lists, ahead of the server list', async () => {
    const found = await discoverOAuth(
      routes({
        'https://mcp.example.com/.well-known/oauth-protected-resource/mcp': ok({
          resource: 'https://mcp.example.com/mcp',
          authorization_servers: ['https://auth.example.com'],
          scopes_supported: ['repo', 'read:user'],
        }),
        'https://auth.example.com/.well-known/oauth-authorization-server': ok({
          ...server,
          scopes_supported: undefined,
        }),
      }),
      'https://mcp.example.com/mcp',
    );
    expect(found.scopes).toEqual(['repo', 'read:user']);
  });

  it('falls back to the origin and to OpenID configuration', async () => {
    const found = await discoverOAuth(
      routes({
        'https://mcp.example.com/.well-known/openid-configuration': ok({
          ...server,
          issuer: 'https://mcp.example.com',
          registration_endpoint: undefined,
          scopes_supported: [],
        }),
      }),
      'https://mcp.example.com/mcp',
    );
    expect(found).toMatchObject({
      issuer: 'https://mcp.example.com',
      resource: 'https://mcp.example.com/mcp',
    });
    expect(found).not.toHaveProperty('registrationEndpoint');
    expect(found).not.toHaveProperty('scopes');
  });

  it.each([
    ['nothing is published', {}],
    [
      'a field is missing',
      { 'https://mcp.example.com/.well-known/oauth-authorization-server': ok({ issuer: 'x' }) },
    ],
    [
      'S256 is not offered',
      {
        'https://mcp.example.com/.well-known/oauth-authorization-server': ok({
          ...server,
          code_challenge_methods_supported: ['plain'],
        }),
      },
    ],
    [
      'the document is not JSON',
      { 'https://mcp.example.com/.well-known/oauth-authorization-server': ok('<html>') },
    ],
    [
      'the fetch fails',
      { 'https://mcp.example.com/.well-known/oauth-authorization-server': new Error('blocked') },
    ],
  ])('fails when %s', async (_name, table) => {
    await expect(discoverOAuth(routes(table), 'https://mcp.example.com/mcp')).rejects.toMatchObject(
      {
        code: 'oauth_discovery_failed',
      },
    );
  });
});

describe('registerClient', () => {
  it('registers a public client and returns the id and optional secret', async () => {
    const seen: { url: string; body?: string }[] = [];
    const client = await registerClient(
      routes(
        { 'https://auth.example.com/register': ok({ client_id: 'c1', client_secret: 's1' }, 201) },
        seen,
      ),
      metadata,
      'https://app.example.com/cb',
      'App',
    );
    expect(client).toEqual({ clientId: 'c1', clientSecret: 's1' });
    expect(JSON.parse(seen[0]?.body ?? '{}')).toMatchObject({
      redirect_uris: ['https://app.example.com/cb'],
      token_endpoint_auth_method: 'none',
    });
  });

  /** Answers the registration endpoint with each reply in turn and records the bodies. */
  function sequence(replies: UpstreamResponse[], bodies: Record<string, unknown>[] = []) {
    const fetcher: UpstreamFetch = (_url, init) => {
      bodies.push(JSON.parse(init.body ?? '{}') as Record<string, unknown>);
      return Promise.resolve(replies.shift() ?? ok('', 500));
    };
    return fetcher;
  }

  it('asks again for a client that holds a secret when the public one is refused', async () => {
    const bodies: Record<string, unknown>[] = [];
    const refusals: unknown[] = [];
    const client = await registerClient(
      sequence(
        [
          ok({ error: 'invalid_client_metadata', error_description: 'no public clients' }, 400),
          ok({ client_id: 'c2', client_secret: 's2' }, 201),
        ],
        bodies,
      ),
      metadata,
      'https://app/cb',
      'App',
      (refusal) => refusals.push(refusal),
    );
    expect(client).toEqual({ clientId: 'c2', clientSecret: 's2' });
    expect(bodies.map((body) => body['token_endpoint_auth_method'])).toEqual([
      'none',
      'client_secret_post',
    ]);
    expect(bodies[1]).toMatchObject({ application_type: 'web' });
    expect(refusals).toEqual([
      {
        status: 400,
        error: 'invalid_client_metadata',
        description: 'no public clients',
        authMethod: 'none',
      },
    ]);
  });

  it('reports every refusal and gives up after the last client type', async () => {
    const refusals: unknown[] = [];
    await expect(
      registerClient(
        sequence([ok({ error: 'invalid_redirect_uri' }, 400), ok({}, 403)]),
        metadata,
        'https://app/cb',
        'App',
        (refusal) => refusals.push(refusal),
      ),
    ).rejects.toMatchObject({ code: 'oauth_registration_failed' });
    expect(refusals).toHaveLength(2);
  });

  it.each([429, 500, 503])('does not retry after a %i', async (status) => {
    const bodies: Record<string, unknown>[] = [];
    await expect(
      registerClient(
        sequence([ok('', status), ok({ client_id: 'c' }, 201)], bodies),
        metadata,
        'u',
        'App',
      ),
    ).rejects.toMatchObject({ code: 'oauth_registration_failed' });
    expect(bodies).toHaveLength(1);
  });

  it('names a missing registration endpoint as unsupported, without calling out', async () => {
    const seen: { url: string }[] = [];
    const { registrationEndpoint: _r, ...withoutEndpoint } = metadata;
    await expect(
      registerClient(routes({}, seen), withoutEndpoint, 'https://app/cb', 'App'),
    ).rejects.toMatchObject({ code: 'oauth_registration_unsupported' });
    expect(seen).toEqual([]);
  });

  it.each([
    ['a refusal', metadata, { 'https://auth.example.com/register': ok({ error: 'x' }, 400) }],
    ['a reply without a client id', metadata, { 'https://auth.example.com/register': ok({}) }],
    ['a transport error', metadata, { 'https://auth.example.com/register': new Error('x') }],
  ])('fails on %s', async (_name, meta, table) => {
    await expect(
      registerClient(routes(table), meta, 'https://app/cb', 'App'),
    ).rejects.toMatchObject({
      code: 'oauth_registration_failed',
    });
  });
});

describe('pkce, state and the authorization url', () => {
  it('derives the S256 challenge from the verifier and never repeats', () => {
    const one = newPkce();
    expect(one.challenge).toBe(createHash('sha256').update(one.verifier).digest('base64url'));
    expect(one.verifier.length).toBeGreaterThanOrEqual(43);
    expect(newPkce().verifier).not.toBe(one.verifier);
    expect(newState()).not.toBe(newState());
    expect(hashState('a')).toMatch(/^[0-9a-f]{64}$/);
  });

  it('builds a url with every parameter, and leaves scope out when there are none', () => {
    const url = new URL(
      authorizationUrl({
        metadata,
        clientId: 'c1',
        redirectUri: 'https://app/cb',
        state: 'st',
        challenge: 'ch',
      }),
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({
      response_type: 'code',
      client_id: 'c1',
      redirect_uri: 'https://app/cb',
      state: 'st',
      code_challenge: 'ch',
      code_challenge_method: 'S256',
      resource: 'https://mcp.example.com/mcp',
      scope: 'read write',
    });
    const bare = new URL(
      authorizationUrl({
        metadata: (({ scopes: _s, ...rest }) => rest)(metadata),
        clientId: 'c1',
        redirectUri: 'https://app/cb',
        state: 'st',
        challenge: 'ch',
      }),
    );
    expect(bare.searchParams.has('scope')).toBe(false);
  });
});

describe('token requests', () => {
  const client = { clientId: 'c1', clientSecret: 's1' };
  const tokenUrl = 'https://auth.example.com/token';

  it('exchanges a code with the verifier and resource', async () => {
    const seen: { url: string; body?: string }[] = [];
    const tokens = await exchangeCode(
      routes(
        {
          [tokenUrl]: ok({ access_token: 'a', refresh_token: 'r', expires_in: 60, scope: 'read' }),
        },
        seen,
      ),
      metadata,
      client,
      { code: 'code', verifier: 'ver', redirectUri: 'https://app/cb' },
    );
    expect(tokens).toEqual({ accessToken: 'a', refreshToken: 'r', expiresIn: 60, scope: 'read' });
    const form = new URLSearchParams(seen[0]?.body);
    expect(Object.fromEntries(form)).toMatchObject({
      grant_type: 'authorization_code',
      code: 'code',
      code_verifier: 'ver',
      client_id: 'c1',
      client_secret: 's1',
      resource: 'https://mcp.example.com/mcp',
    });
  });

  it('omits optional fields and the secret of a public client', async () => {
    const seen: { url: string; body?: string }[] = [];
    const tokens = await refreshToken(
      routes({ [tokenUrl]: ok({ access_token: 'a', expires_in: 'soon' }) }, seen),
      metadata,
      { clientId: 'c1' },
      'old',
    );
    expect(tokens).toEqual({ accessToken: 'a' });
    const form = new URLSearchParams(seen[0]?.body);
    expect(form.get('grant_type')).toBe('refresh_token');
    expect(form.has('client_secret')).toBe(false);
  });

  it.each([
    ['invalid_grant', ok({ error: 'invalid_grant' }, 400), 'oauth_invalid_grant'],
    ['another refusal', ok({ error: 'server_error' }, 500), 'oauth_token_failed'],
    ['a refusal that is not JSON', ok('nope', 400), 'oauth_token_failed'],
    ['a reply without an access token', ok({}), 'oauth_token_failed'],
    ['a transport error', new Error('x'), 'oauth_token_failed'],
  ])('maps %s to %s', async (_name, answer, code) => {
    const failure = await refreshToken(routes({ [tokenUrl]: answer }), metadata, client, 'r').catch(
      (caught: unknown) => caught,
    );
    expect(failure).toBeInstanceOf(OAuthError);
    expect((failure as OAuthError).code).toBe(code);
  });

  it.each([
    ['a refusal with an error code', ok({ error: 'invalid_client' }, 401), 'invalid_client'],
    [
      'a refusal sent with 200',
      ok({ error: 'incorrect_client_credentials' }),
      'incorrect_client_credentials',
    ],
    ['a refusal with no code', ok('nope', 400), 'http_400'],
    ['a reply without an access token', ok({}), 'no_access_token'],
    ['a transport error', new Error('x'), 'unreachable'],
    ['an error code that is not plain', ok({ error: 'bad <b>' }, 400), 'http_400'],
  ])('names %s', async (_name, answer, detail) => {
    const failure = await refreshToken(routes({ [tokenUrl]: answer }), metadata, client, 'r').catch(
      (caught: unknown) => caught,
    );
    expect((failure as OAuthError).detail).toBe(detail);
  });
});

describe('checkIssuer', () => {
  it('accepts a missing or matching issuer and refuses another', () => {
    expect(() => checkIssuer(metadata, undefined)).not.toThrow();
    expect(() => checkIssuer(metadata, 'https://auth.example.com')).not.toThrow();
    expect(() => checkIssuer(metadata, 'https://evil.example.com')).toThrow(OAuthError);
  });
});
