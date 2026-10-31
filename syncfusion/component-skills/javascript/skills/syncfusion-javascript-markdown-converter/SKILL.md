---
name: syncfusion-javascript-markdown-converter
description: Guides implementation of the Syncfusion TypeScript Markdown Converter (@syncfusion/ej2-markdown-converter). Use this skill when the user needs to convert Markdown text to HTML, use the toHtml method, configure MarkdownConverterOptions (async, gfm, lineBreak, silence), or integrate the Markdown Converter with the Syncfusion Rich Text Editor for live preview or side-by-side editing. Trigger when user mentions markdown to HTML conversion, MarkdownConverter, toHtml, ej2-markdown-converter, markdown preview, or RTE markdown mode.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "File Viewers & Editors"
---

# Syncfusion TypeScript Markdown Converter

The Syncfusion TypeScript Markdown Converter (`@syncfusion/ej2-markdown-converter`) is a lightweight utility that transforms Markdown text into clean, semantic HTML. It supports all common Markdown elements — headings, lists, tables, links, images, and inline styles — and integrates seamlessly with the Syncfusion Rich Text Editor for live editing and preview workflows.

---

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installing the `@syncfusion/ej2-markdown-converter` package
- Importing `MarkdownConverter` into a TypeScript project
- Running a basic Markdown-to-HTML conversion
- Required CSS and theme setup

### toHtml API
📄 **Read:** [references/tohtml-api.md](references/tohtml-api.md)
- `toHtml` method signature and parameters
- Supported Markdown elements (headings, lists, tables, links, images, inline styles)
- Return value and usage patterns
- Simple conversion code examples

### Configurable Options
📄 **Read:** [references/configurable-options.md](references/configurable-options.md)
- `MarkdownConverterOptions` interface
- `async` — asynchronous conversion for large content
- `gfm` — GitHub Flavored Markdown support
- `lineBreak` — single line breaks as `<br>` elements
- `silence` — suppress errors on invalid Markdown
- When and why to use each option

### Rich Text Editor Integration
📄 **Read:** [references/richtexteditor-integration.md](references/richtexteditor-integration.md)
- Combining `@syncfusion/ej2-richtexteditor` with `@syncfusion/ej2-markdown-converter`
- Setting `editorMode: 'Markdown'` on the RTE
- Live preview on keyup using `toHtml`
- Full preview toggle pattern
- Side-by-side Splitter layout
- Toolbar configuration for Markdown mode

---

## Quick Start

Install the package and run a minimal conversion:

```bash
npm install @syncfusion/ej2-markdown-converter
```

```typescript
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const markdownContent = '# Hello World\nThis is **Markdown** text.';
const htmlOutput = MarkdownConverter.toHtml(markdownContent);
console.log(htmlOutput);
// Output: <h1>Hello World</h1><p>This is <strong>Markdown</strong> text.</p>
```

---

## Common Patterns

### Convert with all options enabled

```typescript
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const html = MarkdownConverter.toHtml(markdownContent, {
  async: true,      // Non-blocking for large content
  gfm: true,        // GitHub Flavored Markdown
  lineBreak: true,  // Treat single newlines as <br>
  silence: true     // Suppress parse errors
});
```

### Live preview on user input

```typescript
textArea.addEventListener('keyup', () => {
  previewElement.innerHTML = MarkdownConverter.toHtml(textArea.value) as string;
});
```

### Integrate with Syncfusion RTE in Markdown mode

```typescript
import { RichTextEditor, MarkdownEditor, Toolbar } from '@syncfusion/ej2-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
RichTextEditor.Inject(MarkdownEditor, Toolbar);

const rte = new RichTextEditor({
  editorMode: 'Markdown',
  height: '400px'
});
rte.appendTo('#editor');
```

---

## Key Props

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `async` | `boolean` | `false` | Async conversion for large payloads |
| `gfm` | `boolean` | `true` | GitHub Flavored Markdown support |
| `lineBreak` | `boolean` | `false` | Single newlines → `<br>` |
| `silence` | `boolean` | `false` | Skip invalid Markdown instead of throwing |

---

## Common Use Cases

- **Static content rendering** — Convert user-authored Markdown from a textarea or API into HTML for display
- **Live editor preview** — Pair with Syncfusion RTE in Markdown mode for real-time HTML preview
- **Side-by-side editing** — Use Syncfusion Splitter to show editor and rendered HTML simultaneously
- **CMS / documentation tools** — Process Markdown stored in databases or files before rendering in the browser
