import type { Readable } from 'node:stream';

/** Lower-case hex SHA-256, `^[a-f0-9]{64}$`. The only key a blob can have. */
export type Sha256 = string;

export interface BlobRange {
  start: number;
  end: number;
}

export interface BlobReadResult {
  stream: Readable;
  sizeBytes: number;
  contentRange?: { start: number; end: number; total: number };
}

/** Content-addressed storage. There is deliberately no way to get a download URL. */
export interface BlobPort {
  getStream(sha256: Sha256, range?: BlobRange): Promise<BlobReadResult>;
  head(sha256: Sha256): Promise<{ sizeBytes: number } | null>;
  put(sha256: Sha256, body: Readable | Uint8Array, opts: { sizeBytes: number }): Promise<void>;
  exists(sha256: Sha256): Promise<boolean>;
  delete(sha256: Sha256): Promise<void>;
}
