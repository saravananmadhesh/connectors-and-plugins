# Block Quote in Vue Modern Rich Text Editor

## Table of Contents

- [Overview](#overview)
- [Commands Support](#commands-support)
- [Basic Configuration](#basic-configuration)
- [Example](#example)

---

## Overview

A block quote wraps the current block in a `<blockquote>` element to visually set it apart from surrounding text. Block quotes are commonly used to highlight quotations, cited passages, or important excerpts.

The Modern Rich Text Editor exposes the block quote through:
- **Toolbar:** `Quote` built-in toolbar identifier
- **Slash Commands:** `Blockquote` slash-command entry
- **Keyboard Shortcut:** Access via commands builder

---

## Commands Support

The `blockQuote` command does not require a payload. It toggles a blockquote on the current selection:
- Invoking it on a plain paragraph wraps it in a blockquote
- Invoking it again on the resulting blockquote unwraps it

| Command | Payload | Toolbar Item | Slash-command Entry |
|---------|---------|--------------|-------------------|
| `blockQuote` | — | `Quote` | `Blockquote` |

---

## Basic Configuration

Add the `Quote` toolbar item alongside other block-format buttons:

```ts
const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignment', '|',
    'Quote', 'CodeBlock', '|',
    'Undo', 'Redo'
  ]
};
```

To expose block quotes through the slash-command popup, enable `slashCommandSettings` and include `Blockquote`:

```ts
const slashCommandSettings = {
  enable: true,
  items: ['Blockquote']
};
```

---

## Example

Complete example with block quote support via toolbar and slash commands:

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :slashCommandSettings="slashCommandSettings"
    placeholder="Quote a passage...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { provide } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

provide('richtexteditor-ui', [SlashCommand]);

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignment', '|',
    'Quote', 'CodeBlock', '|',
    'Undo', 'Redo'
  ]
};

const slashCommandSettings = {
  enable: true,
  items: ['Blockquote']
};
</script>
```

**User Interaction:**
1. Place cursor in a paragraph
2. Click the `Quote` toolbar button to wrap it in a blockquote
3. Or type `/blockquote` to access via slash command
4. Click or execute again to remove the blockquote formatting

