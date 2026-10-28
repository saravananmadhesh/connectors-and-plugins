import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Props {
  displayName: string;
  email: string;
  signingOut: boolean;
  onSignOut: () => void;
}

/**
 * Foot of the sidebar, laid out like the admin console: the theme switch always on show, then the
 * signed-in user with sign out at the right of the same row. The profile is a sidebar page.
 */
export function UserMenu({ displayName, email, signingOut, onSignOut }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <ThemeToggle />
      <section aria-label="Signed-in user" className="flex items-center gap-2.5 px-1 py-1">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-sidebar-accent text-sm font-medium uppercase"
        >
          {displayName.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-sm font-medium">{displayName}</span>
          <span className="block truncate text-xs text-sidebar-muted">{email}</span>
        </span>
        <Tooltip label="Sign out" side="top">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Sign out"
            disabled={signingOut}
            onClick={onSignOut}
            className="text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut />
          </Button>
        </Tooltip>
      </section>
    </div>
  );
}
