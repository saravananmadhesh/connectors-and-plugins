namespace Syncfusion.BoldCreate.Connect.Sync;

public enum ConflictMode { Skip, Overwrite }

public sealed record SyncOptions
{
    /// <summary>The folder the plugin files are placed in.</summary>
    public required string Dir { get; init; }

    public IReadOnlyList<FileKind>? Kinds { get; init; }

    /// <summary>Plugin names or ids.</summary>
    public IReadOnlyList<string>? Plugins { get; init; }

    public ConflictMode OnConflict { get; init; } = ConflictMode.Skip;

    public bool AllowHooks { get; init; }

    /// <summary>How long to wait for another sync in the same folder.</summary>
    public TimeSpan GuardTimeout { get; init; } = TimeSpan.FromSeconds(60);
}

public sealed record SyncResult
{
    public required IReadOnlyList<ComponentRef> Added { get; init; }

    public required IReadOnlyList<ComponentRef> Updated { get; init; }

    public required IReadOnlyList<ComponentRef> Removed { get; init; }

    public required IReadOnlyList<ComponentRef> Unchanged { get; init; }

    public required IReadOnlyList<SkippedComponent> Skipped { get; init; }

    /// <summary>Placed files that were changed by hand, or that were already there, and were kept.</summary>
    public required IReadOnlyList<string> Modified { get; init; }

    /// <summary>True when the server could not be reached and the folder was left as it was.</summary>
    public bool Stale { get; init; }
}

public static class SessionSyncExtensions
{
    private static bool FailsHard(Exception error) =>
        error is ConnectError e
        && e is not ConnectNotFoundError
        && (e.Status == 0 || e.Status >= 500)
        && e.Code is not ("integrity_hash" or "integrity_size" or "archive_unsafe");

    private static SyncResult AsUnchanged(Lock lockFile, bool stale = false) => new()
    {
        Added = [],
        Updated = [],
        Removed = [],
        Unchanged = [.. lockFile.Components.Select(c => new ComponentRef(c.Key, c.Value.PluginName, c.Value.Kind, c.Value.Name))],
        Skipped = [],
        Modified = [],
        Stale = stale,
    };

    /// <summary>
    /// Brings the plugin files of a session's user into a folder and keeps them current. Files are
    /// checked against their hash before they are placed, a file changed by hand is kept, and the
    /// token is never written to disk. A server that cannot be reached leaves the folder as it was
    /// and the result says <c>Stale</c>. The lock file is the same as the TypeScript SDK's.
    /// </summary>
    public static async Task<SyncResult> SyncPluginsAsync(
        this ConnectSession session, SyncOptions options, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(session);
        ArgumentNullException.ThrowIfNull(options);
        var scope = new SyncScope(options.Kinds, options.Plugins, options.AllowHooks);
        Directory.CreateDirectory(options.Dir);

        return await SyncFiles.WithFolderGuardAsync(options.Dir, async () =>
        {
            var existing = await SyncFiles.ReadLockAsync(options.Dir, ct).ConfigureAwait(false);
            if (existing is not null && existing.UserId != session.UserId)
            {
                throw new ConnectError("The folder belongs to another user.", "lock_owner_mismatch", 0);
            }

            var baseLock = existing ?? new Lock(1, string.Empty, session.UserId, []);
            var revision = existing?.Revision;
            for (var attempt = 0; ; attempt++)
            {
                ManifestResult result;
                try
                {
                    result = await session.ManifestAsync(new ManifestQuery
                    {
                        Revision = string.IsNullOrEmpty(revision) ? null : revision,
                        Kinds = options.Kinds,
                        Plugins = options.Plugins,
                    }, ct).ConfigureAwait(false);
                }
                catch (Exception error) when (existing is not null && FailsHard(error))
                {
                    return AsUnchanged(existing, stale: true);
                }

                if (result.Manifest is not { } manifest) return AsUnchanged(baseLock);
                var pluginIds = manifest.Entries.GroupBy(e => e.PluginName).ToDictionary(g => g.Key, g => g.Last().PluginId);
                var plan = SyncPlanner.Plan(manifest, existing, scope, pluginIds);
                try
                {
                    var (synced, applied) = await ApplyAsync(session, options, manifest, baseLock, plan, ct).ConfigureAwait(false);
                    if (applied.Count > 0)
                    {
                        try
                        {
                            await session.ReportAsync(new SyncReport { Applied = applied }, ct).ConfigureAwait(false);
                        }
                        catch (ConnectError)
                        {
                            // a report that fails does not undo the files
                        }
                    }

                    return synced;
                }
                catch (ConnectNotFoundError) when (attempt == 0)
                {
                    revision = null;
                }
                catch (Exception error) when (existing is not null && FailsHard(error))
                {
                    return AsUnchanged(existing, stale: true);
                }
            }
        }, options.GuardTimeout, TimeSpan.FromMilliseconds(50), ct).ConfigureAwait(false);
    }

