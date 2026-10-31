# Accessibility

## Table of Contents
- [When to Use](#when-to-use)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Custom Keyboard Shortcuts](#custom-keyboard-shortcuts)
- [Preventing Default Key Behavior](#preventing-default-key-behavior)

## When to Use

Use this reference when you need to:
- Implement WAI-ARIA attributes for accessibility compliance
- Enable keyboard navigation for users who don't use a mouse
- Configure custom keyboard shortcuts for your grid
- Support screen readers and assistive technologies
- Meet WCAG accessibility standards
- Provide keyboard alternatives for all grid actions

## WAI-ARIA Attributes

The Grid component follows WAI-ARIA patterns to meet accessibility standards. The following ARIA attributes are used throughout the Grid:

### Grid Structure Roles

| Attribute | Purpose |
|-----------|---------|
| role=grid | Represents the element containing the grid component |
| role=row | Represents the element containing cells of the row |
| role=rowgroup | Represents the group of rows in the grid |
| role=columnheader | Represents header cell information for a column |
| role=gridcell | Represents a cell in the grid component |
| role=button | Represents an element acting as a button |
| role=search | Represents search region elements |
| role=presentation | Represents elements not available for accessibility |
| role=navigation | Represents pager elements for navigation |

### ARIA State and Property Attributes

| Attribute | Purpose |
|-----------|---------|
| aria-colindex | Defines column index with respect to total columns |
| aria-rowindex | Defines row index with respect to total rows |
| aria-rowspan | Defines number of rows spanned by a cell |
| aria-colspan | Defines number of columns spanned by a cell |
| aria-rowcount | Defines total number of rows in grid |
| aria-colcount | Defines total number of columns in grid |
| aria-selected | Indicates current "selected" state of rows and cells |
| aria-expanded | Indicates if expand/collapse icon is expanded or collapsed |
| aria-sort | Indicates whether data is sorted ascending or descending |
| aria-busy | Indicates element is being modified |
| aria-owns | Identifies element to define visual, functional, contextual relationship |
| aria-hidden | Hides element from accessibility concerns |
| aria-labelledby | Provides accessible name for checkbox labels |
| aria-describedby | Provides description about enabled features |

### Grid Architecture Note

The Grid uses a two-table architecture for header and content to enhance accessibility. Roles and ARIA attributes are incorporated for both grid parent and child elements, though some limitations may exist with accessibility checker tools that do not affect screen reader readability.

## Keyboard Navigation

### Pager Navigation

| Shortcut | Mac | Action |
|----------|-----|--------|
| Tab | Tab | Focus next pager item |
| Shift + Tab | Shift + Tab | Focus previous pager item |
| Enter / Space | Enter / Space | Select currently focused page |
| PageUp / Left Arrow | Left Arrow | Navigate to previous page |
| PageDown / Right Arrow | Right Arrow | Navigate to next page |
| Home / Ctrl + Alt + PageUp | Fn + Left Arrow | Navigate to first page |
| End / Ctrl + Alt + PageDown | Fn + Right Arrow | Navigate to last page |

### Focus Elements Navigation

| Shortcut | Mac | Action |
|----------|-----|--------|
| Tab | Tab | Focus next element |
| Shift + Tab | Shift + Tab | Focus previous element |
| Home | Fn + Left Arrow | Move focus to first cell of focused row |
| End | Fn + Right Arrow | Move focus to last cell of focused row |
| Ctrl + Home | Command + Fn + Left | Move focus to first cell in grid |
| Ctrl + End | Command + Fn + Right | Move focus to last cell in grid |
| Up Arrow | Up Arrow | Move cell focus upward |
| Down Arrow | Down Arrow | Move cell focus downward |
| Right Arrow | Right Arrow | Move cell focus right |
| Left Arrow | Left Arrow | Move cell focus left |
| Alt + J | Alt + J | Move focus to entire grid |
| Alt + W | Alt + W | Move focus to grid content element |

### Selection Navigation

| Shortcut | Mac | Action |
|----------|-----|--------|
| Up Arrow | Up Arrow | Move up row/cell selection |
| Down Arrow | Down Arrow | Move down row/cell selection |
| Right Arrow | Right Arrow | Move right cell selection |
| Left Arrow | Left Arrow | Move left cell selection |
| Shift + Up Arrow | Shift + Up Arrow | Extend selection upward |
| Shift + Down Arrow | Shift + Down Arrow | Extend selection downward |
| Shift + Right Arrow | Shift + Right Arrow | Extend cell selection right |
| Shift + Left Arrow | Shift + Left Arrow | Extend cell selection left |
| Enter | Enter | Move selection downward |
| Shift + Enter | Shift + Enter | Move selection upward |
| Esc | Esc | Deselect all rows/cells |
| Ctrl + A | Ctrl + A | Select all rows/cells on current page |

### Grouping Keyboard Shortcuts

| Shortcut | Mac | Action |
|----------|-----|--------|
| Ctrl + Up Arrow | Command + Up Arrow | Collapse all visible groups |
| Ctrl + Down Arrow | Command + Down Arrow | Expand all visible groups |
| Ctrl + Space | Ctrl + Space | Perform grouping on header |
| Enter | Enter | Expand/collapse current group |

### Editing Keyboard Shortcuts

| Shortcut | Mac | Action |
|----------|-----|--------|
| F2 | F2 | Start editing selected row/cell |
| Enter | Enter | Save form or move to next row |
| Insert | Ctrl + Command + Enter | Create new add form |
| Delete | Delete | Delete current selected record |
| Tab | Tab | Navigate to next editable cell |
| Shift + Tab | Shift + Tab | Navigate to previous editable cell |
| Shift + Enter | Shift + Enter | Save and edit previous row cell |

### Other Shortcuts

| Shortcut | Mac | Action |
|----------|-----|--------|
| Ctrl + P | Command + P | Print grid |
| Ctrl + C | Command + C | Copy selected data |
| Ctrl + Shift + H | Ctrl + Shift + H | Copy with header |
| Alt + Down | Alt + Down | Open filter/column menu |
| Ctrl + Left/Right | Command + Left/Right | Reorder columns |
| Enter | Enter | Sort column |
| Ctrl + Enter | Command + Enter | Multi-sort column |
| Shift + Enter | Shift + Enter | Clear column sorting |

## Preventing Default Key Behavior

### Prevent Default Key Action Behavior

Use the `keyPressed` event to prevent default behavior for specific keys:

```vue
<template>
  <ejs-grid :dataSource="data" :keyPressed="keyPressed">
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width=100></e-column>
      <e-column field='ShipCity' headerText='Ship City' width=100></e-column>
      <e-column field='ShipName' headerText='Shipped Name' width=120></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { data } from './datasource.js';

const keyPressed = function (args) {
  if (args.keyCode === 13) {
    // Prevent the default Enter key action
    args.cancel = true;
  }
}
</script>
```

## Custom Keyboard Shortcuts

### Implement Custom Shortcuts for Grid Actions

Use the `keyPressed` event to define custom keyboard shortcuts:

```vue
<template>
  <ejs-grid 
    ref='grid' 
    :dataSource="data" 
    :keyPressed="keyPressed" 
    :allowGrouping='true' 
    :toolbar="toolbar"
    :editSettings='editSettings' 
    :selectionSettings='selectionSettings'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' textAlign='Right' :isPrimaryKey='true' width=90></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
      <e-column field='ShipCountry' headerText='Ship Country' width=140></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { provide, ref } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, Edit, Group } from "@syncfusion/ej2-vue-grids";
import { data } from './datasource.js';

const grid = ref(null)
const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
const selectionSettings = { type: 'Multiple' };
const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };

const keyPressed = function (e) {
  const key = e.key.toLowerCase();
  switch (key) {
    case 'n':
      e.preventDefault();
      grid.value.addRecord();
      break;
    case 's':
      if (e.ctrlKey) {
        e.preventDefault();
        grid.value.endEdit();
      }
      break;
    case 'd':
      if (e.ctrlKey) {
        e.preventDefault();
        grid.value.deleteRecord();
      }
      break;
    case 'a':
      if (e.ctrlKey) {
        e.preventDefault();
        grid.value.selectRowsByRange(0);
      }
      break;
    case 'g':
      if (e.ctrlKey) {
        e.preventDefault();
        grid.value.groupColumn('CustomerID');
      }
      break;
    // Add more custom shortcuts as needed
  }
};

provide('grid', [Group, Toolbar, Edit]);
</script>
```

### Common Custom Shortcuts

- **N** - Add new record
- **Ctrl + S** - Save record
- **Ctrl + D** - Delete record
- **Ctrl + A** - Select all rows
- **Ctrl + G** - Group by column
