/**
 * Runs the host flow for one user against a real project.
 *
 *   CONNECT_PROJECT_KEY=prk_... CONNECT_USER_ID=user-42 CONNECT_DIR=./agents node run.mjs
 *
 * CONNECT_BASE_URL is optional. The key and the session token are never printed.
 */
import { ConnectClient } from '@syncfusion/boldcreate-connect';
import * as node from '@syncfusion/boldcreate-connect/sync';
import { createHost } from './host.mjs';

const apiKey = process.env.CONNECT_PROJECT_KEY;
const userId = process.env.CONNECT_USER_ID;
if (!apiKey || !userId) {
  process.stderr.write('Set CONNECT_PROJECT_KEY and CONNECT_USER_ID.\n');
  process.exit(1);
}

const host = createHost({
  sdk: { ConnectClient, node },
  apiKey,
  baseUrl: process.env.CONNECT_BASE_URL,
  dir: process.env.CONNECT_DIR ?? './agents',
});

const { token: _token, ...result } = await host.prepareUser(userId, {
  callbackUrl: process.env.CONNECT_CALLBACK_URL ?? 'https://yourapp.example/connected',
});
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
