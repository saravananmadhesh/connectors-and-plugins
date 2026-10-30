import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import { formatDateTime } from '../../lib/format';
import { errorMessage } from '../../lib/messages';
import { formatCount, formatStorage, storageShare, tableText } from '../../lib/observability';
import { Alert } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { PurgeControl } from './PurgeControl';

const PURGEABLE = ['error_group', 'error_event', 'ops_event'] as const;
const isPurgeable = (table: string): table is (typeof PURGEABLE)[number] =>
  (PURGEABLE as readonly string[]).includes(table);

/** How much room errors and events take against the size limit that triggers an early purge. */
export function StoragePanel() {
  const query = useQuery({
    queryKey: ['admin', 'observability', 'storage'],
    queryFn: adminApi.observabilityStorage,
  });
  if (query.isPending) return <Skeleton className="h-40" aria-label="Loading storage" />;
  if (query.isError) {
    return (
      <Alert variant="destructive" role="alert">
        {errorMessage(query.error)}
      </Alert>
    );
  }
  const { tables, totalBytes, maxTotalBytes } = query.data;
  const share = storageShare(totalBytes, maxTotalBytes);
  return (
    <div className="flex flex-col gap-4">
      <section aria-label="Total size" className="rounded-lg border p-4">
        <p className="text-xs text-muted-foreground">Used</p>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {formatStorage(totalBytes)}
        </p>
        {share === null ? (
          <p className="mt-1 text-xs text-muted-foreground">
            No size limit is set; only the age limits remove old records.
          </p>
        ) : (
          <>
            <div
              role="progressbar"
              aria-label="Share of the size limit"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={share}
              className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
            >
              <div className="h-full rounded-full bg-foreground" style={{ width: `${share}%` }} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {share}% of the {formatStorage(maxTotalBytes)} limit. Above it, the oldest occurrences
              are removed early.
            </p>
          </>
        )}
      </section>
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Records</TableHead>
              <TableHead className="text-right">Rows</TableHead>
              <TableHead className="text-right">Size</TableHead>
              <TableHead>Oldest</TableHead>
              <TableHead>Delete older than</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map((row) => (
              <TableRow key={row.table}>
                <TableCell className="font-medium">{tableText(row.table)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCount(row.rows)}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatStorage(row.bytes)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.oldest ? formatDateTime(row.oldest) : '—'}
                </TableCell>
                <TableCell>
                  {isPurgeable(row.table) && (
                    <PurgeControl table={row.table} label={tableText(row.table)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
