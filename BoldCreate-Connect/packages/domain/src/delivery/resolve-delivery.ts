/**
 * What one key is served: the installations it sees and the tool policy that narrows its tools.
 * The manifest, the archive routes and the gateway all ask here, so a plugin a key can sync is
 * the plugin it can call and the other way round.
 */
import type { ApiKeyPrincipal, ToolPolicy } from '@boldcreate-integrations/contracts';
import type { Executor } from '@boldcreate-integrations/db';
import { effectiveInstallations, type EffectiveInstallation } from './visibility.js';

export interface ResolvedDelivery {
  installations: EffectiveInstallation[];
  toolPolicy: ToolPolicy;
}

/** Runs inside a transaction that carries the key's organization. */
export async function resolveDelivery(
  tx: Executor,
  principal: ApiKeyPrincipal,
): Promise<ResolvedDelivery> {
  const installations = await effectiveInstallations(tx, principal);
  const policy = principal.toolPolicy ?? {};
  const toolPolicy: ToolPolicy = {};
  if (policy.disable && policy.disable.length > 0) toolPolicy.disable = policy.disable;
  if (policy.disableDestructive) toolPolicy.disableDestructive = true;
  return { installations, toolPolicy };
}

/**
 * Whether the policy lets a key use a tool. `destructive` is what the server reported for the
 * tool; when it is not known, a policy that hides destructive tools hides the tool too.
 */
export function toolPermitted(
  policy: ToolPolicy | undefined,
  server: string,
  tool: string,
  destructive: boolean | undefined,
): boolean {
  if (!policy) return true;
  if (policy.disable?.includes(`${server}.${tool}`)) return false;
  if (policy.disableDestructive && destructive !== false) return false;
  return true;
}
