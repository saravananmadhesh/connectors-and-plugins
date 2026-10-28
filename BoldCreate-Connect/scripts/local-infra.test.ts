import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  downloadVerified,
  ensureArchivedTool,
  objectStoreAssets,
  pgwebAssets,
  redisAssets,
  type FetchLike,
} from './infra-tools.js';
import { waitFor } from './local-infra.js';

const bytes = new TextEncoder().encode('pretend archive');
const sha256 = createHash('sha256').update(bytes).digest('hex');

const fakeFetch =
  (data: Uint8Array, status = 200): FetchLike =>
  async () => ({
    ok: status === 200,
    status,
    arrayBuffer: async () =>
      data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer,
  });

describe('downloadVerified', () => {
  it('returns the bytes when the checksum matches', async () => {
    const data = await downloadVerified('tool', { url: 'http://x', sha256 }, fakeFetch(bytes));
    expect(Array.from(data)).toEqual(Array.from(bytes));
  });

  it('rejects a checksum mismatch', async () => {
    const other = new TextEncoder().encode('tampered');
    await expect(
      downloadVerified('tool', { url: 'http://x', sha256 }, fakeFetch(other)),
    ).rejects.toThrow('tool checksum mismatch');
  });

  it('rejects a failed download', async () => {
    await expect(
      downloadVerified('tool', { url: 'http://x', sha256 }, fakeFetch(bytes, 404)),
    ).rejects.toThrow('download failed: HTTP 404');
  });
});

describe('ensureArchivedTool', () => {
  it('deletes the download directory and throws when the checksum does not match', async () => {
    const cache = mkdtempSync(join(tmpdir(), 'tools-'));
    try {
      await expect(
        ensureArchivedTool({
          name: 'tool',
          version: '1',
          asset: { url: 'http://x', sha256, binary: 'tool.exe' },
          toolsCache: cache,
          platformKey: 'test-x64',
          fetchImpl: fakeFetch(new TextEncoder().encode('tampered')),
        }),
      ).rejects.toThrow('checksum mismatch');
      expect(existsSync(join(cache, 'tool', '1', 'test-x64'))).toBe(false);
    } finally {
      rmSync(cache, { recursive: true, force: true });
    }
  });

  it('extracts a tar.gz archive into the versioned cache directory and reuses it', async () => {
    const work = mkdtempSync(join(tmpdir(), 'tools-tar-'));
    try {
      const source = join(work, 'source');
      mkdirSync(source);
      writeFileSync(join(source, 'weed'), 'binary');
      const packed = spawnSync('tar', ['-czf', 'archive.tar.gz', '-C', 'source', 'weed'], {
        cwd: work,
      });
      expect(packed.status).toBe(0);
      const data = new Uint8Array(readFileSync(join(work, 'archive.tar.gz')));
      const options = {
        name: 'tool',
        version: '1',
        asset: {
          url: 'http://x',
          sha256: createHash('sha256').update(data).digest('hex'),
          binary: 'weed',
          format: 'tar.gz' as const,
        },
        toolsCache: join(work, 'cache'),
        platformKey: 'test-x64',
      };
      const binary = await ensureArchivedTool({ ...options, fetchImpl: fakeFetch(data) });
      expect(binary).toBe(join(work, 'cache', 'tool', '1', 'test-x64', 'weed'));
      expect(readFileSync(binary, 'utf8')).toBe('binary');
      expect(existsSync(join(work, 'cache', 'tool', '1', 'test-x64', 'archive.tar.gz'))).toBe(
        false,
      );
      // A second call finds the binary and does not download again.
      const failing: FetchLike = async () => {
        throw new Error('must not download');
      };
      expect(await ensureArchivedTool({ ...options, fetchImpl: failing })).toBe(binary);
    } finally {
      rmSync(work, { recursive: true, force: true });
    }
  });

  it('throws when the archive does not contain the expected binary', async () => {
    const work = mkdtempSync(join(tmpdir(), 'tools-tar-'));
    try {
      writeFileSync(join(work, 'other'), 'x');
      spawnSync('tar', ['-czf', 'archive.tar.gz', 'other'], { cwd: work });
      const data = new Uint8Array(readFileSync(join(work, 'archive.tar.gz')));
      await expect(
        ensureArchivedTool({
          name: 'tool',
          version: '1',
          asset: {
            url: 'http://x',
            sha256: createHash('sha256').update(data).digest('hex'),
            binary: 'weed',
            format: 'tar.gz',
          },
          toolsCache: join(work, 'cache'),
          platformKey: 'test-x64',
          fetchImpl: fakeFetch(data),
        }),
      ).rejects.toThrow('extraction failed');
    } finally {
      rmSync(work, { recursive: true, force: true });
    }
  });

  it('rejects a corrupt tar.gz archive', async () => {
    const work = mkdtempSync(join(tmpdir(), 'tools-tar-'));
    try {
      const data = new TextEncoder().encode('not a tarball');
      await expect(
        ensureArchivedTool({
          name: 'tool',
          version: '1',
          asset: {
            url: 'http://x',
            sha256: createHash('sha256').update(data).digest('hex'),
            binary: 'weed',
            format: 'tar.gz',
          },
          toolsCache: join(work, 'cache'),
          platformKey: 'test-x64',
          fetchImpl: fakeFetch(data),
        }),
      ).rejects.toThrow('archive.tar.gz failed');
    } finally {
      rmSync(work, { recursive: true, force: true });
    }
  });
});

describe('pinned tool tables', () => {
  it('records a 64 character sha256 for every asset', () => {
    for (const table of [redisAssets, objectStoreAssets, pgwebAssets]) {
      for (const asset of Object.values(table)) {
        expect(asset.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(asset.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('covers the maintainer platform for both tools', () => {
    expect(redisAssets['win32-x64']).toBeDefined();
    expect(objectStoreAssets['win32-x64']).toBeDefined();
  });

  it('names each object store archive by its declared format', () => {
    for (const [platform, asset] of Object.entries(objectStoreAssets)) {
      const tarball = asset.format === 'tar.gz';
      expect(asset.url.endsWith(tarball ? '.tar.gz' : '.zip')).toBe(true);
      expect(asset.binary).toBe(platform.startsWith('win32') ? 'weed.exe' : 'weed');
      expect(asset.url).toContain('/seaweedfs/seaweedfs/releases/download/');
    }
  });
});

describe('waitFor', () => {
  it('returns as soon as the probe succeeds', async () => {
    let calls = 0;
    await waitFor('thing', async () => ++calls === 2, 5);
    expect(calls).toBe(2);
  });

  it('treats a throwing probe as not ready yet', async () => {
    let calls = 0;
    await waitFor(
      'thing',
      async () => {
        if (++calls < 2) throw new Error('connection refused');
        return true;
      },
      5,
    );
    expect(calls).toBe(2);
  });

  it('fails right away when the process already exited', async () => {
    let probed = false;
    await expect(
      waitFor(
        'object store',
        async () => {
          probed = true;
          return true;
        },
        5,
        () => true,
      ),
    ).rejects.toThrow('object store exited before it was ready');
    expect(probed).toBe(false);
  });

  it('gives up after the attempts are used', async () => {
    await expect(waitFor('thing', async () => false, 1)).rejects.toThrow(
      'thing did not become ready',
    );
  });
});
