# Column Spanning

Column spanning in the Syncfusion Vue TreeGrid allows merging adjacent cells horizontally, creating a visually appealing and informative layout. You can enable automatic spanning of cells with identical values or use the `queryCellInfo` event for manual control over which cells to span.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Column Spanning via API](#column-spanning-via-api)
- [Column Spanning via queryCellInfo Event](#column-spanning-via-querycellinfo-event)

## When to Use

Use column spanning when you need to:
- **Merge identical repeated values** - Reduce visual clutter
- **Schedule/Timeline grids** - Merge time slots for activities
- **Status tracking** - Span identical statuses across columns
- **Project schedules** - Merge adjacent same-value columns
- **Compliance tracking** - Group related status columns
- **Personnel assignments** - Merge duplicate team assignments
- **Cost summaries** - Merge identical budget values
- **Eliminate redundancy** - Show "Status", "Permit Status", "Inspection Status" cleanly
- **Improve readability** - Create cleaner, more professional layouts

## Mandatory Rules

Before implementing column spanning:
- ✓ **Not compatible with Virtual Scrolling** - Disable virtualization
- ✓ **Not compatible with Infinite Scrolling** - Cannot be combined
- ✓ **Not compatible with Row Drag & Drop** - Disable this feature
- ✓ **Not compatible with Column Virtualization** - Disable column virtualization
- ✓ **Not compatible with Detail Template** - Remove detail templates
- ✓ **Not compatible with Editing** - Readonly TreeGrid only
- ✓ **Not compatible with Export** - Export features not supported
- ✓ **updateCell() not supported** - Use refresh() instead
- ✓ **Vue Template Columns**: Use `<e-column>` elements only
- ✓ **TreeGrid must be readonly** - Spanning not supported in editable mode

## Column Spanning via API

Set the `enableColumnSpan` property to true.

```vue
<template>
  <div id="app">
    <ejs-treegrid
      :dataSource="data"
      childMapping="children"
      :treeColumnIndex="0"
      :enableColumnSpan="true"
      :height="400"
    >
      <e-columns>
        <e-column
          field="activityName"
          headerText="Activity"
          width="250"
        ></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  {
    activityName: 'Project Planning',
    ---
  }
]);

provide('treegrid', []);
</script>
```

### Key Properties

- **`enableColumnSpan`** (boolean): Enable/disable automatic spanning at TreeGrid level
- **`enableColumnSpan`** (column level): Set to `false` on specific columns to exclude from spanning (e.g., financial columns)
- Cells with identical values in consecutive columns automatically merge
- Zero height rows are skipped in auto-spanning

### Disable Spanning for Specific Columns

```vue
<e-column
    field="activityName"
    headerText="Activity"
    :enableColumnSpan="false"
></e-column>
```

## Column Spanning via queryCellInfo Event

For manual control over cell spanning, use the `queryCellInfo` event and set the `colSpan` attribute for specific columns.

### Manual Spanning for Schedule/Timeline Grid

```vue
<template>
  <div id="app">
    <ejs-treegrid
      :dataSource="data"
      :treeColumnIndex="1"
      childMapping="subtasks"
      :queryCellInfo="queryCellInfoEvent"
    >
      <e-columns>
        <e-column
          field="ChannelID"
          headerText="Channel ID"
          width="150"
          textAlign="Right"
          :isPrimaryKey="true"
        ></e-column>
        <e-column
          field="NineAM"
          headerText="9 AM"
          width="200"
        ></e-column>
        <e-column
          field="TenAM"
          headerText="10 AM"
          width="200"
        ></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  {
    ChannelID: 10001,
    NineAM: 'Movie',
    TenAM: 'Movie',
  },
  {
    ChannelID: 10002,
    NineAM: 'Movie',
    TenAM: 'Movie',
  }
]);

const queryCellInfoEvent = (args) => {
  const data = args.data;
  
  if (data.ChannelID === 10001) {
    if (args.column.field === 'NineAM') {
      args.colSpan = 2;
    }
  }
};

provide('treegrid', []);
</script>
```

### queryCellInfo Event Handler

Use `args.colSpan` to specify how many columns to merge:

```javascript
const queryCellInfoEvent = (args) => {
  const cellData = args.data;
  const columnField = args.column.field;
  
  // Example: Span cells where status is "Active"
  if (cellData.Status === 'Active' && columnField === 'startColumn') {
    args.colSpan = 3;  // Merge 3 consecutive columns
  }
  
  // Example: Span based on employee ID
  if (cellData.EmployeeID === 10001 && columnField === 'timeSlot1') {
    args.colSpan = 2;  // Merge 2 columns
  }
};
```

### Key Properties

- **`queryCellInfo` event**: Fires for every cell, allows dynamic spanning
- **`args.colSpan`**: Set to number of columns to span (2-n)
- **`args.column.field`**: Current column field being rendered
- **`args.data`**: Current row data object
