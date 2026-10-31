# Getting Started

## Overview

The Syncfusion ASP.NET MVC Markdown Converter is a client-side utility for converting Markdown text into HTML within ASP.NET MVC applications. It is included as part of the `Syncfusion.EJ2.MVC5` NuGet package and requires no additional packages for basic conversion.

---

## Installation

Install the NuGet package from the Package Manager Console:

```bash
Install-Package Syncfusion.EJ2.MVC5
```

Or via the .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.MVC5
```

---

## Namespace Configuration

Register the Syncfusion namespace in `Views/Web.config` so the HTML helpers are available in all Razor views:

```xml
<namespaces>
  <add namespace="Syncfusion.EJ2" />
  <add namespace="Syncfusion.EJ2.RichTextEditor" />
</namespaces>
```

---

## Script and Style Setup

Add the required EJ2 theme stylesheet and scripts to `Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <!-- Syncfusion EJ2 Theme -->
    <link href="https://cdn.syncfusion.com/ej2/material3.css" rel="stylesheet" />
</head>
<body>
    @RenderBody()

    <!-- Syncfusion EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    @Html.EJS().ScriptManager()
</body>
```

Swap `material3` for your chosen theme (`bootstrap5`, `fluent2`, `tailwind3`, etc.).

---

## Basic Conversion

Call `ej.markdownConverter.toHtml` with a Markdown string in a `<script>` block inside your Razor view:

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var markdownContent = '# Hello World\nThis is **bold** and *italic* text.';
        var htmlOutput = ej.markdownConverter.toHtml(markdownContent);
        document.getElementById('preview').innerHTML = htmlOutput;
        // Renders:
        // <h1>Hello World</h1>
        // <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
    });
</script>
```

`toHtml` is a static method on the `ej.markdownConverter` namespace — no instantiation required.

---

## Rendering Output from Controller Data

Pass Markdown content from the controller via `ViewBag` and convert it on the client:

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.markdownContent = "## Features\n- Fast\n- Lightweight\n- Easy to integrate";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var markdown = '@Html.Raw(ViewBag.markdownContent)';
        document.getElementById('preview').innerHTML =
            ej.markdownConverter.toHtml(markdown);
    });
</script>
```

---

## Troubleshooting

**`ej.markdownConverter` is undefined**
Ensure the `ej2.min.js` CDN script (or the individual `ej2-markdown-converter` bundle) is loaded before your script block. Verify the `@Html.EJS().ScriptManager()` call is present in `_Layout.cshtml`.

**Output is empty or incorrect**
Check that your Markdown string is properly escaped when passing it from Razor to JavaScript. Use `@Html.Raw(...)` for multi-line content or pass it via a hidden field / JSON endpoint to avoid Razor escaping issues.

**Invalid Markdown causes a JavaScript error**
Pass `{ silence: true }` as the second argument to `ej.markdownConverter.toHtml` to suppress parse errors and skip invalid sections gracefully.
