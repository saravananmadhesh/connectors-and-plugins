---
name: Performance Optimization
description: 'Performance Optimization in Syncfusion Angular TreeGrid - lazy loading, virtual scrolling, pagination, large datasets, and rendering strategies.'
---

# Performance Optimization

Optimize TreeGrid performance for large datasets through lazy loading, virtual scrolling, pagination, and efficient rendering strategies.

## When to Use

Use performance optimization when you need to:
- **Handle large datasets** — Load 1000+ rows efficiently
- **Reduce memory usage** — Virtual scrolling loads only visible rows
- **Improve responsiveness** — Optimize rendering and interactions
- **Enable column virtualization** — Handle many columns
- **Optimize change detection** — Reduce Angular change detection cycles
- **Server-side operations** — Offload heavy operations to backend

## Table of Contents
- [Performance Rules](#performance-rules)
- [Enable Virtual Scrolling](#enable-virtual-scrolling)
- [Pagination](#pagination)
- [Column Virtualization](#column-virtualization)
- [Rendering Optimization](#rendering-optimization)

## Performance Rules

### Rule 1: Virtual Scrolling for 1000+ Rows
**Severity**: 🟠 IMPORTANT - Performance degrades without virtualization

**Requirement**:
```typescript
// ✅ REQUIRED for large datasets (1000+ rows)
<ejs-treegrid 
  [enableVirtualization]='true'
  height='600px'
  [pageSettings]='{ pageSize: 100 }'>
</ejs-treegrid>

// ✅ RECOMMENDED: Set rowHeight explicitly
<ejs-treegrid 
  [enableVirtualization]='true'
  height='600px'
  [rowHeight]='36'
  [pageSettings]='{ pageSize: 100 }'>
</ejs-treegrid>

// ❌ DON'T use without virtualization for large data
<ejs-treegrid 
  [dataSource]='largeDataSet'>  <!-- Will render all 10,000 rows = slow -->
</ejs-treegrid>
```

**Performance Impact**:
```typescript
// Without Virtual Scrolling:
- 1,000 rows: ~500ms render time
- 10,000 rows: ~5s render time
- 100,000 rows: Browser freeze

// With Virtual Scrolling:
- 1,000 rows: ~50ms render time
- 10,000 rows: ~100ms render time
- 100,000 rows: ~200ms render time
```

---

### Rule 2: Change Detection Strategy OnPush for Large Grids
**Severity**: 🟠 IMPORTANT - Improves performance significantly

**Requirement**:
```typescript
// ✅ RECOMMENDED for large datasets
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush  // Improves performance
})
export class AppComponent {}

// ❌ SLOWER - Default change detection on large grids
@Component({
  // No changeDetection specified = Default (runs on every event)
})
```

---

### Rule 3: Server-Side Operations for Large Datasets
**Severity**: 🟠 IMPORTANT - Load only visible data

**Requirement**:
```typescript
// ✅ REQUIRED for 10,000+ rows
// Backend should handle: filtering, sorting, paging
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  offline: false  // Use server-side operations
});

<ejs-treegrid 
  [dataSource]='dataManager'
  [pageSettings]='{ pageSize: 50 }'>
</ejs-treegrid>

// ❌ WRONG - Loading all data to frontend
const allData = JSON.parse(json);  // 100,000 rows to memory
<ejs-treegrid 
  [dataSource]='allData'>  <!-- Will be very slow -->
</ejs-treegrid>
```

---


## Enable Virtual Scrolling

### Configure Virtual Scrolling

```typescript
import { Component } from '@angular/core';
import { VirtualScrollService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [enableVirtualization]='true'
      [pageSettings]='{ pageSize: 50 }'
      [editSettings]='editSettings'
      height="600">
      <e-columns>
        <e-column field='TaskID' headerText='ID' width='80'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='150'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
        <e-column field='Progress' headerText='Progress' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [VirtualScrollService]
})
export class AppComponent {
  public data: Object[] = [];
  
  public editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  };

  ngOnInit() {
    this.generateLargeDataset(10000);
  }

  generateLargeDataset(count: number): void {
    this.data = [];
    for (let i = 1; i <= count; i++) {
      this.data.push({
        TaskID: i,
        TaskName: `Task ${i}`,
        Duration: Math.floor(Math.random() * 100),
        Progress: Math.floor(Math.random() * 100)
      });
    }
  }
}
```

## Pagination

### Enable Pagination

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [pageSettings]='pageSettings'
      [allowPaging]='true'>
      <e-columns>
        <e-column field='TaskID' headerText='ID' width='80'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [PageService]
})
export class AppComponent {
  public data: Object[] = [];
  public pageSettings = {
    pageSize: 50,
    pageCount: 5
  };
}
```

## Column Virtualization

### Virtualize Wide Columns

```typescript
import { VirtualScrollService } from '@syncfusion/ej2-angular-treegrid';
@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [enableVirtualization]='true'
      [enableColumnVirtualization]='true'
      [columns]='columns'
      height="600">
    </ejs-treegrid>
  `,
  providers: [VirtualScrollService]
})
export class AppComponent {
  public data: Object[] = [];
  public columns: any[] = [];

  ngOnInit() {
    // Generate many columns
    this.columns = Array.from({ length: 100 }, (_, i) => ({
      field: `col${i}`,
      headerText: `Column ${i}`,
      width: 100
    }));
    
    this.generateData(1000);
  }

  generateData(count: number): void {
    this.data = Array.from({ length: count }, (_, i) => {
      const row: any = { TaskID: i };
      for (let j = 0; j < 100; j++) {
        row[`col${j}`] = `Data ${i}-${j}`;
      }
      return row;
    });
  }
}
```

## Rendering Optimization

### Optimize Rendering with Change Detection

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, VirtualScrollService } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [enableVirtualization]='true'>
      <e-columns>
        <e-column field='TaskID' headerText='ID'></e-column>
        <e-column field='TaskName' headerText='Task'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [VirtualScrollService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public data: Object[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get('api/tasks').subscribe({
      next: (response: any) => {
        this.data = response;
        // Mark for check only when data changes
        this.cdr.markForCheck();
      }
    });
  }
}
```
