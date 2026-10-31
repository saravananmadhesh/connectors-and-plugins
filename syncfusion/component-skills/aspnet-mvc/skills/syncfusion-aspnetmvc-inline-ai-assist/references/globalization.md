# Globalization — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [Localization Overview](#localization-overview)
- [Default Locale Keys](#default-locale-keys)
- [Adding a Custom Locale](#adding-a-custom-locale)
- [RTL Support](#rtl-support)

---

## Localization Overview

The Inline AI Assist control supports localization by loading culture-specific text strings via the EJ2 `L10n` (Localization) API. The default locale is `en` (English).

---

## Default Locale Keys

The following keys can be overridden for any culture:

| Key | Default Text (en) |
|-----|-------------------|
| `send` | Send |
| `stopResponseText` | Stop Responding |
| `thinkingIndicator` | Thinking |
| `editingIndicator` | Editing |

---

## Adding a Custom Locale

**Step 1** — Load the locale strings using `ej.base.L10n.load` before the component renders. Place the `<script>` block in the view, above the component declaration:

```razor
@using Syncfusion.EJ2.InteractiveChat

<script>
    ej.base.L10n.load({
        'de': {
            'inline-ai-assist': {
                'send': 'Senden',
                'stopResponseText': 'Antwort stoppen'
            }
        }
    });
</script>
```

**Step 2** — Set the `Locale` property on the component to the culture code:

```razor
@Html.EJS().InlineAIAssist("localization")
    .Locale("de")
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
        ItemSelect = "onItemSelect"
    })
    .Render()
```

**Full German locale example:**

```razor
@using Syncfusion.EJ2.InteractiveChat

<style>
    #editableText {
        width: 100%;
        min-height: 120px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid;
    }
</style>

<script>
    ej.base.L10n.load({
        'de': {
            'inline-ai-assist': {
                'send': 'Senden',
                'stopResponseText': 'Antwort stoppen'
            }
        }
    });
</script>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities.</p>
    </div>

    @Html.EJS().InlineAIAssist("localization")
        .Locale("de")
        .RelateTo("#summarizeBtn")
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
            inlineAssist.addResponse('KI-Antwort hier.');
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

```csharp
public ActionResult Default()
{
    return View();
}
```

> Only the keys you define in `L10n.load` are overridden. Any unspecified keys fall back to the `en` default.

---

## RTL Support

Enable right-to-left text direction and layout by setting `EnableRtl` to `true`. This mirrors the entire popup layout — toolbar, prompt area, and response items — for RTL languages such as Arabic, Hebrew, or Persian.

```razor
@Html.EJS().InlineAIAssist("enableRtl")
    .EnableRtl(true)
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
        ItemSelect = "onItemSelect"
    })
    .Render()
```

**Full RTL example:**

```razor
@using Syncfusion.EJ2.InteractiveChat

<style>
    #editableText {
        width: 100%;
        min-height: 120px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid;
        direction: rtl;
    }
</style>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist مكون يوفر قدرات معالجة النصوص الذكية.</p>
    </div>

    @Html.EJS().InlineAIAssist("enableRtl")
        .EnableRtl(true)
        .RelateTo("#summarizeBtn")
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
            inlineAssist.addResponse('استجابة الذكاء الاصطناعي هنا.');
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

```csharp
public ActionResult Default()
{
    return View();
}
```

Combine `EnableRtl` with `Locale` for fully localized RTL experiences:
```razor
@Html.EJS().InlineAIAssist("rtlLocalized")
    .EnableRtl(true)
    .Locale("ar")
    .RelateTo("#summarizeBtn")
    .Render()
```
