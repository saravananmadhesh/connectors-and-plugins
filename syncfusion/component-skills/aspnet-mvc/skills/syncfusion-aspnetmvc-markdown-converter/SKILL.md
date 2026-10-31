---
name: syncfusion-aspnetmvc-markdown-converter
description: Guides implementation of the Syncfusion ASP.NET MVC Markdown Converter (Syncfusion.EJ2.MVC5). Use this skill when the user needs to convert Markdown text to HTML, use the MarkdownConverter utility, configure MarkdownConverterOptions (async, gfm, lineBreak, silence), or integrate the Markdown Converter with the Syncfusion Rich Text Editor for live preview or side-by-side editing in ASP.NET MVC. Trigger when user mentions markdown to HTML conversion, MarkdownConverter, toHtml, markdown preview, or RTE markdown mode in an ASP.NET MVC project.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "File Viewers & Editors"
---

# Syncfusion ASP.NET MVC Markdown Converter

The Syncfusion ASP.NET MVC Markdown Converter is a lightweight client-side utility (included with the `Syncfusion.EJ2.MVC5` NuGet package) that transforms Markdown text into clean, semantic HTML. It supports all common Markdown elements — headings, lists, tables, links, images, and inline styles — and integrates seamlessly with the Syncfusion Rich Text Editor for live editing and preview workflows in ASP.NET MVC applications.

---

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installing the `Syncfusion.EJ2.MVC5` NuGet package
- Referencing EJ2 scripts and styles in `_Layout.cshtml`
- Running a basic Markdown-to-HTML conversion via JavaScript
- Required CSS and theme setup

### toHtml API
📄 **Read:** [references/tohtml-api.md](references/tohtml-api.md)
- `ej.markdownConverter.toHtml` method signature and parameters
- Supported Markdown elements (headings, lists, tables, links, images, inline styles)
- Return value and usage patterns
- Simple conversion code examples in Razor/JavaScript

### Configurable Options
📄 **Read:** [references/configurable-options.md](references/configurable-options.md)
- `MarkdownConverterOptions` configuration object
- `async` — asynchronous conversion for large content
- `gfm` — GitHub Flavored Markdown support
- `lineBreak` — single line breaks as `<br>` elements
- `silence` — suppress errors on invalid Markdown
- When and why to use each option

### Rich Text Editor Integration
📄 **Read:** [references/richtexteditor-integration.md](references/richtexteditor-integration.md)
- Combining the Syncfusion RTE with the Markdown Converter in ASP.NET MVC
- Setting `EditorMode(EditorMode.Markdown)` on the RTE HTML helper
- Live preview on keyup using `ej.markdownConverter.toHtml`
- Full preview toggle pattern
- Side-by-side Splitter layout in Razor views
- Toolbar configuration for Markdown mode

---

## Quick Start

Add the NuGet package and run a minimal conversion in a Razor view:

**NuGet Package Manager Console:**
```bash
Install-Package Syncfusion.EJ2.MVC5
```

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.value = "# Hello World\nThis is **Markdown** text.";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
@(Html.EJS().RichTextEditor("editor")
    .EditorMode(Syncfusion.EJ2.RichTextEditor.EditorMode.Markdown)
    .Value(ViewBag.value)
    .Render())

<div id="preview"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var markdownContent = '# Hello World\nThis is **Markdown** text.';
        var htmlOutput = ej.markdownConverter.toHtml(markdownContent);
        document.getElementById('preview').innerHTML = htmlOutput;
    });
</script>
```

---

## Common Patterns

### Convert with all options enabled

```javascript
var html = ej.markdownConverter.toHtml(markdownContent, {
    async: true,      // Non-blocking for large content
    gfm: true,        // GitHub Flavored Markdown
    lineBreak: true,  // Treat single newlines as <br>
    silence: true     // Suppress parse errors
});
```

### Live preview on user input

```javascript
document.getElementById('markdownInput').addEventListener('keyup', function () {
    document.getElementById('preview').innerHTML =
        ej.markdownConverter.toHtml(this.value);
});
```

### Integrate with Syncfusion RTE in Markdown mode

**Controller:**
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

@(Html.EJS().RichTextEditor("editor")
    .EditorMode(EditorMode.Markdown)
    .Height("400px")
    .Value(ViewBag.value)
    .Render())
```

---

## Key Options

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `async` | `boolean` | `false` | Async conversion for large payloads |
| `gfm` | `boolean` | `true` | GitHub Flavored Markdown support |
| `lineBreak` | `boolean` | `false` | Single newlines → `<br>` |
| `silence` | `boolean` | `false` | Skip invalid Markdown instead of throwing |

---

## Common Use Cases

- **Static content rendering** — Convert user-authored Markdown from a textarea or API into HTML for display within an MVC view
- **Live editor preview** — Pair with Syncfusion RTE in Markdown mode for real-time HTML preview in a Razor view
- **Side-by-side editing** — Use Syncfusion Splitter to show editor and rendered HTML simultaneously in a Razor layout
- **CMS / documentation tools** — Process Markdown stored in databases or files and render it inside ASP.NET MVC views
