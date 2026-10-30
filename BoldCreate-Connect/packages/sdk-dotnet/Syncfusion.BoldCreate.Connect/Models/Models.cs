using System.Text.Json;

namespace Syncfusion.BoldCreate.Connect;

/// <summary>One page of a list that pages by cursor.</summary>
public sealed record Page<T>(IReadOnlyList<T> Items, string? NextCursor);

public record PageOptions
{
    public string? Cursor { get; init; }

    public int? Limit { get; init; }
}

public sealed record ProjectUser(
    string Id,
    string UserId,
    string DisplayName,
    ProjectUserStatus Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? LastSeenAt,
    int SessionCount,
    int ConnectionCount,
    DateTimeOffset? LastSyncedAt,
    int ConnectionsMissing);

public sealed record ProjectPlugin(
    string PluginId,
    string Name,
    string DisplayName,
    string VersionId,
    string Version,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    IReadOnlyList<string>? ExistingAuthConfigs = null,
    ProjectPluginSetup? Setup = null,
    IReadOnlyList<ProjectPluginServer>? Servers = null);

/// <summary>Where a project plugin stands: <c>ready</c>, <c>needs_values</c>, <c>no_sign_in</c> or <c>no_auth</c>, and the values still missing.</summary>
public sealed record ProjectPluginSetup(string Status, IReadOnlyList<string> Missing);

/// <summary>One MCP server of a project plugin and how its users sign in.</summary>
public sealed record ProjectPluginServer(
    string Name,
    string ComponentId,
    string? AuthMode,
    string? DefaultAuthConfigId);

/// <summary>What a user still has to do before one server of a plugin can be used.</summary>
public sealed record ConnectSetup(SetupKind Kind, IReadOnlyList<string>? Names = null);

public sealed record UserPluginConnection(
    string Id,
    ConnectionStatus Status,
    DateTimeOffset? ExpiresAt,
    DateTimeOffset ConnectedAt);

public sealed record UserPluginComponent(string ComponentId, string Kind, string Name, bool Enabled);

public sealed record UserPluginVariable(string Name, bool Secret, bool IsSet);

public sealed record UserPluginMcp(
    string ComponentId,
    string ServerName,
    string? AuthConfigId,
    McpAuthMode AuthMode,
    ConnectSetup Setup,
    bool Ready,
    UserPluginConnection? Connection);

public sealed record UserPlugin(
    string PluginId,
    string Name,
    string DisplayName,
    PluginSource Source,
    bool Removable,
    string VersionId,
    string Version,
    string LatestVersionId,
    bool UpdateAvailable,
    DateTimeOffset InstalledAt,
    DateTimeOffset UpdatedAt,
    IReadOnlyList<UserPluginComponent> Components,
    IReadOnlyList<UserPluginVariable> Variables,
    IReadOnlyList<UserPluginMcp> Mcp);

public sealed record ToolPolicy
{
    public IReadOnlyList<string>? Disable { get; init; }

    public bool? DisableDestructive { get; init; }
}

public sealed record SessionAuthConfigRef(string PluginId, string ServerName, string AuthConfigId);

public sealed record SessionInfo(
    string Id,
    string UserId,
    IReadOnlyList<string> Plugins,
    ToolPolicy Tools,
    IReadOnlyList<SessionAuthConfigRef> AuthConfigs,
    SessionStatus Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset ExpiresAt,
    DateTimeOffset? LastUsedAt);

public sealed record CatalogCategory(string Slug, string Name);

public sealed record CatalogVersion(string Id, string Version);

public sealed record ComponentCounts(int Agent, int Skill, int Mcp, int Hook, int Rule);

public sealed record CatalogPlugin(
    string Id,
    string Name,
    string DisplayName,
    string Summary,
    IReadOnlyList<string> Keywords,
    PluginStatus Status,
    string Visibility,
    string? PublisherOrganizationId,
    bool Featured,
    bool Verified,
    IReadOnlyList<CatalogCategory> Categories,
    string? LogoUrl,
    DateTimeOffset UpdatedAt,
    CatalogVersion? LatestVersion,
    ComponentCounts ComponentCounts,
    bool? Installed);

public sealed record CatalogPage(IReadOnlyList<CatalogPlugin> Items, int Total, int Page, int PageSize);

public sealed record CatalogQuery
{
    public string? Q { get; init; }

    public string? Keyword { get; init; }

    public PluginKind? Kind { get; init; }

    public string? Categories { get; init; }

    public bool? Featured { get; init; }

    public CatalogSort? Sort { get; init; }

    public SortDirection? Direction { get; init; }

    public int? Page { get; init; }

    public int? Limit { get; init; }
}

public sealed record AllowedPlugin(string PluginId, string Name, string DisplayName, DateTimeOffset AllowedAt);

public sealed record PluginSetMember(string PluginId, string Name, string DisplayName);

