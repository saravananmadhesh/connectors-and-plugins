import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AdminImpactResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface Props {
  /** Question shown to the operator, for example "Suspend this plugin?". */
  title: string;
  /** What the change does, in one sentence. */
  effect: string;
  confirmLabel: string;
  impactKey: readonly unknown[];
  loadImpact: () => Promise<AdminImpactResponse>;
  /** Called with `force` set when installations are affected and the operator confirmed it. */
  onConfirm: (force: boolean) => void;
  onCancel: () => void;
  pending: boolean;
  /** When set, installations block the change: nothing can be confirmed until they are gone. */
  blockedByInstalls?: boolean;
  /** Error from the last attempt. */
  error?: unknown;
  /** Shown inside a dialog that already has the title: no frame and no heading of its own. */
  embedded?: boolean;
}

/** Shows who is affected before a change and asks for an explicit force when someone is. */
export function ImpactConfirm(props: Props) {
  const impact = useQuery({ queryKey: props.impactKey, queryFn: props.loadImpact });
  const [understood, setUnderstood] = useState(false);
  const affected = (impact.data?.installations ?? 0) > 0;
  const blocked = affected && props.blockedByInstalls === true;
  const canConfirm = impact.isSuccess && !blocked && (!affected || understood) && !props.pending;

  return (
    <Alert
      variant="warning"
      {...(props.embedded ? {} : { role: 'dialog', 'aria-label': props.title })}
      className={props.embedded ? 'mt-3 border-0 bg-transparent p-0' : 'mt-3'}
    >
      {!props.embedded && <p className="font-medium">{props.title}</p>}
      <p className="mt-1 text-muted-foreground">{props.effect}</p>
      {impact.isPending && (
        <p className="mt-2 text-muted-foreground">Checking what this affects…</p>
      )}
      {impact.isError && (
        <p role="alert" className="mt-2 text-destructive">
          {errorMessage(impact.error)}
        </p>
      )}
      {impact.isSuccess && !affected && (
        <p className="mt-2">Nothing is installed, so no one is affected.</p>
      )}
      {impact.isSuccess && affected && (
        <p className="mt-2">
          Affects {impact.data.installations} installation
          {impact.data.installations === 1 ? '' : 's'} in {impact.data.organizations} organization
          {impact.data.organizations === 1 ? '' : 's'}, set up by {impact.data.users} member
          {impact.data.users === 1 ? '' : 's'}.
        </p>
      )}
      {blocked && (
        <p className="mt-2 text-destructive">
          This cannot be removed while it is installed. Suspend it instead, and delete it once the
          installations are gone.
        </p>
      )}
      {affected && !blocked && (
        <label className="mt-3 flex items-center gap-2">
          <Checkbox
            checked={understood}
            onChange={(event) => setUnderstood(event.target.checked)}
          />
          I understand and want to go ahead anyway
        </label>
      )}
      {props.error !== undefined && props.error !== null && (
        <Alert variant="destructive" role="alert" className="mt-3">
          {errorMessage(props.error)}
        </Alert>
      )}
      <div className="mt-3 flex gap-2">
        {!blocked && (
          <Button
            variant="destructive"
            size="sm"
            disabled={!canConfirm}
            onClick={() => props.onConfirm(affected)}
          >
            {props.pending ? 'Working…' : props.confirmLabel}
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </Alert>
  );
}
