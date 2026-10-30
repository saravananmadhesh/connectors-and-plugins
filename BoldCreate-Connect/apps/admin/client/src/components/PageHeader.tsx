import type { ReactNode } from 'react';
import { RefreshButton } from './RefreshButton';

interface Props {
  title: string;
  description: string;
  /** Show the reload button; turn it off for a page that holds no data to read again. */
  refresh?: boolean;
  /** The page's one primary action, or its controls, at the right. */
  children?: ReactNode;
}

/** Title, one line of help, a reload button and the page's action; every page starts with this. */
export function PageHeader({ title, description, refresh = true, children }: Props) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {refresh && <RefreshButton />}
        {children}
      </div>
    </header>
  );
}
