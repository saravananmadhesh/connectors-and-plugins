# Lists Reference

This reference covers bullet lists, numbered lists, checklists, list formatting, and list-related keyboard shortcuts in the Modern Rich Text Editor.

## Table of Contents

- [Overview](#overview)
- [List Types](#list-types)
- [Bullet Lists](#bullet-lists)
- [Numbered Lists](#numbered-lists)
- [Checklists](#checklists)
- [List Configuration](#list-configuration)
- [List Nesting](#list-nesting)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Programmatic List Control](#programmatic-list-control)
- [API References](#api-references)

---

## Overview

The Modern Rich Text Editor provides three primary list types for organizing and presenting content:

- **Numbered (Ordered) Lists** — Numeric, alphabetic, or Roman numeral markers
- **Bullet (Unordered) Lists** — Circular, square, or disc bullet styles
- **Checklists** — Interactive checkbox items for task management

---

## List Types

### Overview Table

| List Type | Purpose | Use Case |
| --- | --- | --- |
| **Numbered List** | Ordered lists with numeric formatting | Step-by-step instructions, sequences, ranked items |
| **Bullet List** | Unordered lists with bullet markers | Key points, feature lists, general items |
| **Checklist** | Interactive checkbox items | Task lists, requirements, verification items |

---

## Bullet Lists

Bullet lists display items with bullet markers (•, ○, ■) without sequential ordering.

### Supported Bullet Styles

| Style | HTML Value | Appearance |
| --- | --- | --- |
| Disc | `'disc'` | Filled circle (●) |
| Circle | `'circle'` | Hollow circle (○) |
| Square | `'square'` | Square (■) |

### Using Built-in Bullet List

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['BulletList']
};
</script>
```

### Customizing Bullet Styles

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :listSettings="listSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['BulletFormatList']
};

const listSettings = {
  bulletFormatListItems: [
    { text: 'Disc', listType: 'disc' },
    { text: 'Circle', listType: 'circle' },
    { text: 'Square', listType: 'square' },
    { text: 'Thumbs-Up', listType: '👍' }
  ]
};
</script>
```

### Programmatic Bullet List Control

```typescript
// Insert a bulleted list with default disc bullets
editor.value.ej2Instances.commands().bulletList().apply();

// Insert with specific bullet style
editor.value.ej2Instances.commands().bulletList().options({ listType: 'square' }).apply();

// Change bullet style of existing list
editor.value.ej2Instances.commands().setListStyle().options({ listType: 'circle' }).apply();
```

---

## Numbered Lists

Numbered lists display items in sequential order using numeric markers or custom numbering formats.

### Supported Number Formats

| Format | HTML Value | Example |
| --- | --- | --- |
| Decimal | `'decimal'` | 1, 2, 3, ... |
| Lowercase Alpha | `'lower-alpha'` | a, b, c, ... |
| Uppercase Alpha | `'upper-alpha'` | A, B, C, ... |
| Lowercase Roman | `'lower-roman'` | i, ii, iii, ... |
| Uppercase Roman | `'upper-roman'` | I, II, III, ... |
| Lowercase Greek | `'lower-greek'` | α, β, γ, ... |

### Using Built-in Numbered List

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['NumberedList']
};
</script>
```

### Customizing Number Formats

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :listSettings="listSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['NumberFormatList']
};

const listSettings = {
  numberFormatListItems: [
    { text: 'Decimal', listType: 'decimal' },
    { text: 'Roman', listType: 'upper-roman' },
    { text: 'Lowercase Alpha', listType: 'lower-alpha' },
    { text: 'Uppercase Alpha', listType: 'upper-alpha' }
  ]
};
</script>
```

### Programmatic Numbered List Control

```typescript
// Insert a numbered list with default decimal format
editor.value.ej2Instances.commands().numberedList().apply();

// Insert with specific format
editor.value.ej2Instances.commands().numberedList().options({ listType: 'upper-roman' }).apply();

// Change format of existing list
editor.value.ej2Instances.commands().setListStyle().options({ listType: 'lower-alpha' }).apply();
```

---

## Checklists

Checklists display items with interactive checkboxes, allowing users to mark items as complete or incomplete.

### Checkbox Shapes

The `checklistType` property defines the visual shape of checkboxes.

| Shape | HTML | Representation |
| --- | --- | --- |
| **Square** | `'Square'` | □ (unchecked), ☑ (checked) |
| **Circle** | `'Circle'` | ○ (unchecked), ◉ (checked) |

### Using Checklists

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :listSettings="listSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Checklist']
};

const listSettings = {
  checklistType: 'Square'  // or 'Circle'
};
</script>
```

### Programmatic Checklist Control

```typescript
// Insert a checklist at the current cursor position
editor.value.ej2Instances.commands().toggleTaskList().apply();

// Change checkbox shape at runtime
editor.value.ej2Instances.listSettings.checklistType = 'Circle';
```

---

## List Configuration

### Full List Configuration

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :listSettings="listSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'BulletList', 'NumberedList', 'Checklist', '|',
    'BulletFormatList', 'NumberFormatList'
  ]
};

const listSettings = {
  bulletFormatListItems: [
    { text: 'Disc', listType: 'disc' },
    { text: 'Circle', listType: 'circle' },
    { text: 'Square', listType: 'square' }
  ],
  numberFormatListItems: [
    { text: 'Decimal', listType: 'decimal' },
    { text: 'Lower Roman', listType: 'lower-roman' },
    { text: 'Upper Roman', listType: 'upper-roman' },
    { text: 'Lower Alpha', listType: 'lower-alpha' },
    { text: 'Upper Alpha', listType: 'upper-alpha' },
    { text: 'Lower Greek', listType: 'lower-greek' }
  ],
  checklistType: 'Square'
};
</script>
```

---

## List Nesting

Nest lists by indenting items with the Tab key or using the Indent toolbar button.

### Create Nested Lists

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'BulletList', 'NumberedList', '|',
    'Indent', 'Outdent'
  ]
};
</script>
```

**Manual nesting:**
1. Create a list item
2. Press <kbd>Tab</kbd> to indent and create a nested list
3. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> to outdent and return to parent level

### Programmatic Indentation

```typescript
// Increase indentation
editor.value.ej2Instances.commands().indent().apply();

// Decrease indentation
editor.value.ej2Instances.commands().outdent().apply();
```

---

## Keyboard Shortcuts

### List Shortcuts

| Action | Windows/Linux | macOS | Description |
| --- | --- | --- | --- |
| **Ordered List** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> | Insert or toggle numbered list |
| **Unordered List** | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd> | <kbd>⌘</kbd>+<kbd>Option</kbd>+<kbd>O</kbd> | Insert or toggle bulleted list |
| **Checklist** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> | Insert or toggle checklist |
| **Indent** | <kbd>Tab</kbd> | <kbd>Tab</kbd> | Increase indentation level |
| **Outdent** | <kbd>Shift</kbd>+<kbd>Tab</kbd> | <kbd>Shift</kbd>+<kbd>Tab</kbd> | Decrease indentation level |

**Indentation Notes:**
- In a list, pressing <kbd>Tab</kbd> indents the current item (creating a nested list). Pressing <kbd>Shift</kbd>+<kbd>Tab</kbd> outdents.
- Outside a list, <kbd>Tab</kbd> may insert a tab character (behavior depends on editor configuration).
- Outdenting the first level of a list converts it back to a paragraph.

---

## Programmatic List Control

### Common List Operations

```html
<template>
  <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
  <div style="margin-top: 15px;">
    <button @click="createBulletList">Create Bullet List</button>
    <button @click="createNumberedList">Create Numbered List</button>
    <button @click="createChecklist">Create Checklist</button>
    <button @click="changeListStyle">Change List Style</button>
    <button @click="indent">Indent</button>
    <button @click="outdent">Outdent</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const createBulletList = () => {
  editor.value.ej2Instances.commands().bulletList().apply();
};

const createNumberedList = () => {
  editor.value.ej2Instances.commands().numberedList().apply();
};

const createChecklist = () => {
  editor.value.ej2Instances.commands().toggleTaskList().apply();
};

const changeListStyle = () => {
  // Change current list style to square bullets
  editor.value.ej2Instances.commands().bulletList().options({ listType: 'square' }).apply();
};

const indent = () => {
  editor.value.ej2Instances.commands().indent().apply();
};

const outdent = () => {
  editor.value.ej2Instances.commands().outdent().apply();
};
</script>
```

### Toggle Lists

Apply the same list command twice to toggle the list off:

```typescript
// First application: creates a bullet list
editor.value.ej2Instances.commands().bulletList().apply();

// Second application: removes the bullet list (reverts to paragraph)
editor.value.ej2Instances.commands().bulletList().apply();
```

---

## Complete List Example

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :listSettings="listSettings"
    placeholder="Type something ...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'BulletList', 'NumberedList', 'Checklist', '|',
    'BulletFormatList', 'NumberFormatList', '|',
    'Indent', 'Outdent', '|',
    'Undo', 'Redo'
  ]
};

const listSettings = {
  bulletFormatListItems: [
    { text: 'Disc', listType: 'disc' },
    { text: 'Circle', listType: 'circle' },
    { text: 'Square', listType: 'square' }
  ],
  numberFormatListItems: [
    { text: 'Number', listType: 'decimal' },
    { text: 'Lower Roman', listType: 'lower-roman' },
    { text: 'Upper Roman', listType: 'upper-roman' },
    { text: 'Lower Alpha', listType: 'lower-alpha' },
    { text: 'Upper Alpha', listType: 'upper-alpha' },
    { text: 'Lower Greek', listType: 'lower-greek' }
  ],
  checklistType: 'Square'
};
</script>
```

---

## API References

### ChecklistCommandBuilder

Insert or toggle checklist items.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/checklistcommandbuilder`

**Usage Example:**

```typescript
editor.value?.executeCommand({
  command: 'Checklist',
  value: {
    items: [
      { text: 'Task 1', checked: false },
      { text: 'Task 2', checked: true }
    ]
  }
});
```

---

## Related Documentation

- [Formatting](formatting.md)
- [Keyboard Support](keyboard-support.md)
- [Getting Started](getting-started.md)
