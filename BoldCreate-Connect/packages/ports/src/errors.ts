export class BlobNotFoundError extends Error {
  constructor(message = 'blob not found') {
    super(message);
    this.name = 'BlobNotFoundError';
  }
}

export class BlobUnavailableError extends Error {
  constructor(message = 'blob store unavailable') {
    super(message);
    this.name = 'BlobUnavailableError';
  }
}

export class BlobRangeError extends Error {
  constructor(message = 'range not satisfiable') {
    super(message);
    this.name = 'BlobRangeError';
  }
}

export class BlobKeyError extends Error {
  constructor(message = 'invalid blob key') {
    super(message);
    this.name = 'BlobKeyError';
  }
}

export class KmsUnavailableError extends Error {
  constructor(message = 'kms unavailable') {
    super(message);
    this.name = 'KmsUnavailableError';
  }
}

export class KmsKeyDisabledError extends Error {
  constructor(message = 'kms key disabled') {
    super(message);
    this.name = 'KmsKeyDisabledError';
  }
}

export class KmsKeyNotFoundError extends Error {
  constructor(message = 'kms key not found') {
    super(message);
    this.name = 'KmsKeyNotFoundError';
  }
}

export class KmsInvalidCiphertextError extends Error {
  constructor(message = 'kms ciphertext invalid') {
    super(message);
    this.name = 'KmsInvalidCiphertextError';
  }
}

export class SecretNotFoundError extends Error {
  constructor(message = 'secret not found') {
    super(message);
    this.name = 'SecretNotFoundError';
  }
}

export class SecretsUnavailableError extends Error {
  constructor(message = 'secrets unavailable') {
    super(message);
    this.name = 'SecretsUnavailableError';
  }
}

export class EmailUnavailableError extends Error {
  constructor(message = 'email transport unavailable', options?: ErrorOptions) {
    super(message, options);
    this.name = 'EmailUnavailableError';
  }
}
