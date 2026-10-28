using System.Collections.Concurrent;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Syncfusion.BoldCreate.Connect.Internal;

internal static class WireNames
{
    private static readonly ConcurrentDictionary<Type, (Dictionary<string, object> ByName, Dictionary<object, string> ByValue)> Cache = new();

    public static string Snake(string name)
    {
        var builder = new System.Text.StringBuilder(name.Length + 4);
        for (var i = 0; i < name.Length; i++)
        {
            if (char.IsUpper(name[i]) && i > 0) builder.Append('_');
            builder.Append(char.ToLowerInvariant(name[i]));
        }
        return builder.ToString();
    }

    private static (Dictionary<string, object> ByName, Dictionary<object, string> ByValue) Map(Type type) =>
        Cache.GetOrAdd(type, static t =>
        {
            var byName = new Dictionary<string, object>(StringComparer.Ordinal);
            var byValue = new Dictionary<object, string>();
            foreach (var value in Enum.GetValues(t))
            {
                var wire = Snake(value.ToString()!);
                byName[wire] = value;
                byValue[value] = wire;
            }
            return (byName, byValue);
        });

    public static string ToWire<T>(T value) where T : struct, Enum => Map(typeof(T)).ByValue[value];

    public static T? Parse<T>(string wire) where T : struct, Enum =>
        Map(typeof(T)).ByName.TryGetValue(wire, out var value) ? (T)value : null;

    public static object? ParseObject(Type type, string wire) =>
        Map(type).ByName.TryGetValue(wire, out var value) ? value : null;

    public static string? Name(Type type, object value) =>
        Map(type).ByValue.TryGetValue(value, out var wire) ? wire : null;
}

/// <summary>Reads enum values as snake_case text; a value this version does not know becomes the default (<c>Unknown</c>).</summary>
internal sealed class WireEnumConverter<T> : JsonConverter<T> where T : struct, Enum
{
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.String) return default;
        return WireNames.Parse<T>(reader.GetString() ?? string.Empty) ?? default;
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options) =>
        writer.WriteStringValue(WireNames.ToWire(value));
}

internal sealed class WireEnumConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert) => typeToConvert.IsEnum;

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options) =>
        (JsonConverter)Activator.CreateInstance(typeof(WireEnumConverter<>).MakeGenericType(typeToConvert))!;
}

internal static class Json
{
    public static readonly JsonSerializerOptions Options = Create();

    private static JsonSerializerOptions Create()
    {
        var options = new JsonSerializerOptions(JsonSerializerDefaults.Web)
        {
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            NumberHandling = JsonNumberHandling.Strict,
        };
        options.Converters.Add(new WireEnumConverterFactory());
        return options;
    }
}
