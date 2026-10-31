# Columns Configuration

Column definitions are essential to TreeGrid operation. The `field` property maps data source values to columns, and all TreeGrid operations like sorting, filtering, and searching are performed based on column definitions.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Column Definitions](#column-definitions)
- [Column Properties](#column-properties)
- [Column Type](#column-type)
- [Column Formatting](#column-formatting)
- [Lock Columns](#lock-columns)
- [ValueAccessor](#valueaccessor)
- [Boolean Display as Checkbox](#boolean-display-as-checkbox)
- [Header Templates](#header-templates)
- [Column Templates](#column-templates)
- [Complex Data Binding](#complex-data-binding)
- [Responsive Columns](#responsive-columns)

## When to Use

Use Syncfusion TreeGrid columns when you need to:
- **Display hierarchical data** in a structured column layout
- **Configure multiple columns** with different data types and formats
- **Enable sorting by column** - user clicks column header to sort
- **Implement column filtering** - users filter by column values
- **Create read-only or editable columns** - different data types require different edit types
- **Show formatted values** - use column formatting for numbers, dates, currencies
- **Display custom content** - use column templates for rich layouts
- **Complex data binding** - access nested object properties with dot notation
- **Show/hide columns** - toggle visibility based on user preference
- **Lock columns** - freeze columns while scrolling

## Mandatory Rules

Before configuring columns, ensure:
- ✓ **Field Names Required**: At least one column must have a `field` property matching your data source
- ✓ **Primary Key**: For editing, mark one column with `:isPrimaryKey='true'`
- ✓ **Column Index**: Set `:treeColumnIndex='0'` (or appropriate column) to specify which column shows tree expand/collapse
- ✓ **Type Property**: Specify `type='date'`, `type='number'`, etc. for proper sorting/filtering/formatting
- ✓ **Width Values**: Use numeric values without quotes (width=100 not width='100')

## Column Definitions

Define columns using `<e-column>` template elements within `<e-columns>`:

```vue
<template>
  <div>
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="0"
      childMapping="subtasks">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=100 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="startDate" headerText="Start Date" width=150 type="date" format="yMd" textAlign="Right"></e-column>
        <e-column field="duration" headerText="Duration" width=100 type="number" textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', startDate: new Date('02/03/2017'), duration: 5, subtasks: [...] },
  { taskID: 6, taskName: 'Design', startDate: new Date('02/10/2017'), duration: 3, subtasks: [...] }
]);
</script>
```

## Column Properties

Common column configuration properties:

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `field` | string | - | Data source property name (required) - USE camelCase |
| `headerText` | string | `field` | Column header display text |
| `width` | number | `auto` | Column width in pixels (NO quotes) |
| `type` | string | `string` | Data type (string, number, date, boolean) |
| `format` | string | - | Number/date format (e.g., 'C2', 'yMd') |
| `allowSorting` | boolean | true | Enable column sorting |
| `allowFiltering` | boolean | true | Enable column filtering |
| `allowSearching` | boolean | true | Include in search results |
| `visible` | boolean | true | Show column in grid |
| `:isPrimaryKey` | boolean | false | Mark as primary identifier (for editing) |
| `textAlign` | string | 'Left' | Column alignment (Left, Right, Center) |

## Column Type

Supported column types:
- **`string`** - Text values (default if not specified)
- **`number`** - Numeric values
- **`boolean`** - True/False values
- **`date`** - Date values
- **`datetime`** - Date and time values

The `type` property is essential for:
- Proper formatting (e.g., format='C2' requires type='number')
- Correct sorting order
- Accurate filtering operations

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="0">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" type="number" width=100 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" type="string" width=200></e-column>
      <e-column field="startDate" headerText="Start Date" type="date" format="yMd" width=150></e-column>
      <e-column field="approved" headerText="Approved" type="boolean" width=100></e-column>
    </e-columns>
  </ejs-treegrid>
</template>
```

## Column Formatting

Format cell values based on data type using the `format` property.

### Number Formatting

Number format strings (requires type='number'):

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="0">
    <e-columns>
      <!-- Currency format -->
      <e-column field="price" headerText="Price" type="number" format="C2" width=120 textAlign="Right"></e-column>
      
      <!-- Number with thousands separator -->
      <e-column field="quantity" headerText="Quantity" type="number" format="N0" width=120 textAlign="Right"></e-column>
      
      <!-- Percentage -->
      <e-column field="discount" headerText="Discount" type="number" format="P2" width=120 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>
```

Format codes:
- `C` - Currency (C2 = two decimals): $1,234.50
- `N` - Numeric (N2 = two decimals): 1,234.50
- `P` - Percentage (P2 = two decimals): 12.34%

### Date Formatting

Date format strings (requires type='date' or type='datetime'):

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="0">
    <e-columns>
      <!-- Built-in format -->
      <e-column field="startDate" headerText="Start Date" type="date" format="yMd" width=150></e-column>
      
      <!-- Custom format -->
      <e-column field="dueDate" headerText="Due Date" type="date" :format="dateFormat" width=150></e-column>
      
      <!-- DateTime format -->
      <e-column field="createdAt" headerText="Created" type="datetime" format="dd/MM/yyyy hh:mm a" width=180></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
const dateFormat = { type: 'date', format: 'dd/MM/yyyy' };
</script>
```

Built-in date codes:
- `yMd` - 3/15/2023
- `short` - 3/15/23
- `medium` - Mar 15, 2023

Custom date format examples:
- `dd/MM/yyyy` - 04/07/1996
- `dd.MM.yyyy` - 04.07.1996
- `dd/MM/yyyy hh:mm a` - 04/07/1996 12:00 AM

## Lock Columns

Lock specific columns using the `lockColumn` property.

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowReordering="true"
    height="315px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column 
        field="taskName" 
        headerText="Task Name" 
        width=180
        :lockColumn="true">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Reorder } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);
provide('treegrid', [Reorder]);
</script>
```

## ValueAccessor

Use `valueAccessor` for custom value formatting and manipulation. Useful for:
- Combining multiple fields
- Formatting display values
- Creating calculated/expression columns
- Displaying array values

### Display Array Type Columns

Combine array values into a single column:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="1" height="315px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=110 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <!-- Display combined name from array -->
      <e-column 
        field="name" 
        headerText="Assignee" 
        width=150
        :valueAccessor="valueAccess">
      </e-column>
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const valueAccess = (field, data, column) => {
  // Combine firstName and lastName from array
  return data[field]
    .map((s) => s.lastName || s.firstName)
    .join(' ');
};
</script>
```

### Expression Column

Create calculated columns:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="1" height="315px">
    <e-columns>
      <e-column field="orderID" headerText="Order ID" width=110 textAlign="Right"></e-column>
      <e-column field="orderName" headerText="Order Name" width=210></e-column>
      <e-column field="units" headerText="Units" width=120 textAlign="Right"></e-column>
      <e-column field="unitPrice" headerText="Unit Price" width=120 textAlign="Right"></e-column>
      <!-- Calculated price column -->
      <e-column 
        field="price" 
        headerText="Total Price" 
        width=120
        :valueAccessor="totalPrice"
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const totalPrice = (field, data, column) => {
  return data.units * data.unitPrice;
};
</script>
```

## Boolean Display as Checkbox

Render boolean values as checkboxes using the `displayAsCheckBox` property:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="1" height="315px">
    <e-columns>
      <!-- Boolean rendered as checkbox -->
      <e-column 
        field="approved" 
        headerText="Approved" 
        width=90
        displayAsCheckBox="true">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  { taskID: 1, taskName: 'Planning', approved: true, duration: 5 },
  { taskID: 2, taskName: 'Design', approved: false, duration: 3 }
]);
</script>
```

## Header Templates

Customize column headers with templates:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="0" height="315px">
    <e-columns>
      <!-- Custom header template -->
      <e-column field="taskName" :headerTemplate="projectHeaderTemplate" width=180></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { createApp } from 'vue';

const app = createApp({});

// Task Name header with icon
const projectHeaderTemplate = () => ({
  template: app.component('projectHeader', {
    template: '<div><img src="task-icon.png" width=20 height=20/> Task Name</div>'
  })
});
</script>
```

## Column Templates

Display custom content in cells instead of plain values using the `template` property:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="0" height="260px">
    <e-columns>
      <e-column field="EmpID" headerText="Employee ID" width=95></e-column>
      <e-column field="Name" headerText="Name" width=110></e-column>
      <e-column field="status" headerText="Status" :template="statusTemplate" width=120></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { createApp } from 'vue';

const app = createApp({});

// Status badge template
const statusBadgeComponent = app.component('statusBadge', {
  template: `<span :class="'status-' + data.status" style="padding: 4px 8px; border-radius: 4px; font-weight: bold;">
      {{ data.status }}
    </span>`,
  data() {
    return {
      data: {}
    };
  }
});

const data = ref([
  { EmpID: 1, Name: 'John', status: 'Active', progress: 75 },
  { EmpID: 2, Name: 'Jane', status: 'Completed', progress: 100 }
]);

const statusTemplate = () => ({
  template: statusBadgeComponent
});

</script>
```

## Complex Data Binding

Access nested properties using dot notation:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="1" height="315px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=180></e-column>
      <!-- Access nested property: assignee.firstName -->
      <e-column field="assignee.firstName" headerText="Assignee" width=90></e-column>
      <!-- Access nested numeric property -->
      <e-column field="team.size" headerText="Team Size" width=80 type="number" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    taskID: 1,
    taskName: 'Planning',
    assignee: { firstName: 'John', lastName: 'Doe' },
    team: { lead: 'Jane', size: 5 },
    subtasks: [
      { taskID: 2, taskName: 'Analysis', assignee: { firstName: 'Jane', lastName: 'Smith' }, team: { lead: 'Bob', size: 3 } }
    ]
  }
]);
</script>
```

## Responsive Columns

Hide columns based on screen size using the `hideAtMedia` property with CSS media queries:

```vue
<template>
  <ejs-treegrid :dataSource="data" :treeColumnIndex="1" height="315px">
    <e-columns>
      <!-- Hide on screens wider than 700px -->
      <e-column 
        field="taskID" 
        headerText="Task ID" 
        width=90
        hideAtMedia="(min-width: 700px)"
        textAlign="Right">
      </e-column>
      
      <!-- Hide on screens narrower than 500px (mobile) -->
      <e-column 
        field="startDate" 
        headerText="Start Date" 
        format="yMd" 
        type="date"
        width=90
        hideAtMedia="(max-width: 500px)"
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([...]);
</script>
```

Media query examples:
- `(max-width: 500px)` - Hide on mobile devices
- `(min-width: 700px)` - Hide on desktop
- `(max-width: 768px)` - Hide on tablets and below
- `(min-width: 768px)` - Hide on mobile only
