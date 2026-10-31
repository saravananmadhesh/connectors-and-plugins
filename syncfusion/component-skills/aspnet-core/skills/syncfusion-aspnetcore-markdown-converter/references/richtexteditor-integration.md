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

The Syncfusion ASP.NET Core Rich Text Editor tag helper (`<ejs-richtexteditor>`) can be set to `editorMode="Markdown"`, allowing users to write Markdown content in a textarea-style editor. Pairing it with `ej.markdownconverter.MarkdownConverter.toHtml` in a client-side script enables real-time HTML preview — so users see the rendered output as they type.

Two common patterns:
1. **Live preview on keyup** — updates a preview `<div>` every time the user types
2. **Side-by-side with Splitter** — editor and preview rendered in split panes simultaneously

---

## Required Setup

### NuGet Package

```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```

### Tag Helper Registration

```razor
{{! _ViewImports.cshtml }}
@addTagHelper *, Syncfusion.EJ2
```

### CDN References

```html
{{! _Layout.cshtml — inside <head> }}
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>

{{! _Layout.cshtml — before </body> }}
<ejs-scripts></ejs-scripts>
```

The `ej2.min.js` bundle includes both the Rich Text Editor and the Markdown Converter — no separate script tag is required.

---

## Basic RTE Setup in Markdown Mode

Set `editorMode="Markdown"` on the tag helper to switch the RTE from WYSIWYG to Markdown editing:

```razor
{{! Index.cshtml }}
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.value = "# Hello\nType **Markdown** here.";
    ViewBag.tools = new[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|", "Undo", "Redo"
    };
    return View();
}
```

---

## Live Preview on Keyup

Update a preview element every time the user types. Access the underlying `<textarea>` via `contentModule.getEditPanel()`:

```razor
{{! Index.cshtml }}
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>

<div id="preview" style="padding: 16px; border: 1px solid #ccc; margin-top: 16px;"></div>

@section Scripts {
    <script>
        var rte = document.getElementById('markdown-editor').ej2_instances[0];
        var textArea;
        var previewEl = document.getElementById('preview');

        document.addEventListener('DOMContentLoaded', function () {
            textArea = rte.contentModule.getEditPanel();
            textArea.addEventListener('keyup', function () {
                previewEl.innerHTML =
                    ej.markdownconverter.MarkdownConverter.toHtml(textArea.value);
            });
        });
    </script>
}
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.value = "# Hello\nType **Markdown** here.";
    ViewBag.tools = new[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|", "Undo", "Redo"
    };
    return View();
}
```

---

## Full Preview Toggle

Add a custom **Preview** toolbar button that toggles between Markdown source view and the rendered HTML output. When active, the textarea is hidden and the HTML preview is shown; when inactive, the reverse.

```razor
{{! Index.cshtml }}
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" height="520" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>

@section Scripts {
    <script>
        var rte = document.getElementById('markdown-editor').ej2_instances[0];
        var textArea;
        var mdsource;

        document.addEventListener('DOMContentLoaded', function () {
            textArea = rte.contentModule.getEditPanel();
            mdsource = document.getElementById('preview-code');

            textArea.addEventListener('keyup', function () {
                if (mdsource.classList.contains('e-active')) {
                    var id = rte.getID() + 'html-view';
                    var htmlPreview = rte.element.querySelector('#' + id);
                    if (htmlPreview) {
                        htmlPreview.innerHTML =
                            ej.markdownconverter.MarkdownConverter.toHtml(textArea.value);
                    }
                }
            });

            mdsource.addEventListener('click', function () {
                togglePreview();
            });
        });

        function togglePreview() {
            var id = rte.getID() + 'html-preview';
            var htmlPreview = rte.element.querySelector('#' + id);

            if (mdsource.classList.contains('e-active')) {
                mdsource.classList.remove('e-active');
                textArea.style.display = 'block';
                if (htmlPreview) htmlPreview.style.display = 'none';
            } else {
                mdsource.classList.add('e-active');
                if (!htmlPreview) {
                    htmlPreview = ej.base.createElement('div', {
                        className: 'e-content e-pre-source'
                    });
                    htmlPreview.id = id;
                    textArea.parentNode.appendChild(htmlPreview);
                }
                textArea.style.display = 'none';
                htmlPreview.style.display = 'block';
                htmlPreview.innerHTML =
                    ej.markdownconverter.MarkdownConverter.toHtml(textArea.value);
            }
        }
    </script>
}
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.value = "Type **Markdown** here and click Preview to see the HTML output.";

    // Custom preview button is passed as an object using ViewBag JSON
    // For toolbar items with templates, configure them client-side (see script above)
    ViewBag.tools = new object[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|",
        new {
            tooltipText = "Preview",
            template = "<button id=\"preview-code\" class=\"e-tbar-btn e-control e-btn e-icon-btn\" aria-label=\"Preview Code\">" +
                       "<span class=\"e-btn-icon e-md-preview e-icons\"></span></button>"
        },
        "|", "Undo", "Redo"
    };
    return View();
}
```

