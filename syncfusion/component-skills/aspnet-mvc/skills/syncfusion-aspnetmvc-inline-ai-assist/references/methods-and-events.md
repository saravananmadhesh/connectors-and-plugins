# Methods & Events — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [Getting the Component Instance](#getting-the-component-instance)
- [addResponse](#addresponse)
- [executePrompt](#executeprompt)
- [showPopup](#showpopup)
- [hidePopup](#hidepopup)
- [showCommandPopup](#showcommandpopup)
- [hideCommandPopup](#hidecommandpopup)
- [Events Overview](#events-overview)
- [created Event](#created-event)
- [promptRequest Event](#promptrequest-event)
- [open Event](#open-event)
- [close Event](#close-event)

---

## Getting the Component Instance

All method calls require a reference to the component instance. Always capture it in the `Created` event callback:

```javascript
var inlineAssist;

function onCreated() {
    inlineAssist = this;   // 'this' refers to the component instance
}
```

Reference in Razor:
```razor
@Html.EJS().InlineAIAssist("myAssist")
    .Created("onCreated")
    .Render()
```

---

## addResponse

Adds an AI response string to the current prompt in the Inline AI Assist. Call this inside the `promptRequest` handler after receiving the AI result.

**Signature:** `addResponse(response: string, isFinalUpdate?: boolean): void`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `response` | string | Yes | The response content (plain text or Markdown) to render |
| `isFinalUpdate` | bool | No | When `true`, signals that this is the last chunk and hides the stop-response button. Defaults to `false` when omitted. |

```javascript
inlineAssist.addResponse('Your AI-generated response text here.');
```

**Typical usage — simulated delay (replace with real AI call):**
```javascript
function onPromptRequest(args) {
    setTimeout(function () {
        var response = 'For real-time processing, connect to OpenAI or Azure Cognitive Services.';
        inlineAssist.addResponse(response, true);   // isFinalUpdate: true hides the stop button
    }, 1000);
}
```

**Real AI service pattern (non-streaming):**
```javascript
function onPromptRequest(args) {
    fetch('/api/ai/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: args.prompt })
    })
    .then(r => r.json())
    .then(data => inlineAssist.addResponse(data.response, true))
    .catch(() => inlineAssist.addResponse('Error: Could not reach AI service.', true));
}
```

**Streaming pattern — call addResponse for each chunk, mark the last one:**

When `EnableStreaming` is set to `true` on the component, call `addResponse` once per chunk as your stream emits data. Pass `isFinalUpdate: true` only on the final chunk so the stop-response button is hidden at the right moment.

```javascript
function onPromptRequest(args) {
    // EnableStreaming must be true on the component for streaming to work
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
                    inlineAssist.addResponse('', true);   // signal stream end
                    return;
                }
                var chunk = decoder.decode(result.value, { stream: true });
                inlineAssist.addResponse(chunk, false);   // intermediate chunk
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

---

## executePrompt

Executes a prompt programmatically without user input. Accepts a prompt string, triggers the `promptRequest` event, and performs the associated callback.

```javascript
inlineAssist.executePrompt('What is the current temperature?');
```

**Common use cases:**
- Pre-loading a default prompt when the popup opens
- Triggering a prompt from a custom footer button (EditorTemplate)
- Retrying a prompt programmatically

```javascript
function onExecutePromptClick() {
    if (inlineAssist) {
        inlineAssist.showPopup();
        inlineAssist.executePrompt('Summarize the selected text.');
    }
}
```

**In EditorTemplate — trigger from custom button:**
```javascript
function generate() {
    var textArea = document.getElementById('promptTextArea');
    if (textArea) {
        inlineAssist.executePrompt(textArea.value);
        textArea.value = '';
    }
}
```

---

## showPopup

Opens the Inline AI Assist popup. Optionally positions it at a specific screen location using coordinates.

**Signature:** `showPopup(clientX?: number, clientY?: number): void`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clientX` | number | No | Horizontal screen coordinate (px) for popup positioning |
| `clientY` | number | No | Vertical screen coordinate (px) for popup positioning |

When neither parameter is provided, the popup is positioned relative to the element specified in `RelateTo` (or the caret/selection if applicable). Pass both coordinates to override this and position the popup at an exact screen location — useful for context-menu-style triggers.

**Default usage — anchor to RelateTo element:**
```javascript
function onSummarizeClick() {
    if (inlineAssist) inlineAssist.showPopup();
}
```

**Coordinate-based positioning — open at pointer location:**
```javascript
document.getElementById('contentArea').addEventListener('contextmenu', function (e) {
    e.preventDefault();
    if (inlineAssist) {
        inlineAssist.showPopup(e.clientX, e.clientY);
    }
});
```

```javascript
function onToolbarButtonClick(e) {
    if (inlineAssist) {
        inlineAssist.showPopup(e.clientX, e.clientY);
    }
}
```

---

## hidePopup

Closes the Inline AI Assist popup programmatically.

```javascript
inlineAssist.hidePopup();
```

**Check popup state before hiding:**
```javascript
function onHidePopupClick() {
    if (inlineAssist && inlineAssist.element.classList.contains('e-popup-open')) {
        inlineAssist.hidePopup();
    }
}
```

Call `hidePopup` inside `ItemSelect` handlers after the user accepts or discards a response:
```javascript
function onItemSelect(args) {
    if (args.command.label === 'Accept') {
        document.getElementById('editableText').innerHTML =
            '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
        inlineAssist.hidePopup();   // close after applying
    } else if (args.command.label === 'Discard') {
        inlineAssist.hidePopup();   // close without applying
    }
}
```

---

## showCommandPopup

Opens the command action popup. The command popup only opens when the main Inline AI Assist popup is already open.

```javascript
inlineAssist.showPopup();          // must open main popup first
inlineAssist.showCommandPopup();   // then open command popup
```

```javascript
function onShowCommandPopupClick() {
    if (inlineAssist) {
        inlineAssist.showPopup();
        inlineAssist.showCommandPopup();
    }
}
```

---

## hideCommandPopup

Closes the command action popup without closing the main popup.

```javascript
inlineAssist.hideCommandPopup();
```

**Full show/hide command popup example:**
```razor
@Html.EJS().InlineAIAssist("command-popup")
    .RelateTo("#showCommandsBtn")
    .CommandSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistCommandSettings {
        Commands = commandsData
    })
    .Created("onCreated")
    .Close("onClose")
    .PromptRequest("onPromptRequest")
    .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
        ItemSelect = "onItemSelect"
    })
    .Render()
```

```javascript
var inlineAssist;
var showPopup = false;

function onCreated() { inlineAssist = this; }

function onClose() {
    // Reopen main popup if command popup was open
    if (showPopup) {
        inlineAssist.showPopup();
    }
}

function onShowCommandPopupClick() {
    if (inlineAssist) {
        inlineAssist.showPopup();
        inlineAssist.showCommandPopup();
        showPopup = true;
    }
}

function onHideCommandPopupClick() {
    if (inlineAssist) {
        inlineAssist.hideCommandPopup();
        showPopup = false;
    }
}
```

---

## Events Overview

| Event | Trigger |
|-------|---------|
| `Created` | Component rendering is complete |
| `PromptRequest` | User submits a prompt (or `executePrompt` is called) |
| `Open` | The popup is opened |
| `Close` | The popup is closed |

---

## created Event

Fires when the component finishes rendering. Use it to capture the instance reference and perform any initialization.

```razor
@Html.EJS().InlineAIAssist("inline-assist")
    .Created("created")
    .Render()
```

```javascript
function created() {
    // Component is ready
    // Capture instance or perform initialization
}
```

---

## promptRequest Event

Fires when the user submits a prompt or when `executePrompt` is called programmatically. Use it to call your AI service and return the response via `addResponse`.

**Event argument properties (InlinePromptRequestEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `prompt` | string | The submitted prompt text |
| `cancel` | bool | Set to `true` to abort the request and suppress the default processing |
| `name` | string | Name of the event; always set to `"promptRequest"` for this event |

```razor
@Html.EJS().InlineAIAssist("inline-assist")
    .PromptRequest("onPromptRequest")
    .Render()
```

```javascript
function onPromptRequest(args) {
    // args.prompt — the submitted prompt text
    setTimeout(function () {
        inlineAssist.addResponse('Response for: ' + args.prompt, true);
    }, 1000);
}
```

**Cancelling a prompt request conditionally:**

Set `args.cancel = true` before any async work to abort the request. This is useful for validation, rate-limiting, or redirecting certain prompts.

```javascript
function onPromptRequest(args) {
    if (args.prompt.trim().length === 0) {
        args.cancel = true;   // suppress — empty prompt, do nothing
        return;
    }

    if (args.prompt.length > 500) {
        args.cancel = true;   // suppress and show custom feedback instead
        alert('Prompt is too long. Please keep it under 500 characters.');
        return;
    }

    fetch('/api/ai/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: args.prompt })
    })
    .then(r => r.json())
    .then(data => inlineAssist.addResponse(data.response, true))
    .catch(() => inlineAssist.addResponse('Error: Could not reach AI service.', true));
}
```

---

## open Event

Fires when the popup opens. Use it to trigger side effects (logging, analytics, pre-loading data).

```razor
@Html.EJS().InlineAIAssist("inline-assist")
    .Open("onOpen")
    .Render()
```

```javascript
function onOpen() {
    // Popup has opened — perform any required actions
    console.log('Inline AI Assist popup opened');
}
```

---

## close Event

Fires when the popup closes. Use it to reset state or clean up after a session.

```razor
@Html.EJS().InlineAIAssist("inline-assist")
    .Close("onClose")
    .Render()
```

```javascript
function onClose() {
    // Popup has closed — perform cleanup
    console.log('Inline AI Assist popup closed');
}
```
