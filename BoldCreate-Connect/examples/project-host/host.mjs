/**
 * What a host's server does for one of its users with `@syncfusion/boldcreate-connect`: reuse the user's
 * session, find the servers that still need a sign-in, put the plugin files in the user's folder
 * and write the MCP configuration for the agent.
 *
 * The package is passed in as `sdk` (`{ ConnectClient, node: { syncPlugins, toMcpConfig } }`), so the
 * same code runs against the real package, as `run.mjs` does, and against a fake `fetch` in the
 * test. The project key never leaves the `ConnectClient` object, and the session token is never written
 * to disk: the MCP file carries a placeholder.
 */
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

/** A session is renewed this long before it ends, so an agent never starts on a dying one. */
const RENEW_BEFORE_MS = 24 * 3_600_000;

export function createHost({ sdk, apiKey, baseUrl, dir, fetch, now = () => Date.now() }) {
  const connect = new sdk.ConnectClient({
    apiKey,
    ...(baseUrl ? { baseUrl } : {}),
    ...(fetch ? { fetch } : {}),
  });
  /** One live session per user. A user may have 20; do not make one per request. */
  const sessions = new Map();

  async function sessionFor(userId) {
    const known = sessions.get(userId);
    if (known && known.expiresAt.getTime() - now() > RENEW_BEFORE_MS) return known;
    const fresh = await connect.create(userId);
    sessions.set(userId, fresh);
    return fresh;
  }

  /**
   * Gets a user ready: files in `<dir>/<userId>`, an MCP file for the agent, and the sign-in links
   * the user still has to follow. `callbackUrl` is where the user returns to after a sign-in.
   */
  async function prepareUser(userId, { callbackUrl }) {
    const session = await sessionFor(userId);
    const folder = join(dir, userId);

    const files = await sdk.node.syncPlugins(session, { dir: folder });

    const servers = await session.mcp();
    // The token stays a placeholder in the file; the agent's process gets it from CONNECT_TOKEN.
    await writeFile(
      join(folder, 'mcp.json'),
      sdk.node.toMcpConfig(servers, { format: 'standard' }),
    );

    const signIn = [];
    for (const server of servers.filter((item) => !item.ready && item.setup.kind === 'connect')) {
      const request = await session.authorize(server.name, { callbackUrl });
      signIn.push({ server: server.name, redirectUrl: request.redirectUrl });
    }
    return {
      userId,
      files,
      servers: servers.map((server) => server.name),
      signIn,
      token: session.token,
    };
  }

  return { connect, sessionFor, prepareUser };
}
