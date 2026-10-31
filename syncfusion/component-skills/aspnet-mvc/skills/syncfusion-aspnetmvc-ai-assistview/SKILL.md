---
name: syncfusion-aspnetmvc-ai-assistview
description: Implement the Syncfusion ASP.NET MVC AI AssistView component — a conversational AI chat interface with prompt/response rendering, prompt suggestions, mentions in the prompt editor, custom views, toolbar customization, file attachments, speech-to-text, telemetry tracking, AI backend integrations (Azure OpenAI, Gemini, Ollama, LiteLLM), generative UI with interactive tools, Chain of Thoughts reasoning visualization and text-to-speech audio playback. Use this skill when building AI chat UIs, integrating LLM backends, configuring assistant toolbars, customizing templates, rendering dynamic UI components, or handling voice input/output in ASP.NET MVC applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC AI AssistView

A full-featured conversational AI interface component for ASP.NET MVC. Renders prompt/response conversations, supports prompt suggestions, custom views, toolbar customization, file attachments, speech-to-text, and integrates with major AI backends.

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet installation and namespace setup
- CDN stylesheet and script references
- ScriptManager registration
- Minimal `AIAssistView` render
- Wiring `PromptRequest` and `addPromptResponse`
- Configuring `PromptSuggestions` with matched responses

### Assist View Configuration
📄 **Read:** [references/assist-view-config.md](references/assist-view-config.md)
- Setting prompt text (`Prompt` property)
- Prompt placeholder text (`PromptPlaceholder`)
- Pre-loading prompt/response pairs (`Prompts` collection)
- Rendering markdown responses
- Prompt suggestions and suggestion headers
- Prompter avatar icon (`PromptIconCss`)
- Responder avatar icon (`ResponseIconCss`)
- Show/hide clear button (`ShowClearButton`)
- Scroll-to-bottom indicator (`EnableScrollToBottom`)

### Appearance
📄 **Read:** [references/appearance.md](references/appearance.md)
- Setting control width (`Width` property)
- Setting control height (`Height` property)
- Custom CSS class (`CssClass` property)

### Templates
📄 **Read:** [references/templates.md](references/templates.md)
- Banner template (`BannerTemplate`) — welcome notes, branding
- Prompt item template (`PromptItemTemplate`) — custom prompt bubbles
- Response item template (`ResponseItemTemplate`) — custom response bubbles
- Response animation template (`ResponseAnimationTemplate`) — custom loading indicator while response is being generated
- Prompt suggestion item template (`PromptSuggestionItemTemplate`)
- Footer template (`FooterTemplate`) — fully custom input area

### Toolbar Items
📄 **Read:** [references/toolbar-items.md](references/toolbar-items.md)
- Footer toolbar (send, attachment, positioning, custom items, ItemClick)
- Header toolbar items (iconCss, type, text, visible, disabled, tooltip, cssClass, align, tabIndex, template, ItemClicked)
- **Setting alignment** — change toolbar item alignment via `Align` property (`Left`, `Center`, `Right`)
- Built-in prompt toolbar (edit, copy) and response toolbar (copy, like, dislike)
- Custom prompt toolbar items (`PromptToolbarSettings`)
- Custom response toolbar items (`ResponseToolbarSettings`)
- **Regenerate Responses** — enable regenerate button, request alternative AI responses, navigate through multiple responses (`RegeneratedResponses` property)

### Generative UI
📄 **Read:** [references/generative-ui.md](references/generative-ui.md)
- Register custom tools (`registerToolUI` method)
- Define tool templates and handlers for interactive components
- Add tools to AI responses via `blocks` property with `blockType: 'tool'`
- Examples: weather cards, recipe builders, interactive forms
- Configure AI system prompt for structured generative UI block responses
- Dynamic tool rendering within conversation context

### Chain of Thoughts (Thinking)
📄 **Read:** [references/chain-of-thoughts.md](references/chain-of-thoughts.md)
- Visualize AI reasoning process with thinking blocks
- Define reasoning stages with `blockType: 'thinking'` and `stages` array
- Stage status options: `completed`, `inprogress`, `failed`
- Add collapsible thinking headers and timeline visualization
- Configure thinking block templates (`blockTemplate`, `itemTemplate`)
- Support for inline context items with clickable badges
- Ideal for extended reasoning models (Claude 3.5, GPT-o1, etc.)

