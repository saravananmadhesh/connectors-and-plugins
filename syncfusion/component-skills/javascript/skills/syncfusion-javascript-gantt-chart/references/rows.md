# Rows in Syncfusion Gantt Chart

## Table of Contents
- [Customize Row Styles Using Event](#customize-row-styles-using-event)
- [Customize Row Styles Using CSS](#customize-row-styles-using-css)
- [Customize Row Styles Using Methods](#customize-row-styles-using-methods)
- [Style Parent and Child Rows Differently](#style-parent-and-child-rows-differently)
- [Auto Focus Taskbar on Row Click](#auto-focus-taskbar-on-row-click)
- [Row Height](#row-height)
- [Customize Row Height for a Specific Row](#customize-row-height-for-a-specific-row)
- [Row Hover with Custom Action](#row-hover-with-custom-action)
- [Add a New Row Programmatically](#add-a-new-row-programmatically)
- [Show or Hide Rows Dynamically](#show-or-hide-rows-dynamically)
- [Row Spanning](#row-spanning)

---

## Customize Row Styles Using Event

Use the `rowDataBound` event to apply CSS classes or inline styles conditionally per row:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    rowDataBound: (args: any) => {
        const progress = args.data.Progress as number;
        if (progress < 30) {
            args.row.classList.add('below-30');
        } else if (progress < 80) {
            args.row.classList.add('below-80');
        } else {
            args.row.classList.add('above-80');
        }
    }
});
gantt.appendTo('#Gantt');
```

> `queryCellInfo` fires for every grid cell and can be used for cell-level customization.

---

## Customize Row Styles Using CSS

Target built-in CSS classes to style rows globally:

```css
/* Selected row */
.e-gantt .e-selectionbackground,
.e-gantt .e-gantt-chart .e-active,
.e-gantt .e-active > .e-chart-row-border {
    background-color: #f9920b !important;
    border: 1px solid red !important;
}

/* Alternate rows */
.e-gantt .e-altrow {
    background-color: #fafafa;
}
```

---

## Customize Row Styles Using Methods

Use `treeGrid` and Gantt methods to access and style rows programmatically:

| Method | Description |
|--------|-------------|
| `gantt.treeGrid.getRowByIndex(i)` | Returns the grid row HTML element at index `i` |
| `gantt.treeGrid.getRows()` | Returns all grid row elements |
| `gantt.treeGrid.getRowInfo(elem)` | Returns `{ rowData, rowIndex }` for a row element |
| `gantt.treeGrid.getSelectedRowIndexes()` | Returns selected row indexes |
| `gantt.treeGrid.getSelectedRows()` | Returns selected row HTML elements |
| `gantt.getRowByIndex(i)` | Returns the chart-side row HTML element at index `i` |
| `gantt.getChartRows()` | Returns all chart row elements |

```typescript
let gantt: Gantt = new Gantt({
    // ...
    dataBound: function () {
        (gantt.treeGrid.getRowByIndex(2) as HTMLElement).style.background = 'rgb(193, 228, 234)';
    }
});
```

---

## Style Parent and Child Rows Differently

Use `args.data.hasChildRecords` in `rowDataBound` to distinguish parent from child rows:

```typescript
rowDataBound: (args: any) => {
    if (args.data.hasChildRecords) {
        args.row.classList.add('parent-row');
    } else {
        args.row.classList.add('child-row');
    }
}
```

---

## Auto Focus Taskbar on Row Click

Set `autoFocusTasks: true` to automatically scroll the timeline to the taskbar when a row is clicked:

```typescript
import { Gantt, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowSelection: true,
    autoFocusTasks: true    // scrolls chart to taskbar when its row is clicked
});
gantt.appendTo('#Gantt');

// Toggle at runtime
gantt.autoFocusTasks = false;
```

---

## Row Height

Set a uniform height for all rows using `rowHeight`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    rowHeight: 42    // applies to all rows including header rows
});
gantt.appendTo('#Gantt');

// Change at runtime
gantt.rowHeight = 60;
```

> `rowHeight` applies uniformly to all rows. It cannot set individual cell heights.

---

## Customize Row Height for a Specific Row

Use `args.rowHeight` inside `rowDataBound` to override height for individual rows:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '430px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    rowHeight: 42,
    rowDataBound: (args: any) => {
        if (args.data.TaskID === 2) {
            args.rowHeight = 90;    // override height only for task 2
        }
    }
});
gantt.appendTo('#Gantt');
```

> Individual row heights are not supported in virtual scrolling mode.

---

## Row Hover with Custom Action

Attach a `mouseover` listener in the `dataBound` event to show tooltips or buttons on row hover:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';
import { Tooltip } from '@syncfusion/ej2-popups';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '430px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    dataBound: () => {
        document.getElementById('Gantt').addEventListener('mouseover', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('e-rowcell') || target.classList.contains('e-chart-row-cell')) {
                const btn = document.createElement('button');
                btn.textContent = 'Row details';
                new Tooltip({ content: btn, opensOn: 'Hover' }, target);
                btn.addEventListener('click', () => {
                    const info = gantt.treeGrid.getRowInfo(target);
                    console.log('TaskID:', info.rowData['TaskID']);
                });
            }
        });
    }
});
gantt.appendTo('#Gantt');
```

---

## Add a New Row Programmatically

Use `gantt.addRecord(data, position, index)` to insert a row without the add dialog:

| Position | Behavior |
|----------|----------|
| `'Top'` | Adds at the beginning |
| `'Bottom'` | Adds at the end |
| `'Above'` | Inserts above the row at `index` |
| `'Below'` | Inserts below the row at `index` |
| `'Child'` | Adds as a child of the row at `index` |

```typescript
import { Gantt, Edit, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '430px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true }
});
gantt.appendTo('#Gantt');

const newTask = { TaskID: 100, TaskName: 'New Task', StartDate: new Date(), Duration: 3, Progress: 0 };
gantt.addRecord(newTask, 'Below', 1);   // insert below row at index 1
gantt.addRecord(newTask, 'Child', 2);   // add as child of row at index 2
```

> Pass index `0` to add at the very beginning. Omitting the index defaults to the top.

---

## Show or Hide Rows Dynamically

Toggle row visibility using `treeGrid.getRowByIndex()` and `gantt.getRowByIndex()` with CSS `display`:

```typescript
let hiddenRowIndexes: number[] = [];

function hideRows() {
    const rowsObj = gantt.treeGrid.grid.getRowsObject();
    rowsObj.forEach((rowObj: any, index: number) => {
        if (rowObj.data.TaskName === 'Perform Soil test') {
            (gantt.treeGrid.getRowByIndex(index) as HTMLElement).style.display = 'none';
            (gantt.getRowByIndex(index) as HTMLElement).style.display = 'none';
            hiddenRowIndexes.push(index);
        }
    });
}

function showRows() {
    hiddenRowIndexes.forEach((index) => {
        (gantt.treeGrid.getRowByIndex(index) as HTMLElement).style.display = '';
        (gantt.getRowByIndex(index) as HTMLElement).style.display = '';
    });
    hiddenRowIndexes = [];
}
```

> This is purely visual — the underlying data source is not modified.

---

## Row Spanning

Use `args.rowSpan` inside the `queryCellInfo` event to merge a cell vertically across rows:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '380px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    queryCellInfo: (args: any) => {
        if (args.data.TaskID === 4 && args.column.field === 'TaskName') {
            args.rowSpan = 2;    // merges this cell with the one below
        }
    }
});
gantt.appendTo('#Gantt');
```

> `rowSpan` and `colSpan` can be combined to merge cells both vertically and horizontally.
