import { InfoHint } from '@/components/InfoHint';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import type { ApiKeyResponse } from '@/lib/api';
import { activeKeys } from '@/lib/active-keys';
import { formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Snapshot taken once at module load — expiry is a coarse check, not a live clock.
const PAGE_LOAD_ISO = new Date().toISOString();

function KeyStatus({ apiKey }: { apiKey: ApiKeyResponse }) {
  if (apiKey.expiresAt && apiKey.expiresAt < PAGE_LOAD_ISO)
    return <Badge variant="warning">Expired</Badge>;
  return <Badge variant="success">Active</Badge>;
}

/** The keys of one owner. Revoked keys are not listed. */
export function ApiKeyTable({
  items,
  onRevoke,
}: {
  items: readonly ApiKeyResponse[];
  /** Omit to hide the row actions. */
  onRevoke?: ((key: ApiKeyResponse) => void) | undefined;
}) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1.5">
                Permissions
                <InfoHint about="permissions">What this key may do through the gateway.</InfoHint>
              </span>
            </TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeKeys(items).map((key) => (
            <TableRow key={key.id}>
              <TableCell className="font-medium">{key.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {key.prefix} · ···{key.lastFour}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {key.permissions.join(', ')}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {key.expiresAt ? formatDate(key.expiresAt) : 'Never'}
              </TableCell>
              <TableCell>
                <KeyStatus apiKey={key} />
              </TableCell>
              <TableCell>
                {onRevoke && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Actions for ${key.name}`}>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem destructive onSelect={() => onRevoke(key)}>
                        <Trash2 />
                        Revoke
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
