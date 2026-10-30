import { describe, expect, it } from 'vitest';
import { PutProjectPluginBodySchema } from './project-plugins.js';

const accepts = (body: unknown) => PutProjectPluginBodySchema.safeParse(body).success;

describe('PutProjectPluginBodySchema', () => {
  it('still takes an empty body and a version alone', () => {
    expect(accepts({})).toBe(true);
    expect(accepts({ versionId: 'pv_0194f5c57a2b7d3e8f1a2b3c4d5e6f70' })).toBe(true);
  });

  it('takes a config per server and variable values', () => {
    expect(
      accepts({
        authConfigs: {
          one: { name: 'Default', authMode: 'dcr' },
          two: { name: 'Client', authMode: 'oauth_client', clientId: 'id', clientSecret: 's' },
          three: { name: 'Key', authMode: 'shared_secret', secret: 'k' },
        },
        variables: { API_TOKEN: 'value', OLD: null },
      }),
    ).toBe(true);
  });

  it('applies the rules of each mode', () => {
    const config = (value: Record<string, unknown>) =>
      accepts({ authConfigs: { tool: { name: 'Default', ...value } } });
    expect(config({ authMode: 'oauth_client' })).toBe(false);
    expect(config({ authMode: 'shared_secret' })).toBe(false);
    expect(config({ authMode: 'dcr', secret: 'x' })).toBe(false);
    expect(config({ authMode: 'dcr', clientId: 'x' })).toBe(false);
    expect(config({ authMode: 'shared_secret', secret: 'x', scopes: 'a' })).toBe(false);
    expect(config({ authMode: 'user_form' })).toBe(false);
  });

  it('rejects unknown fields and an empty server name', () => {
    expect(accepts({ extra: true })).toBe(false);
    expect(accepts({ authConfigs: { tool: { name: 'D', authMode: 'dcr', extra: 1 } } })).toBe(
      false,
    );
    expect(accepts({ authConfigs: { '': { name: 'D', authMode: 'dcr' } } })).toBe(false);
    expect(accepts({ variables: {} })).toBe(false);
  });
});