### Custom Views
📄 **Read:** [references/custom-views.md](references/custom-views.md)
- Adding views via `Views` collection
- View type (`Assist` vs `Custom`)
- View name, icon (`IconCss`), and `ViewTemplate`
- Setting active view (`ActiveView`)

### File Attachments
📄 **Read:** [references/file-attachments.md](references/file-attachments.md)
- Enabling attachments (`EnableAttachments`)
- Configuring `AttachmentSettings` (SaveUrl, RemoveUrl)
- Restricting file types (`AllowedFileType`)
- File size limit (`MaxFileSize`)
- Maximum attachment count (`MaximumCount`)

### Events
📄 **Read:** [references/events.md](references/events.md)
- `Created` — after control renders
- `PromptRequest` — when user submits a prompt
- `PromptChanged` — when prompt text changes
- Attachment events: `BeforeAttachmentUpload`, `AttachmentUploadSuccess`, `AttachmentUploadFailure`, `AttachmentRemoved`, `AttachmentRemoving`, `AttachmentClick`

### Methods
📄 **Read:** [references/methods.md](references/methods.md)
- `addPromptResponse(string)` — add response to last prompt
- `addPromptResponse(object)` — add new prompt+response pair
- `executePrompt(string)` — programmatically trigger a prompt

### AI Integrations & Speech
📄 **Read:** [references/ai-integrations.md](references/ai-integrations.md)
- Azure OpenAI integration (controller + view wiring)
- Gemini AI integration (`Mscc.GenerativeAI` NuGet)
- Ollama / local LLM integration (`Microsoft.Extensions.AI`)
- LiteLLM proxy integration (OpenAI-compatible API)
- **Speech-to-Text** (`SpeechToTextSettings`: enable, lang, buttonSettings, tooltipSettings, interimResults, events)
- **Text-to-Speech (TTS)** (`TextToSpeechSettings`: language, speechPitch, speechRate, volume, voice; enable via `e-assist-audio` toolbar icon)
- Streaming response pattern (character-by-character with `marked.js`)

### Telemetry
📄 **Read:** [references/telemetry.md](references/telemetry.md)
- Enabling telemetry via `TelemetrySettings(new AIAssistViewTelemetrySettings { Enable = true })`
- Built-in telemetry button in the response toolbar showing the response duration
- Hover tooltip displaying the telemetry report for each response
- Configuring captured metrics with the `Metrics` property (`status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`)
- Customizing reports with the `BeforeReport` callback (modify, add custom attributes, or suppress)
- Passing `TelemetryData` to `addPromptResponse` to merge model and token usage details
- Adding domain-specific custom attributes via `customAttributes` on `TelemetryData`
- Turn tracking, button state, tooltip display, duration formatting, total-token computation, and regenerate flow behavior

### Mentions
📄 **Read:** [references/mentions.md](references/mentions.md)
- Enabling mentions in the prompt editor using the `Mentions` property (array of mention settings)
- Mention trigger character with `MentionChar` (e.g., `@`, `/`) and `ShowMentionChar` toggle for selected mentions
- Data source configuration with `DataSource` (local collection or `DataManager` for remote data)
- Field mappings via `Fields` for display text and unique value
- Filtering suggestions with `Query`, `FilterType` (`Contains`, `StartsWith`, `EndsWith`), and `Highlight` properties
- Popup dimensions using `PopupWidth` and `PopupHeight`
- Customization with `DisplayTemplate`, `ItemTemplate`, and `NoRecordsTemplate`
- Handling selection via the `MentionSelect` event with `args.itemData`

---

## Quick Start Example

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var suggestions = new string[] {
        "How do I prioritize my tasks?",
        "How can I improve my time management skills?"
    };
    var prompts = new[]
    {
        new { prompt = "How do I prioritize my tasks?",
              response = "Prioritize tasks by urgency and impact: tackle high-impact tasks first, delegate when possible, and break large tasks into smaller steps.",
              suggestionData = new List<string>() }
    };
    var promptsJson = Html.Raw(JsonConvert.SerializeObject(prompts));
}

