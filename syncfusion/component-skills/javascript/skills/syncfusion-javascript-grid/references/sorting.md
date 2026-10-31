---
name: sorting
description: 'Sorting in Syncfusion Grid: enable, configuration, initial, multi-column, custom, prevent.'
---

# Sorting

## Table of Contents
- [Overview](#overview)
- [Enable Sorting](#enable-sorting)
- [Sort Configuration](#sort-configuration)
- [Initial Sorting](#initial-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Custom Sorting](#custom-sorting)
- [Prevent Sorting](#prevent-sorting)
- [Remote Sorting](#remote-sorting)

## When to Use This Reference

- Enable single and multi-column sorting
- Configure sort order and initial sorting
- Implement custom sort logic for specific columns
- Handle sort events and programmatic sorting
- Combine sorting with other grid features

## Overview

Sorting enables users to arrange data in ascending or descending order by clicking column headers. It supports single-column and multi-column sorting with custom sort logic.

## Enable Sorting

### Basic Sorting Setup

```ts
import { Grid, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Sort);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ],
  allowSorting: true
});

grid.appendTo('#grid');
```

### Without Module Injection

Sort functionality requires module injection:

```ts
// ❌ Clicking headers won't sort
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowSorting: true
});

// ✅ Correct approach
Grid.Inject(Sort);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowSorting: true
});

grid.appendTo('#grid');
```

## Sort Configuration

### Configure Sort Settings

```ts
import { Grid, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Sort);

const sortSettings = {
  columns: [
    { field: 'OrderID', direction: 'Ascending' }
  ],
  allowUnsort: true  // Allow removing sort by clicking again
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowSorting: true,
  sortSettings: sortSettings
});

grid.appendTo('#grid');
```

## Initial Sorting

Apply default sort order on grid load:

```ts
const sortSettings = {
  columns: [
    { field: 'OrderDate', direction: 'Descending' },
    { field: 'Freight', direction: 'Ascending' }
  ]
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  allowSorting: true,
  sortSettings: sortSettings
});

grid.appendTo('#grid');
```

### Sort Direction Options

```ts
// Ascending (A → Z, 0 → 9)
{ field: 'CustomerID', direction: 'Ascending' }

// Descending (Z → A, 9 → 0)
{ field: 'Freight', direction: 'Descending' }
```

## Multi-Column Sorting

Enable sorting by multiple columns using Ctrl+Click:

```ts
import { Grid, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Sort);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ],
  allowSorting: true,
  allowMultiSorting: true  // Enable multi-column sort
});

grid.appendTo('#grid');
```

### Set Initial Multi-Column Sort

```ts
const sortSettings = {
  columns: [
    { field: 'ShipCountry', direction: 'Ascending' },
    { field: 'CustomerID', direction: 'Ascending' },
    { field: 'Freight', direction: 'Descending' }
  ]
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'ShipCountry', headerText: 'Ship Country', width: 120 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  allowSorting: true,
  allowMultiSorting: true,
  sortSettings: sortSettings
});

grid.appendTo('#grid');
```

## Custom Sorting

### Custom Comparer

Implement custom sort logic:

```ts
const customSort = (data1: any, data2: any) => {
  // Custom comparison logic
  // Return: positive (ascending), negative (descending), 0 (equal)
  return data1.Freight > data2.Freight ? 1 : -1;
};

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Freight',
      headerText: 'Freight',
      width: 100,
      sortComparer: customSort
    }
  ]
});

grid.appendTo('#grid');
```

### Complex Custom Sorting

```ts
const customComparer = (data1: any, data2: any) => {
  const val1 = data1.ShipCountry.toLowerCase();
  const val2 = data2.ShipCountry.toLowerCase();

  if (val1 < val2) return -1;
  if (val1 > val2) return 1;
  return 0;
};

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'ShipCountry',
      headerText: 'Ship Country',
      sortComparer: customComparer,
      width: 150
    }
  ],
  allowSorting: true
});

grid.appendTo('#grid');
```

## Prevent Sorting

### Disable Sorting for Specific Column

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    {
      // Disable sorting for Customer ID column
      field: 'CustomerID',
      headerText: 'Customer',
      allowSorting: false,
      width: 120
    },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  allowSorting: true
});

grid.appendTo('#grid');
```

### Programmatic Sort Control

```ts
import { Grid, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Sort);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowSorting: true
});

grid.appendTo('#grid');

// Apply sorting programmatically
function applySorting() {
  grid.sortColumn('OrderID', 'Ascending');
}

// Clear sorting
function clearSorting() {
  grid.clearSorting();
}

document.getElementById('sortBtn')?.addEventListener('click', applySorting);
document.getElementById('clearBtn')?.addEventListener('click', clearSorting);
```

## Remote Sorting

### Enable Server-Side Sorting with DataManager

```ts
import { Grid, Sort, Page } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Sort, Page);

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', format: 'C2', width: 120 }
  ],
  allowSorting: true,
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');
```

### Server Expectations for Sorting

When a user clicks to sort, the grid sends these parameters:

```
GET /api/orders?$orderby=OrderID%20asc&$skip=0&$take=20

Response:
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET", ... },
    ...
  ],
  "count": 830
}
```

### Multi-Column Remote Sorting

```ts
const sortSettings = {
  columns: [
    { field: 'ShipCountry', direction: 'Ascending' },
    { field: 'CustomerID', direction: 'Ascending' }
  ]
};

const grid = new Grid({
  dataSource: remoteData,
  columns: [
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  allowSorting: true,
  allowMultiSorting: true,
  sortSettings: sortSettings,
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');
```

### Handle Sort Events

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowSorting: true,
  actionComplete: (args: any) => {
    console.log('Sort column:', args.column?.field);
    console.log('Sort direction:', args.direction);
  },
  actionBegin: (args: any) => {
    if (args.requestType === 'sorting') {
      console.log('Sorting initiated on server');
      console.log('Sort columns:', grid.sortSettings.columns);
    }
  }
});

grid.appendTo('#grid');
```

### Get Current Sort State

```ts
function getCurrentSortOrder() {
  return grid.sortSettings.columns;
  // Returns: [{ field: 'OrderID', direction: 'Ascending' }]
}

// Usage
console.log(getCurrentSortOrder());
```

### Dynamic Sort Update

```ts
import { Grid, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Sort);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  allowSorting: true,
  allowMultiSorting: true
});

grid.appendTo('#grid');

// Update sort dynamically
function setSortByFreight(direction: string) {
  grid.sortSettings = {
    columns: [
      { field: 'Freight', direction: direction as any }
    ]
  };
}

// Add to sort
function addSortColumn(field: string, direction: string) {
  const currentSorts = grid.sortSettings.columns || [];
  currentSorts.push({ field: field, direction: direction as any });
  grid.sortSettings = { columns: currentSorts };
}

document.getElementById('sortAsc')?.addEventListener('click', 
  () => setSortByFreight('Ascending')
);
document.getElementById('sortDesc')?.addEventListener('click', 
  () => setSortByFreight('Descending')
);
```
