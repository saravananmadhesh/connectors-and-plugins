import { BadgeCheck, Star } from 'lucide-react';
import { cn } from '@/lib/cn';

/** The verified and featured marks of a plugin; each shows only when the plugin has it. */
export function PluginMarks({
  verified,
  featured,
  className,
}: {
  verified: boolean;
  featured: boolean;
  className?: string;
}) {
  if (!verified && !featured) return null;
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1', className)}>
      {verified && <BadgeCheck className="size-4 text-info" aria-label="Verified" role="img" />}
      {featured && (
        <Star className="size-4 fill-warning/30 text-warning" aria-label="Featured" role="img" />
      )}
    </span>
  );
}
