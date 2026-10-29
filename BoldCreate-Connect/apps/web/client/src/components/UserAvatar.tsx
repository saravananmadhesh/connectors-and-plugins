import { avatarColor, avatarInitials } from '@/lib/avatar';
import { cn } from '@/lib/cn';

interface Props {
  /** What the colour and letters come from: an email, which stays the same, is best. */
  name: string;
  /** Overrides the seed of the colour, for example the email when `name` is a display name. */
  colorKey?: string;
  className?: string;
}

/** A round coloured badge with a person's initials, so each user is easy to tell apart. */
export function UserAvatar({ name, colorKey, className }: Props) {
  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: avatarColor(colorKey ?? name) }}
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full text-xs font-medium text-white select-none',
        className,
      )}
    >
      {avatarInitials(name)}
    </span>
  );
}
