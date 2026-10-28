import { createLogger } from '@boldcreate-integrations/observability';
import { installProcessGuards } from '../src/process-guards.js';

const logger = createLogger({ service: 'api' });
installProcessGuards(logger);

if (process.argv[2] === 'exception') {
  setTimeout(() => {
    throw new Error('thrown inside a timer');
  }, 5);
} else {
  void Promise.reject(new Error('rejected and never handled'));
}
