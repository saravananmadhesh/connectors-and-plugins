import { Fragment } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/lib/scope';

/** Where the page sits. Every step above the page is a link; the page itself is not. */
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  if (trail.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <Fragment key={`${index}-${crumb.label}`}>
              {index > 0 && (
                <li aria-hidden="true" className="flex">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
              <li className="min-w-0 break-words">
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                ) : crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="rounded-sm underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
