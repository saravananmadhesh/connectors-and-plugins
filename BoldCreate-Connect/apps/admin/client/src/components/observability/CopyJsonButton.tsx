import { useEffect, useRef, useState } from 'react';
import { Braces, Check } from 'lucide-react';
import { Button } from '../ui/button';

/** Copies one record as formatted JSON; `label` names it for screen readers and the tooltip. */
export function CopyJsonButton({
  json,
  label,
  withText = false,
  className,
}: {
  json: () => string;
  label: string;
  withText?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async (event: { stopPropagation: () => void }) => {
    // A row around the button opens the issue on click; copying must not.
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(json());
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <Button
      variant="ghost"
      size={withText ? 'sm' : 'icon'}
      className={className ?? (withText ? 'h-7 shrink-0 gap-1 px-2 text-xs' : 'size-7')}
      aria-label={`Copy ${label} as JSON`}
      title={copied ? 'Copied' : 'Copy as JSON'}
      onClick={(event) => void copy(event)}
    >
      {copied ? <Check className="size-3.5" /> : <Braces className="size-3.5" />}
      {withText && (copied ? 'Copied' : 'Copy JSON')}
    </Button>
  );
}
