# Context Menu

## Table of Contents
- [When to Use](#when-to-use)
- [Enable Context Menu](#enable-context-menu)
- [Left Click Context Menu](#left-click-context-menu)
- [Enable/Disable Menu Items](#enable-disable-menu-items)
- [Show/Hide Menu Items](#show-hide-menu-items)
- [Custom Menu Items](#custom-menu-items)
- [Menu Events](#menu-events)
- [Practical Example](#practical-example)

## When to Use

Use this reference when you need to:
- Add context menu on right-click for grid actions
- Configure menu items for Copy, Export, Delete operations
- Create custom menu items for row operations
- Enable/disable menu items based on conditions
- Handle context menu events
- Show context menus on left-click or custom actions

## Enable Context Menu

### Basic Context Menu
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :contextMenuItems="contextMenuItems">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, ColumnMenu } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const contextMenuItems = ['Copy', 'ExcelExport', 'PdfExport'];

provide('grid', [ColumnMenu]);
</script>
```

## Left Click Context Menu

### Show Context Menu on Left Click
Display context menu on left mouse click instead of right click:

```vue
<template>
  <ejs-grid 
    ref="gridRef"
    :dataSource="data"
    :contextMenuItems="contextMenuItems"
    :created="onGridCreated"
    @click="onGridClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { ContextMenu } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const gridRef = ref(null);
let clickEvent = null;

const contextMenuItems = [
  'SortAscending',
  'SortDescending',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
  'PdfExport',
  'ExcelExport'
];

const onGridCreated = () => {
  gridRef.value.ej2Instances.contextMenuModule.contextMenu.beforeOpen = (args) => {
    // Prevent right-click from opening menu
    if (args.event && args.event.which === 3) args.cancel = true;
    args.event = clickEvent;
  };
};

const onGridClick = (event) => {
  clickEvent = event;
  gridRef.value.ej2Instances.contextMenuModule.contextMenu.open(
    event.pageY + window.pageYOffset,
    event.pageX + window.pageXOffset
  );
};

provide('grid', [ContextMenu]);
</script>
```

## Enable/Disable Menu Items

### Disable Context Menu Items
Use `enableItems()` method to enable/disable items:

```vue
<template>
  <div>
    <label>
      <input 
        type="checkbox" 
        @change="toggleCopyItem"
        v-model="isCopyEnabled"
      />
      Enable/Disable Copy
    </label>
    
    <ejs-grid 
      ref="gridRef"
      :dataSource="data"
      :contextMenuItems="contextMenuItems"
      :editSettings="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ContextMenu, Edit } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const gridRef = ref(null);
const isCopyEnabled = ref(true);

const contextMenuItems = ['Copy', 'Edit', 'Delete'];
const editSettings = { allowEditing: true, allowDeleting: true };

const toggleCopyItem = () => {
  gridRef.value.ej2Instances.contextMenuModule.contextMenu.enableItems(
    ['Copy'],
    isCopyEnabled.value
  );
};

provide('grid', [ContextMenu, Edit]);
</script>
```

## Show/Hide Menu Items

### Show or Hide Context Menu Items
Use `showItems()` and `hideItems()` methods:

```vue
<template>
  <div>
    <label>
      <input 
        type="checkbox" 
        @change="toggleEditDelete"
        v-model="showEditDelete"
      />
      Show Edit & Delete Options
    </label>
    
    <ejs-grid 
      ref="gridRef"
      :dataSource="data"
      :contextMenuItems="contextMenuItems"
      :editSettings="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ContextMenu, Edit } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const gridRef = ref(null);
const showEditDelete = ref(false);

const contextMenuItems = ['Copy', 'Edit Record', 'Delete Record'];
const editSettings = { allowEditing: true, allowDeleting: true };

const toggleEditDelete = () => {
  if (showEditDelete.value) {
    gridRef.value.ej2Instances.contextMenuModule.contextMenu.showItems([
      'Edit Record',
      'Delete Record'
    ]);
  } else {
    gridRef.value.ej2Instances.contextMenuModule.contextMenu.hideItems([
      'Edit Record',
      'Delete Record'
    ]);
  }
};

provide('grid', [ContextMenu, Edit]);
</script>
```

### Header Area Items
Right-click on grid header to access:
- **AutoFit** - Automatically adjust column width
- **AutoFitAll** - Automatically adjust all column widths
- **Group** - Group by the current column
- **Ungroup** - Remove grouping from current column
- **SortAscending** - Sort ascending
- **SortDescending** - Sort descending

### Content Area Items
Right-click on grid data to access:
- **Edit** - Edit selected row
- **Delete** - Delete selected row
- **Save** - Save changes
- **Cancel** - Cancel edit
- **Copy** - Copy cell/row content
- **PdfExport** - Export to PDF
- **ExcelExport** - Export to Excel
- **CsvExport** - Export to CSV

### Pager Area Items
Right-click on pager to access:
- **FirstPage** - Navigate to first page
- **PrevPage** - Navigate to previous page
- **LastPage** - Navigate to last page
- **NextPage** - Navigate to next page

### Built-in Menu Items
```javascript
const contextMenuItems = [
  'Copy',          // Copy cell/row content
  'CopyHeader',    // Copy column header
  'ExcelExport',   // Export to Excel
  'PdfExport',     // Export to PDF
  'CsvExport',     // Export to CSV
  'Edit',          // Edit row
  'Delete',        // Delete row
  'Save',          // Save changes
  'Cancel'         // Cancel edit
];
```

## Custom Menu Items

### Add Custom Context Menu
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :contextMenuItems="contextMenuItems"
    :contextMenuClick="handleContextMenuClick">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ColumnMenu } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const contextMenuItems = [
  'Copy',
  { 
    text: 'Send Email',
    target: '.e-grid',
    id: 'grid_sendemail'
  },
  { 
    text: 'Print Record',
    target: '.e-grid',
    id: 'grid_print'
  },
  'ExcelExport'
];

const handleContextMenuClick = (args) => {
  if (args.item.id === 'grid_sendemail') {
    console.log('Send email for:', args.rowData);
  } else if (args.item.id === 'grid_print') {
    console.log('Print:', args.rowData);
  }
};

provide('grid', [ColumnMenu]);
</script>
```

## Menu Events

### Context Menu Click Event
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :contextMenuItems="contextMenuItems"
    :contextMenuClick="handleMenuClick">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleMenuClick = (args) => {
  console.log('Menu item:', args.item.text);
  console.log('Row data:', args.rowData);
  console.log('Target:', args.target);
};
</script>
```

### Before Context Menu Open
```javascript
gridInstance.addEventListener('beforeOpenContextMenu', (args) => {
  console.log('Context menu opening');
});
```

## Practical Example

```vue
<template>
  <ejs-grid 
    ref="gridRef"
    :dataSource="data"
    :contextMenuItems="contextMenuItems"
    :contextMenuClick="handleContextMenuClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { ColumnMenu } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const gridRef = ref(null);

const contextMenuItems = [
  'Copy',
  'CopyHeader',
  { type: 'Separator' },
  { 
    text: 'View Details',
    id: 'view_details'
  },
  { 
    text: 'Export Record',
    id: 'export_record'
  },
  { type: 'Separator' },
  'ExcelExport',
  'PdfExport'
];

const handleContextMenuClick = (args) => {
  if (args.item.id === 'view_details') {
    console.log('View details:', args.rowData);
  } else if (args.item.id === 'export_record') {
    console.log('Export:', args.rowData);
  }
};

provide('grid', [ColumnMenu]);
</script>
```
