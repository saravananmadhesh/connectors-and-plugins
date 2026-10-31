# Custom Views — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Overview](#overview)
- [Setting View Type](#setting-view-type)
- [Setting View Name](#setting-view-name)
- [Setting View Icon](#setting-view-icon)
- [Setting View Template](#setting-view-template)
- [Setting Active View](#setting-active-view)

---

## Overview

Use the `Views` property to define multiple views inside the AI AssistView. Each view renders as a tab in the header. You can mix a built-in `Assist` view (prompt/response UI) with one or more `Custom` views (arbitrary HTML content).

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Views(view =>
    {
        view.Type(AssistViewType.Assist).Add();
        view.Type(AssistViewType.Custom)
            .Name("Response")
            .ViewTemplate("<div class=\"view-container\"><h5>Response view content</h5></div>")
            .Add();
    })
    .Render()
```

---

## Setting View Type

Use the `Type` property to specify whether a view is a built-in assist view or a custom view.

| Value | Description |
|---|---|
| `AssistViewType.Assist` | The standard prompt/response chat interface |
| `AssistViewType.Custom` | A custom view with arbitrary HTML content |

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Views(view =>
        {
            view.Type(AssistViewType.Assist).Add();
            view.Type(AssistViewType.Custom)
                .Name("Response")
                .ViewTemplate("<div class=\"view-container\"><h5>Response view content</h5></div>")
                .Add();
        })
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
</script>
```

> **Default behavior:** When no `Views` are configured, the control renders a single `Assist` view without header tabs.

---

## Setting View Name

Use the `Name` property to set the display name shown in the header tab for that view.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Views(view =>
    {
        view.Type(AssistViewType.Assist).Name("Prompt").Add();
        view.Type(AssistViewType.Custom)
            .Name("Response")
            .ViewTemplate("<div class=\"view-container\"><h5>Response view content</h5></div>")
            .Add();
    })
    .Render()
```

---

## Setting View Icon

Use `IconCss` to assign a Syncfusion icon class to the tab header. The default icon for an `Assist` view is `e-assistview-icon`.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Views(view =>
    {
        view.Type(AssistViewType.Assist).Add();
        view.Type(AssistViewType.Custom)
            .Name("Response")
            .IconCss("e-icons e-comment-show")
            .ViewTemplate("<div class=\"view-container\"><h5>Response view content</h5></div>")
            .Add();
    })
    .Render()
```

---

## Setting View Template

Use `ViewTemplate` to specify the HTML content for `Custom` views, or to override the content of the `Assist` view.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Views(view =>
        {
            view.Type(AssistViewType.Assist)
                .Name("Prompt")
                .ViewTemplate("<div class=\"view-container\"><h5>Prompt view content</h5></div>")
                .Add();
            view.Type(AssistViewType.Custom)
                .Name("Response")
                .IconCss("e-icons e-comment-show")
                .ViewTemplate("<div class=\"view-container\"><h5>Response view content</h5></div>")
                .Add();
        })
        .Render()
</div>

<style>
    .view-container {
        margin: 20px auto;
        width: 80%;
    }
</style>
```

> **Inline HTML string:** Pass the HTML directly as a string in `ViewTemplate(...)`. For complex templates, use a JsRender script tag and reference it by ID (e.g., `ViewTemplate("#myTemplate")`).

---

## Setting Active View

Use the `ActiveView` property to set which view is shown on load. Value is zero-based index. Default: `0`.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .ActiveView(1)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Views(view =>
        {
            view.Type(AssistViewType.Assist).Add();
            view.Type(AssistViewType.Custom)
                .Name("Response")
                .IconCss("e-icons e-comment-show")
                .ViewTemplate("<div class=\"view-container\"><h5>Response view content</h5></div>")
                .Add();
        })
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
</script>

<style>
    .view-container {
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
```

> In the example above, `ActiveView(1)` means the second view ("Response") is shown by default when the page loads.
