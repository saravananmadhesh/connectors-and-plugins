# Getting Started

## Prerequisites

- ASP.NET Core application (Razor Pages or MVC)
- `Syncfusion.EJ2.AspNet.Core` NuGet package

## Installation

Install via NuGet Package Manager or CLI:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC):

```razor
@addTagHelper *, Syncfusion.EJ2
```

## Add Stylesheet and Script Resources

In `~/Pages/Shared/_Layout.cshtml` or `~/Views/Shared/_Layout.cshtml`, add inside `<head>`:

```razor
<!-- Syncfusion theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<!-- Syncfusion scripts -->
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

At the end of `<body>`, register the Script Manager:

```razor
<ejs-scripts></ejs-scripts>
```

> Use CDN for quick setup. For production, consider NPM packages or Custom Resource Generator (CRG) for bundling only required modules.

## Basic HTML Editor (Default Mode)

The default mode is HTML — no `editorMode` property needed.

```razor
<!-- Index.cshtml -->
<ejs-richtexteditor id="editor" value="@ViewBag.value"></ejs-richtexteditor>
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.value = "<p>The Rich Text Editor is a WYSIWYG editor.</p>";
    return View();
}
```

## Basic Markdown Editor

Set `editorMode="Markdown"` to switch the component to Markdown editing mode. The output is plain Markdown text instead of HTML.

```razor
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" value="@ViewBag.value">
</ejs-richtexteditor>
```

```csharp
public ActionResult Index()
{
    ViewBag.value = "**Bold**, *italic*, and `inline code` are supported.";
    return View();
}
```

## Configuring the Toolbar

Pass toolbar items as a string array via `ViewBag`:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
public ActionResult Index()
{
    ViewBag.value = "<p>Start editing...</p>";
    ViewBag.tools = new[] {
        "Bold", "Italic", "Underline", "StrikeThrough",
        "FontName", "FontSize", "FontColor", "BackgroundColor",
        "LowerCase", "UpperCase", "|",
        "Formats", "Alignments", "OrderedList", "UnorderedList",
        "Outdent", "Indent", "|",
        "CreateLink", "Image", "CreateTable", "|",
        "ClearFormat", "Print", "SourceCode", "FullScreen", "|",
        "Undo", "Redo"
    };
    return View();
}
```

> Use `|` for a vertical separator and `-` for a horizontal separator between toolbar groups.

## Toolbar Items for Markdown Mode

Markdown mode supports a subset of toolbar items — only those that produce Markdown syntax:

```csharp
ViewBag.tools = new[] {
    "Bold", "Italic", "StrikeThrough", "InlineCode", "SuperScript",
    "SubScript", "|", "Formats", "Blockquote", "|",
    "OrderedList", "UnorderedList",
    "CreateLink", "Image", "CreateTable", "|",
    "Undo", "Redo"
};
```

> Do not include HTML-specific tools like `FontName`, `FontColor`, `SourceCode`, or `Alignments` in Markdown mode — they have no effect.

## Setting Value via Content Template

For longer initial HTML content, use the content template instead of `ViewBag.value`:

```razor
<ejs-richtexteditor id="editor">
    <e-content-template>
        <p>This is the <b>initial content</b> set via template.</p>
        <ul>
            <li>Item one</li>
            <li>Item two</li>
        </ul>
    </e-content-template>
</ejs-richtexteditor>
```

## Gotchas

- The `id` attribute on `<ejs-richtexteditor>` must be unique per page — it's used internally for DOM targeting and mention integration.
- For Markdown mode, a third-party library (e.g. Marked.js) is required to render the Markdown output as HTML preview — the editor itself does not render preview natively.
- Syncfusion license key validation is required in production. Register your key using `Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY")` in `Program.cs`.
