/** `pnpm pooler start|stop|status`: see `pgbouncer-native.ts`. */
import { nativePoolerRunning, startNativePooler, stopNativePooler } from './pgbouncer-native.js';

const command = process.argv[2];
try {
  if (command === 'start') {
    const url = await startNativePooler(process.env);
    process.stdout.write(`PgBouncer is running. Pooled DATABASE_URL:\n${url}\n`);
  } else if (command === 'stop') {
    stopNativePooler(process.env);
    process.stdout.write('PgBouncer stopped.\n');
  } else if (command === 'status') {
    process.stdout.write(nativePoolerRunning(process.env) ? 'running\n' : 'not running\n');
  } else {
    process.stderr.write('Usage: pnpm pooler start|stop|status\n');
    process.exitCode = 2;
  }
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
