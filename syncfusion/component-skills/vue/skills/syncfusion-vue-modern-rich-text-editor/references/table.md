# Tables in Vue Modern Rich Text Editor

## Table of Contents

- [Overview](#overview)
- [Inserting Tables](#inserting-tables)
- [Table Operations](#table-operations)
- [Configuration](#configuration)
- [Example](#example)
- [API References](#api-references)

---

## Overview

The Modern Rich Text Editor provides comprehensive support for table creation and manipulation through:
- **Toolbar:** `Table` button for quick insertion
- **Slash Commands:** `/table` command
- **Quick Toolbar:** Context-sensitive toolbar for table operations

Tables support standard operations like inserting/deleting rows and columns, with customizable quick toolbar items.

---

## Inserting Tables

### Via Toolbar

1. Place cursor where you want to insert a table
2. Click the **Table** button in the toolbar
3. Select table dimensions from the popup grid
4. Table is inserted at cursor position

### Via Slash Command

```
Type: /table
Press: Enter
```

A default table (3×3) is inserted at the cursor position.

---

## Table Operations

### Available Quick Toolbar Items

- `InsertRowBefore` — Insert row above current row
- `InsertRowAfter` — Insert row below current row
- `InsertColumnBefore` — Insert column before current column
- `InsertColumnAfter` — Insert column after current column
- `DeleteRow` — Delete current row
- `DeleteColumn` — Delete current column
- `DeleteTable` — Delete entire table
- `TableCellProperties` — Open cell formatting dialog

---

## Configuration

### Basic Configuration

```typescript
const toolbarSettings = {
  items: ['Table']
};

const tableSettings = {
  minWidth: 100,
  maxWidth: 1200,
  minHeight: 50,
  maxHeight: 600
};
```

### Quick Toolbar Configuration

```typescript
const quickToolbarSettings = {
  table: [
    'InsertRowBefore', 'InsertRowAfter', '|',
    'InsertColumnBefore', 'InsertColumnAfter', '|',
    'DeleteRow', 'DeleteColumn', '|',
    'DeleteTable', 'TableCellProperties'
  ]
};
```

---

## Example

Complete example with table support:

```vue
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :tableSettings="tableSettings"
    :quickToolbarSettings="quickToolbarSettings"
    placeholder="Insert a table with /table command or toolbar...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = ref({
  items: ['Table']
});

const tableSettings = ref({
  minWidth: 100,
  maxWidth: 1200,
  minHeight: 50,
  maxHeight: 600
});

const quickToolbarSettings = ref({
  table: [
    'InsertRowBefore', 'InsertRowAfter', '|',
    'InsertColumnBefore', 'InsertColumnAfter', '|',
    'DeleteRow', 'DeleteColumn', '|',
    'DeleteTable', 'TableCellProperties'
  ]
});
</script>
```

---

## Keyboard Shortcuts

### Insert Table

**Windows/Linux:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>
**macOS:** <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>

Opens the table insertion grid/dialog to create a new table.

---

## API References

### TableSettings Property

Configuration for table insertion and behavior.

**Location:** [TableSettings API](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/tablesettings)

**TableSettingsModel Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minWidth` | `number` | 0 | Minimum table width in pixels |
| `maxWidth` | `number` | 1200 | Maximum table width in pixels |
| `minHeight` | `number` | 0 | Minimum table height in pixels |
| `maxHeight` | `number` | 600 | Maximum table height in pixels |

**Example:**
```typescript
const tableSettings = ref({
  minWidth: 100,
  maxWidth: 1200,
  minHeight: 50,
  maxHeight: 600
});

const toolbarSettings = ref({
  items: ['Table']
});
```

**Official API Reference:**
- [TableSettings](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/tablesettings)
- [TableSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/tablesettingsmodel)

---

### TableQuickToolbarItem

Quick toolbar items for table operations.

**Location:** [TableQuickToolbarItem API](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/tablequicktoolbaritem)

**Available Items:**
- `InsertRowBefore` — Insert row above
- `InsertRowAfter` — Insert row below
- `InsertColumnBefore` — Insert column before
- `InsertColumnAfter` — Insert column after
- `DeleteRow` — Delete row
- `DeleteColumn` — Delete column
- `DeleteTable` — Delete entire table
- `TableCellProperties` — Cell formatting

**Example:**
```typescript
const quickToolbarSettings = ref({
  table: [
    'InsertRowBefore', 'InsertRowAfter', '|',
    'InsertColumnBefore', 'InsertColumnAfter', '|',
    'DeleteRow', 'DeleteColumn', '|',
    'DeleteTable', 'TableCellProperties'
  ]
});
```

**Official API Reference:** [TableQuickToolbarItem](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/tablequicktoolbaritem)

---

## Related Documentation

- [Getting Started](getting-started.md)
- [Features](features.md)
- [Editor Methods](editor-methods.md)
