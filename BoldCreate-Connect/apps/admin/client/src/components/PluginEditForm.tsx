import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, type AdminPluginDetailResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY } from '../lib/plugins';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input, Textarea } from './ui/input';
import { Label } from './ui/label';

const parseKeywords = (text: string): string[] =>
  text
    .split(',')
    .map((word) => word.trim())
    .filter((word) => word !== '');

/**
 * The details members see in the catalog. A plugin has the same details whichever repository
 * layout it came from, so the form never mentions the layout.
 */
export function PluginEditForm({ plugin }: { plugin: AdminPluginDetailResponse }) {
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState(plugin.displayName);
  const [summary, setSummary] = useState(plugin.summary);
  const [description, setDescription] = useState(plugin.description);
  const [keywords, setKeywords] = useState(plugin.keywords.join(', '));
  const save = useMutation({
    mutationFn: adminApi.updatePlugin.bind(null, plugin.id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['admin', 'plugin', plugin.id] }),
        queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      ]);
    },
  });

  const changed =
    displayName.trim() !== plugin.displayName ||
    summary.trim() !== plugin.summary ||
    description.trim() !== plugin.description ||
    parseKeywords(keywords).join(',') !== plugin.keywords.join(',');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate({
      displayName: displayName.trim(),
      summary: summary.trim(),
      description: description.trim(),
      keywords: parseKeywords(keywords),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plugin details</CardTitle>
        <CardDescription>
          {plugin.metadataEdited
            ? 'Edited here. Syncing from the source keeps these details.'
            : 'Taken from the plugin manifest. Saving a change here keeps it when the source syncs again.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} aria-label="Plugin details" className="flex flex-col gap-3">
          <Label>
            Display name
            <Input
              value={displayName}
              maxLength={100}
              required
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </Label>
          <Label>
            Summary
            <Input
              value={summary}
              maxLength={200}
              required
              onChange={(event) => setSummary(event.target.value)}
            />
          </Label>
          <Label>
            Description
            <Textarea
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Label>
          <Label>
            Keywords (separated by commas)
            <Input value={keywords} onChange={(event) => setKeywords(event.target.value)} />
          </Label>
          {save.isError && (
            <Alert variant="destructive" role="alert">
              {errorMessage(save.error)}
            </Alert>
          )}
          {save.isSuccess && !changed && (
            <p role="status" className="text-sm text-success">
              Details saved.
            </p>
          )}
          <div>
            <Button type="submit" disabled={!changed || save.isPending}>
              {save.isPending ? 'Saving…' : 'Save details'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
