---
name: frozen
description: 'Frozen columns and rows in Syncfusion Grid: freeze columns, freeze rows, freeze headers, and row pinning.'
---

# Frozen Columns and Row Pinning

## Table of Contents
- [Overview](#overview)
- [Freeze Columns](#freeze-columns)
- [Freeze Rows](#freeze-rows)
- [Freeze Headers](#freeze-headers)
- [Configuration](#configuration)

## When to Use This Reference

- Freeze columns to keep them visible while scrolling
- Freeze header rows for easy reference
- Configure frozen column width and scrolling behavior
- Combine frozen columns with horizontal scrolling
- Maintain data context while displaying large datasets

## Overview

Freezing keeps columns or rows visible while scrolling horizontally or vertically, useful for reference columns or headers.

## Freeze Columns

### Freeze Specific Columns

```ts
import { Grid, Column, Inject } from '@syncfusion/ej2-grids';

Grid.Inject();

const data = [
  { OrderID: 10248, CustomerID: 'VINET', OrderDate: new Date(1996, 6, 4), ShipCity: 'Reims', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: new Date(1996, 6, 5), ShipCity: 'München', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  height: '400',
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isFrozen: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120, isFrozen: true },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### Freeze First N Columns

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  height: '400',
  frozenColumns: 2,  // First 2 columns frozen
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

## Freeze Rows

### Pin Rows to Top

```ts
import { Grid, ContextMenu, Page, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(ContextMenu, Page);

const taskData = [
  { TaskID: 1, Title: 'Task 1', Status: 'Open', Priority: 'Critical' },
  { TaskID: 2, Title: 'Task 2', Status: 'In Progress', Priority: 'High' },
  { TaskID: 3, Title: 'Task 3', Status: 'Open', Priority: 'Critical' },
  { TaskID: 4, Title: 'Task 4', Status: 'Completed', Priority: 'Normal' }
];

const grid = new Grid({
  dataSource: taskData,
  height: '280',
  allowPaging: true,
  contextMenuItems: ['PinRow', 'UnpinRow'],
  isRowPinned: (data: any) => {
    // Pin critical open tasks to top
    if (data && data.Status === 'Open' && data.Priority === 'Critical') {
      return true;
    }
    return false;
  },
  columns: [
    { field: 'TaskID', headerText: 'Task ID', width: 100, textAlign: 'Right', isPrimaryKey: true },
    { field: 'Title', headerText: 'Title', width: 100 },
    { field: 'Status', headerText: 'Status', width: 100 },
    { field: 'Assignee', headerText: 'Assignee', width: 100 },
    { field: 'Priority', headerText: 'Priority', width: 100 }
  ]
});

grid.appendTo('#grid');
```

## Freeze Headers

### Freeze Column Headers

Headers automatically freeze when grid has height set:

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  height: '400',  // Height constraint ensures headers stay visible
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 }
    // Headers stay visible when scrolling
  ]
});

grid.appendTo('#grid');
```

## Configuration

### Multiple Frozen Sections

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  height: '400',
  width: '100%',
  frozenColumns: 2,  // Left frozen columns
  frozenRows: 3,     // Top frozen rows
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Freeze with Virtual Scrolling

```ts
import { Grid, VirtualScroll, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const largeData = generateLargeDataset(100000);

const grid = new Grid({
  dataSource: largeData,
  height: '500',
  enableVirtualization: true,
  frozenColumns: 2,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Combine with Other Features

```ts
import { Grid, Sort, Filter, Group, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Sort, Filter, Group);

const grid = new Grid({
  dataSource: data,
  height: '400',
  frozenColumns: 2,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Frozen Columns with Custom Header

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  height: '400',
  frozenColumns: 2,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      width: 100,
      isFrozen: true,
      headerTemplate: '<span>Order ID (Frozen)</span>'
    },
    {
      field: 'CustomerID',
      headerText: 'Customer',
      width: 120,
      isFrozen: true
    },
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      width: 130,
      type: 'date',
      format: 'yMd'
    }
  ]
});

grid.appendTo('#grid');
```

### Frozen Column Events

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  height: '400',
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 }
  ],
  queryColumnInfo: (args: any) => {
    // Make OrderID column frozen
    if (args.column.field === 'OrderID') {
      args.column.isFrozen = true;
    }
  }
});

grid.appendTo('#grid');
```

## Performance and Scrolling Behavior

### Frozen Columns with Virtual Scrolling

```ts
import { Grid, VirtualScroll, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const largeDataset = generateLargeDataset(100000);

const grid = new Grid({
  dataSource: largeDataset,
  height: '600',
  width: '100%',
  frozenColumns: 2,
  enableVirtualization: true,
  columns: [
    // Frozen columns - always visible when scrolling right
    { field: 'OrderID', headerText: 'Order ID', width: 100, isFrozen: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120, isFrozen: true },
    
    // Regular scrollable columns
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Performance Considerations

```ts
import { Grid } from '@syncfusion/ej2-grids';

// Best Practices for Frozen Columns:

// ✅ DO: Freeze only 1-3 reference columns
const goodConfig = {
  frozenColumns: 2  // OrderID, CustomerID
};

// ❌ DON'T: Freeze too many columns (creates horizontal scrolling of frozen area)
const badConfig = {
  frozenColumns: 10  // Too many!
};

// ✅ DO: Use with reasonable dataset sizes
const appropriateSetup = new Grid({
  dataSource: data,
  frozenColumns: 2,
  height: '400'
  // Use with pagination or virtual scroll
});

// ✅ DO: Set explicit height and width
const optimalSetup = new Grid({
  dataSource: data,
  frozenColumns: 2,
  height: '600',
  width: '100%'
});

optimalSetup.appendTo('#grid');
```

### Frozen Columns with Sorting and Filtering

```ts
import { Grid, Sort, Filter, Group, Selection, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Sort, Filter, Group, Selection);

const grid = new Grid({
  dataSource: data,
  height: '500',
  frozenColumns: 2,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  columns: [
    // Frozen reference columns
    {
      field: 'OrderID',
      headerText: 'Order ID',
      width: 100,
      isFrozen: true,
      isPrimaryKey: true
    },
    {
      field: 'CustomerID',
      headerText: 'Customer',
      width: 120,
      isFrozen: true
    },
    
    // Sortable/Filterable columns
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      width: 130,
      type: 'date',
      format: 'yMd',
      allowSorting: true,
      allowFiltering: true
    },
    {
      field: 'ShipCountry',
      headerText: 'Country',
      width: 130,
      allowGrouping: true
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      width: 120,
      format: 'C2',
      allowSorting: true
    }
  ]
});

grid.appendTo('#grid');
```

### Dynamic Frozen Column Toggle

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  height: '500',
  width: '100%',
  frozenColumns: 2,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');

// Toggle frozen columns dynamically
const toggleButton = document.getElementById('toggleFrozen');
let frozenCount = 2;

toggleButton?.addEventListener('click', () => {
  frozenCount = frozenCount === 2 ? 3 : 2;
  grid.frozenColumns = frozenCount;
  toggleButton.textContent = `Toggle Frozen Columns (${frozenCount})`;
});
```

### Frozen Rows and Columns Combined

```ts
import { Grid, Sort, Filter, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Sort, Filter);

const grid = new Grid({
  dataSource: data,
  height: '600',
  width: '100%',
  frozenColumns: 2,
  frozenRows: 2,
  allowSorting: true,
  allowFiltering: true,
  columns: [
    // Reference columns - always visible horizontally
    { field: 'OrderID', headerText: 'Order ID', width: 100, isFrozen: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120, isFrozen: true },
    
    // Data columns - may scroll vertically and horizontally
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'ShipCity', headerText: 'City', width: 120 },
    { field: 'ShipCountry', headerText: 'Country', width: 130 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### Memory Optimization with Frozen Columns

```ts
import { Grid, VirtualScroll, Page, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll, Page);

const largeData = generateLargeDataset(100000);

const grid = new Grid({
  dataSource: largeData,
  height: '600',
  width: '100%',
  frozenColumns: 2,
  enableVirtualization: true,
  allowPaging: true,
  pageSettings: { pageSize: 50 },
  columns: [
    // Keep frozen columns simple and light
    { field: 'OrderID', headerText: 'Order ID', width: 80, isFrozen: true },
    { field: 'CustomerID', headerText: 'Customer', width: 100, isFrozen: true },
    
    // Heavy data moved to scrollable area
    { field: 'OrderDate', headerText: 'Date', width: 100, type: 'date', format: 'yMd' },
    { field: 'ShipAddress', headerText: 'Address', width: 200 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```
