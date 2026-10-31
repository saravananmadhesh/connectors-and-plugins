# Rich Text Editor Integration

## Table of Contents
- [Overview](#overview)
- [Required Setup](#required-setup)
- [Basic RTE Setup in Markdown Mode](#basic-rte-setup-in-markdown-mode)
- [Live Preview on Keyup](#live-preview-on-keyup)
- [Full Preview Toggle](#full-preview-toggle)
- [Side-by-Side Splitter Layout](#side-by-side-splitter-layout)
- [Toolbar Configuration](#toolbar-configuration)

---

## Overview

The Syncfusion ASP.NET MVC Rich Text Editor (RTE) can be configured with `EditorMode(EditorMode.Markdown)` using the `Html.EJS().RichTextEditor()` HTML helper, allowing users to write Markdown content in a textarea-style editor. Pairing it with `ej.markdownConverter.toHtml` in a client-side script enables real-time HTML preview — so users see the rendered output as they type.

Two common patterns:
1. **Live preview on keyup** — updates a preview `<div>` every time the user types
2. **Side-by-side with Splitter** — editor and preview rendered in split panes simultaneously using the Syncfusion Splitter HTML helper

---

## Required Setup

**NuGet Package Manager Console:**
```bash
Install-Package Syncfusion.EJ2.MVC5
```

Add scripts and styles to `Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <link href="https://cdn.syncfusion.com/ej2/material3.css" rel="stylesheet" />
</head>
<body>
    @RenderBody()
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    @Html.EJS().ScriptManager()
</body>
```

Register namespaces in `Views/Web.config`:

```xml
<namespaces>
  <add namespace="Syncfusion.EJ2" />
  <add namespace="Syncfusion.EJ2.RichTextEditor" />
</namespaces>
```

---

## Basic RTE Setup in Markdown Mode

Set `EditorMode(EditorMode.Markdown)` to switch the RTE from WYSIWYG to Markdown editing:

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.value = "# Hello\nType **Markdown** here.";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("markdownEditor")
    .Height("400px")
    .EditorMode(EditorMode.Markdown)
    .Value(ViewBag.value)
    .Render())
```

---

## Live Preview on Keyup

Update a preview element every time the user types. Access the underlying `<textarea>` via the RTE's `created` client-side event:

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.value = "# Hello World\nType **Markdown** here.";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("markdownEditor")
    .Height("400px")
    .EditorMode(EditorMode.Markdown)
    .Value(ViewBag.value)
    .Created("onRteCreated")
    .Render())

<div id="preview" style="padding: 20px; border: 1px solid #ddd; margin-top: 10px;"></div>

<script>
    var textArea;

    function onRteCreated() {
        var rte = ej.base.getComponent(document.getElementById('markdownEditor'), 'richtexteditor');
        textArea = rte.contentModule.getEditPanel();

        textArea.addEventListener('keyup', function () {
            document.getElementById('preview').innerHTML =
                ej.markdownConverter.toHtml(textArea.value);
        });
    }
</script>
```

---

## Full Preview Toggle

Add a custom **Preview** toolbar button that toggles between Markdown source view and rendered HTML. When active, the textarea is hidden and the HTML preview is shown; when inactive, the reverse.

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.value = "# Preview Toggle\nClick the **Preview** button in the toolbar.";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("markdownEditor")
    .Height("520px")
    .EditorMode(EditorMode.Markdown)
    .Value(ViewBag.value)
    .ToolbarSettings(t => t.Items((object)new object[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|",
        new {
            tooltipText = "Preview",
            template = "<button id='preview-code' class='e-tbar-btn e-control e-btn e-icon-btn' aria-label='Preview Code'>" +
                       "<span class='e-btn-icon e-md-preview e-icons'></span></button>"
        },
        "|", "Undo", "Redo"
    }))
    .Created("onRteCreated")
    .Render())

<script>
    var textArea, mdsource;

    function onRteCreated() {
        var rte = ej.base.getComponent(document.getElementById('markdownEditor'), 'richtexteditor');
        textArea = rte.contentModule.getEditPanel();
        mdsource = document.getElementById('preview-code');

        // Update preview content while in preview mode
        textArea.addEventListener('keyup', function () {
            if (mdsource.classList.contains('e-active')) {
                var id = rte.getID() + 'html-view';
                var htmlPreview = rte.element.querySelector('#' + id);
                if (htmlPreview) {
                    htmlPreview.innerHTML = ej.markdownConverter.toHtml(textArea.value);
                }
            }
        });

        // Toggle preview on button click
        mdsource.addEventListener('click', function () {
            togglePreview(rte);
        });
    }

    function togglePreview(rte) {
        var id = rte.getID() + 'html-preview';
        var htmlPreview = rte.element.querySelector('#' + id);

        if (mdsource.classList.contains('e-active')) {
            // Exit preview mode
            mdsource.classList.remove('e-active');
            textArea.style.display = 'block';
            if (htmlPreview) htmlPreview.style.display = 'none';
        } else {
            // Enter preview mode
            mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = ej.base.createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = ej.markdownConverter.toHtml(textArea.value);
        }
    }
</script>
```

---

## Side-by-Side Splitter Layout

Use the Syncfusion Splitter HTML helper to display the Markdown editor and HTML preview side by side. The preview updates in real time via the RTE's `ActionComplete` and `Change` events:

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.value = "# Side-by-Side Preview\n\nEdit **Markdown** on the left and see the preview on the right.\n\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
@using Syncfusion.EJ2.RichTextEditor
@using Syncfusion.EJ2.Layouts

@(Html.EJS().Splitter("splitter-rte-markdown-preview")
    .Height("450px")
    .Width("100%")
    .PaneSettings(pane => {
        pane.Add().Size("50%").Min("40%").Resizable(true).Add();
        pane.Add().Min("40%").Add();
    })
    .Resizing("onSplitterResize")
    .Render())

<script id="pane1-content" type="text/template">
    @(Html.EJS().RichTextEditor("markdownEditor")
        .Height("100%")
        .EditorMode(EditorMode.Markdown)
        .Value(ViewBag.value)
        .SaveInterval(1)
        .ToolbarSettings(t => t.Type(ToolbarType.Expand).EnableFloating(false)
            .Items((object)new object[] {
                "Bold", "Italic", "StrikeThrough", "|",
                "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
                "CreateLink", "Image", "CreateTable", "|",
                "Undo", "Redo"
            }))
        .ActionComplete("updatePreview")
        .Change("updatePreview")
        .Created("onRteCreated")
        .Render())
</script>

<div class="pane2" style="padding: 0;">
    <h6 class="title" style="padding: 10px;">Markdown Preview</h6>
    <div class="source-code" style="padding: 20px;"></div>
</div>

<script>
    var rteInstance;

    function onRteCreated() {
        rteInstance = ej.base.getComponent(document.getElementById('markdownEditor'), 'richtexteditor');
        updatePreview();
    }

    function updatePreview() {
        if (!rteInstance) return;
        var textarea = rteInstance.contentModule.getEditPanel();
        document.querySelector('.source-code').innerHTML = ej.markdownConverter.toHtml(
            textarea.value,
            { async: true, gfm: true, lineBreak: true, silence: true }
        );
    }

    function onSplitterResize() {
        if (rteInstance) rteInstance.refreshUI();
    }
</script>
```

> **Note:** When using the Splitter layout, set `EnableFloating(false)` on the toolbar settings and `SaveInterval(1)` on the RTE to ensure the preview updates promptly after each keystroke.

---

## Toolbar Configuration

For Markdown mode, include only toolbar items relevant to Markdown formatting. WYSIWYG-only items (like `FontName`, `FontSize`, `BackgroundColor`) have no effect in Markdown mode.

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.tools = new object[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList",
        "SuperScript", "SubScript", "|",
        "CreateLink", "Image", "CreateTable", "|",
        "Undo", "Redo"
    };
    ViewBag.value = "# Markdown Editor\nUse the **toolbar** above to format content.";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("markdownEditor")
    .EditorMode(EditorMode.Markdown)
    .ToolbarSettings(t => t.Items((object)ViewBag.tools))
    .Value(ViewBag.value)
    .Render())
```

**Tips:**
- Use `ToolbarType.Expand` on smaller screens to prevent toolbar overflow
- Set `EnableFloating(false)` when using the Splitter layout to avoid z-index issues
- The `SaveInterval(1)` option (in ms) ensures the `ActionComplete` event fires quickly for live preview updates
- Use `"|"` for a vertical separator and `"-"` for a horizontal separator between toolbar groups
