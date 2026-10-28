import { Link } from '@tanstack/react-router';
import { Compass } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PluginTable } from '../components/PluginTable';
import { Button } from '../components/ui/button';

export function PluginsPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Plugins"
        description="Every plugin in the catalog. Filter, sort and change many at once."
      >
        <Button asChild>
          <Link to="/discover">
            <Compass />
            Discover plugins
          </Link>
        </Button>
      </PageHeader>
      <PluginTable empty="No plugins yet. Use Discover to add a GitHub repository; its plugins appear here for review after the first sync." />
    </div>
  );
}
