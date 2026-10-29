/**
 * One deterministic archive per file component, so a client downloads only the components whose
 * hash changed. Archive paths stay relative to the plugin folder. All hooks of a version share one
 * archive, because they live in one file; it also carries the scripts the hooks run (everything in
 * `hooks/` and any plugin file a hook command names), since the agent runs them on the user's
 * machine. MCP components have no archive: they reach an agent only as a gateway address in the
 * manifest.
 */
import { createHash } from 'node:crypto';
import type { ScannedComponent } from './scan.js';
import { packTarGz } from './tar.js';

export interface ComponentArchive {
  sha256: string;
  sizeBytes: number;
  bytes: Buffer;
}

const HOOKS_FILE = 'hooks/hooks.json';
const HOOKS_DIR = 'hooks/';

/** How a hook command names a file of its own plugin: `./x`, `${CLAUDE_PLUGIN_ROOT}/x` and the like. */
const PLUGIN_ROOT = /^(?:\.\/|\$\{?(?:CLAUDE|CURSOR)_PLUGIN_ROOT\}?\/)/;

/** The plugin files that the hook commands name, for example `./scripts/check.sh`. */
function filesNamedBy(commands: readonly string[], files: ReadonlyMap<string, Buffer>): string[] {
  const named: string[] = [];
  for (const command of commands) {
    for (const word of command.split(/\s+/)) {
      const bare = word.replace(/^["']|["';]$/g, '');
      const path = bare.replace(PLUGIN_ROOT, '');
      if (files.has(path)) named.push(path);
    }
  }
  return named;
}

/** The shared hook archive: the hook file, the `hooks/` folder and every file a command names. */
function hookFilesOf(
  hooks: readonly ScannedComponent[],
  files: ReadonlyMap<string, Buffer>,
): Map<string, Buffer> {
  const picked = new Map<string, Buffer>();
  if (!files.has(HOOKS_FILE)) return picked;
  for (const [name, body] of files) if (name.startsWith(HOOKS_DIR)) picked.set(name, body);
  const commands = hooks.flatMap((hook) => {
    const value = hook.metadata['commands'];
    return Array.isArray(value) ? value.filter((c): c is string => typeof c === 'string') : [];
  });
  for (const path of filesNamedBy(commands, files)) picked.set(path, files.get(path) as Buffer);
  return picked;
}

/** The files that make up one component, or none when it has no archive. */
function filesOf(
  component: ScannedComponent,
  files: ReadonlyMap<string, Buffer>,
): Map<string, Buffer> {
  const picked = new Map<string, Buffer>();
  if (component.kind === 'mcp') return picked;
  const path = typeof component.metadata['path'] === 'string' ? component.metadata['path'] : '';
  if (path === '') return picked;
  if (component.kind === 'skill') {
    const prefix = `${path}/`;
    for (const [name, body] of files) if (name.startsWith(prefix)) picked.set(name, body);
    return picked;
  }
  const body = files.get(path);
  if (body) picked.set(path, body);
  return picked;
}

function archiveOf(files: Map<string, Buffer>): ComponentArchive | null {
  if (files.size === 0) return null;
  const bytes = packTarGz(files);
  return {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    sizeBytes: bytes.length,
    bytes,
  };
}

/**
 * The archive of each component, keyed `kind:name`. A component with no files to pack is left
 * out, so it has no archive and the manifest does not list it as downloadable.
 */
export function packComponentArchives(
  files: ReadonlyMap<string, Buffer>,
  components: readonly ScannedComponent[],
): Map<string, ComponentArchive> {
  const archives = new Map<string, ComponentArchive>();
  let hooks: ComponentArchive | null | undefined;
  for (const component of components) {
    let archive: ComponentArchive | null;
    if (component.kind === 'hook') {
      hooks ??= archiveOf(
        hookFilesOf(
          components.filter((c) => c.kind === 'hook'),
          files,
        ),
      );
      archive = hooks;
    } else {
      archive = archiveOf(filesOf(component, files));
    }
    if (archive) archives.set(`${component.kind}:${component.name}`, archive);
  }
  return archives;
}
