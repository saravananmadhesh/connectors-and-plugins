import type { FileKind, Manifest } from './types.js';

/** What the lock file remembers about one placed component. */
export interface LockedComponent {
  pluginName: string;
  kind: FileKind;
  name: string;
  sha256: string;
  /** Archive path to the hash of the file as it was placed. */
  files: Record<string, string>;
}

export interface Lock {
  version: 1;
  revision: string;
  userId: string;
  components: Record<string, LockedComponent>;
}

/** A component named the way a person reads it. */
export interface ComponentRef {
  componentId: string;
  pluginName: string;
  kind: FileKind;
  name: string;
}

export interface WantedComponent extends ComponentRef {
  sha256: string;
}

export interface SyncScope {
  kinds?: readonly FileKind[] | undefined;
  /** Plugin names or ids. */
  plugins?: readonly string[] | undefined;
  allowHooks: boolean;
}

export interface SyncPlan {
  add: WantedComponent[];
  update: WantedComponent[];
  remove: (ComponentRef & { files: string[] })[];
  unchanged: ComponentRef[];
  skipped: (ComponentRef & { reason: 'hooks_not_allowed' })[];
}

const refOf = (id: string, locked: LockedComponent): ComponentRef => ({
  componentId: id,
  pluginName: locked.pluginName,
  kind: locked.kind,
  name: locked.name,
});

/** Whether a kind is in the part of the folder this call looks after. */
function kindInScope(kind: FileKind, scope: SyncScope): boolean {
  if (kind === 'hook' && !scope.allowHooks) return false;
  return scope.kinds === undefined || scope.kinds.includes(kind);
}

/**
 * Compares what the manifest wants with what the lock placed. Only the part of the folder inside
 * the requested kinds and plugins is touched: a component outside it is neither updated nor
 * removed, and a hook is left alone unless hooks are allowed.
 */
export function planSync(
  manifest: Manifest,
  lock: Lock | undefined,
  scope: SyncScope,
  pluginIds: ReadonlyMap<string, string> = new Map(),
): SyncPlan {
  const plan: SyncPlan = { add: [], update: [], remove: [], unchanged: [], skipped: [] };
  const pluginInScope = (pluginName: string) =>
    scope.plugins === undefined ||
    scope.plugins.includes(pluginName) ||
    scope.plugins.includes(pluginIds.get(pluginName) ?? '');

  const wanted = new Map<string, WantedComponent>();
  for (const entry of manifest.entries) {
    if (!pluginInScope(entry.pluginName)) continue;
    for (const component of entry.components) {
      if (!component.enabled || component.sha256 === '') continue;
      const ref: WantedComponent = {
        componentId: component.id,
        pluginName: entry.pluginName,
        kind: component.kind,
        name: component.name,
        sha256: component.sha256,
      };
      if (component.kind === 'hook' && !scope.allowHooks) {
        plan.skipped.push({ ...ref, reason: 'hooks_not_allowed' });
        continue;
      }
      if (!kindInScope(component.kind, scope)) continue;
      wanted.set(component.id, ref);
    }
  }

  for (const [id, component] of wanted) {
    const locked = lock?.components[id];
    if (!locked) plan.add.push(component);
    else if (locked.sha256 !== component.sha256) plan.update.push(component);
    else plan.unchanged.push(component);
  }

  for (const [id, locked] of Object.entries(lock?.components ?? {})) {
    if (wanted.has(id)) continue;
    if (!kindInScope(locked.kind, scope) || !pluginInScope(locked.pluginName)) {
      plan.unchanged.push(refOf(id, locked));
      continue;
    }
    plan.remove.push({ ...refOf(id, locked), files: Object.keys(locked.files) });
  }
  return plan;
}
