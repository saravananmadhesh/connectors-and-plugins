/**
 * S3 blob adapter: content-addressed storage keyed by sha256.
 *
 * The key is validated before any network call, writes are verified against the key, and there
 * is no operation that hands out a URL.
 */
import { createHash } from 'node:crypto';
import { Readable, Transform } from 'node:stream';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {
  BlobKeyError,
  BlobNotFoundError,
  BlobRangeError,
  BlobUnavailableError,
  type BlobPort,
  type BlobRange,
  type Sha256,
} from '@boldcreate-integrations/ports';

export interface S3BlobOptions {
  endpoint?: string;
  region: string;
  bucket: string;
  forcePathStyle?: boolean;
  credentials?: { accessKeyId: string; secretAccessKey: string };
  /** Key prefix inside the bucket. */
  prefix?: string;
  connectTimeoutMs?: number;
  requestTimeoutMs?: number;
}

const SHA256 = /^[a-f0-9]{64}$/;

function checkKey(sha256: string): void {
  if (!SHA256.test(sha256)) throw new BlobKeyError();
}

interface AwsLikeError {
  name?: string;
  $metadata?: { httpStatusCode?: number };
}

function mapError(error: unknown): Error {
  if (
    error instanceof BlobKeyError ||
    error instanceof BlobNotFoundError ||
    error instanceof BlobRangeError ||
    error instanceof BlobUnavailableError
  ) {
    return error;
  }
  const e = error as AwsLikeError;
  const status = e?.$metadata?.httpStatusCode;
  if (e?.name === 'NoSuchKey' || e?.name === 'NotFound' || status === 404) {
    return new BlobNotFoundError();
  }
  if (e?.name === 'InvalidRange' || status === 416) return new BlobRangeError();
  return new BlobUnavailableError(undefined);
}

function parseContentRange(header: string | undefined) {
  const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(header ?? '');
  if (!match) return undefined;
  return { start: Number(match[1]), end: Number(match[2]), total: Number(match[3]) };
}

export function createS3Blob(options: S3BlobOptions): BlobPort & { close(): void } {
  const prefix = options.prefix ?? 'artifacts/';
  const client = new S3Client({
    region: options.region,
    ...(options.endpoint ? { endpoint: options.endpoint } : {}),
    forcePathStyle: options.forcePathStyle ?? false,
    ...(options.credentials ? { credentials: options.credentials } : {}),
    maxAttempts: 1,
    // Range responses carry the checksum of the whole object on some S3-compatible servers.
    responseChecksumValidation: 'WHEN_REQUIRED',
    requestHandler: {
      connectionTimeout: options.connectTimeoutMs ?? 3000,
      requestTimeout: options.requestTimeoutMs ?? 30_000,
    },
  });
  const keyOf = (sha256: Sha256) => `${prefix}${sha256}`;

  async function deleteObject(sha256: Sha256): Promise<void> {
    await client.send(new DeleteObjectCommand({ Bucket: options.bucket, Key: keyOf(sha256) }));
  }

  return {
    async getStream(sha256, range?: BlobRange) {
      checkKey(sha256);
      if (range && (range.start < 0 || range.end < range.start)) throw new BlobRangeError();
      try {
        const res = await client.send(
          new GetObjectCommand({
            Bucket: options.bucket,
            Key: keyOf(sha256),
            ...(range ? { Range: `bytes=${range.start}-${range.end}` } : {}),
          }),
        );
        const contentRange = parseContentRange(res.ContentRange);
        const total = contentRange?.total ?? res.ContentLength ?? 0;
        return {
          stream: res.Body as Readable,
          sizeBytes: total,
          ...(contentRange ? { contentRange } : {}),
        };
      } catch (error) {
        throw mapError(error);
      }
    },

    async head(sha256) {
      checkKey(sha256);
      try {
        const res = await client.send(
          new HeadObjectCommand({ Bucket: options.bucket, Key: keyOf(sha256) }),
        );
        return { sizeBytes: res.ContentLength ?? 0 };
      } catch (error) {
        const mapped = mapError(error);
        if (mapped instanceof BlobNotFoundError) return null;
        throw mapped;
      }
    },

    async put(sha256, body, opts) {
      checkKey(sha256);
      const hash = createHash('sha256');
      let stream: Readable;
      if (body instanceof Uint8Array) {
        hash.update(body);
        if (hash.copy().digest('hex') !== sha256) throw new BlobKeyError('hash_mismatch');
        stream = Readable.from([Buffer.from(body)]);
      } else {
        stream = body.pipe(
          new Transform({
            transform(chunk: Buffer, _encoding, callback) {
              hash.update(chunk);
              callback(null, chunk);
            },
          }),
        );
        body.on('error', (error) => stream.destroy(error));
      }
      try {
        await new Upload({
          client,
          params: {
            Bucket: options.bucket,
            Key: keyOf(sha256),
            Body: stream,
            ContentLength: opts.sizeBytes,
          },
          queueSize: 1,
        }).done();
      } catch (error) {
        throw mapError(error);
      }
      if (hash.digest('hex') !== sha256) {
        await deleteObject(sha256).catch(() => undefined);
        throw new BlobKeyError('hash_mismatch');
      }
    },

    async exists(sha256) {
      return (await this.head(sha256)) !== null;
    },

    async delete(sha256) {
      checkKey(sha256);
      try {
        await deleteObject(sha256);
      } catch (error) {
        const mapped = mapError(error);
        if (!(mapped instanceof BlobNotFoundError)) throw mapped;
      }
    },

    close() {
      client.destroy();
    },
  };
}
