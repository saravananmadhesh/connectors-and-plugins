import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { adminApi, type AdminPluginDetailResponse, type PluginFlagsBody } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { CATEGORIES_KEY, PLUGINS_KEY } from '../lib/plugins';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox, Switch } from './ui/checkbox';

/** Categories, the featured and verified marks and who can see one plugin. */
export function PluginClassification({ plugin }: { plugin: AdminPluginDetailResponse }) {
  const queryClient = useQueryClient();
  const categories = useQuery({ queryKey: CATEGORIES_KEY, queryFn: adminApi.listCategories });
  const saved = plugin.categories.map((category) => category.id);
  const [selected, setSelected] = useState<string[]>(saved);
  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin', 'plugin', plugin.id] }),
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
    ]);
  };
  const saveCategories = useMutation({
    mutationFn: () => adminApi.setPluginCategories(plugin.id, selected),
    onSuccess: refresh,
  });
  const setFlag = useMutation({
    mutationFn: (flags: PluginFlagsBody) => adminApi.setPluginFlags(plugin.id, flags),
    onSuccess: refresh,
  });
  const changed = selected.length !== saved.length || selected.some((id) => !saved.includes(id));
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <Card role="region" aria-label="Categories and marks">
      <CardHeader>
        <CardTitle>Categories and marks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={plugin.featured}
              disabled={setFlag.isPending}
              onChange={(event) => setFlag.mutate({ featured: event.target.checked })}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={plugin.verified}
              disabled={setFlag.isPending}
              onChange={(event) => setFlag.mutate({ verified: event.target.checked })}
            />
            Verified
          </label>
          <label className="flex items-center gap-2">
            <Switch
              checked={plugin.visibility === 'private'}
              disabled={setFlag.isPending}
              onCheckedChange={(value) =>
                setFlag.mutate({ visibility: value ? 'private' : 'public' })
              }
              aria-label="Private"
            />
            Private (hidden from members)
          </label>
        </div>
        <h3 className="mb-1 mt-4 text-sm font-medium">Categories</h3>
        {categories.isPending && (
          <p className="text-sm text-muted-foreground">Loading categories…</p>
        )}
        {categories.isError && (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage(categories.error)}
          </p>
        )}
        {categories.data && categories.data.items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            There are no categories yet.{' '}
            <Link to="/categories" className="text-primary underline">
              Create one
            </Link>
            .
          </p>
        )}
        {categories.data && categories.data.items.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {categories.data.items.map((category) => (
              <li key={category.id}>
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={selected.includes(category.id)}
                    onChange={() => toggle(category.id)}
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        )}
        {(saveCategories.isError || setFlag.isError) && (
          <Alert variant="destructive" role="alert" className="mt-3">
            {errorMessage(saveCategories.error ?? setFlag.error)}
          </Alert>
        )}
        <Button
          variant="outline"
          size="sm"
          disabled={!changed || saveCategories.isPending}
          onClick={() => saveCategories.mutate()}
          className="mt-3"
        >
          {saveCategories.isPending ? 'Saving…' : 'Save categories'}
        </Button>
      </CardContent>
    </Card>
  );
}
