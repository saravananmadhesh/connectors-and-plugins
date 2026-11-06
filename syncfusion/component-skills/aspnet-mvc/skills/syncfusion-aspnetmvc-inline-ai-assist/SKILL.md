---
name: syncfusion-aspnetmvc-inline-ai-assist
description: Implement Syncfusion ASP.NET MVC Inline AI Assist control. Use when building AI-powered inline text editing, prompt-response UIs, command popups, toolbar customization, response actions, voice input via speech-to-text, and localization in ASP.NET MVC Razor views. Triggers when user needs to integrate InlineAIAssist, configure CommandSettings, ResponseSettings, InlineToolbarSettings, EditorTemplate, ResponseTemplate, SpeechToTextSettings, or call methods like addResponse, executePrompt, showPopup, hidePopup in ASP.NET MVC applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Inline AI Assist

The Inline AI Assist control provides AI-powered text processing within ASP.NET MVC applications. It renders as a floating popup anchored to a trigger element, supporting prompt input, response display, command shortcuts, and toolbar customization.

## Quick Start Example

```razor
@using Syncfusion.EJ2.InteractiveChat

<div style="height: 350px; width: 650px;">
    <button id="aiBtn" class="e-btn e-primary" onclick="onBtnClick()">AI Assist</button>

    @Html.EJS().InlineAIAssist("myAssist")
        .RelateTo("#aiBtn")
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
            inlineAssist.addResponse('Your AI response here.');
        }, 1000);
    }

    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            document.getElementById('content').innerHTML = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }

    function onBtnClick() {
        if (inlineAssist) inlineAssist.showPopup();
    }
</script>
```

```csharp
public ActionResult Index()
{
    return View();
}
```

---

## Documentation and Navigation Guide

### Getting Started & Core Setup
📄 **Read:** [references/getting-started.md](references/getting-started.md)

When user needs to:
- Install NuGet package, register namespace, add CDN stylesheet/script
- Configure `RelateTo` (anchor element) or `Target` (append container)
- Switch between `Popup` and `Inline` response display modes
- Set up the script manager in `_Layout.cshtml`

### Inline Assist Configuration
📄 **Read:** [references/inline-assist-config.md](references/inline-assist-config.md)

When user needs to:
- Set default `Prompt` text or pre-load `Prompts` collection with prior conversations
- Customize `Placeholder`, `PopupWidth`, `PopupHeight`, `ZIndex`
- Apply custom CSS via `CssClass`

### Commands & Response Settings
📄 **Read:** [references/commands-and-response.md](references/commands-and-response.md)

When user needs to:
- Add a command popup (`CommandSettings`) with grouped shortcut actions
- Configure command item properties: label, prompt, iconCss, groupBy, tooltip, disabled
- Control command popup dimensions (`PopupWidth`, `PopupHeight`)
- Handle `ItemSelect` event on command selection
- Customize the response action popup (`ResponseSettings`) with built-in or custom items
- Group response items, disable items, handle response `ItemSelect`

### Toolbar & Templates
📄 **Read:** [references/toolbar-and-templates.md](references/toolbar-and-templates.md)

When user needs to:
- Add custom items to the inline toolbar (`InlineToolbarSettings`)
- Configure toolbar item properties: type, iconCss, text, align, tooltip, cssClass, disabled, visible
- Set toolbar position (`Inline` or `Bottom`)
- Embed a custom widget (dropdown, input) via `Template` (type: Input)
- Replace the footer editor with `EditorTemplate`
- Customize response display with `ResponseTemplate`

### Methods & Events
📄 **Read:** [references/methods-and-events.md](references/methods-and-events.md)

When user needs to:
- Call `addResponse`, `executePrompt` programmatically
- Show/hide the main popup: `showPopup`, `hidePopup`
- Show/hide the command popup: `showCommandPopup`, `hideCommandPopup`
- Handle lifecycle events: `created`, `promptRequest`, `open`, `close`

| Event | Trigger |
|-------|---------|
| `Created` | Component rendering is complete |
| `PromptRequest` | User submits a prompt (or `executePrompt` is called) |
| `Open` | The popup is opened |
| `Close` | The popup is closed |

### Globalization
📄 **Read:** [references/globalization.md](references/globalization.md)

When user needs to:
- Localize UI strings (send button, stop responding, thinking indicator)
- Enable RTL layout with `EnableRtl`

### Speech-to-Text
📄 **Read:** [references/speech-to-text.md](references/speech-to-text.md)

When user needs to:
- Enable voice input via `SpeechToTextSettings.Enable` (microphone button in prompt)
- Configure recognition language with `Lang` (e.g., `en-US`, `es-ES`, `fr-FR`)
- Customize the microphone button via `ButtonSettings` (`Content`, `StopContent`, `IconCss`, `StopIconCss`)
- Show partial transcriptions during speech with `AllowInterimResults`
- Customize hover tooltips via `TooltipSettings` (`content`, `stopContent`)
- Handle recognition lifecycle with `OnStart`, `OnStop`, `TranscriptChanged`, and `OnError` events
- Surface errors and live transcript in a status panel

---

## Key Properties at a Glance

| Property | Type | Purpose |
|---|---|---|
| `RelateTo` | string / HTMLElement | Anchor element for popup positioning |
| `Target` | string / HTMLElement | Container element where popup appends |
| `ResponseMode` | string | `Popup` (default) or `Inline` |
| `Prompt` | string | Default prompt text |
| `Prompts` | array | Pre-loaded prompt-response collection |
| `Placeholder` | string | Textarea placeholder (default: `Ask or generate AI content..`) |
| `PopupWidth` | string | Popup width (default: `400px`) |
| `PopupHeight` | string | Popup height (default: `auto`) |
| `ZIndex` | int | Popup z-index (default: `1000`) |
| `CssClass` | string | Custom CSS class on popup |
| `EnableRtl` | bool | Right-to-left layout |
| `Locale` | string | Culture code for localization |
| `CommandSettings` | object | Command popup configuration |
| `ResponseSettings` | object | Response action popup configuration |
| `InlineToolbarSettings` | object | Inline toolbar items and position |
| `EditorTemplate` | string | Custom footer/editor area template |
| `ResponseTemplate` | string | Custom response item template |
| `SpeechToTextSettings` | object | Voice input configuration: `Enable`, `Lang`, `AllowInterimResults`, `ButtonSettings` (`Content`, `StopContent`, `IconCss`, `StopIconCss`), `TooltipSettings` (`content`, `stopContent`) |

---

## Common Patterns

### Pattern 1 — Connect to a Real AI Service
In `onPromptRequest`, call your AI endpoint and pass the result to `addResponse`:
```javascript
function onPromptRequest(args) {
    fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({ prompt: args.prompt }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(data => inlineAssist.addResponse(data.response));
}
```

### Pattern 2 — Apply Accepted Response to DOM
```javascript
function onItemSelect(args) {
    if (args.command.label === 'Accept') {
        var editable = document.getElementById('editableText');
        editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
        inlineAssist.hidePopup();
    } else if (args.command.label === 'Discard') {
        inlineAssist.hidePopup();
    }
}
```

### Pattern 3 — Get Component Instance
Always capture `this` in the `Created` event; all method calls require this reference:
```javascript
var inlineAssist;
function onCreated() { inlineAssist = this; }
```
