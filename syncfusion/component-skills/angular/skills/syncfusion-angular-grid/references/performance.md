# Performance Optimization in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)
- [Data Loading Strategies](#data-loading-strategies)
- [Rendering Optimization](#rendering-optimization)
- [Memory Management](#memory-management)
- [Event Optimization](#event-optimization)
- [Bundle Size Optimization](#bundle-size-optimization)
- [Benchmarking](#benchmarking)

## When to Use This Skill

Use this skill when you need to:
- **Handle large datasets** — Optimize grids with 10K+ rows
- **Virtual scrolling** — Render only visible rows for performance
- **Infinite scrolling** — Load data as user scrolls
- **Lazy loading** — Load data on demand
- **Improve initial load** — Optimize time to interactive
- **Reduce memory usage** — Manage RAM with large datasets
- **Optimize rendering** — Improve scroll smoothness and FPS
- **Bundle optimization** — Reduce JavaScript bundle size
- **Performance monitoring** — Benchmark and profile grid performance

## Overview

Performance optimization is critical when handling large datasets. Syncfusion Grid provides multiple strategies for managing thousands or millions of records efficiently.

### Key Performance Metrics

- **Initial Load Time**: Time to display first page of data
- **Time to Interactive (TTI)**: When user can interact
- **Memory Usage**: RAM consumed by the grid
- **Render Time**: Time to render/re-render rows
- **Scroll Smoothness**: FPS during scrolling

---

## Virtual Scrolling

Virtual scrolling renders only visible rows, not entire dataset.

### When to Use

- **10,000+ records** and visible rows <= 100
- Smooth scrolling through massive datasets
- Cannot use pagination

### Setup

```typescript
import { Component } from '@angular/core';
import { VirtualScrollService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="largeData"
              [enableVirtualization]="true"
              height="500px">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [VirtualScrollService]
})
export class GridComponent {
  largeData = [];  // 100,000+ records
}
```

### Configuration Options

```typescript
const settings = {
  enableVirtualization: true,
  height: '500px',                    // Set explicit height
  rowHeight: 36,                       // Match actual row height
  pageSettings: { pageSize: 12 }       // Viewport size
};

// In component template:
<ejs-grid [dataSource]="largeData" [pageSettings]="pageSettings">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>

// In component class:
export class VirtualScrollGridComponent implements OnInit {
  largeData: any[] = [];
  pageSettings: any = { pageSize: 12 };
}
```

### Virtual Scrolling with Sorting/Filtering

The whole dataset is virtualized even with operations:

```typescript
// In component template:
<ejs-grid [dataSource]="largeDataManager"
          [enableVirtualization]="true"
          [allowSorting]="true"
          [allowFiltering]="true"
          height="500px">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
  </e-columns>
</ejs-grid>

// In component class - providers: [VirtualScroll, Sort, Filter]
```

### Performance: ~1 Million Rows

```
Without Virtual Scroll:
- Initial load: 8-10 seconds
- Memory: 500+ MB
- GPU crash at 500K rows

With Virtual Scroll:
- Initial load: 1-2 seconds
- Memory: 50-100 MB
- Smooth scrolling through 1M rows
```

### Virtual Scrolling Limitations

❌ **Not supported with:**
- Row grouping
- Row spanning
- Batch editing
- Print
- Export (must use server-side)

---

## Infinite Scrolling

Load data on-demand as user scrolls to bottom.

### When to Use

- Unknown total record count
- Real-time streaming data
- Memory constraints
- Mobile applications

### Setup

```typescript
import { Component } from '@angular/core';
import { InfiniteScrollService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="data"
              [enableInfiniteScrolling]="true"
              [pageSettings]="{ pageSize: 50 }"
              height="500px">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `,
  providers: [InfiniteScrollService]
})
export class GridComponent {
  data = [];
}
```

### With Remote Data

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  pageSize: 50
});

<ejs-grid
  [dataSource]="data"
  [enableInfiniteScrolling]="true">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### Performance Comparison

```
10 pages x 50 rows (Infinite Scroll):
- Memory: ~10 MB
- Smooth scrolling
- One request at start, one per scroll

Pagination:
- Memory: 2-3 MB per page
- No continuous scroll
- One request per page click
```

---

## Data Loading Strategies

### Progressive Loading with Spinners

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { PageService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-progressive-loading',
  template: `
    <div>
      <div *ngIf="isLoading" class="spinner">Loading...</div>
      
      <ejs-grid [dataSource]="data" [allowPaging]="true" 
                [pageSettings]="pageSettings" (actionComplete)="onActionComplete()">
        <!-- columns -->
      </ejs-grid>
    </div>
  `,
  providers: [PageService]
})
export class ProgressiveLoadingComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  isLoading: boolean = true;
  pageSettings = { pageSize: 12 };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load data here
  }

  onActionComplete() {
    this.isLoading = false;
  }
}
```

## Rendering Optimization

### Column Reordering & Resizing

Disable if not needed to reduce overhead:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-optimized-grid',
  template: `<ejs-grid #grid
    [dataSource]="data"
    [allowReordering]="false"
    [allowResizing]="false">
    <!-- columns -->
  </ejs-grid>`
})
export class OptimizedGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load grid data
  }
}
```

### Avoid Inline Functions

```typescript
// ❌ Bad: Creates new function on each render
// <ejs-grid (actionBegin)="(args) => console.log(args)"></ejs-grid>

