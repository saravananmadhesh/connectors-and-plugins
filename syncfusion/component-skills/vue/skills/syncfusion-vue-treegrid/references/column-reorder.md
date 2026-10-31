# Column Reorder

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Column Reordering Setup](#basic-column-reordering-setup)
- [Per-Column Reorder Configuration](#per-column-reorder-configuration)
- [Programmatic Column Reordering](#programmatic-column-reordering)
- [Reorder Events](#reorder-events)

## Overview

Column reorder allows users to rearrange columns by dragging and dropping column headers. Users can reorganize the grid layout to display columns in their preferred order. The reorder operation can be performed programmatically via methods or through user interaction via drag-and-drop.

## When to Use

Use column reordering when you need to:
- **Allow flexible column layout** - users arrange columns as needed
- **Prioritize important columns** - move frequently-viewed columns to the front  
- **Customize user experience** - remember preferred column order
- **Support different workflows** - different teams need different orders
- **Focus on key data** - group related columns together
- **Improve data scanning** - organize columns logically
- **Persist preferences** - remember column order across sessions
- **Responsive design** - adapt column order for different screen sizes

## Mandatory Rules

Before implementing column reordering:
- ✓ **Reorder Module**: Must provide `Reorder` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **allowReordering Property**: Set `:allowReordering="true"` on TreeGrid (NOT enableReordering)
- ✓ **Column Headers**: Essential for drag-drop interaction
- ✓ **Tree Column Visibility**: Tree column stays visible during reorder

## Basic Column Reordering Setup

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :allowReordering="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Duration" type="number" width=100 textAlign="Right"></e-column>
      <e-column field="startDate" headerText="Start Date" type="date" format="yMd" width=120></e-column>
      <e-column field="status" headerText="Status" width=120></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Reorder } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, startDate: new Date('02/03/2017'), status: 'Active', subtasks: [...] }
]);

provide('treegrid', [Reorder]);
</script>
```

## Per-Column Reorder Configuration

Control reordering per column:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowReordering="true">
    <e-columns>
      <!-- Cannot be reordered (locked) -->
      <e-column field="taskID" headerText="Task ID" width=90 :allowReordering="false" textAlign="Right"></e-column>
      
      <!-- Can be reordered -->
      <e-column field="taskName" headerText="Task Name" width=200 :allowReordering="true"></e-column>
      
      <!-- Can be reordered (default) -->
      <e-column field="duration" headerText="Duration" type="number" width=100 textAlign="Right"></e-column>
      
      <!-- Can be reordered -->
      <e-column field="startDate" headerText="Start Date" type="date" format="yMd" width=120></e-column>
      
      <!-- Locked in place -->
      <e-column field="status" headerText="Status" width=120 :allowReordering="false"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Reorder } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

provide('treegrid', [Reorder]);
</script>
```


## Programmatic Column Reordering

Reorder columns via code:

```vue
<template>
  <div>
    <button @click="reorderColumns">Rearrange Columns</button>

    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowReordering="true">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="duration" headerText="Duration" width=100 textAlign="Right"></e-column>
        <e-column field="startDate" headerText="Start Date" width=120></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Reorder } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const reorderColumns = () => {
  // Move taskName to first position
  gridInstance.value.reorderColumns(['taskName'], 'taskID');
};

provide('treegrid', [Reorder]);
</script>
```

## Reorder Events

Handle column reorder operations:

```vue
<template>
  <div>
    <p>Column Order: {{ columnOrder }}</p>
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowReordering="true"
      @dragStart="onDragStart"
      @dragStop="onDragStop">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="duration" headerText="Duration" width=100></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Reorder } from '@syncfusion/ej2-vue-treegrid';

const columnOrder = ref('Original');
const data = ref([...]);

const onDragStart = (args) => {
  columnOrder.value = `Dragging: ${args.column.headerText}`;
};

const onDragStop = (args) => {
  columnOrder.value = `Reordered: ${args.column.headerText}`;
};

provide('treegrid', [Reorder]);
</script>
```
