import { Check, ChevronDown, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InstallMenu, type InstallScope } from '@/components/InstallMenu';

/**
 * The install action of a plugin: a menu of the scopes still open to the user. Once every
 * scope the user may install into holds the plugin, it turns into a plain "Installed" mark.
 */
export function PluginInstallButton({
  pluginName,
  scopes,
  installed,
  onInstall,
  size = 'sm',
}: {
  pluginName: string;
  /** The scopes still open to install into. */
  scopes: readonly InstallScope[];
  /** The plugin is installed in at least one scope. */
  installed: boolean;
  onInstall: (scope: InstallScope) => void;
  size?: 'sm' | 'default';
}) {
  if (scopes.length === 0) {
    return installed ? (
      <Badge variant="success" className="h-8 px-2.5" aria-label={`${pluginName} is installed`}>
        <Check className="size-3.5" aria-hidden="true" />
        Installed
      </Badge>
    ) : null;
  }
  return (
    <InstallMenu onPick={onInstall} scopes={scopes}>
      <Button
        size={size}
        variant={installed ? 'outline' : 'default'}
        aria-label={`Install ${pluginName}`}
      >
        <Download aria-hidden="true" />
        Install
        <ChevronDown aria-hidden="true" className="opacity-60" />
      </Button>
    </InstallMenu>
  );
}