<div style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptSuggestions(suggestions)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);

    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            var found = prompts.find(p => p.prompt === args.prompt);
            var defaultResponse = 'Connect to your AI service for real-time responses.';
            assistObj.addPromptResponse(found ? found.response : defaultResponse);
        }, 2000);
    }
</script>
```

---

## Common Patterns

### Pattern: Streaming Response with Markdown
```javascript
// Include marked.js: <script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>
async function streamResponse(responseText) {
    let current = '';
    let i = 0;
    while (i < responseText.length) {
        current += responseText[i++];
        if (i % 10 === 0 || i === responseText.length) {
            assistObj.addPromptResponse(marked.parse(current), i === responseText.length);
            assistObj.scrollToBottom();
        }
        await new Promise(r => setTimeout(r, 15));
    }
}
```

### Pattern: Server-side AI Proxy (controller)
```csharp
[HttpPost]
public async Task<IActionResult> GetAIResponse([FromBody] PromptRequest request)
{
    if (string.IsNullOrEmpty(request?.Prompt))
        return BadRequest("Prompt cannot be empty.");
    // Call AI provider and return Json(responseText)
}
public class PromptRequest { public string Prompt { get; set; } }
```

### Pattern: Reset conversation on toolbar click
```javascript
function toolbarItemClicked(args) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        assistObj.prompts = [];
        assistObj.promptSuggestions = suggestions;
    }
}
```

---

## Key Properties at a Glance

| Property | Type | Description |
|---|---|---|
| `Prompt` | string | Pre-set prompt text |
| `PromptPlaceholder` | string | Textarea placeholder (default: "Type prompt for assistance...") |
| `Prompts` | collection | Pre-loaded prompt/response data; supports `regeneratedResponses` for alternative responses |
| `PromptSuggestions` | string[] | Suggestion chips shown to user |
| `PromptSuggestionsHeader` | string | Header above suggestion chips |
| `PromptIconCss` | string | CSS class for prompter avatar |
| `ResponseIconCss` | string | CSS class for responder avatar (default: `e-assistview-icon`) |
| `ShowClearButton` | bool | Show clear button in textarea (default: false) |
| `EnableScrollToBottom` | bool | Show scroll-to-bottom icon (default: true) |
| `Width` / `Height` | string | Control dimensions (default: 100%) |
| `CssClass` | string | Custom CSS class for theming |
| `ActiveView` | int | Zero-based index of active view (default: 0) |
| `EnableAttachments` | bool | Enable file attachment button (default: false) |
| `ResponseToolbarSettings.Items` | collection | Response toolbar buttons; can include `e-assist-regenerate` (regenerate) and `e-assist-audio` (text-to-speech) |
| `TextToSpeechSettings` | object | Configure TTS behavior: `Language`, `SpeechPitch`, `SpeechRate`, `Volume`, `Voice` |
| `TelemetrySettings` | object | Configure telemetry tracking: `Enable`, `Metrics`, `BeforeReport`; hover tooltip in response toolbar shows the captured report |
| `Mentions` | collection | Array of mention settings with `MentionChar`, `DataSource`, `Fields`, `Query`, `FilterType`, `Highlight`, `ShowMentionChar`, `PopupWidth`, `PopupHeight`, `DisplayTemplate`, `ItemTemplate`, `NoRecordsTemplate` |
| `BlockTemplate` | string | Custom template for thinking/tool blocks (generative UI and Chain of Thoughts) |
| `ItemTemplate` | string | Custom template for thinking block stages in timeline |

## Key Events

| Event | Trigger |
|---|---|
| `Created` | Control fully rendered |
| `PromptRequest` | User submits a prompt |
| `PromptChanged` | Prompt textarea text changes |
| `BeforeAttachmentUpload` | Before file upload begins |
| `AttachmentUploadSuccess` | File uploaded successfully |
| `AttachmentUploadFailure` | File upload failed |
| `AttachmentRemoved` | Attachment removed |
| `AttachmentRemoving` | Attachment is being removed (pre-removal hook) |

## Key Methods

| Method | Description |
|---|---|
| `assistObj.addPromptResponse('text')` | Add string response to last prompt |
| `assistObj.addPromptResponse({prompt, response})` | Add new prompt+response pair |
| `assistObj.executePrompt('text')` | Programmatically submit a prompt |
| `assistObj.scrollToBottom()` | Scroll conversation to bottom |