// ✅ Good: Define as method
export class GridComponent {
  onActionBegin(args: any) {
    console.log(args);
  }
}

// In template:
// <ejs-grid (actionBegin)="onActionBegin($event)"></ejs-grid>
```

### Row Height Fixed Value

Set explicit `rowHeight` for virtual scrolling:

```typescript
<ejs-grid
  [dataSource]="data"
  [enableVirtualization]="true"
  [rowHeight]="36"
  height="500px">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
  </e-columns>
</ejs-grid>
```

---

## Memory Management

### Clear Data When Hidden

```typescript
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-memory-grid',
  template: `
    <button (click)="closeGrid()">Close Grid</button>
    <ejs-grid *ngIf="showGrid" #grid [dataSource]="largeData">
      <!-- columns -->
    </ejs-grid>
  `
})
export class MemoryGridComponent {
  @ViewChild('grid') gridInstance: GridComponent;
  showGrid: boolean = true;
  largeData: any[] = [];

  closeGrid() {
    if (this.gridInstance) {
      this.gridInstance.dataSource = [];  // Clear data
    }
    this.showGrid = false;
  }
}
```

### Cleanup on Unmount

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-cleanup-grid',
  template: '<ejs-grid #grid [dataSource]="data"></ejs-grid>'
})
export class CleanupGridComponent implements OnInit, OnDestroy {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    // Initialize
  }

  ngOnDestroy() {
    // Cleanup
    if (this.gridInstance) {
      this.gridInstance.destroy();
    }
  }
}
```

### Batch Updates

```typescript
export class BatchUpdateGridComponent {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  updateMultipleRows(newData: any[]) {
    this.gridInstance.dataSource = newData;  // Single update
  }

  // Instead of:
  // data.forEach(item => this.gridInstance.addRecord(item));  // Multiple updates
}
```

---

## Event Optimization

### Debounce Search

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-search-grid',
  template: `
    <input (keyup)="onSearch($event.target.value)" placeholder="Search...">
    <ejs-grid #grid [dataSource]="data"></ejs-grid>
  `
})
export class SearchGridComponent {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  private debounceTimer: any;

  onSearch(searchValue: string) {
    clearTimeout(this.debounceTimer);
    
    this.debounceTimer = setTimeout(() => {
      this.gridInstance.search(searchValue);
    }, 300);  // Wait 300ms after typing stops
  }
}
```

### Throttle Scroll Events

```typescript
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-event-throttle',
  template: `<ejs-grid #grid
    (load)="onGridLoad($event)">
    <!-- columns -->
  </ejs-grid>`
})
export class EventThrottleComponent {
  @ViewChild('grid') gridInstance: GridComponent;

