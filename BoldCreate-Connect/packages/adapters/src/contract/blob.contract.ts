import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { createHash, randomBytes } from 'node:crypto';
import { Readable } from 'node:stream';
import {
  BlobKeyError,
  BlobNotFoundError,
  BlobRangeError,
  BlobUnavailableError,
  type BlobPort,
} from '@boldcreate-integrations/ports';
import type { ContractFactory, ContractHarness } from './harness.js';

const sha256 = (data: Uint8Array) => createHash('sha256').update(data).digest('hex');

async function readAll(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk as Buffer));
  return Buffer.concat(chunks);
}

export interface BlobContractOptions {
  /** An adapter pointed at a closed port, to assert unavailability handling. */
  unavailable: () => BlobPort;
  /** Upper bound in milliseconds for an unavailable call to reject. */
  unavailableWithinMs?: number;
}

export function runBlobContract(
  label: string,
  make: ContractFactory<BlobPort>,
  options: BlobContractOptions,
): void {
  describe(`blob contract: ${label}`, () => {
    let harness: ContractHarness<BlobPort>;
    let blob: BlobPort;
    beforeAll(async () => {
      harness = await make();
      blob = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('round trips a 1 MiB body through put, head, exists, get and delete', async () => {
      const body = randomBytes(1024 * 1024);
      const key = sha256(body);
      await blob.put(key, body, { sizeBytes: body.length });
      expect(await blob.exists(key)).toBe(true);
      expect(await blob.head(key)).toEqual({ sizeBytes: body.length });
      const read = await blob.getStream(key);
      expect(read.sizeBytes).toBe(body.length);
      expect((await readAll(read.stream)).equals(body)).toBe(true);
      await blob.delete(key);
      expect(await blob.exists(key)).toBe(false);
      expect(await blob.head(key)).toBeNull();
    });

    it('accepts a stream body', async () => {
      const body = randomBytes(64 * 1024);
      const key = sha256(body);
      await blob.put(key, Readable.from([body]), { sizeBytes: body.length });
      expect((await readAll((await blob.getStream(key)).stream)).equals(body)).toBe(true);
      await blob.delete(key);
    });

    it('rejects a body whose digest is not the key and leaves no object', async () => {
      const body = randomBytes(2048);
      const wrongKey = sha256(randomBytes(2048));
      await expect(blob.put(wrongKey, body, { sizeBytes: body.length })).rejects.toBeInstanceOf(
        BlobKeyError,
      );
      expect(await blob.exists(wrongKey)).toBe(false);
      await expect(
        blob.put(wrongKey, Readable.from([body]), { sizeBytes: body.length }),
      ).rejects.toBeInstanceOf(BlobKeyError);
      expect(await blob.exists(wrongKey)).toBe(false);
    });

    it('rejects invalid keys before any network access', async () => {
      const bad = ['../x', 'A'.repeat(64), 'a'.repeat(63), 'a'.repeat(65), '%2e%2e', ''];
      for (const key of bad) {
        await expect(blob.exists(key)).rejects.toBeInstanceOf(BlobKeyError);
        await expect(blob.getStream(key)).rejects.toBeInstanceOf(BlobKeyError);
        await expect(blob.delete(key)).rejects.toBeInstanceOf(BlobKeyError);
      }
    });

    it('serves byte ranges', async () => {
      const body = randomBytes(1000);
      const key = sha256(body);
      await blob.put(key, body, { sizeBytes: body.length });
      const first = await blob.getStream(key, { start: 0, end: 0 });
      expect((await readAll(first.stream)).equals(body.subarray(0, 1))).toBe(true);
      expect(first.contentRange).toEqual({ start: 0, end: 0, total: 1000 });
      const middle = await blob.getStream(key, { start: 100, end: 199 });
      expect((await readAll(middle.stream)).equals(body.subarray(100, 200))).toBe(true);
      const last = await blob.getStream(key, { start: 999, end: 999 });
      expect((await readAll(last.stream)).equals(body.subarray(999))).toBe(true);
      await blob.delete(key);
    });

    it('rejects an invalid range', async () => {
      const body = randomBytes(100);
      const key = sha256(body);
      await blob.put(key, body, { sizeBytes: body.length });
      await expect(blob.getStream(key, { start: 50, end: 10 })).rejects.toBeInstanceOf(
        BlobRangeError,
      );
      await expect(blob.getStream(key, { start: 500, end: 600 })).rejects.toBeInstanceOf(
        BlobRangeError,
      );
      await blob.delete(key);
    });

    it('rejects a read of a missing key with BlobNotFoundError', async () => {
      await expect(blob.getStream(sha256(randomBytes(32)))).rejects.toBeInstanceOf(
        BlobNotFoundError,
      );
    });

    it('has no way to hand out a download URL', () => {
      expect(Object.keys(blob).some((name) => /url/i.test(name))).toBe(false);
      expect('getDownloadUrl' in blob).toBe(false);
    });

    it('rejects with BlobUnavailableError within the timeout when the store is down', async () => {
      const down = options.unavailable();
      const key = sha256(randomBytes(16));
      const started = Date.now();
      await expect(down.exists(key)).rejects.toBeInstanceOf(BlobUnavailableError);
      await expect(down.getStream(key)).rejects.toBeInstanceOf(BlobUnavailableError);
      await expect(down.put(key, Buffer.alloc(0), { sizeBytes: 0 })).rejects.toBeInstanceOf(Error);
      expect(Date.now() - started).toBeLessThan(options.unavailableWithinMs ?? 15_000);
    });
  });
}
