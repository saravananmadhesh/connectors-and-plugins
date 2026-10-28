import { useState } from 'react';
import { AGENT_TARGETS, buildSnippet, type AgentTarget } from '@/lib/agent-snippets';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs } from '@/components/ui/tabs';
import { CopyButton } from '@/components/CopyButton';

/** Where agents reach the gateway; set at build time, with the local default for development. */
const DEFAULT_GATEWAY_URL: string =
  (import.meta.env.VITE_PUBLIC_GATEWAY_URL as string | undefined) ?? 'http://localhost:3002';

const KEY_PLACEHOLDER = 'YOUR_API_KEY';

/** Copyable setup text for each agent, built from the gateway address and an API key. */
export function ConnectAgentPanel({ apiKey }: { apiKey?: string | undefined }) {
  const [target, setTarget] = useState<AgentTarget>('cursor');
  const [gatewayUrl, setGatewayUrl] = useState(DEFAULT_GATEWAY_URL);
  const snippet = buildSnippet(target, gatewayUrl, apiKey ?? KEY_PLACEHOLDER);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div>
        <h2 className="text-base font-semibold">Connect your agent</h2>
        <p className="text-xs text-muted-foreground">
          Create a key above, then replace {KEY_PLACEHOLDER} with it. A key is shown once.
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="gateway-url">Gateway address</Label>
        <Input
          id="gateway-url"
          value={gatewayUrl}
          onChange={(event) => setGatewayUrl(event.target.value)}
        />
      </div>
      <Tabs label="Agent" tabs={AGENT_TARGETS} value={target} onChange={setTarget}>
        <p className="mb-2 text-sm text-muted-foreground">{snippet.where}</p>
        <div className="flex items-start gap-2">
          <pre className="min-w-0 flex-1 overflow-x-auto rounded-md border bg-muted px-3 py-2 font-mono text-xs">
            {snippet.text}
          </pre>
          <CopyButton value={snippet.text} label="Copy snippet" />
        </div>
      </Tabs>
    </div>
  );
}
