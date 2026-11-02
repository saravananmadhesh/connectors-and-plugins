/**
 * Syncs every plugin of a gateway and downloads it.
 *
 * Writes to examples/downloads (override with DOWNLOAD_DIR):
 *   sync.json                          the manifest the gateway answered
 *   archives/<plugin>-<version>.tgz    each plugin's archive, checked against its sha256
 *   plugins/<plugin>/...               each archive unpacked
 *
 * Run (needs the SDK built: pnpm --filter @boldcreate-integrations/sdk build)
 *   CONNECT_API_KEY=prk_... node examples/sdk-test/download-plugins.mjs
 * Optional: CONNECT_BASE_URL (default the staging gateway), CONNECT_USER_ID (the user whose
 * plugins are synced, default sdk-download-user). Nothing is installed or changed on the gateway.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { ConnectClient } from '../../packages/sdk/dist/index.js';

const baseUrl = process.env.CONNECT_BASE_URL ?? 'https://connect-gateway.boldcreate.ai';
const apiKey = process.env.CONNECT_API_KEY;
if (!apiKey) {
  process.stderr.write('Set CONNECT_API_KEY.\n');
  process.exit(1);
}
const out = process.env.DOWNLOAD_DIR ?? join(import.meta.dirname, '..', 'downloads');
const safeName = (s) => s.replace(/[^\w.-]+/g, '_');

const connect = new ConnectClient({ apiKey, baseUrl });
const session = await connect.create(process.env.CONNECT_USER_ID ?? 'sdk-download-user');
const manifest = await session.manifest();
if ('notModified' in manifest) throw new Error('Unexpected 304 without a revision.');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await writeFile(join(out, 'sync.json'), `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(
  `sync.json: ${manifest.entries.length} plugin(s), revision ${manifest.revision}\n`,
);

let failed = 0;
for (const entry of manifest.entries) {
  const label = `${entry.pluginName}@${entry.version}`;
  try {
    const response = await fetch(new URL(entry.href, baseUrl), {
      headers: { authorization: `Bearer ${session.token}`, accept: 'application/gzip' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${entry.href}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (hash !== entry.sha256) throw new Error(`sha256 mismatch (${hash})`);

    const archive = join(
      out,
      'archives',
      `${safeName(entry.pluginName)}-${safeName(entry.version)}.tgz`,
    );
    await mkdir(dirname(archive), { recursive: true });
    await writeFile(archive, bytes);

    const folder = join(out, 'plugins', safeName(entry.pluginName));
    await mkdir(folder, { recursive: true });
    execFileSync('tar', ['-xzf', archive, '-C', folder]);
    process.stdout.write(`OK   ${label}: ${bytes.length} bytes\n`);
  } catch (error) {
    failed += 1;
    process.stdout.write(`FAIL ${label}: ${error?.message ?? error}\n`);
  }
}
process.stdout.write(
  `${manifest.entries.length - failed}/${manifest.entries.length} downloaded to ${out}\n`,
);
process.exit(failed ? 1 : 0);
