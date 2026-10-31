# Getting Started — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Namespace Registration](#namespace-registration)
- [Stylesheet and Script Setup](#stylesheet-and-script-setup)
- [Script Manager](#script-manager)
- [Basic Render](#basic-render)
- [RelateTo Property](#relateto-property)
- [Target Property](#target-property)
- [Response Display Modes](#response-display-modes)

---

## Prerequisites

- ASP.NET MVC 5 project (Visual Studio)
- System requirements: [https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

---

## Installation

Install via NuGet Package Manager (Tools → NuGet Package Manager → Manage NuGet Packages for Solution):

```
Install-Package Syncfusion.EJ2.MVC5
```

This package depends on `Newtonsoft.Json` (JSON serialization) and `Syncfusion.Licensing` (license validation), both installed automatically.

---

## Namespace Registration

Add the Syncfusion namespace in `Views/Web.config` so Razor HTML helpers resolve correctly:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

---

## Stylesheet and Script Setup

Reference the Syncfusion theme and script bundle inside the `<head>` of `~/Views/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version number in use (e.g., `25.1.35`). Refer to [Themes topic](https://ej2.syncfusion.com/aspnetmvc/documentation/appearance/theme) for CDN, NPM, and CRG alternatives.

---

## Script Manager

Register the Syncfusion script manager at the end of `<body>` in `_Layout.cshtml`. This is required for all EJ2 controls to initialize:

```html
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

---

## Basic Render

Add the control in a Razor view (`~/Views/Home/Index.cshtml`). The minimum required setup is a trigger element and the `RelateTo` property:

```razor
@using Syncfusion.EJ2.InteractiveChat

<div style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>

    @Html.EJS().InlineAIAssist("defaultInlineAssist")
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

    function onCreated() {
        inlineAssist = this;
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            var response = 'For real-time processing, connect to your AI service (OpenAI, Azure Cognitive Services, etc.).';
            inlineAssist.addResponse(response);
        }, 1000);
    }

    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
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

---

## RelateTo Property

`RelateTo` positions the popup relative to a specific DOM element. Accepts a CSS selector string or HTMLElement reference.

```razor
@Html.EJS().InlineAIAssist("myAssist")
    .RelateTo("#summarizeBtn")   // CSS selector
    .Render()
```

The popup opens anchored near the specified element — typically the button that triggers it.

---

## Target Property

`Target` specifies the container element where the Inline AI Assist popup is appended. Accepts a CSS selector string or HTMLElement reference.

```razor
<div id="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" onclick="onSummarizeClick()">
        Content Summarize
    </button>

    @Html.EJS().InlineAIAssist("defaultInlineAssist")
        .Target("#container")
        .RelateTo("#summarizeBtn")
        .Created("onCreated")
        .PromptRequest("onPromptRequest")
        .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
            ItemSelect = "onItemSelect"
        })
        .Render()
</div>
```

Use `Target` when you need the popup to be scoped inside a specific container (e.g., for z-index or overflow control).

---

## Response Display Modes

Use the `ResponseMode` property to control how AI responses are presented:

| Mode | Behavior |
|------|----------|
| `Popup` (default) | Responses appear in a floating popup above the content |
| `Inline` | Responses update content directly in place |

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .ResponseMode("Popup")   // or "Inline"
    .RelateTo("#summarizeBtn")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .Render()
```

Switch mode dynamically at runtime:

```javascript
function onResponseModeChange() {
    var modeSelect = document.getElementById('responseMode');
    if (modeSelect && inlineAssist) {
        inlineAssist.responseMode = modeSelect.value; // "Popup" or "Inline"
        inlineAssist.showPopup();
    }
}
```
