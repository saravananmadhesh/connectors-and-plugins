# Inline Assist Configuration — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [Setting Prompt Text](#setting-prompt-text)
- [Prompt-Response Collection](#prompt-response-collection)
- [Setting Prompt Placeholder](#setting-prompt-placeholder)
- [Setting Popup Width](#setting-popup-width)
- [Setting Popup Height](#setting-popup-height)
- [Setting Z-Index](#setting-z-index)
- [CssClass Customization](#cssclass-customization)
- [Enabling Streaming Responses](#enabling-streaming-responses)
- [Combined Configuration Example](#combined-configuration-example)

---

## Setting Prompt Text

Use the `Prompt` property to pre-fill the prompt textarea with a default question or instruction when the popup opens.

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .Prompt("What are the benefits of Inline AI Assist?")
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .Render()
```

Useful when the popup should open with a context-specific question already typed, reducing user effort.

---

## Response Display Mode

Use the `ResponseMode` property to control how AI responses are displayed after the prompt is submitted. This is defined using the `ResponseMode` C# enum.

**ResponseMode enum values:**

| Value | Description |
|-------|-------------|
| `Popup` (default) | Displays response in a floating popup overlay |
| `Inline` | Displays response inline within the component, below the prompt |

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .ResponseMode("Inline")    // displays response inline instead of in popup
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .Render()
```

Set `ResponseMode` to `"Inline"` when you want the response to appear directly in the component without opening a separate overlay.

---

## Prompt-Response Collection

Use the `Prompts` property to pre-load a history of prompt-response pairs. The component displays these on open, letting users see prior AI interactions.

> The `prompts` collection stores all prompts and responses generated during the session.

**Controller (C#):**
```csharp
public ActionResult Default()
{
    return View();
}
```

**View (Razor):**
```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var promptsData = new[]
    {
        new {
            prompt = "What is AI?",
            response = "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>",
            suggestionData = new List<string>()
        }
    };
    var promptsJson = @Html.Raw(JsonConvert.SerializeObject(promptsData));
}

@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .Prompts("promptsData")
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .Render()

<script>
    var prompts = @Html.Raw(promptsJson);

    function onPromptRequest(args) {
        setTimeout(function () {
            var found = prompts.find(function (p) { return p.prompt === args.prompt; });
            var fallback = 'Connect to your AI service for real-time responses.';
            inlineAssist.addResponse(found ? found.response : fallback);
        }, 1000);
    }
</script>
```

**Reading the last response** (common pattern after Accept):
```javascript
var lastResponse = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
```

---

## Setting Prompt Placeholder

Use `Placeholder` to customize the hint text shown in the empty prompt textarea.

- Default value: `Ask or generate AI content..`

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .Placeholder("Type your prompt here...")
    .RelateTo("#summarizeBtn")
    .Render()
```

---

## Setting Popup Width

Use `PopupWidth` to control the width of the Inline AI Assist popup. Accepts any valid CSS value.

- Default value: `400px`

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .PopupWidth("650px")
    .RelateTo("#summarizeBtn")
    .Render()
```

---

## Setting Popup Height

Use `PopupHeight` to control the height of the popup. Accepts any valid CSS value.

- Default value: `auto`

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .PopupHeight("350px")
    .RelateTo("#summarizeBtn")
    .Render()
```

---

## Setting Z-Index

Use `ZIndex` to control the stacking order of the popup, useful when other fixed/absolute elements overlap it.

- Default value: `1000`

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .ZIndex(4000)
    .RelateTo("#summarizeBtn")
    .Render()
```

Increase `ZIndex` when dialogs, modals, or navigation headers appear on top of the popup.

---

## CssClass Customization

Use `CssClass` to apply one or more custom CSS class names to the popup container for visual customization.

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .CssClass("custom-container")
    .RelateTo("#summarizeBtn")
    .Render()
```

```css
.custom-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## Enabling Streaming Responses

Use `EnableStreaming` to render AI responses token-by-token as they arrive, rather than waiting for the full response before displaying anything. This improves perceived performance for long responses.

- **Default value:** `false`
- **Type:** `bool`

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .EnableStreaming(true)
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .Render()
```

When `EnableStreaming` is `true`, call `addResponse` once per chunk inside your `promptRequest` handler. Pass `isFinalUpdate: true` on the last chunk to signal stream completion and hide the stop-response button.

```javascript
function onPromptRequest(args) {
    fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: args.prompt })
    })
    .then(function (response) {
        var reader = response.body.getReader();
        var decoder = new TextDecoder();

        function readChunk() {
            reader.read().then(function (result) {
                if (result.done) {
                    inlineAssist.addResponse('', true);   // mark stream as complete
                    return;
                }
                var chunk = decoder.decode(result.value, { stream: true });
                inlineAssist.addResponse(chunk, false);   // render intermediate chunk
                readChunk();
            });
        }

        readChunk();
    })
    .catch(function () {
        inlineAssist.addResponse('Error: Could not reach AI service.', true);
    });
}
```

> When `EnableStreaming` is `false` (default), the stop-response button is never shown and a single `addResponse` call renders the full response at once. The `isFinalUpdate` parameter has no visible effect in non-streaming mode but is harmless to pass.

---

## Combined Configuration Example

All the above properties can be combined in a single component declaration:

```razor
@using Syncfusion.EJ2.InteractiveChat

<style>
    .custom-container {
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>

<div style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>

    @Html.EJS().InlineAIAssist("defaultInlineAssist")
        .RelateTo("#summarizeBtn")
        .PopupHeight("350px")
        .PopupWidth("650px")
        .Placeholder("Type your prompt here...")
        .CssClass("custom-container")
        .ZIndex(4000)
        .Created("onCreated")
        .PromptRequest("onPromptRequest")
        .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
            ItemSelect = "onItemSelect"
        })
        .Render()
</div>

<script>
    var inlineAssist;

    function onCreated() { inlineAssist = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            inlineAssist.addResponse('AI response text here.');
        }, 1000);
    }

    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            document.getElementById('editableText').innerHTML =
                '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }

    function onSummarizeClick() {
        if (inlineAssist) inlineAssist.showPopup();
    }
</script>
```
