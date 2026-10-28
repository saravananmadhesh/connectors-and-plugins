/**
 * One deterministic archive per file component, so a client downloads only the components whose
 * hash changed. Archive paths stay relative to the plugin folder. All hooks of a version share one
 * archive, because they live in one file. MCP components have no archive: they reach an agent
 * only as a gateway address in the manifest.
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
  const body = files.get(component.kind === 'hook' ? HOOKS_FILE : path);
  if (body) picked.set(component.kind === 'hook' ? HOOKS_FILE : path, body);
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
      hooks ??= archiveOf(filesOf(component, files));
      archive = hooks;
    } else {
      archive = archiveOf(filesOf(component, files));
    }
    if (archive) archives.set(`${component.kind}:${component.name}`, archive);
  }
  return archives;
}
