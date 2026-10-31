# toHtml API

## Overview

`MarkdownConverter.toHtml` is the core static method of the Syncfusion Markdown Converter. It accepts a Markdown string and returns the corresponding HTML string. In ASP.NET Core projects, call it from JavaScript (inline scripts in Razor views or linked `.js` files) via the global `ej.markdownconverter` namespace exposed by the EJ2 CDN bundle.

Use it anywhere you need to render Markdown as HTML — in a preview pane, a DOM element, or a string passed back to the server.

---

## Method Signature

```javascript
ej.markdownconverter.MarkdownConverter.toHtml(markdownContent, options)
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdownContent` | `string` | Yes | The Markdown text to convert |
| `options` | `object` | No | Optional `MarkdownConverterOptions` configuration flags |

**Returns:** `string | null` — the converted HTML string, or `null` if conversion fails and `silence` is not set.

---

## Supported Markdown Elements

`toHtml` handles all common Markdown syntax:

| Markdown Syntax | HTML Output |
|----------------|-------------|
| `# Heading 1` | `<h1>Heading 1</h1>` |
| `## Heading 2` | `<h2>Heading 2</h2>` |
| `**bold**` | `<strong>bold</strong>` |
| `*italic*` | `<em>italic</em>` |
| `~~strikethrough~~` | `<del>strikethrough</del>` |
| `[text](url)` | `<a href="url">text</a>` |
| `![alt](src)` | `<img src="src" alt="alt">` |
| `` `code` `` | `<code>code</code>` |
| `> blockquote` | `<blockquote>...</blockquote>` |
| `- item` | `<ul><li>item</li></ul>` |
| `1. item` | `<ol><li>item</li></ol>` |
| `---` | `<hr>` |
| ` ```code block``` ` | `<pre><code>...</code></pre>` |
| `\| table \|` | `<table>...</table>` (requires `gfm: true`) |

---

## Examples

### Minimal conversion

```javascript
var html = ej.markdownconverter.MarkdownConverter.toHtml('# Title\nSome **bold** text.');
// <h1>Title</h1><p>Some <strong>bold</strong> text.</p>
```

### Headings and lists

```javascript
var md = '## Features\n- Lightweight\n- Fast\n- Configurable';
var html = ej.markdownconverter.MarkdownConverter.toHtml(md);
/*
<h2>Features</h2>
<ul>
  <li>Lightweight</li>
  <li>Fast</li>
  <li>Configurable</li>
</ul>
*/
```

### Links and images

```javascript
var md = '[Syncfusion](https://syncfusion.com)\n\n![Logo](logo.png)';
var html = ej.markdownconverter.MarkdownConverter.toHtml(md);
// <p><a href="https://syncfusion.com">Syncfusion</a></p>
// <p><img src="logo.png" alt="Logo"></p>
```

### Tables (GFM)

Tables require GitHub Flavored Markdown — enabled by default (`gfm: true`):

```javascript
var md = '| Name  | Age |\n|-------|-----|\n| Alice | 30  |\n| Bob   | 25  |';
var html = ej.markdownconverter.MarkdownConverter.toHtml(md);
// <table><thead><tr><th>Name</th><th>Age</th></tr></thead>...
```

### Rendering output in a Razor view

```razor
{{! Index.cshtml }}
<div id="preview"></div>

@section Scripts {
    <script>
        var markdownContent = '@Html.Raw(ViewBag.markdownContent)';
        document.getElementById('preview').innerHTML =
            ej.markdownconverter.MarkdownConverter.toHtml(markdownContent);
    </script>
}
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.markdownContent = "## Hello World\nThis is **ASP.NET Core** with Markdown.";
    return View();
}
```

---

## Handling the Return Value

The return type is `string | null`. Guard the result before assigning to `innerHTML`:

```javascript
var result = ej.markdownconverter.MarkdownConverter.toHtml(markdownContent);
if (result) {
    document.getElementById('preview').innerHTML = result;
}
```

---

## Edge Cases

- **Empty string input** — returns an empty string `""`; safe to use directly
- **Invalid Markdown** — throws a JavaScript error by default; use `{ silence: true }` to suppress
- **Very large content** — may block the UI thread; use `{ async: true }` to avoid this
- **Single line breaks** — not converted to `<br>` by default; enable with `{ lineBreak: true }`
