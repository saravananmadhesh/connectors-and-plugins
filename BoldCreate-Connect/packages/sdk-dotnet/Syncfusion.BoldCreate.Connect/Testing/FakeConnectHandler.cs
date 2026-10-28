using System.Net;
using System.Text;

namespace Syncfusion.BoldCreate.Connect.Testing;

/// <summary>A scripted HTTP handler for host tests: records requests and answers from a queue, then from <see cref="Default"/>.</summary>
public sealed class FakeConnectHandler : HttpMessageHandler
{
    public List<(HttpRequestMessage Request, string? Body)> Calls { get; } = [];

    public Queue<Func<HttpRequestMessage, HttpResponseMessage>> Answers { get; } = new();

    public Func<HttpRequestMessage, HttpResponseMessage>? Default { get; set; }

    public void Enqueue(HttpStatusCode status, string? json = null, Action<HttpResponseMessage>? configure = null) =>
        Answers.Enqueue(_ => Reply(status, json, configure));

    public static HttpResponseMessage Reply(HttpStatusCode status, string? json, Action<HttpResponseMessage>? configure = null)
    {
        var response = new HttpResponseMessage(status);
        if (json is not null) response.Content = new StringContent(json, Encoding.UTF8, "application/json");
        configure?.Invoke(response);
        return response;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var body = request.Content is null ? null : await request.Content.ReadAsStringAsync(cancellationToken);
        Calls.Add((request, body));
        if (Answers.Count > 0) return Answers.Dequeue()(request);
        return Default?.Invoke(request) ?? Reply(HttpStatusCode.InternalServerError, "{}");
    }
}
