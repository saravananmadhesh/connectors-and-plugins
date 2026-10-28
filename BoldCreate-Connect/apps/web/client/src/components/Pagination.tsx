import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pageNumbers } from '@/lib/pagination';
import { Button } from '@/components/ui/button';

export function Pagination({
  page,
  pageSize,
  total,
  onPage,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(total, page * pageSize);

  return (
    <nav aria-label="Pages" className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground tabular-nums">
        {first}–{last} of {total}
      </p>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        {pageNumbers(page, pages).map((entry, index) =>
          entry === 'gap' ? (
            <span key={`gap-${index}`} className="px-1 text-muted-foreground" aria-hidden="true">
              …
            </span>
          ) : (
            <Button
              key={entry}
              size="sm"
              variant={entry === page ? 'secondary' : 'ghost'}
              aria-label={`Page ${entry}`}
              aria-current={entry === page ? 'page' : undefined}
              onClick={() => onPage(entry)}
            >
              {entry}
            </Button>
          ),
        )}
        <Button
          size="sm"
          variant="outline"
          aria-label="Next page"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
