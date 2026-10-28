/** A published plugin version for tests that need something to install. */
import { randomUUID } from 'node:crypto';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { sql } from './signed-in-user.js';

export interface PluginFixture {
  /** Wire id of the plugin version. */
  pluginVersionId: string;
}

/** Inserts a published, public plugin version with no components. */
export async function seedPluginVersion(): Promise<PluginFixture> {
  const pluginId = randomUUID();
  const versionId = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Plugin Fixture', 'fixture', 'fixture', 'active', 'public')`,
    [pluginId, `plugin-fixture-${pluginId.slice(0, 8)}`],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', 'sha256-plugin-fixture', 'published')`,
    [versionId, pluginId],
  );
  return { pluginVersionId: formatId('pv', versionId) };
}
