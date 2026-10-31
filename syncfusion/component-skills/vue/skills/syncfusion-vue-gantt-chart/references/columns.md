# Columns

## Table of Contents
- [Defining Columns](#defining-columns)
- [Column Directives vs columns Prop](#column-directives-vs-columns-prop)
- [Common Column Properties](#common-column-properties)
- [Column Reordering](#column-reordering)
- [Column Resizing](#column-resizing)
- [Frozen Columns](#frozen-columns)
- [Column Spanning](#column-spanning)
- [Column Menu](#column-menu)
- [Column Templates](#column-templates)
- [WBS Column](#wbs-column)
- [Checkbox Column](#checkbox-column)
- [Responsive Columns](#responsive-columns)

## Defining Columns

Two ways to define columns — both are equivalent. Use whichever fits your pattern.

### Via `columns` prop (Options API-friendly)

```vue
<ejs-gantt :columns="columns" ...></ejs-gantt>

<script>
const columns = [
  { field: 'TaskID',   headerText: 'ID',        width: 70,  textAlign: 'Left' },
  { field: 'TaskName', headerText: 'Task Name',  width: 200, clipMode: 'EllipsisWithTooltip' },
  { field: 'StartDate',headerText: 'Start',      width: 100, format: 'yMd' },
  { field: 'Duration', headerText: 'Duration',   width: 80  },
  { field: 'Progress', headerText: 'Progress %', width: 100 },
  { field: 'Predecessor', headerText: 'Depends', width: 120 },
];
</script>
```

## Column Directives vs columns Prop

### Via `e-columns` / `e-column` directives (Composition API-friendly)

```vue
<template>
  <ejs-gantt :dataSource="data" :taskFields="taskFields" height="450px">
    <e-columns>
      <e-column field="TaskID"   headerText="ID"        width="70"  textAlign="Left"></e-column>
      <e-column field="TaskName" headerText="Task Name" width="200" clipMode="EllipsisWithTooltip" :isPrimaryKey="true"></e-column>
      <e-column field="StartDate" headerText="Start"   width="100" format="yMd"></e-column>
      <e-column field="Duration"  headerText="Duration" width="80"></e-column>
    </e-columns>
  </ejs-gantt>
</template>

<script setup>
import {
  GanttComponent as EjsGantt,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn
} from '@syncfusion/ej2-vue-gantt';
</script>
```

## Common Column Properties

| Property | Type | Description |
|---|---|---|
| `field` | string | Data source field name |
| `headerText` | string | Column header label |
| `width` | number/string | Column width in px |
| `minWidth` | number | Minimum width during resize |
| `textAlign` | string | `Left`, `Center`, `Right` |
| `format` | string/object | Date/number format (e.g. `'yMd'`, `{ type: 'date', format: 'MM/dd/yyyy' }`) |
| `clipMode` | string | `Clip`, `Ellipsis`, `EllipsisWithTooltip` |
| `visible` | boolean | Show/hide column |
| `allowEditing` | boolean | Per-column editing override |
| `isPrimaryKey` | boolean | Marks primary key column for CRUD |
| `freeze` | string | `Left` or `Right` to freeze |
| `template` | string | Vue template for custom cell rendering |
| `headerTemplate` | string | Vue template for custom header rendering |
| `type` | string | `string`, `number`, `date`, `boolean` |

## Column Reordering

```vue
<ejs-gantt :allowReordering="true" ...></ejs-gantt>
```

Users can drag column headers to reorder them. Listen to `columnDrop` event to detect changes.

## Column Resizing

```vue
<ejs-gantt :allowResizing="true" ...></ejs-gantt>
```

Set `minWidth` on columns to prevent them from being dragged too narrow.

## Frozen Columns

Freeze columns to the left so they stay visible during horizontal scroll:

```vue
<ejs-gantt :frozenColumns="2" ...></ejs-gantt>
```

Or freeze individual columns via the `freeze` property:
```js
{ field: 'TaskName', headerText: 'Task Name', width: 200, freeze: 'Left' }
```

## Column Spanning

Span a cell across multiple columns using `colSpan`:

```js
const columns = [
  { field: 'TaskName', headerText: 'Task Name', width: 200, allowEditing: false },
];
```

For header spanning (stacked headers):
```js
const columns = [
  {
    headerText: 'Scheduling Info',
    columns: [
      { field: 'StartDate', headerText: 'Start', width: 100 },
      { field: 'EndDate',   headerText: 'End',   width: 100 },
      { field: 'Duration',  headerText: 'Days',  width: 80  },
    ]
  }
];
```

## Column Menu

Show a context menu on column headers with sort, filter, freeze, and column chooser actions:

```vue
<ejs-gantt :showColumnMenu="true" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { ColumnMenu } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [ColumnMenu]);
</script>
```

## Column Templates

Render custom Vue content in a cell using `template`:

```vue
<e-column field="Progress" headerText="Progress" width="150" :template="progressTemplate"></e-column>

<script setup>
import { h, ref } from 'vue';
const progressTemplate = (props) => {
  return h('div', { class: 'progress-bar' }, [
    h('span', { style: `width: ${props.Progress}%` })
  ]);
};
</script>
```

## Serial Number Column

Display an auto-incrementing serial number (row index) in a dedicated column. Serial number columns are useful for quick reference, printing, and exporting.

### Enable Serial Number Column

Use the `type: 'RowNumber'` property to add a serial number column:

```vue
<template>
  <ejs-gantt :dataSource="data" :taskFields="taskFields" height="450px">
    <e-columns>
      <e-column type="RowNumber" width="50"></e-column>
      <e-column field="TaskID" headerText="ID" width="70"></e-column>
      <e-column field="TaskName" headerText="Task Name" width="200"></e-column>
    </e-columns>
  </ejs-gantt>
</template>

<script setup>
import { GanttComponent as EjsGantt, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-gantt';
</script>
```

Or via the `columns` prop:

```js
const columns = [
  { type: 'RowNumber', width: 50, headerText: '#' },
  { field: 'TaskName', headerText: 'Task Name', width: 200 },
  { field: 'Duration', headerText: 'Duration', width: 80 },
];
```

### Serial Number Column Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | string | — | Set to `'RowNumber'` to render a serial number column |
| `headerText` | string | `'S. No'` | Header label for the serial number column |
| `width` | number | 50 | Column width in pixels |
| `freeze` | string | — | Optionally freeze this column |
| `textAlign` | string | `'Right'` | Alignment of the serial numbers |
| `allowSorting` | boolean | `false` | Sorting is disabled for serial number columns |
| `allowFiltering` | boolean | `false` | Filtering is disabled for serial number columns |

### Serial Number Behavior During Operations

The serial number column behaves consistently during various Gantt operations:

#### Sorting

Serial numbers are **not** affected by sorting and maintain a stable, sequential display:

```
Before Sort:          After Sort (by TaskName):
1. Design             1. Approval
2. Review             2. Design
3. Approval           3. Review
```

The serial numbers remain 1, 2, 3 (unchanged), even though rows reorder.

#### Filtering

Serial numbers update dynamically when filtering, showing only visible rows:

```
All Rows:             Filtered (Progress > 50%):
1. Task A (50%)       1. Task B (75%)
2. Task B (75%)       2. Task D (80%)
3. Task C (30%)
4. Task D (80%)
```

Only filtered rows are numbered; hidden rows are excluded.

#### Virtualization

With virtual scrolling, serial numbers continue numbering sequentially as rows render:

```
Virtual rows visible: 15-40
Serial numbers shown: 15, 16, 17, ..., 40
```

#### Row Drag and Drop

When rows are reordered via drag-drop, serial numbers update to reflect the new sequence:

```
Before Drag:          After Drag (move row 2 to position 4):
1. Task A             1. Task A
2. Task B             2. Task D
3. Task C             3. Task E
4. Task D             4. Task B
5. Task E             5. Task C
```

#### Paging

Serial numbers restart at 1 for each page (or use absolute numbering per configuration):

```
Page 1:               Page 2:
1. Task A             1. Task L  (or 11. Task L if absolute numbering)
2. Task B             2. Task M
3. Task C             3. Task N
...                   ...
10. Task J            10. Task U
```

#### Parent and Child Rows

Serial numbers account for hierarchy, numbering each visible row including parent rows:

```
1. Project
   2. Phase 1
      3. Task 1
      4. Task 2
   5. Phase 2
      6. Task 3
      7. Task 4
8. Documentation
```

### Example: Serial Number Column with Filtering

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :columns="columns"
    :allowFiltering="true"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  { type: 'RowNumber', headerText: '#', width: 50 },
  { field: 'TaskName', headerText: 'Task Name', width: 200 },
  { field: 'StartDate', headerText: 'Start', width: 100, format: 'yMd' },
  { field: 'Progress', headerText: 'Progress', width: 100 }
];

const data = [
  { TaskID: 1, TaskName: 'Planning', StartDate: new Date('04/02/2024'), Progress: 100 },
  { TaskID: 2, TaskName: 'Design', StartDate: new Date('04/05/2024'), Progress: 75 },
  { TaskID: 3, TaskName: 'Development', StartDate: new Date('04/10/2024'), Progress: 50 },
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration'
};
</script>
```

### Best Practices

1. **Keep Width Small** — Serial numbers don't need much space; use 40-60 pixels width.

2. **Position at Start** — Place the serial number column first for quick reference.

3. **Freeze if Horizontal Scrolling** — Use `freeze: 'Left'` to keep serial numbers visible when scrolling.

4. **Disable Editing** — Serial numbers are auto-generated and cannot be edited.

5. **Use with Printing** — Serial numbers help identify rows when printing or exporting to Excel/PDF.

---

## WBS Column

Display the Work Breakdown Structure (task outline number) in a dedicated column:

```js
const columns = [
  { field: 'TaskName', headerText: 'Task Name', width: 200 },
  { field: 'wbsCode',  headerText: 'WBS',       width: 100 },  // auto-generated outline number
];
```

Enable WBS generation:
```vue
<ejs-gantt :enableWBS="true" ...></ejs-gantt>
```

## Checkbox Column

Add a checkbox column for multi-row selection:

```js
const columns = [
  { type: 'checkboxselect', width: 50 },
  { field: 'TaskName', headerText: 'Task Name', width: 200 },
];
```

## Responsive Columns

Hide columns on smaller screens using `hideAtMedia`:

```js
{ field: 'Duration', headerText: 'Duration', width: 80, hideAtMedia: '(max-width: 768px)' }
```
