import { useState } from 'react';
import { Package } from 'lucide-react';
import { cn } from '../lib/cn';

const SIZE = { sm: 'size-8', md: 'size-10', lg: 'size-14' } as const;
const ICON = { sm: 'size-4', md: 'size-5', lg: 'size-7' } as const;
const REPOSITORY_FILE = /^https:\/\/raw\.githubusercontent\.com\//;

interface Props {
  /** The plugin's own logo, a file in its repository. Nothing else is ever shown as a logo. */
  src?: string | null | undefined;
  size?: keyof typeof SIZE;
  className?: string;
}

/**
 * The plugin's own logo, or a default tile when it has none or it cannot be loaded. It never
 * stands in the picture of the account or repository the plugin comes from. The name is always
 * shown next to it, so it is decorative.
 */
export function PluginLogo({ src, size = 'sm', className }: Props) {
  const [failedFor, setFailedFor] = useState<string | null>(null);
  const usable = src && REPOSITORY_FILE.test(src) && failedFor !== src;
  return (
    <span
      aria-hidden="true"
      data-logo={usable ? 'image' : 'default'}
      className={cn(
        'grid shrink-0 place-items-center overflow-hidden rounded-lg border bg-muted text-muted-foreground',
        SIZE[size],
        className,
      )}
    >
      {usable ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="size-full object-contain"
          onError={() => setFailedFor(src)}
        />
      ) : (
        <Package className={ICON[size]} />
      )}
    </span>
  );
}
