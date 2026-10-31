# Row Features

Row features provide extensive customization and interaction capabilities for TreeGrid rows, from styling and templates to drag-drop and hierarchical manipulation.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Row Height](#row-height)
- [Row Customization](#row-customization)
- [Detail Template](#detail-template)
- [Row Templates](#row-templates)
- [Row Drag and Drop](#row-drag-and-drop)
- [Indent and Outdent Rows](#indent-and-outdent-rows)
- [Row Spanning](#row-spanning)

## When to Use

Use row features when you need to:
- **Highlight specific rows** - Color code by status, duration, priority using rowDataBound
- **Expand row details** - Show additional information on row expansion via detail template
- **Customize row height** - Display multi-line content, images, complex layouts per row
- **Custom row structure** - Replace default row rendering with completely custom templates
- **Show detail panels** - Related data below parent row that expands/collapses with parent
- **Merge cells** - Vertically span cells across multiple rows with identical values
- **Add row drag-drop** - Reorder rows within grid or between grids, change hierarchy
- **Modify hierarchy** - Indent/outdent rows to change parent-child relationships
- **Conditional row styling** - Apply CSS classes based on data values, status, conditions

## Mandatory Rules

- **Detail Template**: Requires `DetailRow` module - `provide('treegrid', [DetailRow])`
- **Row Drag & Drop**: Requires `RowDD` module - `provide('treegrid', [RowDD])`
- **Indent/Outdent**: Requires `RowDD` module - `provide('treegrid', [RowDD])`
- **Row Customization/Height**: No module required (built-in)
- **Row Template**: No module required (built-in)
- **Row Spanning**: No module required (built-in)

## Row Height

### Uniform Row Height (All Rows)

Set same height for all rows:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    rowHeight=60>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const data = sampleData;

provide('treegrid', []);
</script>
```

## Row Customization

Customize row appearance conditionally using `rowDataBound` event:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    @rowDataBound="onRowDataBound">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const data = sampleData;

const onRowDataBound = (args) => {
  // Customize row based on duration
  if (args.data.duration === 0) {
    args.row.style.backgroundColor = '#336c12'; // Green - Complete
  } else if (args.data.duration < 3) {
    args.row.style.backgroundColor = '#7b2b1d'; // Red - Critical
  } else if (args.data.duration < 7) {
    args.row.style.backgroundColor = '#fff3cd'; // Yellow - Medium
  }
  
  // Can also modify row height in this event
  if (args.data.taskName.length > 50) {
    args.rowHeight = 70;
  }
};

provide('treegrid', []);
</script>
```

## Detail Template

Show additional information when expanding parent rows:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="0"
    childMapping="Children"
    :detailTemplate="detailTemplate">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, DetailRow } from '@syncfusion/ej2-vue-treegrid';
import { textdata } from './datasource.js';
import { createApp } from 'vue';

const app = createApp({});

const detTemplate = app.component('detailTemplate', {
  template: `<div style="padding: 20px;">
    <div style="display: inline-block; width: 50%;">
      <p><b>Name:</b> {{data.FullName}}</p>
      <p><b>Designation:</b> {{data.Designation}}</p>
      <p><b>Date of Birth:</b> {{data.DOB}}</p>
    </div>
    <div style="display: inline-block; width: 50%;">
      <p><b>Address:</b> {{data.Address}}</p>
      <p><b>Contact:</b> {{data.ContactNumber}}</p>
      <p><b>Email:</b> {{data.Email}}</p>
    </div>
  </div>`,
  data() {
    return { data: {} };
  }
});

const data = textdata;

const detailTemplate = function() {
  return { template: detTemplate };
};

// REQUIRED: Provide DetailRow module
provide('treegrid', [DetailRow]);
</script>
```

**DetailRow Behavior:**
- Click expand button on left to show detail row
- When parent expands, children and their details expand together
- Detail template accepts any HTML content
- Best used with company profiles, detailed descriptions, nested data

## Row Template

Completely customize row structure and layout:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="0"
    childMapping="Children"
    height=275
    :rowHeight=83
    width="auto"
    :rowTemplate="rowTemplate">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { textdata } from './datasource.js';
import { createApp, Internationalization } from 'vue';

const app = createApp({});
let instance = new Internationalization();

const rTemplate = app.component('rowTemplate', {
  template: `<tr>
    <td class="border" style="padding-left: 18px;">
      <div></div>
    </td>
    <td class="border">
      <div style="position: relative; display: inline-block;">
        <img :src="image" :alt="data.FullName" style="width: 60px; height: 60px; border-radius: 50%;" />
      </div>
      <div style="display: inline-block; padding-left: 20px;">
        <div style="font-weight: bold;">{{data.FullName}}</div>
        <div style="font-size: 12px; color: gray;">{{data.Designation}}</div>
      </div>
    </td>
    <td class="border">
      <div style="font-size: 12px;">
        <div>📍 {{data.Address}}</div>
        <div>📧 {{data.Email}}</div>
      </div>
    </td>
  </tr>`,
  data() {
    return { data: {} };
  },
  computed: {
    image() {
      return '/images/' + this.data.FullName + '.png';
    }
  }
});

const data = textdata;

const rowTemplate = function() {
  return { template: rTemplate };
};

provide('treegrid', []);
</script>

<style scoped>
:deep(.border) {
  border-color: #e0e0e0;
  border: 1px solid #e0e0e0;
  border-width: 1px 0px 0px 0px;
  padding: 10px;
}
</style>
```

### Row Template Limitations

**NOT compatible with:**
- Filtering
- Paging
- Sorting
- Virtual scrolling
- Searching
- RTL (Right-to-Left)
- Context menu
- State persistence

**Use rowTemplate when:✓** Need complete control of row rendering, custom HTML structure, complex layouts

**Don't use rowTemplate when:** Need sorting, filtering, paging - use detail template or customization instead

## Row Drag and Drop

Enable row reordering within grid or to another grid:

### Drag and Drop Within Same Grid

```vue
<template>
  <ejs-treegrid
    :dataSource="data"
    :allowRowDragAndDrop="true"
    :treeColumnIndex="1"
    childMapping="subtasks"
    :rowDropSettings="rowDrop"
    :selectionSettings="selectionSettings"
    height="315">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, RowDD } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const data = sampleData;

const rowDrop = { targetID: 'TreeGrid' };
const selectionSettings = { type: 'Multiple' };

provide('treegrid', [RowDD]);
</script>
```

### Drag and Drop Between Two TreeGrids

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <ejs-treegrid
      id="TreeGrid"
      :dataSource="sourceData"
      :allowRowDragAndDrop="true"
      :treeColumnIndex="1"
      childMapping="subtasks"
      :rowDropSettings="{ targetID: 'DestTree' }"
      :selectionSettings="{ type: 'Multiple' }"
      height="315">
    </ejs-treegrid>

    <ejs-treegrid
      id="DestTree"
      :dataSource="destData"
      :allowRowDragAndDrop="true"
      :treeColumnIndex="1"
      childMapping="subtasks"
      :rowDropSettings="{ targetID: 'TreeGrid' }"
      :selectionSettings="{ type: 'Multiple' }"
      height="315">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { RowDD } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const sourceData = sampleData;
const destData = [];

provide('treegrid', [RowDD]);
</script>
```

## Indent and Outdent Rows

Change hierarchy level by moving rows as children or siblings:

### Toolbar-Based Indent/Outdent

```vue
<template>
  <ejs-treegrid
    :dataSource="data"
    childMapping="subtasks"
    :treeColumnIndex="1"
    :selectedRowIndex="2"
    :toolbar="toolbar"
    height="270">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" :isPrimaryKey="true" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <e-column field="priority" headerText="Priority" width=80 textAlign="Right"></e-column>
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, RowDD } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const data = sampleData;

// Add Indent/Outdent buttons to toolbar
const toolbar = ['Indent', 'Outdent'];

// REQUIRED: Provide both Toolbar and RowDD modules
provide('treegrid', [Toolbar, RowDD]);
</script>
```

### Programmatic Indent/Outdent

```vue
<template>
  <div>
    <button @click="indentRow">Indent Selected Row</button>
    <button @click="outdentRow">Outdent Selected Row</button>

    <ejs-treegrid
      ref="treegrid"
      :dataSource="data"
      childMapping="subtasks"
      :treeColumnIndex="1"
      height="270">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" :isPrimaryKey="true" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=180></e-column>
        <e-column field="priority" headerText="Priority" width=80 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RowDD } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const treegrid = ref(null);
const data = sampleData;

const indentRow = () => {
  // Indent: Move row as last child of previous row
  const currentRecord = treegrid.value.ej2Instances.grid.getCurrentViewRecords()[2];
  treegrid.value.ej2Instances.grid.indent(currentRecord);
};

const outdentRow = () => {
  // Outdent: Move row as sibling of parent
  const currentRecord = treegrid.value.ej2Instances.grid.getCurrentViewRecords()[2];
  treegrid.value.ej2Instances.grid.outdent(currentRecord);
};

provide('treegrid', [RowDD]);
</script>
```

### Indent/Outdent Behavior

| Action | Behavior | Result |
|--------|----------|--------|
| **Indent** | Moves row as last child of previous row | Previous row becomes parent |
| **Outdent** | Moves row as sibling to its current parent | Row moves up one hierarchy level |
| **Constraints** | Only middle segments can be changed | End rows cannot move hierarchy |

## Row Spanning

Merge cells with identical values across consecutive rows:

### Row Spanning via API

```vue
<template>
  <ejs-treegrid
    :dataSource="data"
    childMapping="children"
    :treeColumnIndex="0"
    :enableRowSpan="true"
    gridLines="Both"
    :allowSelection="false"
    height="400">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { rowSpanData } from './datasource.js';

const data = rowSpanData;

provide('treegrid', []);
</script>
```

**enableRowSpan behaviors:**
- `true` (default): Cells with same values are automatically merged
- `false`: Column cells are never merged (useful for numeric values like cost)

### Row Spanning via queryCellInfo Event

```vue
<template>
  <ejs-treegrid
    :dataSource="data"
    :treeColumnIndex="1"
    childMapping="subtasks"
    gridLines="Both"
    @queryCellInfo="queryCellInfoEvent">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { rowSpanData } from './datasource.js';

const data = rowSpanData;

const queryCellInfoEvent = (args) => {
  const rowData = args.data;
  
  // Span cells for "Lunch Break" across multiple rows
  if (rowData.OrderID === 10001) {
    args.rowSpan = 10; // Merge 10 rows vertically
  }
};

provide('treegrid', []);
</script>
```

### Row Spanning Limitations

**NOT compatible with:**
- Virtual scrolling
- Infinite scrolling
- Row drag and drop
- Column virtualization
- Detail template
- Editing
- Export (Excel, PDF, CSV)

**Use row spanning when:** Need to visualize schedule (time grids), salary structures, continuous identical values

**Don't use when:** Need pagination, sorting, filtering - spanning breaks these features
