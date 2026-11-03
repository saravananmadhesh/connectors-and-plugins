import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  /** What to do next, when there is something to do. */
  children?: ReactNode;
  className?: string;
}

/** An empty list that says what it is and what to do next. */
export function EmptyState({ icon: Icon, title, description, children, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-12 text-center',
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <p className="font-medium">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
