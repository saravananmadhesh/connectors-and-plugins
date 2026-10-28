import { createCloudKms } from './cloud.js';
import { createFakeCloudKms } from './cloud-fake.js';
import { runKmsContract } from '../contract/kms.contract.js';

const KEY = 'projects/p/locations/l/keyRings/r/cryptoKeys/k';

runKmsContract('cloud (fake sdk client)', async () => ({
  port: createCloudKms({ keyName: KEY, client: createFakeCloudKms(KEY) }),
  cleanup: async () => undefined,
}));
