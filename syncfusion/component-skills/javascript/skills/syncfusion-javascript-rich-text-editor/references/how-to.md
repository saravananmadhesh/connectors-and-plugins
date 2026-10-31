# How-To Guide

## Table of Contents
- [RTE Inside Dialog](#rte-inside-dialog)
- [RTE Inside Tab](#rte-inside-tab)
- [Save with Ctrl+S](#save-with-ctrls)
- [Custom Keyboard Shortcuts](#custom-keyboard-shortcuts)
- [Set Cursor Position](#set-cursor-position)
- [Default Font](#default-font)
- [File Attachments](#file-attachments)
- [File Size Restriction](#file-size-restriction)
- [Format Code Block with Syntax Highlighting](#format-code-block-with-syntax-highlighting)
- [Rename Images on Server](#rename-images-on-server)

---

## RTE Inside Dialog

When rendering inside a Dialog, the editor toolbar renders incorrectly because the container is initially `display: none`. Fix by calling `refreshUI()` in the Dialog's `open` event:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { RichTextEditor, Toolbar, HtmlEditor } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor);

const editor = new RichTextEditor({});
editor.appendTo('#rteInDialog');

const dialog = new Dialog({
  header: 'Edit Content',
  content: document.getElementById('rteInDialog'),
  showCloseIcon: true,
  width: '600px',
  open: () => {
    editor.refreshUI();   // ← required to fix toolbar layout
  }
});
dialog.appendTo('#dialog');

document.getElementById('openBtn').onclick = () => dialog.show();
```

---

## RTE Inside Tab

Similar to the Dialog issue, when the RTE is placed in a hidden tab, call `refreshUI()` when the tab becomes active:

```typescript
import { Tab } from '@syncfusion/ej2-navigations';
import { RichTextEditor, Toolbar, HtmlEditor } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor);

const editor = new RichTextEditor({});
editor.appendTo('#rteInTab');

const tab = new Tab({
  selected: (args) => {
    if (args.selectedIndex === 1) {  // index of the tab containing the RTE
      editor.refreshUI();
    }
  }
});
tab.appendTo('#tab');
```

---

## Save with Ctrl+S

Bind `Ctrl+S` to save the editor content:

```typescript
const editor = new RichTextEditor({});
editor.appendTo('#editor');

editor.contentModule.getDocument().addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault();
    editor.updateValue();            // flush pending changes to editor.value
    const content = editor.value;    // HTML or Markdown string
    saveToServer(content);
  }
});

function saveToServer(content: string) {
  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
}
```

---

## Custom Keyboard Shortcuts

Add a custom keyboard shortcut using `HtmlFormatter`:

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, HtmlFormatter } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor);

const editor = new RichTextEditor({
  formatter: new HtmlFormatter({
    keyConfig: {
      'insert-link': 'ctrl+q'   // Ctrl+Q opens Insert Link dialog
    }
  })
});
editor.appendTo('#editor');
```

---

## Set Cursor Position

Move the cursor to a specific position programmatically:

```typescript
import { NodeSelection } from '@syncfusion/ej2-richtexteditor';

// Focus the editor and move cursor to end
editor.focusIn();

const selection = new NodeSelection();
const range = document.createRange();
const contentEl = editor.contentModule.getDocument().querySelector('.e-content');
range.selectNodeContents(contentEl);
range.collapse(false);  // false = move to end, true = move to start

const sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);
```

---

## Default Font

Set the default font name and size for the editor content:

```typescript
const editor = new RichTextEditor({
  fontFamily: {
    default: 'Segoe UI',
    items: [
      { text: 'Segoe UI', value: 'Segoe UI,sans-serif' },
      { text: 'Arial', value: 'Arial,sans-serif' }
    ]
  },
  fontSize: {
    default: '14pt',
    items: [
      { text: '10pt', value: '10pt' },
      { text: '12pt', value: '12pt' },
      { text: '14pt', value: '14pt' },
      { text: '18pt', value: '18pt' }
    ]
  }
});
```

Or via CSS:

```css
.e-richtexteditor .e-rte-content .e-content {
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
}
```

---

## File Attachments

Insert a file download link into the editor:

```typescript
editor.contentModule.getDocument().addEventListener('click', () => editor.focusIn());

// Insert file link at cursor position
function insertFileLink(fileName: string, fileUrl: string) {
  editor.focusIn();
  editor.executeCommand(
    'insertHTML',
    `<a href="${fileUrl}" download="${fileName}">${fileName}</a>`
  );
}
```

For actual file upload, use your server's upload endpoint and insert the returned URL as a link.

---

## File Size Restriction

Restrict image upload size:

```typescript
const editor = new RichTextEditor({
  insertImageSettings: {
    maxFileSize: 5000000   // 5MB in bytes
  },
  imageUploadFailed: (args) => {
    if (args.e.currentTarget.statusText === 'Request Entity Too Large') {
      alert('File is too large. Maximum size is 5MB.');
    }
  }
});
```

---

## Format Code Block with Syntax Highlighting

Apply syntax highlighting to code blocks when displaying editor content outside the RTE (e.g., on a blog post page):

```typescript
// On the display page (not in the editor):
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

// After rendering editor.value to the DOM
document.querySelectorAll('.e-rte-content pre code').forEach((block) => {
  Prism.highlightElement(block as HTMLElement);
});
```

---

## Rename Images on Server

Handle the `imageUploadSuccess` event to receive the renamed filename from the server and update the editor:

```typescript
const editor = new RichTextEditor({
  insertImageSettings: {
    saveUrl: '/api/RichTextEditor/RenameImage',
    path: '/Uploads/'
  },
  imageUploadSuccess: (args: any) => {
    if (args.e.currentTarget.getResponseHeader('name') !== null) {
      args.file.name = args.e.currentTarget.getResponseHeader('name');
      const filename = document.querySelector('.e-file-name');
      if (filename) {
        filename.setAttribute('title', args.file.name);
        filename.textContent = args.file.name.replace(args.file.name.split('.')[args.file.name.split('.').length - 1], '');
      }
    }
  }
});
```
