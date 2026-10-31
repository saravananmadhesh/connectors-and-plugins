---
name: Sorting
description: 'Sorting in Syncfusion Angular TreeGrid - single column sort, multi-column sort, custom comparers, sort order control, and sorting events.'
---

# Sorting

Sorting organizes data in ascending or descending order with support for multiple columns.

## When to Use

Use sorting when you need to:
- **Organize data** — Allow users to sort records by one or multiple columns
- **Multi-column sorting** — Sort by primary column, then secondary, etc.
- **Custom sort logic** — Implement special sorting rules (e.g., custom comparers)
- **Initial sort order** — Load TreeGrid with data already sorted
- **Preserve hierarchy** — Sort while maintaining parent-child relationships
- **Toggle sort direction** — Quick column-click sorting between ascending/descending
- **Disable sorting** — Lock specific columns from being sorted

## Table of Contents
- [Enable Sorting](#enable-sorting)
- [Initial Sorting](#initial-sorting)
- [Custom Sorting](#custom-sorting)
- [Sorting Events](#sorting-events)

## Enable Sorting

### Basic Sorting

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowSorting]='true'
      [sortSettings]='sortSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' allowSorting='true' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' allowSorting='true' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [SortService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public sortSettings = {
    columns: [{ field: 'TaskID', direction: 'Ascending' }]
  };
}
```

## Initial Sorting

### Single Column Sort

```typescript
public sortSettings = {
  columns: [{ field: 'TaskName', direction: 'Ascending' }]
};
```

### Multi-Column Sort

```typescript
public sortSettings = {
  columns: [
    { field: 'Status', direction: 'Ascending' },
    { field: 'TaskName', direction: 'Ascending' }
  ]
};
```

## Custom Sorting

### Programmatic Sort

```typescript
@ViewChild('treegrid') treegrid!: TreeGridComponent;

sortByColumn(columnName: string, direction: string) {
  this.treegrid.sortByColumn(columnName, direction);
}
```

### Clear Sort

```typescript
this.treegrid.clearSorting();
```

## Sorting Events

### Sort Events

```typescript
<ejs-treegrid 
  (actionBegin)='onActionBegin($event)'
  (actionComplete)='onActionComplete($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onActionBegin(args: any) {
  if (args.requestType === 'sorting') {
    console.log('Sorting:', args.currentSortingColumn);
  }
}

onActionComplete(args: any) {
  if (args.requestType === 'sorting') {
    console.log('Sort complete');
  }
}
```