    private static async Task<(SyncResult Result, List<AppliedComponent> Applied)> ApplyAsync(
        ConnectSession session, SyncOptions options, Manifest manifest, Lock lockFile, SyncPlan plan, CancellationToken ct)
    {
        var dir = options.Dir;
        var added = new List<ComponentRef>();
        var updated = new List<ComponentRef>();
        var removed = new List<ComponentRef>();
        var modified = new List<string>();
        var applied = new List<AppliedComponent>();
        var next = new Lock(1, manifest.Revision, session.UserId, new Dictionary<string, LockedComponent>(lockFile.Components));

        // Every archive is downloaded once per hash and checked before anything is written.
        var archives = new Dictionary<string, Dictionary<string, byte[]>>(StringComparer.Ordinal);
        foreach (var wanted in plan.Add.Concat(plan.Update))
        {
            if (archives.ContainsKey(wanted.Sha256)) continue;
            archives[wanted.Sha256] = SyncFiles.ExtractArchive(await session.ComponentAsync(wanted.Sha256, ct).ConfigureAwait(false));
        }

        // The files that stay owned by some component afterwards: a shared file is never removed.
        var owned = new HashSet<string>(SyncFiles.PathComparer);
        foreach (var reference in plan.Unchanged)
        {
            if (!lockFile.Components.TryGetValue(reference.ComponentId, out var locked)) continue;
            foreach (var path in locked.Files.Keys) owned.Add(SyncFiles.DestinationOf(dir, locked.PluginName, path));
        }

        foreach (var wanted in plan.Add.Concat(plan.Update))
        {
            foreach (var path in archives[wanted.Sha256].Keys) owned.Add(SyncFiles.DestinationOf(dir, wanted.PluginName, path));
        }

        async Task<bool> PlaceAsync(WantedComponent wanted, LockedComponent? known)
        {
            var files = new Dictionary<string, byte[]>(SyncFiles.PathComparer);
            var conflicts = new List<string>();
            var hashes = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var (path, bytes) in archives[wanted.Sha256])
            {
                var destination = SyncFiles.DestinationOf(dir, wanted.PluginName, path);
                files[destination] = bytes;
                hashes[path] = SyncFiles.Sha256Hex(bytes);
                var current = await SyncFiles.HashOnDiskAsync(destination, ct).ConfigureAwait(false);
                if (current is null || current == hashes[path]) continue;

                // A file is ours to replace only while it is still what was placed.
                if (known is null || !known.Files.TryGetValue(path, out var placed) || placed != current) conflicts.Add(destination);
            }

            if (conflicts.Count > 0 && options.OnConflict == ConflictMode.Skip)
            {
                modified.AddRange(conflicts);
                return false;
            }

            await SyncFiles.PlaceFilesAsync(dir, files, ct).ConfigureAwait(false);
            next.Components[wanted.ComponentId] = new LockedComponent(wanted.PluginName, wanted.Kind, wanted.Name, wanted.Sha256, hashes);
            applied.Add(new AppliedComponent(wanted.ComponentId, wanted.Sha256));
            return true;
        }

        foreach (var wanted in plan.Add)
        {
            if (await PlaceAsync(wanted, null).ConfigureAwait(false)) added.Add(wanted);
        }

        foreach (var wanted in plan.Update)
        {
            lockFile.Components.TryGetValue(wanted.ComponentId, out var known);
            if (await PlaceAsync(wanted, known).ConfigureAwait(false)) updated.Add(wanted);
        }

        foreach (var gone in plan.Remove)
        {
            if (!lockFile.Components.TryGetValue(gone.ComponentId, out var locked)) continue;
            var doomed = new List<string>();
            var changed = new List<string>();
            foreach (var path in gone.Files)
            {
                var destination = SyncFiles.DestinationOf(dir, locked.PluginName, path);
                if (owned.Contains(destination)) continue;
                var current = await SyncFiles.HashOnDiskAsync(destination, ct).ConfigureAwait(false);
                if (current is not null && current != locked.Files[path]) changed.Add(destination);
                else doomed.Add(destination);
            }

            if (changed.Count > 0)
            {
                modified.AddRange(changed);
                if (options.OnConflict == ConflictMode.Skip) continue;
                doomed.AddRange(changed);
            }

            foreach (var destination in doomed) SyncFiles.RemoveFile(dir, destination);
            next.Components.Remove(gone.ComponentId);
            removed.Add(gone);
        }

        // Anything left out (a kept file, a hook) must be looked at again, so the revision stays where it
        // was and the next call asks for the whole manifest instead of "not modified".
        if (modified.Count > 0 || plan.Skipped.Count > 0) next = next with { Revision = lockFile.Revision };
        await SyncFiles.WriteLockAsync(dir, next, ct).ConfigureAwait(false);
        return (new SyncResult
        {
            Added = added,
            Updated = updated,
            Removed = removed,
            Unchanged = plan.Unchanged,
            Skipped = plan.Skipped,
            Modified = modified,
        }, applied);
    }
}
