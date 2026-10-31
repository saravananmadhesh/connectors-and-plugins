# AI Assistant Integration

The AI Assistant in the Rich Text Editor provides integrated AI capabilities for content creation, editing, and enhancement. It adds a pop-up AssistView with predefined prompts and custom query support directly inside the editor.

> **Related Documentation:**
> - For complete AI-related properties including `AiAssistantSettings`, see [properties.md](properties.md)
> - For complete AI-related methods including `executeAIPrompt()`, `addAIPromptResponse()`, `showAIAssistantPopup()`, see [methods.md](methods.md)
> - For complete AI-related events including `AiAssistantPromptRequest`, `AiAssistantToolbarClick`, `AiAssistantStopRespondingClick`, see [events.md](events.md)

## Table of Contents
- [Overview](#overview)
- [Enabling AI Assistant Toolbar Items](#enabling-ai-assistant-toolbar-items)
- [Handling Prompt Requests](#handling-prompt-requests)
- [Adding AI Responses](#adding-ai-responses)
- [Streaming Responses](#streaming-responses)
- [Stop Responding](#stop-responding)
- [AI Assistant Customization](#ai-assistant-customization)

---

## Overview

Two toolbar items are available for AI:

| Toolbar Item | Description |
|-------------|-------------|
| `AICommands` | Opens a menu of **predefined prompts** (Improve, Shorten, Elaborate, Simplify, Summarize, Grammar Check) |
| `AIQuery` | Opens a popup for entering a **custom prompt** — also triggered by **Alt+Enter** |

---

## Enabling AI Assistant Toolbar Items

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .ToolbarSettings(e => e.Items((object)new[] {
        "Bold", "Italic", "Underline", "|",
        "AICommands", "AIQuery", "|",
        "Undo", "Redo"
    }))
    .AiAssistantPromptRequest("onAiRequest")
    .Value(ViewBag.value)
    .Render())
```

---

## Handling Prompt Requests

When the user executes a prompt (predefined or custom), the `AiAssistantPromptRequest` event fires. Use this event to call your AI backend or provider:

```javascript
function onAiRequest(args) {
    // args.prompt    — the prompt text
    // args.text      — the selected/context text in the editor
    // args.rteObj    — the RTE instance

    var payload = {
        prompt: args.prompt,
        context: args.text
    };

    fetch('/api/ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        // Add the AI response to the AssistView
        args.rteObj.addAIPromptResponse(data.result, true);
    });
}
```

```csharp
[HttpPost]
public async Task<ActionResult> Assist(AiAssistRequest request)
{
    // Call your AI provider (OpenAI, Azure OpenAI, etc.)
    var result = await _aiService.GetResponse(request.Prompt, request.Context);
    return Json(new { result = result });
}

public class AiAssistRequest
{
    public string Prompt { get; set; }
    public string Context { get; set; }
}
```

---

## Adding AI Responses

Use `addAIPromptResponse` to send a response to the AssistView popup:

```javascript
// Single complete response
rteObj.addAIPromptResponse(markdownOrHtmlText, true);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `response` | `string` | The AI response content (Markdown or HTML) |
| `finalUpdate` | `bool` | `true` = response is complete; `false` = streaming chunk |

> `addAIPromptResponse` automatically converts Markdown responses to HTML using the `@syncfusion/ej2-markdown-converter` package.

---

## Streaming Responses

For a typewriter-style streaming effect, call `addAIPromptResponse` multiple times with `finalUpdate: false`, then once with `finalUpdate: true`:

```javascript
function onAiRequest(args) {
    var rteObj = args.rteObj;

    fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: args.prompt, context: args.text })
    })
    .then(function(response) {
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        var accumulated = '';

        function readChunk() {
            reader.read().then(function(result) {
                if (result.done) {
                    rteObj.addAIPromptResponse(accumulated, true); // final
                    return;
                }
                accumulated += decoder.decode(result.value, { stream: true });
                rteObj.addAIPromptResponse(accumulated, false); // streaming chunk
                readChunk();
            });
        }
        readChunk();
    });
}
```

---

## Stop Responding

When the user clicks the **Stop Responding** button in the AssistView, the `AiAssistantStopRespondingClick` event fires. Use it to cancel the ongoing streaming request:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .AiAssistantStopRespondingClick("onStopResponding")
    .Render())
```

```javascript
var abortController;

function onAiRequest(args) {
    abortController = new AbortController();

    fetch('/api/ai/stream', {
        method: 'POST',
        signal: abortController.signal,
        // ...
    }).catch(function(err) {
        if (err.name === 'AbortError') {
            console.log('AI request cancelled by user.');
        }
    });
}

function onStopResponding(args) {
    if (abortController) {
        abortController.abort();
    }
}
```

---

## AI Assistant Customization

Customize the popup appearance and predefined prompt list via `AiAssistantSettings`:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .AiAssistantSettings(ai => ai
        .Commands((object)ViewBag.aiCommands)
    )
    .ToolbarSettings(e => e.Items((object)new[] { "AICommands", "AIQuery" }))
    .Render()
```

```csharp
ViewBag.aiCommands = new[] {
    new { text = "Improve Writing",   prompt = "Improve the writing quality of this text:" },
    new { text = "Make it Shorter",   prompt = "Shorten this text while keeping the key points:" },
    new { text = "Make it Longer",    prompt = "Elaborate and expand on this text:" },
    new { text = "Fix Grammar",       prompt = "Fix grammar and spelling errors in this text:" },
    new { text = "Summarize",         prompt = "Summarize this text in a few sentences:" }
};
```
