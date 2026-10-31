---
name: filter-setup
description: 'Filter setup and basic configuration in Syncfusion Grid: enable, modules, and types.'
---

# Filter Setup and Basic Configuration

## Table of Contents
- [Setup Filtering Module](#setup-filtering-module)
- [Enable Filtering](#enable-filtering)
- [Filter Types Overview](#filter-types-overview)
- [Disable Filtering for Columns](#disable-filtering-for-columns)
- [Quick Reference](#quick-reference)

## When to Use This Reference

- Enable column filtering and filter bars
- Configure filter UI and behavior settings
- Set up initial filters and filter templates
- Implement programmatic filter application
- Handle filter events and state management

---

## Setup Filtering Module

Filtering requires injecting the `Filter` module into the Grid. Without this module, filtering features are unavailable.

```ts
import { Grid, Filter, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Filter, Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerName: 'HANAR', CustomerID: 'HANAR', Freight: 65.83 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ],
  allowFiltering: true,  // REQUIRED: Enable filtering
  allowPaging: true
});

grid.appendTo('#grid');
```

---

## Enable Filtering

Set `allowFiltering: true` on the Grid to activate filtering UI. Configure behavior via `filterSettings` property.

```ts
import { Grid, Filter, Page, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Filter, Page, Toolbar);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,           // Enable filtering
  allowPaging: true,
  pageSettings: { pageSize: 6 },
  allowSorting: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer ID', width: 100 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2', textAlign: 'Right' },
    { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: 100 }
  ]
});

grid.appendTo('#grid');
```

---

## Filter Types Overview

Grid supports three filter UI types. Set via `filterSettings.type` property.

| Type | Description | Use Case |
|------|-------------|----------|
| **FilterBar** (default) | Input fields below column headers | Real-time filtering as you type |
| **Menu** | Dropdown menu with operators in header | Precise operator selection |
| **Excel** | Checkbox list dialog | Multiple value selection |
| **CheckBox** | Checkbox list (Excel variant) | Categorical/distinct value filtering |

### FilterBar Type (Default)

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'FilterBar' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Menu Type

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Excel/Checkbox Type

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Excel' },  // or 'CheckBox'
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
  ]
});

grid.appendTo('#grid');
```

---

## Disable Filtering for Columns

Set `allowFiltering: false` on specific columns to hide filter bar/UI for those columns.

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { 
      field: 'CustomerID', 
      headerText: 'Customer ID', 
      width: 100,
      allowFiltering: false    // No filter for this column
    },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ]
});

grid.appendTo('#grid');
```

**Use This When:**
- Column contains non-filterable data (images, custom templates)
- Column is action-only (buttons, commands)
- Column filters are not meaningful to users

---

## Quick Reference

| Task | Property/Method | Example |
|------|-----------------|---------|
| Enable filtering | `allowFiltering: true` | `const grid = new Grid({ allowFiltering: true })` |
| Set filter type | `filterSettings: { type: 'Menu' }` | Menu, FilterBar, Excel, CheckBox |
| Disable column filter | `allowFiltering: false` | `{ field: 'ID', allowFiltering: false }` |
| Filter programmatically | `grid.filterByColumn()` | `grid.filterByColumn('OrderID', 'equal', 10248)` |
| Clear filters | `grid.clearFiltering()` | `grid.clearFiltering()` |
| Inject module | `Grid.Inject(Filter)` | Required in app initialization |
