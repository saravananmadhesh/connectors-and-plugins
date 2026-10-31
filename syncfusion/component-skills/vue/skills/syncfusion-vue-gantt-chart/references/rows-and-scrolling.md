# Rows and Scrolling

## Table of Contents
- [Row Height](#row-height)
- [Row Template](#row-template)
- [Row Drag and Drop](#row-drag-and-drop)
- [Expand and Collapse Rows](#expand-and-collapse-rows)
- [Row Events](#row-events)
- [Customize Rows and Cells](#customize-rows-and-cells)
- [Alternate Row Styling](#alternate-row-styling)
- [Row Spanning](#row-spanning)
- [Clip Mode](#clip-mode)
- [Scrolling Overview](#scrolling-overview)
- [Scroll to a Task](#scroll-to-a-task)
- [Responsive Container](#responsive-container)
- [Virtual Scrolling](#virtual-scrolling)
- [Frozen Rows (Sticky)](#frozen-rows-sticky)

## Row Height

Set a uniform row height for all rows:

```vue
<ejs-gantt :rowHeight="50" ...></ejs-gantt>
```

Default is `46px`. Increasing this gives more vertical space for multi-line content.

## Row Template

Render a custom row using `rowTemplate`. The template replaces the entire grid-side row:

```vue
<ejs-gantt :rowTemplate="'rowTemplate'" :frozenColumns="2" ...>
  <template v-slot:rowTemplate="{ data }">
    <tr>
      <td>{{ data.taskData.TaskID }}</td>
      <td>
        <span :class="`status-badge ${data.taskData.Status}`">
          {{ data.taskData.TaskName }}
        </span>
      </td>
    </tr>
  </template>
</ejs-gantt>
```

> ⚠️ When using `rowTemplate`, you are fully responsible for rendering table cells. The number of `<td>` elements must match the frozen column count and visible columns.

## Row Drag and Drop

Allow users to reorder rows by dragging them. Inject `RowDD` and `Edit` modules:

```vue
<ejs-gantt :allowRowDragAndDrop="true" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { RowDD, Edit, Selection } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [RowDD, Edit, Selection]);
</script>
```

### Multiple row drag and drop

Enable `selectionSettings.type: 'Multiple'` to drag multiple rows simultaneously:

```vue
<ejs-gantt :allowRowDragAndDrop="true" :selectionSettings="{ type: 'Multiple' }" ...></ejs-gantt>
```

### Taskbar drag and drop between rows

Move tasks by dragging their taskbar to reposition them as sibling or child:

```vue
<ejs-gantt :allowRowDragAndDrop="true" :allowTaskbarDragAndDrop="true" :editSettings="editSettings" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { RowDD, Edit } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [RowDD, Edit]);

const editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, allowTaskbarEditing: true };
</script>
```

### Drag between two Gantt instances

```vue
<ejs-gantt id="Gantt1" :allowRowDragAndDrop="true" :targetID="'Gantt2'" ...></ejs-gantt>
<ejs-gantt id="Gantt2" :allowRowDragAndDrop="true" ...></ejs-gantt>
```

### Prevent dragging specific rows

Use `rowDragStartHelper` to cancel drag for particular records:

```vue
<ejs-gantt :rowDragStartHelper="onDragStartHelper" ...></ejs-gantt>

<script setup>
function onDragStartHelper(args) {
  const record = args.data[0] ? args.data[0] : args.data;
  if (record.ganttProperties.taskId <= 4) {
    args.cancel = true;  // prevent drag for first 4 tasks
  }
}
</script>
```

### Validate drop position

Use `rowDrop` to cancel or restrict drops:

```vue
<ejs-gantt :rowDrop="onRowDrop" ...></ejs-gantt>

<script setup>
function onRowDrop(args) {
  if (args.dropPosition === 'middleSegment') {
    args.cancel = true;  // prevent dropping as child
  }
}
</script>
```

### Programmatic row drag and drop

Use `reorderRows` to move rows programmatically:

```js
const gantt = this.$refs.ganttRef.ej2Instances;
gantt.reorderRows([1, 2, 3], 4, 'child');   // move rows 1,2,3 as children of row 4
gantt.reorderRows([2], 0, 'above');          // move row 2 above row 0
```

`reorderRows(fromIndexes, toIndex, position)` — position: `'above'` | `'below'` | `'child'`

### Row DD events

| Event | When fired |
|---|---|
| `rowDragStartHelper` | On clicking drag icon / row — use `args.cancel = true` to prevent |
| `rowDragStart` | When drag begins |
| `rowDrag` | While dragging |
| `rowDrop` | When dropped — use `args.cancel = true` to prevent; `args.dropPosition` = drop location |

## Expand and Collapse Rows

```js
this.$refs.gantt.expandAll();
this.$refs.gantt.collapseAll();
this.$refs.gantt.expandByID(2);
this.$refs.gantt.collapseByID(2);
this.$refs.gantt.collapseByIndex(2);  // by zero-based row index
```

### Initial collapsed state

Collapse all parent tasks at load time:

```vue
<ejs-gantt :collapseAllParentTasks="true" ...></ejs-gantt>
```

### Per-task expand state from data

Map a boolean field in your data to control each task's initial expand/collapse state:

```js
// data field: isExpand: true/false
taskFields: {
  id: 'TaskID',
  name: 'TaskName',
  expandState: 'isExpand',   // maps data field to expand state
  child: 'subtasks'
}
```

Tasks with `isExpand: false` render collapsed; `true` renders expanded.

### Prevent expand/collapse with events

Use `expanding` and `collapsing` events with `args.cancel = true` to block specific rows:

```vue
<ejs-gantt :collapsing="onCollapsing" :expanding="onExpanding" ...></ejs-gantt>

<script>
methods: {
  onCollapsing(args) {
    if (args.data.TaskID === 1) args.cancel = true;  // prevent collapse of task 1
  },
  onExpanding(args) {
    if (args.data.TaskID === 5) args.cancel = true;  // prevent expand of task 5
  }
}
</script>
```

`expanded` and `collapsed` events fire after the action completes (no `cancel` support).

## Row Events

| Event | When fired | Key args |
|---|---|---|
| `rowCreated` | After a new row is rendered | row element |
| `rowSelected` | After a row is selected | `data`, `rowIndex` |
| `rowDeselected` | After a row is deselected | `data`, `rowIndex` |
| `rowDataBound` | Before each row is rendered | `data`, `row` (DOM) |
| `expanding` | Before a parent row expands | `data`, `cancel` |
| `expanded` | After a parent row expands | `data` |
| `collapsing` | Before a parent row collapses | `data`, `cancel` |
| `collapsed` | After a parent row collapses | `data` |

## Customize Rows and Cells

Use `rowDataBound` to style entire rows and `queryCellInfo` to style individual cells:

```vue
<ejs-gantt :rowDataBound="onRowDataBound" :queryCellInfo="onQueryCellInfo" ...></ejs-gantt>

<script>
methods: {
  onRowDataBound(args) {
    if (args.data.TaskID === 4) {
      args.row.style.backgroundColor = 'red';   // highlight entire row
    }
  },
  onQueryCellInfo(args) {
    if (args.column.field === 'Progress') {
      args.cell.style.backgroundColor = args.data.Progress < 25 ? 'lightgreen' : 'yellow';
    }
  }
}
</script>
```

## Alternate Row Styling

Override the built-in CSS classes to style even/odd rows:

```css
.e-altrow,
tr.e-chart-row:nth-child(even) {
  background-color: #f2f2f2;
}
```

`.e-altrow` applies to the grid panel; `tr.e-chart-row:nth-child(even)` applies to the chart panel. Both must be set to keep grid and chart in sync.

## Row Spanning

Span a cell across multiple rows using `queryCellInfo` with `args.rowSpan`:

```vue
<ejs-gantt :queryCellInfo="onQueryCellInfo" ...></ejs-gantt>

<script>
methods: {
  onQueryCellInfo(args) {
    if (args.data.TaskID === 4 && args.column.field === 'TaskName') {
      args.rowSpan = 2;  // span this cell across 2 rows
    }
  }
}
</script>
```

> **Note:** The spanned cell occupies its own row plus the next row(s). Ensure underlying rows have matching data to avoid display issues.

## Clip Mode

Control how overflow content is shown in grid cells via `columns.clipMode`:

| Value | Behaviour |
|---|---|
| `Clip` | Truncates text when it overflows |
| `Ellipsis` | Shows `...` when text overflows |
| `EllipsisWithTooltip` | Shows `...` + tooltip on hover (default) |

```vue
<ejs-gantt :columns="columns" ...></ejs-gantt>

<script>
data() {
  return {
    columns: [
      { field: 'TaskName', width: 150, clipMode: 'EllipsisWithTooltip' },
      { field: 'Duration',  width: 100, clipMode: 'Clip' },
    ]
  };
}
</script>
```

Default `clipMode` for all columns is `EllipsisWithTooltip`.

## Scrolling Overview

The Gantt component manages its own scroll containers for the grid panel (left) and chart panel (right). Horizontal scroll on the chart panel scrolls the timeline.

### Set initial scroll position

```vue
<ejs-gantt :scrollSettings="{ topOffset: 200, leftOffset: 500 }" ...></ejs-gantt>
```

## Scroll to a Task

Scroll the chart timeline to a specific date:

```js
this.$refs.gantt.scrollToDate('04/26/2019');  // date string in the project's locale format
```

Scroll the chart pane to bring a specific task's taskbar into view:

```js
this.$refs.gantt.scrollToTask('5');  // task ID as string
```

### Set vertical scroll position

Use `setScrollTop` to programmatically set the vertical scroll offset:

```js
this.$refs.gantt.setScrollTop(500);  // scroll 500px down
```

Alternatively, access the internal scroll object directly:

```js
this.$refs.gantt.ej2Instances.ganttChartModule.scrollObject.setScrollTop(500);
```

## Responsive Container

Set `width` and `height` to `'100%'` to make the Gantt fill its parent and respond to resize:

```vue
<div style="height: 400px; resize: both; overflow: auto;">
  <ejs-gantt :height="'100%'" :width="'100%'" ...></ejs-gantt>
</div>
```

> The parent element must have an explicit height when using `height: '100%'`.

## Virtual Scrolling

Enable virtual scrolling to efficiently render thousands of rows — only the visible rows are in the DOM:

```vue
<ejs-gantt :enableVirtualization="true" height="400px" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { VirtualScroll } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [VirtualScroll]);
</script>
```

> **Requirements:** `height` must be a fixed pixel value (not `'auto'`). The `VirtualScroll` module must be injected.

### Timeline virtualization

```vue
<ejs-gantt :enableVirtualization="true" :enableTimelineVirtualization="true" ...></ejs-gantt>
```

`enableTimelineVirtualization` renders only the visible timeline columns — improves performance for very long date ranges.

## Frozen Rows (Sticky)

There is no built-in "freeze rows" like frozen columns, but you can keep the header sticky by using the standard CSS overflow behavior — the Gantt header is always sticky by default.
