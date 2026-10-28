namespace Syncfusion.BoldCreate.Connect;

// Wire names are the snake_case of the member name. A value this version does not know reads as Unknown.

public enum PluginKind { Unknown, Mcp, Skill, Rule, Hook, Agent }

public enum FileKind { Unknown, Skill, Rule, Hook, Agent }

public enum InstallMode { Unknown, Off, Allowlist, Any }

public enum ProjectUserStatus { Unknown, Active, Suspended }

public enum SessionStatus { Unknown, Active, Expired, Revoked }

public enum ConnectionStatus { Unknown, Active, NeedsReauth }

public enum ConnectionKind { Unknown, Oauth, ApiKey, Env }

public enum McpAuthMode { Unknown, None, ApiKey, OauthDcr, OauthClient }

public enum AuthConfigMode { Unknown, Dcr, OauthClient, SharedSecret, UserForm }

public enum AuthConfigStatus { Unknown, Active, Disabled }

public enum PluginSource { Unknown, User, Project }

public enum PluginStatus { Unknown, Active, Deprecated, Suspended }

public enum ManifestScope { Unknown, Org, User, Project }

public enum SkipReason { Unknown, UnsupportedKind, NoArchive }

public enum LogResult { Unknown, Success, Denied, Failure }

public enum DeliveryStatus { Unknown, Pending, Delivered, Failed }

public enum CatalogSort { Recent, Updated, Name }

public enum SortDirection { Asc, Desc }

public enum SetupKind { Unknown, None, Connect, Variables, AuthConfigMissing }

public enum McpConfigFormat { Standard, Vscode }
