# Context Menu

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Default Context Menu Items](#default-context-menu-items)
- [Basic Default Context Menu](#basic-default-context-menu)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Custom Menu Item Properties](#custom-menu-item-properties)
- [Context Menu Target Areas](#context-menu-target-areas)

## When to Use

Use context menu when you need to:
- **Right-click actions** - Quick access without toolbar
- **Row operations** - Edit, delete, expand, collapse rows
- **Column operations** - Sort, auto-fit, resize columns
- **Data export** - Quick export to PDF/Excel/CSV
- **Custom actions** - Define app-specific menu items
- **Dynamic menus** - Show/hide items based on data
- **Pagination** - Navigate pages via context menu
- **Hierarchy operations** - Indent/outdent tree nodes
- **Selection actions** - Act on selected rows/cells

## Mandatory Rules

Before implementing context menu:
- ✓ **ContextMenu Module**: Provide `ContextMenu` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **contextMenuItems Property**: Define array of menu items or use default items
- ✓ **Right-Click Behavior**: context menu appears on right-click by default
- ✓ **Item Text Match**: Ensure item conditions check correct field names
- ✓ **Event Handlers**: Implement contextMenuOpen and contextMenuClick events
- ✓ **Module Provision**: Provide additional modules based on menu actions (Edit, Sort, etc.)

## Default Context Menu Items

Right-click to access these default items:

| Item | Target | Action | Requirement |
|------|--------|--------|-------------|
| AutoFit | Header/Column | Auto-fit column width | N/A |
| AutoFitAll | Header/Column | Auto-fit all columns | N/A |
| Edit | Content | Edit current record | Edit module |
| Delete | Content | Delete current record | Edit module |
| Save | Content | Save edited record | Edit module |
| Cancel | Content | Cancel editing | Edit module |
| PdfExport | Content | Export to PDF | PdfExport module |
| ExcelExport | Content | Export to Excel | ExcelExport module |
| CsvExport | Content | Export to CSV | N/A |
| SortAscending | Header/Column | Sort ascending | Sort module |
| SortDescending | Header/Column | Sort descending | Sort module |
| FirstPage | Pager | Go to first page | Page module |
| PrevPage | Pager | Go to previous page | Page module |
| LastPage | Pager | Go to last page | Page module |
| NextPage | Pager | Go to next page | Page module |
| AddRow | Content | Add new row | Edit module |
| Indent | Content | Indent hierarchy | N/A |
| Outdent | Content | Outdent hierarchy | N/A |

## Basic Default Context Menu

Enable all default context menu items:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :allowSorting="true"
    :allowResizing="true"
    :allowPdfExport="true"
    :allowExcelExport="true"
    :editSettings="editSettings"
    :pageSettings="pageSettings"
    :contextMenuItems="contextMenuItems">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Resize, Sort, ContextMenu, Edit, Page, PdfExport, ExcelExport, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

const editSettings = ref({
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
});

const pageSettings = ref({ pageSize: 10 });

// Default context menu items
const contextMenuItems = ref([
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
  'AddRow',
  'Indent',
  'Outdent'
]);

provide('treegrid', [Resize, Sort, ContextMenu, Edit, Page, PdfExport, ExcelExport]);
</script>
```

## Custom Context Menu Items

Create custom menu items with specific actions:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings"
    :contextMenuItems="contextMenuItems"
    @contextMenuOpen="onContextMenuOpen"
    @contextMenuClick="onContextMenuClick">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { ContextMenu, Page } from '@syncfusion/ej2-vue-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';

const gridInstance = ref(null);
const data = ref([...]);
const pageSettings = ref({ pageSize: 10 });

// Custom context menu items for hierarchy operations
const contextMenuItems = ref([
  {
    text: 'Collapse the Row',
    target: '.e-content',
    id: 'collapserow'
  },
  {
    text: 'Expand the Row',
    target: '.e-content',
    id: 'expandrow'
  }
]);

// Show/hide items based on row data
const onContextMenuOpen = (args) => {
};

// Handle custom menu actions
const onContextMenuClick = (args) => {
};

provide('treegrid', [ContextMenu, Page]);
</script>
```

## Custom Menu Item Properties

```javascript
const contextMenuItems = [
  {
    text: 'Menu Item Text',          // Display text in menu
    target: '.e-content',             // Scope: '.e-content' (rows), '.e-headercell' (headers)
    id: 'unique_item_id',             // Unique identifier for item
    iconCss: 'e-icons e-edit-icon',   // Optional: CSS class for icon
    separator: false                  // Optional: Add separator line after item
  }
];
```

## Context Menu Target Areas

| Target | Location | Use Case |
|--------|----------|----------|
| `.e-content` | Data rows/cells | Row operations (edit, delete, indent) |
| `.e-headercell` | Column headers | Column operations (sort, auto-fit) |
| `.e-gridpager` | Pager area | Pagination (first, previous, next, last page) |
