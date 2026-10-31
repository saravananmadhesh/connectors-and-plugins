# Column Menu

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Column Menu](#basic-column-menu)
- [Disable Column Menu for Specific Columns](#disable-column-menu-for-specific-columns)
- [Custom Menu Items](#custom-menu-items)
- [Customize Menu Items for Particular Columns](#customize-menu-items-for-particular-columns)
- [Auto-Fit Columns from Menu](#auto-fit-columns-from-menu)
- [Sort from Column Menu](#sort-from-column-menu)
- [Filter from Column Menu](#filter-from-column-menu)

## Overview

Column menu provides quick access to column-related operations like sorting, filtering, and column width adjustment. Users can click the menu icon in column headers to access options for the current column. Multiple features can be integrated into the menu including sort, filter, and auto-fit functionality.

## When to Use

Use column menu when you need to:
- **Quick column operations** - Sort, filter without toolbar
- **Space-saving UI** - Hide toolbar, use column menu instead
- **Context operations** - Column-specific actions from header
- **Custom actions** - Add application-specific menu items
- **Mobile-friendly** - Tap column header menu icon
- **Advanced workflows** - Complex column operations in one place
- **Auto-fit columns** - Adjust column width from menu
- **Contextual filtering** - Filter specific column from menu

## Mandatory Rules

Before implementing column menu:
- ✓ **showColumnMenu**: Set `:showColumnMenu="true"` on TreeGrid component
- ✓ **ColumnMenu Module**: Import and provide `ColumnMenu` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **Column Headers**: Essential for menu icon display
- ✓ **Additional Modules**: Provide Sort, Filter, Resize modules if using those features
- ✓ **Menu Item Configuration**: Optional columnMenuItems array for custom items

## Basic Column Menu

Enable column menu with default sort and filter options:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :showColumnMenu="true"
    :allowSorting="true"
    :allowFiltering="true"
    :filterSettings="filterSettings"
    :allowResizing="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <e-column field="startDate" headerText="Start Date" width=90 format="yMd" textAlign="Right" type="date"></e-column>
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Sort, Filter, Resize, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { 
    taskID: 1, 
    taskName: 'Planning', 
    startDate: new Date(2024, 0, 1),
    duration: 10, 
    subtasks: [] 
  },
  { 
    taskID: 2, 
    taskName: 'Development', 
    startDate: new Date(2024, 0, 5),
    duration: 20, 
    subtasks: [] 
  }
]);

const filterSettings = ref({
  type: 'Menu'
});

// Default menu items:
// - SortAscending
// - SortDescending
// - AutoFit
// - AutoFitAll
// - Filter

provide('treegrid', [Sort, Filter, Resize, ColumnMenu]);
</script>
```

**Default Menu Items Available:**
- **SortAscending** - Sort column A-Z or 0-9
- **SortDescending** - Sort column Z-A or 9-0
- **AutoFit** - Adjust current column width
- **AutoFitAll** - Auto-fit all columns
- **Filter** - Show filter dialog (type depends on filterSettings.type)




## Disable Column Menu for Specific Columns

Hide menu for certain columns:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnMenu="true"
    :allowSorting="true"
    :allowFiltering="true">
    <e-columns>
      <!-- Menu enabled -->
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      
      <!-- Menu enabled -->
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      
      <!-- Menu disabled for this column -->
      <e-column field="startDate" headerText="Start Date" width=90 format="yMd" :showColumnMenu="false" type="date" textAlign="Right"></e-column>
      
      <!-- Menu enabled -->
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort, Filter, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

provide('treegrid', [Sort, Filter, ColumnMenu]);
</script>
```

## Custom Menu Items

Add custom items to the column menu:

```vue
<template>
  <div>
    <p>Status: {{ menuAction }}</p>
    
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :showColumnMenu="true"
      :allowSorting="true"
      :columnMenuItems="columnMenuItems"
      @columnMenuClick="onColumnMenuClick">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=180></e-column>
        <e-column field="priority" headerText="Priority" width=100></e-column>
        <e-column field="status" headerText="Status" width=100></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const menuAction = ref('None');

const data = ref([
  { taskID: 1, taskName: 'Planning', priority: 'High', status: 'Open', subtasks: [] },
  { taskID: 2, taskName: 'Development', priority: 'High', status: 'In Progress', subtasks: [] }
]);

// Define custom menu items
const columnMenuItems = ref([
  { text: 'Clear Sorting', id: 'clearsorting' },
  { text: 'Export Column', id: 'exportcolumn' },
  { text: 'Column Info', id: 'columninfo' }
]);

const onColumnMenuClick = (args) => {
  const gridObj = gridInstance.value?.ej2_instances?.[0];
  
  if (args.item.id === 'clearsorting') {
    gridObj.clearSorting();
    menuAction.value = 'Sorting cleared';
  } else if (args.item.id === 'exportcolumn') {
    menuAction.value = `Export column: ${args.column.headerText}`;
    // Implementation for exporting
  } else if (args.item.id === 'columninfo') {
    menuAction.value = `Info: ${args.column.headerText} (${args.column.type || 'string'})`;
  }
};

provide('treegrid', [Sort, ColumnMenu]);
</script>
```

**Menu Item Properties:**
- `text` - Display label in menu
- `id` - Unique identifier (used in columnMenuClick event)
- `iconCss` - CSS class for icon (optional)
- `hide` - Boolean to show/hide item (optional)

## Customize Menu Items for Particular Columns

Show/hide menu items based on column:

```vue
<template>
  <div>
    <p>Last Action: {{ lastAction }}</p>
    
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :showColumnMenu="true"
      :allowSorting="true"
      :allowFiltering="true"
      :filterSettings="{ type: 'Menu' }"
      @columnMenuOpen="onColumnMenuOpen">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=180></e-column>
        <e-column field="startDate" headerText="Start Date" width=90 format="yMd" type="date" textAlign="Right"></e-column>
        <e-column field="duration" headerText="Duration" width=80 textAlign="Right" type="number"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort, Filter, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const lastAction = ref('None');

const data = ref([
  { taskID: 1, taskName: 'Planning', startDate: new Date(2024, 0, 1), duration: 10, subtasks: [] },
  { taskID: 2, taskName: 'Development', startDate: new Date(2024, 0, 5), duration: 20, subtasks: [] }
]);

const onColumnMenuOpen = (args) => {
  // Customize menu items for taskName column
  if (args.column.field === 'taskName') {
    // Hide Filter option for taskName
    for (let item of args.items) {
      if (item.text === 'Filter') {
        item.hide = true;
      }
    }
    lastAction.value = `Menu opened for ${args.column.headerText} - Filter hidden`;
  } else {
    // Show all items for other columns
    for (let item of args.items) {
      item.hide = false;
    }
  }
};

provide('treegrid', [Sort, Filter, ColumnMenu]);
</script>
```

**columnMenuOpen Event Properties:**
- `args.column` - Column object (field, headerText, type, etc.)
- `args.items` - Array of menu items
- Each item has: `text`, `id`, `hide`, `iconCss`

## Auto-Fit Columns from Menu

Use AutoFit option to adjust column width:

```vue
<template>
  <div>
    <p style="color: #666; font-size: 14px;">
      Click menu icon in header → Select "AutoFit" to adjust column width
    </p>
    
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :showColumnMenu="true"
      :allowResizing="true">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=50 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=80></e-column>
        <e-column field="description" headerText="Description" width=100></e-column>
        <e-column field="priority" headerText="Priority" width=60></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Resize, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', description: 'Plan the project scope and deliverables', priority: 'High', subtasks: [] },
  { taskID: 2, taskName: 'Development', description: 'Implement the planned features with quality standards', priority: 'High', subtasks: [] }
]);

provide('treegrid', [Resize, ColumnMenu]);
</script>
```

**AutoFit Options:**
- **AutoFit** - Adjusts width of current column only
- **AutoFitAll** - Adjusts all columns at once

## Sort from Column Menu

Sort column using menu instead of header click:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnMenu="true"
    :allowSorting="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
      <e-column field="startDate" headerText="Start Date" width=90 format="yMd" type="date" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Menu → SortAscending / SortDescending
// Same as clicking header

provide('treegrid', [Sort, ColumnMenu]);
</script>
```

## Filter from Column Menu

Access filter from menu:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnMenu="true"
    :allowFiltering="true"
    :filterSettings="{ type: 'Menu' }">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <e-column field="status" headerText="Status" width=100></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Filter, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', status: 'Open', priority: 'High', subtasks: [] },
  { taskID: 2, taskName: 'Development', status: 'In Progress', priority: 'High', subtasks: [] }
]);

// Menu → Filter
// Opens filter dropdown matching filterSettings.type

provide('treegrid', [Filter, ColumnMenu]);
</script>
```
