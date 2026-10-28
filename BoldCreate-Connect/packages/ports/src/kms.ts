export interface KmsKeyRef {
  keyId: string;
  keyVersion: string;
}

export type KmsVersionState = 'enabled' | 'disabled' | 'destroyed';

/** Key management only: wrapping and unwrapping data keys. */
export interface KmsPort {
  activeKey(): Promise<KmsKeyRef>;
  wrapKey(input: {
    plaintext: Uint8Array;
    aad: Uint8Array;
  }): Promise<{ keyId: string; keyVersion: string; wrapped: Uint8Array }>;
  unwrapKey(input: {
    keyId: string;
    keyVersion: string;
    wrapped: Uint8Array;
    aad: Uint8Array;
  }): Promise<Uint8Array>;
  describeKey(keyId: string): Promise<{
    keyId: string;
    primaryVersion: string;
    versions: { version: string; state: KmsVersionState }[];
  }>;
}
