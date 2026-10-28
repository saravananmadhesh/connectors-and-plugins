import type { SessionResponse } from './api';

/** What a session may call, in a few words for a table cell. */
export const policySummary = (session: SessionResponse): string => {
  const { disable = [], disableDestructive = false } = session.tools;
  const parts = [
    ...(disableDestructive ? ['no destructive tools'] : []),
    ...(disable.length > 0 ? [`${disable.length} disabled`] : []),
  ];
  return parts.length > 0 ? parts.join(', ') : 'All tools';
};
