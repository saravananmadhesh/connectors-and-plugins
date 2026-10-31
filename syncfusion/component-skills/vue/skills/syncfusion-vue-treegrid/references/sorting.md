## Sorting Overview

TreeGrid supports single and multi-column sorting with multiple interaction models:
- **Click sorting** - Click header to sort (ascending → descending → no sort)
- **Multi-column sorting** - Ctrl+Click for multiple sort keys
- **Programmatic sorting** - Apply sort via methods
- **Initial sort** - Pre-sort data on load
- **Custom sort logic** - Define custom comparers for non-standard sort orders
- **Touch interaction** - Mobile-friendly sorting UI
- **Server-side sorting** - Let backend handle large datasets

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Sorting](#basic-sorting)
- [Initial Sort](#initial-sort)
- [Disable Sorting for Specific Columns](#disable-sorting-for-specific-columns)
- [Custom Sort Logic](#custom-sort-logic)
- [Sort Events](#sort-events)

## Sorting Overview (new)

## When to Use

Use sorting when you need to:
- **Allow users to reorder data** - alphabetical, numerical, date-based
- **Sort by multiple columns** - complex multi-level organization
- **Implement custom sort logic** - non-standard sort algorithms
- **Design data reporting** - default sort orders for exports
- **Implement hierarchical sorting** - sort parents and children
- **Handle large datasets** - optimize with remote server-side sorting
- **Remember user preferences** - persist sort state
- **Support touch interactions** - mobile-friendly sorting

## Mandatory Rules

Before implementing sorting:
- ✓ **Sort Module**: Must provide `Sort` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **allowSorting**: Set `:allowSorting="true"` on TreeGrid component
- ✓ **Column Headers**: Essential for user-driven sorting (header text identifies sort field)

## Basic Sorting

Enable sorting with user interaction:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :allowSorting="true">
    <e-columns>
      <e-column field="Category" headerText="Category" width=140></e-column>
      <e-column field="orderName" headerText="Order Name" width=200></e-column>
      <e-column field="orderDate" headerText="Order Date" width=120 format="yMd" textAlign="Right"></e-column>
      <e-column field="units" headerText="Units" width=90 type="number" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Sort } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { Category: 'Office Supplies', orderName: 'Pen Set', orderDate: new Date(2024, 0, 1), units: 50, subtasks: [] },
  { Category: 'Furniture', orderName: 'Desk', orderDate: new Date(2024, 0, 2), units: 10, subtasks: [] }
]);

provide('treegrid', [Sort]);
</script>
```

**User Interaction:**
- Click header once: Sort Ascending
- Click header again: Sort Descending  
- Click header third time: Clear sort

## Initial Sort

Set initial sort order to display on page load:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :allowSorting="true"
    :sortSettings="sortSettings">
    <e-columns>
      <e-column field="Category" headerText="Category" width=140></e-column>
      <e-column field="orderName" headerText="Order Name" width=200></e-column>
      <e-column field="orderDate" headerText="Order Date" width=120 format="yMd" textAlign="Right"></e-column>
      <e-column field="units" headerText="Units" width=90 type="number" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Pre-sort data by Category ascending, then orderName ascending
const sortSettings = ref({
  columns: [
    { field: 'Category', direction: 'Ascending' },
    { field: 'orderName', direction: 'Ascending' }
  ]
});

provide('treegrid', [Sort]);
</script>
```

### Multi-Column Sorting

Sort by multiple columns. Users hold Ctrl and click headers:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowSorting="true"
    :sortSettings="sortSettings">
    <e-columns>
      <e-column field="status" headerText="Status" width=120></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Duration" width=100 type="number" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Sort by Status ascending → Priority descending → Task Name ascending
const sortSettings = ref({
  columns: [
    { field: 'status', direction: 'Ascending' },
    { field: 'priority', direction: 'Descending' },
    { field: 'taskName', direction: 'Ascending' }
  ]
});

provide('treegrid', [Sort]);
</script>
```

**Multi-Sort Rules:**
- Press and hold CTRL and click multiple headers → Add to sort
- Press and hold SHIFT and click header → Remove from sort
- Pressing CTRL on first header acts like regular sort



## Disable Sorting for Specific Columns

Prevent specific columns from being sorted:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowSorting="true">
    <e-columns>
      <!-- User can sort -->
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      
      <!-- User cannot sort -->
      <e-column field="tasksRemaining" headerText="Tasks Remaining" width=150 :allowSorting="false"></e-column>
      
      <!-- User can sort -->
      <e-column field="percentage" headerText="Percentage" width=100 type="number"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

provide('treegrid', [Sort]);
</script>
```


## Custom Sort Logic

Define custom comparers for non-standard sort orders:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowSorting="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100 textAlign="Right"></e-column>
      
      <!-- Priority: use custom sort order -->
      <e-column 
        field="priority" 
        headerText="Priority" 
        width=100
        :sortComparer="prioritySortComparer">
      </e-column>
      
      <!-- Status: define order -->
      <e-column 
        field="status" 
        headerText="Status" 
        width=100
        :sortComparer="statusSortComparer">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Sort priority: Critical(4) > High(3) > Medium(2) > Low(1) > None(0)
const prioritySortComparer = (a, b) => {
  const order = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1, 'None': 0 };
  const aVal = order[a] || 0;
  const bVal = order[b] || 0;
  return aVal - bVal;
};

// Sort status: NotStarted → InProgress → Review → Completed
const statusSortComparer = (a, b) => {
  const order = { 'NotStarted': 1, 'InProgress': 2, 'Review': 3, 'Completed': 4 };
  const aVal = order[a] || 0;
  const bVal = order[b] || 0;
  return aVal - bVal;
};

provide('treegrid', [Sort]);
</script>
```

## Sort Events

Handle sorting events with `actionBegin` and `actionComplete`:

```vue
<template>
  <div>
    <p>Status: {{ eventStatus }}</p>
    <p>Last Sort: {{ lastSort }}</p>

    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowSorting="true"
      @actionBegin="onActionBegin"
      @actionComplete="onActionComplete">
      <e-columns>
        <e-column field="Category" headerText="Category" width=140></e-column>
        <e-column field="orderName" headerText="Order Name" width=200></e-column>
        <e-column field="orderDate" headerText="Order Date" width=120 format="yMd" textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);
const eventStatus = ref('Ready');
const lastSort = ref('None');

const onActionBegin = (args) => {
  if (args.requestType === 'sorting') {
    eventStatus.value = `Sorting by: ${args.columnName}`;
    // args.data contains sort configuration
  }
};

const onActionComplete = (args) => {
  if (args.requestType === 'sorting') {
    const direction = args.data[0]?.direction;
    lastSort.value = `${args.columnName} (${direction})`;
    eventStatus.value = 'Sort complete';
  }
};

provide('treegrid', [Sort]);
</script>
```

**Event Properties:**
- `args.requestType` - Always 'sorting' for sort events
- `args.columnName` - Name of sorted column
- `args.direction` - 'Ascending' or 'Descending'
- `args.type` - Event type: 'actionBegin' or 'actionComplete'
