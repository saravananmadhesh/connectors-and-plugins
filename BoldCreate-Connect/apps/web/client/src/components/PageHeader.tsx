import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string | undefined;
  /** A line of small facts under the description, such as status or creation date. */
  meta?: ReactNode;
  /** The page's one primary action, or its controls, at the right. */
  children?: ReactNode;
}

/** Title, one line of help and the page's action; every page starts with this. */
export function PageHeader({ title, description, meta, children }: Props) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-semibold tracking-tight break-words sm:text-2xl">{title}</h1>
        {description && (
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>
        )}
        {meta && (
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {meta}
          </div>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">{children}</div>
      )}
    </header>
  );
}
