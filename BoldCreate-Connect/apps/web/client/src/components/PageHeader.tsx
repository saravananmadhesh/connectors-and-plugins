import type { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  /** The page's one primary action, or its controls, at the right. */
  children?: ReactNode;
}

/** Title, one line of help and the page's action; every page starts with this. */
export function PageHeader({ title, description, children }: Props) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0 flex-1 basis-64">
        <h1 className="text-xl font-semibold tracking-tight break-words sm:text-2xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </header>
  );
}
