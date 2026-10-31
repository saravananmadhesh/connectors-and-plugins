# AI Assistant

## Table of Contents
- [Overview](#overview)
- [Enabling the AI Assistant](#enabling-the-ai-assistant)
- [AI Commands Menu](#ai-commands-menu)
- [AI Query Input](#ai-query-input)
- [Handling AI Requests and Responses](#handling-ai-requests-and-responses)
- [Streaming Responses](#streaming-responses)
- [Non-Streaming Single Response](#non-streaming-single-response)

---

## Overview

The Rich Text Editor's AI Assistant adds two toolbar items:

| Toolbar Item | What it does |
|-------------|-------------|
| `AICommands` | Opens a dropdown menu of predefined prompts (Improve, Shorten, Elaborate, Simplify, Summarize, Grammar Check) applied to selected text |
| `AIQuery` | Opens a popup for the user to type a custom AI prompt (`Alt+Enter` / `⌥+Enter` keyboard shortcut) |

Both items send selected text and the prompt to an `AiAssistantPromptRequest` event. Your handler connects to any AI backend (OpenAI, Azure OpenAI, custom API, etc.) and returns the response via `addAIPromptResponse`.

---

## Enabling the AI Assistant

Add `AICommands` and `AIQuery` to the toolbar items array:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value"
    aiAssistantPromptRequest="onAIRequest">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "Underline", "|",
    "Formats", "Alignments", "|",
    "AICommands", "AIQuery", "|",
    "Undo", "Redo"
};
```

---

## AI Commands Menu

When the user selects text and clicks `AICommands`, a menu appears with predefined actions:

- **Improve writing** — refines phrasing and flow
- **Make shorter** — condenses the selected text
- **Make longer** — elaborates with more detail
- **Simplify language** — uses simpler words and sentences
- **Summarize** — creates a brief summary
- **Fix grammar** — corrects grammar errors

Each action automatically passes the selected text as context along with the prompt.

---

## AI Query Input

Clicking `AIQuery` (or pressing `Alt+Enter` on Windows / `⌥+Enter` on Mac) opens a text input popup. The user types a custom prompt, which is then sent to the `AiAssistantPromptRequest` event handler.

---

## Handling AI Requests and Responses

The `AiAssistantPromptRequest` event fires whenever a prompt is executed. Event arguments provide:
- `args.prompt` — the prompt text (predefined or user-typed)
- `args.text` — the currently selected text in the editor

Call `addAIPromptResponse(content, isFinal)` on the editor instance to deliver the response:
- `content` — the AI-generated text (can be Markdown; it is automatically converted to HTML)
- `isFinal` — `true` when the response is complete, `false` for streaming chunks

```javascript
async function onAIRequest(args) {
    var rte = document.getElementById('editor').ej2_instances[0];
    var combined = args.prompt + '\n\n' + args.text;

    var response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: combined })
    });

    var data = await response.text();
    rte.addAIPromptResponse(data, true);
}
```

---

## Streaming Responses

For a typewriter-like streaming effect, call `addAIPromptResponse(chunk, false)` for each chunk and `addAIPromptResponse(fullText, true)` when the stream ends:

```javascript
async function onAIRequest(args) {
    var rte = document.getElementById('editor').ej2_instances[0];

    var response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify({ message: args.prompt + args.text })
    });

    if (!response.ok) throw new Error('AI request failed');

    var stream = response.body.pipeThrough(new TextDecoderStream());
    var fullText = '';

    for await (var chunk of stream) {
        fullText += chunk;
        rte.addAIPromptResponse(fullText, false); // stream chunk — not final
    }

    rte.addAIPromptResponse(fullText, true); // mark final
}
```

> The `addAIPromptResponse` method treats the `content` argument as Markdown and converts it to HTML using the `@syncfusion/ej2-markdown-converter` package internally.

### Stop Responding

When the user clicks the **Stop Responding** button in the AI popup, the `AiAssistantStopRespondingClick` event fires. Use this to cancel the stream or abort the fetch:

```javascript
var controller;

async function onAIRequest(args) {
    controller = new AbortController();
    var rte = document.getElementById('editor').ej2_instances[0];

    try {
        var response = await fetch('/api/ai/stream', {
            method: 'POST',
            signal: controller.signal,
            body: JSON.stringify({ message: args.prompt + args.text })
        });
        // ... streaming logic
    } catch (e) {
        if (e.name === 'AbortError') console.log('AI stream cancelled');
    }
}

function onStopResponding() {
    if (controller) controller.abort();
}
```

```razor
<ejs-richtexteditor id="editor"
    aiAssistantPromptRequest="onAIRequest"
    aiAssistantStopRespondingClick="onStopResponding">
</ejs-richtexteditor>
```

---

## Non-Streaming Single Response

For a non-streaming response, show a loading state until the full answer is ready, then insert at once:

```javascript
async function onAIRequest(args) {
    var rte = document.getElementById('editor').ej2_instances[0];

    var response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: args.prompt + args.text })
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    var data = await response.text();
    rte.addAIPromptResponse(data, true); // finalUpdate = true → insert all at once
}
```

A loading skeleton is displayed in the AI popup while `finalUpdate` is still `false`.
