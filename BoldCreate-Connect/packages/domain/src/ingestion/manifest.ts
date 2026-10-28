/**
 * Reads the plugin manifest out of an extracted archive: `plugin.json` at the plugin root, then
 * `.cursor-plugin/plugin.json`. Names and versions are checked against the same rules the
 * database enforces, so a bad manifest fails here with a message the operator can act on.
 */
import { cleanLogoPath } from './logo.js';
import { IngestionError } from './tar.js';

export interface ManifestVariable {
  name: string;
  description: string;
  required: boolean;
  secret: boolean;
}

export interface ParsedManifest {
  name: string;
  displayName: string;
  version: string;
  summary: string;
  description: string;
  keywords: string[];
  categories: string[];
  variables: ManifestVariable[];
  /** Path of the plugin's own logo inside its folder; null when none or not a safe image path. */
  logo: string | null;
  /** The manifest as read, kept as the canonical record of the version. */
  raw: Record<string, unknown>;
  format: 'plugin.json' | 'cursor-plugin';
}

const NAME_CHARACTERS = /^[a-z0-9-]{1,40}$/;
/** 1 to 40 lower-case letters, digits and hyphens, starting and ending with a letter or digit. */
const isPluginName = (name: string): boolean =>
  NAME_CHARACTERS.test(name) && !name.startsWith('-') && !name.endsWith('-');
const VERSION_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const VARIABLE_PATTERN = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/;
export const MAX_MANIFEST_BYTES = 256 * 1024;

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined;

function stringList(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === 'string' && entry.trim() !== '')
    .map((entry) => entry.trim())
    .slice(0, max);
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Some manifests describe their variables as a JSON Schema object (`type`, `properties`,
 * `required`) instead of a map of names. The variables are then the properties, and the schema's
 * own keywords are not variables.
 */
function schemaForm(value: Record<string, unknown>) {
  if (value['type'] !== 'object' || !isRecord(value['properties'])) return undefined;
  return {
    properties: value['properties'],
    required: new Set(stringList(value['required'], 1000)),
  };
}

function parseVariables(value: unknown): ManifestVariable[] {
  if (value === undefined) return [];
  if (!isRecord(value)) {
    throw new IngestionError('The manifest "variables" field must be an object.');
  }
  const schema = schemaForm(value);
  return Object.entries(schema ? schema.properties : value).map(([name, spec]) => {
    if (!VARIABLE_PATTERN.test(name)) {
      throw new IngestionError(`The variable name "${name.slice(0, 40)}" is not valid.`);
    }
    const detail = isRecord(spec) ? spec : {};
    return {
      name,
      // A schema property may carry a short `title` as well; it stands in for a missing description.
      description: (asString(detail['description']) ?? asString(detail['title']) ?? '').slice(
        0,
        500,
      ),
      required: detail['required'] === true || (schema?.required.has(name) ?? false),
      secret:
        detail['secret'] === true ||
        (schema !== undefined && detail['secret'] !== false && looksSecret(name, detail)),
    };
  });
}

/** Names that hold credentials. */
const SENSITIVE_NAME = /TOKEN|SECRET|PASSWORD|PASSWD|CREDENTIAL|API_?KEY|PRIVATE_?KEY|ACCESS_?KEY/i;

/**
 * A JSON Schema has no secret flag, so a property is treated as one when the schema says it is
 * write-only or a password, or when its name says it holds a credential. Only the input is masked;
 * every value is stored sealed either way.
 */
function looksSecret(name: string, detail: Record<string, unknown>): boolean {
  return (
    detail['writeOnly'] === true || detail['format'] === 'password' || SENSITIVE_NAME.test(name)
  );
}

/**
 * The variables of a stored manifest that writes them as a JSON Schema, or undefined for any other
 * manifest. Scans made before that form was understood kept the schema's keywords as variables;
 * reading them from the stored manifest gives every such version the right ones.
 */
export function manifestVariables(manifest: unknown): ManifestVariable[] | undefined {
  if (!isRecord(manifest)) return undefined;
  const declared = manifest['variables'];
  // Only the schema form needs this: a map of names was always read correctly, so what the scan
  // recorded for it stands.
  if (!isRecord(declared) || !schemaForm(declared)) return undefined;
  try {
    return parseVariables(declared);
  } catch {
    return undefined;
  }
}

export function parseManifest(files: ReadonlyMap<string, Buffer>): ParsedManifest {
  const candidates = [
    ['plugin.json', 'plugin.json'],
    ['.cursor-plugin/plugin.json', 'cursor-plugin'],
  ] as const;
  const found = candidates.find(([path]) => files.has(path));
  if (!found) {
    throw new IngestionError('No plugin.json or .cursor-plugin/plugin.json was found.');
  }
  const body = files.get(found[0]) as Buffer;
  if (body.length > MAX_MANIFEST_BYTES) throw new IngestionError('The manifest is too large.');

  let raw: unknown;
  try {
    raw = JSON.parse(body.toString('utf8'));
  } catch {
    throw new IngestionError('The manifest is not valid JSON.');
  }
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new IngestionError('The manifest must be a JSON object.');
  }
  const manifest = raw as Record<string, unknown>;

  const name = asString(manifest['name']);
  if (!name || !isPluginName(name)) {
    throw new IngestionError(
      'The manifest name must be 1 to 40 characters: lower-case letters, digits and hyphens, starting and ending with a letter or digit.',
    );
  }
  const version = asString(manifest['version']);
  if (!version || !VERSION_PATTERN.test(version)) {
    throw new IngestionError('The manifest version must look like 1.2.3.');
  }
  const description = asString(manifest['description']) ?? '';
  const category = asString(manifest['category']);
  const categories = [...(category ? [category] : []), ...stringList(manifest['categories'], 10)];

  return {
    name,
    displayName: (asString(manifest['displayName']) ?? name).slice(0, 100),
    version,
    summary: description.slice(0, 200),
    description,
    keywords: [...stringList(manifest['keywords'], 20), ...stringList(manifest['tags'], 20)].slice(
      0,
      20,
    ),
    categories: [...new Set(categories)],
    variables: parseVariables(manifest['variables']),
    logo: cleanLogoPath(manifest['logo']),
    raw: manifest,
    format: found[1],
  };
}

/**
 * What a folder calls itself, read without the checks of `parseManifest`, so a folder that cannot
 * be installed (for example a name that is too short) can still be listed under its own title.
 */
export function peekManifestLabel(files: ReadonlyMap<string, Buffer>): string | null {
  const body = files.get('plugin.json') ?? files.get('.cursor-plugin/plugin.json');
  if (!body || body.length > MAX_MANIFEST_BYTES) return null;
  try {
    const raw = JSON.parse(body.toString('utf8')) as unknown;
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null;
    const record = raw as Record<string, unknown>;
    const label = (asString(record['displayName']) ?? asString(record['name']) ?? '').trim();
    return label === '' ? null : label.slice(0, 100);
  } catch {
    return null;
  }
}
