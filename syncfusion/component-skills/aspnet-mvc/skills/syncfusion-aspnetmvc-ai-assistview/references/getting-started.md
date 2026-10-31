# Getting Started — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Namespace Registration](#namespace-registration)
- [Stylesheet and Script Setup](#stylesheet-and-script-setup)
- [ScriptManager Registration](#scriptmanager-registration)
- [Minimal Render](#minimal-render)
- [Wiring PromptRequest and Response](#wiring-promptrequest-and-response)
- [Configuring Suggestions with Matched Responses](#configuring-suggestions-with-matched-responses)

---

## Prerequisites

- ASP.NET MVC 5 application (or ASP.NET Core MVC with EJ2 MVC helpers)
- Visual Studio with NuGet access
- [System requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

---

## Installation

Install via NuGet Package Manager Console:

```bash
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

The package includes dependencies: `Newtonsoft.Json` (JSON serialization) and `Syncfusion.Licensing` (license key validation).

---

## Namespace Registration

Add the `Syncfusion.EJ2` namespace in `Views/Web.config`:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

---

## Stylesheet and Script Setup

Add CDN references inside `<head>` in `~/Views/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Syncfusion ASP.NET MVC styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET MVC scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> **Theme options:** Replace `fluent.css` with `bootstrap5.css`, `material.css`, `tailwind.css`, etc. See [Themes documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/appearance/theme).

---

## ScriptManager Registration

Register the script manager at the end of `<body>` in `_Layout.cshtml`:

```html
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

---

## Minimal Render

Add to `~/Views/Home/Index.cshtml`:

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").Render()
</div>
```

Controller action (no model data needed for minimal render):

```csharp
public ActionResult Index()
{
    return View();
}
```

> **Note (v33.1x+):** When a user submits a prompt, the component automatically scrolls and focuses on the latest response. Prior versions kept previous responses visible without auto-scroll.

---

## Wiring PromptRequest and Response

The `PromptRequest` event fires when the user submits a prompt. Use `assistObj.addPromptResponse()` inside a callback (typically after an async AI call) to display the result.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this; // Store control reference
    }

    function onPromptRequest(args) {
        // args.prompt contains the submitted text
        setTimeout(function () {
            var defaultResponse = 'Connect the AI AssistView to your preferred AI service ' +
                '(e.g., OpenAI, Azure OpenAI, Gemini) to get real-time responses.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

Controller:

```csharp
public ActionResult Index()
{
    return View();
}
```

---

## Configuring Suggestions with Matched Responses

Pre-define suggestion chips and match them to responses in the `PromptRequest` handler.

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
        new {
            prompt = "How do I prioritize my tasks?",
            response = "Prioritize tasks by urgency and impact: tackle high-impact tasks first, delegate when possible, and break large tasks into smaller steps.",
            suggestionData = new List<string>()
        },
        new {
            prompt = "How can I improve my time management skills?",
            response = "To improve time management, try setting clear goals, using a planner, prioritizing tasks, breaking tasks into smaller steps, and minimizing distractions.",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = Html.Raw(JsonConvert.SerializeObject(prompts));
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptSuggestions(suggestions)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            var found = prompts.find(p => p.prompt === args.prompt);
            var defaultResponse = 'Connect to your AI service for real-time processing.';
            assistObj.addPromptResponse(found ? found.response : defaultResponse);
        }, 2000);
    }
</script>
```

Controller:

```csharp
public ActionResult Index()
{
    return View();
}
```

> **Result:** Suggestion chips appear above the prompt textarea. Clicking one populates and submits the prompt automatically.
