import { describe, expect, it } from 'vitest';
import type { McpOAuthMetadata } from '@boldcreate-integrations/db';
import { prepareOAuth, type OAuthStartPlan } from './servers.js';
import type { UpstreamFetch, UpstreamResponse } from './upstream.js';

const reply = (body: unknown, status = 200): UpstreamResponse => ({
  status,
  headers: new Headers(),
  body: Buffer.from(JSON.stringify(body)),
});

const metadata: McpOAuthMetadata = {
  issuer: 'https://auth.example.com',
  authorizationEndpoint: 'https://auth.example.com/authorize',
  tokenEndpoint: 'https://auth.example.com/token',
  registrationEndpoint: 'https://auth.example.com/register',
  resource: 'https://mcp.example.com/mcp',
};

const plan = (patch: Partial<OAuthStartPlan>): OAuthStartPlan => ({
  url: 'https://mcp.example.com/mcp',
  project: null,
  authType: 'oauth_dcr',
  metadata,
  client: null,
  authConfig: null,
  ...patch,
});

const never: UpstreamFetch = () => Promise.reject(new Error('no call expected'));

describe('prepareOAuth', () => {
  it('registers a client for a server that supports it', async () => {
    const prepared = await prepareOAuth(
      () => Promise.resolve(reply({ client_id: 'c1' }, 201)),
      plan({}),
      'https://app/cb',
    );
    expect(prepared).toMatchObject({ registered: true, client: { clientId: 'c1' } });
  });

  it('asks for a configured client when the server has no registration endpoint', async () => {
    const { registrationEndpoint: _r, ...without } = metadata;
    await expect(
      prepareOAuth(never, plan({ metadata: without }), 'https://app/cb'),
    ).rejects.toMatchObject({ code: 'oauth_client_not_configured' });
  });

  it('reports a refused registration as a failed registration', async () => {
    const refused: unknown[] = [];
    await expect(
      prepareOAuth(
        () => Promise.resolve(reply({ error: 'invalid_redirect_uri' }, 400)),
        plan({}),
        'https://app/cb',
        (rejection) => refused.push(rejection),
      ),
    ).rejects.toMatchObject({ code: 'oauth_registration_failed' });
    expect(refused).toHaveLength(2);
  });

  it('uses a configured client without registering', async () => {
    const prepared = await prepareOAuth(
      never,
      plan({ authType: 'oauth_client', client: { clientId: 'given' } }),
      'https://app/cb',
    );
    expect(prepared).toMatchObject({ registered: false, client: { clientId: 'given' } });
  });

  it('refuses a dynamic plan that has no registration to fall back on', async () => {
    await expect(
      prepareOAuth(never, plan({ authType: 'oauth_client' }), 'https://app/cb'),
    ).rejects.toMatchObject({ code: 'oauth_client_not_configured' });
  });
});
