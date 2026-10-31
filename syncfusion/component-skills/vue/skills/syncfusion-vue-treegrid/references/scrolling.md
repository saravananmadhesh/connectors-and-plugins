# Scrolling

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Scrolling](#basic-scrolling)
- [Sticky Header](#sticky-header)
- [Virtual Scrolling for Large Data](#virtual-scrolling-for-large-data)

## When to Use

Use scrolling configuration when you need to:
- **Vertical scrolling** - Display more rows than viewport can show
- **Horizontal scrolling** - Display more columns than viewport width
- **Sticky headers** - Column headers stay fixed while scrolling
- **Responsive scrolling** - Adapt scrolling behavior for mobile
- **Scroll synchronization** - Sync scroll between multiple grids

## Mandatory Rules

Before implementing scrolling:
- ✓ **Height Property**: Set fixed height (px or %) for vertical scrolling to work
- ✓ **Width Property**: Set width for horizontal scrolling (or keep auto)

## Basic Scrolling

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    height="500px"
    width="100%">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', startDate: '1/3/2023', duration: 10, subtasks: [...] },
  { taskID: 2, taskName: 'Development', startDate: '2/3/2023', duration: 20, subtasks: [...] }
]);

// Scrollbars appear automatically when content exceeds viewport
// Vertical scrollbar: total row height > element height
// Horizontal scrollbar: total column width > element width

provide('treegrid', []);
</script>
```

### Set Width and Height

Configure scrolling dimensions:

```vue
<template>
  <div>
    <p style="margin-bottom: 10px;">
      Grid: {{ width }} × {{ height }}
    </p>
    
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :height="height"
      :width="width">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=180></e-column>
        <e-column field="startDate" headerText="Start Date" width=120></e-column>
        <e-column field="duration" headerText="Duration" width=110 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const width = ref('400px');        // Can be 'px' or '%' units
const height = ref('315px');       // Must be explicit for scrolling to work
const data = ref([...]);

// NOTE: Default values are 'auto' which disable scrollbars
// Set explicit heights/widths to enable scrolling

provide('treegrid', []);
</script>
```

### Responsive with Parent Container

Make grid fill parent and scale responsively:

```vue
<template>
  <div id="container" style="height: 600px; border: 1px solid #ddd; resize: both; overflow: auto;">
    <p style="margin: 10px; font-size: 0.9em; color: #666;">
      Resize me (bottom-right corner) to test responsive scrolling
    </p>

    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      childMapping="subtasks"
      height="100%"
      width="100%">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);

// Setting height='100%' and width='100%' makes grid fill parent
// Parent must have explicit height for this to work
// Test resizing to verify responsive behavior

provide('treegrid', []);
</script>

<style scoped>
#container {
  resize: both;
  overflow: auto;
  padding: 10px;
  min-height: 250px;
  min-width: 250px;
}
</style>
```

## Sticky Header

Column header stays visible while scrolling vertically:

```vue
<template>
  <div>
    <div style="margin-bottom: 15px;">
      <label style="font-weight: bold;">
        <input type="checkbox" v-model="stickyEnabled" @change="updateStickyHeader" />
        Enable Sticky Header
      </label>
      <p style="font-size: 0.9em; color: #666; margin-top: 5px;">
        {{ stickyEnabled ? 'Header stays visible while scrolling' : 'Header scrolls with content' }}
      </p>
    </div>

    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      childMapping="subtasks"
      height="350px"
      :enableStickyHeader="stickyEnabled">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=180></e-column>
        <e-column field="startDate" headerText="Start Date" width=120></e-column>
        <e-column field="duration" headerText="Duration" width=110 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const gridInstance = ref(null);
const stickyEnabled = ref(true);
const data = ref([...]);

const updateStickyHeader = () => {
  // Property updates reactively in Vue
  if (gridInstance.value?.ej2Instances) {
    gridInstance.value.ej2Instances.enableStickyHeader = stickyEnabled.value;
  }
};

provide('treegrid', []);
</script>
```

## Virtual Scrolling for Large Data

Render only visible rows for performance:

```vue
<template>
  <div>
    <p style="margin-bottom: 10px; color: #666;">
      Dataset: {{ totalRows }} rows | Rendered visible rows only (Virtual scrolling enabled)
    </p>

    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      height="600px"
      width="100%"
      :enableVirtualization="true"
      :rowHeight="36">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const totalRows = ref(50000);
const data = ref(generateData(50000));

function generateData(count) {
  const rows = [];
  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Open', 'In Progress', 'Completed'];
  
  for (let i = 1; i <= count; i++) {
    rows.push({
      taskID: i,
      taskName: `Task ${i}`,
      priority: priorities[i % 3],
      status: statuses[i % 3]
    });
  }
  return rows;
}

// Virtual scrolling renders only visible rows
// Smooth scroll even with 50k rows
// Memory-efficient for large datasets
// Frozen column still visible

provide('treegrid', []);
</script>
```