---

## Side-by-Side Splitter Layout

Use the Syncfusion Splitter tag helper (`<ejs-splitter>`) to display the Markdown editor and HTML preview side by side. The preview updates in real time via the `actionComplete` and `change` client-side events:

```razor
{{! Index.cshtml }}
<ejs-splitter id="splitter-rte-markdown-preview" height="450px" width="100%">
    <e-splitter-panes>
        <e-splitter-pane resizable="true" size="50%" min="40%">
            <e-content-template>
                <ejs-richtexteditor id="markdown-editor"
                                    editorMode="Markdown"
                                    height="100%"
                                    saveInterval="1"
                                    value="@ViewBag.value">
                    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"
                                                      type="Expand"
                                                      enableFloating="false">
                    </e-richtexteditor-toolbarsettings>
                </ejs-richtexteditor>
            </e-content-template>
        </e-splitter-pane>
        <e-splitter-pane min="40%">
            <e-content-template>
                <h6 class="title">Markdown Preview</h6>
                <div class="source-code" style="padding: 20px;"></div>
            </e-content-template>
        </e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

@section Scripts {
    <script>
        var rte = document.getElementById('markdown-editor').ej2_instances[0];
        var splitter = document.getElementById('splitter-rte-markdown-preview').ej2_instances[0];
        var srcArea = document.querySelector('.source-code');

        function updatePreview() {
            var textArea = rte.contentModule.getEditPanel();
            srcArea.innerHTML = ej.markdownconverter.MarkdownConverter.toHtml(
                textArea.value,
                { async: true, gfm: true, lineBreak: true, silence: true }
            );
        }

        document.addEventListener('DOMContentLoaded', function () {
            rte.actionComplete = updatePreview;
            rte.change = updatePreview;
            splitter.resizing = function () { rte.refreshUI(); };

            if (ej.base.Browser.isDevice) {
                splitter.orientation = 'Vertical';
            }

            updatePreview();
        });
    </script>
}
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.value = "# Markdown Preview\n\nType here and see **live** HTML output on the right.\n\n" +
                    "| Column A | Column B |\n|----------|----------|\n| Value 1  | Value 2  |";
    ViewBag.tools = new[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|", "Undo", "Redo"
    };
    return View();
}
```

---

## Toolbar Configuration

For Markdown mode, include only toolbar items relevant to Markdown formatting. WYSIWYG-only items (like `FontName`, `FontSize`, `BackgroundColor`) have no effect in Markdown mode.

**Recommended Markdown toolbar items:**

```csharp
// HomeController.cs
ViewBag.tools = new[] {
    "Bold", "Italic", "StrikeThrough", "|",
    "Formats", "Blockquote", "OrderedList", "UnorderedList",
    "SuperScript", "SubScript", "|",
    "CreateLink", "Image", "CreateTable", "|",
    "Undo", "Redo"
};
```

**Tag helper:**

```razor
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"
                                      type="Expand"
                                      enableFloating="false">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

**Tips:**
- Use `type="Expand"` on smaller screens to prevent toolbar overflow
- Set `enableFloating="false"` when using the Splitter layout to avoid z-index issues
- Set `saveInterval="1"` on the tag helper to ensure the `actionComplete` event fires quickly for live preview updates
