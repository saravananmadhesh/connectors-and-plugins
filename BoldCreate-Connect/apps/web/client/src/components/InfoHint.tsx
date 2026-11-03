import { Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

/**
 * An information mark beside a title or label whose meaning is not obvious. It opens on hover and
 * on keyboard focus; `about` names what it explains for screen readers.
 */
export function InfoHint({ about, children }: { about: string; children: string }) {
  return (
    <Tooltip label={children}>
      <button
        type="button"
        aria-label={`About ${about}`}
        className="inline-flex size-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Info className="size-3.5" aria-hidden="true" />
      </button>
    </Tooltip>
  );
}
