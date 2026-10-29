import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../components/PageHeader';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import { Label } from '../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { adminApi, type AdminCategoryResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { CATEGORIES_KEY, PLUGINS_KEY } from '../lib/plugins';

function AddCategoryForm() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const add = useMutation({
    mutationFn: adminApi.createCategory,
    onSuccess: async () => {
      setName('');
      setDescription('');
      await queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    },
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    add.mutate({ name: name.trim(), description: description.trim() });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add a category</CardTitle>
        <CardDescription>
          Categories a plugin manifest names are created automatically; add the others here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Label>
              Name
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={60}
                required
              />
            </Label>
            <Label>
              Description (optional)
              <Input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={200}
              />
            </Label>
          </div>
          {add.isError && (
            <Alert variant="destructive" role="alert" className="mt-3">
              {errorMessage(add.error)}
            </Alert>
          )}
          <Button type="submit" disabled={add.isPending} className="mt-4">
            {add.isPending ? 'Adding…' : 'Add category'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function CategoryRow({ category }: { category: AdminCategoryResponse }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
    ]);
  };
  const save = useMutation({
    mutationFn: () =>
      adminApi.updateCategory(category.id, { name: name.trim(), description: description.trim() }),
    onSuccess: async () => {
      setEditing(false);
      await refresh();
    },
  });
  const remove = useMutation({
    mutationFn: () => adminApi.deleteCategory(category.id),
    onSuccess: refresh,
  });

  const count = `${category.pluginCount} plugin${category.pluginCount === 1 ? '' : 's'}`;
  return (
    <>
      <TableRow>
        <TableCell className="align-top font-medium">
          {editing ? (
            <Input
              aria-label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={60}
            />
          ) : (
            category.name
          )}
        </TableCell>
        <TableCell className="align-top font-mono text-xs text-muted-foreground">
          {category.slug}
        </TableCell>
        <TableCell className="max-w-sm align-top whitespace-normal">
          {editing ? (
            <Input
              aria-label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={200}
            />
          ) : (
            category.description || <span className="text-muted-foreground">—</span>
          )}
        </TableCell>
        <TableCell className="align-top whitespace-nowrap text-muted-foreground">{count}</TableCell>
        <TableCell className="align-top">
          <div className="flex flex-wrap items-center justify-end gap-2">
            {editing ? (
              <>
                <Button
                  size="sm"
                  disabled={save.isPending || name.trim() === ''}
                  onClick={() => save.mutate()}
                >
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : confirming ? (
              <>
                <span className="max-w-64 text-right text-sm whitespace-normal">
                  {category.pluginCount > 0
                    ? `Remove this category? ${category.pluginCount} plugin${category.pluginCount === 1 ? ' loses' : 's lose'} it; the plugins stay.`
                    : 'Remove this category?'}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate()}
                >
                  Yes, remove
                </Button>
                <Button variant="outline" size="sm" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={`Rename ${category.name}`}
                  onClick={() => setEditing(true)}
                >
                  Rename
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={`Remove ${category.name}`}
                  onClick={() => setConfirming(true)}
                >
                  Remove
                </Button>
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
      {(save.isError || remove.isError) && (
        <TableRow>
          <TableCell colSpan={5}>
            <Alert variant="destructive" role="alert">
              {errorMessage(save.error ?? remove.error)}
            </Alert>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export function CategoriesPage() {
  const categories = useQuery({ queryKey: CATEGORIES_KEY, queryFn: adminApi.listCategories });

  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader
        title="Categories"
        description="A plugin with no category is filed under General."
      />
      <AddCategoryForm />
      {categories.isPending && <Skeleton className="h-24" aria-label="Loading categories" />}
      {categories.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(categories.error)}
        </Alert>
      )}
      {categories.data && categories.data.items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No categories yet. Add one above, then assign it to plugins on their page. A plugin
          manifest that names a category creates it.
        </p>
      )}
      {categories.data && categories.data.items.length > 0 && (
        <div className="rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Plugins</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.items.map((category) => (
                <CategoryRow key={category.id} category={category} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
