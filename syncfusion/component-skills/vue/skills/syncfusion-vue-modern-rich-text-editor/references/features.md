# Slash Commands / Features Reference

This reference covers slash commands, which provide users with an efficient way to apply formatting, insert elements, and execute custom commands by typing the `/` character.

## Table of Contents

- [Overview](#overview)
- [Enabling Slash Commands](#enabling-slash-commands)
- [Module Injection](#module-injection)
- [Built-in Commands](#built-in-commands)
- [Configuring Slash Command Items](#configuring-slash-command-items)
- [Custom Slash Command Items](#custom-slash-command-items)
- [Handling itemSelect Events](#handling-itemselect-events)
- [Customizing Popup Appearance](#customizing-popup-appearance)
- [Selection and Lifecycle](#selection-and-lifecycle)

---

## Overview

Slash commands provide users with quick access to editor features through an intuitive interface. When the user types `/` in the editor, a filtered popup appears showing available commands. Users can search by typing additional characters, and pressing Enter executes the selected command.

**Benefits:**
- Discover available features without reaching for the toolbar
- Faster command execution for power users
- Extensible with custom commands
- Touch-friendly on mobile devices

---

## Enabling Slash Commands

Set the `enable` property within `slashCommandSettings` to `true`:

```html
<template>
  <ejs-richtexteditor-ui :slashCommandSettings="slashCommandSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

const slashCommandSettings = {
  enable: true
};

// Important: Inject the SlashCommand module
</script>
```

Setting `enable` to `false` at runtime stops listening for the `/` trigger and removes the popup.

---

## Module Injection

**Slash command is a standalone module** and must be injected through the `provide` block before the editor renders.

```html
<template>
  <ejs-richtexteditor-ui :slashCommandSettings="slashCommandSettings"></ejs-richtexteditor-ui>
</template>

<script>
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

export default {
  components: {
    'ejs-richtexteditor-ui': RichTextEditorUIComponent
  },
  data() {
    return {
      slashCommandSettings: { enable: true }
    };
  },
  provide: {
    'richtexteditor-ui': [SlashCommand]  // Required for slash commands
  }
};
</script>
```

> The `provide` call is a one-time registration. Subsequent editor instances do not need to re-provide the same module.

---

## Built-in Commands

The Slash command ships with a curated set of built-in items. When `items` is not overridden, all of the following are available:

### Basic Blocks

| Item | Dispatches | Description |
| --- | --- | --- |
| `Paragraph` | `paragraph` | Insert a paragraph block |
| `Heading 1` | `heading1` | Insert an H1 heading |
| `Heading 2` | `heading2` | Insert an H2 heading |
| `Heading 3` | `heading3` | Insert an H3 heading |
| `Heading 4` | `heading4` | Insert an H4 heading |

### Lists

| Item | Dispatches | Description |
| --- | --- | --- |
| `NumberedList` | `numberedList` | Insert a numbered list |
| `BulletList` | `bulletList` | Insert a bulleted list |
| `Checklist` | `checklist` | Insert a checklist |

### Quotes & Callouts

| Item | Dispatches | Description |
| --- | --- | --- |
| `Blockquote` | `blockQuote` | Insert a blockquote |
| `Info` | `calloutInfo` | Insert an info callout |
| `Warning` | `calloutWarning` | Insert a warning callout |
| `Error` | `calloutError` | Insert an error callout |
| `Success` | `calloutSuccess` | Insert a success callout |
| `Note` | `calloutNote` | Insert a note callout |

### Collapsible Sections

| Item | Dispatches | Description |
| --- | --- | --- |
| `Collapsible Paragraph` | `collapsible` with `triggerType: 'paragraph'` | Collapsible paragraph |
| `Collapsible Heading 1` | `collapsible` with `level: 1` | Collapsible heading 1 |
| `Collapsible Heading 2` | `collapsible` with `level: 2` | Collapsible heading 2 |
| `Collapsible Heading 3` | `collapsible` with `level: 3` | Collapsible heading 3 |
| `Collapsible Heading 4` | `collapsible` with `level: 4` | Collapsible heading 4 |

### Media & Inserts

| Item | Dispatches | Description |
| --- | --- | --- |
| `Link` | `InsertLink` | Insert a link (Link module required) |
| `Image` | `InsertImage` | Insert an image (Image module required) |
| `Table` | `InsertTable` | Insert a table (Table module required) |

> Built-in items never raise the `itemSelect` event for their default action — the editor dispatches the command itself.

---

## Configuring Slash Command Items

The `items` property controls which items appear in the popup. Override `items` to:

- **Restrict** to a subset of built-ins
- **Reorder** items — array order is the popup order
- **Add** custom items alongside built-ins
- **Remove** specific groups

### Example: Restrict to Basics

```html
<template>
  <ejs-richtexteditor-ui :slashCommandSettings="slashCommandSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

const slashCommandSettings = {
  enable: true,
  items: [
    'Paragraph',
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'BulletList',
    'NumberedList'
  ]
};
</script>
```

---

## Custom Slash Command Items

Extend the popup with custom commands not covered by built-ins. Each custom item is an object implementing the `ISlashCommandItem` interface:

### Item Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `string` | Yes | Label shown in the popup |
| `command` | `string` | Yes | Logical command name (used for identification in `itemSelect` and routing) |
| `iconCss` | `string` | No | CSS class for the leading icon (e.g., `'e-icons e-link'`) |
| `description` | `string` | No | Secondary text shown beneath the label |
| `type` | `string` | No | Group used to classify the item (e.g., `'Inline'`, `'Basic Block'`, `'Media'`) |

### Adding Custom Items

Mix built-in and custom items in the same array:

```html
<template>
  <ejs-richtexteditor-ui
    :slashCommandSettings="slashCommandSettings"
    @itemSelect="onSlashCommandItemSelect">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

const slashCommandSettings = {
  enable: true,
  items: [
    'Paragraph',
    'Heading 1',
    {
      text: 'Insert Date',
      command: 'insertDate',
      iconCss: 'e-icons e-date',
      description: 'Insert today\'s date',
      type: 'Inline'
    },
    {
      text: 'Horizontal Rule',
      command: 'horizontalLine',
      iconCss: 'e-icons e-horizontal-rule',
      description: 'Insert a separator line',
      type: 'Basic Block'
    }
  ]
};
</script>
```

When a custom item is selected, the editor does not dispatch any command on its own. Your `itemSelect` handler is responsible for the action.

---

## Handling itemSelect Events

The `itemSelect` event fires when the user picks an item from the popup. The handler receives `SlashCommandItemSelectArgs`:

### Event Arguments

| Property | Type | Description |
| --- | --- | --- |
| `isInteracted` | `boolean` | `true` if triggered by user interaction; `false` for programmatic selection |
| `item` | `HTMLLIElement` | The selected DOM list item |
| `itemData` | `ISlashCommandItem` | The data of the selected item from `slashCommandSettings.items` |
| `originalEvent` | `MouseEvent \| KeyboardEvent \| TouchEvent` | The underlying browser event |
| `cancel` | `boolean` | Set to `true` to suppress the editor's default command execution |

### Example: Custom Item Handler

```html
<template>
  <ejs-richtexteditor-ui
    ref="editor"
    :slashCommandSettings="slashCommandSettings"
    @itemSelect="onSlashCommandItemSelect">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const slashCommandSettings = {
  enable: true,
  items: [
    'Paragraph',
    'Heading 1',
    {
      text: 'Inline Code',
      command: 'applyInlineCode',
      iconCss: 'e-icons e-code',
      description: 'Wrap selection in inline code',
      type: 'Inline'
    },
    {
      text: 'Insert Date',
      command: 'insertDate',
      iconCss: 'e-icons e-date',
      description: 'Insert today\'s date',
      type: 'Inline'
    }
  ],
  itemSelect: onSlashCommandItemSelect
};

const onSlashCommandItemSelect = (args) => {
  if (args.itemData.command === 'applyInlineCode') {
    // Take over the action — cancel the default execution
    args.cancel = true;
    // Run the action through the editor's command pipeline
    editor.value.ej2Instances.commands().inlineCode().apply();
  } else if (args.itemData.command === 'insertDate') {
    args.cancel = true;
    const today = new Date().toLocaleDateString();
    // Insert the date using the insertText command (custom implementation)
    editor.value.ej2Instances.commands().insertText().text(today).apply();
  }
};
</script>
```

### Branch Multiple Commands

Use `args.itemData.command` to route multiple commands through a single handler:

```typescript
const onSlashCommandItemSelect = (args) => {
  const cmd = args.itemData.command;
  
  if (cmd === 'insertDate') {
    args.cancel = true;
    const date = new Date().toLocaleDateString();
    editor.value.ej2Instances.commands().insertText().text(date).apply();
  } else if (cmd === 'insertTime') {
    args.cancel = true;
    const time = new Date().toLocaleTimeString();
    editor.value.ej2Instances.commands().insertText().text(time).apply();
  }
};
```

---

## Customizing Popup Appearance

### Popup Size

Control popup dimensions with `popupWidth` and `popupHeight`:

```html
<template>
  <ejs-richtexteditor-ui :slashCommandSettings="slashCommandSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

const slashCommandSettings = {
  enable: true,
  popupWidth: 250,      // Pixel value
  popupHeight: 300      // Pixel value
};
</script>
```

Both properties accept:
- Pixel values: `250`, `300`
- CSS strings: `'250px'`, `'100%'`

---

## Selection and Lifecycle

### Filtering

Items are filtered as the user types after `/`. The match is against the item's `text` and `description` fields. Backspace restores the full list.

### Caret Restoration

The popup saves the editor's selection when filtering and restores it before executing the chosen command. The command always applies to the position where `/` was typed.

### Read-only & Disabled Editors

When the editor's `readonly` property is `true` or `enable` is `false`, the Slash command popup does not appear.

### Destroy

When the editor instance is destroyed, the Slash command module removes its listeners and tears down the popup. No manual cleanup is required.

---

## Complete Slash Command Example

```html
<template>
  <ejs-richtexteditor-ui
    ref="editor"
    :slashCommandSettings="slashCommandSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent, SlashCommand } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const slashCommandSettings = {
  enable: true,
  items: [
    // Built-in items
    'Paragraph',
    'Heading 1',
    'Heading 2',
    '|',  // Can be used as separator
    'BulletList',
    'NumberedList',
    'Checklist',
    '|',
    'Blockquote',
    'Info',
    'Warning',
    'Error',
    '|',
    // Custom items
    {
      text: 'Insert Date',
      command: 'insertDate',
      iconCss: 'e-icons e-date',
      description: 'Insert today\'s date',
      type: 'Inline'
    },
    {
      text: 'Insert Time',
      command: 'insertTime',
      iconCss: 'e-icons e-time',
      description: 'Insert current time',
      type: 'Inline'
    }
  ],
  popupWidth: 280,
  popupHeight: 400,
  itemSelect: onItemSelect
};

const onItemSelect = (args) => {
  const cmd = args.itemData.command;
  
  if (cmd === 'insertDate') {
    args.cancel = true;
    const date = new Date().toLocaleDateString();
    editor.value.ej2Instances.commands().insertText().text(date).apply();
  } else if (cmd === 'insertTime') {
    args.cancel = true;
    const time = new Date().toLocaleTimeString();
    editor.value.ej2Instances.commands().insertText().text(time).apply();
  }
};
</script>
```
