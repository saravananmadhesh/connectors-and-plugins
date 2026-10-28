import { readFileSync } from 'node:fs';

/** Reads the certificate authority file while the adapter is built at process start. */
export function readTlsCa(file: string): Buffer {
  return readFileSync(file);
}