public sealed record PluginSet(
    string Id,
    string Name,
    IReadOnlyList<PluginSetMember> Plugins,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record VariableStatus(
    string Name,
    string Description,
    bool Required,
    bool Secret,
    bool IsSet,
    bool Custom);

public sealed record ToolInfo(string Name, string Description);

public sealed record AuthConfig(
    string Id,
    string? ComponentId,
    string PluginId,
    string PluginName,
    string ServerName,
    string Name,
    AuthConfigMode AuthMode,
    bool IsDefault,
    AuthConfigStatus Status,
    string? ClientId,
    bool ClientSecretSet,
    bool SecretSet,
    string? SecretLastFour,
    string? Scopes,
    string CallbackUrl,
    IReadOnlyList<VariableStatus> Variables,
    IReadOnlyList<ToolInfo>? Tools,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record Connection(
    string Id,
    string UserId,
    string ComponentId,
    string ServerName,
    string? AuthConfigId,
    ConnectionKind Kind,
    IReadOnlyList<string> ValueNames,
    ConnectionStatus Status,
    DateTimeOffset? ExpiresAt,
    DateTimeOffset CreatedAt);

public sealed record LogUser(string Id, string? UserId);

public sealed record LogTarget(string Kind, string Id);

public sealed record LogEntry(
    string Id,
    string Action,
    LogResult Result,
    DateTimeOffset CreatedAt,
    LogUser? User,
    LogTarget? Target,
    string? Tool,
    string? Outcome,
    int? DurationMs,
    int? AppliedCount);

public sealed record UsageDay(string Date, int ActiveUsers, int ToolCalls, int Errors);

public sealed record UsageUser(string Id, string? UserId, int ToolCalls);

public sealed record Usage(
    DateTimeOffset From,
    DateTimeOffset To,
    IReadOnlyList<UsageDay> Days,
    IReadOnlyList<UsageUser> TopUsers);

public sealed record WebhookDelivery(
    string Id,
    string EventId,
    string Type,
    DeliveryStatus Status,
    int Attempts,
    DateTimeOffset? NextAttemptAt,
    int? LastStatusCode,
    DateTimeOffset CreatedAt);

/// <summary>A verified webhook body. <see cref="Type"/> is text so a new event type does not break reading.</summary>
public sealed record WebhookEvent(
    string Id,
    string Type,
    DateTimeOffset CreatedAt,
    string ProjectId,
    string? UserId,
    IReadOnlyDictionary<string, JsonElement> Data,
    int? Version);

public sealed record ManifestComponent(
    string Id,
    FileKind Kind,
    string Name,
    bool Enabled,
    string Sha256,
    long SizeBytes,
    string Href,
    string Path);

public sealed record ManifestMcp(
    string ComponentId,
    string Name,
    string ServerName,
    string Url,
    string Transport,
    string Description,
    bool Ready,
    ConnectSetup Setup);

public sealed record ManifestEntry(
    string InstallationId,
    string PluginId,
    string PluginName,
    string VersionId,
    string Version,
    ManifestScope Scope,
    bool Yanked,
    string Sha256,
    long SizeBytes,
    string Href,
    IReadOnlyList<ManifestComponent> Components,
    IReadOnlyList<ManifestMcp> Mcp,
    ConnectSetup Setup);

public sealed record ManifestSkipped(
    string PluginId,
    string VersionId,
    string? ComponentId,
    PluginKind? Kind,
    SkipReason Reason);

public sealed record Manifest(
    string Revision,
    int PollAfterSeconds,
    IReadOnlyList<ManifestEntry> Entries,
    IReadOnlyList<ManifestSkipped> Skipped);

/// <summary>The answer to a manifest request: a manifest, or "not modified" when the revision was current.</summary>
public sealed record ManifestResult(Manifest? Manifest)
{
    public bool NotModified => Manifest is null;
}

public sealed record ManifestQuery
{
    public string? Revision { get; init; }

    public IReadOnlyList<FileKind>? Kinds { get; init; }

    public IReadOnlyList<string>? Plugins { get; init; }
}

public sealed record AppliedComponent(string ComponentId, string Sha256);

public sealed record SkippedVersion(string VersionId, PluginKind? Kind = null);

public sealed record SyncReport
{
    public string? Target { get; init; }

    public required IReadOnlyList<AppliedComponent> Applied { get; init; }

    public IReadOnlyList<SkippedVersion>? Skipped { get; init; }
}

/// <summary>One server an agent can be pointed at; <see cref="Headers"/> carries the session token.</summary>
public sealed record McpServer(
    string Name,
    string Url,
    IReadOnlyDictionary<string, string> Headers,
    bool Ready,
    ConnectSetup Setup)
{
    /// <summary>Never prints the headers, which hold the session token.</summary>
    public override string ToString() => $"McpServer({Name}, {Url})";
}
