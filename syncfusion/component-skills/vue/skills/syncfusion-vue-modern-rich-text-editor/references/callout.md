# Callouts in Vue Modern Rich Text Editor

## Table of Contents

- [Overview](#overview)
- [Available Callout Types](#available-callout-types)
- [Commands Support](#commands-support)
- [Basic Configuration](#basic-configuration)
- [Example](#example)
- [API References](#api-references)

---

## Overview

Callouts highlight a block of text with a status indicator to emphasize important information. The Modern Rich Text Editor ships five callout variants, each available through:
- **Toolbar:** `Callout` split-button item (exposes all five variants together)
- **Slash Commands:** Each variant as its own entry (`Info`, `Success`, `Warning`, `Error`, `Note`)

The variants cannot be wired as separate top-level toolbar buttons; the public `callout` command only fires through the `Callout` split-button child or through a slash-command selection.

---

## Available Callout Types

| Variant | Slash-command Entry | Purpose |
|---------|-------------------|---------|
| **Info** | `Info` | Informational messages |
| **Success** | `Success` | Success or positive feedback |
| **Warning** | `Warning` | Warning or caution messages |
| **Error** | `Error` | Error or critical information |
| **Note** | `Note` | General notes or additional information |

All five variants funnel through the same `callout` command with a `CalloutCommand` payload:

```ts
{ callout: 'info' | 'success' | 'warning' | 'error' | 'note' }
```

---

## Commands Support

The `callout` command accepts a `CalloutCommand` payload where the `callout` property specifies the variant.

| Public Surface | Identifier | Dispatched Command | Payload `callout` |
|---|---|---|---|
| Toolbar split-button | `Callout` (child: `CalloutInfo`) | `callout` | `'info'` |
| Toolbar split-button | `Callout` (child: `CalloutSuccess`) | `callout` | `'success'` |
| Toolbar split-button | `Callout` (child: `CalloutWarning`) | `callout` | `'warning'` |
| Toolbar split-button | `Callout` (child: `CalloutError`) | `callout` | `'error'` |
| Toolbar split-button | `Callout` (child: `CalloutNote`) | `callout` | `'note'` |
| Slash command | `Info` | `callout` | `'info'` |
| Slash command | `Success` | `callout` | `'success'` |
| Slash command | `Warning` | `callout` | `'warning'` |
| Slash command | `Error` | `callout` | `'error'` |
| Slash command | `Note` | `callout` | `'note'` |

---

## Basic Configuration

### Toolbar Configuration

Add the `Callout` split-button to expose all five variants through a single toolbar control:

```ts
const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Callout', '|',
    'Undo', 'Redo'
  ]
};
```

### Slash Command Configuration

To surface the variants through the slash-command popup, enable `slashCommandSettings` and list the matching entries:

```ts
const slashCommandSettings = {
  enable: true,
  items: [
    'Info', 'Success', 'Warning', 'Error', 'Note'
  ]
};
```

---

## Example

Complete example with callout support via toolbar and slash commands:

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :slashCommandSettings="slashCommandSettings"
    placeholder="Type / for slash commands...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { provide } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

provide('richtexteditor-ui', [SlashCommand]);

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Callout', '|',
    'Undo', 'Redo'
  ]
};

const slashCommandSettings = {
  enable: true,
  items: [
    'Info', 'Success', 'Warning', 'Error', 'Note'
  ]
};
</script>
```

**User Interaction:**

**Via Toolbar:**
1. Place cursor in a paragraph
2. Click the `Callout` split-button dropdown
3. Select a variant (Info, Success, Warning, Error, or Note)
4. The paragraph is wrapped in the selected callout type

**Via Slash Command:**
1. Type `/` in the editor
2. Type the callout variant name (e.g., `/Info`, `/Warning`)
3. Press Enter or click to insert
4. The callout block is created at the cursor position

Each callout variant displays with distinct visual styling (colors, icons) to indicate its purpose.

---

## API References

### CalloutCommandBuilder

Insert callout blocks (Info, Warning, Error, Success, Note).

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/calloutcommandbuilder`

**Usage Example:**

```typescript
editor.value?.executeCommand({
  command: 'Callout',
  value: {
    type: 'warning',
    title: 'Warning',
    content: 'This is important information'
  }
});
```

---

## Related Documentation

- [Formatting](formatting.md)
- [Editor Methods](editor-methods.md)
- [Getting Started](getting-started.md)

