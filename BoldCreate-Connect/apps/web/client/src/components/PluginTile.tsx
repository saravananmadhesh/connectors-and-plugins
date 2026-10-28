import { useState } from 'react';
import { Package } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * The plugin mark: its logo when it has one, otherwise a neutral tile, so every list lines up
 * whatever the plugin ships. A logo that fails to load falls back to the same tile.
 */
export function PluginTile({ className, src }: { className?: string; src?: string | null }) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(src) && !failed;
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border bg-muted text-muted-foreground',
        className,
      )}
    >
      {showLogo ? (
        <img
          src={src ?? undefined}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Package className="size-4" />
      )}
    </span>
  );
}
