# Configurable Options

## Overview

The `ej.markdownConverter.toHtml` method accepts an optional options object as its second argument. These options let you control how Markdown is parsed and rendered — useful for handling large content, non-standard formatting, or strict error handling requirements in ASP.NET MVC views.

```javascript
ej.markdownConverter.toHtml(markdownContent, options);
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

When `true`, conversion runs asynchronously so it does not block the main UI thread. Use this when processing long documents or when conversion is triggered frequently (e.g., on every keystroke in a large editor).

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    var largeMarkdown = '@Html.Raw(ViewBag.largeContent)';

    document.getElementById('markdownEditor').addEventListener('keyup', function () {
        var html = ej.markdownConverter.toHtml(this.value, { async: true });
        document.getElementById('preview').innerHTML = html;
    });
</script>
```

**When to use:**
- Content is long (thousands of lines)
- Conversion is triggered on user input (`keyup`, `change` events)
- You need to keep the MVC page responsive during conversion

---

### `gfm` — GitHub Flavored Markdown

**Default:** `true`

Enables GFM extensions on top of standard Markdown. This includes support for tables, task lists, strikethrough, and fenced code blocks. Disable it only if you need strict CommonMark compliance or if GFM syntax conflicts with your content.

```javascript
// Disable GFM (strict CommonMark only)
var html = ej.markdownConverter.toHtml(markdownContent, { gfm: false });

// Enable GFM explicitly (also the default)
var html = ej.markdownConverter.toHtml(markdownContent, { gfm: true });
```

**When to disable:**
- Your Markdown source uses pipe characters `|` as regular text (not tables)
- You need strict CommonMark behavior without GFM extensions

---

### `lineBreak` — Single Line Breaks as `<br>`

**Default:** `false`

When `false`, single newlines within a paragraph are treated as soft wraps (standard Markdown behavior). When `true`, every single line break becomes a `<br>` element — useful for content authored in editors where users expect line breaks to render visually.

```javascript
var md = 'Line one\nLine two\nLine three';

// Default (false): renders as a single paragraph
ej.markdownConverter.toHtml(md);
// <p>Line one Line two Line three</p>

// With lineBreak: true
ej.markdownConverter.toHtml(md, { lineBreak: true });
// <p>Line one<br>Line two<br>Line three</p>
```

**When to use:**
- Users write content in a textarea where each newline is intentional
- You're converting chat messages, notes, or poetry stored in the MVC model
- Content comes from non-Markdown-aware authors who expect newlines to be visible

---

### `silence` — Suppress Errors

**Default:** `false`

When `false`, invalid or malformed Markdown throws a JavaScript error. When `true`, parse errors are suppressed — the converter skips invalid sections and continues, returning whatever HTML it could produce.

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    // Safe conversion of user-submitted content — never throws
    var userInput = document.getElementById('userMarkdownInput').value;
    var html = ej.markdownConverter.toHtml(userInput, { silence: true });
    document.getElementById('preview').innerHTML = html;
</script>
```

**When to use:**
- Input comes from users or external sources (e.g., form submissions in MVC) and may be malformed
- You want graceful degradation rather than a JavaScript error disrupting the page
- Content is passed through a pipeline where errors would be disruptive

---

## Using All Options Together

**Controller (`HomeController.cs`):**
```csharp
public ActionResult Index()
{
    ViewBag.markdownContent = "# Title\n\nSome **content** here.\n\nLine one\nLine two";
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<div id="preview"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var markdown = @Html.Raw(Json.Encode(ViewBag.markdownContent));

        var html = ej.markdownConverter.toHtml(markdown, {
            async: true,       // Non-blocking for large content
            gfm: true,         // GitHub Flavored Markdown (tables, strikethrough, etc.)
            lineBreak: true,   // Respect single newlines
            silence: true      // Don't throw on invalid Markdown
        });

        document.getElementById('preview').innerHTML = html;
    });
</script>
```

---

## Choosing Options by Use Case

| Scenario | Recommended Options |
|----------|-------------------|
| Simple static conversion in MVC view | defaults (no options needed) |
| Large document, live editor | `{ async: true }` |
| User-generated content from MVC form | `{ silence: true }` |
| Chat messages / notes | `{ lineBreak: true }` |
| Tables and GFM features | `{ gfm: true }` (default) |
| All of the above | `{ async: true, gfm: true, lineBreak: true, silence: true }` |
