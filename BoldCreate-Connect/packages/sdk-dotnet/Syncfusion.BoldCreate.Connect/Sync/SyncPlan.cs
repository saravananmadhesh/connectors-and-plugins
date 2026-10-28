namespace Syncfusion.BoldCreate.Connect.Sync;

/// <summary>What the lock file remembers about one placed component.</summary>
public sealed record LockedComponent(
    string PluginName,
    FileKind Kind,
    string Name,
    string Sha256,
    // Files: archive path to the hash of the file as it was placed.
    Dictionary<string, string> Files);

/// <summary>The lock file (<c>.connect/lock.json</c>); the format is shared with the TypeScript SDK.</summary>
public sealed record Lock(int Version, string Revision, string UserId, Dictionary<string, LockedComponent> Components);

/// <summary>A component named the way a person reads it.</summary>
public record ComponentRef(string ComponentId, string PluginName, FileKind Kind, string Name);

public sealed record WantedComponent(string ComponentId, string PluginName, FileKind Kind, string Name, string Sha256)
    : ComponentRef(ComponentId, PluginName, Kind, Name);

public sealed record RemovedComponent(string ComponentId, string PluginName, FileKind Kind, string Name, IReadOnlyList<string> Files)
    : ComponentRef(ComponentId, PluginName, Kind, Name);

/// <summary>A component left alone; <see cref="Reason"/> is <c>hooks_not_allowed</c>.</summary>
public sealed record SkippedComponent(string ComponentId, string PluginName, FileKind Kind, string Name, string Reason)
    : ComponentRef(ComponentId, PluginName, Kind, Name);

internal sealed record SyncScope(IReadOnlyList<FileKind>? Kinds, IReadOnlyList<string>? Plugins, bool AllowHooks);

internal sealed class SyncPlan
{
    public List<WantedComponent> Add { get; } = [];

    public List<WantedComponent> Update { get; } = [];

    public List<RemovedComponent> Remove { get; } = [];

    public List<ComponentRef> Unchanged { get; } = [];

    public List<SkippedComponent> Skipped { get; } = [];
}

internal static class SyncPlanner
{
    private static ComponentRef RefOf(string id, LockedComponent locked) => new(id, locked.PluginName, locked.Kind, locked.Name);

    private static bool KindInScope(FileKind kind, SyncScope scope)
    {
        if (kind == FileKind.Hook && !scope.AllowHooks) return false;
        return scope.Kinds is null || scope.Kinds.Contains(kind);
    }

    /// <summary>
    /// Compares what the manifest wants with what the lock placed. Only the part of the folder inside
    /// the requested kinds and plugins is touched: a component outside it is neither updated nor
    /// removed, and a hook is left alone unless hooks are allowed.
    /// </summary>
    public static SyncPlan Plan(Manifest manifest, Lock? lockFile, SyncScope scope, IReadOnlyDictionary<string, string> pluginIds)
    {
        var plan = new SyncPlan();
        bool PluginInScope(string pluginName) =>
            scope.Plugins is null
            || scope.Plugins.Contains(pluginName)
            || scope.Plugins.Contains(pluginIds.TryGetValue(pluginName, out var id) ? id : string.Empty);

        var wanted = new Dictionary<string, WantedComponent>(StringComparer.Ordinal);
        var order = new List<string>();
        foreach (var entry in manifest.Entries)
        {
            if (!PluginInScope(entry.PluginName)) continue;
            foreach (var component in entry.Components)
            {
                if (!component.Enabled || component.Sha256.Length == 0) continue;
                var reference = new WantedComponent(component.Id, entry.PluginName, component.Kind, component.Name, component.Sha256);
                if (component.Kind == FileKind.Hook && !scope.AllowHooks)
                {
                    plan.Skipped.Add(new SkippedComponent(reference.ComponentId, reference.PluginName, reference.Kind, reference.Name, "hooks_not_allowed"));
                    continue;
                }

                if (!KindInScope(component.Kind, scope)) continue;
                if (!wanted.ContainsKey(component.Id)) order.Add(component.Id);
                wanted[component.Id] = reference;
            }
        }

        foreach (var id in order)
        {
            var component = wanted[id];
            if (lockFile is null || !lockFile.Components.TryGetValue(id, out var locked)) plan.Add.Add(component);
            else if (locked.Sha256 != component.Sha256) plan.Update.Add(component);
            else plan.Unchanged.Add(component);
        }

        foreach (var (id, locked) in lockFile?.Components ?? [])
        {
            if (wanted.ContainsKey(id)) continue;
            if (!KindInScope(locked.Kind, scope) || !PluginInScope(locked.PluginName))
            {
                plan.Unchanged.Add(RefOf(id, locked));
                continue;
            }

            plan.Remove.Add(new RemovedComponent(id, locked.PluginName, locked.Kind, locked.Name, [.. locked.Files.Keys]));
        }

        return plan;
    }
}
