# Content Operations

## Table of Contents
- [Code Block](#code-block)
- [Paste Cleanup](#paste-cleanup)
- [executeCommand API](#executecommand-api)
- [Enter Key Configuration](#enter-key-configuration)
- [Undo / Redo](#undo--redo)
- [Selection API](#selection-api)
- [Clipboard Operations](#clipboard-operations)

---

## Code Block

> Requires module injection: `CodeBlock`

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, CodeBlock } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, CodeBlock);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['CodeBlock', 'InlineCode']
  },
  codeBlockSettings: {
    languages: [
      { label: 'JavaScript', language: 'javascript' },
      { label: 'TypeScript', language: 'typescript' },
      { label: 'HTML', language: 'html' },
      { label: 'CSS', language: 'css' },
      { label: 'Plain Text', language: 'plaintext' }
    ],
    defaultLanguage: 'plaintext'
  }
});
```

**Keyboard shortcut**: `Ctrl+Shift+B` (Windows) / `Cmd+Shift+B` (Mac)

> Live syntax highlighting is NOT applied during editing. Apply highlighting when rendering the content on the front end using a library like Prism.js or highlight.js.

---

## Paste Cleanup

> Requires module injection: `PasteCleanup`

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, PasteCleanup } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, PasteCleanup);

const editor = new RichTextEditor({
  pasteCleanupSettings: {
    prompt: false,                    // show dialog on paste (true) or auto-clean (false)
    plainText: false,                 // paste as plain text (strips all tags/styles)
    keepFormat: true,                 // retain original styles/fonts
    deniedTags: ['script', 'iframe'], // HTML tags to strip from pasted content
    deniedAttrs: ['class', 'id'],     // HTML attributes to strip
    allowedStyleProps: ['color', 'font-size', 'font-weight', 'text-align']
  }
});
```

### Paste mode reference

| Mode | `prompt` | `plainText` | `keepFormat` | Behavior |
|------|:---:|:---:|:---:|---------|
| Prompt dialog | `true` | — | — | User chooses Keep/Clean/Plain Text |
| Plain text | `false` | `true` | — | Strips all tags and styles |
| Keep format | `false` | `false` | `true` | Keeps styles, filtered by `allowedStyleProps` |
| Clean format | `false` | `false` | `false` | Removes inline styles, keeps structure |

---

## executeCommand API

Programmatically apply formatting and execute editor actions. **Not supported in Markdown mode.**

```typescript
// Text formatting
editor.executeCommand('bold');
editor.executeCommand('italic');
editor.executeCommand('underline');
editor.executeCommand('strikeThrough');
editor.executeCommand('superscript');
editor.executeCommand('subscript');
editor.executeCommand('uppercase');
editor.executeCommand('lowercase');
editor.executeCommand('removeFormat');

// Font
editor.executeCommand('fontColor', '#ff0000');
editor.executeCommand('fontName', 'Arial');
editor.executeCommand('fontSize', '18pt');
editor.executeCommand('backColor', '#ffff00');

// Block-level
editor.executeCommand('formatBlock', 'H2');
editor.executeCommand('justifyCenter');
editor.executeCommand('justifyLeft');
editor.executeCommand('justifyRight');
editor.executeCommand('justifyFull');
editor.executeCommand('indent');
editor.executeCommand('outdent');
editor.executeCommand('insertOrderedList');
editor.executeCommand('insertUnorderedList');

// Insert content
editor.executeCommand('insertHTML', '<strong>Hello</strong>');
editor.executeCommand('insertText', 'plain text');
editor.executeCommand('createLink', { text: 'Syncfusion', url: 'https://syncfusion.com', title: 'Syncfusion' });

// Insert media
editor.executeCommand('insertImage', { url: 'https://example.com/img.png', cssClass: 'e-rte-image' });
editor.executeCommand('insertVideo', { url: 'https://example.com/video.mp4', cssClass: 'e-rte-video' });
editor.executeCommand('insertAudio', { url: 'https://example.com/audio.wav', cssClass: 'e-rte-audio' });

// History
editor.executeCommand('undo');
editor.executeCommand('redo');

// Format painter
editor.executeCommand('copyFormatPainter');
editor.executeCommand('applyFormatPainter');
editor.executeCommand('escapeFormatPainter');
```

---

## Enter Key Configuration

Customize what HTML element is created when pressing Enter or Shift+Enter:

```typescript
const editor = new RichTextEditor({
  enterKey: 'P',        // 'P' (default) | 'DIV' | 'BR'
  shiftEnterKey: 'BR'   // 'BR' (default) | 'P' | 'DIV'
});
```

| Value | Created Element | Use Case |
|-------|----------------|---------|
| `'P'` | `<p>` | Standard paragraphs (default) |
| `'DIV'` | `<div>` | When you need div-based structure |
| `'BR'` | `<br>` | Single-line breaks (blog/comment editors) |

Change at runtime:

```typescript
editor.enterKey = 'DIV';
editor.dataBind();
```

---

## Undo / Redo

The RTE includes a built-in undo/redo history stack.

```typescript
// Programmatic undo/redo
editor.executeCommand('undo');
editor.executeCommand('redo');

// Keyboard shortcuts
// Windows: Ctrl+Z / Ctrl+Y
// Mac:     Cmd+Z / Cmd+Shift+Z
```

Toolbar items:

```typescript
toolbarSettings: {
  items: ['Undo', 'Redo']
}
```

---

## Selection API

Get the current cursor position and selection range:

```typescript
import { NodeSelection } from '@syncfusion/ej2-richtexteditor';

// Save selection before a dialog opens
const selection = new NodeSelection();
const savedRange = selection.getRange(document);

// Restore selection
selection.setRange(document, savedRange);

// Get selected text
const selectedText = window.getSelection().toString();

// Get selected HTML
const range = window.getSelection().getRangeAt(0);
const div = document.createElement('div');
div.appendChild(range.cloneContents());
const selectedHTML = div.innerHTML;
```

---

## Clipboard Operations

Control clipboard behavior via events:

```typescript
const editor = new RichTextEditor({
  // Before paste — inspect and modify args.text
  beforePasteCleanup: (args) => {
    console.log('About to paste:', args.text);
  },
  // After paste — inspect cleaned result
  afterPasteCleanup: (args) => {
    console.log('Pasted content:', args.value);
  }
});
```
