import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Building2, Check, ChevronsUpDown, Plus, Search } from 'lucide-react';
import type { MeResponse } from '@/lib/api';
import { saveActiveOrg } from '@/lib/active-org';
import { rankByRecent, readRecentScopes, rememberScope } from '@/lib/recent-scopes';
import { scopeDestination } from '@/lib/scope';
import { CreateOrgDialog } from '@/components/CreateOrgDialog';
import { ScopePalette, type ScopeTarget } from '@/components/ScopePalette';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip } from '@/components/ui/tooltip';

type Membership = MeResponse['memberships'][number];

/** Rows each short list shows; a few entries all show; many show the recent ones. */
const SWITCHER_LIST_MAX = 5;

/** The shortcut that opens the search, as written for the platform. */
const SEARCH_SHORTCUT = /Mac|iPhone|iPad/i.test(globalThis.navigator?.platform ?? '')
  ? '⌘K'
  : 'Ctrl K';

interface Props {
  memberships: readonly Membership[];
  orgId: string | undefined;
  paletteOpen: boolean;
  onPaletteOpenChange: (open: boolean) => void;
}

/**
 * One place to choose which organization the Manage section is about. The menu lists what the user works in; the search reaches everything.
 */
export function ScopeSwitcher({ memberships, orgId, paletteOpen, onPaletteOpenChange }: Props) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [creating, setCreating] = useState(false);
  const [recent, setRecent] = useState(readRecentScopes);
  const org = memberships.find((m) => m.organizationId === orgId);

  if (!org || !orgId) return null;

  const go = (target: ScopeTarget) => {
    saveActiveOrg({ orgId: target.orgId });
    setRecent(rememberScope(target.orgId));
    onPaletteOpenChange(false);
    void navigate({ to: scopeDestination(pathname, target) });
  };

  const orgItems = memberships.map((m) => ({
    id: m.organizationId,
    name: m.organizationName,
  }));
  const shownOrgs = rankByRecent(orgItems, recent.orgs, orgId, SWITCHER_LIST_MAX);

  return (
    <>
      <DropdownMenu>
        <Tooltip label={`Switch organization (${SEARCH_SHORTCUT})`} side="top" className="w-full">
          <DropdownMenuTrigger
            aria-label="Switch organization"
            aria-keyshortcuts="Control+K Meta+K"
            className="flex w-full items-center gap-2.5 rounded-md border bg-card px-2.5 py-2 group-data-[collapsed=true]/sb:md:justify-center group-data-[collapsed=true]/sb:md:px-0 text-left outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-sidebar-accent text-sidebar-foreground">
              <Building2 className="size-4" />
            </span>
            <span className="min-w-0 flex-1 leading-tight group-data-[collapsed=true]/sb:md:hidden">
              <span className="block truncate text-sm font-medium">{org.organizationName}</span>
            </span>
            <ChevronsUpDown
              aria-hidden="true"
              className="size-4 shrink-0 text-sidebar-muted group-data-[collapsed=true]/sb:md:hidden"
            />
          </DropdownMenuTrigger>
        </Tooltip>
        <DropdownMenuContent side="top" align="start" className="w-72">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {shownOrgs.shown.map((entry) => (
            <DropdownMenuItem key={entry.id} onSelect={() => go({ orgId: entry.id })}>
              <Building2 />
              <span className="flex-1 truncate">{entry.name}</span>
              {entry.id === orgId && <Check aria-label="Current organization" />}
            </DropdownMenuItem>
          ))}
          {shownOrgs.hidden > 0 && (
            <p className="px-2 py-1 text-xs text-muted-foreground">
              {shownOrgs.hidden} more organizations. Search to find them.
            </p>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => onPaletteOpenChange(true)}>
            <Search />
            <span className="flex-1">Search organizations</span>
            <kbd className="rounded border px-1 text-[11px] text-muted-foreground">
              {SEARCH_SHORTCUT}
            </kbd>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setCreating(true)}>
            <Plus />
            New organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ScopePalette
        open={paletteOpen}
        onClose={() => onPaletteOpenChange(false)}
        organizations={memberships.map((m) => ({
          id: m.organizationId,
          name: m.organizationName,
        }))}
        orgId={orgId}
        onSelect={go}
      />
      {creating && <CreateOrgDialog onClose={() => setCreating(false)} />}
    </>
  );
}
