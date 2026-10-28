import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  /** What to do next, when there is something to do. */
  children?: ReactNode;
}

/** An empty list that says what it is and what to do next. */
export function EmptyState({ icon: Icon, title, description, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-12 text-center">
      <span className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <p className="font-medium">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
