# Printing

## Table of Contents
- [When to Use](#when-to-use)
- [Enable Printing](#enable-printing)
- [Print Toolbar](#print-toolbar)
- [Print Modes](#print-modes)
- [Print Customization](#print-customization)
- [Print Events](#print-events)

## When to Use

Use this reference when you need to:
- Enable grid printing functionality
- Configure print modes (current page, selected, all records)
- Customize print templates and appearance
- Configure print toolbar actions
- Handle print events
- Set print orientation and page settings

## Enable Printing

### Basic Printing
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :toolbar="toolbar"
    :toolbarClick="handleToolbarClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const toolbar = ['Print'];

const handleToolbarClick = (args) => {
  if (gridInstance.ej2Instances.id + '_print' === args.item.id) {
    gridInstance.ej2Instances.print();
  }
};

provide('grid', [Toolbar]);
</script>
```

## Print Toolbar

Add print to toolbar with other options:

```vue
<script setup>
const toolbar = ['Add', 'Edit', 'Delete', 'Print', 'ExcelExport', 'PdfExport'];
</script>
```

## Print Modes

### Print All Pages
Print complete grid data across all pages:

```javascript
const printMode = 'AllPages';  // Default - prints all records
gridInstance.print(false, false);
```

### Print Current Page
Print only the current page when paging is enabled:

```javascript
const printMode = 'CurrentPage';
gridInstance.print(false, true);  // Current page only
```

### Print Specific Rows
Print only selected rows:

```javascript
const selectedIndices = gridInstance.getSelectedRowIndexes();
gridInstance.printRows(selectedIndices);
```

**Note:** For printing to work properly, configure `printMode` in the grid:

```vue
<script setup>
const printSettings = {
  printMode: 'AllPages'  // or 'CurrentPage'
};
</script>
```

## Print Customization

### Print Hierarchy Grid
For grids with master-detail relationships, control what gets printed:

```javascript
const printSettings = {
  printMode: 'AllPages',
  hierarchyPrintMode: 'All'  // 'All', 'Parent', 'Child'
};
```

**Options:**
- **`All`** - Print parent and child grids
- **`Parent`** - Print parent records only
- **`Child`** - Print expanded child records only

### Custom Print Content
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :onBeforePrint="handleBeforePrint">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleBeforePrint = (args) => {
  // Modify print content
  args.gridContent = '<div class="print-header"><h2>Order Report</h2></div>' + args.gridContent;
};
</script>
```

### Print Specific Columns Only
```javascript
// Hide columns before printing
gridInstance.columns[2].visible = false;  // Hide column 2
gridInstance.print();
gridInstance.columns[2].visible = true;   // Show column again
```

### Print with External Button
```vue
<template>
  <button @click="printCurrentPage" class="btn btn-primary">Print Page</button>
  <ejs-grid :dataSource="data" ref="gridRef">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const gridRef = ref(null);

const printCurrentPage = () => {
  if (gridRef.value) {
    // Print current page only
    const printMethod = gridRef.value.ej2Instances.print;
    printMethod.call(gridRef.value.ej2Instances, false, true);
  }
};
</script>
```

## Print Events

### Before Print
```vue
<template>
  <ejs-grid :beforePrint="handleBeforePrint">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleBeforePrint = (args) => {
  console.log('Before print:', args.gridContent);
};
</script>
```

### After Print
```javascript
gridInstance.addEventListener('afterPrint', () => {
  console.log('Print completed');
});
```

## Practical Example

```vue
<template>
  <div>
    <button @click="printGrid" class="btn btn-primary">Print Grid</button>
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column field="OrderID" width="100"></e-column>
        <e-column field="CustomerID" width="120"></e-column>
        <e-column field="Freight" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
const printGrid = () => {
  gridInstance.print();
};
</script>
```
