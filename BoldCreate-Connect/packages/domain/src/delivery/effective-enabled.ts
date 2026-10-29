/**
 * Whether a component is on for one user. The install's `enabled` is the default an administrator
 * sets and always wins when it is off; the user's own override can only turn off what the install
 * has on. With no user (an organization key) the install's value stands.
 *
 * Every path that serves a component (sync manifest, archive download, MCP gateway, connection
 * check, user state) reads it here, so one rule applies everywhere.
 */
import { sql, type SQL } from 'drizzle-orm';
import {
  installationComponentTable,
  userComponentPreferenceTable,
} from '@boldcreate-integrations/db';

export function effectiveEnabled(userId: string | undefined): SQL<boolean> {
  if (userId === undefined) return sql<boolean>`${installationComponentTable.enabled}`;
  return sql<boolean>`(${installationComponentTable.enabled} AND COALESCE((
    SELECT ${userComponentPreferenceTable.enabled}
    FROM ${userComponentPreferenceTable}
    WHERE ${userComponentPreferenceTable.installationId} = ${installationComponentTable.installationId}
      AND ${userComponentPreferenceTable.componentId} = ${installationComponentTable.componentId}
      AND ${userComponentPreferenceTable.userId} = ${userId}
  ), true))`;
}
