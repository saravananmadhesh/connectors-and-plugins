# Column Resizing

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Column Resizing](#basic-column-resizing)
- [Disable Resizing for Specific Columns](#disable-resizing-for-specific-columns)
- [Min and Max Width](#min-and-max-width)
- [Auto-Fit Column Width](#auto-fit-column-width)
- [Resize Events](#resize-events)

## Overview

Column resizing allows users to adjust column widths by clicking and dragging the right edge of column headers. Users can manually resize each column to fit their content, or double-click the column border to auto-fit the width based on the widest cell content. Columns can have minimum and maximum width constraints to prevent extreme sizing.

## When to Use

Use column resizing when you need to:
- **Allow flexible layout** - users adjust widths to fit content and screen space
- **Fit long text** - expand columns to see full values without truncation
- **Optimize for screen size** - responsive column widths for different devices
- **Constrain column widths** - min/max width limits for consistency
- **Auto-fit columns** - automatically calculate optimal widths based on content

## Mandatory Rules

Before implementing column resizing:
- ✓ **Resize Module**: Must provide `Resize` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **allowResizing Property**: Set `:allowResizing="true"` on TreeGrid component
- ✓ **Double-Click Auto-Fit**: Default behavior for auto-sizing columns
- ✓ **Min/Max Constraints**: Optional minWidth and maxWidth properties

## Basic Column Resizing

Enable resizing and let users drag column borders:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :allowResizing="true"
    height="315px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <e-column field="startDate" headerText="Start Date" width=90 format="yMd" textAlign="Right"></e-column>
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Resize } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);

const data = ref([
  { taskID: 1, taskName: 'Planning', startDate: new Date(2024, 0, 1), duration: 10, subtasks: [] }
]);

provide('treegrid', [Resize]);
</script>
```

**User Interaction:**
- Hover over column border → Cursor changes to resize indicator
- Click and drag right edge → Column width expands/shrinks
- Double-click column border → Auto-fit to widest content
- In RTL mode: Click and drag left edge (opposite direction)

## Disable Resizing for Specific Columns

Prevent specific columns from being resized:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowResizing="true">
    <e-columns>
      <!-- Cannot be resized -->
      <e-column field="taskID" headerText="Task ID" width=90 :allowResizing="false" textAlign="Right"></e-column>
      
      <!-- Can be resized -->
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      
      <!-- Can be resized -->
      <e-column field="startDate" headerText="Start Date" width=90 format="yMd" textAlign="Right"></e-column>
      
      <!-- Cannot be resized -->
      <e-column field="duration" headerText="Duration" width=80 :allowResizing="false" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Resize } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

provide('treegrid', [Resize]);
</script>
```

## Min and Max Width

Constrain column width between minimum and maximum values:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowResizing="true"
    height="315px">
    <e-columns>
      <!-- Min width: 50px, Max width: 150px -->
      <e-column 
        field="taskID" 
        headerText="Task ID" 
        width=90 
        minWidth=50
        maxWidth=150
        textAlign="Right">
      </e-column>
      
      <!-- Min width: 170px, Max width: 250px -->
      <e-column 
        field="taskName" 
        headerText="Task Name"
        minWidth=170 
        width=180 
        maxWidth=250>
      </e-column>
      
      <!-- Min width: 50px, Max width: 150px - examples of tight constraint -->
      <e-column 
        field="duration" 
        headerText="Duration" 
        minWidth=50 
        width=80 
        maxWidth=150 
        textAlign="Right">
      </e-column>
      
      <!-- No constraints - free to resize -->
      <e-column 
        field="progress" 
        headerText="Progress" 
        width=80 
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Resize } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, progress: 100, subtasks: [] }
]);

provide('treegrid', [Resize]);
</script>
```

**How It Works:**
- Users can drag column border freely between min and max widths
- Cannot shrink smaller than `minWidth`
- Cannot grow larger than `maxWidth`
- If no constraints set, resize is unrestricted


## Auto-Fit Column Width

Double-click column border or use buttons to auto-fit:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowResizing="true"
    :columnMenu="['AutoFit', 'AutoFitAll']">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="description" headerText="Description" width=300></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Resize, ColumnMenu } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

provide('treegrid', [Resize, ColumnMenu]);
</script>
```

**User Interaction:** 
- Double-click column border = Auto-fit that column
- Right-click column header → "AutoFit" = Fit current column  
- Right-click column header → "AutoFitAll" = Fit all columns


## Resize Events

Handle column resize operations:

```vue
<template>
  <div>
    <p>Column Resize: {{ resizeStatus }}</p>
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowResizing="true"
      @columnResizeStart="onResizeStart"
      @columnResizing="onResizing"
      @columnResizeStop="onResizeStop">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Resize } from '@syncfusion/ej2-vue-treegrid';

const resizeStatus = ref('Ready');
const data = ref([...]);

const onResizeStart = (args) => {
  resizeStatus.value = `Resizing: ${args.column.headerText}`;
};

const onResizing = (args) => {
  resizeStatus.value = `Width: ${args.width}px`;
};

const onResizeStop = (args) => {
  resizeStatus.value = `Resized: ${args.column.headerText} to ${args.width}px`;
};

provide('treegrid', [Resize]);
</script>
```

