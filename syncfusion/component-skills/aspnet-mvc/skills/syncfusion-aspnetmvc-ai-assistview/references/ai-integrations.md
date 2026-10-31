# AI Integrations & Speech — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Architecture Pattern](#architecture-pattern)
- [Streaming Response Pattern](#streaming-response-pattern)
- [Azure OpenAI Integration](#azure-openai-integration)
- [Gemini AI Integration](#gemini-ai-integration)
- [Ollama (Local LLM) Integration](#ollama-local-llm-integration)
- [LiteLLM Proxy Integration](#litellm-proxy-integration)
- [MCP Server Integration](#mcp-server-integration)
- [Speech-to-Text](#speech-to-text)
- [Text-to-Speech](#text-to-speech)

---

## Architecture Pattern

All AI integrations follow the same pattern:

1. User submits a prompt → `PromptRequest` event fires in the view
2. JavaScript `fetch()` sends the prompt to an ASP.NET MVC controller action
3. The controller calls the AI provider API and returns the response as `Json(responseText)`
4. JavaScript receives the text and calls `assistObj.addPromptResponse(text)` (optionally streaming)

**Shared controller base:**

```csharp
[HttpPost]
public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
{
    if (string.IsNullOrEmpty(request?.Prompt))
        return BadRequest("Prompt cannot be empty.");

    // Call AI provider here...
    string responseText = "AI response";
    return Json(responseText);
}

public class PromptRequest
{
    public string Prompt { get; set; }
}
```

---

## Streaming Response Pattern

Use this JavaScript pattern across all integrations for a smooth streaming effect. Requires `marked.js` for Markdown rendering.

```html
<!-- Add to _Layout.cshtml or page head -->
<script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>
```

```javascript
var stopStreaming = false;

async function streamResponse(responseText) {
    let current = '';
    const rate = 10; // chars per update
    let i = 0;
    while (i < responseText.length && !stopStreaming) {
        current += responseText[i++];
        if (i % rate === 0 || i === responseText.length) {
            const isFinal = (i === responseText.length);
            assistObj.addPromptResponse(marked.parse(current), isFinal);
            assistObj.scrollToBottom();
        }
        await new Promise(r => setTimeout(r, 15));
    }
}

// Wire stop-responding button
function stopRespondingClick() {
    stopStreaming = true;
}

// Wire promptRequest to fetch + stream
function onPromptRequest(args) {
    fetch('/Home/GetAIResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: args.prompt })
    })
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(text => { stopStreaming = false; streamResponse(text.trim() || 'No response received.'); })
    .catch(() => { assistObj.addPromptResponse('⚠️ Error connecting to AI service.'); stopStreaming = true; });
}
```

Add `StopRespondingClick("stopRespondingClick")` to the control to wire the stop button.

---

## Azure OpenAI Integration

**NuGet packages required:**
```bash
NuGet\Install-Package OpenAI
NuGet\Install-Package Azure.AI.OpenAI
NuGet\Install-Package Azure.Core
NuGet\Install-Package Markdig
```

**Controller:**

```csharp
using OpenAI.Chat;
using Azure;
using Azure.AI.OpenAI;

[HttpPost]
public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
{
    if (string.IsNullOrEmpty(request?.Prompt))
        return BadRequest("Prompt cannot be empty.");

    string endpoint       = "Your_Azure_OpenAI_Endpoint";
    string apiKey         = "YOUR_AZURE_OPENAI_API_KEY";
    string deploymentName = "YOUR_DEPLOYMENT_NAME"; // e.g., gpt-4o-mini

    var credential  = new AzureKeyCredential(apiKey);
    var client      = new AzureOpenAIClient(new Uri(endpoint), credential);
    var chatClient  = client.GetChatClient(deploymentName);

    var completion = await chatClient.CompleteChatAsync(
        new[] { new UserChatMessage(request.Prompt) },
        new ChatCompletionOptions()
    );

    string responseText = completion.Value.Content[0].Text;
    if (string.IsNullOrEmpty(responseText))
        return BadRequest("No response from Azure OpenAI.");

    return Json(responseText);
}
```

**View (minimal):**

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .BannerTemplate("#bannerContent")
    .PromptSuggestions(ViewBag.PromptSuggestionData)
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .StopRespondingClick("stopRespondingClick")
    .ToolbarSettings(new AIAssistViewToolbarSettings()
    {
        Items = ViewBag.Items,
        ItemClicked = "toolbarItemClicked"
    })
    .Render()
```

---

## Gemini AI Integration

**NuGet packages required:**
```bash
NuGet\Install-Package Mscc.GenerativeAI
NuGet\Install-Package Markdig
```

**Controller:**

```csharp
using Mscc.GenerativeAI;

[HttpPost]
public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
{
    if (string.IsNullOrEmpty(request?.Prompt))
        return BadRequest("Prompt cannot be empty.");

    string apiKey   = "Place_your_Gemini_API_key_here";
    var googleAI    = new GoogleAI(apiKey: apiKey);
    var model       = googleAI.GenerativeModel(model: Model.Gemini25Flash);

    var responseText = await model.GenerateContent(request.Prompt);

    if (string.IsNullOrEmpty(responseText?.Text))
        return BadRequest("No response from Gemini.");

    return Json(responseText.Text);
}
```

**Generate Gemini API Key:**
1. Sign into [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **Get API Key** → **Create API Key**
3. Select a Google Cloud project
4. Copy the key — shown once only

> **Security:** Never commit the API key to version control. Use environment variables or a secrets manager.

---

## Ollama (Local LLM) Integration

Run LLMs locally without API keys using [Ollama](https://ollama.com).

**NuGet packages required:**
```bash
NuGet\Install-Package Microsoft.Extensions.AI
NuGet\Install-Package Microsoft.Extensions.AI.Ollama
```

**Register in Program.cs:**

```csharp
using Microsoft.Extensions.AI;

builder.Services.AddChatClient(
    new OllamaChatClient(new Uri("http://localhost:11434/"), "deepseek-r1")
).UseDistributedCache().UseLogging();
```

**Controller:**

```csharp
using Microsoft.Extensions.AI;

public class HomeController : Controller
{
    private readonly IChatClient _chatClient;

    public HomeController(IChatClient chatClient)
    {
        _chatClient = chatClient;
    }

    [HttpPost]
    public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
    {
        if (string.IsNullOrEmpty(request?.Prompt))
            return BadRequest("Prompt cannot be empty.");

        var chatCompletion = await _chatClient.CompleteAsync(request.Prompt);
        var responseText   = chatCompletion.Message.Contents.FirstOrDefault()?.ToString();

        if (string.IsNullOrEmpty(responseText))
            return BadRequest("No response from Ollama.");

        return Json(responseText);
    }
}
```

> **Prerequisites:** Install [Ollama](https://ollama.com) and run `ollama pull deepseek-r1` (or your chosen model) before starting the application.

---

## LiteLLM Proxy Integration

LiteLLM provides a unified OpenAI-compatible API for multiple LLM providers. Useful for switching providers without changing application code.

**Install LiteLLM (Python):**
```bash
pip install "litellm[proxy]"
litellm --config "./config.yaml" --port 4000 --host 0.0.0.0
```

**config.yaml:**
```yaml
model_list:
  - model_name: openai/gpt-4o-mini
    litellm_params:
      model: gpt-4o-mini
      api_key: YOUR_OPENAI_API_KEY
```

**Controller:**

```csharp
[HttpPost]
public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
{
    if (string.IsNullOrEmpty(request?.Prompt))
        return BadRequest("Prompt cannot be empty.");

    var url = "http://localhost:4000/v1/chat/completions";
    var requestBody = new
    {
        model = "openai/gpt-4o-mini", // Must match model_name in config.yaml
        messages = new[] { new { role = "user", content = request.Prompt } },
        temperature = 0.7,
        max_tokens = 300,
        stream = false
    };

    using var httpClient = new HttpClient();
    var json    = System.Text.Json.JsonSerializer.Serialize(requestBody);
    var content = new StringContent(json, Encoding.UTF8, "application/json");
    var response = await httpClient.PostAsync(url, content);

    if (!response.IsSuccessStatusCode)
        return BadRequest($"LiteLLM error: {response.StatusCode}");

    var responseContent = await response.Content.ReadAsStringAsync();
    using var document  = System.Text.Json.JsonDocument.Parse(responseContent);
    var responseText    = document.RootElement
        .GetProperty("choices")[0]
        .GetProperty("message")
        .GetProperty("content")
        .GetString()?.Trim() ?? "No response received.";

    return Json(responseText);
}
```

**Troubleshooting:**
- `401 Unauthorized` → Verify API key and model name in config.yaml
- `Model not found` → Ensure model alias matches `model_name` exactly
- `CORS issues` → Add `cors_allow_origins: ["*"]` in config.yaml router_settings

---

## MCP Server Integration

Integrate with a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for file-aware AI analysis. Supports `@filename` mentions in prompts to inject file contents into the AI context.

**Start MCP server (Node.js):**
```bash
npm install express cors @modelcontextprotocol/sdk
node mcp-server.mjs
```

**JavaScript — send to MCP server:**

```javascript
var sessionId = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());

function onPromptRequest(args) {
    fetch('http://localhost:3000/assist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionId: sessionId,
            prompt: args.prompt,
            model: 'gpt-4o-mini',
            temperature: 0.2,
            max_tokens: 512
        })
    })
    .then(r => r.json())
    .then(data => {
        stopStreaming = false;
        streamResponse((data.content || '').trim() || 'No response received.');
    })
    .catch(err => {
        assistObj.addPromptResponse('⚠️ Failed to connect to MCP server at http://localhost:3000.', true);
    });
}
```

> **@mention files:** Type `@filename.ext` in the prompt box to attach file contents to the AI context. The MCP server reads the file from its configured `FS_BASE_DIR` and injects it.

---

## Speech-to-Text

Enable voice input using the browser's Web Speech API via `SpeechToTextSettings`.

**Basic enable:**

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .SpeechToTextSettings(new AIAssistViewSpeechToTextSettings()
    {
        Enable = true
    })
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

**Full configuration:**

```razor
@{
    var buttonSettings = new {
        content = "Start Recording",
        stopContent = "Stop Recording",
        iconCss = "e-icons e-microphone",
        stopIconCss = "e-icons e-microphone-off"
    };
    var tooltipSettings = new {
        content = "Click to start listening",
        stopContent = "Click to stop listening",
        position = "TopCenter"
    };
}

@Html.EJS().AIAssistView("aiAssistView")
    .SpeechToTextSettings(new AIAssistViewSpeechToTextSettings()
    {
        Enable = true,
        Lang = "en-US",                   // BCP-47 language code
        AllowInterimResults = true,       // Show partial results in real time
        ButtonSettings = buttonSettings,  // Customize mic button text/icons
        TooltipSettings = tooltipSettings // Customize tooltip text/position
    })
    .Render()
```

**Speech-to-Text events:**

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .SpeechToTextSettings(new AIAssistViewSpeechToTextSettings()
    {
        Enable = true,
        OnStart = "onSpeechStart",
        OnStop = "onSpeechStop",
        TranscriptChanged = "onTranscriptChanged",
        OnError = "onSpeechError"
    })
    .Render()
```

```javascript
function onSpeechStart(args) {
    document.getElementById('status').textContent = 'Recording...';
}

function onSpeechStop(args) {
    document.getElementById('status').textContent = 'Ready';
}

function onTranscriptChanged(args) {
    // args.text — current transcript (interim or final)
    // args.isFinal — true when recognition finalizes the phrase
    document.getElementById('transcript').textContent = args.text || '';
}

function onSpeechError(args) {
    console.error('Speech error:', args.error);
}
```

**SpeechToTextSettings properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `Enable` | bool | `false` | Show microphone button |
| `Lang` | string | Browser default | BCP-47 language code (e.g., `"en-US"`, `"fr-FR"`) |
| `AllowInterimResults` | bool | — | Show partial transcripts while speaking |
| `ButtonSettings` | object | — | Customize mic button content, stopContent, iconCss, stopIconCss |
| `TooltipSettings` | object | — | Customize tooltip content, stopContent, position |
| `OnStart` | string | — | JS function name fired when recording starts |
| `OnStop` | string | — | JS function name fired when recording stops |
| `TranscriptChanged` | string | — | JS function name fired on each transcript update |
| `OnError` | string | — | JS function name fired on recognition error |

> **Browser compatibility:** Speech Recognition API has limited support. See [Syncfusion browser support docs](https://ej2.syncfusion.com/aspnetmvc/documentation/speech-to-text/speech-recognition#browser-support).

---

## Text-to-Speech

Enable text-to-speech synthesis to read AI responses aloud. Configure speech behavior using `TextToSpeechSettings` to control voice, pitch, rate, volume, and language.

### TextToSpeechSettings Configuration

**View — enable and configure text-to-speech:**

```razor
@using Syncfusion.EJ2.InteractiveChat

@Html.EJS().AIAssistView("aiAssistView").BannerTemplate("#bannerContent").StopRespondingClick("stopRespondingClick").PromptRequest("onPromptRequest").Created("onCreated").ToolbarSettings(new AIAssistViewToolbarSettings()
{
    Items = ViewBag.Items,
    ItemClicked = "toolbarItemClicked"
}).ResponseToolbarSettings(new AIAssistViewResponseToolbarSettings()
{
    Items = ViewBag.ResponseItems
}).TextToSpeechSettings(new AIAssistViewTextToSpeechSettings()
{
    Language = "en-US",
    SpeechPitch = 1,
    SpeechRate = 1,
    Volume = 1
}).Render()
```

**TextToSpeechSettings properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `Language` | string | `"en-US"` | BCP-47 language code for speech synthesis (e.g., `"en-US"`, `"es-ES"`, `"fr-FR"`, `"de-DE"`) |
| `SpeechPitch` | double | `1` | Voice pitch level; higher values increase pitch, lower values decrease pitch |
| `SpeechRate` | double | `1` | Speech playback speed; higher values speak faster, lower values speak slower |
| `Volume` | double | `1` | Volume level for speech output; ranges from 0 (silent) to 1 (maximum volume) |

**Example — customize speech parameters:**

```csharp
public IActionResult Index()
{
    Items.Add(new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right" });
    ResponseItems = new List<ToolbarItemModel>
    {
        new ToolbarItemModel { iconCss = "e-icons e-assist-copy", tooltip = "Copy" },
        new ToolbarItemModel { iconCss = "e-icons e-assist-audio", tooltip = "Read Aloud" },
        new ToolbarItemModel { iconCss = "e-icons e-assist-like", tooltip = "Like" },
        new ToolbarItemModel { iconCss = "e-icons e-assist-dislike", tooltip = "Need Improvement" }
    };
    ViewBag.Items = Items;
    ViewBag.ResponseItems = ResponseItems;
    return View();
}

public class ToolbarItemModel
{
    public string iconCss { get; set; }
    public string align { get; set; }
    public string tooltip { get; set; }
}
```

---

### Read Aloud Toolbar Button

Read AI responses aloud using the browser's `SpeechSynthesisUtterance` API. Add a custom "Read Aloud" button to the response toolbar.

**Controller with Azure OpenAI integration:**

```csharp
using OpenAI;
using OpenAI.Chat;
using Azure;
using Azure.AI.OpenAI;

namespace AssistViewDemo.Controllers
{
    public class HomeController : Controller
    {
        public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
        public List<ToolbarItemModel> ResponseItems { get; set; } = new List<ToolbarItemModel>();

        public IActionResult Index()
        {
            Items.Add(new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right" });
            ResponseItems = new List<ToolbarItemModel>
            {
                new ToolbarItemModel { iconCss = "e-icons e-assist-copy", tooltip = "Copy" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-audio", tooltip = "Read Aloud" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-like", tooltip = "Like" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-dislike", tooltip = "Need Improvement" }
            };
            ViewBag.Items = Items;
            ViewBag.ResponseItems = ResponseItems;
            return View();
        }

        public class ToolbarItemModel
        {
            public string iconCss { get; set; }
            public string align { get; set; }
            public string tooltip { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request?.Prompt))
                    return BadRequest("Prompt cannot be empty.");

                // Azure OpenAI configuration
                string endpoint = "Your_Azure_OpenAI_Endpoint";
                string apiKey = "YOUR_AZURE_OPENAI_API_KEY";
                string deploymentName = "YOUR_DEPLOYMENT_NAME";

                var credential = new AzureKeyCredential(apiKey);
                var client = new AzureOpenAIClient(new Uri(endpoint), credential);
                var chatClient = client.GetChatClient(deploymentName);

                var chatCompletionOptions = new ChatCompletionOptions();
                var completion = await chatClient.CompleteChatAsync(
                    new[] { new UserChatMessage(request.Prompt) },
                    chatCompletionOptions
                );

                string responseText = completion.Value.Content[0].Text;
                if (string.IsNullOrEmpty(responseText))
                    return BadRequest("No response from Azure OpenAI.");

                return Json(responseText);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error generating response: {ex.Message}");
            }
        }
    }
}

public class PromptRequest
{
    public string Prompt { get; set; }
}
```

**View with Response Toolbar and TextToSpeechSettings:**

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="integration-texttospeech-section">
    @Html.EJS().AIAssistView("aiAssistView").BannerTemplate("#bannerContent").StopRespondingClick("stopRespondingClick").PromptRequest("onPromptRequest").Created("onCreated").ToolbarSettings(new AIAssistViewToolbarSettings()
    {
        Items = ViewBag.Items,
        ItemClicked = "toolbarItemClicked"
    }).ResponseToolbarSettings(new AIAssistViewResponseToolbarSettings()
    {
        Items = ViewBag.ResponseItems
    }).TextToSpeechSettings(new AIAssistViewTextToSpeechSettings()
    {
        Language = "en-US",
        SpeechPitch = 1,
        SpeechRate = 1,
        Volume = 1
    }).Render()
</div>

@Html.AntiForgeryToken()

<script id="bannerContent" type="text/x-jsrender">
    <div class="banner-content">
        <div class="e-icons e-audio"></div>
        <i>Ready to assist voice enabled !</i>
    </div>
</script>

<script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>

<script>
    var assistObj = null;
    var stopStreaming = false;

    function onCreated() {
        assistObj = ej.base.getComponent(document.getElementById("aiAssistView"), "aiassistview");
    }

    function toolbarItemClicked(args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistObj.prompts = [];
            stopStreaming = true;
        }
    }

    async function streamResponse(response) {
        let lastResponse = '';
        const responseUpdateRate = 10;
        let i = 0;
        const responseLength = response.length;
        while (i < responseLength && !stopStreaming) {
            lastResponse += response[i];
            i++;
            if (i % responseUpdateRate === 0 || i === responseLength) {
                const htmlResponse = marked.parse(lastResponse);
                assistObj.addPromptResponse(htmlResponse, i === responseLength);
                assistObj.scrollToBottom();
            }
            await new Promise(resolve => setTimeout(resolve, 15));
        }
    }

    function onPromptRequest(args) {
        var tokenElement = document.querySelector('input[name="__RequestVerificationToken"]');
        var token = tokenElement ? tokenElement.value : '';

        if (!token) {
            assistObj.addPromptResponse('⚠️ Antiforgery token not found.');
            return;
        }

        fetch('/Home/GetAIResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': token
            },
            body: JSON.stringify({ prompt: args.prompt || 'Hi' })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseText => {
            const text = responseText.trim() || 'No response received.';
            stopStreaming = false;
            streamResponse(text);
        })
        .catch(error => {
            console.error('Error fetching AI response:', error);
            assistObj.addPromptResponse('⚠️ Something went wrong while connecting to the AI service. Please try again later.');
            stopStreaming = true;
        });
    }

    function stopRespondingClick() {
        stopStreaming = true;
    }
</script>

<style>
    .integration-texttospeech-section {
        height: 450px;
        width: 650px;
        margin: 0 auto;
    }

    .integration-texttospeech-section .e-view-container {
        margin: auto;
    }

    .integration-texttospeech-section .e-banner-view {
        margin-left: 0;
    }

    .integration-texttospeech-section .banner-content .e-audio:before {
        font-size: 25px;
    }

    .integration-texttospeech-section .banner-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
</style>
```
