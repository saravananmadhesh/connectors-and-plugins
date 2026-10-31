# Markdown Editor Features

> Only applicable when `editorMode: 'Markdown'` is set.
> Required module: `MarkdownEditor` (instead of `HtmlEditor`)

## Table of Contents
- [Supported Markdown Syntax](#supported-markdown-syntax)
- [Markdown Toolbar Items](#markdown-toolbar-items)
- [Live Preview with Marked.js](#live-preview-with-markedjs)
- [Custom Markdown Syntax](#custom-markdown-syntax)
- [Markdown-Specific Toolbar Items](#markdown-specific-toolbar-items)

---

## Supported Markdown Syntax

| Command | Syntax | Notes |
|---------|--------|-------|
| Bold | `**text**` or `__text__` | |
| Italic | `*text*` or `_text_` | |
| Bold + Italic | `***text***` | |
| Heading 1–6 | `# H1` through `###### H6` | |
| Blockquote | `> text` | |
| Strikethrough | `~~text~~` | |
| Inline code | `` `code` `` | |
| Code block | ` ``` ` on new lines before/after | |
| Ordered list | `1.` prefix | |
| Unordered list | `*` prefix | |
| Link | `[text](url "optional title")` | |
| Image | `![alt text](url)` | |
| Table | Pipe-separated syntax | See below |
| Horizontal rule | `***` or `___` on its own line | |
| Subscript | `<sub>text</sub>` | Use HTML tag |
| Superscript | `<sup>text</sup>` | Use HTML tag |
| HTML entities | `&copy;`, `&trade;`, `&amp;`, etc. | |
| Escape character | `\*` or `\_` etc. | Prefix `\` to any syntax char |

**Table syntax:**
```markdown
| Heading 1 | Heading 2 |
|-----------|-----------|
| Cell A1   | Cell A2   |
| Cell B1   | Cell B2   |
```

> **Not supported**: Footnotes, definitions, math equations, checklists. Use HTML tags for unsupported syntax inside Markdown mode.

---

## Markdown Toolbar Items

When `editorMode: 'Markdown'`, use these toolbar items:

```typescript
import { RichTextEditor, Toolbar, Link, Image, MarkdownEditor, Table, ToolbarType } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor, Table);

const editor = new RichTextEditor({
  editorMode: 'Markdown',
  toolbarSettings: {
    type: ToolbarType.Expand,
    items: [
      'Bold', 'Italic', 'StrikeThrough', '|',
      'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
      'CreateLink', 'Image', 'CreateTable', '|',
      'Undo', 'Redo'
    ]
  }
});
editor.appendTo('#editor');
```

---

## Live Preview with Marked.js

Render a real-time HTML preview alongside the Markdown editor using a Splitter layout and the `marked` library.

### Install marked

```bash
npm install marked
```

### Setup

```typescript
import { RichTextEditor, MarkdownEditor, Toolbar, Link, Image, Table, ToolbarType } from '@syncfusion/ej2-richtexteditor';
import { Splitter } from '@syncfusion/ej2-layouts';
import { marked } from 'marked';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor, Table);

// Create split pane layout
const splitter = new Splitter({
  height: '450px',
  paneSettings: [
    { size: '50%', min: '40%', resizable: true },
    { min: '40%' }
  ]
});
splitter.appendTo('#splitter');

const editor = new RichTextEditor({
  editorMode: 'Markdown',
  height: '100%',
  saveInterval: 1,
  actionComplete: updatePreview,
  change: updatePreview
});
editor.appendTo('#editor');

function updatePreview(): void {
  const markdownContent = editor.contentModule.getEditPanel().value;
  const previewPane = document.getElementById('preview');
  previewPane.innerHTML = marked(markdownContent);
}
```

### HTML structure

```html
<div id="splitter">
  <div>
    <div id="editor"></div>
  </div>
  <div>
    <div id="preview" class="e-rte-content"></div>
  </div>
</div>
```

---

## Custom Markdown Syntax

Override default Markdown symbols using `MarkdownFormatter`:

```typescript
import { RichTextEditor, Toolbar, Link, Image, MarkdownFormatter, MarkdownEditor } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor);

const editor = new RichTextEditor({
  editorMode: 'Markdown',
  formatter: new MarkdownFormatter({
    listTags: {
      'OL': '1., 2., 3.',   // use numbered list
      'UL': '+ '            // use + instead of -
    },
    formatTags: {
      'Blockquote': '> '
    },
    selectionTags: {
      'Bold': '__',          // use __bold__ instead of **bold**
      'Italic': '_'          // use _italic_ instead of *italic*
    }
  })
});
editor.appendTo('#editor');
```

---

## Markdown-Specific Toolbar Items

Some toolbar items work only in Markdown mode and not in HTML mode:

| Item | HTML Mode | Markdown Mode | Notes |
|------|-----------|---------------|-------|
| `Formats` | ✅ | ✅ | H1–H6, Paragraph, etc. |
| `Blockquote` | ✅ | ✅ | |
| `Bold` | ✅ | ✅ | Uses `**` in Markdown |
| `Italic` | ✅ | ✅ | Uses `*` in Markdown |
| `CreateTable` | ✅ | ✅ | Pipe-table in Markdown |
| `CreateLink` | ✅ | ✅ | `[text](url)` in Markdown |
| `Image` | ✅ | ✅ | `![alt](url)` in Markdown |
| `SourceCode` | ✅ | ❌ | HTML source only; no source view in Markdown |
| `Preview` | ❌ | ❌ | Not built-in; use custom Splitter + marked.js |
| `FontColor` | ✅ | ❌ | No color in plain Markdown |
| `BackgroundColor` | ✅ | ❌ | No background color in plain Markdown |

> **Key rule**: Modules `HtmlEditor` and `MarkdownEditor` are mutually exclusive — inject only one per editor instance.
