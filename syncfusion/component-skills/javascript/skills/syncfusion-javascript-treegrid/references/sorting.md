# TreeGrid Sorting

## When to Use This Reference

Read this reference when you need to:
- Enable column sorting for users clicking headers (ascending/descending toggle)
- Configure initial sort order when TreeGrid first loads (default sort)
- Sort by multiple columns simultaneously with keyboard modifiers (CTRL-click)
- Programmatically sort or clear sorts via methods (sortByColumn, clearSorting)
- Customize sort behavior per column (disable sorting, sort icons)
- Respond to sort events (actionBegin for pre-sort, actionComplete for post-sort)
- Integrate sorting with filtering/paging for multi-feature workflows
- Handle touch device sorting with multi-sort popup interface

---

## Table of Contents

- [Sorting Basics](#sorting-basics)
- [Initial Sort](#initial-sort)
- [Multi-Column Sort](#multi-column-sort)
- [Sort Configuration](#sort-configuration)
- [Sort Methods](#sort-methods)
- [Sort Events](#sort-events)
- [Sort UI & Touch](#sort-ui--touch)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Sorting Basics

Enable column sorting by clicking headers. Click column header to toggle Ascending ↔ Descending. To enable sorting, inject the `Sort` module and set `allowSorting: true`.

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,    // Enable column header sorting
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 100, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**How It Works:**
- Click column header once → Sort ascending
- Click column header again → Sort descending
- Click column header third time → Remove sort
- Default: TreeGrid sorts in Ascending order first

---

## Initial Sort

Set default sort column(s) at initial render via `sortSettings.columns`. Specify field name and direction.

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    sortSettings: {
        columns: [
            { field: 'Category', direction: 'Ascending' },
            { field: 'orderName', direction: 'Ascending' }
        ]
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'Category', headerText: 'Category', width: 140 },
        { field: 'orderName', headerText: 'Order Name', width: 200 },
        { field: 'orderDate', headerText: 'Order Date', width: 150, type: 'date', format: 'yMd' },
        { field: 'units', headerText: 'Units', width: 90, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Key Points:**
- Stack multiple sort columns in `sortSettings.columns` array
- Direction: `'Ascending'` or `'Descending'`
- First column sorted first, then second, etc. (sort priority)
- Initial sorts appear as sorted columns in header icons

---

## Multi-Column Sort

Sort by multiple columns using keyboard modifiers + click.

### Sort Multiple Columns via UI

- **Windows/Linux:** CTRL + Click column headers (in desired order)
- **Mac:** CMD + Click column headers
- **Remove sort from one column:** SHIFT + Click that column header
- **Clear all sorts:** Click in empty area or reload

```typescript
// Multi-column sort is handled by UI interaction
// No code needed - sorting happens automatically with CTRL+Click
```

### Programmatic Multi-Column Sort

Set multiple sort columns at runtime:

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    treeColumnIndex: 1,
    columns: [
        { field: 'Category', headerText: 'Category', width: 140 },
        { field: 'orderName', headerText: 'Order Name', width: 200 },
        { field: 'orderDate', headerText: 'Order Date', width: 150, type: 'date', format: 'yMd' },
        { field: 'units', headerText: 'Units', width: 90 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

// Apply multi-column sort programmatically
function applyMultiSort() {
    treeGridObj.sortSettings = {
        columns: [
            { field: 'Category', direction: 'Ascending' },
            { field: 'units', direction: 'Descending' }
        ]
    };
    treeGridObj.refresh();  // Refresh to apply sorts
}
```

---

## Sort Configuration

### Disable Sorting for Specific Column

Prevent users from sorting by clicking specific column header:

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    {
        field: 'internalNotes',
        headerText: 'Internal Notes',
        allowSorting: false,  // This column won't be sortable
        width: 180
    },
    { field: 'duration', headerText: 'Duration', width: 80 }
]
```

### Sort Direction Control

Set ascending or descending as default sort direction:

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    sortSettings: {
        columns: [{ field: 'units', direction: 'Descending' }]  // Default: Descending
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'units', headerText: 'Units', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Sort Methods

### Programmatic Sorting with sortByColumn

Apply or remove sort programmatically without user clicking:

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'units', headerText: 'Units', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

// Sort by taskName ascending
treeGridObj.sortByColumn('taskName', 'Ascending');

// Sort by units descending
treeGridObj.sortByColumn('units', 'Descending');
```

### Clear Sorting with clearSorting

Remove all sorts and display data in original order:

```typescript
// Clear all sorts
treeGridObj.clearSorting();
```

---

## Sort Events

### Respond to Sort Actions

Execute code before sort starts (actionBegin) or after sort completes (actionComplete):

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

function onActionBegin(args: SortEventArgs) {
    if (args.requestType === 'sorting') {
        console.log('Sort starting for column:', args.data[0].field);
        console.log('Sort direction:', args.data[0].direction);
    }
}

function onActionComplete(args: SortEventArgs) {
    if (args.requestType === 'sorting') {
        console.log('Sort completed');
        let sortedRecords = treeGridObj.getCurrentViewRecords();
        console.log('Sorted records:', sortedRecords);
    }
}

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    actionBegin: onActionBegin,
    actionComplete: onActionComplete,
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'units', headerText: 'Units', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Event Details:**
- `args.requestType` = 'sorting'
- `args.data` = array of sort columns with field and direction
- Useful for logging, analytics, or triggering related updates

---

## Sort UI & Touch

### Sort Icons in Column Header

Column header displays sort indicator (up/down arrow) when sorted.

**Visual Indicators:**
- ↑ (Up arrow) = Ascending sort
- ↓ (Down arrow) = Descending sort
- No icon = Not sorted

### Touch Device Sorting

On touchscreen devices, tap column header to sort. Multi-sort uses popup:

1. Tap column header → Sorts ascending
2. Tap again → Sorts descending
3. Tap third time → Removes sort
4. Long-press or tap popup icon → Multi-sort dialog appears
5. Select additional columns for multi-column sort

```typescript
// Touch sorting works automatically when Touch Feature is enabled
// No additional code needed - same as desktop:
// CTRL equivalent on touch = Tap popup then tap headers

import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,  // Touch sorting enabled automatically
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'units', headerText: 'Units', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Common Patterns

### Sort + Filter Combination

Use sorting and filtering together for advanced data exploration:

```typescript
import { TreeGrid, Sort, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort, Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    allowFiltering: true,
    sortSettings: {
        columns: [{ field: 'Category', direction: 'Ascending' }]
    },
    filterSettings: {
        columns: [{ field: 'units', operator: 'greaterthan', value: 5 }]
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'Category', headerText: 'Category', width: 140 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'units', headerText: 'Units', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Hierarchical Sort Behavior

When sorting in TreeGrid with parent-child relationships:
- Parent rows and child rows sorted independently
- Parent sort order determines expand/collapse order
- Child rows stay within their parent group
- Example: Sort by Priority → All parents ordered by priority → Children within each parent follow their sort

```typescript
import { TreeGrid, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    sortSettings: {
        columns: [{ field: 'Priority', direction: 'Ascending' }]
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'Priority', headerText: 'Priority', width: 90 },
        { field: 'units', headerText: 'Units', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Troubleshooting

**Q: Sort not working when I click column header?**  
A: Verify `allowSorting: true` is set and `Sort` module is injected via `TreeGrid.Inject(Sort)`.

**Q: Initial sort not applied?**  
A: Ensure `sortSettings.columns` array syntax is correct with `field` and `direction` properties. Refresh data if needed.

**Q: Can't multi-column sort with CTRL+Click?**  
A: Make sure `allowSorting: true` and multiple clicks register on different column headers. On Mac, use CMD instead of CTRL.

**Q: Sort clears when I filter?**  
A: Sorting and filtering work independently. Both can be active together. Check if filter is accidental clearing sort - apply initial sort in `sortSettings.columns`.

**Q: SHIFT+Click not clearing sort?**  
A: SHIFT+Click only works to remove one sort from a multi-sorted setup. Use `clearSorting()` method to remove all sorts programmatically.
