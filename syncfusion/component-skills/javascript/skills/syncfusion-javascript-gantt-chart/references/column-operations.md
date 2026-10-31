# Column Operations in Syncfusion Gantt Chart

## Table of Contents
- [Column Resizing](#column-resizing)
- [Column Reordering](#column-reordering)
- [Column Menu](#column-menu)
- [Frozen Columns](#frozen-columns)
- [WBS Column](#wbs-column)

## Column Resizing

Resize columns by dragging the right edge of the column header. Double-click the edge for auto-fit.

**Module required**: `Resize`

```typescript
import { Gantt, Resize } from '@syncfusion/ej2-gantt';

Gantt.Inject(Resize);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    allowResizing: true,
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    splitterSettings: { columnIndex: 4 },
    height: '450px',
    columns: [
        { field: 'TaskName', headerText: 'Task Name', minWidth: '100', maxWidth: '300' },
        { field: 'Duration', headerText: 'Duration', allowResizing: false }  // disable for specific column
    ]
});
gantt.appendTo('#Gantt');
```

**Key properties:**
| Property | Level | Description |
|----------|-------|-------------|
| `allowResizing` | Gantt | Enable resize for all columns |
| `columns.allowResizing` | Column | Per-column override |
| `columns.minWidth` | Column | Minimum column width |
| `columns.maxWidth` | Column | Maximum column width |

**Events:**
- `resizeStart` — fires when resize begins
- `resizing` — fires during resize drag
- `resizeStop` — fires when resize ends

---

## Column Reordering

Drag a column header to reorder it. **Module required**: `Reorder`

```typescript
import { Gantt, Reorder } from '@syncfusion/ej2-gantt';

Gantt.Inject(Reorder);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    allowReordering: true,
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    columns: [
        { field: 'Progress', allowReordering: false }  // lock this column in place
    ]
});
gantt.appendTo('#Gantt');
```

### Programmatic Reordering

```typescript
// Move single column: reorderColumns(fromField, toField)
gantt.reorderColumns('Duration', 'Progress');

// Move multiple columns
gantt.reorderColumns(['TaskName', 'Duration'], 'StartDate');
```

**Key properties:**
| Property | Level | Description |
|----------|-------|-------------|
| `allowReordering` | Gantt | Enable reordering globally |
| `columns.allowReordering` | Column | Per-column override |

---

## Column Menu

Show a dropdown menu on each column header with sort, filter, resize, and autofit actions.

**Module required**: `ColumnMenu` (plus `Filter`, `Sort`, `Resize` for those features)

```typescript
import { Gantt, Filter, Sort, Resize, ColumnMenu, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Filter, Sort, Resize, ColumnMenu, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    showColumnMenu: true,
    allowFiltering: true,
    allowResizing: true,
    allowSorting: true,
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' },
    columns: [
        { field: 'TaskName', showColumnMenu: false }  // hide menu for specific column
    ],
    splitterSettings: { position: '100%' },
    height: '450px',
    columnMenuOpen: (args) => {
        console.log('Column menu opened:', args);
    },
    columnMenuClick: (args) => {
        console.log('Column menu item clicked:', args);
    }
});
gantt.appendTo('#Gantt');
```

**Default menu items:**
| Item | Description |
|------|-------------|
| `SortAscending` | Sort column ascending |
| `SortDescending` | Sort column descending |
| `AutoFit` | Auto-fit current column |
| `AutoFitAll` | Auto-fit all columns |
| `Filter` | Open filter (based on `filterSettings.type`) |

---

## Frozen Columns

Keep selected columns visible while scrolling horizontally. **Module required**: `Freeze`

### Freeze by Count

```typescript
import { Gantt, Freeze } from '@syncfusion/ej2-gantt';

Gantt.Inject(Freeze);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    frozenColumns: 2,           // freeze first 2 columns
    treeColumnIndex: 1,
    splitterSettings: { position: '65%' },
    gridLines: 'Both',
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 290 },
        { field: 'StartDate' },
        { field: 'Duration' }
    ]
});
gantt.appendTo('#Gantt');
```

### Freeze Specific Columns

```typescript
columns: [
    { field: 'TaskID', isFrozen: true },          // frozen at current position
    { field: 'TaskName', isFrozen: true },
    { field: 'StartDate' },                        // scrollable
    { field: 'Duration' }
]
```

### Freeze Direction

Pin columns to the left, right, or in a fixed position:

```typescript
columns: [
    { field: 'TaskID', freeze: 'Left' },           // pinned left
    { field: 'TaskName', width: 200 },             // scrollable
    { field: 'StartDate' },
    { field: 'Progress', freeze: 'Fixed' },        // fixed in the middle
    { field: 'Resources', freeze: 'Right' }        // pinned right
]
```

**Freeze direction values:**
| Value | Description |
|-------|-------------|
| `'Left'` | Pin to left side |
| `'Right'` | Pin to right side |
| `'Fixed'` | Fixed in the content area (always visible) |

**Custom frozen line colors:**
```css
/* Left frozen column border */
.e-gantt .e-leftfreeze.e-freezeleftborder {
    border-right-color: rgb(0, 255, 0) !important;
}
/* Right frozen column border */
.e-gantt .e-rightfreeze.e-freezerightborder {
    border-left-color: rgb(0, 0, 255) !important;
}
```

> **Limitation**: `freeze` direction is NOT compatible with `isFrozen` or `frozenColumns` properties — use only one approach.

---

## WBS Column

Work Breakdown Structure (WBS) assigns unique hierarchical codes to each task. Auto-generate and maintain WBS codes throughout task operations.

**Module required**: `DayMarkers`, `Edit`, `Filter`, `Sort`, `ContextMenu`

```typescript
import { Gantt, Selection, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu);

let gantt: Gantt = new Gantt({
    dataSource: WBSData,
    enableWBS: true,                  // enable WBS code generation
    enableAutoWbsUpdate: true,        // auto-maintain codes during sort/filter/drag-drop
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress',
        dependency: 'Predecessor', parentID: 'ParentId'
    },
    treeColumnIndex: 2,
    editSettings: {
        allowAdding: true, allowEditing: true, allowDeleting: true,
        allowTaskbarEditing: true, showDeleteConfirmDialog: true
    },
    columns: [
        { field: 'TaskID', visible: false },
        { field: 'WBSCode', headerText: 'WBS Code', width: '150px' },            // auto-generated code
        { field: 'TaskName', headerText: 'Task Name', width: '260px' },
        { field: 'StartDate', headerText: 'Start Date' },
        { field: 'WBSPredecessor', headerText: 'WBS Predecessor', width: '190px' }, // WBS-based dependency
        { field: 'Duration' }
    ],
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
    allowFiltering: true, allowSorting: true, enableContextMenu: true
});
gantt.appendTo('#Gantt');
```

**WBS key properties:**
| Property | Description |
|----------|-------------|
| `enableWBS` | Auto-generate `WBSCode` and `WBSPredecessor` fields |
| `enableAutoWbsUpdate` | Keep WBS codes accurate after sorting, filtering, editing, drag-drop |
| `WBSCode` | Auto-generated field — add to `columns` array to display |
| `WBSPredecessor` | WBS-based dependency notation — add to `columns` to display |
