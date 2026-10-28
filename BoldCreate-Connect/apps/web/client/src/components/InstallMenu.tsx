import type { ReactNode } from 'react';
import { Building2, User, type LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type InstallScope = 'org' | 'user';

const CHOICES: Record<InstallScope, { label: string; icon: LucideIcon }> = {
  org: { label: 'For team', icon: Building2 },
  user: { label: 'For me', icon: User },
};

/**
 * The first choice of an install: who gets the plugin. The trigger is the caller's button, and
 * only the scopes in `scopes` are offered.
 */
export function InstallMenu({
  children,
  onPick,
  scopes,
}: {
  children: ReactNode;
  onPick: (scope: InstallScope) => void;
  scopes: readonly InstallScope[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Install for</DropdownMenuLabel>
        {scopes.map((scope) => {
          const { label, icon: Icon } = CHOICES[scope];
          return (
            <DropdownMenuItem key={scope} onSelect={() => onPick(scope)}>
              <Icon aria-hidden="true" />
              <span className="flex-1">{label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
