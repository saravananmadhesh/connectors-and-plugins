# Rich Text Editor Integration

## Table of Contents
- [Overview](#overview)
- [Required Packages](#required-packages)
- [Basic RTE Setup in Markdown Mode](#basic-rte-setup-in-markdown-mode)
- [Live Preview on Keyup](#live-preview-on-keyup)
- [Full Preview Toggle](#full-preview-toggle)
- [Side-by-Side Splitter Layout](#side-by-side-splitter-layout)
- [Toolbar Configuration](#toolbar-configuration)

---

## Overview

The Syncfusion Rich Text Editor (RTE) can be set to `editorMode: 'Markdown'`, allowing users to write Markdown content in a textarea-style editor. Pairing it with `MarkdownConverter.toHtml` enables real-time HTML preview — so users see the rendered output as they type.

Two common patterns:
1. **Live preview on keyup** — updates a preview div every time the user types
2. **Side-by-side with Splitter** — editor and preview rendered in split panes simultaneously

---

## Required Packages

```bash
npm install @syncfusion/ej2-markdown-converter
npm install @syncfusion/ej2-richtexteditor @syncfusion/ej2-base
npm install @syncfusion/ej2-layouts   # For Splitter (side-by-side only)
```

**Required CSS:**

```html
<link href="node_modules/@syncfusion/ej2-base/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-richtexteditor/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-inputs/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-lists/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-navigations/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-popups/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-buttons/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-layouts/styles/material3.css" rel="stylesheet" />
```

Swap `material3` for your chosen theme (`bootstrap5`, `fluent2`, `tailwind3`, etc.).

---

## Basic RTE Setup in Markdown Mode

Set `editorMode: 'Markdown'` to switch the RTE from WYSIWYG to Markdown editing:

```typescript
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, Table } from '@syncfusion/ej2-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, Table);

const rte = new RichTextEditor({
  height: '400px',
  editorMode: 'Markdown',
  value: '# Hello\nType **Markdown** here.'
});
rte.appendTo('#markdown-editor');
```

```html
<div id="markdown-editor"></div>
```

---

## Live Preview on Keyup

Update a preview element every time the user types. Access the underlying `<textarea>` via `contentModule.getEditPanel()`:

```typescript
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, Table } from '@syncfusion/ej2-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, Table);

let textArea: HTMLTextAreaElement;
let previewEl: HTMLElement;

const rte = new RichTextEditor({
  height: '400px',
  editorMode: 'Markdown',
  created: () => {
    textArea = rte.contentModule.getEditPanel() as HTMLTextAreaElement;
    previewEl = document.getElementById('preview') as HTMLElement;

    textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
      previewEl.innerHTML = MarkdownConverter.toHtml(textArea.value) as string;
    });
  }
});
rte.appendTo('#markdown-editor');
```

```html
<div id="markdown-editor"></div>
<div id="preview"></div>
```

---

## Full Preview Toggle

Add a custom **Preview** toolbar button that toggles between Markdown source view and the rendered HTML output. When active, the textarea is hidden and the HTML preview is shown; when inactive, the reverse.

```typescript
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, Table } from '@syncfusion/ej2-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, Table);

let textArea: HTMLTextAreaElement;
let mdsource: HTMLElement;

const rte = new RichTextEditor({
  height: '520px',
  editorMode: 'Markdown',
  toolbarSettings: {
    items: [
      'Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote',
      'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|',
      {
        tooltipText: 'Preview',
        template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
          '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
      },
      '|', 'Undo', 'Redo'
    ]
  },
  created: () => {
    textArea = rte.contentModule.getEditPanel() as HTMLTextAreaElement;
    mdsource = document.getElementById('preview-code') as HTMLElement;

    // Update preview while in preview mode
    textArea.addEventListener('keyup', () => {
      if (mdsource.classList.contains('e-active')) {
        const id = rte.getID() + 'html-view';
        const htmlPreview = rte.element.querySelector('#' + id) as HTMLElement;
        if (htmlPreview) {
          htmlPreview.innerHTML = MarkdownConverter.toHtml(textArea.value) as string;
        }
      }
    });

    // Toggle preview on button click
    mdsource.addEventListener('click', () => {
      togglePreview();
    });
  }
});
rte.appendTo('#markdown-editor');

function togglePreview(): void {
  const id = rte.getID() + 'html-preview';
  let htmlPreview = rte.element.querySelector('#' + id) as HTMLElement;

  if (mdsource.classList.contains('e-active')) {
    // Exit preview mode
    mdsource.classList.remove('e-active');
    textArea.style.display = 'block';
    if (htmlPreview) htmlPreview.style.display = 'none';
  } else {
    // Enter preview mode
    mdsource.classList.add('e-active');
    if (!htmlPreview) {
      htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
      htmlPreview.id = id;
      textArea.parentNode!.appendChild(htmlPreview);
    }
    textArea.style.display = 'none';
    htmlPreview.style.display = 'block';
    htmlPreview.innerHTML = MarkdownConverter.toHtml(textArea.value) as string;
  }
}
```

---

## Side-by-Side Splitter Layout

Use the Syncfusion Splitter to display the Markdown editor and HTML preview side by side. The preview updates in real time via the `actionComplete` and `change` events:

```typescript
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, Table, ToolbarType } from '@syncfusion/ej2-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { Splitter } from '@syncfusion/ej2-layouts';
import { Browser } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, Table);

let textArea: HTMLTextAreaElement;
let srcArea: HTMLElement;

const splitObj = new Splitter({
  height: '450px',
  width: '100%',
  paneSettings: [{ resizable: true, size: '50%', min: '40%' }, { min: '40%' }],
  resizing: () => rte.refreshUI(),
  created: () => {
    if (Browser.isDevice) splitObj.orientation = 'Vertical';
  }
});
splitObj.appendTo('#splitter-rte-markdown-preview');

const rte = new RichTextEditor({
  height: '100%',
  editorMode: 'Markdown',
  floatingToolbarOffset: 0,
  toolbarSettings: {
    type: ToolbarType.Expand,
    enableFloating: false,
    items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote',
      'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo']
  },
  saveInterval: 1,
  actionComplete: updatePreview,
  change: updatePreview,
  created: () => {
    textArea = rte.contentModule.getEditPanel() as HTMLTextAreaElement;
    srcArea = document.querySelector('.source-code') as HTMLElement;
    updatePreview();
  }
});
rte.appendTo('#markdown-editor');

function updatePreview(): void {
  srcArea.innerHTML = MarkdownConverter.toHtml(
    (rte.contentModule.getEditPanel() as HTMLTextAreaElement).value,
    { async: true, gfm: true, lineBreak: true, silence: true }
  ) as string;
}
```

```html
<div id="splitter-rte-markdown-preview">
  <div class="pane1">
    <div id="markdown-editor"></div>
  </div>
  <div class="pane2">
    <h6 class="title">Markdown Preview</h6>
    <div class="source-code" style="padding: 20px;"></div>
  </div>
</div>
```

---

## Toolbar Configuration

For Markdown mode, include only toolbar items relevant to Markdown formatting. WYSIWYG-only items (like `FontName`, `FontSize`, `BackgroundColor`) have no effect in Markdown mode.

**Recommended Markdown toolbar items:**

```typescript
toolbarSettings: {
  items: [
    'Bold', 'Italic', 'StrikeThrough', '|',
    'Formats', 'Blockquote', 'OrderedList', 'UnorderedList',
    'SuperScript', 'SubScript', '|',
    'CreateLink', 'Image', 'CreateTable', '|',
    'Undo', 'Redo'
  ]
}
```

**Tips:**
- Use `ToolbarType.Expand` on smaller screens to prevent toolbar overflow
- Set `enableFloating: false` when using the Splitter layout to avoid z-index issues
- The `saveInterval: 1` option (in ms) ensures the `actionComplete` event fires quickly for live preview updates
