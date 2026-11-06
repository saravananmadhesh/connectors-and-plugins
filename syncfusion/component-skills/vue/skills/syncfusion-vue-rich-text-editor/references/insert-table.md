# Inserting Tables

Tables can be inserted in both HTML mode and Markdown mode. Inject the `Table` module.

## HTML Mode Table Insertion

```vue
<template>
  <ejs-richtexteditor :toolbarSettings="toolbarSettings" />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'CreateTable', '|', 'Undo', 'Redo']
};
provide('richtexteditor', [Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar]);
</script>
```

When the user clicks `CreateTable`, a grid picker appears to select rows and columns. By default, an inserted table has:
- 2 rows and 2 columns
- A header row

## Table Quick Toolbar (HTML Mode)

After inserting a table, clicking inside it shows the table quick toolbar. Configure it via `quickToolbarSettings.table`:

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :quickToolbarSettings="quickToolbarSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Table, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = { items: ['CreateTable'] };
const quickToolbarSettings = {
  table: [
    'TableHeader',
    'TableRows',
    'TableColumns',
    'TableCellHorizontalAlign',
    'TableCellVerticalAlign',
    'TableEditProperties',
    'TableRemove'
  ]
};
provide('richtexteditor', [Toolbar, Link, Table, HtmlEditor, QuickToolbar]);
</script>
```

**Table quick toolbar items:**
- `TableHeader` — Toggle the header row on/off
- `TableRows` — Insert row above/below or delete selected row
- `TableColumns` — Insert column left/right or delete selected column
- `TableCellHorizontalAlign` — Align cell content: left, center, right, justify
- `TableCellVerticalAlign` — Align cell content: top, middle, bottom
- `TableEditProperties` — Open dialog to edit table width, padding, cell spacing
- `TableRemove` — Delete the entire table

## Markdown Mode Table Insertion

In Markdown mode, inject `MarkdownEditor` and add `CreateTable` to the toolbar. This inserts a Markdown-formatted table:

```vue
<template>
  <ejs-richtexteditor
    editorMode="Markdown"
    :toolbarSettings="toolbarSettings"
    :value="value"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, MarkdownEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo']
};
const value = 'Type here and use the toolbar to insert a table.';
provide('richtexteditor', [Toolbar, Link, Image, Table, MarkdownEditor]);
</script>
```

A Markdown table is inserted as:
```
| Heading 1 | Heading 2 |
| --------- | --------- |
|           |           |
```

> The table quick toolbar is not available in Markdown mode — tables are edited as raw Markdown text.
