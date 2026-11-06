---
name: performance-optimization
description: 'Performance optimization in Syncfusion Grid: virtual scrolling, lazy loading, data aggregation, caching, and best practices.'
---

# Performance Optimization

## Table of Contents
- [Overview](#overview)
- [Virtual Scrolling](#virtual-scrolling)
- [Lazy Loading](#lazy-loading)
- [Data Aggregation](#data-aggregation)
- [Caching Strategies](#caching-strategies)
- [Memory Management](#memory-management)
- [Benchmarking](#benchmarking)
- [Best Practices](#best-practices)

## When to Use This Reference

- Optimize rendering with virtual scrolling
- Implement lazy loading for large datasets
- Minimize memory usage with deferred rendering
- Cache and batch update strategies
- Profile and benchmark grid performance

## Overview

Performance optimization is critical for grids with large datasets. Syncfusion Grid provides multiple strategies to handle thousands of rows efficiently without compromising user experience.

### Performance Metrics
- **Load Time**: Initial grid initialization
- **Render Time**: Time to display rows
- **Interaction Speed**: Response to user actions (sort, filter, search)
- **Memory Usage**: RAM consumption
- **Scroll Performance**: Smoothness when scrolling

## Virtual Scrolling

### Enable Virtual Scrolling

Virtual scrolling renders only visible rows, making it ideal for large datasets (10k+ rows).

```ts
import { Grid, VirtualScroll, Page, Sort, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll, Page, Sort, Filter);

// Generate large dataset
const generateData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      OrderID: 10248 + i,
      CustomerName: `Customer ${i + 1}`,
      OrderDate: new Date(1996, 6, 4 + i),
      Freight: Math.random() * 100,
      ShipCity: ['Reims', 'Münster', 'Rio de Janeiro', 'Lyon', 'Graz'][i % 5],
      Status: ['Active', 'Inactive', 'Pending'][i % 3]
    });
  }
  return data;
};

const largeDataset = generateData(50000);  // 50,000 rows

const grid = new Grid({
  dataSource: largeDataset,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', width: 130 },
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 120 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'Status', headerText: 'Status', width: 120 }
  ],
  enableVirtualization: true,  // Enable virtual scrolling
  enableColumnVirtualization: true,  // Virtualize columns too
  allowSorting: true,
  allowFiltering: true,
  height: '500px',
  rowHeight: 48
});

grid.appendTo('#grid');
```

### Virtual + Infinite Scroll

Combines virtual scrolling with infinite scroll loading.

```ts
import { Grid, VirtualScroll, InfiniteScroll, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll, InfiniteScroll, Sort);

const grid = new Grid({
  dataSource: largeDataset,
  columns: [...],
  enableVirtualization: true,
  enableInfiniteScrolling: true,
  infiniteScrollSettings: {
    enableCache: true,
    maxBlocks: 5,  // Cache 5 blocks
    initialBlocks: 2
  },
  allowSorting: true,
  height: '500px'
});

grid.appendTo('#grid');
```

## Lazy Loading

### Lazy Load Grouping

Load group data on demand when groups are expanded.

```ts
import { Grid, Group, LazyLoadGroup, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Group, LazyLoadGroup, Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims' },
  { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'Münster' },
  // ... more data
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['ShipCity'],
    lazyLoadGrouping: true  // Enable lazy load grouping
  },
  height: '500px',
  actionComplete: (args: any) => {
    if (args.requestType === 'grouping') {
      console.log('Group headers loaded');
    }
  }
});

grid.appendTo('#grid');
```

### Lazy Load Detail Template

Load detail row data only when expanded.

```ts
import { Grid, DetailRow, Page } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  detailTemplate: '<div>Loading details...</div>',
  detailDataBound: (args: any) => {
    // Fetch detail data when row is expanded
    console.log('Detail row expanded:', args.data.OrderID);
    // Optionally update detail content here
  },
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');
```

## Data Aggregation

### Efficient Aggregates

Use aggregates on large datasets with proper settings.

```ts
import { Grid, Aggregate, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Aggregate, Page);

const grid = new Grid({
  dataSource: generateData(100000),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  aggregates: [
    {
      columns: [
        { field: 'Freight', type: 'Sum', footerTemplate: 'Total: ${Sum}' },
        { field: 'Freight', type: 'Average', footerTemplate: 'Average: ${Average}' },
        { field: 'Freight', type: 'Count', footerTemplate: 'Count: ${Count}' }
      ]
    }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 50 }
});

grid.appendTo('#grid');
```

### Grouped Aggregates

Aggregates on grouped data with lazy loading.

```ts
import { Grid, Group, Aggregate, LazyLoadGroup } from '@syncfusion/ej2-grids';

Grid.Inject(Group, Aggregate, LazyLoadGroup);

const grid = new Grid({
  dataSource: generateData(50000),
  columns: [
    { field: 'ShipCity', headerText: 'City', width: 150 },
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['ShipCity'],
    lazyLoadGrouping: true
  },
  aggregates: [
    {
      columns: [
        { field: 'Freight', type: 'Sum', groupFooterTemplate: 'Total: ${Sum}' },
        { field: 'Freight', type: 'Average', groupCaptionTemplate: 'Avg: ${Average}' }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

## Caching Strategies

### Enable Caching with Virtual Scroll

```ts
import { Grid, VirtualScroll, Page } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll, Page);

const grid = new Grid({
  dataSource: largeDataset,
  columns: [...],
  enableVirtualization: true,
  cacheSettings: {
    type: 'Sequential',  // or 'Cumulative'
    itemsCount: 100,     // Number of items to cache
    interval: 100        // Time interval (ms)
  },
  pageSettings: { pageSize: 50 },
  height: '500px'
});

grid.appendTo('#grid');
```

### Data caching with LocalStorage

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.


```ts
class GridDataCache {
  private cacheKey = 'gridData';
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  saveToCache(data: any[]) {
    const cacheData = {
      data: data,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
  }

  getFromCache(): any[] | null {
    const cached = localStorage.getItem(this.cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = new Date().getTime();

    // Check if cache is expired
    if (now - timestamp > this.cacheDuration) {
      localStorage.removeItem(this.cacheKey);
      return null;
    }

    return data;
  }

  clearCache() {
    localStorage.removeItem(this.cacheKey);
  }
}

// Usage
const cache = new GridDataCache();
const cachedData = cache.getFromCache();

const grid = new Grid({
  dataSource: cachedData || largeDataset,
  columns: [...]
});

grid.appendTo('#grid');

// Save to cache after data changes
grid.actionComplete = (args) => {
  if (args.requestType === 'save') {
    cache.saveToCache(grid.getCurrentViewRecords());
  }
};
```

## Memory Management

### Clean Up Resources

```ts
import { Grid, Page, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Edit);

const grid = new Grid({
  dataSource: largeDataset,
  columns: [...],
  allowPaging: true,
  pageSettings: { pageSize: 50 }
});

grid.appendTo('#grid');

// Cleanup when grid is no longer needed
window.addEventListener('beforeunload', () => {
  grid.destroy();  // Clean up event listeners and resources
});

// Or on component unmount (e.g., in SPA)
function unmountGrid() {
  grid.destroy();
  // Clear references
  grid = null;
}
```

### Dispose Patterns

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grids: Grid[] = [];

const createGrid = () => {
  const grid = new Grid({
    dataSource: data,
    columns: [...]
  });
  grid.appendTo('#grid');
  grids.push(grid);
  return grid;
};

const disposeAllGrids = () => {
  grids.forEach(grid => grid.destroy());
  grids.length = 0;
};

// Usage
createGrid();
// Later...
disposeAllGrids();
```

## Benchmarking

### Performance Metrics

```ts
import { Grid, VirtualScroll, Page } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll, Page);

// Measure initialization time
const startInit = performance.now();

const grid = new Grid({
  dataSource: generateData(100000),
  columns: [...],
  enableVirtualization: true
});

grid.appendTo('#grid');

const endInit = performance.now();
console.log(`Grid initialization: ${endInit - startInit}ms`);

// Measure render time
const startRender = performance.now();

grid.refresh();

const endRender = performance.now();
console.log(`Grid re-render: ${endRender - startRender}ms`);

// Measure memory usage
if (performance.memory) {
  console.log(`Memory used: ${performance.memory.usedJSHeapSize / 1048576}MB`);
}

// Measure interaction performance
let sortStartTime = 0;
grid.actionBegin = (args) => {
  if (args.requestType === 'sorting') sortStartTime = performance.now();
};

grid.actionComplete = (args) => {
  if (args.requestType === 'sorting') {
    console.log(`Sort completed: ${performance.now() - sortStartTime}ms`);
  }
};
```

### Memory Profiling

```ts
// Enable memory monitoring
class MemoryMonitor {
  private checkInterval: number = 5000;  // 5 seconds

  start() {
    if (!performance.memory) {
      console.warn('Memory API not available');
      return;
    }

    setInterval(() => {
      const memory = performance.memory;
      const usedMB = memory.usedJSHeapSize / 1048576;
      const totalMB = memory.jsHeapSizeLimit / 1048576;
      const percentUsed = (usedMB / totalMB * 100).toFixed(2);

      console.log(`Memory: ${usedMB.toFixed(2)}MB / ${totalMB.toFixed(2)}MB (${percentUsed}%)`);

      // Alert if memory usage is high
      if (parseFloat(percentUsed) > 80) {
        console.warn('High memory usage detected!');
        // Trigger garbage collection or data cleanup
      }
    }, this.checkInterval);
  }
}

const monitor = new MemoryMonitor();
monitor.start();
```

## Best Practices

### Configuration Best Practices

```ts
import { Grid, DataManager, UrlAdaptor, Page, Sort, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter);

const grid = new Grid({
  // Use DataManager for remote data
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    requestType: 'GET',
    headers: [{
      'Content-Type': 'application/json',
      'Authorization': `send_token`
    }]
  }),
  columns: [...],
  allowPaging: true,
  pageSettings: { pageSize: 50 },
  allowSorting: true,
  allowFiltering: true,
  
  // Server-side operations reduce client memory
  serverSideFilter: true,
  serverSideSorting: true,
  serverSidePaging: true
});

grid.appendTo('#grid');
```

### Column Virtualization

```ts
const grid = new Grid({
  dataSource: data,
  enableColumnVirtualization: true,
  height: '500px',
  columns: [
    // Define many columns - only visible ones are rendered
    { field: 'OrderID', width: 100 },
    { field: 'CustomerName', width: 150 },
    { field: 'OrderDate', width: 130 },
    { field: 'Freight', width: 120 },
    { field: 'ShipCity', width: 150 },
    { field: 'ShipAddress', width: 200 },
    // ... more columns
  ]
});

grid.appendTo('#grid');
```
