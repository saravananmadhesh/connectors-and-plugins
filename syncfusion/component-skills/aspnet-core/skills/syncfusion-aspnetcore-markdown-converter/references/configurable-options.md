# Configurable Options

## Overview

The `toHtml` method accepts an optional options object as its second argument. These options control how Markdown is parsed and rendered — useful for handling large content, non-standard formatting, or strict error-handling requirements. In ASP.NET Core projects, pass this plain JavaScript object from an inline script block or a linked `.js` file.

```javascript
ej.markdownconverter.MarkdownConverter.toHtml(markdownContent, options);
```

---

## MarkdownConverterOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `async` | `boolean` | `false` | Enables asynchronous conversion for large content processing |
| `gfm` | `boolean` | `true` | Enables GitHub Flavored Markdown (GFM) support |
| `lineBreak` | `boolean` | `false` | Converts single line breaks into `<br>` elements |
| `silence` | `boolean` | `false` | Suppresses errors — skips invalid Markdown instead of throwing |

---

## Option Details

### `async` — Asynchronous Conversion

**Default:** `false`

When `true`, conversion runs asynchronously so it does not block the browser's main thread. Use this when processing long documents or when conversion is triggered frequently (for example on every keystroke inside the Rich Text Editor).

```javascript
var html = ej.markdownconverter.MarkdownConverter.toHtml(largeMarkdownContent, {
    async: true
});
```

**When to use:**
- Content is long (thousands of lines)
- Conversion is triggered on user input (keyup, change events)
- You need to keep the page responsive

---

### `gfm` — GitHub Flavored Markdown

**Default:** `true`

Enables GFM extensions on top of standard Markdown. This includes support for tables, task lists, strikethrough, and fenced code blocks. Disable it only if you need strict CommonMark compliance or if GFM syntax conflicts with your content.

```javascript
// Disable GFM (strict CommonMark only)
var html = ej.markdownconverter.MarkdownConverter.toHtml(markdownContent, {
    gfm: false
});

// Enable GFM explicitly (also the default)
var html = ej.markdownconverter.MarkdownConverter.toHtml(markdownContent, {
    gfm: true
});
```

**When to disable:**
- Your Markdown source uses pipe characters `|` as regular text (not tables)
- You need strict CommonMark behaviour without GFM extensions

---

### `lineBreak` — Single Line Breaks as `<br>`

**Default:** `false`

When `false`, single newlines within a paragraph are treated as soft wraps (standard Markdown behaviour). When `true`, every single line break becomes a `<br>` element — useful for content authored in editors where users expect line breaks to render visually.

```javascript
var md = 'Line one\nLine two\nLine three';

// Default (false): renders as a single paragraph
ej.markdownconverter.MarkdownConverter.toHtml(md);
// <p>Line one Line two Line three</p>

// With lineBreak: true
ej.markdownconverter.MarkdownConverter.toHtml(md, { lineBreak: true });
// <p>Line one<br>Line two<br>Line three</p>
```

**When to use:**
- Users write content in a textarea where each newline is intentional
- You are converting chat messages, notes, or poetry
- Content comes from non-Markdown-aware authors who expect newlines to be visible

---

### `silence` — Suppress Errors

**Default:** `false`

When `false`, invalid or malformed Markdown throws a JavaScript parse error. When `true`, parse errors are suppressed — the converter skips invalid sections and continues, returning whatever HTML it could produce.

```javascript
// Safe conversion — never throws, even on bad input
var html = ej.markdownconverter.MarkdownConverter.toHtml(untrustedMarkdown, {
    silence: true
});
```

**When to use:**
- Input comes from users or external sources and may be malformed
- You want graceful degradation rather than a JavaScript error
- Content is passed through a pipeline where errors would be disruptive

---

## Using All Options Together

```razor
{{! Index.cshtml }}
<div id="preview" style="padding: 16px;"></div>

@section Scripts {
    <script>
        var markdownContent = '@Html.Raw(ViewBag.markdownContent)';
        var html = ej.markdownconverter.MarkdownConverter.toHtml(markdownContent, {
            async: true,       // Non-blocking for large content
            gfm: true,         // GitHub Flavored Markdown (tables, strikethrough, etc.)
            lineBreak: true,   // Respect single newlines
            silence: true      // Don't throw on invalid Markdown
        });
        document.getElementById('preview').innerHTML = html;
    </script>
}
```

```csharp
// HomeController.cs
public ActionResult Index()
{
    ViewBag.markdownContent = "## Hello\nLine one\nLine two\n\n| A | B |\n|---|---|\n| 1 | 2 |";
    return View();
}
```

---

## Choosing Options by Use Case

| Scenario | Recommended Options |
|----------|-------------------|
| Simple static conversion | defaults (no options needed) |
| Large document, live editor | `{ async: true }` |
| User-generated content | `{ silence: true }` |
| Chat messages / notes | `{ lineBreak: true }` |
| Tables and GFM features | `{ gfm: true }` (default) |
| All of the above | `{ async: true, gfm: true, lineBreak: true, silence: true }` |
