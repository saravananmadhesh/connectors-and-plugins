---
name: Frozen-columns
description: 'Frozen columns in Syncfusion Angular TreeGrid - freeze rows, freeze columns, frozen column configuration, fixed visibility, and performance optimization.'
---

# Frozen Columns & Rows

Freezing columns and rows keeps them visible while scrolling through data.

## When to Use

Use frozen columns/rows when you need to:
- **Keep headers visible** — Always show column headers while scrolling horizontally
- **Lock key columns** — Keep ID or name column visible while viewing other data
- **Freeze row numbers** — Display row index or row numbers while scrolling
- **Fix action columns** — Keep command/action columns visible during horizontal scroll
- **Improve readability** — Maintain context while viewing distant columns
- **Multi-level headers** — Freeze parent headers in grouped columns
- **Large datasets** — Enhance UX when viewing wide tables with many columns

## Table of Contents
- [Freeze Columns](#freeze-columns)
- [Freeze Rows](#freeze-rows)
- [Configuration](#configuration)
- [Performance](#performance)

## Freeze Columns

### Basic Column Freezing

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      width='100%'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90' isFrozen='true'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200' isFrozen='true'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
        <e-column field='Progress' headerText='Progress' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

### Freeze Column Index

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [frozenColumns]='2'
  width='100%'>
  <e-columns>
    <!-- First 2 columns will be frozen -->
    <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
    <e-column field='Duration' headerText='Duration' width='100'></e-column>
  </e-columns>
</ejs-treegrid>
```

## Freeze Rows

### Basic Row Freezing

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [frozenRows]='1'
  width='100%'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
  </e-columns>
</ejs-treegrid>
```

```typescript
// First row will remain visible when scrolling vertically
public frozenRows = 1;
```

## Configuration

### Freeze Column and Row Together

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [frozenColumns]='2'
  [frozenRows]='1'
  height='500px'
  width='100%'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
    <e-column field='Duration' headerText='Duration' width='100'></e-column>
    <e-column field='Progress' headerText='Progress' width='100'></e-column>
  </e-columns>
</ejs-treegrid>
```

### Dynamic Freezing

```typescript
<button (click)='freezeColumn("TaskName")'>Freeze Task Name</button>
<button (click)='unfreezeAll()'>Unfreeze All</button>

<ejs-treegrid 
  #treegrid
  [dataSource]='data'
  [childMapping]='childMapping'
  width='100%'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
@ViewChild('treegrid') treegrid!: TreeGridComponent;

freezeColumn(columnField: string) {
  const column = this.treegrid.getColumnByField(columnField);
  if (column) {
    column.isFrozen = true;
    this.treegrid.refresh();
  }
}

unfreezeAll() {
  this.treegrid.getColumns().forEach(col => col.isFrozen = false);
  this.treegrid.refresh();
}
```

### Freeze with Aggregates

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [frozenColumns]='1'
  [aggregates]='aggregates'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='90' isFrozen='true'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
    <e-column field='Amount' headerText='Amount' width='100' type='number'></e-column>
  </e-columns>
</ejs-treegrid>
```

```typescript
public aggregates = [
  {
    properties: ['Amount'],
    columnName: 'Amount',
    type: 'Sum',
    footerTemplate: 'Total: ${Sum}'
  }
];
```

## Performance

### Optimize Frozen Columns

```typescript
// Good: Freeze only essential columns
<e-column field='ID' isFrozen='true'></e-column>
<e-column field='Name' isFrozen='true'></e-column>

// Avoid: Freezing too many columns impacts performance
// <e-column field='Col1' isFrozen='true'></e-column>
// <e-column field='Col2' isFrozen='true'></e-column>
// ... many more frozen columns
```

### Width Configuration

```typescript
// Must specify explicit widths for frozen columns
<e-column field='TaskID' headerText='Task ID' width='90' isFrozen='true'></e-column>
<e-column field='TaskName' headerText='Task Name' width='150' isFrozen='true'></e-column>

<!-- Avoid flexible widths on frozen columns -->
<!-- <e-column field='Task' width='auto' isFrozen='true'></e-column> -->
```

### Virtual Scrolling with Frozen Columns

```typescript
<ejs-treegrid 
  [dataSource]='dataManager'
  [childMapping]='childMapping'
  [enableVirtualization]='true'
  [frozenColumns]='1'
  [pageSettings]='{ pageSize: 100 }'>
  <e-columns>
    <e-column field='TaskID' isFrozen='true' width='90'></e-column>
    <e-column field='TaskName' width='200'></e-column>
  </e-columns>
</ejs-treegrid>
```

### Limitations
 - Cannot use auto width for frozen columns
 - Limited styling options for frozen area
 - Reordering may not work as expected with frozen columns
 - Print/export may not maintain frozen column layout

### Best practices:
 - Use freezing for key identifier columns only
 - Test performance with actual data volume
 - Consider using rowTemplate for complex layouts
 - Disable freezing for mobile devices

