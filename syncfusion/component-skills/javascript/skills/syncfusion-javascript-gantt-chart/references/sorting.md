# Sorting in Syncfusion Gantt Chart

## Table of Contents
- [Basic Setup](#basic-setup)
- [Initial Sort](#initial-sort)
- [Programmatic Sort](#programmatic-sort)
- [Sort Events](#sort-events)
- [Sorting Custom Columns](#sorting-custom-columns)
- [Touch Interaction](#touch-interaction)

---

## Overview

Sorting enables ascending/descending data ordering. Click a column header to sort; hold **Ctrl** and click for multi-column sort; hold **Shift** and click to remove a column from multi-sort.

**Module required**: `Sort`

## Basic Setup

```typescript
import { Gantt, Sort } from '@syncfusion/ej2-gantt';

Gantt.Inject(Sort);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowSorting: true
});
gantt.appendTo('#Gantt');
```

> Disable sorting for a specific column by setting `columns.allowSorting: false`.

---

## Initial Sort

Apply sort on initialization using `sortSettings.columns`:

```typescript
sortSettings: {
    columns: [
        { field: 'TaskID', direction: 'Ascending' },
        { field: 'TaskName', direction: 'Ascending' }
    ]
},
allowSorting: true
```

---

## Programmatic Sort

```typescript
// Sort a specific column
gantt.sortModule.sortColumn('TaskName', 'Descending', false);
// Third argument: false = replace existing sort, true = multi-sort (add to existing)

// Clear all sorting
gantt.clearSorting();
```

---

## Sort Events

```typescript
import { SortEventArgs } from '@syncfusion/ej2-grids';

let gantt: Gantt = new Gantt({
    allowSorting: true,
    actionBegin: (args: SortEventArgs) => {
        // args.requestType === 'sorting' when sort begins
        console.log('Sort begin:', args.requestType);
    },
    actionComplete: (args: SortEventArgs) => {
        console.log('Sort complete:', args.requestType);
    }
});
```

---

## Sorting Custom Columns

Custom columns (string, numeric, or other types) can be sorted via initial `sortSettings` or programmatically:

```typescript
let gantt: Gantt = new Gantt({
    allowSorting: true,
    columns: [
        { field: 'TaskID', headerText: 'Task ID' },
        { field: 'TaskName', headerText: 'Task Name' },
        { field: 'Progress', headerText: 'Progress' },
        { field: 'CustomColumn', headerText: 'Custom Column' }
    ]
});

// Sort custom column programmatically
gantt.sortModule.sortColumn('CustomColumn', 'Ascending', false);
```

---

## Touch Interaction

On touch devices, **tap** a column header to trigger sorting on that column. A multi-sort popup appears automatically for selecting additional columns to sort.

- **Tap** a column header → sort that column
- **Tap the popup** → enter multi-column sort mode
- **Tap additional column headers** → add them to the multi-sort sequence