  throttle(fn: Function, delay: number) {
    let lastCall = 0;
    return function(...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn(...args);
      }
    };
  }

  onGridLoad(args: any) {
    // Check scrolling event
    const handleGridScroll = this.throttle(() => {
      console.log('Scrolled');
    }, 100);
  }
}
```

### Conditional Event Handlers

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-conditional-grid',
  template: `
    <ejs-grid
      [dataSource]="data"
      [doubleClick]="showDetailOnly ? onRowDoubleClick.bind(this) : null">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ConditionalHandlerGridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  data: any[] = [];
  showDetailOnly: boolean = true;

  onRowDoubleClick(args: any): void {
    if (this.showDetailOnly) {
      console.log('Show detail:', args);
    }
  }
}
```

---

## Bundle Size Optimization

### Tree Shaking

Only import what you use:

```typescript
// ❌ Imports all modules
import * from '@syncfusion/ej2-angular-grids';

// ✅ Import only needed
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter
} from '@syncfusion/ej2-angular-grids';
```

### Selective Module Injection

```typescript
// Minimal bundle
// providers: [Page]

// vs.

// Large bundle
// providers: [Page, Sort, Filter, Group, Edit, Toolbar, ExcelExport, PdfExport]
```

### Lazy Load Grid

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-lazy-grid',
  template: `
    <div>
      <div *ngIf="isLoading" class="spinner">Loading Grid...</div>
      <ejs-grid #grid 
        *ngIf="!isLoading" 
        [dataSource]="data" 
        [allowPaging]="true"
        [pageSettings]="{ pageSize: 12 }">
        <e-columns>
          <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
          <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class LazyGridWithExportsComponent implements OnInit {
  @ViewChild('grid') gridComponent!: GridComponent;
  data: any[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    // Simulate async data loading
    setTimeout(() => {
      this.data = [
        { OrderID: 1, CustomerID: 'ALFKI' },
        { OrderID: 2, CustomerID: 'ANATR' },
        // More data...
      ];
      this.isLoading = false;
    }, 1000);
  }
}
```

### Bundle Comparison

```
Core Grid Only:        ~45 KB
+ Paging:              ~55 KB (+10 KB)
+ Sorting:             ~65 KB (+10 KB)
+ All Data Ops:        ~90 KB (+25 KB)
+ All with Export:     ~200 KB (+110 KB)
```

---

## Benchmarking

### Measure Render Time

```typescript
@Component({
  selector: 'app-benchmark',
  template: '<ejs-grid #grid [dataSource]="data"></ejs-grid>'
})
export class BenchmarkComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    const startTime = performance.now();
    
    // Grid renders here
    this.loadData();

    const endTime = performance.now();
    console.log(`Grid rendered in ${endTime - startTime}ms`);
  }

  loadData() {
    // Load data
  }
}
```

### Monitor Memory Usage

```typescript
@Component({
  selector: 'app-memory-monitor',
  template: '<ejs-grid [dataSource]="data"></ejs-grid>'
})
export class MemoryMonitorComponent implements OnInit, OnDestroy {
  data: any[] = [];
  private memoryInterval: any;

  ngOnInit() {
    this.memoryInterval = setInterval(() => {
      this.logMemory();
    }, 5000);
  }

  logMemory() {
    if ((performance as any).memory) {
      console.log('Used Memory:', Math.round((performance as any).memory.usedJSHeapSize / 1048576) + ' MB');
      console.log('Total Memory:', Math.round((performance as any).memory.jsHeapSizeLimit / 1048576) + ' MB');
    }
  }

  ngOnDestroy() {
    clearInterval(this.memoryInterval);
  }
}
```

### Profiling with React DevTools

1. Install React DevTools browser extension
2. Open DevTools > Profiler tab
3. Record interaction
4. Analyze render times and component updates

### Network Monitoring

Use browser DevTools Network tab to:
- Monitor API response times
- Check for unnecessary requests
- Verify pagination/lazy loading
- Monitor bundle sizes
