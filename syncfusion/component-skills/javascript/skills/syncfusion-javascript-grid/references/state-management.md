---
name: state-management
description: 'State management in Syncfusion Grid: save, restore, persistence, localStorage.'
---

# State Management

## Table of Contents
- [Overview](#overview)
- [Save and Restore State](#save-and-restore-state)
- [Restore Initial Grid State](#restore-initial-grid-state)
- [Prevent Columns from Persisting](#prevent-columns-from-persisting)
- [Persist Column Template and Header Text](#persist-column-template-and-header-text)

## When to Use This Reference

- Save and restore grid state (sorting, filtering, paging)
- Implement state persistence across sessions
- Export and import grid configuration
- Handle grid state updates and synchronization
- Manage user preferences and layouts

## Overview

State management allows persisting grid configuration like column order, width, sorting, filtering, grouping, and visibility across sessions. The grid provides a persistence mechanism via the `enablePersistence` property. When set to `true`, the grid automatically saves and restores its state to the browser's `localStorage`.

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  enablePersistence: true,
  id: 'Orders'
});

grid.appendTo('#grid');
```

> ⚠️ The `id` property is required when using `enablePersistence`. The localStorage key is formed as `"grid" + id` (e.g., `gridOrders`). Without `id`, state cannot be correctly saved or retrieved.

> ✅ `enablePersistence: true` is **mandatory** for grid state persistence.

### What Gets Persisted

| Setting | Persisted Properties |
|---|---|
| `pageSettings` | `currentPage`, `pageCount`, `pageSize`, `pageSizes`, `totalRecordsCount` |
| `groupSettings` | `columns`, `showDropArea`, `showGroupedColumn`, `enableLazyLoading`, etc. |
| `columns` | `field`, `visible`, `width`, `index`, `allowSorting`, `allowFiltering`, `isFrozen`, etc. |
| `sortSettings` | all |
| `filterSettings` | all |
| `searchSettings` | all |
| `selectedRowIndex` | last selected row only |

> ⚠️ Column `template`, `headerTemplate`, `headerText`, `formatter`, and `valueAccessor` are **not** persisted automatically — they must be handled manually.

---

## Save and Restore State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.


Use `getPersistData()` to get the current grid state as a JSON string, and `setProperties()` to restore it.

```ts
import { Grid, Page, Sort, Filter, Group, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group, Edit, Toolbar);

let gridInstance: Grid;

const data = [
  { OrderID: 10248, CustomerID: 'VINET', ShipCity: 'Reims', ShipCountry: 'France' },
  { OrderID: 10249, CustomerID: 'TOMSP', ShipCity: 'Münster', ShipCountry: 'Germany' }
];

// Save grid state to localStorage
function saveState() {
  const persistData = gridInstance.getPersistData();  // returns JSON string
  window.localStorage.setItem('gridOrders', persistData);  // key = "grid" + id
  console.log('State saved');
}

// Restore grid state from localStorage
function restoreState() {
  const value = window.localStorage.getItem('gridOrders');
  if (value) {
    const state = JSON.parse(value);
    gridInstance.setProperties(state);
    console.log('State restored');
  }
}

const grid = new Grid({
  id: 'Orders',
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer ID', width: 100 },
    { field: 'ShipCity', headerText: 'Ship City', width: 100 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 100 }
  ],
  allowFiltering: true,
  allowPaging: true,
  allowSorting: true,
  allowGrouping: true,
  enablePersistence: true
});

grid.appendTo('#grid');
gridInstance = grid;

// Add button listeners
document.getElementById('saveBtn')?.addEventListener('click', saveState);
document.getElementById('restoreBtn')?.addEventListener('click', restoreState);
```

### Get/Set localStorage Directly


> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.


```ts
// Get the persisted grid model
const value = window.localStorage.getItem('gridOrders');  // "grid" + component id
const model = JSON.parse(value);

// Set the grid model manually
window.localStorage.setItem('gridOrders', JSON.stringify(model));
```

> ✅ `enablePersistence: true` is **mandatory** for `getItem`/`setItem`/manual approach state persistence.

### Maintain Custom Query with Persistence

When `enablePersistence` is enabled, custom query parameters are not automatically maintained after a page reload. Re-apply them in `actionBegin`:

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

let gridInstance: Grid;

const grid = new Grid({
  dataSource: data,
  enablePersistence: true,
  actionBegin: (args: any) => {
    if (gridInstance && gridInstance.query) {
      gridInstance.query.addParams('dataSource', 'data');
    }
  }
});

grid.appendTo('#grid');
gridInstance = grid;
```

---

## Restore Initial Grid State



### By Clearing localStorage

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```ts
function restoreToInitial() {
  gridInstance.enablePersistence = false;
  window.localStorage.setItem('gridGrid', '');  // "grid" + component id
  gridInstance.destroy();
  location.reload();
}
```

### By Changing Component ID

Changing the component's `id` causes the grid to treat itself as a new instance and revert to default settings:

```ts
function restoreToInitial() {
  gridInstance.id = 'OrderDetails' + Math.floor(Math.random() * 10);
  location.reload();
}
```

---

## Prevent Columns from Persisting

To exclude specific properties (e.g., columns) from being persisted, use the `beforeExcelExport` event or manipulate the persistence data:

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

let gridInstance: Grid;

const grid = new Grid({
  id: 'Grid',
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowPaging: true,
  enablePersistence: true,
  dataBound: () => {
    // Override persistence to exclude columns
    if (gridInstance && gridInstance.addOnPersist) {
      const originalAddOnPersist = gridInstance.addOnPersist;
      gridInstance.addOnPersist = function(key: string[]) {
        key = key.filter((item) => item !== 'columns');
        return originalAddOnPersist.call(this, key);
      };
    }
  }
});

grid.appendTo('#grid');
gridInstance = grid;
```

---

## Persist Column Template and Header Text

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

By default, `template`, `headerTemplate`, `headerText`, `formatter`, and `valueAccessor` are not persisted. To persist them, clone columns manually alongside `getPersistData()`:

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

let gridInstance: Grid;

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const grid = new Grid({
  id: 'Orders',
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      field: 'Freight',
      headerText: 'Freight',
      width: 120,
      template: (props: any) => {
        return `$${props.Freight.toFixed(2)}`;
      },
      headerTemplate: () => {
        return '<span>Freight ($)</span>';
      }
    }
  ],
  allowPaging: true,
  enablePersistence: true
});

grid.appendTo('#grid');
gridInstance = grid;

// Save with custom column properties
function saveWithTemplates() {
  const persistedSettings = JSON.parse(gridInstance.getPersistData());
  const gridColumns = gridInstance.getColumns();

  persistedSettings.columns.forEach((persistedColumn: any) => {
    const column = gridColumns.find((col: any) => col.field === persistedColumn.field);
    if (column) {
      persistedColumn.headerText = column.headerText;
      persistedColumn.template = column.template;
      persistedColumn.headerTemplate = column.headerTemplate;
    }
  });

  window.localStorage.setItem('gridOrders', JSON.stringify(persistedSettings));
  gridInstance.setProperties(persistedSettings);
  console.log('State with templates saved');
}

// Restore with custom column properties
function restoreWithTemplates() {
  const savedSettings = window.localStorage.getItem('gridOrders');
  if (savedSettings) {
    gridInstance.setProperties(JSON.parse(savedSettings));
    console.log('State with templates restored');
  }
}

document.getElementById('saveBtn')?.addEventListener('click', saveWithTemplates);
document.getElementById('restoreBtn')?.addEventListener('click', restoreWithTemplates);
```

