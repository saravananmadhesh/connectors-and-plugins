/** A stable colour for a person: the same name or email always gives the same hue. */
export function avatarColor(seed: string): string {
  let hash = 0;
  for (const char of seed.trim().toLowerCase()) hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  return `hsl(${hash % 360} 55% 38%)`;
}

/** Up to two letters: first and last word of a name, or the start of an email. */
export function avatarInitials(name: string): string {
  const words = name
    .split('@')[0]!
    .split(/[\s._-]+/)
    .filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0]!;
  const last = words.length > 1 ? words[words.length - 1]! : '';
  return (first.charAt(0) + (last ? last.charAt(0) : first.charAt(1))).toUpperCase();
}
