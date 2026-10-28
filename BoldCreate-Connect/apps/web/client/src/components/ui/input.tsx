import { cn } from '@/lib/cn';

/**
 * Every text field, text area and select shares this. The text colour and weight are set here
 * and not inherited, so a value never takes the muted or medium style of the label around it;
 * the placeholder is the one muted thing, and a disabled field is shown by its fill.
 */
const FIELD =
  'w-full min-w-0 rounded-md border border-input bg-card px-3 text-sm leading-normal font-normal text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
}

export function Input({ className, error, type = 'text', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        aria-invalid={error ? true : undefined}
        className={cn(FIELD, 'h-9 py-1', className)}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(FIELD, 'min-h-20 py-2', className)} {...props} />;
}

/** The browser's own select, drawn like the other fields. */
export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        FIELD,
        'h-9 py-1 pr-8 [&>option]:bg-popover [&>option]:text-popover-foreground',
        className,
      )}
      {...props}
    />
  );
}
