using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace Syncfusion.BoldCreate.Connect;

public sealed record McpConfigOptions
{
    public McpConfigFormat Format { get; init; } = McpConfigFormat.Standard;

    /// <summary>Keep the real token in the text. Off by default, so the text can be saved or shown.</summary>
    public bool LiteralToken { get; init; }
}

public static class McpConfig
{
    /// <summary>The name an agent should read the token from when the text carries no literal one.</summary>
    public const string TokenPlaceholder = "${CONNECT_TOKEN}";

    /// <summary>
    /// The text of an MCP configuration file for the servers of a session. <c>Standard</c> is the
    /// <c>mcpServers</c> shape most agents read; <c>Vscode</c> is the <c>servers</c> shape VS Code reads.
    /// The output is byte for byte what the TypeScript <c>toMcpConfig</c> returns.
    /// </summary>
    public static string ToMcpConfig(this IEnumerable<McpServer> servers, McpConfigOptions? options = null)
    {
        ArgumentNullException.ThrowIfNull(servers);
        options ??= new McpConfigOptions();

        // Like Object.fromEntries: a repeated name keeps its first place and takes the last value.
        var order = new List<string>();
        var byName = new Dictionary<string, McpServer>(StringComparer.Ordinal);
        foreach (var server in servers)
        {
            if (!byName.ContainsKey(server.Name)) order.Add(server.Name);
            byName[server.Name] = server;
        }

        using var stream = new MemoryStream();
        using (var writer = new Utf8JsonWriter(stream, new JsonWriterOptions
        {
            Indented = true,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
        }))
        {
            writer.WriteStartObject();
            writer.WriteStartObject(options.Format == McpConfigFormat.Vscode ? "servers" : "mcpServers");
            foreach (var name in order)
            {
                var server = byName[name];
                writer.WriteStartObject(name);
                writer.WriteString("type", "http");
                writer.WriteString("url", server.Url);
                writer.WriteStartObject("headers");
                foreach (var (header, value) in server.Headers)
                {
                    var text = !options.LiteralToken && header.Equals("authorization", StringComparison.OrdinalIgnoreCase)
                        ? $"Bearer {TokenPlaceholder}"
                        : value;
                    writer.WriteString(header, text);
                }

                writer.WriteEndObject();
                writer.WriteEndObject();
            }

            writer.WriteEndObject();
            writer.WriteEndObject();
        }

        // Utf8JsonWriter indents with the platform newline on .NET 8; the file format uses "\n".
        return Encoding.UTF8.GetString(stream.ToArray()).Replace("\r\n", "\n", StringComparison.Ordinal) + "\n";
    }
}
