# Editor Modes: HTML and Markdown

## Table of Contents
- [Overview](#overview)
- [HTML Mode](#html-mode)
- [Markdown Mode](#markdown-mode)
- [Markdown Syntax Support](#markdown-syntax-support)
- [Markdown Preview with `marked`](#markdown-preview-with-marked)
- [Side-by-Side Split Preview](#side-by-side-split-preview)
- [Choosing Between Modes](#choosing-between-modes)

## Overview

The Rich Text Editor is a single component (`ejs-richtexteditor`) that supports two distinct editing modes controlled by the `editorMode` prop and the injected service module:

| Mode | `editorMode` value | Module | Output |
|------|--------------------|--------|--------|
| HTML Editor | `"HTML"` (default) | `HtmlEditor` | Valid HTML markup |
| Markdown Editor | `"Markdown"` | `MarkdownEditor` | Markdown text string |

## HTML Mode

HTML mode is the default. No `editorMode` prop needed. Inject `HtmlEditor`.

```vue
<template>
  <ejs-richtexteditor :height="340" :value="rteValue" />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const rteValue = `<p>The Rich Text Editor is a <b>WYSIWYG</b> editor that returns valid HTML.</p>`;
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

The editor renders a `<div>` content area by default. Use `iframeSettings: { enable: true }` to render inside an `<iframe>` for style isolation (see `editor-types.md`).

## Markdown Mode

Set `editorMode="Markdown"` and inject `MarkdownEditor` instead of `HtmlEditor`. The content area becomes a `<textarea>` where users type Markdown syntax.

```vue
<template>
  <ejs-richtexteditor
    editorMode="Markdown"
    :height="350"
    :value="value"
    :toolbarSettings="toolbarConfig"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, MarkdownEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const value = `***Overview***
The Rich Text Editor supports Markdown editing when **editorMode** is set to *Markdown*.

- *Mode*: Provides IFRAME and DIV mode.
- *Toolbar*: Provide a fully customizable toolbar.
- *Preview*: Preview the modified content before saving.`;

const toolbarConfig = {
  items: ['Bold', 'Italic', 'StrikeThrough', '|',
    'Formats', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|', 'Undo', 'Redo']
};
provide('richtexteditor', [Toolbar, Link, Image, MarkdownEditor]);
</script>
```

## Markdown Syntax Support

### Supported Block Tags
`h1` through `h6`, `blockquote`, `pre`, `p`, `ol`, `ul`

### Supported Inline Selection Formatting
`Bold`, `Italic`, `StrikeThrough`, `InlineCode`, `SubScript`, `SuperScript`, `UpperCase`, `LowerCase`

### Supported Insert Commands
`Image`, `Link`, `Table`

## Markdown Preview with `marked`

Markdown mode stores raw Markdown text. To show rendered HTML, use the third-party `marked` library.

### Install marked

```bash
npm install marked
```

### Basic Preview on Keyup

```vue
<template>
  <ejs-richtexteditor
    ref="rteRef"
    editorMode="Markdown"
    :value="value"
    :created="onCreated"
  />
</template>

<script setup>
import { ref, provide } from 'vue';
import { marked } from 'marked';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, MarkdownEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);
const value = '**Hello** Markdown!';

const onCreated = () => {
  const textArea = rteRef.value.ej2Instances.contentModule.getEditPanel();
  textArea.onkeyup = () => {
    // Convert and display preview elsewhere in your UI
    const html = marked.parse(textArea.value);
    document.getElementById('preview').innerHTML = html;
  };
};
provide('richtexteditor', [Toolbar, Link, Image, MarkdownEditor]);
</script>
```

## Side-by-Side Split Preview

Use the Syncfusion Splitter component to show editor on the left, live preview on the right.

```bash
npm install @syncfusion/ej2-vue-layouts
```

```vue
<template>
  <ejs-splitter width="100%" height="450px" :resizing="onRefreshUI">
    <e-panes>
      <e-pane size="50%" :content="'editorPane'">
        <template v-slot:editorPane>
          <ejs-richtexteditor
            ref="rteRef"
            editorMode="Markdown"
            :value="value"
            :toolbarSettings="toolbarSettings"
            :change="onEditorChange"
            :actionComplete="updatePreview"
            :created="onCreated"
          />
        </template>
      </e-pane>
      <e-pane :content="'previewPane'">
        <template v-slot:previewPane>
          <div class="source-code" style="padding: 20px"></div>
        </template>
      </e-pane>
    </e-panes>
  </ejs-splitter>
</template>

<script setup>
import { ref, provide } from 'vue';
import { marked } from 'marked';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, MarkdownEditor
} from '@syncfusion/ej2-vue-richtexteditor';
import {
  SplitterComponent as EjsSplitter,
  PanesDirective as EPanes,
  PaneDirective as EPane
} from '@syncfusion/ej2-vue-layouts';

const rteRef = ref(null);
let srcArea = null;

const value = `**Hello** from the Markdown editor with live preview!`;
const toolbarSettings = {
  items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote',
    'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo']
};

const onCreated = () => {
  setTimeout(() => {
    rteRef.value.ej2Instances.refreshUI();
    srcArea = document.querySelector('.source-code');
    updatePreview();
  }, 10);
};

const onEditorChange = () => updatePreview();

const updatePreview = () => {
  if (srcArea) {
    const content = rteRef.value.ej2Instances.contentModule.getEditPanel().value;
    srcArea.innerHTML = marked.parse(content);
  }
};

const onRefreshUI = () => rteRef.value.ej2Instances.refreshUI();

provide('richtexteditor', [Toolbar, Link, Image, Table, MarkdownEditor]);
</script>
```

## Choosing Between Modes

| Scenario | Recommended Mode |
|----------|-----------------|
| Store and render formatted HTML in a CMS | HTML mode |
| Developer-authored content (docs, READMEs) | Markdown mode |
| Rich media: images, video, audio with formatting | HTML mode |
| Plain-text-compatible output (GitHub, Notion) | Markdown mode |
| Complex table editing | HTML mode (more control) |
| Simple table structure | Either (both support `CreateTable`) |
| Need IFrame style isolation | HTML mode + `iframeSettings` |

> You cannot mix HTML and Markdown modes at runtime — choose at component initialization. If you need to switch, remount the component with the new `editorMode`.
