# Appearance — Syncfusion ASP.NET MVC AI AssistView

## Setting Width

Use the `Width` property to set the width of the AI AssistView. Default: `100%`.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Width("650px")
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
</script>
```

> Accepts any valid CSS width value: `"650px"`, `"80%"`, `"50vw"`, etc.

---

## Setting Height

Use the `Height` property to set the height of the AI AssistView. Default: `100%`.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Height("350px")
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
</script>
```

> **Best practice:** Either set `Height`/`Width` on the control itself, or set dimensions on the containing `<div>` and let the control fill 100%. Avoid setting both on the container and the control simultaneously.

---

## CssClass

Use `CssClass` to apply a custom CSS class to the root `<div>` of the AI AssistView. Enables scoped theming without affecting other components.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .CssClass("custom-container")
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
</script>

<style>
    /* Target the control root using your custom class */
    .aiassist-container .e-aiassistview.custom-container {
        border-color: #e0e0e0;
        background-color: #f4f4f4;
        box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
    }

    /* Customize header toolbar background */
    .aiassist-container .e-aiassistview.custom-container .e-view-header .e-toolbar,
    .aiassist-container .e-aiassistview.custom-container .e-view-header .e-toolbar-items {
        background: #d5d5d5;
    }

    /* Customize prompt input border */
    .aiassist-container .e-aiassistview.custom-container .e-view-content .e-input-group {
        border: 3px solid #e0e0e0 !important;
    }
</style>
```

> **CSS selector pattern:** Always scope custom styles using `.e-aiassistview.your-class` to avoid unintended overrides on other Syncfusion components on the same page.
