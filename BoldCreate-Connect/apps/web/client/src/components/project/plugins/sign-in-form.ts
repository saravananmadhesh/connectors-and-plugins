import type { AuthConfigResponse, PutProjectPluginBody } from '@/lib/api';
import type { AuthDraft } from '@/lib/mcp-auth';

/** What a person typed for how the users of one MCP server sign in; the same fields as a server's own page. */
export type ServerForm = AuthDraft;

export const EMPTY_FORM: ServerForm = {
  authType: 'none',
  apiKey: '',
  clientId: '',
  clientSecret: '',
  scopes: '',
  timeoutSeconds: '',
};

export type AuthConfigs = NonNullable<PutProjectPluginBody['authConfigs']>;

/** Scopes split on any whitespace and joined by single spaces. */
const scopesOf = (text: string): { scopes?: string } => {
  const scopes = text.trim().split(/\s+/).filter(Boolean).join(' ');
  return scopes === '' ? {} : { scopes };
};

/** The sign-in a person chose for one server, as the add request carries it; null for none. */
export function configOf(form: ServerForm): AuthConfigs[string] | null {
  switch (form.authType) {
    case 'none':
      return null;
    case 'oauth_dcr':
      return { name: 'Default', authMode: 'dcr', ...scopesOf(form.scopes) };
    case 'oauth_client':
      return {
        name: 'Default',
        authMode: 'oauth_client',
        clientId: form.clientId.trim(),
        ...(form.clientSecret === '' ? {} : { clientSecret: form.clientSecret }),
        ...scopesOf(form.scopes),
      };
    case 'api_key':
      return { name: 'Default', authMode: 'shared_secret', secret: form.apiKey };
  }
}

/** Whether the fields the chosen type needs are filled; a stored secret stands for itself. */
export const formReady = (form: ServerForm, stored = false): boolean =>
  (form.authType !== 'oauth_client' || form.clientId.trim() !== '') &&
  (form.authType !== 'api_key' || stored || form.apiKey !== '');

const TYPE_OF_MODE: Record<AuthConfigResponse['authMode'], ServerForm['authType']> = {
  dcr: 'oauth_dcr',
  oauth_client: 'oauth_client',
  shared_secret: 'api_key',
  user_form: 'none',
};

/** The form for a stored sign-in: what is kept, with every secret left empty. */
export const formOfConfig = (config: AuthConfigResponse): ServerForm => ({
  ...EMPTY_FORM,
  authType: TYPE_OF_MODE[config.authMode],
  clientId: config.clientId ?? '',
  scopes: config.scopes ?? '',
});

/** What changed against a stored sign-in, as the update request carries it; null when nothing. */
export function updateOf(
  config: AuthConfigResponse,
  form: ServerForm,
): { clientId?: string; clientSecret?: string; scopes?: string; secret?: string } | null {
  const body: { clientId?: string; clientSecret?: string; scopes?: string; secret?: string } = {};
  if (config.authMode === 'oauth_client') {
    if (form.clientId.trim() !== (config.clientId ?? '')) body.clientId = form.clientId.trim();
    if (form.clientSecret !== '') body.clientSecret = form.clientSecret;
  }
  if (config.authMode === 'oauth_client' || config.authMode === 'dcr') {
    const scopes = scopesOf(form.scopes).scopes ?? '';
    if (scopes !== (config.scopes ?? '')) body.scopes = scopes;
  }
  if (config.authMode === 'shared_secret' && form.apiKey !== '') body.secret = form.apiKey;
  return Object.keys(body).length > 0 ? body : null;
}
