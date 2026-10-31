# Clipboard

## Table of Contents
- [When to Use](#when-to-use)
- [Copy to Clipboard](#copy-to-clipboard)
- [Copy with Headers](#copy-with-headers)
- [Copy via External Buttons](#copy-via-external-buttons)
- [AutoFill](#autofill)
- [Paste](#paste)

## When to Use

Use this reference when you need to:
- Enable copy-to-clipboard functionality for grid data
- Support keyboard shortcuts (Ctrl+C, Ctrl+Shift+H) for copying
- Copy selected rows or cells with/without headers
- Implement autofill by dragging
- Support paste operations in grid cells
- Create custom copy behavior

## Copy to Clipboard

The clipboard feature allows you to copy selected rows or cells data into the clipboard using keyboard shortcuts.

### Keyboard Shortcuts for Copy Operations

| Shortcut | Action |
|----------|--------|
| Ctrl + C | Copy selected rows or cells data into clipboard |
| Ctrl + Shift + H | Copy selected rows or cells data with header into clipboard |

### Basic Clipboard Setup

```vue
<template>
  <div id="app">
    <ejs-grid :dataSource='data' height='315px' :selectionSettings='selectionOptions'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=100></e-column>
        <e-column field='ShipCity' headerText='Ship City' width=100></e-column>
        <e-column field='ShipName' headerText='Ship Name' width=130></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { data } from './datasource.js';

const selectionOptions = { type: 'Multiple'};
</script>

<style>
  @import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
  @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material3.css";
</style>
```

## Copy with Headers

Copy selected data including column headers into the clipboard:

```vue
<template>
  <div id="app">
    <ejs-button id='copyHeader' @click='copyHeader'>Copy with Headers</ejs-button>
    <ejs-grid ref='grid' style="padding: 5px 5px" :dataSource='data' height='280px' :selectionSettings='selectionOptions'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=100></e-column>
        <e-column field='ShipCity' headerText='Ship City' width=100></e-column>
        <e-column field='ShipName' headerText='Ship Name' width=120></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { ButtonComponent as EjsButton} from "@syncfusion/ej2-vue-buttons";
import { data } from './datasource.js';
import { ref } from 'vue';

const grid = ref(null);
const selectionOptions = { type: 'Multiple'};

const copyHeader = function() {
  grid.value.copy(true);  // true = include headers
}
</script>
```

## Copy via External Buttons

Use external buttons to trigger copy operations programmatically with the `copy()` method:

```vue
<template>
  <div id="app">
    <ejs-button id='copy' @click='copy'>Copy</ejs-button>
    <ejs-button id='copyHeader' @click='copyHeader'>Copy with Header</ejs-button>
    <ejs-grid ref='grid' style="padding: 5px 5px" :dataSource='data' height='280px' :selectionSettings='selectionOptions'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=100></e-column>
        <e-column field='ShipCity' headerText='Ship City' width=100></e-column>
        <e-column field='ShipName' headerText='Ship Name' width=120></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { ButtonComponent as EjsButton} from "@syncfusion/ej2-vue-buttons";
import { data } from './datasource.js';
import { ref } from 'vue';

const grid = ref(null);
const selectionOptions = { type: 'Multiple'};

const copy = function() {
  grid.value.copy();      // Copy without headers
}

const copyHeader = function() {
  grid.value.copy(true);  // Copy with headers
}
</script>
```

## AutoFill

### Enable AutoFill Feature

The AutoFill feature allows you to copy data from selected cells and paste into other cells by dragging the autofill icon. 

**Requirements:**
- Selection `mode` must be Cell
- `cellSelectionMode` must be Box
- `editMode` must be Batch

```vue
<template>
  <div id="app">
    <ejs-grid 
      :dataSource='data' 
      :enableAutoFill="true" 
      :selectionSettings='selectionOptions' 
      :editSettings='editSettings'
      :toolbar='toolbar' 
      height='273px'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' :isPrimaryKey='true' :visible='false' width=120></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=150></e-column>
        <e-column field='ShipCity' headerText='Ship City' width=150></e-column>
        <e-column field='ShipCountry' headerText='ShipCountry' width=150></e-column>
        <e-column field='ShipName' headerText='Ship Name' width=150></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, Edit } from "@syncfusion/ej2-vue-grids";
import { data } from './datasource.js';

const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
const toolbar = ['Add', 'Update', 'Cancel'];
const selectionOptions = { type: 'Multiple', mode: 'Cell', cellSelectionMode: 'Box' };

provide('grid', [Edit, Toolbar]);
</script>
```

### How to Use AutoFill

1. Select the cells from which you want to copy data
2. Hover over the bottom-right corner of the selection to reveal the autofill icon
3. Click and hold the autofill icon, then drag to target cells
4. Release the mouse to complete the autofill action

### AutoFill Limitations

- Does NOT automatically convert string values to number or date types
- String data dragged to number-type cells will display NaN
- String-type cells dragged to date-type cells display empty
- Cannot generate non-linear series or sequential data automatically
- Autofill feature only applies to viewport cell with virtual/infinite scrolling or column virtualization enabled

## Paste

### Enable Paste Functionality

Paste feature allows you to copy content and paste it into another set of cells. Requires same settings as AutoFill:
- Selection `mode` must be Cell
- `cellSelectionMode` must be Box
- Batch Editing must be enabled

```vue
<template>
  <div id="app">
    <ejs-grid 
      :dataSource='data' 
      :selectionSettings='selectionOptions' 
      :editSettings='editSettings' 
      :toolbar='toolbar'
      height='273px'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' :isPrimaryKey='true' :visible='false' width=120></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=150></e-column>
        <e-column field='ShipCity' headerText='Ship City' width=150></e-column>
        <e-column field='ShipCountry' headerText='ShipCountry' width=150></e-column>
        <e-column field='ShipName' headerText='Ship Name' width=150></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, Edit } from "@syncfusion/ej2-vue-grids";
import { data } from './datasource.js';

const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
const toolbar = ['Add', 'Update', 'Cancel'];
const selectionOptions = { type: 'Multiple', mode: 'Cell', cellSelectionMode: 'Box' };

provide('grid', [Edit, Toolbar]);
</script>
```

### How to Use Paste

1. Select cells from which you want to copy content
2. Press Ctrl + C to copy selected cells to clipboard
3. Select target cells where you want to paste
4. Press Ctrl + V to paste the copied content

### Paste Limitations

- Does NOT automatically convert string values to number or date types
- String data pasted to number-type cells displays NaN
- String-type cells pasted to date-type cells display empty
- Ensure data types are compatible before pasting
