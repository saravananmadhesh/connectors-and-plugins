---
name: searching
description: 'Search functionality in Syncfusion Grid: enable, configuration, operators.'
---

# Searching

## Table of Contents
- [Enable Searching](#enable-searching)
- [Search Configuration](#search-configuration)
- [Multi-Column Search](#multi-column-search)
- [Search Methods](#search-methods)

## When to Use This Reference

- Implement global grid search and filter functionality
- Search specific columns or entire dataset
- Configure search behavior and case sensitivity
- Handle search input and result highlighting
- Combine searching with other grid features

## Enable Searching

### Basic Search

```ts
import { Grid, Search, Toolbar, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Search, Toolbar, Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', City: 'Reims', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', City: 'München', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: ['Search'],
  allowPaging: true
});

grid.appendTo('#grid');
```

## Search Configuration

### Search Settings

```ts
import { Grid, Search, Toolbar, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Search, Toolbar, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, allowSearching: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, allowSearching: true },
    { field: 'City', headerText: 'City', width: 150, allowSearching: false }
  ],
  toolbar: ['Search'],
  searchSettings: {
    key: '',
    operator: 'contains',
    fields: ['OrderID', 'CustomerName', 'City'],
    ignoreCase: true
  }
});

grid.appendTo('#grid');
```

### Search Operators

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['Search'],
  searchSettings: {
    key: 'VI',
    operator: 'startswith',  // 'contains', 'startswith', 'endswith', 'equal'
    ignoreCase: true
  }
});

grid.appendTo('#grid');
```

## Multi-Column Search

### Search Across Multiple Columns

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, allowSearching: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, allowSearching: true },
    { field: 'City', headerText: 'City', width: 150, allowSearching: true }
  ],
  toolbar: ['Search'],
  searchSettings: {
    fields: ['OrderID', 'CustomerName', 'City'],
    operator: 'contains'
  }
});

grid.appendTo('#grid');
```

## Search Methods

### Programmatic Search

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  allowPaging: true
});

grid.appendTo('#grid');

// Search programmatically
grid.search('VINET');

// Search with operator
grid.search('100', 'startswith', 'OrderID', 'equal');
```

### Clear Search

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['Search', {
    text: 'Clear',
    tooltipText: 'Clear Search',
    id: 'grid_search_clear'
  }],
  toolbarClick: (args: any) => {
    if (args.item.id === 'grid_search_clear') {
      grid.search('');
    }
  }
});

grid.appendTo('#grid');
```

### Get Search Details

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  searchSettings: {
    key: 'VI'
  }
});

grid.appendTo('#grid');

// Get current search key
console.log('Search key:', grid.searchSettings.key);

// Get search results count
const filteredRecords = grid.currentViewData.length;
console.log('Filtered records:', filteredRecords);
```

