# Methods — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Getting the Control Reference](#getting-the-control-reference)
- [addPromptResponse — String](#addpromptresponse--string)
- [addPromptResponse — Object](#addpromptresponse--object)
- [executePrompt](#executeprompt)
- [scrollToBottom](#scrolltobottom)

---

## Getting the Control Reference

All public methods are called on the control instance. Store it from the `Created` event:

```javascript
var assistObj;
function onCreated() {
    assistObj = this;
}
```

Alternatively, retrieve it by element ID after render:

```javascript
var assistObj = ej.base.getComponent(document.getElementById('aiAssistView'), 'aiassistview');
```

---

## addPromptResponse — String

Adds a response string to the **most recently submitted prompt**. Use this as the standard way to display AI-generated responses.

**Signature:** `assistObj.addPromptResponse(response: string, isFinal?: boolean)`

| Parameter | Type | Description |
|---|---|---|
| `response` | string | The response content (plain text or HTML string) |
| `isFinal` | bool (optional) | `true` marks the response as complete (stops loading indicator) |

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="addStringResponse" onclick="getPromptResponse()">Add String Response</button>
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }

    function getPromptResponse() {
        assistObj.addPromptResponse('Dynamic response added programmatically.');
    }
</script>
```

**Streaming pattern** — call repeatedly with `isFinal: false` until the last chunk:

```javascript
async function streamResponse(fullText) {
    let current = '';
    for (let i = 0; i < fullText.length; i++) {
        current += fullText[i];
        if (i % 10 === 0 || i === fullText.length - 1) {
            const isFinal = (i === fullText.length - 1);
            assistObj.addPromptResponse(current, isFinal);
            assistObj.scrollToBottom();
        }
        await new Promise(r => setTimeout(r, 15));
    }
}
```

---

## addPromptResponse — Object

Adds a **new prompt + response pair** to the conversation history. Use this when you want to programmatically inject a complete exchange (e.g., pre-loading conversation context).

**Signature:** `assistObj.addPromptResponse({ prompt: string, response: string })`

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="addObjectResponse" onclick="getPromptResponse()">Add Object Response</button>
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }

    function getPromptResponse() {
        assistObj.addPromptResponse({
            prompt: 'What is AI?',
            response: 'AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.'
        });
    }
</script>
```

> **Difference from string form:** The string form appends a response to the last submitted prompt. The object form creates an entirely new prompt+response entry — the user did not type this prompt.

---

## executePrompt

Programmatically submits a prompt as if the user typed it and clicked send. Triggers the `PromptRequest` event with `args.prompt` set to the provided string.

**Signature:** `assistObj.executePrompt(promptText: string)`

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="executePrompt" onclick="triggerPrompt()">Execute Prompt</button>
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }

    function triggerPrompt() {
        assistObj.executePrompt('What is the current temperature?');
    }
</script>
```

> **Use cases:** Auto-submitting a default prompt on page load, wiring external buttons to the AI AssistView, or triggering prompts from other UI interactions.

---

## scrollToBottom

Scrolls the conversation area to the bottom, revealing the latest response. Useful when streaming long responses.

**Signature:** `assistObj.scrollToBottom()`

```javascript
async function streamResponse(text) {
    let current = '';
    for (let i = 0; i < text.length; i++) {
        current += text[i];
        if (i % 10 === 0 || i === text.length - 1) {
            assistObj.addPromptResponse(marked.parse(current), i === text.length - 1);
            assistObj.scrollToBottom(); // Keep latest content visible
        }
        await new Promise(r => setTimeout(r, 15));
    }
}
```

> **When to call:** Call after each `addPromptResponse()` during streaming to keep the user's view pinned to the latest content. Not needed if `EnableScrollToBottom` handles it automatically via the floating icon.
