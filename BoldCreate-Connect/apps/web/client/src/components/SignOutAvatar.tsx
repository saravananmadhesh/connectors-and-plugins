import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { UserAvatar } from '@/components/UserAvatar';

/** The signed-in person's avatar; on hover or keyboard focus it turns into the sign-out button. */
export function SignOutAvatar({
  name,
  colorKey,
  disabled = false,
  onSignOut,
  className,
}: {
  name: string;
  colorKey?: string;
  disabled?: boolean;
  onSignOut: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Sign out"
      title="Sign out"
      disabled={disabled}
      onClick={onSignOut}
      className={cn(
        'group/out relative grid size-8 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60',
        className,
      )}
    >
      <UserAvatar
        name={name}
        {...(colorKey ? { colorKey } : {})}
        className="group-hover/out:hidden group-focus-visible/out:hidden"
      />
      <span
        aria-hidden="true"
        className="hidden size-8 place-items-center rounded-full bg-sidebar-accent text-sidebar-foreground group-hover/out:grid group-focus-visible/out:grid"
      >
        <LogOut className="size-4" />
      </span>
    </button>
  );
}

/** The plain sign-out button for the wide sidebar, at the end of the account row. */
export function SignOutButton({
  disabled = false,
  onSignOut,
}: {
  disabled?: boolean;
  onSignOut: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Sign out"
      title="Sign out"
      disabled={disabled}
      onClick={onSignOut}
      className="shrink-0 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
    >
      <LogOut />
    </Button>
  );
}
