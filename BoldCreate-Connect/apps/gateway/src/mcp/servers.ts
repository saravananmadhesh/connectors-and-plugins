/**
 * The MCP servers a key can reach and the names its tools are listed under. A server is an
 * enabled `mcp` component of an installation the key sees; its tools are named
 * `{server}__{tool}` so one flat list stays unambiguous across servers.
 */
import {
  canonicalServerName,
  loadVisibleServers,
  type VisibleServer,
} from '@boldcreate-integrations/domain';

export { canonicalServerName, loadVisibleServers, type VisibleServer };

export const TOOL_SEPARATOR = '__';
/** Longest tool name most model providers accept. */
export const MAX_TOOL_NAME_LENGTH = 64;
const SAFE_NAME = /^[A-Za-z0-9_-]+$/;

export interface ToolSkip {
  server: string;
  tool: string;
  reason: 'separator_in_name' | 'unsafe_characters' | 'name_too_long';
}

/** The provider-safe name of one tool, or why it is skipped. */
export function exposedToolName(
  server: string,
  tool: string,
  direct = false,
): { name: string } | { skip: ToolSkip['reason'] } {
  if (!direct && tool.includes(TOOL_SEPARATOR)) return { skip: 'separator_in_name' };
  if (!SAFE_NAME.test(tool)) return { skip: 'unsafe_characters' };
  const name = direct ? tool : `${server}${TOOL_SEPARATOR}${tool}`;
  if (name.length > MAX_TOOL_NAME_LENGTH) return { skip: 'name_too_long' };
  return { name };
}

/** Splits `{server}__{tool}` at the first separator; the server name never contains one. */
export function splitToolName(full: string): { server: string; tool: string } | null {
  const at = full.indexOf(TOOL_SEPARATOR);
  if (at < 1) return null;
  const tool = full.slice(at + TOOL_SEPARATOR.length);
  return tool === '' ? null : { server: full.slice(0, at), tool };
}
