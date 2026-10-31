# TreeGrid Columns

## When to Use This Reference

Read this reference when you need to:
- Define column structure and data binding (field, headerText, type, width)
- Format column values (numbers, dates, currencies)
- Create custom column headers and cell templates
- Handle complex/nested data structures using dot notation
- Control column visibility, resizing, and reordering
- Implement column menus and choosers for dynamic visibility
- Apply responsive behavior based on screen size
- Span columns horizontally to merge cells
- Manage column behavior (sorting, filtering, editing per column)
- Set minimum/maximum column widths or lock columns

---

## Table of Contents

- [Column Basics](#column-basics)
- [Column Types & Formatting](#column-types--formatting)
- [Column Headers](#column-headers)
- [Column Templates](#column-templates)
- [Complex Data Binding](#complex-data-binding)
- [Column Resizing](#column-resizing)
- [Column Reordering](#column-reordering)
- [Column Visibility](#column-visibility)
- [Column Menu](#column-menu)
- [Column Chooser](#column-chooser)
- [Column Spanning](#column-spanning)
- [Responsive Columns](#responsive-columns)
- [Auto-Fit Columns](#auto-fit-columns)
- [Frozen Columns](#frozen-columns)

---

## Column Basics

Define columns with `field` (data source property) and `headerText` (display title). The `field` property is mandatory for grid operations (sorting, filtering).

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 100 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Key Properties:**
- `field` - Data source property name (MANDATORY for grid operations)
- `headerText` - Column header display text
- `width` - Column width in pixels
- `textAlign` - Text alignment (Left, Right, Center)
- `allowSorting` - Enable/disable sorting per column
- `allowFiltering` - Enable/disable filtering per column
- `allowEditing` - Enable/disable editing per column
- `allowReordering` - Enable/disable reordering per column
- `lockColumn` - Lock column (prevent reorder)

### Disable Operations for Specific Columns

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', allowSorting: false, width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 },
    { field: 'startDate', headerText: 'Start Date', allowFiltering: false, width: 100 },
    { field: 'duration', headerText: 'Duration', allowEditing: false, width: 80 }
]
```

---

## Column Types & Formatting

### Column Types

Specify data type to handle sorting, filtering, and formatting correctly.

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', type: 'number', width: 90 },
    { field: 'taskName', headerText: 'Task Name', type: 'string', width: 180 },
    { field: 'approved', headerText: 'Approved', type: 'boolean', displayAsCheckBox: true, width: 90 },
    { field: 'startDate', headerText: 'Start Date', type: 'date', format: 'yMd', width: 100 },
    { field: 'createdAt', headerText: 'Created', type: 'datetime', format: 'MM/dd/yyyy hh:mm a', width: 140 }
]
```

**Available Types:** `string`, `number`, `boolean`, `date`, `datetime`

### Number Formatting

```typescript
columns: [
    { field: 'quantity', headerText: 'Quantity', type: 'number', format: 'N2', width: 100 },
    { field: 'price', headerText: 'Price', type: 'number', format: 'c2', width: 100 },  // Currency
    { field: 'progress', headerText: 'Progress', type: 'number', format: 'P1', width: 90 }  // Percentage
]
```

**Number Formats:**
- `N2` - 1,234.56 (2 decimal places)
- `c2` - $1,234.56 (currency, 2 decimal places)
- `P1` - 12.3% (percentage, 1 decimal place)

### Date Formatting

```typescript
columns: [
    { field: 'startDate', headerText: 'Start Date', type: 'date', format: 'yMd', width: 100 },
    { field: 'endDate', headerText: 'End Date', type: 'date', format: 'dd/MM/yyyy', width: 120 },
    { field: 'createdAt', headerText: 'Created', type: 'datetime', format: 'dd/MM/yyyy hh:mm a', width: 150 }
]
```

**Date Formats:**
- `yMd` - 2/3/2017
- `dd/MM/yyyy` - 03/02/2017
- `MM/dd/yyyy hh:mm a` - 02/03/2017 12:00 AM

---

## Column Headers

### Header Text

Override default header using `headerText`:

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 }
]
```

### Header Templates

Customize header with custom HTML/components:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    columns: [
        { field: 'taskName', headerTemplate: '#taskNameHeader', width: 220 },
        { field: 'startDate', headerTemplate: '#dateHeader', type: 'date', format: 'yMd', width: 130 },
        { field: 'duration', headerTemplate: '#durationHeader', width: 120 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**HTML Template:**
```html
<script id="taskNameHeader" type="text/template">
    <span class="e-alignment">
        <span class="e-headertext">Task</span>
    </span>
</script>
```

---

## Column Templates

Display custom content instead of field values using templates.

### Basic Column Template

```typescript
import { TreeGrid, RowDataBoundEventArgs, getObject } from '@syncfusion/ej2-treegrid';
import { Sparkline } from '@syncfusion/ej2-charts';

let treeGridObj = new TreeGrid({
    dataSource: textdata,
    childMapping: 'Children',
    treeColumnIndex: 0,
    rowHeight: 83,
    rowDataBound: (args: RowDataBoundEventArgs) => {
        let data: string = getObject('EmployeeID', args.data);
        let spkwl: HTMLElement = args.row.querySelector('#spk' + data);
        let sparkline = new Sparkline({
            height: '50px',
            width: '150px',
            type: 'WinLoss',
            dataSource: getSparklineData(+data)
        });
        sparkline.appendTo(spkwl);
    },
    columns: [
        { field: 'EmpID', headerText: 'Employee ID', width: 95 },
        { field: 'Name', headerText: 'Name', width: 110 },
        { headerText: 'Year GR', template: '#template', width: 120 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Conditional Template

```html
<script id="template" type="text/template">
    ${if(approved)}
        <input type="checkbox" checked>
    ${else}
        <input type="checkbox">
    ${/if}
</script>
```

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 },
    { headerText: 'Approved', template: '#template', width: 120 }
]
```

---

## Complex Data Binding

Bind nested object properties using dot notation in `field`:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: complexData,  // { taskID, taskName, assignee: { firstName, lastName } }
    childMapping: 'subtasks',
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'assignee.firstName', headerText: 'Assignee', width: 120 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Value Accessor (Custom Data Display)

Access and manipulate data display using `valueAccessor`:

```typescript
function displayFullName(field: string, data: Object, column: Object): string {
    return data[field].map((s: any) => s.lastName || s.firstName).join(' ');
}

function calculatePrice(field: string, data: { units: number, unitPrice: number }, column: Object): number {
    return data.units * data.unitPrice;
}

columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 },
    { field: 'assignee', headerText: 'Assignee', valueAccessor: displayFullName, width: 150 },
    { field: 'price', headerText: 'Total Price', valueAccessor: calculatePrice, format: 'c2', type: 'number', width: 120 }
]
```

### Boolean as Checkbox

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 },
    { field: 'approved', headerText: 'Approved', type: 'boolean', displayAsCheckBox: true, width: 100 }
]
```

---

## Column Resizing

Allow users to resize columns by dragging column header edges.

```typescript
import { TreeGrid, Resize } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Resize);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowResizing: true,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Min and Max Width

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', minWidth: 170, maxWidth: 300, width: 180 },
    { field: 'duration', headerText: 'Duration', minWidth: 50, maxWidth: 150, width: 80 }
]
```

### Disable Resizing for Column

```typescript
{ field: 'duration', headerText: 'Duration', allowResizing: false, width: 80 }
```

---

## Column Reordering

Allow users to drag and drop columns to reorder them.

```typescript
import { TreeGrid, Reorder } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Reorder);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowReordering: true,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Programmatic Reorder

```typescript
import { Button } from '@syncfusion/ej2-buttons';

let reorderBtn = new Button();
reorderBtn.appendTo('#reorderBtn');

document.getElementById('reorderBtn').onclick = () => {
    treeGridObj.reorderColumns(['taskID', 'duration'], 'progress');
};
```

### Lock Column

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', lockColumn: true, width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 }
]
```

---

## Column Visibility

### Show/Hide Columns Programmatically

```typescript
import { Button } from '@syncfusion/ej2-buttons';

let showBtn = new Button();
let hideBtn = new Button();
showBtn.appendTo('#show');
hideBtn.appendTo('#hide');

document.getElementById('show').onclick = () => {
    treeGridObj.showColumns(['Task ID', 'Duration']);  // Show by headerText
};

document.getElementById('hide').onclick = () => {
    treeGridObj.hideColumns(['Task ID', 'Duration']);
};
```

---

## Column Menu

Integrate sorting, filtering, and auto-fit options in column header menu.

```typescript
import { TreeGrid, Sort, Filter, Resize, ColumnMenu } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort, Filter, Resize, ColumnMenu);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    showColumnMenu: true,
    allowSorting: true,
    allowFiltering: true,
    allowResizing: true,
    filterSettings: { type: 'Menu' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', showColumnMenu: false, width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Custom Menu Items

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    showColumnMenu: true,
    columnMenuItems: [{ text: 'Clear Sorting', id: 'clearsorting' }],
    columnMenuClick: (args) => {
        if (args.item.id === 'clearsorting') {
            treeGridObj.clearSorting();
        }
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Customize Menu Per Column

```typescript
import { ColumnMenuOpenEventArgs, ColumnMenuItemModel } from '@syncfusion/ej2-grids';

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    showColumnMenu: true,
    columnMenuOpen: (args: ColumnMenuOpenEventArgs) => {
        for (const item of args.items) {
            if (item.text === 'Filter' && args.column.field === 'taskName') {
                (item as ColumnMenuItemModel).hide = true;  // Hide Filter for taskName
            }
        }
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Column Chooser

Allow users to show/hide columns dynamically via a UI dialog.

```typescript
import { TreeGrid, Selection, Toolbar, ColumnChooser } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Selection, Toolbar, ColumnChooser);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    showColumnChooser: true,
    toolbar: ['ColumnChooser'],
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 240, showInColumnChooser: false },
        { field: 'startDate', headerText: 'Start Date', width: 100 },
        { field: 'duration', headerText: 'Duration', width: 80 },
        { field: 'progress', headerText: 'Progress', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Open Chooser Programmatically

```typescript
import { Button } from '@syncfusion/ej2-buttons';

let openBtn = new Button();
openBtn.appendTo('#openChooser');

document.getElementById('openChooser').onclick = () => {
    treeGridObj.columnChooserModule.openColumnChooser(200, 50);  // X, Y position
};
```

---

## Column Spanning

Merge adjacent cells horizontally based on data conditions.

### Basic Column Spanning

```typescript
import { TreeGrid, QueryCellInfoEventArgs } from '@syncfusion/ej2-treegrid';

let treeGridObj = new TreeGrid({
    dataSource: columnSpanData,
    queryCellInfo: (args: QueryCellInfoEventArgs) => {
        let data: any = args.data;
        if (args.column.field === '9:00') {
            args.colSpan = 2;  // Span 2 columns
        } else if (args.column.field === '11:00') {
            args.colSpan = 3;  // Span 3 columns
        }
    },
    gridLines: 'Both',
    treeColumnIndex: 1,
    columns: [
        { field: 'EmployeeName', headerText: 'Employee Name', width: 200 },
        { field: '9:00', headerText: '9.00 AM', width: 120 },
        { field: '9:30', headerText: '9.30 AM', width: 120 },
        { field: '11:00', headerText: '11.00 AM', width: 120 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### API-Based Column Spanning

Enable with `enableColumnSpan` property:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: columnSpanData,
    childMapping: 'children',
    enableColumnSpan: true,
    rowHeight: 50,
    gridLines: 'Both',
    columns: [
        { field: 'activityName', headerText: 'Phase Name', width: 250 },
        {
            headerText: 'Schedule', textAlign: 'Center', columns: [
                { field: 'startDate', headerText: 'Start Date', type: 'date', format: 'MM/dd/yyyy', width: 140 },
                { field: 'endDate', headerText: 'End Date', type: 'date', format: 'MM/dd/yyyy', width: 140 }
            ]
        },
        { field: 'status', headerText: 'Status', width: 180, enableColumnSpan: false }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Limitations:** Column spanning not compatible with:
- Virtual/infinite scrolling
- Row drag-drop
- Detail templates
- Editing
- Export

---

## Responsive Columns

Toggle column visibility based on screen size using CSS media queries.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    columns: [
        { field: 'taskID', headerText: 'Task ID', hideAtMedia: '(min-width: 700px)', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', hideAtMedia: '(max-width: 500px)', width: 100 },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Logic:**
- `hideAtMedia: '(min-width: 700px)'` - Hide when screen ≥ 700px
- `hideAtMedia: '(max-width: 500px)'` - Hide when screen ≤ 500px

---

## Auto-Fit Columns

Resize columns to fit content width automatically.

```typescript
import { TreeGrid, Resize } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Resize);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowResizing: true,
    dataBound: () => treeGridObj.autoFitColumns(['taskName']),
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 60 },
        { field: 'duration', headerText: 'Duration', width: 120 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Auto-Fit All Columns

```typescript
treeGridObj.autoFitColumns();  // No parameters = fit all
```

---

## Frozen Columns

Freeze specific columns to keep them visible while scrolling horizontally. Essential for master data (task names, IDs) that should always be visible during horizontal navigation.

**Shared Setup (all frozen examples):**
```typescript
import { TreeGrid, Freeze } from '@syncfusion/ej2-treegrid';
TreeGrid.Inject(Freeze);
```

### Freeze Specific Columns

Use `isFrozen` property to freeze individual columns. Non-frozen columns scroll horizontally while frozen columns stay fixed.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    columns: [
        { field: 'taskID', headerText: 'ID', width: 90, isFrozen: true },
        { field: 'taskName', headerText: 'Task Name', width: 180, isFrozen: true },
        { field: 'startDate', headerText: 'Start Date', width: 120 },
        { field: 'endDate', headerText: 'End Date', width: 120 },
        { field: 'duration', headerText: 'Duration', width: 100 },
        { field: 'progress', headerText: 'Progress', width: 100 },
        { field: 'priority', headerText: 'Priority', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Freeze Direction (Left/Right)

Use `freeze` property to specify frozen position: `'Left'` (default) or `'Right'`. Frozen-right columns appear at grid end while scrolling.

**Configuration (using setup above):**
```typescript
columns: [
    { field: 'taskID', headerText: 'ID', width: 90, freeze: 'Left' },
    { field: 'taskName', headerText: 'Task Name', width: 180, freeze: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 120 },
    { field: 'endDate', headerText: 'End Date', width: 120 },
    { field: 'duration', headerText: 'Duration', width: 100 },
    { field: 'priority', headerText: 'Priority', width: 100, freeze: 'Right' }
]
```

### Combine Frozen Columns with Frozen Rows

Create a 4-zone layout by combining `frozenRows` + `frozenColumns`: frozen corner, frozen top, frozen left, scrollable middle.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    frozenRows: 3,
    frozenColumns: 2,
    columns: [
        { field: 'taskID', headerText: 'ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 120 },
        { field: 'endDate', headerText: 'End Date', width: 120 },
        { field: 'progress', headerText: 'Progress', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**4-Zone Layout:**
- Zone 1 (frozen rows + cols): taskID, taskName for first 3 rows
- Zone 2 (frozen rows + scroll cols): startDate, endDate for first 3 rows
- Zone 3 (scroll rows + frozen cols): taskID, taskName for rows 4+
- Zone 4 (fully scrollable): startDate, endDate for rows 4+

### Frozen with Summary Column (Right-Frozen Total)

Freeze left identifiers, freeze right totals for master-detail reference.

**Configuration:**
```typescript
columns: [
    { field: 'taskID', headerText: 'ID', width: 90, freeze: 'Left' },
    { field: 'taskName', headerText: 'Task Name', width: 200, freeze: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 120 },
    { field: 'endDate', headerText: 'End Date', width: 120 },
    { field: 'duration', headerText: 'Duration (Days)', width: 100 },
    { field: 'actualCost', headerText: 'Total Cost', width: 120, freeze: 'Right' }
]
```

---

## Troubleshooting Frozen Columns

**Row Templates Incompatible**: Row templates cannot be used with frozen columns. Use cell templates instead.

**Detail Templates Incompatible**: Expand/detail templates cannot span frozen zones. Consider using detail row or external panel for details.

**Editing Limitations**: Inline editing works, but edit form cannot scroll with content if frozen columns present. Use dialog editing instead.

**Performance**: Freezing many columns reduces performance. Freeze only essential columns (task ID, name, status).

