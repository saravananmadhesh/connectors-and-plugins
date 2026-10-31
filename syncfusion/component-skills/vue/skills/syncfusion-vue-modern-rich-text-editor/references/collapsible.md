# Collapsible Sections in Vue Modern Rich Text Editor

## Table of Contents

- [Overview](#overview)
- [Available Types](#available-types)
- [Commands Support](#commands-support)
- [Basic Configuration](#basic-configuration)
- [Example](#example)
- [API References](#api-references)

---

## Overview

Collapsible sections wrap a block of text in an expandable container that users can expand or collapse. This is useful for organizing content into sections that can be hidden to reduce clutter while reading or editing.

The Modern Rich Text Editor ships five collapsible variants:
- **Collapsible Paragraph** — A regular paragraph that can be collapsed
- **Collapsible Heading 1-4** — Collapsible section headers at different hierarchy levels

**Access Method:** Collapsible sections are reached **only** through the slash-command popup. There is no dedicated public toolbar item for them.

---

## Available Types

| Type | Slash-command Entry | Dispatched Payload |
|------|-------------------|-------------------|
| Collapsible Paragraph | `Collapsible Paragraph` | `{ triggerType: 'paragraph' }` |
| Collapsible Heading 1 | `Collapsible Heading 1` | `{ triggerType: 'heading', level: 1 }` |
| Collapsible Heading 2 | `Collapsible Heading 2` | `{ triggerType: 'heading', level: 2 }` |
| Collapsible Heading 3 | `Collapsible Heading 3` | `{ triggerType: 'heading', level: 3 }` |
| Collapsible Heading 4 | `Collapsible Heading 4` | `{ triggerType: 'heading', level: 4 }` |

All five entries funnel through the `collapsible` command with a `ToggleCollapsiblePayload`:

```ts
{ triggerType: 'paragraph' | 'heading', level?: 1 | 2 | 3 | 4 }
```

---

## Commands Support

The `collapsible` command accepts a `ToggleCollapsiblePayload` where:
- **triggerType** — Selects between `'paragraph'` (collapsible paragraph) or `'heading'` (collapsible heading)
- **level** — Required when `triggerType` is `'heading'`; specifies the heading level (1–4)

| Slash-command Entry | Command | Payload |
|---|---|---|
| `Collapsible Paragraph` | `collapsible` | `{ triggerType: 'paragraph' }` |
| `Collapsible Heading 1` | `collapsible` | `{ triggerType: 'heading', level: 1 }` |
| `Collapsible Heading 2` | `collapsible` | `{ triggerType: 'heading', level: 2 }` |
| `Collapsible Heading 3` | `collapsible` | `{ triggerType: 'heading', level: 3 }` |
| `Collapsible Heading 4` | `collapsible` | `{ triggerType: 'heading', level: 4 }` |

---

## Basic Configuration

Enable `slashCommandSettings` and list the five collapsible entries in `slashCommandSettings.items` to expose them through the slash command popup:

```ts
const slashCommandSettings = {
  enable: true,
  items: [
    'Collapsible Paragraph',
    'Collapsible Heading 1',
    'Collapsible Heading 2',
    'Collapsible Heading 3',
    'Collapsible Heading 4'
  ]
};
```

Each entry is a string identifier from `SlashCommandItems`.

---

## Example

Complete example with collapsible section support:

```html
<template>
  <ejs-richtexteditor-ui
    :slashCommandSettings="slashCommandSettings"
    placeholder="Type / for collapsible sections...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { provide } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

provide('richtexteditor-ui', [SlashCommand]);

const slashCommandSettings = {
  enable: true,
  items: [
    'Collapsible Paragraph',
    'Collapsible Heading 1',
    'Collapsible Heading 2',
    'Collapsible Heading 3',
    'Collapsible Heading 4'
  ]
};
</script>
```

**User Interaction:**

**Via Slash Command:**
1. Place cursor where you want to insert a collapsible section
2. Type `/Collapsible` and select the desired variant:
   - `/Collapsible Paragraph` — Collapsible regular text
   - `/Collapsible Heading 1` — Collapsible H1 section
   - `/Collapsible Heading 2` — Collapsible H2 section
   - `/Collapsible Heading 3` — Collapsible H3 section
   - `/Collapsible Heading 4` — Collapsible H4 section
3. Press Enter or click to insert
4. Add content to the collapsible block
5. Users can click the collapse/expand toggle to show/hide the content

**Nested Content:**
Collapsible sections support nested content. Users can add multiple paragraphs, lists, images, and other elements within a collapsible block. When collapsed, all nested content is hidden.

**Visual Behavior:**
- Collapsible sections display with:
  - A toggle button (triangle/arrow icon) to expand/collapse
  - Clear visual separation from regular text
  - Smooth animation when toggling state
  - Proper indentation for nested content

---

## API References

### CollapsibleCommandBuilder

Insert or toggle collapsible sections programmatically.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/collapsiblecommandbuilder`

**Usage Example:**

```typescript
editor.value?.executeCommand({
  command: 'Collapsible',
  value: {
    title: 'Expand to see details',
    collapsed: false
  }
});
```

---

## Related Documentation

- [Formatting](formatting.md)
- [Block Quote](block-quote.md)
- [Code Block](codeblock.md)
- [Callout](callout.md)
- [Getting Started](getting-started.md)

