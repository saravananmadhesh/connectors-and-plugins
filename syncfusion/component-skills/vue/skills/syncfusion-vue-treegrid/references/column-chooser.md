# Column Chooser

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Column Chooser](#basic-column-chooser)
- [Column Chooser Settings](#column-chooser-settings)
- [Column Chooser With Search](#column-chooser-with-search)
- [Custom Column Chooser Template](#custom-column-chooser-template)
- [Initially Hidden Columns](#initially-hidden-columns)
- [Programmatically Control Columns](#programmatically-control-columns)

## Overview

Column Chooser allows users to show or hide TreeGrid columns dynamically. Enable it by setting `showColumnChooser` to true and adding 'ColumnChooser' to the toolbar. Users can toggle column visibility through a dialog or custom template.

## When to Use

Use column chooser when you need to:
- **Customizable columns** - Users select which to display
- **Reduce clutter** - Show only relevant columns
- **Save user preferences** - Remember choices
- **Mobile-friendly** - Hide non-essential columns
- **Large datasets** - Too many columns to display
- **Multiple roles** - Different users see different data
- **Print-friendly** - Choose what to print
- **Space-constrained UX** - Limited viewport width
- **Advanced filtering** - Hide columns temporarily

## Mandatory Rules

Before implementing column chooser:
- ✓ **showColumnChooser**: Set `:showColumnChooser="true"` on TreeGrid
- ✓ **ColumnChooser Module**: Import and provide ColumnChooser module
- ✓ **Toolbar**: Add 'ColumnChooser' to toolbar array
- ✓ **Visible Property**: Set `:visible="true"` or `:visible="false"` on columns
- ✓ **TreeGrid Columns**: Define columns using e-column directives

## Basic Column Chooser

Enable column chooser with toolbar button:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :showColumnChooser="true"
    :toolbar="['ColumnChooser']">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Duration" width=100 textAlign="Right"></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
      <e-column field="status" headerText="Status" width=100></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, ColumnChooser } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);

const data = ref([
  { 
    taskID: 1, 
    taskName: 'Planning', 
    duration: 10, 
    priority: 'High', 
    status: 'Open',
    subtasks: []
  },
  { 
    taskID: 2, 
    taskName: 'Development', 
    duration: 20, 
    priority: 'High', 
    status: 'In Progress',
    subtasks: []
  }
]);

provide('treegrid', [Toolbar, ColumnChooser]);
</script>
```

## Column Chooser Settings

Configure the column chooser dialog with `columnChooserSettings`:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnChooser="true"
    :toolbar="['ColumnChooser']"
    :columnChooserSettings="columnChooserSettings">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
      <e-column field="status" headerText="Status" width=100></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Toolbar, ColumnChooser } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const columnChooserSettings = ref({
  enableSearching: false,  // Show/hide search input
  mode: 'Dialog'           // Dialog or Immediate
});

provide('treegrid', [Toolbar, ColumnChooser]);
</script>
```

**columnChooserSettings Properties:**
- `enableSearching` - Enable search input to filter columns
- `mode` - 'Dialog' (modal dialog) or 'Immediate' (apply changes immediately)
- `template` - Custom template for chooser content
- `headerTemplate` - Custom header template
- `footerTemplate` - Custom footer template
- `renderCustomColumnChooser` - Override default column chooser UI

## Column Chooser With Search

Enable search functionality in column chooser:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnChooser="true"
    :toolbar="['ColumnChooser']"
    :columnChooserSettings="columnChooserSettings">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Duration" width=100></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
      <e-column field="status" headerText="Status" width=100></e-column>
      <e-column field="assignee" headerText="Assigned To" width=150></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Toolbar, ColumnChooser } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const columnChooserSettings = ref({
  enableSearching: true  // Enable search input for many columns
});

provide('treegrid', [Toolbar, ColumnChooser]);
</script>
```

## Custom Column Chooser Template

Customize the column chooser dialog with header, content, and footer templates:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnChooser="true"
    :toolbar="['ColumnChooser']"
    :columnChooserSettings="columnChooserSettings">
    <e-columns>
      <e-column field="orderID" headerText="Order ID" width=90 textAlign="Right"></e-column>
      <e-column field="orderName" headerText="Order Name" width=180></e-column>
      <e-column field="shipmentCategory" headerText="Shipment Category" width=150></e-column>
      <e-column field="units" headerText="Units" width=90></e-column>
      <e-column field="unitPrice" headerText="Unit Price ($)" width=150 format="C2"></e-column>
    </e-columns>

    <!-- Column Chooser Header Template -->
    <template v-slot:headerTemplate>
      <div style="padding: 10px; font-weight: bold; color: #0078d4;">
        📋 Column Options
      </div>
    </template>

    <!-- Column Chooser Content Template -->
    <template v-slot:template="{ data: columns }">
      <div style="padding: 10px;">
        <div v-if="columns && columns.length">
          <div v-for="column in columns" :key="column.uid" style="margin: 8px 0;">
            <label style="display: flex; align-items: center;">
              <input 
                type="checkbox" 
                :checked="column.visible"
                @change="(e) => handleColumnChange(column, e.target.checked)"
                style="margin-right: 8px;">
              <span>{{ column.headerText }}</span>
            </label>
          </div>
        </div>
        <div v-else style="color: #999; padding: 10px;">No columns match your search</div>
      </div>
    </template>

    <!-- Column Chooser Footer Template -->
    <template v-slot:footerTemplate>
      <div style="border-top: 1px solid #ddd; padding: 10px; display: flex; gap: 8px;">
        <ejs-button @click="applyColumnChanges" style="background: #0078d4; color: white;">
          Apply Changes
        </ejs-button>
        <ejs-button @click="closeColumnChooser" style="background: #f0f0f0; color: #333;">
          Cancel
        </ejs-button>
      </div>
    </template>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, ref, provide } from 'vue';
import { Toolbar, ColumnChooser } from '@syncfusion/ej2-vue-treegrid';
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';

const gridInstance = ref(null);
const data = ref([...]);
const columnChanges = ref({});

const columnChooserSettings = ref({
  enableSearching: true,
  template: 'template',
  headerTemplate: 'headerTemplate',
  footerTemplate: 'footerTemplate'
});

const handleColumnChange = (column, isChecked) => {
  columnChanges.value[column.uid] = isChecked;
};

const applyColumnChanges = () => {
  const gridObj = gridInstance.value?.ej2_instances?.[0];
  if (gridObj) {
    Object.entries(columnChanges.value).forEach(([columnUid, isVisible]) => {
      const column = gridObj.getColumnByUid(columnUid);
      if (column) {
        gridObj.hideColumns(column.field, !isVisible);
      }
    });
    gridObj.columnChooserModule?.hideDialog();
  }
};

const closeColumnChooser = () => {
  const gridObj = gridInstance.value?.ej2_instances?.[0];
  if (gridObj) {
    gridObj.columnChooserModule?.hideDialog();
  }
};

provide('treegrid', [Toolbar, ColumnChooser]);
</script>
```

## Initially Hidden Columns

Some columns hidden by default:

```vue
<template>
  <button @click="showChooser">Show All Columns</button>

  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :enableColumnChooser="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100 :visible="true"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200 :visible="true"></e-column>
      <e-column field="notes" headerText="Notes" width=200 :visible="false"></e-column>
      <e-column field="internalNotes" headerText="Internal" width=200 :visible="false"></e-column>
      <e-column field="costCenter" headerText="Cost Center" width=100 :visible="false"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { ColumnChooser } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const showChooser = () => {
  gridInstance.value.openColumnChooser();
};

provide('treegrid', [ColumnChooser]);
</script>
```


## Programmatically Control Columns

Show or hide columns via code:

```vue
<template>
  <div style="margin-bottom: 15px;">
    <ejs-button @click="showAllColumns">Show All</ejs-button>
    <ejs-button @click="hideNonCritical">Hide Non-Critical</ejs-button>
    <ejs-button @click="toggleColumn">Toggle Duration</ejs-button>
  </div>

  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :showColumnChooser="true"
    :toolbar="['ColumnChooser']">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Duration" width=100></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
      <e-column field="status" headerText="Status" width=100></e-column>
      <e-column field="notes" headerText="Notes" width=200 visible="false"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Toolbar, ColumnChooser } from '@syncfusion/ej2-vue-treegrid';
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';

const gridInstance = ref(null);
const data = ref([...]);

const showAllColumns = () => {
  const gridObj = gridInstance.value?.ej2_instances?.[0];
  if (gridObj) {
    gridObj.showColumns(['taskID', 'taskName', 'duration', 'priority', 'status', 'notes']);
  }
};

const hideNonCritical = () => {
  const gridObj = gridInstance.value?.ej2_instances?.[0];
  if (gridObj) {
    gridObj.hideColumns(['notes', 'duration']);
  }
};

const toggleColumn = () => {
  const gridObj = gridInstance.value?.ej2_instances?.[0];
  if (gridObj) {
    const col = gridObj.getColumnByField('duration');
    if (col && col.visible) {
      gridObj.hideColumns('duration');
    } else {
      gridObj.showColumns('duration');
    }
  }
};

provide('treegrid', [Toolbar, ColumnChooser]);
</script>
```
