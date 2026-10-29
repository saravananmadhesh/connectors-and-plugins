import { UserAvatar } from '@/components/UserAvatar';
import { SignOutAvatar, SignOutButton } from '@/components/SignOutAvatar';
import { ThemeCycleButton, ThemeToggle } from '@/components/ThemeToggle';

interface Props {
  displayName: string;
  email: string;
  signingOut: boolean;
  /** The sidebar is narrowed to icons: the avatar itself becomes the sign-out button. */
  collapsed: boolean;
  onSignOut: () => void;
}

/**
 * Foot of the sidebar, laid out like the admin console: the theme switch always on show, then the
 * signed-in user with sign out at the right of the same row. The profile is a sidebar page.
 */
export function UserMenu({ displayName, email, signingOut, collapsed, onSignOut }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="group-data-[collapsed=true]/sb:md:hidden">
        <ThemeToggle />
      </div>
      <ThemeCycleButton className="hidden self-center group-data-[collapsed=true]/sb:md:inline-flex" />
      <section
        aria-label="Signed-in user"
        className="flex items-center gap-2.5 px-1 py-1 group-data-[collapsed=true]/sb:md:flex-col"
      >
        {collapsed ? (
          <SignOutAvatar
            name={displayName}
            colorKey={email}
            disabled={signingOut}
            onSignOut={onSignOut}
          />
        ) : (
          <UserAvatar name={displayName} colorKey={email} />
        )}
        <span className="min-w-0 flex-1 leading-tight group-data-[collapsed=true]/sb:md:hidden">
          <span className="block truncate text-sm font-medium">{displayName}</span>
          <span className="block truncate text-xs text-sidebar-muted">{email}</span>
        </span>
        {!collapsed && <SignOutButton disabled={signingOut} onSignOut={onSignOut} />}
      </section>
    </div>
  );
}
