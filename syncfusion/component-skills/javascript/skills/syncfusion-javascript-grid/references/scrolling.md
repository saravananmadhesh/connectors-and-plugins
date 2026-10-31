---
name: scrolling
description: 'Scrolling in Syncfusion Grid: virtual, infinite, performance, scroll events.'
---

# Scrolling

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)
- [Scroll Performance](#scroll-performance)
- [Scroll Events](#scroll-events)
- [Configuration](#configuration)

## When to Use This Reference

- Enable and configure vertical and horizontal scrolling
- Implement virtual scrolling for large datasets
- Control scroll behavior and positioning
- Handle scroll events and infinite scroll patterns
- Optimize scrolling performance for large grids

## Virtual Scrolling

### Enable Virtual Scrolling

For large datasets (10k+ rows):

```ts
import { Grid, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const grid = new Grid({
  dataSource: largeDataset,  // 100k+ rows
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  enableVirtualization: true,
  height: 600  // Must set height for virtual scrolling
});

grid.appendTo('#grid');
```

### Configuration

```ts
const grid = new Grid({
  dataSource: largeDataset,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableVirtualization: true,
  height: 600,
});

grid.appendTo('#grid');
```

## Infinite Scrolling

### Enable Infinite Scroll

```ts
import { Grid, InfiniteScroll } from '@syncfusion/ej2-grids';

Grid.Inject(InfiniteScroll);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableInfiniteScrolling: true,
  infiniteScrollSettings: { enableCache: false }
});

grid.appendTo('#grid');
```

### Infinite Scroll with Remote Data

```ts
import { Grid, InfiniteScroll } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(InfiniteScroll);

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableInfiniteScrolling: true,
});

grid.appendTo('#grid');
```

## Scroll Performance

### Optimize Large Dataset Rendering

```ts
import { Grid, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const generateLargeDataset = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      OrderID: 10248 + i,
      CustomerName: `Customer ${i + 1}`,
      Freight: Math.random() * 100
    });
  }
  return data;
};

const grid = new Grid({
  dataSource: generateLargeDataset(100000),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  enableVirtualization: true,
  height: 600,
});

grid.appendTo('#grid');
```

### Lazy Loading

```ts
import { Grid, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableVirtualization: true,
  height: 600,
});

grid.appendTo('#grid');
```

## Scroll Events

### Scroll Events

```ts
import { Grid, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const grid = new Grid({
  dataSource: largeDataset,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableVirtualization: true,
  height: 600,
  scroll: (args: any) => {
    console.log('Scroll position:', args);
  }
});

grid.appendTo('#grid');
```

### Scroll Behavior

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableVirtualization: true,
  height: 600
});

grid.appendTo('#grid');

// Scroll to specific position
grid.scrollSettings.horizontalScroll = 100;
grid.scrollSettings.verticalScroll = 500;
grid.refresh();

// Get scroll position
const scrollPos = grid.getRowByIndex(0);
console.log('Scroll position:', scrollPos);
```

## Configuration

### Performance Tuning Guide

Optimize scrolling for different dataset sizes:

```ts
// For 1,000 - 10,000 rows: Use Pagination
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  pageSettings: { pageSize: 50 }
});

grid.appendTo('#grid');

// For 10,000 - 100,000 rows: Use Virtual Scrolling  
import { Grid, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  enableVirtualization: true,
  height: 500,
  pageSettings: { pageSize: 100 }
});

grid.appendTo('#grid');

// For 100,000+ rows: Use Infinite Scrolling
import { Grid, InfiniteScroll } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(InfiniteScroll);

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  }),
  columns: [...],
  enableInfiniteScrolling: true,
  pageSettings: { pageSize: 200 }
});

grid.appendTo('#grid');
```

### Virtual Scrolling Limitations

Virtual scrolling is incompatible with:
- Grouping with virtualization
- Batch editing
- Print functionality
- Server-side operations with aggregates

For these scenarios, use Pagination or Lazy Grouping instead.

### Scroll to Row

```ts
import { Grid, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(VirtualScroll);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  enableVirtualization: true,
  height: 500
});

grid.appendTo('#grid');

// Scroll to specific row
function scrollToRow(rowIndex: number) {
  const row = grid.getRowByIndex(rowIndex);
  if (row) {
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Scroll to specific cell
function scrollToCell(rowIndex: number, columnIndex: number) {
  const cell = grid.getCellFromIndex(rowIndex, columnIndex);
  if (cell) {
    cell.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Scroll to top
function scrollToTop() {
  const contentDiv = grid.getContent();
  if (contentDiv) {
    contentDiv.scrollTop = 0;
  }
}

// Scroll to bottom
function scrollToBottom() {
  const contentDiv = grid.getContent();
  if (contentDiv) {
    contentDiv.scrollTop = contentDiv.scrollHeight;
  }
}

// Event listeners
document.getElementById('goToFirst')?.addEventListener('click', () => scrollToRow(0));
document.getElementById('goToRow100')?.addEventListener('click', () => scrollToRow(100));
document.getElementById('goToCell')?.addEventListener('click', () => scrollToCell(50, 2));
document.getElementById('scrollTop')?.addEventListener('click', scrollToTop);
document.getElementById('scrollBottom')?.addEventListener('click', scrollToBottom);
```

### Frozen Columns with Scrolling

```ts
import { Grid, Freeze } from '@syncfusion/ej2-grids';

Grid.Inject(Freeze);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isFrozen: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' }
    // More columns that will scroll horizontally
  ],
  height: 500
});

grid.appendTo('#grid');
```

