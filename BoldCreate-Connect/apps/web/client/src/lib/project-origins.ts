/** Return origins are typed one per line or separated by commas; blanks are dropped. */
export const parseOrigins = (text: string): string[] =>
  text
    .split(/[\s,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
