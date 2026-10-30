import type { McpAuthTypeValue } from '@/lib/api';
import { AUTH_OPTIONS, type AuthDraft, type AuthField, type Discovery } from '@/lib/mcp-auth';
import { Input, Select } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  /** Prefix for the field ids, so several can share a page. */
  idPrefix: string;
  draft: AuthDraft;
  onChange: (patch: Partial<AuthDraft>) => void;
  choices: typeof AUTH_OPTIONS;
  discovery: Discovery | undefined;
  fetching: boolean;
  disabled?: boolean;
  problems?: Partial<Record<AuthField, string>>;
  /** Shown in the key field when one is already stored. */
  keyPlaceholder?: string;
  secretPlaceholder?: string;
  /** What changing the scopes does, shown under the field. */
  scopesNote?: string;
}

/**
 * How the users of one MCP server sign in: the type, and for each type the fields it needs. The
 * callback URL is shown for an OAuth app of your own and the scopes fill in from what the server
 * publishes. The server's own page and a project's plugin setup both use it.
 */
export function McpAuthFields({
  idPrefix,
  draft,
  onChange,
  choices,
  discovery,
  fetching,
  disabled = false,
  problems = {},
  keyPlaceholder = 'Paste the key',
  secretPlaceholder = 'Optional for public clients',
  scopesNote = '',
}: Props) {
  const option = AUTH_OPTIONS.find((entry) => entry.value === draft.authType);
  const found = discovery?.scopes ?? [];
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-type`}>Type</Label>
        <Select
          id={`${idPrefix}-type`}
          value={draft.authType}
          disabled={disabled}
          onChange={(event) => onChange({ authType: event.target.value as McpAuthTypeValue })}
        >
          {choices.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </Select>
        {option && <p className="text-xs text-muted-foreground">{option.hint}</p>}
      </div>

      {draft.authType === 'api_key' && (
        <div className="space-y-1.5">
          <Label htmlFor={`${idPrefix}-api-key`}>API key</Label>
          <Input
            id={`${idPrefix}-api-key`}
            type="password"
            autoComplete="off"
            disabled={disabled}
            placeholder={keyPlaceholder}
            value={draft.apiKey}
            error={problems.apiKey}
            onChange={(event) => onChange({ apiKey: event.target.value })}
          />
        </div>
      )}

      {draft.authType === 'oauth_client' && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor={`${idPrefix}-callback-url`}>Callback URL</Label>
            <Input
              id={`${idPrefix}-callback-url`}
              readOnly
              value={discovery?.callbackUrl ?? ''}
              placeholder={fetching ? 'Loading…' : ''}
              onFocus={(event) => event.target.select()}
            />
            <p className="text-xs text-muted-foreground">
              Register this address as the redirect URL of your OAuth app.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${idPrefix}-client-id`}>Client ID</Label>
            <Input
              id={`${idPrefix}-client-id`}
              autoComplete="off"
              disabled={disabled}
              value={draft.clientId}
              error={problems.clientId}
              onChange={(event) => onChange({ clientId: event.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${idPrefix}-client-secret`}>Client secret</Label>
            <Input
              id={`${idPrefix}-client-secret`}
              type="password"
              autoComplete="off"
              disabled={disabled}
              placeholder={secretPlaceholder}
              value={draft.clientSecret}
              onChange={(event) => onChange({ clientSecret: event.target.value })}
            />
          </div>
        </>
      )}

      {(draft.authType === 'oauth_client' || draft.authType === 'oauth_dcr') && (
        <div className="space-y-1.5">
          <Label htmlFor={`${idPrefix}-scopes`}>Scopes</Label>
          <Input
            id={`${idPrefix}-scopes`}
            autoComplete="off"
            spellCheck={false}
            disabled={disabled}
            placeholder="Space-separated, for example: repo read:user"
            value={draft.scopes}
            onChange={(event) => onChange({ scopes: event.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            {fetching
              ? 'Reading the sign-in details the server publishes…'
              : found.length > 0
                ? 'Filled in from the server’s published sign-in details. '
                : 'The server publishes no scopes. '}
            {scopesNote}
          </p>
        </div>
      )}
    </>
  );
}
