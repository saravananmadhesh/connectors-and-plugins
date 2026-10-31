# toHtml API

## Overview

`ej.markdownConverter.toHtml` is the core static method of the Syncfusion Markdown Converter. It accepts a Markdown string and returns the corresponding HTML string. Use it anywhere you need to render Markdown as HTML — in a preview pane, a DOM element, or a Razor view's script block.

---

## Method Signature

```javascript
ej.markdownConverter.toHtml(markdownContent, options);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdownContent` | `string` | Yes | The Markdown text to convert |
| `options` | `object` | No | Optional configuration flags (`MarkdownConverterOptions`) |

**Returns:** `string` — the converted HTML string, or an empty string if conversion fails with `silence: true`.

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

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var html = ej.markdownConverter.toHtml('# Title\nSome **bold** text.');
        document.getElementById('preview').innerHTML = html;
        // Renders: <h1>Title</h1><p>Some <strong>bold</strong> text.</p>
    });
</script>
```

### Headings and lists

```javascript
var md = '## Features\n- Lightweight\n- Fast\n- Configurable';
var html = ej.markdownConverter.toHtml(md);
document.getElementById('preview').innerHTML = html;
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
var html = ej.markdownConverter.toHtml(md);
// <p><a href="https://syncfusion.com">Syncfusion</a></p>
// <p><img src="logo.png" alt="Logo"></p>
```

### Tables (GFM)

Tables require GitHub Flavored Markdown — enabled by default (`gfm: true`):

```javascript
var md = '| Name  | Age |\n|-------|-----|\n| Alice | 30  |\n| Bob   | 25  |';
var html = ej.markdownConverter.toHtml(md);
// <table><thead><tr><th>Name</th><th>Age</th></tr></thead>...
```

---

## Rendering Output in a Razor View

Use `ViewBag` or a model to pass Markdown content from the controller, then convert it client-side:

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.markdownText = "## Hello\nThis is a **Razor** view.";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var markdown = @Html.Raw(Json.Encode(ViewBag.markdownText));
        document.getElementById('preview').innerHTML =
            ej.markdownConverter.toHtml(markdown);
    });
</script>
```

> Use `@Html.Raw(Json.Encode(...))` to safely serialize multi-line Markdown strings from Razor into JavaScript without breaking string literals.

---

## Edge Cases

- **Empty string input** — returns an empty string `""`; safe to assign to `innerHTML` directly
- **Invalid Markdown** — throws a JavaScript error by default; use `{ silence: true }` to suppress
- **Very large content** — may block the UI thread; use `{ async: true }` to keep the page responsive
- **Single line breaks** — not converted to `<br>` by default; enable with `{ lineBreak: true }`
