import { runIdempotencyStoreContract } from './idempotency-store.contract.js';
import { createMemoryIdempotencyStore } from './memory-idempotency-store.js';

runIdempotencyStoreContract('memory', async () => {
  const store = createMemoryIdempotencyStore();
  return {
    store,
    expire: async (scope) => store.expire(scope),
    cleanup: async () => undefined,
  };
});
