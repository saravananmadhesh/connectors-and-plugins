export interface SecretValue {
  value: string;
  version: string;
}

export interface SecretsPort {
  get(name: string, version?: string): Promise<SecretValue>;
  /** Calls the handler when the secret changes; returns a function that stops watching. */
  watch(
    name: string,
    handler: (secret: SecretValue) => void,
    opts?: { intervalSeconds?: number },
  ): () => void;
}
