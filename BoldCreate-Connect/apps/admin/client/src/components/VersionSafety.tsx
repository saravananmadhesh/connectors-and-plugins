import type { ReactNode } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import type { AdminVersionDetailResponse } from '../lib/api';
import { formatBytes } from '../lib/format';
import { Alert } from './ui/alert';

function Section({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children?: ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-1.5 text-sm font-semibold">{title}</h3>
      {children ?? <p className="text-sm text-muted-foreground">{empty}</p>}
    </section>
  );
}

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs break-all">{children}</code>
);

/** What a reviewer checks before publishing: secrets, what runs on a machine, what must be filled in. */
export function VersionSafety({ version }: { version: AdminVersionDetailResponse }) {
  const scan = version.scan;
  if (!scan) {
    return (
      <Alert variant="info">
        This version was ingested without a scan report. Raise the version in the repository and
        sync again to get one.
      </Alert>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {scan.findings.length > 0 ? (
        <Alert variant="destructive" role="alert">
          <p className="flex items-center gap-2 font-medium">
            <ShieldAlert className="size-4" />
            {scan.findings.length} possible secret{scan.findings.length === 1 ? '' : 's'} found.
            Check these files before publishing.
          </p>
          <ul className="mt-2 list-disc pl-6">
            {scan.findings.map((finding) => (
              <li key={`${finding.path}:${finding.kind}`}>
                <Code>{finding.path}</Code> · {finding.kind}
              </li>
            ))}
          </ul>
        </Alert>
      ) : (
        <Alert variant="success">
          <p className="flex items-center gap-2 font-medium">
            <ShieldCheck className="size-4" />
            No secrets were found in {scan.fileCount} files ({formatBytes(scan.totalBytes)}).
          </p>
        </Alert>
      )}
      <Section title="Hook commands" empty="This version runs no commands on a member's machine.">
        {scan.hookCommands.length > 0 && (
          <>
            <p className="mb-1.5 text-xs text-muted-foreground">
              These run on the member&apos;s machine when the event happens.
            </p>
            <ul className="flex flex-col gap-1.5 text-sm">
              {scan.hookCommands.map((hook) => (
                <li key={`${hook.event}:${hook.command}`} className="flex flex-wrap gap-2">
                  <span className="w-24 shrink-0 text-muted-foreground">{hook.event}</span>
                  <Code>{hook.command}</Code>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>
      <Section title="MCP servers" empty="This version connects to no MCP servers.">
        {scan.mcpServers.length > 0 && (
          <ul className="flex flex-col gap-1.5 text-sm">
            {scan.mcpServers.map((server) => (
              <li key={server.name} className="flex flex-wrap gap-2">
                <span className="w-24 shrink-0 font-medium">{server.name}</span>
                <span className="text-muted-foreground">{server.transport}</span>
                <Code>{server.url ?? server.command ?? ''}</Code>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Section title="Values members fill in" empty="Members have nothing to fill in.">
        {scan.variables.length > 0 && (
          <ul className="flex flex-col gap-1 text-sm">
            {scan.variables.map((variable) => (
              <li key={variable.name}>
                <Code>{variable.name}</Code>
                <span className="text-muted-foreground">
                  {variable.required ? ' · required' : ' · optional'}
                  {variable.secret ? ' · secret' : ''}
                  {variable.description ? ` · ${variable.description}` : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>
      {scan.skipped.length > 0 && (
        <Section title="Left out of the archive" empty="">
          <ul className="flex flex-col gap-1 text-sm">
            {scan.skipped.map((item) => (
              <li key={`${item.path}:${item.reason}`}>
                <Code>{item.path}</Code>
                <span className="text-muted-foreground"> · {item.reason}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
