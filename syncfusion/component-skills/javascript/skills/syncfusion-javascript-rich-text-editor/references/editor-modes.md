# Editor Modes & Types

## Table of Contents
- [HTML vs Markdown Mode](#html-vs-markdown-mode)
- [HTML Editor (Default)](#html-editor-default)
- [Markdown Editor](#markdown-editor)
- [Iframe Editor](#iframe-editor)
- [Inline Editing](#inline-editing)
- [Resizable Editor](#resizable-editor)

---

## HTML vs Markdown Mode

The `editorMode` property controls the editing surface. The component name is always `RichTextEditor` — the mode switches what's injected and what the `value` property contains.

| Scenario | editorMode | Module to inject | value type |
|----------|------------|------------------|------------|
| WYSIWYG / blog / CMS | `'HTML'` (default) | `HtmlEditor` | HTML string |
| Markdown / documentation | `'Markdown'` | `MarkdownEditor` | Markdown string |

> You cannot use `HtmlEditor` and `MarkdownEditor` together — they are mutually exclusive.

---

## HTML Editor (Default)

The default mode. Renders a WYSIWYG surface where formatting is applied visually.

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  // editorMode: 'HTML' is the default — you can omit it
  value: `<p>The Rich Text Editor is a WYSIWYG editor.</p>`
});
editor.appendTo('#editor');
```

The `editor.value` returns valid HTML markup.

---

## Markdown Editor

Set `editorMode: 'Markdown'` and inject `MarkdownEditor`. The editor renders as a plain text area; the output is markdown syntax.

```typescript
import { RichTextEditor, Toolbar, Link, Image, MarkdownEditor } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor);

const editor = new RichTextEditor({
  editorMode: 'Markdown',
  value: `***Overview***\nThe Rich Text Editor supports markdown editing.`
});
editor.appendTo('#editor');
```

> For markdown preview, use a third-party library like [Marked](https://marked.js.org/):
> ```typescript
> import { marked } from 'marked';
> const html = marked(editor.value);
> previewElement.innerHTML = html;
> ```

For Markdown-specific features (custom format, syntax reference, live preview), read `markdown-features.md`.

---

## Iframe Editor

Isolates editor content from the main page using an `<iframe>`. Useful when the page has global CSS that would otherwise affect editor content styling.

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  iframeSettings: {
    enable: true
  },
  value: '<p>Content isolated from page styles.</p>'
});
editor.appendTo('#editor');
```

### Customizing iframe body attributes

```typescript
const editor = new RichTextEditor({
  iframeSettings: {
    enable: true,
    attributes: {
      // e.g., set custom data attributes on the iframe body
      'data-theme': 'light'
    }
  }
});
```

### Injecting external CSS/scripts into iframe

```typescript
const editor = new RichTextEditor({
  iframeSettings: {
    enable: true,
    resources: {
      styles: ['my-editor-styles.css'],   // relative or absolute URLs
      scripts: ['my-editor-scripts.js']
    }
  }
});
```

### Mention in iframe mode

When using Mention inside an iframe editor, target the editor's `inputElement` explicitly:

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const editor = new RichTextEditor({
  iframeSettings: { enable: true },
  placeholder: 'Type @ to mention someone'
});
editor.appendTo('#editor');

const mention = new Mention({
  dataSource: usersData,
  fields: { text: 'name' },
  target: editor.inputElement   // ← key: point to iframe's input
});
mention.appendTo('#mentionTarget');
```

---

## Inline Editing

The toolbar is hidden until the user selects or focuses text. Ideal for in-place editing of page content (comments, profile bios, card titles).

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  inlineMode: {
    enable: true,
    onSelection: true   // toolbar appears only when text is selected
  },
  value: `<p>Click or select text to start editing.</p>`
});
editor.appendTo('#editor');
```

- `onSelection: true` — toolbar appears on text selection
- `onSelection: false` — toolbar appears when the editor gains focus

**Good use case:** Editing a blog post title directly on the preview page without a dedicated form.

---

## Resizable Editor

Allows the user to drag a resize handle at the bottom-right corner to adjust editor height.

**Requires** injecting the `Resize` module.

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize);

const editor = new RichTextEditor({
  enableResize: true,
  value: '<p>Drag the bottom-right corner to resize.</p>'
});
editor.appendTo('#editor');
```

### Restrict resize bounds

Use CSS on the wrapper element to cap the resize range:

```css
.e-richtexteditor {
  min-width: 250px;
  max-width: 880px;
  min-height: 200px;
  max-height: 600px;
}
```

---

## Mode Comparison Summary

| Feature | HTML Mode | Markdown Mode | Iframe Mode | Inline Mode |
|---------|-----------|---------------|-------------|-------------|
| Output format | HTML | Markdown text | HTML | HTML |
| Visual WYSIWYG | ✅ | ❌ | ✅ | ✅ |
| Style isolation | ❌ | N/A | ✅ | ❌ |
| Toolbar visible | Always | Always | Always | On select/focus |
| Use case | CMS, blog, email | Docs, notes | Style-sensitive pages | In-place editing |
