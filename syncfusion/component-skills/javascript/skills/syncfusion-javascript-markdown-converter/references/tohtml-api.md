# toHtml API

## Overview

`MarkdownConverter.toHtml` is the core static method of the Syncfusion Markdown Converter. It accepts a Markdown string and returns the corresponding HTML string. Use it anywhere you need to render Markdown as HTML — in a preview pane, a server response, a DOM element, or a string template.

---

## Method Signature

```typescript
MarkdownConverter.toHtml(
  markdownContent: string,
  options?: MarkdownConverterOptions
): string | null
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdownContent` | `string` | Yes | The Markdown text to convert |
| `options` | `MarkdownConverterOptions` | No | Optional configuration flags |

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

```typescript
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const html = MarkdownConverter.toHtml('# Title\nSome **bold** text.') as string;
// <h1>Title</h1><p>Some <strong>bold</strong> text.</p>
```

### Headings and lists

```typescript
const md = `
## Features
- Lightweight
- Fast
- Configurable
`;
const html = MarkdownConverter.toHtml(md) as string;
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

```typescript
const md = '[Syncfusion](https://syncfusion.com)\n\n![Logo](logo.png)';
const html = MarkdownConverter.toHtml(md) as string;
// <p><a href="https://syncfusion.com">Syncfusion</a></p>
// <p><img src="logo.png" alt="Logo"></p>
```

### Tables (GFM)

Tables require GitHub Flavored Markdown — enabled by default (`gfm: true`):

```typescript
const md = `
| Name  | Age |
|-------|-----|
| Alice | 30  |
| Bob   | 25  |
`;
const html = MarkdownConverter.toHtml(md) as string;
// <table><thead><tr><th>Name</th><th>Age</th></tr></thead>...
```

---

## Handling the Return Value

The return type is `string | null`. Always cast or guard the result before using it:

```typescript
const result = MarkdownConverter.toHtml(markdownContent);
if (result) {
  document.getElementById('preview').innerHTML = result;
}

// Or use a cast when confident input is valid:
element.innerHTML = MarkdownConverter.toHtml(markdownContent) as string;
```

---

## Edge Cases

- **Empty string input** — returns an empty string `""`; safe to use directly
- **Invalid Markdown** — throws an error by default; use `{ silence: true }` to suppress
- **Very large content** — may block the UI thread; use `{ async: true }` to avoid this
- **Single line breaks** — not converted to `<br>` by default; enable with `{ lineBreak: true }`
