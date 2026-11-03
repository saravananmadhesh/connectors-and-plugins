import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Webhook } from 'lucide-react';
import { ApiError, projects } from '@/lib/api';
import type { ProjectWebhookResponse, WebhookEvent } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { WEBHOOK_EVENTS, WEBHOOK_EVENT_INFO } from '@/lib/webhook-events';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CopyButton } from '@/components/CopyButton';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { EmptyState } from '@/components/EmptyState';
import { Section } from '@/components/Page';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

/** The project's webhook, or null when it has none. */
async function loadWebhook(
  orgId: string,
  projectId: string,
): Promise<ProjectWebhookResponse | null> {
  try {
    return await projects.webhook(orgId, projectId);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

/** Shows a signing secret once; it cannot be read again after this. */
function SecretDialog({ secret, onDone }: { secret: string; onDone: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onDone()}>
      <DialogContent>
        <DialogTitle>Signing secret</DialogTitle>
        <div className="mt-4 space-y-4">
          <Alert variant="warning">
            Copy this secret now and store it on your server. It will not be shown again.
          </Alert>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border bg-muted px-3 py-2 font-mono text-xs break-all">
              {secret}
            </code>
            <CopyButton value={secret} label="Copy secret" />
          </div>
          <div className="flex justify-end">
            <Button onClick={onDone}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WebhookForm({
  orgId,
  projectId,
  current,
  onSecret,
}: {
  orgId: string;
  projectId: string;
  current: ProjectWebhookResponse | null;
  onSecret: (secret: string) => void;
}) {
  const qc = useQueryClient();
  const [url, setUrl] = useState(current?.url ?? '');
  const [events, setEvents] = useState<WebhookEvent[]>(current?.events ?? [...WEBHOOK_EVENTS]);
  const [enabled, setEnabled] = useState(current?.enabled ?? true);
  const [error, setError] = useState('');

  const save = useMutation({
    mutationFn: () => projects.putWebhook(orgId, projectId, { url: url.trim(), events, enabled }),
    onSuccess: (response) => {
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'webhook') });
      if ('secret' in response) onSecret(response.secret);
    },
    onError: (err) => setError(messageOf(err)),
  });

  const toggle = (event: WebhookEvent) =>
    setEvents((previous) =>
      previous.includes(event) ? previous.filter((item) => item !== event) : [...previous, event],
    );

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError('');
        save.mutate();
      }}
    >
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="space-y-1.5">
        <Label htmlFor="webhook-url">Address</Label>
        <Input
          id="webhook-url"
          type="url"
          placeholder="https://example.com/hooks/boldcreate"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          An https address on the public internet. Each event is signed with the signing secret so
          you can check it came from us.
        </p>
      </div>
      <fieldset className="space-y-2">
        <legend className="mb-1 text-sm font-medium">Events</legend>
        {WEBHOOK_EVENTS.map((event) => (
          <label key={event} className="flex cursor-pointer items-start gap-2.5 text-sm">
            <Checkbox
              className="mt-0.5"
              checked={events.includes(event)}
              onChange={() => toggle(event)}
            />
            <span>
              <span className="font-mono text-xs">{event}</span>
              <span className="block text-xs text-muted-foreground">
                {WEBHOOK_EVENT_INFO[event]}
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <Checkbox checked={enabled} onChange={() => setEnabled((previous) => !previous)} />
        Send events
      </label>
      <div className="flex justify-end">
        <Button type="submit" disabled={save.isPending || url.trim() === '' || events.length === 0}>
          {current ? 'Save webhook' : 'Add webhook'}
        </Button>
      </div>
    </form>
  );
}

function Deliveries({ orgId, projectId }: { orgId: string; projectId: string }) {
  const paging = useCursorPaging();
  const deliveries = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'webhook-deliveries', { cursor: paging.cursor }),
    queryFn: () => projects.webhookDeliveries(orgId, projectId, { cursor: paging.cursor }),
  });
  const items = deliveries.data?.items ?? [];
  return (
    <QueryFrame
      label="deliveries"
      isPending={deliveries.isPending}
      error={deliveries.error}
      onRetry={() => void deliveries.refetch()}
    >
      {items.length === 0 && !paging.hasPrevious ? (
        <p className="text-sm text-muted-foreground">No events have been sent yet.</p>
      ) : (
        <div className="space-y-3">
          <Card className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-mono text-xs">{delivery.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          delivery.status === 'delivered'
                            ? 'success'
                            : delivery.status === 'failed'
                              ? 'destructive'
                              : 'outline'
                        }
                      >
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{delivery.attempts}</TableCell>
                    <TableCell>{delivery.lastStatusCode ?? '—'}</TableCell>
                    <TableCell>{relativeTime(delivery.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <CursorPager
            hasPrevious={paging.hasPrevious}
            nextCursor={deliveries.data?.nextCursor}
            onBack={paging.back}
            onForward={paging.forward}
          />
        </div>
      )}
    </QueryFrame>
  );
}

