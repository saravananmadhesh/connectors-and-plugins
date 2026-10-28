using System.Text.RegularExpressions;

namespace Syncfusion.BoldCreate.Connect;

/// <summary>Removes the secret part of keys from text.</summary>
public static partial class Redaction
{
    [GeneratedRegex(@"\b((?:fyk|plk|ptk|prk|stk)_[a-f0-9]{16})\.[A-Za-z0-9_-]{20,}")]
    private static partial Regex KeyPattern();

    /// <summary>Replaces the secret part of every key in a text; the key id stays so a line can be traced.</summary>
    public static string Redact(string text) => KeyPattern().Replace(text, "$1.[redacted]");
}

/// <summary>Every failure the client raises for an answer of the API or for a call it could not make.</summary>
[System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1710:Identifiers should have correct suffix",
    Justification = "The name is the same in the TypeScript and .NET SDKs.")]
public class ConnectError : Exception
{
    public ConnectError(string message, string code, int status, string? requestId = null, Exception? inner = null)
        : base(Redaction.Redact(message), inner)
    {
        Code = code;
        Status = status;
        RequestId = requestId;
    }

    public string Code { get; }

    public int Status { get; }

    public string? RequestId { get; }
}

/// <summary>The key or token is missing, wrong, expired or not allowed to do this.</summary>
public sealed class ConnectAuthError(string message, string code, int status, string? requestId = null)
    : ConnectError(message, code, status, requestId);

/// <summary>The thing asked for does not exist, or is not visible to this key.</summary>
public sealed class ConnectNotFoundError(string message, string code, int status, string? requestId = null)
    : ConnectError(message, code, status, requestId);

/// <summary>Too many calls; wait <see cref="RetryAfterSeconds"/> before the next one.</summary>
public sealed class ConnectRateLimitError(
    string message, string code, int status, string? requestId = null, int? retryAfterSeconds = null)
    : ConnectError(message, code, status, requestId)
{
    public int? RetryAfterSeconds { get; } = retryAfterSeconds;
}

/// <summary>Downloaded bytes do not match the hash or size the manifest promised.</summary>
public sealed class ConnectIntegrityError(string message, string code, int status, string? requestId = null)
    : ConnectError(message, code, status, requestId);

/// <summary>What a user still has to do before a server can be used (see <see cref="ConnectSetup"/>).</summary>
public sealed class ConnectSetupRequiredError(
    string message, string code, int status, ConnectSetup setup, string? requestId = null)
    : ConnectError(message, code, status, requestId)
{
    public ConnectSetup Setup { get; } = setup;
}
