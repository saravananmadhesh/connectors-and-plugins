# Getting Started

## Overview

The Syncfusion ASP.NET Core Markdown Converter is a client-side utility that converts Markdown text into HTML. It is bundled inside the Syncfusion EJ2 CDN script (`ej2.min.js`) and is also available as the `@syncfusion/ej2-markdown-converter` npm package. It integrates naturally with ASP.NET Core MVC or Razor Pages projects that already use the `Syncfusion.EJ2` NuGet package.

---

## Installation

### NuGet Package

Install the Syncfusion EJ2 ASP.NET Core NuGet package via the Package Manager Console:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```

Or via the .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

### Tag Helper Registration

Register the Syncfusion tag helpers in `_ViewImports.cshtml`:

```razor
@addTagHelper *, Syncfusion.EJ2
```

---

## CDN References

Add the Syncfusion theme stylesheet and the bundled EJ2 script to your layout file. The `ej2.min.js` bundle includes the Markdown Converter:

```html
{{! _Layout.cshtml — inside <head> }}
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>

{{! _Layout.cshtml — before </body> }}
<ejs-scripts></ejs-scripts>
```

Swap `fluent.css` for your chosen theme (`bootstrap5.css`, `material3.css`, `tailwind3.css`, etc.).

---

## Basic Conversion

Call `ej.markdownconverter.MarkdownConverter.toHtml` from a JavaScript block in your Razor view or a linked `.js` file:

```javascript
var markdownContent = '# Hello World\nThis is **bold** and *italic* text.';
var htmlOutput = ej.markdownconverter.MarkdownConverter.toHtml(markdownContent);

console.log(htmlOutput);
// <h1>Hello World</h1>
// <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
```

`toHtml` is a static method — no instantiation required.

---

## Rendering the Output

Assign the returned HTML string to a DOM element's `innerHTML`:

```javascript
var markdown = '## Features\n- Fast\n- Lightweight\n- Easy to integrate';
var previewDiv = document.getElementById('preview');
previewDiv.innerHTML = ej.markdownconverter.MarkdownConverter.toHtml(markdown);
```

In your Razor view, add the target element:

```razor
{{! Index.cshtml }}
<div id="preview"></div>

@section Scripts {
    <script>
        var markdown = '## Features\n- Fast\n- Lightweight\n- Easy to integrate';
        document.getElementById('preview').innerHTML =
            ej.markdownconverter.MarkdownConverter.toHtml(markdown);
    </script>
}
```

---

## Using with the Rich Text Editor Tag Helper

Combine the converter with the `<ejs-richtexteditor>` tag helper in Markdown mode for a full editor experience:

```razor
{{! Index.cshtml }}
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>

<div id="preview" style="padding: 16px; border: 1px solid #ccc;"></div>

@section Scripts {
    <script>
        var rte = document.getElementById('markdown-editor').ej2_instances[0];
        rte.created = function () {
            var textarea = rte.contentModule.getEditPanel();
            textarea.addEventListener('keyup', function () {
                document.getElementById('preview').innerHTML =
                    ej.markdownconverter.MarkdownConverter.toHtml(textarea.value);
            });
        };
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

## CSS and Theme Setup

The Markdown Converter itself does not require additional CSS. The EJ2 CDN theme stylesheet covers the Rich Text Editor and all other Syncfusion components. To use a different theme, swap the stylesheet href:

| Theme | Stylesheet |
|-------|-----------|
| Fluent (default) | `fluent.css` |
| Bootstrap 5 | `bootstrap5.css` |
| Material 3 | `material3.css` |
| Tailwind 3 | `tailwind3.css` |

---

## Troubleshooting

**`ej.markdownconverter` is undefined**  
Ensure `ej2.min.js` is loaded from the CDN before your inline script runs. Check the browser console for 404 errors on the CDN URL.

**Output is `null` or `undefined`**  
Check that the input string is not empty. The return type is `string | null`; guard before assigning to `innerHTML`.

**Tag helper not recognised**  
Confirm `@addTagHelper *, Syncfusion.EJ2` is present in `_ViewImports.cshtml` and that the `Syncfusion.EJ2.AspNet.Core` NuGet package is installed.

**Invalid Markdown causes a JavaScript error**  
Pass `{ silence: true }` as the second argument to suppress parse errors and skip invalid sections.
