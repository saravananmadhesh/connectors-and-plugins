---
name: Column Spanning
description: 'Column Spanning in Syncfusion Angular TreeGrid - merge columns across rows and columnsSpan configuration for complex grid layouts.'
---

# Column Spanning

Column Spanning allows merging of adjacent cells in single row to organize data more effectively in grid layouts.

## When to Use

Use column spanning when you need to:
- **Merge cells** — Combine adjacent cells in a row
- **Reduce repetition** — Show category headers once for multiple columns
- **Visual organization** — Improve readability with cell grouping

## Table of Contents
- [Basic Column Spanning](#basic-column-spanning)
- [Column Spanning Options](#column-spanning-options)

## Basic Column Spanning

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [enableColumnSpan]="true" 
      [childMapping]='childMapping'>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [
    {
      TaskID: 1,
      TaskName: 'Planning',
      StartDate: '02/03/2017',
      Duration: 8,
      Progress: 100,
      templateID: 1,
      subtasks: []
    }
  ];
  public childMapping: string = 'subtasks';
}
```

## Column Spanning Options

### Using QueryCellInfo

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      (queryCellInfo)='onQueryCellInfo($event)'>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];

  onQueryCellInfo(args: any): void {
    // Span cells based on conditions
    if (args.rowIndex === 0) {
      args.colSpan = 2;  // Span 2 columns
    }
  }
}
```