/** The webhook that tells a host's server what happens in the project. */
export function SettingsTab({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const [secret, setSecret] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState('');
  const webhook = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'webhook'),
    queryFn: () => loadWebhook(orgId, projectId),
  });
  const refresh = () =>
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'webhook') });
  const rotate = useMutation({
    mutationFn: () => projects.rotateWebhookSecret(orgId, projectId),
    onSuccess: (response) => {
      setSecret(response.secret);
      refresh();
    },
    onError: (err) => setError(messageOf(err)),
  });
  const remove = useMutation({
    mutationFn: () => projects.deleteWebhook(orgId, projectId),
    onSuccess: () => {
      setRemoving(false);
      refresh();
      void qc.invalidateQueries({
        queryKey: qk.projectPart(orgId, projectId, 'webhook-deliveries'),
      });
    },
    onError: (err) => {
      setRemoving(false);
      setError(messageOf(err));
    },
  });
  const current = webhook.data ?? null;

  return (
    <QueryFrame
      label="the webhook"
      isPending={webhook.isPending}
      error={webhook.error}
      onRetry={() => void webhook.refetch()}
    >
      <div className="space-y-8">
        {error && <Alert variant="destructive">{error}</Alert>}
        <Section
          title="Webhook"
          description="BoldConnect sends your server a signed request when users, plugins or connections change."
          action={
            canWrite && current ? (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => rotate.mutate()}>
                  Rotate secret
                </Button>
                <Button size="sm" variant="outline" onClick={() => setRemoving(true)}>
                  Remove webhook
                </Button>
              </div>
            ) : undefined
          }
        >
          {canWrite ? (
            <Card className="p-4">
              <WebhookForm
                key={current ? `${current.updatedAt}` : 'new'}
                orgId={orgId}
                projectId={projectId}
                current={current}
                onSecret={setSecret}
              />
            </Card>
          ) : current ? (
            <Card className="space-y-1 p-4 text-sm">
              <p className="font-mono text-xs break-all">{current.url}</p>
              <p className="text-muted-foreground">
                {current.enabled ? 'Sending' : 'Paused'} · {current.events.length} events
              </p>
            </Card>
          ) : (
            <EmptyState
              icon={Webhook}
              title="No webhook"
              description="Ask an admin to add one if your server needs to hear about changes."
            />
          )}
        </Section>
        {current && (
          <Section title="Recent deliveries">
            <Deliveries orgId={orgId} projectId={projectId} />
          </Section>
        )}
      </div>
      {secret && <SecretDialog secret={secret} onDone={() => setSecret(null)} />}
      <ConfirmDialog
        open={removing}
        title="Remove the webhook?"
        description="Events stop being sent and the delivery history is deleted."
        confirmLabel="Remove"
        pending={remove.isPending}
        onConfirm={() => remove.mutate()}
        onClose={() => setRemoving(false)}
      />
    </QueryFrame>
  );
}
